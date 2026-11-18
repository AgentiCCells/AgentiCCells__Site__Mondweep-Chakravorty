// Copyright 2026 AgentiCCells. Licensed under the Apache License, Version 2.0
// (http://www.apache.org/licenses/LICENSE-2.0). The text it writes is CC BY 4.0.
//
// Build step: the five designs under /d/ (proposal section 2, review conditions 23 to 32).
// /d/ is a plain index (works without JavaScript); /d/ledger/ is the main home with
// <link rel="canonical" href="/">; /d/broadsheet/, /d/runlog/, /d/blueprint/ and /d/vault/ are single
// pages with the same facts and sources as /, generated from the same data (homeModel in lib.mjs).
// A build check throws if any source cited on / is missing from a design.
// Written by developer.mondweep-chakravorty@AgentiCCells.dinis, round 1 (2026-11-18).
import { D, esc, write, head, page, Cite, citedOn, homeModel, figure, mailto, designsDialog, DESIGNS_SCRIPT, DESIGNS, fmtDate } from './lib.mjs';
import { homeBody } from './generate.mjs';

const byId = id => DESIGNS.find(d => d.id === id);
const strip = d => `<div class="strip"><div class="wrap"><p><span>Design: ${esc(d.name)}${d.id === 'ledger' ? ' (the main site)' : ''}.</span> <a class="designs" href="/d/">Designs</a> <a href="/">Main site</a></p></div></div>`;

// ---------- /d/ ----------
write('d/index.html', page({
  path: '/d/', ...D.PAGES['/d/'],
  body: `<h1>Designs</h1>
<p class="lede">The same facts and sources, five ways. Ledger is the main site; the other four restyle the home page.</p>
<ul class="dcards">
${DESIGNS.map(d => `<li><a href="${d.href}"><img src="/assets/designs/${d.id}.png" alt="Home page in the ${esc(d.name)} design" width="640" height="400" loading="lazy"><b>${esc(d.name)}${d.id === 'ledger' ? ' (main site)' : ''}</b><span>${esc(d.idea)}</span><span class="best">Best for: ${esc(d.best)}.</span></a></li>`).join('\n')}
</ul>
<p>Each design is one page with the same facts as the home page: who he is, the proof of concept with its twelve steps and three safeguards, the Ruflo pull request, the London chapter, the collaboration with Dinis Cruz and its offers, and how to enquire. Each cites the same sources. The Ledger design is also listed at <a href="/d/ledger/">/d/ledger/</a>.</p>`,
}));

// ---------- /d/ledger/ ----------
{
  const c = new Cite('/d/ledger/');
  const html = page({ path: '/d/ledger/', canonical: '/', title: 'Ledger design', description: 'The Ledger design: the main site, a calm consultancy page. The canonical page is the home page.', current: 'ledger', before: strip(byId('ledger')),
    body: `<p class="note">This is the main site's home page in the Ledger design. Its canonical address is <a href="/">the home page</a>.</p>\n${homeBody(c)}\n${c.list()}` });
  write('d/ledger/index.html', html);
}

