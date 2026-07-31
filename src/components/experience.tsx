"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { experience } from "@/content/site";
import { Reveal, SectionHeading } from "@/components/ui";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Experience"
          title="A decade of turning data into leverage."
          lead="From analyst to tech lead to Microsoft contractor — the through-line is always the same: make the data trustworthy, then make it useful."
        />

        <div ref={ref} className="relative mt-16 pl-8 sm:pl-12">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-line sm:left-1" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute inset-y-0 left-0 w-px origin-top bg-gradient-to-b from-azure via-cyan to-transparent sm:left-1"
          />

          <div className="flex flex-col gap-12 sm:gap-14">
            {experience.map((role, index) => (
              <Reveal key={`${role.company}-${role.period}`} delay={index * 0.04}>
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-8 top-2 h-2 w-2 rounded-full sm:-left-[2.85rem] ${
                      role.current ? "bg-azure" : "bg-line-strong"
                    }`}
                  >
                    {role.current ? (
                      <span className="absolute inset-0 rounded-full bg-azure animate-pulse-ring" />
                    ) : null}
                  </span>

                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="font-display text-2xl text-ivory sm:text-[1.75rem]">
                      {role.title}
                    </h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                      {role.period}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-medium text-azure">{role.company}</p>

                  <ul className="mt-4 space-y-2.5">
                    {role.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55rem] h-px w-3 shrink-0 bg-line-strong"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
