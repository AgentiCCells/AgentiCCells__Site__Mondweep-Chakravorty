// Copyright 2026 AgentiCCells. Licensed under the Apache License, Version 2.0
// (http://www.apache.org/licenses/LICENSE-2.0). The text it writes is CC BY 4.0.
//
// Build step: writes the main site (the Ledger design) into _site/ from data/site.mjs:
// /, /built/, /proof-of-concept/, /experience/, /agentics-london/, /collaboration/, /sources/, /ai/,
// and /llms.txt, /index.md, /facts.json. scripts/build.mjs imports this after copying src/ to _site/.
// Written by developer.mondweep-chakravorty@AgentiCCells.dinis, round 1 (2026-11-18).
import { D, SITE, esc, write, fmtDate, page, Cite, citedOn, statements, homeModel, offersCompact, figure, mailto, checkApproval, checkApprovalPages, NAV, motif, photoImg, numbersList, careerSummary, workBlock, pageHead } from './lib.mjs';

checkApproval();
const P = path => D.PAGES[path] || (() => { throw new Error(`data/site.mjs PAGES has no entry for ${path}`); })();
const paras = (c, list) => list.map(o => `<p>${c.t(o)}</p>`).join('\n');
const sourceIdByUrl = url => Object.keys(D.SOURCES).find(k => D.SOURCES[k].url === url);
// Review condition 15: the talk was Dinis Cruz's and appears once, in its own section on /collaboration/.
const isTalk = o => (o.src || []).includes('talk');

// ---------- home (round 2 changes 1, 2, 3 and 4a) ----------
// The first screen is a teal field with the headshot, the name and four numbers; then bands: career, the run
// drawn, Dinis Cruz's words as a pull quote, two cards, Work with him, and the collaboration.
export function homeBody(c) {
  const M = homeModel(), H = M.hero;
  const name = D.PERSON.name.split(' ');
  return `<div class="field hero-field">
${motif('motif motif-l')}
<div class="wrap">
<section class="hero" aria-labelledby="h1">
<div class="hero-text">
<p class="eyebrow">${c.t(H.eyebrow)}</p>
<h1 id="h1">${esc(name[0])}<br>${esc(name.slice(1).join(' '))}</h1>
<p class="line">${c.t(H.line)}</p>
<p class="lede">${c.t(H.lede)}</p>
<p class="cta">${H.actions.map(a => `<a class="btn ${a.style === 'primary' ? 'gold' : 'outline'}" href="${esc(a.href)}">${esc(a.label)}</a>`).join(' ')}</p>
</div>
<figure class="portrait">
${photoImg()}
${motif('motif motif-s', { w: 300, h: 150 })}
<figcaption aria-hidden="true">London</figcaption>
</figure>
</section>
${numbersList(c)}
</div>
</div>

<section class="band paper" aria-labelledby="career-h">
<div class="wrap career">
<div><p class="kicker">${esc(M.career.kicker)}</p>
<h2 id="career-h">${esc(M.career.heading)}</h2></div>
<div>
${careerSummary(c)}
<ul class="chips" aria-label="Where, in the order the source gives">${M.careerOrgs.map(o => `<li>${esc(o)}</li>`).join('')}</ul>
<p><a class="more" href="${esc(M.career.href)}">${esc(M.career.linkText)}</a></p>
</div>
</div>
</section>

<section class="band" id="run" aria-labelledby="poc-h">
<div class="wrap">
<p class="kicker">The proof of concept</p>
<h2 id="poc-h">Memory saved, the project deleted, the memory back</h2>
<div class="two-p">${M.poc.paras.map(o => `<p>${c.t(o)}</p>`).join('\n')}</div>
${figure(c, { id: 'run' })}
<p class="nv-line">${c.t(M.poc.limit)}</p>
<p><a class="more" href="/proof-of-concept/">The proof of concept in full, with its limits</a></p>
</div>
</section>

<section class="band ink" aria-labelledby="quote-h">
<div class="wrap">
<h2 class="kicker" id="quote-h">In Dinis Cruz's words</h2>
<blockquote class="quote">
<p>"${esc(M.pullQuote.text)}"</p>
<footer>${esc(M.pullQuote.cite)}${c.m(M.pullQuote.src)}</footer>
</blockquote>
</div>
</section>

<div class="band">
<div class="wrap cards2">
<section class="card" aria-labelledby="pr-h"><p class="kicker">Ruflo</p><h2 id="pr-h">Merged into Ruflo</h2>
${M.pr.paras.map(o => `<p>${c.t(o)}</p>`).join('\n')}
<p><a class="more" href="/built/">What he has built</a></p></section>
<section class="card" aria-labelledby="ldn-h"><p class="kicker">Community</p><h2 id="ldn-h">Agentics Foundation, London</h2>
${M.london.paras.map(o => `<p>${c.t(o)}</p>`).join('\n')}
<p><a class="more" href="/agentics-london/">The London chapter</a></p></section>
</div>
</div>

<section class="band paper" id="work" aria-labelledby="work-h">
<div class="wrap">
<p class="kicker">Enquiries</p>
<h2 id="work-h">${esc(M.work.heading)}</h2>
${workBlock(c, { h: 3, id: 'work' })}
</div>
</section>

<section class="band" aria-labelledby="col-h">
<div class="wrap career">
<div><p class="kicker">The collaboration</p><h2 id="col-h">With Dinis Cruz</h2></div>
<div>${M.collab.paras.map(o => `<p>${c.t(o)}</p>`).join('\n')}
<p><a class="more" href="/collaboration/">The collaboration in full</a></p></div>
</div>
</section>`;
}

