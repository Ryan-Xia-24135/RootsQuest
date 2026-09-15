import { BookOpenText, CircleHelp, Compass, Earth, Rocket, Telescope } from "lucide-react";
import StatisticsCard2 from "@/components/ui/statistics-card-2";

const audienceCards = [
  { title: "Curious Minds", description: "You're in grades 6 to 8, ages 11 to 14, and curious about how the world actually works", icon: Telescope },
  { title: "Beyond Textbooks", description: "You love science but feel like school only scratches the surface of what's possible", icon: BookOpenText },
  { title: "Big Questioners", description: "You ask why and what if", icon: CircleHelp },
  { title: "World Changers", description: "You care about people and the planet and want to do something real about it", icon: Earth },
  { title: "Self Directed", description: "You want to tackle a problem you actually chose, not one assigned from a textbook", icon: Compass },
  { title: "Ready for More", description: "You've done science fairs and school projects and you're ready for something that goes deeper", icon: Rocket },
];

export default function WhoIsThisForContent() {
  return (
    <div className="absolute inset-x-0 bottom-0 top-[var(--nav-height)] z-10 overflow-hidden p-[clamp(14px,3vw,46px)] text-white max-sm:p-3">
      <div className="mx-auto flex h-full max-w-[1480px] min-h-0 flex-col rounded-[clamp(18px,2vw,30px)] border border-white/15 bg-black/25 p-[clamp(16px,2.6vw,38px)] shadow-[0_28px_70px_rgba(0,0,0,0.32)] backdrop-blur-[3px] max-sm:justify-center max-sm:p-3">
        <header className="grid shrink-0 grid-cols-[0.72fr_1.28fr] items-end gap-[clamp(14px,3vw,46px)] max-sm:grid-cols-1 max-sm:items-start max-sm:gap-2.5">
          <div>
            <span className="mb-[clamp(8px,1.4vh,14px)] block h-px w-[clamp(62px,8vw,112px)] bg-[#c8a84b]" />
            <h1 className="m-0 font-['Asta_Sans',Arial,sans-serif] text-[clamp(28px,min(4.2vw,6vh),63px)] font-semibold leading-[1.04] tracking-[-0.035em] max-sm:text-[clamp(24px,7.5vw,32px)] portrait:text-[clamp(30px,9vw,42px)] portrait:font-bold">Who is this for?</h1>
          </div>
          <p className="m-0 rounded-[clamp(12px,1.3vw,20px)] border border-[#dcc1aa]/55 bg-[#b7977d]/95 px-[clamp(14px,2vw,30px)] py-[clamp(10px,1.7vh,17px)] font-['Inter',Arial,sans-serif] text-[clamp(11px,min(1.3vw,2.1vh),19px)] font-normal leading-[1.38] text-[#2c1f14] shadow-[0_14px_34px_rgba(0,0,0,0.22)] max-sm:text-[14px] max-sm:leading-[1.35] portrait:text-[16px] portrait:leading-[1.4]">
            We invite you to join us and learn to see the world the way a forest works — connected, resilient, and alive.
          </p>
        </header>

        <StatisticsCard2 className="mt-[clamp(12px,2.4vh,24px)] min-h-0 flex-1 max-sm:mt-3 max-sm:flex-none" items={audienceCards} />
      </div>
    </div>
  );
}
