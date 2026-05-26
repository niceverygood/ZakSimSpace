import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "cream" | "cream-light";
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "cream",
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "border-b border-cream-200",
        tone === "cream" ? "bg-cream-100" : "bg-cream-50",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-6 lg:px-8 py-14 lg:py-20",
          align === "center" && "text-center",
        )}
      >
        {eyebrow && (
          <p className="text-[13px] font-semibold text-sage-600 tracking-wider uppercase mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="text-[30px] lg:text-[44px] font-extrabold text-ink-900 leading-[1.2] tracking-tight">
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              "mt-5 text-[15px] lg:text-[17px] text-ink-500 leading-[1.75]",
              align === "center" ? "mx-auto max-w-xl" : "max-w-xl",
            )}
          >
            {description}
          </p>
        )}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </section>
  );
}
