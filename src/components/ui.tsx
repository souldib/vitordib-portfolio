"use client";

import {
  animate,
  motion,
  useInView,
  useScroll,
  useSpring,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-faint">
          <span className="h-px w-8 bg-line-strong" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-ivory sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.7,
      ease: EASE,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

/** Card whose surface picks up a soft light that follows the pointer. */
export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(event) => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        node.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }}
      className={`group/spot relative overflow-hidden rounded-2xl border border-line bg-ink-soft/60 transition-colors duration-500 hover:border-line-strong ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 0%), rgba(91,140,255,0.14), transparent 70%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-px origin-left bg-gradient-to-r from-azure via-cyan to-champagne"
    />
  );
}

export function Aurora() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-1/3 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-azure/18 blur-[130px] animate-float-slow" />
      <div className="absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-cyan/12 blur-[120px] animate-float-slower" />
      <div className="absolute -right-32 top-1/2 h-[30rem] w-[30rem] rounded-full bg-champagne/8 blur-[130px] animate-float-slow" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0%,var(--color-ink)_75%)]" />
    </div>
  );
}

export function GridBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 75%)",
      }}
    />
  );
}
