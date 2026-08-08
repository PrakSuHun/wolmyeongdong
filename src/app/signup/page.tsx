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

  // 이미 로그인한 회원은 회원가입 페이지에 머물 필요가 없다.
  useEffect(() => {
    if (ready && user && !done) router.replace("/");
  }, [ready, user, done, router]);

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
        if (/already registered|already exists|registered/i.test(error.message)) {
          throw new Error("이미 사용 중인 아이디입니다.");
        }
        throw error;
      }
      const newId = data.user?.id ?? null;
      setMemberName(name);
      setDone(true);
      // 가입 즉시 CNUcare 원회원(=일반회원) 테이블에 등록(전화번호로 다른 행사 정보 보완).
      // 완료 화면을 막지 않도록 await 없이 백그라운드로 실행.
      if (newId) {
        void supabase.rpc("register_general_member", { p_user_id: newId });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title={done ? undefined : "구독하기"}
      subtitle={done ? undefined : "네이처 스테이의 회원이 되어 특별한 혜택을 누리세요."}
      footer={
        done ? undefined : (
          <>
            이미 회원이신가요?{" "}
            <Link href="/login" className="font-bold text-accent hover:text-accent-strong">
              로그인
            </Link>
          </>
        )
      }
    >
      {done ? (
        <div className="space-y-4">
          {/* 구독 완료 인증 — 현장 직원에게 보여주고 카페 쿠폰 받기 */}
          <div className="rounded-2xl border-2 border-emerald-400/60 bg-emerald-50/70 p-6 text-center dark:bg-emerald-400/10">
            <div className="text-5xl">✅</div>
            <p className="mt-2 text-2xl font-extrabold text-foreground">구독 완료!</p>
            {memberName && (
              <p className="mt-1 text-base font-bold text-emerald-700 dark:text-emerald-400">
                {memberName} 님
              </p>
            )}
            <div className="mt-5 rounded-xl border-2 border-dashed border-emerald-500/50 bg-background px-4 py-4">
              <p className="text-2xl">🎟</p>
              <p className="mt-1 text-base font-extrabold text-foreground">
                이 화면을 직원에게 보여주세요
              </p>
              <p className="mt-1 text-sm text-muted">
                구독 확인 후 <b className="text-foreground">카페 쿠폰</b>을 드립니다.
              </p>
            </div>
            {testMode && (
              <p className="mt-3 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                🧪 테스트 화면 · 실제로 저장되지 않았습니다
              </p>
            )}
          </div>

          <button
            onClick={() => {
              router.push("/");
              router.refresh();
            }}
            className="w-full rounded-full border border-border py-3 text-center text-sm font-semibold text-muted transition-colors hover:text-foreground"
          >
            홈으로 가기
          </button>
        </div>
      ) : (
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
      )}
    </AuthShell>
  );
}
