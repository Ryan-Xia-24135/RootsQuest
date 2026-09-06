import Image from "next/image";
import Link from "next/link";
import { goldButtonEffect } from "@/components/goldButtonEffect";
import FoldText from "@/components/ui/FoldText";

const courseSummary = "In the span of this 8 week course for students in grades 6-8 that teaches systems thinking, regenerative design, and nature-inspired problem solving in STEM.";
const courseHeading = "Beyond a School Curriculum and Science Project";
const courseCaption = "Students won’t just learn about the problems they’re interested in, they’ll learn what the system is behind the problem, the connections that relate to that problem, and designing what is their next step with this new understanding.";

export default function CourseSectionContent() {
  return (
    <div className="absolute inset-x-0 bottom-0 top-[var(--nav-height)] z-10 overflow-hidden p-[clamp(14px,3.3vw,50px)] max-sm:overflow-y-auto max-sm:p-3">
      <div className="mx-auto grid h-full max-w-[1450px] grid-cols-2 gap-[clamp(12px,2.5vw,38px)] max-sm:h-auto max-sm:min-h-full max-sm:grid-cols-1 max-sm:grid-rows-none max-sm:gap-3">
        <section className="grid min-h-0 grid-rows-[1.2fr_auto] gap-[clamp(12px,2vh,22px)]">
          <div className="relative min-h-0 overflow-hidden rounded-[clamp(16px,1.7vw,26px)] border border-[#f1d5b7]/40 shadow-[0_24px_60px_rgba(0,0,0,0.3)] max-sm:h-[28svh] max-sm:min-h-[210px]">
            <Image className="object-cover" src="/assets/spider-web.png" alt="A spider web lit by warm sunlight" fill sizes="(max-width: 640px) 92vw, 48vw" />
          </div>
          <p className="m-0 rounded-[clamp(14px,1.5vw,22px)] border border-[#dcc1aa]/55 bg-[#b7977d]/95 px-[clamp(14px,2.2vw,32px)] py-[clamp(10px,2vh,20px)] font-['Inter',Arial,sans-serif] text-[clamp(10px,min(1.6vw,2.7vh),24px)] font-normal leading-[1.3] tracking-[-0.03em] text-[#2c1f14] shadow-[0_18px_44px_rgba(0,0,0,0.22)]">
            <FoldText text={courseSummary} splitBy="word" hinge="top" trigger="scroll" duration={0.48} stagger={0.018} fontSize="inherit" fontWeight={400} color="inherit" style={{ lineHeight: 1.3, letterSpacing: "-0.03em" }} />
          </p>
        </section>

        <section className="flex min-h-0 flex-col rounded-[clamp(16px,1.7vw,26px)] border border-white/15 bg-black/25 p-[clamp(16px,2.7vw,40px)] shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-[2px]">
          <h1 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(22px,min(4vw,5.7vh),60px)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
            <FoldText text={courseHeading} splitBy="word" hinge="top" trigger="scroll" duration={0.62} stagger={0.06} fontSize="inherit" fontWeight={600} color="#ffffff" style={{ lineHeight: 1.1, letterSpacing: "-0.03em" }} />
          </h1>
          <p className="mt-[clamp(10px,2vh,20px)] max-h-[8em] overflow-y-auto font-['Inter',Arial,sans-serif] text-[clamp(10px,min(1.65vw,2.8vh),25px)] font-normal leading-[1.3] tracking-[-0.03em] text-white">
            <FoldText text={courseCaption} splitBy="word" hinge="top" trigger="scroll" duration={0.48} stagger={0.015} fontSize="inherit" fontWeight={400} color="#ffffff" style={{ lineHeight: 1.3, letterSpacing: "-0.03em" }} />
          </p>
          <div className="relative mt-[clamp(10px,2vh,20px)] min-h-0 flex-1 overflow-hidden rounded-[clamp(12px,1.2vw,18px)] border border-white/20 shadow-[0_16px_38px_rgba(0,0,0,0.28)] max-sm:hidden">
            <Image className="object-cover object-center" src="/assets/pinecones.png" alt="Hands holding pinecones" fill sizes="48vw" />
          </div>
          <Link
            className={`mt-[clamp(10px,2vh,20px)] inline-flex min-h-[clamp(38px,5.8vh,58px)] w-fit items-center justify-center rounded-[14px] bg-[#e5c055] px-[clamp(18px,2.8vw,42px)] text-center font-['Inter',Arial,sans-serif] text-[clamp(12px,min(1.55vw,2.6vh),23px)] font-medium leading-[1.15] text-[#2c1f14] ${goldButtonEffect}`}
            href="/courses"
          >
            More of What ROOTS Quest Offers
          </Link>
        </section>
      </div>
    </div>
  );
}
