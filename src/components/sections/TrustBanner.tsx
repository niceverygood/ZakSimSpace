import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { ContractTrigger } from "@/components/contract/ContractTrigger";

export function TrustBanner() {
  return (
    <section className="bg-cream-50 pt-2 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-2xl border border-navy-200 bg-navy-50 px-5 sm:px-7 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-navy-500 flex items-center justify-center shadow-[0_6px_18px_-6px_rgba(35,61,104,0.65)]">
              <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.2} />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-navy-700 mb-1">
                초기 비용 부담은 NO
              </p>
              <p className="text-[15.5px] lg:text-[16px] font-bold text-ink-900 leading-snug">
                보증금 0원, 인테리어 0원, 관리비 0원 — 지금 내 사업장을 미리
                체크해보세요
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 self-stretch sm:self-auto">
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-full bg-white hover:bg-cream-50 text-ink-800 font-semibold px-5 h-11 text-[13.5px] border border-ink-200 transition-all"
            >
              비용 시뮬레이션
            </Link>
            <ContractTrigger className="inline-flex items-center justify-center gap-1.5 rounded-full bg-ink-900 hover:bg-ink-800 text-white font-semibold px-5 h-11 text-[13.5px] transition-colors">
              주소지 보기
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            </ContractTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
