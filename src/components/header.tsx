"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter((node): node is Element => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-ink/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between sm:h-20">
          <a
            href="#top"
            className="group flex items-center gap-2.5 text-sm font-medium tracking-tight text-ivory"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-azure animate-pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-azure" />
            </span>
            <span className="transition-colors group-hover:text-white">{site.name}</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === item.href ? "text-ivory" : "text-muted hover:text-ivory"
                }`}
              >
                {active === item.href ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-line bg-white/[0.04]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${site.email}`}
              className="hidden rounded-full border border-line-strong px-5 py-2 text-sm text-ivory transition-all duration-300 hover:border-azure/60 hover:bg-azure/10 sm:inline-flex"
            >
              Get in touch
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ivory transition-colors hover:border-line-strong md:hidden"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-line bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="shell flex flex-col py-4">
              {nav.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.4 }}
                  className="border-b border-line/60 py-4 font-display text-2xl text-ivory last:border-0"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href={`mailto:${site.email}`}
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full border border-line-strong px-5 py-3 text-center text-sm text-ivory"
              >
                Get in touch
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
