"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Icons from "@/components/Icons";
import { type CartItem } from "@/components/useCart";

interface CartItemCardProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdate: (id: string, fields: Partial<Pick<CartItem, "date" | "guests" | "selected">>) => void;
}

export default function CartItemCard({ item, onRemove, onUpdate }: CartItemCardProps) {
  const [minDate, setMinDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedToday = `${yyyy}-${mm}-${dd}`;

    const timer = setTimeout(() => {
      setMinDate(formattedToday);
      if (item.date && item.date < formattedToday) {
        onUpdate(item.id, { date: formattedToday });
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [item.date, item.id, onUpdate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (selectedDate && minDate && selectedDate < minDate) {
      onUpdate(item.id, { date: minDate });
    } else {
      onUpdate(item.id, { date: selectedDate });
    }
  };

  const isSelected = item.selected !== false;

  return (
    <div className={`group relative flex flex-col gap-4 overflow-hidden rounded-2xl border p-4 shadow-sm transition-all hover:shadow-md sm:flex-row sm:p-5 ${
      isSelected 
        ? "border-[oklch(90%_0.025_160)] bg-white" 
        : "border-[oklch(95%_0.01_160)] bg-white/70 opacity-60"
    }`}>
      {/* Selection Checkbox */}
      <div className="flex items-center self-start pt-1.5 sm:self-center sm:pt-0">
        <input
          type="checkbox"
          id={`select-${item.id}`}
          checked={isSelected}
          onChange={(e) => onUpdate(item.id, { selected: e.target.checked })}
          className="size-5 shrink-0 rounded border-2 border-[oklch(80%_0.025_160)] bg-white text-[var(--color-forest)] focus:ring-[var(--color-forest)] accent-[var(--color-forest)] cursor-pointer transition-all duration-200"
          aria-label={`Select ${item.title}`}
        />
      </div>
      {item.image && (
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl bg-[var(--color-forest-wash)] sm:aspect-square sm:w-24 md:w-28">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 100vw, 112px"
            className="object-cover"
          />
        </div>
      )}
      
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block rounded-full bg-[var(--color-forest-wash)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-deep-forest)]">
                {item.type}
              </span>
              <h3 className="mt-1 font-display text-xl font-bold tracking-tight text-[var(--color-deep-forest)]">
                {item.title}
              </h3>
              {item.detail && (
                <p className="mt-1 text-xs text-[var(--color-muted-slate)]">
                  {item.detail}
                </p>
              )}
            </div>
            
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="rounded-full p-2 text-[var(--color-muted-slate)] hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
              aria-label={`Remove ${item.title} from trip`}
            >
              <Icons.Trash2 className="size-4" strokeWidth={2} />
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-[var(--color-mint)] pt-4">
          <div className="flex flex-wrap gap-4">
            {/* Date Input */}
            <div className="flex flex-col gap-1">
              <label htmlFor={`date-${item.id}`} className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted-slate)]">
                Target Date
              </label>
              <input
                type="date"
                id={`date-${item.id}`}
                value={item.date || ""}
                min={minDate}
                onChange={handleDateChange}
                className="rounded-lg border border-[oklch(80%_0.025_160)] bg-white px-2.5 py-1 text-xs font-medium text-[var(--color-ink)] focus:border-[var(--color-forest)] focus:outline-none"
              />
            </div>
            
            {/* Guests Input */}
            <div className="flex flex-col gap-1">
              <label htmlFor={`guests-${item.id}`} className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted-slate)]">
                Guests
              </label>
              <select
                id={`guests-${item.id}`}
                value={item.guests || 2}
                onChange={(e) => onUpdate(item.id, { guests: parseInt(e.target.value, 10) })}
                className="rounded-lg border border-[oklch(80%_0.025_160)] bg-white px-2.5 py-1.5 text-xs font-medium text-[var(--color-ink)] focus:border-[var(--color-forest)] focus:outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {item.price && (
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-muted-slate)] block">Starting at</span>
              <span className="font-display text-lg font-extrabold text-[var(--color-deep-forest)]">
                {item.price}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
