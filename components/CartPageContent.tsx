"use client";

import { useCart } from "@/components/useCart";
import CartItemCard from "@/components/CartItemCard";
import CartEmptyState from "@/components/CartEmptyState";
import CartInquiryForm from "@/components/CartInquiryForm";
import PageLenis from "@/components/PageLenis";
import Image from "next/image";

export default function CartPageContent() {
  const { items, isLoaded, removeFromCart, updateCartItem, clearCart, count } = useCart();

  if (!isLoaded) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-4 border-[var(--color-forest)] border-t-transparent" />
        <p className="mt-4 text-sm font-bold text-[var(--color-deep-forest)] uppercase tracking-widest">
          Loading Trip Details...
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-[var(--color-soft-white)]">
      <PageLenis />
      
      {/* Hero Banner Section */}
      <section
        className="relative isolate min-h-[16rem] overflow-hidden bg-[var(--color-deep-forest)] text-white sm:min-h-[20rem]"
        aria-labelledby="cart-page-title"
      >
        <Image
          src="/images/home/hero-valley.webp"
          alt="Himalayan mountain peaks panorama"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[54%_center]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,oklch(25%_0.06_164/.95)_0%,oklch(30%_0.06_164/.80)_52%,oklch(25%_0.06_164/.45)_100%)]"
        />

        <div className="relative mx-auto flex h-full max-w-[76rem] flex-col justify-end px-[clamp(1.25rem,4vw,2.5rem)] pb-10 pt-16 sm:pb-12 sm:pt-20">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--color-mint)]">
            Custom Trip Builder
          </p>
          <h1
            id="cart-page-title"
            className="mt-2 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
          >
            Your Trip Cart
          </h1>
          <p className="mt-4 max-w-[50ch] text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
            Review your activities and stays. Customize your dates and guest details, then send your brief directly to our team to plan your escape.
          </p>
        </div>
      </section>

      {/* Cart Content Section */}
      <section className="mx-auto w-full max-w-[76rem] px-[clamp(1.25rem,4vw,2.5rem)] py-12 md:py-16">
        {count === 0 ? (
          <CartEmptyState />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start lg:gap-12">
            {/* List of Cart Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[oklch(90%_0.025_160)] pb-4">
                <h2 className="font-display text-2xl font-extrabold text-[var(--color-deep-forest)]">
                  Trip Details ({count} {count === 1 ? "item" : "items"})
                </h2>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                >
                  Clear All
                </button>
              </div>
              
              <div className="space-y-4 pt-2">
                {items.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onRemove={removeFromCart}
                    onUpdate={updateCartItem}
                  />
                ))}
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:sticky lg:top-24">
              <CartInquiryForm items={items} clearCart={clearCart} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
