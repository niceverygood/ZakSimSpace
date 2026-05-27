export const siteConfig = {
  name: "작심스페이스",
  nameEn: "ZakSimSpace",
  tagline: "결심을 사업장으로",
  description:
    "비상주 사무실 주소지 · 사업자 등록 · 우편물 관리까지 한 번에. 전국 어디든 월 2만원부터 시작하세요.",
  url: "https://zaksimspace.com",
  customerCenter: "1833-0000",
  nav: [
    { label: "지점 검색", href: "/locations" },
    { label: "계약진행", href: "/contract" },
    { label: "오피스 가격", href: "/pricing" },
    { label: "업종 신청 사례", href: "/industries" },
    { label: "뉴스 / 블로그", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ],
  subNav: [],
};

export type SiteConfig = typeof siteConfig;
