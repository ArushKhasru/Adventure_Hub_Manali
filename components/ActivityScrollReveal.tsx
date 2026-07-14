"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type ActivityScrollRevealProps = {
  children: ReactNode;
  delay: number;
};

export default function ActivityScrollReveal({
  children,
  delay,
}: ActivityScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.16, once: true }}
      transition={{
        delay,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
