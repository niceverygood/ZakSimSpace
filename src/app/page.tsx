import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        {/* TODO: 다음 섹션들 추가 — Features, Process, FAQ */}
        <section className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <p className="text-center text-navy-400 text-sm">
              다음 섹션 작업 예정
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
