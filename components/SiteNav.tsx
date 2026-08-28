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
    <nav className="relative z-20 grid h-[72.45px] w-full grid-cols-[1fr_auto_1fr] items-center bg-black/30 px-[clamp(10px,2.65vw,40px)] font-['Asta_Sans',Arial,sans-serif] text-white">
      <Link
        className="relative -ml-0.5 block size-[clamp(44px,3.97vw,60px)] justify-self-start rounded-full transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        href="/"
        aria-label="ROOTS Quest home"
      >
        <Image src="/assets/roots-light-logo.png" alt="" fill sizes="60px" priority />
      </Link>

      <div className="flex items-center gap-[clamp(6px,1.45vw,22px)] whitespace-nowrap text-[clamp(11px,1.67vw,25.2px)] font-semibold leading-[1.2] tracking-[-0.03em]">
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

      <div className="flex justify-self-end items-center gap-[clamp(8px,1.35vw,20px)]">
        <a
          className="relative block size-[clamp(27px,3.17vw,48px)] rounded-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          href="https://www.linkedin.com/in/roots-quest/"
          target="_blank"
          rel="noreferrer"
          aria-label="ROOTS Quest on LinkedIn"
        >
          <Image src="/assets/linkedin.svg" alt="" fill sizes="48px" />
        </a>
        <a
          className="relative block size-[clamp(27px,3.17vw,48px)] rounded-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
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
