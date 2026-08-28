import Image from "next/image";

const facts = [
  ["For Curious STEM students", "In Grades 6–8"],
  ["Completely Free, No Fees", "The only tuition is your curiosity"],
  ["Weekly, for 8 Weeks", "1 Hour Sessions per Week"],
  ["Live, Online Sessions", "Sessions Happen via Zoom"],
  ["For Anywhere, from Calgary", "Based Out of Calgary, Applicable Anywhere"],
  ["Small Cohorts, for a Reason", "Small Groups with Real Discussions"],
];

export default function AboutDetailsContent() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden px-[2.85%] pb-[2.2%] pt-[calc(var(--nav-height)+2.1%)] text-white max-md:px-[5%] max-md:pb-[2%] max-md:pt-[calc(var(--nav-height)+2%)]">
      <div className="flex h-full min-h-0 flex-col items-center">
        <header className="shrink-0 text-center">
          <h1 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(24px,min(4.24vw,6vh),64px)] font-bold leading-[1.2] tracking-[-0.03em] max-md:text-[clamp(20px,min(7vw,4.7vh),40px)]">
            Everything you need to know
          </h1>
          <p className="mt-[1.1vh] font-['Inter',Arial,sans-serif] text-[clamp(11px,min(2.12vw,3.6vh),32px)] font-medium leading-[1.2] tracking-[-0.03em] max-md:mt-[0.7vh] max-md:text-[clamp(9px,min(3.3vw,2.5vh),17px)]">
            ROOTS Quest is built for curious STEM students, by a curious STEM student
          </p>
        </header>

        <div className="mt-[5.1vh] h-[4px] w-full shrink-0 bg-white max-md:mt-[2.1vh] max-md:h-[2px]" />

        <div className="mt-[5.2vh] grid w-full min-h-0 flex-1 grid-cols-2 grid-rows-3 gap-x-[5%] gap-y-[2.4vh] max-md:mt-[2.2vh] max-md:gap-x-[4%] max-md:gap-y-[1.2vh]">
          {facts.map(([title, detail], index) => (
            <div
              className={`min-w-0 self-start ${index % 2 ? "text-right" : "text-left"}`}
              key={title}
            >
              <h2 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(15px,min(3.7vw,5.6vh),56px)] font-semibold leading-[1.12] tracking-[-0.03em] max-md:text-[clamp(12px,min(4vw,3vh),23px)]">
                {title}
              </h2>
              <p className="mt-[0.15em] font-['Inter',Arial,sans-serif] text-[clamp(10px,min(2.38vw,3.6vh),36px)] font-normal leading-[1.12] tracking-[-0.03em] max-md:text-[clamp(8px,min(2.8vw,2.15vh),15px)]">
                {detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-[1vh] flex shrink-0 flex-col items-center">
          <a
            className="flex min-w-[38%] flex-col items-center rounded-[clamp(10px,1.25vw,19px)] bg-[#c8a84b] px-[clamp(18px,1.55vw,24px)] py-[clamp(7px,1.1vh,11px)] text-center text-[#112e1b] transition-transform hover:scale-[1.03] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white max-md:min-w-0 max-md:max-w-[88vw]"
            href="/register"
          >
            <span className="font-['Asta_Sans',Arial,sans-serif] text-[clamp(17px,min(2.87vw,4.8vh),43px)] font-semibold leading-[1.12] tracking-[-0.03em] max-md:text-[clamp(14px,min(4vw,2.8vh),22px)]">
              Only 15 Students per Cohort
            </span>
            <span className="font-['Inter',Arial,sans-serif] text-[clamp(10px,min(1.84vw,3vh),28px)] leading-[1.15] tracking-[-0.03em] max-md:text-[clamp(9px,min(3vw,2vh),15px)]">
              Reserve your spot, Sign up now
            </span>
          </a>

          <a
            className="mt-[1.5vh] flex flex-col items-center font-['Inter',Arial,sans-serif] text-[clamp(11px,min(1.59vw,2.7vh),24px)] font-medium leading-[1.2] tracking-[-0.03em] transition-transform hover:scale-[1.03] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white max-md:mt-[0.8vh] max-md:text-[clamp(9px,min(3vw,2vh),14px)]"
            href="#about-more"
            data-snap-to="2"
          >
            <span className="rounded-[10px] bg-black/45 px-3 py-1.5">What Does ROOTS Mean?</span>
            <span className="relative mt-1 block size-[clamp(26px,min(3.97vw,5.5vh),60px)]">
              <Image src="/assets/about-down-control.svg" alt="" fill sizes="60px" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
