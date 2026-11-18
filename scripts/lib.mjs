// Copyright 2026 AgentiCCells. Licensed under the Apache License, Version 2.0
// (http://www.apache.org/licenses/LICENSE-2.0). The text it writes is CC BY 4.0.
//
// Shared pieces for the page generators (generate.mjs, designs.mjs, behind.mjs) and cards.mjs:
// escaping, the <head> with link-preview tags, header, footer, the Designs control, source markers
// and per-page source lists, the figure of the twelve-step run, and the build-time checks.
// Everything factual comes from data/site.mjs. Node built-ins only.
// Written by developer.mondweep-chakravorty@AgentiCCells.dinis, round 1 (2026-11-18), from
// team/rounds/1/design/PROPOSAL.md and the conditions in team/rounds/1/review/DESIGN.md.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import * as D from '../data/site.mjs';

export { D };
export const SITE = D.SITE.url.replace(/\/$/, '');
export const REPO = JSON.parse(readFileSync('hub.json', 'utf8')).repository;
export const OUT = '_site';

export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const write = (path, s) => { const f = join(OUT, path); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, s); };
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const fmtDate = iso => {
  if (!iso) return '';
  const [y, m, d] = String(iso).slice(0, 10).split('-');
  return d ? `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}` : m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
};

// ---------- the pages and their link-preview cards ----------
export const NAV = [
  ['/built/', 'What he has built'],
  ['/proof-of-concept/', 'Proof of concept'],
  ['/experience/', 'Experience'],
  ['/agentics-london/', 'Agentics London'],
  ['/collaboration/', 'With Dinis Cruz'],
];
export const INDEX = [
  ['/', 'Home'], ...NAV, ['/sources/', 'Sources'], ['/ai/', 'Use with AI'], ['/behind-the-scenes/', 'Behind the scenes'], ['/d/', 'Designs'],
];

// The five designs (proposal section 2, review conditions 23 to 28). Ledger is the main site at /.
export const DESIGNS = [
  { id: 'ledger', name: 'Ledger', href: '/', idea: 'A calm consultancy page: one screen says who he is and what to read next.', best: 'a first read, on any screen; this is the main site',
    pal: { bg: '#FAF8F4', ink: '#1C1B19', muted: '#4A4740', accent: '#1D5C63', onAccent: '#FFFFFF', font: 'system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif' } },
  { id: 'broadsheet', name: 'Broadsheet', href: '/d/broadsheet/', idea: 'A newspaper profile: masthead, headline, columns, the figure as a full-width plate.', best: 'reading the whole story in one sitting',
    pal: { bg: '#F4F1EA', ink: '#161513', muted: '#4B4740', accent: '#9B1C1C', onAccent: '#FFFFFF', font: 'Charter,"Bitstream Charter","Sitka Text",Cambria,Georgia,serif' } },
  { id: 'runlog', name: 'Run log', href: '/d/runlog/', idea: 'The site as a terminal session: each section is a labelled block of output; the twelve steps are log lines.', best: 'engineers who read terminal output for a living',
    pal: { bg: '#0E1116', ink: '#D7DEE8', muted: '#9AA6B5', accent: '#7EE2A8', onAccent: '#0E1116', font: 'ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace' } },
  { id: 'blueprint', name: 'Blueprint', href: '/d/blueprint/', idea: 'An engineering drawing: a framed sheet with a title block; the run is the main drawing.', best: 'seeing how the run is put together',
    pal: { bg: '#0F2A4A', ink: '#F2F7FF', muted: '#B8CCE6', accent: '#7CC4FF', onAccent: '#0F2A4A', font: 'system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif' } },
  { id: 'vault', name: 'Vault', href: '/d/vault/', idea: 'Saved encrypted, checked, restored: the facts sit in panels like checkpoints.', best: 'readers who care how an agent\'s memory is kept and checked',
    pal: { bg: '#13201C', ink: '#ECE6D8', muted: '#B9B2A2', accent: '#D9B26A', onAccent: '#13201C', font: 'Charter,"Bitstream Charter","Sitka Text",Cambria,Georgia,serif' } },
];

