"use client";

import { motion } from "framer-motion";

interface Project {
  title: string;
  category: string;
  year: string;
}

const PROJECTS: Project[] = [
  { title: "Aurora", category: "Brand Identity", year: "2024" },
  { title: "Monolith", category: "Web Experience", year: "2024" },
  { title: "Driftwood", category: "Editorial", year: "2023" },
  { title: "Halcyon", category: "Product Design", year: "2023" },
  { title: "Foundry", category: "Web Experience", year: "2022" },
  { title: "Vantage", category: "Brand Identity", year: "2022" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Projects() {
  return (
    <section className="relative bg-ink px-6 py-24 md:px-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col gap-4 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between"
        >
          <h2 className="font-display text-4xl font-semibold text-paper md:text-6xl">
            Selected Work
          </h2>
          <p className="max-w-sm text-sm text-paper/60">
            A collection of projects exploring motion, interaction, and
            visual storytelling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transition-colors duration-500 hover:border-accent/40"
            >
              {/* subtle hover glow */}
              <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/0 via-accent/0 to-clay/0 opacity-0 transition-opacity duration-500 group-hover:opacity-20" />

              <div className="relative flex h-full flex-col justify-between gap-10">
                <span className="font-display text-sm tracking-widest text-clay">
                  {project.year}
                </span>

                <div>
                  <h3 className="font-display text-2xl font-semibold text-paper transition-colors duration-500 group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-paper/55">
                    {project.category}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
