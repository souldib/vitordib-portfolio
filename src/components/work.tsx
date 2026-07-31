"use client";

import Image from "next/image";
import { projects } from "@/content/site";
import { Reveal, SectionHeading, SpotlightCard } from "@/components/ui";

export function Work() {
  return (
    <section id="work" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Selected work"
          title="Platforms, not dashboards."
          lead="Four engagements where the deliverable was a governed foundation other teams could build on — each one measured by what changed for the business."
        />

        <div className="mt-16 flex flex-col gap-5">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.05}>
              <SpotlightCard className="p-6 sm:p-9">
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-white/[0.03]">
                        {project.logo ? (
                          <Image
                            src={project.logo}
                            alt={`${project.company} logo`}
                            width={120}
                            height={120}
                            className="h-6 w-auto max-w-[1.75rem] object-contain"
                          />
                        ) : (
                          <span className="font-display text-lg text-muted">
                            {project.company.charAt(0)}
                          </span>
                        )}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-ivory">{project.company}</p>
                        <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                          {project.period} · {String(index + 1).padStart(2, "0")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 flex gap-8">
                      {project.metrics.map((metric) => (
                        <div key={metric.label}>
                          <p className="font-display text-3xl leading-none text-gradient">
                            {metric.value}
                          </p>
                          <p className="mt-2 max-w-[8rem] text-xs leading-snug text-faint">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-8">
                    <h3 className="font-display text-2xl leading-tight text-ivory sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                      {project.summary}
                    </p>

                    <ul className="mt-6 space-y-3">
                      {project.contributions.map((point) => (
                        <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                          <span
                            aria-hidden="true"
                            className="mt-[0.55rem] h-px w-4 shrink-0 bg-azure/60"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint transition-colors duration-300 hover:border-line-strong hover:text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
