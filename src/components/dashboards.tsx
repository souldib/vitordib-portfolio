"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ArrowUpRight, BarChart3, Loader2 } from "lucide-react";
import { dashboards } from "@/content/site";
import { Reveal, SectionHeading } from "@/components/ui";

export function Dashboards() {
  const [activeId, setActiveId] = useState(dashboards[0].id);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const frameRef = useRef<HTMLDivElement>(null);

  // Power BI embeds are heavy, so nothing loads until the frame is actually near the viewport.
  const shouldMount = useInView(frameRef, { once: true, margin: "200px" });
  const active = dashboards.find((item) => item.id === activeId) ?? dashboards[0];

  return (
    <section id="dashboards" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-[32rem] w-[64rem] -translate-x-1/2 rounded-full bg-cyan/[0.06] blur-[150px]"
      />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Live dashboards"
          title="Reports you can click through."
          lead="Published straight from Power BI and fully interactive — filter, drill down and cross-highlight exactly as the business users do."
        />

        <Reveal className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {dashboards.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  aria-pressed={item.id === activeId}
                  className={`relative rounded-full px-5 py-2 text-sm transition-colors ${
                    item.id === activeId ? "text-ink" : "text-muted hover:text-ivory"
                  }`}
                >
                  {item.id === activeId ? (
                    <motion.span
                      layoutId="dashboard-pill"
                      className="absolute inset-0 rounded-full bg-ivory"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : (
                    <span className="absolute inset-0 rounded-full border border-line" />
                  )}
                  <span className="relative font-mono text-xs tracking-[0.14em]">
                    {item.title ?? `Report ${item.label}`}
                  </span>
                </button>
              ))}
            </div>

            <a
              href={active.url}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ivory"
            >
              Open full screen
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-6">
          <div
            ref={frameRef}
            className="overflow-hidden rounded-2xl border border-line bg-ink-soft/70 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
              </div>
              <div className="flex flex-1 items-center justify-center">
                <span className="inline-flex max-w-full items-center gap-2 truncate rounded-full border border-line bg-ink/60 px-3 py-1 font-mono text-[10px] text-faint">
                  <BarChart3 size={11} className="shrink-0 text-champagne" />
                  app.powerbi.com — {active.title ?? `report ${active.label}`}
                </span>
              </div>
              <div className="w-12" />
            </div>

            <div className="relative aspect-[16/10] w-full bg-ink sm:aspect-[16/9]">
              <AnimatePresence mode="wait">
                {!loaded[active.id] ? (
                  <motion.div
                    key={`skeleton-${active.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-ink"
                  >
                    <Loader2 size={20} className="animate-spin text-faint" />
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                      Loading report
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {shouldMount ? (
                <iframe
                  key={active.id}
                  title={active.title ?? `Power BI report ${active.label}`}
                  src={active.url}
                  loading="lazy"
                  allowFullScreen
                  onLoad={() =>
                    setLoaded((previous) => ({ ...previous, [active.id]: true }))
                  }
                  className="absolute inset-0 h-full w-full border-0"
                />
              ) : null}
            </div>
          </div>
        </Reveal>

        {active.description ? (
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted">
              {active.description}
            </p>
          </Reveal>
        ) : null}

        <Reveal delay={0.16}>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            Best viewed on a larger screen · Published to web from Power BI
          </p>
        </Reveal>
      </div>
    </section>
  );
}
