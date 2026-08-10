import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import styles from "./about.module.css";

export const metadata:Metadata={title:"About"};
const roots=[
  ["R","Regenerative","Thinking, planning, and designing not just to ‘make things last’ or ‘a little less bad’, but to make them actively good for the ecosystem for the future."],
  ["O","Observant","Not just seeing, but slowing down, looking closely, and finding patterns and asking questions about what other people just walk by or dismiss."],
  ["O","Organic","Looking to nature for technological answers and solving problems with assistance from nature’s billions of years of experience in designing solutions."],
  ["T","Thinking","Not just memorizing answers, but asking questions to carve out better questions. Not just asking what is right, but what is the right question to ask."],
  ["S","Systems","Understanding that everything is connected, seeing feedback loops, relationships, and how the growth of one can stifle the growth of another."]
];
export default function AboutPage(){return <main>
  <section className={`${styles.panel} ${styles.overview}`}><h1>What Truly is ROOTS Quest?</h1><p className={styles.lead}>ROOTS Quest is an 8-week project-based STEM program for students in Grades 6–8 that teaches young people to see the world differently.</p><div className={styles.facts}><span>8 Weeks</span><span>60 Minutes / Week</span><span>Project Based</span><span>Grades 6-8</span></div><Image className={styles.forest} src="/assets/about-forest.png" alt="Moss-covered forest" width={1470} height={980}/><p className={styles.body}>Rather than beginning with solutions or answers, students will first learn how to understand the systems behind the problems they care about. Through systems thinking, regenerative design, and innovation inspired by nature, they explore how people, technology, and the environment are connected and how thoughtful design can strengthen those relationships, instead of breaking them.</p></section>
  <section className={`${styles.panel} ${styles.meaning}`}><h2>What Does ROOTS Mean?</h2><div className={styles.list}>{roots.map(([letter,title,text])=><article key={title}><strong>{letter}</strong><p><b>{title}</b> - {text}</p></article>)}</div><Link className={styles.back} href="/">Back to the homepage</Link></section>
  </main>}
