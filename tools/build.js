#!/usr/bin/env node
/* Builds the website into dist/ from:
 *   content.txt        all the wording (this is the file you edit)
 *   src/pages/*.html   page layouts (no wording)
 *   src/partials/*.html shared menu + footer
 * Static files (assets, css, js, robots.txt, sitemap.xml) are copied across unchanged.
 *
 * If anything is wrong (a missing key, a typo in content.txt, ...) this exits with an
 * error message BEFORE writing anything, so the live site is never left half-broken.
 *
 *   node tools/build.js            build once
 *   node tools/build.js --check    only check content.txt, write nothing
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const CHECK_ONLY = process.argv.includes('--check');

// page file -> id used by the menu to mark the current page
const CURRENT = { 'index': 'home', 'why-it-matters': 'why', 'curriculum': 'curriculum', 'about': 'about' };

const problems = [];
const fail = (msg) => problems.push(msg);

// ---------------------------------------------------------------- content.txt
function parseContent(text) {
  const out = {};
  text.split(/\r?\n/).forEach((line, i) => {
    if (!line.trim() || line.trim().startsWith('#')) return;
    const m = line.match(/^([A-Za-z0-9_.\-]+)\s*:\s?(.*)$/);
    if (!m) { fail(`content.txt line ${i + 1}: expected  key: text  but found: "${line.slice(0, 70)}"`); return; }
    if (Object.prototype.hasOwnProperty.call(out, m[1])) { fail(`content.txt line ${i + 1}: "${m[1]}" appears twice`); return; }
    out[m[1]] = m[2].replace(/^[ \t]+|[ \t\r]+$/g, '');
  });
  return out;
}

const content = parseContent(fs.readFileSync(path.join(ROOT, 'content.txt'), 'utf8'));
const used = new Set();

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => esc(s).replace(/"/g, '&quot;');

function setting(name, where) {
  if (!Object.prototype.hasOwnProperty.call(content, name)) { fail(`${where}: unknown {${name}}. Define it near the top of content.txt`); return ''; }
  used.add(name);
  return content[name];
}

// text with **bold**, *italic* and {settings}
function renderText(raw, where) {
  let out = '', i = 0, m;
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\{([A-Za-z0-9_]+)\}/g;
  while ((m = re.exec(raw))) {
    out += esc(raw.slice(i, m.index));
    if (m[1] !== undefined) out += '<b>' + renderText(m[1], where) + '</b>';
    else if (m[2] !== undefined) out += '<i>' + renderText(m[2], where) + '</i>';
    else {
      const v = setting(m[3], where);
      out += /^\[.*\]$/.test(v) ? `<span class="ph">${esc(v)}</span>` : esc(v);   // [bracketed] values show as placeholders
    }
    i = re.lastIndex;
  }
  return out + esc(raw.slice(i));
}
// plain text for attribute values: only {settings}
function renderAttr(raw, where) {
  return escAttr(raw.replace(/\{([A-Za-z0-9_]+)\}/g, (_, n) => setting(n, where)));
}

// ---------------------------------------------------------------- templates
const partials = {};
for (const f of fs.readdirSync(path.join(ROOT, 'src/partials'))) partials[f.replace(/\.html$/, '')] = fs.readFileSync(path.join(ROOT, 'src/partials', f), 'utf8');

function insideTag(s, idx) { return s.lastIndexOf('<', idx) > s.lastIndexOf('>', idx); }

function render(template, page, where) {
  let s = template;
  // includes (partials may contain tokens too)
  for (let n = 0; n < 5 && /\{\{>[a-z-]+\}\}/.test(s); n++) {
    s = s.replace(/\{\{>([a-z-]+)\}\}/g, (_, name) => {
      if (!partials[name]) { fail(`${where}: no partial called "${name}"`); return ''; }
      return partials[name];
    });
  }
  const current = CURRENT[page] || null;
  s = s.replace(/\{\{ac:([a-z]+)\}\}/g, (_, id) => (id === current ? ' aria-current="page"' : ''));
  s = s.replace(/\{\{lbl:([a-z]+)\}\}/g, (_, id) => {
    const k = id === current ? 'shared.nav.label_here' : 'shared.nav.label_elsewhere';
    if (!(k in content)) { fail(`content.txt is missing "${k}"`); return ''; }
    used.add(k); return esc(content[k]);
  });
  s = s.replace(/\{\{email\}\}/g, () => setting('email', where));
  // everything left is a content key
  return s.replace(/\{\{([A-Za-z0-9_.\-]+)\}\}/g, (match, key, offset, whole) => {
    if (!Object.prototype.hasOwnProperty.call(content, key)) { fail(`${where}: no text called "${key}" in content.txt (was a line deleted?)`); return ''; }
    used.add(key);
    return insideTag(whole, offset) ? renderAttr(content[key], `${where} [${key}]`) : renderText(content[key], `${where} [${key}]`);
  });
}

const pages = {};
for (const f of fs.readdirSync(path.join(ROOT, 'src/pages')).filter((x) => x.endsWith('.html'))) {
  const name = f.replace(/\.html$/, '');
  pages[name] = render(fs.readFileSync(path.join(ROOT, 'src/pages', f), 'utf8'), name, `${f}`);
}

// text in content.txt that no page uses (a typo'd key would show up here)
const unused = Object.keys(content).filter((k) => !used.has(k));
if (unused.length) fail(`content.txt has lines that no page uses (typo in the part before the colon?): ${unused.slice(0, 8).join(', ')}${unused.length > 8 ? ', ...' : ''}`);

if (problems.length) {
  console.error('\nBUILD STOPPED. Nothing was changed.\n');
  problems.forEach((p) => console.error('  - ' + p));
  console.error('');
  process.exit(1);
}

if (CHECK_ONLY) { console.log(`content.txt is fine (${Object.keys(content).length} lines, ${Object.keys(pages).length} pages).`); process.exit(0); }

// ---------------------------------------------------------------- write dist/
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
for (const [name, html] of Object.entries(pages)) fs.writeFileSync(path.join(DIST, name + '.html'), html);
for (const dir of ['assets', 'css', 'js']) fs.cpSync(path.join(ROOT, dir), path.join(DIST, dir), { recursive: true });
for (const f of ['robots.txt', 'sitemap.xml']) if (fs.existsSync(path.join(ROOT, f))) fs.copyFileSync(path.join(ROOT, f), path.join(DIST, f));
console.log(`Built ${Object.keys(pages).length} pages from ${Object.keys(content).length} lines of text into dist/`);
