import { adminPayments } from "@/lib/admin-data";
import { formatKRW } from "@/lib/contract-data";
import { AdminTable } from "../AdminTable";

export default function AdminPaymentsPage() {
  const rows = adminPayments.map((p) => ({
    id: p.id,
    cells: [
      <span key="id" className="text-[12px] text-ink-400 tnum">{p.id}</span>,
      <span key="d" className="tnum text-ink-300">{p.date}</span>,
      <span key="m" className="font-bold text-white">{p.member}</span>,
      p.branch,
      <span key="a" className="tnum font-extrabold text-white">{formatKRW(p.amount)}</span>,
      p.method,
      <Status key="s" status={p.status} />,
    ],
  }));
  const total = adminPayments
    .filter((p) => p.status === "settled")
    .reduce((s, p) => s + p.amount, 0);
  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-[22px] lg:text-[26px] font-extrabold text-white">결제 · 정산</h1>
          <p className="text-[13px] text-ink-400 mt-1">최근 {adminPayments.length}건 · 정산 완료 합계 {formatKRW(total)}</p>
        </div>
      </header>
      <AdminTable
        headers={["ID", "일자", "회원", "지점", "금액", "결제 수단", "상태"]}
        rows={rows}
      />
    </div>
  );
}

function Status({ status }: { status: "settled" | "refunded" | "failed" }) {
  const map = {
    settled: { l: "정산", c: "bg-navy-600/20 text-navy-300 border-navy-600/40" },
    refunded: { l: "환불", c: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
    failed: { l: "실패", c: "bg-rose-500/20 text-rose-300 border-rose-500/40" },
  } as const;
  const s = map[status];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${s.c}`}>
      {s.l}
    </span>
  );
}