const pages = [];
function emit(path, body, extra = {}) {
  const { title, description, ...opts } = { ...P(path), ...extra };
  write(`${path.replace(/^\//, '')}index.html`, page({ path, title, description, body, ...opts }));
  pages.push({ path, title, description });
}

{
  const c = new Cite('/', { record: true });
  emit('/', `${homeBody(c)}\n<div class="wrap">${c.list()}</div>`, { bleed: true, onField: true });
}

// ---------- what he has built ----------
{
  const c = new Cite('/built/', { record: true });
  const V = D.POC.video;
  emit('/built/', `<section aria-labelledby="b-poc"><h2 id="b-poc">${esc(D.POC.title)}</h2>
${paras(c, D.POC.summary)}
<p>The video: <a href="${esc(V.url)}">${esc(V.title)}</a>, published ${esc(fmtDate(V.date))}, ${esc(V.seconds)} seconds. ${esc(V.note)}${c.m(V.src)}</p>
<p><a class="more" href="/proof-of-concept/">The twelve steps and three safeguards, drawn as a figure</a></p>
</section>
<section aria-labelledby="b-code"><h2 id="b-code">The code</h2>
<p><a href="${esc(D.POC.code.url)}">${esc(D.POC.code.name)}</a>, public under the ${esc(D.POC.code.licence)} licence. ${c.t(D.POC.code)}</p>
</section>
<section aria-labelledby="b-pr"><h2 id="b-pr">Pull request #${D.PR.number} in ${esc(D.PR.repo)}</h2>
<p class="pr-title"><a href="${esc(D.PR.url)}">${esc(D.PR.title)}</a></p>
${paras(c, D.PR.summary)}
<p>${c.t(D.PR.acceptance)}</p>
<h3>Its three commits</h3>
<div class="table"><table><thead><tr><th scope="col">Commit</th><th scope="col">London time</th><th scope="col">Subject</th></tr></thead><tbody>
${D.PR.commits.map(k => `<tr><td><code>${esc(k.sha)}</code></td><td>${esc(fmtDate(k.time))}, ${esc(k.time.slice(11, 16))}</td><td>${esc(k.subject)}${c.m(D.PR.commitsSrc)}</td></tr>`).join('\n')}
</tbody></table></div>
<p>The merged page: <a href="${esc(D.PR.fileUrl)}">${esc(D.PR.pageTitle)}</a> (<code>${esc(D.PR.file)}</code>, ${D.PR.lines} lines)${c.m(['pr-page'])}.</p>
<blockquote><p>"${esc(D.PR.quote.text)}"</p><p class="by">${esc(D.PR.quote.by)}${c.m(D.PR.quote.src)}</p></blockquote>
</section>
${c.list()}`, { pagehead: { kicker: 'His work', title: 'What he has built', lede: 'The SGit × Ruflo proof of concept, the code behind it, and a pull request merged into Ruflo.' } });
}

