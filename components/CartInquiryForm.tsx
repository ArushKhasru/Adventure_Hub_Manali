"use client";

import { useState } from "react";
import Icons from "@/components/Icons";
import { type CartItem } from "@/components/useCart";

interface CartInquiryFormProps {
  items: CartItem[];
  clearCart: () => void;
}

const tripStyles = [
  "A slow family escape",
  "An adventure-filled few days",
  "A little of both",
] as const;

const WHATSAPP_NUMBER = "0000000000";

export default function CartInquiryForm({ items, clearCart }: CartInquiryFormProps) {
  const [name, setName] = useState("");
  const [tripStyle, setTripStyle] = useState<(typeof tripStyles)[number]>(tripStyles[1]);
  const [note, setNote] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const buildBriefText = () => {
    const selectedItems = items.filter((item) => item.selected !== false);
    const itemsList = selectedItems
      .map((item, index) => {
        const dateStr = item.date ? ` on ${item.date}` : " (Date: TBD)";
        const guestsStr = item.guests ? ` for ${item.guests} pax` : "";
        return `${index + 1}. [${item.type.toUpperCase()}] ${item.title}${dateStr}${guestsStr}`;
      })
      .join("\n");

    return [
      `Hi Adventure Hub Manali! 👋`,
      ``,
      `I have built a custom itinerary on your website and would love to get a quote.`,
      ``,
      `Name: ${name.trim() || "Guest"}`,
      `Trip Style: ${tripStyle}`,
      `Custom Notes: ${note.trim() || "None"}`,
      ``,
      `Selected Items:`,
      itemsList,
      ``,
      `Please let me know the availability and total cost for this custom package!`,
    ].join("\n");
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildBriefText())}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildBriefText());
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    } catch {
      setCopyState("failed");
      setTimeout(() => setCopyState("idle"), 2000);
    }
  };

  const hasName = name.trim().length > 0;
  const hasSelectedItems = items.some((item) => item.selected !== false);
  const canSubmit = hasName && hasSelectedItems;

  return (
    <div className="rounded-2xl border border-[oklch(90%_0.025_160)] bg-white p-5 shadow-sm sm:p-6">
      <h3 className="font-display text-xl font-extrabold text-[var(--color-deep-forest)]">
        Trip Consultation
      </h3>
      <p className="mt-1 text-xs text-[var(--color-muted-slate)]">
        Fill out your details to generate your customized trip plan.
      </p>
      
      <form onSubmit={(e) => e.preventDefault()} className="mt-5 space-y-4">
        <div>
          <label htmlFor="inquiry-name" className="block text-xs font-bold uppercase tracking-wider text-[var(--color-deep-forest)]">
            Your Name *
          </label>
          <input
            type="text"
            id="inquiry-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rahul Sharma"
            className="mt-1.5 w-full rounded-xl border border-[oklch(80%_0.025_160)] bg-white px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted-slate)]/60 focus:border-[var(--color-forest)] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-deep-forest)]">
            Trip Style
          </label>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {tripStyles.map((style) => {
              const isSelected = style === tripStyle;
              return (
                <button
                  key={style}
                  type="button"
                  onClick={() => setTripStyle(style)}
                  className={`rounded-lg border px-3 py-2 text-xs font-bold transition-colors cursor-pointer ${
                    isSelected
                      ? "border-[var(--color-forest)] bg-[var(--color-forest-wash)] text-[var(--color-deep-forest)]"
                      : "border-[oklch(85%_0.025_160)] bg-white text-[var(--color-muted-slate)] hover:bg-[var(--color-soft-white)]"
                  }`}
                >
                  {style}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="inquiry-notes" className="block text-xs font-bold uppercase tracking-wider text-[var(--color-deep-forest)]">
            Additional Requests
          </label>
          <textarea
            id="inquiry-notes"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Need hotel pickup, specific food preferences, or custom requirements..."
            className="mt-1.5 w-full rounded-xl border border-[oklch(80%_0.025_160)] bg-white px-3.5 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-muted-slate)]/60 focus:border-[var(--color-forest)] focus:outline-none"
          />
        </div>

        <div className="pt-4 space-y-3">
          {!hasSelectedItems && (
            <p className="text-center text-xs font-bold text-amber-600 animate-pulse">
              Select at least one item from the cart.
            </p>
          )}

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-4 py-3 text-center text-sm font-bold text-white no-underline transition-all hover:bg-[var(--color-deep-forest)] ${
              !canSubmit ? "opacity-60 cursor-not-allowed pointer-events-none" : ""
            }`}
          >
            <Icons.WhatsAppIcon className="size-4 shrink-0" />
            <span>Send Enquiry to WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className={`flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-forest)] bg-white px-4 py-3 text-center text-sm font-bold text-[var(--color-deep-forest)] transition-all hover:bg-[var(--color-forest-wash)] cursor-pointer ${
              !canSubmit ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={!canSubmit}
          >
            <Icons.Copy className="size-4 shrink-0" />
            <span>
              {copyState === "copied"
                ? "Brief Copied!"
                : copyState === "failed"
                  ? "Failed to copy"
                  : "Copy Trip Brief"}
            </span>
          </button>
          
          <button
            type="button"
            onClick={clearCart}
            className="flex w-full justify-center text-xs font-bold text-red-600 hover:underline pt-2 cursor-pointer"
          >
            Clear Trip Cart
          </button>
        </div>
      </form>
    </div>
  );
}
