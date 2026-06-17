"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import Overlay from "./Overlay";

const CLIP =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3F9mthO95UxkdumE6T8rY5O8i22/hf_20260617_012821_70588436-37bf-4bf9-bebf-fdd9f5c6b32b.mp4";

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
        <video
          src={CLIP}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

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
