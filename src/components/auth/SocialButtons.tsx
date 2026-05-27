"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

/**
 * Social OAuth buttons (Kakao for now). Triggers Supabase OAuth with the
 * provider and a redirect back to /auth/callback, which exchanges the code
 * for a session cookie and forwards to ?next= or /me.
 */
export function SocialButtons() {
  const params = useSearchParams();
  const next = params.get("next") || "/me";
  const [loading, setLoading] = useState<"kakao" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const signInWithKakao = async () => {
    setError(null);
    setLoading("kakao");
    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: { redirectTo },
      });
      if (error) {
        setError(error.message);
        setLoading(null);
      }
      // On success, browser is redirected to Kakao — no further action here.
    } catch (e) {
      setError(e instanceof Error ? e.message : "예상치 못한 오류");
      setLoading(null);
    }
  };

  return (
    <div className="space-y-2.5">
      <button
        type="button"
        onClick={signInWithKakao}
        disabled={loading !== null}
        className="w-full h-12 rounded-2xl bg-[#FEE500] hover:brightness-95 disabled:opacity-60 text-[#191919] font-bold text-[14px] inline-flex items-center justify-center gap-2 transition-all"
      >
        <KakaoBubble />
        {loading === "kakao" ? "이동 중…" : "카카오로 계속하기"}
      </button>
      <button
        type="button"
        disabled
        title="준비 중"
        className="w-full h-12 rounded-2xl bg-[#03C75A] opacity-50 cursor-not-allowed text-white font-bold text-[14px] inline-flex items-center justify-center gap-2"
      >
        <span className="font-black text-[15px]">N</span>
        네이버로 계속하기 (준비 중)
      </button>
      {error && (
        <p className="mt-2 text-[12px] text-rose-600 text-center">{error}</p>
      )}
    </div>
  );
}

function KakaoBubble() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.86 1.86 5.36 4.66 6.78L5.5 21.5c-.07.2.16.37.34.26L10 19.4c.66.08 1.33.13 2 .13 5.52 0 10-3.58 10-8s-4.48-9-10-9z" />
    </svg>
  );
}
