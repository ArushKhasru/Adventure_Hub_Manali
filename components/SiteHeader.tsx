"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Icons from "@/components/Icons";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/activities", label: "Activities" },
  { href: "/hotel", label: "Hotel" },
  { href: "/travel", label: "Travel" },
  { href: "/contact", label: "Contact" },
];

function BrandLogo() {
  return (
    <div className="flex flex-col items-center text-white">
      <svg
        aria-hidden="true"
        viewBox="0 0 110 38"
        className="h-[30px] w-[88px] sm:h-[34px] sm:w-[100px]"
        fill="none"
      >
        <path
          d="M5 31 22 12l10 11 9-14 10 12 9-8 18 18H5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="m16 24 6-4 6 4 5-4 7 5 7-5 7 5 7-6 9 7"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />

        <path
          d="M86 11c0-4 3-7 7-7s7 3 7 7c0 5-7 12-7 12s-7-7-7-12Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />

        <circle cx="93" cy="11" r="2" fill="currentColor" />

        <path
          d="M4 34h73"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>

      <span className="-mt-0.5 text-[11px] font-extrabold uppercase leading-none tracking-[0.08em] sm:text-[13px]">
        Adventure Hub
      </span>

      <span className="mt-1 flex items-center gap-1.5 text-[6px] font-semibold uppercase tracking-[0.34em] text-white/90 sm:text-[7px]">
        <span className="h-px w-3 bg-white/70" />
        Manali
        <span className="h-px w-3 bg-white/70" />
      </span>

      <span className="mt-1 text-[5px] font-medium tracking-[0.12em] text-white/75 sm:text-[6px]">
        Stay. Travel. Adventure.
      </span>
    </div>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      setIsOpen(false);

      window.requestAnimationFrame(() => {
        menuButtonRef.current?.focus();
      });
    };

    const handleOutsideClick = (event: PointerEvent) => {
      const target = event.target;

      if (target instanceof Node && !headerRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isOpen]);

  const showGreenBackground = isScrolled || isOpen;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 h-[72px] text-white transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 md:h-[80px] ${
        showGreenBackground
          ? "border-b border-white/10 bg-[#064d39]/95 shadow-[0_8px_30px_rgba(0,0,0,0.18)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent shadow-none backdrop-blur-none"
      }`}
    >
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16"
      >
        <Link
          href="/"
          aria-label="Adventure Hub Manali home"
          className="flex min-h-11 shrink-0 items-center no-underline"
        >
          <BrandLogo />
        </Link>

        <ul className="hidden list-none items-center gap-7 lg:flex xl:gap-8">
          {navigationLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative inline-flex min-h-11 items-center text-[11px] font-medium no-underline transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}

                  <span
                    aria-hidden="true"
                    className={`absolute bottom-[5px] left-1/2 h-px -translate-x-1/2 bg-white transition-all duration-300 ${
                      isActive
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-70"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/activities"
          className="hidden min-h-10 items-center justify-center rounded-md bg-[#2b8a68] px-6 text-[11px] font-semibold text-white no-underline transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#36a17b] lg:inline-flex"
        >
          Explore tours
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close main menu" : "Open main menu"}
          onClick={() => setIsOpen((current) => !current)}
          className="relative inline-flex size-11 items-center justify-center rounded-md border border-white/30 bg-white/10 text-white backdrop-blur-sm lg:hidden"
        >
          <span aria-hidden="true" className="relative h-4 w-6">
            <span
              className={`absolute left-0 top-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
                isOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />

            <span
              className={`absolute left-0 top-[7px] h-0.5 w-6 rounded-full bg-current transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`absolute bottom-0 left-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
                isOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={`absolute inset-x-0 top-full overflow-hidden border-t border-white/10 bg-[#064d39] shadow-2xl transition-[max-height,opacity,visibility] duration-300 lg:hidden ${
          isOpen
            ? "visible max-h-[520px] opacity-100"
            : "invisible max-h-0 opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile navigation"
          className="mx-auto max-w-[1440px] px-5 pb-6 pt-3 sm:px-8"
        >
          <ul className="list-none divide-y divide-white/10">
            {navigationLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href ||
                    pathname.startsWith(`${link.href}/`);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                    className={`flex min-h-12 items-center justify-between py-3 text-sm font-medium no-underline transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>

                    <Icons.ArrowRight
                      aria-hidden="true"
                      className={`size-4 ${
                        isActive ? "opacity-100" : "opacity-50"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/activities"
            onClick={() => setIsOpen(false)}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#2b8a68] px-5 py-3 text-sm font-semibold text-white no-underline transition-colors duration-300 hover:bg-[#36a17b]"
          >
            Explore tours
          </Link>
        </nav>
      </div>
    </header>
  );
}
