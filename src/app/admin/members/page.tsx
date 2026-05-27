import { adminMembers, type AdminMember } from "@/lib/admin-data";
import { db, tryLive } from "@/lib/db";
import type { MemberRow } from "@/types/database";
import { AdminTable } from "../AdminTable";

export const dynamic = "force-dynamic";

function liveToAdminMember(m: MemberRow): AdminMember {
  return {
    id: m.display_id ?? m.id.slice(0, 8),
    name: m.name,
    email: m.email ?? "—",
    joinedAt: m.joined_at?.slice(0, 10) ?? "—",
    contracts: 0, // 별도 join 시 채워질 값. 일단 0.
    status:
      m.status === "active" ? "active" : m.status === "dormant" ? "dormant" : "ended",
  };
}

export default async function AdminMembersPage() {
  const { data: members, source } = await tryLive<AdminMember[]>(
    async () => (await db.members.list()).map(liveToAdminMember),
    adminMembers,
  );

  const rows = members.map((m) => ({
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
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-[22px] lg:text-[26px] font-extrabold text-white">
            회원 관리
          </h1>
          <p className="text-[13px] text-ink-400 mt-1">
            총 {members.length}명 · 최근 가입순
          </p>
        </div>
        <SourceBadge source={source} />
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

function SourceBadge({ source }: { source: "live" | "mock" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${
        source === "live"
          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
          : "bg-amber-500/20 text-amber-300 border-amber-500/40"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${source === "live" ? "bg-emerald-400" : "bg-amber-400"}`}
      />
      {source === "live" ? "Supabase 라이브" : "Mock 데이터"}
    </span>
  );
}
