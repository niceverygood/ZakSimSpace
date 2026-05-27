"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, Menu, X, Rocket } from "lucide-react";
import { Logo } from "./Logo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useContractModal } from "@/components/contract/ContractProvider";
import { createClient } from "@/utils/supabase/client";

/** Friendly display name pulled from Supabase user metadata. */
function displayName(user: { user_metadata?: Record<string, unknown>; email?: string | null } | null) {
  if (!user) return "";
  const meta = user.user_metadata ?? {};
  return (
    (typeof meta.name === "string" && meta.name) ||
    (typeof meta.nickname === "string" && meta.nickname) ||
    (typeof meta.full_name === "string" && meta.full_name) ||
    user.email ||
    "회원"
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ user_metadata?: Record<string, unknown>; email?: string | null } | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { open: openContract } = useContractModal();

  /** Subscribe to Supabase auth state so the header reflects login changes. */
  useEffect(() => {
    let supabase;
    try {
      supabase = createClient();
    } catch {
      return; // Supabase env missing — degrade silently.
    }
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setUser(null);
      router.refresh();
    } catch {
      /* env missing — no-op */
    }
  };
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const openContractFromMobile = () => {
    setMobileOpen(false);
    openContract();
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-300",
          scrolled || mobileOpen
            ? "bg-cream-50/90 backdrop-blur-md border-b border-cream-200"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-9">
              <Logo />
              <nav aria-label="주 메뉴" className="hidden lg:flex items-center gap-7">
                {siteConfig.nav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "text-[13.5px] font-semibold transition-colors",
                        active
                          ? "text-navy-700"
                          : "text-ink-700 hover:text-ink-900",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <Link
                href="/cart"
                aria-label="장바구니"
                className="text-ink-700 hover:text-ink-900 transition-colors"
              >
                <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={1.8} />
              </Link>
              {user ? (
                <div className="hidden sm:inline-flex items-center gap-2">
                  <Link
                    href="/me"
                    className="rounded-full px-4 h-9 inline-flex items-center text-[12.5px] font-semibold text-ink-700 border border-ink-200 hover:border-ink-400 transition-all max-w-[160px] truncate"
                    title={displayName(user)}
                  >
                    {displayName(user)}
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="text-[12px] text-ink-500 hover:text-ink-800 px-1"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:inline-flex rounded-full px-4 h-9 items-center text-[12.5px] font-semibold text-ink-700 border border-ink-200 hover:border-ink-400 transition-all"
                >
                  로그인
                </Link>
              )}
              <button
                type="button"
                onClick={openContract}
                className="hidden sm:inline-flex rounded-full bg-navy-600 hover:bg-navy-700 text-white px-4 h-9 items-center text-[12.5px] font-semibold transition-colors"
              >
                빠른 계약
              </button>
              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden w-9 h-9 rounded-full hover:bg-cream-100 flex items-center justify-center text-ink-800 transition-colors"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" strokeWidth={2} />
                ) : (
                  <Menu className="w-5 h-5" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-30 pt-16 animate-[fadeIn_0.18s_ease]">
          <button
            type="button"
            aria-label="메뉴 닫기"
            className="absolute inset-0 bg-ink-900/30"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative bg-cream-50 border-b border-cream-200 shadow-[0_24px_40px_-20px_rgba(12,18,25,0.25)] animate-[slideDown_0.22s_cubic-bezier(0.22,1,0.36,1)]">
            <div className="mx-auto max-w-7xl px-6 py-6">
              <nav className="flex flex-col">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-3.5 text-[16px] font-bold text-ink-900 border-b border-cream-200 last:border-b-0"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 pt-4 border-t border-cream-200 grid grid-cols-2 gap-2 text-[13px]">
                {user ? (
                  <>
                    <Link
                      href="/me"
                      onClick={() => setMobileOpen(false)}
                      className="py-2 text-ink-700 font-semibold truncate"
                    >
                      {displayName(user)}
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        handleSignOut();
                      }}
                      className="py-2 text-ink-500 text-left"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="py-2 text-ink-500"
                  >
                    로그인
                  </Link>
                )}
                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="py-2 text-ink-500"
                >
                  장바구니
                </Link>
              </div>

              <button
                type="button"
                onClick={openContractFromMobile}
                className="mt-5 w-full h-12 rounded-2xl bg-navy-600 hover:bg-navy-700 text-white font-bold text-[14.5px] inline-flex items-center justify-center gap-2"
              >
                <Rocket className="w-4 h-4" strokeWidth={2} />
                빠른 계약
              </button>
            </div>
          </div>

          <style>{`
            @keyframes slideDown {
              from { opacity: 0; transform: translateY(-8px) }
              to   { opacity: 1; transform: translateY(0) }
            }
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
          `}</style>
        </div>
      )}
    </>
  );
}
