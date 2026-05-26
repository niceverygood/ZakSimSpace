import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { ContractTrigger } from "@/components/contract/ContractTrigger";

const stats = [
  { value: "180+", label: "전국 지점" },
  { value: "12,000+", label: "누적 입주 사업자" },
  { value: "98.4%", label: "사업자등록 승인률" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-cream-100 pt-16">
      {/* Subtle blurred blobs */}
      <div
        aria-hidden
        className="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full bg-navy-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 right-1/3 w-[420px] h-[420px] rounded-full bg-amber-100/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
          {/* Left: copy */}
          <div className="max-w-xl">
            {/* Eyebrow chip */}
            <div className="inline-flex items-center gap-2 rounded-full border border-navy-300/60 bg-white/70 backdrop-blur px-3 py-1.5 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-navy-500" />
              <span className="text-[12.5px] font-semibold text-navy-700 tracking-wide">
                월 20,000원부터 시작하는 합법적인 사업장
              </span>
            </div>

            {/* Headline — Cowork City style: short, bold, declarative */}
            <h1 className="text-[40px] sm:text-[48px] lg:text-[60px] leading-[1.15] font-extrabold tracking-tight text-ink-900">
              터치 한 번이면
              <br />
              <span className="text-navy-600">전국 어디든</span>
              <br />내 사업장!
            </h1>

            {/* Subhead */}
            <p className="mt-7 text-[16px] lg:text-[18px] leading-[1.75] text-ink-500 max-w-md">
              사업자등록부터 우편물 관리, 인허가 업종 대응까지.
              <br className="hidden sm:block" />
              작심스페이스 한 곳에서 5분 만에 시작하세요.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ContractTrigger className="group inline-flex items-center gap-2 rounded-full bg-navy-600 hover:bg-navy-700 text-white font-semibold px-7 text-[15px] transition-colors shadow-[0_10px_28px_-8px_rgba(35,61,104,0.5)] h-[54px]">
                사업자등록 바로하기
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </ContractTrigger>
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-white text-ink-800 font-semibold px-7 text-[15px] border border-ink-200 hover:border-ink-400 transition-all"
                style={{ height: "54px" }}
              >
                <MapPin className="w-4 h-4 text-navy-600" strokeWidth={2.2} />
                전국 지점 둘러보기
              </Link>
            </div>

            {/* Stats */}
            <dl className="mt-14 grid grid-cols-3 gap-6 max-w-md">
              {stats.map((s) => (
                <div key={s.label} className="border-l-2 border-navy-300 pl-3.5">
                  <dt className="text-[11.5px] text-ink-400 mb-1 tracking-wide">
                    {s.label}
                  </dt>
                  <dd className="text-[20px] lg:text-[24px] font-bold text-ink-900 tracking-tight tnum">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: mascot/illustration area */}
          <div className="relative h-[420px] lg:h-[520px] hidden md:block">
            <MascotIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * CSS-rendered mascot stand-in:
 * a friendly 3D-feel character composition using gradients & shapes.
 * Mirrors the Cowork City hero composition without external image deps.
 */
function MascotIllustration() {
  return (
    <div className="relative w-full h-full">
      {/* Soft ground shadow */}
      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[78%] h-6 rounded-full bg-ink-900/10 blur-2xl"
      />
      {/* Backdrop ring */}
      <div
        aria-hidden
        className="absolute inset-x-8 top-6 bottom-12 rounded-[40%] bg-gradient-to-br from-navy-200/70 via-cream-100 to-amber-100/70 border border-white/60 shadow-[inset_0_2px_30px_rgba(255,255,255,0.6),0_30px_60px_-25px_rgba(35,61,104,0.35)]"
      />

      {/* Character body — gradient blob */}
      <div className="absolute left-[18%] right-[18%] top-[10%] bottom-[18%]">
        {/* Head */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 top-[6%] w-[44%] aspect-square rounded-full bg-gradient-to-br from-[#f7e2c4] via-[#efc99a] to-[#d49a64] shadow-[inset_-12px_-14px_30px_rgba(0,0,0,0.18),inset_8px_10px_24px_rgba(255,255,255,0.55)]"
        />
        {/* Hair */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 top-[3%] w-[48%] aspect-square rounded-full bg-gradient-to-br from-[#3b2418] to-[#1c120a] [clip-path:polygon(0_0,100%_0,100%_55%,80%_55%,75%_38%,25%_38%,20%_55%,0_55%)] shadow-[inset_-6px_-10px_20px_rgba(0,0,0,0.4)]"
        />
        {/* Eyes */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[22%] w-[44%] flex justify-between px-[18%]">
          <div className="w-2.5 h-2.5 rounded-full bg-ink-900" />
          <div className="w-2.5 h-2.5 rounded-full bg-ink-900" />
        </div>
        {/* Smile */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[31%] w-8 h-4 border-b-[3px] border-ink-800 rounded-b-full" />

        {/* Body */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 top-[42%] w-[70%] h-[55%] rounded-t-[60px] rounded-b-[28px] bg-gradient-to-br from-navy-500 via-navy-600 to-navy-700 shadow-[inset_-14px_-10px_30px_rgba(0,0,0,0.25),inset_10px_8px_24px_rgba(255,255,255,0.18)]"
        />
        {/* Floating phone */}
        <div className="absolute right-[6%] top-[42%] w-[26%] aspect-[9/16] rounded-[18px] bg-white border-2 border-ink-900/10 shadow-[0_18px_40px_-12px_rgba(12,18,25,0.35)] rotate-[8deg] overflow-hidden">
          <div className="absolute inset-x-3 top-3 h-2 rounded-full bg-ink-200" />
          <div className="absolute inset-x-3 top-7 h-12 rounded-lg bg-gradient-to-br from-navy-100 to-navy-200" />
          <div className="absolute inset-x-3 top-[78px] space-y-1.5">
            <div className="h-1.5 w-3/4 rounded-full bg-ink-100" />
            <div className="h-1.5 w-2/3 rounded-full bg-ink-100" />
            <div className="h-1.5 w-1/2 rounded-full bg-ink-100" />
          </div>
          <div className="absolute inset-x-3 bottom-3 h-6 rounded-md bg-navy-500" />
        </div>
        {/* Tiny floating sparkles */}
        <div className="absolute left-[8%] top-[20%] w-3 h-3 rotate-45 bg-amber-300 rounded-sm" />
        <div className="absolute right-[4%] top-[14%] w-2 h-2 rotate-45 bg-navy-400 rounded-sm" />
        <div className="absolute left-[14%] bottom-[16%] w-2.5 h-2.5 rotate-45 bg-amber-200 rounded-sm" />
      </div>

      {/* Pin chip near top */}
      <div className="absolute top-3 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur border border-ink-100 shadow-sm px-3 py-1.5">
        <MapPin className="w-3.5 h-3.5 text-navy-600" strokeWidth={2.5} />
        <span className="text-[12px] font-semibold text-ink-700">서울 강남 · 즉시 입주</span>
      </div>
      {/* Card chip near bottom */}
      <div className="absolute bottom-2 left-2 rounded-2xl bg-white/95 backdrop-blur border border-ink-100 shadow-sm px-4 py-2.5">
        <p className="text-[11px] text-ink-400">평균 승인까지</p>
        <p className="text-[16px] font-bold text-ink-900 tnum">2.4일</p>
      </div>
    </div>
  );
}
