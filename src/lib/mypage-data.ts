/**
 * Mock mypage data. Swap with real API once available.
 */

export type ContractStatus = "active" | "pending" | "ended";

export type UserContract = {
  id: string;
  branchId: string;
  branchName: string;
  address: string;
  startDate: string;
  endDate: string;
  cycle: "yearly" | "monthly";
  monthlyPrice: number;
  status: ContractStatus;
  autoRenew: boolean;
};

export const userContracts: UserContract[] = [
  {
    id: "C-26-1014",
    branchId: "seoul-gangseo",
    branchName: "서울 강서구 직영점",
    address: "서울 강서구 강서로 454 401",
    startDate: "2026-01-14",
    endDate: "2027-01-13",
    cycle: "yearly",
    monthlyPrice: 24000,
    status: "active",
    autoRenew: true,
  },
  {
    id: "C-25-0922",
    branchId: "wonju",
    branchName: "강원 원주 직영점",
    address: "강원특별자치도 원주시 황금로 2 403",
    startDate: "2025-09-22",
    endDate: "2026-09-21",
    cycle: "yearly",
    monthlyPrice: 24000,
    status: "active",
    autoRenew: false,
  },
  {
    id: "C-25-0511",
    branchId: "seoul-sinchon",
    branchName: "서울 신촌 직영점",
    address: "서울 서대문구 이화여대7길 37 3층",
    startDate: "2024-05-11",
    endDate: "2025-05-10",
    cycle: "yearly",
    monthlyPrice: 24000,
    status: "ended",
    autoRenew: false,
  },
];

export type MailItem = {
  id: string;
  arrivedAt: string;
  sender: string;
  category: "tax" | "gov" | "bank" | "other";
  branch: string;
  scanned: boolean;
  forwarded: boolean;
};

export const mailItems: MailItem[] = [
  {
    id: "M-1042",
    arrivedAt: "2026-05-24 11:32",
    sender: "강서세무서",
    category: "tax",
    branch: "서울 강서구 직영점",
    scanned: true,
    forwarded: false,
  },
  {
    id: "M-1041",
    arrivedAt: "2026-05-22 09:14",
    sender: "국세청",
    category: "gov",
    branch: "강원 원주 직영점",
    scanned: true,
    forwarded: false,
  },
  {
    id: "M-1037",
    arrivedAt: "2026-05-18 16:48",
    sender: "신한은행",
    category: "bank",
    branch: "서울 강서구 직영점",
    scanned: false,
    forwarded: true,
  },
  {
    id: "M-1031",
    arrivedAt: "2026-05-11 13:02",
    sender: "강서구청",
    category: "gov",
    branch: "서울 강서구 직영점",
    scanned: true,
    forwarded: false,
  },
  {
    id: "M-1024",
    arrivedAt: "2026-05-04 10:21",
    sender: "택배 (CJ대한통운)",
    category: "other",
    branch: "강원 원주 직영점",
    scanned: false,
    forwarded: true,
  },
];

export const mailCategoryLabels: Record<MailItem["category"], string> = {
  tax: "세무",
  gov: "관공서",
  bank: "금융",
  other: "기타",
};

export type BillingItem = {
  id: string;
  date: string;
  description: string;
  amount: number;
  method: string;
  status: "paid" | "refunded" | "failed";
};

export const billingHistory: BillingItem[] = [
  {
    id: "B-26-0514",
    date: "2026-05-14",
    description: "서울 강서구 직영점 · 월 이용료",
    amount: 24000,
    method: "신한카드 1234",
    status: "paid",
  },
  {
    id: "B-26-0508",
    date: "2026-05-08",
    description: "강원 원주 직영점 · 연간 이용료",
    amount: 240000,
    method: "토스페이먼츠 간편결제",
    status: "paid",
  },
  {
    id: "B-26-0414",
    date: "2026-04-14",
    description: "서울 강서구 직영점 · 월 이용료",
    amount: 24000,
    method: "신한카드 1234",
    status: "paid",
  },
  {
    id: "B-26-0314",
    date: "2026-03-14",
    description: "서울 강서구 직영점 · 월 이용료",
    amount: 24000,
    method: "신한카드 1234",
    status: "paid",
  },
  {
    id: "B-25-0510",
    date: "2025-05-10",
    description: "서울 신촌 직영점 · 잔여 일할 환불",
    amount: -36500,
    method: "신한카드 1234",
    status: "refunded",
  },
];

export type Invoice = {
  id: string;
  issuedAt: string;
  amount: number;
  buyer: string;
  status: "issued" | "draft";
};

export const invoices: Invoice[] = [
  {
    id: "TI-26-0514",
    issuedAt: "2026-05-14",
    amount: 24000,
    buyer: "주식회사 작심상사",
    status: "issued",
  },
  {
    id: "TI-26-0508",
    issuedAt: "2026-05-08",
    amount: 240000,
    buyer: "주식회사 작심상사",
    status: "issued",
  },
  {
    id: "TI-26-0414",
    issuedAt: "2026-04-14",
    amount: 24000,
    buyer: "주식회사 작심상사",
    status: "issued",
  },
  {
    id: "TI-26-0314",
    issuedAt: "2026-03-14",
    amount: 24000,
    buyer: "주식회사 작심상사",
    status: "issued",
  },
];

export type PaymentMethod = {
  id: string;
  brand: string;
  last4: string;
  isDefault: boolean;
  expiry: string;
};

export const paymentMethods: PaymentMethod[] = [
  {
    id: "PM-01",
    brand: "신한카드",
    last4: "1234",
    isDefault: true,
    expiry: "12/29",
  },
  {
    id: "PM-02",
    brand: "현대카드",
    last4: "5678",
    isDefault: false,
    expiry: "08/27",
  },
];

export const currentUser = {
  name: "한승수",
  email: "niceverygood1@gmail.com",
  company: "주식회사 작심상사",
  joinedAt: "2025-09-22",
};
