import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FaqBrowser } from "./FaqBrowser";
import { faqs } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "자주하는 질문",
  description:
    "사업자등록·우편물·계약·인허가까지 작심스페이스 이용에 자주 묻는 질문들을 한 곳에 모았습니다.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        <section className="bg-cream-100 border-b border-cream-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14 lg:py-20 text-center">
            <p className="text-[13px] font-semibold text-sage-600 tracking-wider uppercase mb-3">
              FAQ
            </p>
            <h1 className="text-[32px] lg:text-[44px] font-extrabold text-ink-900 leading-[1.2] tracking-tight">
              자주하는 질문
            </h1>
            <p className="mt-5 text-[15px] lg:text-[17px] text-ink-500 max-w-xl mx-auto leading-[1.7]">
              궁금한 점을 카테고리·검색으로 빠르게 찾아보세요.
            </p>
          </div>
        </section>

        <FaqBrowser />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </main>
      <Footer />
    </>
  );
}
