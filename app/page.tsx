"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
import { type KeyboardEvent, type TouchEvent, type WheelEvent, useRef } from "react";
import AboutSectionContent from "@/components/AboutSectionContent";
import CourseSectionContent from "@/components/CourseSectionContent";
import ImportanceSectionContent from "@/components/ImportanceSectionContent";
import SignupSectionContent from "@/components/SignupSectionContent";
import HeroSectionContent from "@/components/HeroSectionContent";
import SiteNav from "@/components/SiteNav";

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

    if (progress >= 0.3) {
      moveToPage(currentPage.current + 1);
    } else if (progress <= -0.3) {
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
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {backgrounds.map((background, index) => (
        <motion.section
          className="relative h-svh min-h-svh w-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${background}')` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.35 }}
          key={background}
        >
          <SiteNav />
          {index === 0 && <HeroSectionContent />}
          {index === 1 && <AboutSectionContent />}
          {index === 2 && <CourseSectionContent />}
          {index === 3 && <ImportanceSectionContent />}
          {index === 4 && <SignupSectionContent />}
        </motion.section>
      ))}
    </main>
  );
}
