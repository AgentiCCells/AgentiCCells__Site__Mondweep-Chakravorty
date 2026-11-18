// Copyright 2026 AgentiCCells. Licensed under the Apache License, Version 2.0
// (http://www.apache.org/licenses/LICENSE-2.0). The text it writes is CC BY 4.0.
//
// Build step: the five designs under /d/ (round 1 proposal section 2, review conditions 23 to 32).
// /d/ is a plain index (works without JavaScript); /d/ledger/ is the main home with
// <link rel="canonical" href="/">; /d/broadsheet/, /d/runlog/, /d/blueprint/ and /d/vault/ are single
// pages with the same facts and sources as /, generated from the same data (homeModel in lib.mjs).
// A build check throws if any source cited on / is missing from a design.
// Written by developer.mondweep-chakravorty@AgentiCCells.dinis, round 1 (2026-11-18).
// Round 2 (same day), from team/rounds/2/design/PROPOSAL.md changes 6 to 9 and mockups/designs.html and
// mockups/vault.html, with review conditions 9, 10, 25 to 29 and 32 to 35: each design now draws the run
// its own way on its first screen. Broadsheet: the run as Plate 1 with a caption column. Run log: story
// and terminal panes, with video times and results. Blueprint: one drawn sheet with zones, balloons and a
// title block. Vault: the run as one vault door, generated from POC (steps, gatedSteps, cliSteps,
// vaultSteps, safeguards). Every drawing is generated here from data/site.mjs, not hand-placed.
import { readFileSync } from 'node:fs';
import { D, esc, write, head, page, Cite, citedOn, homeModel, mailto, designsDialog, DESIGNS_SCRIPT, DESIGNS, fmtDate, photoImg, workBlock, numbersList, careerSummary, sgOf, sgWord, vaultOf, resultOf } from './lib.mjs';
import { homeBody } from './generate.mjs';

const byId = id => DESIGNS.find(d => d.id === id);
const strip = d => `<div class="strip"><div class="wrap"><p><span>Design: ${esc(d.name)}${d.id === 'ledger' ? ', the main site\'s home page; its canonical address is the home page' : ''}.</span> <a class="designs" href="/d/">Designs</a> <a href="/">Main site</a></p></div></div>`;
const P = D.POC;
const pad = n => String(n).padStart(2, '0');
const phaseOf = s => P.phases.find(p => p.steps.includes(s.n));
const stepsOf = ph => ph.steps.map(n => P.steps.find(s => s.n === n));

// ---------- /d/ ----------
write('d/index.html', page({
  path: '/d/', ...D.PAGES['/d/'],
  body: `<h1>Designs</h1>
<p class="lede">The same facts and sources, five ways. Ledger is the main site; each of the other four draws the run in its own way.</p>
<ul class="dcards">
${DESIGNS.map(d => `<li><a href="${d.href}"><img src="/assets/designs/${d.id}.png" alt="" width="960" height="600" loading="lazy"><b>${esc(d.name)}${d.id === 'ledger' ? ' (main site)' : ''}</b><span>${esc(d.idea)}</span><span class="best">Best for: ${esc(d.best)}.</span></a></li>`).join('\n')}
</ul>
<p>Each design is one page with the same facts as the home page: who he is, his career, the proof of concept with its twelve steps and three safeguards, the Ruflo pull request, the London chapter, how to work with him, and the collaboration with Dinis Cruz. Each cites the same sources. The Ledger design is also listed at <a href="/d/ledger/">/d/ledger/</a>.</p>`,
}));

// ---------- /d/ledger/ ----------
{
  const c = new Cite('/d/ledger/');
  const html = page({ path: '/d/ledger/', canonical: '/', title: 'Ledger design', description: `The Ledger design: the main site. ${byId('ledger').idea} The canonical page is the home page.`, current: 'ledger', before: strip(byId('ledger')), bleed: true, onField: true,
    body: `${homeBody(c)}\n<div class="wrap">${c.list()}</div>` });
  write('d/ledger/index.html', html);
}

// ---------- shared CSS for the four other designs (each sets its own tokens) ----------
const css = readFileSync('src/style.css', 'utf8');
const DIALOG_CSS = css.slice(css.indexOf('/* ---------- the Designs pop-up'), css.indexOf('/* ---------- the team behind this site'));
const BASE = `*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:1.0625rem/1.6 var(--font);overflow-wrap:break-word}
a{color:var(--link);text-underline-offset:.2em}
:focus-visible{outline:3px solid var(--focus);outline-offset:3px}
code{font-family:var(--mono);overflow-wrap:anywhere}
.vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap}
.skip{position:absolute;left:-9999px;top:0;display:inline-flex;align-items:center;min-height:44px}.skip:focus{left:1rem;top:1rem;z-index:10;background:var(--bg);color:var(--ink);padding:.75rem 1rem;outline:3px solid var(--focus)}
.wrap{max-width:76rem;margin:0 auto;padding:0 1rem}
main{overflow-x:clip}
p,li{max-width:42rem}
.strip{background:var(--strip-bg);color:var(--strip-ink);font:.95rem/1.4 system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}
.strip p{margin:0;display:flex;flex-wrap:wrap;align-items:center;gap:0 .9rem;max-width:none}
.strip a{color:var(--strip-ink);display:inline-flex;align-items:center;min-height:44px}
.strip :focus-visible{outline-color:var(--strip-focus)}
.btn{font:inherit;min-height:44px;min-width:44px;padding:0 1rem;display:inline-flex;align-items:center;justify-content:center;border:2px solid var(--ink);color:var(--ink);background:transparent;text-decoration:none;cursor:pointer;white-space:nowrap}
.btn.primary{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
.cta{display:flex;flex-wrap:wrap;gap:.5rem;margin:1rem 0}
.more{display:inline-flex;align-items:center;min-height:44px;font-weight:700}
sup.mk{line-height:0;font-size:.72em;vertical-align:super}.mks{white-space:nowrap}
sup.mk a{position:relative;display:inline;font-weight:700;text-decoration:none;padding:0 .18em;font-family:system-ui,sans-serif}
sup.mk a::after{content:"";position:absolute;left:50%;top:50%;width:44px;height:44px;transform:translate(-50%,-50%)}
.sources{margin-top:3rem}.sources li{margin:.5rem 0;overflow-wrap:anywhere}
.back{display:inline-flex;align-items:center;min-height:44px}
.work{display:grid;gap:1.5rem 2.5rem;margin:1rem 0}@media (min-width:52rem){.work{grid-template-columns:1.1fr 1fr}}
.work p,.work li{max-width:none}
.types,.offers,.next{list-style:none;padding:0;margin:0}
.types{counter-reset:t}.types li{counter-increment:t;display:flex;gap:.7rem;padding:.45rem 0;border-top:1px solid var(--line)}
.types li::before{content:counter(t);font-weight:800;color:var(--link);min-width:1.2rem}
.offers li{padding:.45rem 0;border-top:1px solid var(--line)}.offers b{display:block}
.tag{display:inline-block;font:700 .72rem/1.6 system-ui,sans-serif;letter-spacing:.06em;text-transform:uppercase;border:1px solid currentColor;padding:0 .45rem;margin-left:.35rem;border-radius:999px}
.enquire{border:2px solid var(--link);padding:1rem 1.2rem;align-self:start}
.enquire .mail a{display:inline-flex;align-items:center;min-height:44px;font-size:1.25rem;font-weight:700;overflow-wrap:anywhere}
.next li{position:relative;padding:.45rem 0 .45rem 1.3rem;border-top:1px solid var(--line)}
.next li::before{content:"";position:absolute;left:.15rem;top:1rem;width:.5rem;height:.5rem;border-radius:50%;background:var(--link)}
.small{font-size:.9rem}
.table{overflow-x:auto}table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:.4rem .6rem;border-bottom:1px solid var(--muted);vertical-align:top}
footer.dfoot{margin-top:3rem;padding:1.5rem 0 2.5rem;border-top:1px solid var(--muted);font-size:.95rem}
footer.dfoot ul{display:flex;flex-wrap:wrap;gap:0 1.1rem;list-style:none;padding:0;margin:0 0 .5rem}footer.dfoot a{display:inline-flex;align-items:center;min-height:44px}
${DIALOG_CSS}
@media (prefers-reduced-motion:no-preference){.btn{transition:background-color .15s}}`;

