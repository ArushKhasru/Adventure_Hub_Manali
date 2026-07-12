"use client";

import { useEffect, useRef } from "react";
import { createTimeline, stagger, splitText } from "animejs";

export default function Home() {
  const homeTextRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!homeTextRef.current) {
      return;
    }

    const splitter = splitText(homeTextRef.current, {
      chars: {
        wrap: "clip",
        clone: "bottom",
      },
    });

    const timeline = createTimeline({ loop: true });

    timeline.add(
      splitter.chars,
      {
        y: "-100%",
        loop: true,
        loopDelay: 350,
        duration: 750,
        ease: "inOut(2)",
      },
      stagger(150, { from: "center" }),
    );

    return () => {
      timeline.pause();
      splitter.revert();
    };
  }, []);

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50 px-6 font-sans dark:bg-black">
      <p
        ref={homeTextRef}
        className="text-center text-6xl font-semibold uppercase tracking-[0.35em] text-zinc-900 dark:text-white sm:text-7xl"
      >
       Homepage will go here
      </p>
    </main>
  );
}
