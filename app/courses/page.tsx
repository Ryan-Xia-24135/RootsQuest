import Image from "next/image";
import type { Metadata } from "next";
import styles from "./courses.module.css";

export const metadata: Metadata = { title: "What ROOTS Quest Offers" };

const outcomes = [
  { title: "Process Journal", image: "/assets/process-journal.jpg", text: "A journal of how their thinking grew and changed and how their questions evolved, in any format they choose: written, drawn, or voice-recorded." },
  { title: "Lo-Fi Prototype", image: "/assets/lofi-prototype.jpg", text: "A first version of their solution in any form: a sketch, physical model, diagram, or written proposal." },
  { title: "Systems Map", image: "/assets/systems-map.jpg", text: "A diagram connecting and linking their problem to the larger system behind and around it, including causes, loops, and relationships." },
  { title: "Pitch Deck", image: "/assets/pitch-deck.jpg", text: "A short slideshow presenting their problem, research, and proposed solution to an audience of parents and peers." }
];

export default function CoursesPage() {
  return <main className={styles.main}>
    <section className={`${styles.panel} ${styles.connection}`}>
      <div className={styles.intro}><h1>The Connection Between Everything</h1><p>Within a forest, everything is connected, the ecosystem&apos;s health sits on a tightrope, yet nature manages to keep it balanced.</p></div>
      <Image className={styles.connectionImage} src="/assets/connection.jpg" alt="An autumn forest surrounding a lake and mountain" width={1470} height={980} priority />
    </section>
    <section className={`${styles.panel} ${styles.outcomes}`}>
      <h2>4 Things Every Student Walks Away With</h2>
      <div className={styles.outcomeGrid}>{outcomes.map((item) => <article className={styles.outcome} key={item.title}><Image src={item.image} alt="" width={800} height={600}/><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
    </section>
  </main>;
}
