import Link from "next/link";

const BG =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80";

/** 좌측 자연 이미지 + 우측 폼의 인증 화면 레이아웃 */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* 이미지 패널 */}
      <div className="relative hidden overflow-hidden lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />
        <div className="absolute bottom-0 left-0 p-12">
          <Link href="/" className="text-3xl font-extrabold text-white">
            네이처 스테이
          </Link>
          <p className="mt-3 max-w-sm text-white/80">
            자연 속에서 만나는 새로운 나. 회원이 되어 특별한 경험을 시작하세요.
          </p>
        </div>
      </div>

      {/* 폼 패널 */}
      <div className="flex items-center justify-center px-6 pb-16 pt-28">
        <div className="w-full max-w-md fade-up">
          {title && <h1 className="text-4xl text-foreground">{title}</h1>}
          {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
          <div className={title || subtitle ? "mt-8" : ""}>{children}</div>
          {footer && (
            <div className="mt-8 text-center text-sm text-muted">{footer}</div>
          )}
        </div>
      </div>
    </div>
  );
}
