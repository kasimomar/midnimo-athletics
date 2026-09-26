const PILLARS = [
  {
    num: "01",
    title: "Movement & Play",
    body: "Opportunities to explore sports, practice movement skills, and enjoy being active.",
  },
  {
    num: "02",
    title: "Confidence & Growth",
    body: "Encouraging young people to try, learn, and build confidence through participation.",
  },
  {
    num: "03",
    title: "Community & Belonging",
    body: "Bringing youth with different abilities and experiences together through sport.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-ink px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div
          className="mb-16 border-b border-white/10 pb-8"
        >
          <h2 className="font-display text-4xl font-semibold text-paper md:text-6xl">
            Our Mission
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div
            className="flex flex-col gap-5 font-body text-base leading-relaxed text-paper/70 md:text-lg"
          >
            <p>
              Midnimo Athletics is a nonprofit organization. Our mission is to
              create a safe, welcoming place for all young people to play sports,
              explore movement, build confidence, and find community.
            </p>
            <p>
              Youth with autism are already part of our programs, and welcoming
              them is part of our team&apos;s everyday experience. We welcome youth
              with different abilities and encourage families to speak with us
              about their child&apos;s interests and participation needs.
            </p>
            <p>
              Through weekend soccer and school-based programs, we bring young
              people together to practice skills, share experiences, and enjoy
              being active with others.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors duration-500 hover:border-accent/40"
              >
                <span className="font-display text-sm tracking-widest text-clay">
                  {pillar.num}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-paper">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-paper/80">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 grid gap-6 border-t border-white/10 pt-10 md:grid-cols-[1fr_2fr]">
          <h3 className="font-display text-2xl font-semibold text-paper">The people behind Midnimo</h3>
          <div>
            <p className="font-display text-2xl text-paper">Coach Osman</p>
            <p className="mt-2 text-base font-medium text-accent">Head Coach &amp; CEO</p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper/80">
              Coach Osman leads Midnimo Athletics as its head coach and CEO.
              He has spent more than 20 years working with underrepresented and
              underprivileged youth in the San Diego community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
