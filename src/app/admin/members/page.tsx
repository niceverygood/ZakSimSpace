import { adminMembers } from "@/lib/admin-data";
import { AdminTable } from "../AdminTable";

export default function AdminMembersPage() {
  const rows = adminMembers.map((m) => ({
    id: m.id,
    cells: [
      <span key="id" className="text-[12px] text-ink-400 tnum">{m.id}</span>,
      <span key="name" className="font-bold text-white">{m.name}</span>,
      <span key="e" className="text-ink-300 text-[12.5px]">{m.email}</span>,
      <span key="d" className="tnum text-ink-300">{m.joinedAt}</span>,
      `${m.contracts}건`,
      <Status key="s" status={m.status} />,
    ],
  }));
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-[22px] lg:text-[26px] font-extrabold text-white">회원 관리</h1>
        <p className="text-[13px] text-ink-400 mt-1">총 {adminMembers.length}명 · 최근 가입순</p>
      </header>
      <AdminTable
        headers={["ID", "이름", "이메일", "가입일", "계약 수", "상태"]}
        rows={rows}
      />
    </div>
  );
}

function Status({ status }: { status: "active" | "dormant" | "ended" }) {
  const map = {
    active: { l: "활성", c: "bg-navy-600/20 text-navy-300 border-navy-600/40" },
    dormant: { l: "휴면", c: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
    ended: { l: "탈퇴", c: "bg-ink-700 text-ink-400 border-ink-700" },
  } as const;
  const s = map[status];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${s.c}`}>
      {s.l}
    </span>
  );
}
