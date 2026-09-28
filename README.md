# ROOTS Quest — v2 (single-page)

A static one-page port of the original Next.js site. No build step: open `index.html`
or serve the folder with any static server.

```sh
python3 -m http.server 4195
```

## Files

- `index.html` — the full one-page flow (hero → about → the problem → courses → who is this for → instructor → real world → sign-up → contact)
- `register.html` — pure-white registration page (course registration or webinar sign-up)
- `css/styles.css` — all styling (same palette, type and card language as v1)
- `js/main.js` — sticky nav scroll-spy, mobile menu, accordions, reveal-on-scroll, YouTube embed
- `assets/` — background art and photos carried over from v1 (photos converted to JPG)

## Three things to fill in

1. **Ryan's intro video** — in `js/main.js`, set `YOUTUBE_VIDEO_ID` to the ID from the YouTube URL. The placeholder tile is replaced automatically.
2. **Ryan's photo** — drop `ryan-xia.jpg` into `assets/`. The dashed placeholder in "Meet your teacher" picks it up automatically.
3. **Form destination** — `register.html` posts to the same Formspree endpoint as v1 (`https://formspree.io/f/xkjnoorp`). Submissions arrive labelled "Course registration" or "Webinar signup".

## Key dates (edit in `index.html` and `register.html`)

- Webinar — October 11
- Registration closes — October 16
- Course starts — October 18
