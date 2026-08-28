import Image from "next/image";
import Link from "next/link";

const cards = [
  {
    title: "Regenerative Organic Cotton Program",
    image: "/assets/card-patagonia-image.png",
    href: "https://www.patagonia.com/our-footprint/cotton-for-change.html",
    logo: "/assets/card-patagonia-mark.png",
    logoClass: "-left-0 -top-[34px] h-[64px] w-[158px] max-md:-top-[18px] max-md:h-[36px] max-md:w-[88px]",
    wordLogo: "/assets/card-patagonia-word.png",
  },
  {
    title: "Four National Taps Water System",
    image: "/assets/card-singapore-image.png",
    href: "https://www.greenplan.gov.sg/vision/",
    logo: "/assets/card-singapore-logo.png",
    logoClass: "left-0 -top-[27px] h-[79px] w-[94px] max-md:-top-[15px] max-md:h-[44px] max-md:w-[53px]",
  },
  {
    title: "Regenerative Design for Datacenters",
    image: "/assets/card-microsoft-image.png",
    href: "https://blogs.microsoft.com/on-the-issues/2024/05/15/microsoft-environmental-sustainability-report-2024/",
    logo: "/assets/card-microsoft-logo.png",
    logoClass: "left-[7px] -top-[30px] h-[82px] w-[78px] max-md:left-[3px] max-md:-top-[16px] max-md:h-[45px] max-md:w-[43px]",
  },
  {
    title: "Regenerative Thinking as a Core Education Framework",
    image: "/assets/card-un-image.png",
    href: "https://www.unsdsn.org/news/putting-education-for-sdgs-into-practice-in-higher-education/",
    logo: "/assets/card-un-logo.png",
    logoClass: "left-0 -top-[72px] size-[143px] max-md:-top-[34px] max-md:size-[72px]",
  },
];

export default function ImportanceSectionContent() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden">
      <h1 className="absolute left-1/2 top-[max(80px,6.7%)] m-0 w-[90.08%] -translate-x-1/2 text-center font-['Asta_Sans',Arial,sans-serif] text-[clamp(36px,4.24vw,64px)] font-semibold leading-[1.2] tracking-[-0.03em] text-white max-md:top-[calc(72.45px+2%)] max-md:w-[92%] max-md:text-[clamp(24px,7vw,40px)]">
        The Importance of What<br />ROOTS Quest Offers
      </h1>

      <p className="absolute left-1/2 top-[22.4%] m-0 flex h-[9.16%] w-[65.67%] -translate-x-1/2 items-center justify-center overflow-y-auto text-center font-['Inter',Arial,sans-serif] text-[clamp(18px,2.12vw,32px)] font-medium leading-[1.2] tracking-[-0.03em] text-white max-md:top-[23%] max-md:h-[8%] max-md:w-[90%] max-md:text-[clamp(12px,3.25vw,18px)]">
        Students don’t just learn abstract ideas, ROOTS Quest introduces students to real-world concepts and usages of highly relevant topics
      </p>

      <div className="absolute left-[3.57%] right-[3.57%] top-[37.47%] grid h-[40.22%] grid-cols-4 gap-[3.17%] max-md:left-[5%] max-md:right-[5%] max-md:top-[35%] max-md:h-[47%] max-md:grid-cols-2 max-md:grid-rows-2 max-md:gap-x-[6%] max-md:gap-y-[8%]">
        {cards.map((card) => (
          <a
            className="relative min-h-0 rounded-[10px] bg-[#b6d8ee] text-[#2e5167] transition-transform hover:scale-[1.02] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white"
            href={card.href}
            target="_blank"
            rel="noreferrer"
            key={card.title}
          >
            <div className={`absolute z-10 ${card.logoClass}`}>
              <Image className="object-contain" src={card.logo} alt="" fill sizes="158px" />
            </div>

            {card.wordLogo && (
              <div className="absolute left-[24px] top-[24px] z-10 h-[21px] w-[112px] max-md:left-[12px] max-md:top-[13px] max-md:h-[12px] max-md:w-[63px]">
                <Image className="object-contain" src={card.wordLogo} alt="" fill sizes="112px" />
              </div>
            )}

            <div className="absolute left-[7.94%] top-[16.2%] h-[61.77%] w-[84.44%] overflow-hidden rounded-[10px] max-md:top-[17%] max-md:h-[60%]">
              <Image
                className={`object-cover ${card.image.includes("patagonia") ? "scale-[1.16]" : ""}`}
                src={card.image}
                alt=""
                fill
                sizes="(max-width: 768px) 38vw, 18vw"
              />
            </div>

            <span className="absolute bottom-[6.8%] right-[7.62%] block max-h-[3.6em] w-[64.76%] overflow-y-auto text-right font-['Inter',Arial,sans-serif] text-[clamp(12px,1.32vw,20px)] font-medium leading-[1.2] tracking-[-0.03em] max-md:bottom-[3%] max-md:right-[5%] max-md:w-[88%] max-md:text-[clamp(9px,2.4vw,14px)]">
              {card.title}
            </span>
          </a>
        ))}
      </div>

      <Link
        className="absolute bottom-[8.6%] left-1/2 flex h-[5.78%] w-[50.4%] -translate-x-1/2 items-center justify-center rounded-[15px] bg-[#e5c055] px-[2%] text-center font-['Inter',Arial,sans-serif] text-[clamp(18px,2.12vw,32px)] font-medium leading-[1.2] tracking-[-0.03em] text-[#1a2d39] transition-transform hover:scale-[1.02] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white max-md:bottom-[2.5%] max-md:h-auto max-md:w-auto max-md:max-w-[90%] max-md:rounded-[10px] max-md:px-[5%] max-md:py-[2.5%] max-md:text-[clamp(13px,3.5vw,19px)]"
        href="/curriculum"
      >
        More About Everything ROOTS Quest Teaches
      </Link>
    </div>
  );
}
