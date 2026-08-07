"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

/** 회원가입(=방문) 직후 받는 방문 리뷰(별점 + 소감).
 *  저장은 관리자 "일반회원" 행사 피드백으로 들어간다.
 *  참여자에겐 익명/실명 여부를 따로 알리지 않고 편하게 작성하도록 한다.
 *  onDone(submitted) — 의견을 보냈으면 true, 건너뛰면 false. */
export function PostSignupFeedback({
  userId,
  onDone,
}: {
  userId: string | null;
  onDone: (submitted: boolean) => void;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (rating < 1) {
      setError("별점을 선택해 주세요.");
      return;
    }
    if (comment.trim().length < 2) {
      setError("방문 소감을 짧게라도 남겨 주세요.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.rpc("submit_visit_feedback", {
        p_user_id: userId,
        p_rating: rating,
        p_comment: comment,
      });
      if (error) throw error;
      onDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "잠시 후 다시 시도해 주세요.");
      setLoading(false);
    }
  }

  const shown = hover || rating;

  return (
    <div className="text-center">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/15 px-3.5 py-1.5 text-xs font-extrabold text-amber-600">
        📣 방문 리뷰 이벤트
      </span>
      <h3 className="mt-3 text-xl font-extrabold text-foreground">
        오늘 네이처 스테이 방문은 좋으셨나요?
      </h3>
      <p className="mt-2 text-sm text-muted">
        방문 후기를 남겨주세요. 잠깐이면 됩니다!
      </p>
      <p className="mt-1.5 text-sm font-bold text-amber-700">
        🎁 참여 시 100% 카페 기프티콘 증정!
      </p>

      {/* 별점 */}
      <div className="mt-5 flex justify-center gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            aria-label={`${n}점`}
            className="text-4xl leading-none transition-transform hover:scale-110"
          >
            <span className={shown >= n ? "text-amber-400" : "text-border"}>★</span>
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        placeholder="방문 소감을 짧게라도 남겨주세요"
        className="mt-5 w-full rounded-xl border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent"
      />

      {error && (
        <p className="mt-3 rounded-lg bg-red-500/15 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        onClick={submit}
        disabled={loading}
        className="mt-5 w-full rounded-full bg-accent py-3.5 font-bold text-on-dark transition-colors hover:bg-accent-strong disabled:opacity-60"
      >
        {loading ? "보내는 중…" : "의견 보내기"}
      </button>
      <button
        onClick={() => onDone(false)}
        className="mt-3 w-full text-center text-sm text-muted transition-colors hover:text-foreground"
      >
        건너뛰기
      </button>
    </div>
  );
}
