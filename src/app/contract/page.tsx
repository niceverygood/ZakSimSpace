import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  FileText,
  CreditCard,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Mail,
  Zap,
  Smartphone,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ContractTrigger } from "@/components/contract/ContractTrigger";

export const metadata: Metadata = {
  title: "계약진행",
  description:
    "지점 선택부터 사업자등록까지 5분 안에. 작심스페이스는 수동 절차를 모두 없앤 자동화 계약 플로우로 시작합니다.",
};

const steps = [
  {
    no: "01",
    icon: Search,
    title: "사업자 유형·업종 선택",
    desc: "개인사업자/법인사업자, 인허가 업종 등 조건을 1분 안에 선택. 적합한 지점만 자동으로 필터링됩니다.",
    duration: "1분",
  },
  {
    no: "02",
    icon: FileText,
    title: "지점 선택 + 옵션 설정",
    desc: "지도와 가격을 비교해 원하는 지점 선택. 계약 기간(6/12/24개월), 우편물 처리 옵션을 함께 설정합니다.",
    duration: "2분",
  },
  {
    no: "03",
    icon: CreditCard,
    title: "결제 완료 + 계약서 자동 발급",
    desc: "NicePay 보안 결제로 즉시 결제. 결제 완료와 동시에 임대차계약서·전대동의서가 자동 생성됩니다.",
    duration: "1분",
  },
  {
    no: "04",
    icon: CheckCircle2,
    title: "전자서명 완료 + 사업자등록 진행",
    desc: "고객 서명 즉시 PDF 발급. 마이페이지에서 다운로드 후 홈택스 사업자등록에 바로 사용 가능합니다.",
    duration: "1분",
  },
];

const before = [
  "주말·야간엔 진행 불가 (영업일 기준 3~5일 소요)",
  "방문 또는 우편으로 계약서 수령",
  "사업자등록 서류는 별도 준비",
  "지점 변경 시 매번 직원 응대 필요",
  "우편물 도착 여부 직원에게 매번 확인",
];

const after = [
  "365일 24시간 — 자정에도 5분 안에 계약 완료",
  "결제 즉시 마이페이지에서 임대차계약서 다운로드",
  "사업자등록 양식 자동 생성 (홈택스 그대로 사용)",
  "지점 이전·해지 모두 마이페이지에서 자동 처리",
  "우편물 도착 즉시 알림 + 사진 + 마이페이지 기록",
];

const guarantees = [
  {
    icon: ShieldCheck,
    title: "사업자등록 반려 시 무료 재신청",
    desc: "심사 반려 사유를 분석해 적합한 지점으로 무료 재매칭. 한 번 더 신청 진행해 드립니다.",
  },
  {
    icon: Mail,
    title: "우편물 분실 보상 정책",
    desc: "지점에 도착한 우편물이 분실될 경우, 운영 규정에 따라 보상합니다. 모든 우편물은 24시간 내 알림톡.",
  },
  {
    icon: Clock,
    title: "결제 후 변심 시 환불",
    desc: "결제 후 사업자등록 신청 전이라면 100% 환불. 잔여 기간에 대해서는 일할 환불이 적용됩니다.",
  },
];

