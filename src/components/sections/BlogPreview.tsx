"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { posts, blogCategoryLabels, type BlogPost } from "@/lib/blog-data";

const SLIDE_INTERVAL_MS = 5500;

type Tab = "all" | "news" | "story";

const TABS: { value: Tab; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "news", label: "뉴스" },
  { value: "story", label: "블로그" },
];

export function BlogPreview() {
  const [tab, setTab] = useState<Tab>("all");
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  const items = useMemo<BlogPost[]>(() => {
    const filtered =
      tab === "all" ? posts : posts.filter((p) => p.category === tab);
    return filtered.slice(0, 12);
  }, [tab]);

  // Wrap index when filter changes / list shrinks.
  useEffect(() => {
    if (index >= items.length) setIndex(0);
  }, [items.length, index]);

  // Auto-advance once per 5.5s unless the user hovers a card.
  useEffect(() => {
    if (items.length <= 1) return;
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setIndex((i) => (i + 1) % items.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [items.length]);

  const visibleCount = 3;
  // Build a cyclical slice of `visibleCount` cards starting at the current index.
  const visible: BlogPost[] = useMemo(() => {
    if (items.length === 0) return [];
    const out: BlogPost[] = [];
    for (let i = 0; i < Math.min(visibleCount, items.length); i++) {
      out.push(items[(index + i) % items.length]);
    }
    return out;
  }, [items, index]);

  const prev = () =>
    setIndex((i) => (i - 1 + items.length) % Math.max(items.length, 1));
  const next = () =>
    setIndex((i) => (i + 1) % Math.max(items.length, 1));

  return (
    <section className="bg-cream-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8 lg:mb-10">
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

        {/* Tabs + slider controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center gap-1 rounded-full bg-white border border-cream-200 p-1">
            {TABS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => {
                  setTab(t.value);
                  setIndex(0);
                }}
                className={`px-4 h-9 rounded-full text-[12.5px] font-bold transition-colors ${
                  tab === t.value
                    ? "bg-ink-900 text-white"
                    : "text-ink-500 hover:text-ink-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="이전 슬라이드"
              className="w-10 h-10 rounded-full bg-white border border-cream-200 hover:border-ink-400 flex items-center justify-center text-ink-700"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="다음 슬라이드"
              className="w-10 h-10 rounded-full bg-white border border-cream-200 hover:border-ink-400 flex items-center justify-center text-ink-700"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Sliding card row */}
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
        >
          {visible.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group block h-full rounded-2xl bg-white border border-cream-200 overflow-hidden hover:border-navy-300 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="aspect-[16/9] bg-cream-100 relative overflow-hidden">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-navy-500 to-ink-900" />
                  )}
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

        {/* Pagination dots */}
        {items.length > visibleCount && (
          <div className="mt-7 flex items-center justify-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`슬라이드 ${i + 1}로 이동`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-7 bg-ink-900" : "w-1.5 bg-cream-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
