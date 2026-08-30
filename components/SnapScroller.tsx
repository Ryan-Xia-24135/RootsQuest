"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type TouchEvent,
  type WheelEvent,
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
  const isMoving = useRef(false);
  const touchStartScroll = useRef(0);
  const reduceMotion = useReducedMotion();

  const moveToPage = (page: number, settleCurrentPage = false) => {
    const container = containerRef.current;
    if (!container || isMoving.current) return;

    const nextPage = Math.max(0, Math.min(sections.length - 1, page));
    if (nextPage === currentPage.current && !settleCurrentPage) return;

    currentPage.current = nextPage;
    isMoving.current = true;

    const destination = nextPage * container.clientHeight;
    animate(container.scrollTop, destination, {
      duration: reduceMotion ? 0 : 0.3,
      ease: [0.76, 0, 0.24, 1],
      onUpdate: (position) => {
        container.scrollTop = position;
      },
      onComplete: () => {
        container.scrollTop = destination;
        isMoving.current = false;
      },
    });
  };

  const handleWheel = (event: WheelEvent<HTMLElement>) => {
    const scrollArea = (event.target as Element).closest<HTMLElement>("[data-snap-scroll]");
    if (scrollArea) {
      const canScrollDown = event.deltaY > 0 && scrollArea.scrollTop + scrollArea.clientHeight < scrollArea.scrollHeight - 1;
      const canScrollUp = event.deltaY < 0 && scrollArea.scrollTop > 1;
      if (canScrollDown || canScrollUp) return;
    }

    event.preventDefault();
    if (isMoving.current || Math.abs(event.deltaY) < 0.5) return;
    moveToPage(currentPage.current + (event.deltaY > 0 ? 1 : -1));
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartScroll.current = event.currentTarget.scrollTop;
  };

  const handleTouchMove = (event: TouchEvent<HTMLElement>) => {
    if (isMoving.current) return;
    const movement = event.currentTarget.scrollTop - touchStartScroll.current;
    if (Math.abs(movement) < 2) return;
    moveToPage(currentPage.current + (movement > 0 ? 1 : -1));
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const container = event.currentTarget;
    const pageHeight = container.clientHeight;
    const pageTop = currentPage.current * pageHeight;
    const progress = (container.scrollTop - pageTop) / pageHeight;

    if (progress >= 0.3) moveToPage(currentPage.current + 1);
    else if (progress <= -0.3) moveToPage(currentPage.current - 1);
    else if (Math.abs(container.scrollTop - touchStartScroll.current) > 1) {
      moveToPage(currentPage.current, true);
    }
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
    <main
      ref={containerRef}
      className="home-scroll relative h-svh overflow-y-auto overscroll-none"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
          className="relative z-10 h-svh min-h-svh w-full bg-cover bg-center bg-no-repeat"
          style={section.background ? { backgroundImage: `url('${section.background}')` } : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.35 }}
          key={`${section.background ?? "continuous"}-${index}`}
        >
          <SiteNav />
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
  );
}
