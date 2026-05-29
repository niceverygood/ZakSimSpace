"use client";

import { useMemo, useState } from "react";
import { MapPin, Search, ChevronDown } from "lucide-react";
import {
  buildingTypes,
  formatKRW,
  type Branch,
} from "@/lib/contract-data";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { BranchesMap } from "@/components/map/BranchesMap";
import { cn } from "@/lib/utils";

type Cycle = "yearly" | "monthly";
type Congestion = "all" | "congested" | "not-congested";

export function LocationsBrowser({ branches }: { branches: Branch[] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string>("전체");

  // Region options derived from the live branches, not a static list — so the
  // dropdown only shows regions that actually have branches.
  const regionOptions = useMemo(() => {
    const set = new Set<string>();
    for (const b of branches) if (b.region) set.add(b.region);
    return ["전체", ...Array.from(set).sort()];
  }, [branches]);
  const [cycle, setCycle] = useState<Cycle>("yearly");
  const [congestion, setCongestion] = useState<Congestion>("all");
  const [buildingType, setBuildingType] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim();
    return branches.filter((b) => {
      if (region !== "전체" && b.region !== region) return false;
      if (congestion === "congested" && !b.congested) return false;
      if (congestion === "not-congested" && b.congested) return false;
      if (buildingType !== "all" && b.buildingType !== buildingType) return false;
      if (q && !`${b.name} ${b.address}`.includes(q)) return false;
      return true;
    });
  }, [branches, region, congestion, buildingType, query]);

  return (
    <section className="bg-cream-50 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Filter bar */}
        <div className="rounded-3xl border border-cream-200 bg-white p-5 lg:p-6 shadow-[0_12px_40px_-30px_rgba(12,18,25,0.18)] mb-6">
          {/* Search row */}
          <div className="relative mb-4">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400"
              strokeWidth={2}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="지점명 또는 주소로 검색"
              className="w-full h-12 rounded-xl border border-ink-200 bg-cream-50 pl-11 pr-4 text-[14px] font-medium text-ink-800 placeholder:text-ink-300 focus:outline-none focus:border-navy-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Filter row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <FilterDropdown
              label="지역"
              value={region}
              onChange={(v) => setRegion(v)}
              options={regionOptions.map((r) => ({ value: r, label: r }))}
            />
            <div>
              <label className="block text-[11.5px] font-semibold text-ink-500 mb-1.5">
                결제 주기
              </label>
              <div className="grid grid-cols-2 h-11 rounded-xl border border-ink-200 overflow-hidden">
                {(
                  [
                    { v: "monthly" as const, l: "월간" },
                    { v: "yearly" as const, l: "연간" },
                  ]
                ).map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => setCycle(o.v)}
                    className={cn(
                      "text-[13px] font-semibold transition-colors",
                      cycle === o.v
                        ? "bg-navy-50 text-navy-700"
                        : "bg-white text-ink-500 hover:text-ink-800",
                    )}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold text-ink-500 mb-1.5">
                과밀 여부
              </label>
              <div className="grid grid-cols-2 h-11 rounded-xl border border-ink-200 overflow-hidden">
                {(
                  [
                    { v: "congested" as const, l: "과밀" },
                    { v: "not-congested" as const, l: "비과밀" },
                  ]
                ).map((o) => {
                  const active = congestion === o.v;
                  return (
                    <button
                      key={o.v}
                      type="button"
                      onClick={() => setCongestion(active ? "all" : o.v)}
                      className={cn(
                        "text-[13px] font-semibold transition-colors",
                        active
                          ? "bg-navy-50 text-navy-700"
                          : "bg-white text-ink-500 hover:text-ink-800",
                      )}
                    >
                      {o.l}
                    </button>
                  );
                })}
              </div>
            </div>
            <FilterDropdown
              label="건축물 용도"
              value={buildingType}
              onChange={setBuildingType}
              options={[...buildingTypes]}
            />
          </div>

          <div className="mt-4 flex items-center justify-end">
            <p className="text-[12.5px] text-ink-500 font-semibold tnum">
              {filtered.length}개 지점
            </p>
          </div>
        </div>

        {/* 2-col list + map — 좁은 list (왼) + 큰 지도 (오) */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-4 h-[720px]">
          {/* List */}
          <aside className="rounded-3xl border border-cream-200 bg-white overflow-hidden flex flex-col h-full">
            <div className="px-5 py-4 border-b border-cream-200 bg-cream-50 flex-shrink-0">
              <p className="text-[13px] font-bold text-ink-800 tnum">
                {filtered.length}개 지점
              </p>
            </div>
            <ul className="flex-1 overflow-y-auto divide-y divide-cream-200">
              {filtered.length === 0 ? (
                <li className="px-6 py-12 text-center text-[13px] text-ink-500">
                  조건에 맞는 지점이 없어요.
                </li>
              ) : (
                filtered.map((b) => (
                  <li key={b.id}>
                    <BranchListItem
                      branch={b}
                      cycle={cycle}
                      selected={selectedId === b.id}
                      onClick={() => setSelectedId(b.id)}
                    />
                  </li>
                ))
              )}
            </ul>
          </aside>

          {/* Map — fills column */}
          <div className="h-full min-h-[480px]">
            <BranchesMap
              branches={filtered}
              selectedId={selectedId}
              onSelect={setSelectedId}
              cycle={cycle}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function BranchListItem({
  branch,
  cycle,
  selected,
  onClick,
}: {
  branch: Branch;
  cycle: Cycle;
  selected: boolean;
  onClick: () => void;
}) {
  const price = cycle === "yearly" ? branch.yearlyPrice : branch.monthlyPrice;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={cn(
        "px-5 py-4 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-navy-500",
        selected ? "bg-navy-50" : "hover:bg-cream-50",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-bold text-ink-900 group-hover:text-navy-700">
            {branch.name}
          </p>
          <p className="text-[12px] text-ink-500 mt-1.5 line-clamp-1">
            {branch.address}
          </p>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <FavoriteButton
            branchId={branch.id}
            branchName={branch.name}
            size="sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-1.5 mt-3 flex-wrap">
        <Tag tone={branch.congested ? "warm" : "green"}>
          {branch.congested ? "과밀" : "비과밀"}
        </Tag>
        {branch.inspectable && <Tag tone="blue">실사가능</Tag>}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-[11.5px] text-ink-400">
          {cycle === "yearly" ? "연간" : "월"} 이용료
        </span>
        <p className="text-[16px] font-extrabold text-amber-500 tnum">
          {formatKRW(price)}
          <span className="text-[11px] font-semibold text-ink-400 ml-0.5">
            /{cycle === "yearly" ? "연" : "월"}
          </span>
        </p>
      </div>
    </div>
  );
}

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[11.5px] font-semibold text-ink-500 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-11 appearance-none rounded-xl border border-ink-200 bg-white pl-3.5 pr-9 text-[13px] font-semibold text-ink-800 focus:outline-none focus:border-navy-500"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400"
          strokeWidth={2}
        />
      </div>
    </div>
  );
}

function Tag({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "green" | "warm" | "blue" | "violet";
}) {
  const cls =
    tone === "green"
      ? "bg-navy-50 text-navy-700 border-navy-200"
      : tone === "warm"
        ? "bg-rose-50 text-rose-600 border-rose-200"
        : tone === "blue"
          ? "bg-blue-50 text-blue-600 border-blue-100"
          : "bg-violet-50 text-violet-600 border-violet-100";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10.5px] font-semibold",
        cls,
      )}
    >
      {children}
    </span>
  );
}
