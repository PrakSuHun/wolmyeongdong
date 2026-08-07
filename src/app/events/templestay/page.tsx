import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TemplestayApplyForm } from "@/components/TemplestayApplyForm";

export const metadata = { title: "템플스테이 신청 — 네이처 스테이" };

const activities = [
  "공원 가이드 (산책 · 약수 마시기 · 동굴 체험 · 작품 설명 등)",
  "명상 및 소원 빌기",
  "정자 신선놀음",
  "카페 티타임",
];

export default async function TemplestayApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const { preview } = await searchParams;
  // 개발 환경에서만 로그인 없이 미리보기 (?preview=1)
  const isPreview = process.env.NODE_ENV === "development" && preview === "1";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인 회원만 신청 가능 — 비로그인 시 로그인 후 이 페이지로 돌아오게
  if (!user && !isPreview) redirect("/login?next=/events/templestay");

  const userEmail = user?.email ?? "preview@example.com";

  return (
    <>
      {/* 표지 + 프로그램 이미지 */}
      <section className="bg-surface pt-28 pb-10 sm:pt-32 sm:pb-14">
        <div className="container-x">
          <div className="mx-auto grid max-w-4xl items-start gap-5 sm:grid-cols-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/templestay-cover.png"
              alt="템플스테이 — 일상을 벗어나 나를 알아가는 시간"
              className="w-full rounded-3xl shadow-xl shadow-black/10"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/templestay-program.png"
              alt="템플스테이 프로그램 구성 — 연회장, 작품솔 가이드, 명상 및 소원 상자, 나에게 쓰는 편지, 조경 가이드, 카페 차담"
              className="w-full rounded-3xl shadow-xl shadow-black/10"
            />
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-x max-w-3xl">
          {/* 소개 (안내) */}
          <div className="rounded-3xl border border-border bg-surface p-7 sm:p-9">
            <p className="text-lg font-extrabold text-foreground">
              안녕하세요! 😄
            </p>
            <p className="mt-3 leading-relaxed text-muted">
              템플스테이를 신청해 주셔서 감사합니다. 몇 가지 안내사항을 전해드릴게요. 🥰
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-background p-5">
              <p className="font-bold text-foreground">
                🫧 프로그램은 오전 9시 ~ 오후 6시 사이 자유롭게 진행됩니다.
              </p>
              <ul className="mt-3 space-y-2">
                {activities.map((a) => (
                  <li key={a} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 leading-relaxed text-muted">
              ✨ 템플스테이는 일일 가이드와 시간을 맞춰 <strong className="text-foreground">&lt;팀&gt; 단위</strong>로
              진행되며, 인근 지역(대전 등) <strong className="text-foreground">카풀이 지원</strong>됩니다. 😀
            </p>
            <p className="mt-3 leading-relaxed text-muted">
              아래 폼으로 신청해 주시면 가이드가 직접 연락드려 자세한 일정과 시간을 맞춰드립니다. 😍
            </p>
          </div>

          {/* 신청 폼 */}
          <div className="mt-12">
            <p className="eyebrow mb-3">Apply</p>
            <h2 className="text-2xl text-foreground sm:text-3xl">신청서 작성</h2>
            <div className="mt-6">
              <TemplestayApplyForm email={userEmail} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
