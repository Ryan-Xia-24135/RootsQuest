import Link from "next/link";
import { goldButtonEffect } from "@/components/goldButtonEffect";

export default function HeroSectionContent() {
  return (
    <div className="absolute inset-x-0 bottom-0 top-[var(--nav-height)] z-10 flex items-center justify-center overflow-hidden px-[clamp(18px,5vw,76px)] py-[clamp(20px,5vh,52px)] text-center">
      <div className="flex w-full max-w-[1040px] flex-col items-center rounded-[clamp(20px,2vw,32px)] border border-white/20 bg-black/20 px-[clamp(20px,6vw,90px)] py-[clamp(28px,7vh,72px)] shadow-[0_28px_80px_rgba(0,0,0,0.3)] backdrop-blur-[2px]">
        <span className="mb-[clamp(10px,2vh,18px)] h-px w-[clamp(70px,9vw,130px)] bg-white/60" />
        <h1 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(34px,min(6.67vw,10vh),100.8px)] font-semibold leading-[1.08] tracking-[-0.03em] text-white [text-shadow:0_4.2px_4.2px_rgba(0,0,0,0.25)]">
          ROOTS Quest
        </h1>
        <p className="mt-[clamp(8px,1.8vh,16px)] max-w-[44ch] font-['Asta_Sans',Arial,sans-serif] text-[clamp(13px,min(2.1vw,3.6vh),31px)] font-medium leading-[1.3] tracking-[-0.03em] text-white">
          Regenerative, Organic, Observant based Thinking in Systems
        </p>
        <Link
          className={`mt-[clamp(18px,4vh,38px)] inline-flex min-h-[clamp(44px,7vh,72px)] items-center justify-center rounded-[20px] bg-[#c8a84b] px-[clamp(26px,4vw,58px)] font-['Asta_Sans',Arial,sans-serif] text-[clamp(14px,min(1.73vw,3vh),26px)] font-extrabold leading-none tracking-[-0.03em] text-[#1e1e1e] ${goldButtonEffect}`}
          href="/register"
        >
          Join ROOTS Quest
        </Link>
      </div>
    </div>
  );
}
