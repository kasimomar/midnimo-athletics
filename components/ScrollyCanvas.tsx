"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import Overlay from "./Overlay";

import { publicConfig } from "@/lib/public-config";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Subtle dark veil — softens video while title is readable, clears as you scroll
  const veilOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.80],
    [0.45, 0.45, 0]
  );

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-ink motion-reduce:h-auto">
      <div className="sticky top-0 min-h-screen w-full overflow-hidden motion-reduce:relative">
        {publicConfig.heroVideoUrl && !reducedMotion ? (
        <video
          src={publicConfig.heroVideoUrl}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-ink via-accent/20 to-clay/20" />
        )}

        {/* Dark veil */}
        <motion.div
          style={{ opacity: reducedMotion ? 0.45 : veilOpacity }}
          className="pointer-events-none absolute inset-0 bg-ink"
        />

        {/* Parallax title */}
        <Overlay progress={scrollYProgress} reducedMotion={reducedMotion} />
      </div>
    </section>
  );
}

export type { MotionValue };
