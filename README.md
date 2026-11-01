# ROOTS Quest website

A static site. **All the wording lives in one file: [`content.txt`](content.txt).**

## Changing the wording (no code involved)

1. Open `content.txt` (on GitHub: click the file, then the pencil icon).
2. Press Cmd+F, find the sentence, and change only the words **after the colon**.
3. Commit the change. The site rebuilds and updates in about a minute.

Dates and the contact email are set once at the top (`start_date`, `end_date`, `homework_minutes`, `email`)
and update everywhere. The file explains the few formatting rules at the top.

If a line is broken (a deleted line, a missing colon, a typo before the colon), the build **stops with a
message naming the line** and the live site stays exactly as it was.

## How it fits together

| Folder / file | What it is | Touch it? |
|---|---|---|
| `content.txt` | all the text | **yes, this is the one** |
| `src/pages/*.html` | page layouts (no wording) | only to change layout |
| `src/partials/` | shared menu and footer | only to change layout |
| `css/`, `js/`, `assets/` | styling, scripts, images | only to change design |
| `tools/build.js` | stitches text into the layouts, writes `dist/` | no |
| `tools/make-*.py` | regenerate the background textures and dithered photos | rarely |
| `dist/` | the built site (generated, not stored in git) | never |

Vercel runs `node tools/build.js` on every push (see `vercel.json`) and serves `dist/`.

## Preview on your computer

```sh
node tools/build.js && python3 -m http.server 4195 --directory dist
# then open http://localhost:4195
node tools/build.js --check     # just check content.txt, write nothing
```

## Not in content.txt

Text inside the registration form's script (such as "Sending…") and the `<!-- VERIFY -->` notes in
`src/pages/curriculum.html` are part of the code. Ask for those to be changed.
