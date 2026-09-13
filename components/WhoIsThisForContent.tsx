"use client";

import CardSwap, { Card } from "@/components/ui/CardSwap";

const audienceCards = [
  ["Curious Minds", "You're in grades 6 to 8, ages 11 to 14, and curious about how the world actually works"],
  ["Beyond Textbooks", "You love science but feel like school only scratches the surface of what's possible"],
  ["Big Questioners", "You ask why and what if"],
  ["World Changers", "You care about people and the planet and want to do something real about it"],
  ["Self Directed", "You want to tackle a problem you actually chose, not one assigned from a textbook"],
  ["Ready for More", "You've done science fairs and school projects and you're ready for something that goes deeper"],
];

export default function WhoIsThisForContent() {
  return (
    <div className="absolute inset-x-0 bottom-0 top-[var(--nav-height)] z-10 overflow-hidden p-[clamp(14px,3vw,46px)] text-white max-sm:overflow-y-auto max-sm:p-3">
      <div className="relative mx-auto h-full max-w-[1480px] rounded-[clamp(18px,2vw,30px)] border border-white/15 bg-black/25 p-[clamp(20px,3.2vw,48px)] shadow-[0_28px_70px_rgba(0,0,0,0.32)] backdrop-blur-[3px] max-sm:min-h-[1050px]">
        <section className="relative z-20 flex h-full max-w-[44%] flex-col justify-center max-sm:h-auto max-sm:max-w-none max-sm:justify-start">
          <span className="mb-[clamp(10px,1.7vh,17px)] block h-px w-[clamp(62px,8vw,112px)] bg-[#c8a84b]" />
          <h1 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(32px,min(5vw,7.4vh),74px)] font-semibold leading-[1.04] tracking-[-0.035em]">Who is this for?</h1>
          <p className="mt-[clamp(18px,3vh,30px)] max-w-[35ch] rounded-[clamp(14px,1.5vw,22px)] border border-[#dcc1aa]/55 bg-[#b7977d]/95 px-[clamp(16px,2.3vw,34px)] py-[clamp(14px,2.2vh,24px)] font-['Inter',Arial,sans-serif] text-[clamp(13px,min(1.55vw,2.7vh),23px)] font-normal leading-[1.42] text-[#2c1f14] shadow-[0_18px_44px_rgba(0,0,0,0.24)] max-sm:text-[16px]">
            We invite you to join us and learn to see the world the way a forest works — connected, resilient, and alive.
          </p>
        </section>

        <CardSwap width="clamp(300px, 40vw, 590px)" height="clamp(230px, 29vw, 410px)" cardDistance={25} verticalDistance={31} delay={4200} pauseOnHover skewAmount={2}>
          {audienceCards.map(([title, description], index) => (
            <Card className="flex flex-col justify-between overflow-hidden rounded-[clamp(18px,2vw,30px)] border border-[#dec5b0]/70 bg-[#b7977d] p-[clamp(24px,3vw,46px)] text-[#2c1f14] shadow-[0_24px_65px_rgba(0,0,0,0.38)]" key={title}>
              <span className="font-['Inter',Arial,sans-serif] text-[clamp(11px,min(1.1vw,1.8vh),16px)] font-semibold uppercase tracking-[0.14em] opacity-60">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(25px,min(3.15vw,5.2vh),47px)] font-semibold leading-[1.06] tracking-[-0.03em]">{title}</h2>
                <p className="mb-0 mt-[clamp(12px,2vh,20px)] font-['Inter',Arial,sans-serif] text-[clamp(13px,min(1.55vw,2.55vh),23px)] font-normal leading-[1.4]">{description}</p>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </div>
  );
}
