import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "운영정책",
  description: "작심스페이스 운영정책",
};

export default function PolicyPage() {
  return (
    <LegalLayout
      title="운영정책"
      effectiveDate="2026년 1월 1일"
      draftNote="본 운영정책은 표준 양식 초안입니다. 최종 정책은 법무 검토 후 갱신될 예정입니다."
      intro={
        <p>
          작심스페이스의 모든 지점은 본 운영정책을 따릅니다. 이용자와 지점이
          모두 안전하고 합법적인 환경에서 서비스를 이용할 수 있도록 기준을
          정합니다.
        </p>
      }
      sections={[
        {
          id: "branch",
          title: "지점 운영 기준",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li>모든 지점은 관할 세무서 사업자등록 심사를 통과해야 합니다.</li>
              <li>본사 운영팀이 매월 1회 이상 자체 실사를 진행합니다.</li>
              <li>인허가 업종 지원 지점은 별도 등급으로 관리합니다.</li>
            </ul>
          ),
        },
        {
          id: "mail",
          title: "우편물 처리 정책",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li>
                우편물 도착 시 영업일 기준 1일 이내 카카오 알림톡으로 안내합니다.
              </li>
              <li>표지 스캔은 무료, 내용물 스캔은 별도 옵션 신청 후 제공합니다.</li>
              <li>도착 후 30일 이상 미수령 우편물은 회사 정책에 따라 처리됩니다.</li>
            </ul>
          ),
        },
        {
          id: "abuse",
          title: "서비스 부적절 이용 시 조치",
          body: (
            <p>
              다음의 경우 회사는 사전 통지 후 서비스 이용을 제한·해지할 수
              있습니다: 사업자등록 외 목적의 명의 도용, 불법 영업 활동의 거점
              사용, 회사 또는 타 이용자에 대한 권리 침해 행위.
            </p>
          ),
        },
        {
          id: "refund",
          title: "환불 정책",
          body: (
            <p>
              연간 계약은 잔여 기간 일할 계산하여 환불하며, 월간 계약은 다음
              결제일 기준 자동 종료됩니다. 환불은 해지일 기준 영업일 7일 이내
              처리됩니다.
            </p>
          ),
        },
        {
          id: "complaint",
          title: "민원 처리 절차",
          body: (
            <p>
              이용자는 마이페이지의 1:1 문의 또는 고객센터(1833-0000)를 통해
              민원을 접수할 수 있으며, 회사는 영업일 기준 3일 이내 답변합니다.
            </p>
          ),
        },
      ]}
    />
  );
}
