"use client";

import { motion, useReducedMotion } from "framer-motion";

const meanings = [
  {
    letter: "R",
    text: "Regenerative - Thinking, planning, and designing not just to ‘make things last’ or ‘a little less bad’, but to make them actively good for the ecosystem for the future.",
  },
  {
    letter: "O",
    text: "Observant - Not just seeing, but slowing down, looking closely, and finding patterns and asking questions about what other people just walk by or dismiss",
  },
  {
    letter: "O",
    text: "Organic - Looking to nature for technological answers and solving problems with assistance from nature’s billions of years or experience in designing solutions.",
  },
  {
    letter: "T",
    text: "Thinking - Not just memorizing answers, but asking questions to carve out better questions. Not just asking what is right, but what is the right question to ask.",
  },
  {
    letter: "S",
    text: "Systems - Understanding that everything is connected, seeing feedback loops, relationships, how the growth of one can stifle the growth of another.",
  },
];

export default function AboutMeaningContent() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 z-10 overflow-hidden px-[3.17%] pb-[6.3vh] pt-[calc(var(--nav-height)+3.4vh)] text-white max-md:px-[4%] max-md:pb-[3vh] max-md:pt-[calc(var(--nav-height)+2.3vh)] max-sm:overflow-y-auto">
      <div className="flex h-full min-h-0 flex-col max-sm:h-auto max-sm:min-h-full">
        <h1 className="m-0 shrink-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(24px,min(4.24vw,6vh),64px)] font-semibold leading-[1.2] tracking-[-0.03em] max-md:text-[clamp(20px,min(7vw,4.8vh),40px)]">
          What Does ROOTS Mean?
        </h1>

        <div className="mt-[3.6vh] grid min-h-0 flex-1 grid-rows-5 gap-[3.3vh] max-md:mt-[2.2vh] max-md:gap-[1.7vh] max-sm:flex max-sm:flex-col max-sm:gap-3">
          {meanings.map(({ letter, text }, index) => (
            <motion.div
              className="relative flex min-h-0 items-stretch pl-[2.55%] max-sm:min-h-[112px] max-sm:pl-5"
              initial={reduceMotion ? false : { opacity: 0, y: 72, scale: 0.975 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ amount: 0.25 }}
              transition={{
                duration: reduceMotion ? 0 : 0.34,
                delay: reduceMotion ? 0 : index * 0.065,
                ease: [0.22, 1, 0.36, 1],
              }}
              key={`${letter}-${text}`}
            >
              <div className="flex min-w-0 flex-1 items-center rounded-[0_10px_10px_10px] bg-[#ccdecd] py-[0.7vh] pl-[4.75%] pr-[2%] text-[#112e1b] max-md:pl-[11%] max-md:pr-[2.5%]">
                <p className="m-0 max-h-full overflow-y-auto font-['Inter',Arial,sans-serif] text-[clamp(11px,min(2.25vw,3.5vh),34px)] font-normal leading-[1.2] tracking-[-0.03em] max-md:text-[clamp(8px,min(3.15vw,2.25vh),16px)]">
                  {text}
                </p>
              </div>

              <div className="absolute left-0 top-0 flex aspect-square h-[70.35%] max-h-[88px] items-center justify-center rounded-[clamp(8px,0.88vw,13px)] bg-[#c8a84b] font-['Asta_Sans',Arial,sans-serif] text-[clamp(22px,min(3.44vw,5.4vh),52px)] font-semibold leading-none tracking-[-0.03em] text-white max-md:h-[62%] max-md:text-[clamp(18px,min(5vw,3.6vh),30px)]">
                {letter}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
