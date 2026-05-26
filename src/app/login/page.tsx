import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "로그인",
  description: "작심스페이스 마이페이지에 로그인하세요.",
};

export default function LoginPage() {
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
            <LoginForm />

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <span className="flex-1 h-px bg-cream-200" />
              <span className="text-[11.5px] text-ink-400 font-semibold">
                또는
              </span>
              <span className="flex-1 h-px bg-cream-200" />
            </div>

            {/* Social */}
            <div className="space-y-2.5">
              <button
                type="button"
                className="w-full h-12 rounded-2xl bg-[#FEE500] hover:brightness-95 text-[#191919] font-bold text-[14px] inline-flex items-center justify-center gap-2 transition-all"
              >
                <KakaoBubble />
                카카오로 계속하기
              </button>
              <button
                type="button"
                className="w-full h-12 rounded-2xl bg-[#03C75A] hover:brightness-95 text-white font-bold text-[14px] inline-flex items-center justify-center gap-2 transition-all"
              >
                <span className="font-black text-[15px]">N</span>
                네이버로 계속하기
              </button>
            </div>

            <p className="mt-7 text-center text-[12.5px] text-ink-500">
              아직 계정이 없으신가요?{" "}
              <Link
                href="/signup"
                className="font-bold text-navy-700 hover:text-navy-800"
              >
                무료 회원가입
              </Link>
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