// ---------- the proof of concept ----------
{
  const c = new Cite('/proof-of-concept/', { record: true });
  const PC = D.POC;
  const lede = c.t(PC.summary[0]);
  emit('/proof-of-concept/', `<section aria-labelledby="p-run"><h2 id="p-run">The run, second by second</h2>
<p>${c.t(PC.summary[3])}</p>
${figure(c, { id: 'run', limits: true, detail: true })}
</section>
<section aria-labelledby="p-what"><h2 id="p-what">What it shows</h2>
${paras(c, PC.summary.slice(1, 3))}
</section>
<section aria-labelledby="p-vault"><h2 id="p-vault">Where the vault and the policy come in</h2>
<p>${c.t(PC.vaultText)}</p>
<p>${c.t(PC.gateText)}</p>
</section>
<section aria-labelledby="p-pol"><h2 id="p-pol">The mandate: four policy rows</h2>
<div class="table"><table><thead><tr><th scope="col">Action</th><th scope="col">Scope</th><th scope="col">Decision</th><th scope="col">Capability</th></tr></thead><tbody>
${PC.policyRows.map(r => `<tr><td>${esc(r.action)}</td><td>${esc(r.scope)}</td><td>${esc(r.decision)}</td><td><code>${esc(r.capability)}</code></td></tr>`).join('\n')}
</tbody></table></div>
<p>Rows as the newsroom gives them${c.m(PC.policySrc)}. ${c.t(PC.policyNote)}</p>
</section>
<section aria-labelledby="p-res"><h2 id="p-res">The run's own summary (step 12)</h2>
<div class="table"><table><thead><tr><th scope="col">Check</th><th scope="col">Result</th></tr></thead><tbody>
${PC.results.map(r => `<tr><td>${esc(r.check)}</td><td>${esc(r.result)}${c.m(PC.resultsSrc)}</td></tr>`).join('\n')}
</tbody></table></div>
</section>
<section aria-labelledby="p-more"><h2 id="p-more">Video and code</h2>
<p>The video: <a href="${esc(PC.video.url)}">${esc(PC.video.title)}</a>, ${esc(PC.video.seconds)} seconds${c.m(PC.video.src)}. ${esc(PC.video.note)} This site draws its own figure from the article and shows no frames from the video.</p>
<p>The code: <a href="${esc(PC.code.url)}">${esc(PC.code.name)}</a>, under the ${esc(PC.code.licence)} licence. ${c.t(PC.code)}</p>
<blockquote><p>"${esc(PC.quote.text)}"</p><p class="by">${esc(PC.quote.by)}${c.m(PC.quote.src)}</p></blockquote>
</section>
${c.list()}`, { pagehead: { kicker: 'Proof of concept', title: esc(PC.title), lede } });
}

// ---------- career (round 2 change 5, review conditions 14 and 21 to 24) ----------
// From the long bio on ruv.sgit.ai (F09 to F12, F14), cleared by Dinis Cruz on 2026-11-18; every item cites
// providers-data. An ordered path, not a dated timeline: the source gives an order and one date.
{
  const c = new Cite('/experience/', { record: true });
  const K = D.CAREER;
  const lede = c.t(K.intro);
  emit('/experience/', `<ol class="path" aria-label="His career, ${esc(K.pathLabel.toLowerCase())}">
${K.path.map((p, i) => `<li${i === K.path.length - 1 ? ' class="now"' : ''}><span class="when">${esc(p.label)}</span><h2>${esc(p.orgs.join(', '))}</h2><p>${c.t(p)}</p></li>`).join('\n')}
</ol>
<p class="note">${esc(K.pathLabel)}. The labels First, Then and After the MBA are this site's; the source gives the order, and for this path one date, September 2024.</p>
<div class="two">
${K.cards.map(k => `<section class="card"><p class="kicker">${esc(k.kicker)}</p><h2>${esc(k.title)}</h2><p>${c.t(k)}</p></section>`).join('\n')}
</div>
<h2>${esc(K.specialisms.heading)}</h2>
<ul class="spec">${K.specialisms.items.map((x, i) => `<li>${esc(x)}${i === K.specialisms.items.length - 1 ? c.m(K.specialisms.src) : ''}</li>`).join('')}</ul>
<h2>Sectors</h2>
<p>${c.t(K.sectors)} Based in ${esc(D.PERSON.place)}${c.m(D.PERSON.placeSrc)}.</p>
<p class="note">${K.note.map(n => c.t(n)).join(' ')}</p>
${c.list()}`, { pagehead: { kicker: esc(K.kicker), title: esc(K.heading), lede } });
}

