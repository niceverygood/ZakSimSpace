import type { Metadata } from "next";
import { Receipt, Download, ChevronDown } from "lucide-react";
import { invoices, formatKRWfromMypage } from "../helpers";

export const metadata: Metadata = { title: "세금계산서" };

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white border border-cream-200 p-5 lg:p-7">
        <header className="flex items-center justify-between mb-5">
          <h2 className="text-[16px] font-extrabold text-ink-900">
            전자세금계산서
          </h2>
          <div className="relative">
            <select className="h-9 appearance-none rounded-xl border border-ink-200 bg-white pl-3 pr-8 text-[12.5px] font-semibold text-ink-700 focus:outline-none focus:border-sage-500">
              <option>최근 6개월</option>
              <option>최근 1년</option>
              <option>전체</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-400"
              strokeWidth={2}
            />
          </div>
        </header>

        <ul className="grid sm:grid-cols-2 gap-3">
          {invoices.map((iv) => (
            <li
              key={iv.id}
              className="rounded-2xl border border-cream-200 p-5 flex items-center justify-between gap-3"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-sage-50 border border-sage-200 flex items-center justify-center">
                  <Receipt
                    className="w-4 h-4 text-sage-700"
                    strokeWidth={2}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[11.5px] text-ink-400 tnum">{iv.id}</p>
                  <p className="text-[14px] font-bold text-ink-900 mt-0.5">
                    {iv.buyer}
                  </p>
                  <p className="text-[12px] text-ink-500 mt-0.5 tnum">
                    {iv.issuedAt} · {formatKRWfromMypage(iv.amount)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="세금계산서 다운로드"
                className="flex-shrink-0 w-9 h-9 rounded-full bg-cream-100 hover:bg-cream-200 flex items-center justify-center text-ink-700"
              >
                <Download className="w-4 h-4" strokeWidth={2} />
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-[12px] text-ink-400 leading-[1.7]">
          전자세금계산서는 결제일로부터 영업일 기준 2일 이내 발급되며,
          마이페이지·이메일·알림톡으로 동시 전송됩니다.
        </p>
      </section>
    </div>
  );
}
