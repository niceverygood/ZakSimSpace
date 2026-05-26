"use client";

import { useMemo, useState } from "react";
import { Search, Plus } from "lucide-react";
import { faqs, faqCategoryLabels, type FaqCategory } from "@/lib/faq-data";
import { cn } from "@/lib/utils";

type CategoryFilter = "all" | FaqCategory;

export function FaqBrowser() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim();
    return faqs.filter((f) => {
      if (category !== "all" && f.category !== category) return false;
      if (q && !(`${f.q} ${f.a}`.includes(q))) return false;
      return true;
    });
  }, [category, query]);

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: "all", label: "전체" },
    ...(Object.keys(faqCategoryLabels) as FaqCategory[]).map((k) => ({
      value: k,
      label: faqCategoryLabels[k],
    })),
  ];

  return (
    <section className="bg-cream-50 py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400"
            strokeWidth={2}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="질문 또는 키워드 검색"
            className="w-full h-12 rounded-2xl border border-ink-200 bg-white pl-11 pr-4 text-[14px] font-medium text-ink-800 placeholder:text-ink-300 focus:outline-none focus:border-sage-500 transition-colors"
          />
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-7">
          {categories.map((c) => {
            const active = category === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setCategory(c.value)}
                className={cn(
                  "h-9 rounded-full px-4 text-[12.5px] font-semibold transition-all",
                  active
                    ? "bg-ink-900 text-white"
                    : "bg-white border border-ink-200 text-ink-700 hover:border-ink-400",
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* List */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-16 text-center">
            <p className="text-[14.5px] text-ink-500">
              검색 결과가 없어요. 다른 키워드로 시도해 주세요.
            </p>
          </div>
        ) : (
          <div className="rounded-3xl border border-ink-100 px-6 lg:px-8 bg-white">
            {filtered.map((item) => {
              const open = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="border-b border-ink-100 last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : item.id)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                    aria-expanded={open}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <span className="mt-1 inline-flex items-center rounded-full bg-cream-100 px-2 py-0.5 text-[10.5px] font-bold text-ink-500 flex-shrink-0">
                        {faqCategoryLabels[item.category]}
                      </span>
                      <span className="text-[15px] lg:text-[16px] font-semibold text-ink-900 leading-snug group-hover:text-sage-700 transition-colors">
                        {item.q}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300",
                        open
                          ? "bg-sage-600 border-sage-600 rotate-45"
                          : "bg-white border-ink-200 group-hover:border-ink-400",
                      )}
                    >
                      <Plus
                        className={cn(
                          "w-3.5 h-3.5",
                          open ? "text-white" : "text-ink-600",
                        )}
                        strokeWidth={2}
                      />
                    </span>
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-12 text-[14px] leading-[1.8] text-ink-500">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
