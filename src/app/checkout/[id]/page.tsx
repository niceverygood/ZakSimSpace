import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { branches, formatKRW } from "@/lib/contract-data";
import { CheckoutClient } from "./CheckoutClient";

type Params = Promise<{ id: string }>;
type Search = Promise<{ cycle?: string }>;

export const metadata: Metadata = {
  title: "결제하기",
  description: "선택하신 지점의 계약을 결제합니다.",
};

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}) {
  const { id } = await params;
  const { cycle } = await searchParams;
  const branch = branches.find((b) => b.id === id);
  if (!branch) notFound();

  const isYearly = cycle !== "monthly";
  const amount = isYearly ? branch.yearlyPrice : branch.monthlyPrice;

  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16 bg-cream-50">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 py-14 lg:py-20">
          <h1 className="text-[26px] lg:text-[32px] font-extrabold text-ink-900 mb-2">
            결제하기
          </h1>
          <p className="text-[13.5px] text-ink-500">
            결제는 외부 PG사(토스페이먼츠/포트원)를 통해 안전하게 처리됩니다.
          </p>

          {/* Summary */}
          <section className="mt-8 rounded-3xl bg-white border border-cream-200 p-6 lg:p-8">
            <p className="text-[12.5px] font-semibold text-sage-600 tracking-wider uppercase">
              주문 내역
            </p>
            <p className="mt-2 text-[18px] font-bold text-ink-900">
              {branch.name}
            </p>
            <p className="text-[13px] text-ink-500 mt-1">{branch.address}</p>

            <dl className="mt-6 pt-5 border-t border-cream-200 space-y-3">
              <Row label="결제 주기" value={isYearly ? "연간" : "월간"} />
              <Row
                label={isYearly ? "오피스 × 1년" : "오피스 × 1개월"}
                value={formatKRW(amount)}
              />
            </dl>

            <div className="mt-5 pt-5 border-t border-cream-200 flex items-center justify-between">
              <p className="text-[15px] font-bold text-ink-900">결제 금액</p>
              <p className="text-[24px] font-extrabold text-ink-900 tnum">
                {formatKRW(amount)}
                <span className="text-[12px] font-semibold text-ink-400 ml-2">
                  (VAT포함)
                </span>
              </p>
            </div>
          </section>

          {/* Client controls */}
          <CheckoutClient branchName={branch.name} amount={amount} />
        </div>
      </main>
      <Footer />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-[13.5px] text-ink-500">{label}</dt>
      <dd className="text-[14px] font-bold text-ink-900 tnum">{value}</dd>
    </div>
  );
}
