import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 border-t border-white/10 bg-ink px-6 py-12 text-center">
      <Image src="/images/logo.png" alt="Midnimo Athletics" width={48} height={48} className="rounded-full" />
      <p className="font-body text-sm text-paper/50">
        © {new Date().getFullYear()} Midnimo Athletics. All rights reserved.
      </p>
    </footer>
  );
}
