import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight, FileText } from "lucide-react";
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
                    <Row label="상호명·대표자" value={o.buyerName || "—"} />
                    <Row label="연락처" value={o.buyerTel || "—"} />
                    {o.industry && <Row label="업종" value={o.industry} />}
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

      {!hasReal && (
        <section className="rounded-3xl bg-white border border-dashed border-cream-200 p-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cream-100 mb-3">
            <FileText className="w-4 h-4 text-ink-500" strokeWidth={2} />
          </div>
          <h2 className="text-[15px] font-extrabold text-ink-900">
            아직 계약이 없어요
          </h2>
          <p className="mt-1.5 text-[12.5px] text-ink-500">
            지점을 둘러보고 결제하면 여기에 계약이 표시돼요.
          </p>
          <Link
            href="/locations"
            className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-navy-600 hover:bg-navy-700 text-white font-bold h-10 px-5 text-[13px]"
          >
            지점 둘러보기
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>
        </section>
      )}
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
