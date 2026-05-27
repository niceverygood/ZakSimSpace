import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PricingExplorer } from "./PricingExplorer";

export const metadata: Metadata = {
  title: "오피스 가격",
  description:
    "월 20,000원부터 시작하는 사업장. 사업자 유형과 계약 기간에 맞춰 최적의 가격을 안내합니다.",
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        {/* Hero */}
        <section className="bg-cream-100 border-b border-cream-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14 lg:py-20 text-center">
            <p className="text-[13px] font-semibold text-navy-600 tracking-wider uppercase mb-3">
              Pricing
            </p>
            <h1 className="text-[28px] lg:text-[42px] font-extrabold text-ink-900 leading-[1.25] tracking-tight">
              커피 한 잔 가격으로
              <br />
              <span className="text-amber-500">합리적이고, 스마트하게</span>
            </h1>
            <p className="mt-5 text-[14.5px] lg:text-[16px] text-ink-500 max-w-xl mx-auto leading-[1.7]">
              사업 초기에 막대한 사무실 비용 부담을 없애고, 혼자서도 가볍게
              시작하세요.
            </p>
          </div>
        </section>

        <PricingExplorer />
      </main>
      <Footer />
    </>
  );
}
