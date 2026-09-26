"use client";

import { useState } from "react";
import { contactEmail, contactEmailHref, createEmailDraft } from "@/lib/contact";

const DETAILS = [
  { label: "Email", value: contactEmail, href: contactEmailHref },
  { label: "Weekend Program", value: "Friday–Sunday · Ages 6–13" },
  { label: "After-School Program", value: "Iftin Charter School · Mon–Fri, 4:00–6:00 PM" },
];

export default function Contact() {
  const [draftHref, setDraftHref] = useState<string>();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setDraftHref(createEmailDraft(
      String(data.get("name") ?? ""),
      String(data.get("email") ?? ""),
      String(data.get("message") ?? ""),
    ));
  }

  return (
    <section id="contact" className="relative bg-paper px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div
          className="mb-16 border-b border-line pb-8"
        >
          <h2 className="font-display text-4xl font-semibold text-ink md:text-6xl">
            Talk With Our Team
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Questions about programs or joining? Email us directly, or prepare a
            message below. All fields are required. This website does not send
            messages; you review and send them from your own email app.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr]">
          <form
            onSubmit={handleSubmit}
            onChange={() => setDraftHref(undefined)}
            className="flex min-w-0 flex-col gap-5 rounded-2xl border border-line bg-white p-8 backdrop-blur-md md:p-10"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className="font-body text-sm uppercase tracking-widest text-muted">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                required
                className="rounded-lg border border-muted bg-white px-4 py-3 font-body text-base text-ink transition-colors duration-300 focus:border-forest"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className="font-body text-sm uppercase tracking-widest text-muted">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                required
                className="rounded-lg border border-muted bg-white px-4 py-3 font-body text-base text-ink transition-colors duration-300 focus:border-forest"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="font-body text-sm uppercase tracking-widest text-muted">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                className="rounded-lg border border-muted bg-white px-4 py-3 font-body text-base text-ink transition-colors duration-300 focus:border-forest"
              />
            </div>
            <button
              type="submit"
              className="mt-2 rounded-full bg-forest py-3.5 font-body text-sm uppercase tracking-widest text-paper transition-all duration-300 hover:shadow-[0_8px_30px_rgba(39,93,64,0.2)]"
            >
              Prepare Email
            </button>
            <p role="status" aria-atomic="true" className="text-sm text-muted">
              {draftHref ? "Your draft is ready. Nothing has been sent." : ""}
            </p>
            {draftHref && (
              <div className="rounded-lg border border-forest/40 p-4">
                <a href={draftHref} className="mt-3 inline-block text-sm text-forest underline underline-offset-4">Open Email App</a>
              </div>
            )}
            <p className="break-words text-sm leading-relaxed text-muted">
              No email app configured? Copy {contactEmail} and your message into
              the email service you normally use.
            </p>
          </form>

          <div
            className="flex flex-col gap-4"
          >
            {DETAILS.map((d) => (
              <div
                key={d.label}
                className="rounded-2xl border border-line bg-white p-6 backdrop-blur-md transition-colors duration-500 hover:border-forest/40"
              >
                <span className="font-body text-sm uppercase tracking-widest text-forest">
                  {d.label}
                </span>
                <p className="mt-2 break-words font-display text-lg text-ink">
                  {d.href ? <a href={d.href} className="underline underline-offset-4">{d.value}</a> : d.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
