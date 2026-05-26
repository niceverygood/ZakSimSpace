import type { Metadata } from "next";
import { Mail, Download, Send } from "lucide-react";
import { mailItems, mailCategoryLabels } from "../helpers";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "우편물" };

export default function MailPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white border border-cream-200 p-5 lg:p-7">
        <header className="flex items-center justify-between mb-5">
          <h2 className="text-[16px] font-extrabold text-ink-900">
            도착 우편물 ({mailItems.length})
          </h2>
          <button
            type="button"
            className="text-[12.5px] font-semibold text-navy-700 hover:text-navy-800"
          >
            우편물 정책 보기 →
          </button>
        </header>

        <ul className="divide-y divide-cream-200">
          {mailItems.map((m) => (
            <li
              key={m.id}
              className="py-4 first:pt-0 last:pb-0 flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cream-50 border border-cream-200 flex items-center justify-center">
                <Mail className="w-4 h-4 text-ink-500" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-[14px] font-bold text-ink-900">
                    {m.sender}
                  </p>
                  <CategoryTag category={m.category} />
                </div>
                <p className="text-[12px] text-ink-500 mt-1 tnum">
                  {m.arrivedAt} · {m.branch} · {m.id}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  aria-label="스캔 다운로드"
                  disabled={!m.scanned}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full h-9 px-3.5 text-[12px] font-semibold transition-colors",
                    m.scanned
                      ? "bg-navy-50 text-navy-700 hover:bg-navy-100"
                      : "bg-cream-100 text-ink-400 cursor-not-allowed",
                  )}
                >
                  <Download className="w-3.5 h-3.5" strokeWidth={2} />
                  {m.scanned ? "스캔" : "스캔 대기"}
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 hover:border-ink-400 h-9 px-3.5 text-[12px] font-semibold text-ink-700"
                >
                  <Send className="w-3.5 h-3.5" strokeWidth={2} />
                  발송
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function CategoryTag({
  category,
}: {
  category: "tax" | "gov" | "bank" | "other";
}) {
  const cls =
    category === "tax"
      ? "bg-rose-50 text-rose-600 border-rose-100"
      : category === "gov"
        ? "bg-blue-50 text-blue-600 border-blue-100"
        : category === "bank"
          ? "bg-violet-50 text-violet-600 border-violet-100"
          : "bg-cream-100 text-ink-500 border-cream-200";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold",
        cls,
      )}
    >
      {mailCategoryLabels[category]}
    </span>
  );
}
