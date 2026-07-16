"use client";

import Link from "next/link";
import Icons from "@/components/Icons";

export default function CartEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[oklch(85%_0.025_160)] bg-white/50 px-6 py-16 text-center shadow-sm">
      <div className="flex size-16 items-center justify-center rounded-full bg-[var(--color-forest-wash)] text-[var(--color-forest)]">
        <Icons.ShoppingCart className="size-8" strokeWidth={1.5} />
      </div>
      <h2 className="mt-6 font-display text-2xl font-extrabold text-[var(--color-deep-forest)] sm:text-3xl">
        Your trip cart is empty
      </h2>
      <p className="mt-3 max-w-[42ch] text-sm leading-6 text-[var(--color-muted-slate)]">
        Start building your perfect Manali adventure by exploring our hand-picked activities, stays, and travel arrangements.
      </p>
      <Link
        href="/activities"
        className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-6 py-3 text-sm font-bold text-white no-underline transition-all hover:bg-[var(--color-deep-forest)] hover:-translate-y-0.5 shadow-sm"
      >
        <span>Browse Activities</span>
        <Icons.ArrowRight className="size-4" strokeWidth={2} />
      </Link>
    </div>
  );
}
