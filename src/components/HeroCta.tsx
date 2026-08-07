"use client";

import Link from "next/link";
import { useUser } from "@/lib/useUser";

/** 홈 히어로의 메인 버튼 — 로그인 회원은 체험 둘러보기, 비로그인은 가입으로. */
export function HeroCta() {
  const { user, ready } = useUser();
  const loggedIn = ready && !!user;

  return (
    <Link
      href={loggedIn ? "/explore" : "/signup"}
      className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-foreground transition-colors hover:bg-white/90"
    >
      {loggedIn ? "체험 둘러보기" : "지금 구독하기"} <span aria-hidden>→</span>
    </Link>
  );
}
