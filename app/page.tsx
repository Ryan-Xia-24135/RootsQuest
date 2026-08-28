"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
import { type KeyboardEvent, type TouchEvent, type WheelEvent, useRef } from "react";

const backgrounds = [
  "/assets/home-01.png",
  "/assets/home-02.png",
  "/assets/home-03.png",
  "/assets/home-04.png",
  "/assets/home-05.png",
];

export default function HomePage() {
  const containerRef = useRef<HTMLElement>(null);
  const currentPage = useRef(0);
  const isMoving = useRef(false);
  const touchStartScroll = useRef(0);
  const reduceMotion = useReducedMotion();

  const moveToPage = (page: number, settleCurrentPage = false) => {
    const container = containerRef.current;

    if (!container || isMoving.current) return;

    const nextPage = Math.max(0, Math.min(backgrounds.length - 1, page));
    if (nextPage === currentPage.current && !settleCurrentPage) return;

    currentPage.current = nextPage;
    isMoving.current = true;

    const destination = nextPage * container.clientHeight;
    animate(container.scrollTop, destination, {
      duration: reduceMotion ? 0 : 1.1,
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
    const container = containerRef.current;
    if (!container || isMoving.current || Math.abs(event.deltaY) < 0.5) return;

    const pageHeight = container.clientHeight;
    const pageTop = currentPage.current * pageHeight;
    const previousTop = Math.max(0, pageTop - pageHeight);
    const nextTop = Math.min((backgrounds.length - 1) * pageHeight, pageTop + pageHeight);
    const position = Math.max(previousTop, Math.min(nextTop, container.scrollTop + event.deltaY));

    container.scrollTop = position;

    const progress = (position - pageTop) / pageHeight;
    if (progress >= 0.6) moveToPage(currentPage.current + 1);
    if (progress <= -0.6) moveToPage(currentPage.current - 1);
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartScroll.current = event.currentTarget.scrollTop;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const container = event.currentTarget;
    const pageHeight = container.clientHeight;
    const pageTop = currentPage.current * pageHeight;
    const progress = (container.scrollTop - pageTop) / pageHeight;

    if (progress >= 0.6) {
      moveToPage(currentPage.current + 1);
    } else if (progress <= -0.6) {
      moveToPage(currentPage.current - 1);
    } else if (Math.abs(container.scrollTop - touchStartScroll.current) > 1) {
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

  return (
    <main
      ref={containerRef}
      className="home-scroll h-svh overflow-y-auto overscroll-none"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {backgrounds.map((background) => (
        <motion.section
          className="h-svh min-h-svh w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${background}')` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.35 }}
          key={background}
        />
      ))}
    </main>
  );
}
