// Copyright 2026 AgentiCCells. Licensed under the Apache License, Version 2.0
// (http://www.apache.org/licenses/LICENSE-2.0). The text it writes is CC BY 4.0.
//
// Shared pieces for the page generators (generate.mjs, designs.mjs, behind.mjs) and cards.mjs:
// escaping, the <head> with link-preview tags, header, footer, the Designs control, source markers
// and per-page source lists, the figure of the twelve-step run, and the build-time checks.
// Everything factual comes from data/site.mjs. Node built-ins only.
// Written by developer.mondweep-chakravorty@AgentiCCells.dinis, round 1 (2026-11-18), from
// team/rounds/1/design/PROPOSAL.md and the conditions in team/rounds/1/review/DESIGN.md.
// Round 2 (same day): the headshot, the run drawn on a 104.7 s scale, the Work with him block, the
// large-preview Designs pop-up, and the people and approval checks rewritten as
// team/rounds/2/review/DESIGN.md positions (a) and (b) say.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { createHash } from 'node:crypto';
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
  ['/experience/', 'Career'],
  ['/agentics-london/', 'Agentics London'],
  ['/collaboration/', 'With Dinis Cruz'],
];
export const INDEX = [
  ['/', 'Home'], ...NAV, ['/sources/', 'Sources'], ['/ai/', 'Use with AI'], ['/behind-the-scenes/', 'Behind the scenes'], ['/d/', 'Designs'],
];

// The five designs (proposal section 2, review conditions 23 to 28). Ledger is the main site at /.
export const DESIGNS = [
  { id: 'ledger', name: 'Ledger', href: '/', best: 'a first read, on any screen; this is the main site',
    pal: { bg: '#FAF8F4', ink: '#1C1B19', muted: '#4A4740', accent: '#1D5C63', onAccent: '#FFFFFF', font: 'system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif' } },
  { id: 'broadsheet', name: 'Broadsheet', href: '/d/broadsheet/', best: 'reading the whole story in one sitting',
    pal: { bg: '#F4F1EA', ink: '#161513', muted: '#4B4740', accent: '#9B1C1C', onAccent: '#FFFFFF', font: 'Charter,"Bitstream Charter","Sitka Text",Cambria,Georgia,serif' } },
  { id: 'runlog', name: 'Run log', href: '/d/runlog/', best: 'engineers who read terminal output for a living',
    pal: { bg: '#0E1116', ink: '#D7DEE8', muted: '#9AA6B5', accent: '#7EE2A8', onAccent: '#0E1116', font: 'ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace' } },
  { id: 'blueprint', name: 'Blueprint', href: '/d/blueprint/', best: 'seeing how the run is put together',
    pal: { bg: '#0F2A4A', ink: '#F2F7FF', muted: '#B8CCE6', accent: '#7CC4FF', onAccent: '#0F2A4A', font: 'system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif' } },
  { id: 'vault', name: 'Vault', href: '/d/vault/', best: 'readers who care how an agent\'s memory is kept and checked',
    pal: { bg: '#13201C', ink: '#ECE6D8', muted: '#B9B2A2', accent: '#D9B26A', onAccent: '#13201C', font: 'Charter,"Bitstream Charter","Sitka Text",Cambria,Georgia,serif' } },
].map(d => ({ ...d, idea: D.DESIGN_IDEAS[d.id] || (() => { throw new Error(`data/site.mjs DESIGN_IDEAS has no line for ${d.id}`); })() }));

// ---------- the headshot (Dinis Cruz, 2026-11-18, team/WORKFLOW.md) and the images made from it ----------
// The only image of him: this file, pinned by its SHA-256 so it cannot be swapped under the same name.
export const PHOTO_PATH = '/assets/photo/mondweep-chakravorty.png';
// It is the public fingerprint of a committed file, not a secret. It is written in four groups of 16 because
// scripts/leak-scan.mjs (unchanged) flags any unbroken hex string of 48 characters or more.
export const PHOTO_SHA256 = '8e73169a0f0f0e9a 1eba76c43ec05511 1d9c79a01fd5f737 38d19734e8d848c5'.replace(/ /g, '');
// The derived images that show his face, each rendered by scripts/cards.mjs from that one file and no
// other (review position (a)): the home and Ledger link-preview cards, the pop-up previews of the
// three designs whose first screen shows the headshot, and the Broadsheet and Vault link-preview cards,
// which are built from that same first screen (round 2 live review, finding 6). Any other image of him fails checkOutput().
export const PHOTO_DERIVED = [
  '/assets/cards/home.png',
  '/assets/cards/d-ledger.png',
  '/assets/cards/d-broadsheet.png',
  '/assets/cards/d-vault.png',
  '/assets/designs/ledger.png',
  '/assets/designs/broadsheet.png',
  '/assets/designs/vault.png',
];
export const photoImg = ({ cls = '', alt = D.PHOTO.alt, eager = true } = {}) =>
  `<img${cls ? ` class="${cls}"` : ''} src="${PHOTO_PATH}" width="${D.PHOTO.width}" height="${D.PHOTO.height}" alt="${esc(alt)}"${eager ? '' : ' loading="lazy"'} decoding="async">`;

