"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const words =
  "I work as an AI-augmented engineer — orchestrating coding agents inside the editor to compress delivery, while the architecture, governance and review stay unmistakably human.".split(
    " ",
  );

export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });

  return (
    <section className="relative py-24 sm:py-32">
      <div ref={ref} className="shell">
        <p className="max-w-4xl font-display text-[clamp(1.7rem,4.2vw,3.2rem)] leading-[1.18] tracking-[-0.02em]">
          {words.map((word, index) => (
            <Word
              key={`${word}-${index}`}
              progress={scrollYProgress}
              range={[index / words.length, (index + 1.4) / words.length]}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);

  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block text-ivory">
      {children}
    </motion.span>
  );
}
