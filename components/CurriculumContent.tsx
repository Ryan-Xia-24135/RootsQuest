"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Note = {
  text: string;
  position: string;
  rotation: number;
};

const systemsNotes: Note[] = [
  { text: "Degenerative vs. Regenerative Thinking", position: "left-[7%] top-[8%]", rotation: -2 },
  { text: "Mapping Systems and Feedback Loops", position: "left-1/2 top-[2%] -translate-x-1/2", rotation: 1 },
  { text: "Connecting Environment, Tech, and Society", position: "right-[6%] top-[13%]", rotation: 2 },
  { text: "Learning Design from Nature", position: "bottom-[10%] left-[3%]", rotation: 1 },
  { text: "Proposing Nature-Inspired Solutions", position: "bottom-[3%] left-1/2 -translate-x-1/2", rotation: -1 },
  { text: "Finding Real Points of Change", position: "bottom-[10%] right-[6%]", rotation: -2 },
];

const researchNotes: Note[] = [
  { text: "Designing a Pitch Deck", position: "left-1/2 top-[3%] -translate-x-1/2", rotation: -1 },
  { text: "Finding and Evaluating Sources", position: "left-[4%] top-[30%]", rotation: -2 },
  { text: "Building a Lo-Fi Prototype", position: "right-[4%] top-[30%]", rotation: 2 },
  { text: "Keeping a Weekly Journal", position: "bottom-[8%] left-[25%] -translate-x-1/2", rotation: 1 },
  { text: "Giving and Receiving Feedback", position: "bottom-[8%] right-[25%] translate-x-1/2", rotation: -1 },
];

const curriculumWeeks = [
  {
    week: "Week 1",
    title: "What is a System?",
    description: "A question that changes how you see everything. We start by looking at the world differently, tracing the hidden threads that connect problems you already care about.",
  },
  {
    week: "Week 2",
    title: "Thinking in Systems",
    description: "Most solutions only treat the surface. This week students learn to see deeper, understanding why things work the way they do and what it really means to make something better.",
  },
  {
    week: "Week 3",
    title: "What Nature Already Knows",
    description: "Nature has been solving hard problems for billions of years. Students step outside, observe, and start asking what it would look like to design things the way living systems do.",
  },
  {
    week: "Week 4",
    title: "Real Cities, Real Change",
    description: "Three cities. Three broken systems. Three remarkable transformations. Students dig into what actually happened and ask whether something like this could happen where they live.",
  },
  {
    week: "Week 5",
    title: "Close to Home",
    description: "From Alberta farmland to the Bow River, students discover that regenerative thinking isn't abstract. It's already happening in their own backyard, led by communities who've been doing it for generations.",
  },
  {
    week: "Week 6",
    title: "Your Question",
    description: "Every great project starts with the right question. This week students find theirs, something they genuinely care about, rooted in what they've learned and pointed toward something real.",
  },
  {
    week: "Week 7",
    title: "Build Something",
    description: "Ideas become tangible. Students prototype, pitch, and get honest feedback, experiencing what it actually feels like to move from thinking to making.",
  },
  {
    week: "Week 8",
    title: "Show the World",
    description: "A live showcase with a real audience. Students present the work they've built over 8 weeks and answer for it, confidently and on their own terms.",
  },
];

