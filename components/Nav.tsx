"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LINKS = [
  { href: "#programs", label: "Programs" },
  { href: "#signup", label: "Sign Up" },
  { href: "#about", label: "About" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-500 ${
        scrolled ? "bg-ink/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#home" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Midnimo Athletics logo"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-display text-base font-semibold tracking-wide text-paper">
            Midnimo Athletics
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm uppercase tracking-widest text-paper/70 transition-colors duration-300 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span className="block h-px w-6 bg-paper transition-transform duration-300" style={open ? { transform: "translateY(6px) rotate(45deg)" } : undefined} />
          <span className={`block h-px w-6 bg-paper transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
          <span className="block h-px w-6 bg-paper transition-transform duration-300" style={open ? { transform: "translateY(-6px) rotate(-45deg)" } : undefined} />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-white/10 bg-ink px-6 py-6 md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-body text-sm uppercase tracking-widest text-paper/70 transition-colors duration-300 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
