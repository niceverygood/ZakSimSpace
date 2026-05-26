import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ContractTrigger } from "@/components/contract/ContractTrigger";

export const metadata: Metadata = {
  title: "회사 소개",
  description:
    "작심스페이스는 '결심을 사업장으로'라는 미션 아래, 1인 사업자와 스타트업의 합법적인 사업장 인프라를 만듭니다.",
};

const stats = [
  { value: "180+", label: "전국 직영점" },
  { value: "12,000+", label: "누적 입주 사업자" },
  { value: "98.4%", label: "사업자등록 승인률" },
  { value: "24h", label: "평균 우편물 알림" },
];

const values = [
  {
    title: "정직한 가격",
    desc: "보증금·관리비·갱신비를 없앴습니다. 결제 화면에 표시된 금액이 전부입니다.",
  },
  {
    title: "검증된 품질",
    desc: "관할 세무서 심사를 통과한 지점만 운영하며, 매월 자체 실사를 진행합니다.",
  },
  {
    title: "끝까지 책임",
    desc: "사업자등록 반려 시 무료 재신청, 우편물 분실 시 보상까지 본사가 직접 케어합니다.",
  },
];

const milestones = [
  { year: "2022", text: "작심스페이스 법인 설립" },
  { year: "2023", text: "전국 50개 직영점 오픈, 누적 1,000 사업자 돌파" },
  { year: "2024", text: "통신판매·식품 인허가 전용 지점 도입" },
  { year: "2025", text: "ISO 27001 정보보호 인증 획득" },
  { year: "2026", text: "전국 180+ 직영점 · 누적 12,000 사업자 돌파" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        <PageHero
          eyebrow="About"
          title={
            <>
              결심을
              <br />
              <span className="text-sage-600">사업장으로</span>
            </>
          }
          description="작심스페이스는 1인 사업자와 스타트업이 합법적이고 부담 없는 주소지에서 시작할 수 있도록 인프라를 만듭니다."
        />

        {/* Stats */}
        <section className="bg-cream-50 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white border border-cream-200 px-6 py-7 text-center"
              >
                <p className="text-[28px] lg:text-[32px] font-extrabold text-ink-900 tnum leading-none">
                  {s.value}
                </p>
                <p className="mt-3 text-[12.5px] text-ink-500 font-semibold">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="bg-cream-100 py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
            <p className="text-[13px] font-semibold text-sage-600 tracking-wider uppercase mb-3">
              Mission
            </p>
            <h2 className="text-[26px] lg:text-[36px] font-extrabold text-ink-900 leading-[1.3]">
              사업의 첫 주소가
              <br />
              가장 든든해야 합니다
            </h2>
            <p className="mt-6 text-[15px] lg:text-[16px] text-ink-500 leading-[1.85]">
              결심하고 시작한 사업이 처음 만나는 인프라가 사업장입니다. 비싸지
              않아야 하고, 합법적이어야 하고, 변동에 유연해야 합니다.
              작심스페이스는 그 시작이 가장 단단할 수 있도록, 매일 0.1%씩 더
              나은 운영을 만들어 갑니다.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-cream-50 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[13px] font-semibold text-sage-600 tracking-wider uppercase mb-3">
                Values
              </p>
              <h2 className="text-[26px] lg:text-[34px] font-extrabold text-ink-900">
                작심스페이스가 일하는 방식
              </h2>
            </div>
            <ul className="grid sm:grid-cols-3 gap-4">
              {values.map((v, i) => (
                <li
                  key={v.title}
                  className="rounded-2xl bg-white border border-cream-200 p-6 lg:p-7"
                >
                  <p className="text-[11.5px] font-bold text-sage-600 tracking-widest tnum mb-3">
                    0{i + 1}
                  </p>
                  <p className="text-[17px] font-bold text-ink-900">
                    {v.title}
                  </p>
                  <p className="mt-3 text-[13.5px] leading-[1.7] text-ink-500">
                    {v.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Milestones */}
        <section className="bg-cream-100 py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[13px] font-semibold text-sage-600 tracking-wider uppercase mb-3">
                Milestones
              </p>
              <h2 className="text-[26px] lg:text-[34px] font-extrabold text-ink-900">
                작심스페이스가 걸어온 길
              </h2>
            </div>
            <ol className="relative border-l-2 border-sage-200 ml-3 space-y-7 pl-7">
              {milestones.map((m) => (
                <li key={m.year} className="relative">
                  <span className="absolute -left-[34px] top-1 w-4 h-4 rounded-full bg-sage-600 border-4 border-cream-100" />
                  <p className="text-[13px] font-extrabold text-sage-700 tnum">
                    {m.year}
                  </p>
                  <p className="mt-1 text-[14.5px] text-ink-800 leading-[1.7]">
                    {m.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-cream-50 py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="rounded-[28px] bg-ink-900 text-white px-8 lg:px-14 py-12 lg:py-16 grid lg:grid-cols-[1.4fr_auto] gap-8 items-center">
              <div>
                <h3 className="text-[22px] lg:text-[30px] font-extrabold leading-[1.3]">
                  지금 결심을
                  <br />
                  <span className="text-sage-300">사업장으로 만들어 보세요</span>
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <ContractTrigger className="inline-flex items-center gap-2 rounded-full bg-sage-500 hover:bg-sage-400 text-ink-900 font-bold px-6 h-12 text-[14px] transition-colors">
                  빠른 계약
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </ContractTrigger>
                <Link
                  href="/careers"
                  className="inline-flex items-center rounded-full border border-white/25 hover:border-white/60 text-white font-semibold px-6 h-12 text-[13.5px] transition-colors"
                >
                  채용 보기
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
