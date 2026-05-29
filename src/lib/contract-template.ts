/**
 * 사무실 시설 사용 계약서 (고객용) helpers — operator (임차인) constants and
 * date/period derivation used by the printable contract at /contract/[moid].
 */

/** 운영사 = 계약서상 "임차인". 푸터의 사업자 정보와 일치. */
export const LESSEE = {
  company: "(주)아이엔지스토리",
  brand: "작심스페이스",
  ceo: "강남구",
  bizRegNo: "307-81-42763",
  address: "서울시 강남구 테헤란로111 대건빌딩 5층 아이엔지스토리",
  tel: "1670-0452",
  email: "zaksimoffice@gmail.com",
} as const;

/** 호수 숫자를 "101호" 형태로 표기. */
export function unitLabel(unitNo?: number): string {
  return typeof unitNo === "number" ? `${unitNo}호` : "";
}

/** 비상주용 주소 = 지점 소재지 + 호수. */
export function virtualAddress(branchAddr: string, unitNo?: number): string {
  const u = unitLabel(unitNo);
  return u ? `${branchAddr} ${u}` : branchAddr;
}

/** YYYY-MM-DD → "YYYY년 M월 D일". 빈 값이면 빈 문자열. */
export function krDate(iso?: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}

/** 시작일 + 개월수 → 종료일(ISO). 종료일은 시작일 + N개월 - 1일. */
export function contractEndISO(startISO: string, months: number): string {
  const [y, m, d] = startISO.split("-").map(Number);
  if (!y || !m || !d) return "";
  // UTC math avoids the local→UTC day shift that toISOString() would cause.
  const end = new Date(Date.UTC(y, m - 1, d));
  end.setUTCMonth(end.getUTCMonth() + months);
  end.setUTCDate(end.getUTCDate() - 1);
  return end.toISOString().slice(0, 10);
}

/** 금액 → 한글 표기 도우미 (예: 250,000 → "이십오만"). 만 단위까지만 처리. */
export function krAmountWords(amount: number): string {
  const units = ["", "만", "억"];
  const digits = ["영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
  const small = ["", "십", "백", "천"];
  if (amount === 0) return "영";
  const groups: number[] = [];
  let n = amount;
  while (n > 0) {
    groups.push(n % 10000);
    n = Math.floor(n / 10000);
  }
  const parts: string[] = [];
  for (let g = groups.length - 1; g >= 0; g--) {
    const grp = groups[g];
    if (grp === 0) continue;
    let s = "";
    const gd = String(grp).padStart(4, "0").split("").map(Number);
    for (let i = 0; i < 4; i++) {
      const d = gd[i];
      if (d === 0) continue;
      s += (d === 1 && small[3 - i] ? "" : digits[d]) + small[3 - i];
    }
    parts.push(s + units[g]);
  }
  return parts.join("");
}
