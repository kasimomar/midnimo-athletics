"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const LINKS = [
  { href: "#programs", label: "Programs" },
  { href: "#signup", label: "Program Interest" },
  { href: "#about", label: "Our Mission" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  useEffect(() => {
    // Keep this breakpoint aligned with Tailwind's default md breakpoint.
    const desktop = window.matchMedia("(min-width: 768px)");
    const onBreakpointChange = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", onBreakpointChange);
    return () => desktop.removeEventListener("change", onBreakpointChange);
  }, []);

  return (
    <header
      onKeyDown={(event) => {
        if (open && event.key === "Escape") {
          event.preventDefault();
          closeMenu();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      className="fixed top-0 z-50 w-full border-b border-white/10 bg-ink"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#home" onClick={() => setOpen(false)} className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt=""
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-display text-base font-semibold tracking-wide text-paper">
            Midnimo Athletics
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-4 md:flex lg:gap-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center font-body text-sm text-paper/70 transition-colors duration-300 hover:text-accent lg:text-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-11 min-w-11 flex-col items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent md:hidden"
        >
          <span className="block h-px w-6 bg-paper transition-transform duration-300" style={open ? { transform: "translateY(6px) rotate(45deg)" } : undefined} />
          <span className={`block h-px w-6 bg-paper transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
          <span className="block h-px w-6 bg-paper transition-transform duration-300" style={open ? { transform: "translateY(-6px) rotate(-45deg)" } : undefined} />
        </button>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile"
        className={`${open ? "flex" : "hidden"} max-h-[calc(100dvh-5rem)] flex-col gap-4 overflow-y-auto border-t border-white/10 bg-ink px-6 py-6 md:hidden`}
      >
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="flex min-h-11 items-center font-body text-base text-paper/70 transition-colors duration-300 hover:text-accent"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
