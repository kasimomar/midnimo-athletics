"use client";

import { useRef, useState } from "react";
import { useScroll, MotionValue } from "framer-motion";
import Overlay from "./Overlay";

import { publicConfig } from "@/lib/public-config";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [videoHidden, setVideoHidden] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-ink motion-reduce:h-auto">
      <div className="sticky top-0 min-h-screen w-full overflow-hidden motion-reduce:relative">
        {publicConfig.heroVideoUrl && !reducedMotion && !videoHidden ? (
        <video
          aria-hidden="true"
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

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink/90" />

        {/* Parallax title */}
        <Overlay progress={scrollYProgress} reducedMotion={reducedMotion} />
        {publicConfig.heroVideoUrl && !reducedMotion && (
          <button type="button" onClick={() => setVideoHidden(hidden => !hidden)}
            className="absolute bottom-3 left-6 z-20 min-h-11 rounded-full border border-paper/50 bg-ink px-4 py-2 text-sm text-paper">
            {videoHidden ? "Show background video" : "Hide background video"}
          </button>
        )}
      </div>
    </section>
  );
}

export type { MotionValue };
