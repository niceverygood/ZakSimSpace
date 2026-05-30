import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import {
  Mail,
  CreditCard,
  FileText,
  ArrowRight,
  Calendar,
  Inbox,
} from "lucide-react";
import { formatKRWfromMypage } from "./helpers";
import { formatKRW } from "@/lib/contract-data";
import { contractEndISO } from "@/lib/contract-template";
import { listOrders, type Order } from "@/lib/orders";
import { createClient, isSupabaseConfigured } from "@/utils/supabase/server";

export const metadata: Metadata = { title: "마이페이지" };
export const dynamic = "force-dynamic";

/** Paid orders 검색 by signed-in user's buyer email. */
async function myPaidOrders(): Promise<Order[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createClient(await cookies());
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email?.toLowerCase();
  if (!email) return [];
  const orders = await listOrders();
  return orders.filter(
    (o) => o.status === "paid" && o.buyerEmail.toLowerCase() === email,
  );
}

function monthsOf(o: Order): number {
  return o.months ?? (o.cycle === "yearly" ? 12 : 1);
}

export default async function MyPage() {
  const orders = await myPaidOrders();
  const recentContracts = orders.slice(0, 3);
  // 이번 달 청구액 = 이번 달에 결제 완료된 주문 합. authDate(yyyymmddhhmmss)
  // 또는 createdAt 기준.
  const now = new Date();
  const ymPrefix = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const thisMonth = orders
    .filter((o) => {
      const k = o.authDate
        ? `${o.authDate.slice(0, 4)}-${o.authDate.slice(4, 6)}`
        : o.createdAt.slice(0, 7);
      return k === ymPrefix;
    })
    .reduce((s, o) => s + o.amount, 0);

  return (
    <div className="space-y-6">
      {/* Top stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard
          icon={FileText}
          label="이용 중인 지점"
          value={`${orders.length}곳`}
          link={{ href: "/me/contracts", label: "계약 보기" }}
        />
        <StatCard
          icon={CreditCard}
          label="이번 달 결제 금액"
          value={formatKRWfromMypage(thisMonth)}
          link={{ href: "/me/billing", label: "결제 내역" }}
        />
        <StatCard
          icon={Mail}
          label="대기 중인 우편물"
          value="0건"
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
          {recentContracts.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="아직 계약이 없어요"
              hint="지점을 둘러보고 결제하면 여기에 계약이 표시돼요."
              ctaHref="/locations"
              ctaLabel="지점 둘러보기"
            />
          ) : (
            <ul className="space-y-3">
              {recentContracts.map((c) => {
                const m = monthsOf(c);
                const start = c.startDate || c.createdAt.slice(0, 10);
                const end = contractEndISO(start, m);
                return (
                  <li
                    key={c.moid}
                    className="rounded-2xl border border-cream-200 p-4 flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-[14px] font-bold text-ink-900">
                        {c.branchName}
                        {c.unitNo && (
                          <span className="ml-1.5 text-[12px] text-navy-600">
                            {c.unitNo}호
                          </span>
                        )}
                      </p>
                      <p className="text-[12px] text-ink-500 mt-1 tnum">
                        {start} → {end}
                      </p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-cream-100 px-2 py-0.5 text-[10.5px] font-bold text-ink-600">
                          <Calendar className="w-2.5 h-2.5" strokeWidth={2.5} />
                          {m}개월
                        </span>
                        {c.bizType && (
                          <span className="inline-flex items-center rounded-full bg-navy-50 border border-navy-200 px-2 py-0.5 text-[10.5px] font-bold text-navy-700">
                            {c.bizType}
                          </span>
                        )}
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
                );
              })}
            </ul>
          )}
        </Panel>

        {/* Recent mail — feature pending */}
        <Panel title="최근 우편물" actionHref="/me/mail" actionLabel="전체 보기">
          <EmptyState
            icon={Inbox}
            title="아직 도착한 우편물이 없어요"
            hint="우편물이 도착하면 본사 운영팀이 스캔해 여기에 올려드려요."
          />
        </Panel>
      </div>

      {/* Billing recent */}
      <Panel title="최근 결제" actionHref="/me/billing" actionLabel="전체 내역">
        {orders.length === 0 ? (
          <EmptyState
            icon={CreditCard}
            title="아직 결제 내역이 없어요"
            hint="첫 결제가 완료되면 여기에서 확인할 수 있어요."
          />
        ) : (
          <ul className="divide-y divide-cream-200">
            {orders.slice(0, 5).map((o) => (
              <li
                key={o.moid}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="text-[13.5px] font-bold text-ink-900">
                    {o.branchName} · {monthsOf(o)}개월
                  </p>
                  <p className="text-[11.5px] text-ink-500 mt-0.5 tnum">
                    {o.createdAt.slice(0, 10)} · {o.cardName || "카드"}
                  </p>
                </div>
                <p className="text-[14.5px] font-extrabold tnum text-ink-900">
                  {formatKRW(o.amount)}
                </p>
              </li>
            ))}
          </ul>
        )}
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
        <div className="w-10 h-10 rounded-xl bg-navy-50 border border-navy-200 flex items-center justify-center">
          <Icon className="w-4 h-4 text-navy-700" strokeWidth={2} />
        </div>
        <div>
          <p className="text-[11.5px] text-ink-400 font-semibold">{label}</p>
          <p className="text-[20px] font-extrabold text-ink-900 tnum">{value}</p>
        </div>
      </div>
      <Link
        href={link.href}
        className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-navy-700 hover:text-navy-800"
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

function EmptyState({
  icon: Icon,
  title,
  hint,
  ctaHref,
  ctaLabel,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  hint: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-cream-200 px-5 py-10 text-center">
      <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-cream-100 mb-3">
        <Icon className="w-4 h-4 text-ink-500" strokeWidth={2} />
      </div>
      <p className="text-[13.5px] font-bold text-ink-900">{title}</p>
      <p className="text-[12px] text-ink-500 mt-1">{hint}</p>
      {ctaHref && ctaLabel && (
        <Link
          href={ctaHref}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-navy-600 hover:bg-navy-700 text-white font-bold h-9 px-4 text-[12.5px]"
        >
          {ctaLabel}
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </Link>
      )}
    </div>
  );
}
