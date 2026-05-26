import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function Logo({ className, variant = "dark" }: LogoProps) {
  const color = variant === "light" ? "text-white" : "text-navy-900";
  const accent = "text-gold-500";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-baseline gap-[1px] font-semibold tracking-tight select-none",
        color,
        className
      )}
      aria-label="작심스페이스 홈"
    >
      <span className="text-[19px] leading-none">JAKSIM</span>
      <span className={cn("text-[19px] leading-none", accent)}>·</span>
      <span className="text-[19px] leading-none">SPACE</span>
    </Link>
  );
}
