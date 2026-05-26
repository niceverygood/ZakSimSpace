import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ArrowRight, Check, Building, Mail, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContractTrigger } from "@/components/contract/ContractTrigger";
import { branches, formatKRW } from "@/lib/contract-data";
import { KakaoMap } from "@/components/map/KakaoMap";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { RecordRecentBranch } from "@/components/favorites/RecordRecentBranch";
import { cn } from "@/lib/utils";

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  return branches.map((b) => ({ id: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const branch = branches.find((b) => b.id === id);
  if (!branch) return { title: "지점을 찾을 수 없어요" };
  return {
    title: branch.name,
    description: `${branch.name} — ${branch.address}. 월 ${formatKRW(branch.monthlyPrice)}부터 시작하는 합법적인 사업장.`,
  };
}

export default async function BranchDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const branch = branches.find((b) => b.id === id);
  if (!branch) notFound();

  const related = branches
    .filter((b) => b.id !== branch.id && b.region === branch.region)
    .slice(0, 3);

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
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-16 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white border border-cream-200 px-3 py-1 mb-5">
                <MapPin className="w-3 h-3 text-sage-700" strokeWidth={2.5} />
                <span className="text-[11.5px] font-bold text-ink-800">
                  {branch.region}
                </span>
              </div>
              <div className="flex items-start gap-4">
                <h1 className="text-[30px] lg:text-[40px] font-extrabold text-ink-900 leading-[1.2] tracking-tight flex-1">
                  {branch.name}
                </h1>
                <FavoriteButton branchId={branch.id} branchName={branch.name} />
              </div>
              <p className="mt-3 text-[15px] text-ink-500">{branch.address}</p>
              <RecordRecentBranch branchId={branch.id} />

              <div className="flex items-center gap-1.5 mt-5">
                <Tag tone={branch.congested ? "warm" : "green"}>
                  {branch.congested ? "과밀억제권역" : "비과밀권역"}
                </Tag>
                {branch.inspectable && <Tag tone="blue">실사가능</Tag>}
                {branch.supportsLicense && <Tag tone="violet">인허가 업종 지원</Tag>}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ContractTrigger className="inline-flex items-center gap-2 rounded-full bg-sage-600 hover:bg-sage-700 text-white font-bold px-6 h-12 text-[14.5px] transition-colors shadow-[0_10px_24px_-8px_rgba(67,105,63,0.5)]">
                  이 지점으로 계약 시작
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </ContractTrigger>
                <Link
                  href="/locations"
                  className="inline-flex items-center rounded-full border border-ink-200 hover:border-ink-400 text-ink-800 font-semibold px-5 h-12 text-[13.5px] transition-colors bg-white"
                >
                  다른 지점 보기
                </Link>
              </div>
            </div>

            {/* Pricing card */}
            <div className="rounded-3xl bg-white border border-cream-200 shadow-[0_18px_50px_-25px_rgba(12,18,25,0.25)] p-7">
              <p className="text-[12.5px] font-semibold text-sage-600 tracking-wider uppercase mb-3">
                Pricing
              </p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[34px] font-extrabold text-ink-900 tnum">
                  {formatKRW(branch.monthlyPrice)}
                </span>
                <span className="text-[14px] font-semibold text-ink-400">/월</span>
              </div>
              <p className="text-[13px] text-ink-500">
                연간 결제 시{" "}
                <span className="text-ink-800 font-bold tnum">
                  {formatKRW(branch.yearlyPrice)}
                </span>{" "}
                · 16% 할인
              </p>

              <ul className="mt-6 space-y-2.5">
                {[
                  "관할 세무서 사업자등록 가능",
                  "임대차계약서 즉시 발급",
                  "우편물 도착 알림톡",
                  "보증금·관리비·갱신비 0원",
                ].map((it) => (
                  <li
                    key={it}
                    className="flex items-start gap-2 text-[13.5px] text-ink-700"
                  >
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-sage-100 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-sage-700" strokeWidth={3} />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>

              <ContractTrigger className="mt-7 w-full h-12 rounded-2xl bg-ink-900 hover:bg-ink-800 text-white font-bold text-[14px] inline-flex items-center justify-center gap-2 transition-colors">
                빠른 계약
                <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </ContractTrigger>
            </div>
          </div>
        </section>

        {/* Map placeholder + details */}
        <section className="bg-cream-50 py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12">
            {/* Map */}
            <div>
              <KakaoMap address={branch.address} title={branch.name} />
              <div className="mt-3 flex flex-wrap items-center gap-3 justify-end">
                <Link
                  href={`https://map.kakao.com/?q=${encodeURIComponent(branch.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[13px] font-semibold text-sage-700 hover:text-sage-800 inline-flex items-center gap-1"
                >
                  카카오맵에서 보기 <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Details */}
            <aside className="space-y-3">
              {[
                {
                  icon: Building,
                  label: "건축물 용도",
                  value:
                    branch.buildingType === "office"
                      ? "오피스"
                      : branch.buildingType === "complex"
                        ? "복합용도"
                        : "일반건물",
                },
                {
                  icon: ShieldCheck,
                  label: "인허가 업종 지원",
                  value: branch.supportsLicense ? "가능" : "불가",
                },
                {
                  icon: Mail,
                  label: "우편물 처리",
                  value: "도착 시 알림톡 + 표지 스캔 무료",
                },
                {
                  icon: Check,
                  label: "실사 대응",
                  value: branch.inspectable ? "가능" : "사전 협의 필요",
                },
              ].map((row) => {
                const Icon = row.icon;
                return (
                  <div
                    key={row.label}
                    className="rounded-2xl border border-cream-200 bg-white p-4 flex items-center gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sage-50 border border-sage-200 flex items-center justify-center">
                      <Icon
                        className="w-4 h-4 text-sage-700"
                        strokeWidth={2}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11.5px] text-ink-400">{row.label}</p>
                      <p className="text-[14px] font-bold text-ink-900 mt-0.5">
                        {row.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </aside>
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
                  className="text-[13.5px] font-semibold text-ink-700 hover:text-sage-700"
                >
                  전체 보기 →
                </Link>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((b) => (
                  <li key={b.id}>
                    <Link
                      href={`/locations/${b.id}`}
                      className="block rounded-2xl bg-white border border-cream-200 p-5 hover:border-sage-300 hover:-translate-y-0.5 transition-all"
                    >
                      <p className="text-[15px] font-bold text-ink-900">
                        {b.name}
                      </p>
                      <p className="text-[12.5px] text-ink-500 mt-1">
                        {b.address}
                      </p>
                      <p className="text-right text-[15px] font-extrabold text-ink-900 tnum mt-3">
                        {formatKRW(b.monthlyPrice)}
                        <span className="text-[11.5px] font-semibold text-ink-400 ml-0.5">
                          /월
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
  tone: "green" | "warm" | "blue" | "violet";
}) {
  const cls =
    tone === "green"
      ? "bg-sage-50 text-sage-700 border-sage-200"
      : tone === "warm"
        ? "bg-cream-100 text-ink-500 border-cream-200"
        : tone === "blue"
          ? "bg-blue-50 text-blue-600 border-blue-100"
          : "bg-violet-50 text-violet-600 border-violet-100";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11.5px] font-semibold",
        cls,
      )}
    >
      {children}
    </span>
  );
}
