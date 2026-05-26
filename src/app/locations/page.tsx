import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocationsBrowser } from "./LocationsBrowser";

export const metadata: Metadata = {
  title: "전국 지점",
  description:
    "작심스페이스 전국 12+개 직영점. 지역·인허가·과밀 여부로 필터링해서 내 사업장을 빠르게 찾아보세요.",
};

export default function LocationsPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        {/* Page hero */}
        <section className="bg-cream-100 border-b border-cream-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14 lg:py-20">
            <p className="text-[13px] font-semibold text-sage-600 tracking-wider uppercase mb-3">
              Locations
            </p>
            <h1 className="text-[32px] lg:text-[44px] font-extrabold text-ink-900 leading-[1.2] tracking-tight">
              전국 어디서나
              <br />
              <span className="text-sage-600">내 사업장이 되는 주소</span>
            </h1>
            <p className="mt-5 text-[15px] lg:text-[17px] text-ink-500 max-w-xl leading-[1.7]">
              인허가 업종이 가능한지, 과밀억제권역인지 한눈에 확인하고 바로
              계약까지 진행하세요.
            </p>
          </div>
        </section>

        <LocationsBrowser />
      </main>
      <Footer />
    </>
  );
}