// ---------- Agentics London ----------
{
  const c = new Cite('/agentics-london/', { record: true });
  const L = D.LONDON;
  const lede = c.t(L.text[0]);
  emit('/agentics-london/', `${paras(c, L.text.slice(1))}
<dl class="kv">
${L.facts.map(f => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}${c.m(f.src)}</dd></div>`).join('\n')}
</dl>
<p><a class="more" href="${esc(L.url)}">The chapter's own site, london.agentics.org</a></p>
${c.list()}`, { pagehead: { kicker: 'Community', title: 'Agentics Foundation, London', lede } });
}

// ---------- with Dinis Cruz ----------
{
  const c = new Cite('/collaboration/', { record: true });
  const C = D.COLLAB;
  const T = C.talk;
  const offerTable = g => `<section class="offer" aria-labelledby="o-${esc(g.group.toLowerCase().replace(/\W+/g, '-'))}">
<h3 id="o-${esc(g.group.toLowerCase().replace(/\W+/g, '-'))}">${esc(g.group)}${g.status ? ` <span class="tag">${esc(g.status)}</span>` : ''}</h3>
${g.note ? `<p>${esc(g.note)}${c.m(g.src)}</p>` : ''}
<div class="table"><table><thead><tr><th scope="col">Offer</th><th scope="col">Price</th>${g.items.some(i => i.ownKeyText) ? '<th scope="col">With your own model key</th>' : ''}<th scope="col">What it is</th></tr></thead><tbody>
${g.items.map(i => `<tr><td>${esc(i.name)}</td><td class="num">${esc(i.priceText)} ${esc(i.unit)}</td>${i.ownKeyText ? `<td class="num">${esc(i.ownKeyText)}</td>` : ''}<td>${esc(i.summary)}${c.m(g.src)}</td></tr>`).join('\n')}
</tbody></table></div>
</section>`;
  const lede = c.t(C.intro[0]);
  emit('/collaboration/', `<section class="work-sec" aria-labelledby="c-work"><h2 id="c-work">${esc(D.WORK.heading)}</h2>
