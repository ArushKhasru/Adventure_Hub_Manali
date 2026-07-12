"use client";

import { useEffect, useRef } from "react";
import { animate, splitText, stagger } from "animejs";

export default function TravelPage() {
  const travelRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!travelRef.current) {
      return;
    }

    const splitter = splitText(travelRef.current, {
      chars: { wrap: true },
    });

    const animation = animate(splitter.chars, {
      y: ["75%", "0%"],
      duration: 750,
      ease: "out(3)",
      delay: stagger(50),
      loop: true,
      alternate: true,
    });

    return () => {
      animation.pause();
      splitter.revert();
    };
  }, []);

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50 px-6 dark:bg-black">
      <h1
        ref={travelRef}
        className="text-center text-6xl font-semibold uppercase tracking-[0.35em] text-zinc-900 dark:text-white sm:text-7xl"
      >
        travel
      </h1>
    </main>
  );
}