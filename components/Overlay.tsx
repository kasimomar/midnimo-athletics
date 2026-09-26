"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  /** 0 -> 1 scroll progress through the hero track */
  progress: MotionValue<number>;
  reducedMotion: boolean;
}

/**
 * Parallax title that sits above the canvas (z-10).
 *
 * Horizontal position keyframes:
 *  - 0%   scroll -> centered
 *  - 50%  scroll -> fully swiped off-screen to the left
 *  - 100% scroll -> stays off-screen, hidden
 */
export default function Overlay({ progress, reducedMotion }: OverlayProps) {
  const x = useTransform(
    progress,
    [0, 0.5],
    ["0%", "-220%"]
  );

  const opacity = useTransform(
    progress,
    [0, 0.3, 0.5],
    [1, 1, 0]
  );

  const scale = useTransform(progress, [0, 0.5], [1, 1.08]);

  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-24 pt-28 text-center">
      <p
        className="mb-5 font-body text-xs uppercase tracking-[0.2em] text-clay md:text-sm"
      >
        Midnimo Athletics · A nonprofit for youth
      </p>

      <motion.h1
        style={reducedMotion ? { x: 0, opacity: 1, scale: 1 } : { x, opacity, scale }}
        className="max-w-5xl font-display text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[1.05] tracking-tight text-paper"
      >
        A place to play,<br />
        move, and <span className="text-accent">belong.</span>
      </motion.h1>

      <p
        className="mt-6 max-w-2xl font-body text-base leading-relaxed text-paper/80 md:text-lg"
      >
        We bring young people together through sports, movement, and community.
        All youth are welcome to explore, build confidence, and connect with others.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a href="#programs" className="rounded-full bg-accent px-6 py-3 font-body text-sm font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper">
          Explore Programs
        </a>
        <a href="#contact" className="rounded-full border border-paper/50 px-6 py-3 font-body text-sm font-medium text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper">
          Talk With Our Team
        </a>
      </div>
    </div>
  );
}