${workBlock(c, { h: 3, id: 'cw', offersAt: 'c-offers' })}
<p>${c.t(C.projectsNote)}</p>
</section>
<section aria-labelledby="c-week"><h2 id="c-week">16 to 21 October 2026</h2>
<p>How the collaboration moved in one week. Times are London time.</p>
<ol class="cstrip">
${C.strip.map(d => `<li><time datetime="${esc(d.date)}">${esc(d.dateText)}</time><ul>${d.items.map(i => `<li>${c.t(i)}</li>`).join('')}</ul></li>`).join('\n')}
</ol>
<p>What came before: <a class="more inl" href="#c-talk">how the marketplace began</a>.</p>
</section>
${paras(c, C.intro.slice(1))}
<p>${c.t(C.founding)}</p>
${paras(c, C.roles)}
<section aria-labelledby="c-offers"><h2 id="c-offers">The four offers, as published</h2>
${paras(c, C.offersNote)}
${C.offers.map(offerTable).join('\n')}
<p>${c.t(C.engagement)}</p>
</section>
<section aria-labelledby="c-talk"><h2 id="c-talk">How the marketplace began</h2>
${paras(c, T.text)}
<p class="note">${esc(T.note)}</p>
</section>
<section aria-labelledby="c-art"><h2 id="c-art">The articles</h2>
<p>${c.t(C.articlesNote)}</p>
<ol class="articles">
${C.articles.map(a => { const id = sourceIdByUrl(a.url); return `<li><a href="${esc(a.url)}">${esc(a.short)}</a> <span class="meta">No. ${a.no}, ${esc(fmtDate(a.date))}${a.titleNote ? `; title ${esc(a.titleNote)}` : ''}</span><br>${esc(a.why)}${c.m(id ? [id] : [])}</li>`; }).join('\n')}
</ol>
</section>
<section aria-labelledby="c-time"><h2 id="c-time">Timeline</h2>
<ol class="timeline">
${C.timeline.filter(o => !isTalk(o)).map(o => `<li><time datetime="${esc(o.date)}">${esc(fmtDate(o.date))}</time> ${c.t(o)}</li>`).join('\n')}
</ol>
</section>
<p class="note">${c.t(C.disclaimer)}</p>
${c.list()}`, { pagehead: { kicker: 'The collaboration', title: 'With Dinis Cruz', lede } });
}

// ---------- use with AI ----------
const aiQuestions = D.AI.questions.filter(q => !(q.src || []).includes('talk') && !/\btalk\b/i.test(q.q));
{
  const c = new Cite('/ai/', { record: true });
  emit('/ai/', `<h1>Use with AI</h1>
<p class="lede">What this site offers AI tools and assistants: the same facts as the pages, in plain text, each with its source.</p>
<ul class="files">
<li><a href="/llms.txt">/llms.txt</a>: a short summary, the list of pages, the questions and answers below, and every source.</li>
<li><a href="/index.md">/index.md</a>: the whole site as one Markdown file, with numbered sources.</li>
<li><a href="/facts.json">/facts.json</a>: every sentence on the main pages with its source ids, the offers, the steps of the run and the sources, as JSON.</li>
</ul>
<h2>Summary</h2>
<p>${esc(D.AI.summary)}${c.m(D.AI.summarySrc)}</p>
<h2>Questions and answers</h2>
<dl class="qa">
${aiQuestions.map(q => `<div><dt>${esc(q.q)}</dt><dd>${esc(q.a)}${c.m(q.src)}</dd></div>`).join('\n')}
</dl>
<h2>How to cite this site</h2>
<p>${esc(D.AI.howToCite)}</p>
<h2>What he has and has not approved</h2>
<ul>${D.PERSON.status.map(x => `<li>${esc(x.text)}</li>`).join('')}</ul>
${c.list()}`);
}

// ---------- sources ----------
{
  const usedBy = id => [...citedOn].filter(([, s]) => s.has(id)).map(([p]) => p);
  const label = p => (p === '/' ? 'Home' : (NAV.find(([h]) => h === p) || [, D.PAGES[p]?.title || p])[1]);
  const ids = Object.keys(D.SOURCES);
  write('sources/index.html', page({
    path: '/sources/', ...P('/sources/'),
    body: `<h1>Sources</h1>
<p class="lede">Every source this site uses, with its address and the date it was read. All were read on ${esc(fmtDate(D.SITE.read))}, without logging in. The fact ids refer to the team's research file, <a href="https://github.com/AgentiCCells/AgentiCCells__Site__Mondweep-Chakravorty/blob/dev/research/facts.json">research/facts.json</a>.</p>
<p>The five designs under <a href="/d/">/d/</a> cite the same sources as the home page.</p>
<ol class="srcall">
${ids.map(id => { const s = D.SOURCES[id]; const used = usedBy(id); return `<li id="${esc(id)}"><a href="${esc(s.url)}">${esc(s.title)}</a>
<span class="meta">${esc(s.publisher)}${s.date ? `, published ${esc(fmtDate(s.date))}` : ''}. Read ${esc(fmtDate(s.read))}.</span>
${s.note ? `<span class="meta">${esc(s.note)}</span>` : ''}
${(s.facts || []).length ? `<span class="meta">Facts: ${esc(s.facts.join(', '))}.</span>` : ''}
<span class="meta">${used.length ? `Used on: ${used.map(p => `<a href="${p}">${esc(label(p))}</a>`).join(', ')}.` : 'Listed for completeness; not cited on a page.'}</span></li>`; }).join('\n')}
</ol>
<h2>What he has and has not approved</h2>
<ul>${D.PERSON.status.map(s => `<li>${esc(s.text)}</li>`).join('')}</ul>`,
  }));
  pages.push({ path: '/sources/', ...P('/sources/') });
}

// ---------- /llms.txt, /index.md, /facts.json ----------
{
  const S = D.SOURCES;
  const srcLine = ids => ids.map(id => `${S[id].title} (${S[id].url})`).join('; ');
  const llms = `# ${D.SITE.name}

