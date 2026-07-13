"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const SPLASH_DURATION = 1000;
const EXIT_DURATION = 200;

type Scene = "rafting" | "paragliding";
type SplashState = {
  scene: Scene;
  phase: "playing" | "leaving";
};

function RaftingScene() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 360 240"
      className="h-auto w-full max-w-[24rem] overflow-visible"
      fill="none"
    >
      <path
        d="M12 157c35-24 63 20 99-2 29-18 51-15 76 2 32 22 69-19 161-1"
        className="splash-water splash-water-one"
      />
      <path
        d="M2 181c47-23 72 20 117-2 31-15 59-13 87 3 31 17 65-17 150-1"
        className="splash-water splash-water-two"
      />
      <path
        d="M18 204c38-20 72 21 115-3 35-19 58-8 85 4 38 17 75-16 128-3"
        className="splash-water splash-water-three"
      />
      <path
        d="M42 115 98 54l35 38 42-65 55 88H42Z"
        className="splash-mountain"
      />
      <path d="m86 69 12-15 13 15" className="splash-mountain-detail" />
      <path d="m156 57 19-30 18 29" className="splash-mountain-detail" />
      <g className="splash-raft">
        <path d="M100 165c23 16 78 16 104 0" className="splash-raft-base" />
        <path d="M119 150c11-17 24-17 35 0M153 150c11-17 24-17 35 0" className="splash-stick" />
        <path d="M136 130v17m-8-8 8-9 8 9M171 130v17m-8-8 8-9 8 9" className="splash-stick" />
        <path d="m111 125 17 42m68-42-17 42" className="splash-paddle" />
      </g>
    </svg>
  );
}

function ParaglidingScene() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 360 240"
      className="h-auto w-full max-w-[24rem] overflow-visible"
      fill="none"
    >
      <path d="M20 190c57-38 103 19 169-11 49-22 91 4 151-19" className="splash-hill" />
      <path d="M37 209c55-21 86 12 141-7 57-20 97 6 154-10" className="splash-water splash-water-three" />
      <g className="splash-glider">
        <path d="M57 89C93 27 264 27 303 89c-47 29-196 29-246 0Z" className="splash-wing" />
        <path d="M82 87c46 19 150 19 195 0" className="splash-wing-detail" />
        <path d="m99 98 57 62m-22-56 28 56m64-56-28 56m63-62-57 62" className="splash-cord" />
        <circle cx="180" cy="157" r="7" className="splash-head" />
        <path d="M180 166c-9 12-8 25 4 32m-1-26 18 10m-16 15-13 17m14-17 15 13" className="splash-stick" />
        <path d="M168 183c-7 4-12 7-17 14m48-15c7 3 12 8 15 14" className="splash-stick" />
      </g>
      <path d="M270 70c13-10 31-9 42 2 11-5 27 1 30 14h-79c0-7 3-12 7-16Z" className="splash-cloud splash-cloud-one" />
      <path d="M23 115c10-8 24-6 31 3 9-3 20 2 22 12H17c0-6 2-11 6-15Z" className="splash-cloud splash-cloud-two" />
    </svg>
  );
}

export default function RouteSplash() {
  const router = useRouter();
  const pathname = usePathname();
  const [splash, setSplash] = useState<SplashState | null>(null);
  const splashActive = useRef(false);
  const navigationPending = useRef(false);
  const pendingPathname = useRef<string | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);

  const beginTransition = useCallback(
    (href: string) => {
      if (splashActive.current || navigationPending.current) return;

      const destination = new URL(href, window.location.origin);
      navigationPending.current = true;
      pendingPathname.current = destination.pathname;
      router.prefetch(href);
      router.push(href);
    },
    [router],
  );

  useEffect(() => {
    if (!navigationPending.current || pendingPathname.current !== pathname) {
      return;
    }

    navigationPending.current = false;
    pendingPathname.current = null;
    splashActive.current = true;
    setSplash({
      scene: Math.random() < 0.5 ? "rafting" : "paragliding",
      phase: "playing",
    });

    timers.current = [
      window.setTimeout(() => {
        setSplash((current) =>
          current ? { ...current, phase: "leaving" } : current,
        );
      }, SPLASH_DURATION - EXIT_DURATION),
      window.setTimeout(() => {
        setSplash(null);
        splashActive.current = false;
        timers.current = [];
      }, SPLASH_DURATION),
    ];
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (
        !anchor ||
        anchor.target ||
        anchor.hasAttribute("download") ||
        anchor.dataset.routeSplash === "false"
      ) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      const currentUrl = new URL(window.location.href);

      if (
        url.origin !== currentUrl.origin ||
        url.protocol !== "http:" && url.protocol !== "https:" ||
        (url.pathname === currentUrl.pathname &&
          url.search === currentUrl.search &&
          url.hash !== "")
      ) {
        return;
      }

      if (
        url.pathname === currentUrl.pathname &&
        url.search === currentUrl.search &&
        url.hash === currentUrl.hash
      ) {
        return;
      }

      event.preventDefault();
      beginTransition(`${url.pathname}${url.search}${url.hash}`);
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      clearTimers();
    };
  }, [beginTransition, clearTimers]);

  if (!splash) return null;

  const isRafting = splash.scene === "rafting";

  return (
    <div
      className={`route-splash ${
        splash.phase === "leaving" ? "route-splash-leaving" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label={`Loading your next Manali moment: ${
        isRafting ? "rafting" : "paragliding"
      }`}
    >
      <div className="route-splash-panel relative z-10 flex w-[min(90vw,26rem)] flex-col items-center rounded-[2rem] bg-[var(--color-deep-forest)] px-6 py-7 text-center shadow-[0_22px_60px_rgba(26,26,46,0.22)] sm:px-8 sm:py-8">
        <p className="font-display text-sm font-bold uppercase tracking-[0.22em] text-[var(--color-mint)]">
          Adventure Hub Manali
        </p>
        <div className="mt-5 w-full">
          {isRafting ? <RaftingScene /> : <ParaglidingScene />}
        </div>
        <p className="mt-4 font-display text-2xl font-bold tracking-[-0.035em] text-white sm:text-3xl">
          {isRafting ? "Loading the river line…" : "Loading the mountain air…"}
        </p>
        <p className="mt-2 text-sm leading-6 text-white/72">
          Your next adventure is getting ready.
        </p>
        <span className="route-splash-progress mt-5 h-1 w-36 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
          <span />
        </span>
      </div>
    </div>
  );
}
