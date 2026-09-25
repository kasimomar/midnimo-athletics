import { contactEmail, programInquiryHref } from "@/lib/contact";

export default function ProgramInterest() {
  return (
    <section id="signup" aria-labelledby="program-interest-title" className="relative scroll-mt-24 bg-white/[0.03] px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
        <div>
          <p className="mb-4 font-body text-xs uppercase tracking-widest text-clay">Take the next step</p>
          <h2 id="program-interest-title" className="font-display text-4xl font-semibold text-paper md:text-6xl">
            Program Interest
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/80">
            Interested in joining Midnimo Athletics? Our team can help you learn
            about our community programs and discuss your child&apos;s interests.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/70">
            Contact us for current availability, participation details, and any
            costs before enrolling. An inquiry starts a conversation; it does not
            reserve a place in a program.
          </p>
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl border border-white/10 bg-ink p-8 md:p-10">
          <h3 className="font-display text-2xl font-semibold text-paper">Let&apos;s talk about joining</h3>
          <p className="mt-4 text-sm leading-relaxed text-paper/70">
            Tell us which program interests your family and what you would like
            to know. We&apos;ll discuss the next steps with you.
          </p>
          <a href={programInquiryHref} className="mt-6 rounded-full bg-accent px-6 py-3 font-body text-sm font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper">
            Email About a Program
          </a>
          <p className="mt-3 break-all text-sm text-paper/70">{contactEmail}</p>
          <p className="mt-2 text-xs leading-relaxed text-paper/60">
            Opens your email app. You can also copy this address into your email service.
          </p>
          <a href="#contact" className="mt-6 text-sm text-accent underline underline-offset-4">Prepare a message for our team</a>
        </div>
      </div>
    </section>
  );
}
