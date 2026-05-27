"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building,
  Users,
  Mail,
  CreditCard,
  FileText,
  Headphones,
  Shield,
  LogOut,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "대시보드", icon: LayoutDashboard },
  { href: "/admin/branches", label: "지점", icon: Building },
  { href: "/admin/members", label: "회원", icon: Users },
  { href: "/admin/contracts", label: "계약 관리", icon: FileText },
  { href: "/admin/mail", label: "우편물 로그", icon: Mail },
  { href: "/admin/payments", label: "결제·정산", icon: CreditCard },
  { href: "/admin/support", label: "고객 문의", icon: Headphones },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen flex bg-ink-900 text-ink-100">
      <aside className="hidden lg:flex w-[240px] flex-col border-r border-ink-700/60 bg-ink-900">
        <div className="px-6 py-6 border-b border-ink-700/60">
          <p className="text-[11.5px] font-bold text-navy-300 tracking-widest">
            ZAKSIM · OPS
          </p>
          <p className="text-[16px] font-extrabold text-white mt-1">
            어드민 콘솔
          </p>
        </div>
        <nav aria-label="어드민 메뉴" className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {items.map((it) => {
              const Icon = it.icon;
              const active =
                it.href === "/admin"
                  ? pathname === "/admin"
                  : pathname?.startsWith(it.href);
              return (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 h-10 px-3 rounded-lg text-[13px] font-semibold transition-colors",
                      active
                        ? "bg-navy-600 text-white"
                        : "text-ink-300 hover:bg-ink-700/50 hover:text-white",
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4",
                        active ? "text-white" : "text-ink-400",
                      )}
                      strokeWidth={2}
                    />
                    {it.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-3 border-t border-ink-700/60">
          <Link
            href="/"
            className="flex items-center gap-3 h-10 px-3 rounded-lg text-[12.5px] text-ink-400 hover:text-white hover:bg-ink-700/50 transition-colors"
          >
            <Shield className="w-4 h-4" strokeWidth={2} />
            메인 사이트로
          </Link>
          <button
            type="button"
            className="w-full flex items-center gap-3 h-10 px-3 rounded-lg text-[12.5px] text-ink-400 hover:text-white hover:bg-ink-700/50 transition-colors"
          >
            <LogOut className="w-4 h-4" strokeWidth={2} />
            로그아웃
          </button>
        </div>
      </aside>

      <div className="flex-1 bg-ink-800 min-w-0">
        <header className="border-b border-ink-700/60 bg-ink-900 px-6 lg:px-10 py-4 flex items-center justify-between">
          <p className="text-[13px] text-ink-400">
            관리자 · 한승수 (Owner)
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-600/20 text-navy-300 border border-navy-600/40 px-2.5 py-1 text-[11px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-navy-300" />
            라이브
          </span>
        </header>
        <main id="main" className="p-6 lg:p-10 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
