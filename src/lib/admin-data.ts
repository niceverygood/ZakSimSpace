/**
 * Mock operator/admin data. Wire to API once back-office is ready.
 */

export const adminStats = {
  totalBranches: 180,
  activeMembers: 12420,
  monthlyRevenue: 298_400_000,
  pendingTickets: 7,
  mailToday: 142,
  approvalRate: 98.4,
};

export type AdminBranch = {
  id: string;
  name: string;
  region: string;
  occupancy: number;
  status: "active" | "preparing" | "paused";
  manager: string;
};

export const adminBranches: AdminBranch[] = [
  { id: "seoul-gangseo", name: "서울 강서구 직영점", region: "서울", occupancy: 92, status: "active", manager: "박지훈" },
  { id: "wonju", name: "강원 원주 직영점", region: "강원", occupancy: 76, status: "active", manager: "이서연" },
  { id: "cheongju-sangdang", name: "청주 상당구 직영점", region: "충북", occupancy: 41, status: "active", manager: "김도원" },
  { id: "busan-suyeong", name: "부산 수영 직영점", region: "부산", occupancy: 88, status: "active", manager: "정민호" },
  { id: "ulsan-nam", name: "울산 남구 직영점", region: "울산", occupancy: 0, status: "preparing", manager: "한지수" },
  { id: "seoul-hongdae", name: "서울 홍대 직영점", region: "서울", occupancy: 0, status: "paused", manager: "최예린" },
];

export type AdminMember = {
  id: string;
  name: string;
  email: string;
  joinedAt: string;
  contracts: number;
  status: "active" | "dormant" | "ended";
};

export const adminMembers: AdminMember[] = [
  { id: "U-10234", name: "한승수", email: "niceverygood1@gmail.com", joinedAt: "2025-09-22", contracts: 2, status: "active" },
  { id: "U-10233", name: "박세영", email: "park.sy@example.com", joinedAt: "2024-08-04", contracts: 1, status: "active" },
  { id: "U-10232", name: "김도윤", email: "doyoun.k@example.com", joinedAt: "2026-02-14", contracts: 1, status: "active" },
  { id: "U-10231", name: "이수민", email: "sumin.lee@example.com", joinedAt: "2025-05-11", contracts: 1, status: "active" },
  { id: "U-10230", name: "정지원", email: "jw.jung@example.com", joinedAt: "2022-11-30", contracts: 0, status: "dormant" },
];

export type AdminMailLog = {
  id: string;
  arrivedAt: string;
  branch: string;
  sender: string;
  member: string;
  state: "received" | "scanned" | "forwarded";
};

export const adminMailLogs: AdminMailLog[] = [
  { id: "ML-26-0524-01", arrivedAt: "2026-05-24 11:32", branch: "서울 강서구", sender: "강서세무서", member: "한승수", state: "scanned" },
  { id: "ML-26-0524-02", arrivedAt: "2026-05-24 10:18", branch: "강원 원주", sender: "원주시청", member: "박세영", state: "received" },
  { id: "ML-26-0523-08", arrivedAt: "2026-05-23 16:51", branch: "부산 수영", sender: "신한은행", member: "이수민", state: "forwarded" },
  { id: "ML-26-0523-07", arrivedAt: "2026-05-23 14:22", branch: "서울 강서구", sender: "국세청", member: "한승수", state: "scanned" },
  { id: "ML-26-0522-12", arrivedAt: "2026-05-22 09:14", branch: "충북 청주", sender: "쿠팡 비즈", member: "김도윤", state: "received" },
];

export type AdminPayment = {
  id: string;
  date: string;
  member: string;
  branch: string;
  amount: number;
  method: string;
  status: "settled" | "refunded" | "failed";
};

export const adminPayments: AdminPayment[] = [
  { id: "P-26-0514-22", date: "2026-05-14", member: "한승수", branch: "서울 강서구", amount: 24000, method: "신한카드", status: "settled" },
  { id: "P-26-0514-21", date: "2026-05-14", member: "박세영", branch: "서울 신촌", amount: 240000, method: "토스페이먼츠", status: "settled" },
  { id: "P-26-0512-08", date: "2026-05-12", member: "이수민", branch: "화성 반송", amount: 24000, method: "현대카드", status: "settled" },
  { id: "P-26-0510-03", date: "2026-05-10", member: "정지원", branch: "서울 구로구", amount: 24000, method: "신한카드", status: "failed" },
  { id: "P-26-0508-11", date: "2026-05-08", member: "한승수", branch: "강원 원주", amount: 240000, method: "토스페이먼츠", status: "settled" },
];

export type AdminTicket = {
  id: string;
  openedAt: string;
  member: string;
  subject: string;
  priority: "high" | "normal" | "low";
  status: "open" | "in-progress" | "resolved";
};

export const adminTickets: AdminTicket[] = [
  { id: "T-2603", openedAt: "2026-05-24 09:11", member: "박세영", subject: "사업자등록 반려, 재신청 도움 요청", priority: "high", status: "in-progress" },
  { id: "T-2602", openedAt: "2026-05-23 17:32", member: "김도윤", subject: "우편물 표지 스캔이 안 보입니다", priority: "normal", status: "open" },
  { id: "T-2601", openedAt: "2026-05-23 14:08", member: "이수민", subject: "지점 이전 신청 절차 안내 요청", priority: "normal", status: "open" },
  { id: "T-2600", openedAt: "2026-05-22 10:44", member: "한승수", subject: "세금계산서 사업자번호 변경 요청", priority: "low", status: "resolved" },
];
