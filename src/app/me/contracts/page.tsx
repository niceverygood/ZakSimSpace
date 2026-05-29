import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { Download, ArrowRight, FileText } from "lucide-react";
import {
  userContracts,
  formatKRWfromMypage,
  statusLabel,
} from "../helpers";
import { cn } from "@/lib/utils";
import { listOrders, type Order } from "@/lib/orders";
import { formatKRW } from "@/lib/contract-data";
import { contractEndISO } from "@/lib/contract-template";
import { createClient, isSupabaseConfigured } from "@/utils/supabase/server";

export const metadata: Metadata = { title: "내 계약" };
export const dynamic = "force-dynamic";

/** Paid orders belonging to the signed-in user (matched by buyer email). */
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

export default async function ContractsPage() {
  const orders = await myPaidOrders();
  const hasReal = orders.length > 0;

  return (
    <div className="space-y-6">
      {hasReal && (
        <section className="rounded-3xl bg-white border border-cream-200 p-5 lg:p-7">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[16px] font-extrabold text-ink-900">
              내 계약 ({orders.length})
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              실 계약 데이터
            </span>
          </div>

          <ul className="space-y-3">
            {orders.map((o) => {
              const months = o.months ?? (o.cycle === "yearly" ? 12 : 1);
              const startISO = o.startDate || o.createdAt.slice(0, 10);
              const endISO = contractEndISO(startISO, months);
              return (
                <li
                  key={o.moid}
                  className="rounded-2xl border border-cream-200 p-5 lg:p-6"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-[11.5px] text-ink-400 tnum">{o.moid}</p>
                      <p className="text-[16px] font-bold text-ink-900 mt-1">
                        {o.branchName}
                        {o.unitNo && (
                          <span className="ml-2 text-[12px] font-bold text-navy-600">
                            {o.unitNo}호
                          </span>
                        )}
                      </p>
                      {o.branchAddr && (
                        <p className="text-[12.5px] text-ink-500 mt-1">
                          {o.branchAddr}
                        </p>
                      )}
                    </div>
                    <span className="rounded-full border px-2.5 py-1 text-[11px] font-bold bg-navy-50 text-navy-700 border-navy-200">
                      이용중
                    </span>
                  </div>

                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-cream-200">
                    <Row label="계약 기간" value={`${startISO}~${endISO}`} />
                    <Row label="개월수" value={`${months}개월`} />
                    <Row label="사업자 유형" value={o.bizType ?? "—"} />
                    <Row label="결제 금액" value={formatKRW(o.amount)} />
                  </dl>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      href={`/contract/${o.moid}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-navy-600 hover:bg-navy-700 text-white font-bold h-10 px-4 text-[12.5px]"
                    >
                      <FileText className="w-3.5 h-3.5" strokeWidth={2} />
                      계약서 보기
                    </Link>
                    <Link
                      href={`/locations/${o.branchId}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 hover:bg-cream-200 text-ink-700 font-semibold h-10 px-4 text-[12.5px]"
                    >
                      지점 보기
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="rounded-3xl bg-white border border-cream-200 p-5 lg:p-7">
        <h2 className="text-[16px] font-extrabold text-ink-900 mb-5">
          {hasReal ? "예시 계약 (데모)" : `전체 계약 (${userContracts.length})`}
        </h2>

        <ul className="space-y-3">
          {userContracts.map((c) => {
            const status = statusLabel(c.status);
            const toneCls =
              status.tone === "green"
                ? "bg-navy-50 text-navy-700 border-navy-200"
                : status.tone === "amber"
                  ? "bg-amber-50 text-amber-600 border-amber-200"
                  : "bg-cream-100 text-ink-500 border-cream-200";
            return (
              <li
                key={c.id}
                className="rounded-2xl border border-cream-200 p-5 lg:p-6"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-[11.5px] text-ink-400 tnum">{c.id}</p>
                    <p className="text-[16px] font-bold text-ink-900 mt-1">
                      {c.branchName}
                    </p>
                    <p className="text-[12.5px] text-ink-500 mt-1">
                      {c.address}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[11px] font-bold",
                      toneCls,
                    )}
                  >
                    {status.label}
                  </span>
                </div>

                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-cream-200">
                  <Row label="계약 기간" value={`${c.startDate}~${c.endDate}`} />
                  <Row
                    label="결제 주기"
                    value={c.cycle === "yearly" ? "연간" : "월간"}
                  />
                  <Row label="자동 갱신" value={c.autoRenew ? "ON" : "OFF"} />
                  <Row label="월 환산" value={formatKRWfromMypage(c.monthlyPrice)} />
                </dl>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 hover:bg-cream-200 text-ink-700 font-semibold h-10 px-4 text-[12.5px]"
                  >
                    <Download className="w-3.5 h-3.5" strokeWidth={2} />
                    임대차계약서
                  </button>
                  <Link
                    href={`/locations/${c.branchId}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 hover:bg-cream-200 text-ink-700 font-semibold h-10 px-4 text-[12.5px]"
                  >
                    지점 보기
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] text-ink-400">{label}</dt>
      <dd className="text-[13px] font-bold text-ink-900 mt-1 tnum">{value}</dd>
    </div>
  );
}
