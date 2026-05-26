import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "패밀리 센터",
  description:
    "작심스페이스 입주 고객에게 제공되는 패밀리 서비스 — 결제, 회계, 물류, SaaS까지 한 번에.",
};

const services = [
  {
    name: "작심페이",
    tag: "결제 수수료 -0.3%",
    desc: "사업장 입주 고객 전용 결제 수수료 우대 프로그램",
  },
  {
    name: "작심세무",
    tag: "월정액 33,000원",
    desc: "월별 매출·매입 정리부터 부가세·종소세 신고까지 전담 세무사 매칭",
  },
  {
    name: "작심창고",
    tag: "월 50,000원~",
    desc: "온라인 셀러 전용 풀필먼트 — 입고·재고·출고 한 번에",
  },
  {
    name: "작심오피스",
    tag: "월 99,000원~",
    desc: "회의실·라운지 공유 좌석권. 비상주 고객도 시간 단위로 예약 가능",
  },
];

export default function FamilyPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        <PageHero
          eyebrow="Family"
          title={
            <>
              사업의 성장 단계마다
              <br />
              <span className="text-sage-600">함께 자라는 서비스</span>
            </>
          }
          description="작심스페이스 입주 고객은 패밀리 서비스를 더 합리적인 가격에 이용할 수 있어요."
        />

        <section className="bg-cream-50 py-14 lg:py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <ul className="grid sm:grid-cols-2 gap-4">
              {services.map((s) => (
                <li key={s.name}>
                  <article className="rounded-3xl bg-white border border-cream-200 p-7 h-full hover:-translate-y-0.5 hover:border-sage-300 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[18px] font-extrabold text-ink-900">
                        {s.name}
                      </p>
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-[11.5px] font-bold text-amber-600">
                        <Sparkles className="w-3 h-3" strokeWidth={2.5} />
                        {s.tag}
                      </span>
                    </div>
                    <p className="text-[14px] text-ink-500 leading-[1.75]">
                      {s.desc}
                    </p>
                    <button
                      type="button"
                      className="mt-5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-sage-700 hover:text-sage-800"
                    >
                      자세히 보기
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </button>
                  </article>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-center text-[12.5px] text-ink-400">
              일부 서비스는 단계적으로 오픈됩니다. 입주 고객에게 우선 안내해
              드려요.
            </p>

            <div className="mt-10 rounded-2xl bg-sage-50 border border-sage-200 px-6 py-5 flex flex-wrap items-center justify-between gap-4">
              <p className="text-[13.5px] font-bold text-sage-700">
                패밀리 서비스 입점·협업 문의는?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-sage-600 hover:bg-sage-700 text-white font-bold px-5 h-10 text-[13px]"
              >
                문의하기 <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
