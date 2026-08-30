"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const outcomes = [
  {
    title: "Process Journal",
    description:
      "A journal of how their thinking grew and changed and how their questions evolved, in any format they choose: written, drawn, or voice-recorded.",
    image: "/assets/course-process-journal.png",
  },
  {
    title: "Systems Map",
    description:
      "A diagram connecting and linking their problem to the larger system behind and around it, including causes, loops, and relationships.",
    image: "/assets/course-systems-map.png",
  },
  {
    title: "Lo-Fi Prototype",
    description:
      "A first version of their solution in any form: a sketch, physical model, diagram, or written proposal.",
    image: "/assets/course-lofi-prototype.png",
  },
  {
    title: "Pitch Deck",
    description:
      "A short slideshow presenting their problem, research, and proposed solution to an audience of parents and peers.",
    image: "/assets/course-pitch-deck.png",
  },
];

function EmptyPhotoBlock({ label }: { label: string }) {
  return (
    <div
      className="min-h-0 rounded-[clamp(18px,2vw,30px)] border border-dashed border-white/35 bg-black/15 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur-[2px]"
      role="img"
      aria-label={label}
    />
  );
}

export function CourseConnectionContent() {
  return (
    <div className="absolute inset-x-0 bottom-0 top-[var(--nav-height)] z-10 overflow-hidden p-[clamp(14px,3vw,46px)] text-white max-sm:overflow-y-auto max-sm:p-3">
      <div className="mx-auto grid h-full max-w-[1480px] grid-cols-[0.86fr_1.14fr] gap-[clamp(14px,2.4vw,36px)] max-sm:h-auto max-sm:min-h-full max-sm:grid-cols-1 max-sm:gap-3">
        <section className="flex min-h-0 flex-col justify-between rounded-[clamp(18px,2vw,30px)] border border-white/15 bg-black/35 p-[clamp(20px,3.2vw,48px)] shadow-[0_28px_70px_rgba(0,0,0,0.32)] backdrop-blur-[3px]">
          <div>
            <span className="mb-[clamp(10px,1.7vh,17px)] block h-px w-[clamp(62px,8vw,112px)] bg-[#c8a84b]" />
            <h1 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(28px,min(4.4vw,6.3vh),66px)] font-semibold leading-[1.06] tracking-[-0.03em] max-sm:text-[clamp(26px,8vw,40px)]">
              The Connection Between Everything
            </h1>
            <p className="mt-[clamp(14px,2.3vh,24px)] max-w-[38ch] font-['Inter',Arial,sans-serif] text-[clamp(13px,min(1.75vw,3vh),26px)] font-normal leading-[1.45] tracking-[-0.02em] max-sm:text-[clamp(14px,4.3vw,18px)]">
              Within a forest, everything is connected. The ecosystem’s health sits on a tightrope, yet nature manages to keep it balanced.
            </p>
          </div>
          <p className="m-0 rounded-[clamp(14px,1.5vw,22px)] border border-[#dac6b6]/35 bg-[#9c7561]/85 p-[clamp(16px,2.5vw,36px)] font-['Inter',Arial,sans-serif] text-[clamp(12px,min(1.55vw,2.6vh),23px)] font-normal leading-[1.42] text-white shadow-[0_18px_45px_rgba(0,0,0,0.25)] max-sm:mt-3 max-sm:text-[clamp(14px,4.2vw,18px)]">
            ROOTS Quest strives to build a connection between passionate young students in STEM and the natural ecosystem through regenerative and systems thinking.
          </p>
        </section>

        <EmptyPhotoBlock label="Reserved space for a future course photo" />
      </div>
    </div>
  );
}

