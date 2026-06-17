"use client";

import { motion } from "framer-motion";

interface Program {
  letter: string;
  title: string;
  meta: string;
  description: string;
  bullets: string[];
  price?: string;
  note?: string;
  cta?: { label: string; href: string };
}

const PROGRAMS: Program[] = [
  {
    letter: "A",
    title: "Weekend Youth Soccer League",
    meta: "Friday – Sunday / Weekly / Ages 6–13",
    description:
      "Our flagship weekend program gives young players of every age group a place to train, compete, and grow. Athletes are placed on teams organized by age range, with dedicated coaching focused on fundamentals, teamwork, and fun.",
    bullets: [
      "Multiple teams across all age ranges, 6–13",
      "Skill-building drills, scrimmages, and friendly matches",
      "Experienced coaching staff focused on growth and sportsmanship",
      "Sessions held Friday through Sunday, every week",
    ],
    price: "$70 / month per athlete",
    cta: { label: "Sign Up & Pay Monthly", href: "#signup" },
  },
  {
    letter: "B",
    title: "Iftin Charter School — After-School Program",
    meta: "Monday – Friday / 4:00–6:00 PM",
    description:
      "In partnership with Iftin Charter School, Midnimo Athletics runs a five-day-a-week after-school program focused on holistic athletic development. Students get exposure to a variety of sports, building physical literacy, teamwork, discipline, and confidence.",
    bullets: [
      "Multi-sport development for all skill levels",
      "Daily structured activities, Monday through Friday",
      "Focus on fitness, teamwork, leadership, and sportsmanship",
      "Offered in partnership with Iftin Charter School",
    ],
  },
  {
    letter: "C",
    title: "Summer Program",
    meta: "Iftin Charter School / Full-Day",
    description:
      "During the summer, this program expands into a full-day enrichment experience — combining sports, skill-building, and team activities to keep students active and engaged during the break.",
    bullets: [],
    note: "Enrollment for the Iftin Charter School programs is arranged directly through the school as part of our partnership agreement.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Programs() {
  return (
    <section id="programs" className="relative bg-ink px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between"
        >
          <h2 className="font-display text-4xl font-semibold text-paper md:text-6xl">
            Programs
          </h2>
          <p className="max-w-sm text-sm text-paper/60">
            Training, development, and community — on the weekend and after school.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {PROGRAMS.map((program, i) => (
            <motion.div
              key={program.letter}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-colors duration-500 hover:border-accent/40 md:p-12"
            >
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/0 via-accent/0 to-clay/0 opacity-0 transition-opacity duration-500 group-hover:opacity-20" />

              <div className="relative grid gap-6 md:grid-cols-[80px_1fr]">
                <span className="font-display text-5xl font-semibold text-clay/70">
                  {program.letter}
                </span>

                <div>
                  <h3 className="font-display text-2xl font-semibold text-paper transition-colors duration-500 group-hover:text-accent md:text-3xl">
                    {program.title}
                  </h3>
                  <p className="mt-2 font-body text-sm uppercase tracking-widest text-clay">
                    {program.meta}
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper/70 md:text-base">
                    {program.description}
                  </p>

                  {program.bullets.length > 0 && (
                    <ul className="mt-5 flex flex-col gap-2">
                      {program.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm text-paper/60">
                          <span className="text-accent">—</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {program.note && (
                    <p className="mt-5 text-sm italic text-paper/50">{program.note}</p>
                  )}

                  {(program.price || program.cta) && (
                    <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
                      {program.price && (
                        <span className="font-display text-2xl font-semibold text-paper">
                          {program.price}
                        </span>
                      )}
                      {program.cta && (
                        <a
                          href={program.cta.href}
                          className="rounded-full border border-accent px-6 py-2.5 font-body text-sm uppercase tracking-widest text-accent transition-all duration-300 hover:bg-accent hover:text-ink hover:shadow-[0_0_24px_rgba(111,161,94,0.35)]"
                        >
                          {program.cta.label}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
