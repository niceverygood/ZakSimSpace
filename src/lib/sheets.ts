/**
 * Google Sheets API integration — real-time read of the operations spreadsheet.
 *
 * Auth: service account JSON (env vars). Read-only scope.
 * Caching: in-memory, 60 seconds. Avoids burning the 60 req/min quota when
 * multiple admin pages render the same tab in quick succession.
 */

import "server-only";
import { google, type sheets_v4 } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
// Private keys stored in env need \n escape sequences un-escaped at runtime.
const PRIVATE_KEY = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
  /\\n/g,
  "\n",
);

export function sheetsConfigured(): boolean {
  return Boolean(SHEET_ID && CLIENT_EMAIL && PRIVATE_KEY);
}

let cachedClient: sheets_v4.Sheets | null = null;

function client(): sheets_v4.Sheets {
  if (cachedClient) return cachedClient;
  if (!sheetsConfigured()) {
    throw new Error("Google Sheets env not configured");
  }
  const auth = new google.auth.JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  cachedClient = google.sheets({ version: "v4", auth });
  return cachedClient;
}

/* ──────── tiny memoizer with TTL ──────── */
const cache = new Map<string, { at: number; data: unknown }>();
const TTL = 60 * 1000; // 60s

async function cached<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.data as T;
  const data = await fn();
  cache.set(key, { at: Date.now(), data });
  return data;
}

/* ──────── core fetcher ──────── */

/**
 * Reads a sheet range and returns rows as objects keyed by the header row.
 * Assumes the first returned row IS the header. Caller passes a range that
 * already excludes summary/dashboard rows.
 *
 * Example range: `raw_25/26 계약!A1:Z`
 */
export async function readSheetAsObjects(
  range: string,
): Promise<Record<string, string>[]> {
  return cached(`obj:${range}`, async () => {
    const res = await client().spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range,
    });
    const rows = res.data.values ?? [];
    if (rows.length === 0) return [];
    const [header, ...body] = rows;
    return body.map((row) =>
      Object.fromEntries(
        header.map((col, i) => [String(col).trim(), String(row[i] ?? "").trim()]),
      ),
    );
  });
}

/** Raw values (2D array). Useful when headers are weird. */
export async function readSheetValues(range: string): Promise<string[][]> {
  return cached(`raw:${range}`, async () => {
    const res = await client().spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range,
    });
    return (res.data.values ?? []).map((row) =>
      row.map((cell) => String(cell ?? "").trim()),
    );
  });
}

/** List all tab names in the spreadsheet (for debugging / discovery). */
export async function listSheetTabs(): Promise<string[]> {
  return cached("tabs", async () => {
    const res = await client().spreadsheets.get({
      spreadsheetId: SHEET_ID,
      includeGridData: false,
    });
    return (res.data.sheets ?? [])
      .map((s) => s.properties?.title ?? "")
      .filter(Boolean);
  });
}

/* ──────── Korean-format value parsers ──────── */

/** "2025. 1. 2" → "2025-01-02"  ·  "2025-01-02" passthrough  ·  empty → null */
export function parseKoreanDate(s: string): string | null {
  if (!s) return null;
  const t = s.trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(t)) return t.slice(0, 10);
  const m = t.match(/^(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})/);
  if (!m) return null;
  return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
}

/** "7개월" → 7  ·  "14" → 14  ·  empty → null */
export function parseDurationMonths(s: string): number | null {
  if (!s) return null;
  const m = s.match(/\d+/);
  return m ? Number(m[0]) : null;
}

/** "1주차" → 1  ·  "h" → null (skip) */
export function parseWeek(s: string): number | null {
  if (!s) return null;
  const m = s.match(/\d+/);
  return m ? Number(m[0]) : null;
}

/** "재계약(개인)" / "재계약(법인)" → true · "법인신규" / "개인이전" → false */
export function isRenewalType(contractType: string): boolean {
  return contractType.includes("재계약");
}

/** "168,000원" or "168000" → 168000  ·  empty → 0 */
export function parseKRW(s: string): number {
  if (!s) return 0;
  const cleaned = s.replace(/[^\d-]/g, "");
  return cleaned ? Number(cleaned) : 0;
}

/* ──────── Domain-specific readers ──────── */

/**
 * Reads the cleaned contracts sheet provided by 강재혁 본부장.
 * Sheet name candidates (in order of preference):
 *   1. "raw_25/26 계약"  (final, cleaned)
 *   2. "25년/26년 계약현황"  (current, dashboard-style — fallback)
 */
