import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  CreditCard,
  FileText,
  ArrowRight,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import {
  userContracts,
  mailItems,
  billingHistory,
  formatKRWfromMypage,
} from "./helpers";

export const metadata: Metadata = { title: "마이페이지" };

export default function MyPage() {
  const active = userContracts.filter((c) => c.status === "active");
  const recentMail = mailItems.slice(0, 3);
  const recentBilling = billingHistory.slice(0, 3);
  const monthlyTotal = active.reduce((sum, c) => sum + c.monthlyPrice, 0);

  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard
          icon={FileText}
          label="이용 중인 지점"
          value={`${active.length}곳`}
          link={{ href: "/me/contracts", label: "계약 보기" }}
        />
        <StatCard
          icon={CreditCard}
          label="이번 달 청구액"
          value={formatKRWfromMypage(monthlyTotal)}
          link={{ href: "/me/billing", label: "결제 내역" }}
        />
        <StatCard
          icon={Mail}
          label="대기 중인 우편물"
          value={`${mailItems.length}건`}
          link={{ href: "/me/mail", label: "우편물 보기" }}
        />
      </div>

      {/* Two-col panels */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Active contracts */}
        <Panel
          title="이용 중인 계약"
          actionHref="/me/contracts"
          actionLabel="전체 보기"
        >
          <ul className="space-y-3">
            {active.map((c) => (
              <li
                key={c.id}
                className="rounded-2xl border border-cream-200 p-4 flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-[14px] font-bold text-ink-900">
                    {c.branchName}
                  </p>
                  <p className="text-[12px] text-ink-500 mt-1 tnum">
                    {c.startDate} → {c.endDate}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    {c.autoRenew && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-sage-50 border border-sage-200 px-2 py-0.5 text-[10.5px] font-bold text-sage-700">
                        <CheckCircle2 className="w-2.5 h-2.5" strokeWidth={3} />
                        자동 갱신
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 rounded-full bg-cream-100 px-2 py-0.5 text-[10.5px] font-bold text-ink-600">
                      <Calendar className="w-2.5 h-2.5" strokeWidth={2.5} />
                      {c.cycle === "yearly" ? "연간" : "월간"}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/locations/${c.branchId}`}
                  aria-label={`${c.branchName} 지점 보기`}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-cream-50 hover:bg-cream-100 flex items-center justify-center text-ink-500"
                >
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                </Link>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Recent mail */}
        <Panel title="최근 우편물" actionHref="/me/mail" actionLabel="전체 보기">
          <ul className="space-y-2.5">
            {recentMail.map((m) => (
              <li
                key={m.id}
                className="rounded-2xl border border-cream-200 p-3.5 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-ink-900">
                    {m.sender}
                  </p>
                  <p className="text-[11.5px] text-ink-500 mt-0.5 tnum">
                    {m.arrivedAt} · {m.branch}
                  </p>
                </div>
                {m.scanned ? (
                  <span className="text-[10.5px] font-bold text-sage-700 bg-sage-50 border border-sage-200 px-2 py-0.5 rounded-full">
                    스캔 완료
                  </span>
                ) : m.forwarded ? (
                  <span className="text-[10.5px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    발송됨
                  </span>
                ) : (
                  <span className="text-[10.5px] font-bold text-ink-500 bg-cream-100 px-2 py-0.5 rounded-full">
                    보관 중
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Billing recent */}
      <Panel
        title="최근 결제"
        actionHref="/me/billing"
        actionLabel="전체 내역"
      >
        <ul className="divide-y divide-cream-200">
          {recentBilling.map((b) => (
            <li
              key={b.id}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-[13.5px] font-bold text-ink-900">
                  {b.description}
                </p>
                <p className="text-[11.5px] text-ink-500 mt-0.5 tnum">
                  {b.date} · {b.method}
                </p>
              </div>
              <p
                className={`text-[14.5px] font-extrabold tnum ${
                  b.amount < 0 ? "text-rose-500" : "text-ink-900"
                }`}
              >
                {b.amount < 0 ? "-" : ""}
                {formatKRWfromMypage(Math.abs(b.amount))}
              </p>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  link,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  link: { href: string; label: string };
}) {
  return (
    <div className="rounded-2xl bg-white border border-cream-200 p-5">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sage-50 border border-sage-200 flex items-center justify-center">
          <Icon className="w-4 h-4 text-sage-700" strokeWidth={2} />
        </div>
        <div>
          <p className="text-[11.5px] text-ink-400 font-semibold">{label}</p>
          <p className="text-[20px] font-extrabold text-ink-900 tnum">
            {value}
          </p>
        </div>
      </div>
      <Link
        href={link.href}
        className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-sage-700 hover:text-sage-800"
      >
        {link.label}
        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
      </Link>
    </div>
  );
}

function Panel({
  title,
  actionHref,
  actionLabel,
  children,
}: {
  title: string;
  actionHref?: string;
  actionLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl bg-white border border-cream-200 p-5 lg:p-6">
      <header className="flex items-center justify-between mb-4">
        <h2 className="text-[15.5px] font-extrabold text-ink-900">{title}</h2>
        {actionHref && actionLabel && (
          <Link
            href={actionHref}
            className="text-[12.5px] font-semibold text-ink-500 hover:text-ink-900"
          >
            {actionLabel} →
          </Link>
        )}
      </header>
      {children}
    </section>
  );
}