export const cardName = path => {
  if (path.startsWith('/behind-the-scenes/')) return 'behind-the-scenes';
  return path.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';
};
// Words on each card (proposal section 4, review conditions 34 and 35). No photo on any card.
const LEDGER = DESIGNS[0];
export const CARDS = [
  { path: '/', kicker: 'Enterprise AI leader, London', big: 'Mondweep Chakravorty', line: 'Agentic AI systems, built and advised on through DxSure Ltd.' },
  { path: '/built/', kicker: 'What he has built', big: 'Mondweep Chakravorty', line: 'The SGit x Ruflo proof of concept and Ruflo PR #4239.' },
  { path: '/proof-of-concept/', kicker: 'SGit x Ruflo', big: 'Agent memory, saved and restored', line: '12 steps, 3 safeguards, the same SHA-256 fingerprint.', figure: true },
  { path: '/experience/', kicker: 'Experience', big: 'Mondweep Chakravorty', line: 'Two decades in financial services, automotive, energy and technology.' },
  { path: '/agentics-london/', kicker: 'Agentics Foundation', big: 'London chapter', line: 'Co-founded by Mondweep Chakravorty.' },
  { path: '/collaboration/', kicker: 'With Dinis Cruz', big: 'Founding providers on ruv.sgit.ai', line: 'Mondweep Chakravorty and Dinis Cruz.' },
  { path: '/sources/', kicker: 'Sources', big: 'Every fact, with its source', line: 'Each with its address and the date it was read.' },
  { path: '/ai/', kicker: 'Use with AI', big: 'This site as plain text', line: 'llms.txt, a Markdown copy of the site and its facts as JSON.' },
  { path: '/behind-the-scenes/', kicker: 'Behind the scenes', big: 'How this site is made', line: 'The team, its policies, every round and every commit.' },
  { path: '/d/', kicker: 'Designs', big: 'Five designs', line: 'The same facts and sources, five ways.' },
  ...DESIGNS.map(d => ({ path: `/d/${d.id}/`, kicker: 'Designs', big: d.name, line: d.idea, pal: d.pal })),
].map(c => ({ pal: LEDGER.pal, ...c, name: cardName(c.path) }));
export const cardAlt = c => `Link preview: ${c.kicker}. ${c.big}. ${c.line}`.replace(/\.\./g, '.');

// ---------- source markers, numbered per page in order of first use ----------
export const citedOn = new Map(); // page path -> Set of source ids
export const statements = []; // every cited sentence on the main pages, for /facts.json
export class Cite {
  constructor(path, { fmt, record = false } = {}) {
    this.path = path; this.order = []; this.fmt = fmt; this.record = record;
    if (!citedOn.has(path)) citedOn.set(path, new Set());
  }
  m(src = []) {
    return (src || []).map(id => {
      if (!D.SOURCES[id]) throw new Error(`${this.path}: unknown source id "${id}" in data/site.mjs`);
      let i = this.order.indexOf(id), first = false;
      if (i < 0) { this.order.push(id); i = this.order.length - 1; first = true; citedOn.get(this.path).add(id); }
      const n = i + 1;
      const label = this.fmt ? this.fmt(n) : String(n);
      return `<sup class="mk"><a href="#src-${n}"${first ? ` id="ref-${n}"` : ''} aria-label="Source ${n}">${esc(label)}</a></sup>`;
    }).join('');
  }
  // A sentence object { text, src } as escaped text with its markers.
  t(o) {
    if (!o) return '';
    if (this.record) statements.push({ page: this.path, text: o.text, sources: o.src || [] });
    return esc(o.text) + this.m(o.src);
  }
  ids() { return [...this.order]; }
  list({ heading = 'Sources for this page', cls = 'sources' } = {}) {
    if (!this.order.length) return '';
    return `<section class="${cls}" id="sources" aria-labelledby="sources-h">
<h2 id="sources-h">${esc(heading)}</h2>
<ol>
${this.order.map((id, i) => { const s = D.SOURCES[id]; const n = i + 1; return `<li id="src-${n}"><a href="${esc(s.url)}">${esc(s.title)}</a>, ${esc(s.publisher)}${s.date ? `, ${esc(fmtDate(s.date))}` : ''}. Read ${esc(fmtDate(s.read))}. <a class="back" href="#ref-${n}" aria-label="Back to the text for source ${n}">Back to text</a></li>`; }).join('\n')}
</ol>
<p>Every source on the site, with the pages that use it: <a href="/sources/">Sources</a>.</p>
</section>`;
  }
}

