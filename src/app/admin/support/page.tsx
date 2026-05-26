import { adminTickets } from "@/lib/admin-data";
import { AdminTable } from "../AdminTable";

export default function AdminSupportPage() {
  const rows = adminTickets.map((t) => ({
    id: t.id,
    cells: [
      <span key="id" className="text-[12px] text-ink-400 tnum">{t.id}</span>,
      <span key="o" className="tnum text-ink-300">{t.openedAt}</span>,
      <span key="m" className="font-bold text-white">{t.member}</span>,
      <span key="s" className="text-ink-200">{t.subject}</span>,
      <Priority key="p" p={t.priority} />,
      <Status key="st" s={t.status} />,
    ],
  }));
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-[22px] lg:text-[26px] font-extrabold text-white">고객 문의</h1>
        <p className="text-[13px] text-ink-400 mt-1">총 {adminTickets.length}건 · 최근 접수순</p>
      </header>
      <AdminTable
        headers={["ID", "접수", "회원", "제목", "우선순위", "상태"]}
        rows={rows}
      />
    </div>
  );
}

function Priority({ p }: { p: "high" | "normal" | "low" }) {
  const cls =
    p === "high"
      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
      : p === "normal"
        ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
        : "bg-ink-700 text-ink-400 border-ink-700";
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${cls}`}>
      {p === "high" ? "긴급" : p === "normal" ? "일반" : "낮음"}
    </span>
  );
}

function Status({ s }: { s: "open" | "in-progress" | "resolved" }) {
  const map = {
    open: { l: "접수", c: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
    "in-progress": { l: "응대중", c: "bg-blue-500/20 text-blue-300 border-blue-500/40" },
    resolved: { l: "완료", c: "bg-sage-600/20 text-sage-300 border-sage-600/40" },
  } as const;
  const o = map[s];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${o.c}`}>
      {o.l}
    </span>
  );
}
