"use client";

import { useEffect, useState } from "react";

type Slice = { label: string; img: string };

export function SeasonViewer({ slices }: { slices: Slice[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slices.length;
  const go = (i: number) => setActive(((i % n) + n) % n);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % n), 4000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <>
      {/* ── 모바일: 뷰어(캐러셀) ── */}
      <div className="md:hidden">
        <div
          className="relative overflow-hidden rounded-3xl"
          onTouchStart={() => setPaused(true)}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {slices.map((s) => (
              <div key={s.label} className="relative h-72 w-full shrink-0">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-2xl font-bold text-white">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => go(active - 1)}
            aria-label="이전"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm"
          >
            ‹
          </button>
          <button
            onClick={() => go(active + 1)}
            aria-label="다음"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm"
          >
            ›
          </button>

          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <div className="flex gap-1.5">
              {slices.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => go(i)}
                  aria-label={`${s.label}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-5 bg-white" : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
            <span className="rounded-full bg-black/40 px-2 py-0.5 text-[0.7rem] font-bold text-white backdrop-blur-sm">
              {active + 1} / {n}
            </span>
          </div>
        </div>
      </div>

      {/* ── 데스크톱: 호버 확장 5분할 ── */}
      <div className="hidden h-80 gap-2 overflow-hidden rounded-3xl md:flex">
        {slices.map((s) => (
          <div
            key={s.label}
            className="group relative flex-1 cursor-pointer overflow-hidden transition-all duration-500 hover:flex-[2.5]"
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.img})` }} />
            <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-lg font-bold text-white">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