// ---------- <head> ----------
export function head({ path, title, description, canonical, css = '', stylesheet = '/style.css', robots = '' }) {
  if (!title || !description) throw new Error(`${path}: title and description are required`);
  const card = CARDS.find(c => c.path === path) || CARDS.find(c => c.name === cardName(path)) || CARDS[0];
  const img = `${SITE}/assets/cards/${card.name}.png`;
  const url = SITE + (canonical || path);
  const full = path === '/' ? title : `${title} | ${D.SITE.name}`;
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(full)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="${path === '/' ? 'profile' : 'website'}">
<meta property="og:site_name" content="${esc(D.SITE.name)}">
<meta property="og:locale" content="en_GB">
<meta property="og:title" content="${esc(full)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(img)}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(cardAlt(card))}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(full)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(img)}">
<meta name="twitter:image:alt" content="${esc(cardAlt(card))}">
<link rel="alternate" type="text/plain" href="/llms.txt" title="This site as plain text, for AI tools">
<link rel="alternate" type="text/markdown" href="/index.md" title="This site as Markdown">
${stylesheet ? `<link rel="stylesheet" href="${stylesheet}">` : ''}${robots}
${css ? `<style>${css}</style>` : ''}
</head>`;
}

// ---------- the Designs control: a link to /d/, enhanced into a <dialog> ----------
export function designsDialog(current) {
  return `<dialog id="designs-dialog" class="designs-dialog" aria-labelledby="designs-h">
<h2 id="designs-h">Designs</h2>
<p>The same facts and sources, laid out five ways. Ledger is the main site. <a href="/d/">All designs, as a page</a></p>
<ul class="dcards">
${DESIGNS.map(d => `<li><a href="${d.href}"${d.id === current ? ' aria-current="page"' : ''}><img src="/assets/designs/${d.id}.png" alt="Home page in the ${esc(d.name)} design" width="640" height="400" loading="lazy"><b>${esc(d.name)}${d.id === 'ledger' ? ' (main site)' : ''}</b><span>${esc(d.idea)}</span>${d.id === current ? '<em>You are here</em>' : ''}</a></li>`).join('\n')}
</ul>
<form method="dialog"><button class="btn" type="submit">Close</button></form>
</dialog>`;
}
// The only script on the site: a few inline lines that open the dialog. Without it, the link goes to /d/.
// Esc closes a modal <dialog> natively; focus goes back to the control that opened it.
export const DESIGNS_SCRIPT = `<script>(function(){var d=document.getElementById('designs-dialog');if(!d||typeof d.showModal!=='function')return;var last=null;document.querySelectorAll('a.designs').forEach(function(a){a.setAttribute('aria-haspopup','dialog');a.addEventListener('click',function(e){e.preventDefault();last=a;d.showModal();});});d.addEventListener('close',function(){if(last)last.focus();});d.addEventListener('click',function(e){if(e.target===d)d.close();});})();</script>`;

// ---------- Ledger chrome ----------
export function header(path) {
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site"><div class="wrap bar">
<a class="name" href="/"${path === '/' ? ' aria-current="page"' : ''}>${esc(D.SITE.name)}</a>
<nav aria-label="Main"><ul>
${NAV.map(([h, l]) => `<li><a href="${h}"${h === path ? ' aria-current="page"' : ''}>${esc(l)}</a></li>`).join('\n')}
</ul></nav>
<a class="btn designs" href="/d/">Designs</a>
<a class="btn menu" href="#site-index">Menu</a>
</div></header>`;
}
export function footer(path) {
  return `<footer class="site" id="site-index"><div class="wrap">
<h2 class="fh">Site index</h2>
<ul class="index">
${INDEX.map(([h, l]) => `<li><a href="${h}"${h === path ? ' aria-current="page"' : ''}>${esc(l)}</a></li>`).join('\n')}
</ul>
<p class="small">Version __VERSION__. Code ${esc(D.SITE.licence.code)}, text ${esc(D.SITE.licence.text)}. Facts from public sources, read ${esc(fmtDate(D.SITE.read))}. Made by the AgentiCCells cell: <a href="/behind-the-scenes/">behind the scenes</a>.</p>
</div></footer>`;
}
export function page({ path, title, description, body, canonical, css = '', current = 'ledger', before = '' }) {
  return `${head({ path, title, description, canonical, css })}
<body>
${header(path)}
${before}<main id="main" class="wrap">
${body}
</main>
${footer(path)}
${designsDialog(current)}
${DESIGNS_SCRIPT}
</body>
</html>
`;
}

