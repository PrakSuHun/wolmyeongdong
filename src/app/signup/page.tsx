"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/lib/useUser";
import { idToEmail, validateId } from "@/lib/authId";
import { korToEng } from "@/lib/korToEng";
import { AuthShell } from "@/components/AuthShell";
import { Field } from "@/components/ui/Field";

/** 숫자만 남겨 010-1234-5678 형태로 하이픈을 자동으로 붙인다. */
function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length < 4) return d;
  if (d.length < 8) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

/** 구독 완료 화면의 색종이(컨페티) 조각 — 체크 아이콘 주변에 흩뿌린다. */
const CONFETTI = [
  { c: "bg-emerald-400", s: "left-[18%] top-1 h-2.5 w-2.5 rotate-12" },
  { c: "bg-amber-300", s: "left-[10%] top-10 h-2 w-3 -rotate-12" },
  { c: "bg-rose-400", s: "left-[6%] top-20 h-2.5 w-2.5 rotate-45" },
  { c: "bg-emerald-300", s: "left-[27%] top-6 h-2 w-2 rotate-45" },
  { c: "bg-pink-400", s: "left-[15%] top-16 h-2 w-2 rounded-full" },
  { c: "bg-amber-300", s: "right-[18%] top-1 h-2.5 w-2.5 -rotate-12" },
  { c: "bg-emerald-400", s: "right-[10%] top-10 h-2 w-3 rotate-12" },
  { c: "bg-rose-300", s: "right-[6%] top-20 h-2.5 w-2.5 rotate-45" },
  { c: "bg-amber-200", s: "right-[27%] top-6 h-2 w-2 rotate-45" },
  { c: "bg-emerald-300", s: "right-[15%] top-16 h-2 w-2 rounded-full" },
];

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  );
}

