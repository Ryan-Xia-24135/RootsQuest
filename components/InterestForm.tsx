"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

type FieldType = "text" | "email" | "tel" | "select" | "single" | "multi" | "yesno" | "textarea" | "scale";
type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: string[];
  lowLabel?: string;
  highLabel?: string;
};
type Answer = string | string[];

const pages: { title: string; description: string; fields: Field[] }[] = [
  {
    title: "About you",
    description: "Tell us a little about who you are.",
    fields: [
      { name: "student_name", label: "What is your first and last name?", type: "text", required: true },
      { name: "grade", label: "What grade are you currently in?", type: "single", options: ["Grade 6", "Grade 7", "Grade 8", "Entering Grade 6", "Entering Grade 7", "Entering Grade 8"], required: true },
      { name: "age", label: "How old are you?", type: "select", options: ["10", "11", "12", "13", "14", "15"], required: true },
      { name: "city", label: "What city or town do you live in?", type: "text", required: true },
      { name: "student_email", label: "What is your email address?", type: "email", required: true },
    ],
  },
  {
    title: "Parent or guardian",
    description: "We need an adult contact before the course begins.",
    fields: [
      { name: "guardian_name", label: "Parent or guardian full name", type: "text", required: true },
      { name: "guardian_email", label: "Parent or guardian email", type: "email", required: true },
      { name: "guardian_phone", label: "Best phone number to reach them", type: "tel" },
      { name: "guardian_consent", label: "Does your parent or guardian consent to you joining?", type: "yesno", required: true },
    ],
  },
  {
    title: "Availability",
    description: "Help us understand how the course could fit your schedule.",
    fields: [
      { name: "technology_access", label: "Do you have a device and stable internet for weekly Zoom sessions?", type: "single", options: ["Yes, I have both", "I have a device but limited internet", "Not sure", "No, I need support"], required: true },
      { name: "weekly_availability", label: "Are you available for one hour per week for 8 weeks?", type: "single", options: ["Yes", "Mostly, but may miss one or two", "Not sure yet"], required: true },
      { name: "preferred_times", label: "Which days and times work best?", type: "multi", options: ["Weekday afternoons", "Weekday evenings", "Saturday mornings", "Saturday afternoons", "Sunday mornings", "Sunday afternoons"], required: true },
      { name: "referral_source", label: "How did you hear about ROOTS Quest?", type: "single", options: ["A friend or classmate", "A parent or family member", "A teacher or school", "Instagram or social media", "LinkedIn", "Google search", "A community event", "Other"], required: true },
    ],
  },
  {
    title: "Background",
    description: "There is no required experience—we simply want to know what you enjoy.",
    fields: [
      { name: "favourite_subjects", label: "Which subjects do you enjoy most?", type: "multi", options: ["Science", "Math", "Technology", "Engineering or design", "English or writing", "Social studies", "Art", "All of them"], required: true },
      { name: "outside_stem", label: "Have you done STEM activities outside of school?", type: "yesno", required: true },
      { name: "outside_stem_details", label: "If yes, what did you do and what did you enjoy?", type: "textarea" },
      { name: "independent_comfort", label: "How comfortable are you working independently?", type: "scale", lowLabel: "I need a lot of guidance", highLabel: "I love figuring things out myself", required: true },
    ],
  },
  {
    title: "Passion questions",
    description: "There are no perfect answers. We want to hear how you think.",
    fields: [
      { name: "world_problem", label: "Is there a problem in the world you think about a lot and wish someone would fix? What is it and why does it matter to you?", type: "textarea", required: true },
      { name: "nature_observation", label: "Have you ever noticed something in nature that made you stop and think? What was it and what did it make you wonder?", type: "textarea", required: true },
      { name: "design_idea", label: "If you could design anything that made your community or the environment better, what would it be and why?", type: "textarea", required: true },
    ],
  },
  {
    title: "Anything else",
    description: "Share anything that would help us support you well.",
    fields: [
      { name: "participation_notes", label: "Is there anything else we should know about you, your learning style, or anything that might affect your participation?", type: "textarea" },
      { name: "student_questions", label: "Do you have any questions for us before the course begins?", type: "textarea" },
    ],
  },
];

