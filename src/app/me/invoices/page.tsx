import type { Metadata } from "next";
import { Receipt } from "lucide-react";
import { formatKRW } from "@/lib/contract-data";
import { myPaidOrders } from "../data";

export const metadata: Metadata = { title: "세금계산서" };
export const dynamic = "force-dynamic";

/** 개인 → 현금영수증 / 법인 → 세금계산서 (per client spec). */
function docKind(bizType?: string): "세금계산서" | "현금영수증" {
  return bizType === "법인" ? "세금계산서" : "현금영수증";
}

export default async function InvoicesPage() {
  const orders = await myPaidOrders();

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white border border-cream-200 p-5 lg:p-7">
        <h2 className="text-[16px] font-extrabold text-ink-900 mb-5">
          세금계산서 · 현금영수증
        </h2>

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-cream-200 px-5 py-10 text-center">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-cream-100 mb-3">
              <Receipt className="w-4 h-4 text-ink-500" strokeWidth={2} />
            </div>
            <p className="text-[13.5px] font-bold text-ink-900">
              아직 발급된 증빙이 없어요
            </p>
            <p className="text-[12px] text-ink-500 mt-1">
              결제가 완료되면 법인은 세금계산서, 개인은 현금영수증이 발급돼요.
            </p>
          </div>
        ) : (
          <ul className="grid sm:grid-cols-2 gap-3">
            {orders.map((o) => {
              const kind = docKind(o.bizType);
              return (
                <li
                  key={o.moid}
                  className="rounded-2xl border border-cream-200 p-5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-navy-50 border border-navy-200 flex items-center justify-center">
                      <Receipt className="w-4 h-4 text-navy-700" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold bg-cream-100 text-ink-600 border-cream-200">
                          {kind}
                        </span>
                        <span className="text-[11.5px] text-ink-400 tnum">
                          {o.moid}
                        </span>
                      </div>
                      <p className="text-[14px] font-bold text-ink-900 mt-1">
                        {o.buyerName || o.branchName}
                      </p>
                      <p className="text-[12px] text-ink-500 mt-0.5 tnum">
                        {o.createdAt.slice(0, 10)} · {formatKRW(o.amount)}
                      </p>
                    </div>
                  </div>
                  <span className="flex-shrink-0 inline-flex items-center rounded-full bg-amber-50 text-amber-600 border border-amber-200 px-2.5 py-1 text-[10.5px] font-bold">
                    발급 예정
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        <p className="mt-6 text-[12px] text-ink-400 leading-[1.7]">
          전자세금계산서·현금영수증은 결제일로부터 영업일 기준 2일 이내 발급되며,
          마이페이지·이메일·알림톡으로 동시 전송됩니다.
        </p>
      </section>
    </div>
  );
}