const tokens = (d, extra) => `:root{--bg:${d.pal.bg};--ink:${d.pal.ink};--muted:${d.pal.muted};--accent:${d.pal.accent};--on-accent:${d.pal.onAccent};--font:${d.pal.font};--sans:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;--mono:ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;${extra}}`;
const foot = () => `<footer class="dfoot"><div class="wrap">
<ul><li><a href="/">Main site</a></li><li><a href="/d/">All designs</a></li><li><a href="/sources/">Sources</a></li><li><a href="/ai/">Use with AI</a></li><li><a href="/behind-the-scenes/">Behind the scenes</a></li></ul>
<p>Version __VERSION__. Code ${esc(D.SITE.licence.code)}, text ${esc(D.SITE.licence.text)}. Facts from public sources, read ${esc(fmtDate(D.SITE.read))}.</p>
</div></footer>`;
function designPage(id, { css, body }) {
  const d = byId(id);
  const path = `/d/${id}/`;
  const html = `${head({ path, title: `${d.name} design`, description: `The ${d.name} design of the Mondweep Chakravorty site. ${d.idea}`, stylesheet: '', css: tokens(d, css.vars) + BASE + css.rules })}
<body class="d-${id}">
<a class="skip" href="#main">Skip to content</a>
${strip(d)}
${body}
${foot()}
${designsDialog(id, path)}
${DESIGNS_SCRIPT}
</body>
</html>
`;
  write(`d/${id}/index.html`, html);
}
const ps = (c, list) => list.map(o => `<p>${c.t(o)}</p>`).join('\n');
const quote = (c, M, cls = 'pq') => `<blockquote class="${cls}"><p>"${esc(M.pullQuote.text)}"</p><footer>${esc(M.pullQuote.cite)}${c.m(M.pullQuote.src)}</footer></blockquote>`;
const stepNote = s => {
  const g = sgOf(s), v = vaultOf(s), r = resultOf(s), bits = [];
  if (s.n === 1) bits.push('ruflo --version returns v3.56.10');
  if (s.n === 2) bits.push('4 policy rows; unsupported or ambiguous policies fail closed');
  if (s.n === 10) bits.push('Key not found');
  if (g) bits.push(`safeguard ${g.n}: ${sgWord(g)}`);
  if (v) bits.push(`vault: ${v}`);
  if (s.n === 8) bits.push('SHA-256 same as step 5');
  if (s.n === 12) bits.push('recall by meaning; embeddings were off');
  return bits.join('; ');
};

// ---------- Broadsheet: a front page, the run as Plate 1 (change 6; conditions 25, 26) ----------
{
  const c = new Cite('/d/broadsheet/');
  const M = homeModel();
  const plateLabel = s => {
    const g = sgOf(s), v = vaultOf(s);
    if (g && v) return `Safeguard ${g.n}, vault`;
    if (g) return `Safeguard ${g.n}`;
    if (v) return `Vault ${v.replace('read and rejected', 'rejected')}`;
    return phaseOf(s).label.replace('Save under the policy', 'Save').replace('Lose it and bring it back', 'Restore').replace('Check and conclude', 'Check');
  };
  const css = {
    vars: '--link:#9B1C1C;--focus:#9B1C1C;--line:#8E887C;--strip-bg:#161513;--strip-ink:#F4F1EA;--strip-focus:#F2C14E',
    rules: `.mast{border-top:6px double var(--ink);border-bottom:1px solid var(--ink);text-align:center;padding:.45rem 0;margin-top:1.25rem}
.mast p{margin:0 auto;max-width:none;font:700 clamp(1.6rem,4.5vw,2.6rem)/1.1 var(--font);letter-spacing:.02em}
.dateline{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.25rem 1rem;border-bottom:3px solid var(--ink);padding:.35rem 0;font:600 .8rem/1.4 var(--sans);text-transform:uppercase;letter-spacing:.07em}
.front{display:grid;grid-template-columns:minmax(0,4fr) minmax(0,5fr) minmax(0,3fr);margin-top:1.25rem}
.front>*{padding:0 1.25rem}.front>*:first-child{padding-left:0}.front>*:last-child{padding-right:0}
.front>*+*{border-left:1px solid var(--line)}
.kick{font:700 .8rem/1.3 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:#9B1C1C;margin:0 0 .35rem}
h1{font-size:clamp(2.6rem,4vw,3.6rem);line-height:.98;letter-spacing:-.02em;margin:0 0 .85rem;overflow-wrap:normal}
.por{float:right;margin:.2rem 0 .5rem .9rem;width:132px}
.por img{display:block;width:132px;height:132px;object-fit:cover;border:1px solid var(--ink);filter:grayscale(.15)}
.sf{font-size:1.18rem;font-style:italic;line-height:1.45;margin:0 0 .75rem}
.front .cta{clear:both}
.plate-h,.cap-h{font:700 .8rem/1.3 var(--sans);letter-spacing:.08em;text-transform:uppercase;border-bottom:2px solid var(--ink);padding-bottom:.3rem;margin:0 0 .6rem}
.plate{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;list-style:none;margin:0;padding:0}
.plate li{aspect-ratio:1;border:1.5px solid var(--ink);display:flex;flex-direction:column;justify-content:space-between;padding:.35rem .45rem;background:#FFFDF8;max-width:none}
.plate b{font-size:clamp(1.6rem,3vw,2.6rem);line-height:1}
.plate span{font:700 .8rem/1.15 var(--sans);letter-spacing:.03em;text-transform:uppercase}
.plate li.sg{background:#9B1C1C;color:#FFFFFF;border-color:#9B1C1C}
.plate li.vlt{background-image:repeating-linear-gradient(135deg,transparent 0 6px,#E2D7BF 6px 9px)}
.plate li.sg.vlt{background-image:repeating-linear-gradient(135deg,transparent 0 6px,#7A1414 6px 9px)}
.plate-k{font:.85rem/1.45 var(--sans);margin:.6rem 0 0}
.cap{margin:0;padding:0 0 0 1.6rem;font-size:.92rem;line-height:1.35}
.cap li{margin:0 0 .35rem}.cap em{color:#9B1C1C;font-style:normal;font-weight:700}.cap .t{font:.8rem var(--mono);color:var(--muted)}
.inbrief{display:grid;grid-template-columns:repeat(4,1fr);border-top:3px solid var(--ink);border-bottom:1px solid var(--ink);list-style:none;padding:0;margin:2rem 0 0}
.inbrief li{padding:.75rem 1rem;max-width:none;font-size:.95rem}.inbrief li+li{border-left:1px solid var(--line)}
.inbrief b{display:block;font-size:2.2rem;line-height:1.1}
h2{font-size:1.9rem;line-height:1.15;margin:2.5rem 0 .6rem;border-top:1px solid var(--ink);padding-top:.75rem}
h3{font:700 .95rem/1.3 var(--sans);text-transform:uppercase;letter-spacing:.06em;margin:1.25rem 0 .5rem}
.cols p{max-width:none;margin:0 0 .8rem}
.cols>p:first-child::first-letter{float:left;font-size:4.2rem;line-height:.85;font-weight:700;color:#9B1C1C;padding:.3rem .5rem 0 0}
@media (min-width:50rem){.cols{columns:2;column-gap:2.5rem;column-rule:1px solid var(--line)}}
@media (min-width:72rem){.cols.three{columns:3}}
.pq{margin:2rem 0;padding:1.25rem 0;border-top:3px solid var(--ink);border-bottom:3px solid var(--ink);text-align:center}
.pq p{font-size:clamp(1.3rem,2.6vw,1.9rem);font-style:italic;line-height:1.3;max-width:52rem;margin:0 auto .75rem}
.pq footer{font:.9rem var(--sans)}
.enquire{border-color:var(--ink);background:#FFFDF8}
.btn{font-family:var(--sans)}
@media (max-width:56rem){
  .front{grid-template-columns:1fr}.front>*{padding:0!important;border:0!important}
  .front>*+*{margin-top:1.5rem}
  .por{width:96px}.por img{width:96px;height:96px}
  .plate b{font-size:1.5rem}.plate span{font-size:.75rem}
  .inbrief{grid-template-columns:1fr 1fr}.inbrief li:nth-child(3){border-left:0}
}
@media (max-width:30rem){
  .plate{grid-template-columns:repeat(3,minmax(0,1fr))}.plate li{aspect-ratio:auto;min-height:5.5rem}
}`,
  };
  designPage('broadsheet', { css, body: `<main id="main" class="wrap">
<div class="mast"><p>A profile</p></div>
<div class="dateline"><span>London</span><span>The SGit × Ruflo run, in twelve steps</span><span>Facts read ${esc(fmtDate(D.SITE.read))}</span></div>
<div class="front">
<div>
<p class="kick">${c.t(M.hero.eyebrow)}</p>
<h1>${esc(D.PERSON.name).replace(' ', '<br>')}</h1>
<figure class="por">${photoImg()}</figure>
<p class="sf">${c.t(M.lede)}</p>
<p class="cta"><a class="btn primary" href="/proof-of-concept/">See the proof of concept</a> <a class="btn" href="#work">Work with him</a></p>
</div>
<div>
<p class="plate-h" id="bs-plate">Plate 1. Memory saved, the project deleted, the memory back</p>
<div role="img" aria-labelledby="bs-plate" aria-describedby="bs-cap"><ul class="plate">
${P.steps.map(s => `<li class="${[sgOf(s) ? 'sg' : '', vaultOf(s) ? 'vlt' : ''].join(' ').trim()}"><b>${s.n}</b><span>${esc(plateLabel(s))}</span></li>`).join('')}
</ul></div>
<p class="plate-k">Red: a safeguard tested at its step. Hatched: the encrypted vault is written or read (steps ${P.vaultSteps.join(', ')}). ${esc(P.fingerprint.line)}${c.m(P.fingerprint.src)}.</p>
</div>
<div>
<h2 class="cap-h" id="bs-cap-h">The steps</h2>
<ol class="cap" id="bs-cap" aria-labelledby="bs-cap-h">
${P.steps.map(s => { const g = sgOf(s); return `<li>${esc(s.title)}${g ? `: <em>${sgWord(g)}</em>` : ''} <span class="t">${esc(s.at)}</span></li>`; }).join('\n')}
</ol>
<p class="plate-k">Steps and times from the newsroom's walk-through of his video${c.m(P.stepsSrc)}. ${esc(P.phasesNote)}</p>
</div>
</div>
${numbersList(c, 'inbrief')}
<h2>${esc(M.career.heading)}</h2>
<div class="cols">${careerSummary(c)}</div>
<p><a class="more" href="${M.career.href}">${esc(M.career.linkText)}</a></p>
<h2>Memory saved, the project deleted, the memory back</h2>
<div class="cols three">${ps(c, M.poc.paras)}<p>${c.t(P.vaultText)}</p><p>${c.t(M.poc.limit)}</p><p>${c.t(P.resultsNote)}</p></div>
<p><a class="more" href="/proof-of-concept/">The proof of concept in full</a></p>
${quote(c, M)}
<h2>A page merged into Ruflo</h2>
<div class="cols">${ps(c, M.pr.paras)}</div>
<h2>The London chapter</h2>
<div class="cols">${ps(c, M.london.paras)}</div>
<h2 id="work">${esc(M.work.heading)}</h2>
${workBlock(c, { h: 3, id: 'bw' })}
<h2>With Dinis Cruz</h2>
<div class="cols">${ps(c, M.collab.paras)}</div>
${c.list()}
</main>` });
}

