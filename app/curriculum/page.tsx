import type { Metadata } from "next";
import styles from "./curriculum.module.css";

export const metadata: Metadata = { title: "What ROOTS Quest Teaches" };

const systems = ["How systems actually work","Flows, Loops, and Interdependence","Where Real Change Happens","Learning Design from Nature","Degenerative vs. Sustainable vs. Regenerative"];
const skills = ["Finding and Evaluating Sources","Designing a Pitch Deck","Building a Lo-Fi Prototype","Keeping a Weekly Journal","Giving and Receiving Feedback"];

export default function CurriculumPage(){return <main className={styles.main}>
  <section className={`${styles.panel} ${styles.combined}`}>
    <h1>System Design<br/>&amp;<br/>Regenerative Thinking</h1>
    <div className={`${styles.topics} ${styles.systemTopics}`}>{systems.map((topic) => <article key={topic}>{topic}</article>)}</div>
    <h2>Technical, Scientific &amp;<br/>Research Skills</h2>
    <div className={`${styles.topics} ${styles.skillTopics}`}>{skills.map((topic) => <article key={topic}>{topic}</article>)}</div>
  </section>
  </main>}
