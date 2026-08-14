import { PageHero } from "@/components/PageHero";
import { JoinCTA } from "@/components/JoinCTA";
import { SeasonViewer } from "@/components/SeasonViewer";

export const metadata = { title: "둘러보기 — 네이처 스테이" };

const HERO =
  "https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?auto=format&fit=crop&w=2000&q=80";

const slices = [
  { label: "봄", img: "/season-spring.jpg" },
  { label: "여름", img: "/season-summer.jpg" },
  { label: "가을", img: "/season-autumn.jpg" },
  { label: "겨울", img: "/season-winter.jpg" },
  { label: "밤", img: "/night.jpg" },
];

const spots = [
  { img: "/lawn-field.jpg", name: "잔디밭", tag: "잔디밭", desc: "넓게 펼쳐진 초록 잔디에 누워 하늘을 바라보며 깊은 숨을 들이쉬어보세요.", pos: "center" },
  { img: "/water-main.jpg", name: "월명호수", tag: "월명호", desc: "에메랄드 빛 물결과 시원한 폭포수. 더위도, 무거운 생각도 어느새 싸-악 씻겨내려갑니다.", pos: "center" },
  { img: "/oasis-falls.png", name: "오아시스 폭포", tag: "폭포", desc: "월명동 세 폭포 중 가장 오래된 곳. 웅장한 두 폭포와 달리 정갈하고 자연스러운 멋이 살아 있는 공간입니다.", pos: "center" },
  { img: "/rock-landscape.jpg", name: "야심작", tag: "돌조경", desc: "가로 200m·높이 35m, 세계 최대 규모의 돌조경. 수백 개의 자연석과 소나무·꽃이 어우러진 웅장한 조화로, 다섯 번 무너지고도 다시 쌓아 올린 집념의 걸작입니다.", pos: "center" },
];

export default function ExplorePage() {
  return (
    <>
      <PageHero
        title="둘러보기"
        subtitle="네이처 스테이 곳곳의 아름다운 명소를 미리 만나보세요."
        image={HERO}
      />

      <section className="py-16 sm:py-24">
        <div className="container-x">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">Spots</p>
            <h2 className="text-4xl text-foreground sm:text-5xl">대표 명소</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              네이처 스테이 곳곳의 아름다운 명소를 미리 만나보세요.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {spots.map((s) => (
              <article
                key={s.name}
                className="group overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/50"
              >
                <div className="relative h-72 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${s.img})`, backgroundPosition: s.pos }}
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-background">
                    {s.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl text-foreground">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 사계절 풍경 */}
      <section className="border-t border-border py-16 sm:py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-3">Four Seasons</p>
              <h2 className="max-w-xl text-4xl text-foreground sm:text-5xl">
                계절마다 다른 얼굴
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted">
              봄꽃, 여름 계곡, 가을 단풍, 겨울 설경까지. 언제 찾아도 새로운 풍경이
              당신을 맞이합니다.
            </p>
          </div>
          <div className="mt-10">
            <SeasonViewer slices={slices} />
          </div>
        </div>
      </section>

      <JoinCTA />
    </>
  );
}
