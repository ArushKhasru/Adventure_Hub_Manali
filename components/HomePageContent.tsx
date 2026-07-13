"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useRef,
  useState,
  type ElementType,
} from "react";

import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from "motion/react";

import Icons, { type IconName } from "@/components/Icons";
import HeroCarousel from "@/components/HeroCarousel";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type AppIconProps = {
  name: IconName;
  className?: string;
  strokeWidth?: number;
};

type DiscoveryCard = {
  href: string;
  title: string;
  description: string;
  image: string;
  imagePosition: string;
  icon: IconName;
};

type PlanBenefit = {
  title: string;
  description: string;
  icon: IconName;
};

type ContactOption = {
  href: string;
  title: string;
  description: string;
  icon: IconName;
};

type InspirationItem = {
  title: string;
  description: string;
  note?: string;
  image: string;
  imagePosition: string;
  href: string;
  linkLabel: string;
};

/* -------------------------------------------------------------------------- */
/*                              Shared Components                             */
/* -------------------------------------------------------------------------- */

function AppIcon({
  name,
  className,
  strokeWidth,
}: AppIconProps) {
  const Icon = Icons[name] as ElementType;

  return (
    <Icon
      aria-hidden="true"
      className={className}
      strokeWidth={strokeWidth}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Motion                                    */
/* -------------------------------------------------------------------------- */

const smoothEase: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

const imageReveal: Variants = {
  hidden: {
    opacity: 0,
    x: -44,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

/* -------------------------------------------------------------------------- */
/*                                   Data                                     */
/* -------------------------------------------------------------------------- */

const planBenefits: PlanBenefit[] = [
  {
    title: "Comfortable stays",
    description:
      "Handpicked hotels and homestays for a relaxing mountain escape.",
    icon: "BedDouble",
  },
  {
    title: "Easy travel",
    description:
      "Airport transfers, local sightseeing, and reliable transport across Manali.",
    icon: "Bus",
  },
  {
    title: "Epic adventures",
    description:
      "Rafting, paragliding, treks, and more—curated for every traveller.",
    icon: "Mountain",
  },
  {
    title: "Memorable experiences",
    description:
      "Scenic spots, local culture, and hidden gems that make your trip unforgettable.",
    icon: "Camera",
  },
];

const inspirationItems: InspirationItem[] = [
  {
    title: "Your first Manali morning",
    description:
      "Start with a panoramic valley view, take the scenic winding route, and leave plenty of room for a little wandering through old villages.",
    image: "/images/home/hero-valley.webp",
    imagePosition: "object-center",
    href: "/travel#local-guide",
    linkLabel: "View local guide",
  },
  {
    title: "Pick your level of wild",
    description:
      "Raft the Kullu rapids, paraglide above Solang Valley, explore mountain trails, or choose an easygoing pine forest outing.",
    note:
      "Activities depend on the season and current weather conditions.",
    image: "/images/home/hero-adventure.webp",
    imagePosition: "object-center",
    href: "/activities",
    linkLabel: "Explore activities",
  },
  {
    title: "Days the whole family can enjoy",
    description:
      "Keep the itinerary flexible, memorable, and comfortable for every age group, with direct pickup and family-friendly stays included.",
    image: "/images/home/hero-family.webp",
    imagePosition: "object-[54%_center]",
    href: "/contact",
    linkLabel: "Get a custom quote",
  },
];

const discoveryCards: DiscoveryCard[] = [
  {
    href: "/activities",
    title: "Family outings",
    description:
      "Fun, safe, and memorable experiences for all ages.",
    image: "/images/home/hero-family.webp",
    imagePosition: "object-center",
    icon: "UsersRound",
  },
  {
    href: "/activities",
    title: "Adventure days",
    description:
      "Adrenaline-pumping activities and outdoor thrills.",
    image: "/images/home/hero-adventure.webp",
    imagePosition: "object-center",
    icon: "Mountain",
  },
  {
    href: "/hotel",
    title: "Comfortable stays",
    description:
      "Handpicked stays with great views and warm hospitality.",
    image: "/images/home/hero-stay.webp",
    imagePosition: "object-center",
    icon: "BedDouble",
  },
  {
    href: "/travel",
    title: "Scenic travel",
    description:
      "Road trips and sightseeing through stunning landscapes.",
    image: "/images/home/hero-valley.webp",
    imagePosition: "object-center",
    icon: "CarFront",
  },
];

const contactOptions: ContactOption[] = [
  {
    href: "/contact?method=whatsapp",
    title: "WhatsApp",
    description: "Chat with us on WhatsApp",
    icon: "WhatsAppIcon",
  },
  {
    href: "/contact?method=call",
    title: "Call us",
    description: "Speak with our travel experts",
    icon: "Phone",
  },
  {
    href: "/contact",
    title: "Contact us",
    description: "Send us a message on our contact page",
    icon: "Mail",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Mountain Divider                              */
/* -------------------------------------------------------------------------- */

function MountainDivider() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-[-1px] z-40 h-14 sm:h-16 lg:h-20"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <path
          d="
            M0 56
            L70 34
            L140 55
            L215 27
            L290 56
            L365 35
            L440 60
            L520 29
            L600 55
            L680 34
            L760 59
            L840 28
            L920 56
            L1000 34
            L1080 61
            L1160 30
            L1240 56
            L1315 35
            L1380 57
            L1440 39
            L1440 80
            L0 80
            Z
          "
          fill="#ffffff"
        />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Why Us                                      */
/* -------------------------------------------------------------------------- */

function PlanOverviewSection() {
  return (
    <section
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="why-us-title"
    >
      <motion.div
        aria-hidden="true"
        className="absolute -left-28 top-24 size-72 rounded-full bg-[#dcefe5]/55 blur-3xl"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.3, 0.55, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute -right-24 bottom-10 size-64 rounded-full bg-[#eef8f3] blur-3xl"
        animate={{
          scale: [1.08, 1, 1.08],
          opacity: [0.45, 0.25, 0.45],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <motion.header
          className="mb-12 text-center sm:mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.5,
          }}
        >
          

          <motion.h2
            id="why-us-title"
            variants={fadeUp}
            className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#064d39] sm:text-4xl lg:text-5xl"
          >
            Why us
          </motion.h2>

          <motion.div
            variants={fadeUp}
            aria-hidden="true"
            className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#07563f]"
          />
        </motion.header>

        <motion.div
          className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          <motion.div
            variants={imageReveal}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <motion.div
              className="relative aspect-[4/3] w-full"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.025,
                rotate: -0.4,
              }}
            >
              <Image
                src="/images/home/why-us.png"
                alt="Illustration showing a complete Manali travel plan"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={92}
                className="object-contain"
              />
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="absolute inset-x-[12%] bottom-3 h-8 rounded-[50%] bg-[#07563f]/10 blur-xl"
              animate={{
                scaleX: [1, 0.88, 1],
                opacity: [0.35, 0.2, 0.35],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <motion.div variants={staggerContainer}>
            <motion.p
              variants={fadeUp}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#3b7665]"
            >
              Everything in one place
            </motion.p>

            <motion.h3
              variants={fadeUp}
              className="max-w-[15ch] text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[#064d39] sm:text-5xl"
            >
              Your whole Manali plan, under one roof.
            </motion.h3>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[60ch] text-base leading-7 text-[#52685f] sm:text-lg sm:leading-8"
            >
              We make travel in Manali easy and exciting. Whether
              you&apos;re here to relax, explore, or chase adventure, we
              help you plan everything your way. Enjoy comfortable stays,
              hassle-free local transport, and experiences that turn your
              trip into lasting memories.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 inline-flex"
              whileHover={{
                y: -3,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
            >
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center gap-2 rounded-md bg-[#07563f] px-6 py-3 text-sm font-semibold text-white no-underline shadow-[0_12px_28px_rgba(7,86,63,0.18)] transition-colors duration-300 hover:bg-[#064534]"
              >
                Start planning

                <AppIcon
                  name="ArrowRight"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-14 grid overflow-hidden rounded-2xl border border-[#dcebe3] bg-[#f7fbf9] shadow-[0_18px_45px_rgba(7,86,63,0.07)] sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          {planBenefits.map((benefit, index) => (
            <motion.article
              key={benefit.title}
              variants={fadeUp}
              whileHover={{
                y: -6,
                backgroundColor: "#ffffff",
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 22,
              }}
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
              <motion.span
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[#dcefe5] text-[#07563f]"
                whileHover={{
                  rotate: -6,
                  scale: 1.08,
                }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 18,
                }}
              >
                <AppIcon
                  name={benefit.icon}
                  className="size-6"
                  strokeWidth={1.7}
                />
              </motion.span>

              <div>
                <h4 className="text-sm font-bold text-[#064d39] sm:text-base">
                  {benefit.title}
                </h4>

                <p className="mt-2 text-xs leading-5 text-[#52685f] sm:text-sm">
                  {benefit.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="mx-auto mt-8 h-5 w-full max-w-[1100px] rounded-[50%] border-t-2 border-[#9fcdbb]"
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          whileInView={{
            scaleX: 1,
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            ease: smoothEase,
          }}
        />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                   Desktop Sticky Inspiration Section                       */
/* -------------------------------------------------------------------------- */

function InspirationStickySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      inspirationItems.length - 1,
      Math.floor(latest * inspirationItems.length),
    );

    setActiveIndex((currentIndex) =>
      currentIndex === nextIndex
        ? currentIndex
        : nextIndex,
    );
  });

  const activeItem = inspirationItems[activeIndex];

  const progress =
    ((activeIndex + 1) / inspirationItems.length) * 100;

  return (
    <section
      ref={sectionRef}
      className="relative hidden bg-white lg:block"
      style={{
        height: `${inspirationItems.length * 100}vh`,
      }}
      aria-labelledby="inspiration-title"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col px-10 pb-8 pt-[calc(var(--header-height)+1.25rem)] xl:px-16">
          <motion.header
            className="mb-7 shrink-0 text-center"
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              ease: smoothEase,
            }}
          >
            <h2
              id="inspiration-title"
              className="text-4xl font-bold leading-tight tracking-[-0.04em] text-[#17172d] xl:text-5xl"
            >
              A little inspiration goes a long way.
            </h2>

            <span
              aria-hidden="true"
              className="mx-auto mt-4 block h-1 w-16 rounded-full bg-[#07563f]"
            />

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#5b6175] xl:text-lg">
              Check out our favourite curated holiday ideas for a
              memorable stay in the Kullu-Manali valley.
            </p>
          </motion.header>

          <div className="grid min-h-0 flex-1 grid-cols-[1.08fr_0.92fr] gap-8">
            <div className="relative min-h-0 overflow-hidden rounded-[1.75rem] bg-[#dcefe5] shadow-[0_24px_70px_rgba(7,86,63,0.14)]">
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.div
                  key={activeItem.image}
                  className="absolute inset-0"
                  initial={{
                    opacity: 0,
                    scale: 1.06,
                    y: 40,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.98,
                    y: -40,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: smoothEase,
                  }}
                >
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    fill
                    sizes="60vw"
                    quality={90}
                    className={`object-cover ${activeItem.imagePosition}`}
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-6 left-6 z-10 rounded-full border border-white/30 bg-black/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                Inspiration {activeIndex + 1}
              </div>
            </div>

            <div className="flex min-h-0 flex-col justify-center overflow-hidden rounded-[1.75rem] border border-[#dcebe3] bg-[#eef8f3] p-10 shadow-[0_20px_60px_rgba(7,86,63,0.08)] xl:p-14">
              <div className="mb-10 flex items-center gap-3">
                {inspirationItems.map((item, index) => (
                  <span
                    key={item.title}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === activeIndex
                        ? "w-14 bg-[#07563f]"
                        : index < activeIndex
                          ? "w-8 bg-[#75aa96]"
                          : "w-8 bg-[#c9ddd4]"
                    }`}
                  />
                ))}

                <span className="ml-auto text-sm font-semibold text-[#07563f]">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(inspirationItems.length).padStart(2, "0")}
                </span>
              </div>

              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.div
                  key={activeItem.title}
                  aria-live="polite"
                  initial={{
                    opacity: 0,
                    x: 45,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -35,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: smoothEase,
                  }}
                >
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#3b7665]">
                    Curated Manali idea
                  </p>

                  <h3 className="mt-4 max-w-[13ch] text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-[#064d39] xl:text-5xl">
                    {activeItem.title}
                  </h3>

                  <p className="mt-6 max-w-[52ch] text-base leading-8 text-[#52685f] xl:text-lg">
                    {activeItem.description}
                  </p>

                  {activeItem.note ? (
                    <p className="mt-4 max-w-[52ch] text-sm italic leading-6 text-[#64766f]">
                      Note: {activeItem.note}
                    </p>
                  ) : null}

                  <motion.div
                    className="mt-8 inline-flex"
                    whileHover={{
                      y: -3,
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                  >
                    <Link
                      href={activeItem.href}
                      className="group inline-flex min-h-12 items-center gap-3 rounded-md bg-[#07563f] px-6 py-3 text-sm font-semibold text-white no-underline shadow-[0_12px_28px_rgba(7,86,63,0.18)] transition-colors duration-300 hover:bg-[#064534]"
                    >
                      {activeItem.linkLabel}

                      <AppIcon
                        name="ArrowRight"
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                        strokeWidth={2}
                      />
                    </Link>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-12">
                <div className="h-1.5 overflow-hidden rounded-full bg-[#cfe1d9]">
                  <motion.div
                    className="h-full rounded-full bg-[#07563f]"
                    animate={{
                      width: `${progress}%`,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: smoothEase,
                    }}
                  />
                </div>

                <p className="mt-3 text-xs text-[#687b73]">
                  Keep scrolling to explore the next idea
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Discovery Section                              */
/* -------------------------------------------------------------------------- */

function DiscoverySection() {
  return (
    <motion.section
      className="bg-[#eef8f3] pb-6 pt-16 sm:pt-20 lg:pb-8"
      aria-labelledby="discovery-title"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.12,
      }}
    >
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <motion.header
          variants={staggerContainer}
          className="text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm font-bold uppercase tracking-[0.24em] text-[#3b7665]"
          >
            Explore Manali
          </motion.p>

          <motion.h2
            id="discovery-title"
            variants={fadeUp}
            className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[#064d39] sm:text-4xl lg:text-[2.75rem]"
          >
            Find your kind of Manali
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#405a50] sm:text-base"
          >
            From family outings to adventure days and relaxing
            stays—choose what suits you best.
          </motion.p>
        </motion.header>

        <motion.div
          variants={staggerContainer}
          className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {discoveryCards.map((card) => (
            <motion.article
              key={card.title}
              variants={fadeUp}
              whileHover={{
                y: -9,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              className="h-full"
            >
              <Link
                href={card.href}
                className="group block h-full overflow-hidden rounded-xl bg-[#0b684d] text-white no-underline shadow-[0_16px_40px_rgba(5,77,57,0.14)] transition-shadow duration-300 hover:shadow-[0_24px_55px_rgba(5,77,57,0.24)]"
              >
                <div className="relative">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                      quality={84}
                      className={`object-cover transition duration-700 ease-out group-hover:scale-110 ${card.imagePosition}`}
                    />

                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                    />
                  </div>

                  <motion.span
                    className="absolute bottom-0 left-4 z-20 inline-flex size-12 translate-y-1/2 items-center justify-center rounded-full border-[3px] border-[#0b684d] bg-[#eef8f3] text-[#07563f] shadow-md"
                    whileHover={{
                      rotate: -8,
                      scale: 1.08,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                    }}
                  >
                    <AppIcon
                      name={card.icon}
                      className="size-5"
                      strokeWidth={1.8}
                    />
                  </motion.span>
                </div>

                <div className="px-4 pb-5 pt-9">
                  <h3 className="text-lg font-bold tracking-[-0.02em]">
                    {card.title}
                  </h3>

                  <p className="mt-2 min-h-[3.5rem] text-sm leading-5 text-white/85">
                    {card.description}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-7 flex justify-center"
        >
          <motion.div
            whileHover={{
              y: -3,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            <Link
              href="/activities"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-[#0b684d] px-7 py-3 text-sm font-semibold text-white no-underline shadow-lg transition-colors duration-300 hover:bg-[#064d39]"
            >
              Explore all tours

              <AppIcon
                name="ArrowRight"
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Contact Strip                                */
/* -------------------------------------------------------------------------- */

function ContactStrip() {
  return (
    <section
      className="relative z-30 bg-[#eef8f3] px-5 pb-0 pt-8 sm:px-8 lg:px-10"
      aria-labelledby="contact-strip-title"
    >
      <motion.div
        className="relative z-40 mx-auto w-full max-w-[1180px] translate-y-10 overflow-hidden rounded-2xl border border-[#dcebe3] bg-white shadow-[0_18px_50px_rgba(5,77,57,0.16)] sm:translate-y-12 lg:translate-y-16"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.2,
        }}
      >
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

          <motion.div
            className="grid sm:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
          >
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.title}
                variants={fadeIn}
                whileHover={{
                  backgroundColor: "#f2faf6",
                }}
                className={
                  index < contactOptions.length - 1
                    ? "border-b border-[#dcebe3] sm:border-b-0 sm:border-r"
                    : ""
                }
              >
                <Link
                  href={option.href}
                  className="group flex min-h-[8.5rem] items-center gap-4 px-6 py-6 text-[#07563f] no-underline"
                >
                  <motion.span
                    className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[#07563f] text-white"
                    whileHover={{
                      scale: 1.1,
                      rotate: -5,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 18,
                    }}
                  >
                    <AppIcon
                      name={option.icon}
                      className="size-[1.35rem]"
                      strokeWidth={1.8}
                    />
                  </motion.span>

                  <span>
                    <strong className="block text-sm font-bold">
                      {option.title}
                    </strong>

                    <span className="mt-1 block max-w-[16ch] text-xs leading-4 text-[#536b61]">
                      {option.description}
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Home                                      */
/* -------------------------------------------------------------------------- */

export default function HomePageContent() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="overflow-x-clip bg-[#eef8f3]">
        <section
          className="relative h-[100svh] min-h-[42rem] overflow-hidden bg-black"
          aria-label="Manali hero slider"
        >
          <HeroCarousel />
          <MountainDivider />
        </section>

        <PlanOverviewSection />

        <InspirationStickySection />

        <DiscoverySection />

        <ContactStrip />
      </main>
    </MotionConfig>
  );
}