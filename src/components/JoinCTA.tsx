"use client";

import Link from "next/link";
import { useUser, displayNameOf } from "@/lib/useUser";

const BG =
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=2000&q=80";

/** 페이지 하단 공통 배너 — 비로그인은 가입 유도, 로그인 회원은 체험 안내. */
export function JoinCTA() {
  const { user, ready } = useUser();
  const loggedIn = ready && !!user;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG})` }}
      />
      <div className="absolute inset-0 bg-black/65" />
      <div className="container-x relative text-center">
        <h2 className="mx-auto max-w-2xl whitespace-nowrap text-xl text-white sm:whitespace-normal sm:text-5xl">
          {loggedIn
            ? `${displayNameOf(user)}님, 구독자 전용 체험이 준비되어 있어요`
            : "구독자 전용 체험, 지금 시작하세요"}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-white/85">
          {loggedIn
            ? "지금 바로 구독자 전용 체험과 진행 중인 행사를 만나보세요."
            : "구독자만 누릴 수 있는 특별 체험과 프로그램 소식을 가장 먼저 받아보실 수 있습니다."}
        </p>
        <Link
          href={loggedIn ? "/explore" : "/signup"}
          className="mt-9 inline-block rounded-full bg-white px-10 py-4 font-bold text-foreground transition-colors hover:bg-white/90"
        >
          {loggedIn ? "체험 둘러보기" : "무료 구독하기"}
        </Link>
      </div>
    </section>
  );
}
