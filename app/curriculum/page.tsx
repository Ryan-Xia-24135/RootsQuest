import type { Metadata } from "next";
import styles from "./curriculum.module.css";

export const metadata: Metadata = { title: "What ROOTS Quest Teaches" };

const systems = ["How systems actually work","Flows, Loops, and Interdependence","Where Real Change Happens","Learning Design from Nature","Degenerative vs. Sustainable vs. Regenerative"];
const skills = ["Finding and Evaluating Sources","Designing a Pitch Deck","Building a Lo-Fi Prototype","Keeping a Weekly Journal","Giving and Receiving Feedback"];

function TopicPanel({ title, topics, className }: { title: string; topics: string[]; className: string }) {
  return <section className={`${styles.panel} ${className}`}><h1>{title}</h1><div className={styles.topics}>{topics.map((topic, index) => <article style={{"--topic-index": index} as React.CSSProperties} key={topic}>{topic}</article>)}</div></section>;
}

export default function CurriculumPage(){return <main className={styles.main}>
  <TopicPanel title="System Design & Regenerative Thinking" topics={systems} className={styles.systems}/>
  <TopicPanel title="Technical, Scientific & Research Skills" topics={skills} className={styles.skills}/>
  </main>}
