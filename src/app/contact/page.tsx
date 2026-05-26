import type { Metadata } from "next";
import { Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "./ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "제휴·문의",
  description:
    "광고·제휴·지점 입점·언론 문의 등 작심스페이스에 문의 사항을 남겨주세요.",
};

const channels = [
  {
    icon: Phone,
    label: "고객센터",
    value: siteConfig.customerCenter,
    sub: "평일 10:00 - 18:00",
    href: `tel:${siteConfig.customerCenter.replace(/-/g, "")}`,
  },
  {
    icon: Mail,
    label: "제휴 이메일",
    value: "partner@zaksimspace.com",
    sub: "영업일 기준 1일 이내 회신",
    href: "mailto:partner@zaksimspace.com",
  },
  {
    icon: MessageCircle,
    label: "카카오톡 채널",
    value: "@작심스페이스",
    sub: "365일 24시간 접수",
    href: "#",
  },
  {
    icon: Clock,
    label: "휴무 안내",
    value: "점심 12:00 - 13:00",
    sub: "주말·공휴일 휴무",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        <PageHero
          eyebrow="Contact"
          title={
            <>
              궁금한 점이 있으세요?
              <br />
              <span className="text-sage-600">먼저 연락드릴게요</span>
            </>
          }
          description="제휴·지점 입점·언론 문의 등 어떤 주제든 편하게 남겨주세요."
        />

        <section className="bg-cream-50 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12">
            {/* Channels */}
            <aside>
              <h2 className="text-[18px] font-extrabold text-ink-900 mb-5">
                다른 채널로 연락하기
              </h2>
              <ul className="space-y-3">
                {channels.map((c) => {
                  const Icon = c.icon;
                  const Inner = (
                    <div className="rounded-2xl bg-white border border-cream-200 p-5 flex items-start gap-4 hover:border-sage-300 transition-colors">
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-sage-50 border border-sage-200 flex items-center justify-center">
                        <Icon
                          className="w-4.5 h-4.5 text-sage-700"
                          strokeWidth={2}
                        />
                      </div>
                      <div>
                        <p className="text-[11.5px] text-ink-400">{c.label}</p>
                        <p className="text-[14.5px] font-bold text-ink-900 tnum mt-0.5">
                          {c.value}
                        </p>
                        <p className="text-[12px] text-ink-500 mt-1">{c.sub}</p>
                      </div>
                    </div>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a href={c.href} className="block">
                          {Inner}
                        </a>
                      ) : (
                        Inner
                      )}
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Form */}
            <div className="rounded-3xl bg-white border border-cream-200 p-6 lg:p-8 shadow-[0_18px_50px_-30px_rgba(12,18,25,0.25)]">
              <h2 className="text-[18px] font-extrabold text-ink-900">
                문의 폼
              </h2>
              <p className="text-[13px] text-ink-500 mt-1.5">
                작성해 주시면 영업일 기준 1일 이내 회신해 드립니다.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
