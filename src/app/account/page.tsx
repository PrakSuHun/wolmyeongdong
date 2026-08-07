import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "마이페이지 — 네이처 스테이" };

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const name =
    (user.user_metadata?.full_name as string | undefined) ?? "회원";
  const joined = new Date(user.created_at).toLocaleDateString("ko-KR");

  return (
    <div className="container-x pb-20 pt-32">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow mb-3">My Page</p>
        <h1 className="text-4xl text-foreground sm:text-5xl">
          {name}님, 환영합니다 👋
        </h1>
        <p className="mt-4 text-muted">
          네이처 스테이 회원으로 함께해주셔서 감사합니다.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <span className="text-sm text-muted">이메일</span>
            <p className="mt-1 text-lg text-foreground">{user.email}</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-6">
            <span className="text-sm text-muted">가입일</span>
            <p className="mt-1 text-lg text-foreground">{joined}</p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/5 p-8">
          <h2 className="text-2xl text-foreground">회원 전용 콘텐츠</h2>
          <p className="mt-2 text-muted">
            곧 회원만을 위한 프로그램 신청, 소식, 자료가 이곳에 제공될
            예정입니다.
          </p>
        </div>

        <form action="/auth/signout" method="post" className="mt-10">
          <button className="rounded-full border border-border px-6 py-2.5 text-sm text-muted transition-colors hover:text-foreground">
            로그아웃
          </button>
        </form>
      </div>
    </div>
  );
}
