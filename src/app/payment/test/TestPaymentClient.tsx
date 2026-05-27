"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Loader2, Lock, ArrowRight } from "lucide-react";
import { formatKRW } from "@/lib/contract-data";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    goPay?: (form: HTMLFormElement) => void;
  }
}

type Phase = "form" | "preparing" | "popup-open";

const AMOUNTS = [100, 500, 1000] as const;

export function TestPaymentClient() {
  const [amount, setAmount] = useState<number>(100);
  const [buyerName, setBuyerName] = useState("테스트");
  const [buyerEmail, setBuyerEmail] = useState("test@bottlecorp.kr");
  const [buyerTel, setBuyerTel] = useState("01012345678");
  const [phase, setPhase] = useState<Phase>("form");
  const [error, setError] = useState<string | null>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [prepared, setPrepared] = useState<{
    mid: string;
    moid: string;
    amount: number;
    goodsName: string;
    ediDate: string;
    signData: string;
    returnUrl: string;
  } | null>(null);

  const start = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!sdkReady) {
      setError("결제 모듈이 아직 준비되지 않았어요. 잠시 후 다시 시도해 주세요.");
      return;
    }
    setPhase("preparing");
    try {
      const res = await fetch("/api/payment/test-prepare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, buyerName, buyerEmail, buyerTel }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "결제 준비에 실패했어요.");
        setPhase("form");
        return;
      }
      setPrepared({
        mid: data.mid,
        moid: data.moid,
        amount: data.amount,
        goodsName: data.goodsName,
        ediDate: data.ediDate,
        signData: data.signData,
        returnUrl: data.returnUrl,
      });
      setPhase("popup-open");
    } catch (err) {
      setError(err instanceof Error ? err.message : "네트워크 오류");
      setPhase("form");
    }
  };

  useEffect(() => {
    if (phase !== "popup-open" || !prepared) return;
    const form = document.getElementById(
      "nicepay-test-form",
    ) as HTMLFormElement | null;
    if (form && typeof window.goPay === "function") {
      window.goPay(form);
    } else {
      setError("결제 모듈을 불러오지 못했어요.");
      setPhase("form");
    }
  }, [phase, prepared]);

  return (
    <>
      <Script
        src="https://web.nicepay.co.kr/v3/webstd/js/nicepay-3.0.js"
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
      />

      <form onSubmit={start} className="mt-8 space-y-5">
        {/* Amount selector */}
        <div className="rounded-3xl bg-white border border-cream-200 p-6 lg:p-7">
          <p className="text-[14px] font-bold text-ink-900 mb-4">
            테스트 금액
          </p>
          <div className="grid grid-cols-3 gap-2">
            {AMOUNTS.map((a) => {
              const active = amount === a;
              return (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAmount(a)}
                  className={cn(
                    "h-14 rounded-2xl border font-extrabold text-[15px] transition-all",
                    active
                      ? "bg-navy-600 text-white border-navy-600 shadow-[0_8px_20px_-6px_rgba(35,61,104,0.5)]"
                      : "bg-white text-ink-700 border-ink-200 hover:border-ink-400",
                  )}
                  aria-pressed={active}
                >
                  {formatKRW(a)}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-[11.5px] text-ink-500">
            NicePay 운영 MID 최소 금액 정책에 따라 일부 금액은 reject될 수
            있습니다. 100원부터 시도해 보세요.
          </p>
        </div>

        {/* Buyer info */}
        <div className="rounded-3xl bg-white border border-cream-200 p-6 lg:p-7 space-y-3">
          <p className="text-[14px] font-bold text-ink-900">결제자 정보</p>
          <Field label="이름">
            <input
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className="form-input"
            />
          </Field>
          <Field label="휴대전화 (-없이)">
            <input
              value={buyerTel}
              onChange={(e) => setBuyerTel(e.target.value)}
              inputMode="tel"
              className="form-input"
            />
          </Field>
          <Field label="이메일 (영수증)">
            <input
              type="email"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              className="form-input"
            />
          </Field>
        </div>

        {error && (
          <div className="rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-[13px] text-rose-700">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <p className="inline-flex items-center gap-1.5 text-[12px] text-ink-500">
            <Lock className="w-3.5 h-3.5" strokeWidth={2} />
            NicePay 보안 결제 — 실제 카드 청구가 발생합니다
          </p>
          <button
            type="submit"
            disabled={phase !== "form" || !sdkReady}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-600 hover:bg-navy-700 disabled:bg-navy-300 text-white font-bold px-7 text-[14.5px] transition-colors h-[52px] min-w-[200px]"
          >
            {phase !== "form" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                결제 진행 중
              </>
            ) : (
              <>
                {formatKRW(amount)} 결제 테스트
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </>
            )}
          </button>
        </div>
      </form>

      {prepared && (
        <form
          id="nicepay-test-form"
          name="nicepayTestForm"
          method="post"
          action="/payment/return"
          acceptCharset="euc-kr"
        >
          <input type="hidden" name="PayMethod" value="CARD" />
          <input type="hidden" name="MID" value={prepared.mid} />
          <input type="hidden" name="Moid" value={prepared.moid} />
          <input type="hidden" name="Amt" value={prepared.amount} />
          <input type="hidden" name="GoodsName" value={prepared.goodsName} />
          <input type="hidden" name="BuyerName" value={buyerName} />
          <input type="hidden" name="BuyerEmail" value={buyerEmail} />
          <input type="hidden" name="BuyerTel" value={buyerTel} />
          <input type="hidden" name="EdiDate" value={prepared.ediDate} />
          <input type="hidden" name="SignData" value={prepared.signData} />
          <input type="hidden" name="ReturnURL" value={prepared.returnUrl} />
          <input type="hidden" name="CharSet" value="utf-8" />
          <input type="hidden" name="ReqReserved" value="TEST" />
          <input type="hidden" name="GoodsCl" value="1" />
          <input type="hidden" name="TransType" value="0" />
          <input type="hidden" name="VbankExpDate" value="" />
        </form>
      )}

      <style>{`
        .form-input {
          width: 100%;
          height: 44px;
          border-radius: 14px;
          border: 1px solid var(--color-ink-200);
          background: #ffffff;
          padding: 0 14px;
          font-size: 14px;
          font-weight: 500;
          color: var(--color-ink-900);
        }
        .form-input:focus {
          outline: none;
          border-color: var(--color-navy-500);
        }
      `}</style>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[12px] font-bold text-ink-700 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
