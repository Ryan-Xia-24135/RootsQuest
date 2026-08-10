import type { ReactNode } from "react";
import styles from "./InteriorPage.module.css";
export default function InteriorPage({eyebrow,title,children}:{eyebrow:string;title:string;children:ReactNode}){return <main className={styles.main}><section className={styles.card}><p className={styles.eyebrow}>{eyebrow}</p><h1>{title}</h1>{children}</section></main>}
