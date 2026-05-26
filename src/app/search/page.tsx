import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SearchBrowser } from "./SearchBrowser";

export const metadata: Metadata = {
  title: "통합 검색",
  description: "지점, 자주하는 질문, 업종 사례, 작심스토리에서 한 번에 검색하세요.",
};

export default function SearchPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16 bg-cream-50">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 py-14 lg:py-20">
          <SearchBrowser />
        </div>
      </main>
      <Footer />
    </>
  );
}
