import { contactEmail, programInquiryHref } from "@/lib/contact";

export default function ProgramInterest() {
  return (
    <section id="signup" aria-labelledby="program-interest-title" className="relative scroll-mt-24 bg-sage px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.3fr_1fr] md:gap-16">
        <div>
          <p className="mb-4 font-body text-sm uppercase tracking-widest text-forest">Take the next step</p>
          <h2 id="program-interest-title" className="font-display text-4xl font-semibold text-ink md:text-6xl">
            Program Interest
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
            Interested in joining Midnimo Athletics? Our team can help you learn
            about our community programs and discuss your child&apos;s interests.
          </p>
          <h3 className="mt-8 font-display text-2xl font-semibold text-ink">How to get started</h3>
          <ol className="mt-4 max-w-xl list-decimal space-y-4 pl-5 text-sm leading-relaxed text-muted marker:font-semibold marker:text-forest">
            <li className="pl-2">
              <strong className="font-semibold text-ink">Start a conversation.</strong>{" "}
              Use the inquiry form or email our team with the program that interests
              your family and any questions.
            </li>
            <li className="pl-2">
              <strong className="font-semibold text-ink">Discuss the details.</strong>{" "}
              Ask about current availability, ages, location, schedule, and any
              costs before enrolling.
            </li>
            <li className="pl-2">
              <strong className="font-semibold text-ink">Confirm before attending.</strong>{" "}
              Confirm enrollment and next steps directly with our team. An inquiry
              does not reserve a place in a program.
            </li>
          </ol>
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl border border-line bg-white p-8 md:p-10">
          <h3 className="font-display text-2xl font-semibold text-ink">Let&apos;s talk about joining</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Tell us which program interests your family and what you would like
            to know. We&apos;ll discuss the next steps with you.
          </p>
          <a href={programInquiryHref} className="mt-6 rounded-full bg-forest px-6 py-3 font-body text-sm font-medium text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest">
            Email About a Program
          </a>
          <p className="mt-3 break-all text-sm text-muted">{contactEmail}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Opens your email app. You can also copy this address into your email service.
          </p>
          <a href="#contact" className="mt-6 inline-flex min-h-11 items-center text-sm text-forest underline underline-offset-4">Write to our team</a>
        </div>
        <div className="border-t border-line pt-8 md:col-span-2">
          <h3 className="font-display text-2xl font-semibold text-ink">Questions from families</h3>
          <dl className="mt-6 grid gap-8 md:grid-cols-3">
            <div>
              <dt className="font-body font-semibold text-ink">Who is Midnimo for?</dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted">
                Midnimo welcomes all youth, including youth with autism already
                participating in our programs. Contact our team to discuss your
                child&apos;s interests and which program may be a fit.
              </dd>
            </div>
            <div>
              <dt className="font-body font-semibold text-ink">What does participation cost?</dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted">
                Ask our team about any current costs for the program you are
                interested in before enrolling. Midnimo&apos;s nonprofit status
                does not mean every program is free.
              </dd>
            </div>
            <div>
              <dt className="font-body font-semibold text-ink">What should I include in an inquiry?</dt>
              <dd className="mt-3 text-sm leading-relaxed text-muted">
                Share your name, reply email, and program of interest. You can add
                a question if you like. Please do not include diagnoses or medical
                information in the form or email.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
