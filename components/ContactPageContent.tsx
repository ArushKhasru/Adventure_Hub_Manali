"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Copy,
  MapPinned,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";

const tripStyles = [
  "A slow family escape",
  "An adventure-filled few days",
  "A little of both",
] as const;

type CopyState = "idle" | "copied" | "unavailable";

function RouteLine() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 440 92"
      className="h-auto w-full text-[var(--color-mint)]"
      fill="none"
    >
      <path
        d="M4 70C58 70 55 16 116 16c59 0 60 54 120 54 64 0 57-42 115-42 30 0 47 17 85 17"
        stroke="currentColor"
        strokeDasharray="3 8"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <circle cx="4" cy="70" r="5" fill="currentColor" />
      <circle cx="436" cy="45" r="5" fill="currentColor" />
    </svg>
  );
}

export default function ContactPageContent() {
  const [tripStyle, setTripStyle] = useState<(typeof tripStyles)[number]>(
    tripStyles[2],
  );
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const handleCopy = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const details = new FormData(event.currentTarget);
    const name = String(details.get("name") || "A traveller").trim();
    const dates = String(details.get("dates") || "Dates to be decided").trim();
    const group = String(details.get("group") || "Group size to be decided").trim();
    const note = String(details.get("note") || "No extra notes yet").trim();
    const tripBrief = [
      `Manali trip brief — ${name}`,
      `Trip style: ${tripStyle}`,
      `When: ${dates}`,
      `Who is coming: ${group}`,
      `Notes: ${note}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(tripBrief);
      setCopyState("copied");
    } catch {
      setCopyState("unavailable");
    }
  };

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
          className="absolute -left-24 top-16 size-64 rounded-full border border-white/10 sm:-left-14 sm:size-80"
        />
        <div
          aria-hidden="true"
          className="absolute -right-16 bottom-[-8rem] size-72 rounded-full border-[1.25rem] border-[var(--color-forest)]/70 sm:size-96"
        />

        <div className="relative mx-auto grid w-full max-w-[76rem] gap-10 px-[clamp(1.25rem,4vw,2.5rem)] pb-14 pt-16 sm:pb-20 sm:pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16 lg:pb-24 lg:pt-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wide text-[var(--color-mint)]">
              <Sparkles aria-hidden="true" className="size-3.5" />
              The trip-start desk
            </p>
            <h1
              id="contact-title"
              className="mt-5 max-w-[10ch] font-display text-[clamp(3.2rem,7vw,5.8rem)] font-extrabold leading-[0.91] tracking-[-0.055em]"
            >
              Let&apos;s put your mountain plan on the map.
            </h1>
            <p className="mt-6 max-w-[56ch] text-base leading-7 text-white/82 sm:text-lg sm:leading-8">
              Start with a few loose ideas. A stay, a scenic drive, a river
              day—your Manali plan does not need to be perfect before it gets
              exciting.
            </p>
          </div>

          <div className="relative rounded-[1.75rem] border border-white/16 bg-white/8 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-6">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-gold)] text-[var(--color-ink)] shadow-lg">
                <MapPinned aria-hidden="true" className="size-5" />
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

        <div className="relative mx-auto w-full max-w-[76rem] px-[clamp(1.25rem,4vw,2.5rem)] pb-8 sm:pb-10">
          <RouteLine />
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
              <Clock3 aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
              <div>
                <p className="font-bold">Direct details are being prepared</p>
                <p className="mt-1 text-sm leading-6 text-[var(--color-muted-slate)]">
                  Phone and WhatsApp links will appear here once the team
                  confirms them. No placeholder numbers, no dead buttons.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <form
          onSubmit={handleCopy}
          className="relative rounded-[2rem] border border-[var(--color-mint)] bg-white p-5 shadow-[0_18px_50px_rgba(30,77,58,0.1)] sm:p-8"
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
              <MapPinned aria-hidden="true" className="size-5" />
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
                      {selected && <Check aria-hidden="true" className="size-4 shrink-0" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-[var(--color-deep-forest)]">Your name</span>
              <input
                name="name"
                autoComplete="name"
                placeholder="e.g. Aditi"
                className="mt-2 block min-h-12 w-full rounded-xl border border-[var(--color-mint)] bg-[var(--color-soft-white)] px-4 text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-muted-slate)] focus:border-[var(--color-forest)] focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-[var(--color-deep-forest)]">When are you thinking?</span>
              <input
                name="dates"
                placeholder="e.g. October, 3 nights"
                className="mt-2 block min-h-12 w-full rounded-xl border border-[var(--color-mint)] bg-[var(--color-soft-white)] px-4 text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-muted-slate)] focus:border-[var(--color-forest)] focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-[var(--color-deep-forest)]">Who&apos;s coming?</span>
              <input
                name="group"
                placeholder="e.g. 2 adults + 2 kids"
                className="mt-2 block min-h-12 w-full rounded-xl border border-[var(--color-mint)] bg-[var(--color-soft-white)] px-4 text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-muted-slate)] focus:border-[var(--color-forest)] focus:bg-white"
              />
            </label>
            <label className="block">
              <span className="text-sm font-bold text-[var(--color-deep-forest)]">One must-do?</span>
              <input
                name="note"
                placeholder="e.g. Rafting and a cozy stay"
                className="mt-2 block min-h-12 w-full rounded-xl border border-[var(--color-mint)] bg-[var(--color-soft-white)] px-4 text-[var(--color-ink)] outline-none transition placeholder:text-[var(--color-muted-slate)] focus:border-[var(--color-forest)] focus:bg-white"
              />
            </label>
          </div>

          <div className="mt-7 flex flex-col gap-4 border-t border-dashed border-[var(--color-mint)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[38ch] text-xs leading-5 text-[var(--color-muted-slate)]" aria-live="polite">
              {statusMessage}
            </p>
            <button
              type="submit"
              className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--color-gold)] px-5 py-3 text-sm font-bold text-[var(--color-ink)] transition duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-forest)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              {copyState === "copied" ? "Brief copied" : "Copy my trip brief"}
              {copyState === "copied" ? (
                <Check aria-hidden="true" className="size-4" />
              ) : (
                <Copy aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
              )}
            </button>
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
              Once the team shares verified details, this space will connect you directly—without sending you through a maze.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div className="group flex min-h-28 items-center gap-4 rounded-2xl border border-[var(--color-mint)] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(30,77,58,0.1)] motion-reduce:transition-none">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-deep-forest)] text-white transition-transform duration-200 group-hover:rotate-[-8deg] motion-reduce:transition-none">
                <MessageCircle aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="font-bold text-[var(--color-deep-forest)]">WhatsApp</p>
                <p className="mt-1 text-sm text-[var(--color-muted-slate)]">Awaiting the verified chat number.</p>
              </div>
            </div>
            <div className="group flex min-h-28 items-center gap-4 rounded-2xl border border-[var(--color-mint)] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(30,77,58,0.1)] motion-reduce:transition-none">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-deep-forest)] text-white transition-transform duration-200 group-hover:rotate-[8deg] motion-reduce:transition-none">
                <Phone aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="font-bold text-[var(--color-deep-forest)]">Call the team</p>
                <p className="mt-1 text-sm text-[var(--color-muted-slate)]">Awaiting the verified phone number.</p>
              </div>
            </div>
          </div>

          <a href="#brief-title" className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[var(--color-deep-forest)] no-underline transition-colors hover:text-[var(--color-forest)]">
            Return to your trip brief
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
