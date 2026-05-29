"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { Loader2, ArrowRight, Lock, Info } from "lucide-react";
import { formatKRW } from "@/lib/contract-data";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    goPay?: (form: HTMLFormElement) => void;
    nicepayStart?: () => void;
  }
}

type Phase = "form" | "preparing" | "popup-open" | "approving";

export function CheckoutClient({
  branchId,
  branchName,
  cycle,
  months,
  bizType,
  startDate,
  industry,
  amount,
}: {
  branchId: string;
  branchName: string;
  cycle: "yearly" | "monthly";
  months: number;
  bizType: string;
  startDate?: string;
  industry?: string;
  amount: number;
}) {
  const [phase, setPhase] = useState<Phase>("form");
  const [error, setError] = useState<string | null>(null);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerTel, setBuyerTel] = useState("");
  const [agree, setAgree] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);

  // The SDK posts results back to the opener via `window.opener` from the
  // popup → we receive them via a form action target instead. We keep the
  // signature/moid in state so the form can submit when goPay is clicked.
  const [prepared, setPrepared] = useState<{
    mid: string;
    moid: string;
    amount: number;
    goodsName: string;
    ediDate: string;
    signData: string;
    returnUrl: string;
  } | null>(null);

  // Re-show the buyer form when the popup is closed without paying.
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.data === "nicepay:closed") {
        setPhase("form");
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const startPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!agree) {
      setError("결제 약관에 동의해 주세요.");
      return;
    }
    if (!sdkReady) {
      setError("결제 모듈이 아직 준비되지 않았어요. 잠시 후 다시 시도해 주세요.");
      return;
    }

    setPhase("preparing");
    try {
      const res = await fetch("/api/payment/prepare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branchId,
          cycle,
          months,
          bizType,
          startDate,
          industry,
          buyerName,
          buyerEmail,
          buyerTel,
        }),
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
      // Defer goPay until after React renders the hidden form.
      setPhase("popup-open");
    } catch (err) {
      setError(err instanceof Error ? err.message : "네트워크 오류");
      setPhase("form");
    }
  };

  useEffect(() => {
    if (phase !== "popup-open" || !prepared) return;
    const form = document.getElementById(
      "nicepay-form",
    ) as HTMLFormElement | null;
    if (form && typeof window.goPay === "function") {
      window.goPay(form);
    } else {
      setError(
        "결제 모듈을 불러오지 못했어요. 페이지를 새로고침한 뒤 다시 시도해 주세요.",
      );
      setPhase("form");
    }
  }, [phase, prepared]);

  return (
    <>
      <Script
        src="https://web.nicepay.co.kr/v3/webstd/js/nicepay-3.0.js"
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
        onError={() =>
          setError(
            "결제 모듈 로드 실패. 광고 차단기를 끄거나 새로고침해 주세요.",
          )
        }
      />

      {/* Buyer form */}
      <section className="mt-6 rounded-3xl bg-white border border-cream-200 p-6 lg:p-8">
        <h2 className="text-[16px] font-extrabold text-ink-900 mb-5">
          결제자 정보
        </h2>
        <form onSubmit={startPayment} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="이름 (대표자)">
              <input
                required
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                autoComplete="name"
                placeholder="홍길동"
                className="form-input"
              />
            </Field>
            <Field label="휴대전화">
              <input
                required
                value={buyerTel}
                onChange={(e) => setBuyerTel(e.target.value)}
                inputMode="tel"
                autoComplete="tel"
                placeholder="01012345678"
                className="form-input"
              />
            </Field>
          </div>
          <Field label="이메일 (영수증 수신)">
            <input
              required
              type="email"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
              className="form-input"
            />
          </Field>

          <label className="flex items-start gap-2 pt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="peer sr-only"
            />
            <span
              className={cn(
                "mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors",
                agree ? "bg-navy-600 border-navy-600" : "bg-white border-ink-300",
              )}
            >
              {agree && (
                <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden>
                  <path
                    d="M2 6.5L4.5 9L10 3"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span className="text-[12.5px] text-ink-700 leading-[1.6]">
              결제 금액·환불 정책·{" "}
              <Link
                href="/terms"
                className="underline underline-offset-2 hover:text-ink-900"
              >
                이용약관
              </Link>
              ·{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 hover:text-ink-900"
              >
                개인정보 처리방침
              </Link>
              에 동의합니다.
            </span>
          </label>

          {error && (
            <div className="rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-[13px] text-rose-700">
              {error}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
            <p className="inline-flex items-center gap-1.5 text-[12px] text-ink-500">
              <Lock className="w-3.5 h-3.5" strokeWidth={2} />
              NicePay 보안 결제로 안전하게 진행됩니다.
            </p>
            <button
              type="submit"
              disabled={phase !== "form" || !sdkReady}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-600 hover:bg-navy-700 disabled:bg-navy-300 text-white font-bold px-7 text-[14.5px] transition-colors h-[52px] min-w-[220px]"
            >
              {phase === "preparing" || phase === "popup-open" ? (
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
        </form>
      </section>

      <p className="mt-4 inline-flex items-center gap-1.5 text-[12px] text-ink-400">
        <Info className="w-3.5 h-3.5" strokeWidth={2} />
        결제 진행 시{" "}
        {process.env.NEXT_PUBLIC_NICEPAY_LIVE === "true"
          ? "실 결제"
          : "테스트 결제"}{" "}
        모드로 NicePay 팝업이 열립니다. {branchName} 계약 — {formatKRW(amount)}.
      </p>

      {/* Hidden form posted into the NicePay popup via goPay() */}
      {prepared && (
        <form
          id="nicepay-form"
          name="nicepayForm"
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
          <input type="hidden" name="ReqReserved" value={branchId} />
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
        .form-input::placeholder {
          color: var(--color-ink-300);
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
