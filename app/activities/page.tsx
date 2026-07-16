import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ElementType } from "react";

import ActivityFilters from "@/components/ActivityFilters";
import ActivityScrollReveal from "@/components/ActivityScrollReveal";
import Icons, { type IconName } from "@/components/Icons";
import PageLenis from "@/components/PageLenis";
import AddToCartButton from "@/components/AddToCartButton";

export const metadata: Metadata = {
  title: "Adventure Activities in Manali",
  description:
    "Explore paragliding, river rafting, skiing, local sightseeing, trekking, and adventure combinations across Manali.",
};

type AppIconProps = {
  name: IconName;
  className?: string;
  strokeWidth?: number;
};

function AppIcon({
  name,
  className,
  strokeWidth,
}: AppIconProps) {
  const Icon = Icons[name] as ElementType;

  return (
    <Icon
      aria-hidden="true"
      className={className}
      strokeWidth={strokeWidth}
    />
  );
}

type Activity = {
  id: string;
  filterId?: string;
  badge: string;
  badgeTone?: "default" | "winter";
  image: string;
  imagePosition?: string;
  alt: string;
  status: string;
  statusTone: "weather" | "seasonal" | "available";
  statusIcon: IconName;
  title: string;
  description: string;
  facts: Array<{
    label: string;
    value: string;
  }>;
  detailIcon: IconName;
  detail: string;
  price?: string;
  priceNote?: string;
  activityParam: string;
};

