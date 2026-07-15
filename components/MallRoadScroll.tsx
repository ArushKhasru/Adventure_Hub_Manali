"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 300;
const FRAME_PATH = "/images/manali-walk/frames/ezgif-frame-";
const PRELOAD_AHEAD = 10;
const PRELOAD_BEHIND = 3;

function frameSrc(index: number) {
  return `${FRAME_PATH}${String(index + 1).padStart(3, "0")}.jpg`;
}

export default function MallRoadScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const frames = new Map<number, HTMLImageElement>();
    let currentFrame = -1;
    let targetFrame = 0;
    let smoothedFrame = 0;
    let scrollAnimationFrame = 0;
    let motionAnimationFrame = 0;

    const drawCover = (image: HTMLImageElement) => {
      const width = canvas.width;
      const height = canvas.height;
      const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      context.clearRect(0, 0, width, height);
      context.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
    };

    const drawFrame = (index: number) => {
      const image = frames.get(index);
      if (!image || !image.complete || image.naturalWidth === 0) return;
      currentFrame = index;
      drawCover(image);
    };

    const loadFrame = (index: number) => {
      if (index < 0 || index >= FRAME_COUNT || frames.has(index)) return;
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        if (index === Math.round(smoothedFrame) || currentFrame === -1) drawFrame(index);
      };
      image.src = frameSrc(index);
      frames.set(index, image);
    };

    const preloadAround = (index: number) => {
      for (let offset = -PRELOAD_BEHIND; offset <= PRELOAD_AHEAD; offset += 1) loadFrame(index + offset);
    };

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * ratio);
      canvas.height = Math.round(canvas.clientHeight * ratio);
      if (currentFrame >= 0) drawFrame(currentFrame);
    };

    const easeFrame = () => {
      motionAnimationFrame = 0;
      const difference = targetFrame - smoothedFrame;
      smoothedFrame += difference * 0.14;
      if (Math.abs(difference) < 0.08) smoothedFrame = targetFrame;
      const frame = Math.round(smoothedFrame);
      preloadAround(frame);
      drawFrame(frame);
      if (smoothedFrame !== targetFrame) motionAnimationFrame = window.requestAnimationFrame(easeFrame);
    };

    const update = () => {
      scrollAnimationFrame = 0;
      const bounds = wrap.getBoundingClientRect();
      const scrollLength = wrap.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -bounds.top / scrollLength));
      targetFrame = Math.round(progress * (FRAME_COUNT - 1));
      if (progressRef.current) progressRef.current.style.transform = `scaleY(${progress})`;
      preloadAround(targetFrame);
      if (!motionAnimationFrame) motionAnimationFrame = window.requestAnimationFrame(easeFrame);
    };

    const onScroll = () => {
      if (!scrollAnimationFrame) scrollAnimationFrame = window.requestAnimationFrame(update);
    };

    loadFrame(0);
    preloadAround(0);
    resize();
    update();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(scrollAnimationFrame);
      window.cancelAnimationFrame(motionAnimationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      frames.clear();
    };
  }, []);

  return (
    <section ref={wrapRef} aria-label="Scroll through Manali Mall Road" className="relative h-[400vh] bg-[#0b1f19]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0b1f19]">
        <canvas ref={canvasRef} className="size-full" />
        <div aria-hidden="true" className="absolute bottom-8 right-6 h-36 w-[3px] rounded-full bg-white/20 sm:right-8 sm:h-44">
          <div ref={progressRef} className="h-full origin-top scale-y-0 rounded-full bg-[#e8a75d]" />
        </div>
      </div>
    </section>
  );
}
