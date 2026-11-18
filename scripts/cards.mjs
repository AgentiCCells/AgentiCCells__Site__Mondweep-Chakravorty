// Copyright 2026 AgentiCCells. Licensed under the Apache License, Version 2.0
// (http://www.apache.org/licenses/LICENSE-2.0).
//
// Run locally, not in the build: renders the link-preview cards and the design thumbnails, which
// are then committed under src/assets/.
//   1. src/assets/cards/<name>.png: one typographic 1200x630 card per page and per design (the words
//      come from CARDS in lib.mjs, the same list head() uses for og:image). No photo: the monogram
//      MC, or for the proof of concept a small drawing of its four phases (review conditions 33 to 35).
//   2. src/assets/designs/<id>.png: a 640x400 picture of each design's home, taken from the built
//      _site/ served by a tiny local http server (1280x800 at half scale). Run the build first.
// Usage: node scripts/build.mjs && node scripts/cards.mjs [--cards-only|--thumbs-only]
// Uses Playwright from the session (no npm dependency of the site). Written by
// developer.mondweep-chakravorty@AgentiCCells.dinis, round 1 (2026-11-18).
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { mkdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { CARDS, DESIGNS, SITE, D, esc } from './lib.mjs';

const { chromium } = createRequire(import.meta.url)('playwright');
const only = process.argv[2] || '';
const host = SITE.replace(/^https?:\/\//, '');

function cardHtml(c) {
  const p = c.pal;
  const art = c.figure
    ? `<svg width="300" height="300" viewBox="0 0 300 300" aria-hidden="true">${D.POC.phases.map((ph, i) => `<g transform="translate(${(i % 2) * 156},${Math.floor(i / 2) * 156})"><rect x="2" y="2" width="140" height="140" rx="14" fill="none" stroke="${p.accent}" stroke-width="4"/><text x="72" y="62" text-anchor="middle" font-size="40" font-weight="700" fill="${p.accent}">${i + 1}</text><text x="72" y="104" text-anchor="middle" font-size="22" fill="${p.ink}">${ph.steps.length} steps</text></g>`).join('')}</svg>`
    : `<div class="mono">${esc(D.PERSON.monogram)}</div>`;
  const bigSize = c.big.length > 26 ? 70 : 84;
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}html,body{width:1200px;height:630px;overflow:hidden}
body{background:${p.bg};color:${p.ink};font-family:${p.font};position:relative}
.bar{position:absolute;top:0;left:0;right:0;height:16px;background:${p.accent}}
.main{position:absolute;left:72px;top:84px;width:${c.figure ? 720 : 780}px}
.k{font:700 26px/1.3 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:${p.muted}}
.big{font-weight:700;font-size:${bigSize}px;line-height:1.04;letter-spacing:-.02em;margin-top:22px}
.line{font-size:34px;line-height:1.3;margin-top:26px;color:${p.ink}}
.art{position:absolute;right:72px;top:110px}
.mono{width:260px;height:260px;border-radius:50%;background:${p.accent};color:${p.onAccent};display:grid;place-items:center;font:700 104px/1 system-ui,sans-serif;letter-spacing:-.04em}
.foot{position:absolute;left:72px;right:72px;bottom:44px;display:flex;justify-content:space-between;border-top:2px solid ${p.muted};padding-top:20px;font:600 26px/1.2 system-ui,sans-serif;color:${p.muted}}
</style></head><body><div class="bar"></div>
<div class="main"><p class="k">${esc(c.kicker)}</p><p class="big">${esc(c.big)}</p><p class="line">${esc(c.line)}</p></div>
<div class="art">${art}</div>
<div class="foot"><span>${esc(host)}</span><span>${esc(c.path)}</span></div>
</body></html>`;
}

const browser = await chromium.launch();
if (only !== '--thumbs-only') {
  mkdirSync('src/assets/cards', { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const c of CARDS) {
    await page.setContent(cardHtml(c));
    const f = `src/assets/cards/${c.name}.png`;
    await page.screenshot({ path: f, type: 'png' });
    console.log(`${f}  ${Math.round(statSync(f).size / 1024)} KB`);
  }
  await page.close();
}
if (only !== '--cards-only') {
  if (!existsSync('_site/index.html')) throw new Error('build the site first: node scripts/build.mjs');
  const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
  const server = createServer(async (q, r) => {
    let p = join('_site', decodeURIComponent(q.url.split('?')[0]));
    try { if ((await stat(p)).isDirectory()) p = join(p, 'index.html'); r.writeHead(200, { 'content-type': T[extname(p)] || 'application/octet-stream' }); r.end(await readFile(p)); } catch { r.writeHead(404); r.end(); }
  });
  await new Promise(ok => server.listen(0, '127.0.0.1', ok));
  const base = `http://127.0.0.1:${server.address().port}`;
  mkdirSync('src/assets/designs', { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 0.5 });
  for (const d of DESIGNS) {
    await page.goto(base + (d.id === 'ledger' ? '/' : d.href), { waitUntil: 'load' });
    const f = `src/assets/designs/${d.id}.png`;
    await page.screenshot({ path: f, type: 'png' });
    console.log(`${f}  ${Math.round(statSync(f).size / 1024)} KB`);
  }
  await page.close();
  server.close();
}
await browser.close();