> ${D.AI.summary}

Every fact on this site comes from a public source read on ${D.SITE.read}; the source is marked against each fact on the pages and listed at ${SITE}/sources/. ${D.PERSON.status.map(x => x.text).join(' ')} Text CC BY 4.0.

## Pages

${pages.filter(p => p.path !== '/ai/').concat([{ path: '/ai/', ...P('/ai/') }, { path: '/behind-the-scenes/', ...P('/behind-the-scenes/') }, { path: '/d/', ...P('/d/') }]).map(p => `- [${p.title}](${SITE}${p.path}): ${p.description}`).join('\n')}

## Plain text and data

- [The whole site as Markdown](${SITE}/index.md)
- [Every sentence with its sources, as JSON](${SITE}/facts.json)

## Questions and answers

${aiQuestions.map(q => `### ${q.q}\n\n${q.a}\n\nSources: ${srcLine(q.src)}`).join('\n\n')}

## Contact

${D.PERSON.contact.text} His provider page: ${D.PERSON.providerPage}

## Sources

${Object.keys(S).map(id => `- ${S[id].title}, ${S[id].publisher}${S[id].date ? `, ${S[id].date}` : ''}. ${S[id].url} (read ${S[id].read})`).join('\n')}

## How to cite

${D.AI.howToCite}
`;
  write('llms.txt', llms);

  // index.md: the main pages as Markdown, with one numbered source list at the end.
  const order = [];
  const mk = ids => (ids || []).map(id => { let i = order.indexOf(id); if (i < 0) { order.push(id); i = order.length - 1; } return `[${i + 1}]`; }).join('');
  const t = o => `${o.text} ${mk(o.src)}`.trim();
  const ps = list => list.map(t).join('\n\n');
  const C = D.COLLAB;
  const md = `# ${D.SITE.name}

${t({ text: D.HOME.lede, src: D.PERSON.headlineSrc })}

${ps(D.HOME.intro)}

Source: ${SITE}/ (a Markdown copy of the site, made at build time from the same data as the pages).

## What he has built

### ${D.POC.title}

${ps(D.POC.summary)}

Video: ${D.POC.video.title}, ${D.POC.video.url} (${D.POC.video.note}) ${mk(D.POC.video.src)}

Code: ${D.POC.code.name}, ${D.POC.code.url}, ${D.POC.code.licence} licence. ${t(D.POC.code)}

### The run, step by step

${D.POC.phases.map((ph, i) => `${i + 1}. ${ph.label}: steps ${ph.steps.join(', ')}`).join('\n')}

${D.POC.steps.map(s => { const g = D.POC.safeguards.find(x => x.step === s.n); return `${s.n}. **${s.title}.** ${s.text}${g ? ` Safeguard ${g.n} held.` : ''} ${mk(D.POC.stepsSrc)}`; }).join('\n')}

Safeguards:

${D.POC.safeguards.map(g => `- Safeguard ${g.n}, at step ${g.step}: ${t(g)}`).join('\n')}

Fingerprint: ${D.POC.fingerprint.line} ${mk(D.POC.fingerprint.src)}

What the run did not show:

${D.POC.limits.map(l => `- ${t(l)}`).join('\n')}

${t(D.POC.vaultText)}

