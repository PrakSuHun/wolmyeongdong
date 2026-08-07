import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { JoinCTA } from "@/components/JoinCTA";

export const metadata = { title: "행사·이벤트 — 네이처 스테이" };

const HERO =
  "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2000&q=80";

const events = [
  {
    img: "/promo-chapel.jpg",
    badge: "상시 모집",
    status: "live",
    title: "템플스테이",
    when: "상시 모집 중 · 러닝타임 약 1시간 30분",
    lead: "일상을 벗어나 나를 알아가는 시간",
    desc: "자연 속에서 일상을 벗어나 자신을 돌아보는 힐링 프로그램입니다. 종교와 무관하게, 신앙이 없어도 누구나 가볍게 참여할 수 있어요.",
    list: [
      "① 프로그램 소개",
      "② 작품솔 가이드 — 소나무로 나의 개성 찾기",
      "③ 명상 및 소원 상자",
      "④ 나에게 쓰는 편지",
      "⑤ 조경 가이드 — 삶의 교훈",
      "⑥ 카페 차담",
    ],
  },
  {
    img: "/forest.jpg",
    badge: "가을 축제",
    status: "soon",
    title: "가을 동굴 탐험 축제",
    when: "2026 가을 예정",
    lead: "신비로운 동굴 속으로 떠나는 가을 탐험",
    desc: "가을을 맞아 네이처 스테이의 신비로운 동굴을 탐험하는 축제입니다. 자연이 만든 동굴 속에서 색다른 가을을 만나보세요.",
    list: [
      "동굴 탐험 코스",
      "가을 자연 해설 가이드",
      "회원 우선 안내",
    ],
  },
  {
    img: "/maple.jpg",
    badge: "가을 축제",
    status: "soon",
    title: "가을 단풍 바베큐 파티",
    when: "2026. 10월 단풍 절정 시즌",
    lead: "단풍 즐기며 군밤 먹고, 통돼지 바베큐까지",
    desc: "이 근방은 대둔산 단풍으로 유명한 단풍 명소예요. 알록달록 물든 단풍을 즐기며 군밤도 먹고, 통돼지 바베큐 파티까지 열리는 가을 대표 축제입니다.",
    list: [
      "단풍 절정 시즌 운영",
      "군밤 & 통돼지 바베큐",
      "가을 포토존",
    ],
  },
  {
    img: "/stargazing.jpg",
    badge: "가을 축제",
    status: "soon",
    title: "가을밤 별보기 축제",
    when: "2026 가을밤 예정",
    lead: "쏟아지는 별과 별똥별, 그리고 천체망원경",
    desc: "산속이라 밤이 되면 별이 정말 많이 떠요. 특히 가을엔 별똥별도 떨어지죠. 잔디밭에 돗자리를 깔고 누워 별을 보고, 천체망원경도 준비되어 있어 별을 좋아하는 분들께 인기예요.",
    list: [
      "잔디밭 돗자리 별 관측",
      "천체망원경 체험",
      "가을 별똥별 시즌",
    ],
  },
  {
    img: "/snow.jpg",
    badge: "겨울 축제",
    status: "soon",
    title: "겨울 얼음썰매 캠핑",
    when: "2026 겨울 예정",
    lead: "호수 얼음썰매 · 잔디밭 눈썰매, 무료로 마음껏",
    desc: "여름에 수영하던 호수가 겨울엔 꽁꽁 얼어 썰매장이 됩니다. 얼음썰매도 타고, 잔디밭에 눈이 쌓이면 눈썰매장으로 변신해요. 군밤·군고구마 잔치와 함께, 돈 안 내고 마음껏 즐기는 신나는 겨울 축제입니다.",
    list: [
      "호수 얼음썰매 · 잔디밭 눈썰매",
      "군밤 & 군고구마 잔치",
      "무료 이용",
    ],
  },
  {
    img: "/symbol-pine.jpg",
    badge: "문화 축제",
    status: "soon",
    title: "돌 · 나무 축제 & 음악회",
    when: "시즌별 예정",
    lead: "네이처 스테이에서 열리는 다채로운 문화 축제",
    desc: "돌축제, 나무축제, 음악회 등 계절마다 다양한 문화 축제가 계속 열립니다. 여기서 열리는 새로운 행사 소식은 구독하시면 가장 먼저 받아보실 수 있어요.",
    list: [
      "돌축제 · 나무축제",
      "야외 음악회",
      "신규 행사 계속 추가",
    ],
  },
  {
    img: "/waterplay.jpg",
    badge: "여름 행사",
    status: "soon",
    title: "썸머 워터파크",
    when: "2026. 8. 15 (토) · 10:00 – 18:00",
    lead: "산수화 속 호수 수영장",
    desc: "최고의 산수화 속 호수 수영장에서 즐기는 짜릿한 여름. 진짜 신선놀음이 뭔지 보여줄게요. Fill you up!",
    list: [
      "개장 10:00 – 18:00",
      "자연 속 대형 호수 수영장",
      "여름 한정 운영",
    ],
  },
];

