import Link from "next/link";
import FoldText from "@/components/ui/FoldText";

const signupCaption = "Spots are limited.\nSign up to reserve and register your place or to ask more about the course.";

export default function SignupSectionContent() {
  return (
    <div className="absolute inset-x-0 bottom-0 top-[var(--nav-height)] z-10 flex items-center justify-center overflow-hidden px-[clamp(18px,5vw,76px)] py-[clamp(20px,5vh,52px)] text-center text-white">
      <div className="w-full max-w-[940px] rounded-[clamp(20px,2vw,32px)] border border-white/25 bg-black/20 px-[clamp(22px,6vw,88px)] py-[clamp(26px,6vh,62px)] shadow-[0_30px_90px_rgba(0,0,0,0.42)] backdrop-blur-[3px]">
        <div className="mx-auto w-fit rounded-full border border-white/20 bg-black/30 px-[clamp(14px,2.5vw,28px)] py-[clamp(7px,1.2vh,11px)] backdrop-blur-sm">
          <p className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(17px,min(2.3vw,3.7vh),35px)] font-medium leading-[1.2] tracking-[-0.03em] text-white/85">
            <FoldText text="Ready to Grow Your ROOTS?" splitBy="word" hinge="top" trigger="scroll" duration={0.55} stagger={0.045} fontSize="inherit" fontWeight={500} color="rgba(255,255,255,0.85)" style={{ lineHeight: 1.2, letterSpacing: "-0.03em" }} />
          </p>
        </div>
        <div className="mx-auto mt-[clamp(8px,1.8vh,16px)] w-fit rounded-[clamp(14px,1.5vw,22px)] border border-white/20 bg-black/25 px-[clamp(16px,3vw,34px)] py-[clamp(10px,1.8vh,18px)] backdrop-blur-sm">
          <h1 className="font-['Asta_Sans',Arial,sans-serif] text-[clamp(25px,min(4.4vw,6.2vh),66px)] font-extrabold leading-[1.08] tracking-[-0.03em]">
            <FoldText text="The Next Cohort is Forming Now" splitBy="word" hinge="top" trigger="scroll" duration={0.65} stagger={0.055} fontSize="inherit" fontWeight={800} color="#ffffff" style={{ lineHeight: 1.08, letterSpacing: "-0.03em" }} />
          </h1>
        </div>
        <div className="mx-auto my-[clamp(14px,2.8vh,26px)] h-px w-[min(320px,60%)] bg-white/35" />
        <div className="mx-auto w-fit max-w-[39ch] rounded-[clamp(12px,1.4vw,20px)] border border-white/15 bg-black/25 px-[clamp(16px,3vw,32px)] py-[clamp(10px,1.8vh,18px)] backdrop-blur-sm">
          <p className="mx-auto whitespace-pre-line font-['Inter',Arial,sans-serif] text-[clamp(12px,min(1.8vw,3vh),27px)] font-normal leading-[1.35] tracking-[-0.03em] text-white/90">
            <FoldText text={signupCaption} splitBy="line" hinge="top" trigger="scroll" duration={0.55} stagger={0.1} fontSize="inherit" fontWeight={400} color="rgba(255,255,255,0.9)" style={{ lineHeight: 1.35, letterSpacing: "-0.03em" }} />
          </p>
        </div>
        <Link
          className="mx-auto mt-[clamp(18px,4vh,36px)] flex min-h-[clamp(52px,8.5vh,84px)] w-full max-w-[640px] items-center justify-center rounded-[clamp(16px,1.8vw,26px)] border border-white/80 bg-[#d9d9d9] px-[5%] font-['Asta_Sans',Arial,sans-serif] text-[clamp(18px,min(2.7vw,4.4vh),41px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-black shadow-[0_6px_0_#8b8b8b,0_16px_38px_rgba(0,0,0,0.35)] transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_8px_0_#8b8b8b,0_22px_46px_rgba(0,0,0,0.45)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none motion-reduce:hover:transform-none"
          href="/register"
        >
          Join ROOTS Quest
        </Link>
      </div>
    </div>
  );
}
