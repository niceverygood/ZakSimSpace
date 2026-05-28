import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function Logo({ className, variant = "dark" }: LogoProps) {
  const color = variant === "light" ? "text-white" : "text-ink-900";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-baseline gap-[6px] font-extrabold tracking-tight select-none",
        color,
        className,
      )}
      aria-label="작심스페이스 홈"
    >
      <span className="text-[19px] leading-none">ZAKSIM</span>
      <span className="text-[19px] leading-none">SPACE</span>
    </Link>
  );
}