// ---------- the home's content, shared by / and every design (review condition 23) ----------
export function homeModel() {
  const H = D.HOME;
  return {
    eyebrow: { text: 'Enterprise AI leader, London', src: D.PERSON.headlineSrc },
    lede: H.intro[0],
    who: H.intro.slice(1),
    highlights: H.highlights,
    poc: { paras: [D.POC.summary[0], D.POC.summary[2]], limit: D.POC.limits[1], code: D.POC.code },
    pr: { paras: [D.PR.summary[0], D.PR.summary[1], D.PR.summary[3]] },
    london: { paras: [D.LONDON.text[1], D.LONDON.text[2]], facts: D.LONDON.facts },
    collab: { paras: [...D.COLLAB.intro, D.COLLAB.roles[0]], offers: D.COLLAB.offers, notes: D.COLLAB.offersNote },
    contact: D.PERSON.contact,
  };
}
export const mailto = () => `mailto:${D.PERSON.contact.email}?subject=${encodeURIComponent(D.PERSON.contact.subject)}`;
// One line per offer group, with every price as published (runs with the own-key prices; compute "not built yet").
export const offerLine = g => g.items.map(i => `${i.name} ${i.priceText}${i.ownKeyText ? ` (${i.ownKeyText} with your own model key)` : ''}`).join(', ') + (g.unit ? ` ${g.unit}` : '') + (g.status ? `; ${g.status}` : '');
export function offersCompact(c, groups) {
  return `<ul class="offers-compact">
${groups.map(g => `<li><b>${esc(g.group)}.</b> ${esc(g.items.map(i => `${i.name} ${i.priceText}${i.ownKeyText ? ` (${i.ownKeyText} with your own model key)` : ''}${g.unit ? '' : ` ${i.unit}`}`).join(', '))}${g.unit ? ` ${esc(g.unit)}` : ''}.${g.status ? ` <i>${esc(g.status[0].toUpperCase() + g.status.slice(1))}.</i>` : ''}${c.m(g.src)}</li>`).join('\n')}
</ul>`;
}

// ---------- the figure: twelve steps in four phases, three safeguards on their steps ----------
// Review conditions 1 to 7: real step titles from data, phases from data (setup, save, restore,
// check: 3/3/4/2), safeguards marked at steps 4, 6 and 11 only, the fingerprint line with no hash
// value, a real <ol> as the text alternative, text 14 px or larger, the hidden SVG display:none.
const CHAR = 0.58; // average glyph width as a share of font size, for line wrapping
const wrap = (text, size, width) => {
  const max = Math.max(8, Math.floor(width / (size * CHAR)));
  const words = String(text).split(/\s+/); const lines = []; let line = '';
  for (const w of words) { if ((line + ' ' + w).trim().length > max && line) { lines.push(line); line = w; } else line = (line + ' ' + w).trim(); }
  if (line) lines.push(line);
  return lines;
};
const tspans = (lines, x, y, lh) => lines.map((l, i) => `<tspan x="${x}" y="${y + i * lh}">${esc(l)}</tspan>`).join('');
const rangeOf = (ph, word = 'Steps') => ph.steps.length === 1 ? `${word.replace(/s$/, '')} ${ph.steps[0]}` : ph.steps.length === 2 ? `${word} ${ph.steps[0]} and ${ph.steps[1]}` : `${word} ${ph.steps[0]} to ${ph.steps[ph.steps.length - 1]}`;
const stepsOf = ph => ph.steps.map(n => D.POC.steps.find(s => s.n === n));
const sgOf = s => D.POC.safeguards.find(g => g.step === s.n);