export function CourseOutcomesContent() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-x-0 bottom-0 top-[var(--nav-height)] z-10 overflow-hidden p-[clamp(14px,3vw,46px)] text-white max-sm:overflow-y-auto max-sm:p-3">
      <div className="mx-auto flex h-full max-w-[1480px] min-h-0 flex-col rounded-[clamp(18px,2vw,30px)] border border-white/15 bg-black/30 p-[clamp(18px,3vw,44px)] shadow-[0_28px_70px_rgba(0,0,0,0.32)] backdrop-blur-[3px] max-sm:h-auto max-sm:min-h-full">
        <header className="shrink-0 text-center">
          <span className="mx-auto mb-[clamp(10px,1.6vh,16px)] block h-px w-[clamp(72px,9vw,130px)] bg-[#c8a84b]" />
          <h1 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(27px,min(4.25vw,6vh),64px)] font-semibold leading-[1.08] tracking-[-0.03em] max-sm:text-[clamp(25px,7.7vw,38px)]">
            4 Things Every Student Walks Away With
          </h1>
        </header>

        <div className="mt-[clamp(16px,3vh,30px)] grid min-h-0 flex-1 grid-cols-4 gap-[clamp(10px,1.6vw,24px)] max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:pb-2">
          {outcomes.map((outcome, index) => (
            <motion.article
              className="flex min-h-0 flex-col overflow-hidden rounded-[clamp(14px,1.5vw,22px)] border border-[#e2cdbd]/35 bg-[#9c7561]/90 text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] max-sm:w-[84vw] max-sm:flex-none max-sm:snap-center"
              initial={reduceMotion ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.25, once: true }}
              transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : index * 0.06 }}
              key={outcome.title}
            >
              <div className="p-[clamp(14px,1.8vw,27px)]">
                <h2 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(18px,min(2.25vw,3.8vh),34px)] font-semibold leading-[1.1] tracking-[-0.03em]">{outcome.title}</h2>
                <p className="mt-[clamp(8px,1.3vh,13px)] font-['Inter',Arial,sans-serif] text-[clamp(10px,min(1.14vw,2vh),17px)] font-normal leading-[1.4] max-sm:text-[15px]">{outcome.description}</p>
              </div>
              <div className="relative mt-auto min-h-0 flex-1 overflow-hidden border-t border-white/15 max-sm:h-[42svh] max-sm:min-h-[280px] max-sm:flex-none">
                <Image className="object-cover transition-transform duration-500 hover:scale-105" src={outcome.image} alt="" fill sizes="(max-width: 640px) 84vw, 23vw" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CourseInstructorContent() {
  return (
    <div className="absolute inset-x-0 bottom-0 top-[var(--nav-height)] z-10 overflow-hidden p-[clamp(14px,3vw,46px)] text-white max-sm:overflow-y-auto max-sm:p-3">
      <div className="mx-auto grid h-full max-w-[1480px] grid-cols-[0.92fr_1.16fr_0.92fr] gap-[clamp(12px,2vw,30px)] max-sm:h-auto max-sm:min-h-full max-sm:grid-cols-1 max-sm:gap-3">
        <section className="flex min-h-0 flex-col rounded-[clamp(18px,2vw,30px)] border border-white/15 bg-black/35 p-[clamp(18px,2.8vw,42px)] shadow-[0_28px_70px_rgba(0,0,0,0.32)] backdrop-blur-[3px]">
          <span className="mb-[clamp(10px,1.6vh,16px)] block h-px w-[clamp(58px,7vw,104px)] bg-[#c8a84b]" />
          <h1 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(26px,min(3.5vw,5.5vh),52px)] font-semibold leading-[1.08] tracking-[-0.03em]">About the Instructor</h1>
          <p className="mt-[clamp(14px,2.2vh,22px)] min-h-0 overflow-y-auto font-['Inter',Arial,sans-serif] text-[clamp(11px,min(1.36vw,2.35vh),20px)] font-normal leading-[1.45] max-sm:text-[15px]">
            Ryan Xia is a student, youth creator and educator, and aspiring engineer based out of Calgary, Alberta, and the founder of ROOTS Quest. As a competitive robotics member in FIRST Tech Challenge with Cybertronic Penguinz and a youth creator and educator with experience running education programming in STEM and robotics subjects, Ryan brings a unique combination of technical curiosity and a passion for teaching everything he builds.
          </p>
        </section>

        <EmptyPhotoBlock label="Reserved space for a future instructor photo" />

        <blockquote className="m-0 flex min-h-0 items-center rounded-[clamp(18px,2vw,30px)] border border-[#dac6b6]/35 bg-[#9c7561]/88 p-[clamp(18px,2.8vw,42px)] font-['Inter',Arial,sans-serif] text-[clamp(11px,min(1.36vw,2.35vh),20px)] font-normal leading-[1.45] shadow-[0_24px_60px_rgba(0,0,0,0.28)] max-sm:text-[15px]">
          “ROOTS Quest didn’t stem from a classroom assignment or a school project. It came from the core philosophy that regenerative thinking is one of the most important ideas of the present and future—and that its seed should be planted in our future innovators, scientists, researchers, entrepreneurs, and engineers.”
        </blockquote>
      </div>
    </div>
  );
}
