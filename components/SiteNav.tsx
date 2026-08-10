import Link from "next/link";
import styles from "./SiteNav.module.css";

export default function SiteNav() {
  return <nav className={styles.nav} aria-label="Main navigation">
    <Link className={styles.brand} href="/">ROOTS Quest</Link>
    <div className={styles.links}>
      <Link href="/about">About us</Link>
      <Link href="/courses">Courses</Link>
      <Link href="/contact">Contact</Link>
    </div>
    <div className={styles.socials}><Link href="/contact" aria-label="LinkedIn">in</Link><Link href="/contact" aria-label="Instagram">◎</Link></div>
  </nav>;
}
