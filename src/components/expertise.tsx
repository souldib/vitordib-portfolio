"use client";

import { BarChart3, Database, Sparkles, Workflow } from "lucide-react";
import { pillars } from "@/content/site";
import { Reveal, SectionHeading, SpotlightCard } from "@/components/ui";

const icons = {
  fabric: Database,
  ai: Sparkles,
  engineering: Workflow,
  analytics: BarChart3,
} as const;

export function Expertise() {
  return (
    <section id="expertise" className="relative scroll-mt-24 py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-azure/[0.07] blur-[140px]"
      />
      <div className="shell relative">
        <SectionHeading
          eyebrow="Expertise"
          title="Deep in the stack, fluent with the business."
          lead="Seven years across the Microsoft data ecosystem, now combined with agentic development to ship platform work at a pace that used to require a team."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {pillars.map((pillar, index) => {
            const Icon = icons[pillar.id as keyof typeof icons];
            return (
              <Reveal key={pillar.id} delay={index * 0.06}>
                <SpotlightCard className="h-full p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-azure">
                      <Icon size={19} strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-[11px] text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl text-ivory">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{pillar.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {pillar.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-line bg-white/[0.02] px-2.5 py-1 text-[11px] text-faint transition-colors duration-300 hover:border-line-strong hover:text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
