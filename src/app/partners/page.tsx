import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Building, Users, Mail } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "파트너스 센터",
  description:
    "작심스페이스와 함께 사업을 키우세요. 지점 입점·세무·결제·SaaS 파트너십 프로그램을 운영합니다.",
};

const tracks = [
  {
    icon: Building,
    title: "지점 파트너",
    desc: "보유한 공간을 작심스페이스 직영점으로 운영. 임대 수익 + 운영 위탁 모델.",
    cta: "지점 입점 문의",
  },
  {
    icon: Users,
    title: "리퍼럴 파트너",
    desc: "고객을 추천하면 매월 환원금을 받습니다. 1인 사업자·세무사·회계사 모두 환영.",
    cta: "리퍼럴 등록",
  },
  {
    icon: Mail,
    title: "솔루션 파트너",
    desc: "세무·결제·SaaS 등 작심스페이스 입주 고객 대상 서비스를 함께 제공해요.",
    cta: "협업 제안",
  },
];

const benefits = [
  "월간 정산 + 전담 매니저 1:1 운영",
  "마케팅 자산 (배너·랜딩) 제공",
  "API·CSV 형태의 정산 데이터 제공",
  "성과형 인센티브 (최대 환원율 8%)",
];

export default function PartnersPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        <PageHero
          eyebrow="Partners"
          title={
            <>
              혼자보다 함께
              <br />
              <span className="text-sage-600">더 멀리 갑니다</span>
            </>
          }
          description="작심스페이스 파트너스 프로그램은 지점·리퍼럴·솔루션 3가지 트랙으로 운영됩니다."
        />

        {/* Tracks */}
        <section className="bg-cream-50 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ul className="grid sm:grid-cols-3 gap-4">
              {tracks.map((t) => {
                const Icon = t.icon;
                return (
                  <li key={t.title}>
                    <article className="rounded-3xl bg-white border border-cream-200 p-7 h-full flex flex-col">
                      <div className="w-12 h-12 rounded-2xl bg-sage-50 border border-sage-200 flex items-center justify-center mb-5">
                        <Icon
                          className="w-5 h-5 text-sage-700"
                          strokeWidth={2}
                        />
                      </div>
                      <p className="text-[18px] font-extrabold text-ink-900">
                        {t.title}
                      </p>
                      <p className="mt-3 text-[13.5px] text-ink-500 leading-[1.7] flex-1">
                        {t.desc}
                      </p>
                      <Link
                        href="/contact"
                        className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-ink-900 hover:bg-ink-800 text-white font-bold px-5 h-11 text-[13px] transition-colors w-fit"
                      >
                        {t.cta}
                        <ArrowRight
                          className="w-3.5 h-3.5"
                          strokeWidth={2.5}
                        />
                      </Link>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-cream-100 py-14 lg:py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <p className="text-[13px] font-semibold text-sage-600 tracking-wider uppercase mb-3">
              Why partner
            </p>
            <h2 className="text-[24px] lg:text-[32px] font-extrabold text-ink-900 leading-[1.3] mb-7">
              작심스페이스와 함께하면
            </h2>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-2xl bg-white border border-cream-200 px-5 py-4"
                >
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-sage-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-sage-700" strokeWidth={3} />
                  </span>
                  <p className="text-[14px] text-ink-700 font-medium">{b}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
