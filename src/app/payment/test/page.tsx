import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TestPaymentClient } from "./TestPaymentClient";

export const metadata: Metadata = {
  title: "결제 연동 테스트",
  robots: { index: false, follow: false },
};

export default function TestPaymentPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16 bg-cream-50">
        <div className="mx-auto max-w-2xl px-6 lg:px-8 py-14 lg:py-20">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 mb-5 text-[11.5px] font-bold text-amber-700">
            ⚠ INTERNAL · NicePay 운영 MID 실 결제 테스트
          </div>
          <h1 className="text-[26px] lg:text-[32px] font-extrabold text-ink-900 leading-tight">
            결제 연동 검증
          </h1>
          <p className="mt-3 text-[13.5px] text-ink-500 leading-[1.75]">
            아래 작은 금액으로 NicePay 팝업 → 카드 인증 → 자동 승인 →
            완료 페이지 흐름을 점검합니다. 운영 MID이므로 카드사에 실제 청구가
            발생합니다. 검증 후 매니저에서 부분 취소·전체 취소 가능.
          </p>

          <TestPaymentClient />
        </div>
      </main>
      <Footer />
    </>
  );
}
