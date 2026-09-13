"use client";

import { Children, type CSSProperties, type HTMLAttributes, type ReactNode, forwardRef, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import "./CardSwap.css";

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = "", ...props }, ref) => <div ref={ref} {...props} className={`card-swap-card ${className}`.trim()} />,
);
Card.displayName = "Card";

type CardSwapProps = {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
};

const makeSlot = (index: number, x: number, y: number, total: number) => ({
  x: index * x,
  y: -index * y,
  z: -index * x * 1.5,
  zIndex: total - index,
});

export default function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 36,
  verticalDistance = 42,
  delay = 4200,
  pauseOnHover = true,
  skewAmount = 3,
  easing = "elastic",
  children,
}: CardSwapProps) {
  const items = useMemo(() => Children.toArray(children), [children]);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const order = useRef(items.map((_, index) => index));
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardRefs.current.slice(0, items.length);
    const config = easing === "elastic"
      ? { ease: "elastic.out(0.6,0.9)", duration: 1.15 }
      : { ease: "power1.inOut", duration: 0.55 };

    cards.forEach((card, index) => {
      if (!card) return;
      gsap.set(card, {
        ...makeSlot(index, cardDistance, verticalDistance, cards.length),
        xPercent: -50,
        yPercent: -50,
        skewY: skewAmount,
        transformOrigin: "center center",
        force3D: true,
      });
    });

    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const frontCard = cards[front];
      if (!frontCard) return;

      timeline.current?.kill();
      const next = gsap.timeline();
      timeline.current = next;
      next.to(frontCard, { y: "+=420", opacity: 0.45, duration: config.duration, ease: config.ease });
      next.addLabel("promote", `-=${config.duration * 0.82}`);
      rest.forEach((cardIndex, index) => {
        const card = cards[cardIndex];
        if (!card) return;
        const destination = makeSlot(index, cardDistance, verticalDistance, cards.length);
        next.set(card, { zIndex: destination.zIndex }, "promote");
        next.to(card, { ...destination, duration: config.duration, ease: config.ease }, `promote+=${index * 0.09}`);
      });
      const back = makeSlot(cards.length - 1, cardDistance, verticalDistance, cards.length);
      next.set(frontCard, { zIndex: back.zIndex }, "promote+=0.2");
      next.to(frontCard, { ...back, opacity: 1, duration: config.duration, ease: config.ease }, "promote+=0.2");
      next.call(() => { order.current = [...rest, front]; });
    };

    const start = () => {
      if (interval.current) clearInterval(interval.current);
      interval.current = setInterval(swap, delay);
    };
    const stop = () => {
      timeline.current?.pause();
      if (interval.current) clearInterval(interval.current);
    };
    const resume = () => {
      timeline.current?.play();
      start();
    };

    start();
    const node = container.current;
    if (pauseOnHover && node) {
      node.addEventListener("mouseenter", stop);
      node.addEventListener("mouseleave", resume);
    }

    return () => {
      if (interval.current) clearInterval(interval.current);
      timeline.current?.kill();
      cards.forEach((card) => card && gsap.killTweensOf(card));
      if (pauseOnHover && node) {
        node.removeEventListener("mouseenter", stop);
        node.removeEventListener("mouseleave", resume);
      }
    };
  }, [cardDistance, delay, easing, items.length, pauseOnHover, skewAmount, verticalDistance]);

  const dimensions: CSSProperties = { width, height };
  return (
    <div ref={container} className="card-swap-container" style={dimensions}>
      {items.map((item, index) => (
        <div className="card-swap-slot" ref={(node) => { cardRefs.current[index] = node; }} style={dimensions} key={index}>
          {item}
        </div>
      ))}
    </div>
  );
}