// ---------- shared CSS for the four other designs (each sets its own tokens) ----------
const BASE = `*{box-sizing:border-box}html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:1.0625rem/1.6 var(--font);overflow-wrap:break-word}
a{color:var(--link);text-underline-offset:.2em}
:focus-visible{outline:3px solid var(--focus);outline-offset:3px}
code{font-family:var(--mono);overflow-wrap:anywhere}
.skip{position:absolute;left:-9999px;top:0;display:inline-flex;align-items:center;min-height:44px}.skip:focus{left:1rem;top:1rem;z-index:10;background:var(--bg);color:var(--ink);padding:.75rem 1rem;outline:3px solid var(--focus)}
.wrap{max-width:72rem;margin:0 auto;padding:0 1rem}
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
sup.mk{line-height:0;font-size:.72em;vertical-align:super}
sup.mk a{position:relative;display:inline-block;min-width:1.4em;text-align:center;font-weight:700;text-decoration:none;padding:0 .1em;font-family:system-ui,sans-serif}
sup.mk a::after{content:"";position:absolute;left:50%;top:50%;width:44px;height:44px;transform:translate(-50%,-50%)}
.sources{margin-top:3rem}.sources li{margin:.5rem 0;overflow-wrap:anywhere}
.back{display:inline-flex;align-items:center;min-height:44px}
.offers-compact{padding-left:1.25rem}.offers-compact li{margin:.4rem 0}
figure.run{margin:1.5rem 0 1rem}
.run-svg{display:block;width:100%;height:auto;font-family:var(--fig-font,var(--font))}
.run-wide{display:none}.run-tall{max-width:30rem;margin:0 auto}
@media (min-width:64rem){.run-wide{display:block}.run-tall{display:none}}
.run-svg .bx{fill:var(--f-box);stroke:var(--f-line);stroke-width:1}
.run-svg .has-sg .bx{fill:var(--f-sg-box);stroke:var(--f-accent);stroke-width:2}
.run-svg .nc{fill:var(--f-accent)}.run-svg .nt{fill:var(--f-on-accent);font:700 15px var(--mono)}
.run-svg .tt{fill:var(--f-ink);font-weight:600}.run-svg .sgt{fill:var(--f-sg);font-weight:700}
.run-svg .ph{fill:var(--f-ink);font-weight:700}.run-svg .sub{fill:var(--f-muted)}
.run-svg .ar{stroke:var(--f-accent);stroke-width:2.5;fill:none}.run-svg .ah{fill:var(--f-accent)}
.run-svg .fp{fill:var(--f-sg-box);stroke:var(--f-accent)}.run-svg .fpt{fill:var(--f-ink);font-weight:600}
figcaption{font-size:.97rem;margin-top:.75rem;color:var(--muted)}
.steps li{margin:.45rem 0}.steps .sg{font-weight:700;color:var(--link)}
.designs-dialog{border:2px solid var(--ink);padding:1.25rem;width:min(60rem,calc(100vw - 1.5rem));max-height:calc(100vh - 2rem);background:var(--bg);color:var(--ink)}
.designs-dialog::backdrop{background:rgb(0 0 0/.55)}
.designs-dialog h2{margin:0 0 .5rem}
.dcards{display:grid;grid-template-columns:repeat(auto-fill,minmax(15rem,1fr));gap:1rem;list-style:none;padding:0;margin:1rem 0}
.dcards li{max-width:none}
.dcards a{display:block;height:100%;color:var(--ink);text-decoration:none;border:1px solid var(--muted);padding:.5rem}
.dcards img{display:block;width:100%;height:auto}
.dcards b{display:block;margin-top:.5rem;text-decoration:underline}.dcards span{display:block;font-size:.92rem;color:var(--muted)}
.dcards em{display:inline-block;margin-top:.35rem;font-style:normal;font-weight:700;font-size:.85rem;background:var(--accent);color:var(--on-accent);padding:.05rem .6rem}
.table{overflow-x:auto}table{border-collapse:collapse;width:100%}th,td{text-align:left;padding:.4rem .6rem;border-bottom:1px solid var(--muted);vertical-align:top}
footer.dfoot{margin-top:3rem;padding:1.5rem 0 2.5rem;border-top:1px solid var(--muted);font-size:.95rem}
footer.dfoot ul{display:flex;flex-wrap:wrap;gap:0 1.1rem;list-style:none;padding:0;margin:0 0 .5rem}footer.dfoot a{display:inline-flex;align-items:center;min-height:44px}
@media (prefers-reduced-motion:no-preference){.btn{transition:background-color .15s}}`;