const fieldClass = "w-full rounded-lg border border-[#74C69D]/45 bg-[#0D2B1F] px-4 py-3 font-['Lora',Georgia,serif] text-[15px] text-[#E8F5EE] outline-none transition placeholder:text-[#A8CABB]/60 focus:border-[#74C69D] focus:ring-2 focus:ring-[#74C69D]/25";
const pillClass = "rounded-full border border-[#74C69D]/70 px-4 py-2.5 text-left font-['Lora',Georgia,serif] text-sm transition hover:border-[#C8A84B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8A84B]";
const storageKey = "roots-quest-interest-draft";
const formspreeEndpoint = "https://formspree.io/f/xkjnoorp";
const formspreeFields: Record<string, string> = {
  student_name: "Student Name",
  grade: "Grade",
  age: "Age",
  city: "City or Town",
  student_email: "Student Email",
  guardian_name: "Guardian Name",
  guardian_email: "Guardian Email",
  guardian_phone: "Guardian Phone",
  guardian_consent: "Guardian Consent",
  technology_access: "Technology Access",
  weekly_availability: "Weekly Availability",
  preferred_times: "Preferred Times",
  referral_source: "Referral Source",
  favourite_subjects: "Favourite Subjects",
  outside_stem: "Outside STEM Activities",
  outside_stem_details: "Outside STEM Details",
  independent_comfort: "Independent Work Comfort",
  world_problem: "World Problem",
  nature_observation: "Nature Observation",
  design_idea: "Design Idea",
  participation_notes: "Participation Notes",
  student_questions: "Student Questions",
};

