"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Icons from "@/components/Icons";


const tripStyles = [
  "A slow family escape",
  "An adventure-filled few days",
  "A little of both",
] as const;

type CopyState = "idle" | "copied" | "unavailable";

type TripDetails = {
  name: string;
  dates: string;
  group: string;
  note: string;
};

const WHATSAPP_NUMBER = "0000000000";
const PHONE_NUMBER = "+0000000000";
const PHONE_DISPLAY = "0000000000";
const directWhatsAppHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Adventure Hub Manali! I am interested in planning a trip to Manali and would like some guidance. Can you help me get started?",
)}`;

export default function ContactPageContent() {
  const [tripStyle, setTripStyle] = useState<(typeof tripStyles)[number]>(
    tripStyles[1],
  );
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [isBriefHighlighted, setIsBriefHighlighted] = useState(false);
  const briefFormRef = useRef<HTMLFormElement>(null);
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    name: "",
    dates: "",
    group: "",
    note: "",
  });

  const hasCompleteTripBrief = Boolean(
    tripDetails.name.trim() && tripDetails.group.trim(),
  );
  const tripBrief = [
    "Hi Adventure Hub Manali! 👋",
    "",
    "I am planning a Manali trip and would love your help.",
    "",
    `Name: ${tripDetails.name.trim()}`,
    `Trip style: ${tripStyle}`,
    `When: ${tripDetails.dates.trim() || "Dates to be decided"}`,
    `Who is coming: ${tripDetails.group.trim()}`,
    `Must-do: ${tripDetails.note.trim() || "Still deciding"}`,
    "",
    "Please share options that fit this plan.",
  ].join("\n");
  const postcardWhatsAppHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(tripBrief)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tripBrief);
      setCopyState("copied");
    } catch {
      setCopyState("unavailable");
    }
  };

  const updateTripDetail = (field: keyof TripDetails, value: string) => {
    setTripDetails((current) => ({ ...current, [field]: value }));
  };

  const returnToTripBrief = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    briefFormRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });
    setIsBriefHighlighted(true);
  };

  useEffect(() => {
    if (copyState !== "copied") return;

    const timer = window.setTimeout(() => setCopyState("idle"), 2000);

    return () => window.clearTimeout(timer);
  }, [copyState]);

  useEffect(() => {
    if (!isBriefHighlighted) return;

    const timer = window.setTimeout(() => setIsBriefHighlighted(false), 1100);

    return () => window.clearTimeout(timer);
  }, [isBriefHighlighted]);

  const statusMessage =
    copyState === "copied"
      ? "Trip brief copied. Keep it handy for when you message the team."
      : copyState === "unavailable"
        ? "Your browser could not copy the brief. You can still keep these details handy."
        : "Your details stay on this device; nothing is sent from this page.";

  return (
    <div className="overflow-hidden bg-[var(--color-soft-white)]">
      <section
        className="relative isolate overflow-hidden bg-[var(--color-deep-forest)] text-white"
        aria-labelledby="contact-title"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
        >
          <Image
            src="/images/home/hero-valley.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[54%_center]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#092d22]/95 via-[#103e30]/78 to-[#0f392b]/38"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#092d22]/68 via-transparent to-[#092d22]/24"
        />

        <div className="relative mx-auto grid min-h-[36rem] w-full max-w-[76rem] gap-10 px-[clamp(1.25rem,4vw,2.5rem)] pb-14 pt-16 sm:pb-20 sm:pt-24 lg:min-h-[42rem] lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-28">
          <div>
            <h1
              id="contact-title"
              className="max-w-[10ch] font-display text-[clamp(3.2rem,7vw,5.8rem)] font-extrabold leading-[0.91] tracking-[-0.055em]"
            >
              Let&apos;s put your mountain plan on the map.
            </h1>
            <p className="mt-6 max-w-[56ch] text-base leading-7 text-white/82 sm:text-lg sm:leading-8">
              Start with a few loose ideas. A stay, a scenic drive, a river
              day—your Manali plan does not need to be perfect before it gets
              exciting.
            </p>
          </div>

          <div className="relative rounded-[1.75rem] border border-white/22 bg-[#103e30]/52 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-md sm:p-6">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-gold)] text-[var(--color-ink)] shadow-lg">
                <Icons.MapPinned aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="font-display text-xl font-bold">No fixed itinerary? Perfect.</p>
                <p className="mt-1 text-sm leading-6 text-white/70">
                  Pick the feeling first. The details can follow the road.
                </p>
              </div>
            </div>
            <div className="mt-5 border-t border-dashed border-white/20 pt-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-mint)]">
                One place for
              </p>
              <p className="mt-2 text-sm font-semibold text-white/88">
                Stays · travel · tours · activities
              </p>
            </div>
          </div>
        </div>

      </section>

      <section className="relative mx-auto grid w-full max-w-[76rem] gap-10 px-[clamp(1.25rem,4vw,2.5rem)] py-14 sm:py-20 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16 lg:py-24" aria-labelledby="brief-title">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-forest)]">
            A small travel note
          </p>
          <h2
            id="brief-title"
            className="mt-3 max-w-[12ch] font-display text-[clamp(2.35rem,4vw,3.75rem)] font-bold leading-[0.98] tracking-[-0.045em] text-[var(--color-deep-forest)]"
          >
            Make a trip brief worth sending.
          </h2>
          <p className="mt-5 max-w-[42ch] leading-7 text-[var(--color-muted-slate)]">
            This is a quick planning card, not another long enquiry form. Copy
            it when you&apos;re ready, then share it through Adventure Hub&apos;s
            confirmed channel.
          </p>

          <div className="mt-8 rounded-2xl border border-[var(--color-mint)] bg-[var(--color-forest-wash)] p-5 text-[var(--color-deep-forest)]">
            <div className="flex gap-3">
              <Icons.Clock3 aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
              <div>
                <p className="font-bold">Call or WhatsApp when you&apos;re ready</p>
                <p className="mt-1 text-sm leading-6 text-[var(--color-muted-slate)]">
                  Make your postcard specific, send a quick hello, or call us
                  directly at {PHONE_DISPLAY}.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-5 min-h-72 overflow-hidden rounded-[1.75rem] bg-[var(--color-deep-forest)] p-6 text-white shadow-[0_18px_42px_rgba(30,77,58,0.16)]">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-20 size-56 rounded-full border-[1.25rem] border-[var(--color-forest)]"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-16 -left-12 size-44 rounded-full border border-white/12"
            />
            <div className="relative flex h-full flex-col">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-white/10 text-[var(--color-mint)]">
                <Icons.Compass aria-hidden="true" className="size-5" />
              </span>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-mint)]">
                Your route, your pace
              </p>
              <h3 className="mt-2 max-w-[15ch] font-display text-2xl font-bold leading-[1.05] tracking-[-0.035em]">
                Good trips can begin with two small details.
              </h3>
              <ol className="mt-auto space-y-3 border-l border-dashed border-white/30 pl-4 pt-7 text-sm text-white/82">
                <li className="relative before:absolute before:-left-[1.34rem] before:top-1.5 before:size-2 before:rounded-full before:bg-[var(--color-gold)]">
                  Tell us who&apos;s coming.
                </li>
                <li className="relative before:absolute before:-left-[1.34rem] before:top-1.5 before:size-2 before:rounded-full before:bg-[var(--color-mint)]">
                  Pick your kind of Manali.
                </li>
                <li className="relative before:absolute before:-left-[1.34rem] before:top-1.5 before:size-2 before:rounded-full before:bg-white">
                  We&apos;ll take it from there.
                </li>
              </ol>
            </div>
          </div>
        </aside>

        <form
          ref={briefFormRef}
          onSubmit={(event) => event.preventDefault()}
          className={`relative rounded-[2rem] border bg-white p-5 transition-[box-shadow,border-color,transform] duration-500 motion-reduce:transition-none sm:p-8 ${
            isBriefHighlighted
              ? "border-[var(--color-gold)] shadow-[0_0_0_0.45rem_rgba(212,165,116,0.25),0_22px_56px_rgba(30,77,58,0.18)]"
              : "border-[var(--color-mint)] shadow-[0_18px_50px_rgba(30,77,58,0.1)]"
          }`}
        >
          <div aria-hidden="true" className="absolute right-7 top-0 h-12 w-px bg-[var(--color-gold)] sm:right-10" />
          <div className="flex items-start justify-between gap-4 border-b border-[var(--color-mint)] pb-6">
            <div>
              <p className="font-display text-2xl font-bold tracking-[-0.035em] text-[var(--color-deep-forest)]">
                My Manali postcard
              </p>
              <p className="mt-1 text-sm text-[var(--color-muted-slate)]">
                A few cues are all we need to start.
              </p>
            </div>
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest-wash)] text-[var(--color-forest)]">
              <Icons.MapPinned aria-hidden="true" className="size-5" />
            </span>
          </div>

          <fieldset className="mt-7">
            <legend className="text-sm font-bold text-[var(--color-deep-forest)]">
              What kind of trip are you picturing?
            </legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {tripStyles.map((style) => {
                const selected = style === tripStyle;
                return (
                  <button
                    key={style}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setTripStyle(style)}
                    className={`min-h-20 rounded-xl border p-3 text-left text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 motion-reduce:transition-none ${
                      selected
                        ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white shadow-[0_8px_20px_rgba(45,106,79,0.2)]"
                        : "border-[var(--color-mint)] bg-white text-[var(--color-deep-forest)] hover:-translate-y-0.5 hover:border-[var(--color-forest)] hover:bg-[var(--color-forest-wash)]"
                    }`}
                  >
                    <span className="flex items-start justify-between gap-2">
                      <span>{style}</span>
                      {selected && <Icons.Check aria-hidden="true" className="size-4 shrink-0" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-[var(--color-deep-forest)]">
                Your name <span aria-hidden="true" className="text-[var(--color-forest)]">*</span>
                <span className="sr-only"> (required)</span>
              </span>
              <input
                name="name"
                autoComplete="name"
                placeholder="e.g. Aditi"
                required
                value={tripDetails.name}
                onChange={(event) => updateTripDetail("name", event.target.value)}
                className="mt-2 block min-h-12 w-full rounded-xl border border-[var(--color-mint)] bg-[var(--color-soft-white)] px-4 text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-muted-slate)] focus:border-[var(--color-forest)] focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-[var(--color-deep-forest)]">When are you thinking?</span>
              <input
                name="dates"
                placeholder="e.g. October, 3 nights"
                value={tripDetails.dates}
                onChange={(event) => updateTripDetail("dates", event.target.value)}
                className="mt-2 block min-h-12 w-full rounded-xl border border-[var(--color-mint)] bg-[var(--color-soft-white)] px-4 text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-muted-slate)] focus:border-[var(--color-forest)] focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-[var(--color-deep-forest)]">
                Who&apos;s coming? <span aria-hidden="true" className="text-[var(--color-forest)]">*</span>
                <span className="sr-only"> (required)</span>
              </span>
              <input
                name="group"
                placeholder="e.g. 2 adults + 2 kids"
                required
                value={tripDetails.group}
                onChange={(event) => updateTripDetail("group", event.target.value)}
                className="mt-2 block min-h-12 w-full rounded-xl border border-[var(--color-mint)] bg-[var(--color-soft-white)] px-4 text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-muted-slate)] focus:border-[var(--color-forest)] focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-[var(--color-deep-forest)]">One must-do?</span>
              <input
                name="note"
                placeholder="e.g. Rafting and a cozy stay"
                value={tripDetails.note}
                onChange={(event) => updateTripDetail("note", event.target.value)}
                className="mt-2 block min-h-12 w-full rounded-xl border border-[var(--color-mint)] bg-[var(--color-soft-white)] px-4 text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-muted-slate)] focus:border-[var(--color-forest)] focus:bg-white"
              />
            </label>
          </div>

          <div className="mt-7 border-t border-dashed border-[var(--color-mint)] pt-6">
            <p className="max-w-[38ch] text-xs leading-5 text-[var(--color-muted-slate)]" aria-live="polite">
              {hasCompleteTripBrief
                ? statusMessage
                : "Complete the required fields to unlock your WhatsApp handoff."}
            </p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleCopy}
                className="group inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-xl border border-[var(--color-gold)] bg-white px-5 py-3 text-center text-sm font-bold text-[var(--color-ink)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-gold)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 motion-reduce:transition-none"
              >
                {copyState === "copied" ? "Brief copied" : "Copy my trip brief"}
                {copyState === "copied" ? (
                  <Icons.Check aria-hidden="true" className="size-4" />
                ) : (
                  <Icons.Copy aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                )}
              </button>
              <button
                type="button"
                disabled={!hasCompleteTripBrief}
                onClick={() => {
                  window.open(postcardWhatsAppHref, "_blank", "noopener,noreferrer");
                }}
                className="inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-5 py-3 text-center text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-deep-forest)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[var(--color-muted-slate)] disabled:text-white/70 disabled:opacity-55 disabled:hover:translate-y-0 motion-reduce:transition-none"
              >
                Send postcard on WhatsApp
                <Icons.WhatsAppIcon aria-hidden="true" className="size-4" />
              </button>
            </div>
          </div>
        </form>
      </section>

      <section className="border-y border-[var(--color-mint)] bg-[var(--color-forest-wash)]" aria-labelledby="channels-title">
        <div className="mx-auto w-full max-w-[76rem] px-[clamp(1.25rem,4vw,2.5rem)] py-10 sm:py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--color-forest)]">Contact channels</p>
              <h2 id="channels-title" className="mt-2 font-display text-3xl font-bold tracking-[-0.04em] text-[var(--color-deep-forest)] sm:text-4xl">
                We&apos;ll make reaching us simple.
              </h2>
            </div>
            <p className="max-w-[43ch] text-sm leading-6 text-[var(--color-muted-slate)]">
              Start with a detailed postcard, or send a simple hello if you
              would rather figure it out together.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <a
              href={directWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-28 items-center gap-4 rounded-2xl border border-[var(--color-mint)] bg-white p-5 text-inherit no-underline transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(30,77,58,0.1)] motion-reduce:transition-none"
            >
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-deep-forest)] text-white transition-transform duration-200 group-hover:rotate-[-8deg] motion-reduce:transition-none">
                <Icons.WhatsAppIcon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="font-bold text-[var(--color-deep-forest)]">WhatsApp</p>
                <p className="mt-1 text-sm text-[var(--color-muted-slate)]">Message us on {PHONE_DISPLAY}.</p>
              </div>
            </a>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="group flex min-h-28 items-center gap-4 rounded-2xl border border-[var(--color-mint)] bg-white p-5 text-inherit no-underline transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(30,77,58,0.1)] motion-reduce:transition-none"
            >
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-deep-forest)] text-white transition-transform duration-200 group-hover:rotate-[8deg] motion-reduce:transition-none">
                <Icons.Phone aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="font-bold text-[var(--color-deep-forest)]">Call the team</p>
                <p className="mt-1 text-sm text-[var(--color-muted-slate)]">Call {PHONE_DISPLAY} directly.</p>
              </div>
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <a
              href={directWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[var(--color-deep-forest)] px-5 py-3 text-sm font-bold text-white no-underline transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-forest)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              Not sure yet? Contact us directly
              <Icons.MessageCircle aria-hidden="true" className="size-4" />
            </a>
            <a
              href="#brief-title"
              onClick={(event) => {
                event.preventDefault();
                returnToTripBrief();
              }}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--color-deep-forest)] no-underline transition-colors hover:text-[var(--color-forest)]"
            >
              Return to your trip brief
              <Icons.ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
