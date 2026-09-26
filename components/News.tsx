const ITEMS = [
  {
    date: "Coming Soon",
    title: "Weekend League Registration Now Open",
    body: "Sign up your athlete today and secure a spot on a team for the upcoming season.",
  },
  {
    date: "Coming Soon",
    title: "Iftin Charter After-School Program Update",
    body: "Check back here for schedule updates and highlights from our after-school sessions.",
  },
  {
    date: "Coming Soon",
    title: "Summer Program Details",
    body: "More information about our upcoming summer enrichment program will be posted here.",
  },
];

export default function News() {
  return (
    <section id="news" className="relative bg-sage px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div
          className="mb-16 border-b border-line pb-8"
        >
          <h2 className="font-display text-4xl font-semibold text-ink md:text-6xl">
            News &amp; Updates
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {ITEMS.map((item) => (
            <article
              key={item.title}
              className="grid gap-2 rounded-2xl border border-line bg-white p-6 backdrop-blur-md transition-colors duration-500 hover:border-forest/40 md:grid-cols-[160px_1fr] md:items-start md:gap-8 md:p-8"
            >
              <span className="font-body text-sm uppercase tracking-widest text-forest">
                {item.date}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink transition-colors duration-500 group-hover:text-forest md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
