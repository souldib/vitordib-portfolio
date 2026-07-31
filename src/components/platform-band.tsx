import Image from "next/image";
import { marqueeStack, platforms } from "@/content/site";

export function PlatformBand() {
  const items = [...marqueeStack, ...marqueeStack];

  return (
    <section className="relative border-y border-line bg-ink-soft/40">
      <div className="shell py-10">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.28em] text-faint">
          Built on the Microsoft data platform
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-20">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="group flex flex-col items-center gap-3 transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                src={platform.logo}
                alt={`${platform.name} logo`}
                width={120}
                height={120}
                className="h-8 w-auto opacity-80 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 sm:h-9"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint transition-colors duration-500 group-hover:text-muted">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative flex overflow-hidden border-t border-line py-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent sm:w-40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent sm:w-40"
        />
        <div className="flex w-max animate-marquee items-center gap-8 pr-8">
          {items.map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-8 whitespace-nowrap">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted/60">
                {item}
              </span>
              <span className="h-1 w-1 rounded-full bg-azure/40" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
