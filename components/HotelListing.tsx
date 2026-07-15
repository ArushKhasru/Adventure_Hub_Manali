import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BedDouble, Coffee, Mountain, ShieldCheck, Sparkles, Trees, Utensils } from "lucide-react";

const stays = [
  { name: "Pine Crest Retreat", area: "Old Manali", tag: "Riverside stay", image: "/images/home/hero-stay.webp", alt: "Mountain hotel stay near Manali", detail: "A cedar-framed hideaway a short walk from the river.", bestFor: "Couples & slow weekends" },
  { name: "Snowline Grand", area: "Solang Road", tag: "Peak-view rooms", image: "/images/hotel/hotel-hero-final.jpeg", alt: "Hotel terrace with Himalayan view", detail: "Unbroken Himalayan views from bright, spacious rooms.", bestFor: "Views & adventure days" },
  { name: "The Orchard House", area: "Vashisht", tag: "Terrace breakfasts", image: "/images/home/hero-valley.webp", alt: "Valley view near Manali", detail: "Slow mornings, orchard air, and a sweeping valley horizon.", bestFor: "Long, restful stays" },
  { name: "Riverside Cedar Inn", area: "Bahang", tag: "Cedar rooms", image: "/images/home/hero-family.webp", alt: "Family-friendly mountain stay", detail: "Easy, family-friendly comfort close to the valley's quiet side.", bestFor: "Families & small groups" },
];

const essentials = [
  { icon: BedDouble, title: "Comfort-first rooms", copy: "Well-kept rooms, cosy bedding, and the essentials for an easy mountain night." },
  { icon: Utensils, title: "Good food nearby", copy: "Choose stays close to cafess, local kitchens, and unhurried breakfast spots." },
  { icon: Trees, title: "A better location", copy: "Pick between the river, Old Manali lanes, Vashisht calm, or Solang access." },
];

export default function HotelListing() {
  return (
    <section id="stays" className="bg-[#f2eee4] px-5 pb-16 pt-12 sm:px-8 sm:pb-24 lg:px-12 lg:pb-32 lg:pt-16">
      <div className="mx-auto max-w-[1270px]">
        <header className="grid gap-6 border-b border-[#1d5544]/20 pb-9 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div><p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#2a725b]">Stay your way</p><h2 className="mt-3 max-w-[9ch] font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[.95] tracking-[-.055em] text-[#174b3c] sm:text-5xl">Pick a view. Make a memory.</h2></div>
          <p className="max-w-[52ch] text-base leading-7 text-[#52685f]">Each stay is chosen for a different pace of Manali: river walks, quiet terraces, mountain light, and room to settle in.</p>
        </header>
        <div className="mt-8 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {stays.map((stay, index) => <article key={stay.name} className={`group grid gap-5 ${index % 2 === 1 ? "md:mt-16" : ""}`}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[#d9d7cd] shadow-[0_1rem_2.5rem_rgba(28,69,53,.12)]"><Image src={stay.image} alt={stay.alt} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-x-4 top-4 flex items-center justify-between"><span className="rounded-full bg-[#f5f1e8]/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[.15em] text-[#174b3c] backdrop-blur">{stay.tag}</span><span className="grid size-9 place-items-center rounded-full bg-[#174b3c] text-white"><ArrowUpRight className="size-4" /></span></div></div>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#4d7969]">{stay.area}, Manali</p><h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-[-.04em] text-[#174b3c]">{stay.name}</h3><p className="mt-2 max-w-[40ch] text-sm leading-6 text-[#60766d]">{stay.detail}</p><p className="mt-3 text-xs font-bold uppercase tracking-[.12em] text-[#2a725b]">Best for - {stay.bestFor}</p></div><Link href={{ pathname: "/contact", query: { hotel: stay.name } }} className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#174b3c] px-4 text-sm font-bold text-[#174b3c] no-underline transition hover:bg-[#174b3c] hover:text-white">Enquire</Link></div>
          </article>)}
        </div>
        <section className="mt-24 border-y border-[#1d5544]/20 py-12"><div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#2a725b]">What to expect</p><h2 className="mt-3 max-w-[10ch] font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[.95] tracking-[-.05em] text-[#174b3c]">A stay that works around your trip.</h2></div><div className="grid gap-5 sm:grid-cols-3">{essentials.map(({ icon: Icon, title, copy }) => <article key={title} className="rounded-2xl bg-white/65 p-5"><Icon className="size-5 text-[#2a725b]" /><h3 className="mt-7 font-[family-name:var(--font-display)] text-xl font-extrabold text-[#174b3c]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#60766d]">{copy}</p></article>)}</div></div></section>
        <section className="mt-16 grid overflow-hidden rounded-[1.75rem] bg-[#174b3c] text-white lg:grid-cols-[1.1fr_.9fr]"><div className="p-7 sm:p-10"><p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#cbe9d9]"><Sparkles className="size-4 text-[#f0c975]" /> Plan with confidence</p><h2 className="mt-4 max-w-[13ch] font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[.95] tracking-[-.05em]">Tell us the kind of stay you want.</h2><p className="mt-5 max-w-[48ch] text-sm leading-7 text-white/75">Share your dates, group size, and preferred area. We'll help narrow down a stay that fits your itinerary, whether it's skiing, cafes-hopping, or a slower family break.</p><Link href="/contact" className="mt-7 inline-flex min-h-11 items-center rounded-full bg-[#f0c975] px-5 text-sm font-extrabold text-[#174b3c] no-underline transition hover:bg-[#ffe0a1]">Plan your hotel stay</Link></div><div className="grid content-center gap-5 bg-[#10372c] p-7 sm:p-10"><div className="flex gap-4"><Coffee className="mt-1 size-5 shrink-0 text-[#f0c975]" /><p className="text-sm leading-6 text-white/80"><strong className="text-white">For relaxed weekends:</strong> Old Manali and Vashisht are ideal for cafess, walks, and a quieter pace.</p></div><div className="flex gap-4"><Mountain className="mt-1 size-5 shrink-0 text-[#f0c975]" /><p className="text-sm leading-6 text-white/80"><strong className="text-white">For active days:</strong> Solang Road keeps mountain activities and scenic drives within easy reach.</p></div><div className="flex gap-4"><ShieldCheck className="mt-1 size-5 shrink-0 text-[#f0c975]" /><p className="text-sm leading-6 text-white/80"><strong className="text-white">Before you book:</strong> Ask about heating, parking, meal plans, and transport during peak season.</p></div></div></section>
      </div>
    </section>
  );
}
