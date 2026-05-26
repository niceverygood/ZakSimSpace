import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, ArrowRight, Download } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getOrder } from "@/lib/orders";
import { formatKRW } from "@/lib/contract-data";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ moid?: string }>;

export default async function PaymentCompletePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { moid } = await searchParams;
  if (!moid) redirect("/");
  const order = getOrder(moid);

  if (!order || order.status !== "paid") {
    return (
      <>
        <Header />
        <main id="main" className="flex-1 pt-16 bg-cream-50">
          <div className="mx-auto max-w-md px-6 py-20 text-center">
            <h1 className="text-[20px] font-extrabold text-ink-900">
              주문 정보를 찾을 수 없어요
            </h1>
            <p className="mt-3 text-[13.5px] text-ink-500">
              결제가 정상적으로 완료된 경우 마이페이지에서 확인할 수 있어요.
            </p>
            <Link
              href="/me/contracts"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-600 hover:bg-navy-700 text-white font-bold px-6 h-12 text-[13.5px]"
            >
              내 계약 보기
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16 bg-cream-50">
        <div className="mx-auto max-w-lg px-6 py-16 lg:py-24">
          <section className="rounded-3xl bg-white border border-cream-200 p-8 lg:p-10 text-center shadow-[0_24px_60px_-30px_rgba(12,18,25,0.35)]">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy-100 mb-5">
              <CheckCircle2 className="w-7 h-7 text-navy-700" strokeWidth={2} />
            </div>
            <h1 className="text-[22px] lg:text-[26px] font-extrabold text-ink-900">
              결제가 완료됐어요
            </h1>
            <p className="mt-3 text-[13.5px] text-ink-500 leading-[1.75]">
              <span className="font-bold text-ink-800">{order.branchName}</span>{" "}
              계약이 활성화되었고, 임대차계약서가 마이페이지에서 즉시 발급됩니다.
            </p>

            <dl className="mt-7 text-left space-y-3 border-t border-cream-200 pt-6">
              <Row label="주문번호" value={order.moid} mono />
              {order.tid && <Row label="거래번호" value={order.tid} mono />}
              <Row
                label="결제 금액"
                value={formatKRW(order.amount)}
                strong
              />
              {order.cardName && (
                <Row label="결제 수단" value={`${order.cardName} ${order.cardNum ?? ""}`} />
              )}
              <Row
                label="결제 일시"
                value={order.authDate ? formatAuthDate(order.authDate) : new Date(order.createdAt).toLocaleString("ko-KR")}
              />
            </dl>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/me/contracts"
                className="inline-flex items-center gap-2 rounded-full bg-navy-600 hover:bg-navy-700 text-white font-bold px-6 h-12 text-[14px]"
              >
                내 계약 보기
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </Link>
              <Link
                href="/me/invoices"
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 hover:border-ink-400 text-ink-800 font-semibold px-6 h-12 text-[13.5px]"
              >
                <Download className="w-3.5 h-3.5" strokeWidth={2} />
                세금계산서
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Row({
  label,
  value,
  strong,
  mono,
}: {
  label: string;
  value: string;
  strong?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-[12.5px] text-ink-500">{label}</dt>
      <dd
        className={`text-[13.5px] text-ink-900 ${
          strong ? "font-extrabold text-[16px]" : "font-semibold"
        } ${mono ? "tnum" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}

function formatAuthDate(s: string): string {
  // NicePay returns yyyyMMddHHmmss
  if (s.length < 14) return s;
  return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)} ${s.slice(8, 10)}:${s.slice(10, 12)}:${s.slice(12, 14)}`;
}
