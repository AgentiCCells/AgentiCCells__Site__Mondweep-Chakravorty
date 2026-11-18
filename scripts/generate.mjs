// Copyright 2026 AgentiCCells. Licensed under the Apache License, Version 2.0
// (http://www.apache.org/licenses/LICENSE-2.0). The text it writes is CC BY 4.0.
//
// Build step: writes the main site (the Ledger design) into _site/ from data/site.mjs:
// /, /built/, /proof-of-concept/, /experience/, /agentics-london/, /collaboration/, /sources/, /ai/,
// and /llms.txt, /index.md, /facts.json. scripts/build.mjs imports this after copying src/ to _site/.
// Written by developer.mondweep-chakravorty@AgentiCCells.dinis, round 1 (2026-11-18).
import { D, SITE, esc, write, fmtDate, page, Cite, citedOn, statements, homeModel, offersCompact, figure, mailto, checkApproval, NAV } from './lib.mjs';

checkApproval();
const P = path => D.PAGES[path] || (() => { throw new Error(`data/site.mjs PAGES has no entry for ${path}`); })();
const paras = (c, list) => list.map(o => `<p>${c.t(o)}</p>`).join('\n');
const sourceIdByUrl = url => Object.keys(D.SOURCES).find(k => D.SOURCES[k].url === url);
// Review condition 15: the talk was Dinis Cruz's and appears once, in its own section on /collaboration/.
const isTalk = o => (o.src || []).includes('talk');

// ---------- home ----------
export function homeBody(c, { ledgerHero = true } = {}) {
  const M = homeModel();
  return `<section class="hero" aria-labelledby="h1">
<div>
<p class="eyebrow">${esc(M.eyebrow.text)}${c.m(M.eyebrow.src)}</p>
<h1 id="h1">${esc(D.PERSON.name)}</h1>
<p class="lede">${c.t(M.lede)}</p>
<p class="cta"><a class="btn primary" href="/proof-of-concept/">See the proof of concept</a> <a class="btn secondary" href="/collaboration/">Work with him</a></p>
</div>
${ledgerHero ? `<div class="mono" role="img" aria-label="Monogram MC">${esc(D.PERSON.monogram)}</div>` : ''}
</section>
<ul class="facts">
${M.highlights.map(h => `<li><a class="fact-h" href="${h.href}">${esc(h.title)}</a><span>${esc(h.text)}${c.m(h.src)}</span></li>`).join('\n')}
</ul>
<section aria-labelledby="who"><h2 id="who">Who he is</h2>
${paras(c, M.who)}
</section>
<section aria-labelledby="poc"><h2 id="poc">The proof of concept</h2>
${paras(c, M.poc.paras)}
${figure(c, { id: 'run' })}
<p>${c.t(M.poc.limit)}</p>
<p><a class="more" href="/proof-of-concept/">The proof of concept in full, with its limits</a></p>
</section>
<section aria-labelledby="pr"><h2 id="pr">Merged into Ruflo</h2>
${paras(c, M.pr.paras)}
<p><a class="more" href="/built/">What he has built</a></p>
</section>
<section aria-labelledby="ldn"><h2 id="ldn">Agentics Foundation, London</h2>
${paras(c, M.london.paras)}
<p><a class="more" href="/agentics-london/">The London chapter</a></p>
</section>
<section aria-labelledby="col"><h2 id="col">With Dinis Cruz</h2>
${paras(c, M.collab.paras)}
<h3>The four offers, as published</h3>
${offersCompact(c, M.collab.offers)}
${paras(c, M.collab.notes)}
<p><a class="more" href="/collaboration/">The collaboration in full</a></p>
</section>
<section aria-labelledby="contact"><h2 id="contact">Contact</h2>
<p>${c.t(M.contact)}</p>
<p class="cta"><a class="btn primary" href="${esc(mailto())}">${esc(M.contact.label)}</a> <a class="btn secondary" href="${esc(D.PERSON.providerPage)}">His provider page on ruv.sgit.ai</a></p>
</section>`;
}

const pages = [];
function emit(path, body, extra = {}) {
  const { title, description } = { ...P(path), ...extra };
  write(`${path.replace(/^\//, '')}index.html`, page({ path, title, description, body }));
  pages.push({ path, title, description });
}

{
  const c = new Cite('/', { record: true });
  emit('/', `${homeBody(c)}\n${c.list()}`);
}

