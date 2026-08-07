import { PageHero } from "@/components/PageHero";
import { JoinCTA } from "@/components/JoinCTA";
import { UsageGuide } from "@/components/UsageGuide";

export const metadata = { title: "소개 — 네이처 스테이" };

const values = [
  { icon: "🌿", title: "자연 그대로", desc: "30여 년간 손수 가꿔온 산과 호수, 정원이 사계절 다른 얼굴로 맞이합니다." },
  { icon: "🧘", title: "쉼과 회복", desc: "분주한 일상을 내려놓고 몸과 마음을 회복하는 시간을 선물합니다." },
  { icon: "🌟", title: "성장의 경험", desc: "다양한 프로그램과 만남 속에서 새로운 나를 발견합니다." },
];

const IMG = {
  story: "/about-story.jpg",
};

const contact = [
  { label: "주소", value: "충남 금산군 진산면" },
  { label: "전화", value: "063-000-0000" },
  { label: "이메일", value: "contact@wolmyeong.kr" },
  { label: "운영 시간", value: "매일 09:00 – 18:00" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="네이처 스테이 소개"
        subtitle="자연 속에서 만나는 새로운 나, 네이처 스테이입니다."
        video="/about.mp4"
        poster="/about-poster.jpg"
      />

      <section className="py-16 sm:py-24">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow mb-3">Our Story</p>
            <h2 className="text-4xl text-foreground sm:text-5xl">
              자연과 사람이
              <br />
              함께 성장하는 곳
            </h2>
            <p className="mt-6 leading-relaxed text-muted">
              네이처 스테이는 깊은 산자락의 맑은 자연 속에 자리합니다. 봄이면
              꽃이 만발하고, 여름엔 시원한 계곡이 흐르며, 가을엔 단풍이, 겨울엔
              순백의 설경이 펼쳐집니다.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              이곳을 찾는 모든 분이 자연의 아름다움 속에서 쉼을 얻고, 다양한
              사람들과 어울리며 새로운 활력을 채워가길 바랍니다.
            </p>
          </div>
          <div
            className="h-96 rounded-3xl bg-cover bg-center"
            style={{ backgroundImage: `url(${IMG.story})` }}
          />
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-border bg-surface p-8"
            >
              <div className="text-4xl">{v.icon}</div>
              <h3 className="mt-5 text-2xl text-foreground">{v.title}</h3>
              <p className="mt-3 text-muted">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 이용 안내 (방문 에티켓) */}
      <UsageGuide />

      {/* 오시는 길 */}
      <section className="border-t border-border bg-surface py-16 sm:py-24">
        <div className="container-x">
          <div className="mb-10 text-center">
            <p className="eyebrow mb-3">Location</p>
            <h2 className="text-4xl text-foreground sm:text-5xl">오시는 길</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              방문 예약·단체 문의는 아래 연락처로 편하게 남겨주세요.
            </p>
          </div>
          <dl className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
            {contact.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-border bg-background p-6"
              >
                <dt className="text-sm text-muted">{c.label}</dt>
                <dd className="mt-1 text-lg text-foreground">{c.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <JoinCTA />
    </>
  );
}
