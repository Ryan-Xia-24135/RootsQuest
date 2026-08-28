import Link from "next/link";

export default function HeroSectionContent() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden text-center">
      <h1 className="absolute left-1/2 top-[40.18%] m-0 w-[82.49%] -translate-x-1/2 -translate-y-1/2 font-['Asta_Sans',Arial,sans-serif] text-[clamp(34px,min(6.67vw,10vh),100.8px)] font-semibold leading-[1.2] tracking-[-0.03em] text-white [text-shadow:0_4.2px_4.2px_rgba(0,0,0,0.25)] max-md:top-[39%] max-md:w-[92%] max-md:text-[clamp(30px,min(13vw,9vh),72px)]">
        ROOTS Quest
      </h1>

      <p className="absolute left-1/2 top-[49.47%] m-0 w-[82.49%] -translate-x-1/2 -translate-y-1/2 overflow-y-auto font-['Asta_Sans',Arial,sans-serif] text-[clamp(14px,min(2.22vw,4vh),33.6px)] font-medium leading-[1.2] tracking-[-0.03em] text-white [text-shadow:0_4.2px_4.2px_rgba(0,0,0,0.25)] max-md:top-[50%] max-md:w-[88%] max-md:text-[clamp(12px,min(4.5vw,3.5vh),24px)]">
        Regenerative, Organic, Observant based Thinking in Systems
      </p>

      <Link
        className="absolute left-1/2 top-[55.5%] flex h-[7.91%] w-[18.72%] min-w-max -translate-x-1/2 items-center justify-center rounded-[24.513px] bg-[#c8a84b] px-[2%] font-['Asta_Sans',Arial,sans-serif] text-[clamp(13px,min(1.73vw,3.2vh),26.147px)] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#1e1e1e] transition-transform hover:scale-[1.03] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white max-md:top-[58%] max-md:h-auto max-md:w-auto max-md:rounded-[18px] max-md:px-[8%] max-md:py-[4%] max-md:text-[clamp(13px,min(4.8vw,3vh),24px)]"
        href="/register"
      >
        Join ROOTS Quest
      </Link>
    </div>
  );
}
