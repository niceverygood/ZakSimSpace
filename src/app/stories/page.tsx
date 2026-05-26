import type { Metadata } from "next";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ContractTrigger } from "@/components/contract/ContractTrigger";
import { stories } from "@/lib/content-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "작심스토리",
  description:
    "작심스페이스로 사업장을 시작한 대표님들의 진짜 이야기. 업종별 인터뷰와 성공 사례를 만나보세요.",
};

const accentMap = {
  sage: "from-navy-500 to-navy-700",
  amber: "from-amber-400 to-amber-500",
  ink: "from-ink-700 to-ink-900",
} as const;

export default function StoriesPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        <PageHero
          eyebrow="작심스토리"
          title={
            <>
              먼저 시작한 대표님들의
              <br />
              <span className="text-navy-600">진짜 이야기</span>
            </>
          }
          description="결심을 사업장으로 만든 분들의 인터뷰를 한 곳에 모았어요."
        />

        <section className="bg-cream-50 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 lg:gap-6">
              {stories.map((s) => (
                <li key={s.id}>
                  <article className="rounded-3xl bg-white border border-cream-200 overflow-hidden hover:-translate-y-0.5 transition-all duration-300 group">
                    {/* Poster */}
                    <div
                      className={cn(
                        "relative aspect-[16/9] bg-gradient-to-br",
                        accentMap[s.accent],
                      )}
                    >
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:32px_32px]"
                      />
                      <div className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/25 backdrop-blur border border-white/30 px-3 py-1 text-[11px] font-bold text-white">
                        {s.industry}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          type="button"
                          aria-label="영상 재생"
                          className="w-14 h-14 rounded-full bg-white text-ink-900 flex items-center justify-center shadow-[0_18px_40px_-12px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform"
                        >
                          <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                        </button>
                      </div>
                    </div>
                    <div className="p-6 lg:p-7">
                      <p className="text-navy-500 text-[26px] leading-none font-serif">
                        “
                      </p>
                      <p className="text-[15px] lg:text-[16px] font-medium text-ink-700 leading-[1.7] mt-1">
                        {s.quote}
                      </p>
                      <div className="mt-5 flex items-center justify-between">
                        <div>
                          <p className="text-[14px] font-bold text-ink-900">
                            {s.name}
                          </p>
                          <p className="text-[12px] text-ink-500 mt-0.5">
                            {s.role} · {s.branch}
                          </p>
                        </div>
                      </div>
                      <ul className="mt-5 pt-5 border-t border-dashed border-cream-200 flex flex-wrap gap-1.5">
                        {s.highlights.map((h) => (
                          <li
                            key={h}
                            className="inline-flex items-center rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-semibold text-ink-700"
                          >
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-14 text-center">
              <p className="text-[14.5px] text-ink-500 mb-4">
                다음 인터뷰의 주인공이 되어 보세요
              </p>
              <ContractTrigger className="inline-flex items-center gap-2 rounded-full bg-ink-900 hover:bg-ink-800 text-white font-bold px-6 h-12 text-[14px] transition-colors">
                나도 시작하기
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </ContractTrigger>
              <p className="mt-3 text-[12px] text-ink-400">
                인터뷰 참여를 원하시면{" "}
                <Link
                  href="/contact"
                  className="underline underline-offset-2 hover:text-ink-700"
                >
                  여기로 문의
                </Link>
                해 주세요.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
