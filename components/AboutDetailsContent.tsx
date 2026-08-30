import { Accordion05, type AccordionEntry } from "@/components/ui/accordion-05";

const courseQuestions: AccordionEntry[] = [
  {
    id: "1",
    title: "Who is this course designed for?",
    content: "ROOTS Quest is built for curious STEM students in grades 6–8 who want to think beyond the textbook and tackle real-world problems.",
  },
  {
    id: "2",
    title: "How much does it cost?",
    content: "ROOTS Quest is completely free — no tuition, no fees, no catch — because meaningful learning should be accessible to every student.",
  },
  {
    id: "3",
    title: "How long does the course run?",
    content: "The course runs for 8 weeks with one live one-hour session per week, making it easy to fit into any schedule.",
  },
  {
    id: "4",
    title: "How are sessions delivered?",
    content: "Every session happens live over Zoom, giving students a real-time interactive experience from wherever they are.",
  },
  {
    id: "5",
    title: "What does the class structure look like?",
    content: "ROOTS Quest runs in small cohorts of 15 students, keeping every session intimate enough for real conversations and genuine peer feedback.",
  },
  {
    id: "6",
    title: "Where does this course take place?",
    content: "ROOTS Quest is based out of Calgary but designed to be fully accessible to students anywhere with an internet connection.",
  },
];

export default function AboutDetailsContent() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden px-[clamp(18px,3.2vw,48px)] pb-[clamp(18px,3vh,30px)] pt-[calc(var(--nav-height)+clamp(14px,3vh,30px))] text-white max-sm:px-3 max-sm:pb-3">
      <div className="mx-auto flex h-full min-h-0 max-w-[1600px] flex-col">
        <header className="mb-[clamp(14px,3vh,30px)] shrink-0">
          <h1 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(22px,min(4.24vw,5.8vh),64px)] font-semibold leading-[1.1] tracking-[-0.03em]">Everything you need to know</h1>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <Accordion05 items={courseQuestions} />
        </div>
      </div>
    </div>
  );
}
