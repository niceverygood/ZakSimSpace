/**
 * Sample content for stories/cases pages.
 * Slot client copy in here once received.
 */

export type Story = {
  id: string;
  name: string;
  role: string;
  industry: string;
  branch: string;
  quote: string;
  highlights: string[];
  accent: "sage" | "amber" | "ink";
};

export const stories: Story[] = [
  {
    id: "park-seyoung",
    name: "박세영 대표",
    role: "온라인 셀러 · 2년차",
    industry: "통신판매업",
    branch: "서울 신촌 직영점",
    quote:
      "보증금 없이 강남 주소지로 사업자등록을 마쳤고, 통신판매업 신고까지 일주일 만에 끝냈어요.",
    highlights: ["보증금 0원", "주 1회 우편물 정리", "통신판매업 신고 완료"],
    accent: "sage",
  },
  {
    id: "kim-doyun",
    name: "김도윤 대표",
    role: "1인 컨설팅 · 3개월차",
    industry: "교육 컨설팅",
    branch: "서울 강서구 직영점",
    quote:
      "처음엔 비상주가 가능할까 걱정했는데, 우편물 알림과 스캔 서비스까지 알아서 챙겨줘서 편해요.",
    highlights: ["창업 3개월", "재택 + 비상주 조합", "월 24,000원"],
    accent: "amber",
  },
  {
    id: "lee-sumin",
    name: "이수민 대표",
    role: "푸드 D2C · 1년차",
    industry: "식품 D2C",
    branch: "화성 반송 직영점",
    quote:
      "식품 인허가가 가능한 지점을 직접 안내받았어요. 전국 어디에 있어도 입점이 너무 쉬웠습니다.",
    highlights: ["식품 인허가 지원", "지점 매칭 24시간", "법인 전환 완료"],
    accent: "ink",
  },
  {
    id: "jung-jiwon",
    name: "정지원 대표",
    role: "디자인 스튜디오 · 4년차",
    industry: "전문·과학·기술",
    branch: "서울 구로구 직영점",
    quote:
      "정부지원사업 신청 때마다 임대차계약서가 필요했는데, 마이페이지에서 즉시 발급해서 한 번도 못 낸 적이 없어요.",
    highlights: ["서류 즉시 발급", "지원사업 5건 수주", "법인 본점 주소"],
    accent: "sage",
  },
];

export type Case = {
  id: string;
  industry: string;
  shortLabel: string;
  description: string;
  count: string;
  examples: string[];
  needsLicense: boolean;
};

export const cases: Case[] = [
  {
    id: "ecommerce",
    industry: "통신판매업",
    shortLabel: "온라인 셀러",
    description:
      "전자상거래·SNS마켓·해외직구대행 — 통신판매업 신고에 적합한 지점만 따로 매칭해 드립니다.",
    count: "5,420+",
    examples: ["네이버 스마트스토어", "쿠팡 윙", "자체 D2C 쇼핑몰"],
    needsLicense: true,
  },
  {
    id: "consulting",
    industry: "교육·컨설팅",
    shortLabel: "1인 컨설팅",
    description:
      "재택 근무가 많은 1인 기업이 가장 합리적으로 합법 주소를 확보하는 방식입니다.",
    count: "2,180+",
    examples: ["경영 컨설팅", "교육 강의", "코칭 비즈니스"],
    needsLicense: false,
  },
  {
    id: "food",
    industry: "식품·F&B",
    shortLabel: "푸드 D2C",
    description:
      "통신판매업 신고 + 식품 관련업 신고가 모두 가능한 인허가 전용 지점을 안내합니다.",
    count: "640+",
    examples: ["냉동·신선식품", "건강기능식품", "D2C 베이커리"],
    needsLicense: true,
  },
  {
    id: "creative",
    industry: "디자인·콘텐츠",
    shortLabel: "프리랜서·스튜디오",
    description:
      "정부지원사업·외주 계약서에 필요한 임대차계약서를 즉시 발급할 수 있습니다.",
    count: "1,920+",
    examples: ["디자인 스튜디오", "영상 제작", "광고 대행"],
    needsLicense: false,
  },
  {
    id: "it",
    industry: "IT·소프트웨어",
    shortLabel: "스타트업·개발 스튜디오",
    description:
      "법인 본점 주소로 사용 가능하며, 투자 유치·정부지원사업 증빙에 모두 활용할 수 있어요.",
    count: "1,150+",
    examples: ["SaaS 스타트업", "앱 스튜디오", "외주 개발"],
    needsLicense: false,
  },
  {
    id: "logistics",
    industry: "운수·물류",
    shortLabel: "화물·퀵서비스",
    description:
      "화물자동차 운송사업 등 운수 관련 인허가가 가능한 지점만 별도로 안내합니다.",
    count: "320+",
    examples: ["퀵서비스", "택배 대행", "특수운송"],
    needsLicense: true,
  },
];
