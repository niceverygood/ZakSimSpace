import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getOrder } from "@/lib/orders";
import { findBranch } from "@/lib/branches-loader";
import {
  LESSEE,
  contractEndISO,
  krAmountWords,
  krDate,
  unitLabel,
  virtualAddress,
} from "@/lib/contract-template";
import { PrintButton } from "./PrintButton";

export const dynamic = "force-dynamic";

type Params = Promise<{ moid: string }>;

const RULES: string[] = [
  "전차인은 사업자 등록, 이전 시, 사업자 등록증 사본을 임차인에게 제출해야 한다.",
  "‘전차인’은 ‘임차인’의 시설 사용시, 입실/퇴실시 이용 수칙을 준수하며, 지정된 좌석을 이용해야 한다. 또한, 시설 파손·분실 등이 있을 경우, 임차인은 전차인에게 손해 배상을 청구할 수 있다.",
  "임차인은 사업장에 도착하는 우편물을 ‘전차인’의 개봉 동의 또는 미동의에 따라 우편물 수취 후 전차인에게 공유하며, 취급 과정 중 분실 우편물에 대한 책임은 전차인에게 없으며, 전차인은 임차인의 우편물 처리 규정에 동의한다.",
  "임차인은 사업자에 도착하는 우편물·등기·택배 등 도착 안내 후 2주 경과 시 모두 임의 폐기 처리하며 전차인은 이에 동의한다.",
  "전차인은 고가의 택배 및 등기물에 대하여 위탁 보관 또는 배송지로 사용할 수 없으며 분실 및 파손 등의 이유로 발생하는 일체의 민형사상 책임을 관할 관청 또는 전차인에게 제기할 수 없다.",
  "전차인은 임차인이 업무 수행을 위해 필요한 개인 정보를 해당 기관에 제공하는 것에 대하여 확인하고 동의한다.",
  "전차인은 전대차 계약 시 안내한 사업 목적 이외의 다른 사업을 하거나 계약 기간 중 불법적인 사업 또는 행위를 할 경우 금전적인 손실과 민·형사상 책임은 모두 전차인이 책임진다.",
  "전차인은 임차인의 동의 없이 부동산을 제3자에게 양도하거나 전대 또는 담보 제공을 할 수 없다.",
  "전차인은 연락처·이메일·명의 변경·상호명·업종 등을 변경하기 전 임차인에게 미리 고지를 하여야 하며, 고지를 하지 않아 발생되는 문제는 전차인이 전적으로 책임을 진다.",
];

const TERMINATION: string[] = [
  "허위 또는 기타 부정한 방법으로 부동산을 임대 받은 경우",
  "부동산의 임차권을 임차인의 동의 없이 타인에게 양도하거나 전대한 경우",
  "부동산 및 그 부대시설을 고의로 파손 또는 멸실한 경우",
  "불법적인 업무 행위로 부동산의 명예나 신용을 현저하게 훼손한 경우",
  "거주 목적 혹은 전입 신고를 진행할 경우",
  "정부 기관·공공단체 혹은 그에 준하는 기관에서 2회 이상 민원이 발생되는 경우",
  "부가세·소득세·법인세 등 납세의 의무를 성실히 이행하지 않을 경우",
  "상기의 규정과 유사한 사유로 사실상 사업을 시작하지 아니했거나 폐업 상태에 있는 경우",
  "현행법 위반 등으로 해당 기관으로부터 고발 등의 조치를 받아 계약 유지가 어렵다고 판단될 경우",
  "실내 흡연·소란·사고·위법 행위·국세 체납 등의 일이 발생할 경우",
  "부도 발생 또는 고액 체납 등으로 소재 불명인 경우",
  "연락처가 변경되었음에도 임차인에게 고의로 알리지 않을 경우",
  "지속적인 연락 두절로 인해 계약 연장 또는 종료 처리가 되지 않을 경우",
  "지속적인 연락 두절로 인해 업무 협조가 되지 않아 전차인에게 피해가 발생할 경우",
  "해당 계약서를 통해 폐업 및 개업을 임차인에게 통보 없이 지속적으로 반복하는 행위가 발생할 경우",
];

