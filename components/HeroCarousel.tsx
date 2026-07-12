"use client";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    src: "/images/home/hero-valley.webp",
    title: "Explore the beauty of Manali",
    position: "object-center",
  },
  {
    src: "/images/home/hero-family.webp",
    title: "Create unforgettable memories",
    position: "object-[54%_center]",
  },
  {
    src: "/images/home/hero-adventure.webp",
    title: "Experience thrilling adventures",
    position: "object-center",
  },
  {
    src: "/images/home/hero-stay.webp",
    title: "Stay close to nature",
    position: "object-center",
  },
] as const;

const AUTOPLAY_INTERVAL = 6500;

function ArrowIcon({
  direction,
}: {
  direction: "previous" | "next";
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "previous" ? (
        <path d="m15 5-7 7 7 7" />
      ) : (
        <path d="m9 5 7 7-7 7" />
      )}
    </svg>
  );
}

function PlaybackIcon({ playing }: { playing: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="currentColor"
    >
      {playing ? (
        <>
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </>
      ) : (
        <path d="M8 5.8v12.4a1.2 1.2 0 0 0 1.84 1.01l8.68-6.2a1.2 1.2 0 0 0 0-2.02L9.84 4.79A1.2 1.2 0 0 0 8 5.8Z" />
      )}
    </svg>
  );
}

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const changeSlide = useCallback((nextIndex: number) => {
    const wrappedIndex =
      (nextIndex + slides.length) % slides.length;

    setActiveIndex(wrappedIndex);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % slides.length;
      });
    }, AUTOPLAY_INTERVAL);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPlaying]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (mediaQuery.matches) {
      setIsPlaying(false);
    }
  }, []);

  return (
    <section
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#064d39] text-white"
      aria-roledescription="carousel"
      aria-label="Adventure Hub Manali highlights"
    >
      {/* Full-width image slider */}
      <div className="absolute inset-0">
        <div
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{
            transform: `translate3d(-${activeIndex * 100}%, 0, 0)`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.src}
              className="relative h-full min-w-full"
              aria-hidden={index !== activeIndex}
            >
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                priority={index === 0}
                quality={88}
                sizes="100vw"
                className={`object-cover ${slide.position}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Image overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/35"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/55"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/15"
      />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] items-center justify-center px-6 pb-28 pt-28 text-center sm:px-10 lg:px-16">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-white/80 sm:text-sm">
            Discover Manali
          </p>

          <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Your perfect
            <span className="block">mountain escape</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl">
            Comfy stays, easy travels and epic adventures.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md border border-white bg-white px-7 py-3 text-sm font-semibold text-[#064d39] no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            Plan your trip
          </Link>
        </div>
      </div>

      {/* Previous arrow */}
      <button
        type="button"
        aria-label="Show previous slide"
        onClick={() => changeSlide(activeIndex - 1)}
        className="absolute left-3 top-1/2 z-20 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-transparent text-white transition-transform duration-300 hover:scale-110 hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6 lg:left-10"
      >
        <ArrowIcon direction="previous" />
      </button>

      {/* Next arrow */}
      <button
        type="button"
        aria-label="Show next slide"
        onClick={() => changeSlide(activeIndex + 1)}
        className="absolute right-3 top-1/2 z-20 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-transparent text-white transition-transform duration-300 hover:scale-110 hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6 lg:right-10"
      >
        <ArrowIcon direction="next" />
      </button>

      {/* Slide indicators */}
      <div
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 sm:bottom-10"
        role="group"
        aria-label="Choose a slide"
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={slide.src}
              type="button"
              aria-label={`Show slide ${index + 1}: ${slide.title}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => changeSlide(index)}
              className="flex size-8 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span
                className={`block h-1.5 rounded-full bg-white transition-all duration-300 ${isActive
                    ? "w-8 opacity-100"
                    : "w-1.5 opacity-55 hover:opacity-100"
                  }`}
              />
            </button>
          );
        })}
      </div>

      {/* Icon-only autoplay control */}
      <button
        type="button"
        aria-label={
          isPlaying
            ? "Pause slide rotation"
            : "Start slide rotation"
        }
        aria-pressed={!isPlaying}
        onClick={() => setIsPlaying((current) => !current)}
        className="absolute bottom-8 right-5 z-30 inline-flex size-11 items-center justify-center rounded-full border border-white/40 bg-transparent text-white transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:bottom-10 sm:right-8 lg:right-12"
      >
        <PlaybackIcon playing={isPlaying} />
      </button>
    </section>
  );
}