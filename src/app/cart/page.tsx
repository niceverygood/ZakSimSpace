import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingCart, ArrowRight, MapPin } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContractTrigger } from "@/components/contract/ContractTrigger";
import { branches, formatKRW } from "@/lib/contract-data";

export const metadata: Metadata = {
  title: "장바구니",
  description: "선택하신 사업장 계약을 한 번에 확인하세요.",
};

export default function CartPage() {
  const recommended = branches.slice(0, 3);

  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16 bg-cream-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14 lg:py-20">
          <h1 className="text-[28px] lg:text-[34px] font-extrabold text-ink-900 mb-10">
            장바구니
          </h1>

          {/* Empty state */}
          <div className="rounded-3xl bg-white border border-cream-200 px-6 lg:px-10 py-16 lg:py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cream-100 mb-5">
              <ShoppingCart
                className="w-7 h-7 text-ink-400"
                strokeWidth={1.8}
              />
            </div>
            <p className="text-[18px] lg:text-[20px] font-extrabold text-ink-900">
              장바구니가 비어 있어요
            </p>
            <p className="mt-3 text-[14px] text-ink-500 leading-[1.7] max-w-md mx-auto">
              마음에 드는 지점을 골라 빠른 계약을 시작해 보세요. 결제 직전까지
              자유롭게 변경할 수 있어요.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ContractTrigger className="inline-flex items-center gap-2 rounded-full bg-navy-600 hover:bg-navy-700 text-white font-bold px-6 h-12 text-[14px] transition-colors">
                빠른 계약 시작
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </ContractTrigger>
              <Link
                href="/locations"
                className="inline-flex items-center gap-2 rounded-full bg-cream-100 hover:bg-cream-200 text-ink-800 font-semibold px-6 h-12 text-[14px] transition-colors"
              >
                <MapPin className="w-4 h-4 text-navy-700" strokeWidth={2} />
                전국 지점 둘러보기
              </Link>
            </div>
          </div>

          {/* Recommended */}
          <section className="mt-14">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-[20px] lg:text-[24px] font-extrabold text-ink-900">
                먼저 계약한 분들이 많이 고른 지점
              </h2>
              <Link
                href="/locations"
                className="text-[13px] font-semibold text-ink-700 hover:text-navy-700"
              >
                전체 보기 →
              </Link>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommended.map((b) => (
                <li key={b.id}>
                  <Link
                    href={`/locations/${b.id}`}
                    className="block rounded-2xl bg-white border border-cream-200 p-5 hover:border-navy-300 hover:-translate-y-0.5 transition-all"
                  >
                    <p className="text-[14.5px] font-bold text-ink-900">
                      {b.name}
                    </p>
                    <p className="text-[12px] text-ink-500 mt-1.5">
                      {b.address}
                    </p>
                    <p className="text-right text-[15px] font-extrabold text-ink-900 tnum mt-3">
                      {formatKRW(b.monthlyPrice)}
                      <span className="text-[11.5px] font-semibold text-ink-400 ml-0.5">
                        /월
                      </span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
