"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import Icons from "@/components/Icons";

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

export default function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  /*
   * 0 = top of hero
   * 1 = hero has completely left the viewport
   */
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.25,
  });

  /*
   * Mountain divider disappears during the first
   * part of the scroll.
   */
  const mountainOpacity = useTransform(
    smoothProgress,
    [0, 0.04, 0.14],
    [1, 0.9, 0],
  );

  const mountainScaleY = useTransform(
    smoothProgress,
    [0, 0.14],
    [1, 0.05],
  );

  const mountainY = useTransform(
    smoothProgress,
    [0, 0.14],
    [0, 24],
  );

  /*
   * The range indicator appears after scrolling starts
   * and disappears when the hero has passed.
   */
  const rangeOpacity = useTransform(
    smoothProgress,
    [0, 0.035, 0.1, 0.9, 1],
    [0, 0.2, 1, 1, 0],
  );

  const rangeY = useTransform(
    smoothProgress,
    [0, 0.1],
    [14, 0],
  );

  const thumbPosition = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "100%"],
  );

  const changeSlide = useCallback((nextIndex: number) => {
    const wrappedIndex =
      (nextIndex + slides.length) % slides.length;

    setActiveIndex(wrappedIndex);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setInterval(() => {
      setActiveIndex(
        (currentIndex) => (currentIndex + 1) % slides.length,
      );
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
    <>
      <section
        ref={heroRef}
        className="relative isolate h-[100dvh] min-h-[100svh] w-full overflow-hidden bg-[#064d39] text-white"
        aria-roledescription="carousel"
        aria-label="Adventure Hub Manali highlights"
      >
        {/* Full-screen image slider */}
        <div className="absolute inset-0">
          <div
            className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            style={{
              transform: `translate3d(-${activeIndex * 100}%, 0, 0)`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.src}
                className="relative h-full min-w-full shrink-0"
                aria-hidden={index !== activeIndex}
              >
                <Image
                  src={slide.src}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  quality={90}
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
          className="absolute inset-0 bg-black/30"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/55"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/15"
        />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1440px] items-center justify-center px-6 pb-28 pt-28 text-center sm:px-10 lg:px-16">
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
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md border border-white bg-white px-7 py-3 text-sm font-semibold text-[#064d39] no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Plan your trip
            </Link>
          </div>
        </div>

        {/* Previous slide */}
        <button
          type="button"
          aria-label="Show previous slide"
          onClick={() => changeSlide(activeIndex - 1)}
          className="absolute left-3 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-transparent text-white transition-transform duration-300 hover:scale-110 sm:left-6 sm:size-12 lg:left-10"
        >
          <Icons.ChevronLeft
            aria-hidden="true"
            className="size-7"
            strokeWidth={1.8}
          />
        </button>

        {/* Next slide */}
        <button
          type="button"
          aria-label="Show next slide"
          onClick={() => changeSlide(activeIndex + 1)}
          className="absolute right-3 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-transparent text-white transition-transform duration-300 hover:scale-110 sm:right-6 sm:size-12 lg:right-10"
        >
          <Icons.ChevronRight
            aria-hidden="true"
            className="size-7"
            strokeWidth={1.8}
          />
        </button>

        {/* Slider indicators */}
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
                className="flex size-8 items-center justify-center rounded-full"
              >
                <span
                  className={`block h-1.5 rounded-full bg-white transition-all duration-300 ${
                    isActive
                      ? "w-8 opacity-100"
                      : "w-1.5 opacity-55 hover:opacity-100"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Play/pause */}
        <button
          type="button"
          aria-label={
            isPlaying
              ? "Pause slide rotation"
              : "Start slide rotation"
          }
          aria-pressed={!isPlaying}
          onClick={() => setIsPlaying((current) => !current)}
          className="absolute bottom-8 right-5 z-30 inline-flex size-11 items-center justify-center rounded-full border border-white/40 bg-transparent text-white transition-transform duration-300 hover:scale-105 sm:bottom-10 sm:right-8 lg:right-12"
        >
          {isPlaying ? (
            <Icons.Pause
              aria-hidden="true"
              className="size-5"
              strokeWidth={2.4}
            />
          ) : (
            <Icons.Play
              aria-hidden="true"
              className="size-5"
              fill="currentColor"
              strokeWidth={1.5}
            />
          )}
        </button>

        {/* Initial mountain-shaped bottom divider */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-40 h-16 origin-bottom"
          style={{
            opacity: mountainOpacity,
            scaleY: mountainScaleY,
            y: mountainY,
          }}
        >
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              d="
                M0 54
                L70 34
                L135 56
                L205 30
                L280 55
                L355 36
                L430 61
                L510 31
                L590 55
                L665 35
                L745 59
                L825 30
                L905 57
                L985 34
                L1065 61
                L1140 31
                L1220 56
                L1295 35
                L1370 58
                L1440 39
                L1440 80
                L0 80
                Z
              "
              fill="#ffffff"
            />
          </svg>
        </motion.div>
      </section>

      {/* Range-style hero scroll indicator */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-5 left-1/2 z-[60] w-[min(17rem,68vw)] -translate-x-1/2 sm:bottom-7 sm:w-80"
        style={{
          opacity: rangeOpacity,
          y: rangeY,
        }}
      >
        <div className="relative h-5">
          {/* Track */}
          <div className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 overflow-hidden rounded-full bg-white/35 shadow-[0_2px_12px_rgba(0,0,0,0.25)] backdrop-blur-sm">
            {/* Filled progress */}
            <motion.div
              className="h-full w-full origin-left rounded-full bg-white"
              style={{
                scaleX: smoothProgress,
              }}
            />
          </div>

          {/* Thumb */}
          <motion.span
            className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#07563f] shadow-[0_3px_12px_rgba(0,0,0,0.35)]"
            style={{
              left: thumbPosition,
            }}
          />
        </div>
      </motion.div>
    </>
  );
}