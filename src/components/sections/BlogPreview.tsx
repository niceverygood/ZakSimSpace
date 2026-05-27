import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { posts, blogCategoryLabels } from "@/lib/blog-data";

export function BlogPreview() {
  const items = posts.slice(0, 6);

  return (
    <section className="bg-cream-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10 lg:mb-12">
          <div>
            <p className="text-[13px] font-semibold text-navy-600 tracking-wider uppercase mb-3">
              뉴스 / 블로그
            </p>
            <h2 className="text-[28px] lg:text-[38px] font-extrabold text-ink-900 leading-[1.25] tracking-tight">
              작심스페이스 소식
            </h2>
            <p className="mt-3 text-[14.5px] lg:text-[15.5px] text-ink-500">
              새 지점 오픈, 사업자등록 가이드, 고객 인터뷰까지 모아 보세요.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-900 hover:bg-ink-800 text-white font-bold px-5 h-11 text-[13px] transition-colors w-fit"
          >
            전체 보기
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </Link>
        </div>

        {/* Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p, idx) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group block h-full rounded-2xl bg-white border border-cream-200 overflow-hidden hover:border-navy-300 hover:-translate-y-0.5 transition-all duration-300"
              >
                {/* Cover gradient */}
                <div
                  className={`aspect-[16/9] ${
                    idx % 3 === 0
                      ? "bg-gradient-to-br from-navy-500 via-navy-600 to-navy-800"
                      : idx % 3 === 1
                        ? "bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500"
                        : "bg-gradient-to-br from-ink-700 to-ink-900"
                  } relative`}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:28px_28px]"
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/95 backdrop-blur px-2.5 py-1 text-[10.5px] font-bold text-ink-800">
                    {blogCategoryLabels[p.category]}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-[15.5px] font-bold text-ink-900 leading-snug group-hover:text-navy-700 transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-[12.5px] text-ink-500 leading-[1.7] line-clamp-2">
                    {p.excerpt}
                  </p>
                  <div className="mt-5 pt-4 border-t border-dashed border-cream-200 flex items-center gap-3 text-[11px] text-ink-400">
                    <span className="inline-flex items-center gap-1 tnum">
                      <Calendar className="w-3 h-3" strokeWidth={2.5} />
                      {p.date}
                    </span>
                    <span className="inline-flex items-center gap-1 tnum">
                      <Clock className="w-3 h-3" strokeWidth={2.5} />
                      {p.readMins}분
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
