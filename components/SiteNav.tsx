import Image from "next/image";
import Link from "next/link";
import { AnimatedTabs } from "@/components/ui/animated-tabs";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Contact", href: "/contact" },
  { label: "Register", href: "/register" },
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
        <a
          className="relative block size-[clamp(18px,min(2.12vw,3.4vh),32px)] rounded-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
          href="https://www.linkedin.com/in/roots-quest/"
          target="_blank"
          rel="noreferrer"
          aria-label="ROOTS Quest on LinkedIn"
        >
          <Image src="/assets/linkedin.svg" alt="" fill sizes="32px" />
        </a>
        <a
          className="relative block size-[clamp(18px,min(2.12vw,3.4vh),32px)] rounded-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
          href="https://www.instagram.com/rootsquestyyc/"
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
