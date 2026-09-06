import Image from "next/image";
import Link from "next/link";
import { goldButtonEffect } from "@/components/goldButtonEffect";
import FoldText from "@/components/ui/FoldText";

const aboutHeading = "Where curious, young minds learn to\n‘think like a forest’";
const aboutCaption = "It empowers students ages 11-14 in grades 6-8 to understand problems and ask questions with consideration of the entire system, every angle and scale, and how it supports life on earth.";

export default function AboutSectionContent() {
  return (
    <div className="absolute inset-x-0 bottom-0 top-[var(--nav-height)] z-10 overflow-hidden p-[clamp(14px,3.3vw,50px)] max-sm:overflow-y-auto max-sm:p-3">
      <div className="mx-auto grid h-full max-w-[1450px] grid-cols-[0.82fr_1.18fr] gap-[clamp(12px,2.5vw,38px)] max-sm:h-auto max-sm:min-h-full max-sm:grid-cols-1 max-sm:grid-rows-none max-sm:gap-3">
        <section className="flex min-h-0 flex-col rounded-[clamp(16px,1.7vw,26px)] border border-white/15 bg-black/20 p-[clamp(14px,2.5vw,38px)] shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur-[2px]">
          <h1 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(23px,min(4.1vw,5.8vh),62px)] font-semibold leading-[1.12] tracking-[-0.03em] text-[#d9d9d9]">
            <FoldText text={aboutHeading} splitBy="line" hinge="top" trigger="scroll" duration={0.62} stagger={0.12} fontSize="inherit" fontWeight={600} color="#d9d9d9" style={{ lineHeight: 1.12, letterSpacing: "-0.03em" }} />
          </h1>
          <div className="relative mt-[clamp(12px,2.5vh,24px)] min-h-0 flex-1 overflow-hidden rounded-[clamp(12px,1.2vw,18px)] border border-white/25 shadow-[0_18px_40px_rgba(0,0,0,0.28)] max-sm:hidden">
            <Image className="object-cover" src="/assets/forest-roots.png" alt="A forest tree with exposed roots" fill sizes="42vw" />
          </div>
        </section>

        <section className="grid min-h-0 grid-rows-[1.12fr_0.88fr] gap-[clamp(12px,2vh,22px)] max-sm:grid-rows-none max-sm:gap-3">
          <div className="relative min-h-0 overflow-hidden rounded-[clamp(16px,1.7vw,26px)] border border-white/25 shadow-[0_24px_60px_rgba(0,0,0,0.3)] max-sm:h-[28svh] max-sm:min-h-[210px]">
            <Image className="object-cover object-bottom" src="/assets/student-writing.png" alt="A student writing while seated in a forest" fill sizes="(max-width: 640px) 92vw, 58vw" />
          </div>

          <div className="flex min-h-0 flex-col items-start justify-center rounded-[clamp(16px,1.7vw,26px)] border border-[#dcebdd]/70 bg-[#ccdecd]/95 px-[clamp(16px,3vw,46px)] py-[clamp(12px,2.5vh,26px)] text-[#112e1b] shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
            <p className="m-0 max-h-[9em] overflow-y-auto font-['Inter',Arial,sans-serif] text-[clamp(11px,min(1.85vw,3vh),28px)] font-normal leading-[1.3] tracking-[-0.03em]">
              <FoldText text={aboutCaption} splitBy="word" hinge="top" trigger="scroll" duration={0.48} stagger={0.018} fontSize="inherit" fontWeight={400} color="inherit" style={{ lineHeight: 1.3, letterSpacing: "-0.03em" }} />
            </p>
            <Link
              className={`mt-[clamp(10px,2.2vh,22px)] inline-flex min-h-[clamp(38px,5.8vh,58px)] items-center justify-center rounded-[14px] bg-[#e5c055] px-[clamp(16px,2.4vw,36px)] text-center font-['Inter',Arial,sans-serif] text-[clamp(12px,min(1.55vw,2.6vh),23px)] font-medium leading-[1.15] text-[#184327] ${goldButtonEffect}`}
              href="/about"
            >
              Learn More About ROOTS Quest
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
