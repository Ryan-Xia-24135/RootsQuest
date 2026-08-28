import Image from "next/image";
import Link from "next/link";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Contact", href: "/contact" },
];

export default function SiteNav() {
  return (
    <nav className="relative z-20 grid h-[var(--nav-height)] w-full grid-cols-[1fr_auto_1fr] items-center bg-black/30 px-[clamp(8px,min(2.65vw,4vh),40px)] font-['Asta_Sans',Arial,sans-serif] text-white">
      <Link
        className="relative -ml-0.5 block size-[clamp(34px,min(3.97vw,6.1vh),60px)] justify-self-start rounded-full transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        href="/"
        aria-label="ROOTS Quest home"
      >
        <Image src="/assets/roots-light-logo.png" alt="" fill sizes="60px" priority />
      </Link>

      <div className="flex items-center gap-[clamp(5px,min(1.45vw,2.3vh),22px)] whitespace-nowrap text-[clamp(10px,min(1.67vw,3.2vh),25.2px)] font-semibold leading-[1.2] tracking-[-0.03em]">
        {navigation.map((item) => (
          <Link
            className="rounded-sm transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-self-end gap-[clamp(6px,min(1.35vw,2.1vh),20px)]">
        <a
          className="relative block size-[clamp(24px,min(3.17vw,5vh),48px)] rounded-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          href="https://www.linkedin.com/in/roots-quest/"
          target="_blank"
          rel="noreferrer"
          aria-label="ROOTS Quest on LinkedIn"
        >
          <Image src="/assets/linkedin.svg" alt="" fill sizes="48px" />
        </a>
        <a
          className="relative block size-[clamp(24px,min(3.17vw,5vh),48px)] rounded-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          href="https://www.instagram.com/rootsquestyyc/"
          target="_blank"
          rel="noreferrer"
          aria-label="ROOTS Quest on Instagram"
        >
          <Image src="/assets/instagram.svg" alt="" fill sizes="48px" />
        </a>
      </div>
    </nav>
  );
}
