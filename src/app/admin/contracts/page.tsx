import {
  readContractsRawA_AA,
  sheetsConfigured,
} from "@/lib/sheets";
import { AdminTable } from "../AdminTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/** Per QC 0529: mirror raw_계약 columns A~AA, sort by column L descending,
 *  contract number = column C. */
const SORT_COL_INDEX = 11; // L
const CONTRACT_NO_COL_INDEX = 2; // C

type RawSheet = { headers: string[]; rows: string[][] };

/** Mock fallback when sheets unavailable — kept minimal for visual sanity. */
const MOCK: RawSheet = {
  headers: [
    "No",
    "지점",
    "계약번호",
    "유형",
    "대표자명",
    "상호명",
    "사업자번호",
    "업종",
    "신규/이전",
    "재계약",
    "방문일",
    "계약일",
    "계약시작일",
    "계약종료일",
    "기간(개월)",
    "결제방식",
    "결제일",
    "결제금액",
    "환불",
    "환불금액",
    "환불일",
    "특이사항",
    "발번",
    "호수",
    "주소",
    "전화",
    "이메일",
  ],
  rows: [
    [
      "1", "교대 1호점", "Z250102_1", "법인이전", "한무희", "(주)라메드랩스",
      "721-86-00979", "교육서비스업", "이전", "", "2025-01-02", "2025-01-02",
      "2025-01-02", "2025-08-01", "7", "카드", "2025-01-02", "168000", "",
      "", "", "", "", "101", "서울 서초구 …", "", "",
    ],
  ],
};

async function load(): Promise<{ data: RawSheet; live: boolean; error?: string }> {
  if (!sheetsConfigured()) return { data: MOCK, live: false };
  try {
    const raw = await readContractsRawA_AA();
    if (raw.rows.length === 0) {
      return {
        data: MOCK,
        live: false,
        error:
          "시트에서 데이터를 찾지 못했습니다. raw_25/26 계약 탭을 확인하세요.",
      };
    }
    return { data: raw, live: true };
  } catch (e) {
    return {
      data: MOCK,
      live: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

/**
 * Sort by column L (index 11) descending. Treat values as dates when possible
 * (YYYY-MM-DD or YYYY.MM.DD); fall back to numeric / lexical. Empty cells sink.
 */
function sortByColumnLDesc(rows: string[][]): string[][] {
  const score = (cell: string): number => {
    if (!cell) return -Infinity;
    const cleaned = cell.replace(/\./g, "-").replace(/\s+/g, "");
    const parts = cleaned.split("-").map((p) => parseInt(p, 10));
    if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
      const [y, m, d] = parts;
      const year = y < 100 ? 2000 + y : y;
      return year * 10000 + m * 100 + d;
    }
    const n = Number(cell);
    return Number.isFinite(n) ? n : -Infinity;
  };
  return [...rows].sort(
    (a, b) => score(b[SORT_COL_INDEX] || "") - score(a[SORT_COL_INDEX] || ""),
  );
}

export default async function AdminContractsPage() {
  const { data, live, error } = await load();
  const sorted = sortByColumnLDesc(data.rows);

  const tableRows = sorted.map((row, idx) => ({
    id: row[CONTRACT_NO_COL_INDEX] || `row-${idx}`,
    cells: row.map((cell, ci) => (
      <span
        key={ci}
        className={
          ci === CONTRACT_NO_COL_INDEX
            ? "text-[12px] tnum font-bold text-white"
            : "text-[12px] text-ink-300 tnum"
        }
      >
        {cell || "—"}
      </span>
    )),
  }));

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-[22px] lg:text-[26px] font-extrabold text-white">
            계약 관리
          </h1>
          <p className="text-[13px] text-ink-400 mt-1">
            총 {data.rows.length}건 · raw_계약 A~AA 컬럼 · L열 기준 내림차순
          </p>
          {error && (
            <p className="mt-2 inline-flex items-center rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 px-2.5 py-1 text-[11px]">
              ⚠ {error}
            </p>
          )}
        </div>
        <SourceBadge live={live} />
      </header>
      <div className="overflow-x-auto">
        <AdminTable headers={data.headers} rows={tableRows} />
      </div>
    </div>
  );
}

function SourceBadge({ live }: { live: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${
        live
          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
          : "bg-amber-500/20 text-amber-300 border-amber-500/40"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${live ? "bg-emerald-400" : "bg-amber-400"}`}
      />
      {live ? "구글시트 라이브" : "Mock 데이터"}
    </span>
  );
}
