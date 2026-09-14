import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type FeatureStatistic = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type StatisticsCard2Props = {
  items: FeatureStatistic[];
  className?: string;
};

export default function StatisticsCard2({ items, className }: StatisticsCard2Props) {
  return (
    <div className={cn("grid min-h-0 grid-cols-3 gap-[clamp(9px,1.35vw,20px)] max-md:grid-cols-2 max-sm:grid-cols-1", className)}>
      {items.map(({ title, description, icon: Icon }, index) => (
        <article
          className="group relative flex min-h-0 flex-col overflow-hidden rounded-[clamp(14px,1.5vw,22px)] border border-[#dec5b0]/65 bg-[#b7977d]/95 p-[clamp(14px,1.8vw,27px)] text-[#2c1f14] shadow-[0_16px_38px_rgba(0,0,0,0.28)] transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:bg-[#c4a58b] hover:shadow-[0_22px_46px_rgba(0,0,0,0.36)]"
          key={title}
        >
          <svg className="pointer-events-none absolute right-0 top-0 h-full w-2/3 opacity-70" viewBox="0 0 300 200" fill="none" aria-hidden="true">
            <circle cx="230" cy="62" r="76" fill="#f2dfce" fillOpacity="0.14" />
            <circle cx="274" cy="152" r="53" fill="#5d3e2c" fillOpacity="0.08" />
            <path d="M145 0 300 0 300 138Z" fill="#fff" fillOpacity="0.055" />
          </svg>

          <header className="relative z-10 flex items-center justify-between gap-3 border-b border-[#6f4c37]/20 pb-[clamp(9px,1.25vh,13px)]">
            <span className="font-['Inter',Arial,sans-serif] text-[clamp(9px,min(0.9vw,1.45vh),13px)] font-semibold uppercase tracking-[0.14em] opacity-60">
              Fit {String(index + 1).padStart(2, "0")}
            </span>
            <span className="flex size-[clamp(28px,2.7vw,40px)] items-center justify-center rounded-full border border-[#6f4c37]/20 bg-[#ead3c0]/45">
              <Icon className="size-[55%]" strokeWidth={1.7} aria-hidden="true" />
            </span>
          </header>

          <div className="relative z-10 mt-auto pt-[clamp(10px,1.8vh,18px)]">
            <h2 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(17px,min(2vw,3vh),30px)] font-semibold leading-[1.08] tracking-[-0.03em]">{title}</h2>
            <p className="mb-0 mt-[clamp(6px,1.1vh,10px)] font-['Inter',Arial,sans-serif] text-[clamp(10px,min(1.08vw,1.8vh),16px)] font-normal leading-[1.38]">{description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
