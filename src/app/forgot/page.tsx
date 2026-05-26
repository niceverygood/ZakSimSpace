import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ForgotForm } from "./ForgotForm";

export const metadata: Metadata = {
  title: "비밀번호 찾기",
  description: "가입한 이메일로 비밀번호 재설정 링크를 보내드립니다.",
};

export default function ForgotPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16 bg-cream-50">
        <section className="mx-auto max-w-md px-6 py-16 lg:py-24">
          <div className="text-center mb-9">
            <h1 className="text-[26px] lg:text-[30px] font-extrabold text-ink-900 leading-tight">
              비밀번호를 잊으셨나요?
            </h1>
            <p className="mt-3 text-[14px] text-ink-500">
              가입한 이메일을 입력하시면 재설정 링크를 보내드려요.
            </p>
          </div>

          <div className="rounded-3xl bg-white border border-cream-200 p-7 lg:p-8 shadow-[0_18px_50px_-30px_rgba(12,18,25,0.25)]">
            <ForgotForm />
            <p className="mt-6 text-center text-[12.5px] text-ink-500">
              로그인으로 돌아가기?{" "}
              <Link
                href="/login"
                className="font-bold text-sage-700 hover:text-sage-800"
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
