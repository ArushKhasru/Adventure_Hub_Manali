"use client";

import { useEffect, useRef } from "react";
import { createTimeline, stagger, splitText } from "animejs";

export default function AboutPage() {
  const activitiesRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!activitiesRef.current) {
      return;
    }

    const splitter = splitText(activitiesRef.current, {
      chars: '<span class="char-3d word-{i}">\n    <em class="face face-top">{value}</em>\n    <em class="face-front">{value}</em>\n    <em class="face face-bottom">{value}</em>\n  </span>',
    });

    const charsStagger = stagger(100, { start: 0 });

    const timeline = createTimeline({
      defaults: { ease: "linear", loop: true, duration: 750 },
    })
      .add(".char-3d", { rotateX: -90 }, charsStagger)
      .add(".char-3d .face-top", { opacity: [0.5, 0] }, charsStagger)
      .add(".char-3d .face-front", { opacity: [1, 0.5] }, charsStagger)
      .add(".char-3d .face-bottom", { opacity: [0.5, 1] }, charsStagger);

    return () => {
      timeline.pause();
      splitter.revert();
    };
  }, []);

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50 px-6 dark:bg-black">
      <p
        ref={activitiesRef}
        className="text-center text-6xl font-semibold uppercase tracking-[0.35em] text-zinc-900 dark:text-white sm:text-7xl [transform-style:preserve-3d]"
      >
        activities
      </p>
    </main>
  );
}
