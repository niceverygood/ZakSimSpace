import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SocialButtons } from "@/components/auth/SocialButtons";

export const metadata: Metadata = {
  title: "로그인",
  description: "작심스페이스 마이페이지에 로그인하세요.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16 bg-cream-50">
        <section className="mx-auto max-w-md px-6 py-16 lg:py-24">
          <div className="text-center mb-9">
            <h1 className="text-[28px] lg:text-[32px] font-extrabold text-ink-900 leading-tight">
              다시 만나서 반가워요
            </h1>
            <p className="mt-3 text-[14px] text-ink-500">
              계약·우편물·세금계산서를 한 화면에서 관리하세요.
            </p>
          </div>

          <div className="rounded-3xl bg-white border border-cream-200 p-7 lg:p-8 shadow-[0_18px_50px_-30px_rgba(12,18,25,0.25)]">
            {error && (
              <div className="mb-5 rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-[13px] text-rose-700">
                {error}
              </div>
            )}

            <Suspense fallback={<div className="h-[52px]" />}>
              <SocialButtons />
            </Suspense>

            <p className="mt-6 text-center text-[12px] text-ink-400">
              카카오 계정으로 1초 만에 시작할 수 있어요.
            </p>
          </div>

          <p className="mt-6 text-center text-[11.5px] text-ink-400 leading-[1.7]">
            로그인은 작심스페이스{" "}
            <Link href="/terms" className="underline underline-offset-2">
              이용약관
            </Link>
            과{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              개인정보 처리방침
            </Link>
            에 동의함을 의미합니다.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

