import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function Logo({ className, variant = "dark" }: LogoProps) {
  const color = variant === "light" ? "text-white" : "text-ink-900";
  const accent = variant === "light" ? "text-navy-300" : "text-navy-600";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-baseline gap-[1px] font-extrabold tracking-tight select-none",
        color,
        className,
      )}
      aria-label="작심스페이스 홈"
    >
      <span className="text-[19px] leading-none">ZAKSIM</span>
      <span className={cn("text-[19px] leading-none", accent)}>·</span>
      <span className="text-[19px] leading-none">SPACE</span>
    </Link>
  );
}
