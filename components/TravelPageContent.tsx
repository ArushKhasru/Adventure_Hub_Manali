"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import Icons from "@/components/Icons";

const stops = [
  {
    name: "Solang Valley",
    distance: "13 km from Manali",
    eyebrow: "The open-air stop",
    description:
      "A wide alpine bowl where the valley opens up—best for cable-car views, snow-season energy, and a long look at the ridgelines.",
    moment: "Best feeling: bright, high, and a little weightless.",
    accent: "mint",
    icon: Icons.Wind,
    photos: [
      { src: "/images/activities/para-gliding.png", alt: "Paraglider above the Manali valley" },
      { src: "/images/home/hero-adventure.webp", alt: "Adventure view in Manali" },
      { src: "/images/home/hero-valley.webp", alt: "Manali valley and mountain ridges" },
    ],
  },
  {
    name: "Hidimba Devi Temple",
    distance: "2.5 km from Manali",
    eyebrow: "The forest pause",
    description:
      "A quiet, timber-roofed shrine set beneath towering deodar trees. Slow down here before the rest of the day gets ambitious.",
    moment: "Best feeling: cool forest air and old stories.",
    accent: "gold",
    icon: Icons.TreePine,
    photos: [
      { src: "/images/activities/temple.png", alt: "Temple surrounded by mountain trees" },
      { src: "/images/home/hero-stay.webp", alt: "A peaceful Manali hillside view" },
      { src: "/images/home/hero-valley.webp", alt: "Forest-framed Manali valley" },
    ],
  },
  {
    name: "Vashisht",
    distance: "2 km from Manali",
    eyebrow: "The warm-water reset",
    description:
      "A hillside village with temple lanes and hot springs—a softer kind of adventure when the mountain air has done its work.",
    moment: "Best feeling: steam, stone, and an unhurried afternoon.",
    accent: "coral",
    icon: Icons.MapPinned,
    photos: [
      { src: "/images/home/hero-stay.webp", alt: "A quiet Manali hillside retreat" },
      { src: "/images/activities/temple.png", alt: "A warm temple-lane moment in Manali" },
      { src: "/images/activities/camping.png", alt: "A restful outdoor scene in Manali" },
    ],
  },
  {
    name: "Nehru Kund",
    distance: "5 km from Manali",
    eyebrow: "The roadside refresh",
    description:
      "A spring-fed stop on the way north, with the Beas Valley unfolding around you. Come for a short pause that feels much bigger.",
    moment: "Best feeling: cold water and an easy scenic drive.",
    accent: "sky",
    icon: Icons.Compass,
    photos: [
      { src: "/images/home/hero-valley.webp", alt: "Manali valley on the road north" },
      { src: "/images/activities/river-rafting.png", alt: "The Beas river near Manali" },
      { src: "/images/home/hero-adventure.webp", alt: "Mountain road adventure near Manali" },
    ],
  },
  {
    name: "Rahala Waterfalls",
    distance: "16 km from Manali",
    eyebrow: "The meltwater finale",
    description:
      "A sharp rush of mountain water along the Rohtang road, surrounded by dramatic slopes and changing weather.",
    moment: "Best feeling: mist on your face and the road still ahead.",
    accent: "mint",
    icon: Icons.Mountain,
    photos: [
      { src: "/images/activities/river-rafting.png", alt: "Rushing Himalayan water near Manali" },
      { src: "/images/home/hero-valley.webp", alt: "Dramatic Manali mountain landscape" },
      { src: "/images/home/hero-family.webp", alt: "A mountain-day view in Manali" },
    ],
  },
] as const;

type Stop = (typeof stops)[number];
type Tilt = { x: number; y: number };