function stepBox(s, x, y, w, { title = 17, small = 15 } = {}) {
  const sg = sgOf(s);
  const tl = wrap(s.title, title, w - 64);
  const sl = sg ? wrap(`Safeguard ${sg.n} held: ${sg.text.replace(/\.$/, '').toLowerCase()}`, small, w - 64) : [];
  const h = 22 + tl.length * (title + 5) + (sl.length ? 6 + sl.length * (small + 5) : 0) + 8;
  const cx = x + 26, cy = y + 26;
  const out = `<g class="st${sg ? ' has-sg' : ''}">
<rect class="bx" x="${x}" y="${y}" width="${w}" height="${h}" rx="8"/>
<circle class="nc" cx="${cx}" cy="${cy}" r="15"/><text class="nt" x="${cx}" y="${cy + 5}" text-anchor="middle">${s.n}</text>
<text class="tt" style="font-size:${title}px">${tspans(tl, x + 50, y + 31, title + 5)}</text>
${sl.length ? `<text class="sgt" style="font-size:${small}px">${tspans(sl, x + 50, y + 31 + tl.length * (title + 5) + 4, small + 5)}</text>` : ''}
</g>`;
  return { out, h };
}
function phaseCol(ph, idx, x, y, w, opts) {
  const parts = [];
  const head = wrap(`${idx + 1}. ${ph.label}`, opts.ph, w);
  parts.push(`<text class="ph" style="font-size:${opts.ph}px">${tspans(head, x, y + opts.ph, opts.ph + 6)}</text>`);
  const range = rangeOf(ph);
  let yy = y + head.length * (opts.ph + 6) + 4;
  parts.push(`<text class="sub" x="${x}" y="${yy + 14}" style="font-size:15px">${range}</text>`);
  yy += 28;
  for (const s of stepsOf(ph)) { const b = stepBox(s, x, yy, w, opts); parts.push(b.out); yy += b.h + 10; }
  return { out: parts.join('\n'), bottom: yy };
}
const svgDesc = () => {
  const p = D.POC.phases.map((ph, i) => `phase ${i + 1}, ${ph.label}: ${stepsOf(ph).map(s => `step ${s.n}, ${s.title}`).join('; ')}`).join('. ');
  const g = D.POC.safeguards.map(s => `safeguard ${s.n} at step ${s.step}: ${s.text}`).join(' ');
  return `Twelve steps in four phases. ${p}. Three safeguards, each marked on its step: ${g} ${D.POC.fingerprint.line}. The same steps are listed in full below the figure.`;
};
export function runSvg(variant, id) {
  const wide = variant === 'wide';
  const W = wide ? 1152 : 360;
  const parts = [];
  let bottom = 0;
  if (wide) {
    const colW = 540, gap = 72;
    let y = 8;
    for (let r = 0; r < 2; r++) {
      const a = phaseCol(D.POC.phases[r * 2], r * 2, 0, y, colW, { ph: 21, title: 18, small: 16 });
      const b = phaseCol(D.POC.phases[r * 2 + 1], r * 2 + 1, colW + gap, y, colW, { ph: 21, title: 18, small: 16 });
      parts.push(a.out, b.out);
      parts.push(`<path class="ar" d="M${colW + 14} ${y + 13} H${colW + gap - 14}" marker-end="url(#${id}-ah)"/>`);
      const rowEnd = Math.max(a.bottom, b.bottom);
      if (r === 0) parts.push(`<path class="ar" d="M${colW + gap + colW / 2} ${b.bottom - 2} V${rowEnd + 12} H${colW / 2} V${rowEnd + 34}" marker-end="url(#${id}-ah)"/>`);
      y = rowEnd + 44;
    }
    bottom = y - 30;
  } else {
    let y = 6;
    D.POC.phases.forEach((ph, i) => {
      const c = phaseCol(ph, i, 0, y, W, { ph: 19, title: 16, small: 15 });
      parts.push(c.out);
      y = c.bottom + 18;
    });
    bottom = y - 12;
  }
  const fl = wrap(D.POC.fingerprint.line, wide ? 18 : 15, W - 24);
  const fh = 18 + fl.length * ((wide ? 18 : 15) + 6);
  parts.push(`<rect class="fp" x="0" y="${bottom + 8}" width="${W}" height="${fh}" rx="8"/><text class="fpt" style="font-size:${wide ? 18 : 15}px">${tspans(fl, 14, bottom + 8 + (wide ? 27 : 24), (wide ? 18 : 15) + 6)}</text>`);
  const H = bottom + 8 + fh + 4;
  return `<svg class="run-svg run-${variant}" viewBox="0 0 ${W} ${Math.ceil(H)}" width="${W}" height="${Math.ceil(H)}" role="img" aria-labelledby="${id}-t ${id}-d">
<title id="${id}-t">The proof of concept run: twelve steps in four phases, with three safeguards on their steps</title>
<desc id="${id}-d">${esc(svgDesc())}</desc>
<defs><marker id="${id}-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah" d="M0 0 10 5 0 10z"/></marker></defs>
${parts.join('\n')}
</svg>`;
}
// The figure with its caption and text alternative. `c` is the page's Cite.
export function figure(c, { id = 'run', limits = false } = {}) {
  const P = D.POC;
  const phaseLine = P.phases.map(ph => `${ph.label} (${rangeOf(ph, 'steps')})`).join(', ');
  return `<figure class="run" aria-labelledby="${id}-cap">
<div class="run-draw">
${runSvg('wide', `${id}-w`)}
${runSvg('tall', `${id}-n`)}
</div>
<figcaption id="${id}-cap">The run in twelve steps, drawn by this site from the newsroom's walk-through${c.m(P.stepsSrc)}. Three safeguards were tested, each at its own step, and all held. The steps and safeguards follow as text.</figcaption>
</figure>
<div class="run-text">
<p>Four phases: ${esc(phaseLine)}.</p>
<ol class="steps">
${P.steps.map(s => { const sg = sgOf(s); return `<li><b>${esc(s.title)}.</b> ${esc(s.text)}${sg ? ` <span class="sg">Safeguard ${sg.n} held.</span>` : ''}${c.m(P.stepsSrc)}</li>`; }).join('\n')}
</ol>
<h3 class="h-sg">The three safeguards</h3>
<ul class="safeguards">
${P.safeguards.map(g => `<li><b>Safeguard ${g.n}, at step ${g.step}: ${esc(g.title.toLowerCase())}.</b> ${c.t(g)}</li>`).join('\n')}
</ul>
<p class="fingerprint"><b>Fingerprint:</b> ${esc(P.fingerprint.line)}${c.m(P.fingerprint.src)}. No hash value is shown.</p>
${limits ? `<h3>What the run did not show</h3>\n<ul class="limits">\n${P.limits.map(l => `<li>${c.t(l)}</li>`).join('\n')}\n</ul>` : ''}
</div>`;
}

