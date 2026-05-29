-- ============================================================
-- 0003_orders_contract.sql — 계약서/호수 발번용 컬럼 추가
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 RUN 하세요.
-- (0002_orders.sql 을 먼저 실행한 뒤 적용)
-- ============================================================

ALTER TABLE orders ADD COLUMN IF NOT EXISTS unit_no      INTEGER; -- 지점별 자동 발번 호수 (101,102…)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS branch_addr  TEXT;    -- 결제 시점 지점 소재지(스냅샷)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS start_date   TEXT;    -- 계약 시작일 (YYYY-MM-DD)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS industry     TEXT;    -- 업종 (선택)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS mail_consent BOOLEAN; -- 우편물 개봉 동의 여부

-- 지점별 호수 발번 시 max(unit_no) 조회가 잦으므로 보조 인덱스.
CREATE INDEX IF NOT EXISTS idx_orders_branch_unit ON orders(branch_id, unit_no);
