"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * Reads the NicePay auth result (POSTed by the popup → injected as hidden
 * fields on the parent window by the SDK; or passed via query string) and
 * calls /api/payment/approve. Redirects to complete/fail based on result.
 */
export function ApproveBridge({ initial }: { initial: Record<string, string> }) {
  const router = useRouter();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const pick = (k: string): string => {
      if (initial[k]) return initial[k];
      // SDK may have written to window.name or hidden form fields:
      const el = document.querySelector<HTMLInputElement>(`input[name="${k}"]`);
      return el?.value ?? "";
    };

    const authResultCode = pick("AuthResultCode");
    const authResultMsg = pick("AuthResultMsg");
    const authToken = pick("AuthToken");
    const tid = pick("TxTid") || pick("Tid") || pick("TID");
    const moid = pick("Moid");
    const amt = Number(pick("Amt"));
    const nextAppUrl = pick("NextAppURL");

    if (authResultCode && authResultCode !== "0000") {
      router.replace(
        `/payment/fail?reason=${encodeURIComponent(authResultMsg || "결제 인증이 실패했어요.")}`,
      );
      return;
    }
    if (!authToken || !tid || !moid || !amt || !nextAppUrl) {
      router.replace(
        `/payment/fail?reason=${encodeURIComponent("결제 정보가 누락되었어요. 다시 시도해 주세요.")}`,
      );
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/payment/approve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ authToken, tid, moid, amt, nextAppUrl }),
        });
        const data = await res.json();
        if (!res.ok) {
          router.replace(
            `/payment/fail?reason=${encodeURIComponent(data.error ?? "승인에 실패했어요.")}`,
          );
          return;
        }
        router.replace(`/payment/complete?moid=${encodeURIComponent(moid)}`);
      } catch (e) {
        router.replace(
          `/payment/fail?reason=${encodeURIComponent(
            e instanceof Error ? e.message : "네트워크 오류",
          )}`,
        );
      }
    })();
  }, [initial, router]);

  return null;
}
