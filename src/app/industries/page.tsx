import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IndustriesBrowser } from "./IndustriesBrowser";

export const metadata: Metadata = {
  title: "업종 신청 사례",
  description:
    "비상주 사무실 업종별 신청 가능 여부와 그동안 진행된 실제 신청 사례를 직접 확인해 보세요.",
};

export default function IndustriesPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        {/* Hero */}
        <section className="bg-cream-100 border-b border-cream-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14 lg:py-20">
            <p className="text-[13px] font-semibold text-navy-600 tracking-wider uppercase mb-3">
              Industries
            </p>
            <h1 className="text-[28px] lg:text-[40px] font-extrabold text-ink-900 leading-[1.25] tracking-tight">
              비상주 사무실 업종 신청 사례 안내
            </h1>
            <p className="mt-5 text-[14.5px] lg:text-[16px] text-ink-500 max-w-2xl leading-[1.7]">
              그동안 진행된 실제 신청 사례들을 직접 확인해 보세요. 업종별 신청
              가능 여부와 인허가 요건을 함께 안내합니다.
            </p>
          </div>
        </section>

        <IndustriesBrowser />
      </main>
      <Footer />
    </>
  );
}
