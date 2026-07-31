import { marqueeStack } from "@/content/site";

export function Marquee() {
  const items = [...marqueeStack, ...marqueeStack];

  return (
    <div className="relative flex overflow-hidden border-y border-line bg-ink-soft/40 py-5">
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
  );
}
