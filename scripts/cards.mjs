// Copyright 2026 AgentiCCells. Licensed under the Apache License, Version 2.0
// (http://www.apache.org/licenses/LICENSE-2.0).
//
// Run locally, not in the build: renders the link-preview cards and the design thumbnails, which
// are then committed under src/assets/.
//   1. src/assets/cards/<name>.png: one 1200x630 card per page and per design (the words come from CARDS
//      in lib.mjs, the same list head() uses for og:image). The home and Ledger cards (CARDS[].photo, both
//      on PHOTO_DERIVED) carry the headshot at its own 200 px on the teal field, read from the one file
//      src/assets/photo/mondweep-chakravorty.png after checking its SHA-256; the proof of concept card
//      shows the run's time strip; the Broadsheet, Run log, Blueprint and Vault cards (CARDS[].shot) show
//      that design's own first screen, taken from the built page the same way as the pop-up previews, over
//      a band with the design's name and idea line (round 2 live review, findings 2 and 6; Broadsheet and
//      Vault show the headshot there, so their cards are on PHOTO_DERIVED); every other card the monogram MC.
//   2. src/assets/designs/<id>.png: a 960x600 preview of each design's first screen for the Designs
//      pop-up, taken from the built _site/ served by a tiny local http server (1366x854 scaled down).
//      Run the build first. Ledger, Broadsheet and Vault show the headshot; all three are on PHOTO_DERIVED.
// Usage: node scripts/build.mjs && node scripts/cards.mjs [--cards-only|--thumbs-only]
// Both parts need the built _site/ (the design cards are taken from it).
// Uses Playwright from the session (no npm dependency of the site). Written by
// developer.mondweep-chakravorty@AgentiCCells.dinis, round 1 (2026-11-18).
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { mkdirSync, statSync, existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, extname } from 'node:path';
import { CARDS, DESIGNS, SITE, D, esc, PHOTO_PATH, PHOTO_SHA256, PHOTO_DERIVED, runStrip } from './lib.mjs';