const activities: Activity[] = [
  {
    id: "paragliding-solang-ropeway",
    filterId: "paragliding",
    badge: "Best Seller",
    image: "/images/activities/para-gliding.png",
    alt: "Paraglider flying above a green Himalayan valley",
    status: "Weather Dependent (Wind Speed)",
    statusTone: "weather",
    statusIcon: "Wind",
    title: "Paragliding High Fly with Ropeway – Solang Valley",
    description:
      "Soar high above the pine-filled valleys and witness the grand Himalayan peak vistas from a bird’s-eye view.",
    facts: [
      {
        label: "Duration",
        value: "15–30 minutes air flight",
      },
      {
        label: "Location",
        value: "Solang Valley take-off point",
      },
      {
        label: "Safety",
        value: "Certified tandem pilots only",
      },
    ],
    detailIcon: "Gauge",
    detail: "9,000 ft",
    price: "₹3,500",
    activityParam: "Paragliding High Fly with Ropeway – Solang Valley",
  },
  {
    id: "paragliding-dobhi-high-fly",
    filterId: "paragliding",
    badge: "High Fly",
    image: "/images/activities/paragliding-dobhi-kullu.png",
    alt: "Tandem paraglider flying above the Kullu valley near Dobhi",
    status: "Weather Dependent (Wind Speed)",
    statusTone: "weather",
    statusIcon: "Wind",
    title: "Paragliding High Fly in Dobhi (Kullu)",
    description:
      "Take the longer valley view from Dobhi, with a high Himalayan panorama unfolding beneath your tandem flight.",
    facts: [
      {
        label: "Duration",
        value: "15–25 minutes air flight",
      },
      {
        label: "Location",
        value: "Dobhi take-off point (Kullu)",
      },
      {
        label: "Safety",
        value: "Certified tandem pilots only",
      },
    ],
    detailIcon: "Mountain",
    detail: "High Valley Flight",
    price: "₹3,000",
    activityParam: "Paragliding High Fly in Dobhi (Kullu)",
  },
  {
    id: "paragliding-solang-short-fly",
    filterId: "paragliding",
    badge: "Quick Fly",
    image: "/images/activities/paragliding-solang-short-fly.png",
    alt: "Tandem paragliders launching over the green meadows of Solang Valley",
    status: "Weather Dependent (Wind Speed)",
    statusTone: "weather",
    statusIcon: "Wind",
    title: "Paragliding Short Fly – Solang Valley",
    description:
      "A shorter, feel-good glide over Solang's open meadows—ideal when you want the rush with less time in the air.",
    facts: [
      {
        label: "Duration",
        value: "5–10 minutes air flight",
      },
      {
        label: "Location",
        value: "Solang Valley take-off point",
      },
      {
        label: "Safety",
        value: "Certified tandem pilots only",
      },
    ],
    detailIcon: "Wind",
    detail: "Short Valley Glide",
    price: "₹1,000",
    activityParam: "Paragliding Short Fly – Solang Valley",
  },
  {
    id: "rafting",
    badge: "Thrilling",
    image: "/images/activities/river-rafting.png",
    alt: "Group river rafting through the Beas River",
    status: "Suspended during Monsoons (July–Sep)",
    statusTone: "seasonal",
    statusIcon: "CalendarX2",
    title: "River Rafting (Beas River)",
    description:
      "Battle the exciting white-water rapids of the Beas River under the guidance of certified local guides.",
    facts: [
      {
        label: "Duration",
        value: "~45 to 60 minutes water time",
      },
      {
        label: "Location",
        value: "Pirdi to Jhiri stretch (Kullu)",
      },
      {
        label: "Safety",
        value: "Lifejackets & helmets mandatory",
      },
    ],
    detailIcon: "Route",
    detail: "10 km stretch",
    price: "₹1,500",
    activityParam: "River Rafting",
  },
  {
    id: "skiing",
    badge: "Winter Spec",
    badgeTone: "winter",
    image: "/images/activities/skating.png",
    alt: "Visitors enjoying skiing and snow activities in Manali",
    status: "Winter Season Only (Dec–Feb)",
    statusTone: "seasonal",
    statusIcon: "Snowflake",
    title: "Skiing & Snow Outings",
    description:
      "Experience the thrill of sliding down the powder snow slopes of Solang Valley or Gulaba Pass.",
    facts: [
      {
        label: "Duration",
        value: "Hourly lessons available",
      },
      {
        label: "Location",
        value: "Solang Valley / Gulaba Snow point",
      },
      {
        label: "Gear",
        value: "Skis, poles, boots included in rental",
      },
    ],
    detailIcon: "Clock3",
    detail: "Winter Snow",
    price: "₹2,000",
    activityParam: "Skiing",
  },
  {
    id: "sightseeing",
    badge: "Family Fav",
    image: "/images/activities/temple.png",
    imagePosition: "object-center",
    alt: "Historic temple surrounded by trees in Manali",
    status: "Year-Round (Daily Availability)",
    statusTone: "available",
    statusIcon: "CheckCircle2",
    title: "Local Sightseeing Tours",
    description:
      "Explore Hadimba Pagoda Temple, Vashisht Hot Springs, Jogini Waterfalls, and the local Tibetan Monasteries.",
    facts: [
      {
        label: "Duration",
        value: "Full day tour (~6–8 hours)",
      },
      {
        label: "Includes",
        value: "Private cab, driver-cum-local guide",
      },
      {
        label: "Coverage",
        value: "Old Manali, Mall Road, Vashisht",
      },
    ],
    detailIcon: "CarFront",
    detail: "Private Sedan/SUV",
    price: "₹1,800",
    activityParam: "Local Sightseeing",
  },
  {
    id: "trekking",
    badge: "Adventure",
    image: "/images/home/hero-valley.webp",
    alt: "Mountain trail through the Himalayan landscape",
    status: "Subject to Snow & Pass Clearance",
    statusTone: "seasonal",
    statusIcon: "Snowflake",
    title: "Guided Mountain Trekking",
    description:
      "Embark on day hikes to Jogini Falls, Lamadugh, or multi-day camping trips like Hampta Pass with licensed pathfinders.",
    facts: [
      {
        label: "Duration",
        value: "Options from 1 to 5 days",
      },
      {
        label: "Guides",
        value: "Certified IMF/HIM mountaineers",
      },
      {
        label: "Includes",
        value: "Camping tents, sleeping bags, meals",
      },
    ],
    detailIcon: "Mountain",
    detail: "Alpine Trails",
    price: "₹2,500",
    activityParam: "Mountain Trekking",
  },
  {
    id: "camping",
    badge: "Under the Stars",
    image: "/images/home/hero-stay.webp",
    alt: "Mountain stay surrounded by the Himalayan landscape",
    status: "Seasonal & Weather Dependent",
    statusTone: "weather",
    statusIcon: "TentTree",
    title: "Mountain Camping",
    description:
      "Unplug beneath the Himalayan sky with comfortable tents, warm meals, and peaceful camps surrounded by mountain views.",
    facts: [
      {
        label: "Duration",
        value: "Overnight and multi-day options",
      },
      {
        label: "Location",
        value: "Solang Valley / riverside camps",
      },
      {
        label: "Includes",
        value: "Tent, bedding, dinner & breakfast",
      },
    ],
    detailIcon: "TentTree",
    detail: "Camp Stay & Meals",
    price: "₹5,000",
    activityParam: "Camping",
  },
  {
    id: "combo",
    badge: "Best Value",
    image: "/images/activities/combo.png",
    alt: "Collection of adventure activities available in Manali",
    status: "Subject to River & Wind Status",
    statusTone: "weather",
    statusIcon: "Umbrella",
    title: "Ultimate Adventure Combo",
    description:
      "The best of Manali. Includes a paragliding flight, Beas River rafting, and a thrilling 4x4 quad bike forest ride.",
    facts: [
      {
        label: "Duration",
        value: "1–2 days flexi-schedule",
      },
      {
        label: "Transfers",
        value: "Pickup/drop between spots included",
      },
      {
        label: "Bonus",
        value: "Action video recording vouchers",
      },
    ],
    detailIcon: "PackageOpen",
    detail: "3 Core Activities",
    price: "₹4,500",
    activityParam: "Adventure Combo",
  },
];

