import Image from "next/image";
import Link from "next/link";

type RouteHoldingPageProps = {
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  points: readonly string[];
  note: string;
  primaryHref?: string;
  primaryLabel?: string;
};

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export default function RouteHoldingPage({
  title,
  intro,
  image,
  imageAlt,
  points,
  note,
  primaryHref = "/contact",
  primaryLabel = "Contact the team",
}: RouteHoldingPageProps) {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <section className="relative overflow-hidden bg-[var(--color-deep-forest)] text-white" aria-labelledby="route-title">
        <div className="mx-auto grid min-h-[34rem] w-full max-w-[76rem] lg:grid-cols-[1fr_0.92fr]">
          <div className="flex flex-col justify-center px-[clamp(1rem,4vw,2.5rem)] py-[clamp(4rem,9vw,7rem)]">
            <p className="mb-4 font-bold text-[var(--color-mint)]">Adventure Hub Manali</p>
            <h1
              id="route-title"
              className="max-w-[13ch] font-display text-[clamp(3rem,7vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.035em]"
            >
              {title}
            </h1>
            <p className="mt-6 max-w-[58ch] text-lg leading-8 text-white/88">{intro}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={primaryHref}
                className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[var(--color-gold)] px-6 py-3 font-bold text-[var(--color-ink)] no-underline transition hover:-translate-y-0.5 hover:bg-white motion-reduce:transition-none"
              >
                {primaryLabel}
                <ArrowIcon />
              </Link>
              <Link
                href="/"
                className="inline-flex min-h-12 items-center rounded-lg border border-white/65 px-6 py-3 font-bold text-white no-underline transition hover:bg-white hover:text-[var(--color-deep-forest)] motion-reduce:transition-none"
              >
                Back to home
              </Link>
            </div>
          </div>

          <div className="relative min-h-[24rem] border-t-2 border-white/70 lg:min-h-full lg:border-l-2 lg:border-t-0">
            <Image
              src={image}
              alt={imageAlt}
              fill
              preload
              quality={80}
              sizes="(max-width: 63.99rem) 100vw, 46vw"
              className="object-cover"
            />
            <span className="absolute inset-0 bg-black/20" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="bg-white py-[clamp(3.5rem,8vw,6rem)]" aria-labelledby="route-details-title">
        <div className="mx-auto grid w-full max-w-[76rem] gap-10 px-[clamp(1rem,4vw,2.5rem)] lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div>
            <h2
              id="route-details-title"
              className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-none tracking-[-0.03em] text-[var(--color-deep-forest)]"
            >
              What you will find here
            </h2>
            <p className="mt-5 max-w-[55ch] leading-7 text-[var(--color-muted-slate)]">{note}</p>
          </div>

          <ul className="list-none divide-y divide-[var(--color-mint)] border-y border-[var(--color-mint)]">
            {points.map((point) => (
              <li key={point} className="flex min-h-20 items-center gap-4 py-4 text-lg font-bold text-[var(--color-deep-forest)]">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest-wash)]" aria-hidden="true">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
