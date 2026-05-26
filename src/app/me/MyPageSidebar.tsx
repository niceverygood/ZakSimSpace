"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Mail,
  CreditCard,
  Receipt,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/me", label: "대시보드", icon: LayoutDashboard },
  { href: "/me/contracts", label: "내 계약", icon: FileText },
  { href: "/me/mail", label: "우편물", icon: Mail },
  { href: "/me/billing", label: "결제 내역", icon: CreditCard },
  { href: "/me/invoices", label: "세금계산서", icon: Receipt },
  { href: "/me/settings", label: "계정 설정", icon: Settings },
];

export function MyPageSidebar() {
  const pathname = usePathname();
  return (
    <nav aria-label="마이페이지">
      <ul className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/me"
              ? pathname === "/me"
              : pathname?.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 h-11 px-3.5 rounded-xl text-[13.5px] font-semibold transition-colors",
                  active
                    ? "bg-navy-50 text-navy-700 border border-navy-200"
                    : "text-ink-700 hover:bg-cream-100 border border-transparent",
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4",
                    active ? "text-navy-600" : "text-ink-400",
                  )}
                  strokeWidth={2}
                />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 pt-5 border-t border-cream-200">
        <button
          type="button"
          className="w-full flex items-center gap-3 h-11 px-3.5 rounded-xl text-[13.5px] font-semibold text-ink-500 hover:bg-cream-100 transition-colors"
        >
          <LogOut className="w-4 h-4 text-ink-400" strokeWidth={2} />
          로그아웃
        </button>
      </div>
    </nav>
  );
}
