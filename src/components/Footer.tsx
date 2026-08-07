"use client";

import Link from "next/link";
import { useUser } from "@/lib/useUser";

const exploreCol = {
  title: "둘러보기",
  links: [
    { href: "/explore", label: "명소·자연" },
    { href: "/events", label: "행사·이벤트" },
    { href: "/about", label: "소개" },
    { href: "/faq", label: "자주 묻는 질문" },
  ],
};

export function Footer() {
  const { user, ready } = useUser();
  const loggedIn = ready && !!user;

  return (
    <footer className="section-dark border-t border-border-dark">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="text-2xl font-extrabold text-on-dark">
            네이처 스테이
          </span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-on-dark-muted">
            자연 속에서 만나는 새로운 나. 네이처 스테이는 아름다운 자연과 함께하는
            특별한 경험을 제공합니다.
          </p>
          <p className="mt-6 text-sm text-on-dark-muted">📍 충남 금산군 진산면</p>
        </div>

        <div>
          <h4 className="mb-4 text-base font-semibold text-on-dark">
            {exploreCol.title}
          </h4>
          <ul className="space-y-2.5">
            {exploreCol.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-on-dark-muted transition-colors hover:text-on-dark"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-base font-semibold text-on-dark">안내</h4>
          <ul className="space-y-2.5">
            {loggedIn ? (
              <>
                <li>
                  <Link
                    href="/account"
                    className="text-sm text-on-dark-muted transition-colors hover:text-on-dark"
                  >
                    마이페이지
                  </Link>
                </li>
                <li>
                  <form action="/auth/signout" method="post">
                    <button
                      type="submit"
                      className="text-sm text-on-dark-muted transition-colors hover:text-on-dark"
                    >
                      로그아웃
                    </button>
                  </form>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/signup"
                    className="text-sm text-on-dark-muted transition-colors hover:text-on-dark"
                  >
                    구독하기
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-sm text-on-dark-muted transition-colors hover:text-on-dark"
                  >
                    로그인
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-border-dark">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-on-dark-muted md:flex-row">
          <span>© {new Date().getFullYear()} 네이처 스테이. All rights reserved.</span>
          <span>자연 속에서 만나는 새로운 나</span>
        </div>
      </div>
    </footer>
  );
}