// ---------- Run log: story on the left, the run's log on the right (change 7; conditions 9, 10, 27) ----------
{
  const c = new Cite('/d/runlog/', { fmt: n => `[${n}]` });
  const M = homeModel();
  const css = {
    vars: '--link:#7EE2A8;--focus:#F2C14E;--line:#2A3340;--strip-bg:#1B222C;--strip-ink:#D7DEE8;--strip-focus:#F2C14E',
    rules: `body{font-size:1rem;line-height:1.65}
.panes{display:grid;grid-template-columns:minmax(0,26rem) minmax(0,1fr);grid-template-rows:auto 1fr;gap:1.5rem;padding:1.5rem 0}
.story{border:1px solid #3A4554;padding:1rem 1.1rem;align-self:start;grid-column:1;grid-row:1}
.panes .term{grid-column:2;grid-row:1/span 2;align-self:start}
.panes .blk{grid-column:1;grid-row:2;align-self:start;margin:0;font-size:.9rem;line-height:1.5}
.panes .blk .kv{margin:0}.panes .blk .kv li{margin:.15rem 0}
.story p{margin:.45rem 0}
.tagl{color:#9AA6B5}
h1{color:#7EE2A8;font-size:1.8rem;line-height:1.15;margin:.4rem 0 .6rem}
.term{border:1px solid #3A4554;background:#0A0D12}
.tbar{display:flex;gap:.4rem;align-items:center;border-bottom:1px solid #3A4554;padding:.45rem .75rem;color:#9AA6B5;font-size:.85rem}
.tbar i{width:.7rem;height:.7rem;border-radius:50%;background:#3A4554;display:inline-block}
.tbar i:first-child{background:#FF8A80}.tbar i:nth-child(2){background:#F2C14E}.tbar i:nth-child(3){background:#7EE2A8}
.log{list-style:none;margin:0;padding:.6rem .75rem}
.log li{display:grid;grid-template-columns:4.2rem 3.4rem 5.4rem minmax(0,1fr) auto;gap:0 .6rem;padding:.22rem 0;max-width:none;border-bottom:1px dashed #1E2631}
.log .tm{color:#9AA6B5}.log .no{color:#F2C14E}.log .ph{color:#9AA6B5}
.ok{color:#7EE2A8;font-weight:700}.bl{color:#FF8A80;font-weight:700}.nv{color:#F2C14E;font-weight:700}
.log .note{grid-column:4/-1;color:#9AA6B5;font-size:.88rem}
.lfoot{border-top:1px solid #3A4554;padding:.6rem .75rem;color:#9AA6B5;font-size:.88rem;margin:0;max-width:none}
.blk{border:1px solid #3A4554;padding:1rem 1.1rem;margin:1.25rem 0}
.blk p,.blk li{max-width:52rem}
h2{font-size:1.05rem;margin:0 0 .5rem;color:#F2C14E}
h2::before{content:"# " / "";color:#9AA6B5}
h3{font-size:1rem;color:#D7DEE8;margin:1.1rem 0 .3rem}
h3::before{content:"## " / "";color:#9AA6B5}
.kv{list-style:none;padding:0}.kv li::before{content:"- " / "";color:#9AA6B5}
.kv b{color:#7EE2A8}
.pq{margin:0;border-left:3px solid #F2C14E;padding-left:1rem}.pq p{font-style:italic}.pq footer{color:#9AA6B5;font-size:.9rem}
.btn{border-color:#D7DEE8;color:#D7DEE8}.btn.primary{background:#7EE2A8;border-color:#7EE2A8;color:#0E1116}
.enquire{border-color:#3A4554}
.tag{color:#F2C14E}
.sources h2::before{content:"# " / ""}
sup.mk a{font-family:var(--mono)}
@media (max-width:56rem){
  .panes{grid-template-columns:1fr;grid-template-rows:none;gap:1rem;padding:1rem 0}
  .story,.panes .term,.panes .blk{grid-column:1;grid-row:auto}
  .log li{grid-template-columns:3.6rem 3rem minmax(0,1fr)}
  .log .ph{display:none}
  .log .rs{grid-column:3}
  .log .note{grid-column:3}
}`,
  };
  const rcls = r => (r ? { pass: 'ok', blocked: 'bl', nv: 'nv' }[r.cls] : '');
  designPage('runlog', { css, body: `<main id="main" class="wrap">
<div class="panes">
<section class="story" aria-labelledby="rl-h">
<p class="tagl"># a design of this site; nothing here runs</p>
<h1 id="rl-h">${esc(D.PERSON.name)}</h1>
<p>${c.t(M.hero.eyebrow)}</p>
<p>${c.t(M.hero.line)}</p>
<p>${c.t(M.hero.lede)}</p>
<p class="cta"><a class="btn primary" href="/proof-of-concept/">See the proof of concept</a> <a class="btn" href="#work">Work with him</a></p>
</section>
<section class="term" aria-labelledby="rl-run">
<h2 class="tbar" id="rl-run"><i></i><i></i><i></i><span>sgit-ruflo run, 12 steps, video ${P.video.seconds} s${c.m(P.stepsSrc)}</span></h2>
<ol class="log" aria-label="The twelve steps of the run, with video times and results">
${P.steps.map(s => { const r = resultOf(s); const n = stepNote(s); return `<li><span class="tm">[${esc(s.at)}]</span><span class="no">${pad(s.n)}/12</span><span class="ph">${esc(phaseOf(s).id)}</span><span class="ti">${esc(s.title)}</span><span class="rs ${rcls(r)}">${r ? esc(r.word) : ''}</span>${n ? `<span class="note">${esc(n)}</span>` : ''}</li>`; }).join('\n')}
</ol>
<p class="lfoot">[mm:ss] is the time in his video. ${c.t(P.resultsNote)} ${esc(P.phasesNote)}</p>
</section>
<section class="blk" aria-labelledby="rl-num"><h2 id="rl-num">numbers</h2>
<ul class="kv">${M.numbers.map(n => `<li><b>${esc(n.value)}</b> ${esc(n.label)}${c.m(n.src)}</li>`).join('')}</ul></section>
</div>
<section class="blk" aria-labelledby="rl-car"><h2 id="rl-car">career</h2>
${careerSummary(c)}
<p><a class="more" href="${M.career.href}">${esc(M.career.linkText)}</a></p></section>
<section class="blk" aria-labelledby="rl-poc"><h2 id="rl-poc">what the run shows</h2>
${ps(c, M.poc.paras)}
<p><span class="nv">fingerprint</span>: ${esc(P.fingerprint.line)}${c.m(P.fingerprint.src)}</p>
<p><span class="nv">vault</span>: ${c.t(P.vaultText)}</p>
<p><span class="nv">limit</span>: ${c.t(M.poc.limit)}</p>
<p><a class="more" href="/proof-of-concept/">The proof of concept in full</a></p></section>
<section class="blk" aria-labelledby="rl-q"><h2 id="rl-q">in dinis cruz's words</h2>${quote(c, M)}</section>
<section class="blk" aria-labelledby="rl-pr"><h2 id="rl-pr">merged into ruflo</h2>${ps(c, M.pr.paras)}</section>
<section class="blk" aria-labelledby="rl-ldn"><h2 id="rl-ldn">agentics london</h2>${ps(c, M.london.paras)}</section>
<section class="blk" id="work" aria-labelledby="rl-work"><h2 id="rl-work">work with him</h2>${workBlock(c, { h: 3, id: 'rw' })}</section>
<section class="blk" aria-labelledby="rl-col"><h2 id="rl-col">with dinis cruz</h2>${ps(c, M.collab.paras)}</section>
<div class="blk">${c.list({ heading: 'sources' })}</div>
</main>` });
}

