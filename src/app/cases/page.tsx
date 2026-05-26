import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ContractTrigger } from "@/components/contract/ContractTrigger";
import { cases } from "@/lib/content-data";

export const metadata: Metadata = {
  title: "업종 신청 사례",
  description:
    "통신판매업, 식품, IT, 디자인까지 — 작심스페이스에서 사업자등록을 마친 업종별 신청 사례를 확인해 보세요.",
};

export default function CasesPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        <PageHero
          eyebrow="Use cases"
          title={
            <>
              어떤 업종도
              <br />
              <span className="text-navy-600">작심스페이스로 시작</span>합니다
            </>
          }
          description="업종별로 필요한 인허가와 적합한 지점을 함께 안내해 드립니다."
        />

        <section className="bg-cream-50 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
              {cases.map((c) => (
                <li key={c.id}>
                  <article className="rounded-2xl bg-white border border-cream-200 p-6 lg:p-7 h-full flex flex-col hover:border-navy-300 hover:-translate-y-0.5 transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11.5px] font-bold text-navy-700 tracking-wider uppercase">
                          {c.shortLabel}
                        </p>
                        <p className="text-[18px] lg:text-[19px] font-extrabold text-ink-900 mt-1">
                          {c.industry}
                        </p>
                      </div>
                      {c.needsLicense && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 border border-violet-100 text-violet-600 px-2 py-1 text-[10.5px] font-bold">
                          <ShieldCheck
                            className="w-3 h-3"
                            strokeWidth={2.5}
                          />
                          인허가 지원
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-[13.5px] leading-[1.75] text-ink-500">
                      {c.description}
                    </p>

                    <ul className="mt-5 space-y-2">
                      {c.examples.map((e) => (
                        <li
                          key={e}
                          className="flex items-center gap-2 text-[13px] text-ink-700"
                        >
                          <span className="w-4 h-4 rounded-full bg-navy-100 flex items-center justify-center">
                            <Check
                              className="w-2.5 h-2.5 text-navy-700"
                              strokeWidth={3}
                            />
                          </span>
                          {e}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-6 border-t border-dashed border-cream-200 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-ink-400">
                          누적 신청 사례
                        </p>
                        <p className="text-[18px] font-extrabold text-ink-900 tnum">
                          {c.count}
                        </p>
                      </div>
                      <Link
                        href="/locations"
                        className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-navy-700 hover:text-navy-800"
                      >
                        지점 보기
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>

            <div className="mt-14 rounded-[28px] bg-ink-900 text-white px-8 lg:px-14 py-12 lg:py-14 grid lg:grid-cols-[1.4fr_auto] gap-8 items-center">
              <div>
                <h3 className="text-[22px] lg:text-[28px] font-extrabold leading-[1.3]">
                  내 업종도 가능한지
                  <br />
                  <span className="text-navy-300">5초 안에 알아보기</span>
                </h3>
                <p className="mt-3 text-[13.5px] text-ink-300">
                  업종을 선택하면 인허가 가능 지점만 자동으로 필터링됩니다.
                </p>
              </div>
              <ContractTrigger className="inline-flex items-center gap-2 rounded-full bg-navy-500 hover:bg-navy-400 text-ink-900 font-bold px-6 h-12 text-[14px] transition-colors">
                업종 확인
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
