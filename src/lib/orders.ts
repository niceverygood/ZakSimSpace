/**
 * Order store. Primary: Supabase `orders` table (survives serverless cold
 * starts between /payment/prepare and /payment/approve). Fallback: in-memory
 * Map, used when Supabase is unconfigured OR the table hasn't been created yet
 * (run sql/0002_orders.sql in the Supabase dashboard to enable persistence).
 */

import "server-only";
import { createClient } from "@supabase/supabase-js";

export type OrderStatus = "created" | "paid" | "failed" | "canceled";

export type Order = {
  moid: string;
  branchId: string;
  branchName: string;
  amount: number;
  cycle: "yearly" | "monthly";
  buyerName: string;
  buyerEmail: string;
  buyerTel: string;
  status: OrderStatus;
  createdAt: string;
  /** Populated after successful approval. */
  tid?: string;
  authDate?: string;
  cardName?: string;
  cardNum?: string;
  /** Populated on failure. */
  failReason?: string;
};

/* ──────── Supabase client (anon key, no cookies) ──────── */

const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPA_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function supa() {
  if (!SUPA_URL || !SUPA_KEY) return null;
  return createClient(SUPA_URL, SUPA_KEY, {
    auth: { persistSession: false },
  });
}

/* ──────── in-memory fallback ──────── */

const store = new Map<string, Order>();

/* ──────── row <-> Order mapping ──────── */

type OrderRow = {
  moid: string;
  branch_id: string | null;
  branch_name: string | null;
  amount: number;
  cycle: string | null;
  buyer_name: string | null;
  buyer_email: string | null;
  buyer_tel: string | null;
  status: string;
  tid: string | null;
  auth_date: string | null;
  card_name: string | null;
  card_num: string | null;
  fail_reason: string | null;
  created_at: string;
};

function rowToOrder(r: OrderRow): Order {
  return {
    moid: r.moid,
    branchId: r.branch_id ?? "",
    branchName: r.branch_name ?? "",
    amount: r.amount,
    cycle: r.cycle === "monthly" ? "monthly" : "yearly",
    buyerName: r.buyer_name ?? "",
    buyerEmail: r.buyer_email ?? "",
    buyerTel: r.buyer_tel ?? "",
    status: (r.status as OrderStatus) ?? "created",
    createdAt: r.created_at,
    tid: r.tid ?? undefined,
    authDate: r.auth_date ?? undefined,
    cardName: r.card_name ?? undefined,
    cardNum: r.card_num ?? undefined,
    failReason: r.fail_reason ?? undefined,
  };
}

/* ──────── id ──────── */

export function generateMoid(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ZS${y}${m}${d}-${rand}`;
}

/* ──────── CRUD (Supabase primary, in-memory fallback) ──────── */

export async function createOrder(
  data: Omit<Order, "status" | "createdAt" | "moid"> & { moid?: string },
): Promise<Order> {
  const moid = data.moid ?? generateMoid();
  const order: Order = {
    ...data,
    moid,
    status: "created",
    createdAt: new Date().toISOString(),
  };

  // Always keep an in-memory copy as a hedge against transient DB errors.
  store.set(moid, order);

  const sb = supa();
  if (sb) {
    const { error } = await sb.from("orders").insert({
      moid,
      branch_id: order.branchId,
      branch_name: order.branchName,
      amount: order.amount,
      cycle: order.cycle,
      buyer_name: order.buyerName,
      buyer_email: order.buyerEmail,
      buyer_tel: order.buyerTel,
      status: order.status,
    });
    // Swallow errors (e.g. table not yet created) — in-memory still holds it.
    if (error && process.env.NODE_ENV !== "production") {
      console.warn("[orders] supabase insert failed:", error.message);
    }
  }
  return order;
}

export async function getOrder(moid: string): Promise<Order | undefined> {
  const sb = supa();
  if (sb) {
    const { data, error } = await sb
      .from("orders")
      .select("*")
      .eq("moid", moid)
      .maybeSingle();
    if (!error && data) return rowToOrder(data as OrderRow);
  }
  return store.get(moid);
}

export async function updateOrder(
  moid: string,
  patch: Partial<Order>,
): Promise<Order | undefined> {
  // Update in-memory copy if present.
  const cur = store.get(moid);
  if (cur) store.set(moid, { ...cur, ...patch });

  const sb = supa();
  if (sb) {
    const row: Record<string, unknown> = {};
    if (patch.status !== undefined) row.status = patch.status;
    if (patch.tid !== undefined) row.tid = patch.tid;
    if (patch.authDate !== undefined) row.auth_date = patch.authDate;
    if (patch.cardName !== undefined) row.card_name = patch.cardName;
    if (patch.cardNum !== undefined) row.card_num = patch.cardNum;
    if (patch.failReason !== undefined) row.fail_reason = patch.failReason;
    if (Object.keys(row).length > 0) {
      const { error } = await sb.from("orders").update(row).eq("moid", moid);
      if (error && process.env.NODE_ENV !== "production") {
        console.warn("[orders] supabase update failed:", error.message);
      }
    }
    // Return the freshest copy from DB.
    const fresh = await getOrder(moid);
    if (fresh) return fresh;
  }
  return store.get(moid);
}

/** Admin: list recent orders (Supabase only). Empty when DB unavailable. */
export async function listOrders(limit = 200): Promise<Order[]> {
  const sb = supa();
  if (!sb) return [];
  const { data, error } = await sb
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return (data as OrderRow[]).map(rowToOrder);
}
