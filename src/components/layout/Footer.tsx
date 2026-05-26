import Link from "next/link";
import { Logo } from "./Logo";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M22 8.5a3 3 0 0 0-2.1-2.1C18 6 12 6 12 6s-6 0-7.9.4A3 3 0 0 0 2 8.5C1.6 10.4 1.6 12 1.6 12s0 1.6.4 3.5a3 3 0 0 0 2.1 2.1C6 18 12 18 12 18s6 0 7.9-.4a3 3 0 0 0 2.1-2.1c.4-1.9.4-3.5.4-3.5s0-1.6-.4-3.5z" />
      <path d="m10 9 5 3-5 3V9z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const footerNav = {
  sitemap: {
    title: "사이트맵",
    items: [
      { label: "전국 지점", href: "/locations" },
      { label: "오피스 가격", href: "/pricing" },
      { label: "업종 신청 사례", href: "/cases" },
      { label: "작심스토리", href: "/stories" },
      { label: "자주 하는 질문", href: "/faq" },
    ],
  },
  company: {
    title: "회사",
    items: [
      { label: "회사 소개", href: "/about" },
      { label: "회사 소개서", href: "/brochure" },
      { label: "채용", href: "/careers" },
      { label: "제휴 문의", href: "/contact" },
    ],
  },
  terms: {
    title: "약관",
    items: [
      { label: "서비스 이용약관", href: "/terms" },
      { label: "개인정보 처리방침", href: "/privacy" },
      { label: "운영정책", href: "/policy" },
    ],
  },
  family: {
    title: "패밀리 사이트",
    items: [
      { label: "패밀리 센터", href: "/family" },
      { label: "파트너스 센터", href: "/partners" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-navy-50 border-t border-navy-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10 lg:gap-8">
          {/* Brand block */}
          <div className="space-y-5">
            <Logo />
            <div className="text-[13px] leading-6 text-navy-500 space-y-1">
              <p>주식회사 작심스페이스</p>
              <p>서울특별시 강남구 테헤란로 000, 00층</p>
              <p>사업자등록번호 000-00-00000</p>
              <p>통신판매업 신고 2026-서울강남-00000</p>
              <p className="pt-2">
                고객센터 <span className="text-navy-800 font-semibold">1833-0000</span>
              </p>
              <p>평일 10:00 - 18:00 (점심 12:00 - 13:00)</p>
            </div>
          </div>

          {/* Nav blocks */}
          {Object.entries(footerNav).map(([key, group]) => (
            <div key={key}>
              <h4 className="text-[13px] font-semibold text-navy-900 mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[13px] text-navy-500 hover:text-navy-800 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-navy-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[12px] text-navy-400">
            © 2026 JakSimSpace Corporation. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-navy-400">
            <Link
              href="#"
              aria-label="Instagram"
              className="hover:text-navy-700 transition-colors"
            >
              <InstagramIcon className="w-[18px] h-[18px]" />
            </Link>
            <Link
              href="#"
              aria-label="YouTube"
              className="hover:text-navy-700 transition-colors"
            >
              <YoutubeIcon className="w-[18px] h-[18px]" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
