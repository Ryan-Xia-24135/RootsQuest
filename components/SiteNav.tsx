import Link from "next/link";
import Image from "next/image";
import styles from "./SiteNav.module.css";

export default function SiteNav() {
  return <nav className={styles.nav} aria-label="Main navigation">
    <Link className={`${styles.logoLink} ${styles.logoLeft}`} href="/" aria-label="ROOTS Quest home">
      <Image src="/assets/light-logo.png" alt="" width={1000} height={1000} priority />
    </Link>
    <div className={styles.links}>
      <Link href="/about">About us</Link>
      <Link href="/courses">Courses</Link>
      <Link href="/contact">Contact</Link>
    </div>
    <div className={styles.socials} aria-label="ROOTS Quest social media">
      <a className={styles.socialLink} href="https://www.linkedin.com/in/roots-quest/" target="_blank" rel="noreferrer" aria-label="ROOTS Quest on LinkedIn">
        <Image src="/assets/linkedin.png" alt="" width={1600} height={1600} />
      </a>
      <a className={styles.socialLink} href="https://www.instagram.com/rootsquestyyc/" target="_blank" rel="noreferrer" aria-label="ROOTS Quest on Instagram">
        <Image src="/assets/instagram.png" alt="" width={1200} height={1200} />
      </a>
    </div>
  </nav>;
}
