import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SignupForm } from "./SignupForm";

export const metadata: Metadata = {
  title: "회원가입",
  description: "1분이면 끝. 작심스페이스에 가입하고 사업장을 시작하세요.",
};

export default function SignupPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16 bg-cream-50">
        <section className="mx-auto max-w-md px-6 py-16 lg:py-24">
          <div className="text-center mb-9">
            <h1 className="text-[28px] lg:text-[32px] font-extrabold text-ink-900 leading-tight">
              결심을 사업장으로
            </h1>
            <p className="mt-3 text-[14px] text-ink-500">
              1분 가입으로 사업장 계약까지 5분이면 끝납니다.
            </p>
          </div>

          <div className="rounded-3xl bg-white border border-cream-200 p-7 lg:p-8 shadow-[0_18px_50px_-30px_rgba(12,18,25,0.25)]">
            <SignupForm />
            <p className="mt-7 text-center text-[12.5px] text-ink-500">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/login"
                className="font-bold text-navy-700 hover:text-navy-800"
              >
                로그인
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