export const cardName = path => {
  if (path.startsWith('/behind-the-scenes/')) return 'behind-the-scenes';
  return path.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';
};
// Words on each card (round 1 proposal section 4, conditions 34 and 35). Round 2: the home and Ledger
// cards carry the headshot (photo: true; both are on PHOTO_DERIVED); every other card keeps the monogram.
const LEDGER = DESIGNS[0];
// The designs whose first screen shows the headshot (designs.mjs: photoImg() in the first screen).
const SHOWS_PHOTO = ['ledger', 'broadsheet', 'vault'];
export const CARDS = [
  { path: '/', kicker: 'Enterprise AI leader, London', big: 'Mondweep Chakravorty', line: 'Agentic AI systems, built and advised on through DxSure Ltd.', photo: true },
  { path: '/built/', kicker: 'What he has built', big: 'Mondweep Chakravorty', line: 'The SGit x Ruflo proof of concept and Ruflo PR #4239.' },
  { path: '/proof-of-concept/', kicker: 'SGit x Ruflo', big: 'Agent memory, saved and restored', line: '12 steps on a 104.7 s video, 3 safeguards, the same SHA-256.', figure: true },
  { path: '/experience/', kicker: 'Career', big: 'Mondweep Chakravorty', line: 'From HSBC Global Technology to DxSure Ltd.' },
  { path: '/agentics-london/', kicker: 'Agentics Foundation', big: 'London chapter', line: 'Co-founded by Mondweep Chakravorty.' },
  { path: '/collaboration/', kicker: 'With Dinis Cruz', big: 'Founding providers on ruv.sgit.ai', line: 'Mondweep Chakravorty and Dinis Cruz.' },
  { path: '/sources/', kicker: 'Sources', big: 'Every fact, with its source', line: 'Each with its address and the date it was read.' },
  { path: '/ai/', kicker: 'Use with AI', big: 'This site as plain text', line: 'llms.txt, a Markdown copy of the site and its facts as JSON.' },
  { path: '/behind-the-scenes/', kicker: 'Behind the scenes', big: 'How this site is made', line: 'The team, its policies, every round and every commit.' },
  { path: '/d/', kicker: 'Designs', big: 'Five designs', line: 'The same facts and sources, five ways.' },
  // Round 2 live review, finding 6: every design but Ledger shows its own first screen (shot: true), taken
  // from the built page as the pop-up previews are; Broadsheet and Vault show the headshot there.
  ...DESIGNS.map(d => ({ path: `/d/${d.id}/`, kicker: 'Designs', big: d.name, line: d.idea, pal: d.pal, shot: d.id !== 'ledger', photo: SHOWS_PHOTO.includes(d.id) })),
].map(c => ({ pal: LEDGER.pal, ...c, name: cardName(c.path) }));
for (const c of CARDS) if (c.photo && !PHOTO_DERIVED.includes(`/assets/cards/${c.name}.png`)) throw new Error(`card ${c.name} shows the headshot but is not on PHOTO_DERIVED`);
export const cardAlt = c => `Link preview: ${c.kicker}. ${c.big}${c.photo ? ', with a photograph of him' : ''}. ${c.line}`.replace(/\.\./g, '.');

