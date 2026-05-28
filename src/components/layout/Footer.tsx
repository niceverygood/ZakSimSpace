import Link from "next/link";
import { Logo } from "./Logo";

/**
 * Business unit links per client spec (PDF page 5).
 * External URLs open in a new tab so the user stays on the main site.
 */
const businessUnits = [
  {
    name: "작심스터디카페",
    links: [
      { label: "WEBSITE", href: "https://www.zaksim.co.kr/" },
      { label: "YOUTUBE", href: "https://www.youtube.com/@zaksim2013" },
      {
        label: "INSTAGRAM",
        href: "https://www.instagram.com/zaksim_official/",
      },
      { label: "BLOG", href: "https://blog.naver.com/zaksimlibrary" },
    ],
  },
  {
    name: "작심오피스",
    links: [
      { label: "WEBSITE", href: "https://www.zaksimoffice.com/" },
      {
        label: "INSTAGRAM",
        href: "https://www.instagram.com/zaksimoffice_official/",
      },
      { label: "BLOG", href: "https://blog.naver.com/mycabin_official" },
    ],
  },
  {
    name: "작심디자인그룹",
    links: [
      { label: "WEBSITE", href: "https://www.zaksimdesigngroup.kr/" },
      {
        label: "INSTAGRAM",
        href: "https://www.instagram.com/zaksim_designgroup/",
      },
      { label: "BLOG", href: "https://blog.naver.com/zaksim_designgroup" },
    ],
  },
  {
    name: "작심라운지",
    links: [{ label: "WEBSITE", href: "#" }],
  },
  {
    name: "작심애드",
    links: [{ label: "WEBSITE", href: "https://zaksimad.oopy.io/" }],
  },
  {
    name: "작심스페이스",
    links: [
      { label: "WEBSITE", href: "https://www.zaksimspace.com/" },
      {
        label: "INSTAGRAM",
        href: "https://www.instagram.com/zaksimspace__official/",
      },
      { label: "BLOG", href: "https://blog.naver.com/zaksim_space" },
    ],
  },
  {
    name: "픽코파트너",
    links: [
      { label: "WEBSITE", href: "https://www.pickko.co.kr/" },
      {
        label: "INSTAGRAM",
        href: "https://www.instagram.com/pickko_partners/",
      },
      { label: "BLOG", href: "https://blog.naver.com/pickkopartners" },
      { label: "YOUTUBE", href: "https://www.youtube.com/@pickkopartners" },
    ],
  },
];

const footerNav = {
  sitemap: {
    title: "사이트맵",
    items: [
      { label: "지점 검색", href: "/locations" },
      { label: "계약진행", href: "/contract" },
      { label: "오피스 가격", href: "/pricing" },
      { label: "업종 신청 사례", href: "/industries" },
      { label: "뉴스 / 블로그", href: "/blog" },
      { label: "자주 하는 질문", href: "/faq" },
    ],
  },
  company: {
    title: "회사",
    items: [
      { label: "회사 소개", href: "/about" },
      { label: "제휴 문의", href: "/contact" },
    ],
  },
};

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function Footer() {
  return (
    <footer className="bg-ink-900 text-cream-200">
      {/* Business Units + 회사 안내 (좌우) */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-14 lg:pt-16">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Business Units (좌) */}
          <div>
            <p className="text-[20px] lg:text-[24px] font-extrabold text-white mb-7">
              Business Units
            </p>
            <div className="border-t border-ink-700/60" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mt-7">
              {businessUnits.map((u) => (
                <div key={u.name}>
                  <p className="text-[14px] font-bold text-white">{u.name}</p>
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                    {u.links.map((l) =>
                      isExternal(l.href) ? (
                        <li key={l.label}>
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11.5px] text-ink-400 hover:text-white transition-colors"
                          >
                            {l.label}
                          </a>
                        </li>
                      ) : (
                        <li key={l.label}>
                          <Link
                            href={l.href}
                            className="text-[11.5px] text-ink-400 hover:text-white transition-colors"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 회사 정보 (우) */}
          <div className="lg:pt-1">
            <div className="flex items-center gap-3 mb-5 text-[12.5px]">
              <Link
                href="/privacy"
                className="text-white hover:text-amber-300 transition-colors font-semibold"
              >
                개인정보처리방침
              </Link>
              <span className="text-ink-600">|</span>
              <Link
                href="/terms"
                className="text-ink-300 hover:text-white transition-colors"
              >
                서비스이용약관
              </Link>
            </div>
            <div className="text-[12.5px] leading-7 text-ink-300 space-y-1">
              <p>
                상호{" "}
                <span className="text-white font-semibold">아이엔지스토리</span>
                {" | "}대표 강남구{" | "}대표메일{" "}
                <span className="text-white">zaksimoffice@gmail.com</span>
              </p>
              <p>
                문의{" "}
                <span className="text-white tnum font-semibold">1670-0452</span>
                {" | "}FAX <span className="tnum">02-537-9571</span>
              </p>
              <p>주소: 서울시 강남구 테헤란로111 대건빌딩 5층 아이엔지스토리</p>
              <p>사업자 등록번호: 307-81-42763</p>
              <p className="pt-3 text-ink-400">
                © 2026 (주)아이엔지스토리 All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sitemap / 회사 / 고객센터 */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.2fr] gap-10 lg:gap-12">
          {Object.entries(footerNav).map(([key, group]) => (
            <div key={key}>
              <h4 className="text-[13px] font-semibold text-white mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[13px] text-ink-300 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* 고객센터 card (PDF spec: dark inset block to the right) */}
          <div className="rounded-2xl bg-ink-800/70 border border-ink-700/60 p-6 lg:p-7">
            <Logo variant="light" />
            <p className="mt-5 text-[13px] text-ink-300">고객센터</p>
            <p className="text-[22px] font-extrabold text-white tnum mt-1">
              1833-0000
            </p>
            <p className="mt-3 text-[12.5px] text-ink-400">
              평일 10:00 – 18:00 (점심 12:00 – 13:00)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