// ---------- Blueprint: one drawn sheet (change 8; condition 28: no drawn text under 14 units) ----------
// The wide sheet (1200 units) shows from 78rem, where it is drawn at about 1 unit per CSS px; the tall
// sheet (360 units) below that. Every label is 14 units or more, so it renders at 13 px or more.
{
  const c = new Cite('/d/blueprint/');
  const M = homeModel();
  // Short box titles (this design's), never alone: the schedule under the sheet gives every full title.
  const SHORT = { 1: 'A real, pinned runtime', 2: 'Define the mandate', 3: 'Store two facts', 4: 'Outside its permission', 5: 'Encrypted recovery point', 6: 'Approval means stop', 7: 'Remove the workspace', 8: 'Restore, fresh process', 9: 'Ask what it remembers', 10: 'Missing stays missing', 11: 'Change copy, retry', 12: 'What this run proves' };
  const ZL = ['SET UP', 'SAVE UNDER THE POLICY', 'LOSE IT, BRING IT BACK', 'CHECK, CONCLUDE'];
  const descr = `Four zones, this site's grouping: ${P.phases.map((ph, i) => `${'ABCD'[i]}, ${ph.label.toLowerCase()}, steps ${ph.steps[0]} to ${ph.steps.at(-1)}`).join('; ')}. Balloons S1 to S3 mark the three safeguards at steps ${P.safeguards.map(g => g.step).join(', ')}. A dimension line from step 5 to step 8 reads: SHA-256 05 = 08. The schedule of steps below the drawing lists them in full.`;
  const wide = (() => {
    const zx = [40, 325, 610, 925], zw = [270, 270, 300, 245], o = [];
    o.push('<rect class="frame" x="10" y="10" width="1180" height="600"/>');
    ['A', 'B', 'C', 'D'].forEach((l, i) => o.push(`<text class="grid" x="${zx[i] + zw[i] / 2}" y="34" text-anchor="middle">${l}</text>`));
    ['1', '2', '3'].forEach((l, i) => o.push(`<text class="grid" x="24" y="${170 + i * 170}">${l}</text>`));
    const box = {};
    P.phases.forEach((ph, i) => {
      o.push(`<rect class="zone" x="${zx[i]}" y="60" width="${zw[i]}" height="380"/><text class="zl" x="${zx[i] + 12}" y="86">ZONE ${'ABCD'[i]}  ${ZL[i]}</text>`);
      const n = ph.steps.length, h = n === 4 ? 58 : 64, gap = n === 4 ? 22 : 36;
      stepsOf(ph).forEach((s, j) => {
        const x = zx[i] + 15, y = 106 + j * (h + gap), w = zw[i] - 30;
        box[s.n] = { x, y, w, h };
        o.push(`<rect class="box${sgOf(s) ? ' sgb' : ''}" x="${x}" y="${y}" width="${w}" height="${h}"/><text class="bn" x="${x + 12}" y="${y + 24}">${pad(s.n)}</text><text class="bt" x="${x + 12}" y="${y + h - 14}">${esc(SHORT[s.n])}</text>`);
      });
    });
    const b5 = box[5], b8 = box[8];
    o.push(`<line class="dim" x1="${b5.x + b5.w}" y1="${b5.y + b5.h / 2}" x2="${b8.x}" y2="${b8.y + b8.h / 2}"/><line class="dim" x1="${b5.x + b5.w}" y1="${b5.y + b5.h / 2 - 8}" x2="${b5.x + b5.w}" y2="${b5.y + b5.h + 8}"/><text class="dl" x="${b5.x + b5.w - 6}" y="${b5.y + b5.h + 22}" text-anchor="end">SHA-256 05 = 08</text>`);
    // balloons S1 to S3 on the right edge of each safeguard step
    P.safeguards.forEach(g => {
      const b = box[g.step], cx = b.x + b.w + 2, cy = b.y + b.h / 2;
      o.push(`<circle class="ball" cx="${cx}" cy="${cy}" r="16"/><text class="bl" x="${cx}" y="${cy + 5}" text-anchor="middle">S${g.n}</text>`);
    });
    o.push('<text class="nh" x="40" y="478">NOTES</text>');
    P.safeguards.forEach((g, k) => o.push(`<text class="nt" x="40" y="${502 + k * 22}">S${g.n} step ${pad(g.step)}: ${esc(g.text.replace(/^A /, '').replace(/\.$/, '').toLowerCase())}.</text>`));
    o.push(`<text class="nt" x="40" y="568">Recall by meaning: NOT VALIDATED (embeddings off).</text><text class="nt" x="40" y="590">Zones are this site's grouping.</text>`);
    // title block
    const tx = 690, ty = 455, tw = 480;
    o.push(`<rect class="tb" x="${tx}" y="${ty}" width="${tw}" height="140"/><line class="tb" x1="${tx}" y1="${ty + 48}" x2="${tx + tw}" y2="${ty + 48}"/><line class="tb" x1="${tx}" y1="${ty + 94}" x2="${tx + tw}" y2="${ty + 94}"/><line class="tb" x1="${tx + 240}" y1="${ty + 48}" x2="${tx + 240}" y2="${ty + 140}"/>`);
    o.push(`<text class="tbk" x="${tx + 12}" y="${ty + 19}">SUBJECT</text><text class="tbv" x="${tx + 12}" y="${ty + 40}">${esc(D.PERSON.name)}: SGit × Ruflo run</text>`);
    o.push(`<rect x="${tx + tw - 56}" y="${ty + 8}" width="46" height="32" fill="none" stroke="#FFD27A" stroke-width="2"/><text x="${tx + tw - 33}" y="${ty + 30}" class="stamp" text-anchor="middle">${esc(D.PERSON.monogram)}</text>`);
    o.push(`<text class="tbk" x="${tx + 12}" y="${ty + 66}">DRAWN BY</text><text class="tbv" x="${tx + 12}" y="${ty + 86}">the AgentiCCells cell</text>`);
    o.push(`<text class="tbk" x="${tx + 252}" y="${ty + 66}">STEPS, SAFEGUARDS</text><text class="tbv" x="${tx + 252}" y="${ty + 86}">${P.steps.length}, ${P.safeguards.length}</text>`);
    o.push(`<text class="tbk" x="${tx + 12}" y="${ty + 112}">VERSION</text><text class="tbv" x="${tx + 12}" y="${ty + 132}">__VERSION__</text>`);
    o.push(`<text class="tbk" x="${tx + 252}" y="${ty + 112}">FACTS READ</text><text class="tbv" x="${tx + 252}" y="${ty + 132}">${esc(fmtDate(D.SITE.read))}</text>`);
    return `<svg class="sheet-w" viewBox="0 0 1200 620" role="img" aria-labelledby="bpw-t bpw-d"><title id="bpw-t">Drawing of the SGit × Ruflo run</title><desc id="bpw-d">${esc(descr)}</desc>${o.join('')}</svg>`;
  })();
  const tall = (() => {
    const o = ['<rect class="frame" x="4" y="4" width="352" height="672"/>'];
    let y = 20; const rows = {};
    P.phases.forEach((ph, i) => {
      const n = ph.steps.length, h = 36 + n * 32;
      o.push(`<rect class="zone" x="28" y="${y}" width="316" height="${h}"/><text class="zl" x="38" y="${y + 21}">${'ABCD'[i]}  ${ZL[i]}</text>`);
      stepsOf(ph).forEach((s, j) => { const yy = y + 50 + j * 32; rows[s.n] = yy; o.push(`<text class="bt" x="38" y="${yy}"><tspan class="bn">${pad(s.n)}</tspan> ${esc(SHORT[s.n])}</text>`); });
      y += h + 12;
    });
    P.safeguards.forEach(g => o.push(`<circle class="ball" cx="322" cy="${rows[g.step] - 5}" r="14"/><text class="bl" x="322" y="${rows[g.step]}" text-anchor="middle">S${g.n}</text>`));
    o.push(`<path class="dim" d="M24 ${rows[5] - 5} L24 ${rows[8] - 5}"/><text class="dl" x="19" y="${(rows[5] + rows[8]) / 2}" transform="rotate(-90 19 ${(rows[5] + rows[8]) / 2})" text-anchor="middle">SHA-256 05 = 08</text>`);
    o.push(`<rect class="tb" x="28" y="${y}" width="316" height="54"/><text class="tbk" x="38" y="${y + 21}">DRAWN BY THE AGENTICCELLS CELL</text><text class="tbv" x="38" y="${y + 43}">__VERSION__, facts read ${esc(fmtDate(D.SITE.read))}</text>`);
    const H = y + 66;
    o[0] = `<rect class="frame" x="4" y="4" width="352" height="${H - 8}"/>`;
    return `<svg class="sheet-t" viewBox="0 0 360 ${H}" role="img" aria-labelledby="bpt-t bpt-d"><title id="bpt-t">Drawing of the SGit × Ruflo run, for a narrow screen</title><desc id="bpt-d">${esc(descr)}</desc>${o.join('')}</svg>`;
  })();
  const css = {
    vars: '--link:#7CC4FF;--focus:#FFD27A;--line:#3A5F8C;--strip-bg:#081A30;--strip-ink:#F2F7FF;--strip-focus:#FFD27A',
    rules: `body{background-color:#0F2A4A;background-image:linear-gradient(#1C3A60 1px,transparent 1px),linear-gradient(90deg,#1C3A60 1px,transparent 1px);background-size:24px 24px}
.hd{display:flex;flex-wrap:wrap;align-items:baseline;gap:.25rem 1.5rem;padding:1.25rem 0 .75rem}
h1{font:700 clamp(1.9rem,4vw,2.8rem)/1.1 var(--sans);letter-spacing:.01em;margin:0}
.no{font:600 .85rem/1.4 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:#7CC4FF}
.lede{max-width:48rem;margin:.25rem 0 1rem}
.sheetbox svg{display:block;width:100%;height:auto}
.sheetbox .sheet-w{display:none}.sheetbox .sheet-t{max-width:26rem;margin:0 auto}
@media (min-width:78rem){.sheetbox .sheet-w{display:block}.sheetbox .sheet-t{display:none}}
.sheetbox svg text{font-family:var(--mono);fill:#F2F7FF}
.frame{fill:rgb(15 42 74/.94);stroke:#7CC4FF;stroke-width:2}
.zone{fill:none;stroke:#7CC4FF;stroke-width:1.5;stroke-dasharray:8 6}
.sheetbox .zl{fill:#7CC4FF;font-size:14px}
.box{fill:#123358;stroke:#B8CCE6;stroke-width:1.2}.box.sgb{stroke:#FFD27A;stroke-width:2}
.sheetbox .bn{fill:#FFD27A;font-size:16px;font-weight:700}
.sheetbox .bt{font-size:15px}
.lead{stroke:#FFD27A;stroke-width:1.5;fill:none}
.ball{fill:#0F2A4A;stroke:#FFD27A;stroke-width:2}
.sheetbox .bl{fill:#FFD27A;font-size:15px;font-weight:700}
.dim{stroke:#B8CCE6;stroke-width:1.5;fill:none}
.sheetbox .dl{fill:#B8CCE6;font-size:14px}
.tb{fill:#0F2A4A;stroke:#7CC4FF;stroke-width:1.5}
.sheetbox .tbk{fill:#7CC4FF;font-size:14px;letter-spacing:.06em}
.sheetbox .tbv{font-size:15px}
.sheetbox .grid{fill:#7CC4FF;font-size:15px}
.sheetbox .nh{fill:#FFD27A;font-size:15px}.sheetbox .nt{font-size:14px}
.sheetbox .stamp{fill:#FFD27A;font-size:16px;font-weight:700}
.sheet{border:2px solid #7CC4FF;margin:1.25rem 0;padding:1rem 1.2rem;background:rgb(15 42 74/.94)}
.label{font:600 .8rem/1.4 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:#7CC4FF;margin:0 0 .5rem}
h2{font-size:1.45rem;margin:0 0 .5rem}
h3{font-size:1.05rem;margin:1rem 0 .4rem}
.sched{font-size:.95rem}.sched th{color:#7CC4FF;font:600 .8rem var(--mono);text-transform:uppercase;letter-spacing:.06em}.sched td{border-color:#3A5F8C}
.grid2{display:grid;gap:1.25rem}@media (min-width:56rem){.grid2{grid-template-columns:1fr 1fr}}
.grid2 .sheet{margin:0}
.nums{list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(13rem,1fr));gap:.75rem}
.nums li{border-left:3px solid #FFD27A;padding-left:.75rem;max-width:none}.nums b{display:block;font:700 1.8rem var(--mono);color:#FFD27A}
.pq{margin:0}.pq p{font-size:1.2rem;font-style:italic}.pq footer{color:#B8CCE6;font-size:.9rem}
.btn{border-color:#F2F7FF;color:#F2F7FF}.btn.primary{background:#7CC4FF;border-color:#7CC4FF;color:#0F2A4A}
.enquire{border-color:#7CC4FF}
.sources{background:rgb(15 42 74/.94);border:2px solid #7CC4FF;padding:1rem}`,
  };
  designPage('blueprint', { css, body: `<main id="main" class="wrap">
<div class="hd"><h1>${esc(D.PERSON.name)}</h1><span class="no">Sheet 01 of 01: the SGit × Ruflo run</span></div>
<p class="lede">${c.t(M.hero.eyebrow)}. ${c.t(M.hero.line)}</p>
<div class="sheetbox">${wide}${tall}</div>
<p class="cta"><a class="btn primary" href="/proof-of-concept/">See the proof of concept</a> <a class="btn" href="#work">Work with him</a></p>
<section class="sheet" aria-labelledby="bp-sch"><p class="label">Schedule</p><h2 id="bp-sch">Schedule of steps</h2>
<div class="table"><table class="sched"><thead><tr><th scope="col">No.</th><th scope="col">Step</th><th scope="col">Zone</th><th scope="col">Video</th><th scope="col">Safeguard</th></tr></thead><tbody>
${P.steps.map(s => { const g = sgOf(s); const i = P.phases.indexOf(phaseOf(s)); return `<tr><td>${pad(s.n)}</td><td>${esc(s.title)}</td><td>${'ABCD'[i]}, ${esc(phaseOf(s).label.toLowerCase())}</td><td>${esc(s.at)}</td><td>${g ? `S${g.n}, ${sgWord(g)}` : ''}</td></tr>`; }).join('\n')}
</tbody></table></div>
<p>${esc(P.fingerprint.line)}${c.m(P.fingerprint.src)}. Steps and times from the newsroom's walk-through of his video${c.m(P.stepsSrc)}. ${c.t(P.resultsNote)}</p>
</section>
<section class="sheet" aria-labelledby="bp-num"><p class="label">Key figures</p><h2 id="bp-num">In numbers</h2>
<ul class="nums">${M.numbers.map(n => `<li><b>${esc(n.value)}</b>${esc(n.label)}${c.m(n.src)}</li>`).join('')}</ul></section>
<div class="grid2">
<section class="sheet" aria-labelledby="bp-car"><p class="label">Detail A</p><h2 id="bp-car">${esc(M.career.heading)}</h2>${careerSummary(c)}<p><a class="more" href="${M.career.href}">${esc(M.career.linkText)}</a></p></section>
<section class="sheet" aria-labelledby="bp-run"><p class="label">Detail B</p><h2 id="bp-run">What the run shows</h2>${ps(c, M.poc.paras)}<p>${c.t(P.vaultText)}</p><p>${c.t(M.poc.limit)}</p><p><a class="more" href="/proof-of-concept/">The proof of concept in full</a></p></section>
<section class="sheet" aria-labelledby="bp-pr"><p class="label">Detail C</p><h2 id="bp-pr">Merged into Ruflo</h2>${ps(c, M.pr.paras)}</section>
<section class="sheet" aria-labelledby="bp-ldn"><p class="label">Detail D</p><h2 id="bp-ldn">Agentics Foundation, London</h2>${ps(c, M.london.paras)}</section>
</div>
<section class="sheet" aria-labelledby="bp-q"><p class="label">Note</p><h2 id="bp-q">In Dinis Cruz's words</h2>${quote(c, M)}</section>
<section class="sheet" id="work" aria-labelledby="bp-work"><p class="label">Detail E</p><h2 id="bp-work">${esc(M.work.heading)}</h2>${workBlock(c, { h: 3, id: 'pw' })}</section>
<section class="sheet" aria-labelledby="bp-col"><p class="label">Detail F</p><h2 id="bp-col">With Dinis Cruz</h2>${ps(c, M.collab.paras)}</section>
${c.list()}
</main>` });
}

