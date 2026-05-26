import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Comparison } from "@/components/sections/Comparison";
import { ContractTrigger } from "@/components/contract/ContractTrigger";
import { formatKRW } from "@/lib/contract-data";

export const metadata: Metadata = {
  title: "오피스 가격",
  description:
    "월 20,000원부터 시작하는 사업장. 보증금·관리비·갱신비 0원. 작심스페이스는 단 하나의 정직한 요금제로 운영됩니다.",
};

const included = [
  "관할 세무서 사업자등록 가능 주소",
  "임대차계약서 즉시 발급 (전자/PDF)",
  "우편물 도착 알림톡 + 표지 스캔",
  "사업자등록 반려 시 무료 재신청 지원",
  "마이페이지 계약·세금계산서 통합 관리",
  "지점 이전 무제한 (영업일 기준 3일 이내)",
];

const excluded = [
  { label: "보증금", value: "0원" },
  { label: "관리비", value: "0원" },
  { label: "회비 / 갱신비", value: "0원" },
  { label: "인테리어 부담금", value: "0원" },
];

const addons = [
  {
    name: "우편물 내용 전체 스캔",
    desc: "도착한 모든 우편물의 내용물까지 PDF로 스캔",
    price: "월 3,000원",
  },
  {
    name: "지정 주소로 택배 전송",
    desc: "원하는 주소로 한 번에 모아 발송 (실비 청구)",
    price: "건당 실비",
  },
  {
    name: "인허가 업종 주소지 지원",
    desc: "통신판매·식품 등 인허가 업종 전용 지점 매칭",
    price: "연 50,000원",
  },
  {
    name: "법인 설립 등기 패키지",
    desc: "본점 주소 임대 + 등기 대행사 연결",
    price: "별도 견적",
  },
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        {/* Hero */}
        <section className="bg-cream-100 border-b border-cream-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14 lg:py-20 text-center">
            <p className="text-[13px] font-semibold text-sage-600 tracking-wider uppercase mb-3">
              Pricing
            </p>
            <h1 className="text-[32px] lg:text-[48px] font-extrabold text-ink-900 leading-[1.2] tracking-tight">
              하나의 요금제
              <br />
              <span className="text-sage-600">숨겨진 비용은 없습니다</span>
            </h1>
            <p className="mt-5 text-[15.5px] lg:text-[17px] text-ink-500 max-w-xl mx-auto leading-[1.7]">
              월 정액 하나로 끝. 입주 후에도 관리비, 갱신비, 자료 발급비를 따로
              청구하지 않습니다.
            </p>
          </div>
        </section>

        {/* Plan card */}
        <section className="bg-cream-50 py-14 lg:py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="relative rounded-[28px] bg-white border border-cream-200 shadow-[0_30px_80px_-40px_rgba(12,18,25,0.35)] overflow-hidden">
              {/* Top accent strip */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sage-400 via-sage-600 to-sage-400" />

              <div className="p-8 lg:p-12 grid lg:grid-cols-[1fr_auto] gap-8 items-start">
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 mb-5">
                    <Sparkles className="w-3 h-3 text-amber-500" strokeWidth={2.5} />
                    <span className="text-[11.5px] font-bold text-amber-600">
                      가장 인기 있는 요금제
                    </span>
                  </div>
                  <p className="text-[15px] font-bold text-sage-700">
                    작심스페이스 베이직
                  </p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-[44px] lg:text-[56px] font-extrabold text-ink-900 leading-none tnum">
                      {formatKRW(20000)}
                    </span>
                    <span className="text-[15px] font-semibold text-ink-400">
                      /월
                    </span>
                  </div>
                  <p className="text-[13.5px] text-ink-500 mt-2">
                    연간 결제 시{" "}
                    <span className="font-bold text-ink-800 tnum">
                      {formatKRW(240000)}
                    </span>{" "}
                    · VAT 포함
                  </p>
                </div>

                <ContractTrigger className="inline-flex items-center justify-center gap-2 rounded-full bg-sage-600 hover:bg-sage-700 text-white font-bold px-7 h-13 text-[14.5px] transition-colors shadow-[0_12px_30px_-10px_rgba(67,105,63,0.55)] h-[52px]">
                  지점 보러 가기
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </ContractTrigger>
              </div>

              <div className="border-t border-cream-200 px-8 lg:px-12 py-7 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {included.map((it) => (
                  <div
                    key={it}
                    className="flex items-start gap-2 text-[13.5px] text-ink-700"
                  >
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-sage-100 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-sage-700" strokeWidth={3} />
                    </span>
                    {it}
                  </div>
                ))}
              </div>

              {/* Zero-cost row */}
              <div className="bg-sage-50 border-t border-sage-200 px-8 lg:px-12 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {excluded.map((c) => (
                  <div key={c.label} className="text-center">
                    <p className="text-[11.5px] text-sage-700 font-semibold">
                      {c.label}
                    </p>
                    <p className="text-[18px] font-extrabold text-ink-900 mt-0.5 tnum">
                      {c.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-[12.5px] text-ink-400">
              실제 지점별 가격은 입지·면적에 따라 일부 다를 수 있으며, 모든
              지점은 결제 화면에 최종 가격이 표시됩니다.
            </p>
          </div>
        </section>

        {/* Add-ons */}
        <section className="bg-cream-100 py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-[13px] font-semibold text-sage-600 tracking-wider uppercase mb-3">
                Add-ons
              </p>
              <h2 className="text-[26px] lg:text-[34px] font-extrabold text-ink-900">
                필요한 만큼만 골라 쓰는 부가 서비스
              </h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3">
              {addons.map((a) => (
                <li
                  key={a.name}
                  className="rounded-2xl bg-white border border-cream-200 p-5 lg:p-6 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-[14.5px] font-bold text-ink-900">
                      {a.name}
                    </p>
                    <p className="text-[12.5px] text-ink-500 mt-1.5 leading-[1.6]">
                      {a.desc}
                    </p>
                  </div>
                  <p className="flex-shrink-0 text-right text-[13px] font-extrabold text-sage-700 tnum">
                    {a.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Reuse comparison */}
        <Comparison />

        {/* CTA strip */}
        <section className="bg-cream-50 py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="rounded-[28px] bg-ink-900 text-white px-8 lg:px-14 py-12 lg:py-16 grid lg:grid-cols-[1.4fr_auto] gap-8 items-center">
              <div>
                <h3 className="text-[24px] lg:text-[32px] font-extrabold leading-[1.25]">
                  결심한 그날,
                  <br />
                  <span className="text-sage-300">사업의 첫 주소</span>가 됩니다
                </h3>
                <p className="mt-3 text-[13.5px] lg:text-[14.5px] text-ink-300">
                  복잡한 서류 없이 5분 만에 시작하세요.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ContractTrigger className="inline-flex items-center gap-2 rounded-full bg-sage-500 hover:bg-sage-400 text-ink-900 font-bold px-6 h-12 text-[14px] transition-colors">
                  빠른 계약
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </ContractTrigger>
                <Link
                  href="/locations"
                  className="inline-flex items-center rounded-full border border-white/25 hover:border-white/60 text-white font-semibold px-6 h-12 text-[13.5px] transition-colors"
                >
                  전국 지점 보기
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
