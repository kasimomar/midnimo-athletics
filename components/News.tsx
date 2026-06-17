"use client";

import { motion } from "framer-motion";

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
    <section id="news" className="relative bg-white/[0.03] px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 border-b border-white/10 pb-8"
        >
          <h2 className="font-display text-4xl font-semibold text-paper md:text-6xl">
            News &amp; Updates
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4">
          {ITEMS.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="grid gap-2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors duration-500 hover:border-accent/40 md:grid-cols-[160px_1fr] md:items-start md:gap-8 md:p-8"
            >
              <span className="font-body text-xs uppercase tracking-widest text-clay">
                {item.date}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-paper transition-colors duration-500 group-hover:text-accent md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-paper/60">{item.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
