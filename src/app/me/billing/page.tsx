import type { Metadata } from "next";
import { CreditCard, Plus } from "lucide-react";
import { formatKRW } from "@/lib/contract-data";
import { myPaidOrders } from "../data";
import { monthsOf } from "../helpers";

export const metadata: Metadata = { title: "결제 내역" };
export const dynamic = "force-dynamic";

export default async function BillingPage() {
  const orders = await myPaidOrders();
  // 등록된 결제 수단 = 결제에 사용된 카드(중복 제거).
  const cards = Array.from(
    new Map(
      orders
        .filter((o) => o.cardName)
        .map((o) => [
          `${o.cardName}-${o.cardNum ?? ""}`,
          { brand: o.cardName as string, last4: (o.cardNum ?? "").slice(-4) },
        ]),
    ).values(),
  );

  return (
    <div className="space-y-6">
      {/* Methods */}
      <section className="rounded-3xl bg-white border border-cream-200 p-5 lg:p-7">
        <header className="flex items-center justify-between mb-5">
          <h2 className="text-[16px] font-extrabold text-ink-900">결제 수단</h2>
          <button
            type="button"
            disabled
            title="자동결제(빌링) 연동 후 제공됩니다."
            className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 text-ink-400 h-9 px-4 text-[12.5px] font-semibold cursor-not-allowed"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            카드 추가
          </button>
        </header>

        {cards.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-cream-200 px-5 py-8 text-center">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-cream-100 mb-3">
              <CreditCard className="w-4 h-4 text-ink-500" strokeWidth={2} />
            </div>
            <p className="text-[13.5px] font-bold text-ink-900">
              등록된 결제 수단이 없어요
            </p>
            <p className="text-[12px] text-ink-500 mt-1">
              결제를 진행하면 사용한 카드가 여기에 표시돼요.
            </p>
          </div>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-3">
            {cards.map((m, i) => (
              <li
                key={i}
                className="rounded-2xl border border-cream-200 p-5 flex items-center gap-4"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-ink-700 to-ink-900 flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold text-ink-900">
                    {m.brand}
                    {m.last4 && ` ····${m.last4}`}
                  </p>
                  <p className="text-[12px] text-ink-500 mt-0.5">
                    결제 시 사용된 카드
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* History */}
      <section className="rounded-3xl bg-white border border-cream-200 p-5 lg:p-7">
        <h2 className="text-[16px] font-extrabold text-ink-900 mb-5">결제 내역</h2>
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-cream-200 px-5 py-10 text-center">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-cream-100 mb-3">
              <CreditCard className="w-4 h-4 text-ink-500" strokeWidth={2} />
            </div>
            <p className="text-[13.5px] font-bold text-ink-900">
              아직 결제 내역이 없어요
            </p>
            <p className="text-[12px] text-ink-500 mt-1">
              첫 결제가 완료되면 여기에서 확인할 수 있어요.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead className="text-[11.5px] text-ink-400 font-semibold">
                <tr className="border-b border-cream-200">
                  <th className="text-left py-3 pr-3">일자</th>
                  <th className="text-left py-3 pr-3">내역</th>
                  <th className="text-left py-3 pr-3">결제수단</th>
                  <th className="text-right py-3 pl-3">금액</th>
                  <th className="text-right py-3 pl-3">상태</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.moid} className="border-b border-cream-200/70">
                    <td className="py-3.5 pr-3 text-ink-700 tnum">
                      {o.createdAt.slice(0, 10)}
                    </td>
                    <td className="py-3.5 pr-3 text-ink-900 font-bold">
                      {o.branchName} · {monthsOf(o)}개월
                    </td>
                    <td className="py-3.5 pr-3 text-ink-500">
                      {o.cardName || "카드"}
                    </td>
                    <td className="py-3.5 pl-3 text-right font-extrabold tnum text-ink-900">
                      {formatKRW(o.amount)}
                    </td>
                    <td className="py-3.5 pl-3 text-right">
                      <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold bg-navy-50 text-navy-700 border-navy-200">
                        결제완료
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
