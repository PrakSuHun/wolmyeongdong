"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthShell } from "@/components/AuthShell";
import { Field } from "@/components/ui/Field";

export default function FindEmailPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setNotFound(false);
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();

    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.rpc("find_member_email", {
        p_name: name,
        p_phone: phone,
      });
      if (error) throw error;
      if (data) setResult(data as string);
      else setNotFound(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "조회 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="아이디(이메일) 찾기"
      subtitle="가입 시 입력한 이름과 전화번호로 가입된 이메일을 확인하세요."
      footer={
        <>
          비밀번호를 잊으셨나요?{" "}
          <Link href="/forgot-password" className="font-bold text-accent hover:text-accent-strong">
            비밀번호 찾기
          </Link>
        </>
      }
    >
      {result ? (
        <div className="rounded-xl border border-accent/40 bg-accent/5 p-6 text-center">
          <p className="text-sm text-muted">가입된 이메일</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{result}</p>
          <Link
            href="/login"
            className="mt-5 inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-on-dark hover:bg-accent-strong"
          >
            로그인하러 가기
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="이름" name="name" type="text" placeholder="홍길동" required />
          <Field label="전화번호" name="phone" type="tel" placeholder="010-1234-5678" required />

          {notFound && (
            <p className="rounded-lg bg-amber-500/15 px-4 py-3 text-sm text-amber-700">
              일치하는 회원 정보를 찾을 수 없습니다. 입력 내용을 확인해주세요.
            </p>
          )}
          {error && (
            <p className="rounded-lg bg-red-500/15 px-4 py-3 text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-accent py-3.5 font-bold text-on-dark transition-colors hover:bg-accent-strong disabled:opacity-60"
          >
            {loading ? "조회 중…" : "이메일 찾기"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
