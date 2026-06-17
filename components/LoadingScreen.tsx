"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BALLS = [
  { emoji: "⚽", label: "soccer" },
  { emoji: "🏀", label: "basketball" },
  { emoji: "⚾", label: "baseball" },
  { emoji: "🏈", label: "football" },
];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 bg-ink"
        >
          {/* Balls 2x2 grid */}
          <div className="flex items-end gap-6 md:gap-8">
            {BALLS.map((ball, i) => (
              <div key={ball.label} className="flex flex-col items-center gap-2">
                {/* Ball */}
                <motion.span
                  aria-label={ball.label}
                  className="select-none text-3xl md:text-4xl"
                  animate={{
                    y: [0, -72, 0],
                    scaleX: [1, 0.95, 1.25, 1],
                    scaleY: [1, 1.05, 0.75, 1],
                  }}
                  transition={{
                    duration: 0.65,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: i * 0.13,
                    ease: [0.33, 0, 0.66, 0],
                    times: [0, 0.45, 0.55, 1],
                  }}
                >
                  {ball.emoji}
                </motion.span>

                {/* Ground shadow */}
                <motion.span
                  className="block rounded-full bg-white/20 blur-sm"
                  animate={{
                    width: ["28px", "20px", "36px", "28px"],
                    height: ["6px", "4px", "8px", "6px"],
                    opacity: [0.5, 0.2, 0.7, 0.5],
                  }}
                  transition={{
                    duration: 0.65,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: i * 0.13,
                    times: [0, 0.45, 0.55, 1],
                  }}
                />
              </div>
            ))}
          </div>

          {/* Brand label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-2"
          >
            <p className="font-display text-xl font-semibold tracking-widest text-paper">
              Midnimo <span className="text-accent">Athletics</span>
            </p>
            <p className="font-body text-xs uppercase tracking-[0.35em] text-paper/40">
              Loading…
            </p>
          </motion.div>

          {/* Thin progress bar */}
          <motion.div className="absolute bottom-0 left-0 h-[2px] bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
