import type { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "작심스페이스 개인정보 처리방침",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="개인정보 처리방침"
      effectiveDate="2026년 1월 1일"
      draftNote="본 처리방침은 표준 양식 초안입니다. 최종본은 개인정보보호위원회 가이드라인에 따라 법무 검토 후 갱신됩니다."
      intro={
        <p>
          주식회사 작심스페이스(이하 &ldquo;회사&rdquo;)는 정보주체의 개인정보를
          소중하게 다루며, 「개인정보 보호법」 등 관련 법령을 준수합니다.
        </p>
      }
      sections={[
        {
          id: "items",
          title: "수집하는 개인정보 항목",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li>회원가입 시: 이름, 이메일, 비밀번호, 휴대전화번호</li>
              <li>
                사업자 계약 시: 사업자등록번호, 상호명, 대표자명, 업종, 사업장
                주소 (선택), 결제 정보
              </li>
              <li>
                서비스 이용 중 자동 수집: IP 주소, 접속 로그, 쿠키, 기기 정보
              </li>
            </ul>
          ),
        },
        {
          id: "purpose",
          title: "개인정보의 수집 및 이용 목적",
          body: (
            <ul className="list-disc pl-5 space-y-2">
              <li>회원 식별 및 본인 확인</li>
              <li>임대차계약서 등 서비스 제공 및 계약 이행</li>
              <li>요금 정산 및 세금계산서 발급</li>
              <li>고객 문의 응대 및 공지사항 전달</li>
              <li>
                마케팅 정보 안내 (별도 동의 시) — 거부 시에도 서비스 이용 가능
              </li>
            </ul>
          ),
        },
        {
          id: "retention",
          title: "개인정보의 보유 및 이용 기간",
          body: (
            <p>
              회사는 원칙적으로 회원 탈퇴 시 개인정보를 지체 없이 파기합니다.
              다만 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다
              (전자상거래법 5년, 통신비밀보호법 3개월 등).
            </p>
          ),
        },
        {
          id: "third-party",
          title: "개인정보의 제3자 제공",
          body: (
            <p>
              회사는 정보주체의 별도 동의가 있는 경우, 법령에 특별한 규정이
              있는 경우를 제외하고는 개인정보를 제3자에게 제공하지 않습니다.
            </p>
          ),
        },
        {
          id: "rights",
          title: "정보주체의 권리와 행사 방법",
          body: (
            <p>
              정보주체는 언제든지 자신의 개인정보를 열람·정정·삭제·처리정지 할
              수 있으며, 마이페이지 또는 개인정보 보호책임자에게 요청하실 수
              있습니다.
            </p>
          ),
        },
        {
          id: "officer",
          title: "개인정보 보호책임자",
          body: (
            <ul className="list-disc pl-5 space-y-1">
              <li>책임자: 개인정보 보호책임자 (담당자 미정)</li>
              <li>이메일: privacy@zaksimspace.com</li>
              <li>전화: 1833-0000</li>
            </ul>
          ),
        },
      ]}
    />
  );
}
