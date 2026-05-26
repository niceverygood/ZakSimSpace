import type { Metadata } from "next";
import { CreditCard, Plus, Check, MoreHorizontal } from "lucide-react";
import {
  billingHistory,
  paymentMethods,
  formatKRWfromMypage,
} from "../helpers";

export const metadata: Metadata = { title: "결제 내역" };

export default function BillingPage() {
  return (
    <div className="space-y-6">
      {/* Methods */}
      <section className="rounded-3xl bg-white border border-cream-200 p-5 lg:p-7">
        <header className="flex items-center justify-between mb-5">
          <h2 className="text-[16px] font-extrabold text-ink-900">결제 수단</h2>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 hover:bg-ink-800 text-white h-9 px-4 text-[12.5px] font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            카드 추가
          </button>
        </header>

        <ul className="grid sm:grid-cols-2 gap-3">
          {paymentMethods.map((m) => (
            <li
              key={m.id}
              className="rounded-2xl border border-cream-200 p-5 flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-ink-700 to-ink-900 flex items-center justify-center">
                <CreditCard
                  className="w-4 h-4 text-white"
                  strokeWidth={2}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-ink-900">
                  {m.brand} ····{m.last4}
                </p>
                <p className="text-[12px] text-ink-500 mt-0.5 tnum">
                  만료 {m.expiry}
                </p>
              </div>
              {m.isDefault ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-sage-50 border border-sage-200 px-2.5 py-1 text-[11px] font-bold text-sage-700">
                  <Check className="w-3 h-3" strokeWidth={3} />
                  기본
                </span>
              ) : (
                <button
                  type="button"
                  aria-label="더보기"
                  className="w-8 h-8 rounded-full hover:bg-cream-100 flex items-center justify-center text-ink-400"
                >
                  <MoreHorizontal className="w-4 h-4" strokeWidth={2} />
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* History */}
      <section className="rounded-3xl bg-white border border-cream-200 p-5 lg:p-7">
        <h2 className="text-[16px] font-extrabold text-ink-900 mb-5">
          결제 내역
        </h2>
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
              {billingHistory.map((b) => (
                <tr key={b.id} className="border-b border-cream-200/70">
                  <td className="py-3.5 pr-3 text-ink-700 tnum">{b.date}</td>
                  <td className="py-3.5 pr-3 text-ink-900 font-bold">
                    {b.description}
                  </td>
                  <td className="py-3.5 pr-3 text-ink-500">{b.method}</td>
                  <td
                    className={`py-3.5 pl-3 text-right font-extrabold tnum ${
                      b.amount < 0 ? "text-rose-500" : "text-ink-900"
                    }`}
                  >
                    {b.amount < 0 ? "-" : ""}
                    {formatKRWfromMypage(Math.abs(b.amount))}
                  </td>
                  <td className="py-3.5 pl-3 text-right">
                    <StatusPill status={b.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatusPill({ status }: { status: "paid" | "refunded" | "failed" }) {
  const map = {
    paid: { l: "결제완료", c: "bg-sage-50 text-sage-700 border-sage-200" },
    refunded: { l: "환불", c: "bg-amber-50 text-amber-600 border-amber-200" },
    failed: { l: "실패", c: "bg-rose-50 text-rose-600 border-rose-100" },
  } as const;
  const s = map[status];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${s.c}`}
    >
      {s.l}
    </span>
  );
}
