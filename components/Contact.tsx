"use client";

import { motion } from "framer-motion";
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
    <section id="contact" className="relative bg-ink px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 border-b border-white/10 pb-8"
        >
          <h2 className="font-display text-4xl font-semibold text-paper md:text-6xl">
            Talk With Our Team
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper/70">
            Questions about programs or joining? Email us directly, or prepare a
            message below. This website does not send messages; you review and send
            them from your own email app.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr]">
          <motion.form
            onSubmit={handleSubmit}
            onChange={() => setDraftHref(undefined)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-w-0 flex-col gap-5 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-10"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className="font-body text-xs uppercase tracking-widest text-paper/60">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                required
                className="rounded-lg border border-white/15 bg-ink px-4 py-3 font-body text-sm text-paper outline-none transition-colors duration-300 focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className="font-body text-xs uppercase tracking-widest text-paper/60">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                required
                className="rounded-lg border border-white/15 bg-ink px-4 py-3 font-body text-sm text-paper outline-none transition-colors duration-300 focus:border-accent"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="font-body text-xs uppercase tracking-widest text-paper/60">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                className="rounded-lg border border-white/15 bg-ink px-4 py-3 font-body text-sm text-paper outline-none transition-colors duration-300 focus:border-accent"
              />
            </div>
            <button
              type="submit"
              className="mt-2 rounded-full bg-accent py-3.5 font-body text-sm uppercase tracking-widest text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(111,161,94,0.35)]"
            >
              Prepare Email
            </button>
            {draftHref && (
              <div className="rounded-lg border border-accent/40 p-4">
                <p role="status" className="text-sm text-paper/80">Your draft is ready. Nothing has been sent.</p>
                <a href={draftHref} className="mt-3 inline-block text-sm text-accent underline underline-offset-4">Open Email App</a>
              </div>
            )}
            <p className="break-words text-xs leading-relaxed text-paper/60">
              No email app configured? Copy {contactEmail} and your message into
              the email service you normally use.
            </p>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            {DETAILS.map((d) => (
              <div
                key={d.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors duration-500 hover:border-accent/40"
              >
                <span className="font-body text-xs uppercase tracking-widest text-clay">
                  {d.label}
                </span>
                <p className="mt-2 break-words font-display text-lg text-paper">
                  {d.href ? <a href={d.href} className="underline underline-offset-4">{d.value}</a> : d.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
