export type BusinessType = "individual" | "corporate";

export type Industry = {
  id: string;
  title: string;
  subtitle: string;
  /** Whether this industry requires special license (인허가). */
  requiresLicense?: boolean;
};

export const industries: Industry[] = [
  {
    id: "ecommerce",
    title: "통신판매업",
    subtitle: "전자상거래 도소매, SNS마켓, 해외직구대행",
    requiresLicense: true,
  },
  {
    id: "professional",
    title: "전문·과학 및 기술서비스업",
    subtitle: "광고, 디자인, 서비스, 사진촬영",
  },
  {
    id: "construction",
    title: "건설업",
    subtitle: "토목, 건물, 실내건축, 도배",
    requiresLicense: true,
  },
  {
    id: "transport",
    title: "운수 및 창고업",
    subtitle: "운송관련, 택배, 퀵서비스",
    requiresLicense: true,
  },
  {
    id: "it",
    title: "정보통신업",
    subtitle: "출판, 녹음, 방송관련, 인쇄물, 소프트웨어",
  },
  {
    id: "facility",
    title: "사업시설 관리, 사업지원 및 임대 서비스업",
    subtitle: "조경, 경비, 장비 임대, 인력 공급, 청소",
  },
  {
    id: "personal-service",
    title: "협회 및 단체, 수리 및 기타 개인서비스업",
    subtitle: "수리, 미용 서비스, 협회, 출장",
  },
  {
    id: "education",
    title: "교육 서비스업",
    subtitle: "교육기관, 특수학교, 학원",
  },
  {
    id: "manufacturing",
    title: "제조업(OEM)",
    subtitle: "섬유, 음료, 가구, 금속 등 모든 제조업",
  },
  {
    id: "art",
    title: "예술, 스포츠 및 여가관련 서비스업",
    subtitle: "공연 기획업, 기타 창작 및 예술관련 서비스업",
  },
  {
    id: "wholesale",
    title: "도매 및 소매업",
    subtitle: "상품 유통 중개",
  },
];

export type Branch = {
  id: string;
  name: string;
  region: string;
  address: string;
  /** 과밀억제권역 여부 (true = 과밀, false = 비과밀). */
  congested: boolean;
  /** 실사 가능 여부. */
  inspectable: boolean;
  /** 인허가 업종 지원 가능 여부. */
  supportsLicense: boolean;
  yearlyPrice: number;
  monthlyPrice: number;
  buildingType: "general" | "complex" | "office";
};

export const branches: Branch[] = [
  {
    id: "cheongju-sangdang",
    name: "청주 상당구 직영점",
    region: "충북",
    address: "충북 청주시 상당구 무농정로 6 1층",
    congested: false,
    inspectable: true,
    supportsLicense: false,
    yearlyPrice: 240000,
    monthlyPrice: 24000,
    buildingType: "general",
  },
  {
    id: "wonju",
    name: "강원 원주 직영점",
    region: "강원",
    address: "강원특별자치도 원주시 황금로 2 403",
    congested: false,
    inspectable: true,
    supportsLicense: true,
    yearlyPrice: 240000,
    monthlyPrice: 24000,
    buildingType: "general",
  },
  {
    id: "seoul-gangseo",
    name: "서울 강서구 직영점",
    region: "서울",
    address: "서울 강서구 강서로 454 401",
    congested: true,
    inspectable: true,
    supportsLicense: false,
    yearlyPrice: 240000,
    monthlyPrice: 24000,
    buildingType: "office",
  },
  {
    id: "seoul-sinchon",
    name: "서울 신촌 직영점",
    region: "서울",
    address: "서울 서대문구 이화여대7길 37 3층",
    congested: true,
    inspectable: true,
    supportsLicense: true,
    yearlyPrice: 240000,
    monthlyPrice: 24000,
    buildingType: "office",
  },
  {
    id: "seoul-guro",
    name: "서울 구로구 직영점",
    region: "서울",
    address: "서울 구로구 가마산로25길 9 202",
    congested: true,
    inspectable: true,
    supportsLicense: true,
    yearlyPrice: 240000,
    monthlyPrice: 24000,
    buildingType: "complex",
  },
  {
    id: "namyangju",
    name: "남양주 금곡 직영점",
    region: "경기",
    address: "경기 남양주시 사릉로58번길 47 203",
    congested: true,
    inspectable: true,
    supportsLicense: false,
    yearlyPrice: 240000,
    monthlyPrice: 24000,
    buildingType: "complex",
  },
  {
    id: "hwaseong",
    name: "화성 반송 직영점",
    region: "경기",
    address: "경기 화성시 동탄구 동탄중심상가2길 26-21 603",
    congested: false,
    inspectable: true,
    supportsLicense: true,
    yearlyPrice: 240000,
    monthlyPrice: 24000,
    buildingType: "complex",
  },
  {
    id: "paju",
    name: "파주 금촌 직영점",
    region: "경기",
    address: "경기 파주시 금정로 62 5층",
    congested: false,
    inspectable: true,
    supportsLicense: false,
    yearlyPrice: 240000,
    monthlyPrice: 24000,
    buildingType: "office",
  },
  {
    id: "busan-suyeong",
    name: "부산 수영 직영점",
    region: "부산",
    address: "부산 수영구 광남로 110 5층",
    congested: false,
    inspectable: true,
    supportsLicense: true,
    yearlyPrice: 240000,
    monthlyPrice: 24000,
    buildingType: "general",
  },
  {
    id: "daegu-suseong",
    name: "대구 수성 직영점",
    region: "대구",
    address: "대구 수성구 들안로 25 3층",
    congested: false,
    inspectable: true,
    supportsLicense: false,
    yearlyPrice: 240000,
    monthlyPrice: 24000,
    buildingType: "office",
  },
  {
    id: "incheon-bupyeong",
    name: "인천 부평 직영점",
    region: "인천",
    address: "인천 부평구 부평대로 14 401",
    congested: true,
    inspectable: true,
    supportsLicense: true,
    yearlyPrice: 240000,
    monthlyPrice: 24000,
    buildingType: "complex",
  },
  {
    id: "gwangju-seo",
    name: "광주 서구 직영점",
    region: "광주",
    address: "광주 서구 상무중앙로 80 2층",
    congested: false,
    inspectable: true,
    supportsLicense: false,
    yearlyPrice: 240000,
    monthlyPrice: 24000,
    buildingType: "general",
  },
];

export const regions = [
  "전체",
  "서울",
  "경기",
  "인천",
  "부산",
  "대구",
  "광주",
  "강원",
  "충북",
] as const;

export const buildingTypes = [
  { value: "all", label: "전체" },
  { value: "general", label: "일반건물" },
  { value: "office", label: "오피스" },
  { value: "complex", label: "복합용도" },
] as const;

export const mailOptions = [
  { value: "scan-cover", label: "표지만 업로드 (무료)" },
  { value: "scan-full", label: "내용물 전체 스캔 (+월 3,000원)" },
  { value: "forward", label: "지정 주소로 택배 발송 (실비)" },
] as const;

export function formatKRW(n: number): string {
  return n.toLocaleString("ko-KR") + "원";
}
