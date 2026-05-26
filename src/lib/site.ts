export const siteConfig = {
  name: "작심스페이스",
  nameEn: "JakSimSpace",
  tagline: "결심을 사업장으로",
  description:
    "비상주 사무실 주소지 · 사업자 등록 · 우편물 관리까지 한 번에. 전국 어디든 월 2만원부터 시작하세요.",
  url: "https://jaksimspace.com",
  customerCenter: "1833-0000",
  nav: [
    { label: "전국 지점", href: "/locations" },
    { label: "오피스 가격", href: "/pricing" },
    { label: "업종 신청 사례", href: "/cases" },
    { label: "작심스토리", href: "/stories" },
    { label: "채용", href: "/careers" },
  ],
  subNav: [
    { label: "패밀리 센터", href: "/family" },
    { label: "파트너스 센터", href: "/partners" },
  ],
};

export type SiteConfig = typeof siteConfig;
