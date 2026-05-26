import Link from "next/link";
import { XCircle, RefreshCcw, Home, Headphones } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ reason?: string }>;

export default async function PaymentFailPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { reason } = await searchParams;

  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16 bg-cream-50">
        <div className="mx-auto max-w-md px-6 py-16 lg:py-24">
          <section className="rounded-3xl bg-white border border-cream-200 p-8 lg:p-10 text-center shadow-[0_24px_60px_-30px_rgba(12,18,25,0.35)]">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-50 border border-rose-200 mb-5">
              <XCircle className="w-7 h-7 text-rose-500" strokeWidth={2} />
            </div>
            <h1 className="text-[22px] font-extrabold text-ink-900">
              결제를 완료하지 못했어요
            </h1>
            <p className="mt-3 text-[13.5px] text-ink-500 leading-[1.75]">
              {reason ?? "사용자가 결제를 취소했거나 카드 승인이 거절되었어요."}
            </p>
            <div className="mt-3 text-[11.5px] text-ink-400">
              결제 금액은 청구되지 않았어요. 카드사에 따라 일시적인 결제 내역이
              표시될 수 있으며, 영업일 기준 1~5일 내 자동 취소됩니다.
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 rounded-full bg-navy-600 hover:bg-navy-700 text-white font-bold px-6 h-12 text-[14px]"
              >
                <RefreshCcw className="w-3.5 h-3.5" strokeWidth={2.5} />
                다시 시도
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 hover:border-ink-400 text-ink-800 font-semibold px-6 h-12 text-[13.5px]"
              >
                <Home className="w-3.5 h-3.5" strokeWidth={2.5} />
                홈으로
              </Link>
            </div>

            <div className="mt-7 pt-6 border-t border-cream-200">
              <p className="text-[12.5px] text-ink-500 mb-2">
                계속 같은 오류가 발생하나요?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-navy-700 hover:text-navy-800"
              >
                <Headphones className="w-3.5 h-3.5" strokeWidth={2} />
                고객센터에 문의
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
