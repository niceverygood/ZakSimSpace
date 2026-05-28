import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight, Check, Building } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { formatKRW } from "@/lib/contract-data";
import { findBranch, loadBranches } from "@/lib/branches-loader";
import {
  pickProductPrice,
  readProductsFromSheet,
  sheetsConfigured,
} from "@/lib/sheets";
import { KakaoMap } from "@/components/map/KakaoMap";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { RecordRecentBranch } from "@/components/favorites/RecordRecentBranch";
import { BranchOptionsCard } from "@/components/branch/BranchOptionsCard";

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  const branches = await loadBranches();
  return branches.map((b) => ({ id: b.id }));
}

/** Title format per client PDF: 작심스페이스 {지역} {지점} 비상주사무실 */
function fullDisplayName(name: string, region: string) {
  const seg = region ? `${region} ` : "";
  return `작심스페이스 ${seg}${name} 비상주사무실`;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const branch = await findBranch(id);
  if (!branch) return { title: "지점을 찾을 수 없어요" };
  const full = fullDisplayName(branch.name, branch.region);
  return {
    title: full,
    description: `${full} — ${branch.address}. 합법적인 비상주 사무실 주소지로 사업자등록부터 우편물 관리까지.`,
  };
}

async function loadPrices(branchName: string): Promise<Record<number, number>> {
  if (!sheetsConfigured()) {
    return { 3: 120000, 6: 180000, 12: 250000, 24: 440000 };
  }
  try {
    const products = await readProductsFromSheet();
    const months = [3, 6, 12, 24] as const;
    const out: Record<number, number> = {};
    for (const m of months) {
      out[m] = pickProductPrice(products, branchName, "개인", m) ?? 0;
    }
    return out;
  } catch {
    return { 3: 120000, 6: 180000, 12: 250000, 24: 440000 };
  }
}

const RECOMMENDED_AUDIENCES = [
  "온라인 셀러 · 1인 사업자",
  "프리랜서 · N잡 창업가",
  "법인 설립을 준비하는 분",
  "주소지 임대료 부담을 줄이고 싶은 분",
  "사업자등록 반려가 걱정되는 분",
];

const BRANCH_FAQS = [
  {
    q: "이 지점으로 사업자등록이 가능한가요?",
    a: "네, 가능합니다. 작심스페이스가 발급하는 임대차계약서 + 주소사용권을 첨부해 관할 세무서에 신청하시면 됩니다. 최근 12개월 평균 사업자등록 승인률은 98.4%입니다.",
  },
  {
    q: "현장 실사가 나오면 어떻게 대응하나요?",
    a: "이 지점은 실사 대응이 가능합니다. 세무서·금융기관 실사 일정이 잡히면 본사 운영팀이 현장 응대를 지원해 드립니다.",
  },
  {
    q: "우편물은 어떻게 받아볼 수 있나요?",
    a: "지점에 우편물이 도착하면 봉투 사진과 함께 카카오 알림톡으로 안내해 드립니다. 마이페이지에서도 도착 내역을 실시간으로 확인할 수 있습니다.",
  },
  {
    q: "다른 지점으로 이전할 수 있나요?",
    a: "이용 중에도 다른 지점으로 자유롭게 이전 신청이 가능합니다. 이전 시 사업자등록증 정정 신고에 필요한 서류를 함께 안내해 드립니다.",
  },
];