const tokens = (d, extra) => `:root{--bg:${d.pal.bg};--ink:${d.pal.ink};--muted:${d.pal.muted};--accent:${d.pal.accent};--on-accent:${d.pal.onAccent};--font:${d.pal.font};--mono:ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace;${extra}}`;
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
${designsDialog(id)}
${DESIGNS_SCRIPT}
</body>
</html>
`;
  write(`d/${id}/index.html`, html);
}
const ps = (c, list) => list.map(o => `<p>${c.t(o)}</p>`).join('\n');
const sgOf = s => D.POC.safeguards.find(g => g.step === s.n);

// ---------- Broadsheet: a newspaper profile ----------
{
  const c = new Cite('/d/broadsheet/');
  const M = homeModel();
  const css = {
    vars: '--link:#9B1C1C;--focus:#9B1C1C;--strip-bg:#161513;--strip-ink:#F4F1EA;--strip-focus:#F2C14E;--f-box:#FFFDF8;--f-line:#4B4740;--f-ink:#161513;--f-muted:#4B4740;--f-accent:#9B1C1C;--f-on-accent:#FFFFFF;--f-sg:#9B1C1C;--f-sg-box:#F6E7E3;--fig-font:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif',
    rules: `.mast{border-top:6px double var(--ink);border-bottom:1px solid var(--ink);text-align:center;padding:.5rem 0;margin-top:1.5rem}
