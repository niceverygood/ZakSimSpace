/**
 * Mirror of the Supabase schema in sql/0001_init.sql.
 * Hand-rolled types — once stable, regenerate via:
 *   npx supabase gen types typescript --project-id <id> > src/types/database.ts
 */

export type BranchRow = {
  id: string;
  name: string;
  region: string;
  address: string;
  congested: boolean;
  inspectable: boolean;
  supports_license: boolean;
  monthly_price: number;
  half_price: number | null;
  yearly_price: number;
  building_type: "general" | "complex" | "office" | string;
  seat_count: number | null;
  unit_no_start: number | null;
  manager_name: string | null;
  status: "active" | "preparing" | "paused" | string;
  created_at: string;
  updated_at: string;
};

export type MemberRow = {
  id: string;
  display_id: string | null;
  name: string;
  business_type: "개인사업자" | "법인사업자" | string | null;
  company_name: string | null;
  representative_name: string | null;
  business_number: string | null;
  resident_number: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  industry: string | null;
  status: "active" | "dormant" | "ended" | string;
  joined_at: string;
  created_at: string;
  updated_at: string;
};

export type ContractType =
  | "법인신규"
  | "법인이전"
  | "개인신규"
  | "개인이전"
  | "재계약(개인)"
  | "재계약(법인)"
  | string;

export type ContractRow = {
  id: string;
  proxy_signer: string | null;
  representative: string | null;
  company_name: string;
  business_number: string | null;
  industry: string | null;
  contract_type: ContractType;
  is_renewal: boolean;
  contract_month: number | null;
  contract_week: number | null;
  payment_date: string | null;
  start_date: string;
  end_date: string;
  duration_months: number;
  payment_method: string | null;
  branch_id: string | null;
  member_id: string | null;
  amount: number;
  unit_number: string | null;
  status: "active" | "expired" | "canceled" | string;
  rejection_reason: string | null;
  contract_pdf_url: string | null;
  created_at: string;
  updated_at: string;
};

export type PaymentRow = {
  id: string;
  contract_id: string | null;
  member_id: string | null;
  branch_id: string | null;
  amount: number;
  months: number;
  method: string | null;
  pg_provider: string | null;
  pg_tid: string | null;
  pg_moid: string | null;
  status: "pending" | "settled" | "refunded" | "failed" | string;
  paid_at: string | null;
  refunded_at: string | null;
  fail_reason: string | null;
  created_at: string;
};

export type MailItemRow = {
  id: string;
  display_id: string | null;
  contract_id: string | null;
  branch_id: string | null;
  arrived_at: string;
  sender: string | null;
  category: "tax" | "gov" | "bank" | "other" | string | null;
  scanned: boolean;
  scan_url: string | null;
  forwarded: boolean;
  forwarded_at: string | null;
  forward_addr: string | null;
  notified_at: string | null;
  notes: string | null;
  created_at: string;
};

export type TicketRow = {
  id: string;
  member_id: string | null;
  subject: string;
  body: string | null;
  channel: "phone" | "sms" | "kakao" | "email" | "etc" | string;
  priority: "high" | "normal" | "low" | string;
  status: "open" | "in-progress" | "resolved" | string;
  opened_at: string;
  resolved_at: string | null;
  assigned_to: string | null;
  due_at: string | null;
};

export type Database = {
  public: {
    Tables: {
      branches: { Row: BranchRow; Insert: Partial<BranchRow>; Update: Partial<BranchRow> };
      members: { Row: MemberRow; Insert: Partial<MemberRow>; Update: Partial<MemberRow> };
      contracts: { Row: ContractRow; Insert: Partial<ContractRow>; Update: Partial<ContractRow> };
      payments: { Row: PaymentRow; Insert: Partial<PaymentRow>; Update: Partial<PaymentRow> };
      mail_items: { Row: MailItemRow; Insert: Partial<MailItemRow>; Update: Partial<MailItemRow> };
      tickets: { Row: TicketRow; Insert: Partial<TicketRow>; Update: Partial<TicketRow> };
    };
  };
};
