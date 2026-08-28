"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
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
        </motion.section>
      ))}
    </main>
  );
}
