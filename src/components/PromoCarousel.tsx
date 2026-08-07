"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useUser, displayNameOf } from "@/lib/useUser";

type Slide = {
  badge: string;
  tone: string;
  emoji: string;
  title: string;
  highlight: string;
  date: string;
  img: string;
  status: "live" | "soon";
  /** 신청 페이지 경로 — 진행 중(live)이고 신청 가능한 행사만 가진다. */
  href?: string;
};

const toneClass: Record<string, string> = {
  event: "bg-emerald-500",
  member: "bg-indigo-500",
  hot: "bg-rose-500",
  new: "bg-amber-500",
};

const slides: Slide[] = [
  {
    badge: "상시 모집",
    tone: "member",
    emoji: "🌿",
    title: "템플스테이",
    highlight: "일상을 벗어나 나를 알아가는 시간",
    date: "상시 모집 중",
    img: "/promo-chapel.jpg",
    status: "live",
    href: "/events/templestay",
  },
  {
    badge: "여름 행사",
    tone: "event",
    emoji: "🏡",
    title: "촌캉스",
    highlight: "고기 먹고, 별 보러 가자",
    date: "7/26 (일) · 대전 출발",
    img: "/promo-chon.jpg",
    status: "soon",
  },
  {
    badge: "여름 행사",
    tone: "hot",
    emoji: "🌊",
    title: "썸머 워터파크",
    highlight: "산수화 속 호수 수영장 개장",
    date: "8/15 (토) · 10–18시",
    img: "/waterplay.jpg",
    status: "soon",
  },
  {
    badge: "가을 행사",
    tone: "new",
    emoji: "🍁",
    title: "단풍 축제",
    highlight: "울긋불긋 물든 가을 속으로",
    date: "10월 예정",
    img: "/maple.jpg",
    status: "soon",
  },
];

export function PromoCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const { user, ready } = useUser();
  const loggedIn = ready && !!user;
  const n = slides.length;
  const touchX = useRef<number | null>(null);

  const go = (i: number) => setActive(((i % n) + n) % n);

  const onTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx > 40) go(active - 1);
    else if (dx < -40) go(active + 1);
    touchX.current = null;
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % n), 5000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* 슬라이드 트랙 */}
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {slides.map((s) => (
            <div key={s.title} className="relative h-[320px] w-full shrink-0 sm:h-[440px]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.img})` }} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />

              <div className="absolute inset-0 flex items-center">
                <div className="px-6 sm:px-14">
                  <div className="flex items-center gap-2">
                    {s.status === "live" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                        진행 중
                      </span>
                    ) : (
                      <span className="rounded-full bg-white/20 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white ring-1 ring-white/40 backdrop-blur-sm">
                        오픈예정
                      </span>
                    )}
                    <span className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white ${toneClass[s.tone]}`}>
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="mt-3 flex items-center gap-2 text-xl text-white sm:mt-4 sm:gap-3 sm:text-4xl">
                    <span>{s.emoji}</span>
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-2xl font-extrabold text-white sm:mt-2 sm:text-5xl">
                    {s.highlight}
                  </p>
                  <p className="mt-3 text-xs font-bold text-white/80 sm:mt-4 sm:text-sm">📅 {s.date}</p>

                  {!loggedIn ? (
                    // 비로그인 — 가입 유도
                    <Link
                      href="/signup"
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-foreground transition-colors hover:bg-white/90"
                    >
                      자세히 보기 <span aria-hidden>→</span>
                    </Link>
                  ) : s.href ? (
                    // 로그인 + 신청 가능(진행 중) 행사 → 신청 페이지로
                    <Link
                      href={s.href}
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-bold text-foreground transition-colors hover:bg-white/90"
                    >
                      신청하러 가기 <span aria-hidden>→</span>
                    </Link>
                  ) : (
                    // 로그인 + 오픈예정 행사 → 이동 없이 안내만
                    <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-white/15 px-7 py-3 text-sm font-bold text-white ring-1 ring-white/30 backdrop-blur-sm">
                      🔜 오픈예정 행사입니다
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 화살표 (모바일에선 숨김 — 텍스트 가림 방지, 점/자동전환으로 이동) */}
        <button
          onClick={() => go(active - 1)}
          aria-label="이전"
          className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50 sm:flex"
        >
          ‹
        </button>
        <button
          onClick={() => go(active + 1)}
          aria-label="다음"
          className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50 sm:flex"
        >
          ›
        </button>

        {/* 인디케이터 + 카운터 */}
        <div className="absolute bottom-5 right-6 flex items-center gap-3">
          <div className="flex gap-1.5">
            {slides.map((s, i) => (
              <button
                key={s.title}
                onClick={() => go(i)}
                aria-label={`${i + 1}번 슬라이드`}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
          <span className="rounded-full bg-black/40 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
            {active + 1} / {n}
          </span>
        </div>
      </div>

      {/* 띠배너 — 비로그인은 가입 유도, 로그인 회원은 행사 안내 */}
      <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-7 py-5 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-lg font-extrabold text-foreground">
            {loggedIn
              ? `🎉 ${displayNameOf(user)}님, 진행 중인 행사를 확인해 보세요!`
              : "🎁 구독하고 행사 소식 받으세요!"}
          </p>
          <p className="mt-0.5 text-sm text-muted">
            {loggedIn
              ? "템플스테이는 바로 신청할 수 있고, 다른 행사는 오픈 시 안내해 드려요."
              : "구독자 전용 체험과 행사 소식을 가장 먼저 안내해 드려요."}
          </p>
        </div>
        <Link
          href={loggedIn ? "/events" : "/signup"}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-on-dark transition-colors hover:bg-accent-strong"
        >
          {loggedIn ? "행사·이벤트 보러가기" : "로그인 / 구독하기"} <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
