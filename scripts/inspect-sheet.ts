/**
 * Sanity check: print what readBranchesFromSheet + readProductsFromSheet
 * actually return from the live sheet. Run with `npx tsx scripts/inspect-sheet.ts`.
 */
import { readFileSync } from "node:fs";

try {
  const env = readFileSync(".env.local", "utf8");
  for (const line of env.split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {
  /* rely on env */
}

// `sheets.ts` imports "server-only" which throws unless we mark the env first.
// Setting __NEXT_PRIVATE_CHECK_OPTIONS_FORCE_BUILD_RENDER_ENV doesn't help
// outside next; instead we stub via require.cache.
import { createRequire } from "node:module";
const require_ = createRequire(import.meta.url);
const serverOnlyPath = require_.resolve("server-only");
require_.cache[serverOnlyPath] = {
  id: serverOnlyPath,
  filename: serverOnlyPath,
  loaded: true,
  exports: {},
  // @ts-expect-error - minimal stub
  children: [],
  paths: [],
};

async function main() {
  const {
    readBranchesFromSheet,
    readProductsFromSheet,
    pickProductPrice,
  } = await import("../src/lib/sheets");

  const branches = await readBranchesFromSheet();
  console.log(`\n=== Branches (${branches.length}) ===`);
  branches.slice(0, 5).forEach((b) =>
    console.log(`  ${b.id} | ${b.name} | ${b.region} | ${b.congested ? "과밀" : "비과밀"}`),
  );

  const products = await readProductsFromSheet();
  console.log(`\n=== Products (${products.length}) ===`);
  products.forEach((p) =>
    console.log(
      `  ${p.businessType} | ${p.branchScope} | ${p.months}개월 | 단가=${p.unitPrice.toLocaleString()} | 할인=${p.discount} | 합계=${p.total.toLocaleString()}`,
    ),
  );

  console.log("\n=== Spot-check lookups ===");
  console.log(
    `  개인 12개월 (all branches) → ${pickProductPrice(products, "교대 1호점", "개인", 12)?.toLocaleString()}`,
  );
  console.log(
    `  법인 24개월 (all branches) → ${pickProductPrice(products, "교대 1호점", "법인", 24)?.toLocaleString()}`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
