interface Program {
  letter: string;
  title: string;
  meta: string;
  description: string;
  bullets: string[];
  note?: string;
  cta?: { label: string; href: string };
}

const PROGRAMS: Program[] = [
  {
    letter: "A",
    title: "Community Weekend Soccer",
    meta: "Friday – Sunday / Weekly / Ages 6–13",
    description:
      "Our weekend soccer program brings young people together to play, practice movement skills, and build connections. Age-group teams give participants opportunities to learn soccer fundamentals, enjoy teamwork, and grow in confidence.",
    bullets: [
      "Multiple teams across all age ranges, 6–13",
      "Skill-building drills, scrimmages, and friendly matches",
      "Coaching focused on participation, growth, and sportsmanship",
      "Sessions held Friday through Sunday, every week",
    ],
    cta: { label: "Ask About Weekend Soccer", href: "#signup" },
  },
  {
    letter: "B",
    title: "Iftin Charter School — After-School Program",
    meta: "Monday – Friday / 4:00–6:00 PM",
    description:
      "Our after-school program at Iftin Charter School gives students opportunities to explore sports and movement together. Activities focus on developing skills, enjoying teamwork, and building confidence through participation.",
    bullets: [
      "Multi-sport development for all skill levels",
      "Daily structured activities, Monday through Friday",
      "Opportunities to practice teamwork and sportsmanship",
      "Offered in partnership with Iftin Charter School",
    ],
  },
  {
    letter: "C",
    title: "Summer Program",
    meta: "Iftin Charter School / Full-Day",
    description:
      "Our summer program at Iftin Charter School combines sports, movement, and group activities in a full-day setting. It gives students opportunities to stay active, explore skills, and connect with others during the break.",
    bullets: [],
    note: "Enrollment for the Iftin Charter School programs is arranged directly through the school as part of our partnership agreement.",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="relative bg-ink px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div
          className="mb-16 flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between"
        >
          <h2 className="font-display text-4xl font-semibold text-paper md:text-6xl">
            Community Programs
          </h2>
          <p className="max-w-sm text-sm text-paper/80">
            Sports and movement that bring young people together — on the weekend and after school.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {PROGRAMS.map((program) => (
            <div
              key={program.letter}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-colors duration-500 hover:border-accent/40 md:p-12"
            >
              <div aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/0 via-accent/0 to-clay/0 opacity-0 transition-opacity duration-500 group-hover:opacity-20" />

              <div className="relative grid gap-6 md:grid-cols-[80px_1fr]">
                <span className="font-display text-5xl font-semibold text-clay">
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
                        <li key={b} className="flex gap-3 text-sm text-paper/80">
                          <span className="text-accent">—</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  {program.note && (
                    <p className="mt-5 text-sm italic text-paper/70">{program.note}</p>
                  )}

                  {program.cta && (
                    <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
                        <a
                          href={program.cta.href}
                          className="rounded-full border border-accent px-6 py-2.5 font-body text-sm uppercase tracking-widest text-accent transition-all duration-300 hover:bg-accent hover:text-ink hover:shadow-[0_0_24px_rgba(111,161,94,0.35)]"
                        >
                          {program.cta.label}
                        </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
