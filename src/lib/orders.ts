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
  branchAddr?: string;
  amount: number;
  cycle: "yearly" | "monthly";
  /** Contract length in months (3/6/12/24). */
  months?: number;
  /** 개인 / 법인 */
  bizType?: string;
  /** Contract start date (YYYY-MM-DD). */
  startDate?: string;
  /** 업종 (optional). */
  industry?: string;
  buyerName: string;
  buyerEmail: string;
  buyerTel: string;
  status: OrderStatus;
  createdAt: string;
  /** Per-branch auto-assigned unit number (호수), set on approval. */
  unitNo?: number;
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
  branch_addr: string | null;
  amount: number;
  cycle: string | null;
  months: number | null;
  biz_type: string | null;
  start_date: string | null;
  industry: string | null;
  buyer_name: string | null;
  buyer_email: string | null;
  buyer_tel: string | null;
  status: string;
  unit_no: number | null;
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
    branchAddr: r.branch_addr ?? undefined,
    amount: r.amount,
    cycle: r.cycle === "monthly" ? "monthly" : "yearly",
    months: r.months ?? undefined,
    bizType: r.biz_type ?? undefined,
    startDate: r.start_date ?? undefined,
    industry: r.industry ?? undefined,
    buyerName: r.buyer_name ?? "",
    buyerEmail: r.buyer_email ?? "",
    buyerTel: r.buyer_tel ?? "",
    status: (r.status as OrderStatus) ?? "created",
    createdAt: r.created_at,
    unitNo: r.unit_no ?? undefined,
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
    // Base columns exist since 0002; extended columns since 0003. If the
    // extended insert fails (migration not yet applied) we retry with the base
    // set so the order still persists and the payment flow keeps working.
    const base = {
      moid,
      branch_id: order.branchId,
      branch_name: order.branchName,
      amount: order.amount,
      cycle: order.cycle,
      months: order.months ?? null,
      biz_type: order.bizType ?? null,
      buyer_name: order.buyerName,
      buyer_email: order.buyerEmail,
      buyer_tel: order.buyerTel,
      status: order.status,
    };
    const extended = {
      ...base,
      branch_addr: order.branchAddr ?? null,
      start_date: order.startDate ?? null,
      industry: order.industry ?? null,
    };
    try {
      const { error } = await sb.from("orders").insert(extended);
      if (error) {
        const retry = await sb.from("orders").insert(base);
        if (retry.error && process.env.NODE_ENV !== "production") {
          console.warn("[orders] supabase insert failed:", retry.error.message);
        }
      }
    } catch {
      /* DB unreachable — in-memory copy already stored above */
    }
  }
  return order;
}

export async function getOrder(moid: string): Promise<Order | undefined> {
  const sb = supa();
  if (sb) {
    try {
      const { data, error } = await sb
        .from("orders")
        .select("*")
        .eq("moid", moid)
        .maybeSingle();
      if (!error && data) return rowToOrder(data as OrderRow);
    } catch {
      /* DB unreachable — fall back to in-memory copy */
    }
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
    if (patch.unitNo !== undefined) row.unit_no = patch.unitNo;
    if (patch.tid !== undefined) row.tid = patch.tid;
    if (patch.authDate !== undefined) row.auth_date = patch.authDate;
    if (patch.cardName !== undefined) row.card_name = patch.cardName;
    if (patch.cardNum !== undefined) row.card_num = patch.cardNum;
    if (patch.failReason !== undefined) row.fail_reason = patch.failReason;
    try {
      if (Object.keys(row).length > 0) {
        const { error } = await sb.from("orders").update(row).eq("moid", moid);
        // `unit_no` only exists since 0003. If the update fails because of it,
        // retry without it so the critical status/tid update still lands.
        if (error && "unit_no" in row) {
          const { unit_no: _omit, ...rest } = row;
          void _omit;
          if (Object.keys(rest).length > 0) {
            await sb.from("orders").update(rest).eq("moid", moid);
          }
        } else if (error && process.env.NODE_ENV !== "production") {
          console.warn("[orders] supabase update failed:", error.message);
        }
      }
      // Return the freshest copy from DB.
      const fresh = await getOrder(moid);
      if (fresh) return fresh;
    } catch {
      /* DB unreachable — fall back to in-memory copy */
    }
  }
  return store.get(moid);
}

/**
 * Assign the next 호수 (unit number) for a branch. Units start at 101 and
 * increase by 1 per paid contract at that branch. Uses the current max in the
 * DB; falls back to the in-memory store when Supabase is unavailable.
 */
const UNIT_BASE = 100;

export async function assignUnitNo(branchId: string): Promise<number> {
  const sb = supa();
  if (sb) {
    try {
      const { data, error } = await sb
        .from("orders")
        .select("unit_no")
        .eq("branch_id", branchId)
        .not("unit_no", "is", null)
        .order("unit_no", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!error && data && typeof (data as { unit_no: number }).unit_no === "number") {
        return (data as { unit_no: number }).unit_no + 1;
      }
      if (!error) return UNIT_BASE + 1;
    } catch {
      /* DB unreachable — fall back to in-memory max */
    }
  }
  // In-memory fallback: max unitNo for this branch + 1.
  let max = UNIT_BASE;
  for (const o of store.values()) {
    if (o.branchId === branchId && typeof o.unitNo === "number" && o.unitNo > max) {
      max = o.unitNo;
    }
  }
  return max + 1;
}

/** Admin: list recent orders (Supabase only). Empty when DB unavailable. */
export async function listOrders(limit = 200): Promise<Order[]> {
  const sb = supa();
  if (!sb) return [];
  try {
    const { data, error } = await sb
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error || !data) return [];
    return (data as OrderRow[]).map(rowToOrder);
  } catch {
    return [];
  }
}

/**
 * A single buyer's paid orders, filtered in the DB so /me pages transfer only
 * the user's rows instead of pulling 200 and filtering in JS. Email match is
 * case-insensitive. Empty when DB unavailable.
 */
export async function listPaidOrdersByEmail(email: string): Promise<Order[]> {
  const sb = supa();
  if (!sb || !email) return [];
  try {
    const { data, error } = await sb
      .from("orders")
      .select("*")
      .eq("status", "paid")
      .ilike("buyer_email", email)
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return (data as OrderRow[]).map(rowToOrder);
  } catch {
    return [];
  }
}
