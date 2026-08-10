import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const cards = [
  {title:"Regenerative Organic Cotton Program",image:"/assets/patagonia.jpg",logo:"/assets/patagonia-logo.png",href:"https://www.patagonia.com/our-footprint/cotton-for-change.html"},
  {title:"Four National Taps Water System",image:"/assets/singapore.jpg",logo:"/assets/singapore-logo.png",href:"https://www.greenplan.gov.sg/vision/"},
  {title:"Regenerative Design for Datacenters",image:"/assets/microsoft.jpg",logo:"/assets/microsoft-logo.png",href:"https://blogs.microsoft.com/on-the-issues/2024/05/15/microsoft-environmental-sustainability-report-2024/"},
  {title:"Regenerative Thinking as a Core Education Framework",image:"/assets/un.jpg",logo:"/assets/un-logo.png",href:"https://www.unsdsn.org/news/putting-education-for-sdgs-into-practice-in-higher-education/"}
];

export default function HomePage(){return <main>
  <section className={`${styles.panel} ${styles.hero}`}><div className={styles.heroCopy}><h1>ROOTS Quest</h1><p>Regenerative, Organic, Observant based Thinking in Systems</p><Link className={styles.button} href="/register">Join ROOTS Quest</Link></div></section>
  <section className={`${styles.panel} ${styles.about}`}>
    <h2>Where curious, young minds learn to<br/>‘think like a forest’</h2>
    <Image className={`${styles.photo} ${styles.student}`} src="/assets/student.jpg" alt="A student writing in a forest" width={1459} height={986}/>
    <Image className={`${styles.photo} ${styles.roots}`} src="/assets/roots.jpg" alt="A tree with visible roots" width={735} height={980}/>
    <p className={`${styles.callout} ${styles.aboutCopy}`}>It empowers students ages 11-14 in grades 6-8 to understand problems and ask questions with consideration of the entire system, every angle and scale, and how it supports life on earth.</p>
    <Link className={`${styles.button} ${styles.aboutButton}`} href="/about">Learn More About ROOTS Quest</Link>
  </section>
  <section className={`${styles.panel} ${styles.courses}`}>
    <Image className={`${styles.photo} ${styles.web}`} src="/assets/web.jpg" alt="A spider web" width={1470} height={980}/>
    <div className={styles.courseCopy}><h2>Beyond a School Curriculum and Science Project</h2><p>Students won’t just learn about the problems they’re interested in, they’ll learn what the system is behind the problem, the connections that relate to that problem, and designing what is their next step with this new understanding.</p></div>
    <p className={`${styles.callout} ${styles.courseCallout}`}>In the span of this 8 week course for students in grades 6-8 that teaches systems thinking, regenerative design, and nature-inspired problem solving in STEM.</p>
    <Image className={`${styles.photo} ${styles.pinecones}`} src="/assets/pinecones.jpg" alt="Hands holding pine cones" width={1472} height={980}/>
    <Link className={`${styles.button} ${styles.courseButton}`} href="/courses">More of What ROOTS Quest Offers</Link>
  </section>
  <section className={`${styles.panel} ${styles.importance}`}>
    <h2>The Importance of What<br/>ROOTS Quest Offers</h2><p className={styles.intro}>Students don’t just learn abstract ideas, ROOTS Quest introduces students to real-world concepts and usages of highly relevant topics</p>
    <div className={styles.cards}>{cards.map(card=><a className={styles.card} href={card.href} target="_blank" rel="noreferrer" key={card.title}><Image className={styles.logo} src={card.logo} alt="" width={120} height={80}/><Image className={styles.cardPhoto} src={card.image} alt="" width={800} height={534}/><span>{card.title}</span></a>)}</div>
    <Link className={`${styles.button} ${styles.importanceButton}`} href="/curriculum">More About Everything ROOTS Quest Teaches</Link>
  </section>
  <section className={`${styles.panel} ${styles.contact}`}><div className={styles.contactCopy}><p>Ready to Grow Your ROOTS?</p><h2>The Next Cohort is Forming Now</h2><p>Spots are limited.<br/>Sign up to reserve and register your place or to ask more about the course.</p><Link className={`${styles.button} ${styles.join}`} href="/register">Join ROOTS Quest</Link></div></section>
  </main>}
