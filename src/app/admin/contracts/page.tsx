import { formatKRW } from "@/lib/contract-data";
import {
  readContractsFromSheet,
  sheetsConfigured,
  type SheetContract,
} from "@/lib/sheets";
import { AdminTable } from "../AdminTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/** 시트 비어있거나 미연결 시 표시할 mock 3건. */
const mockContracts: SheetContract[] = [
  {
    contract_id: "Z250102_1",
    representative: "한무희",
    company_name: "(주)라메드랩스",
    business_number: "721-86-00979",
    industry: "교육서비스업",
    contract_type: "법인이전",
    is_renewal: false,
    start_date: "2025-01-02",
    end_date: "2025-08-01",
    duration_months: 7,
    payment_method: "카드",
    amount: 168000,
  },
  {
    contract_id: "Z250102_2",
    representative: "장윤석",
    company_name: "장윤석(미정)",
    business_number: "",
    industry: "광고대행업",
    contract_type: "개인신규",
    is_renewal: false,
    start_date: "2025-01-02",
    end_date: "2026-03-01",
    duration_months: 14,
    payment_method: "계좌이체",
    amount: 336000,
  },
  {
    contract_id: "Z250114_1",
    representative: "이원준",
    company_name: "준엔지니어링",
    business_number: "194-26-01420",
    industry: "토목엔지니어링",
    contract_type: "재계약(개인)",
    is_renewal: true,
    start_date: "2025-01-14",
    end_date: "2026-03-13",
    duration_months: 14,
    payment_method: "카드",
    amount: 336000,
  },
];

type Source = "sheets" | "mock";

async function loadContracts(): Promise<{
  data: SheetContract[];
  source: Source;
  error?: string;
}> {
  if (!sheetsConfigured()) {
    return { data: mockContracts, source: "mock" };
  }
  try {
    const data = await readContractsFromSheet();
    if (data.length === 0) {
      return {
        data: mockContracts,
        source: "mock",
        error: "시트에서 데이터를 찾지 못했습니다. raw_25/26 계약 시트 준비 대기 중.",
      };
    }
    return { data, source: "sheets" };
  } catch (e) {
    return {
      data: mockContracts,
      source: "mock",
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

export default async function AdminContractsPage() {
  const { data: contracts, source, error } = await loadContracts();

  const newCount = contracts.filter((c) => !c.is_renewal).length;
  const renewalCount = contracts.filter((c) => c.is_renewal).length;
  const totalRevenue = contracts.reduce((sum, c) => sum + c.amount, 0);

  const rows = contracts.map((c) => ({
    id: c.contract_id,
    cells: [
      <span key="id" className="text-[12px] text-ink-400 tnum">{c.contract_id}</span>,
      <span key="name" className="font-bold text-white">{c.company_name}</span>,
      <span key="rep" className="text-ink-300">{c.representative || "—"}</span>,
      <TypeBadge key="t" type={c.contract_type} isRenewal={c.is_renewal} />,
      <span key="dur" className="tnum text-ink-300">
        {c.duration_months ? `${c.duration_months}개월` : "—"}
      </span>,
      <span key="start" className="tnum text-ink-300">{c.start_date || "—"}</span>,
      <span key="end" className="tnum text-ink-300">{c.end_date || "—"}</span>,
      <span key="amt" className="tnum font-extrabold text-white">
        {formatKRW(c.amount)}
      </span>,
      <span
        key="method"
        className="inline-flex items-center rounded-full bg-ink-700 text-ink-300 border border-ink-700 px-2 py-0.5 text-[10.5px] font-bold"
      >
        {c.payment_method || "—"}
      </span>,
    ],
  }));

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-[22px] lg:text-[26px] font-extrabold text-white">
            계약 관리
          </h1>
          <p className="text-[13px] text-ink-400 mt-1">
            총 {contracts.length}건 · 신규 {newCount} · 재계약 {renewalCount} ·
            누적 매출 {formatKRW(totalRevenue)}
          </p>
          {error && (
            <p className="mt-2 inline-flex items-center rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-1 text-[11px]">
              ⚠ {error}
            </p>
          )}
        </div>
        <SourceBadge source={source} />
      </header>
      <AdminTable
        headers={[
          "계약번호",
          "상호명",
          "대표자",
          "유형",
          "기간",
          "시작일",
          "종료일",
          "금액",
          "결제",
        ]}
        rows={rows}
      />
    </div>
  );
}

function TypeBadge({
  type,
  isRenewal,
}: {
  type: string;
  isRenewal: boolean;
}) {
  if (!type) return <span className="text-ink-500">—</span>;
  const cls = isRenewal
    ? "bg-violet-500/20 text-violet-300 border-violet-500/40"
    : type.includes("법인")
      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
      : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-bold ${cls}`}
    >
      {type}
    </span>
  );
}

function SourceBadge({ source }: { source: Source }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${
        source === "sheets"
          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
          : "bg-amber-500/20 text-amber-300 border-amber-500/40"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          source === "sheets" ? "bg-emerald-400" : "bg-amber-400"
        }`}
      />
      {source === "sheets" ? "구글시트 라이브" : "Mock 데이터"}
    </span>
  );
}
