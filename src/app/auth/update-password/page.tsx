"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthShell } from "@/components/AuthShell";
import { Field } from "@/components/ui/Field";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // 복구 세션 확인 (이메일 링크 → /auth/callback 에서 세션 교환 후 진입)
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      setReady(!!data.session);
    });
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password") || "");
    const password2 = String(form.get("password2") || "");
    if (password !== password2) return setError("비밀번호가 일치하지 않습니다.");

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "변경 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="새 비밀번호 설정"
      subtitle="새로 사용할 비밀번호를 입력해주세요."
      footer={null}
    >
      {done ? (
        <div className="rounded-xl border border-accent/40 bg-accent/5 p-6 text-center">
          <p className="text-lg font-bold text-foreground">✅ 비밀번호가 변경되었습니다</p>
          <p className="mt-2 text-sm text-muted">새 비밀번호로 로그인해주세요.</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-5 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-on-dark hover:bg-accent-strong"
          >
            로그인하러 가기
          </button>
        </div>
      ) : !ready ? (
        <p className="rounded-lg bg-amber-500/15 px-4 py-3 text-sm text-amber-700">
          유효한 비밀번호 재설정 링크로 접속해야 합니다. 비밀번호 찾기를 통해
          받은 메일의 링크를 다시 눌러주세요.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="새 비밀번호" name="password" type="password" placeholder="6자 이상" required minLength={6} autoComplete="new-password" />
          <Field label="새 비밀번호 확인" name="password2" type="password" placeholder="비밀번호 재입력" required minLength={6} autoComplete="new-password" />

          {error && (
            <p className="rounded-lg bg-red-500/15 px-4 py-3 text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-accent py-3.5 font-bold text-on-dark transition-colors hover:bg-accent-strong disabled:opacity-60"
          >
            {loading ? "변경 중…" : "비밀번호 변경"}
          </button>
        </form>
      )}
    </AuthShell>
  );
}
