import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BedDouble,
  Bus,
  Camera,
  CarFront,
  Mail,
  MapPin,
  MessageCircle,
  Mountain,
  Phone,
  Route,
  TreePine,
  UsersRound,
} from "lucide-react";

import HeroCarousel from "@/components/HeroCarousel";

type DiscoveryCard = {
  href: string;
  title: string;
  description: string;
  image: string;
  imagePosition: string;
  icon: LucideIcon;
};

type ContactOption = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

type PlanBenefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const discoveryCards: DiscoveryCard[] = [
  {
    href: "/activities",
    title: "Family outings",
    description: "Fun, safe, and memorable experiences for all ages.",
    image: "/images/home/hero-family.webp",
    imagePosition: "object-center",
    icon: UsersRound,
  },
  {
    href: "/activities",
    title: "Adventure days",
    description: "Adrenaline-pumping activities and outdoor thrills.",
    image: "/images/home/hero-adventure.webp",
    imagePosition: "object-center",
    icon: Mountain,
  },
  {
    href: "/hotel",
    title: "Comfortable stays",
    description: "Handpicked stays with great views and warm hospitality.",
    image: "/images/home/hero-stay.webp",
    imagePosition: "object-center",
    icon: BedDouble,
  },
  {
    href: "/travel",
    title: "Scenic travel",
    description: "Road trips and sightseeing through stunning landscapes.",
    image: "/images/home/hero-valley.webp",
    imagePosition: "object-center",
    icon: CarFront,
  },
];

const planBenefits: PlanBenefit[] = [
  {
    title: "Comfortable stays",
    description:
      "Handpicked hotels and homestays for a relaxing mountain escape.",
    icon: BedDouble,
  },
  {
    title: "Easy travel",
    description:
      "Airport transfers, local sightseeing, and reliable transport across Manali.",
    icon: Bus,
  },
  {
    title: "Epic adventures",
    description:
      "Rafting, paragliding, treks, and more—curated for every traveller.",
    icon: Mountain,
  },
  {
    title: "Memorable experiences",
    description:
      "Scenic spots, local culture, and hidden gems to make your trip unforgettable.",
    icon: Camera,
  },
];

const contactOptions: ContactOption[] = [
  {
    href: "/contact?method=whatsapp",
    title: "WhatsApp",
    description: "Chat with us on WhatsApp",
    icon: MessageCircle,
  },
  {
    href: "/contact?method=call",
    title: "Call us",
    description: "Speak with our travel experts",
    icon: Phone,
  },
  {
    href: "/contact",
    title: "Contact us",
    description: "Send us a message on our contact page",
    icon: Mail,
  },
];

