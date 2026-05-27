# Google Sheet → Supabase 임포트 가이드

전달받은 [구글시트](https://docs.google.com/spreadsheets/d/1KyEAGd8iZ1x0iSUp6WFbSmevNmIvcja9iAadUzj_Dq0)
의 raw data를 [`sql/0001_init.sql`](./0001_init.sql) 스키마로 옮기는 절차입니다.

---

## 1. 스키마 생성

1. Supabase Dashboard → **SQL Editor** → "New query"
2. [`sql/0001_init.sql`](./0001_init.sql) 전체 복사·붙여넣기 → **Run**
3. **Table Editor** 에서 `branches`, `members`, `contracts`, `payments`, `mail_items`, `tickets` 생성 확인

---

## 2. 시트별 → 테이블 매핑

| 시트 탭 | 대상 테이블 | 비고 |
|---|---|---|
| 26년 지점현황 | `branches` | 지점 id는 영문 슬러그로 (예: `seoul-gangseo`) |
| 직/가맹 사업자정보 | `members` | 회원 ID는 자동 생성 (UUID). `display_id`에 시트 ID 보관 |
| 25년/26년 계약현황 | `contracts` | 계약번호(`Z250102_1` 등)를 `id`로 그대로 사용 |
| 26년 SUMMARY/재계약 SUMMARY | (테이블 X) | DB 뷰 또는 어드민 통계 화면에서 집계 |

---

## 3. 컬럼 매핑 (계약현황 시트 기준)

| 시트 컬럼 | DB 컬럼 | 변환 |
|---|---|---|
| 구분 | (생략) | 단순 번호 |
| 계약번호 | `id` | `Z250102_1` 그대로 |
| 대리계약자 | `proxy_signer` | `-` 이면 NULL |
| 대표자명 | `representative` | |
| 상호명 | `company_name` | |
| 사업자번호 | `business_number` | `721-86-00979` |
| 업종 | `industry` | |
| 사업자 유형 | `contract_type` | `법인이전`, `개인신규` 등 그대로 |
| 사업자 유형(재계약) | `is_renewal` | `재계약(개인)`/`재계약(법인)`이면 TRUE |
| 월 | `contract_month` | 1~12 |
| 주차 | `contract_week` | 1~5 |
| 결제일 | `payment_date` | `2025. 1. 2` → `2025-01-02` |
| 계약시작일 | `start_date` | 동일 변환 |
| 계약종료일 | `end_date` | 동일 변환 |
| 계약기간 | `duration_months` | "7개월" → 7 |
| 결제방식 | `payment_method` | `카드`/`계좌이체` |

---

## 4. 가장 쉬운 방법 — CSV 임포트

### 4-A. Google Sheet 에서 CSV 다운로드

1. 각 시트 탭 → **파일 → 다운로드 → 쉼표로 구분된 값(.csv)**
2. 시트별로 다운로드:
   - `26년_지점현황.csv` → `branches`
   - `사업자정보.csv` → `members`
   - `25_26_계약현황.csv` → `contracts`

### 4-B. Supabase Studio 에서 임포트

1. **Table Editor** → 임포트할 테이블 선택
2. 우측 상단 **Insert → Import data from CSV**
3. CSV 업로드 → 컬럼 매핑 화면에서 위 표대로 매칭
4. **Import**

### 4-C. SQL로 직접 INSERT (대량 데이터)

Supabase SQL Editor에서:

```sql
-- 예: 지점 1개 추가
INSERT INTO branches (id, name, region, address, congested, inspectable, supports_license, monthly_price, yearly_price, building_type)
VALUES ('seoul-gangseo', '서울 강서구 직영점', '서울', '서울 강서구 강서로 454 401', true, true, false, 22000, 240000, 'office');

-- 예: 회원 1명 추가
INSERT INTO members (display_id, name, business_type, company_name, business_number, email)
VALUES ('U-10234', '한승수', '법인사업자', '주식회사 작심상사', '000-00-00000', 'hss@bottlecorp.kr');

-- 예: 계약 1건 추가 (계약번호는 시트 그대로)
INSERT INTO contracts (id, company_name, business_number, contract_type, is_renewal, start_date, end_date, duration_months, payment_method, amount)
VALUES ('Z250102_1', '(주)라메드랩스', '721-86-00979', '법인이전', false, '2025-01-02', '2025-08-01', 7, '카드', 168000);
```

---

## 5. 검증

임포트 후 SQL Editor 에서:

```sql
SELECT count(*) FROM contracts;          -- 전체 건수
SELECT contract_type, count(*) FROM contracts GROUP BY contract_type;
SELECT date_trunc('month', start_date) AS month, count(*)
  FROM contracts GROUP BY 1 ORDER BY 1;
```

`/admin/members` `/admin/contracts` 페이지에서 라이브 데이터가 표시되는지 확인.

---

## 6. RLS 정책 (운영 전 필수)

`0001_init.sql`은 데모용으로 대부분 테이블이 **service_role만 접근 가능**입니다. 운영 전:

1. anon/authenticated 사용자의 SELECT/INSERT/UPDATE 권한을 어드민 인증 후에만 허용
2. `branches`만 public read (랜딩 페이지에서 표시)
3. `members`/`contracts`/`payments`는 본인 데이터만 접근 가능하도록 정책 작성

예시 (자기 데이터만 보는 정책):

```sql
CREATE POLICY "my_contracts" ON contracts
  FOR SELECT
  USING (auth.uid() IN (SELECT id FROM members WHERE id = contracts.member_id));
```

---

## 7. 정기 동기화 (선택)

구글시트를 계속 사용하시면서 Supabase로 자동 동기화하려면:
- **Google Apps Script** + Supabase REST API
- **Make/Zapier** Google Sheets → Supabase 커넥터
- **n8n** 셀프호스팅

자세한 스크립트가 필요하시면 알려주세요.
