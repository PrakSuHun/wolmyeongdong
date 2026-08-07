/** 내부 페이지 상단 배너 (이미지 또는 영상 배경 + 타이틀) */
export function PageHero({
  title,
  subtitle,
  image,
  video,
  poster,
}: {
  title: string;
  subtitle?: string;
  image?: string;
  video?: string;
  poster?: string;
}) {
  return (
    <section className="relative flex h-[46vh] min-h-[320px] items-end overflow-hidden">
      {video ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/25" />
      <div className="container-x relative pb-12 fade-up">
        <h1 className="text-4xl text-white sm:text-5xl md:text-6xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-xl text-white/85">{subtitle}</p>}
      </div>
    </section>
  );
}
