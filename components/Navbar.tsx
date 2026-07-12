"use client";

import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/activities', label: 'Activities' },
  { href: '/hotel', label: 'Hotel' },
  { href: '/travel', label: 'Travel' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full border-b border-white/10 bg-gray-950/95 backdrop-blur">
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 p-4" aria-label="Main navigation">
        <div className="flex items-center">
          <a href="/" className="text-lg font-bold text-white" aria-label="Homepage">Adventure Hub Manali</a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="navbar-links"
          className="inline-flex h-4 w-6 flex-col justify-between border-0 bg-transparent p-0 cursor-pointer md:hidden"
        >
          <span className="block h-[2px] rounded bg-white" />
          <span className="block h-[2px] rounded bg-white" />
          <span className="block h-[2px] rounded bg-white" />
        </button>

        <ul
          id="navbar-links"
          className={`absolute right-4 top-full mt-3 list-none flex gap-4 rounded-md border border-white/10 bg-gray-950 p-3 shadow-lg shadow-black/20 ${open ? 'flex flex-col' : 'hidden'} md:static md:mt-0 md:flex md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="block px-2 py-1 text-white/80 no-underline hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
