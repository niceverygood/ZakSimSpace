"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Rocket,
  X,
  ArrowLeft,
  MapPin,
  Calendar,
  ChevronDown,
  Check,
} from "lucide-react";
import {
  industries,
  branches as mockBranches,
  buildingTypes,
  mailOptions,
  formatKRW,
  type BusinessType,
  type Branch,
} from "@/lib/contract-data";
import { cn } from "@/lib/utils";

type Step = "setup" | "branches" | "checkout";
type Cycle = "yearly" | "monthly";
type Congestion = "all" | "congested" | "not-congested";

const MAX_INDUSTRIES = 3;

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export function ContractModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("setup");

  // Step 1/2 — setup
  const [businessType, setBusinessType] = useState<BusinessType | null>(null);
  const [selectedIndustryIds, setSelectedIndustryIds] = useState<string[]>([]);

  // Step 3 — filters
  const [region, setRegion] = useState<string>("전체");
  const [filterCycle, setFilterCycle] = useState<Cycle>("yearly");
  const [congestion, setCongestion] = useState<Congestion>("all");
  const [buildingType, setBuildingType] = useState<string>("all");
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);

  // Step 4 — checkout
  const [cycle, setCycle] = useState<Cycle>("yearly");
  const [startDate, setStartDate] = useState<string>(todayISO());
  const [mailOption, setMailOption] = useState<string>(mailOptions[0].value);

  // Live branches fetched once the modal first opens. Falls back to mock if
  // the API errors so the form keeps working in dev without sheets configured.
  const [branches, setBranches] = useState<Branch[]>(mockBranches);
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    fetch("/api/branches")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data?.branches) && data.branches.length > 0) {
          setBranches(data.branches);
        }
      })
      .catch(() => {
        /* keep mock fallback */
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep("setup");
        setBusinessType(null);
        setSelectedIndustryIds([]);
        setRegion("전체");
        setFilterCycle("yearly");
        setCongestion("all");
        setBuildingType("all");
        setSelectedBranchId(null);
        setCycle("yearly");
        setStartDate(todayISO());
        setMailOption(mailOptions[0].value);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Lock body scroll + ESC to close
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const toggleIndustry = (id: string) => {
    setSelectedIndustryIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_INDUSTRIES) return prev;
      return [...prev, id];
    });
  };

  // Region options from the live branch list (not the static mock regions).
  const regionOptions = useMemo(() => {
    const set = new Set<string>();
    for (const b of branches) if (b.region) set.add(b.region);
    return ["전체", ...Array.from(set).sort()];
  }, [branches]);

  const filteredBranches = useMemo(() => {
    return branches.filter((b) => {
      if (region !== "전체" && b.region !== region) return false;
      if (congestion === "congested" && !b.congested) return false;
      if (congestion === "not-congested" && b.congested) return false;
      if (buildingType !== "all" && b.buildingType !== buildingType) return false;
      return true;
    });
  }, [branches, region, congestion, buildingType]);

  const selectedBranch = useMemo(
    () => branches.find((b) => b.id === selectedBranchId) ?? null,
    [branches, selectedBranchId],
  );

  const selectedIndustryTitles = selectedIndustryIds
    .map((id) => industries.find((i) => i.id === id)?.title)
    .filter(Boolean) as string[];

  const businessTypeLabel =
    businessType === "individual"
      ? "개인사업자"
      : businessType === "corporate"
        ? "법인사업자"
        : "";

  const setupCanProceed =
    businessType !== null && selectedIndustryIds.length > 0;

  // Pricing for checkout
  const unitPrice = selectedBranch
    ? cycle === "yearly"
      ? selectedBranch.yearlyPrice
      : selectedBranch.monthlyPrice
    : 0;
  const mailAddon =
    mailOption === "scan-full" ? (cycle === "yearly" ? 36000 : 3000) : 0;
  const total = unitPrice + mailAddon;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contract-modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="모달 닫기"
        className="absolute inset-0 bg-ink-900/55 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
        onClick={onClose}
      />

      {/* Card */}
      <div
        className={cn(
          "relative w-full max-w-[760px] max-h-[92vh] bg-white rounded-3xl shadow-[0_40px_120px_-20px_rgba(12,18,25,0.55)]",
          "flex flex-col overflow-hidden animate-[modalIn_0.25s_cubic-bezier(0.22,1,0.36,1)]",
        )}
      >
        {/* Header */}
        <ModalHeader
          step={step}
          branchName={selectedBranch?.name}
          onBack={() => {
            if (step === "checkout") setStep("branches");
            else if (step === "branches") setStep("setup");
          }}
          onClose={onClose}
        />

        {/* Body (scrollable) */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 pb-6">
          {step === "setup" && (
            <SetupStep
              businessType={businessType}
              setBusinessType={setBusinessType}
              selectedIndustryIds={selectedIndustryIds}
              toggleIndustry={toggleIndustry}
            />
          )}

          {step === "branches" && (
            <BranchesStep
              region={region}
              setRegion={setRegion}
              regionOptions={regionOptions}
              cycle={filterCycle}
              setCycle={setFilterCycle}
              congestion={congestion}
              setCongestion={setCongestion}
              buildingType={buildingType}
              setBuildingType={setBuildingType}
              businessTypeLabel={businessTypeLabel}
              industryLabels={selectedIndustryTitles}
              filteredBranches={filteredBranches}
              selectedBranchId={selectedBranchId}
              onPick={(id) => {
                setSelectedBranchId(id);
                setCycle(filterCycle);
                setStep("checkout");
              }}
            />
          )}

          {step === "checkout" && selectedBranch && (
            <CheckoutStep
              branch={selectedBranch}
              businessTypeLabel={businessTypeLabel}
              industryLabels={selectedIndustryTitles}
              cycle={cycle}
              setCycle={setCycle}
              startDate={startDate}
              setStartDate={setStartDate}
              mailOption={mailOption}
              setMailOption={setMailOption}
              total={total}
              unitPrice={unitPrice}
              mailAddon={mailAddon}
              onReselect={() => setStep("setup")}
            />
          )}
        </div>

        {/* Sticky bottom CTA */}
        <div className="border-t border-cream-200 bg-white px-6 sm:px-10 py-4">
          {step === "setup" && (
            <button
              type="button"
              disabled={!setupCanProceed}
              onClick={() => setStep("branches")}
              className={cn(
                "w-full h-14 rounded-2xl font-bold text-[15px] transition-colors",
                setupCanProceed
                  ? "bg-navy-600 hover:bg-navy-700 text-white"
                  : "bg-navy-200 text-white cursor-not-allowed",
              )}
            >
              지점 보기
              {selectedIndustryIds.length > 0 && (
                <span className="ml-2 text-white/80 tnum text-[13px]">
                  ({selectedIndustryIds.length}/{MAX_INDUSTRIES})
                </span>
              )}
            </button>
          )}
          {step === "branches" && (
            <p className="text-center text-[12.5px] text-ink-400">
              원하는 지점을 선택하면 결제 화면으로 이동합니다.
            </p>
          )}
          {step === "checkout" && selectedBranch && (
            <button
              type="button"
              onClick={() => {
                onClose();
                router.push(
                  `/checkout/${selectedBranch.id}?cycle=${cycle}`,
                );
              }}
              className="w-full h-14 rounded-2xl font-bold text-[15px] bg-navy-600 hover:bg-navy-700 text-white transition-colors"
            >
              결제하기 · {formatKRW(total)}
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98) }
          to   { opacity: 1; transform: translateY(0)    scale(1)    }
        }
      `}</style>
    </div>
  );
}

/* ─────────── Header ─────────── */

function ModalHeader({
  step,
  branchName,
  onBack,
  onClose,
}: {
  step: Step;
  branchName?: string;
  onBack: () => void;
  onClose: () => void;
}) {
  if (step === "setup") {
    return (
      <div className="relative px-6 sm:px-10 pt-8 pb-6 text-center">
        <button
          type="button"
          aria-label="닫기"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full hover:bg-cream-100 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-ink-500" strokeWidth={2} />
        </button>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-navy-50 border border-navy-200 mb-4">
          <Rocket className="w-5 h-5 text-navy-700" strokeWidth={2} />
        </div>
        <h2
          id="contract-modal-title"
          className="text-[22px] sm:text-[24px] font-extrabold text-ink-900 leading-[1.3]"
        >
          작심스페이스 주소지를
          <br />
          빠르게 계약할까요?
        </h2>
      </div>
    );
  }

  return (
    <div className="relative px-6 sm:px-10 pt-6 pb-5 flex items-center gap-3 border-b border-cream-200">
      <button
        type="button"
        aria-label="뒤로"
        onClick={onBack}
        className="w-9 h-9 rounded-full hover:bg-cream-100 flex items-center justify-center transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-ink-700" strokeWidth={2} />
      </button>
      <h2
        id="contract-modal-title"
        className="text-[16.5px] sm:text-[18px] font-extrabold text-ink-900"
      >
        {step === "branches" ? "지점 선택" : branchName}
      </h2>
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="ml-auto w-9 h-9 rounded-full hover:bg-cream-100 flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-ink-500" strokeWidth={2} />
      </button>
    </div>
  );
}

/* ─────────── Step 1+2: Setup ─────────── */

function SetupStep({
  businessType,
  setBusinessType,
  selectedIndustryIds,
  toggleIndustry,
}: {
  businessType: BusinessType | null;
  setBusinessType: (t: BusinessType) => void;
  selectedIndustryIds: string[];
  toggleIndustry: (id: string) => void;
}) {
  return (
    <div className="pt-2 pb-2">
      {/* Business type */}
      <div>
        <p className="text-[14px] font-bold text-ink-900 mb-3">
          사업자 유형이 어떻게 되시나요?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              { v: "individual", l: "개인사업자" },
              { v: "corporate", l: "법인사업자" },
            ] as const
          ).map((o) => {
            const active = businessType === o.v;
            return (
              <button
                key={o.v}
                type="button"
                onClick={() => setBusinessType(o.v)}
                className={cn(
                  "h-14 rounded-2xl border text-[14.5px] font-semibold transition-all",
                  active
                    ? "border-navy-600 bg-navy-50 text-navy-700 ring-2 ring-navy-600/15"
                    : "border-ink-200 bg-white text-ink-700 hover:border-ink-300",
                )}
                aria-pressed={active}
              >
                {o.l}
              </button>
            );
          })}
        </div>
      </div>

      {/* Industry — only after type selected */}
      {businessType && (
        <div className="mt-8 animate-[fadeIn_0.2s_ease]">
          <div className="flex items-end justify-between mb-3">
            <p className="text-[14px] font-bold text-ink-900">
              업종을 선택해주세요
            </p>
            <p className="text-[12.5px] text-ink-400 tnum">
              최대 {MAX_INDUSTRIES}개 ({selectedIndustryIds.length}/
              {MAX_INDUSTRIES})
            </p>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {industries.map((ind) => {
              const active = selectedIndustryIds.includes(ind.id);
              const disabled =
                !active && selectedIndustryIds.length >= MAX_INDUSTRIES;
              return (
                <li key={ind.id}>
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => toggleIndustry(ind.id)}
                    className={cn(
                      "w-full text-left rounded-2xl border px-4 py-3.5 transition-all",
                      active
                        ? "border-navy-600 bg-navy-50 ring-2 ring-navy-600/15"
                        : "border-ink-200 bg-white hover:border-ink-300",
                      disabled && "opacity-50 cursor-not-allowed",
                    )}
                    aria-pressed={active}
                  >
                    <p
                      className={cn(
                        "text-[13.5px] font-bold leading-tight",
                        active ? "text-navy-700" : "text-ink-900",
                      )}
                    >
                      {ind.title}
                    </p>
                    <p className="text-[11.5px] text-ink-400 mt-1 leading-snug">
                      {ind.subtitle}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─────────── Step 3: Branches ─────────── */

function BranchesStep({
  region,
  setRegion,
  regionOptions,
  cycle,
  setCycle,
  congestion,
  setCongestion,
  buildingType,
  setBuildingType,
  businessTypeLabel,
  industryLabels,
  filteredBranches,
  selectedBranchId,
  onPick,
}: {
  region: string;
  setRegion: (r: string) => void;
  regionOptions: string[];
  cycle: Cycle;
  setCycle: (c: Cycle) => void;
  congestion: Congestion;
  setCongestion: (c: Congestion) => void;
  buildingType: string;
  setBuildingType: (b: string) => void;
  businessTypeLabel: string;
  industryLabels: string[];
  filteredBranches: Branch[];
  selectedBranchId: string | null;
  onPick: (id: string) => void;
}) {
  return (
    <div className="pt-5 pb-2">
      {/* Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <FilterDropdown
          label="지역"
          value={region}
          options={regionOptions.map((r) => ({ value: r, label: r }))}
          onChange={(v) => setRegion(v)}
        />

        <div>
          <label className="block text-[11.5px] font-semibold text-ink-500 mb-1.5">
            결제 주기
          </label>
          <div className="grid grid-cols-2 h-11 rounded-xl border border-ink-200 overflow-hidden">
            {(
              [
                { v: "yearly", l: "연간" },
                { v: "monthly", l: "월간" },
              ] as const
            ).map((o) => (
              <button
                key={o.v}
                type="button"
                onClick={() => setCycle(o.v)}
                className={cn(
                  "text-[13px] font-semibold transition-colors",
                  cycle === o.v
                    ? "bg-navy-50 text-navy-700 border-navy-600 ring-1 ring-navy-600/40"
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
                  onClick={() =>
                    setCongestion(active ? "all" : o.v)
                  }
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
          options={[...buildingTypes]}
          onChange={setBuildingType}
        />
      </div>

      {/* Chips + count */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <Chip>{businessTypeLabel}</Chip>
          {industryLabels.slice(0, 1).map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
          {industryLabels.length > 1 && (
            <Chip>+{industryLabels.length - 1}</Chip>
          )}
          <Chip>{cycle === "yearly" ? "연간" : "월간"}</Chip>
        </div>
        <p className="text-[12.5px] text-ink-500 font-semibold tnum">
          {filteredBranches.length}개 지점
        </p>
      </div>

      {/* Branch grid */}
      {filteredBranches.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 px-6 py-14 text-center">
          <p className="text-[14px] text-ink-500">
            조건에 맞는 지점이 없어요. 필터를 조정해 주세요.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredBranches.map((b) => {
            const active = selectedBranchId === b.id;
            const price = cycle === "yearly" ? b.yearlyPrice : b.monthlyPrice;
            return (
              <li key={b.id}>
                <button
                  type="button"
                  onClick={() => onPick(b.id)}
                  className={cn(
                    "w-full text-left rounded-2xl border bg-white p-4 transition-all hover:-translate-y-0.5",
                    active
                      ? "border-navy-600 ring-2 ring-navy-600/15"
                      : "border-ink-200 hover:border-navy-300",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[14px] font-bold text-ink-900 leading-snug">
                      {b.name}
                    </p>
                    <MapPin
                      className="w-4 h-4 text-ink-300 mt-0.5 flex-shrink-0"
                      strokeWidth={2}
                    />
                  </div>
                  <p className="text-[12px] text-ink-500 mt-2 leading-snug">
                    {b.address}
                  </p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <Tag tone={b.congested ? "warm" : "green"}>
                      {b.congested ? "과밀" : "비과밀"}
                    </Tag>
                    {b.inspectable && <Tag tone="blue">실사가능</Tag>}
                  </div>
                  <p className="text-right text-[15.5px] font-extrabold text-ink-900 tnum mt-3">
                    {formatKRW(price)}
                    <span className="text-[11.5px] font-semibold text-ink-400 ml-1">
                      /{cycle === "yearly" ? "연" : "월"}
                    </span>
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      )}
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

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-cream-100 px-2.5 py-1 text-[11.5px] font-semibold text-ink-700">
      {children}
    </span>
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

/* ─────────── Step 4: Checkout ─────────── */

function CheckoutStep({
  branch,
  businessTypeLabel,
  industryLabels,
  cycle,
  setCycle,
  startDate,
  setStartDate,
  mailOption,
  setMailOption,
  total,
  unitPrice,
  mailAddon,
  onReselect,
}: {
  branch: Branch;
  businessTypeLabel: string;
  industryLabels: string[];
  cycle: Cycle;
  setCycle: (c: Cycle) => void;
  startDate: string;
  setStartDate: (d: string) => void;
  mailOption: string;
  setMailOption: (s: string) => void;
  total: number;
  unitPrice: number;
  mailAddon: number;
  onReselect: () => void;
}) {

  return (
    <div className="pt-5 pb-2">
      {/* Selection chips with re-select */}
      <div className="flex flex-wrap items-center gap-1.5 mb-7">
        <Chip>{businessTypeLabel}</Chip>
        {industryLabels.slice(0, 2).map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
        {industryLabels.length > 2 && <Chip>+{industryLabels.length - 2}</Chip>}
        <button
          type="button"
          onClick={onReselect}
          className="text-[12px] text-ink-500 underline underline-offset-2 hover:text-ink-800 ml-1"
        >
          재선택
        </button>
      </div>

      {/* Payment cycle */}
      <Field label="결제 주기">
        <div className="grid grid-cols-2 h-12 rounded-2xl border border-ink-200 overflow-hidden">
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
                "text-[14px] font-bold transition-colors",
                cycle === o.v
                  ? "bg-navy-50 text-navy-700"
                  : "bg-white text-ink-500 hover:text-ink-800",
              )}
            >
              {o.l}
            </button>
          ))}
        </div>
      </Field>

      {/* Start date */}
      <Field label="계약 시작일">
        <div className="relative h-12 rounded-2xl border border-ink-200 px-4 flex items-center gap-3">
          <Calendar className="w-4 h-4 text-ink-400" strokeWidth={2} />
          <input
            type="date"
            value={startDate}
            min={todayISO()}
            onChange={(e) => setStartDate(e.target.value)}
            className="flex-1 bg-transparent text-[14px] font-semibold text-ink-800 focus:outline-none tnum"
          />
        </div>
      </Field>

      {/* Mail handling */}
      <Field label="일반 우편물 대리 개봉">
        <div className="relative">
          <select
            value={mailOption}
            onChange={(e) => setMailOption(e.target.value)}
            className="w-full h-12 appearance-none rounded-2xl border border-ink-200 bg-white px-4 pr-10 text-[14px] font-semibold text-ink-800 focus:outline-none focus:border-navy-500"
          >
            {mailOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400"
            strokeWidth={2}
          />
        </div>
      </Field>

      {/* Summary */}
      <div className="mt-8 border-t border-cream-200 pt-5 space-y-2.5">
        <Row label={`오피스 × ${cycle === "yearly" ? "1년" : "1개월"}`} value={formatKRW(unitPrice)} />
        {mailAddon > 0 && (
          <Row label="우편물 내용 스캔" value={formatKRW(mailAddon)} />
        )}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-cream-200">
          <p className="text-[15px] font-bold text-ink-900">결제 금액</p>
          <p className="text-[20px] font-extrabold text-ink-900 tnum">
            {formatKRW(total)}{" "}
            <span className="text-[12px] font-semibold text-ink-400">
              (VAT포함)
            </span>
          </p>
        </div>
      </div>

      {/* Trust line */}
      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy-50 border border-navy-200 px-3 py-1.5">
        <Check className="w-3.5 h-3.5 text-navy-700" strokeWidth={2.5} />
        <span className="text-[12px] font-semibold text-navy-700">
          결제 즉시 임대차계약서 자동 발급
        </span>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 first:mt-0 grid grid-cols-1 sm:grid-cols-[1fr_auto] sm:items-center gap-y-2 gap-x-6">
      <p className="text-[13.5px] font-bold text-ink-900">{label}</p>
      <div className="sm:min-w-[260px]">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-[13.5px] text-ink-500">{label}</p>
      <p className="text-[14px] font-bold text-ink-900 tnum">{value}</p>
    </div>
  );
}
