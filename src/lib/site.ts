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
    { label: "가격 안내", href: "/pricing" },
    { label: "업종신청사례", href: "/industries" },
    { label: "MORE", href: "/blog" },
  ],
  subNav: [],
};

export type SiteConfig = typeof siteConfig;
