import Image from "next/image";

export default function AboutOverviewContent() {
  return (
    <div className="absolute inset-x-0 bottom-0 top-[var(--nav-height)] z-10 overflow-hidden p-[clamp(14px,2.6vw,40px)] text-white max-sm:overflow-y-auto max-sm:p-3">
      <div className="mx-auto grid h-full max-w-[1480px] grid-cols-[1.08fr_0.92fr] gap-[clamp(12px,2vw,30px)] max-sm:h-auto max-sm:min-h-full max-sm:grid-cols-1 max-sm:gap-3">
        <section className="flex min-h-0 flex-col overflow-hidden rounded-[clamp(18px,2vw,30px)] border border-white/15 bg-black/35 p-[clamp(18px,3vw,44px)] shadow-[0_28px_70px_rgba(0,0,0,0.32)] backdrop-blur-[3px]">
          <div className="shrink-0">
            <span className="mb-[clamp(10px,1.6vh,16px)] block h-px w-[clamp(58px,7vw,104px)] bg-[#c8a84b]" />
            <h1 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(26px,min(4vw,6vh),60px)] font-semibold leading-[1.06] tracking-[-0.03em] max-sm:text-[clamp(25px,8vw,38px)]">What Truly is ROOTS Quest?</h1>
            <p className="mt-[clamp(12px,2vh,20px)] max-w-[48ch] font-['Inter',Arial,sans-serif] text-[clamp(12px,min(1.55vw,2.65vh),23px)] font-normal leading-[1.45] max-sm:text-[clamp(14px,4.2vw,18px)]">ROOTS Quest is an 8-week project-based STEM program for students in Grades 6–8 that teaches young people to see the world differently.</p>
            <p className="mt-[clamp(10px,1.7vh,17px)] max-w-[48ch] font-['Inter',Arial,sans-serif] text-[clamp(12px,min(1.55vw,2.65vh),23px)] font-normal leading-[1.45] max-sm:text-[clamp(14px,4.2vw,18px)]">Rather than beginning with solutions or answers, students first learn how to understand the systems behind the problems they care about.</p>
          </div>
          <div className="relative mt-[clamp(16px,2.5vh,26px)] min-h-0 flex-1 overflow-hidden rounded-[clamp(14px,1.4vw,22px)] border border-white/15 max-sm:h-[28svh] max-sm:min-h-[220px] max-sm:flex-none">
            <Image className="object-cover" src="/assets/about-project-photo.png" alt="Students participating in a hands-on outdoor project" fill sizes="(max-width: 640px) 94vw, 55vw" />
          </div>
        </section>

        <section className="grid min-h-0 grid-rows-[1.05fr_0.95fr] gap-[clamp(12px,2vw,30px)] max-sm:grid-rows-none">
          <div className="relative min-h-0 overflow-hidden rounded-[clamp(18px,2vw,30px)] border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.3)] max-sm:h-[28svh] max-sm:min-h-[220px]">
            <Image className="object-cover" src="/assets/about-forest-photo.png" alt="Sunlight passing through a moss-covered forest" fill sizes="(max-width: 640px) 94vw, 42vw" />
          </div>
          <div className="flex min-h-0 items-center rounded-[clamp(18px,2vw,30px)] border border-[#dbeada]/45 bg-[#ccdecd]/92 p-[clamp(18px,3vw,42px)] text-[#112e1b] shadow-[0_24px_60px_rgba(0,0,0,0.3)] backdrop-blur-sm">
            <p className="m-0 max-h-full overflow-y-auto font-['Inter',Arial,sans-serif] text-[clamp(12px,min(1.7vw,2.9vh),26px)] font-normal leading-[1.45] max-sm:text-[clamp(14px,4.2vw,18px)]">Through systems thinking, regenerative design, and innovation inspired by nature, students explore how people, technology, and the environment are connected—and how thoughtful design can strengthen those relationships instead of breaking them.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
