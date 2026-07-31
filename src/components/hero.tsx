"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { ArrowDownRight, ArrowUpRight, Download, MapPin } from "lucide-react";
import { hero, site, stats, trustedBy } from "@/content/site";
import { Aurora, Counter, GridBackdrop, Magnetic } from "@/components/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

const logoSizes: Record<(typeof trustedBy)[number]["size"], string> = {
  lockup: "h-12 sm:h-14",
  stacked: "h-11 sm:h-12",
  square: "h-8 sm:h-9",
  wordmark: "h-6 sm:h-7",
};

function StatValue({ value }: { value: string }) {
  const numeric = /^(\d+)(.*)$/.exec(value);
  if (numeric) {
    return <Counter value={Number(numeric[1])} suffix={numeric[2]} />;
  }
  return <span className="italic">{value}</span>;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden pt-32 sm:pt-40">
      <Aurora />
      <GridBackdrop />

      <motion.div style={{ y, opacity }} className="shell relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-xs text-muted backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulse-ring" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          {hero.availability}
        </motion.div>

        <h1 className="mt-8 font-display text-[clamp(2.85rem,9vw,7.5rem)] leading-[0.94] tracking-[-0.03em]">
          {hero.headline.map((line, index) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1.05, delay: 0.12 * index + 0.15, ease: EASE }}
                className={`block ${
                  index === hero.headline.length - 1
                    ? "text-gradient text-gradient-animated italic pr-2"
                    : "text-ivory"
                }`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.55, ease: EASE }}
            className="lg:col-span-7"
          >
            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {hero.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href="#contact"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ivory px-6 py-3 text-sm font-medium text-ink"
                >
                  <span className="relative z-10">Start a conversation</span>
                  <ArrowUpRight
                    size={16}
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </Magnetic>
              <Magnetic strength={0.16}>
                <a
                  href={site.cv}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm text-ivory transition-colors duration-300 hover:border-azure/60 hover:bg-azure/10"
                >
                  <Download size={15} />
                  Download CV
                </a>
              </Magnetic>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              <span className="inline-flex items-center gap-2">
                <MapPin size={13} />
                {site.location}
              </span>
              <span>{site.timezone}</span>
              <span>English C1 · Portuguese · Spanish</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: EASE }}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group bg-ink-soft/80 p-5 backdrop-blur-sm transition-colors duration-500 hover:bg-ink-raised/80"
                >
                  <div className="font-display text-3xl text-ivory sm:text-[2.1rem]">
                    <StatValue value={stat.value} />
                  </div>
                  <p className="mt-1.5 text-xs leading-snug text-faint transition-colors duration-500 group-hover:text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 border-t border-line pt-10 sm:mt-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.95 }}
            className="text-center font-mono text-[11px] uppercase tracking-[0.32em] text-faint"
          >
            Trusted by teams at
          </motion.p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-12 gap-y-9 sm:gap-x-16 lg:gap-x-20">
            {trustedBy.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 1.05 + index * 0.09, ease: EASE }}
                className="group"
                title={company.name}
              >
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  width={240}
                  height={120}
                  className={`${logoSizes[company.size]} w-auto opacity-70 transition-all duration-500 group-hover:-translate-y-1 group-hover:opacity-100`}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.a
          href="#work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-14 inline-flex items-center gap-2 pb-16 font-mono text-[11px] uppercase tracking-[0.28em] text-faint transition-colors hover:text-ivory"
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ArrowDownRight size={14} />
          </motion.span>
          Selected work
        </motion.a>
      </motion.div>
    </section>
  );
}
