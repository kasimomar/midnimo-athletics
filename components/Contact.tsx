"use client";

import { useRef, useState } from "react";
import { contactEmail, contactEmailHref, createEmailDraft } from "@/lib/contact";

import { inquiryPrograms, inquiryLimits } from "@/lib/inquiry";

const DETAILS = [
  { label: "Email", value: contactEmail, href: contactEmailHref },
  { label: "Weekend Program", value: "Friday–Sunday · Ages 6–13" },
  { label: "After-School Program", value: "Iftin Charter School · Mon–Fri, 4:00–6:00 PM" },
];

export default function Contact({ sendingEnabled = false }: { sendingEnabled?: boolean }) {
  const [draftHref, setDraftHref] = useState<string>();
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const requestId = useRef<string | undefined>(undefined);
  const inFlight = useRef(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return;
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    if (!sendingEnabled) {
      setDraftHref(createEmailDraft(name, email, message));
      setStatus("Your draft is ready. Nothing has been sent.");
      return;
    }
    inFlight.current = true;
    setPending(true);
    setStatus("Sending your inquiry…");
    requestId.current ??= crypto.randomUUID();
    const controller = new AbortController();
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      // Also bound BotID's pre-fetch challenge, which can stall before fetch starts.
      const deadline = new Promise<never>((_, reject) => {
        timeout = setTimeout(() => { controller.abort(); reject(new Error("timeout")); }, 25000);
      });
      const response = await Promise.race([fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ name, email, message, program: data.get("program"), website: data.get("website"), requestId: requestId.current }),
      }), deadline]);
      const result = await Promise.race([response.json(), deadline]);
      if (!response.ok) {
        setStatus(typeof result.message === "string" ? result.message : "We could not confirm sending. Try again or email our team directly.");
        return;
      }
      setStatus("Your inquiry has been submitted to our team. This does not reserve a place in a program.");
      setSubmitted(true);
    } catch {
      setStatus("We could not confirm sending. Try again or email our team directly.");
    } finally {
      clearTimeout(timeout);
      inFlight.current = false;
      setPending(false);
    }
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
            {sendingEnabled
              ? "Send a program inquiry to our team at admin@midnimoathletics.com. Your name, email, and program choice are required; your question is optional. Please do not include diagnoses or medical information."
              : "Questions about programs or joining? Email us directly, or prepare a message below. All fields are required. This website does not send messages; you review and send them from your own email app."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr]">
          <form
            onSubmit={handleSubmit}
            onChange={() => { setDraftHref(undefined); setStatus(""); setSubmitted(false); requestId.current = undefined; }}
            aria-busy={pending}
            className="flex min-w-0 flex-col gap-5 rounded-2xl border border-line bg-white p-8 backdrop-blur-md md:p-10"
          >
            <fieldset disabled={pending} className="flex min-w-0 flex-col gap-5">
              <legend className="sr-only">Your inquiry</legend>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="font-body text-sm uppercase tracking-widest text-muted">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  maxLength={inquiryLimits.name}
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
                  maxLength={inquiryLimits.email}
                  required
                  className="rounded-lg border border-muted bg-white px-4 py-3 font-body text-base text-ink transition-colors duration-300 focus:border-forest"
                />
              </div>
              {sendingEnabled && (
                <>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-program" className="font-body text-sm uppercase tracking-widest text-muted">Program</label>
                    <select id="contact-program" name="program" required defaultValue="" className="min-w-0 max-w-full rounded-lg border border-muted bg-white px-4 py-3 text-base text-ink">
                      <option value="" disabled>Select a program</option>
                      {inquiryPrograms.map(program => <option key={program} value={program}>{program}</option>)}
                    </select>
                  </div>
                  <div hidden aria-hidden="true">
                    <label htmlFor="contact-website">Leave this field empty</label>
                    <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
                  </div>
                </>
              )}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="font-body text-sm uppercase tracking-widest text-muted">
                  {sendingEnabled ? "Message (optional)" : "Message"}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  maxLength={inquiryLimits.message}
                  required={!sendingEnabled}
                  className="rounded-lg border border-muted bg-white px-4 py-3 font-body text-base text-ink transition-colors duration-300 focus:border-forest"
                />
              </div>
              <button
                type="submit"
                disabled={pending || submitted}
                className="mt-2 rounded-full bg-forest py-3.5 font-body text-sm uppercase tracking-widest text-paper transition-all duration-300 hover:shadow-[0_8px_30px_rgba(39,93,64,0.2)]"
              >
                {sendingEnabled ? (pending ? "Sending…" : submitted ? "Inquiry Submitted" : "Send Inquiry") : "Prepare Email"}
              </button>
            </fieldset>
            <p role="status" aria-atomic="true" className="text-sm text-muted">
              {status}
            </p>
            {draftHref && (
              <div className="rounded-lg border border-forest/40 p-4">
                <a href={draftHref} className="mt-3 inline-block text-sm text-forest underline underline-offset-4">Open Email App</a>
              </div>
            )}
            <p className="break-words text-sm leading-relaxed text-muted">
              {sendingEnabled
                ? "Your contact details and question are sent through Resend to our team’s Google Workspace inbox to respond to your inquiry. If the form is unavailable, email "
                : "No email app configured? Copy "}
              {contactEmail}{sendingEnabled ? " directly." : " and your message into the email service you normally use."}
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