function PlanOverviewSection() {
  return (
    <section
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="plan-overview-title"
    >
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Illustration */}
          <div
            aria-hidden="true"
            className="relative mx-auto min-h-[260px] w-full max-w-[530px] text-[#07563f] sm:min-h-[300px]"
          >
            <Mountain
              className="absolute left-[12%] top-[8%] h-36 w-64 sm:h-44 sm:w-80"
              strokeWidth={1.2}
            />

            <MapPin
              className="absolute left-[2%] top-[38%] size-10"
              strokeWidth={1.8}
            />

            <TreePine
              className="absolute bottom-[24%] left-[54%] size-14"
              strokeWidth={1.4}
            />

            <Bus
              className="absolute bottom-[17%] right-[6%] size-10"
              strokeWidth={1.5}
            />

            <div className="absolute bottom-[34%] left-[12%] right-[17%] border-t-2 border-dashed border-[#07563f]/70" />

            <span className="absolute bottom-[30%] left-[38%] size-8 rounded-full border-2 border-dashed border-[#07563f]/70" />

            <div className="absolute right-[7%] top-[15%] rotate-2 rounded-sm border-2 border-[#07563f] bg-white px-3 py-2 text-center shadow-sm">
              <span className="block text-[10px] font-bold uppercase tracking-[0.08em]">
                Chalo
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.08em]">
                Manali
              </span>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#3b7665]">
              Everything in one place
            </p>

            <h2
              id="plan-overview-title"
              className="max-w-[15ch] text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[#064d39] sm:text-5xl"
            >
              Your whole Manali plan, under one roof.
            </h2>

            <p className="mt-6 max-w-[60ch] text-base leading-7 text-[#52685f] sm:text-lg sm:leading-8">
              We make travel in Manali easy and exciting. Whether you&apos;re
              here to relax, explore, or chase adventure, we help you plan
              everything your way. Stays that feel like home, local transport
              that&apos;s hassle-free, and experiences that turn your trip into
              lasting memories.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-md bg-[#07563f] px-6 py-3 text-sm font-semibold text-white no-underline transition duration-300 hover:-translate-y-0.5 hover:bg-[#064534]"
            >
              Start planning
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-14 grid overflow-hidden rounded-2xl border border-[#dcebe3] bg-[#f7fbf9] sm:grid-cols-2 lg:grid-cols-4">
          {planBenefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className={`flex gap-4 p-6 sm:p-7 ${
                  index < planBenefits.length - 1
                    ? "border-b border-[#dcebe3] sm:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-r"
                    : ""
                } ${
                  index === 1
                    ? "sm:border-r-0 lg:border-r"
                    : ""
                }`}
              >
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[#dcefe5] text-[#07563f]">
                  <Icon
                    aria-hidden="true"
                    className="size-6"
                    strokeWidth={1.7}
                  />
                </span>

                <div>
                  <h3 className="text-sm font-bold text-[#064d39] sm:text-base">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#52685f] sm:text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          aria-hidden="true"
          className="mx-auto mt-8 h-5 w-full max-w-[1100px] rounded-[50%] border-t-2 border-[#9fcdbb]"
        />
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <section
      className="relative z-30 bg-[#eef8f3] px-5 pb-0 pt-8 sm:px-8 lg:px-10"
      aria-labelledby="contact-strip-title"
    >
      <div className="relative z-40 mx-auto w-full max-w-[1180px] translate-y-10 overflow-hidden rounded-2xl border border-[#dcebe3] bg-white shadow-[0_18px_50px_rgba(5,77,57,0.16)] sm:translate-y-12 lg:translate-y-16">
        <div className="grid lg:grid-cols-[1.15fr_2.85fr]">
          <div className="flex flex-col justify-center border-b border-[#dcebe3] px-7 py-7 sm:px-9 lg:border-b-0 lg:border-r">
            <h2
              id="contact-strip-title"
              className="text-2xl font-bold leading-[1.08] tracking-[-0.035em] text-[#07563f]"
            >
              Let&apos;s plan your
              <span className="block">Manali adventure</span>
            </h2>

            <p className="mt-2 text-sm text-[#536b61]">
              We&apos;re just a message away.
            </p>
          </div>

          <div className="grid sm:grid-cols-3">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;

              return (
                <Link
                  key={option.title}
                  href={option.href}
                  className={`group flex min-h-[8.5rem] items-center gap-4 px-6 py-6 text-[#07563f] no-underline transition-colors duration-300 hover:bg-[#f2faf6] ${
                    index < contactOptions.length - 1
                      ? "border-b border-[#dcebe3] sm:border-b-0 sm:border-r"
                      : ""
                  }`}
                >
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[#07563f] text-white transition-transform duration-300 group-hover:scale-105">
                    <Icon
                      aria-hidden="true"
                      className="size-[1.35rem]"
                      strokeWidth={1.8}
                    />
                  </span>

                  <span>
                    <strong className="block text-sm font-bold">
                      {option.title}
                    </strong>

                    <span className="mt-1 block max-w-[16ch] text-xs leading-4 text-[#536b61]">
                      {option.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePageContent() {
  return (
    <main className="overflow-x-clip bg-[#eef8f3]">
      {/* Hero */}
      <section
        className="relative h-[100svh] min-h-[42rem] overflow-hidden bg-black"
        aria-label="Manali hero slider"
      >
        <HeroCarousel />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-40 h-14 bg-white [clip-path:polygon(0_56%,3%_36%,6%_58%,9%_32%,12%_55%,15%_38%,19%_62%,23%_35%,27%_57%,31%_38%,35%_63%,39%_41%,44%_59%,49%_33%,54%_58%,59%_39%,64%_65%,69%_34%,74%_59%,79%_38%,84%_61%,89%_32%,94%_57%,97%_39%,100%_55%,100%_100%,0_100%)]"
        />
      </section>

      {/* New plan overview section */}
      <PlanOverviewSection />

      {/* Discovery */}
      <section
        className="bg-[#eef8f3] pb-6 pt-16 sm:pt-20 lg:pb-8"
        aria-labelledby="discovery-title"
      >
        <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-10">
          <div className="text-center">
            <h2
              id="discovery-title"
              className="text-3xl font-bold tracking-[-0.035em] text-[#064d39] sm:text-4xl lg:text-[2.75rem]"
            >
              Find your kind of Manali
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#405a50] sm:text-base">
              From family outings to adventure days and relaxing stays—choose
              what suits you best.
            </p>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {discoveryCards.map((card) => {
              const Icon = card.icon;

              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group overflow-hidden rounded-xl bg-[#0b684d] text-white no-underline shadow-[0_16px_40px_rgba(5,77,57,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(5,77,57,0.22)]"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                      quality={84}
                      className={`object-cover transition duration-500 group-hover:scale-105 ${card.imagePosition}`}
                    />

                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                    />

                    <span className="absolute -bottom-5 left-4 z-10 inline-flex size-11 items-center justify-center rounded-full border-4 border-[#0b684d] bg-[#eef8f3] text-[#07563f] shadow-md">
                      <Icon
                        aria-hidden="true"
                        className="size-5"
                        strokeWidth={1.8}
                      />
                    </span>
                  </div>

                  <div className="px-4 pb-5 pt-8">
                    <h3 className="text-lg font-bold tracking-[-0.02em]">
                      {card.title}
                    </h3>

                    <p className="mt-2 min-h-[3.5rem] text-sm leading-5 text-white/85">
                      {card.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-7 flex justify-center">
            <Link
              href="/activities"
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-[#0b684d] px-7 py-3 text-sm font-semibold text-white no-underline shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#064d39]"
            >
              Explore all tours
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <ContactStrip />
    </main>
  );
}