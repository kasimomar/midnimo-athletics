"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import Overlay from "./Overlay";

import { publicConfig } from "@/lib/public-config";

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

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
    <section ref={containerRef} className="relative h-[200vh] bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {publicConfig.heroVideoUrl ? (
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
          style={{ opacity: veilOpacity }}
          className="pointer-events-none absolute inset-0 bg-ink"
        />

        {/* Parallax title */}
        <Overlay progress={scrollYProgress} />
      </div>
    </section>
  );
}

export type { MotionValue };