function PhotoStack({
  stop,
  index,
  onOpen,
}: {
  stop: Stop;
  index: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Open ${stop.name} photo stack`}
      onClick={onOpen}
      className="group relative block w-full text-left"
    >
      <span className="relative mx-auto block h-[15.5rem] w-full max-w-[20rem]">
        <span className="absolute -left-2 -top-2 z-50 flex items-center gap-2 rounded-full border border-[var(--color-mint)] bg-[var(--color-soft-white)] px-3 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-[var(--color-forest)] shadow-[0_8px_18px_rgba(12,53,40,0.12)]">
          Stop {String(index + 1).padStart(2, "0")}
          <span aria-hidden="true" className="size-1 rounded-full bg-[var(--color-gold)]" />
          {stop.photos.length} photos
        </span>
        {stop.photos.map((photo, photoIndex) => {
          const stackTransforms = [
            "left-0 top-0 rotate-[-2.5deg] z-30",
            "left-2 top-2.5 rotate-[3deg] z-20",
            "left-1 top-5 rotate-[-1deg] z-10",
          ];

          return (
            <span
              key={photo.src}
              className={`absolute block h-[13.25rem] w-full overflow-hidden rounded-[1.45rem] border-[0.45rem] border-white bg-[var(--color-forest-wash)] shadow-[0_18px_35px_rgba(12,53,40,0.18)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 motion-reduce:transform-none ${stackTransforms[photoIndex]}`}
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 20rem, 80vw"
                className={`object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none ${
                  photoIndex === 0
                    ? "object-center"
                    : photoIndex === 1
                      ? "object-[45%_center]"
                      : "object-[60%_center]"
                }`}
              />
              {photoIndex === 0 && (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#073526]/75 via-[#073526]/10 to-transparent px-4 pb-3 pt-10 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-white">
                  {stop.name}
                </span>
              )}
            </span>
          );
        })}
        <span className="absolute bottom-3 right-2 z-40 inline-flex min-h-9 items-center gap-2 rounded-full bg-[var(--color-deep-forest)] px-3 text-[0.7rem] font-extrabold text-white shadow-lg transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transform-none">
          View photos
          <Icons.ArrowRight aria-hidden="true" className="size-3.5" />
        </span>
      </span>
      <p className="mx-auto mt-3 max-w-[20rem] text-center text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-forest)]">
        Open the route album
      </p>
    </button>
  );
}

function PhotoLightbox({
  stop,
  onClose,
}: {
  stop: Stop;
  onClose: () => void;
}) {
  const [activePhoto, setActivePhoto] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const showPrevious = useCallback(() => {
    setActivePhoto((current) =>
      current === 0 ? stop.photos.length - 1 : current - 1,
    );
  }, [stop.photos.length]);
  const showNext = useCallback(() => {
    setActivePhoto((current) => (current + 1) % stop.photos.length);
  }, [stop.photos.length]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, showNext, showPrevious]);

  const currentPhoto = stop.photos[activePhoto];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${stop.name} photo gallery`}
      onClick={onClose}
      className="photo-lightbox fixed inset-0 z-[110] flex items-center justify-center bg-[#062d21]/94 p-4 backdrop-blur-md sm:p-8"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const startX = touchStartX.current;
          const endX = event.changedTouches[0]?.clientX;
          touchStartX.current = null;
          if (startX === null || endX === undefined) return;
          if (startX - endX > 48) showNext();
          if (endX - startX > 48) showPrevious();
        }}
        className="photo-lightbox-panel relative w-full max-w-5xl"
      >
        <div className="absolute inset-x-4 -top-12 flex items-center justify-between gap-4 text-white sm:inset-x-0">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--color-mint)]">Route album</p>
            <p className="mt-1 font-display text-xl font-bold">{stop.name}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/25 px-4 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            Close
            <span aria-hidden="true" className="text-lg leading-none">×</span>
          </button>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-white/20 bg-[#0a4634] shadow-[0_28px_90px_rgba(0,0,0,0.45)]">
          <Image
            key={currentPhoto.src}
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            fill
            priority
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="photo-lightbox-photo object-cover"
          />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
          <p className="absolute bottom-5 left-5 max-w-[34ch] text-sm font-semibold leading-6 text-white sm:bottom-7 sm:left-7 sm:text-base">
            {currentPhoto.alt}
          </p>
        </div>

        <button
          type="button"
          onClick={showPrevious}
          aria-label="Show previous photo"
          className="absolute left-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#062d21]/75 text-white backdrop-blur transition-colors hover:bg-[#062d21] sm:-left-5 sm:size-12"
        >
          <Icons.ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Show next photo"
          className="absolute right-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#062d21]/75 text-white backdrop-blur transition-colors hover:bg-[#062d21] sm:-right-5 sm:size-12"
        >
          <Icons.ChevronRight aria-hidden="true" className="size-5" />
        </button>

        <div className="mt-5 flex items-center justify-center gap-2" aria-label="Photo selection">
          {stop.photos.map((photo, photoIndex) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActivePhoto(photoIndex)}
              aria-label={`Show photo ${photoIndex + 1}`}
              aria-current={photoIndex === activePhoto ? "true" : undefined}
              className={`h-2.5 rounded-full transition-[width,background-color] duration-300 ${
                photoIndex === activePhoto
                  ? "w-8 bg-[var(--color-gold)]"
                  : "w-2.5 bg-white/45 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TravelStopCard({
  stop,
  index,
  isVisible,
}: {
  stop: Stop;
  index: number;
  isVisible: boolean;
}) {
  const [tilt, setTilt] = useState<Tilt>({ x: 0, y: 0 });
  const Icon = stop.icon;

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    setTilt({ x: Number((-y * 5).toFixed(2)), y: Number((x * 5).toFixed(2)) });
  };

  return (
    <article
      data-travel-stop={index}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      className={`travel-stop-card group relative w-full max-w-[42rem] transform-3d transition-[opacity,transform] duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        isVisible
          ? "translate-x-0 translate-y-0 opacity-100"
          : index % 2 === 0
            ? "-translate-x-8 translate-y-5 opacity-0"
            : "translate-x-8 translate-y-5 opacity-0"
      }`}
      style={{
        transform: isVisible
          ? `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : undefined,
      }}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 translate-x-3 translate-y-4 rounded-[2rem] border border-[var(--color-mint)]/50 bg-[var(--color-forest-wash)] transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-5 motion-reduce:transform-none ${
          index % 2 === 0 ? "rotate-[1.4deg]" : "-rotate-[1.4deg]"
        }`}
      />
      <div className="relative overflow-hidden rounded-[2rem] border border-[#d9e5dd] bg-white p-5 shadow-[0_24px_60px_rgba(12,53,40,0.13)] sm:p-7">
        <div
          aria-hidden="true"
          className={`travel-orbit travel-orbit-${stop.accent} absolute -right-12 -top-12 size-44 rounded-full border-[1.35rem]`}
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-12 -left-10 size-40 rounded-full border border-dashed border-[var(--color-mint)]/80"
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex size-12 items-center justify-center rounded-2xl text-[var(--color-deep-forest)] shadow-sm travel-icon-${stop.accent}`}
            >
              <Icon aria-hidden="true" className="size-5" />
            </span>
            <div>
              <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-[var(--color-forest)]">
                Stop {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-[var(--color-muted-slate)]">
                {stop.distance}
              </p>
            </div>
          </div>
          <span className="rounded-full border border-[var(--color-deep-forest)]/10 bg-white/80 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[var(--color-muted-slate)] backdrop-blur">
            {stop.eyebrow}
          </span>
        </div>

        <div className="relative mt-9">
          <p className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[0.95] tracking-[-0.055em] text-[var(--color-deep-forest)]">
            {stop.name}
          </p>
          <p className="mt-4 max-w-[48ch] text-sm leading-7 text-[var(--color-muted-slate)] sm:text-base">
            {stop.description}
          </p>
        </div>

        <div className="relative mt-7 flex items-center gap-3 border-t border-dashed border-[var(--color-mint)] pt-5">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-[var(--color-gold)] shadow-[0_0_0_5px_rgba(212,165,116,0.18)]" />
          <p className="text-sm font-semibold text-[var(--color-deep-forest)]">
            {stop.moment}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function TravelPageContent() {
  const [visibleStops, setVisibleStops] = useState<Set<number>>(
    () => new Set(),
  );
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const stopElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-travel-stop]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleStops((current) => {
          const next = new Set(current);
          let changed = false;

          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const index = Number(entry.target.getAttribute("data-travel-stop"));
            if (!Number.isNaN(index) && !next.has(index)) {
              next.add(index);
              changed = true;
            }
          });

          return changed ? next : current;
        });
      },
      { rootMargin: "0px 0px -12%", threshold: 0.18 },
    );

    stopElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const routeProgress = (visibleStops.size / stops.length) * 100;

  return (
    <div className="overflow-hidden bg-[var(--color-soft-white)]">
      <section
        aria-labelledby="travel-title"
        className="relative isolate min-h-[43rem] overflow-hidden bg-[var(--color-deep-forest)] text-white"
      >
        <Image
          src="/images/home/hero-valley.webp"
          alt="Snowy Manali mountains above a forested valley"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[57%_center]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(7,42,31,0.95),rgba(7,55,41,0.79)_47%,rgba(7,47,37,0.4))]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-gradient-to-t from-[#063628] via-[#063628]/30 to-transparent" />
        <div aria-hidden="true" className="travel-hero-halo absolute -left-24 top-28 size-[25rem] rounded-full border border-white/10" />
        <div aria-hidden="true" className="absolute -right-20 bottom-[-11rem] size-[31rem] rounded-full border-[2.5rem] border-[var(--color-mint)]/10" />

        <div className="relative mx-auto flex min-h-[43rem] w-full max-w-[76rem] flex-col justify-end px-[clamp(1.25rem,4vw,2.5rem)] pb-14 pt-28 sm:pb-20 lg:min-h-[47rem] lg:pb-24">
          <div className="max-w-[49rem]">
            <div className="flex items-center gap-3 text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-[var(--color-mint)]">
              <span aria-hidden="true" className="h-px w-10 bg-current" />
              A moving Manali field guide
            </div>
            <h1
              id="travel-title"
              className="mt-5 max-w-[11ch] font-display text-[clamp(3.5rem,8.6vw,7.5rem)] font-extrabold leading-[0.84] tracking-[-0.075em]"
            >
              Follow the good kind of detour.
            </h1>
            <p className="mt-7 max-w-[51ch] text-base leading-7 text-white/84 sm:text-lg sm:leading-8">
              Five places, each with its own mood. Start where the air feels
              right, then let the valley shape the rest of your day.
            </p>
          </div>

          <div className="mt-11 flex flex-wrap items-end justify-between gap-5 border-t border-white/18 pt-5 sm:mt-14">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[var(--color-mint)] backdrop-blur-sm">
                <Icons.Route aria-hidden="true" className="size-5" />
              </span>
              <p className="text-sm font-semibold text-white/88">
                Scroll the route · five distinct stops
              </p>
            </div>
            <a
              href="#route-stops"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 text-sm font-bold text-white no-underline transition-colors hover:border-[var(--color-mint)] hover:bg-white/10"
            >
              Start exploring
              <Icons.ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      <section id="route-stops" className="relative mx-auto w-full max-w-[76rem] px-[clamp(1.25rem,4vw,2.5rem)] py-16 sm:py-24" aria-labelledby="route-stops-title">
        <div className="grid gap-10 lg:grid-cols-[minmax(15rem,0.56fr)_minmax(0,1.44fr)] lg:gap-10">
          <aside>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-forest)]">
              Choose a feeling, not a checklist
            </p>
            <h2 id="route-stops-title" className="mt-4 max-w-[11ch] font-display text-[clamp(2.6rem,4.4vw,4.2rem)] font-bold leading-[0.93] tracking-[-0.06em] text-[var(--color-deep-forest)]">
              The road is part of the plan.
            </h2>
            <div className="mt-10 space-y-11 sm:mx-auto sm:max-w-[24rem] lg:mx-0 lg:max-w-none">
              {stops.map((stop, index) => (
                <PhotoStack
                  key={stop.name}
                  stop={stop}
                  index={index}
                  onOpen={() => setActiveGalleryIndex(index)}
                />
              ))}
            </div>
          </aside>

          <div className="relative pb-4">
            <div aria-hidden="true" className="absolute bottom-10 left-3 top-10 border-l-2 border-dashed border-[var(--color-mint)]" />
            <div
              aria-hidden="true"
              className="absolute left-[0.6875rem] top-10 w-1 origin-top rounded-full bg-[var(--color-gold)] shadow-[0_0_0_4px_rgba(212,165,116,0.16)] transition-[height] duration-700 ease-out motion-reduce:transition-none"
              style={{ height: `${routeProgress}%` }}
            />
            <div className="relative space-y-9 sm:space-y-11 lg:space-y-12">
            {stops.map((stop, index) => (
              <div key={stop.name} className="relative pl-10 sm:pl-12">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-9 size-6 rounded-full border-4 border-[var(--color-soft-white)] shadow-[0_0_0_1px_var(--color-mint)] transition-colors duration-500 motion-reduce:transition-none ${
                    visibleStops.has(index)
                      ? "bg-[var(--color-gold)]"
                      : "bg-white"
                  }`}
                />
                <TravelStopCard
                  stop={stop}
                  index={index}
                  isVisible={visibleStops.has(index)}
                />
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-deep-forest)] px-[clamp(1.25rem,4vw,2.5rem)] py-14 text-white sm:py-20" aria-labelledby="travel-cta-title">
        <div className="mx-auto grid w-full max-w-[76rem] gap-8 rounded-[2rem] border border-white/15 bg-white/5 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--color-mint)]">Make it yours</p>
            <h2 id="travel-cta-title" className="mt-3 max-w-[17ch] font-display text-[clamp(2.3rem,4vw,3.75rem)] font-bold leading-[0.93] tracking-[-0.055em]">
              Have a few stops in mind already?
            </h2>
            <p className="mt-5 max-w-[52ch] leading-7 text-white/75">
              Send the shape of your day and we&apos;ll help turn it into a Manali plan that leaves room for the best unexpected view.
            </p>
          </div>
          <Link href="/contact" className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-6 text-sm font-extrabold text-[var(--color-ink)] no-underline transition-transform duration-300 hover:-translate-y-1">
            Start a trip brief
            <Icons.ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>

      {activeGalleryIndex !== null && (
        <PhotoLightbox
          key={stops[activeGalleryIndex].name}
          stop={stops[activeGalleryIndex]}
          onClose={() => setActiveGalleryIndex(null)}
        />
      )}
    </div>
  );
}
