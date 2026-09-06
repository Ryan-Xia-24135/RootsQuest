import Image from "next/image";
import Link from "next/link";
import { Droplets, Network, ServerCog, Sprout, type LucideIcon } from "lucide-react";
import { goldButtonEffect } from "@/components/goldButtonEffect";
import FoldText from "@/components/ui/FoldText";

const importanceHeading = "ROOTS Quest Thinking in the Real World";
const importanceCaption = "These case studies show systems thinking, regenerative design, and nature-inspired problem solving already being applied by organizations around the world.";

const cards: { title: string; image: string; href: string; icon: LucideIcon }[] = [
  {
    title: "Patagonia — Regenerative Organic Cotton",
    image: "/assets/card-patagonia-image.png",
    href: "https://www.patagonia.com/our-footprint/cotton-for-change.html",
    icon: Sprout,
  },
  {
    title: "Singapore — Four National Taps Water System",
    image: "/assets/card-singapore-image.png",
    href: "https://www.greenplan.gov.sg/vision/",
    icon: Droplets,
  },
  {
    title: "Microsoft — Regenerative Datacenter Design",
    image: "/assets/card-microsoft-image.png",
    href: "https://blogs.microsoft.com/on-the-issues/2024/05/15/microsoft-environmental-sustainability-report-2024/",
    icon: ServerCog,
  },
  {
    title: "United Nations — Regenerative Education Framework",
    image: "/assets/card-un-image.png",
    href: "https://www.unsdsn.org/news/putting-education-for-sdgs-into-practice-in-higher-education/",
    icon: Network,
  },
];

export default function ImportanceSectionContent() {
  return (
    <div className="absolute inset-x-0 bottom-0 top-[var(--nav-height)] z-10 overflow-hidden p-[clamp(12px,2.6vw,40px)]">
      <div className="mx-auto flex h-full max-w-[1480px] min-h-0 flex-col rounded-[clamp(16px,1.8vw,28px)] border border-white/15 bg-black/20 px-[clamp(14px,2.7vw,42px)] py-[clamp(12px,2.6vh,26px)] shadow-[0_28px_70px_rgba(0,0,0,0.28)] backdrop-blur-[2px]">
        <header className="shrink-0 text-center text-white">
          <h1 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(23px,min(4vw,5.4vh),60px)] font-semibold leading-[1.08] tracking-[-0.03em]">
            <FoldText text={importanceHeading} splitBy="word" hinge="top" trigger="scroll" duration={0.62} stagger={0.06} fontSize="inherit" fontWeight={600} color="#ffffff" style={{ lineHeight: 1.08, letterSpacing: "-0.03em" }} />
          </h1>
          <p className="mx-auto mt-[clamp(6px,1.3vh,12px)] max-w-[62ch] font-['Inter',Arial,sans-serif] text-[clamp(10px,min(1.5vw,2.5vh),23px)] font-normal leading-[1.3] tracking-[-0.03em]">
            <FoldText text={importanceCaption} splitBy="word" hinge="top" trigger="scroll" duration={0.48} stagger={0.018} fontSize="inherit" fontWeight={400} color="#ffffff" style={{ lineHeight: 1.3, letterSpacing: "-0.03em" }} />
          </p>
        </header>

        <div className="mt-[clamp(12px,2.4vh,24px)] grid min-h-0 flex-1 grid-cols-4 gap-[clamp(9px,1.7vw,26px)] max-md:grid-cols-2 max-md:grid-rows-2 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:pb-2">
          {cards.map((card) => (
            <a
              className="group relative flex min-h-0 flex-col overflow-hidden rounded-[clamp(12px,1.2vw,18px)] border border-[#d9efff]/70 bg-[#b6d8ee] text-[#2e5167] shadow-[0_14px_35px_rgba(0,0,0,0.28)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.38)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white max-sm:w-[82vw] max-sm:flex-none max-sm:snap-center"
              href={card.href}
              target="_blank"
              rel="noreferrer"
              key={card.title}
            >
              <div className="relative min-h-0 flex-1 overflow-hidden border-b border-[#7fa9c4]/60">
                <Image className={`object-cover transition-transform duration-500 group-hover:scale-105 ${card.image.includes("patagonia") ? "scale-[1.12] group-hover:scale-[1.17]" : ""}`} src={card.image} alt="" fill sizes="(max-width: 768px) 42vw, 22vw" />
                <div className="absolute left-[5%] top-[4%] flex size-[clamp(38px,4.8vw,68px)] items-center justify-center rounded-full border border-[#365e74]/20 bg-[#d9efff]/90 text-[#315e74] shadow-sm backdrop-blur-sm">
                  <card.icon className="size-[56%]" strokeWidth={1.7} aria-hidden="true" />
                </div>
              </div>
              <span className="flex min-h-[3.4em] shrink-0 items-center justify-end px-[8%] py-[5%] text-right font-['Inter',Arial,sans-serif] text-[clamp(9px,min(1.15vw,2vh),17px)] font-medium leading-[1.2] tracking-[-0.03em]">
                {card.title}
              </span>
            </a>
          ))}
        </div>

        <Link
          className={`mx-auto mt-[clamp(12px,2.5vh,24px)] inline-flex min-h-[clamp(38px,5.7vh,56px)] shrink-0 items-center justify-center rounded-[14px] bg-[#e5c055] px-[clamp(20px,4vw,60px)] text-center font-['Inter',Arial,sans-serif] text-[clamp(12px,min(1.55vw,2.5vh),23px)] font-medium leading-[1.15] text-[#1a2d39] ${goldButtonEffect}`}
          href="/curriculum"
        >
          More About Everything ROOTS Quest Teaches
        </Link>
      </div>
    </div>
  );
}
