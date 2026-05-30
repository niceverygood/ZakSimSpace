import "server-only";
import { branches as mockBranches, type Branch } from "@/lib/contract-data";
import {
  pickProductPrice,
  readBranchesFromSheet,
  readProductsFromSheet,
  sheetsConfigured,
  type SheetBranch,
} from "@/lib/sheets";

/**
 * Single source of truth for "what branches/prices does the public site show".
 * Falls back to mock data when Google Sheets isn't configured or the live
 * sheet is empty/errored, so the site keeps rendering during dev or outages.
 */

function toBranch(
  sheet: SheetBranch,
  yearly: number,
  monthly: number,
  prices?: Branch["prices"],
): Branch {
  return {
    id: sheet.id,
    name: sheet.name,
    region: sheet.region || "기타",
    address: sheet.address,
    congested: sheet.congested,
    inspectable: true,
    supportsLicense: false,
    yearlyPrice: yearly,
    monthlyPrice: monthly,
    buildingType: "general",
    prices,
  };
}

const TERMS = [3, 6, 12, 24] as const;

export async function loadBranches(): Promise<Branch[]> {
  if (!sheetsConfigured()) return mockBranches;
  try {
    const [sheetBranches, products] = await Promise.all([
      readBranchesFromSheet(),
      readProductsFromSheet(),
    ]);
    if (sheetBranches.length === 0) return mockBranches;
    return sheetBranches.map((b) => {
      // Per-(사업자유형, 개월수) prices from raw_상품. Used by the contract modal
      // and BranchOptionsCard so 개인/법인 + 3/6/12/24 all show correct amounts.
      const prices: Branch["prices"] = { 개인: {}, 법인: {} };
      for (const m of TERMS) {
        const indiv = pickProductPrice(products, b.name, "개인", m);
        if (indiv) prices.개인[m] = indiv;
        const corp = pickProductPrice(products, b.name, "법인", m);
        if (corp) prices.법인[m] = corp;
      }
      // Default display = 개인 12개월 단가. Branch-specific row in raw_상품
      // takes precedence over the "all" fallback.
      const yearly = prices.개인[12] ?? 240_000;
      const monthly = Math.round(yearly / 12);
      return toBranch(b, yearly, monthly, prices);
    });
  } catch {
    return mockBranches;
  }
}

/** Match an id ignoring stray dashes / whitespace introduced by sheet edits. */
function normalize(s: string): string {
  return s.replace(/[-\s]+/g, "").toLowerCase();
}

export async function findBranch(id: string): Promise<Branch | undefined> {
  const all = await loadBranches();
  const exact = all.find((b) => b.id === id);
  if (exact) return exact;
  const target = normalize(id);
  return all.find(
    (b) => normalize(b.id) === target || normalize(b.name) === target,
  );
}

/**
 * Server-side price for a (branch, 사업자유형, 개월수) combination. Resolves
 * against raw_상품 when the sheet is live; otherwise derives from the branch's
 * baseline 12개월 price (×N/12) so 3/6/24 still produce a sensible amount.
 */
export async function resolvePrice(
  branch: Branch,
  bizType: "개인" | "법인",
  months: 3 | 6 | 12 | 24,
): Promise<number> {
  if (sheetsConfigured()) {
    try {
      const products = await readProductsFromSheet();
      const exact = pickProductPrice(products, branch.name, bizType, months);
      if (exact && exact > 0) return exact;
    } catch {
      /* fall through to derived price */
    }
  }
  // Derived fallback: yearly (12개월 개인 baseline) scaled to the term.
  return Math.round((branch.yearlyPrice / 12) * months);
}