// ---------- build-time checks ----------
// Review condition 14: refuse any fact that needs his approval (the long bio F09 to F12 and the
// specialisms F14, from research/facts.json), whether cited by id or quoted in the words.
export function checkApproval() {
  const facts = JSON.parse(readFileSync('research/facts.json', 'utf8'));
  const flagged = facts.filter(f => /needs his approval/i.test(f.claim) || f.id === 'F14');
  const flaggedIds = new Set(flagged.map(f => f.id));
  const problems = [];
  for (const [id, s] of Object.entries(D.SOURCES)) for (const f of s.facts || []) if (flaggedIds.has(f)) problems.push(`source "${id}" backs ${f}, which needs Mondweep's approval`);
  const others = facts.filter(f => !flaggedIds.has(f.id)).map(f => f.quote + ' ' + f.claim).join(' ');
  const phrases = new Set();
  for (const f of flagged) for (const m of f.quote.matchAll(/\b\p{Lu}[\p{L}-]+(?:\s+\p{Lu}[\p{L}-]+)+/gu)) if (!others.includes(m[0])) phrases.add(m[0]);
  for (const w of ['Since September 2024', 'MAESTRO']) phrases.add(w);
  const text = JSON.stringify(Object.fromEntries(Object.entries(D).filter(([k]) => k !== 'OPEN')));
  for (const p of phrases) if (text.includes(p)) problems.push(`data/site.mjs uses "${p}", from a fact that needs Mondweep's approval`);
  if (problems.length) throw new Error(`Approval check failed:\n${problems.join('\n')}`);
  return phrases.size;
}
// Review condition 19: name only Mondweep Chakravorty, Dinis Cruz and rUv. The names to keep out are
// read from research/sources.md section 6 at build time (none is typed into this file).
export function forbiddenNames() {
  const md = existsSync('research/sources.md') ? readFileSync('research/sources.md', 'utf8') : '';
  const sec = (md.match(/^## 6\.[^\n]*\n([\s\S]*?)(?=^## 7\.)/m) || [, ''])[1];
  const names = new Set();
  for (const line of sec.split('\n').filter(l => /^- /.test(l) && !/^- Organisations/.test(l))) {
    const body = line.replace(/^- [^:]+:/, '');
    for (const m of body.matchAll(/\p{Lu}[\p{Ll}'é]+(?:\s+(?:De\s+)?\p{Lu}[\p{L}'-]+)+/gu)) if (!/Reuven Cohen|Kestrel/.test(m[0])) names.add(m[0]);
  }
  return [...names];
}
export function checkOutput() {
  const names = forbiddenNames();
  const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
  const problems = [];
  for (const f of walk(OUT).filter(f => /\.(html|md|txt|json)$/.test(f))) {
    const s = readFileSync(f, 'utf8');
    for (const n of names) if (s.includes(n)) problems.push(`${f}: names "${n}", who is not to be named`);
    if (/<img[^>]+(?:mondweep\.jpg|headshot)/i.test(s)) problems.push(`${f}: an image of Mondweep`);
  }
  if (problems.length) throw new Error(`Output check failed:\n${problems.join('\n')}`);
  return names.length;
}
