import type { Metadata } from "next";
import { Briefcase, Sparkles, Heart, Coffee } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "채용",
  description:
    "결심을 사업장으로 만드는 팀과 함께하세요. 작심스페이스는 오픈 포지션과 인재풀을 함께 운영합니다.",
};

const benefits = [
  {
    icon: Sparkles,
    title: "결심을 시작하는 문화",
    desc: "주 1회 결심 데이 — 새로운 시도를 응원하고, 실패를 회고하는 시간을 가집니다.",
  },
  {
    icon: Heart,
    title: "건강한 일과 삶",
    desc: "주 35시간 근무, 점심·저녁 식대, 연차 사용 100% 보장.",
  },
  {
    icon: Coffee,
    title: "원격·플렉시블",
    desc: "주 2일 재택 가능, 9-11시 사이 출근하는 코어 시간 운영.",
  },
];

// Empty for now — populated by the client when positions open.
const positions: { id: string; team: string; title: string; type: string }[] =
  [];

export default function CareersPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        <PageHero
          eyebrow="Careers"
          title={
            <>
              결심을 사업장으로
              <br />
              <span className="text-sage-600">함께 만드실 분을 찾아요</span>
            </>
          }
          description="작심스페이스는 정직한 가격과 끝까지의 책임을 중요하게 생각하는 작은 팀입니다."
        />

        {/* Benefits */}
        <section className="bg-cream-50 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-[13px] font-semibold text-sage-600 tracking-wider uppercase mb-3">
                Benefits
              </p>
              <h2 className="text-[24px] lg:text-[32px] font-extrabold text-ink-900">
                작심스페이스에서 일하는 방식
              </h2>
            </div>
            <ul className="grid sm:grid-cols-3 gap-4">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <li
                    key={b.title}
                    className="rounded-2xl bg-white border border-cream-200 p-6"
                  >
                    <div className="w-11 h-11 rounded-xl bg-sage-50 border border-sage-200 flex items-center justify-center mb-4">
                      <Icon
                        className="w-4.5 h-4.5 text-sage-700"
                        strokeWidth={2}
                      />
                    </div>
                    <p className="text-[15.5px] font-bold text-ink-900">
                      {b.title}
                    </p>
                    <p className="mt-2 text-[13.5px] text-ink-500 leading-[1.7]">
                      {b.desc}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Open positions */}
        <section className="bg-cream-100 py-14 lg:py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-[13px] font-semibold text-sage-600 tracking-wider uppercase mb-3">
                Open positions
              </p>
              <h2 className="text-[24px] lg:text-[32px] font-extrabold text-ink-900">
                현재 모집 중인 포지션
              </h2>
            </div>

            {positions.length === 0 ? (
              <div className="rounded-3xl bg-white border border-cream-200 px-6 py-14 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-cream-100 mb-4">
                  <Briefcase
                    className="w-6 h-6 text-ink-400"
                    strokeWidth={1.8}
                  />
                </div>
                <p className="text-[16px] font-bold text-ink-900">
                  현재 공개된 채용 공고가 없어요
                </p>
                <p className="mt-2 text-[13.5px] text-ink-500 leading-[1.7] max-w-md mx-auto">
                  관심 있는 직무가 있으시면 인재풀에 미리 등록해 주세요. 새 포지션이 열리면 가장 먼저 안내드립니다.
                </p>
                <a
                  href="mailto:careers@zaksimspace.com?subject=인재풀 등록"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink-900 hover:bg-ink-800 text-white font-bold px-6 h-12 text-[14px] transition-colors"
                >
                  인재풀 등록
                </a>
              </div>
            ) : (
              <ul className="space-y-3">
                {positions.map((p) => (
                  <li
                    key={p.id}
                    className="rounded-2xl bg-white border border-cream-200 p-5 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[11.5px] font-bold text-sage-700">
                        {p.team}
                      </p>
                      <p className="text-[15.5px] font-bold text-ink-900 mt-1">
                        {p.title}
                      </p>
                    </div>
                    <span className="text-[12px] font-semibold text-ink-500 bg-cream-100 px-3 py-1 rounded-full">
                      {p.type}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
