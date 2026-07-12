import Link from "next/link";

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

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
      fill="currentColor"
    >
      <path d="M14 8h3V4.4A17 17 0 0 0 14.4 4C11.8 4 10 5.6 10 8.6V11H7v4h3v6h4v-6h3l.5-4H14V8Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
      fill="currentColor"
    >
      <path d="M21 8.2a3 3 0 0 0-2.1-2.1C17.1 5.6 12 5.6 12 5.6s-5.1 0-6.9.5A3 3 0 0 0 3 8.2 31 31 0 0 0 2.5 12 31 31 0 0 0 3 15.8a3 3 0 0 0 2.1 2.1c1.8.5 6.9.5 6.9.5s5.1 0 6.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-3.8 31 31 0 0 0-.5-3.8ZM10 15.3V8.7l5.7 3.3-5.7 3.3Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.2 18.6 3.7 21l4.1-1.1A8.7 8.7 0 1 0 3 12a8.6 8.6 0 0 0 2.2 5.8" />
      <path d="M8.3 7.8c.6 3.5 2.4 5.6 5.9 7.1" />
    </svg>
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
              className="inline-flex py-0.5 text-xs leading-5 text-white/72 no-underline transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#07563f] pt-28 text-white sm:pt-32 lg:pt-36">
      <div className="mx-auto w-full max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_1fr_1fr_0.9fr] lg:gap-8">
          <div>
            <FooterMark />

            <p className="mt-4 max-w-[26ch] text-xs leading-5 text-white/72">
              Your friendly travel companion for memorable stays, exciting
              journeys, and budget-friendly adventures in the Himalayas.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex size-8 items-center justify-center rounded-full border border-white/35 text-white transition hover:border-white hover:bg-white hover:text-[#07563f]"
              >
                <InstagramIcon />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="inline-flex size-8 items-center justify-center rounded-full border border-white/35 text-white transition hover:border-white hover:bg-white hover:text-[#07563f]"
              >
                <FacebookIcon />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="inline-flex size-8 items-center justify-center rounded-full border border-white/35 text-white transition hover:border-white hover:bg-white hover:text-[#07563f]"
              >
                <YoutubeIcon />
              </a>

              <Link
                href="/contact?method=whatsapp"
                aria-label="WhatsApp"
                className="inline-flex size-8 items-center justify-center rounded-full border border-white/35 text-white transition hover:border-white hover:bg-white hover:text-[#07563f]"
              >
                <WhatsAppIcon />
              </Link>
            </div>
          </div>

          <FooterColumn title="Explore" links={exploreLinks} />

          <FooterColumn title="Top Activities" links={activityLinks} />

          <FooterColumn title="Travel Info" links={travelLinks} />

          <FooterColumn title="Company" links={companyLinks} />
        </div>

        <div className="border-t border-white/20">
          <div className="flex min-h-14 flex-col justify-center gap-2 py-4 text-[11px] text-white/65 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Adventure Hub Manali. All rights reserved.</p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <Link
                href="/privacy"
                className="transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="transition-colors hover:text-white"
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