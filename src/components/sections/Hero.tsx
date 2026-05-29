import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { ContractTrigger } from "@/components/contract/ContractTrigger";

const stats = [
  { value: "20,000+", label: "누적 계약수" },
  { value: "100+", label: "운영 지점" },
  { value: "98%", label: "고객만족도" },
  { value: "2분", label: "간편계약" },
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

            {/* Headline — short, bold, declarative */}
            <h1 className="text-[36px] sm:text-[44px] lg:text-[54px] leading-[1.2] font-extrabold tracking-tight text-ink-900">
              방문하거나, 기다릴 필요없이,
              <br />
              <span className="text-navy-600">2분만에</span> 원하는 사업장을
              <br />
              내 주소지로!
            </h1>

            {/* Subhead */}
            <p className="mt-7 text-[16px] lg:text-[18px] leading-[1.75] text-ink-500 max-w-md">
              365일, 24시간 언제 어디서든 신속하게
              <br className="hidden sm:block" />
              사업자 주소지 계약을 진행할 수 있습니다.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ContractTrigger className="group inline-flex items-center gap-2 rounded-full bg-navy-600 hover:bg-navy-700 text-white font-semibold px-7 text-[15px] transition-colors shadow-[0_10px_28px_-8px_rgba(35,61,104,0.5)] h-[54px]">
                <span aria-hidden>🚀</span>
                로켓 계약하기
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

            {/* Stats — 4 KPIs per client spec */}
            <dl className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-xl">
              {stats.map((s) => (
                <div key={s.label} className="border-l-2 border-navy-300 pl-3.5">
                  <dt className="text-[11.5px] text-ink-400 mb-1 tracking-wide">
                    {s.label}
                  </dt>
                  <dd className="text-[20px] lg:text-[22px] font-bold text-ink-900 tracking-tight tnum">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: 전국 지도 + 로켓 일러스트 */}
          <div className="relative h-[420px] lg:h-[520px] hidden md:block">
            <img
              src="/hero-korea-rocket.png"
              alt="전국 지점 지도와 로켓 — 작심스페이스"
              className="absolute inset-0 w-full h-full object-contain"
            />
            {/* Pin chip near top */}
            <div className="absolute top-3 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur border border-ink-100 shadow-sm px-3 py-1.5">
              <MapPin className="w-3.5 h-3.5 text-navy-600" strokeWidth={2.5} />
              <span className="text-[12px] font-semibold text-ink-700">
                전국 어디든 · 즉시 입주
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
