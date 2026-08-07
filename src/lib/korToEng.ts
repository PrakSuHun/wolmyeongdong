/** 한글 키보드(두벌식)로 잘못 입력한 글자를 같은 자판의 영문으로 변환한다.
 *  예: "ㅎㅗㅐ"/"홍" 처럼 한글로 쳐도 영문 키(g,h,d...)로 바꿔준다.
 *  영문·숫자·기타 문자는 그대로 둔다. */

const CHO = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const JUNG = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
const JONG = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

const JAMO_TO_ENG: Record<string, string> = {
  // 자음
  ㄱ:"r", ㄲ:"R", ㄴ:"s", ㄷ:"e", ㄸ:"E", ㄹ:"f", ㅁ:"a", ㅂ:"q", ㅃ:"Q",
  ㅅ:"t", ㅆ:"T", ㅇ:"d", ㅈ:"w", ㅉ:"W", ㅊ:"c", ㅋ:"z", ㅌ:"x", ㅍ:"v", ㅎ:"g",
  // 모음
  ㅏ:"k", ㅐ:"o", ㅑ:"i", ㅒ:"O", ㅓ:"j", ㅔ:"p", ㅕ:"u", ㅖ:"P", ㅗ:"h",
  ㅛ:"y", ㅜ:"n", ㅠ:"b", ㅡ:"m", ㅣ:"l",
  // 복합 모음
  ㅘ:"hk", ㅙ:"ho", ㅚ:"hl", ㅝ:"nj", ㅞ:"np", ㅟ:"nl", ㅢ:"ml",
  // 복합 받침
  ㄳ:"rt", ㄵ:"sw", ㄶ:"sg", ㄺ:"fr", ㄻ:"fa", ㄼ:"fq", ㄽ:"ft", ㄾ:"fx", ㄿ:"fv", ㅀ:"fg", ㅄ:"qt",
};

export function korToEng(input: string): string {
  let out = "";
  for (const ch of input) {
    const code = ch.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      // 완성형 한글 → 초/중/종성 분해
      const s = code - 0xac00;
      const cho = Math.floor(s / 588);
      const jung = Math.floor((s % 588) / 28);
      const jong = s % 28;
      out +=
        (JAMO_TO_ENG[CHO[cho]] || "") +
        (JAMO_TO_ENG[JUNG[jung]] || "") +
        (jong ? JAMO_TO_ENG[JONG[jong]] || "" : "");
    } else if (JAMO_TO_ENG[ch]) {
      // 낱자 자모
      out += JAMO_TO_ENG[ch];
    } else {
      out += ch;
    }
  }
  return out;
}
