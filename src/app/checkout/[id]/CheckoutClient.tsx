"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { formatKRW } from "@/lib/contract-data";
import { cn } from "@/lib/utils";

type PG = "toss" | "portone";

export function CheckoutClient({
  branchName,
  amount,
}: {
  branchName: string;
  amount: number;
}) {
  const [pg, setPg] = useState<PG>("toss");
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");

  const start = () => {
    // In production this redirects to PG SDK. For now we simulate.
    setPhase("loading");
    setTimeout(() => setPhase("done"), 1400);
  };

  if (phase === "done") {
    return (
      <section className="mt-6 rounded-3xl bg-white border border-cream-200 p-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-sage-100 mb-4">
          <CheckCircle2 className="w-7 h-7 text-sage-700" strokeWidth={2} />
        </div>
        <h2 className="text-[20px] font-extrabold text-ink-900">
          결제가 완료됐어요
        </h2>
        <p className="mt-3 text-[14px] text-ink-500 leading-[1.7]">
          <span className="font-bold text-ink-800">{branchName}</span>{" "}
          계약이 활성화되었고, 임대차계약서가 마이페이지에서 즉시 발급됩니다.
        </p>
        <p className="mt-2 text-[13px] text-ink-500">
          결제 금액 <span className="font-bold text-ink-900 tnum">{formatKRW(amount)}</span>{" "}
          · 영수증을 이메일로 보내드렸습니다.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/me/contracts"
            className="inline-flex items-center gap-2 rounded-full bg-sage-600 hover:bg-sage-700 text-white font-bold px-6 h-12 text-[14px]"
          >
            내 계약 보기
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-ink-200 hover:border-ink-400 text-ink-800 font-semibold px-6 h-12 text-[13.5px]"
          >
            홈으로
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="mt-6 rounded-3xl bg-white border border-cream-200 p-6 lg:p-8">
        <p className="text-[14px] font-bold text-ink-900 mb-4">결제 수단 선택</p>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              { v: "toss", l: "토스페이먼츠", sub: "카드 · 계좌 · 간편결제" },
              { v: "portone", l: "포트원", sub: "카카오페이 · 네이버페이" },
            ] as const
          ).map((o) => {
            const active = pg === o.v;
            return (
              <button
                key={o.v}
                type="button"
                onClick={() => setPg(o.v)}
                className={cn(
                  "rounded-2xl border p-5 text-left transition-all",
                  active
                    ? "border-sage-600 bg-sage-50 ring-2 ring-sage-600/15"
                    : "border-ink-200 bg-white hover:border-ink-300",
                )}
                aria-pressed={active}
              >
                <p
                  className={cn(
                    "text-[14.5px] font-bold",
                    active ? "text-sage-700" : "text-ink-900",
                  )}
                >
                  {o.l}
                </p>
                <p className="text-[12px] text-ink-500 mt-1">{o.sub}</p>
              </button>
            );
          })}
        </div>
      </section>

      <div className="mt-5 flex flex-wrap gap-3 items-center justify-between">
        <p className="text-[12px] text-ink-400 max-w-md">
          본 페이지는 PG 연동 전 데모입니다. 실제 결제는 PG사로 이동해 안전하게
          진행됩니다.
        </p>
        <button
          type="button"
          onClick={start}
          disabled={phase === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-sage-600 hover:bg-sage-700 disabled:bg-sage-300 text-white font-bold px-7 h-13 text-[14.5px] transition-colors h-[52px] min-w-[200px]"
        >
          {phase === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              결제 진행 중
            </>
          ) : (
            <>
              {formatKRW(amount)} 결제하기
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </>
          )}
        </button>
      </div>
    </>
  );
}