export type SheetContract = {
  contract_id: string;
  representative: string;
  company_name: string;
  business_number: string;
  industry: string;
  contract_type: string;
  is_renewal: boolean;
  start_date: string | null;
  end_date: string | null;
  duration_months: number | null;
  payment_method: string;
  amount: number;
};

const CONTRACT_TAB_PRIMARY = "raw_25/26 계약";
const CONTRACT_TAB_FALLBACK = "25년/26년 계약현황";

export async function readContractsFromSheet(): Promise<SheetContract[]> {
  let rows: Record<string, string>[] = [];

  // Try the cleaned tab first
  try {
    rows = await readSheetAsObjects(`${CONTRACT_TAB_PRIMARY}!A1:Z`);
  } catch {
    /* tab doesn't exist yet */
  }

  // Fallback to original tab (skipping header noise — headers start at row 7)
  if (rows.length === 0) {
    try {
      rows = await readSheetAsObjects(`${CONTRACT_TAB_FALLBACK}!A7:Z`);
    } catch {
      return [];
    }
  }

  return rows
    .map(rowToContract)
    .filter((c): c is SheetContract => c !== null);
}

function rowToContract(r: Record<string, string>): SheetContract | null {
  // Try multiple header variations (영문/한글)
  const id =
    r.contract_id || r["계약번호"] || r["id"] || "";
  if (!id) return null;

  const companyName = r.company_name || r["상호명"] || "";
  if (!companyName) return null;

  const contractType = r.contract_type || r["사업자 유형"] || r["유형"] || "";
  const startDate = parseKoreanDate(
    r.start_date || r["계약시작일"] || r["시작일"] || "",
  );
  const endDate = parseKoreanDate(
    r.end_date || r["계약종료일"] || r["종료일"] || "",
  );

  return {
    contract_id: id,
    representative: r.representative || r["대표자명"] || "",
    company_name: companyName,
    business_number: r.business_number || r["사업자번호"] || "",
    industry: r.industry || r["업종"] || "",
    contract_type: contractType,
    is_renewal: isRenewalType(contractType),
    start_date: startDate,
    end_date: endDate,
    duration_months: parseDurationMonths(
      r.duration_months || r["계약기간"] || r["기간"] || "",
    ),
    payment_method: r.payment_method || r["결제방식"] || r["결제수단"] || "",
    amount: parseKRW(r.amount || r["금액"] || r["결제금액"] || ""),
  };
}

/**
 * Reads cleaned branches sheet.
 * Primary: "raw_26지점" · Fallback: tries listing tabs to find best match.
 */
export type SheetBranch = {
  id: string;
  name: string;
  region: string;
  address: string;
  congested: boolean;
  operator?: string;
  brand?: string;
};

const BRANCH_TAB_PRIMARY = "raw_26지점";

export async function readBranchesFromSheet(): Promise<SheetBranch[]> {
  let rows: Record<string, string>[] = [];
  try {
    rows = await readSheetAsObjects(`${BRANCH_TAB_PRIMARY}!A1:Z`);
  } catch {
    return [];
  }

  return rows
    .map(rowToBranch)
    .filter((b): b is SheetBranch => b !== null);
}

function rowToBranch(r: Record<string, string>): SheetBranch | null {
  const name = r.name || r["지점명"] || "";
  if (!name) return null;
  const region = r.region || r["지역"] || extractRegion(r["주소지"] || r.address || "");

  return {
    id:
      r.id ||
      name
        .replace(/[^가-힣a-zA-Z0-9]/g, "-")
        .toLowerCase(),
    name,
    region,
    address: r.address || r["주소지"] || r["주소"] || "",
    congested:
      (r.congested || r["과밀여부"] || r["과밀"] || "").toLowerCase() ===
        "true" ||
      (r.congested || r["과밀여부"] || r["과밀"] || "").includes("과밀"),
    operator: r.operator || r["스페이스 사업자명"] || r["운영주체"] || undefined,
    brand: r.brand || r["브랜드"] || undefined,
  };
}

function extractRegion(address: string): string {
  if (!address) return "";
  const first = address.trim().split(/\s+/)[0] ?? "";
  // "서울특별시" → "서울", "경기도" → "경기" 등
  return first
    .replace("특별시", "")
    .replace("광역시", "")
    .replace("특별자치도", "")
    .replace("도", "")
    .replace("시", "");
}
