import Image from "next/image";
import Link from "next/link";

export default function AboutSectionContent() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden">
      <h1 className="absolute left-[3.57%] top-[11.45%] m-0 w-[41.8%] font-['Asta_Sans',Arial,sans-serif] text-[clamp(36px,4.24vw,64px)] font-semibold leading-[1.2] tracking-[-0.03em] text-[#d9d9d9] max-md:left-[5%] max-md:top-[calc(72.45px+3%)] max-md:w-[90%] max-md:text-[clamp(24px,7vw,40px)]">
        Where curious, young minds learn to<br />‘think like a forest’
      </h1>

      <div className="absolute left-[49.6%] top-[11.5%] h-[33.5%] w-[46.9%] overflow-hidden rounded-[15.75px] max-md:left-[5%] max-md:top-[30%] max-md:h-[23%] max-md:w-[55%] max-md:rounded-[10px]">
        <Image
          className="object-cover object-bottom"
          src="/assets/student-writing.png"
          alt="A student writing while seated in a forest"
          fill
          sizes="(max-width: 768px) 55vw, 47vw"
        />
      </div>

      <div className="absolute left-[3.57%] top-[39.1%] h-[53.4%] w-[30.2%] overflow-hidden rounded-[15.75px] max-md:left-[64%] max-md:top-[30%] max-md:h-[23%] max-md:w-[31%] max-md:rounded-[10px]">
        <Image
          className="object-cover"
          src="/assets/forest-roots.png"
          alt="A forest tree with exposed roots"
          fill
          sizes="(max-width: 768px) 31vw, 31vw"
        />
      </div>

      <p className="absolute left-[37.76%] top-[52.14%] m-0 flex h-[19.51%] w-[58.73%] items-center overflow-y-auto rounded-[24.513px] bg-[#ccdecd] px-[1.7%] font-['Inter',Arial,sans-serif] text-[clamp(18px,2.12vw,32px)] font-normal leading-[1.2] tracking-[-0.03em] text-[#112e1b] max-md:left-[5%] max-md:top-[57%] max-md:h-auto max-md:max-h-[22%] max-md:w-[90%] max-md:rounded-[14px] max-md:px-[4%] max-md:py-[3%] max-md:text-[clamp(13px,3.6vw,20px)]">
        It empowers students ages 11-14 in grades 6-8 to understand problems and ask questions with consideration of the entire system, every angle and scale, and how it supports life on earth.
      </p>

      <Link
        className="absolute left-[62.63%] top-[80.14%] flex h-[7.23%] w-[33.86%] items-center justify-center rounded-[15px] bg-[#e5c055] px-[1%] text-center font-['Inter',Arial,sans-serif] text-[clamp(18px,2.12vw,32px)] font-medium leading-[1.2] tracking-[-0.03em] text-[#184327] transition-transform hover:scale-[1.02] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white max-md:bottom-[4%] max-md:left-1/2 max-md:top-auto max-md:h-auto max-md:w-auto max-md:max-w-[90%] max-md:-translate-x-1/2 max-md:rounded-[10px] max-md:px-[5%] max-md:py-[3%] max-md:text-[clamp(14px,3.8vw,20px)]"
        href="/about"
      >
        Learn More About ROOTS Quest
      </Link>
    </div>
  );
}
