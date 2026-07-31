"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ArrowUpRight, Download } from "lucide-react";
import { site } from "@/content/site";
import { Aurora, Magnetic, Reveal } from "@/components/ui";

const links = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "LinkedIn", value: "in/vitor-dib", href: site.linkedin },
  { label: "GitHub", value: "@souldib", href: site.github },
  { label: "Phone", value: site.phone, href: `tel:${site.phoneHref}` },
];

function LocalTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Sao_Paulo",
      }).format(new Date());

    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);

  return <span className="tabular-nums">{time || "--:--"} local</span>;
}

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden pt-24 sm:pt-32">
      <Aurora />

      <div className="shell relative">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-faint">
            <span className="h-px w-8 bg-line-strong" />
            Contact
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] tracking-[-0.03em] text-ivory">
            Let&rsquo;s build something{" "}
            <span className="text-gradient text-gradient-animated italic">worth trusting.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Open to senior data platform engagements — Microsoft Fabric architecture, analytics
            engineering and BI leadership, fully remote across time zones.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-3.5 text-sm font-medium text-ink"
              >
                {site.email}
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Magnetic>
            <Magnetic strength={0.16}>
              <a
                href={site.cv}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-sm text-ivory transition-colors duration-300 hover:border-azure/60 hover:bg-azure/10"
              >
                <Download size={15} />
                Download CV
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="group bg-ink-soft/60 px-6 py-6 transition-colors duration-300 hover:bg-ink-raised"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                  {link.label}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-ivory">
                  <span className="truncate">{link.value}</span>
                  <ArrowUpRight
                    size={14}
                    className="shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-azure"
                  />
                </p>
              </a>
            ))}
          </div>
        </Reveal>

        <footer className="mt-20 flex flex-col gap-4 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            © {new Date().getFullYear()} {site.name} · {site.location} · <LocalTime />
          </p>
          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
              Built with Next.js · Deployed on Vercel
            </span>
            <a
              href="#top"
              aria-label="Back to top"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-faint transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:text-ivory"
            >
              <ArrowUp size={15} />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
