"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useRef,
} from "react";
import SiteNav from "@/components/SiteNav";

export type SnapSection = {
  background?: string;
  content?: ReactNode;
  id?: string;
};

type SnapScrollerProps = {
  sections: SnapSection[];
  continuousBackground?: string;
};

export default function SnapScroller({ sections, continuousBackground }: SnapScrollerProps) {
  const containerRef = useRef<HTMLElement>(null);
  const currentPage = useRef(0);
  const reduceMotion = useReducedMotion();

  const moveToPage = (page: number) => {
    const container = containerRef.current;
    if (!container) return;

    const nextPage = Math.max(0, Math.min(sections.length - 1, page));
    currentPage.current = nextPage;
    container.scrollTo({
      top: nextPage * container.clientHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || !container.clientHeight) return;
    currentPage.current = Math.max(
      0,
      Math.min(sections.length - 1, Math.round(container.scrollTop / container.clientHeight)),
    );
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (["ArrowDown", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      moveToPage(currentPage.current + 1);
    }

    if (["ArrowUp", "PageUp"].includes(event.key)) {
      event.preventDefault();
      moveToPage(currentPage.current - 1);
    }
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    const control = (event.target as Element).closest<HTMLElement>("[data-snap-to]");
    if (!control) return;

    const destination = Number(control.dataset.snapTo);
    if (!Number.isInteger(destination)) return;

    event.preventDefault();
    moveToPage(destination);
  };

  return (
    <div className="relative h-svh overflow-hidden">
      <div className="absolute inset-x-0 top-0 z-50">
        <SiteNav />
      </div>

      <main
        ref={containerRef}
        className="home-scroll relative h-svh snap-y snap-mandatory overflow-y-auto overscroll-y-contain scroll-smooth"
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        onClick={handleClick}
        tabIndex={0}
      >
        {continuousBackground && (
          <div
            className="pointer-events-none absolute left-0 top-0 w-full bg-cover bg-center bg-no-repeat"
            style={{
              height: `${sections.length * 100}svh`,
              backgroundImage: `url('${continuousBackground}')`,
            }}
          />
        )}

        {sections.map((section, index) => (
          <motion.section
            id={section.id}
            className="relative z-10 h-svh min-h-svh w-full snap-start snap-always bg-cover bg-center bg-no-repeat"
            style={section.background ? { backgroundImage: `url('${section.background}')` } : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.35 }}
            key={`${section.background ?? "continuous"}-${index}`}
          >
            {section.content}
            {index < sections.length - 1 && (
              <motion.button
                type="button"
                className="absolute bottom-[clamp(8px,1.5vh,14px)] left-1/2 z-30 flex size-[clamp(34px,3.2vw,46px)] -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border border-white/55 bg-black/45 text-white shadow-[0_10px_28px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-colors hover:border-white hover:bg-black/65 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
                data-snap-to={index + 1}
                aria-label={`Continue to section ${index + 2}`}
                initial={reduceMotion ? false : { opacity: 0, y: -5 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: [0, 5, 0] }}
                transition={reduceMotion ? undefined : { opacity: { duration: 0.25 }, y: { duration: 1.35, repeat: Infinity, ease: "easeInOut" } }}
              >
                <ChevronDown className="size-[58%]" strokeWidth={1.8} aria-hidden="true" />
              </motion.button>
            )}
          </motion.section>
        ))}
      </main>
    </div>
  );
}
