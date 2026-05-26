import Link from "next/link";
import {
  Building,
  Users,
  Wallet,
  Mail,
  AlertCircle,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import {
  adminStats,
  adminTickets,
  adminBranches,
} from "@/lib/admin-data";
import { formatKRW } from "@/lib/contract-data";

export default function AdminHome() {
  const openTickets = adminTickets.filter((t) => t.status !== "resolved");
  const preparing = adminBranches.filter((b) => b.status === "preparing");

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-[24px] lg:text-[28px] font-extrabold text-white">
          오늘의 운영 현황
        </h1>
        <p className="text-[13.5px] text-ink-400 mt-1">
          2026년 5월 26일 · 마지막 업데이트 방금 전
        </p>
      </header>

      {/* KPIs */}
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Kpi icon={Building} label="활성 지점" value={`${adminStats.totalBranches}개`} delta="+12 이번 분기" />
        <Kpi icon={Users} label="활성 회원" value={adminStats.activeMembers.toLocaleString()} delta="+420 이번 달" />
        <Kpi icon={Wallet} label="이번 달 매출" value={formatKRW(adminStats.monthlyRevenue)} delta="+8.2% MoM" />
        <Kpi icon={Mail} label="오늘 도착 우편물" value={`${adminStats.mailToday}건`} delta="평균 대비 +18%" />
        <Kpi icon={AlertCircle} label="대기 중인 문의" value={`${adminStats.pendingTickets}건`} delta="우선 처리 필요" tone="warn" />
        <Kpi icon={TrendingUp} label="사업자등록 승인률" value={`${adminStats.approvalRate}%`} delta="목표 98% 초과" />
      </ul>

      {/* Tickets */}
      <Panel
        title="처리 대기 중인 문의"
        link={{ href: "/admin/support", label: "전체 문의" }}
      >
        <ul className="divide-y divide-ink-700/60">
          {openTickets.map((t) => (
            <li key={t.id} className="flex items-center justify-between gap-4 py-3.5">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10.5px] font-bold text-ink-400 tnum">{t.id}</span>
                  <Priority p={t.priority} />
                </div>
                <p className="text-[13.5px] text-white font-semibold">{t.subject}</p>
                <p className="text-[11.5px] text-ink-400 mt-0.5">{t.member} · {t.openedAt}</p>
              </div>
              <Link
                href="/admin/support"
                className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-full bg-navy-600 hover:bg-navy-700 text-white h-9 px-4 text-[12.5px] font-semibold"
              >
                응대
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </Link>
            </li>
          ))}
        </ul>
      </Panel>

      {/* Preparing branches */}
      {preparing.length > 0 && (
        <Panel
          title="오픈 준비 중인 지점"
          link={{ href: "/admin/branches", label: "전체 지점" }}
        >
          <ul className="grid sm:grid-cols-2 gap-3">
            {preparing.map((b) => (
              <li
                key={b.id}
                className="rounded-xl border border-ink-700/60 bg-ink-900 p-4"
              >
                <p className="text-[14px] font-bold text-white">{b.name}</p>
                <p className="text-[11.5px] text-ink-400 mt-1">담당 매니저 {b.manager}</p>
                <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 text-[10.5px] font-bold">
                  준비 중
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      )}
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  delta,
  tone,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  delta: string;
  tone?: "warn";
}) {
  return (
    <li className="rounded-xl border border-ink-700/60 bg-ink-900 p-5">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={
            tone === "warn"
              ? "w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center"
              : "w-9 h-9 rounded-lg bg-navy-600/20 border border-navy-600/40 flex items-center justify-center"
          }
        >
          <Icon
            className={tone === "warn" ? "w-4 h-4 text-amber-300" : "w-4 h-4 text-navy-300"}
            strokeWidth={2}
          />
        </div>
        <p className="text-[11.5px] text-ink-400 font-semibold">{label}</p>
      </div>
      <p className="text-[22px] font-extrabold text-white tnum">{value}</p>
      <p className="text-[11.5px] text-ink-400 mt-1">{delta}</p>
    </li>
  );
}

function Panel({
  title,
  link,
  children,
}: {
  title: string;
  link?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-ink-700/60 bg-ink-900 p-5 lg:p-6">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-extrabold text-white">{title}</h2>
        {link && (
          <Link href={link.href} className="text-[12.5px] text-ink-400 hover:text-white">
            {link.label} →
          </Link>
        )}
      </header>
      {children}
    </section>
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
    <span
      className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-bold ${cls}`}
    >
      {p === "high" ? "긴급" : p === "normal" ? "일반" : "낮음"}
    </span>
  );
}
