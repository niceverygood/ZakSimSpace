-- ============================================================
-- 0002_orders.sql — NicePay 주문/결제 영구 저장 테이블
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 RUN 하세요.
-- (anon 키로는 테이블 생성이 불가하므로 대시보드에서 1회 실행 필요)
-- ============================================================

CREATE TABLE IF NOT EXISTS orders (
  moid          TEXT PRIMARY KEY,              -- 주문번호 ZS{YYYYMMDD}-{rand}
  branch_id     TEXT,                          -- 지점사업자명 기반 id
  branch_name   TEXT,
  amount        INTEGER NOT NULL,
  months        INTEGER,                       -- 계약 개월수 (옵션)
  cycle         TEXT,                          -- yearly / monthly
  biz_type      TEXT,                          -- 개인 / 법인 (옵션)
  buyer_name    TEXT,
  buyer_email   TEXT,
  buyer_tel     TEXT,
  status        TEXT NOT NULL DEFAULT 'created', -- created/paid/failed/canceled
  pg_provider   TEXT DEFAULT 'nicepay',
  tid           TEXT,                          -- PG 거래번호
  auth_date     TEXT,
  card_name     TEXT,
  card_num      TEXT,
  fail_reason   TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_status     ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_branch     ON orders(branch_id);

-- updated_at 자동 갱신
CREATE OR REPLACE FUNCTION set_orders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_orders_updated_at ON orders;
CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_orders_updated_at();

-- RLS: 결제 흐름이 publishable(anon) 키로 동작하므로 데모 단계에선 개방.
-- 운영 강화 시 service_role 키 기반 서버 전용 쓰기로 교체 권장.
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "orders_anon_insert" ON orders;
CREATE POLICY "orders_anon_insert" ON orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "orders_anon_select" ON orders;
CREATE POLICY "orders_anon_select" ON orders FOR SELECT USING (true);

DROP POLICY IF EXISTS "orders_anon_update" ON orders;
CREATE POLICY "orders_anon_update" ON orders FOR UPDATE USING (true) WITH CHECK (true);
