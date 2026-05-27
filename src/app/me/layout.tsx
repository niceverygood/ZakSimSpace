import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MyPageSidebar } from "./MyPageSidebar";
import { createClient, isSupabaseConfigured } from "@/utils/supabase/server";

export default async function MyPageLayout({ children }: { children: ReactNode }) {
  // Auth gate. If Supabase env isn't configured (dev only), let through —
  // there's no real session to check anyway.
  let displayName = "회원";
  let subtitle: string | null = null;
  if (isSupabaseConfigured()) {
    const supabase = createClient(await cookies());
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      redirect("/login?next=/me");
    }
    const meta = (data.user.user_metadata ?? {}) as Record<string, unknown>;
    displayName =
      (typeof meta.name === "string" && meta.name) ||
      (typeof meta.nickname === "string" && meta.nickname) ||
      (typeof meta.full_name === "string" && meta.full_name) ||
      data.user.email ||
      "회원";
    const joinedAt = data.user.created_at
      ? new Date(data.user.created_at).toISOString().slice(0, 10)
      : null;
    subtitle = joinedAt ? `가입일 ${joinedAt}` : null;
  }

  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16 bg-cream-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 lg:py-14">
          <header className="mb-8 lg:mb-10">
            <p className="text-[12.5px] font-semibold text-navy-600 tracking-wider uppercase mb-2">
              My Page
            </p>
            <h1 className="text-[26px] lg:text-[32px] font-extrabold text-ink-900 leading-tight">
              {displayName} 님, 환영합니다
            </h1>
            {subtitle && (
              <p className="mt-2 text-[13.5px] text-ink-500">{subtitle}</p>
            )}
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
