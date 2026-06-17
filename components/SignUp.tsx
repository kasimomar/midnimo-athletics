"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_4gM7sKgDT7RL7dk1KRdby00";
const SHEET_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzG5trxDt6ZEiQxp8mySh6k9O2-Im6q4Vw5mvmqeA9fSA1KZWukLfE8-FHW76lO4Glh/exec";

const AGES = ["6", "7", "8", "9", "10", "11", "12", "13"];

export default function SignUp() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      await fetch(SHEET_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // Sheet logging is best-effort; continue to payment regardless.
    }

    window.location.href = STRIPE_PAYMENT_LINK;
  }

  return (
    <section id="signup" className="relative bg-white/[0.03] px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 border-b border-white/10 pb-8"
        >
          <h2 className="font-display text-4xl font-semibold text-paper md:text-6xl">
            Register &amp; Pay
          </h2>
          <p className="mt-4 max-w-xl text-sm text-paper/60 md:text-base">
            Sign your athlete up for the Weekend Youth Soccer League and manage
            your $70/month membership securely online.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-10"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Parent / Guardian Name" name="parentName" type="text" required />
              <Field label="Email Address" name="email" type="email" required />
              <Field label="Phone Number" name="phone" type="tel" required />
              <Field label="Athlete Full Name" name="athleteName" type="text" required />
              <div className="flex flex-col gap-2">
                <label className="font-body text-xs uppercase tracking-widest text-paper/60">
                  Athlete Age
                </label>
                <select
                  name="age"
                  required
                  defaultValue=""
                  className="rounded-lg border border-white/15 bg-ink px-4 py-3 font-body text-sm text-paper outline-none transition-colors duration-300 focus:border-accent"
                >
                  <option value="" disabled>
                    Select age
                  </option>
                  {AGES.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
              <Field label="Emergency Contact" name="emergencyContact" type="text" required />
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm text-paper/60">
              <input type="checkbox" required className="mt-1 accent-accent" />
              <span>
                I agree to the program&apos;s terms, code of conduct, and monthly
                billing of $70/athlete.
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 w-full rounded-full bg-accent py-3.5 font-body text-sm uppercase tracking-widest text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(111,161,94,0.35)] disabled:opacity-60"
            >
              {submitting ? "Redirecting…" : "Continue to Payment"}
            </button>
            <p className="mt-4 text-xs text-paper/45">
              After submitting, you&apos;ll be directed to our secure payment page
              to set up your $70/month subscription.
            </p>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md md:p-10"
          >
            <div>
              <span className="font-display text-5xl font-semibold text-paper">$70</span>
              <span className="ml-2 font-body text-sm uppercase tracking-widest text-paper/50">
                / month
              </span>
            </div>
            <ul className="flex flex-col gap-3 text-sm text-paper/60">
              {[
                "Billed monthly — cancel anytime",
                "Covers all weekend sessions, Friday through Sunday",
                "Team placement by age group",
                "Secure payments processed by Stripe",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-clay">—</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={STRIPE_PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-clay py-3.5 text-center font-body text-sm uppercase tracking-widest text-clay transition-all duration-300 hover:bg-clay hover:text-ink hover:shadow-[0_8px_30px_rgba(194,136,79,0.35)]"
            >
              Pay with Stripe
            </a>
            <p className="text-xs text-paper/45">
              Have questions about billing or need a payment plan?{" "}
              <a href="#contact" className="text-accent underline-offset-4 hover:underline">
                Contact us
              </a>{" "}
              directly.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-body text-xs uppercase tracking-widest text-paper/60">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="rounded-lg border border-white/15 bg-ink px-4 py-3 font-body text-sm text-paper outline-none transition-colors duration-300 focus:border-accent"
      />
    </div>
  );
}
