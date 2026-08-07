"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthShell } from "@/components/AuthShell";
import { Field } from "@/components/ui/Field";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/auth/callback?next=/auth/update-password`
            : undefined,
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "메일 전송 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="비밀번호 찾기"
      subtitle="가입한 이메일로 비밀번호 재설정 링크를 보내드립니다."
      footer={
        <>
          이메일이 기억나지 않나요?{" "}
          <Link href="/find-email" className="font-bold text-accent hover:text-accent-strong">
            아이디(이메일) 찾기
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="rounded-xl border border-accent/40 bg-accent/5 p-6 text-center">
          <p className="text-lg font-bold text-foreground">✉️ 메일을 보냈습니다</p>
          <p className="mt-2 text-sm text-muted">
            메일의 링크를 눌러 새 비밀번호를 설정해주세요. 메일이 보이지 않으면
            스팸함도 확인해주세요.
          </p>
          <Link
            href="/login"
            className="mt-5 inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-on-dark hover:bg-accent-strong"
          >
            로그인으로 이동
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="이메일" name="email" type="email" placeholder="you@example.com" required autoComplete="email" />

          {error && (
            <p className="rounded-lg bg-red-500/15 px-4 py-3 text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-accent py-3.5 font-bold text-on-dark transition-colors hover:bg-accent-strong disabled:opacity-60"
          >
            {loading ? "전송 중…" : "재설정 메일 보내기"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
