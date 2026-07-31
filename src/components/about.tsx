"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Gamepad2, MapPin, Music, PawPrint, Plane } from "lucide-react";
import { about, site } from "@/content/site";
import { Reveal, SectionHeading } from "@/components/ui";

const interestIcons = {
  music: Music,
  gaming: Gamepad2,
  travel: Plane,
  animals: PawPrint,
} as const;

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 h-[30rem] w-[38rem] rounded-full bg-champagne/[0.07] blur-[150px]"
      />

      <div className="shell relative grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div ref={ref} className="lg:col-span-5">
          <Reveal>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[1.75rem] border border-line"
              />
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-ink-soft">
                <motion.div style={{ y: imageY }} className="absolute -inset-y-[6%] inset-x-0">
                  <Image
                    src={about.photo}
                    alt={`${site.name}, ${site.role}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority={false}
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  />
                </motion.div>

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-azure/10 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-0"
                />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                  <div>
                    <p className="font-display text-2xl leading-none text-ivory">{site.name}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      {site.tagline}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line-strong bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted backdrop-blur-sm">
                    <MapPin size={11} />
                    GMT-3
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <SectionHeading eyebrow="About" title={about.title} />

          <div className="mt-7 space-y-5">
            {about.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.06 * index}>
                <p className="max-w-xl text-base leading-relaxed text-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap gap-2.5">
              {about.interests.map((interest) => {
                const Icon = interestIcons[interest.icon];
                return (
                  <span
                    key={interest.label}
                    className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.02] px-4 py-2 text-sm text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-ivory"
                  >
                    <Icon
                      size={15}
                      strokeWidth={1.6}
                      className="text-champagne transition-transform duration-300 group-hover:scale-110"
                    />
                    {interest.label}
                  </span>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-10 font-display text-2xl italic text-faint">— Vitor</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
