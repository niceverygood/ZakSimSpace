import Link from "next/link";
import { adminPayments } from "@/lib/admin-data";
import { formatKRW } from "@/lib/contract-data";
import { listOrders, type Order } from "@/lib/orders";
import { AdminTable } from "../AdminTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const STATUS_LABEL: Record<Order["status"], { l: string; c: string }> = {
  paid: { l: "결제완료", c: "bg-navy-600/20 text-navy-300 border-navy-600/40" },
  created: { l: "진행중", c: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
  canceled: { l: "취소", c: "bg-ink-700 text-ink-400 border-ink-700" },
  failed: { l: "실패", c: "bg-rose-500/20 text-rose-300 border-rose-500/40" },
};

export default async function AdminPaymentsPage() {
  const orders = await listOrders();
  const live = orders.length > 0;

  if (live) {
    const rows = orders.map((o) => ({
      id: o.moid,
      cells: [
        <span key="id" className="text-[12px] text-ink-400 tnum">
          {o.moid}
        </span>,
        <span key="d" className="tnum text-ink-300">
          {o.createdAt.slice(0, 10)}
        </span>,
        <span key="m" className="font-bold text-white">
          {o.buyerName || "—"}
        </span>,
        <span key="b" className="text-ink-300">
          {o.branchName || "—"}
        </span>,
        <span key="u" className="tnum text-navy-300 font-bold">
          {o.unitNo ? `${o.unitNo}호` : "—"}
        </span>,
        <span key="a" className="tnum font-extrabold text-white">
          {formatKRW(o.amount)}
        </span>,
        <span key="card" className="text-ink-300">
          {o.cardName || "카드"}
        </span>,
        <OrderStatus key="s" status={o.status} />,
        o.status === "paid" ? (
          <Link
            key="c"
            href={`/contract/${o.moid}`}
            target="_blank"
            className="text-navy-300 hover:text-navy-200 underline underline-offset-2 text-[12px]"
          >
            계약서
          </Link>
        ) : (
          <span key="c" className="text-ink-600">
            —
          </span>
        ),
      ],
    }));
    const total = orders
      .filter((o) => o.status === "paid")
      .reduce((s, o) => s + o.amount, 0);

    return (
      <div className="space-y-6">
        <header className="flex items-end justify-between">
          <div>
            <h1 className="text-[22px] lg:text-[26px] font-extrabold text-white">
              결제 · 정산
            </h1>
            <p className="text-[13px] text-ink-400 mt-1">
              최근 {orders.length}건 · 결제완료 합계 {formatKRW(total)}
            </p>
          </div>
          <LiveBadge live />
        </header>
        <AdminTable
          headers={["주문번호", "일자", "구매자", "지점", "호수", "금액", "카드", "상태", "계약서"]}
          rows={rows}
        />
      </div>
    );
  }

  // Fallback: mock until real NicePay orders accumulate.
  const rows = adminPayments.map((p) => ({
    id: p.id,
    cells: [
      <span key="id" className="text-[12px] text-ink-400 tnum">
        {p.id}
      </span>,
      <span key="d" className="tnum text-ink-300">
        {p.date}
      </span>,
      <span key="m" className="font-bold text-white">
        {p.member}
      </span>,
      p.branch,
      <span
        key="months"
        className="inline-flex items-center rounded-full bg-navy-600/20 border border-navy-600/40 text-navy-300 px-2 py-0.5 text-[11px] font-bold tnum"
      >
        {p.months}개월
      </span>,
      <span key="a" className="tnum font-extrabold text-white">
        {formatKRW(p.amount)}
      </span>,
      p.method,
      <MockStatus key="s" status={p.status} />,
    ],
  }));
  const total = adminPayments
    .filter((p) => p.status === "settled")
    .reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-[22px] lg:text-[26px] font-extrabold text-white">
            결제 · 정산
          </h1>
          <p className="text-[13px] text-ink-400 mt-1">
            최근 {adminPayments.length}건 · 정산 완료 합계 {formatKRW(total)}
          </p>
        </div>
        <LiveBadge live={false} />
      </header>
      <AdminTable
        headers={[
          "ID",
          "일자",
          "회원",
          "지점",
          "계약 개월수",
          "금액",
          "결제 수단",
          "상태",
        ]}
        rows={rows}
      />
    </div>
  );
}

function OrderStatus({ status }: { status: Order["status"] }) {
  const s = STATUS_LABEL[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${s.c}`}
    >
      {s.l}
    </span>
  );
}

function MockStatus({ status }: { status: "settled" | "refunded" | "failed" }) {
  const map = {
    settled: { l: "정산", c: "bg-navy-600/20 text-navy-300 border-navy-600/40" },
    refunded: { l: "환불", c: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
    failed: { l: "실패", c: "bg-rose-500/20 text-rose-300 border-rose-500/40" },
  } as const;
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${s.c}`}
    >
      {s.l}
    </span>
  );
}

function LiveBadge({ live }: { live: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${
        live
          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
          : "bg-amber-500/20 text-amber-300 border-amber-500/40"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${live ? "bg-emerald-400" : "bg-amber-400"}`}
      />
      {live ? "실 결제 데이터" : "Mock 데이터"}
    </span>
  );
}
