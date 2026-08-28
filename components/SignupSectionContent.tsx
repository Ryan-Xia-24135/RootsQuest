import Link from "next/link";

export default function SignupSectionContent() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden text-center text-white">
      <p className="absolute left-1/2 top-[32.65%] m-0 w-[43.06%] -translate-x-1/2 -translate-y-1/2 font-['Asta_Sans',Arial,sans-serif] text-[clamp(22px,min(3.33vw,5vh),50.4px)] font-semibold leading-[1.2] tracking-[-0.03em] max-md:top-[31%] max-md:w-[90%] max-md:text-[clamp(18px,min(6vw,4.5vh),34px)]">
        Ready to Grow Your ROOTS?
      </p>

      <h1 className="absolute left-1/2 top-[42.33%] m-0 w-[56.87%] -translate-x-1/2 -translate-y-1/2 font-['Asta_Sans',Arial,sans-serif] text-[clamp(24px,min(3.74vw,5.5vh),56.572px)] font-extrabold leading-[1.15] tracking-[-0.03em] max-md:top-[41%] max-md:w-[92%] max-md:text-[clamp(20px,min(7.2vw,5vh),42px)]">
        The Next Cohort is Forming Now
      </h1>

      <p className="absolute left-1/2 top-[52.19%] m-0 flex max-h-[13.14%] w-[42.06%] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-y-auto whitespace-pre-line font-['Inter',Arial,sans-serif] text-[clamp(14px,min(2.1vw,3.2vh),31.822px)] font-normal leading-[1.2] tracking-[-0.03em] max-md:top-[53%] max-md:w-[86%] max-md:text-[clamp(12px,min(4vw,3vh),21px)]">
        {`Spots are limited.\nSign up to reserve and register your place or to ask more about the course.`}
      </p>

      <Link
        className="absolute left-1/2 top-[59.6%] flex h-[11.33%] w-[47.5%] -translate-x-1/2 items-center justify-center rounded-[26.518px] bg-[#d9d9d9] px-[3%] font-['Asta_Sans',Arial,sans-serif] text-[clamp(26px,2.81vw,42.429px)] font-extrabold leading-[1.2] tracking-[-0.03em] text-black transition-transform hover:scale-[1.02] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white max-md:top-[64%] max-md:h-auto max-md:w-[82%] max-md:rounded-[18px] max-md:px-[5%] max-md:py-[4%] max-md:text-[clamp(22px,6vw,34px)]"
        href="/register"
      >
        Join ROOTS Quest
      </Link>
    </div>
  );
}
