"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/useUser";

/** QR 입장 시 뜨는 가을·겨울 축제 라인업 팝업.
 *  '동굴 탐험 체험'부터 여러 축제를 순회 노출하고, 구독 시 카페 쿠폰을 안내한다.
 *  비회원은 구독(가입)으로, 회원은 행사 페이지로 유도. */
const HIDE_KEY = "wmd_promo_festival_2026"; // "다시 보지 않기" (영구)
const SEEN_KEY = "wmd_promo_festival_seen"; // 이번 방문에 이미 봄 (세션)

// 순회 노출할 축제 라인업
const SLIDES = [
  {
    src: "/cave-tour.jpg",
    badge: "가을 축제",
    title: "동굴 탐험 체험",
    tagline: "신비로운 동굴 속으로 떠나는 가을 탐험",
  },
  {
    src: "/maple-bbq.jpg",
    badge: "가을 축제",
    title: "단풍 바베큐 파티",
    tagline: "대둔산 단풍 명소에서 군밤 · 통돼지 바베큐",
  },
  {
    src: "/stargazing.jpg",
    badge: "가을 축제",
    title: "밤 별보기 축제",
    tagline: "쏟아지는 별과 별똥별, 천체망원경까지",
  },
  {
    src: "/snow.jpg",
    badge: "겨울 축제",
    title: "얼음썰매 캠핑",
    tagline: "얼음썰매 · 눈썰매 · 군고구마 잔치, 무료로 마음껏",
  },
  {
    src: "/symbol-pine.jpg",
    badge: "문화 축제",
    title: "돌 · 나무 축제 & 음악회",
    tagline: "계속 열리는 다채로운 문화 축제",
  },
];
const SLIDE_MS = 3000;

export function EventPopup() {
  const { user, ready } = useUser();
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  // 일정 시간마다 축제를 번갈아 노출
  useEffect(() => {
    if (!open) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [open]);

  useEffect(() => {
    try {
      if (localStorage.getItem(HIDE_KEY) === "hidden") return;
      if (sessionStorage.getItem(SEEN_KEY)) return;
    } catch {
      // 스토리지 접근 불가 시에도 팝업은 노출
    }
    const t = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(t);
  }, []);

  // 열려 있는 동안 배경 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function markSeen() {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
  }

  function close() {
    markSeen();
    setOpen(false);
  }

  function hideForever() {
    try {
      localStorage.setItem(HIDE_KEY, "hidden");
    } catch {}
    setOpen(false);
  }

  if (!open) return null;

  const loggedIn = ready && !!user;
  const href = loggedIn ? "/events" : "/signup";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="가을·겨울 축제 라인업 안내"
    >
      {/* 배경 */}
      <button
        aria-label="닫기"
        onClick={close}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
      />

      {/* 카드 */}
      <div className="animate-pop-in relative w-full max-w-[22rem] overflow-hidden rounded-[1.5rem] bg-white shadow-2xl shadow-black/50 ring-1 ring-white/30">
        {/* 닫기 X */}
        <button
          onClick={close}
          aria-label="닫기"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-lg text-white backdrop-blur-sm transition-transform hover:scale-110 hover:bg-black/55"
        >
          ✕
        </button>

        {/* 상단 라벨 */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-5 py-2.5 text-center">
          <p className="text-sm font-extrabold text-white">🍂 가을 · 겨울 축제 라인업</p>
        </div>

        {/* 축제 이미지 슬라이드 (클릭 시 바로 이동) */}
        <Link href={href} onClick={markSeen} className="block">
          <div className="relative aspect-[4/5] max-h-[52vh] w-full overflow-hidden">
            {SLIDES.map((s, i) => (
              <div
                key={s.title}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === idx ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={s.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-orange-700">
                  {s.badge}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                  <h3 className="text-2xl font-extrabold text-white drop-shadow-lg">{s.title}</h3>
                  <p className="mt-1.5 text-sm font-medium text-white/90 drop-shadow">{s.tagline}</p>
                </div>
              </div>
            ))}

            {/* 인디케이터 */}
            <div className="absolute bottom-3 right-4 z-10 flex gap-1.5">
              {SLIDES.map((s, i) => (
                <button
                  key={s.title}
                  type="button"
                  aria-label={`${i + 1}번 축제`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIdx(i);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === idx ? "w-5 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </Link>

        {/* 하단 액션바 — 구독 + 카페 쿠폰 유도 */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-4">
          <p className="mb-2.5 text-center text-sm font-bold text-white">
            🎟 지금 구독하면 <b>카페 쿠폰</b>을 드려요!
          </p>
          <Link
            href={href}
            onClick={markSeen}
            className="animate-shine relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white py-3.5 text-base font-extrabold text-orange-600 shadow-lg shadow-black/20 transition-transform hover:scale-[1.03] active:scale-95"
          >
            {loggedIn ? "행사 보러가기" : "지금 구독하고 쿠폰 받기"}
            <span aria-hidden className="text-lg">🍂</span>
          </Link>
          <button
            onClick={hideForever}
            className="mt-2.5 w-full text-center text-xs font-medium text-white/80 transition-colors hover:text-white"
          >
            다시 보지 않기
          </button>
        </div>
      </div>
    </div>
  );
}
