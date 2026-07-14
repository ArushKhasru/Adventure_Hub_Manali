"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function PageLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      anchors: { offset: 96 },
      autoRaf: true,
      lerp: 0.09,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
