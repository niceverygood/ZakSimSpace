export type BlogCategory = "news" | "guide" | "story";

export const blogCategoryLabels: Record<BlogCategory, string> = {
  news: "뉴스",
  guide: "가이드",
  story: "스토리",
};

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readMins: number;
  /** Body as an array of simple blocks — no MDX dependency. */
  body: Array<
    | { type: "p"; text: string }
    | { type: "h2"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "quote"; text: string; cite?: string }
  >;
};

export const posts: BlogPost[] = [
  {
    slug: "2026-spring-update",
    category: "news",
    title: "2026 봄 업데이트 — 전국 180개 지점 돌파, 신규 지점 12곳 오픈",
    excerpt:
      "충북·강원 지역 직영점이 새로 합류하며 작심스페이스가 전국 180개 지점을 돌파했습니다.",
    author: "작심스페이스 팀",
    date: "2026-05-12",
    readMins: 3,
    body: [
      {
        type: "p",
        text: "이번 봄, 작심스페이스는 전국 직영점 180곳을 돌파했습니다. 충북 청주, 강원 원주를 포함한 12개 신규 지점이 새로 합류했습니다.",
      },
      { type: "h2", text: "이번에 새로 오픈한 지점" },
      {
        type: "ul",
        items: [
          "청주 상당구 직영점 (비과밀 · 실사가능)",
          "강원 원주 직영점 (비과밀 · 인허가)",
          "남양주 금곡 직영점 (과밀 · 실사가능)",
          "화성 반송 직영점 (비과밀 · 인허가)",
          "그 외 8개 지점",
        ],
      },
      {
        type: "p",
        text: "신규 지점은 모두 관할 세무서 사업자등록 심사를 통과했으며, 동일한 운영 정책 아래 관리됩니다.",
      },
    ],
  },
  {
    slug: "telecom-sales-guide",
    category: "guide",
    title: "통신판매업 신고, 비상주 주소로도 가능한가요?",
    excerpt:
      "지자체별로 통신판매업 신고 요건이 조금씩 다릅니다. 작심스페이스 지점에서 신고할 때 꼭 챙겨야 할 서류와 체크리스트.",
    author: "작심스페이스 팀",
    date: "2026-04-29",
    readMins: 6,
    body: [
      {
        type: "p",
        text: "결론부터 말하자면, 작심스페이스 인허가 지점은 통신판매업 신고가 가능합니다. 다만 지자체별로 추가 서류 요구 사항이 있을 수 있어 사전 확인이 중요합니다.",
      },
      { type: "h2", text: "꼭 챙겨야 할 서류" },
      {
        type: "ul",
        items: [
          "사업자등록증 사본",
          "임대차계약서 (작심스페이스에서 자동 발급)",
          "대표자 신분증 사본",
          "구매 안전 서비스 이용 확인증 (PG사 발급)",
        ],
      },
      {
        type: "quote",
        text: "신고 전에 인허가 지점인지 확인하고, 지자체 담당자에게 필요한 서류를 한 번 더 문의하는 게 가장 안전합니다.",
        cite: "작심스페이스 운영팀",
      },
    ],
  },
  {
    slug: "mail-best-practice",
    category: "guide",
    title: "비상주 사무실에서 우편물 안전하게 받는 5가지 팁",
    excerpt:
      "관공서 우편물 누락은 가산세로 직결됩니다. 도착 즉시 처리할 수 있는 우편물 운영 가이드.",
    author: "작심스페이스 팀",
    date: "2026-04-15",
    readMins: 4,
    body: [
      {
        type: "p",
        text: "비상주 사무실의 가장 큰 걱정은 우편물입니다. 작심스페이스가 안내하는 5가지 베스트 프랙티스를 정리했습니다.",
      },
      {
        type: "ul",
        items: [
          "알림톡 수신 즉시 마이페이지에서 표지 확인",
          "세무·관공서 우편물은 24시간 내 내용물 스캔 요청",
          "급한 서류는 지정 주소로 택배 발송 옵션 활용",
          "장기 부재 시 우편물 보관 기간 연장 신청",
          "분기별 우편물 처리 정책 알림 확인",
        ],
      },
    ],
  },
  {
    slug: "founder-story-park",
    category: "story",
    title: "[고객 인터뷰] 박세영 대표 — 보증금 0원으로 시작한 D2C 브랜드",
    excerpt:
      "온라인 셀러 박세영 대표가 작심스페이스로 사업을 시작한 이야기를 들어봤습니다.",
    author: "작심스페이스 콘텐츠팀",
    date: "2026-03-28",
    readMins: 5,
    body: [
      {
        type: "p",
        text: "박세영 대표는 강남 주소로 사업자등록을 마치고 통신판매업 신고까지 일주일 만에 끝냈습니다. 보증금 없이, 임대 비용 없이 시작한 D2C 브랜드 이야기를 들어봤습니다.",
      },
      {
        type: "quote",
        text: "처음엔 비상주 주소가 정말 통과할까 걱정했어요. 결과적으로 일주일도 안 걸려서 사업자등록이 됐고, 첫 매출까지 3주 만에 일어났습니다.",
        cite: "박세영 대표",
      },
    ],
  },
  {
    slug: "iso-certification",
    category: "news",
    title: "작심스페이스, ISO 27001 정보보호 관리체계 인증 획득",
    excerpt:
      "국제 표준 정보보호 체계 ISO 27001 인증을 획득했습니다. 고객 정보를 더 안전하게 보관합니다.",
    author: "작심스페이스 팀",
    date: "2026-02-19",
    readMins: 2,
    body: [
      {
        type: "p",
        text: "작심스페이스는 국제 표준 정보보호 관리체계인 ISO 27001 인증을 획득했습니다. 이번 인증으로 고객 정보 처리·보관·폐기 전 과정에 글로벌 보안 기준이 적용됩니다.",
      },
      {
        type: "p",
        text: "앞으로도 작심스페이스는 정보보호를 가장 우선 순위로 두고 운영하겠습니다.",
      },
    ],
  },
];
