import Image from "next/image";
import Link from "next/link";
import { AnimatedTabs } from "@/components/ui/animated-tabs";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Contact", href: "/contact" },
];

export default function SiteNav() {
  return (
    <nav className="relative z-20 grid h-[var(--nav-height)] w-full grid-cols-[1fr_auto_1fr] items-center bg-black/30 px-[clamp(7px,min(1.8vw,2.6vh),27px)] font-['Asta_Sans',Arial,sans-serif] text-white">
      <Link
        className="relative -ml-0.5 block size-[clamp(25px,min(2.65vw,4.2vh),40px)] justify-self-start rounded-full transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        href="/"
        aria-label="ROOTS Quest home"
      >
        <Image src="/assets/roots-light-logo.png" alt="" fill sizes="40px" priority />
      </Link>

      <AnimatedTabs tabs={navigation} />

      <div className="flex items-center justify-self-end gap-[clamp(5px,min(0.9vw,1.5vh),14px)]">
        <Link
          className="mr-[clamp(1px,0.35vw,5px)] inline-flex h-[clamp(24px,min(2.6vw,4vh),34px)] items-center rounded-full border border-[#f6d978]/70 bg-[#e5c055] px-[clamp(8px,min(1vw,1.6vh),15px)] text-[clamp(10px,min(1.15vw,1.9vh),16px)] font-semibold leading-none text-[#183023] shadow-[0_6px_18px_rgba(0,0,0,0.22)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[#f0cf68] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          href="/register"
        >
          Register
        </Link>
        <a
          className="relative block size-[clamp(18px,min(2.12vw,3.4vh),32px)] rounded-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
          href="https://www.linkedin.com/company/roots-quest/about/"
          target="_blank"
          rel="noreferrer"
          aria-label="ROOTS Quest on LinkedIn"
        >
          <Image src="/assets/linkedin.svg" alt="" fill sizes="32px" />
        </a>
        <a
          className="relative block size-[clamp(18px,min(2.12vw,3.4vh),32px)] rounded-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
          href="https://www.instagram.com/rootsquestorg/"
          target="_blank"
          rel="noreferrer"
          aria-label="ROOTS Quest on Instagram"
        >
          <Image src="/assets/instagram.svg" alt="" fill sizes="32px" />
        </a>
      </div>
    </nav>
  );
}
