import Link from "next/link";
import { PromoCarousel } from "@/components/PromoCarousel";
import { HeroCta } from "@/components/HeroCta";
import { JoinCTA } from "@/components/JoinCTA";

const experiences = [
  { img: "/waterpark-pool.jpg", emoji: "💧", title: "썸머 워터파크", desc: "산수화 속 호수 수영장에서 즐기는 짜릿한 여름", tag: "여름", member: true },
  { img: "/cave-tour.jpg", emoji: "🔦", title: "동굴 탐험 체험", desc: "신비로운 동굴 속으로 떠나는 가을 탐험", tag: "가을", member: true },
  { img: "/maple-bbq.jpg", emoji: "🍁", title: "단풍 바베큐 파티", desc: "단풍 즐기며 군밤 먹고, 통돼지 바베큐까지", tag: "가을", member: true },
  { img: "/stargazing.jpg", emoji: "🌌", title: "밤 별보기 축제", desc: "쏟아지는 별과 별똥별을 잔디밭에 누워 바라보는 밤", tag: "밤", member: true },
  { img: "/snow.jpg?v=2", emoji: "❄️", title: "얼음썰매 캠핑", desc: "호수 얼음썰매와 잔디밭 눈썰매를 무료로 마음껏", tag: "겨울", member: true },
  { img: "/promo-chapel.jpg", emoji: "🌿", title: "템플스테이", desc: "일상을 벗어나 나를 알아가는 힐링 시간", tag: "상시", member: true },
];

export default function Home() {
  return (
    <>
      {/* ── 1. 히어로 (배경 영상) ───────────────── */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
        <div className="container-x relative pt-20">
          <div className="max-w-3xl fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              🔋 자연속 힐링
            </span>
            <h1 className="mt-5 text-white">
              <span className="block text-[2.125rem] font-extrabold sm:text-[2.5rem] md:text-[3.25rem]">
                방전된 일상,
              </span>
              <span className="mt-[8.5px] block text-[2.25rem] font-extrabold leading-[1.1] sm:mt-[14.5px] sm:text-[3.4375rem] md:text-[3.9375rem]">
                자연에서 풀충전 하자
              </span>
            </h1>
            <HeroCta />
            <div className="mt-12 grid max-w-2xl gap-6 sm:grid-cols-2">
              <p className="text-sm leading-relaxed text-white/80">
                사계절 빛나는 풍경과 익사이팅한 체험. 도시의 일상에서 벗어나
                자연 속에 충전하고 가세요.
              </p>
              <p className="text-sm leading-relaxed text-white/80">
                회원이 되면 특별 프로그램, 익사이팅한 체험을 가장 먼저 누릴 수
                있어요. 지금 함께하자!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 1.5. 진행 중인 행사 (프로모션 캐러셀) ── */}
      <section className="pt-12 pb-14 sm:pb-20">
        <div className="container-x">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="eyebrow mb-2">Now Happening</p>
              <h2 className="text-2xl text-foreground sm:text-3xl">진행 중인 행사</h2>
            </div>
          </div>
          <PromoCarousel />
        </div>
      </section>

      {/* ── 2. ⭐ 시그니처 체험 ───────────────────── */}
      <section className="section-dark py-16 sm:py-24">
        <div className="container-x">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="eyebrow mb-3">Signature Experiences</p>
            <h2 className="text-on-dark">
              <span className="block text-4xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-6xl">
                네이처 스테이
              </span>
              <span className="mt-2 block text-xl font-semibold sm:text-3xl">
                에서만 누리는 특별한 체험
              </span>
            </h2>
            <p className="mt-5 text-on-dark-muted">
              자연이 선물하는 잊지 못할 순간들. 계절마다 다른 익사이팅한 경험이
              당신을 기다립니다.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {experiences.map((e) => (
              <article
                key={e.title}
                className="group relative h-80 overflow-hidden rounded-3xl"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${e.img})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                {e.member && (
                  <div className="absolute right-5 top-5">
                    <span className="rounded-full bg-accent-strong/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white ring-1 ring-white/30">
                      구독자 전용
                    </span>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                    {e.tag}
                  </span>
                  <h3 className="mt-1.5 text-2xl text-white">{e.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{e.desc}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-3.5 font-bold text-white transition-colors hover:bg-white/10"
            >
              모든 체험 둘러보기 <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. CTA (로그인 상태에 따라 가입 유도 / 체험 안내) ── */}
      <JoinCTA />
    </>
  );
}