const posts = [
  { img: "/garden.jpg", cat: "행사", title: "봄꽃 축제, 네이처 스테이에 봄이 왔습니다", excerpt: "수만 송이 꽃이 만발한 꽃동산에서 열리는 봄맞이 축제 소식을 전합니다." },
  { img: "/night.jpg", cat: "이야기", title: "별이 쏟아지는 밤, 네이처 스테이의 야경", excerpt: "도시에서는 볼 수 없는 은하수와 별빛 가득한 밤하늘을 소개합니다." },
  { img: "/maple.jpg", cat: "행사", title: "가을 단풍맞이 사진 공모전", excerpt: "네이처 스테이의 가을을 담아주세요. 회원 대상 사진 공모전을 진행합니다." },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        title="행사 · 이벤트"
        subtitle="충남의 청년·대학생을 위한 익사이팅한 행사를 만나보세요."
        image={HERO}
      />

      {/* 진행 중인 행사 */}
      <section className="pt-16 pb-10 sm:pt-24 sm:pb-12">
        <div className="container-x">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">Now Happening</p>
            <h2 className="text-4xl text-foreground sm:text-5xl">진행 중인 행사</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              네이처 스테이에서만 누리는 특별한 행사. 회원이라면 누구나 함께할 수 있어요.
            </p>
          </div>

          <div className="space-y-12 lg:space-y-16">
            {events.map((e, i) => (
              <article
                key={e.title}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
              >
                <div
                  className={`relative h-64 overflow-hidden rounded-3xl shadow-lg shadow-black/10 sm:h-80 ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${e.img})` }}
                  />
                  <span className="absolute left-5 top-5 rounded-full bg-accent/90 px-3 py-1 text-xs font-bold text-background">
                    {e.badge}
                  </span>
                  {e.status === "live" ? (
                    <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                      진행 중
                    </span>
                  ) : (
                    <span className="absolute right-5 top-5 rounded-full bg-black/55 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/30 backdrop-blur-sm">
                      오픈예정
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-sm font-bold text-muted">{e.when}</p>
                  <h3 className="mt-2 text-3xl text-foreground sm:text-4xl">{e.title}</h3>
                  <p className="mt-2 text-lg font-extrabold text-accent">“{e.lead}”</p>
                  <p className="mt-4 leading-relaxed text-muted">{e.desc}</p>
                  <ul className="mt-6 space-y-2">
                    {e.list.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-foreground">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {e.status === "live" ? (
                    <Link
                      href="/events/templestay"
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-on-dark transition-colors hover:bg-accent-strong"
                    >
                      회원 신청하기 <span aria-hidden>→</span>
                    </Link>
                  ) : (
                    <p className="mt-7 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-bold text-muted">
                      🔜 오픈 예정
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 행사 소식 */}
      <section className="pt-10 pb-16 sm:pt-12 sm:pb-24">
        <div className="container-x">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">News</p>
            <h2 className="text-4xl text-foreground sm:text-5xl">행사 소식</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <article
                key={p.title}
                className="group overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/50"
              >
                <div className="relative h-52 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${p.img})` }}
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {p.cat}
                  </span>
                  <h3 className="mt-2 text-xl text-foreground">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <JoinCTA />
    </>
  );
}
