"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Search, ChevronDown, ArrowRight } from "lucide-react";
import {
  branches,
  regions,
  buildingTypes,
  formatKRW,
  type Branch,
} from "@/lib/contract-data";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { cn } from "@/lib/utils";

type Cycle = "yearly" | "monthly";
type Congestion = "all" | "congested" | "not-congested";

export function LocationsBrowser() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<(typeof regions)[number]>("전체");
  const [cycle, setCycle] = useState<Cycle>("yearly");
  const [congestion, setCongestion] = useState<Congestion>("all");
  const [buildingType, setBuildingType] = useState<string>("all");
  const [licenseOnly, setLicenseOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim();
    return branches.filter((b) => {
      if (region !== "전체" && b.region !== region) return false;
      if (congestion === "congested" && !b.congested) return false;
      if (congestion === "not-congested" && b.congested) return false;
      if (buildingType !== "all" && b.buildingType !== buildingType) return false;
      if (licenseOnly && !b.supportsLicense) return false;
      if (q && !`${b.name} ${b.address}`.includes(q)) return false;
      return true;
    });
  }, [region, congestion, buildingType, licenseOnly, query]);

  return (
    <section className="bg-cream-50 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Filter bar */}
        <div className="rounded-3xl border border-cream-200 bg-white p-5 lg:p-6 shadow-[0_12px_40px_-30px_rgba(12,18,25,0.18)]">
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
              className="w-full h-12 rounded-xl border border-ink-200 bg-cream-50 pl-11 pr-4 text-[14px] font-medium text-ink-800 placeholder:text-ink-300 focus:outline-none focus:border-sage-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Filter row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <FilterDropdown
              label="지역"
              value={region}
              onChange={(v) => setRegion(v as (typeof regions)[number])}
              options={regions.map((r) => ({ value: r, label: r }))}
            />
            <div>
              <label className="block text-[11.5px] font-semibold text-ink-500 mb-1.5">
                결제 주기
              </label>
              <div className="grid grid-cols-2 h-11 rounded-xl border border-ink-200 overflow-hidden">
                {(
                  [
                    { v: "yearly" as const, l: "연간" },
                    { v: "monthly" as const, l: "월간" },
                  ]
                ).map((o) => (
                  <button
                    key={o.v}
                    type="button"
                    onClick={() => setCycle(o.v)}
                    className={cn(
                      "text-[13px] font-semibold transition-colors",
                      cycle === o.v
                        ? "bg-sage-50 text-sage-700"
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
                          ? "bg-sage-50 text-sage-700"
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

          {/* License toggle */}
          <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={licenseOnly}
                onChange={(e) => setLicenseOnly(e.target.checked)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "relative w-11 h-6 rounded-full transition-colors",
                  licenseOnly ? "bg-sage-600" : "bg-ink-200",
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",
                    licenseOnly && "translate-x-5",
                  )}
                />
              </span>
              <span className="text-[13px] font-semibold text-ink-700">
                인허가 가능 지점만 보기
              </span>
            </label>
            <p className="text-[12.5px] text-ink-500 font-semibold tnum">
              {filtered.length}개 지점
            </p>
          </div>
        </div>

        {/* Results grid */}
        <div className="mt-8">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-ink-200 bg-white px-6 py-20 text-center">
              <p className="text-[15px] text-ink-500">
                조건에 맞는 지점이 없어요. 필터를 조정해 주세요.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((b) => (
                <li key={b.id}>
                  <BranchCard branch={b} cycle={cycle} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function BranchCard({ branch, cycle }: { branch: Branch; cycle: Cycle }) {
  const price = cycle === "yearly" ? branch.yearlyPrice : branch.monthlyPrice;
  return (
    <Link
      href={`/locations/${branch.id}`}
      className="group block rounded-2xl bg-white border border-ink-100 p-5 hover:border-sage-300 hover:-translate-y-0.5 transition-all duration-300 relative"
    >
      {/* Favorite */}
      <div className="absolute top-7 right-7 z-10">
        <FavoriteButton
          branchId={branch.id}
          branchName={branch.name}
          size="sm"
        />
      </div>
      {/* Image placeholder */}
      <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-sage-200 to-sage-400 mb-4 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:24px_24px]"
        />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-2.5 py-1">
          <MapPin
            className="w-3 h-3 text-sage-700"
            strokeWidth={2.5}
          />
          <span className="text-[10.5px] font-bold text-ink-800">
            {branch.region}
          </span>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3">
        <p className="text-[15.5px] font-bold text-ink-900 leading-snug group-hover:text-sage-700 transition-colors">
          {branch.name}
        </p>
        <ArrowRight
          className="w-4 h-4 text-ink-300 group-hover:text-sage-700 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5"
          strokeWidth={2}
        />
      </div>
      <p className="text-[12.5px] text-ink-500 mt-2 leading-snug">
        {branch.address}
      </p>

      <div className="flex items-center gap-1.5 mt-3">
        <Tag tone={branch.congested ? "warm" : "green"}>
          {branch.congested ? "과밀" : "비과밀"}
        </Tag>
        {branch.inspectable && <Tag tone="blue">실사가능</Tag>}
        {branch.supportsLicense && <Tag tone="violet">인허가</Tag>}
      </div>

      <div className="mt-4 pt-4 border-t border-cream-200 flex items-baseline justify-between">
        <span className="text-[12px] text-ink-400">
          {cycle === "yearly" ? "연간 이용료" : "월 이용료"}
        </span>
        <p className="text-[16px] font-extrabold text-ink-900 tnum">
          {formatKRW(price)}
          <span className="text-[11.5px] font-semibold text-ink-400 ml-0.5">
            /{cycle === "yearly" ? "연" : "월"}
          </span>
        </p>
      </div>
    </Link>
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
          className="w-full h-11 appearance-none rounded-xl border border-ink-200 bg-white pl-3.5 pr-9 text-[13px] font-semibold text-ink-800 focus:outline-none focus:border-sage-500"
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
      ? "bg-sage-50 text-sage-700 border-sage-200"
      : tone === "warm"
        ? "bg-cream-100 text-ink-500 border-cream-200"
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
