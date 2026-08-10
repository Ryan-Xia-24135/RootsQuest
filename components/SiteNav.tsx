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
    <Link className={`${styles.logoLink} ${styles.logoRight}`} href="/" aria-label="ROOTS Quest home">
      <Image src="/assets/light-logo.png" alt="" width={1000} height={1000} priority />
    </Link>
  </nav>;
}