const { chromium } = createRequire(import.meta.url)('playwright');
const only = process.argv[2] || '';
const host = SITE.replace(/^https?:\/\//, '');

const photoBuf = readFileSync(join('src', PHOTO_PATH));
if (createHash('sha256').update(photoBuf).digest('hex') !== PHOTO_SHA256) throw new Error('the headshot file is not the one Dinis Cruz supplied');
const photoUri = `data:image/png;base64,${photoBuf.toString('base64')}`;
const stripCss = readFileSync('src/style.css', 'utf8').match(/\/\* ---------- the run, drawn[\s\S]*?(?=\.phases\{)/)[0];
const rootCss = readFileSync('src/style.css', 'utf8').match(/:root\{[\s\S]*?\n\}/)[0];
function cardHtml(c, shotUri) {
  if (c.photo && !PHOTO_DERIVED.includes(`/assets/cards/${c.name}.png`)) throw new Error(`card ${c.name} would show the headshot but is not on PHOTO_DERIVED`);
  if (c.shot) return shotCard(c, shotUri);
  if (c.photo) return photoCard(c);
  if (c.figure) return stripCard(c);
  const p = c.pal;
  const art = `<div class="mono">${esc(D.PERSON.monogram)}</div>`;
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

// A design card: the top of the design's own first screen at 1366 px (scaled to 1200), over a band in its
// palette with the design's name and its idea line from data/site.mjs.
const SHOT_H = 410;
function shotCard(c, shotUri) {
  if (!shotUri) throw new Error(`card ${c.name} needs the design's first screen`);
  const p = c.pal;
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}html,body{width:1200px;height:630px;overflow:hidden}
body{background:${p.bg};color:${p.ink};font-family:${p.font};position:relative}
.shot{position:absolute;left:0;top:0;width:1200px;height:${SHOT_H}px;display:block}
.bar{position:absolute;left:0;right:0;top:${SHOT_H}px;height:10px;background:${p.accent}}
.band{position:absolute;left:56px;right:56px;top:${SHOT_H + 30}px}
.k{font:700 20px/1.2 system-ui,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:${p.muted}}
.big{font-weight:700;font-size:44px;line-height:1.05;margin-top:8px}
.line{font-size:${c.line.length > 90 ? 23 : 26}px;line-height:1.3;margin-top:10px}
.foot{position:absolute;right:56px;top:${SHOT_H + 30}px;font:600 20px/1.2 system-ui,sans-serif;color:${p.muted}}
</style></head><body>
<img class="shot" src="${shotUri}" width="1200" height="${SHOT_H}" alt="">
<div class="bar"></div>
<div class="band"><p class="k">${esc(c.kicker)}</p><p class="big">${esc(c.big)}</p><p class="line">${esc(c.line)}</p></div>
<p class="foot">${esc(host)}${esc(c.path)}</p>
</body></html>`;
}

// The home and Ledger cards: the teal field of the first screen, the headshot at 200 px (never scaled up).
function photoCard(c) {
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0}html,body{width:1200px;height:630px;overflow:hidden}
body{background:#0F3D42;color:#F6F1E7;font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;position:relative}
.k{position:absolute;left:72px;top:84px;font:700 26px/1.3 system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#E8B04B}
.big{position:absolute;left:72px;top:138px;font:800 104px/.92 system-ui,sans-serif;letter-spacing:-.035em;width:720px}
.line{position:absolute;left:72px;top:356px;width:700px;font:34px/1.3 Charter,"Bitstream Charter",Cambria,Georgia,serif;color:#F6F1E7}
.ph{position:absolute;right:120px;top:120px;width:212px;height:212px}
.ph::after{content:"";position:absolute;left:18px;top:18px;width:212px;height:212px;background:#E8B04B}
.ph img{position:relative;z-index:1;display:block;width:200px;height:200px;border:6px solid #F6F1E7;box-sizing:content-box}
.cap{position:absolute;right:250px;top:330px;z-index:2;background:#F6F1E7;color:#1C1B19;font:700 22px/1 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;padding:10px 14px;transform:rotate(-2deg)}
.foot{position:absolute;left:72px;right:72px;bottom:44px;display:flex;justify-content:space-between;border-top:2px solid #4F948C;padding-top:20px;font:600 26px/1.2 system-ui,sans-serif;color:#BFD6D2}
</style></head><body>
<p class="k">${esc(c.kicker)}</p><p class="big">Mondweep<br>Chakravorty</p><p class="line">${esc(c.line)}</p>
<div class="ph"><img src="${photoUri}" width="200" height="200" alt=""></div><p class="cap">London</p>
<div class="foot"><span>${esc(host)}</span><span>${esc(c.path)}</span></div>
</body></html>`;
}
// The proof of concept card: the run's time strip, as drawn on the site.
function stripCard(c) {
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><style>${rootCss}
*{box-sizing:border-box;margin:0}html,body{width:1200px;height:630px;overflow:hidden}
body{background:#FAF8F4;color:#1C1B19;font-family:var(--sans);position:relative}
.bar{position:absolute;top:0;left:0;right:0;height:16px;background:#1D5C63}
.k{position:absolute;left:56px;top:48px;font:700 24px/1.3 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#4A4740}
.big{position:absolute;left:56px;top:84px;font:800 60px/1.05 system-ui,sans-serif;letter-spacing:-.02em}
.line{position:absolute;left:56px;top:160px;font:30px/1.3 system-ui,sans-serif}
.run-draw{position:absolute;left:20px;right:20px;top:216px}
${stripCss}
.strip-w{display:block!important}
.foot{position:absolute;left:56px;right:56px;bottom:24px;display:flex;justify-content:space-between;font:600 22px/1.2 system-ui,sans-serif;color:#4A4740}
</style></head><body><div class="bar"></div>
<p class="k">${esc(c.kicker)}</p><p class="big">${esc(c.big)}</p><p class="line">${esc(c.line)}</p>
<div class="run-draw">${runStrip('card')}</div>
<div class="foot"><span>${esc(host)}</span><span>${esc(c.path)}</span></div>
</body></html>`;
}

const browser = await chromium.launch();
if (!existsSync('_site/index.html')) throw new Error('build the site first: node scripts/build.mjs');
const T = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
const server = createServer(async (q, r) => {
  let p = join('_site', decodeURIComponent(q.url.split('?')[0]));
  try { if ((await stat(p)).isDirectory()) p = join(p, 'index.html'); r.writeHead(200, { 'content-type': T[extname(p)] || 'application/octet-stream' }); r.end(await readFile(p)); } catch { r.writeHead(404); r.end(); }
});
await new Promise(ok => server.listen(0, '127.0.0.1', ok));
const base = `http://127.0.0.1:${server.address().port}`;
// The same render as the pop-up previews: the built page at 1366 px wide, scaled down.
const shotPage = await browser.newPage({ viewport: { width: 1366, height: 854 }, deviceScaleFactor: 960 / 1366 });
const firstScreen = async href => { await shotPage.goto(base + href, { waitUntil: 'load' }); return shotPage; };
if (only !== '--thumbs-only') {
  mkdirSync('src/assets/cards', { recursive: true });
  const cardShot = await browser.newPage({ viewport: { width: 1366, height: Math.round(SHOT_H * 1366 / 1200) }, deviceScaleFactor: 1200 / 1366 });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const c of CARDS) {
    let uri = '';
    if (c.shot) {
      await cardShot.goto(base + c.path, { waitUntil: 'load' });
      uri = `data:image/png;base64,${(await cardShot.screenshot({ type: 'png' })).toString('base64')}`;
    }
    await page.setContent(cardHtml(c, uri), { waitUntil: 'load' });
    const f = `src/assets/cards/${c.name}.png`;
    await page.screenshot({ path: f, type: 'png' });
    console.log(`${f}  ${Math.round(statSync(f).size / 1024)} KB`);
  }
  await page.close();
  await cardShot.close();
}
if (only !== '--cards-only') {
  mkdirSync('src/assets/designs', { recursive: true });
  for (const d of DESIGNS) {
    const page = await firstScreen(d.id === 'ledger' ? '/' : d.href);
    const f = `src/assets/designs/${d.id}.png`;
    await page.screenshot({ path: f, type: 'png' });
    console.log(`${f}  ${Math.round(statSync(f).size / 1024)} KB`);
  }
}
await shotPage.close();
server.close();
await browser.close();