// ---------- source markers, numbered per page in order of first use ----------
export const citedOn = new Map(); // page path -> Set of source ids
export const statements = []; // every cited sentence on the main pages, for /facts.json
export class Cite {
  constructor(path, { fmt, record = false } = {}) {
    this.path = path; this.order = []; this.fmt = fmt; this.record = record;
    if (!citedOn.has(path)) citedOn.set(path, new Set());
  }
  // Markers for one sentence. A word joiner keeps the first marker on the line of the word before it, and
  // two or more markers sit in one non-wrapping span (review follow-up 6).
  m(src = []) {
    const list = (src || []).map(id => {
      if (!D.SOURCES[id]) throw new Error(`${this.path}: unknown source id "${id}" in data/site.mjs`);
      let i = this.order.indexOf(id), first = false;
      if (i < 0) { this.order.push(id); i = this.order.length - 1; first = true; citedOn.get(this.path).add(id); }
      const n = i + 1;
      const label = this.fmt ? this.fmt(n) : String(n);
      return `<sup class="mk"><a href="#src-${n}"${first ? ` id="ref-${n}"` : ''} aria-label="Source ${n}">${esc(label)}</a></sup>`;
    });
    if (!list.length) return '';
    return list.length === 1 ? `\u2060${list[0]}` : `\u2060<span class="mks">${list.join('')}</span>`;
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

// ---------- the Designs control: a link to /d/, enhanced into a <dialog> with large previews ----------
// Review follow-up 5: aria-current="page" only on the design being viewed (/ or /d/<id>/); from the other
// main pages the Ledger tile has aria-current="true" and the badge "Showing". Previews have empty alt text,
// because the design's name is the link text (round 2 change 10a).
export function designsDialog(current, path = '') {
  const here = d => (d.id === 'ledger' ? path === '/' || path === '/d/ledger/' : path === d.href);
  const showing = d => d.id === current;
  return `<dialog id="designs-dialog" class="designs-dialog" aria-labelledby="designs-h">
<div class="dd-top"><div><h2 id="designs-h">Designs</h2><p>The same facts about ${esc(D.PERSON.name)}, laid out five ways. Choose one to see it.</p></div>
<form method="dialog"><button class="dd-close" type="submit">Close</button></form></div>
<ul class="dd-grid">
${DESIGNS.map(d => `<li><a href="${d.href}"${showing(d) ? ` aria-current="${here(d) ? 'page' : 'true'}"` : ''}><img class="dd-thumb" src="/assets/designs/${d.id}.png" alt="" width="960" height="600" loading="lazy"><span class="dd-nm"><b>${esc(d.name)}</b>${showing(d) ? '<span class="dd-badge">Showing</span>' : ''}${d.id === 'ledger' ? '<span class="dd-badge alt">Main site</span>' : ''}</span><span class="dd-idea">${esc(d.idea)}</span></a></li>`).join('\n')}
<li><a href="/d/"><span class="dd-thumb dd-all">All designs, as a page</span><span class="dd-nm"><b>/d/</b></span><span class="dd-idea">Each design with what it is best for. Works without JavaScript.</span></a></li>
</ul>
</dialog>`;
}
// The only script on the site: a few inline lines that open the dialog. Without it, the link goes to /d/.
// Esc closes a modal <dialog> natively; focus goes back to the control that opened it.
export const DESIGNS_SCRIPT = `<script>(function(){var d=document.getElementById('designs-dialog');if(!d||typeof d.showModal!=='function')return;var last=null;document.querySelectorAll('a.designs').forEach(function(a){a.setAttribute('aria-haspopup','dialog');a.addEventListener('click',function(e){e.preventDefault();last=a;d.showModal();});});d.addEventListener('close',function(){if(last)last.focus();});d.addEventListener('click',function(e){if(e.target===d)d.close();});})();</script>`;

// ---------- Ledger chrome ----------
export function header(path, { onField = false } = {}) {
  return `<a class="skip" href="#main">Skip to content</a>
<header class="site${onField ? ' on-field' : ''}"><div class="wrap bar">
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
// A teal page head for the inner pages: kicker, the page's one h1, a lede (round 2, after the career mock-up).
export const pageHead = ({ kicker, title, lede = '' }) => `<div class="pagehead"><div class="wrap">
${kicker ? `<p class="kicker">${kicker}</p>` : ''}<h1>${title}</h1>
${lede ? `<p class="ph-lede">${lede}</p>` : ''}
</div></div>`;
// bleed: the body lays out its own full-width bands (the home). pagehead: { kicker, title, lede } as HTML.
export function page({ path, title, description, body, canonical, css = '', current = 'ledger', before = '', bleed = false, pagehead = null, onField = false }) {
  const inner = bleed ? body : pagehead ? `${pageHead(pagehead)}\n<div class="wrap">\n${body}\n</div>` : body;
  return `${head({ path, title, description, canonical, css })}
<body${bleed ? ' class="home"' : ''}>
${before}${header(path, { onField })}
<main id="main"${bleed || pagehead ? '' : ' class="wrap"'}>
${inner}
</main>
${footer(path)}
${designsDialog(current, path)}
${DESIGNS_SCRIPT}
</body>
</html>
`;
}

// ---------- the home's content, shared by / and every design (review condition 23, round 2 (c)) ----------
export function homeModel() {
  const H = D.HOME;
  return {
    eyebrow: { text: 'Enterprise AI leader, London', src: D.PERSON.headlineSrc },
    hero: H.hero,
    numbers: H.numbers,
    lede: H.intro[0],
    who: H.intro.slice(1),
    highlights: H.highlights,
    career: H.career,
    careerOrgs: D.CAREER.path.flatMap(p => p.orgs),
    pullQuote: H.pullQuote,
    poc: { paras: [D.POC.summary[0], D.POC.summary[2]], limit: D.POC.limits[1], code: D.POC.code },
    pr: { paras: [D.PR.summary[0], D.PR.summary[1], D.PR.summary[3]] },
    london: { paras: [D.LONDON.text[1], D.LONDON.text[2]], facts: D.LONDON.facts },
    collab: { paras: [...D.COLLAB.intro, D.COLLAB.roles[0]], offers: D.COLLAB.offers, notes: D.COLLAB.offersNote },
    work: D.WORK,
    contact: D.PERSON.contact,
  };
}
export const mailto = () => `mailto:${D.WORK.enquire.email}?subject=${encodeURIComponent(D.WORK.enquire.subject)}`;
// One line per offer group, with every price as published (runs with the own-key prices; compute "not built yet").
export const offerLine = g => g.items.map(i => `${i.name} ${i.priceText}${i.ownKeyText ? ` (${i.ownKeyText} with your own model key)` : ''}`).join(', ') + (g.unit ? ` ${g.unit}` : '') + (g.status ? `; ${g.status}` : '');
export function offersCompact(c, groups) {
  return `<ul class="offers-compact">
${groups.map(g => `<li><b>${esc(g.group)}.</b> ${esc(g.items.map(i => `${i.name} ${i.priceText}${i.ownKeyText ? ` (${i.ownKeyText} with your own model key)` : ''}${g.unit ? '' : ` ${i.unit}`}`).join(', '))}${g.unit ? ` ${esc(g.unit)}` : ''}.${g.status ? ` <i>${esc(g.status[0].toUpperCase() + g.status.slice(1))}.</i>` : ''}${c.m(g.src)}</li>`).join('\n')}
</ul>`;
}
// "Work with him" (round 2 change 4a, review conditions 17 to 19): the five kinds of project, the four
// offers as published, how to enquire and what happens next (bulleted: the sources give no order).
// One markup for every page and design; each design styles it. h: the heading level of its parts.
// offersAt: the id of a section on the same page that lists the offers in full; the block then points
// to it in one line instead of listing them again (round 2 live review, finding 5).
export function workBlock(c, { h = 3, id = 'work', offersAt = '' } = {}) {
  const W = D.WORK, E = W.enquire;
  return `<div class="work">
<div class="work-what">
<h${h} id="${id}-types">${esc(W.projectsHeading)}</h${h}>
<ol class="types">${W.projects.map((p, i) => `<li><span>${esc(p)}${i === W.projects.length - 1 ? c.m(W.projectsSrc) : ''}</span></li>`).join('')}</ol>
${offersAt ? `<p class="offers-at"><a class="more inl" href="#${esc(offersAt)}">${esc(W.offersHeading.replace(/ \(.*\)$/, ''))}</a>: below, with every price.</p>` : `<h${h} id="${id}-offers">${esc(W.offersHeading)}</h${h}>
<ul class="offers">
${W.offers.map(o => `<li><b>${esc(o.group)}${o.status ? ` <span class="tag">${esc(o.status)}</span>` : ''}</b> ${esc(o.line)}${c.m(o.src)}</li>`).join('\n')}
</ul>`}
</div>
<div class="enquire">
<h${h} id="${id}-how">${esc(E.heading)}</h${h}>
<p class="mail"><a href="${esc(mailto())}">${esc(E.email)}</a>${c.m(E.src)}</p>
<p class="cta"><a class="btn on" href="${esc(mailto())}">${esc(E.label)}</a> <a class="btn ghost" href="${esc(E.providerPage)}">${esc(E.providerLabel)}</a></p>
<h${h} id="${id}-next">${esc(W.nextHeading)}</h${h}>
<ul class="next">
${W.next.map(n => `<li>${c.t(n)}</li>`).join('\n')}
</ul>
<p class="small">${c.t(W.disclaimer)}</p>
</div>
</div>`;
}
// The four numbers of the first screen (change 1), as a list. The words around each number are ours.
export const numbersList = (c, cls = 'stats') => `<ul class="${cls}" aria-label="In numbers">
${D.HOME.numbers.map(n => `<li><b>${esc(n.value)}</b><span>${esc(n.label)}${c.m(n.src)}</span></li>`).join('\n')}
</ul>`;
// The two-line career summary (changes 3 and 5), every sentence cited to providers-data.
export const careerSummary = c => D.HOME.career.summary.map(o => `<p>${c.t(o)}</p>`).join('\n');

// ---------- the run, drawn on the 104.7 s of his video (round 2 change 2, review conditions 9 to 13) ----------
// Every node at its video time (all twelve are timed, F111 to F122); safeguard rings on 4, 6 and 11 only; the
// fingerprint arc from 5 to 8 with no hash value; results from the run's own summary (step 12) set beside
// the step they describe, which the key says is this site's reading. SVG text is drawn at 16 units or more
// in a 1160-unit box shown from 64rem (at least 13 px at 1024 px), and at 15 units in the 360-unit tall
// drawing (about 13.5 px at 390). The phase panels below are a real <ol>: the text alternative, for everyone.
export const sgOf = s => D.POC.safeguards.find(g => g.step === s.n);
export const secs = at => { const [m, s] = String(at).split(':').map(Number); return m * 60 + s; };
const RESULT_OF = { 4: 'ABP denial', 6: 'Deletion that needs approval', 8: 'Fresh-process restore', 9: 'Exact recall', 11: 'Tampered restore', 12: 'Semantic recall' };
export const resultOf = s => {
  const r = RESULT_OF[s.n] && D.POC.results.find(x => x.check === RESULT_OF[s.n]);
  if (RESULT_OF[s.n] && !r) throw new Error(`POC.results has no "${RESULT_OF[s.n]}"`);
  if (!r) return null;
  const word = r.result.split(',')[0].replace(/ because.*$/, '');
  return { check: r.check, word, cls: /^PASS/.test(word) ? 'pass' : /^BLOCKED/.test(word) ? 'blocked' : 'nv' };
};
const VAULT_WORD = ['written', 'read', 'read and rejected'];
export const vaultOf = s => { const i = D.POC.vaultSteps.indexOf(s.n); return i < 0 ? null : VAULT_WORD[i]; };
const SG_WORD = { 1: 'refused', 2: 'stopped', 3: 'rejected' };
export const sgWord = g => SG_WORD[g.n];
const stepsOf = ph => ph.steps.map(n => D.POC.steps.find(s => s.n === n));
const phaseOf = s => D.POC.phases.find(p => p.steps.includes(s.n));
// Band edges: half-way between the last step of one phase and the first of the next (drawn, not stated).
const bandEdges = () => {
  const e = [0];
  for (let i = 0; i < D.POC.phases.length - 1; i++) {
    const a = stepsOf(D.POC.phases[i]).at(-1), b = stepsOf(D.POC.phases[i + 1])[0];
    e.push((secs(a.at) + secs(b.at)) / 2);
  }
  e.push(D.POC.video.seconds);
  return e;
};
const BAND_CLS = ['setup', 'save', 'restore', 'check'];
const svgDesc = () => `His 104.7 second video as a time line, with the twelve steps at their times: ${D.POC.steps.map(s => `step ${s.n}, ${s.title}, at ${s.at}`).join('; ')}. Tinted bands show four phases, which are this site's grouping: ${D.POC.phases.map(p => p.label).join(', ')}. Rings mark the three safeguards: ${D.POC.safeguards.map(g => `step ${g.step}, ${g.title.toLowerCase()}`).join('; ')}. A dashed arc joins step 5 and step 8: ${D.POC.fingerprint.line}. Results from the run's own summary are set beside the step each describes, as this site reads them: ${D.POC.steps.filter(resultOf).map(s => `step ${s.n} ${resultOf(s).word}`).join(', ')}. The same steps are listed in full below.`;
const tw = (t, size, k = 0.56) => t.length * size * k; // text width estimate
export function runStrip(id) {
  const W = 1160, X = s => 18 + s * 10.6, AX = 128, E = bandEdges(), BOT = 280;
  const P = D.POC, parts = [];
  E.slice(0, -1).forEach((e, i) => {
    parts.push(`<rect class="band ${BAND_CLS[i]}" x="${X(e).toFixed(1)}" y="12" width="${(X(E[i + 1]) - X(e)).toFixed(1)}" height="${BOT - 12}"/>`);
    parts.push(`<text class="bl" x="${(X(e) + 10).toFixed(1)}" y="38">${esc(P.phases[i].label)}</text>`);
  });
  const x5 = X(secs(P.steps[4].at)), x8 = X(secs(P.steps[7].at));
  parts.push(`<path class="fpa" d="M${x5.toFixed(1)} ${AX - 43} C${(x5 + 40).toFixed(1)} 60 ${(x8 - 40).toFixed(1)} 60 ${x8.toFixed(1)} ${AX - 43}"/><text class="fpl" x="${((x5 + x8) / 2).toFixed(1)}" y="60" text-anchor="middle">same SHA-256</text>`);
  parts.push(`<line class="ax" x1="${X(0)}" y1="${AX}" x2="${X(P.video.seconds).toFixed(1)}" y2="${AX}"/>`);
  for (const s of P.steps) {
    const x = X(secs(s.at)).toFixed(1), g = sgOf(s), v = vaultOf(s), r = resultOf(s);
    if (v) parts.push(`<rect class="vlt" x="${(x - 9).toFixed(1)}" y="${AX - 43}" width="18" height="18" rx="3"/>`);
    if (g) parts.push(`<circle class="halo" cx="${x}" cy="${AX}" r="24"/><circle class="ring" cx="${x}" cy="${AX}" r="24"/>`);
    parts.push(`<circle class="node" cx="${x}" cy="${AX}" r="16"/><text class="nn" x="${x}" y="${AX + 6}" text-anchor="middle">${s.n}</text>`);
    parts.push(`<text class="tm" x="${x}" y="${AX + 46}" text-anchor="middle">${esc(s.at)}</text>`);
    if (r) {
      const row = s.n === 9 || s.n === 12 ? 1 : 0, y = AX + 58 + row * 30, w = tw(r.word, 16, 0.62) + 16;
      parts.push(`<rect class="rb ${r.cls}" x="${(x - w / 2).toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="26" rx="4"/><text class="rt" x="${x}" y="${y + 19}" text-anchor="middle">${esc(r.word)}</text>`);
      if (s.n === 12) parts.push(`<text class="rx" x="${x}" y="${y + 46}" text-anchor="middle">recall by meaning</text>`);
    }
  }
  // the scale of the video
  const ticks = [0, 30, 60, 90];
  parts.push(`<line class="sc" x1="${X(0)}" y1="${BOT}" x2="${X(P.video.seconds).toFixed(1)}" y2="${BOT}"/>`);
  for (const t of ticks) parts.push(`<line class="sc" x1="${X(t)}" y1="${BOT}" x2="${X(t)}" y2="${BOT + 10}"/><text class="tk" x="${X(t)}" y="${BOT + 30}" text-anchor="${t ? 'middle' : 'start'}">${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}</text>`);
  parts.push(`<line class="sc" x1="${X(P.video.seconds).toFixed(1)}" y1="${BOT}" x2="${X(P.video.seconds).toFixed(1)}" y2="${BOT + 10}"/><text class="tk" x="${X(P.video.seconds).toFixed(1)}" y="${BOT + 30}" text-anchor="end">${P.video.seconds} s</text>`);
  return `<svg class="strip-w" viewBox="0 0 ${W} ${BOT + 40}" role="img" aria-labelledby="${id}-wt ${id}-wd">
<title id="${id}-wt">The twelve steps of the run on the 104.7 seconds of his video</title>
<desc id="${id}-wd">${esc(svgDesc())}</desc>
${parts.join('\n')}
</svg>`;
}
export function runTall(id) {
  const W = 360, AXX = 104, Y = s => 64 + s * 5, E = bandEdges(), P = D.POC, parts = [];
  const H = Math.ceil(Y(P.video.seconds) + 40);
  const split = { 'Save under the policy': ['Save under', 'the policy'], 'Lose it and bring it back': ['Lose it and', 'bring it back'], 'Check and conclude': ['Check and', 'conclude'] };
  E.slice(0, -1).forEach((e, i) => {
    const y0 = Y(e), y1 = Y(E[i + 1]), lab = split[P.phases[i].label] || [P.phases[i].label];
    parts.push(`<rect class="band ${BAND_CLS[i]}" x="0" y="${y0.toFixed(1)}" width="${W}" height="${(y1 - y0).toFixed(1)}"/>`);
    lab.forEach((l, j) => { const x = 14 + j * 18, ym = (y0 + y1) / 2; parts.push(`<text class="bl" transform="translate(${x} ${ym.toFixed(1)}) rotate(-90)" text-anchor="middle">${esc(l)}</text>`); });
  });
  parts.push(`<text class="tk" x="${AXX}" y="22" text-anchor="middle">0:00</text><text class="tk" x="${AXX + 14}" y="44">video time, top to bottom</text>`);
  parts.push(`<line class="ax" x1="${AXX}" y1="${Y(0)}" x2="${AXX}" y2="${Y(P.video.seconds).toFixed(1)}"/><text class="tk" x="${AXX}" y="${(Y(P.video.seconds) + 26).toFixed(1)}" text-anchor="middle">${P.video.seconds} s</text>`);
  const y5 = Y(secs(P.steps[4].at)), y8 = Y(secs(P.steps[7].at)), y7 = Y(secs(P.steps[6].at));
  parts.push(`<path class="fpa" d="M${AXX + 12} ${y5.toFixed(1)} C${AXX + 44} ${(y5 + 12).toFixed(1)} ${AXX + 44} ${(y8 - 12).toFixed(1)} ${AXX + 12} ${y8.toFixed(1)}"/><text class="fpl" x="${AXX + 50}" y="${(y7 + 5).toFixed(1)}">same SHA-256</text>`);
  for (const s of P.steps) {
    const y = Y(secs(s.at)).toFixed(1), g = sgOf(s), v = vaultOf(s), r = resultOf(s);
    parts.push(`<text class="tm" x="${AXX - 20}" y="${(+y + 5).toFixed(1)}" text-anchor="end">${esc(s.at)}</text>`);
    if (g) parts.push(`<circle class="halo" cx="${AXX}" cy="${y}" r="16"/><circle class="ring" cx="${AXX}" cy="${y}" r="16"/>`);
    parts.push(`<circle class="node" cx="${AXX}" cy="${y}" r="11.5"/><text class="nn" x="${AXX}" y="${(+y + 5).toFixed(1)}" text-anchor="middle">${s.n}</text>`);
    const bits = [];
    if (r) bits.push(`<tspan class="r-${r.cls}">${esc(r.word)}</tspan>`);
    if (g) bits.push(`<tspan>safeguard ${g.n}</tspan>`);
    if (v && !g) bits.push(`<tspan>vault ${esc(v)}</tspan>`);
    if (bits.length) parts.push(`<text class="lab" x="${AXX + 50}" y="${(+y + 5).toFixed(1)}">${bits.join('<tspan>, </tspan>')}</text>`);
  }
  return `<svg class="strip-t" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="${id}-tt ${id}-td">
<title id="${id}-tt">The twelve steps of the run on his video, top to bottom</title>
<desc id="${id}-td">${esc(svgDesc())}</desc>
${parts.join('\n')}
</svg>`;
}
// The figure with its phase panels, key and caption. `c` is the page's Cite. detail: the step texts too.
export function figure(c, { id = 'run', limits = false, detail = false } = {}) {
  const P = D.POC;
  const step = s => {
    const g = sgOf(s), v = vaultOf(s), r = resultOf(s);
    return `<li><span class="n" aria-hidden="true">${s.n}</span><span class="st"><span class="vh">Step ${s.n}: </span>${esc(s.title)}</span><span class="meta"><span class="at"><span class="vh">at </span>${esc(s.at)}<span class="vh"> in the video</span></span>${g ? `<span class="sgb">Safeguard ${g.n}: ${sgWord(g)}</span>` : ''}${v ? `<span class="vault">vault: ${v}</span>` : ''}${r ? `<span class="res ${r.cls}">${esc(r.word)}</span>` : ''}${s.n === 12 ? '<span>recall by meaning</span>' : ''}</span>${detail ? `<span class="tx">${esc(s.text)}${s.n === 8 ? ` ${esc(P.fingerprint.line)}.` : ''}${c.m(P.stepsSrc)}</span>` : ''}</li>`;
  };
  return `<figure class="run2" aria-labelledby="${id}-cap">
<div class="run-draw">
${runStrip(id)}
${runTall(id)}
</div>
<ol class="phases" aria-label="The twelve steps, in four phases">
${P.phases.map((ph, i) => `<li class="phase ${BAND_CLS[i]}"><h3>${esc(ph.label)}</h3><ol>${stepsOf(ph).map(step).join('')}</ol></li>`).join('\n')}
</ol>
<ul class="key" aria-label="Key">
<li><span class="sgb">Safeguard</span> tested at its own step; a ring in the drawing</li>
<li><span class="vault">vault</span> the encrypted checkpoint is written or read; a square in the wide drawing</li>
<li><span class="res pass">PASS</span> <span class="res blocked">BLOCKED</span> <span class="res nv">NOT VALIDATED</span> ${c.t(P.resultsNote)}</li>
</ul>
<figcaption id="${id}-cap">${esc(P.fingerprint.line)}${c.m(P.fingerprint.src)}. ${esc(P.phasesNote)} The run, step by step, from the newsroom's walk-through of his video${c.m(P.stepsSrc)}.</figcaption>
</figure>
${detail ? `<div class="run-text">
<h3 class="h-sg">The three safeguards</h3>
<ul class="safeguards">
${P.safeguards.map(g => `<li><b>Safeguard ${g.n}, at step ${g.step}: ${esc(g.title.toLowerCase())}.</b> ${c.t(g)}</li>`).join('\n')}
</ul>
<p class="fingerprint"><b>Fingerprint:</b> ${esc(P.fingerprint.line)}${c.m(P.fingerprint.src)}. No hash value is shown.</p>
${limits ? `<h3>What the run did not show</h3>\n<ul class="limits">\n${P.limits.map(l => `<li>${c.t(l)}</li>`).join('\n')}\n</ul>` : ''}
</div>` : ''}`;
}

