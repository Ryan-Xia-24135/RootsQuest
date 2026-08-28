import Image from "next/image";

export default function AboutOverviewContent() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden text-white">
      <h1 className="absolute left-[3.17%] top-[12.88%] m-0 w-[70.04%] -translate-y-1/2 font-['Asta_Sans',Arial,sans-serif] text-[clamp(24px,min(4.24vw,6vh),64px)] font-bold leading-[1.2] tracking-[-0.03em] max-md:left-[5%] max-md:top-[calc(var(--nav-height)+5%)] max-md:w-[90%] max-md:text-[clamp(20px,min(7vw,5.5vh),40px)]">
        What Truly is ROOTS Quest?
      </h1>

      <p className="absolute left-[3.17%] top-[16.9%] m-0 flex h-[11.61%] w-[56.81%] items-center overflow-y-auto font-['Inter',Arial,sans-serif] text-[clamp(12px,min(2.12vw,3.5vh),32px)] font-medium leading-[1.2] tracking-[-0.03em] max-md:left-[5%] max-md:top-[20%] max-md:h-[10%] max-md:w-[90%] max-md:text-[clamp(10px,min(3.25vw,2.8vh),18px)]">
        ROOTS Quest is an 8-week project-based STEM program for students in Grades 6–8 that teaches young people to see the world differently.
      </p>

      <p className="absolute left-[3.17%] top-[32.69%] m-0 flex max-h-[13.5%] w-[46.56%] -translate-y-1/2 items-center overflow-y-auto font-['Inter',Arial,sans-serif] text-[clamp(12px,min(2.12vw,3.5vh),32px)] font-medium leading-[1.2] tracking-[-0.03em] max-md:left-[5%] max-md:top-[40.5%] max-md:h-[18%] max-md:max-h-[18%] max-md:w-[43%] max-md:translate-y-0 max-md:text-[clamp(10px,min(3.25vw,2.8vh),18px)]">
        Rather than beginning with solutions or answers, students will first learn how to understand the systems behind the problems they care about.
      </p>

      <div className="absolute left-[66.01%] top-[15.17%] h-[33.91%] w-[30.82%] overflow-hidden rounded-bl-[24px] rounded-br-[16px] rounded-tl-[16px] max-md:left-[52%] max-md:top-[32%] max-md:h-[20%] max-md:w-[43%] max-md:rounded-[10px]">
        <Image
          className="object-cover"
          src="/assets/about-forest-photo.png"
          alt="Sunlight passing through a moss-covered forest"
          fill
          sizes="(max-width: 768px) 43vw, 31vw"
        />
      </div>

      <div className="absolute left-[3.17%] top-[47.25%] h-[40.43%] w-[46.56%] overflow-hidden rounded-br-[16px] rounded-tl-[16px] rounded-tr-[24px] max-md:left-[5%] max-md:top-[56%] max-md:h-[25%] max-md:w-[55%] max-md:rounded-[10px]">
        <Image
          className="object-cover"
          src="/assets/about-project-photo.png"
          alt="Students participating in a hands-on outdoor project"
          fill
          sizes="(max-width: 768px) 55vw, 47vw"
        />
      </div>

      <p className="absolute right-[3.7%] top-[55.19%] m-0 flex h-[32.48%] w-[37.37%] items-center justify-end overflow-y-auto text-right font-['Inter',Arial,sans-serif] text-[clamp(12px,min(2.12vw,3.5vh),32px)] font-medium leading-[1.2] tracking-[-0.03em] max-md:right-[5%] max-md:top-[56%] max-md:h-[25%] max-md:w-[31%] max-md:text-[clamp(9px,min(3vw,2.5vh),16px)]">
        Through systems thinking, regenerative design, and innovation inspired by nature, they explore how people, technology, and the environment are connected and how thoughtful design can strengthen those relationships, instead of breaking them.
      </p>

      <a
        className="absolute bottom-[1.8%] left-1/2 flex w-[345px] max-w-[80%] -translate-x-1/2 flex-col items-center font-['Inter',Arial,sans-serif] text-[clamp(12px,min(1.59vw,2.8vh),24px)] font-medium leading-[1.2] tracking-[-0.03em] transition-transform hover:scale-[1.03] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white"
        href="#about-details"
        data-snap-to="1"
      >
        <span className="w-full rounded-[10px] bg-black/45 px-3 py-2 text-center">More Info About ROOTS Quest</span>
        <span className="relative mt-1 block size-[clamp(30px,min(3.97vw,6vh),60px)]">
          <Image src="/assets/about-down-control.svg" alt="" fill sizes="60px" />
        </span>
      </a>
    </div>
  );
}
