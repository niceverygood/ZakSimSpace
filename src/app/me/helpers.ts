export {
  userContracts,
  mailItems,
  mailCategoryLabels,
  billingHistory,
  invoices,
  paymentMethods,
  currentUser,
} from "@/lib/mypage-data";

import { formatKRW } from "@/lib/contract-data";

export function formatKRWfromMypage(n: number): string {
  return formatKRW(n);
}

export function statusLabel(s: "active" | "pending" | "ended"): {
  label: string;
  tone: "green" | "amber" | "gray";
} {
  if (s === "active") return { label: "이용 중", tone: "green" };
  if (s === "pending") return { label: "심사 중", tone: "amber" };
  return { label: "종료", tone: "gray" };
}
