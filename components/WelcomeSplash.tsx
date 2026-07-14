"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const INTRO_DURATION = 2500;
const EXIT_DURATION = 420;

function MountainMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 100"
      className="h-auto w-44 text-white sm:w-52"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 75 54 28l24 28 26-38 34 42 19-21 48 36H14Z" strokeWidth="3" />
      <path d="m41 44 13 10 11-12 13 14m18-12 8-12 12 17 13-8 15 18" strokeWidth="2" opacity="0.85" />
      <path d="M38 85c35-15 83 13 143-5" strokeWidth="2" strokeDasharray="3 8" />
      <path d="M181 23c0-7 5-12 12-12s12 5 12 12c0 9-12 22-12 22s-12-13-12-22Z" strokeWidth="2.5" />
      <circle cx="193" cy="23" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TrailDrawing() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 560 210"
      className="h-auto w-full max-w-[35rem] overflow-visible"
      fill="none"
    >
      <path d="M18 183C87 98 132 202 209 142c66-51 78-127 159-102 67 21 74 72 173-72" className="welcome-trail" />
      <circle cx="18" cy="183" r="7" className="welcome-trail-start" />
      <g className="welcome-trail-marker">
        <circle cx="366" cy="91" r="12" className="welcome-marker-ring" />
        <circle cx="366" cy="91" r="4" className="welcome-marker-core" />
      </g>
    </svg>
  );
}

export default function WelcomeSplash() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const hasHandledInitialPath = useRef(false);
  const dismissing = useRef(false);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const dismiss = useCallback(() => {
    if (dismissing.current) return;

    dismissing.current = true;
    setIsLeaving(true);
    timers.current.push(
      window.setTimeout(() => {
        setIsVisible(false);
      }, EXIT_DURATION),
    );
  }, []);

  useEffect(() => {
    if (hasHandledInitialPath.current) return;
    hasHandledInitialPath.current = true;
    if (pathname !== "/") return;

    setIsVisible(true);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    timers.current.push(
      window.setTimeout(dismiss, reduceMotion ? 900 : INTRO_DURATION),
    );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimers();
    };
  }, [clearTimers, dismiss, pathname]);

  if (!isVisible) return null;

  return (
    <section
      className={`welcome-splash ${isLeaving ? "welcome-splash-leaving" : ""}`}
      aria-label="Welcome to Adventure Hub Manali"
    >
      <Image
        src="/images/home/hero-valley.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="welcome-splash-image object-cover object-center"
      />
      <div className="welcome-splash-tint" aria-hidden="true" />
      <div className="welcome-splash-glow welcome-splash-glow-one" aria-hidden="true" />
      <div className="welcome-splash-glow welcome-splash-glow-two" aria-hidden="true" />

      <div className="welcome-splash-content">
        <div className="welcome-splash-mark">
          <MountainMark />
        </div>
        <p className="welcome-splash-kicker">A little way into the Himalayas</p>
        <h1 className="welcome-splash-title">
          Your Manali story
          <span>starts here.</span>
        </h1>
        <p className="welcome-splash-copy">
          Stay, travel, and adventure—gathered around one mountain plan.
        </p>
        <TrailDrawing />
      </div>
    </section>
  );
}
