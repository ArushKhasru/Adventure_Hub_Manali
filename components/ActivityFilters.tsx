"use client";

import { useEffect, useState } from "react";

type ActivityFilter = {
  id: string;
  label: string;
};

const filters: ActivityFilter[] = [
  { id: "all", label: "All activities" },
  { id: "paragliding", label: "Paragliding" },
  { id: "rafting", label: "Rafting" },
  { id: "skiing", label: "Skiing" },
  { id: "sightseeing", label: "Sightseeing" },
  { id: "trekking", label: "Trekking" },
  { id: "camping", label: "Camping" },
  { id: "combo", label: "Adventure combos" },
];

export default function ActivityFilters() {
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("#activities-grid article[data-activity]");

    cards.forEach((card) => {
      const shouldShow = activeFilter === "all" || card.dataset.activity === activeFilter;
      const cardWrapper = card.parentElement;

      if (cardWrapper) {
        cardWrapper.hidden = !shouldShow;
      }
    });
  }, [activeFilter]);

  const visibleCount = activeFilter === "all" ? filters.length - 1 : 1;

  return (
    <div className="activity-filter-reveal mt-8 sm:mt-10">
      <div aria-label="Filter activities by type" className="flex flex-wrap justify-center gap-2">
        {filters.map((filter) => {
          const isActive = filter.id === activeFilter;

          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter.id)}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)] motion-reduce:transition-none ${
                isActive
                  ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                  : "border-[var(--color-mint)] bg-white text-[var(--color-deep-forest)] hover:bg-[var(--color-forest-wash)]"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-4 text-center text-sm text-[var(--color-muted-slate)]">
        Showing {visibleCount} {visibleCount === 1 ? "activity" : "activities"}
      </p>
    </div>
  );
}
