import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { posts, blogCategoryLabels } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "뉴스룸 · 블로그",
  description:
    "작심스페이스의 최신 소식, 사업자등록·우편물 가이드, 고객 인터뷰를 만나보세요.",
};

export default function BlogIndexPage() {
  const [feature, ...rest] = posts;

  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        <PageHero
          eyebrow="Newsroom"
          title={
            <>
              작심스페이스의
              <br />
              <span className="text-sage-600">소식과 가이드</span>
            </>
          }
          description="새 지점 오픈 소식, 사업자등록·우편물 가이드, 고객 인터뷰까지 한 곳에서 만나보세요."
        />

        <section className="bg-cream-50 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Featured */}
            <Link
              href={`/blog/${feature.slug}`}
              className="group block rounded-3xl bg-white border border-cream-200 overflow-hidden mb-10 hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="grid lg:grid-cols-[1.2fr_1fr] gap-0">
                <div className="relative aspect-[16/10] lg:aspect-auto bg-gradient-to-br from-sage-500 via-sage-600 to-ink-800">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:32px_32px]"
                  />
                  <div className="absolute top-5 left-5 inline-flex items-center rounded-full bg-white/25 backdrop-blur border border-white/30 px-3 py-1 text-[11px] font-bold text-white">
                    {blogCategoryLabels[feature.category]} · 추천
                  </div>
                </div>
                <div className="p-7 lg:p-10 flex flex-col justify-center">
                  <p className="text-[12px] text-ink-500 tnum">
                    {feature.date} · {feature.readMins}분 읽기
                  </p>
                  <h2 className="mt-3 text-[22px] lg:text-[28px] font-extrabold text-ink-900 leading-[1.3] group-hover:text-sage-700 transition-colors">
                    {feature.title}
                  </h2>
                  <p className="mt-4 text-[14px] lg:text-[15px] text-ink-500 leading-[1.75]">
                    {feature.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1 text-[13px] font-semibold text-sage-700">
                    글 읽기 <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            </Link>

            {/* Grid */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {rest.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="block h-full rounded-2xl bg-white border border-cream-200 p-6 hover:border-sage-300 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span className="inline-flex items-center rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-bold text-ink-700">
                      {blogCategoryLabels[p.category]}
                    </span>
                    <h3 className="mt-4 text-[16px] font-bold text-ink-900 leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-[13px] text-ink-500 leading-[1.7] line-clamp-3">
                      {p.excerpt}
                    </p>
                    <div className="mt-5 pt-4 border-t border-dashed border-cream-200 flex items-center gap-3 text-[11.5px] text-ink-400">
                      <span className="inline-flex items-center gap-1 tnum">
                        <Calendar className="w-3 h-3" strokeWidth={2.5} />
                        {p.date}
                      </span>
                      <span className="inline-flex items-center gap-1 tnum">
                        <Clock className="w-3 h-3" strokeWidth={2.5} />
                        {p.readMins}분
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