const statusClasses: Record<
  Activity["statusTone"],
  string
> = {
  weather:
    "border-[oklch(86%_0.1_83)] bg-[oklch(96%_0.035_83)] text-[oklch(42%_0.09_65)]",
  seasonal:
    "border-[oklch(87%_0.045_248)] bg-[oklch(97%_0.015_248)] text-[oklch(42%_0.08_248)]",
  available:
    "border-[var(--color-mint)] bg-[var(--color-forest-wash)] text-[var(--color-deep-forest)]",
};

function ActivityCard({
  activity,
}: {
  activity: Activity;
}) {
  const {
    activityParam,
    alt,
    badge,
    badgeTone,
    description,
    detail,
    detailIcon,
    facts,
    filterId,
    id,
    image,
    imagePosition,
    price,
    priceNote,
    status,
    statusIcon,
    statusTone,
    title,
  } = activity;

  return (
    <article
      id={id}
      data-activity={filterId ?? id}
      className="group relative flex min-w-0 scroll-mt-28 flex-col overflow-hidden rounded-[1.5rem] border border-[oklch(90%_0.025_160)] bg-white shadow-[0_16px_45px_rgba(30,77,58,0.08)] transition-shadow duration-300 hover:shadow-[0_24px_55px_rgba(30,77,58,0.14)] motion-reduce:transition-none"
    >
      <span
        className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.09em] shadow-sm ${
          badgeTone === "winter"
            ? "bg-[oklch(91%_0.035_242)] text-[oklch(35%_0.07_248)]"
            : "bg-[var(--color-gold)] text-[var(--color-ink)]"
        }`}
      >
        {badge}
      </span>

      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-forest-wash)]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          className={`object-cover transition duration-500 group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none ${
            imagePosition ?? "object-center"
          }`}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-forest)]/28 via-transparent to-transparent"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p
          className={`inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold leading-5 ${statusClasses[statusTone]}`}
        >
          <AppIcon
            name={statusIcon}
            className="size-3.5 shrink-0"
            strokeWidth={2}
          />

          <span>{status}</span>
        </p>

        <h3 className="mt-4 text-balance font-display text-[1.55rem] font-extrabold leading-tight tracking-[-0.035em] text-[var(--color-deep-forest)]">
          {title}
        </h3>

        <p className="mt-3 text-pretty text-[0.95rem] leading-6 text-[var(--color-muted-slate)]">
          {description}
        </p>

        <dl className="mt-5 space-y-1.5 text-sm leading-5 text-[var(--color-muted-slate)]">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex gap-1.5"
            >
              <dt className="shrink-0 font-bold text-[var(--color-ink)]">
                {fact.label}:
              </dt>

              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between gap-4 border-t border-dashed border-[var(--color-mint)] pt-5">
            <p className="inline-flex min-w-0 items-center gap-2 text-sm font-bold text-[var(--color-deep-forest)]">
              <AppIcon
                name={detailIcon}
                className="size-4 shrink-0 text-[var(--color-forest)]"
                strokeWidth={2}
              />

              <span>{detail}</span>
            </p>

            {price ? (
              <p className="shrink-0 text-right">
                <span className="block font-display text-xl font-extrabold leading-none text-[var(--color-deep-forest)]">
                  {price}
                </span>

                <span className="mt-1 block text-[0.67rem] font-bold uppercase tracking-[0.1em] text-[var(--color-muted-slate)]">
                  {priceNote ?? "starting"}
                </span>
              </p>
            ) : null}
          </div>

          <div className="grid gap-2 pt-5 sm:grid-cols-2">
            <Link
              href={{
                pathname: "/contact",
                query: {
                  method: "whatsapp",
                  activities: "on",
                  activity: activityParam,
                },
              }}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-4 py-3 text-center text-sm font-bold text-white no-underline transition-colors duration-200 hover:bg-[var(--color-deep-forest)] motion-reduce:transition-none"
            >
              <AppIcon
                name="WhatsAppIcon"
                className="size-4"
              />

              Enquire WhatsApp
            </Link>

            <AddToCartButton
              id={id}
              type="activity"
              title={title}
              price={price}
              image={image}
              detail={detail}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ActivitiesPage() {
  return (
    <div className="overflow-hidden bg-[var(--color-soft-white)]">
      <PageLenis />

      <section
        className="relative isolate min-h-[24rem] overflow-hidden bg-[var(--color-deep-forest)] text-white sm:min-h-[28rem]"
        aria-labelledby="activities-page-title"
      >
        <Image
          src="/images/activities/combo.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,oklch(25%_0.06_164/.9)_0%,oklch(30%_0.06_164/.72)_52%,oklch(25%_0.06_164/.38)_100%)]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--color-soft-white)]/15 to-transparent"
        />

        <div className="mx-auto flex min-h-[24rem] w-full max-w-[76rem] items-end px-[clamp(1.25rem,4vw,2.5rem)] pb-14 pt-24 sm:min-h-[28rem] sm:pb-16 lg:pb-20">
          <div className="activity-hero-reveal max-w-[46rem]">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-[var(--color-mint)]">
              Find your mountain thrill
            </p>

            <h1
              id="activities-page-title"
              className="mt-3 text-balance font-display text-[clamp(2.8rem,7vw,5.25rem)] font-extrabold leading-[0.94] tracking-[-0.035em]"
            >
              Adventure Activities
            </h1>

            <p className="mt-5 max-w-[58ch] text-pretty text-base leading-7 text-white/85 sm:text-lg">
              Book authentic mountain experiences with
              government-certified safety coordinators and pilots.
            </p>
          </div>
        </div>
      </section>

      <section
        className="relative bg-white py-14 sm:py-18 lg:py-24"
        aria-labelledby="activities-header-title"
      >
        <div
          aria-hidden="true"
          className="absolute right-[-7rem] top-28 size-72 rounded-full bg-[var(--color-forest-wash)] blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-[76rem] px-[clamp(1.25rem,4vw,2.5rem)]">
          <aside className="activity-notice-reveal flex items-start gap-3 rounded-2xl border border-[oklch(86%_0.1_83)] bg-[oklch(97%_0.03_83)] p-4 text-[oklch(35%_0.075_67)] sm:gap-4 sm:p-5">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-gold)] text-[var(--color-ink)]">
              <AppIcon
                name="TriangleAlert"
                className="size-5"
                strokeWidth={2}
              />
            </span>

            <p className="text-sm leading-6 sm:text-[0.95rem]">
              <strong>Important Travel Notice:</strong> Pricing for
              adventure activities is highly dynamic, varying season to
              season and fluctuating every 3–4 days based on tourist
              density and fuel rates. Additionally, outdoor sports
              (especially paragliding, river rafting, and high trekking
              passes) may be suspended immediately in case of high winds,
              rain, or safety guidelines. Rates below are indicative of
              current starting pricing.
            </p>
          </aside>

          <header className="activity-heading-reveal mx-auto mt-12 max-w-[47rem] text-center sm:mt-16">
            <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[var(--color-forest)]">
              Choose your adventure
            </p>

            <h2
              id="activities-header-title"
              className="mt-3 text-balance font-display text-3xl font-extrabold tracking-[-0.04em] text-[var(--color-deep-forest)] sm:text-4xl lg:text-5xl"
            >
              All Adventure Offerings
            </h2>

            <p className="mt-4 text-pretty text-base leading-7 text-[var(--color-muted-slate)]">
              We source safety-first equipment and certified local pilots
              to guarantee high thrills and absolute safety.
            </p>
          </header>

          <ActivityFilters />

          <div
            id="activities-grid"
            className="mt-8 grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {activities.map((activity, index) => (
              <ActivityScrollReveal
                key={activity.id}
                delay={index * 0.08}
              >
                <ActivityCard activity={activity} />
              </ActivityScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