export default async function BranchDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const branch = await findBranch(id);
  if (!branch) notFound();

  const [all, prices] = await Promise.all([
    loadBranches(),
    loadPrices(branch.name),
  ]);
  const related = all
    .filter((b) => b.id !== branch.id && b.region === branch.region)
    .slice(0, 3);

  const displayName = fullDisplayName(branch.name, branch.region);

  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-16">
        {/* Breadcrumb */}
        <div className="bg-cream-50 border-b border-cream-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-3 flex items-center gap-1.5 text-[12px] text-ink-500">
            <Link href="/" className="hover:text-ink-800">
              홈
            </Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-ink-800">
              전국 지점
            </Link>
            <span>/</span>
            <span className="text-ink-800 font-semibold">{branch.name}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-cream-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 lg:py-14">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-cream-200 px-3 py-1 mb-5">
              <MapPin className="w-3 h-3 text-navy-700" strokeWidth={2.5} />
              <span className="text-[11.5px] font-bold text-ink-800">
                {branch.region}
              </span>
            </div>
            <div className="flex items-start gap-4">
              <h1 className="text-[26px] lg:text-[36px] font-extrabold text-ink-900 leading-[1.25] tracking-tight flex-1">
                {displayName}
              </h1>
              <FavoriteButton branchId={branch.id} branchName={branch.name} />
            </div>
            <p className="mt-3 text-[14.5px] text-ink-500">{branch.address}</p>
            <RecordRecentBranch branchId={branch.id} />
            <div className="flex items-center gap-1.5 mt-5">
              <Tag tone={branch.congested ? "warm" : "green"}>
                {branch.congested ? "과밀억제권역" : "비과밀권역"}
              </Tag>
              {branch.inspectable && <Tag tone="blue">실사가능</Tag>}
            </div>
          </div>
        </section>

        {/* Map + 계약 옵션 sidebar */}
        <section className="bg-cream-50 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-start">
            <div className="space-y-8">
              {/* Map */}
              <div>
                <KakaoMap address={branch.address} title={branch.name} />
                <div className="mt-3 flex flex-wrap items-center gap-3 justify-end">
                  <Link
                    href={`https://map.kakao.com/?q=${encodeURIComponent(branch.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[13px] font-semibold text-navy-700 hover:text-navy-800 inline-flex items-center gap-1"
                  >
                    카카오맵에서 보기 <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* 기본 정보 */}
              <div>
                <h2 className="text-[20px] lg:text-[24px] font-extrabold text-ink-900 mb-4">
                  기본 정보
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  <InfoRow
                    icon={MapPin}
                    label="지점 주소"
                    value={branch.address}
                  />
                  <InfoRow
                    icon={Building}
                    label="과밀/비과밀"
                    value={branch.congested ? "과밀억제권역" : "비과밀권역"}
                  />
                  <InfoRow
                    icon={Check}
                    label="계약 가능 사업자 유형"
                    value="개인 / 법인 모두 가능"
                  />
                  <InfoRow
                    icon={Check}
                    label="실사 대응"
                    value={branch.inspectable ? "가능" : "사전 협의 필요"}
                  />
                </ul>
              </div>

              {/* 이런 분들께 추천 */}
              <div>
                <h2 className="text-[20px] lg:text-[24px] font-extrabold text-ink-900 mb-4">
                  이런 분들께 추천합니다
                </h2>
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {RECOMMENDED_AUDIENCES.map((a) => (
                    <li
                      key={a}
                      className="flex items-start gap-2.5 rounded-2xl bg-white border border-cream-200 px-4 py-3.5"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-navy-50 border border-navy-200 flex items-center justify-center">
                        <Check
                          className="w-2.5 h-2.5 text-navy-700"
                          strokeWidth={3}
                        />
                      </span>
                      <p className="text-[13.5px] text-ink-700 font-semibold leading-snug">
                        {a}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 자주 묻는 질문 */}
              <div>
                <h2 className="text-[20px] lg:text-[24px] font-extrabold text-ink-900 mb-4">
                  자주 묻는 질문
                </h2>
                <div className="rounded-3xl border border-cream-200 bg-white">
                  {BRANCH_FAQS.map((f, i) => (
                    <details
                      key={f.q}
                      className={`group px-5 lg:px-6 ${
                        i !== BRANCH_FAQS.length - 1
                          ? "border-b border-cream-200"
                          : ""
                      }`}
                    >
                      <summary className="list-none cursor-pointer py-5 flex items-center justify-between gap-5 text-[14.5px] font-semibold text-ink-900">
                        <span>{f.q}</span>
                        <span className="text-ink-400 group-open:rotate-45 transition-transform text-[18px]">
                          +
                        </span>
                      </summary>
                      <p className="pb-5 text-[13.5px] leading-[1.8] text-ink-500">
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* 계약 옵션 (sticky on lg) */}
            <div className="lg:sticky lg:top-24">
              <BranchOptionsCard
                branchId={branch.id}
                pricesByMonths={prices}
              />
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="bg-cream-100 py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex items-end justify-between mb-8">
                <h2 className="text-[22px] lg:text-[28px] font-extrabold text-ink-900">
                  근처 {branch.region} 지점
                </h2>
                <Link
                  href="/locations"
                  className="text-[13.5px] font-semibold text-ink-700 hover:text-navy-700"
                >
                  전체 보기 →
                </Link>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((b) => (
                  <li key={b.id}>
                    <Link
                      href={`/locations/${b.id}`}
                      className="block rounded-2xl bg-white border border-cream-200 p-5 hover:border-navy-300 hover:-translate-y-0.5 transition-all"
                    >
                      <p className="text-[15px] font-bold text-ink-900">
                        {b.name}
                      </p>
                      <p className="text-[12.5px] text-ink-500 mt-1">
                        {b.address}
                      </p>
                      <p className="text-right text-[15px] font-extrabold text-ink-900 tnum mt-3">
                        {formatKRW(b.yearlyPrice)}
                        <span className="text-[11.5px] font-semibold text-ink-400 ml-0.5">
                          /연
                        </span>
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

function Tag({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "green" | "warm" | "blue";
}) {
  const cls =
    tone === "green"
      ? "bg-navy-50 text-navy-700 border-navy-200"
      : tone === "warm"
        ? "bg-cream-100 text-ink-500 border-cream-200"
        : "bg-blue-50 text-blue-600 border-blue-100";
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11.5px] font-bold ${cls}`}
    >
      {children}
    </span>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <li className="rounded-2xl border border-cream-200 bg-white p-4 flex items-center gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-navy-50 border border-navy-200 flex items-center justify-center">
        <Icon className="w-4 h-4 text-navy-700" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-[11.5px] text-ink-400">{label}</p>
        <p className="text-[14px] font-bold text-ink-900 mt-0.5">{value}</p>
      </div>
    </li>
  );
}
