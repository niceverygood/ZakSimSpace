import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const stats = [
  { value: "180+", label: "전국 지점" },
  { value: "12,000+", label: "누적 입주 사업자" },
  { value: "98.4%", label: "사업자등록 승인률" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white pt-16">
      {/* Background gradient layers */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,theme(colors.navy.700)_0%,theme(colors.navy.900)_45%,theme(colors.navy.950)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(ellipse_at_bottom_right,theme(colors.gold.600)_0%,transparent_50%)]"
      />
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-32 lg:pt-32 lg:pb-44">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/5 px-3 py-1 mb-7">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" strokeWidth={2} />
            <span className="text-[12px] font-medium text-gold-300 tracking-wide">
              월 20,000원부터 시작하는 사업장
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[44px] lg:text-[64px] leading-[1.12] font-bold tracking-tight">
            결심한 그날,
            <br />
            <span className="text-gold-400">사업의 첫 주소</span>가 됩니다
          </h1>

          {/* Subhead */}
          <p className="mt-7 text-[17px] lg:text-[19px] leading-[1.7] text-navy-200 max-w-xl">
            사업자등록부터 우편물 관리, 인허가 업종 대응까지.
            <br />
            전국 어디든 작심스페이스 한 곳에서 해결하세요.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-7 h-13 text-[15px] transition-colors shadow-[0_8px_24px_-4px_rgba(212,175,55,0.45)]"
              style={{ height: "52px" }}
            >
              빠른 계약 시작
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-full border border-white/25 hover:border-white/60 hover:bg-white/5 text-white font-medium px-7 text-[15px] transition-all"
              style={{ height: "52px" }}
            >
              이용 안내 보기
            </Link>
          </div>

          {/* Stats */}
          <dl className="mt-16 grid grid-cols-3 gap-6 max-w-lg">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-[12px] text-navy-300 mb-1.5">{s.label}</dt>
                <dd className="text-[22px] lg:text-[26px] font-bold text-white tracking-tight">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Floating decorative element (placeholder for 3D illustration) */}
      <div
        aria-hidden
        className="hidden lg:block absolute right-[-80px] top-1/2 -translate-y-1/2 w-[560px] h-[560px] -z-10"
      >
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,theme(colors.gold.500)/8%,transparent_40%,theme(colors.navy.600)/40%_70%,transparent)] blur-3xl" />
        <div className="absolute inset-12 rounded-full border border-white/5" />
        <div className="absolute inset-24 rounded-full border border-white/[0.03]" />
        <div className="absolute inset-36 rounded-full border border-gold-500/10" />
      </div>
    </section>
  );
}
