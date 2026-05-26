# 작심스페이스 (ZakSimSpace)

비상주 사무실 · 사업자등록 지원 · 우편물 관리 통합 플랫폼. Cowork City 스타일 UX 기반.

```bash
npm install
npm run dev   # http://localhost:3000 (또는 .claude/launch.json 의 3737)
npm run build
npm start
npm run lint
```

> 본 프로젝트는 **Next.js 16** 기반입니다. App Router의 비동기 `params/searchParams`, `viewport` export 분리, `next/og` 동적 ImageResponse 등 새 규약을 사용합니다. 코드 수정 시 `node_modules/next/dist/docs/` 의 최신 가이드를 우선 확인하세요.

---

## 라우트 맵

| 그룹 | 라우트 | 비고 |
|---|---|---|
| 마케팅 | `/` `/about` `/pricing` `/cases` `/stories` `/careers` `/contact` `/family` `/partners` | 모두 정적 |
| 지점 | `/locations` · `/locations/[id]` | 12개 지점, 즐겨찾기·최근 본 지점 |
| 콘텐츠 | `/faq` `/blog` `/blog/[slug]` `/search` | 검색은 클라이언트 사이드 |
| 커머스 | `/cart` `/checkout/[id]` | 결제는 PG SDK 연동 시 활성 |
| 인증 | `/login` `/signup` `/forgot` | OAuth/이메일 인증은 mock |
| 마이페이지 | `/me` `/me/contracts` `/me/mail` `/me/billing` `/me/invoices` `/me/settings` | localStorage 기반 mock |
| 어드민 | `/admin` `/admin/branches` `/admin/members` `/admin/mail` `/admin/payments` `/admin/support` | robots: noindex |
| 법적 | `/terms` `/privacy` `/policy` | LegalLayout 공유 컴포넌트, 초안 표시 노트 포함 |
| SEO | `/sitemap.xml` `/robots.txt` `/manifest.webmanifest` `/opengraph-image` | 동적 생성 |

총 **30+개 라우트** + 동적 지점/블로그 페이지.

---

## 환경 변수

`.env.local` 에 설정 (`.env.example` 참고):

| 키 | 기능 | 미설정 시 |
|---|---|---|
| `NEXT_PUBLIC_KAKAO_MAP_KEY` | 지점 상세 카카오맵 활성화 | placeholder 표시 |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 | 비활성 |
| `NEXT_PUBLIC_VERCEL_ANALYTICS` | Vercel Web Analytics (`=1`) | 비활성 |

모두 미설정 상태에서도 사이트는 정상 동작합니다.

---

## 핵심 컴포넌트

- **레이아웃**: [Header](src/components/layout/Header.tsx) · [Footer](src/components/layout/Footer.tsx) · [PageHero](src/components/layout/PageHero.tsx) · [LegalLayout](src/components/layout/LegalLayout.tsx) · [SkipLink](src/components/layout/SkipLink.tsx) · [CookieBanner](src/components/layout/CookieBanner.tsx)
- **로켓 계약 모달** (4단계): [ContractModal](src/components/contract/ContractModal.tsx) · [ContractProvider](src/components/contract/ContractProvider.tsx) · [FloatingCTA](src/components/contract/FloatingCTA.tsx)
- **즐겨찾기/최근**: [useFavorites](src/components/favorites/useFavorites.ts) · [FavoriteButton](src/components/favorites/FavoriteButton.tsx)
- **지도**: [KakaoMap](src/components/map/KakaoMap.tsx) — env-driven
- **뉴스레터**: [NewsletterSignup](src/components/newsletter/NewsletterSignup.tsx)
- **애널리틱스**: [Analytics](src/components/analytics/Analytics.tsx) — env-driven

---

## Mock 데이터

클라이언트 자료 수령 시 다음 파일만 교체하면 됩니다.

| 파일 | 내용 |
|---|---|
| [`src/lib/site.ts`](src/lib/site.ts) | 회사명, 태그라인, nav 메뉴, 고객센터 번호 |
| [`src/lib/contract-data.ts`](src/lib/contract-data.ts) | 지점 12개, 업종 11개, 가격, 옵션, 지역/건물용도 |
| [`src/lib/faq-data.ts`](src/lib/faq-data.ts) | FAQ 14건, 카테고리 |
| [`src/lib/content-data.ts`](src/lib/content-data.ts) | 작심스토리 4건, 업종 사례 6건 |
| [`src/lib/blog-data.ts`](src/lib/blog-data.ts) | 블로그 포스트 5건 |
| [`src/lib/mypage-data.ts`](src/lib/mypage-data.ts) | 마이페이지 mock (계약·우편·결제·세금계산서) |
| [`src/lib/admin-data.ts`](src/lib/admin-data.ts) | 어드민 mock (지점·회원·우편물·결제·문의) |

---

## 디자인 토큰

`src/app/globals.css` 의 `@theme` 블록에 모든 컬러 토큰이 정의되어 있습니다.

- **sage** (브랜드 primary): 50~950
- **cream** (배경): 50~300
- **ink** (텍스트): 50~900
- **amber** (강조): 50~500

폰트는 [Pretendard Variable](https://github.com/orioncactus/pretendard) 단일 family.

---

## 접근성

- Skip link (Tab 첫 누름에 "본문 바로가기" 노출)
- `:focus-visible` 키보드 전용 outline (sage-600)
- `aria-current="page"` 활성 nav 표시
- `prefers-reduced-motion` 존중
- 모든 폼에 `aria-label` / `<label>` 매핑
- ContractModal·CookieBanner ESC 키로 닫기

---

## 통합 예정 (외부 의존)

- 카카오/네이버/구글 OAuth (`/login` `/signup`)
- 토스페이먼츠/포트원 결제 SDK (`/checkout/[id]`)
- 카카오맵 SDK (`/locations/[id]`)
- 알림톡/이메일 (Aligo, AWS SES 등)
- 어드민 인증 게이트 (`/admin`)
- DB · API 백엔드 전반

각 통합 지점은 코드에 `// In production this redirects to ...` 같은 주석으로 표시되어 있습니다.
