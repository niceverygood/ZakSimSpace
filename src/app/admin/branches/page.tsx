import { adminBranches } from "@/lib/admin-data";
import { AdminTable } from "../AdminTable";

export default function AdminBranchesPage() {
  const rows = adminBranches.map((b) => ({
    id: b.id,
    cells: [
      <span key="id" className="text-[12px] text-ink-400 tnum">{b.id}</span>,
      <span key="name" className="font-bold text-white">{b.name}</span>,
      b.region,
      `${b.manager}`,
      `${b.occupancy}%`,
      <Status key="s" status={b.status} />,
    ],
  }));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-[22px] lg:text-[26px] font-extrabold text-white">지점 관리</h1>
        <p className="text-[13px] text-ink-400 mt-1">총 {adminBranches.length}개 지점 · 활성/준비/일시정지</p>
      </header>
      <AdminTable
        headers={["ID", "지점명", "지역", "담당 매니저", "임대율", "상태"]}
        rows={rows}
      />
    </div>
  );
}

function Status({ status }: { status: "active" | "preparing" | "paused" }) {
  const map = {
    active: { l: "운영", c: "bg-sage-600/20 text-sage-300 border-sage-600/40" },
    preparing: { l: "준비", c: "bg-amber-500/20 text-amber-300 border-amber-500/40" },
    paused: { l: "정지", c: "bg-ink-700 text-ink-400 border-ink-700" },
  } as const;
  const s = map[status];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${s.c}`}>
      {s.l}
    </span>
  );
}
