"use client";

import { useState } from "react";

type Card = { img: string; name: string; area: string; meta: string };

const data: Record<string, Card[]> = {
  명소: [
    { img: "/water-main.jpg", name: "월명호", area: "네이처 스테이 동편", meta: "산책 1시간" },
    { img: "/symbol-pine.jpg", name: "상징솔", area: "네이처 스테이 상징", meta: "포토존" },
    { img: "/waterplay.jpg", name: "폭포", area: "네이처 스테이 서편", meta: "여름 추천" },
    { img: "/garden.jpg", name: "꽃동산", area: "중앙 정원", meta: "포토존" },
  ],
  숙박: [
    { img: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=700&q=80", name: "숲속 한옥동", area: "남편 숙소", meta: "4인실" },
    { img: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=700&q=80", name: "전망 게스트룸", area: "본관", meta: "2인실" },
    { img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=700&q=80", name: "일출 전망동", area: "동편 언덕", meta: "커플룸" },
    { img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=80", name: "단체 세미나관", area: "대강당 옆", meta: "단체" },
  ],
  체험: [
    { img: "/yoga.jpg", name: "자연 명상", area: "야외 데크", meta: "매일 06:00" },
    { img: "/stargazing.jpg", name: "별빛 관찰", area: "별빛 광장", meta: "맑은 밤" },
    { img: "/forest.jpg", name: "숲길 트레킹", area: "치유의 숲", meta: "주말" },
    { img: "/maple.jpg", name: "사진 워크숍", area: "곳곳", meta: "월 1회" },
  ],
};

const tabs = Object.keys(data);

export function DestinationTabs() {
  const [active, setActive] = useState(tabs[0]);

  return (
    <div>
      {/* 탭 */}
      <div className="mx-auto mb-12 flex w-fit gap-1 rounded-full border border-border bg-surface p-1.5">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
              active === t
                ? "bg-accent text-on-dark"
                : "text-muted hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 카드 그리드 (세로형) */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {data[active].map((c) => (
          <div
            key={c.name}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${c.img})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 flex w-full items-end justify-between gap-2 p-5">
              <div className="min-w-0">
                <h3 className="truncate text-lg text-white">{c.name}</h3>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-white/70">
                  <span aria-hidden>📍</span>
                  {c.area}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[0.65rem] uppercase tracking-wider text-white/55">
                  안내
                </div>
                <div className="text-sm font-bold text-white">{c.meta}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
