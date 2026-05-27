"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, MapPin, HelpCircle, Briefcase, MessageCircle } from "lucide-react";
import { branches, formatKRW } from "@/lib/contract-data";
import { faqs, faqCategoryLabels } from "@/lib/faq-data";
import { cases, stories } from "@/lib/content-data";
import { cn } from "@/lib/utils";

type SourceKey = "branch" | "faq" | "case" | "story";

const sources: { key: SourceKey | "all"; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "branch", label: "지점" },
  { key: "faq", label: "FAQ" },
  { key: "case", label: "업종 사례" },
  { key: "story", label: "작심스토리" },
];

type Hit =
  | { kind: "branch"; id: string; title: string; sub: string; meta: string; href: string }
  | { kind: "faq"; id: string; title: string; sub: string; meta: string; href: string }
  | { kind: "case"; id: string; title: string; sub: string; meta: string; href: string }
  | { kind: "story"; id: string; title: string; sub: string; meta: string; href: string };

export function SearchBrowser() {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<SourceKey | "all">("all");

  const hits = useMemo<Hit[]>(() => {
    const q = query.trim();
    if (!q) return [];

    const matches: Hit[] = [];

    if (source === "all" || source === "branch") {
      branches.forEach((b) => {
        if (`${b.name} ${b.address} ${b.region}`.includes(q)) {
          matches.push({
            kind: "branch",
            id: b.id,
            title: b.name,
            sub: b.address,
            meta: `월 ${formatKRW(b.monthlyPrice)} · ${b.region}`,
            href: `/locations/${b.id}`,
          });
        }
      });
    }

    if (source === "all" || source === "faq") {
      faqs.forEach((f) => {
        if (`${f.q} ${f.a}`.includes(q)) {
          matches.push({
            kind: "faq",
            id: f.id,
            title: f.q,
            sub: f.a,
            meta: faqCategoryLabels[f.category],
            href: `/faq`,
          });
        }
      });
    }

    if (source === "all" || source === "case") {
      cases.forEach((c) => {
        if (`${c.industry} ${c.description} ${c.examples.join(" ")}`.includes(q)) {
          matches.push({
            kind: "case",
            id: c.id,
            title: c.industry,
            sub: c.description,
            meta: `${c.shortLabel} · 누적 ${c.count}`,
            href: `/industries`,
          });
        }
      });
    }

    if (source === "all" || source === "story") {
      stories.forEach((s) => {
        if (`${s.name} ${s.industry} ${s.quote}`.includes(q)) {
          matches.push({
            kind: "story",
            id: s.id,
            title: s.name,
            sub: s.quote,
            meta: `${s.industry} · ${s.branch}`,
            href: `/stories`,
          });
        }
      });
    }

    return matches;
  }, [query, source]);

  return (
    <div>
      <header className="mb-8 text-center">
        <p className="text-[13px] font-semibold text-navy-600 tracking-wider uppercase mb-3">
          Search
        </p>
        <h1 className="text-[28px] lg:text-[36px] font-extrabold text-ink-900 leading-tight">
          무엇을 찾고 계신가요?
        </h1>
      </header>

      <div className="relative">
        <Search
          className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400"
          strokeWidth={2}
        />
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="지점, FAQ, 업종 사례, 스토리에서 검색"
          className="w-full h-14 rounded-2xl border border-ink-200 bg-white pl-14 pr-5 text-[15px] font-medium text-ink-900 placeholder:text-ink-300 focus:outline-none focus:border-navy-500 transition-colors shadow-[0_8px_30px_-15px_rgba(12,18,25,0.18)]"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {sources.map((s) => {
          const active = source === s.key;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setSource(s.key)}
              className={cn(
                "h-9 px-4 rounded-full text-[12.5px] font-semibold transition-all",
                active
                  ? "bg-ink-900 text-white"
                  : "bg-white border border-ink-200 text-ink-700 hover:border-ink-400",
              )}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Results */}
      <section className="mt-8">
        {!query.trim() ? (
          <EmptyHint />
        ) : hits.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-16 text-center">
            <p className="text-[14.5px] text-ink-500">
              &lsquo;{query}&rsquo; 에 대한 결과가 없어요. 다른 키워드로 시도해 보세요.
            </p>
          </div>
        ) : (
          <>
            <p className="text-[12.5px] text-ink-500 font-semibold mb-3 tnum">
              {hits.length}건의 결과
            </p>
            <ul className="space-y-2.5">
              {hits.map((h) => (
                <li key={`${h.kind}-${h.id}`}>
                  <HitRow hit={h} />
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}

function EmptyHint() {
  const suggestions = ["서울", "통신판매업", "사업자등록", "우편물", "법인"];
  return (
    <div className="rounded-3xl bg-white border border-cream-200 px-6 py-12 text-center">
      <p className="text-[14px] text-ink-500">
        검색어를 입력해 주세요. 추천 키워드:
      </p>
      <ul className="mt-4 flex flex-wrap gap-2 justify-center">
        {suggestions.map((s) => (
          <li key={s}>
            <Link
              href={`/search?q=${encodeURIComponent(s)}`}
              className="inline-flex items-center rounded-full bg-cream-100 hover:bg-cream-200 px-3 py-1.5 text-[12.5px] font-semibold text-ink-700"
            >
              {s}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HitRow({ hit }: { hit: Hit }) {
  const meta = {
    branch: { icon: MapPin, badge: "지점", color: "sage" },
    faq: { icon: HelpCircle, badge: "FAQ", color: "blue" },
    case: { icon: Briefcase, badge: "업종 사례", color: "violet" },
    story: { icon: MessageCircle, badge: "스토리", color: "amber" },
  }[hit.kind];
  const Icon = meta.icon;
  const badgeCls =
    meta.color === "sage"
      ? "bg-navy-50 text-navy-700 border-navy-200"
      : meta.color === "blue"
        ? "bg-blue-50 text-blue-600 border-blue-100"
        : meta.color === "violet"
          ? "bg-violet-50 text-violet-600 border-violet-100"
          : "bg-amber-50 text-amber-600 border-amber-200";
  return (
    <Link
      href={hit.href}
      className="block rounded-2xl bg-white border border-cream-200 hover:border-navy-300 p-5 transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cream-50 border border-cream-200 flex items-center justify-center">
          <Icon className="w-4 h-4 text-ink-600" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold",
                badgeCls,
              )}
            >
              {meta.badge}
            </span>
            <span className="text-[11px] text-ink-400">{hit.meta}</span>
          </div>
          <p className="text-[14.5px] font-bold text-ink-900 leading-snug">
            {hit.title}
          </p>
          <p className="text-[12.5px] text-ink-500 mt-1.5 line-clamp-2 leading-[1.7]">
            {hit.sub}
          </p>
        </div>
      </div>
    </Link>
  );
}
