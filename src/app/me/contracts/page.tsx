import type { Metadata } from "next";
import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";
import {
  userContracts,
  formatKRWfromMypage,
  statusLabel,
} from "../helpers";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "내 계약" };

export default function ContractsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white border border-cream-200 p-5 lg:p-7">
        <h2 className="text-[16px] font-extrabold text-ink-900 mb-5">
          전체 계약 ({userContracts.length})
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
                  <Row
                    label="자동 갱신"
                    value={c.autoRenew ? "ON" : "OFF"}
                  />
                  <Row
                    label="월 환산"
                    value={formatKRWfromMypage(c.monthlyPrice)}
                  />
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
                  {c.status === "active" && (
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full border border-ink-200 hover:border-rose-300 hover:text-rose-600 text-ink-500 font-semibold h-10 px-4 text-[12.5px] ml-auto transition-colors"
                    >
                      해지 신청
                    </button>
                  )}
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