${t(D.POC.gateText)}

### Pull request #${D.PR.number} in ${D.PR.repo}

${D.PR.title} (${D.PR.url})

${ps(D.PR.summary)}

${t(D.PR.acceptance)}

## Career

${t(D.CAREER.intro)}

${D.CAREER.path.map(p => `- ${p.label}: ${t(p)}`).join('\n')}

${D.CAREER.cards.map(k => `- ${k.kicker}, ${k.title}: ${t(k)}`).join('\n')}

${D.CAREER.specialisms.heading}: ${D.CAREER.specialisms.items.join('; ')} ${mk(D.CAREER.specialisms.src)}

${D.CAREER.note.map(t).join(' ')}

## Agentics Foundation, London

${ps(D.LONDON.text)}

${D.LONDON.facts.map(f => `- ${f.label}: ${f.value} ${mk(f.src)}`).join('\n')}

## With Dinis Cruz

${ps(C.intro)}

${t(C.founding)}

${ps(C.roles)}

### The four offers, as published

${ps(C.offersNote)}

${C.offers.map(g => `#### ${g.group}${g.status ? ` (${g.status})` : ''} ${mk(g.src)}\n\n${g.note ? `${g.note}\n\n` : ''}${g.items.map(i => `- ${i.name}: ${i.priceText} ${i.unit}${i.ownKeyText ? ` (${i.ownKeyText} with your own model key)` : ''}. ${i.summary}`).join('\n')}`).join('\n\n')}

${t(C.engagement)}

### Five kinds of project

${t(C.projectsNote)}

${C.projects.map(p => `- ${p} ${mk(C.projectsSrc)}`).join('\n')}

### How the marketplace began

${ps(C.talk.text)}

${C.talk.note}

### Articles

${C.articles.map(a => `- No. ${a.no}, ${a.date}: [${a.short}](${a.url}). ${a.why}`).join('\n')}

### ${D.WORK.heading}

${D.WORK.projectsHeading}: ${D.WORK.projects.join('; ')} ${mk(D.WORK.projectsSrc)}

${D.WORK.nextHeading}:

${D.WORK.next.map(n => `- ${t(n)}`).join('\n')}

### Contact

${t(D.PERSON.contact)} ${D.PERSON.providerPage}

## Sources

${order.map((id, i) => `${i + 1}. ${S[id].title}, ${S[id].publisher}${S[id].date ? `, ${S[id].date}` : ''}. ${S[id].url} (read ${S[id].read})`).join('\n')}
`;
  write('index.md', md);

  const facts = {
    about: `Facts on ${SITE}, each sentence with the ids of its sources. Every source was read on ${D.SITE.read}. Text CC BY 4.0.`,
    site: SITE,
    read: D.SITE.read,
    person: { name: D.PERSON.name, headline: D.PERSON.headline, place: D.PERSON.place, contact: D.PERSON.contact.email, providerPage: D.PERSON.providerPage, sources: D.PERSON.headlineSrc },
    statements,
    proofOfConcept: {
      title: D.POC.title,
      phases: D.POC.phases,
      steps: D.POC.steps.map(({ n, title, phase, safeguard, text }) => ({ n, title, phase, safeguard, text })),
      safeguards: D.POC.safeguards,
      fingerprint: { line: D.POC.fingerprint.line, steps: D.POC.fingerprint.steps, sources: D.POC.fingerprint.src },
      limits: D.POC.limits,
      code: D.POC.code,
      sources: D.POC.stepsSrc,
    },
    pullRequest: { number: D.PR.number, repo: D.PR.repo, url: D.PR.url, title: D.PR.title, merged: D.PR.merged, commit: D.PR.commit, lines: D.PR.lines, file: D.PR.file, sources: D.PR.src },
    offers: { currency: 'GBP', vat: 'excluding VAT', groups: C.offers },
    questions: aiQuestions,
    sources: D.SOURCES,
  };
  write('facts.json', JSON.stringify(facts, null, 1) + '\n');
}
checkApprovalPages();
console.log(`generate: ${pages.length} pages, llms.txt, index.md, facts.json`);
