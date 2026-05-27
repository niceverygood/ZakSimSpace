"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown, HelpCircle } from "lucide-react";
import {
  industries,
  eligibilityLabels,
  type EligibilityStatus,
  type Industry,
  type Subcategory,
} from "@/lib/industries-data";
import { cn } from "@/lib/utils";

const statusFilters: { value: EligibilityStatus | "all"; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "available", label: "신청 사례 있음" },
  { value: "oem-required", label: "OEM 계약 필요" },
  { value: "license-required", label: "인허가 요건 확인" },
  { value: "unavailable", label: "신청 불가" },
];

export function IndustriesBrowser() {
  const [query, setQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<
    EligibilityStatus | "all"
  >("all");

  const filtered = useMemo(() => {
    const q = query.trim();
    const matches = (i: Industry): Industry | null => {
      if (industryFilter !== "all" && i.id !== industryFilter) return null;
      const subs = i.subcategories.filter((s) => {
        if (statusFilter !== "all" && s.status !== statusFilter) return false;
        if (
          q &&
          !`${s.name} ${s.highlights.join(" ")} ${s.items.join(" ")}`.includes(q)
        )
          return false;
        return true;
      });
      if (subs.length === 0) return null;
      return { ...i, subcategories: subs };
    };
    return industries.map(matches).filter(Boolean) as Industry[];
  }, [query, industryFilter, statusFilter]);

  return (
    <section className="bg-cream-50 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-10">
        {/* Sidebar filters */}
        <aside className="lg:sticky lg:top-24 lg:self-start space-y-5">
          {/* Search */}
          <div>
            <p className="text-[12px] font-bold text-ink-700 mb-2">검색</p>
            <div className="relative">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400"
                strokeWidth={2}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="업종명, 키워드로 검색..."
                className="w-full h-10 rounded-xl border border-ink-200 bg-white pl-10 pr-3 text-[13px] font-medium text-ink-800 placeholder:text-ink-300 focus:outline-none focus:border-navy-500"
              />
            </div>
          </div>

          {/* Industry filter */}
          <div>
            <p className="text-[12px] font-bold text-ink-700 mb-2">산업</p>
            <ul className="space-y-1 max-h-[420px] overflow-y-auto pr-1 rounded-xl border border-ink-100 bg-white p-2">
              <li>
                <FilterChip
                  active={industryFilter === "all"}
                  onClick={() => setIndustryFilter("all")}
                >
                  전체
                </FilterChip>
              </li>
              {industries.map((i) => (
                <li key={i.id}>
                  <FilterChip
                    active={industryFilter === i.id}
                    onClick={() => setIndustryFilter(i.id)}
                  >
                    {i.name}
                  </FilterChip>
                </li>
              ))}
            </ul>
          </div>

          {/* Status filter */}
          <div>
            <p className="text-[12px] font-bold text-ink-700 mb-2 inline-flex items-center gap-1">
              신청 가능 여부
              <HelpCircle className="w-3 h-3 text-ink-400" />
            </p>
            <ul className="space-y-1 rounded-xl border border-ink-100 bg-white p-2">
              {statusFilters.map((s) => (
                <li key={s.value}>
                  <FilterChip
                    active={statusFilter === s.value}
                    onClick={() => setStatusFilter(s.value)}
                  >
                    <span className="inline-flex items-center gap-2">
                      {s.value !== "all" && (
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full",
                            statusDot(s.value as EligibilityStatus),
                          )}
                        />
                      )}
                      {s.label}
                    </span>
                  </FilterChip>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Results */}
        <div className="min-w-0">
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-ink-200 bg-white px-6 py-20 text-center">
              <p className="text-[14.5px] text-ink-500">
                조건에 맞는 업종이 없어요. 검색어나 필터를 조정해 보세요.
              </p>
            </div>
          ) : (
            <div className="space-y-10">
              {filtered.map((i) => (
                <IndustrySection key={i.id} industry={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function IndustrySection({ industry }: { industry: Industry }) {
  return (
    <section>
      <h2 className="text-[20px] lg:text-[24px] font-extrabold text-ink-900 mb-5 pb-3 border-b border-cream-200">
        {industry.name}
      </h2>
      <ul className="space-y-4">
        {industry.subcategories.map((s) => (
          <li key={s.id}>
            <SubcategoryCard subcategory={s} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function SubcategoryCard({ subcategory }: { subcategory: Subcategory }) {
  const [showItems, setShowItems] = useState(false);
  return (
    <article className="rounded-3xl bg-white border border-cream-200 p-6 lg:p-7">
      <header className="flex items-start justify-between gap-3 mb-4">
        <h3 className="text-[16.5px] lg:text-[18px] font-extrabold text-ink-900">
          {subcategory.name}
        </h3>
        <StatusBadge status={subcategory.status} />
      </header>

      {/* Highlights */}
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4">
        {subcategory.highlights.map((h) => (
          <li
            key={h}
            className="text-[12.5px] font-semibold text-ink-700 bg-cream-50 border border-cream-200 rounded-lg px-3 py-2"
          >
            {h}
          </li>
        ))}
      </ul>

      {/* Note */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 mb-4">
        <p className="text-[11.5px] font-bold text-amber-700 mb-2">참고</p>
        <ul className="space-y-1.5">
          {subcategory.note.map((n, i) => (
            <li
              key={i}
              className="text-[12.5px] leading-[1.7] text-ink-700"
            >
              {n}
            </li>
          ))}
        </ul>
      </div>

      {/* Items toggle */}
      <button
        type="button"
        onClick={() => setShowItems((v) => !v)}
        className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-navy-700 hover:text-navy-800"
      >
        세부 업종 {showItems ? "접기" : "보기"} ({subcategory.items.length})
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform",
            showItems && "rotate-180",
          )}
        />
      </button>

      {showItems && (
        <ul className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-2 animate-[fadeIn_0.2s_ease]">
          {subcategory.items.map((it) => (
            <li
              key={it}
              className="text-[12.5px] text-ink-600 bg-cream-50 border border-cream-200 rounded-lg px-3 py-2"
            >
              {it}
            </li>
          ))}
        </ul>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </article>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left text-[12.5px] px-3 py-1.5 rounded-lg transition-colors",
        active
          ? "bg-navy-600 text-white font-bold"
          : "text-ink-700 hover:bg-cream-100",
      )}
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }: { status: EligibilityStatus }) {
  const cls =
    status === "available"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : status === "oem-required"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : status === "license-required"
          ? "bg-blue-50 text-blue-700 border-blue-200"
          : "bg-rose-50 text-rose-700 border-rose-200";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold whitespace-nowrap",
        cls,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", statusDot(status))} />
      {eligibilityLabels[status]}
    </span>
  );
}

function statusDot(s: EligibilityStatus): string {
  return s === "available"
    ? "bg-emerald-500"
    : s === "oem-required"
      ? "bg-amber-500"
      : s === "license-required"
        ? "bg-blue-500"
        : "bg-rose-500";
}
