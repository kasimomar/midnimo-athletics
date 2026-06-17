"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  /** 0 -> 1 scroll progress through the parent's 500vh track */
  progress: MotionValue<number>;
}

/**
 * Parallax title that sits above the canvas (z-10).
 *
 * Horizontal position keyframes:
 *  - 0%   scroll -> centered
 *  - 50%  scroll -> fully swiped off-screen to the left
 *  - 100% scroll -> stays off-screen, hidden
 */
export default function Overlay({ progress }: OverlayProps) {
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

  const subtitleOpacity = useTransform(
    progress,
    [0, 0.05, 0.2, 0.3],
    [0, 1, 1, 0]
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
      <motion.p
        style={{ opacity: subtitleOpacity }}
        className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-clay"
      >
        Coaching, character &amp; community
      </motion.p>

      <motion.h1
        style={{ x, opacity, scale }}
        className="font-display text-[14vw] font-semibold leading-none tracking-tight text-paper md:text-[9vw]"
      >
        Midnimo<br className="md:hidden" /> <span className="text-accent">Athletics</span>
      </motion.h1>

      <motion.p
        style={{ opacity: subtitleOpacity }}
        className="mt-6 font-body text-sm uppercase tracking-[0.25em] text-paper/60"
      >
        Est. Youth Athletic Development
      </motion.p>
    </div>
  );
}