// ---------- what he has built ----------
{
  const c = new Cite('/built/', { record: true });
  const V = D.POC.video;
  emit('/built/', `<h1>What he has built</h1>
<p class="lede">The SGit × Ruflo proof of concept, the code behind it, and a pull request merged into Ruflo.</p>
<section aria-labelledby="b-poc"><h2 id="b-poc">${esc(D.POC.title)}</h2>
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
${c.list()}`);
}

// ---------- the proof of concept ----------
{
  const c = new Cite('/proof-of-concept/', { record: true });
  const PC = D.POC;
  emit('/proof-of-concept/', `<h1>${esc(PC.title)}</h1>
${paras(c, PC.summary.slice(0, 3))}
<section aria-labelledby="p-run"><h2 id="p-run">The run, step by step</h2>
${figure(c, { id: 'run', limits: true })}
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
<p>${c.t({ text: `${PC.summary[3].text}`, src: PC.summary[3].src })} <a href="${esc(PC.video.url)}">${esc(PC.video.title)}</a>. ${esc(PC.video.note)} This site draws its own figure from the article and shows no frames from the video.</p>
<p>The code: <a href="${esc(PC.code.url)}">${esc(PC.code.name)}</a>, under the ${esc(PC.code.licence)} licence. ${c.t(PC.code)}</p>
<blockquote><p>"${esc(PC.quote.text)}"</p><p class="by">${esc(PC.quote.by)}${c.m(PC.quote.src)}</p></blockquote>
</section>
${c.list()}`);
}

// ---------- experience (review condition 17: only F03, F05 and F06) ----------
{
  const c = new Cite('/experience/', { record: true });
  const E = D.EXPERIENCE;
  emit('/experience/', `<h1>Experience</h1>
${paras(c, E.intro)}
<p>${c.t(E.dxsure)}</p>
<h2>Sectors</h2>
<ul class="chips">${E.sectors.map(s => `<li>${esc(s[0].toUpperCase() + s.slice(1))}</li>`).join('')}</ul>
<p>Based in ${esc(D.PERSON.place)}${c.m(D.PERSON.placeSrc)}.</p>
<p class="note">This page keeps to what his public provider page says. A longer biography on ruv.sgit.ai is a draft for him to approve, and is not used here.${c.m(['providers-data'])}</p>
${c.list()}`);
}

// ---------- Agentics London ----------
{
  const c = new Cite('/agentics-london/', { record: true });
  const L = D.LONDON;
  emit('/agentics-london/', `<h1>Agentics Foundation, London</h1>
${paras(c, L.text)}
<dl class="kv">
${L.facts.map(f => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}${c.m(f.src)}</dd></div>`).join('\n')}
</dl>
<p><a class="more" href="${esc(L.url)}">The chapter's own site, london.agentics.org</a></p>
${c.list()}`);
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
  emit('/collaboration/', `<h1>With Dinis Cruz</h1>
${paras(c, C.intro)}
<p>${c.t(C.founding)}</p>
${paras(c, C.roles)}
<section aria-labelledby="c-offers"><h2 id="c-offers">The four offers, as published</h2>
${paras(c, C.offersNote)}
${C.offers.map(offerTable).join('\n')}
<p>${c.t(C.engagement)}</p>
</section>
<section aria-labelledby="c-types"><h2 id="c-types">Five kinds of project</h2>
<p>${c.t(C.projectsNote)}</p>
<ul>${C.projects.map(p => `<li>${esc(p)}${c.m(C.projectsSrc)}</li>`).join('')}</ul>
</section>
<section aria-labelledby="c-contact"><h2 id="c-contact">How to enquire</h2>
<p>${c.t(D.PERSON.contact)}</p>
<p class="cta"><a class="btn primary" href="${esc(mailto())}">${esc(D.PERSON.contact.label)}</a> <a class="btn secondary" href="${esc(D.PERSON.providerPage)}">His provider page on ruv.sgit.ai</a></p>
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
${c.list()}`);
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

Every fact on this site comes from a public source read on ${D.SITE.read}; the source is marked against each fact on the pages and listed at ${SITE}/sources/. No image of him is used. Text CC BY 4.0.

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

## Experience

${ps(D.EXPERIENCE.intro)}

${t(D.EXPERIENCE.dxsure)}

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
console.log(`generate: ${pages.length} pages, llms.txt, index.md, facts.json`);
