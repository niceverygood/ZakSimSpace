import "server-only";
import { cookies } from "next/headers";
import { listOrders, type Order } from "@/lib/orders";
import { createClient, isSupabaseConfigured } from "@/utils/supabase/server";

export type MeUser = { email: string; name: string };

/** Signed-in user's email + display name, or null when not authenticated. */
export async function meUser(): Promise<MeUser | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = createClient(await cookies());
  const { data } = await supabase.auth.getUser();
  const u = data.user;
  if (!u?.email) return null;
  const meta = (u.user_metadata ?? {}) as Record<string, unknown>;
  const name =
    (typeof meta.name === "string" && meta.name) ||
    (typeof meta.full_name === "string" && meta.full_name) ||
    u.email.split("@")[0];
  return { email: u.email, name };
}

/** Paid orders belonging to the signed-in user (matched by buyer email). */
export async function myPaidOrders(): Promise<Order[]> {
  const u = await meUser();
  if (!u) return [];
  const orders = await listOrders();
  return orders.filter(
    (o) => o.status === "paid" && o.buyerEmail.toLowerCase() === u.email.toLowerCase(),
  );
}
