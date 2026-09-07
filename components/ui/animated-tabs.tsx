"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export interface AnimatedTabsProps {
  tabs: { label: string; href: string }[];
}

export function AnimatedTabs({ tabs }: AnimatedTabsProps) {
  const pathname = usePathname();
  const routeTab = tabs.find((tab) =>
    tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href),
  );
  const [activeTab, setActiveTab] = useState(routeTab?.label ?? tabs[0]?.label ?? "");
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (routeTab) setActiveTab(routeTab.label);
  }, [routeTab]);

  const updateClip = useCallback(() => {
    const container = containerRef.current;
    const activeTabElement = activeTabRef.current;

    if (!container || !activeTabElement || container.offsetWidth === 0) return;

    const clipLeft = activeTabElement.offsetLeft;
    const clipRight = clipLeft + activeTabElement.offsetWidth;
    const rightInset = 100 - (clipRight / container.offsetWidth) * 100;
    const leftInset = (clipLeft / container.offsetWidth) * 100;

    container.style.clipPath = `inset(0 ${rightInset.toFixed(3)}% 0 ${leftInset.toFixed(3)}% round 999px)`;
  }, []);

  useEffect(() => {
    updateClip();
    const observer = new ResizeObserver(updateClip);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [activeTab, updateClip]);

  if (!tabs.length) return null;

  return (
    <div className="relative mx-auto flex w-fit items-center rounded-full border border-white/15 bg-black/35 px-[clamp(3px,0.35vw,5px)] py-[clamp(2px,0.25vw,4px)] backdrop-blur-[2px]">
      <div
        ref={containerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-[clamp(2px,0.25vw,4px)_clamp(3px,0.35vw,5px)] z-10 overflow-hidden [clip-path:inset(0_100%_0_0_round_999px)] [transition:clip-path_0.25s_ease]"
      >
        <div className="flex h-full w-full items-center bg-white">
          {tabs.map((tab) => (
            <span
              className="flex h-[clamp(22px,min(2.25vw,3.4vh),30px)] items-center whitespace-nowrap rounded-full px-[clamp(6px,min(0.85vw,1.35vh),12px)] font-['Asta_Sans',Arial,sans-serif] text-[clamp(11px,min(1.35vw,2.15vh),18px)] font-medium leading-none text-[#112e1b]"
              key={tab.href}
            >
              {tab.label}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex w-full items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;

          return (
            <Link
              key={tab.href}
              ref={isActive ? activeTabRef : null}
              href={tab.href}
              onClick={() => setActiveTab(tab.label)}
              aria-current={isActive ? "page" : undefined}
              className="flex h-[clamp(22px,min(2.25vw,3.4vh),30px)] items-center whitespace-nowrap rounded-full px-[clamp(6px,min(0.85vw,1.35vh),12px)] font-['Asta_Sans',Arial,sans-serif] text-[clamp(11px,min(1.35vw,2.15vh),18px)] font-medium leading-none text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
