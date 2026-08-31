"use client";

import { Mail, Send } from "lucide-react";
import { type FormEvent, useState } from "react";

const contactEmail = "ryanzihengxia@gmail.com";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent("ROOTS Quest website enquiry");
    const body = encodeURIComponent(`Reply-to email: ${email}\n\n${message}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-3xl border border-white/20 bg-black/75 text-white shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-md lg:grid-cols-[0.85fr_1.15fr]">
      <div className="flex flex-col justify-between border-b border-white/15 p-[clamp(28px,5vw,64px)] lg:border-b-0 lg:border-r">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/55">Contact ROOTS Quest</p>
          <h1 className="mt-5 text-[clamp(34px,5vw,64px)] font-semibold leading-[0.98] tracking-[-0.045em]">Let&apos;s start a conversation.</h1>
          <p className="mt-6 max-w-md text-[clamp(15px,1.5vw,18px)] leading-7 text-white/65">
            Ask about the course, an upcoming cohort, accessibility, or anything else you would like to know.
          </p>
        </div>

        <a className="mt-10 inline-flex w-fit items-center gap-3 text-sm text-white underline decoration-white/35 underline-offset-4 transition hover:decoration-white" href={`mailto:${contactEmail}`}>
          <Mail className="size-4" aria-hidden="true" />
          {contactEmail}
        </a>
      </div>

      <form className="p-[clamp(28px,5vw,64px)]" onSubmit={sendEmail}>
        <div>
          <label className="block text-sm font-medium" htmlFor="contact-email">Your email</label>
          <input
            id="contact-email"
            className="mt-2 w-full rounded-xl border border-white/25 bg-white px-4 py-3.5 text-black outline-none transition placeholder:text-black/40 focus:border-white focus:ring-4 focus:ring-white/15"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="mt-7">
          <label className="block text-sm font-medium" htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            className="mt-2 min-h-48 w-full resize-y rounded-xl border border-white/25 bg-white px-4 py-3.5 text-black outline-none transition placeholder:text-black/40 focus:border-white focus:ring-4 focus:ring-white/15"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="How can I help?"
            required
          />
        </div>

        <button className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white bg-white px-6 py-3.5 font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white" type="submit">
          Write email <Send className="size-4" aria-hidden="true" />
        </button>
        <p className="mt-3 text-center text-xs leading-5 text-white/45">This opens your default email application with the message ready to send.</p>
      </form>
    </section>
  );
}
