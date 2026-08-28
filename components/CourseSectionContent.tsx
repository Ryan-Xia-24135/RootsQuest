import Image from "next/image";
import Link from "next/link";

export default function CourseSectionContent() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden">
      <div className="absolute left-[3.57%] top-[10.79%] h-[37.68%] w-[35.91%] overflow-hidden rounded-[15.75px] max-md:left-[5%] max-md:top-[30%] max-md:h-[22%] max-md:w-[55%] max-md:rounded-[10px]">
        <Image
          className="object-cover"
          src="/assets/spider-web.png"
          alt="A spider web lit by warm sunlight"
          fill
          sizes="(max-width: 768px) 55vw, 36vw"
        />
      </div>

      <h1 className="absolute left-[43.78%] top-[10.79%] m-0 w-[55.22%] font-['Asta_Sans',Arial,sans-serif] text-[clamp(24px,min(4.24vw,6vh),64px)] font-semibold leading-[1.2] tracking-[-0.03em] text-white max-md:left-[5%] max-md:top-[calc(var(--nav-height)+3%)] max-md:w-[90%] max-md:text-[clamp(20px,min(7vw,5.5vh),40px)]">
        Beyond a School Curriculum and Science Project
      </h1>

      <p className="absolute left-[43.78%] top-[28%] m-0 flex h-[20.47%] w-[52.71%] items-center overflow-y-auto font-['Inter',Arial,sans-serif] text-[clamp(12px,min(2.12vw,3.5vh),32px)] font-medium leading-[1.2] tracking-[-0.03em] text-white max-md:left-[5%] max-md:top-[54%] max-md:h-[14%] max-md:w-[90%] max-md:text-[clamp(10px,min(3.25vw,2.8vh),18px)]">
        Students won’t just learn about the problems they’re interested in, they’ll learn what the system is behind the problem, the connections that relate to that problem, and designing what is their next step with this new understanding.
      </p>

      <p className="absolute left-[3.57%] top-[53.87%] m-0 flex h-[14.56%] w-[56.55%] items-center overflow-y-auto rounded-[24.513px] bg-[#b7977d] px-[1.87%] font-['Inter',Arial,sans-serif] text-[clamp(12px,min(2.12vw,3.5vh),32px)] font-normal leading-[1.2] tracking-[-0.03em] text-[#2c1f14] max-md:left-[5%] max-md:top-[70%] max-md:h-auto max-md:max-h-[13%] max-md:w-[90%] max-md:rounded-[14px] max-md:px-[4%] max-md:py-[2.5%] max-md:text-[clamp(10px,min(3.25vw,2.8vh),18px)]">
        In the span of this 8 week course for students in grades 6-8 that teaches systems thinking, regenerative design, and nature-inspired problem solving in STEM.
      </p>

      <div className="absolute left-[64.81%] top-[50%] h-[40.94%] w-[31.61%] overflow-hidden rounded-[15.75px] max-md:left-[64%] max-md:top-[30%] max-md:h-[22%] max-md:w-[31%] max-md:rounded-[10px]">
        <Image
          className="object-cover object-center"
          src="/assets/pinecones.png"
          alt="Hands holding pinecones"
          fill
          sizes="(max-width: 768px) 31vw, 32vw"
        />
      </div>

      <Link
        className="absolute left-[3.57%] top-[83.71%] flex h-[7.23%] w-[38.23%] items-center justify-center rounded-[15px] bg-[#e5c055] px-[1%] text-center font-['Inter',Arial,sans-serif] text-[clamp(13px,min(2.12vw,3.5vh),32px)] font-medium leading-[1.2] tracking-[-0.03em] text-[#2c1f14] transition-transform hover:scale-[1.02] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white max-md:bottom-[3%] max-md:left-1/2 max-md:top-auto max-md:h-auto max-md:w-auto max-md:max-w-[90%] max-md:-translate-x-1/2 max-md:rounded-[10px] max-md:px-[5%] max-md:py-[3%] max-md:text-[clamp(12px,min(3.8vw,3vh),20px)]"
        href="/courses"
      >
        More of What ROOTS Quest Offers
      </Link>
    </div>
  );
}
