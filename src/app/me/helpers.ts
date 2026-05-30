import { formatKRW } from "@/lib/contract-data";
import type { Order } from "@/lib/orders";

export function formatKRWfromMypage(n: number): string {
  return formatKRW(n);
}

/** Contract length in months, inferred from cycle when not explicit. */
export function monthsOf(o: Order): number {
  return o.months ?? (o.cycle === "yearly" ? 12 : 1);
}
