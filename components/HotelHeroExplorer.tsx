import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, MapPin, Star } from "lucide-react";

const hotelPhotos = [
  "/images/hotel/hotel-hero-final.jpeg",
  "/images/home/hero-stay.webp",
  "/images/home/hero-valley.webp",
  "/images/home/hero-family.webp",
];

function PhotoRail({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="hotel-photo-rail" aria-hidden="true">
      <div className={`hotel-photo-track ${reverse ? "hotel-photo-track-reverse" : ""}`}>
        {[...hotelPhotos, ...hotelPhotos].map((src, index) => (
          <div className="hotel-photo-tile" key={`${src}-${index}`}>
            <Image src={src} alt="" fill sizes="(min-width: 1024px) 22vw, 38vw" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HotelHeroExplorer() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f2eee4] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_10%_5%,rgba(230,192,104,.35),transparent_42%),radial-gradient(circle_at_85%_20%,rgba(79,125,99,.18),transparent_35%)]" />
      <div className="mx-auto grid max-w-[1370px] overflow-hidden rounded-[2rem] bg-[#174b3c] text-white shadow-[0_1.75rem_5rem_rgba(22,54,43,.2)] lg:grid-cols-[minmax(0,1fr)_minmax(26rem,.9fr)]">
        <div className="relative flex min-h-[38rem] flex-col justify-between overflow-hidden px-6 py-8 sm:px-10 sm:py-10 lg:min-h-[42rem] lg:px-14 lg:py-14">
          <div className="absolute -left-24 top-10 size-72 rounded-full border border-[#cce9d9]/20" />
          <div className="absolute bottom-[-10rem] right-[-8rem] size-[28rem] rounded-full bg-[#d5ad58]/15 blur-3xl" />
          <div className="relative">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#cbe9d9]"><MapPin className="size-4 text-[#edc879]" /> Manali, Himachal Pradesh</p>
            <h1 className="mt-7 max-w-[8ch] font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[.88] tracking-[-.065em] sm:text-6xl lg:text-7xl">Rest where the <em className="font-inherit not-italic text-[#f0c975]">mountains</em> linger.</h1>
            <p className="mt-7 max-w-[42ch] text-base leading-7 text-white/75 sm:text-lg">From sunlit balconies to quiet river mornings, find a Manali stay that feels like part of the journey.</p>
          </div>
          <div className="relative flex flex-wrap items-end justify-between gap-6 pt-10">
            <Link href="#stays" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#f0c975] px-5 text-sm font-extrabold text-[#174b3c] no-underline transition hover:-translate-y-0.5 hover:bg-[#ffe0a1]">Explore stays <ArrowDownRight className="size-4" /></Link>
            <div className="border-l border-white/20 pl-4 text-sm text-white/75"><span className="block font-[family-name:var(--font-display)] text-3xl font-extrabold leading-none text-white">4.8</span><span className="mt-1 flex items-center gap-1"><Star className="size-3 fill-[#f0c975] text-[#f0c975]" /> guest-loved stays</span></div>
          </div>
        </div>
        <div className="relative min-h-[28rem] overflow-hidden border-t border-white/15 bg-[#0f352a] lg:min-h-0 lg:border-l lg:border-t-0">
          <div className="absolute inset-y-0 left-[4%] w-[43%] rotate-[5deg] opacity-80"><PhotoRail /></div>
          <div className="absolute inset-y-[-12%] right-[5%] w-[44%] rotate-[5deg]"><PhotoRail reverse /></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#174b3c_0%,transparent_26%,transparent_73%,#174b3c_100%),linear-gradient(0deg,#174b3c_0%,transparent_24%,transparent_78%,#174b3c_100%)]" />
          <div className="absolute inset-x-6 bottom-6 z-10 rounded-2xl border border-white/20 bg-[#143d32]/85 p-4 backdrop-blur-md sm:inset-x-8 sm:bottom-8"><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#cbe9d9]">A moving postcard</p><p className="mt-1 font-[family-name:var(--font-display)] text-xl font-bold leading-tight">Views that keep unfolding, even before check-in.</p></div>
        </div>
      </div>
    </section>
  );
}
