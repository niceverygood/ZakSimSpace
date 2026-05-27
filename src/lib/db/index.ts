/**
 * Server-only DB query helpers. Read-only by default — write actions should
 * go through dedicated server actions or route handlers with auth checks.
 *
 * Usage in a server component:
 *   const branches = await db.branches.list();
 */

import "server-only";
import { cookies } from "next/headers";
import { createClient, isSupabaseConfigured } from "@/utils/supabase/server";
import type {
  BranchRow,
  ContractRow,
  MemberRow,
  PaymentRow,
  TicketRow,
} from "@/types/database";

async function client() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export const db = {
  available: () => isSupabaseConfigured(),

  branches: {
    async list(): Promise<BranchRow[]> {
      const supa = await client();
      const { data, error } = await supa.from("branches").select("*").order("name");
      if (error) throw error;
      return (data as BranchRow[]) ?? [];
    },
    async byId(id: string): Promise<BranchRow | null> {
      const supa = await client();
      const { data, error } = await supa
        .from("branches")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return (data as BranchRow) ?? null;
    },
  },

  members: {
    async list(limit = 100): Promise<MemberRow[]> {
      const supa = await client();
      const { data, error } = await supa
        .from("members")
        .select("*")
        .order("joined_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data as MemberRow[]) ?? [];
    },
  },

  contracts: {
    async list(limit = 200): Promise<ContractRow[]> {
      const supa = await client();
      const { data, error } = await supa
        .from("contracts")
        .select("*")
        .order("start_date", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data as ContractRow[]) ?? [];
    },
    async byMember(memberId: string): Promise<ContractRow[]> {
      const supa = await client();
      const { data, error } = await supa
        .from("contracts")
        .select("*")
        .eq("member_id", memberId)
        .order("start_date", { ascending: false });
      if (error) throw error;
      return (data as ContractRow[]) ?? [];
    },
    async expiringWithin(days: number): Promise<ContractRow[]> {
      const supa = await client();
      const cutoff = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10);
      const { data, error } = await supa
        .from("contracts")
        .select("*")
        .eq("status", "active")
        .lte("end_date", cutoff)
        .order("end_date");
      if (error) throw error;
      return (data as ContractRow[]) ?? [];
    },
  },

  payments: {
    async list(limit = 200): Promise<PaymentRow[]> {
      const supa = await client();
      const { data, error } = await supa
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data as PaymentRow[]) ?? [];
    },
    async monthlyRevenue(year: number, month: number): Promise<number> {
      const supa = await client();
      const start = `${year}-${String(month).padStart(2, "0")}-01`;
      const next = new Date(year, month, 1).toISOString().slice(0, 10);
      const { data, error } = await supa
        .from("payments")
        .select("amount")
        .eq("status", "settled")
        .gte("paid_at", start)
        .lt("paid_at", next);
      if (error) throw error;
      return (data ?? []).reduce(
        (sum: number, p: { amount: number }) => sum + p.amount,
        0,
      );
    },
  },

  tickets: {
    async open(limit = 100): Promise<TicketRow[]> {
      const supa = await client();
      const { data, error } = await supa
        .from("tickets")
        .select("*")
        .in("status", ["open", "in-progress"])
        .order("priority")
        .order("opened_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data as TicketRow[]) ?? [];
    },
    async all(limit = 200): Promise<TicketRow[]> {
      const supa = await client();
      const { data, error } = await supa
        .from("tickets")
        .select("*")
        .order("opened_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data as TicketRow[]) ?? [];
    },
  },
};

/**
 * Convenience: try to fetch from Supabase, fall back to mock data when env is
 * not configured. Use this from admin pages so the site never breaks during
 * the gradual migration.
 */
export async function tryLive<T>(
  liveFn: () => Promise<T>,
  fallback: T,
): Promise<{ data: T; source: "live" | "mock"; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { data: fallback, source: "mock" };
  }
  try {
    const data = await liveFn();
    // If Supabase returned an empty list, prefer the mock so demo screens stay
    // populated until real data is imported.
    if (Array.isArray(data) && data.length === 0) {
      return { data: fallback, source: "mock" };
    }
    return { data, source: "live" };
  } catch (e) {
    return {
      data: fallback,
      source: "mock",
      error: e instanceof Error ? e.message : String(e),
    };
  }
}
