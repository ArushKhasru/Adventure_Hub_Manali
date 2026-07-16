import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icons from "@/components/Icons";
import PageLenis from "@/components/PageLenis";
import MallRoadScroll from "@/components/MallRoadScroll";

export const metadata: Metadata = {
  title: "How are you feeling?",
  description: "Choose the Manali experience that suits your mood.",
};

const moods = [
  { number: "01", title: "I want to\nunwind", eyebrow: "A softer side of Manali", copy: "Make room for slow mornings, warm cafés, a good view, and a stay that feels easy from the moment you arrive.", href: "/hotel", label: "Find a stay", icon: Icons.Heart, image: "/images/manali-walk/frames/ezgif-frame-052.jpg", accent: "bg-[#dcece2] text-[#174b3c]" },
  { number: "02", title: "I want\nadventure", eyebrow: "Turn up the mountain air", copy: "Chase the rush with river time, wide-open trails, snow days, and stories you will be retelling on the ride home.", href: "/activities", label: "Explore activities", icon: Icons.Mountain, image: "/images/manali-walk/frames/ezgif-frame-028.jpg", accent: "bg-[#e9d7bd] text-[#174b3c]" },
  { number: "03", title: "I want to\nexplore", eyebrow: "Follow your curiosity", copy: "Piece together a day of valley roads, village stops, viewpoints, and the places that make Manali linger with you.", href: "/travel", label: "Plan a route", icon: Icons.Compass, image: "/images/manali-walk/frames/ezgif-frame-070.jpg", accent: "bg-[#d8e8e7] text-[#174b3c]" },
];

const promises = ["Built around your pace, not a rigid itinerary", "Practical local ideas for every kind of day", "One easy place to stay, travel, and explore"];

export default function HowYouFeelPage() {
  return (
    <>
      <PageLenis />
      <MallRoadScroll />
      <section id="choose-your-day" className="bg-[#f4f0e7] px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-8 border-b border-[#174b3c]/15 pb-10 lg:grid-cols-[1fr_auto] lg:items-end lg:pb-14"><div><p className="text-xs font-extrabold uppercase tracking-[.2em] text-[#2a725b]">Choose your rhythm</p><h2 className="mt-4 max-w-[14ch] text-balance font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[.9] tracking-[-.06em] text-[#174b3c] sm:text-6xl">Start where you are.</h2></div><p className="max-w-[34ch] text-pretty text-base leading-7 text-[#60766d]">Each path is a starting point. You can keep it simple, or turn it into a full mountain day.</p></div>
          <div className="mt-8 space-y-5 sm:mt-10">
            {moods.map(({ number, title, eyebrow, copy, href, label, icon: Icon, image, accent }) => <article key={number} className="group grid overflow-hidden rounded-[1.75rem] bg-white shadow-[0_1.1rem_3rem_rgba(28,69,53,.11)] lg:grid-cols-[.88fr_1.12fr]"><div className="relative min-h-[18rem] overflow-hidden sm:min-h-[22rem] lg:min-h-[29rem]"><Image src={image} alt="" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#174b3c]/50 via-transparent to-transparent" /><span className="absolute bottom-5 left-6 font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-[-.08em] text-white/90 sm:bottom-7 sm:left-8 sm:text-6xl">{number}</span></div><div className="flex flex-col p-7 sm:p-10 lg:p-12"><div className={`grid size-12 place-items-center rounded-full ${accent}`}><Icon className="size-5" /></div><p className="mt-8 text-xs font-extrabold uppercase tracking-[.18em] text-[#2a725b]">{eyebrow}</p><h3 className="mt-3 whitespace-pre-line font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[.92] tracking-[-.06em] text-[#174b3c] sm:text-5xl">{title}</h3><p className="mt-5 max-w-[46ch] text-base leading-7 text-[#60766d]">{copy}</p><Link href={href} className="mt-9 inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-[#174b3c] px-6 text-sm font-extrabold text-white no-underline transition-colors hover:bg-[#2a725b]">{label}<Icons.ArrowRight className="size-4" /></Link></div></article>)}
          </div>
        </div>
      </section>
      <section className="relative isolate overflow-hidden bg-[#dcece2] px-5 py-16 sm:px-8 sm:py-24 lg:px-12"><div className="absolute inset-y-0 right-0 -z-10 hidden w-[43%] lg:block"><Image src="/images/manali-walk/frames/ezgif-frame-061.jpg" alt="" fill sizes="43vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-[#dcece2] via-[#dcece2]/35 to-transparent" /></div><div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_.7fr] lg:items-center"><div><div className="grid size-12 place-items-center rounded-full bg-[#174b3c] text-[#bfe1cf]"><Icons.Sparkles className="size-5" /></div><p className="mt-7 text-xs font-extrabold uppercase tracking-[.2em] text-[#2a725b]">A trip that feels like yours</p><h2 className="mt-4 max-w-[13ch] text-balance font-[family-name:var(--font-display)] text-5xl font-extrabold leading-[.9] tracking-[-.06em] text-[#174b3c] sm:text-6xl">Small choices make the best days.</h2><ul className="mt-8 list-none space-y-4 p-0 text-[#315b4c]">{promises.map((promise) => <li key={promise} className="flex items-start gap-3 text-base font-semibold leading-6"><span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white text-[#2a725b]"><Icons.Check className="size-4" strokeWidth={3} /></span>{promise}</li>)}</ul><Link href="/contact" className="mt-10 inline-flex min-h-12 items-center gap-3 rounded-full border-2 border-[#174b3c] px-6 text-sm font-extrabold text-[#174b3c] no-underline transition-colors hover:bg-[#174b3c] hover:text-white">Talk to us about your trip <Icons.ArrowRight className="size-4" /></Link></div><div className="relative min-h-[21rem] overflow-hidden rounded-[1.75rem] lg:hidden"><Image src="/images/manali-walk/frames/ezgif-frame-061.jpg" alt="Mountain scenery near Manali" fill sizes="100vw" className="object-cover" /></div></div></section>
      <section className="bg-[#174b3c] px-5 py-14 text-center text-white sm:px-8 sm:py-20 lg:px-12"><div className="mx-auto max-w-[720px]"><p className="text-xs font-extrabold uppercase tracking-[.22em] text-[#bfe1cf]">One place, many good days</p><h2 className="mt-4 text-balance font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[.95] tracking-[-.055em] sm:text-5xl">You do not need to plan it all at once.</h2><p className="mx-auto mt-5 max-w-[49ch] text-pretty text-base leading-7 text-white/75">Choose a feeling now. The rest can come together one lovely stop at a time.</p></div></section>
    </>
  );
}