/** CAFE / COUPON 문구가 든 빨간 티켓 아이콘 */
function CouponTicket() {
  return (
    <div className="relative mx-auto inline-flex h-11 w-16 items-center justify-center rounded-md bg-gradient-to-b from-rose-400 to-rose-500 shadow-sm shadow-rose-500/30">
      <span className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-emerald-50" />
      <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-emerald-50" />
      <div className="text-center leading-none text-white">
        <p className="text-[0.5rem] font-extrabold tracking-wider">CAFE</p>
        <p className="mt-0.5 text-[0.5rem] font-extrabold tracking-wider">COUPON</p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const { user, ready } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [gender, setGender] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [phone, setPhone] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [memberName, setMemberName] = useState("");
  const [testMode, setTestMode] = useState(false);
  // 가입 처리 중에는 홈 리다이렉트를 막는 잠금장치.
  // (가입 성공 → 세션 생성으로 user가 채워지는 순간과, 완료 화면(done) 표시 사이에
  //  아래 useEffect가 끼어들어 홈으로 튕겨 쿠폰 화면을 못 보던 경쟁 조건을 차단한다.)
  const [submitting, setSubmitting] = useState(false);

  // 이미 로그인한 회원은 회원가입 페이지에 머물 필요가 없다.
  // 단, 지금 막 가입을 진행 중(submitting)이거나 완료 화면(done)일 때는 절대 보내지 않는다.
  useEffect(() => {
    if (ready && user && !done && !submitting) router.replace("/");
  }, [ready, user, done, submitting, router]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const loginId = String(form.get("login_id") || "").trim();
    const name = String(form.get("name") || "").trim();
    const phoneVal = String(form.get("phone") || "").trim();
    const password = String(form.get("password") || "");
    const password2 = String(form.get("password2") || "");

    // 🧪 테스트 모드: 아이디에 'test' 입력 시 DB 저장 없이 완료 화면만 표시
    if (loginId.toLowerCase() === "test") {
      setError(null);
      setTestMode(true);
      setMemberName(name || "테스트");
      setDone(true);
      return;
    }

    const idErr = validateId(loginId);
    if (idErr) return setError(idErr);
    if (!name) return setError("이름을 입력해주세요.");
    if (password.length < 6) return setError("비밀번호는 6자 이상으로 입력해주세요.");
    if (password !== password2) return setError("비밀번호가 일치하지 않습니다.");
    if (!phoneVal) return setError("연락처를 입력해주세요.");
    if (!gender) return setError("성별을 선택해주세요.");
    if (!agreed) return setError("개인정보 수집·이용에 동의해주세요.");

    setLoading(true);
    // 여기부터 가입 성공 시 세션이 생겨 user가 채워진다.
    // 완료 화면(done)을 켜기 전까지 홈 리다이렉트를 막아 쿠폰 화면을 반드시 보이게 한다.
    setSubmitting(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: idToEmail(loginId),
        password,
        options: {
          data: {
            username: loginId.toLowerCase(),
            full_name: name,
            gender,
            phone: phoneVal,
            source: "wolmyeongdong",
          },
        },
      });
      if (error) {
        // 이미 가입된 아이디 = 같은 회원의 재신청(매 행사 신청 분위기용).
        // 계정을 새로 만들 수 없고 명단 중복도 원치 않으므로, DB 저장은 건너뛰고
        // 쿠폰 화면만 그대로 띄워준다. (신청 폼처럼 매번 쿠폰이 나오게)
        if (/already registered|already exists|registered/i.test(error.message)) {
          setMemberName(name);
          setDone(true);
          return;
        }
        throw error;
      }
      const newId = data.user?.id ?? null;
      // 가입 즉시 CNUcare 원회원(=일반회원) 테이블에 등록.
      // 완료 화면(=쿠폰)으로 넘어가기 전에 await 해서 등록 누락을 막는다.
      // (예전엔 백그라운드 void 호출이라, 사용자가 바로 이탈하면 명단에 안 들어가는 일이 있었음)
      if (newId) {
        const { error: regErr } = await supabase.rpc("register_general_member", {
          p_user_id: newId,
        });
        // 등록 실패해도 쿠폰(완료 화면)은 막지 않되, 원인 파악용으로 남긴다.
        if (regErr) console.error("원회원 등록 실패:", regErr.message);
      }
      setMemberName(name);
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
      // 완료(done)면 done이 리다이렉트를 막으므로 잠금을 풀어도 안전하고,
      // 실패면 어차피 세션이 없어 리다이렉트가 일어나지 않는다.
      setSubmitting(false);
    }
  }

  // 구독 완료 — 현장 직원에게 보여주고 카페 쿠폰을 받는 인증 화면 (레퍼런스 디자인)
  // 헤더·푸터 위를 완전히 덮는 전용 전체화면(fixed inset-0)으로 렌더한다.
  if (done) {
    // 다크모드와 무관하게 항상 밝은 레퍼런스 톤으로 렌더 (직원 제시용 인증 화면)
    return (
      <div className="fixed inset-0 z-[60] overflow-y-auto overflow-x-hidden bg-gradient-to-b from-emerald-50 via-white to-white">
        {/* 부드러운 초록 배경 블롭 (컨테이너 안에 가둬 가로 넘침 방지) */}
        <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

        <div className="flex min-h-full items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
          <div className="relative w-full max-w-lg fade-up rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-xl shadow-emerald-900/5 backdrop-blur sm:p-12">
            {/* 체크 아이콘 + 컨페티 */}
            <div className="relative mx-auto flex flex-col items-center">
              {CONFETTI.map((p, i) => (
                <span key={i} aria-hidden className={`absolute rounded-[2px] ${p.c} ${p.s}`} />
              ))}
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/30 sm:h-24 sm:w-24">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 sm:h-12 sm:w-12">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="mt-5 text-3xl font-extrabold text-neutral-900 sm:mt-6 sm:text-5xl">구독 완료!</h1>
              {memberName && (
                <p className="mt-2 text-lg font-bold text-emerald-600 sm:text-xl">
                  {memberName} 님
                </p>
              )}
            </div>

            {/* 카페 쿠폰 인증 카드 */}
            <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50/60 px-5 py-6 text-center sm:mt-8 sm:px-6 sm:py-7">
              <div>
                <CouponTicket />
                <p className="mt-3 text-base font-extrabold text-neutral-900 sm:text-lg">이 화면을 직원에게 보여주세요</p>
                <p className="mt-1.5 text-sm text-neutral-500">
                  구독 확인 후 <b className="text-emerald-600">카페 쿠폰</b>을 드립니다.
                </p>
              </div>
            </div>

            {testMode && (
              <p className="mt-4 text-center text-xs font-bold text-emerald-600">
                🧪 테스트 화면 · 실제로 저장되지 않았습니다
              </p>
            )}

            <button
              onClick={() => {
                router.push("/");
                router.refresh();
              }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white py-3.5 text-base font-bold text-neutral-900 transition-colors hover:border-emerald-400 hover:text-emerald-600 sm:mt-7 sm:py-4"
            >
              <HomeIcon className="h-5 w-5 text-emerald-600" />
              홈으로 가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthShell
      title="구독하기"
      subtitle="네이처 스테이의 회원이 되어 특별한 혜택을 누리세요."
      footer={
        <>
          이미 회원이신가요?{" "}
          <Link href="/login" className="font-bold text-accent hover:text-accent-strong">
            로그인
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
          <Field
            label="아이디"
            name="login_id"
            type="text"
            placeholder="원하는 아이디"
            required
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            value={loginId}
            onChange={(e) => setLoginId(korToEng(e.target.value))}
          />
          <Field
            label="비밀번호"
            name="password"
            type="password"
            placeholder="6자 이상"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(korToEng(e.target.value))}
          />
          <Field
            label="비밀번호 확인"
            name="password2"
            type="password"
            placeholder="비밀번호 재입력"
            required
            minLength={6}
            autoComplete="new-password"
            value={password2}
            onChange={(e) => setPassword2(korToEng(e.target.value))}
          />
          <Field label="이름" name="name" type="text" placeholder="홍길동" required autoComplete="name" />

          <div>
            <span className="mb-2 block text-sm font-medium text-foreground/90">성별</span>
            <div className="flex gap-2">
              {["남", "여"].map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => setGender(g)}
                  className={`flex-1 rounded-xl border py-3 text-sm font-semibold transition-colors ${
                    gender === g
                      ? "border-accent bg-accent text-on-dark"
                      : "border-border bg-surface text-muted hover:text-foreground"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Field
              label="연락처"
              name="phone"
              type="tel"
              inputMode="numeric"
              placeholder="010-1234-5678"
              required
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
            />
            <p className="mt-1.5 text-xs text-muted/80">
              행사 홍보 발송 목적 외에 다른 용도로 사용되지 않습니다.
            </p>
          </div>

          {/* 개인정보 수집·이용 동의 (필수) */}
          <label className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 text-sm">
            <input
              type="checkbox"
              name="privacy_agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-accent"
            />
            <span className="text-muted">
              <span className="font-semibold text-foreground">[필수]</span> 개인정보 수집·이용에 동의합니다.
              <span className="mt-0.5 block text-xs text-muted/80">
                수집 항목: 아이디·이름·성별·연락처 / 목적: 회원 관리 및 행사 안내 / 보유: 회원 탈퇴 시까지
              </span>
            </span>
          </label>

          {error && (
            <p className="rounded-lg bg-red-500/15 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !agreed}
            className="w-full rounded-full bg-accent py-3.5 font-bold text-on-dark transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "구독 처리 중…" : "구독하기"}
          </button>
        </form>
    </AuthShell>
  );
}
