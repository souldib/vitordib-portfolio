"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDownRight, ArrowUpRight, Download, MapPin } from "lucide-react";
import { companies, hero, site, stats } from "@/content/site";
import { Aurora, Counter, GridBackdrop } from "@/components/ui";

const EASE = [0.16, 1, 0.3, 1] as const;

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
                    ? "text-gradient italic pr-2"
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
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ivory px-6 py-3 text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="relative z-10">Start a conversation</span>
                <ArrowUpRight
                  size={16}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                href={site.cv}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm text-ivory transition-all duration-300 hover:border-azure/60 hover:bg-azure/10"
              >
                <Download size={15} />
                Download CV
              </a>
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
                <div key={stat.label} className="bg-ink-soft/80 p-5 backdrop-blur-sm">
                  <div className="font-display text-3xl text-ivory sm:text-4xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-1.5 text-xs leading-snug text-faint">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 border-t border-line py-6 sm:mt-20"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-faint">
              Trusted by teams at
            </span>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {companies.map((company) => (
                <span
                  key={company}
                  className="text-sm text-muted/70 transition-colors duration-300 hover:text-ivory"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.a
          href="#work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-4 inline-flex items-center gap-2 pb-16 font-mono text-[11px] uppercase tracking-[0.28em] text-faint transition-colors hover:text-ivory"
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
