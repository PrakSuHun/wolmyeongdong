"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/lib/useUser";
import { idToEmail } from "@/lib/authId";
import { korToEng } from "@/lib/korToEng";
import { AuthShell } from "@/components/AuthShell";
import { Field } from "@/components/ui/Field";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const { user, ready } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  // 이미 로그인한 회원은 로그인 페이지에 머물 필요가 없다.
  useEffect(() => {
    if (ready && user) router.replace(next);
  }, [ready, user, next, router]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    setLoading(true);
    try {
      const supabase = createClient();
      // 🧪 테스트 계정: 아이디가 'test'면 비밀번호 없이 로그인 (내부 test 비번 자동 사용)
      const id = loginId.trim();
      const isTest = id.toLowerCase() === "test";
      const { error } = await supabase.auth.signInWithPassword({
        email: idToEmail(id),
        password: isTest ? "test1234" : password,
      });
      if (error) {
        if (/invalid login credentials/i.test(error.message)) {
          throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
        throw error;
      }
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="로그인"
      subtitle="다시 오신 것을 환영합니다. 네이처 스테이의 소식을 만나보세요."
      footer={
        <>
          아직 회원이 아니신가요?{" "}
          <Link href="/signup" className="font-semibold text-accent hover:text-accent-strong">
            구독하기
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <Field
          label="아이디"
          name="login_id"
          type="text"
          placeholder="아이디"
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
          placeholder="비밀번호"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(korToEng(e.target.value))}
        />

        {error && (
          <p className="rounded-lg bg-red-500/15 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-accent py-3.5 font-bold text-on-dark transition-colors hover:bg-accent-strong disabled:opacity-60"
        >
          {loading ? "로그인 중…" : "로그인"}
        </button>

      </form>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
