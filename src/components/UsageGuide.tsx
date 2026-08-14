import {
  HeartHandshake,
  CircleCheck,
  MessageCircle,
  Users,
  Dog,
  CookingPot,
  CigaretteOff,
  Trash2,
  CameraOff,
  Sprout,
  Mountain,
  Waves,
  Leaf,
  type LucideIcon,
} from "lucide-react";

const hours = [
  { season: "동절기", time: "오전 9:00 ~ 오후 5:00" },
  { season: "하절기", time: "오전 9:00 ~ 오후 6:00" },
];

const entryNotes = [
  "사전 예약 필수",
  "방문 시간 외 출입 불가",
  "정문 안내소에서 입장 예약 확인 필수",
  "네이처 스테이 안내가 필요할 경우 안내소에 신청하시면 가이드가 친절히 안내해 드립니다.",
];

const parking = [
  "주차 무료",
  "'명막골 주차장'에 주차 후 진입로를 따라 안내소 방문",
  "네이처 스테이 내 차량 출입 및 주차 제한",
  "노약자 우선 배려 요망",
];

const banned = [
  "식물 및 곤충 채집 도구",
  "알코올 음료",
  "각종 취사도구",
  "전동휠, 전동 킥보드 등 동력 장치",
  "드론 (무인 비행 장치)",
];

const rules: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Users,
    title: "보호자 동행 필수 (어린이·노약자)",
    desc: "만 12세 이하의 어린이 및 노약자는 반드시 보호자와 동행하기 바랍니다.",
  },
  {
    icon: Dog,
    title: "반려동물 입장 제한",
    desc: "반려동물은 입장이 제한됩니다.",
  },
  {
    icon: CookingPot,
    title: "음식물 섭취는 지정 장소에서만",
    desc: "음식물 섭취는 지정된 장소(카페, 식당)에서만 가능하며, 시설 내 취사 및 야영 행위는 절대 금합니다.",
  },
  {
    icon: CigaretteOff,
    title: "전 구역 금연·금주 지역",
    desc: "음주, 흡연, 고성방가, 애정행각 등 다른 이용객에게 방해가 되는 일체의 행위를 금합니다.",
  },
  {
    icon: Trash2,
    title: "쓰레기 되가져가기 및 자율 정리",
    desc: "'쓰레기 되가져가기 운동'에 동참하여 깨끗한 네이처 스테이 만들기에 협조해 주시기 바랍니다.",
  },
  {
    icon: CameraOff,
    title: "무단 촬영 금지",
    desc: "네이처 스테이 내에서는 촬영이 금지되어 있습니다. 무단으로 촬영 시 퇴장 조치될 수 있습니다.",
  },
  {
    icon: Sprout,
    title: "자연 보호 및 활동 권장 구역 안내",
    desc: "뱀, 벌, 해충 등이 출현할 수 있으므로 주의하시기 바라며, 지정된 장소 외에는 출입을 금합니다.",
  },
  {
    icon: Mountain,
    title: "등산 시 안전 수칙 (특히 극기봉)",
    desc: "낙상 사고의 위험이 있으므로 바위나 나무에 오르는 행위를 금합니다.",
  },
  {
    icon: Waves,
    title: "연못 및 저수장 출입 금지",
    desc: "연못이나 저수장은 위험하니 출입을 금합니다.",
  },
  {
    icon: Leaf,
    title: "야생동물·식물 보호",
    desc: "허가받지 않은 야생동물의 포획이나 야생식물의 채취 행위는 처벌될 수 있으니 이를 금해 주시기 바랍니다.",
  },
];

const TEAL = "#2c7a6b";

/** 네이처 스테이 이용 안내 — 소개 페이지에 포함되는 방문 에티켓 섹션 */
export function UsageGuide() {
  return (
    <section className="border-t border-border py-16 sm:py-24">
      <div className="container-x max-w-4xl">
        {/* 인트로 카드 */}
        <div className="rounded-[2rem] border border-border bg-background p-7 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
            <div className="shrink-0">
              <div
                className="flex h-24 w-24 items-center justify-center rounded-full"
                style={{ backgroundColor: `${TEAL}1a` }}
              >
                <HeartHandshake className="h-11 w-11" strokeWidth={1.5} style={{ color: TEAL }} />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
                네이처 스테이 이용 안내
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                아름다운 자연과 마음을 쉬어가는 네이처 스테이, 서로를 배려하는
                작은 마음이 큰 평화를 만듭니다. 네이처 스테이는 누구에게나 열려
                있는 쉼의 공간입니다. 모두가 편안하고 평화롭게 머무를 수 있도록
                아래의 에티켓을 지켜 주세요.
              </p>

              {/* 입장 및 방문 시간 */}
              <div className="mt-6">
                <div className="flex items-center gap-2">
                  <CircleCheck className="h-5 w-5" style={{ color: TEAL }} />
                  <h3 className="font-bold text-foreground">입장 및 방문 시간</h3>
                </div>
                <div className="mt-2 space-y-1 text-muted">
                  {hours.map((h) => (
                    <p key={h.season}>
                      {h.season} ｜ {h.time}
                    </p>
                  ))}
                </div>
                <ul className="mt-3 space-y-1.5">
                  {entryNotes.map((t) => (
                    <li key={t} className="flex gap-2 leading-relaxed text-muted">
                      <span aria-hidden style={{ color: TEAL }}>
                        •
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex gap-2 text-sm text-muted">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p className="leading-relaxed">
                    네이처 스테이에서는 행사가 진행될 경우, 출입이 제한될 수
                    있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 주차안내 + 반입 금지 물품 */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="border-b-2 border-foreground pb-3 text-xl font-extrabold text-foreground">
              주차안내
            </h3>
            <ul className="mt-5 space-y-3">
              {parking.map((t) => (
                <li key={t} className="flex gap-2.5 leading-relaxed text-muted">
                  <span aria-hidden style={{ color: TEAL }}>
                    •
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="border-b-2 border-foreground pb-3 text-xl font-extrabold text-foreground">
              반입 금지 물품
            </h3>
            <ul className="mt-5 space-y-3">
              {banned.map((t) => (
                <li key={t} className="flex gap-2.5 leading-relaxed text-muted">
                  <span aria-hidden style={{ color: TEAL }}>
                    •
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 이용 수칙 */}
        <div className="mt-16">
          <h3 className="border-b-2 border-foreground pb-3 text-xl font-extrabold text-foreground">
            이용 수칙
          </h3>
          <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2">
            {rules.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  className="relative rounded-2xl border border-border bg-surface px-6 pb-7 pt-12 text-center"
                >
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-full shadow-md"
                      style={{ backgroundColor: TEAL }}
                    >
                      <Icon className="h-7 w-7 text-white" strokeWidth={1.6} />
                    </div>
                  </div>
                  <p className="font-bold text-foreground">{r.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{r.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
