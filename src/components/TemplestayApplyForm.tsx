"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

/** 템플스테이 신청 폼 — 로그인 회원 전용 (page에서 인증 확인 후 렌더).
 *  저장은 CNUcare event_attendees (register_templestay RPC)로 들어간다. */
export function TemplestayApplyForm({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const leader_name = String(form.get("leader_name") || "").trim();
    const team_members = String(form.get("team_members") || "").trim();
    const desired_month = String(form.get("desired_month") || "").trim();
    const phone = String(form.get("phone") || "").trim();

    if (!leader_name || !team_members || !desired_month || !phone) {
      setError("모든 항목을 입력해 주세요.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.rpc("register_templestay", {
        p_name: leader_name,
        p_phone: phone,
        p_team: team_members,
        p_month: desired_month,
        p_member_email: email,
      });
      if (error) throw error;
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "신청에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-3xl border border-accent/30 bg-accent/5 p-10 text-center">
        <div className="text-5xl">🎉</div>
        <h2 className="mt-4 text-2xl text-foreground">신청이 완료되었습니다!</h2>
        <p className="mt-3 leading-relaxed text-muted">
          가이드가 기입해 주신 연락처로 직접 연락드려
          <br className="hidden sm:block" />
          자세한 일정과 시간을 맞춰드릴게요. 감사합니다 😊
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-3xl border border-border bg-surface p-7 sm:p-9"
    >
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-foreground/90">
          작성자 팀 대표 이름 <span className="text-rose-500">*</span>
        </span>
        <input
          name="leader_name"
          required
          placeholder="대표자 이름"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-foreground/90">
          같이 오는 팀원 이름 <span className="text-rose-500">*</span>
        </span>
        <textarea
          name="team_members"
          required
          rows={3}
          placeholder="함께 참여하는 팀원의 이름을 적어주세요 (예: 홍길동, 김철수)"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-foreground/90">
          원하는 달 <span className="text-rose-500">*</span>
        </span>
        <select
          name="desired_month"
          required
          defaultValue=""
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
        >
          <option value="" disabled>
            달을 선택해 주세요
          </option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
          <option value="협의">협의 후 결정</option>
        </select>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-medium text-foreground/90">
          연락처 <span className="text-rose-500">*</span>
        </span>
        <input
          name="phone"
          required
          type="tel"
          inputMode="tel"
          placeholder="010-0000-0000"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent"
        />
        <span className="mt-2 block text-xs text-muted">
          연락처를 남겨주시면 가이드가 자세한 일정과 시간을 맞춰드립니다.
        </span>
      </label>

      {error && (
        <p className="rounded-lg bg-rose-500/10 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-accent py-3.5 font-bold text-on-dark transition-colors hover:bg-accent-strong disabled:opacity-60"
      >
        {loading ? "신청 중…" : "템플스테이 신청하기"}
      </button>
    </form>
  );
}