function StickyNote({ note, index }: { note: Note; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute flex aspect-[1.16] w-[clamp(128px,14.9vw,225px)] items-center justify-center rounded-[4px] border border-[#dec5b0]/70 bg-[#b7977d] p-[clamp(12px,1.6vw,24px)] text-center text-[#2c1f14] shadow-[0_14px_34px_rgba(0,0,0,0.32)] before:absolute before:left-1/2 before:top-0 before:h-[clamp(7px,0.7vw,11px)] before:w-[42%] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-[#f1dfcf]/45 before:content-[''] ${note.position} max-sm:static max-sm:aspect-auto max-sm:min-h-[120px] max-sm:w-full max-sm:translate-x-0`}
      initial={reduceMotion ? false : { opacity: 0, y: 54, scale: 0.78, rotate: note.rotation - 4 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: note.rotation }}
      viewport={{ amount: 0.35, once: true }}
      transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : index * 0.075, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="m-0 font-['Georgia',serif] text-[clamp(14px,min(1.55vw,2.7vh),23px)] font-medium leading-[1.22] tracking-[-0.025em] max-sm:text-[17px]">
        {note.text}
      </p>
    </motion.div>
  );
}

function CurriculumTopic({ heading, notes, compactHeading = false }: { heading: React.ReactNode; notes: Note[]; compactHeading?: boolean }) {
  return (
    <div className="absolute inset-x-0 bottom-0 top-[var(--nav-height)] z-10 overflow-hidden px-[clamp(14px,3vw,46px)] py-[clamp(16px,3vh,30px)] text-white max-sm:overflow-y-auto max-sm:p-3">
      <div className="relative mx-auto h-full max-w-[1480px] max-sm:flex max-sm:h-auto max-sm:min-h-full max-sm:flex-col">
        <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[clamp(18px,2vw,30px)] border border-white/15 bg-black/18 px-[clamp(18px,4vw,60px)] py-[clamp(20px,4vh,42px)] text-center shadow-[0_24px_65px_rgba(0,0,0,0.24)] backdrop-blur-[2px] max-sm:static max-sm:mb-3 max-sm:w-auto max-sm:translate-x-0 max-sm:translate-y-0 ${compactHeading ? "w-[min(62vw,900px)]" : "w-[min(72vw,1020px)]"}`}>
          <h1 className={`m-0 font-['Asta_Sans',Arial,sans-serif] font-semibold leading-[1.18] tracking-[-0.03em] max-sm:text-[clamp(28px,9vw,42px)] ${compactHeading ? "text-[clamp(28px,min(3.7vw,6vh),56px)]" : "text-[clamp(30px,min(5.3vw,8vh),80px)]"}`}>
            {heading}
          </h1>
        </div>

        <div className="contents max-sm:grid max-sm:grid-cols-2 max-sm:gap-3 max-[430px]:grid-cols-1">
          {notes.map((note, index) => <StickyNote note={note} index={index} key={note.text} />)}
        </div>
      </div>
    </div>
  );
}

export function SystemsThinkingContent() {
  return (
    <CurriculumTopic
      heading={<><span className="block">System Design</span><span className="block">&amp;</span><span className="block">Regenerative Thinking</span></>}
      notes={systemsNotes}
    />
  );
}

export function ResearchSkillsContent() {
  return <CurriculumTopic heading="Technical, Scientific & Research Skills" notes={researchNotes} compactHeading />;
}

export function CurriculumOverviewHeading() {
  return (
    <div className="absolute inset-x-0 bottom-0 top-[var(--nav-height)] z-10 overflow-hidden px-[clamp(14px,3vw,46px)] py-[clamp(14px,2.7vh,28px)] text-white max-sm:p-3">
      <div className="mx-auto flex h-full max-w-[1420px] min-h-0 flex-col rounded-[clamp(18px,2vw,30px)] border border-white/15 bg-black/25 p-[clamp(14px,2.5vw,36px)] shadow-[0_28px_70px_rgba(0,0,0,0.3)] backdrop-blur-[3px]">
        <header className="shrink-0 border-b border-white/65 pb-[clamp(10px,1.8vh,18px)] text-center">
          <h1 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(23px,min(3.7vw,5.7vh),56px)] font-semibold leading-[1.12] tracking-[-0.03em] max-sm:text-[clamp(23px,7vw,34px)]">
          How the Course Unfolds: 8-Week Curriculum Overview
          </h1>
        </header>

        <div className="mt-[clamp(10px,1.8vh,18px)] min-h-0 flex-1 overflow-y-auto pr-1" data-snap-scroll>
          <Accordion type="single" defaultValue="week-1" collapsible className="w-full">
            {curriculumWeeks.map(({ week, title, description }, index) => (
              <AccordionItem className="border-white/20 last:border-b" value={`week-${index + 1}`} key={week}>
                <AccordionTrigger className="group cursor-pointer px-[clamp(12px,1.7vw,26px)] py-[clamp(8px,min(1.25vw,1.9vh),15px)] text-left text-white/75 transition-colors hover:text-white hover:no-underline data-[state=open]:rounded-t-[14px] data-[state=open]:bg-[#b7977d] data-[state=open]:text-[#2c1f14] max-sm:px-3 max-sm:py-2 [&>svg:last-child]:hidden">
                  <div className="flex min-w-0 flex-1 items-center gap-[clamp(10px,1.5vw,22px)]">
                    <span className="w-[clamp(54px,6vw,88px)] shrink-0 font-['Inter',Arial,sans-serif] text-[clamp(10px,min(1.1vw,1.8vh),16px)] font-medium uppercase tracking-[0.08em] opacity-75 max-sm:w-[48px] max-sm:text-[10px]">{week}</span>
                    <h2 className="m-0 min-w-0 flex-1 font-['Asta_Sans',Arial,sans-serif] text-[clamp(15px,min(2vw,3.25vh),30px)] font-semibold leading-[1.1] tracking-[-0.025em] max-sm:text-[clamp(15px,4.6vw,20px)]">{title}</h2>
                    <PlusIcon className="size-[clamp(15px,min(1.7vw,2.7vh),25px)] shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-45" aria-hidden="true" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="rounded-b-[14px] bg-[#b7977d] px-[clamp(76px,9.2vw,136px)] pb-[clamp(11px,min(1.7vw,2.5vh),21px)] text-[#2c1f14] max-sm:px-4 max-sm:pb-3">
                  <p className="m-0 max-w-[80ch] font-['Inter',Arial,sans-serif] text-[clamp(11px,min(1.35vw,2.25vh),20px)] font-normal leading-[1.42] tracking-[-0.015em] max-sm:text-[14px]">{description}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
