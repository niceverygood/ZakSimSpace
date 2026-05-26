"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Logo } from "./Logo";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type HeaderProps = {
  variant?: "transparent" | "solid";
};

export function Header({ variant = "transparent" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isSolid = variant === "solid" || scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
        isSolid
          ? "bg-white/95 backdrop-blur-md border-b border-navy-100"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo + Main nav */}
          <div className="flex items-center gap-10">
            <Logo variant={isSolid ? "dark" : "light"} />
            <nav className="hidden lg:flex items-center gap-7">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[14px] font-medium transition-colors",
                    isSolid
                      ? "text-navy-700 hover:text-navy-900"
                      : "text-white/85 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right: Sub-nav + Cart + Login */}
          <div className="flex items-center gap-5">
            <nav className="hidden md:flex items-center gap-5">
              {siteConfig.subNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[13px] transition-colors",
                    isSolid
                      ? "text-navy-500 hover:text-navy-900"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/cart"
              aria-label="장바구니"
              className={cn(
                "transition-colors",
                isSolid
                  ? "text-navy-700 hover:text-navy-900"
                  : "text-white/85 hover:text-white"
              )}
            >
              <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={1.8} />
            </Link>
            <Link
              href="/login"
              className={cn(
                "rounded-full px-4 h-9 inline-flex items-center text-[13px] font-medium transition-all",
                isSolid
                  ? "border border-navy-200 text-navy-800 hover:border-navy-400"
                  : "border border-white/30 text-white hover:bg-white hover:text-navy-900"
              )}
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