.mast p{margin:0 auto;max-width:none;font:700 clamp(1.6rem,5vw,2.6rem)/1.1 var(--font);letter-spacing:.02em}
.dateline{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.25rem 1rem;border-bottom:3px solid var(--ink);padding:.35rem 0;font:600 .85rem/1.4 system-ui,sans-serif;text-transform:uppercase;letter-spacing:.06em}
.kicker{font:700 .85rem/1.3 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#9B1C1C;margin:1.5rem 0 .25rem}
h1{font-size:clamp(2.6rem,8vw,5rem);line-height:1;margin:.25rem 0 .75rem;letter-spacing:-.02em}
.standfirst{font-size:1.3rem;font-style:italic;max-width:48rem}
h2{font-size:1.9rem;line-height:1.15;margin:2.5rem 0 .5rem;border-top:1px solid var(--ink);padding-top:.75rem}
h3{font:700 1rem/1.3 system-ui,sans-serif;text-transform:uppercase;letter-spacing:.06em}
.cols p{max-width:none;margin:0 0 .8rem}
.cols>p:first-child::first-letter{float:left;font-size:4.2rem;line-height:.85;font-weight:700;color:#9B1C1C;padding:.3rem .5rem 0 0}
@media (min-width:50rem){.cols{columns:2;column-gap:2.5rem;column-rule:1px solid #8E887C}}
@media (min-width:72rem){.cols.three{columns:3}}
.inbrief{display:grid;grid-template-columns:repeat(auto-fill,minmax(15rem,1fr));gap:0;border:1px solid var(--ink);list-style:none;padding:0;margin:1.5rem 0}
.inbrief li{padding:.75rem 1rem;border:1px solid #8E887C;max-width:none;font-size:.97rem}
.inbrief a{display:flex;align-items:center;min-height:44px;font-weight:700;font-size:1.1rem}
.plate{border-top:3px solid var(--ink);border-bottom:3px solid var(--ink);padding:.75rem 0;margin:1.5rem 0}
.plate .label{font:700 .85rem system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;margin:0}
.box{border:2px solid var(--ink);padding:1rem;margin:1.5rem 0}`,
  };
  designPage('broadsheet', { css, body: `<main id="main" class="wrap">
<div class="mast"><p>A profile</p></div>
<div class="dateline"><span>London</span><span>Facts read ${esc(fmtDate(D.SITE.read))}</span></div>
<p class="kicker">${esc(M.eyebrow.text)}${c.m(M.eyebrow.src)}</p>
<h1>${esc(D.PERSON.name)}</h1>
<p class="standfirst">${c.t(M.lede)}</p>
<ul class="inbrief" aria-label="In brief">
${M.highlights.map(h => `<li><a href="${h.href}">${esc(h.title)}</a>${esc(h.text)}${c.m(h.src)}</li>`).join('\n')}
</ul>
<h2>Who he is</h2>
<div class="cols">${ps(c, M.who)}</div>
<h2>Memory saved, the project deleted, the memory back</h2>
<div class="cols three">${ps(c, M.poc.paras)}<p>${c.t(M.poc.limit)}</p></div>
<div class="plate"><p class="label">Plate 1: the run</p>
${figure(c, { id: 'bs' })}
</div>
<p><a class="more" href="/proof-of-concept/">The proof of concept in full</a></p>
<h2>A page merged into Ruflo</h2>
<div class="cols">${ps(c, M.pr.paras)}</div>
<h2>The London chapter</h2>
<div class="cols">${ps(c, M.london.paras)}</div>
<h2>With Dinis Cruz</h2>
<div class="cols">${ps(c, M.collab.paras)}</div>
<h3>The four offers, as published</h3>
${offers(c, M)}
<div class="box"><h3>To enquire</h3><p>${c.t(M.contact)}</p><p class="cta"><a class="btn primary" href="${esc(mailto())}">${esc(M.contact.label)}</a> <a class="btn" href="${esc(D.PERSON.providerPage)}">His provider page</a></p></div>
${c.list()}
</main>` });
}
function offers(c, M) {
  return `<ul class="offers-compact">
${M.collab.offers.map(g => `<li><b>${esc(g.group)}.</b> ${esc(g.items.map(i => `${i.name} ${i.priceText}${i.ownKeyText ? ` (${i.ownKeyText} with your own model key)` : ''}${g.unit ? '' : ` ${i.unit}`}`).join(', '))}${g.unit ? ` ${esc(g.unit)}` : ''}.${g.status ? ` <i>${esc(g.status[0].toUpperCase() + g.status.slice(1))}.</i>` : ''}${c.m(g.src)}</li>`).join('\n')}
</ul>
${ps(c, M.collab.notes)}`;
}

// ---------- Run log: a terminal session (review condition 24: no invented commands) ----------
{
  const c = new Cite('/d/runlog/', { fmt: n => `[${n}]` });
  const M = homeModel();
  const pad = n => String(n).padStart(2, '0');
  const css = {
    vars: '--link:#7EE2A8;--focus:#F2C14E;--strip-bg:#1B222C;--strip-ink:#D7DEE8;--strip-focus:#F2C14E',
    rules: `body{font-size:1rem;line-height:1.65}
.term{max-width:52rem;margin:1.5rem auto;border:1px solid #9AA6B5;padding:1rem 1.1rem}
.term p,.term li{max-width:none}
h1{font-size:1.6rem;margin:.25rem 0 .5rem;color:#7EE2A8}
h2{font-size:1.05rem;margin:2.25rem 0 .5rem;color:#F2C14E}
h2::before{content:"# " / "";color:#9AA6B5}
h3{font-size:1rem;color:#D7DEE8;margin:1.25rem 0 .25rem}
h3::before{content:"## " / "";color:#9AA6B5}
.dim{color:#9AA6B5}
.ok{color:#7EE2A8}.warn{color:#F2C14E}
.log{list-style:none;padding:0;margin:.5rem 0}
.log li{padding:.2rem 0;border-bottom:1px dashed #2A3340}
.log .n{color:#F2C14E}
.log .ph{color:#9AA6B5}
.kv{list-style:none;padding:0}.kv li::before{content:"- ";color:#9AA6B5}
.btn{border-color:#D7DEE8;color:#D7DEE8}.btn.primary{background:#7EE2A8;border-color:#7EE2A8;color:#0E1116}
.sources h2::before{content:"# " / ""}
sup.mk a{font-family:var(--mono)}`,
  };
  designPage('runlog', { css, body: `<main id="main" class="wrap"><div class="term">
<p class="dim">This page is the Run log design of this site: the same facts and sources as the main site, laid out as labelled blocks of terminal output. Nothing here runs.</p>
<p class="dim">${esc(M.eyebrow.text.toLowerCase())}${c.m(M.eyebrow.src)}</p>
<h1>${esc(D.PERSON.name)}</h1>
<p>${c.t(M.lede)}</p>
<p class="cta"><a class="btn primary" href="/proof-of-concept/">See the proof of concept</a> <a class="btn" href="/collaboration/">Work with him</a></p>
<h2>highlights</h2>
<ul class="kv">
${M.highlights.map(h => `<li><a href="${h.href}">${esc(h.title)}</a>: ${esc(h.text)}${c.m(h.src)}</li>`).join('\n')}
</ul>
<h2>who</h2>
${ps(c, M.who)}
<h2>what he built: the SGit x Ruflo run</h2>
${ps(c, M.poc.paras)}
<p class="dim">The run uses a pinned Ruflo: <code>ruflo --version</code> returns v3.56.10.${c.m(D.POC.stepsSrc)}</p>
<ol class="log" aria-label="The twelve steps of the run">
${D.POC.steps.map(s => { const g = sgOf(s); const ph = D.POC.phases.find(p => p.id === s.phase); return `<li><span class="n">step ${pad(s.n)}/12</span> <span class="ph">${esc(ph.label.toLowerCase())}</span> ${esc(s.title)}${g ? ` <span class="ok">[safeguard ${g.n} held]</span>` : ''}${c.m(D.POC.stepsSrc)}</li>`; }).join('\n')}
</ol>
<h3>safeguards</h3>
<ul class="kv">
${D.POC.safeguards.map(g => `<li><span class="ok">safeguard ${g.n}</span>, step ${g.step}: ${c.t(g)}</li>`).join('\n')}
</ul>
<p><span class="warn">fingerprint</span>: ${esc(D.POC.fingerprint.line)}${c.m(D.POC.fingerprint.src)}</p>
<p><span class="warn">limit</span>: ${c.t(M.poc.limit)}</p>
<p><a class="more" href="/proof-of-concept/">The proof of concept in full</a></p>
<h2>merged into ruflo</h2>
${ps(c, M.pr.paras)}
<h2>agentics london</h2>
${ps(c, M.london.paras)}
<h2>with dinis cruz</h2>
${ps(c, M.collab.paras)}
<h3>offers, as published</h3>
${offers(c, M)}
<h2>contact</h2>
<p>${c.t(M.contact)}</p>
<p class="cta"><a class="btn primary" href="${esc(mailto())}">${esc(M.contact.label)}</a> <a class="btn" href="${esc(D.PERSON.providerPage)}">His provider page</a></p>
${c.list({ heading: 'sources' })}
</div></main>` });
}

// ---------- Blueprint: an engineering drawing ----------
{
  const c = new Cite('/d/blueprint/');
  const M = homeModel();
  const css = {
    vars: '--link:#7CC4FF;--focus:#FFD27A;--strip-bg:#081A30;--strip-ink:#F2F7FF;--strip-focus:#FFD27A;--f-box:#123358;--f-line:#B8CCE6;--f-ink:#F2F7FF;--f-muted:#B8CCE6;--f-accent:#7CC4FF;--f-on-accent:#0F2A4A;--f-sg:#FFD27A;--f-sg-box:#1A3F6B',
    rules: `body{background-color:#0F2A4A;background-image:linear-gradient(#1C3A60 1px,transparent 1px),linear-gradient(90deg,#1C3A60 1px,transparent 1px);background-size:24px 24px}
.sheet{border:2px solid #7CC4FF;margin:1.25rem 0;padding:1rem;background:rgb(15 42 74/.92)}
.label{font:600 .8rem/1.4 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:#7CC4FF;margin:0 0 .5rem}
.stamp{display:inline-block;border:2px solid #FFD27A;color:#FFD27A;padding:.25rem .6rem;font:700 1.6rem/1.2 var(--mono)}
h1{font-size:clamp(2.2rem,6vw,3.6rem);line-height:1.05;margin:.75rem 0}
h2{font-size:1.45rem;margin:0 0 .5rem}
h3{font-size:1.1rem}
.tb{display:grid;grid-template-columns:repeat(auto-fit,minmax(11rem,1fr));border:1px solid #7CC4FF;margin:1.25rem 0 0;font:.85rem/1.4 var(--mono)}
.tb div{border:1px solid #7CC4FF;padding:.4rem .6rem}.tb dt{color:#7CC4FF;text-transform:uppercase;letter-spacing:.06em;font-size:.75rem}.tb dd{margin:0;color:#F2F7FF}
.grid2{display:grid;gap:1.25rem}@media (min-width:56rem){.grid2{grid-template-columns:1fr 1fr}}
.grid2 .sheet{margin:0}
.notes{list-style:none;padding:0}.notes li{border-left:3px solid #7CC4FF;padding-left:.75rem;margin:.6rem 0}
.notes a{display:inline-flex;align-items:center;min-height:44px;font-weight:700}
.btn{border-color:#F2F7FF;color:#F2F7FF}.btn.primary{background:#7CC4FF;border-color:#7CC4FF;color:#0F2A4A}
.sources{background:rgb(15 42 74/.92);border:2px solid #7CC4FF;padding:1rem}`,
  };
  designPage('blueprint', { css, body: `<main id="main" class="wrap">
<section class="sheet" aria-labelledby="bp-h">
<p class="label">Sheet 01: general arrangement</p>
<span class="stamp" role="img" aria-label="Monogram MC">${esc(D.PERSON.monogram)}</span>
<h1 id="bp-h">${esc(D.PERSON.name)}</h1>
<p class="label">${esc(M.eyebrow.text)}${c.m(M.eyebrow.src)}</p>
<p>${c.t(M.lede)}</p>
<p class="cta"><a class="btn primary" href="/proof-of-concept/">See the proof of concept</a> <a class="btn" href="/collaboration/">Work with him</a></p>
<dl class="tb" aria-label="Title block">
<div><dt>Subject</dt><dd>SGit x Ruflo proof of concept</dd></div>
<div><dt>Steps</dt><dd>12</dd></div>
<div><dt>Safeguards</dt><dd>3</dd></div>
<div><dt>Drawn by</dt><dd>the AgentiCCells cell</dd></div>
<div><dt>Version</dt><dd>__VERSION__</dd></div>
<div><dt>Facts read</dt><dd>${esc(fmtDate(D.SITE.read))}</dd></div>
</dl>
</section>
<section class="sheet" aria-labelledby="bp-notes"><p class="label">Key notes</p><h2 id="bp-notes">Highlights</h2>
<ul class="notes">
${M.highlights.map(h => `<li><a href="${h.href}">${esc(h.title)}</a><br>${esc(h.text)}${c.m(h.src)}</li>`).join('\n')}
</ul></section>
<section class="sheet" aria-labelledby="bp-who"><p class="label">Detail A</p><h2 id="bp-who">Who he is</h2>${ps(c, M.who)}</section>
<section class="sheet" aria-labelledby="bp-run"><p class="label">Main drawing</p><h2 id="bp-run">The run: twelve steps, three safeguards</h2>
${ps(c, M.poc.paras)}
${figure(c, { id: 'bp' })}
<p>${c.t(M.poc.limit)}</p>
<p><a class="more" href="/proof-of-concept/">The proof of concept in full</a></p>
</section>
<div class="grid2">
<section class="sheet" aria-labelledby="bp-pr"><p class="label">Detail B</p><h2 id="bp-pr">Merged into Ruflo</h2>${ps(c, M.pr.paras)}</section>
<section class="sheet" aria-labelledby="bp-ldn"><p class="label">Detail C</p><h2 id="bp-ldn">Agentics Foundation, London</h2>${ps(c, M.london.paras)}</section>
</div>
<section class="sheet" aria-labelledby="bp-col"><p class="label">Detail D</p><h2 id="bp-col">With Dinis Cruz</h2>${ps(c, M.collab.paras)}
<h3>The four offers, as published</h3>
${offers(c, M)}</section>
<section class="sheet" aria-labelledby="bp-con"><p class="label">Detail E</p><h2 id="bp-con">Contact</h2><p>${c.t(M.contact)}</p>
<p class="cta"><a class="btn primary" href="${esc(mailto())}">${esc(M.contact.label)}</a> <a class="btn" href="${esc(D.PERSON.providerPage)}">His provider page</a></p></section>
${c.list()}
</main>` });
}

// ---------- Vault: saved encrypted, checked, restored (review condition 26: no "sealed", no hash values) ----------
{
  const c = new Cite('/d/vault/');
  const M = homeModel();
  const css = {
    vars: '--link:#D9B26A;--focus:#8FD3B8;--strip-bg:#0B1411;--strip-ink:#ECE6D8;--strip-focus:#8FD3B8;--sans:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif',
    rules: `body{font-family:var(--sans)}
h1,h2,h3{font-family:Charter,"Bitstream Charter","Sitka Text",Cambria,Georgia,serif;line-height:1.15}
.hero{display:grid;gap:1.5rem;align-items:center;padding:2.5rem 0 1rem}@media (min-width:48rem){.hero{grid-template-columns:auto 1fr}}
.seal{width:9rem;height:9rem;border:3px solid #D9B26A;border-radius:50%;display:grid;place-items:center;color:#D9B26A;font:700 2.75rem/1 Charter,Georgia,serif;outline:2px solid #D9B26A;outline-offset:6px;margin:8px}
@media (max-width:40rem){.seal{width:5.5rem;height:5.5rem;font-size:1.75rem}}
.k{font:600 .85rem/1.4 var(--sans);letter-spacing:.08em;text-transform:uppercase;color:#D9B26A;margin:0}
h1{font-size:clamp(2.4rem,7vw,4.2rem);margin:.25rem 0 .5rem}
.panels{display:grid;gap:1rem}@media (min-width:56rem){.panels.two{grid-template-columns:1fr 1fr}}
.panel{border:1px solid #B9B2A2;border-radius:6px;padding:1rem 1.1rem;margin:1rem 0}
.panels .panel{margin:0}
.panel h2{font-size:1.5rem;margin:.1rem 0 .5rem}
.panel h3{font-size:1.15rem;margin:1rem 0 .25rem;color:#D9B26A}
.line{font:.85rem/1.5 var(--mono);color:#8FD3B8;border-top:1px solid #B9B2A2;margin-top:.75rem;padding-top:.5rem;max-width:none}
.phases{display:grid;gap:1rem;list-style:none;padding:0}@media (min-width:56rem){.phases{grid-template-columns:repeat(2,1fr)}}
.phases>li{border:1px solid #D9B26A;border-radius:6px;padding:.75rem 1rem;max-width:none}
.phases ol{padding-left:1.5rem;margin:.25rem 0}
.phases .sg{color:#8FD3B8;font-weight:700}
.facts{list-style:none;padding:0;display:grid;gap:.75rem}@media (min-width:56rem){.facts{grid-template-columns:repeat(4,1fr)}}
.facts li{border:1px solid #B9B2A2;border-radius:6px;padding:.75rem;max-width:none}
.facts a{display:flex;align-items:center;min-height:44px;font-weight:700}
.btn{border-color:#ECE6D8;color:#ECE6D8;border-radius:4px}.btn.primary{background:#D9B26A;border-color:#D9B26A;color:#13201C}`,
  };
  const phases = () => D.POC.phases.map((ph, i) => `<li><h3>${i + 1}. ${esc(ph.label)}</h3><ol start="${ph.steps[0]}">${ph.steps.map(n => { const s = D.POC.steps.find(x => x.n === n); const g = sgOf(s); return `<li>${esc(s.title)}${g ? ` <span class="sg">(safeguard ${g.n} held)</span>` : ''}${c.m(D.POC.stepsSrc)}</li>`; }).join('')}</ol></li>`).join('\n');
  designPage('vault', { css, body: `<main id="main" class="wrap">
<section class="hero" aria-labelledby="v-h">
<div class="seal" role="img" aria-label="Monogram MC">${esc(D.PERSON.monogram)}</div>
<div><p class="k">${esc(M.eyebrow.text)}${c.m(M.eyebrow.src)}</p>
<h1 id="v-h">${esc(D.PERSON.name)}</h1>
<p>${c.t(M.lede)}</p>
<p class="cta"><a class="btn primary" href="/proof-of-concept/">See the proof of concept</a> <a class="btn" href="/collaboration/">Work with him</a></p></div>
</section>
<ul class="facts">
${M.highlights.map(h => `<li><a href="${h.href}">${esc(h.title)}</a>${esc(h.text)}${c.m(h.src)}</li>`).join('\n')}
</ul>
<section class="panel" aria-labelledby="v-who"><p class="k">Checkpoint 1</p><h2 id="v-who">Who he is</h2>${ps(c, M.who)}<p class="line">checked against: his provider page and the chapter's site</p></section>
<section class="panel" aria-labelledby="v-run"><p class="k">Checkpoint 2</p><h2 id="v-run">Saved encrypted, checked, restored</h2>
${ps(c, M.poc.paras)}
<ol class="phases" aria-label="The four phases of the run">
${phases()}
</ol>
<h3>The three safeguards</h3>
<ul>${D.POC.safeguards.map(g => `<li>Safeguard ${g.n}, at step ${g.step}: ${c.t(g)}</li>`).join('')}</ul>
<p>${esc(D.POC.fingerprint.line)}${c.m(D.POC.fingerprint.src)}</p>
<p>${c.t(M.poc.limit)}</p>
<p><a class="more" href="/proof-of-concept/">The proof of concept in full</a></p>
<p class="line">checkpoint: encrypted · policy: ABP · sha256: same</p>
</section>
<div class="panels two">
<section class="panel" aria-labelledby="v-pr"><p class="k">Checkpoint 3</p><h2 id="v-pr">Merged into Ruflo</h2>${ps(c, M.pr.paras)}</section>
<section class="panel" aria-labelledby="v-ldn"><p class="k">Checkpoint 4</p><h2 id="v-ldn">Agentics Foundation, London</h2>${ps(c, M.london.paras)}</section>
</div>
<section class="panel" aria-labelledby="v-col"><p class="k">Checkpoint 5</p><h2 id="v-col">With Dinis Cruz</h2>${ps(c, M.collab.paras)}
<h3>The four offers, as published</h3>
${offers(c, M)}</section>
<section class="panel" aria-labelledby="v-con"><p class="k">Checkpoint 6</p><h2 id="v-con">Contact</h2><p>${c.t(M.contact)}</p>
<p class="cta"><a class="btn primary" href="${esc(mailto())}">${esc(M.contact.label)}</a> <a class="btn" href="${esc(D.PERSON.providerPage)}">His provider page</a></p></section>
${c.list()}
</main>` });
}

// ---------- the parity check (review condition 23) ----------
const home = citedOn.get('/');
if (!home || !home.size) throw new Error('designs: no sources recorded for / (generate.mjs must run first)');
const missing = [];
for (const d of DESIGNS) {
  const got = citedOn.get(`/d/${d.id}/`) || new Set();
  for (const id of home) if (!got.has(id)) missing.push(`/d/${d.id}/ does not cite source "${id}", which / cites`);
}
if (missing.length) throw new Error(`Design parity check failed:\n${missing.join('\n')}`);
console.log(`designs: /d/ and ${DESIGNS.length} designs; each cites all ${home.size} sources cited on /`);
