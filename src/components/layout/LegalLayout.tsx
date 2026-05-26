import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

type Section = {
  id: string;
  title: string;
  body: ReactNode;
};

export function LegalLayout({
  title,
  effectiveDate,
  draftNote,
  intro,
  sections,
}: {
  title: string;
  effectiveDate: string;
  /** Optional disclaimer shown at the top so it's clear text is provisional. */
  draftNote?: string;
  intro?: ReactNode;
  sections: Section[];
}) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16 bg-cream-50">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 py-14 lg:py-20">
          <header className="mb-10">
            <h1 className="text-[28px] lg:text-[36px] font-extrabold text-ink-900 leading-[1.25]">
              {title}
            </h1>
            <p className="mt-3 text-[13px] text-ink-500 tnum">
              시행일: {effectiveDate}
            </p>
            {draftNote && (
              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-[12.5px] text-amber-700">
                {draftNote}
              </div>
            )}
          </header>

          {/* TOC */}
          {sections.length > 0 && (
            <aside className="mb-10 rounded-2xl border border-cream-200 bg-white p-5">
              <p className="text-[12px] font-bold text-ink-500 mb-3">목차</p>
              <ol className="space-y-1.5">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-[13px] text-ink-700 hover:text-sage-700 tnum"
                    >
                      제{i + 1}조. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>
          )}

          {intro && (
            <div className="mb-10 text-[14.5px] leading-[1.85] text-ink-700">
              {intro}
            </div>
          )}

          <div className="space-y-10">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-[18px] lg:text-[20px] font-extrabold text-ink-900 mb-3">
                  제{i + 1}조. {s.title}
                </h2>
                <div className="text-[14px] leading-[1.85] text-ink-700 space-y-3">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
