import Link from "next/link";
import { ArrowRight, Home, MapPin } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContractTrigger } from "@/components/contract/ContractTrigger";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16 bg-cream-50">
        <section className="mx-auto max-w-2xl px-6 py-20 lg:py-28 text-center">
          {/* Stylized 404 */}
          <div className="relative inline-block">
            <p className="text-[120px] lg:text-[160px] font-extrabold leading-none tracking-tighter text-ink-900">
              404
            </p>
            <span
              aria-hidden
              className="absolute -top-3 -right-6 inline-flex items-center rounded-full bg-amber-400 text-ink-900 text-[11px] font-extrabold px-2.5 py-1 rotate-6 shadow-md"
            >
              not found
            </span>
          </div>

          <h1 className="mt-6 text-[22px] lg:text-[28px] font-extrabold text-ink-900 leading-snug">
            찾으시는 페이지를
            <br />
            <span className="text-navy-600">잠시 찾을 수 없어요</span>
          </h1>
          <p className="mt-4 text-[14px] lg:text-[15px] text-ink-500 leading-[1.7] max-w-md mx-auto">
            주소가 잘못되었거나, 페이지가 옮겨졌을 수 있어요. 아래에서 다음
            행동을 골라주세요.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-ink-900 hover:bg-ink-800 text-white font-bold px-6 h-12 text-[14px] transition-colors"
            >
              <Home className="w-4 h-4" strokeWidth={2} />
              홈으로
            </Link>
            <Link
              href="/locations"
              className="inline-flex items-center gap-2 rounded-full border border-ink-200 hover:border-ink-400 bg-white text-ink-800 font-semibold px-6 h-12 text-[14px] transition-colors"
            >
              <MapPin className="w-4 h-4 text-navy-700" strokeWidth={2} />
              전국 지점 보기
            </Link>
            <ContractTrigger className="inline-flex items-center gap-2 rounded-full bg-navy-600 hover:bg-navy-700 text-white font-bold px-6 h-12 text-[14px] transition-colors">
              빠른 계약
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </ContractTrigger>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
