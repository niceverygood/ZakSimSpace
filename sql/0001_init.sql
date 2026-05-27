-- ============================================================
-- ZakSimSpace 초기 스키마
-- Supabase SQL Editor에서 이 파일 전체를 실행하세요.
-- ============================================================

-- ============== Extensions ==============
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============== 1) BRANCHES (지점현황 시트) ==============
CREATE TABLE IF NOT EXISTS branches (
  id              TEXT PRIMARY KEY,                  -- 예: seoul-gangseo
  name            TEXT NOT NULL,                     -- 지점명 (예: 서울 강서구 직영점)
  region          TEXT NOT NULL,                     -- 서울/경기/충북/...
  address         TEXT NOT NULL,
  congested       BOOLEAN NOT NULL DEFAULT FALSE,    -- 과밀억제권역 여부
  inspectable     BOOLEAN NOT NULL DEFAULT TRUE,     -- 실사 가능 여부
  supports_license BOOLEAN NOT NULL DEFAULT FALSE,   -- 인허가 업종 지원
  monthly_price   INTEGER NOT NULL,
  half_price      INTEGER,                           -- 6개월 가격
  yearly_price    INTEGER NOT NULL,
  building_type   TEXT NOT NULL,                     -- general/complex/office
  seat_count      INTEGER,                           -- 좌석 수
  unit_no_start   INTEGER DEFAULT 1,                 -- 호수 시작 번호
  manager_name    TEXT,
  status          TEXT NOT NULL DEFAULT 'active',    -- active/preparing/paused
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_branches_region   ON branches(region);
CREATE INDEX IF NOT EXISTS idx_branches_status   ON branches(status);

-- ============== 2) MEMBERS (직/가맹 사업자정보) ==============
CREATE TABLE IF NOT EXISTS members (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_id          TEXT UNIQUE,                   -- 외부 표시용 ID
  name                TEXT NOT NULL,                 -- 이름/대표자명
  business_type       TEXT,                          -- 개인사업자/법인사업자
  company_name        TEXT,                          -- 상호명
  representative_name TEXT,                          -- 대표자명
  business_number     TEXT,                          -- 사업자등록번호
  resident_number     TEXT,                          -- 주민등록번호 (암호화 권장)
  email               TEXT,
  phone               TEXT,
  address             TEXT,
  industry            TEXT,                          -- 업종
  status              TEXT NOT NULL DEFAULT 'active',-- active/dormant/ended
  joined_at           TIMESTAMPTZ DEFAULT NOW(),
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_members_business_number ON members(business_number);
CREATE INDEX IF NOT EXISTS idx_members_email           ON members(email);
CREATE INDEX IF NOT EXISTS idx_members_status          ON members(status);

-- ============== 3) CONTRACTS (25/26년 계약현황) ==============
CREATE TABLE IF NOT EXISTS contracts (
  id                TEXT PRIMARY KEY,                -- 계약번호 (예: Z250102_1)
  proxy_signer      TEXT,                            -- 대리계약자
  representative    TEXT,                            -- 대표자명
  company_name      TEXT NOT NULL,                   -- 상호명
  business_number   TEXT,
  industry          TEXT,                            -- 업종
  contract_type     TEXT NOT NULL,                   -- 법인신규/법인이전/개인신규/개인이전/재계약(개인)/재계약(법인)
  is_renewal        BOOLEAN DEFAULT FALSE,
  contract_month    INTEGER,                         -- 월 (1~12)
  contract_week     INTEGER,                         -- 주차
  payment_date      DATE,                            -- 결제일
  start_date        DATE NOT NULL,                   -- 계약시작일
  end_date          DATE NOT NULL,                   -- 계약종료일
  duration_months   INTEGER NOT NULL,                -- 계약기간 (개월)
  payment_method    TEXT,                            -- 카드/계좌이체
  branch_id         TEXT REFERENCES branches(id),
  member_id         UUID REFERENCES members(id),
  amount            INTEGER NOT NULL,
  unit_number       TEXT,                            -- 호수 (자동 발번)
  status            TEXT NOT NULL DEFAULT 'active',  -- active/expired/canceled
  rejection_reason  TEXT,                            -- 반려 사유
  contract_pdf_url  TEXT,                            -- 발급된 계약서 URL
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contracts_status        ON contracts(status);
CREATE INDEX IF NOT EXISTS idx_contracts_branch        ON contracts(branch_id);
CREATE INDEX IF NOT EXISTS idx_contracts_member        ON contracts(member_id);
CREATE INDEX IF NOT EXISTS idx_contracts_start_date    ON contracts(start_date);
CREATE INDEX IF NOT EXISTS idx_contracts_end_date      ON contracts(end_date);
CREATE INDEX IF NOT EXISTS idx_contracts_type          ON contracts(contract_type);
CREATE INDEX IF NOT EXISTS idx_contracts_is_renewal    ON contracts(is_renewal);

-- ============== 4) PAYMENTS (결제·정산) ==============
CREATE TABLE IF NOT EXISTS payments (
  id            TEXT PRIMARY KEY,                    -- 예: P-26-0514-22
  contract_id   TEXT REFERENCES contracts(id),
  member_id     UUID REFERENCES members(id),
  branch_id     TEXT REFERENCES branches(id),
  amount        INTEGER NOT NULL,
  months        INTEGER NOT NULL,                    -- 계약 개월수
  method        TEXT,                                -- 신한카드/토스페이먼츠 등
  pg_provider   TEXT,                                -- nicepay/toss/portone
  pg_tid        TEXT,                                -- PG 거래번호
  pg_moid       TEXT,                                -- 주문번호 (Moid)
  status        TEXT NOT NULL DEFAULT 'pending',     -- pending/settled/refunded/failed
  paid_at       TIMESTAMPTZ,
  refunded_at   TIMESTAMPTZ,
  fail_reason   TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_status        ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_contract      ON payments(contract_id);
CREATE INDEX IF NOT EXISTS idx_payments_paid_at       ON payments(paid_at);

-- ============== 5) MAIL ITEMS ==============
CREATE TABLE IF NOT EXISTS mail_items (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  display_id    TEXT UNIQUE,                         -- 예: M-1042
  contract_id   TEXT REFERENCES contracts(id),
  branch_id     TEXT REFERENCES branches(id),
  arrived_at    TIMESTAMPTZ NOT NULL,
  sender        TEXT,                                -- 발송 기관
  category      TEXT,                                -- tax/gov/bank/other
  scanned       BOOLEAN DEFAULT FALSE,
  scan_url      TEXT,                                -- 표지/내용 스캔 URL
  forwarded     BOOLEAN DEFAULT FALSE,
  forwarded_at  TIMESTAMPTZ,
  forward_addr  TEXT,
  notified_at   TIMESTAMPTZ,                         -- 알림톡 발송 시각
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mail_branch     ON mail_items(branch_id);
CREATE INDEX IF NOT EXISTS idx_mail_contract   ON mail_items(contract_id);
CREATE INDEX IF NOT EXISTS idx_mail_arrived_at ON mail_items(arrived_at DESC);

-- ============== 6) SUPPORT TICKETS ==============
CREATE TABLE IF NOT EXISTS tickets (
  id            TEXT PRIMARY KEY,                    -- 예: T-2603
  member_id     UUID REFERENCES members(id),
  subject       TEXT NOT NULL,
  body          TEXT,
  channel       TEXT NOT NULL,                       -- phone/sms/kakao/email/etc
  priority      TEXT NOT NULL DEFAULT 'normal',      -- high/normal/low
  status        TEXT NOT NULL DEFAULT 'open',        -- open/in-progress/resolved
  opened_at     TIMESTAMPTZ DEFAULT NOW(),
  resolved_at   TIMESTAMPTZ,
  assigned_to   TEXT,
  due_at        TIMESTAMPTZ                          -- 응대 마감 (긴급 8h / 일반 24h)
);

