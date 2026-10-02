export default function News() {
  return (
    <section id="news" className="relative bg-sage px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 border-b border-line pb-8">
          <h2 className="font-display text-4xl font-semibold text-ink md:text-6xl">
            News &amp; Updates
          </h2>
        </div>

        <div className="grid gap-2 rounded-2xl border border-line bg-white p-6 md:grid-cols-[160px_1fr] md:items-start md:gap-8 md:p-8">
          <span className="font-body text-sm uppercase tracking-widest text-forest">
            Stay connected
          </span>
          <div>
            <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">
              Looking for program updates?
            </h3>
            <p className="mt-2 text-sm text-muted">
              There are no announcements posted here right now. Contact our team
              for current program information, schedules, and availability.
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex min-h-11 items-center font-body text-sm font-semibold text-forest underline underline-offset-4"
            >
              Ask about our programs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