// ---------- Vault: the run as one vault door (change 9 revised; conditions 29, 32 to 35) ----------
// Both drawings are generated from POC: step n sits at n x 30 degrees on the dial (12 at the top); the gate
// ring has a door for each of POC.gatedSteps and a gap for each of POC.cliSteps; the vault steps are filled;
// the safeguards are bolts where the run is stopped (at the gate, or at the vault for a vault step).
{
  const c = new Cite('/d/vault/');
  const M = homeModel();
  const CX = 340, rad = d => (d * Math.PI) / 180;
  const at = (deg, r) => [CX + r * Math.sin(rad(deg)), CX - r * Math.cos(rad(deg))];
  const f = n => n.toFixed(1);
  const pt = (deg, r) => at(deg, r).map(f).join(' ');
  const arc = (a0, a1, r, sweep = 1) => `M${pt(a0, r)}A${r} ${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${sweep} ${pt(a1, r)}`;
  const gated = new Set(P.gatedSteps), cli = new Set(P.cliSteps), vlt = new Set(P.vaultSteps);
  const restoreIdx = P.phases.findIndex(p => p.id === 'restore');
  const cliWord = s => (P.phases.indexOf(phaseOf(s)) < restoreIdx ? 'writes' : 'reads');
  const vaultWord = s => ({ 0: 'save', 1: 'restore' })[P.vaultSteps.indexOf(s.n)];
  const bolt = (x, y, rot) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${rot})"><rect x="-17" y="-8" width="34" height="16" rx="3" fill="#D9B26A"/><circle cx="-8" cy="0" r="3.2" fill="#13201C"/><rect x="-9.2" y="0" width="2.4" height="5" fill="#13201C"/></g>`;
  const door = (x, y, w, h, rot = 0) => `<rect x="${f(x - w / 2)}" y="${f(y - h / 2)}" width="${w}" height="${h}" rx="2" fill="#13201C" stroke="#D9B26A" stroke-width="2"${rot ? ` transform="rotate(${rot} ${f(x)} ${f(y)})"` : ''}/>`;
  const DEF = id => `<defs><marker id="${id}h" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#D9B26A"/></marker><marker id="${id}m" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#ECE6D8"/></marker></defs>`;
  const descr = where => `Twelve steps ${where}, in four phases (this site's grouping). The policy gate: steps ${P.gatedSteps.join(', ')} pass through it; steps ${P.cliSteps.join(', ')} reach the memory file through gaps, by Ruflo's own command line. ${P.safeguards.filter(g => !vlt.has(g.step)).map(g => `Step ${g.step} is ${sgWord(g)}`).join(' and ')} at the gate. Step ${P.vaultSteps[0]} saves into the vault, step ${P.vaultSteps[1]} restores from it, and step ${P.vaultSteps[2]}'s altered copy is rejected at the vault. The same steps are listed beside the drawing.`;
  // label placement for each step's word on the dial: [angle offset, radius]
  const LAB = { writes: [-9, 212], refused: [-13, 221], stopped: [14, 225], save: [-10, 154], restore: [9, 152], reads: [-10, 215], rejected: [-14, 146] };
  const dial = (() => {
    const o = [DEF('vd'), `<circle cx="${CX}" cy="${CX}" r="319" fill="#0E1815" stroke="#D9B26A" stroke-width="2"/>`];
    P.phases.forEach((ph, i) => {
      const a0 = ph.steps[0] * 30 - 15, a1 = ph.steps.at(-1) * 30 + 15, mid = (a0 + a1) / 2 % 360;
      o.push(`<path d="${arc(a0 + 0.6, a1 - 0.6, 292)}" fill="none" stroke="${i % 2 ? '#2A4A3E' : '#1F3B32'}" stroke-width="34"/>`);
      const bottom = mid > 90 && mid < 270;
      o.push(`<path id="vph${i}" d="${bottom ? arc(a1, a0, 287, 0) : arc(a0, a1, 297)}" fill="none"/><text class="phl"><textPath href="#vph${i}" startOffset="50%" text-anchor="middle">${esc(ph.label)}</textPath></text>`);
      const [x1, y1] = at(a0, 275), [x2, y2] = at(a0, 309);
      o.push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="#D9B26A" stroke-width="2"/>`);
    });
    o.push(`<circle cx="${CX}" cy="${CX}" r="128" fill="none" stroke="#8FD3B8" stroke-width="2" stroke-dasharray="3 5"/><path id="vmem" d="${arc(220, 140, 120, 0)}" fill="none"/><text class="sm mint"><textPath href="#vmem" startOffset="50%" text-anchor="middle">memory file</textPath></text>`);
    const gaps = [...cli].map(n => n * 30).sort((a, b) => a - b);
    let start = 0;
    for (const g of gaps) { o.push(`<path d="${arc(start, g - 9, 186)}" fill="none" stroke="#D9B26A" stroke-width="7"/>`); start = g + 9; }
    o.push(`<path d="${arc(start, 360, 186)}" fill="none" stroke="#D9B26A" stroke-width="7"/>`);
    o.push(`<path id="vgate" d="${arc(-32, 32, 198)}" fill="none"/><text class="sm brass b"><textPath href="#vgate" startOffset="50%" text-anchor="middle">policy gate</textPath></text>`);
    const words = [];
    for (const s of P.steps) {
      const a = s.n * 30, g = sgOf(s);
      let word = '';
      if (cli.has(s.n)) {
        word = cliWord(s);
        const [x1, y1] = at(a, 220), [x2, y2] = at(a, 134);
        o.push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="#ECE6D8" stroke-width="2" stroke-dasharray="6 5" ${word === 'writes' ? 'marker-end' : 'marker-start'}="url(#vdm)"/>`);
      } else if (vlt.has(s.n) && g) {
        word = sgWord(g);
        const [x1, y1] = at(a, 220), [x2, y2] = at(a, 102);
        o.push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="#D9B26A" stroke-width="3"/>`);
        words.push(bolt(x2, y2, a + 180));
      } else if (vlt.has(s.n)) {
        word = vaultWord(s);
        const out = word === 'restore';
        const [x1, y1] = at(a, out ? 84 : 220), [x2, y2] = at(a, out ? 218 : 90);
        o.push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="#D9B26A" stroke-width="4" marker-end="url(#vdh)"/>`);
      } else if (g) {
        word = sgWord(g);
        const [x1, y1] = at(a, 220), [x2, y2] = at(a, 200);
        o.push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="#D9B26A" stroke-width="3"/>`);
        words.push(bolt(x2, y2, a + 180));
      }
      if (gated.has(s.n)) { const [x, y] = at(a, 186); o.push(door(x, y, 18, 12, a)); }
      if (word) { const [da, r] = LAB[word] || [-10, 210]; const [x, y] = at(a + da, r); words.push(`<text class="pw ${cli.has(s.n) ? 'cream' : 'brass'}" x="${f(x)}" y="${f(y + 5)}" text-anchor="middle">${word}</text>`); }
    }
    o.push(...words.filter(w => w.startsWith('<g')));
    o.push(`<circle cx="${CX}" cy="${CX}" r="80" fill="#1A2B26" stroke="#D9B26A" stroke-width="4"/><circle cx="${CX}" cy="${CX}" r="70" fill="none" stroke="#D9B26A" stroke-width="1.5"/>`);
    for (const d of [0, 60, 120]) { const [x1, y1] = at(d, 34), [x2, y2] = at(d + 180, 34); o.push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="#3B5249" stroke-width="5" stroke-linecap="round"/>`); }
    o.push(`<circle cx="${CX}" cy="${CX}" r="10" fill="#3B5249"/><text class="vt-t" x="${CX}" y="${CX - 4}" text-anchor="middle">vault</text><text class="sm cream halo" x="${CX}" y="${CX + 16}" text-anchor="middle">encrypted</text>`);
    for (const s of P.steps) {
      const [x, y] = at(s.n * 30, 240), fill = vlt.has(s.n), mem = gated.has(s.n) || cli.has(s.n);
      o.push(`<circle cx="${f(x)}" cy="${f(y)}" r="19" fill="${fill ? '#D9B26A' : '#13201C'}" stroke="${mem || fill ? '#D9B26A' : '#6F8A7F'}" stroke-width="2"/><text class="nn${fill ? ' dk' : ''}" x="${f(x)}" y="${f(y + 5.5)}" text-anchor="middle">${s.n}</text>`);
    }
    o.push(...words.filter(w => w.startsWith('<text')));
    return `<svg class="dial" viewBox="0 0 680 680" width="680" height="680" role="img" aria-labelledby="dial-t dial-d"><title id="dial-t">The run drawn as a vault door</title><desc id="dial-d">${esc(descr('around a ring, like a clock'))}</desc>${o.join('')}</svg>`;
  })();
  const tallSvg = (() => {
    const o = [DEF('vt')], Y = {};
    const split = { 'Save under the policy': ['Save under', 'the policy'], 'Lose it and bring it back': ['Lose it and', 'bring it back'], 'Check and conclude': ['Check and', 'conclude'] };
    P.phases.forEach((ph, i) => {
      stepsOf(ph).forEach(s => { Y[s.n] = 120 + (s.n - 1) * 40 + i * 48; });
      const lines = split[ph.label] || [ph.label], y0 = Y[ph.steps[0]] - (lines.length > 1 ? 50 : 32);
      o.push(`<text class="phh" x="0" y="${y0}">${lines.map((l, j) => `<tspan x="0" dy="${j ? 18 : 0}">${esc(l)}</tspan>`).join('')}</text>`);
    });
    const yEnd = Y[12] + 26;
    o.push(`<text class="sm brass b" x="128" y="22" text-anchor="middle">policy gate</text><text class="sm mint" x="196" y="46" text-anchor="middle">memory file</text><text class="vt-t" x="300" y="22" text-anchor="middle">vault</text><text class="sm cream halo" x="300" y="46" text-anchor="middle">encrypted</text>`);
    const vTop = Y[P.vaultSteps[0]] - 66, wy = Y[P.vaultSteps[1]] + 8;
    o.push(`<rect x="250" y="${vTop}" width="100" height="${yEnd - 8 - vTop}" rx="12" fill="#1A2B26" stroke="#D9B26A" stroke-width="3"/><circle cx="308" cy="${wy}" r="26" fill="none" stroke="#D9B26A" stroke-width="1.5"/>`);
    for (const d of [90, 150, 210]) { const r = 22, x1 = 308 + r * Math.sin(rad(d)), y1 = wy - r * Math.cos(rad(d)); o.push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(616 - x1)}" y2="${f(2 * wy - y1)}" stroke="#3B5249" stroke-width="4" stroke-linecap="round"/>`); }
    o.push(`<line x1="196" y1="58" x2="196" y2="${yEnd}" stroke="#8FD3B8" stroke-width="2" stroke-dasharray="3 5"/>`);
    let g0 = 30;
    for (const n of [...cli].sort((a, b) => a - b)) { o.push(`<line x1="128" y1="${g0}" x2="128" y2="${Y[n] - 13}" stroke="#D9B26A" stroke-width="6"/>`); g0 = Y[n] + 13; }
    o.push(`<line x1="128" y1="${g0}" x2="128" y2="${yEnd}" stroke="#D9B26A" stroke-width="6"/>`);
    const lab = [];
    for (const s of P.steps) {
      const y = Y[s.n], g = sgOf(s);
      if (cli.has(s.n)) { const w = cliWord(s); o.push(`<line x1="42" y1="${y}" x2="192" y2="${y}" stroke="#ECE6D8" stroke-width="2" stroke-dasharray="6 5" ${w === 'writes' ? 'marker-end' : 'marker-start'}="url(#vtm)"/>`); lab.push(`<text class="pw cream" x="46" y="${y - 7}">${w}</text>`); }
      else if (vlt.has(s.n) && g) { o.push(`<line x1="42" y1="${y}" x2="224" y2="${y}" stroke="#D9B26A" stroke-width="3"/>${door(128, y, 12, 18)}${bolt(232, y, 0)}`); lab.push(`<text class="pw brass" x="46" y="${y - 7}">${sgWord(g)}</text>`); }
      else if (vlt.has(s.n)) { const w = vaultWord(s); o.push(`<line x1="${w === 'restore' ? 44 : 42}" y1="${y}" x2="${w === 'restore' ? 248 : 246}" y2="${y}" stroke="#D9B26A" stroke-width="4" ${w === 'restore' ? 'marker-start' : 'marker-end'}="url(#vth)"/>${door(128, y, 12, 18)}`); lab.push(`<text class="pw brass" x="${w === 'restore' ? 74 : 46}" y="${y - (w === 'restore' ? 17 : 7)}">${w}</text>`); }
      else if (g) { o.push(`<line x1="42" y1="${y}" x2="120" y2="${y}" stroke="#D9B26A" stroke-width="3"/>${bolt(128, y, 0)}`); lab.push(`<text class="pw brass" x="46" y="${y - 7}">${sgWord(g)}</text>`); }
      const fill = vlt.has(s.n), mem = gated.has(s.n) || cli.has(s.n);
      lab.push(`<circle cx="24" cy="${y}" r="16" fill="${fill ? '#D9B26A' : '#13201C'}" stroke="${mem || fill ? '#D9B26A' : '#6F8A7F'}" stroke-width="2"/><text class="nn${fill ? ' dk' : ''}" x="24" y="${y + 5.5}" text-anchor="middle">${s.n}</text>`);
    }
    o.push(...lab);
    return `<svg class="tall" viewBox="0 0 358 ${yEnd + 12}" role="img" aria-labelledby="tall-t tall-d"><title id="tall-t">The run drawn as a vault door, top to bottom</title><desc id="tall-d">${esc(descr('in a column'))}</desc>${o.join('')}</svg>`;
  })();
  const tags = s => {
    const g = sgOf(s), t = [];
    if (cli.has(s.n)) t.push('<span class="tag cli">Ruflo\'s command line, no gate</span>');
    if (gated.has(s.n)) t.push('<span class="tag gate">policy gate</span>');
    if (vlt.has(s.n)) t.push(`<span class="tag vault">vault ${esc(vaultOf(s).replace('read and rejected', 'read, rejected'))}</span>`);
    if (g) t.push(`<span class="tag sg">safeguard ${g.n}: ${sgWord(g)}</span>`);
    return t.length ? `<span class="tags">${t.join(' ')}</span>` : '';
  };
  const css = {
    vars: '--link:#D9B26A;--focus:#8FD3B8;--line:#2C3F38;--strip-bg:#0B1411;--strip-ink:#ECE6D8;--strip-focus:#8FD3B8',
    rules: `body{font-family:var(--sans)}
h1,h2{font-family:Charter,"Bitstream Charter","Sitka Text",Cambria,Georgia,serif;line-height:1.15}
.hero{display:grid;grid-template-columns:auto 1fr;gap:1.5rem;align-items:center;padding:1.75rem 0 1rem}
.seal{width:132px;height:132px;border-radius:50%;border:3px solid #D9B26A;outline:2px solid #D9B26A;outline-offset:6px;margin:8px;overflow:hidden}
.seal img{width:100%;height:100%;object-fit:cover;display:block}
.k{font:600 .8rem/1.4 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:#D9B26A;margin:0}
h1{font-size:clamp(2.2rem,5vw,3.6rem);line-height:1.02;margin:.2rem 0 .4rem}
.lede{margin:0;max-width:44rem;color:#D3CCBC}
.door{display:grid;grid-template-columns:1fr;gap:1.25rem;padding:0 0 1.5rem}
.door figure{margin:0}
.dial{display:none}
.tall{display:block;width:100%;max-width:30rem;height:auto;margin:0 auto}
.door svg text{font-family:var(--sans)}
.phl{font-size:15px;font-weight:600;fill:#ECE6D8;letter-spacing:.04em}
.phh{font-size:15px;font-weight:600;fill:#D9B26A;letter-spacing:.06em;text-transform:uppercase}
.nn{font-size:16px;font-weight:700;fill:#ECE6D8}.nn.dk{fill:#13201C}
.pw{font-size:15px;font-weight:600}
.sm{font-size:14px}.b{font-weight:700}
.vt-t,.halo{paint-order:stroke;stroke:#1A2B26;stroke-width:5px;stroke-linejoin:round}
.vt-t{font:700 18px Charter,"Bitstream Charter",Cambria,Georgia,serif;fill:#D9B26A}
.brass{fill:#D9B26A}.mint{fill:#8FD3B8}.cream{fill:#ECE6D8}
.key{list-style:none;margin:.75rem 0 0;padding:0;display:flex;flex-wrap:wrap;gap:.35rem 1.1rem;font-size:.9rem;color:#D3CCBC}
.key li{display:flex;align-items:center;gap:.45rem;max-width:none}
.key svg{flex:none}
h2{font-size:1.4rem;margin:0 0 .5rem}
h3{font:600 .8rem/1.4 var(--sans);letter-spacing:.1em;text-transform:uppercase;color:#D9B26A;margin:.9rem 0 .2rem}
.phases,.steps{list-style:none;margin:0;padding:0}
.phases>li{max-width:none}
.steps li{display:grid;grid-template-columns:2rem 1fr auto;gap:.5rem;padding:.4rem 0;border-top:1px solid #2C3F38;font-size:.95rem;line-height:1.35;max-width:none}
.n{color:#D9B26A}.at{font:.85rem/1.5 var(--mono);color:#B9B2A2}
.tags{display:block;margin-top:.25rem}
.door .tag{font:.78rem/1.5 var(--mono);border-radius:999px;padding:0 .45rem;margin:0 .2rem .2rem 0;white-space:nowrap;letter-spacing:0;text-transform:none}
.tag.gate{border:1px solid #6F8A7F;color:#D3CCBC}
.tag.sg{border:1px solid #D9B26A;color:#D9B26A}
.tag.cli{border:1px dashed #ECE6D8;color:#ECE6D8}
.tag.vault{background:#8FD3B8;color:#13201C;border:1px solid #8FD3B8;font-weight:700}
.fp{display:block;font:.8rem/1.45 var(--mono);color:#8FD3B8;margin-top:.2rem}
.note{font-size:.92rem;color:#D3CCBC;margin:.5rem 0 0;max-width:44rem}
.panel{border:1px solid #B9B2A2;border-radius:8px;padding:1rem 1.2rem;margin:1rem 0}
.panels{display:grid;gap:1rem}@media (min-width:56rem){.panels{grid-template-columns:1fr 1fr}}.panels .panel{margin:0}
.nums{list-style:none;padding:0;display:grid;gap:.75rem;grid-template-columns:repeat(auto-fit,minmax(13rem,1fr))}
.nums li{border:1px solid #D9B26A;border-radius:8px;padding:.75rem;max-width:none}.nums b{display:block;font:700 2rem Charter,Georgia,serif;color:#D9B26A}
.pq{margin:0}.pq p{font:italic 1.25rem/1.4 Charter,Georgia,serif}.pq footer{color:#B9B2A2;font-size:.9rem}
.btn{border-color:#ECE6D8;color:#ECE6D8;border-radius:4px}.btn.primary{background:#D9B26A;border-color:#D9B26A;color:#13201C}
.enquire{border-color:#D9B26A;border-radius:8px}
@media (min-width:72rem){
  .door{grid-template-columns:680px minmax(0,1fr);gap:2rem;align-items:start}
  .dial{display:block;width:680px;height:680px}
  .tall{display:none}
}
@media (max-width:40rem){.hero{gap:1rem;padding:1.25rem 0 .75rem}.seal{width:88px;height:88px;outline-offset:4px;margin:6px}}`,
  };
  const sw = inner => `<svg width="30" height="16" viewBox="0 0 30 16" aria-hidden="true" focusable="false">${inner}</svg>`;
  designPage('vault', { css, body: `<main id="main" class="wrap">
<div class="hero">
<div class="seal">${photoImg()}</div>
<div><p class="k">${c.t(M.hero.eyebrow)}</p>
<h1>${esc(D.PERSON.name)}</h1>
<p class="lede">${c.t(D.POC.summary[0])}</p>
<p class="cta"><a class="btn primary" href="/proof-of-concept/">See the proof of concept</a> <a class="btn" href="#work">Work with him</a></p></div>
</div>
<div class="door">
<figure>
${dial}
${tallSvg}
<figcaption>
<ul class="key" aria-label="Key">
<li>${sw('<line x1="0" y1="8" x2="30" y2="8" stroke="#D9B26A" stroke-width="3"/><rect x="11" y="2" width="8" height="12" rx="1.5" fill="#13201C" stroke="#D9B26A" stroke-width="2"/>')}passes the policy gate, through a door</li>
<li>${sw('<line x1="0" y1="8" x2="30" y2="8" stroke="#ECE6D8" stroke-width="2" stroke-dasharray="5 4"/>')}Ruflo's command line, through a gap</li>
<li>${sw('<rect x="0" y="3" width="26" height="10" rx="2" fill="#D9B26A"/>')}safeguard: tested here</li>
<li>${sw('<circle cx="8" cy="8" r="7" fill="#D9B26A"/>')}filled step: the vault is used</li>
</ul>
<p class="note">${c.t(P.vaultText)}</p>
<p class="note">${c.t(P.gateText)}</p>
<p class="note">${esc(P.phasesNote)}</p>
</figcaption>
</figure>
<section aria-labelledby="v-steps">
<h2 id="v-steps">The twelve steps${c.m(P.stepsSrc)}</h2>
<ol class="phases">${P.phases.map(ph => `<li><h3>${esc(ph.label)}</h3><ol class="steps">${stepsOf(ph).map(s => `<li value="${s.n}"><b class="n">${s.n}</b><span>${esc(s.title)}${s.n === P.fingerprint.steps[1] ? `<span class="fp">${esc(P.fingerprint.line)}${c.m(P.fingerprint.src)}</span>` : ''}${tags(s)}</span><span class="at"><span class="vh">at </span>${esc(s.at)}</span></li>`).join('')}</ol></li>`).join('')}</ol>
<p class="note">${c.t(P.resultsNote)} ${c.t(M.poc.limit)}</p>
</section>
</div>
<section class="panel" aria-labelledby="v-num"><h2 id="v-num">In numbers</h2>
<ul class="nums">${M.numbers.map(n => `<li><b>${esc(n.value)}</b>${esc(n.label)}${c.m(n.src)}</li>`).join('')}</ul></section>
<div class="panels">
<section class="panel" aria-labelledby="v-car"><h2 id="v-car">${esc(M.career.heading)}</h2>${careerSummary(c)}<p><a class="more" href="${M.career.href}">${esc(M.career.linkText)}</a></p></section>
<section class="panel" aria-labelledby="v-run"><h2 id="v-run">What the run shows</h2>${ps(c, [M.poc.paras[1]])}<p><a class="more" href="/proof-of-concept/">The proof of concept in full</a></p></section>
<section class="panel" aria-labelledby="v-pr"><h2 id="v-pr">Merged into Ruflo</h2>${ps(c, M.pr.paras)}</section>
<section class="panel" aria-labelledby="v-ldn"><h2 id="v-ldn">Agentics Foundation, London</h2>${ps(c, M.london.paras)}</section>
</div>
<section class="panel" aria-labelledby="v-q"><h2 id="v-q">In Dinis Cruz's words</h2>${quote(c, M)}</section>
<section class="panel" id="work" aria-labelledby="v-work"><h2 id="v-work">${esc(M.work.heading)}</h2>${workBlock(c, { h: 3, id: 'vw' })}</section>
<section class="panel" aria-labelledby="v-col"><h2 id="v-col">With Dinis Cruz</h2>${ps(c, M.collab.paras)}</section>
${c.list()}
</main>` });
}

// ---------- the parity check (review condition 23; round 2 position (c): kept as it is) ----------
const home = citedOn.get('/');
if (!home || !home.size) throw new Error('designs: no sources recorded for / (generate.mjs must run first)');
const missing = [];
for (const d of DESIGNS) {
  const got = citedOn.get(`/d/${d.id}/`) || new Set();
  for (const id of home) if (!got.has(id)) missing.push(`/d/${d.id}/ does not cite source "${id}", which / cites`);
}
if (missing.length) throw new Error(`Design parity check failed:\n${missing.join('\n')}`);
console.log(`designs: /d/ and ${DESIGNS.length} designs; each cites all ${home.size} sources cited on /`);
