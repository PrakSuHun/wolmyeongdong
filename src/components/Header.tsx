"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser, displayNameOf } from "@/lib/useUser";

/** 상단에 다크 히어로가 있어 투명 헤더가 어울리는 페이지 */
const overlayPages = new Set(["/", "/about", "/explore", "/events", "/faq"]);

const nav = [
  { href: "/", label: "홈" },
  { href: "/explore", label: "둘러보기" },
  { href: "/events", label: "행사·이벤트" },
  { href: "/about", label: "소개" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, ready: authReady } = useUser();
  const pathname = usePathname();
  const overlay = overlayPages.has(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open || !overlay;

  const displayName = displayNameOf(user);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-background/95 shadow-sm backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link
          href="/"
          className={`text-2xl font-extrabold tracking-tight transition-colors ${
            solid ? "text-foreground" : "text-white"
          }`}
        >
          네이처 스테이
        </Link>

        {/* 데스크톱 알약형 네비 */}
        <nav
          className={`hidden items-center gap-1 rounded-full border px-2 py-1.5 backdrop-blur-md md:flex ${
            solid
              ? "border-border bg-surface"
              : "border-white/20 bg-white/10"
          }`}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                solid
                  ? "text-muted hover:bg-background hover:text-foreground"
                  : "text-white/90 hover:bg-white/15 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {!authReady ? null : user ? (
            <>
              <Link
                href="/account"
                className={`text-sm font-semibold transition-colors ${
                  solid ? "text-foreground hover:text-accent" : "text-white hover:text-white/80"
                }`}
              >
                {displayName}님
              </Link>
              <form action="/auth/signout" method="post">
                <button
                  type="submit"
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    solid
                      ? "border border-border text-muted hover:text-foreground"
                      : "border border-white/30 text-white hover:bg-white/15"
                  }`}
                >
                  로그아웃
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={`text-sm font-medium transition-colors ${
                  solid ? "text-muted hover:text-foreground" : "text-white/90 hover:text-white"
                }`}
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                  solid
                    ? "bg-accent text-on-dark hover:bg-accent-strong"
                    : "bg-white text-foreground hover:bg-white/90"
                }`}
              >
                구독하기
              </Link>
            </>
          )}
        </div>

        {/* 모바일 토글 */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="메뉴 열기"
          className={`flex h-10 w-10 items-center justify-center rounded-md border md:hidden ${
            solid ? "border-border text-foreground" : "border-white/30 text-white"
          }`}
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container-x flex flex-col py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 font-medium text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            {!authReady ? null : user ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="mt-3 rounded-full border border-border py-2 text-center text-sm font-semibold text-foreground"
                >
                  {displayName}님 · 마이페이지
                </Link>
                <form action="/auth/signout" method="post" className="mt-3">
                  <button
                    type="submit"
                    className="w-full rounded-full border border-border py-2 text-center text-sm font-medium text-muted"
                  >
                    로그아웃
                  </button>
                </form>
              </>
            ) : (
              <div className="mt-3 flex gap-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-border py-2 text-center text-sm font-medium text-foreground"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full bg-accent py-2 text-center text-sm font-semibold text-on-dark"
                >
                  구독하기
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
