"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
import { type KeyboardEvent, type WheelEvent, useRef } from "react";

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
  const reduceMotion = useReducedMotion();

  const moveToPage = (page: number) => {
    const container = containerRef.current;

    if (!container || isMoving.current) return;

    const nextPage = Math.max(0, Math.min(backgrounds.length - 1, page));
    if (nextPage === currentPage.current) return;

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
    if (Math.abs(event.deltaY) < 2) return;
    moveToPage(currentPage.current + (event.deltaY > 0 ? 1 : -1));
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
      className="home-scroll h-svh snap-y snap-mandatory overflow-y-auto overscroll-none"
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {backgrounds.map((background) => (
        <motion.section
          className="h-svh min-h-svh w-full snap-start snap-always bg-cover bg-center bg-no-repeat"
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
