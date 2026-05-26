import { adminMailLogs } from "@/lib/admin-data";
import { AdminTable } from "../AdminTable";

export default function AdminMailPage() {
  const rows = adminMailLogs.map((m) => ({
    id: m.id,
    cells: [
      <span key="id" className="text-[12px] text-ink-400 tnum">{m.id}</span>,
      <span key="t" className="tnum text-ink-300">{m.arrivedAt}</span>,
      m.branch,
      m.sender,
      <span key="m" className="font-bold text-white">{m.member}</span>,
      <State key="s" state={m.state} />,
    ],
  }));
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-[22px] lg:text-[26px] font-extrabold text-white">우편물 로그</h1>
        <p className="text-[13px] text-ink-400 mt-1">최근 도착한 {adminMailLogs.length}건</p>
      </header>
      <AdminTable
        headers={["ID", "도착 시간", "지점", "발송 기관", "수신 회원", "상태"]}
        rows={rows}
      />
    </div>
  );
}

function State({ state }: { state: "received" | "scanned" | "forwarded" }) {
  const map = {
    received: { l: "도착", c: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
    scanned: { l: "스캔", c: "bg-sage-600/20 text-sage-300 border-sage-600/40" },
    forwarded: { l: "발송", c: "bg-blue-500/20 text-blue-300 border-blue-500/40" },
  } as const;
  const s = map[state];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${s.c}`}>
      {s.l}
    </span>
  );
}