export default function ContractPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        <PageHero
          eyebrow="계약진행"
          title={
            <>
              방문도, 서류도, 기다림도 없이
              <br />
              <span className="text-navy-700">5분이면 끝나는 계약</span>
            </>
          }
          description="기존 비상주 사무실의 수동 절차를 모두 자동화했습니다. 365일 언제든, 어디서든 사업장을 시작하세요."
        >
          <div className="flex flex-wrap gap-3">
            <ContractTrigger className="inline-flex items-center gap-2 rounded-full bg-navy-600 hover:bg-navy-700 text-white font-bold px-6 h-12 text-[14px] transition-colors shadow-[0_12px_30px_-10px_rgba(35,61,104,0.55)]">
              지금 시작하기
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </ContractTrigger>
            <Link
              href="/locations"
              className="inline-flex items-center rounded-full bg-white border border-ink-200 hover:border-ink-400 text-ink-800 font-semibold px-6 h-12 text-[14px] transition-colors"
            >
              지점 먼저 살펴보기
            </Link>
          </div>
        </PageHero>

        {/* Steps */}
        <section className="bg-cream-50 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-[13px] font-semibold text-navy-600 tracking-wider uppercase mb-3">
                4-step automation
              </p>
              <h2 className="text-[28px] lg:text-[38px] font-extrabold text-ink-900 leading-[1.25]">
                4단계로 끝나는 자동화 계약
              </h2>
              <p className="mt-4 text-[14.5px] lg:text-[15.5px] text-ink-500">
                기존 절차에서 평균 3~5일 걸리던 모든 단계를 5분 안에 처리합니다.
              </p>
            </div>

            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((s) => {
                const Icon = s.icon;
                return (
                  <li
                    key={s.no}
                    className="relative rounded-3xl bg-white border border-cream-200 p-6 lg:p-7"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-navy-600 text-white text-[14px] font-extrabold tnum">
                        {s.no}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-cream-100 px-2.5 py-1 text-[11.5px] font-bold text-ink-600">
                        <Clock className="w-3 h-3" strokeWidth={2.5} />
                        {s.duration}
                      </span>
                    </div>
                    <Icon
                      className="w-5 h-5 text-navy-600 mb-3"
                      strokeWidth={2}
                    />
                    <p className="text-[16px] font-bold text-ink-900 leading-snug">
                      {s.title}
                    </p>
                    <p className="mt-3 text-[13.5px] text-ink-500 leading-[1.75]">
                      {s.desc}
                    </p>
                  </li>
                );
              })}
            </ol>

            {/* Total time strip */}
            <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-400">
                  <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
                </span>
                <p className="text-[14.5px] font-bold text-ink-900">
                  4단계 총 소요 시간 — 평균 <span className="text-amber-600">5분</span>
                </p>
              </div>
              <p className="text-[12.5px] text-ink-500">
                기존 방식 대비 약 <span className="font-bold text-ink-800">99% 단축</span>
              </p>
            </div>
          </div>
        </section>

        {/* Before/After */}
        <section className="bg-cream-100 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-[13px] font-semibold text-navy-600 tracking-wider uppercase mb-3">
                Manual → automated
              </p>
              <h2 className="text-[26px] lg:text-[34px] font-extrabold text-ink-900 leading-[1.25]">
                기존 비상주 사무실의 불편함을
                <br />
                <span className="text-navy-700">모두 없앴습니다</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-5">
              {/* Before */}
              <div className="rounded-3xl bg-white border border-ink-100 p-7 lg:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center rounded-full bg-ink-100 px-3 py-1 text-[11.5px] font-bold text-ink-500">
                    BEFORE
                  </span>
                  <p className="text-[15px] font-bold text-ink-700">
                    기존 수동 절차
                  </p>
                </div>
                <ul className="space-y-3">
                  {before.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-[13.5px] text-ink-500"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-ink-100 flex items-center justify-center">
                        <span className="block w-2 h-0.5 bg-ink-400" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div className="rounded-3xl bg-navy-700 text-white p-7 lg:p-8 shadow-[0_24px_60px_-30px_rgba(35,61,104,0.55)]">
                <div className="flex items-center gap-2 mb-5">
                  <span className="inline-flex items-center rounded-full bg-amber-400 px-3 py-1 text-[11.5px] font-bold text-ink-900">
                    AFTER
                  </span>
                  <p className="text-[15px] font-bold text-white">
                    작심스페이스 자동화
                  </p>
                </div>
                <ul className="space-y-3">
                  {after.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-2.5 text-[14px] text-white/95"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center">
                        <CheckCircle2
                          className="w-3 h-3 text-ink-900"
                          strokeWidth={3}
                        />
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantees */}
        <section className="bg-cream-50 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-[13px] font-semibold text-navy-600 tracking-wider uppercase mb-3">
                We guarantee
              </p>
              <h2 className="text-[26px] lg:text-[34px] font-extrabold text-ink-900 leading-[1.25]">
                계약 후에도 책임집니다
              </h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {guarantees.map((g) => {
                const Icon = g.icon;
                return (
                  <li
                    key={g.title}
                    className="rounded-3xl bg-white border border-cream-200 p-6 lg:p-7"
                  >
                    <div className="w-11 h-11 rounded-2xl bg-navy-50 border border-navy-200 flex items-center justify-center mb-5">
                      <Icon
                        className="w-4.5 h-4.5 text-navy-700"
                        strokeWidth={2}
                      />
                    </div>
                    <p className="text-[15.5px] font-bold text-ink-900">
                      {g.title}
                    </p>
                    <p className="mt-3 text-[13.5px] text-ink-500 leading-[1.75]">
                      {g.desc}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Mobile prompt */}
        <section className="bg-cream-100 py-14 lg:py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <Smartphone
              className="w-10 h-10 text-navy-600 mx-auto mb-4"
              strokeWidth={1.5}
            />
            <h3 className="text-[22px] lg:text-[28px] font-extrabold text-ink-900 leading-[1.3]">
              휴대폰만 있으면 <span className="text-navy-700">어디서든</span>
            </h3>
            <p className="mt-3 text-[14px] text-ink-500 leading-[1.75]">
              방문도 영업시간도 필요 없습니다. 출퇴근길, 점심시간, 자정에 — 결심한 그
              순간 사업장이 됩니다.
            </p>
            <div className="mt-6">
              <ContractTrigger className="inline-flex items-center gap-2 rounded-full bg-navy-600 hover:bg-navy-700 text-white font-bold px-7 h-13 text-[14.5px] transition-colors h-[52px]">
                <Sparkles className="w-4 h-4" strokeWidth={2.5} />
                지금 5분 안에 시작
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </ContractTrigger>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
