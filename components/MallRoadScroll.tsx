"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 300;
const FRAME_PATH = "/images/manali-walk/frames/ezgif-frame-";
const PRELOAD_AHEAD = 10;
const PRELOAD_BEHIND = 3;

const STORY_BEATS = [
  { eyebrow: "Manali, at your pace", title: "Step into\nthe valley.", copy: "The road opens slowly - pine air, mountain light, and nowhere else to be." },
  { eyebrow: "A little closer", title: "Let the day\nunfold.", copy: "Follow the movement of Mall Road, where warm cafes and small discoveries fill the hours." },
  { eyebrow: "Keep wandering", title: "Find your\nfavourite turn.", copy: "A quiet lane, a view that makes you pause, a story worth taking home." },
  { eyebrow: "Make it yours", title: "This is your\nmountain day.", copy: "Take the long way. Manali is ready whenever you are." },
];

function frameSrc(index: number) {
  return `${FRAME_PATH}${String(index + 1).padStart(3, "0")}.jpg`;
}

export default function MallRoadScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const chapterRef = useRef<HTMLParagraphElement>(null);
  const finalMessageRef = useRef<HTMLDivElement>(null);

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
    let activeBeat = 0;

    const updateStory = (progress: number) => {
      const isAtLastFrame = progress >= 0.995;
      storyRef.current?.classList.toggle("hidden", isAtLastFrame);
      finalMessageRef.current?.classList.toggle("hidden", !isAtLastFrame);
      if (isAtLastFrame) {
        activeBeat = -1;
        return;
      }

      const nextBeat = Math.min(STORY_BEATS.length - 1, Math.floor(progress * STORY_BEATS.length));
      if (nextBeat === activeBeat) return;
      activeBeat = nextBeat;
      const beat = STORY_BEATS[nextBeat];
      if (eyebrowRef.current) eyebrowRef.current.textContent = beat.eyebrow;
      if (titleRef.current) titleRef.current.textContent = beat.title;
      if (copyRef.current) copyRef.current.textContent = beat.copy;
      if (chapterRef.current) chapterRef.current.textContent = `${String(nextBeat + 1).padStart(2, "0")} / ${String(STORY_BEATS.length).padStart(2, "0")}`;
      storyRef.current?.animate(
        [{ opacity: 0.35, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 360, easing: "ease-out" },
      );
    };

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
      updateStory(progress);
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
      <div className="sticky top-0 grid h-screen grid-rows-[1fr_.82fr] overflow-hidden bg-[#0b1f19] md:grid-cols-2 md:grid-rows-1">
        <div className="relative min-h-0 overflow-hidden">
          <canvas ref={canvasRef} className="size-full" />
        </div>
        <aside className="relative flex min-h-0 items-center bg-[#0b1f19] px-7 py-10 text-white sm:px-12 md:px-14 lg:px-[clamp(3.5rem,7vw,9rem)]">
          <div ref={storyRef} className="max-w-[30rem]">
            <p ref={chapterRef} className="text-xs font-extrabold tracking-[.22em] text-[#f1bc7d]">01 / 04</p>
            <p ref={eyebrowRef} className="mt-7 text-xs font-bold uppercase tracking-[.2em] text-white/65">Manali, at your pace</p>
            <h1 ref={titleRef} className="mt-4 whitespace-pre-line font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[.88] tracking-[-.065em] text-white sm:text-6xl lg:text-7xl">Step into{`\n`}the valley.</h1>
            <p ref={copyRef} className="mt-6 max-w-[38ch] text-pretty text-sm leading-6 text-white/75 sm:text-base sm:leading-7">The road opens slowly - pine air, mountain light, and nowhere else to be.</p>
          </div>
          <div ref={finalMessageRef} className="hidden max-w-[12ch] font-[family-name:var(--font-display)] text-6xl font-extrabold leading-[.86] tracking-[-.07em] text-white sm:text-7xl lg:text-8xl">Scroll down to move</div>
          <div aria-hidden="true" className="absolute bottom-8 right-7 h-24 w-[3px] rounded-full bg-white/20 sm:right-12 md:right-14 lg:right-[clamp(3.5rem,7vw,9rem)]">
            <div ref={progressRef} className="h-full origin-top scale-y-0 rounded-full bg-[#e8a75d]" />
          </div>
        </aside>
      </div>
    </section>
  );
}