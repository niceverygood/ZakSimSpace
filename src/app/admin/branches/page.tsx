import { AdminTable } from "../AdminTable";
import { loadBranches } from "@/lib/branches-loader";
import { sheetsConfigured } from "@/lib/sheets";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminBranchesPage() {
  const branches = await loadBranches();
  const live = sheetsConfigured() && branches.length > 12;

  const rows = branches.map((b) => ({
    id: b.id,
    cells: [
      <span key="name" className="font-bold text-white">
        {b.name}
      </span>,
      <span key="region" className="text-ink-300">
        {b.region || "—"}
      </span>,
      <span key="addr" className="text-ink-400 text-[12px]">
        {b.address || "—"}
      </span>,
      <Congestion key="c" congested={b.congested} />,
      <span key="insp" className="text-ink-300">
        {b.inspectable ? "가능" : "—"}
      </span>,
    ],
  }));

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-[22px] lg:text-[26px] font-extrabold text-white">
            지점 관리
          </h1>
          <p className="text-[13px] text-ink-400 mt-1">
            총 {branches.length}개 지점 · 운영중 기준
          </p>
        </div>
        <SourceBadge live={live} />
      </header>
      <AdminTable
        headers={["지점명", "지역", "주소", "과밀 여부", "실사"]}
        rows={rows}
      />
    </div>
  );
}

function Congestion({ congested }: { congested: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${
        congested
          ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
          : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
      }`}
    >
      {congested ? "과밀" : "비과밀"}
    </span>
  );
}

function SourceBadge({ live }: { live: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${
        live
          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
          : "bg-amber-500/20 text-amber-300 border-amber-500/40"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          live ? "bg-emerald-400" : "bg-amber-400"
        }`}
      />
      {live ? "구글시트 라이브" : "Mock 데이터"}
    </span>
  );
}
