"use client";

import { useCart } from "@/components/useCart";
import Icons from "@/components/Icons";
import { useState } from "react";

interface AddToCartButtonProps {
  id: string;
  type: "activity" | "hotel" | "travel";
  title: string;
  price?: string;
  image?: string;
  detail?: string;
}

export default function AddToCartButton({ id, type, title, price, image, detail }: AddToCartButtonProps) {
  const { addToCart, items, isLoaded } = useCart();
  const [added, setAdded] = useState(false);

  // Check if item is already in cart
  const isInCart = isLoaded && items.some((item) => item.id === id);

  const triggerFlyAnimation = (buttonEl: HTMLElement) => {
    const cartIcons = document.querySelectorAll('[aria-label="View Trip Cart"]');
    let targetCartIcon: HTMLElement | null = null;
    for (const icon of Array.from(cartIcons)) {
      const rect = icon.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        targetCartIcon = icon as HTMLElement;
        break;
      }
    }

    if (!targetCartIcon) return;

    const buttonRect = buttonEl.getBoundingClientRect();
    const cartRect = targetCartIcon.getBoundingClientRect();

    const startX = buttonRect.left + buttonRect.width / 2;
    const startY = buttonRect.top + buttonRect.height / 2;
    const endX = cartRect.left + cartRect.width / 2;
    const endY = cartRect.top + cartRect.height / 2;

    const plane = document.createElement("div");
    plane.style.position = "fixed";
    plane.style.top = "0";
    plane.style.left = "0";
    plane.style.width = "30px";
    plane.style.height = "30px";
    plane.style.zIndex = "9999";
    plane.style.pointerEvents = "none";
    plane.style.display = "flex";
    plane.style.alignItems = "center";
    plane.style.justifyContent = "center";
    plane.style.color = "var(--color-gold)";

    plane.innerHTML = `
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15))">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    `;

    document.body.appendChild(plane);

    const steps = 30;
    const keyframes = [];
    const peakHeight = 120;

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = startX + (endX - startX) * t;
      const y = startY + (endY - startY) * t - Math.sin(t * Math.PI) * peakHeight;

      let angle = 0;
      if (i < steps) {
        const nextT = (i + 1) / steps;
        const nextX = startX + (endX - startX) * nextT;
        const nextY = startY + (endY - startY) * nextT - Math.sin(nextT * Math.PI) * peakHeight;
        angle = Math.atan2(nextY - y, nextX - x) * (180 / Math.PI);
      } else {
        angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
      }

      const rotation = angle + 45;
      const scale = 1.3 - 0.8 * t;
      const opacity = t < 0.1 ? t * 10 : t > 0.9 ? (1 - t) * 10 : 1;

      keyframes.push({
        transform: `translate(${x - 15}px, ${y - 15}px) rotate(${rotation}deg) scale(${scale})`,
        opacity: opacity
      });
    }

    const animation = plane.animate(keyframes, {
      duration: 850,
      easing: "cubic-bezier(0.25, 1, 0.50, 1)"
    });

    const trailInterval = setInterval(() => {
      const currentRect = plane.getBoundingClientRect();
      if (currentRect.width === 0) return;

      const dot = document.createElement("div");
      dot.style.position = "fixed";
      dot.style.left = `${currentRect.left + 15}px`;
      dot.style.top = `${currentRect.top + 15}px`;
      dot.style.width = "4px";
      dot.style.height = "4px";
      dot.style.borderRadius = "50%";
      dot.style.backgroundColor = "var(--color-mint)";
      dot.style.zIndex = "9998";
      dot.style.pointerEvents = "none";
      document.body.appendChild(dot);

      dot.animate([
        { transform: "scale(1.5)", opacity: 0.8 },
        { transform: "scale(0)", opacity: 0 }
      ], {
        duration: 500,
        easing: "ease-out"
      }).onfinish = () => dot.remove();
    }, 40);

    const cleanup = () => {
      clearInterval(trailInterval);
      plane.remove();
    };

    animation.onfinish = () => {
      cleanup();
      if (targetCartIcon) {
        targetCartIcon.animate([
          { transform: "scale(1)" },
          { transform: "scale(1.3)", color: "var(--color-gold)" },
          { transform: "scale(0.9)" },
          { transform: "scale(1)" }
        ], {
          duration: 300,
          easing: "ease-in-out"
        });
      }
    };

    animation.oncancel = cleanup;
  };

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isInCart) return;

    addToCart({ id, type, title, price, image, detail });
    setAdded(true);
    triggerFlyAnimation(e.currentTarget);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`group/button inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[var(--color-forest)] px-4 py-3 text-center text-sm font-bold no-underline transition-all duration-200 cursor-pointer motion-reduce:transition-none ${
        isInCart
          ? "bg-[var(--color-forest)] text-white border-[var(--color-forest)] hover:bg-[var(--color-deep-forest)]"
          : "bg-white text-[var(--color-deep-forest)] border-[var(--color-forest)] hover:bg-[var(--color-forest-wash)]"
      }`}
    >
      <span>
        {isInCart ? "In Trip Cart" : added ? "Added!" : "Add to Trip Cart"}
      </span>
      {isInCart ? (
        <Icons.Check className="size-4 shrink-0" strokeWidth={2} />
      ) : (
        <Icons.ArrowRight
          className="size-4 shrink-0 transition-transform duration-300 group-hover/button:translate-x-1"
          strokeWidth={2}
        />
      )}
    </button>
  );
}
