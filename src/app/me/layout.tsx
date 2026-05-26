import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MyPageSidebar } from "./MyPageSidebar";
import { currentUser } from "@/lib/mypage-data";

export default function MyPageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16 bg-cream-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 lg:py-14">
          <header className="mb-8 lg:mb-10">
            <p className="text-[12.5px] font-semibold text-sage-600 tracking-wider uppercase mb-2">
              My Page
            </p>
            <h1 className="text-[26px] lg:text-[32px] font-extrabold text-ink-900 leading-tight">
              {currentUser.name} 대표님, 환영합니다
            </h1>
            <p className="mt-2 text-[13.5px] text-ink-500">
              {currentUser.company} · 가입일 {currentUser.joinedAt}
            </p>
          </header>

          <div className="grid lg:grid-cols-[220px_1fr] gap-6 lg:gap-10 items-start">
            <MyPageSidebar />
            <div className="min-w-0">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