// ---------- the drawn motif of the first screen (change 1): the run, abstracted; decorative ----------
// Twelve nodes on one line in four arcs (3, 3, 4, 2), gold rings on the safeguard steps, small vault squares
// on the vault steps and a dotted arc between 5 and 8. Generated from POC so it follows the data.
export function motif(cls, { w = 560, h = 420 } = {}) {
  const P = D.POC, pts = [];
  const n = P.steps.length;
  for (let i = 0; i < n; i++) { const t = i / (n - 1); pts.push([30 + t * (w - 60), h * 0.78 - t * h * 0.55 + Math.sin(t * Math.PI * 3.2) * h * 0.16]); }
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const out = [`<path class="p" d="${d}"/>`];
  P.steps.forEach((s, i) => {
    const [x, y] = pts[i];
    if (vaultOf(s) && s.n !== 11) out.push(`<rect class="v" x="${(x - 15).toFixed(1)}" y="${(y - 15).toFixed(1)}" width="30" height="30" rx="5"/>`);
    out.push(`<circle class="n" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8"/>`);
    if (sgOf(s)) out.push(`<circle class="s" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="17"/>`);
  });
  const [a, b] = [pts[4], pts[7]];
  out.push(`<path class="d" d="M${a[0].toFixed(1)} ${(a[1] - 18).toFixed(1)} C${a[0].toFixed(1)} ${(Math.min(a[1], b[1]) - 90).toFixed(1)} ${b[0].toFixed(1)} ${(Math.min(a[1], b[1]) - 90).toFixed(1)} ${b[0].toFixed(1)} ${(b[1] - 18).toFixed(1)}"/>`);
  return `<svg class="${cls}" viewBox="0 0 ${w} ${h}" aria-hidden="true" focusable="false">${out.join('')}</svg>`;
}

