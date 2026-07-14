import Image from "next/image";
import Link from "next/link";

import Icons from "@/components/Icons";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/activities", label: "Activities" },
  { href: "/hotel", label: "Hotel" },
  { href: "/travel", label: "Travel" },
  { href: "/contact", label: "Contact" },
];

const activityLinks = [
  { href: "/activities?type=paragliding", label: "Paragliding" },
  { href: "/activities?type=rafting", label: "River Rafting" },
  { href: "/activities?type=trekking", label: "Trekking" },
  { href: "/activities?type=sightseeing", label: "Local Sightseeing" },
  { href: "/activities?type=combo", label: "Adventure Combo" },
];

const travelLinks = [
  { href: "/travel#how-to-reach", label: "How to Reach" },
  { href: "/travel#best-time", label: "Best Time to Visit" },
  { href: "/travel#tips", label: "Travel Tips" },
  { href: "/travel#local-guide", label: "Local Guide" },
  { href: "/travel#faq", label: "FAQ" },
];

const companyLinks = [
  { href: "/about", label: "About Us" },
  { href: "/about#approach", label: "Our Approach" },
  { href: "/careers", label: "Careers" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/activities", label: "Explore tours" },
  { href: "/contact", label: "Contact" },
];

function FooterMark() {
  return (
    <div className="inline-flex flex-col items-center text-white">
      <svg
        aria-hidden="true"
        viewBox="0 0 112 42"
        className="h-[38px] w-[108px]"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M5 32 22 12l10 11 9-14 11 12 9-9 18 20H5Z"
          strokeWidth="1.6"
        />

        <path
          d="m16 25 6-4 6 4 5-4 7 5 7-5 7 5 7-6 9 7"
          strokeWidth="1.1"
          opacity="0.85"
        />

        <path
          d="M86 11c0-4 3-7 7-7s7 3 7 7c0 5-7 12-7 12s-7-7-7-12Z"
          strokeWidth="1.4"
        />

        <circle cx="93" cy="11" r="2" fill="currentColor" />
      </svg>

      <span className="-mt-0.5 text-[13px] font-extrabold uppercase leading-none tracking-[0.06em]">
        Adventure Hub
      </span>

      <span className="mt-1 flex items-center gap-1.5 text-[7px] font-semibold uppercase tracking-[0.32em]">
        <span className="h-px w-4 bg-white/65" />
        Manali
        <span className="h-px w-4 bg-white/65" />
      </span>

      <span className="mt-1 text-[6px] tracking-[0.08em] text-white/75">
        Stay. Travel. Adventure.
      </span>
    </div>
  );
}

type FooterColumnProps = {
  title: string;
  links: Array<{
    href: string;
    label: string;
  }>;
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <nav aria-label={`${title} navigation`}>
      <h2 className="text-sm font-semibold text-white">{title}</h2>

      <ul className="mt-3 list-none space-y-1.5">
        {links.map((link) => (
          <li key={`${link.href}-${link.label}`}>
            <Link
              href={link.href}
              className="inline-flex py-0.5 text-xs leading-5 text-white/75 no-underline transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SocialLinks() {
  const sharedClassName =
    "inline-flex size-9 items-center justify-center rounded-full border border-white/35 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-[#07563f]";

  return (
    <div className="flex items-center gap-2">
      <a
        href="#"
        aria-label="Instagram"
        className={sharedClassName}
      >
        <Icons.InstagramIcon
          aria-hidden="true"
          className="size-4"
        />
      </a>

      <a
        href="#"
        aria-label="Facebook"
        className={sharedClassName}
      >
        <Icons.FacebookIcon
          aria-hidden="true"
          className="size-4"
        />
      </a>

      <a
        href="#"
        aria-label="YouTube"
        className={sharedClassName}
      >
        <Icons.YouTubeIcon
          aria-hidden="true"
          className="size-4"
        />
      </a>

      <Link
        href="/contact?method=whatsapp"
        aria-label="WhatsApp"
        className={sharedClassName}
      >
        <Icons.WhatsAppIcon
          aria-hidden="true"
          className="size-4"
        />
      </Link>
    </div>
  );
}

function MobileFooter() {
  return (
    <div className="pb-7 md:hidden">
      <div className="flex flex-col items-center text-center">
        <FooterMark />

        <p className="mt-4 max-w-[30ch] text-xs leading-5 text-white/75">
          Simple stays, travel, and adventures for your Manali trip.
        </p>

        <nav
          className="mt-5"
          aria-label="Mobile footer navigation"
        >
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {mobileLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/25 bg-white/5 px-4 py-2 text-xs font-medium text-white no-underline backdrop-blur-sm transition duration-300 hover:border-white/60 hover:bg-white hover:text-[#07563f]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-5">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}

function DesktopFooter() {
  return (
    <div className="hidden grid-cols-[1.35fr_0.75fr_1fr_1fr_0.9fr] gap-8 pb-10 md:grid">
      <div>
        <FooterMark />

        <p className="mt-4 max-w-[26ch] text-xs leading-5 text-white/75">
          Your friendly travel companion for memorable stays, exciting
          journeys, and budget-friendly adventures in the Himalayas.
        </p>

        <div className="mt-5">
          <SocialLinks />
        </div>
      </div>

      <FooterColumn
        title="Explore"
        links={exploreLinks}
      />

      <FooterColumn
        title="Top Activities"
        links={activityLinks}
      />

      <FooterColumn
        title="Travel Info"
        links={travelLinks}
      />

      <FooterColumn
        title="Company"
        links={companyLinks}
      />
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden pt-20 text-white sm:pt-28 lg:pt-36">
      {/* Footer background */}
      <Image
        src="/images/footer.png"
        alt=""
        fill
        sizes="100vw"
        quality={88}
        className="object-cover object-center"
      />

      {/* Readability overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/35"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#07563f]/30 via-[#064d39]/45 to-[#032f25]/80"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <MobileFooter />
        <DesktopFooter />

        <div className="border-t border-white/25">
          <div className="flex min-h-14 flex-col items-center justify-center gap-2 py-4 text-center text-[11px] text-white/70 md:flex-row md:justify-between md:text-left">
            <p>
              © 2026 Adventure Hub Manali. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
              <Link
                href="/privacy"
                className="transition-colors duration-300 hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="transition-colors duration-300 hover:text-white"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}