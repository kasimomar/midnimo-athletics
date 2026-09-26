import Image from "next/image";
import { contactEmail, contactEmailHref } from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink px-6 py-12 text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <a href="#home" className="inline-flex min-h-11 items-center gap-3 font-display text-xl">
            <Image src="/images/logo.png" alt="" width={48} height={48} className="rounded-full" />
            Midnimo Athletics
          </a>
          <p className="mt-4 text-base leading-relaxed text-paper/80">A nonprofit bringing youth together through sports, movement, and community.</p>
        </div>
        <div>
          <p className="font-semibold">Stay connected</p>
          <a href={contactEmailHref} className="mt-2 inline-flex min-h-11 items-center break-all text-base underline underline-offset-4">{contactEmail}</a>
          <p className="mt-2 text-sm text-paper/80">All youth are welcome.</p>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-sm text-paper/80">
        © {new Date().getFullYear()} Midnimo Athletics. All rights reserved.
      </p>
    </footer>
  );
}