export default function InterestForm() {
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setAnswers(JSON.parse(saved));
    } catch {
      localStorage.removeItem(storageKey);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded || submitted) return;
    const timer = window.setTimeout(() => localStorage.setItem(storageKey, JSON.stringify(answers)), 250);
    return () => window.clearTimeout(timer);
  }, [answers, loaded, submitted]);

  const setAnswer = (name: string, value: Answer) => {
    setAnswers((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const toggleAnswer = (name: string, value: string) => {
    const selected = Array.isArray(answers[name]) ? answers[name] as string[] : [];
    setAnswer(name, selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]);
  };

  const validatePage = () => {
    const nextErrors: Record<string, string> = {};
    for (const field of pages[page].fields) {
      const answer = answers[field.name];
      const empty = Array.isArray(answer) ? answer.length === 0 : !String(answer ?? "").trim();
      if (field.required && empty) nextErrors[field.name] = "Please answer this question before continuing.";
      if (field.type === "email" && !empty && !/^\S+@\S+\.\S+$/.test(String(answer))) nextErrors[field.name] = "Please enter a valid email address.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const nextPage = () => {
    if (!validatePage()) return;
    setPage((current) => Math.min(pages.length - 1, current + 1));
  };

  const submit = async () => {
    if (!validatePage() || sending) return;
    setSending(true);
    setSubmitError("");

    try {
      const submission = Object.fromEntries(
        Object.entries(answers).map(([name, value]) => [
          formspreeFields[name] ?? name,
          Array.isArray(value) ? value.join(", ") : value,
        ]),
      );

      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...submission,
          email: String(answers.guardian_email ?? answers.student_email ?? ""),
          _subject: "New ROOTS Quest interest form submission",
        }),
      });
      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.errors?.[0]?.message ?? "Submission failed");
      }
      localStorage.removeItem(storageKey);
      setSubmitted(true);
    } catch {
      setSubmitError("We couldn't send your form. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <section className="mx-auto flex w-full max-w-[720px] flex-col items-center rounded-2xl border border-[#74C69D]/45 bg-[#163A28] px-6 py-14 text-center text-[#E8F5EE] shadow-[0_28px_80px_rgba(13,43,31,0.55)]">
        <span className="flex size-14 items-center justify-center rounded-full bg-[#74C69D] text-[#0D2B1F]"><Check className="size-7" /></span>
        <h1 className="mt-6 font-['Fraunces',Georgia,serif] text-3xl font-bold tracking-[-0.03em]">Thanks for your interest in ROOTS Quest.</h1>
        <p className="mt-3 max-w-[48ch] leading-7 text-[#A8CABB]">We will review your answers and be in touch before the cohort begins.</p>
      </section>
    );
  }

  const current = pages[page];
  const progress = ((page + 1) / pages.length) * 100;

  return (
    <form onSubmit={(event) => event.preventDefault()} className="mx-auto w-full max-w-[920px] rounded-2xl border border-[#74C69D]/35 bg-[#163A28] p-[clamp(20px,4vw,44px)] text-[#E8F5EE] shadow-[0_28px_80px_rgba(13,43,31,0.62)]">
      <div className="h-2 overflow-hidden rounded-full bg-[#0D2B1F]" aria-label={`Form progress: page ${page + 1} of ${pages.length}`}>
        <motion.div className="h-full rounded-full bg-[#C8A84B]" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
      </div>
      <p className="mt-3 text-sm text-[#A8CABB]">Page {page + 1} of {pages.length}</p>

      <AnimatePresence mode="wait">
        <motion.section key={page} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.2 }}>
          <h1 className="mt-5 font-['Fraunces',Georgia,serif] text-[clamp(28px,4vw,44px)] font-bold leading-tight tracking-[-0.03em]">{current.title}</h1>
          <p className="mt-2 text-[#A8CABB]">{current.description}</p>

          <div className="mt-8 space-y-7">
            {current.fields.map((field) => {
              const answer = answers[field.name];
              const options = field.options ?? [];
              return (
                <fieldset key={field.name} className="min-w-0">
                  <legend className="mb-3 block text-[15px] leading-6 text-[#E8F5EE]">{field.label}{field.required && <span className="ml-1 text-[#C8A84B]" aria-hidden="true">*</span>}</legend>

                  {(["text", "email", "tel"] as FieldType[]).includes(field.type) && (
                    <input className={fieldClass} type={field.type} name={field.name} value={String(answer ?? "")} onChange={(event) => setAnswer(field.name, event.target.value)} autoComplete={field.type === "email" ? "email" : "off"} />
                  )}
                  {field.type === "textarea" && (
                    <textarea className={`${fieldClass} min-h-[130px] resize-y`} name={field.name} value={String(answer ?? "")} onChange={(event) => setAnswer(field.name, event.target.value)} />
                  )}
                  {field.type === "select" && (
                    <select className={fieldClass} name={field.name} value={String(answer ?? "")} onChange={(event) => setAnswer(field.name, event.target.value)}>
                      <option value="">Select an option</option>
                      {options.map((option) => <option value={option} key={option}>{option}</option>)}
                    </select>
                  )}
                  {(field.type === "single" || field.type === "multi") && (
                    <div className="flex flex-wrap gap-2.5">
                      {options.map((option) => {
                        const selected = field.type === "multi" ? Array.isArray(answer) && answer.includes(option) : answer === option;
                        return <button className={`${pillClass} ${selected ? "border-[#74C69D] bg-[#74C69D] text-[#0D2B1F]" : "bg-transparent text-[#E8F5EE]"}`} type="button" onClick={() => field.type === "multi" ? toggleAnswer(field.name, option) : setAnswer(field.name, option)} aria-pressed={selected} key={option}>{option}</button>;
                      })}
                    </div>
                  )}
                  {field.type === "yesno" && (
                    <div className="grid max-w-[420px] grid-cols-2 gap-3">
                      {["Yes", "No"].map((option) => <button className={`${pillClass} text-center ${answer === option ? "border-[#74C69D] bg-[#74C69D] text-[#0D2B1F]" : "bg-transparent text-[#E8F5EE]"}`} type="button" onClick={() => setAnswer(field.name, option)} aria-pressed={answer === option} key={option}>{option}</button>)}
                    </div>
                  )}
                  {field.type === "scale" && (
                    <div>
                      <div className="flex max-w-[520px] justify-between gap-2">
                        {["1", "2", "3", "4", "5"].map((option) => <button className={`flex size-[clamp(42px,7vw,56px)] items-center justify-center rounded-full border border-[#74C69D] transition ${answer === option ? "bg-[#74C69D] text-[#0D2B1F]" : "bg-transparent text-[#E8F5EE]"}`} type="button" onClick={() => setAnswer(field.name, option)} aria-pressed={answer === option} key={option}>{option}</button>)}
                      </div>
                      <div className="mt-2 flex max-w-[520px] justify-between gap-5 text-xs leading-4 text-[#A8CABB]"><span>{field.lowLabel}</span><span className="text-right">{field.highLabel}</span></div>
                    </div>
                  )}

                  {errors[field.name] && <p className="mt-2 w-fit rounded-md border border-[#F09595]/40 bg-[#0D2B1F] px-2.5 py-1 text-sm text-[#F09595]" role="alert">{errors[field.name]}</p>}
                </fieldset>
              );
            })}
          </div>
        </motion.section>
      </AnimatePresence>

      {submitError && <p className="mt-6 rounded-lg border border-[#F09595] bg-[#0D2B1F] p-3 text-sm text-[#F09595]" role="alert">{submitError}</p>}
      <div className="mt-9 flex flex-wrap justify-between gap-3">
        {page > 0 ? <button className="rounded-full border border-[#74C69D] bg-transparent px-6 py-3 text-[#E8F5EE] transition hover:bg-[#74C69D]/10" type="button" onClick={() => { setErrors({}); setPage((currentPage) => currentPage - 1); }}>Back</button> : <span />}
        {page < pages.length - 1 ? (
          <button className="rounded-full border border-[#E8F5EE]/35 bg-[#C8A84B] px-7 py-3 text-[#0D2B1F] transition hover:scale-[1.02] hover:bg-[#d6b95e]" type="button" onClick={nextPage}>Next</button>
        ) : (
          <button className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full border border-[#E8F5EE]/35 bg-[#C8A84B] px-7 py-3 text-[#0D2B1F] transition hover:scale-[1.02] hover:bg-[#d6b95e] disabled:cursor-wait disabled:opacity-70" type="button" onClick={submit} disabled={sending}>
            {sending && <LoaderCircle className="size-5 animate-spin" />} {sending ? "Sending…" : "Submit my interest"}
          </button>
        )}
      </div>
    </form>
  );
}