export default async function ContractPage({ params }: { params: Params }) {
  const { moid } = await params;
  const order = await getOrder(moid);

  if (!order || order.status !== "paid") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-cream-50 px-6">
        <div className="text-center">
          <h1 className="text-[20px] font-extrabold text-ink-900">
            계약서를 찾을 수 없어요
          </h1>
          <p className="mt-3 text-[13.5px] text-ink-500">
            결제가 완료된 계약만 계약서가 발급됩니다.
          </p>
          <Link
            href="/me/contracts"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy-600 text-white font-bold px-6 h-12 text-[13.5px]"
          >
            내 계약 보기
          </Link>
        </div>
      </main>
    );
  }

  // Prefer the snapshot address stored at payment time; fall back to live data.
  let branchAddr = order.branchAddr;
  if (!branchAddr) {
    const b = await findBranch(order.branchId);
    branchAddr = b?.address ?? "";
  }
  const months = order.months ?? (order.cycle === "yearly" ? 12 : 1);
  const startISO = order.startDate || order.createdAt.slice(0, 10);
  const endISO = contractEndISO(startISO, months);
  const vaddr = virtualAddress(branchAddr, order.unitNo);
  const today = krDate(order.authDate ? isoFromAuth(order.authDate) : order.createdAt.slice(0, 10));

  return (
    <main className="min-h-screen bg-ink-100 py-8 print:bg-white print:py-0">
      {/* Toolbar — hidden when printing */}
      <div className="no-print mx-auto max-w-[820px] px-4 mb-5 flex items-center justify-between">
        <Link
          href="/me/contracts"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink-600 hover:text-ink-900"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          내 계약
        </Link>
        <PrintButton />
      </div>

      {/* ───────── Page 1: 사무실 시설 사용 계약서 ───────── */}
      <article className="sheet">
        <h1 className="text-center text-[20px] font-extrabold tracking-tight mb-6">
          사무실 시설 사용 계약서
        </h1>

        <H>제1조 (부동산의 표시)</H>
        <p className="clause">
          임차인과 전차인 쌍방은 아래 표시 부동산에 관하여 다음 계약내용과 같이
          사무실 시설 사용 계약을 체결한다.
        </p>
        <table className="tbl">
          <tbody>
            <KV k="소재지" v={vaddr} />
            <KV k="임대할 부분(면적)" v={`전용 사용구역${order.unitNo ? ` (${unitLabel(order.unitNo)})` : ""}`} />
          </tbody>
        </table>

        <H>제2조 (계약내용)</H>
        <p className="sub">가. 임차인</p>
        <table className="tbl">
          <tbody>
            <KV k="성명 또는 상호명" v={`${LESSEE.company} (${LESSEE.brand})`} />
            <KV k="대표자명" v={LESSEE.ceo} />
            <KV k="주소" v={LESSEE.address} />
            <KV k="사업자등록번호" v={LESSEE.bizRegNo} />
            <KV k="연락처" v={LESSEE.tel} />
          </tbody>
        </table>

        <p className="sub">나. 전차인</p>
        <table className="tbl">
          <tbody>
            <KV k="성명 또는 상호명" v={order.buyerName} />
            <KV k="대표자명" v={order.buyerName} />
            <KV k="주소" v="" />
            <KV k="주민 또는 사업자 등록번호" v="" />
            <KV k="연락처" v={order.buyerTel} />
          </tbody>
        </table>

        <p className="sub">다. 계약기간</p>
        <p className="clause">
          본 계약의 유효 기간은 [{krDate(startISO)} 부터 {krDate(endISO)} 까지]
          이다. [총 {months}개월]
        </p>

        <p className="sub">라. 계약금액</p>
        <p className="clause">
          계약 비용은 一金 {krAmountWords(order.amount)}원정 [
          {order.amount.toLocaleString("ko-KR")}] 원整 을 선불로 지불하기로 한다.
          (VAT 포함)
          {order.bizType ? `  ·  사업자 유형: ${order.bizType}` : ""}
          {order.industry ? `  ·  업종: ${order.industry}` : ""}
        </p>

        <H>제3조 (시설 사용 규칙 준수 및 의무사항)</H>
        <ol className="list">
          {RULES.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
        <table className="tbl mt-2">
          <tbody>
            <KV k="우편물 개봉 동의 여부" v="[   ] 동의      [   ] 비동의" />
          </tbody>
        </table>

        <H>제4조 (시설 사용료)</H>
        <p className="clause">
          계약 만료 전 임차인이 전차인에게 계약 만료 안내를 할 예정이며,
          지속적으로 갱신 또는 연장 의사를 밝히지 않을 경우 계약은 자동으로
          연장되며, 전차인은 임차인에게 연장 수수료를 납부하여야 하며, 자동 연장
          시 할인은 적용되지 않는다.
        </p>

        <H>제5조 (계약의 종료·연장·갱신·해지)</H>
        <ol className="list">
          <li>
            전차인은 폐업 또는 사업장 이전 시, 관련된 증빙 자료 및 서류를 임차인에게
            제출하여야 하며, 모든 계약 종료 및 해지 절차는 증빙 서류 확인 후
            진행되며 임차인은 전차인에게 증빙 서류를 요구할 수 있다.
          </li>
          <li>
            전차인은 갱신 조건을 수락할 경우, 계약 종료일 전까지 임차인에게 계약
            갱신 의사를 통보해야 한다.
          </li>
          <li>
            전차인이 계약 갱신 의사를 통보하지 않을 경우 임차인은 관할 세무서에
            직권 말소를 신청할 수 있으며 직권 말소에 대한 불이익은 임차인이
            책임지지 않는다.
          </li>
          <li>
            계약 기간 만료 후 갱신 혹은 사업자 이전 및 폐업을 하지 않고 무단으로
            사용 시 [부가가치세법 제8조 및 같은 법 시행령 제15조]에 따라 세무서에
            직권 폐업 신청이 진행되며, 이로 인한 불이익은 임차인은 책임지지 않는다.
          </li>
        </ol>

        <H>제6조 (환불 및 소송)</H>
        <ol className="list">
          <li>
            계약에 관한 소송의 관할 법원은 임차인과 전차인이 합의하여 결정하는
            관할법원으로 하며, 합의가 이루어지지 않는 경우에는 부동산 소재지를
            관할하는 법원으로 한다.
          </li>
          <li>
            임차인의 문제로 사업자 등록 신청이 반려될 경우에는 임차인은 전차인에게
            임대료를 전액 환불한다.
          </li>
          <li>
            임차인의 폐업 및 귀책으로 인해 사무실 이용을 할 수 없을 경우 임대료를
            환불해야 하며, 사용 기간을 제외하고 잔여 기간에 대해 일할 계산 후
            환불한다.
          </li>
          <li>
            중도 계약 해지 시(폐업·사업장 이전 등) 남은 임대 기간에 대한 환불은
            청구하지 않기로 한다.
          </li>
        </ol>

        <H>제7조 (계약의 해제)</H>
        <p className="clause">
          전차인이 다음 각 호의 어느 하나에 해당하는 행위를 하였을 경우, 임차인은
          즉시 계약 해지 및 계약의 갱신을 거절할 수 있다.
        </p>
        <ol className="list">
          {TERMINATION.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>

        <p className="text-center mt-8 mb-6 text-[13px]">{today}</p>
        <table className="tbl sign">
          <tbody>
            <tr>
              <th>임차인</th>
              <td>
                {LESSEE.company} / 대표 {LESSEE.ceo} / 사업자등록번호{" "}
                {LESSEE.bizRegNo}
              </td>
              <td className="seal">(인)</td>
            </tr>
            <tr>
              <th>전차인</th>
              <td>{order.buyerName} / 연락처 {order.buyerTel}</td>
              <td className="seal">(인)</td>
            </tr>
          </tbody>
        </table>

        <p className="mt-6 text-[10.5px] text-ink-400 tnum">
          계약번호 {order.moid}
          {order.tid ? `  ·  거래번호 ${order.tid}` : ""}
        </p>
      </article>

      {/* ───────── Page 2: 전대차 포괄 동의서 ───────── */}
      <article className="sheet page-break">
        <h1 className="text-center text-[18px] font-extrabold tracking-tight mb-6">
          전대차 포괄 동의서
        </h1>
        <p className="clause">
          (이하 “임대인”)와 {LESSEE.company}(이하 “임차인”)은 임대차계약에 따라
          “임차인”이 임대차목적물 내에서 공유오피스 영업과 관련한 전대차계약을
          체결할 때 하기의 조건을 준수하는 것을 전제로 동의한다.
        </p>

        <table className="tbl mt-3">
          <tbody>
            <tr>
              <th className="c">임대차목적물의 표시</th>
              <td className="c">소재지</td>
              <td className="c">해당층</td>
              <td className="c">면적(전용면적 기준)</td>
            </tr>
            <tr>
              <td></td>
              <td>{branchAddr}</td>
              <td>{order.unitNo ? unitLabel(order.unitNo) : ""}</td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <ol className="list mt-3">
          <li>
            임대인은 임차인이 임대차계약 체결일로부터 임의로 지정한 전차인들에게
            임대차목적물 내 공유오피스로 사용하는 면적에 한하여 전대하는 것에 포괄
            동의한다. 단, 임(전)대차 계약이 기간만료·해지 등 어떠한 사유로 종료될
            경우 전대차계약도 자동으로 종료되고, 임차인의 책임하에 전차인들을 모두
            퇴거시키고 임대차 목적물 전부를 임대인에게 인도하여야 한다.
          </li>
          <li>
            임차인은 전대차계약이 체결되더라도 임(전)대차 계약에 따른 모든 의무를
            임대인에게 이행해야 하며, 임대인은 전차인에 대해 어떠한 책임도 지지
            않는다.
          </li>
          <li>
            전차인의 행위로 인하여 임대인에게 손해가 발생할 경우, 임차인은 임대인에게
            모든 손해를 배상해야 한다.
          </li>
          <li>
            전차인의 명도·원상복구 등 기타 어떤 사유를 불문하고, 전대차 계약에 따른
            모든 책임은 임차인이 부담한다.
          </li>
        </ol>

        <p className="text-center mt-8 mb-6 text-[13px]">{today}</p>
        <table className="tbl sign">
          <tbody>
            <tr>
              <th>임대인</th>
              <td>상호 / 사업자등록번호 / 주소 / 대표자</td>
              <td className="seal">(인)</td>
            </tr>
            <tr>
              <th>임차인</th>
              <td>
                {LESSEE.company} / {LESSEE.bizRegNo} / {LESSEE.address} / 대표{" "}
                {LESSEE.ceo}
              </td>
              <td className="seal">(인)</td>
            </tr>
            <tr>
              <th>전차인</th>
              <td>{order.buyerName} / 연락처 {order.buyerTel}</td>
              <td className="seal">(인)</td>
            </tr>
          </tbody>
        </table>
      </article>

      <style>{`
        .sheet {
          background: #fff;
          width: 794px;
          max-width: calc(100% - 16px);
          margin: 0 auto;
          padding: 56px 60px;
          box-shadow: 0 12px 40px -18px rgba(12,18,25,0.3);
          color: #1a2230;
          font-size: 12.5px;
          line-height: 1.85;
        }
        .sheet + .sheet { margin-top: 28px; }
        .sheet .clause { margin: 6px 0 10px; }
        .sheet .sub { font-weight: 700; margin: 12px 0 4px; }
        .tbl { width: 100%; border-collapse: collapse; margin: 6px 0; }
        .tbl th, .tbl td {
          border: 1px solid #c9d2e0;
          padding: 7px 10px;
          font-size: 12px;
          vertical-align: top;
          text-align: left;
        }
        .tbl th { background: #f1f5fb; font-weight: 700; white-space: nowrap; width: 190px; }
        .tbl td.c, .tbl th.c { text-align: center; }
        .tbl.sign th { width: 90px; }
        .tbl.sign td.seal { width: 56px; text-align: center; color: #6b7585; }
        .list { margin: 4px 0 10px; padding-left: 20px; list-style: decimal; }
        .list li { margin: 3px 0; }
        h2.section { font-weight: 800; font-size: 13.5px; margin: 18px 0 4px; padding-bottom: 3px; border-bottom: 2px solid #233d68; }
        @media print {
          .no-print { display: none !important; }
          .sheet { box-shadow: none; margin: 0 auto; max-width: none; width: 100%; padding: 24px 28px; }
          .page-break { break-before: page; }
        }
      `}</style>
    </main>
  );
}

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="section">{children}</h2>;
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <tr>
      <th>{k}</th>
      <td colSpan={3}>{v}</td>
    </tr>
  );
}

/** NicePay AuthDate yyyyMMddHHmmss → ISO date (YYYY-MM-DD). */
function isoFromAuth(s: string): string {
  if (s.length < 8) return s;
  return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
}
