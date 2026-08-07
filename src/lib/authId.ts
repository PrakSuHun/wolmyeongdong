/** 아이디 기반 로그인.
 *  Supabase 인증은 내부적으로 이메일을 요구하므로, 아이디를 "아이디@도메인" 형태의
 *  내부 이메일로 변환해 사용한다. 사용자는 이메일을 입력·확인하지 않으며, 인증 메일도 없다.
 *  (입력 시 한글은 영문으로 자동 변환되므로 아이디는 영문·숫자 형태가 된다.) */
export const ID_EMAIL_DOMAIN = "wolmyeongdong.com";

/** 이메일 local part에 안전한 문자만 남긴다(소문자화). */
function safeLocalPart(id: string): string {
  return id.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
}

/** 아이디 → 내부 이메일 */
export function idToEmail(id: string): string {
  return `${safeLocalPart(id)}@${ID_EMAIL_DOMAIN}`;
}

/** 아이디 형식 검증. 통과하면 null, 아니면 에러 메시지. (글자 제한 없음, 길이만 가드) */
export function validateId(id: string): string | null {
  const safe = safeLocalPart(id);
  if (safe.length === 0) {
    return "아이디를 입력해주세요.";
  }
  if (safe.length > 60) {
    return "아이디가 너무 길어요. 조금 더 짧게 입력해주세요.";
  }
  return null;
}
