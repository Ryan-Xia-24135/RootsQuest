# ROOTS Quest — v3 (multi-page)

A static multi-page site. No build step: open `index.html` or serve the folder with any static server.

```sh
python3 -m http.server 4195
```

Animation libraries (GSAP, ScrollTrigger, Lenis) load from the jsDelivr CDN. If they fail to load, or the visitor
prefers reduced motion, the site still works and the illustrations appear fully grown.

## Pages

- `index.html` — Home: what it is, how it runs, what students learn, time commitment and pilot cohort, why it matters, who it's for
- `why-it-matters.html` — the problem, regeneration beyond ecology, beyond skills, case studies in industry
- `curriculum.html` — 8-week plan, knowledge and skills, the four projects, beyond a school curriculum, FAQ
- `about.html` — what ROOTS Quest is, what ROOTS means, the team, contact
- `privacy.html` — privacy policy
- `register.html` — pure-white registration page for the pilot cohort

The nav, footer and head tags are repeated in each page (there is no template system), so a change to the nav or
footer means editing all five pages that share them.

## Files

- `css/styles.css` — all styling
- `js/main.js` — nav (hover menus, section highlight, mobile menu), local-time session line, accordions, reveal-on-scroll, YouTube embed
- `js/motion.js` — smooth scrolling (Lenis), scroll animation (GSAP), the procedurally grown forest, diagrams
- `vercel.json` — clean URLs (`/curriculum` instead of `/curriculum.html`) and redirects for old addresses
- `sitemap.xml`, `robots.txt` — for search engines
- `assets/` — background art and photos

## Things to fill in

1. **Ryan's intro video** — in `js/main.js`, set `YOUTUBE_VIDEO_ID` to the ID from the YouTube URL. The placeholder tile on the About page is replaced automatically.
2. **Team photos** — drop `ryan-xia.jpg` and `adam-wu.jpg` into `assets/`. The dashed placeholders on the About page pick them up automatically.
3. **Form destination** — `register.html` posts to a Formspree endpoint (`https://formspree.io/f/xkjnoorp`). Submissions arrive labelled "Course registration".
4. **Privacy policy** — read `privacy.html` and confirm every statement matches how you actually handle information.

## Key dates (search for these in the pages to change them)

- Registration closes — October 16
- Course starts — October 18
- Sessions — Sundays, 5:00 p.m. Mountain Time (`js/main.js` converts this to the visitor's time zone)
- Pilot cohort — 5–6 students