CREATE INDEX IF NOT EXISTS idx_tickets_status   ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority ON tickets(priority);
CREATE INDEX IF NOT EXISTS idx_tickets_member   ON tickets(member_id);

-- ============== 7) ROW LEVEL SECURITY ==============
-- 데모/개발 동안에는 공개 SELECT 허용. 운영 시 인증 정책으로 교체 필수.
ALTER TABLE branches    ENABLE ROW LEVEL SECURITY;
ALTER TABLE members     ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts   ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments    ENABLE ROW LEVEL SECURITY;
ALTER TABLE mail_items  ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets     ENABLE ROW LEVEL SECURITY;

-- Public read-only branches (공개 페이지에서 사용)
CREATE POLICY "branches_public_read" ON branches FOR SELECT USING (true);

-- 그 외 모든 테이블은 일단 service_role만 접근 (운영 시 정교한 정책으로 교체)
-- 데모 단계에서 anon 접근이 필요하면 아래 정책의 USING (true) 줄을 활성화하세요.
-- CREATE POLICY "demo_open_read" ON members    FOR SELECT USING (true);
-- CREATE POLICY "demo_open_read" ON contracts  FOR SELECT USING (true);
-- CREATE POLICY "demo_open_read" ON payments   FOR SELECT USING (true);
-- CREATE POLICY "demo_open_read" ON mail_items FOR SELECT USING (true);
-- CREATE POLICY "demo_open_read" ON tickets    FOR SELECT USING (true);

-- ============== 8) Updated_at 자동 트리거 ==============
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_branches_updated_at  ON branches;
CREATE TRIGGER trg_branches_updated_at  BEFORE UPDATE ON branches  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_members_updated_at   ON members;
CREATE TRIGGER trg_members_updated_at   BEFORE UPDATE ON members   FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS trg_contracts_updated_at ON contracts;
CREATE TRIGGER trg_contracts_updated_at BEFORE UPDATE ON contracts FOR EACH ROW EXECUTE FUNCTION set_updated_at();
