/**
 * Order store. Demo uses in-memory Map — replace with a real database for
 * production. Orders are keyed by the merchant order ID (Moid) we send to
 * NicePay so we can validate the approved amount on the callback.
 */

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

// Module-level Map persists across requests within a single Node process.
// On Vercel's serverless functions each invocation may get a fresh module,
// so this is strictly a demo. Replace with Prisma/Postgres/etc. for prod.
const store = new Map<string, Order>();

export function generateMoid(): string {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ZS${y}${m}${d}-${rand}`;
}

export function createOrder(
  data: Omit<Order, "status" | "createdAt" | "moid"> & { moid?: string },
): Order {
  const moid = data.moid ?? generateMoid();
  const order: Order = {
    ...data,
    moid,
    status: "created",
    createdAt: new Date().toISOString(),
  };
  store.set(moid, order);
  return order;
}

export function getOrder(moid: string): Order | undefined {
  return store.get(moid);
}

export function updateOrder(moid: string, patch: Partial<Order>): Order | undefined {
  const cur = store.get(moid);
  if (!cur) return undefined;
  const next = { ...cur, ...patch };
  store.set(moid, next);
  return next;
}