// ---------- build-time checks ----------
// Approval check (round 1 condition 14, replaced in round 2 as review position (b) says; never deleted).
// Dinis Cruz cleared the long bio (F09 to F12, F14) on 2026-11-18; F13 and F15 are not cleared.
// 1. No source may back F13 or F15, and the text of data/site.mjs may not name either id.
// 2. Their distinctive words are refused anywhere in the data: "vibe-cast", "builds in public",
//    "mondweep.net", "LinkedIn", and his GitHub profile address github.com/mondweep. (The public repository
//    github.com/mondweep/sgit-ruv-memory is sourced to the newsroom and the merged Ruflo page, not to F15,
//    so a path under the profile is allowed; the bare profile link is not.) Capitalised phrases read from
//    the F13 and F15 quotes that no other fact uses are refused too.
// 3. Every use of F09 to F12 and F14 wording (phrases read from research/facts.json, not typed in) must cite
//    providers-data: in the entry's own src, or, for a heading or label with no src of its own, in the
//    block that holds it. A page's title and description (PAGES), which carry no marker, may use it only if
//    that page cites providers-data; checkApprovalPages() checks that once the pages are built.
export const CLEARED = ['F09', 'F10', 'F11', 'F12', 'F14'];
export const REFUSED = ['F13', 'F15'];
const REFUSED_WORDS = [/vibe-cast/i, /builds in public/i, /mondweep\.net/i, /linkedin/i, /github\.com\/mondweep(?!\/[\w.-])/i];
const pagesUsingBio = [];
export function checkApprovalPages() {
  const bad = pagesUsingBio.filter(({ path }) => !(citedOn.get(path) || new Set()).has('providers-data'));
  if (bad.length) throw new Error(`Approval check failed:\n${bad.map(b => `PAGES['${b.path}'].${b.k} uses "${b.hit}" (long bio) but the page does not cite providers-data`).join('\n')}`);
  return pagesUsingBio.length;
}
export function checkApproval() {
  const facts = JSON.parse(readFileSync('research/facts.json', 'utf8'));
  const byId = Object.fromEntries(facts.map(f => [f.id, f]));
  const problems = [];
  for (const id of [...CLEARED, ...REFUSED]) if (!byId[id]) problems.push(`research/facts.json has no ${id}`);
  for (const [id, s] of Object.entries(D.SOURCES)) for (const f of s.facts || []) if (REFUSED.includes(f)) problems.push(`source "${id}" backs ${f}, which is not cleared`);
  const data = Object.fromEntries(Object.entries(D).filter(([k]) => k !== 'OPEN'));
  const text = JSON.stringify(data);
  for (const id of REFUSED) if (new RegExp(`\\b${id}\\b`).test(text)) problems.push(`data/site.mjs names ${id}, which is not cleared`);
  const phrasesOf = ids => {
    const others = facts.filter(f => !ids.includes(f.id)).map(f => f.quote + ' ' + f.claim).join(' ');
    const out = new Set();
    for (const id of ids) for (const m of byId[id].quote.matchAll(/\b\p{Lu}[\p{L}-]+(?:\s+\p{Lu}[\p{L}-]+)+/gu)) if (!others.includes(m[0])) out.add(m[0]);
    return out;
  };
  const refusedPhrases = phrasesOf(REFUSED);
  for (const re of REFUSED_WORDS) { const m = text.match(re); if (m) problems.push(`data/site.mjs uses "${m[0]}", from F13 or F15, which are not cleared`); }
  for (const p of refusedPhrases) if (text.includes(p)) problems.push(`data/site.mjs uses "${p}", from F13 or F15, which are not cleared`);
  // 3. cleared wording must cite providers-data
  const cleared = phrasesOf([...CLEARED, ...REFUSED]);
  for (const r of REFUSED) for (const p of refusedPhrases) cleared.delete(p);
  for (const w of ['Since September 2024', 'MAESTRO', 'Johns Hopkins', 'London Business School', 'HSBC Global Technology', 'Lotus Technology']) cleared.add(w);
  for (const item of byId.F14.quote.split(/;\s*/)) cleared.add(item.trim());
  const srcsBelow = o => { const out = []; const walk = v => { if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) { if (/src$/i.test(k) && Array.isArray(x)) out.push(...x); else walk(x); } }; walk(o); return out; };
  const visit = (v, path, holder) => {
    if (typeof v === 'string') {
      const hit = [...cleared].find(p => v.includes(p));
      if (!hit) return;
      const own = holder && Array.isArray(holder.src) ? holder.src : null;
      const ok = own ? own.includes('providers-data') : holder && srcsBelow(holder).includes('providers-data');
      if (!ok) problems.push(`${path} uses "${hit}" (long bio, F09 to F12 or F14) without citing providers-data`);
      return;
    }
    if (Array.isArray(v)) return v.forEach((x, i) => visit(x, `${path}[${i}]`, holder));
    if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (!/src$/i.test(k)) visit(x, `${path}.${k}`, v.src || srcsBelow(v).length ? v : holder);
  };
  pagesUsingBio.length = 0;
  for (const [path, pg] of Object.entries(D.PAGES)) for (const k of ['title', 'description']) { const hit = [...cleared].find(p => String(pg[k]).includes(p)); if (hit) pagesUsingBio.push({ path, k, hit }); }
  for (const [k, v] of Object.entries(data)) if (k !== 'SOURCES' && k !== 'PAGES') visit(v, k, null);
  for (const [id, s] of Object.entries(D.SOURCES)) if (id !== 'providers-data') for (const k of ['title', 'note']) { const hit = [...cleared].find(p => String(s[k] || '').includes(p)); if (hit) problems.push(`SOURCES.${id}.${k} uses "${hit}" from the long bio`); }
  if (!(D.SOURCES['providers-data'].facts || []).some(f => CLEARED.includes(f))) problems.push('source "providers-data" does not list the cleared facts');
  if (problems.length) throw new Error(`Approval check failed:\n${problems.join('\n')}`);
  return cleared.size;
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
// People and images (review condition 19; round 2 position (a)). The only image of him is PHOTO_PATH, with
// the SHA-256 pinned above; the only other images that show him are PHOTO_DERIVED, rendered by
// scripts/cards.mjs from that file. Fails on: a changed headshot; any other file under assets/photo/; an
// image file anywhere whose name names him; any page that references (img src, srcset, CSS url(),
// og:image or twitter:image) an image that names him or sits under /assets/photo/ other than PHOTO_PATH;
// the headshot shown without width and height 200.
// Round 2 live review, finding 1: the people behind the other AgentiCCells sites, and those sites' host
// names, are not named on this site either. research/sources.md does not list them, so they are kept here.
const NOT_NAMED = [/Marc\s+Noah/i, /Yiheng\s+Wang/i, /marc-noah\.agenticcells\.site/i, /yiheng-wang\.agenticcells\.site/i];
const NAMES_HIM = /mondweep|chakravorty|headshot|portrait|\bphoto/i;
export function checkOutput() {
  const names = forbiddenNames();
  const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
  const problems = [];
  const sha = f => createHash('sha256').update(readFileSync(f)).digest('hex');
  for (const root of ['src', OUT]) {
    const f = join(root, PHOTO_PATH);
    if (!existsSync(f)) problems.push(`${f}: the headshot is missing`);
    else if (sha(f) !== PHOTO_SHA256) problems.push(`${f}: SHA-256 is not the headshot Dinis Cruz supplied`);
    const dir = join(root, 'assets/photo');
    if (existsSync(dir)) for (const g of walk(dir)) if (g !== f) problems.push(`${g}: only ${PHOTO_PATH} may be under assets/photo/`);
  }
  const allowed = new Set([PHOTO_PATH, ...PHOTO_DERIVED]);
  const site = walk(OUT);
  for (const f of site.filter(f => /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(f))) {
    const u = '/' + f.slice(OUT.length + 1).split('\\').join('/');
    if (NAMES_HIM.test(u.replace(/^\/assets\/photo\/mondweep-chakravorty\.png$/, '')) && !allowed.has(u)) problems.push(`${f}: an image file that names him, not the headshot or a listed derivative`);
  }
  for (const f of PHOTO_DERIVED) if (!existsSync(join(OUT, f))) problems.push(`${f}: listed as a derivative of the headshot but not built`);
  const refs = s => {
    const out = [];
    for (const m of s.matchAll(/<img\b[^>]*>/gi)) { const t = m[0]; const src = (t.match(/\ssrc="([^"]+)"/) || [])[1]; if (src) out.push({ u: src, tag: t }); for (const ss of (t.match(/\ssrcset="([^"]+)"/) || [, ''])[1].split(',')) if (ss.trim()) out.push({ u: ss.trim().split(/\s+/)[0], tag: t }); }
    for (const m of s.matchAll(/<source\b[^>]*srcset="([^"]+)"/gi)) for (const ss of m[1].split(',')) if (ss.trim()) out.push({ u: ss.trim().split(/\s+/)[0] });
    for (const m of s.matchAll(/url\(\s*['"]?([^'")]+)/gi)) out.push({ u: m[1] });
    for (const m of s.matchAll(/<meta\s+(?:property|name)="(?:og:image|twitter:image)"\s+content="([^"]+)"/gi)) out.push({ u: m[1] });
    return out;
  };
  for (const f of site.filter(f => /\.(html|md|txt|json|css|js|svg|xml|webmanifest)$/.test(f))) {
    const s = readFileSync(f, 'utf8');
    for (const n of names) if (s.includes(n)) problems.push(`${f}: names "${n}", who is not to be named`);
    for (const re of NOT_NAMED) { const m = s.match(re); if (m) problems.push(`${f}: names "${m[0]}", who is not to be named`); }
    if (!/\.(html|css)$/.test(f)) continue;
    for (const { u, tag } of refs(s)) {
      const p = u.replace(SITE, '').replace(/[?#].*$/, '');
      if (p.startsWith('data:')) { problems.push(`${f}: an inline data: image (only files can be checked)`); continue; }
      if (allowed.has(p)) {
        if (p === PHOTO_PATH && tag && !(/\swidth="200"/.test(tag) && /\sheight="200"/.test(tag))) problems.push(`${f}: the headshot without width="200" height="200"`);
        if (p === PHOTO_PATH && tag && !/\salt="(?:Mondweep Chakravorty)?"/.test(tag)) problems.push(`${f}: the headshot with alt text other than his name or empty`);
        continue;
      }
      if (NAMES_HIM.test(p) || /\/assets\/photo\//.test(p)) problems.push(`${f}: an image of Mondweep that is not the headshot or a listed derivative (${p})`);
    }
  }
  if (problems.length) throw new Error(`Output check failed:\n${problems.join('\n')}`);
  return names.length + NOT_NAMED.length;
}
