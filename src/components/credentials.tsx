"use client";

import { GraduationCap, Trophy } from "lucide-react";
import { awards, education, languages } from "@/content/site";
import { Reveal, SectionHeading, SpotlightCard } from "@/components/ui";

export function Credentials() {
  return (
    <section id="credentials" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Credentials"
          title="Competitive craft, academic depth."
          lead="Recognition earned against the best in the world, on top of postgraduate work in big data, business administration and engineering."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <SpotlightCard className="h-full p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-champagne">
                  <Trophy size={17} strokeWidth={1.6} />
                </span>
                <h3 className="font-display text-2xl text-ivory">Awards & recognition</h3>
              </div>

              <ul className="mt-7 divide-y divide-line">
                {awards.map((award) => (
                  <li key={award.title} className="flex items-start justify-between gap-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-ivory">{award.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-faint">{award.detail}</p>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-faint">{award.year}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.08}>
            <SpotlightCard className="h-full p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-azure">
                  <GraduationCap size={17} strokeWidth={1.6} />
                </span>
                <h3 className="font-display text-2xl text-ivory">Education</h3>
              </div>

              <ul className="mt-7 divide-y divide-line">
                {education.map((item) => (
                  <li key={`${item.school}-${item.degree}`} className="flex items-start justify-between gap-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-ivory">{item.school}</p>
                      <p className="mt-1 text-xs leading-relaxed text-faint">{item.degree}</p>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-faint">{item.year}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {languages.map((language) => (
              <div key={language.name} className="bg-ink-soft/60 px-7 py-6">
                <p className="font-display text-xl text-ivory">{language.name}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                  {language.level}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
