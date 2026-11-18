// Build: copy src/ to _site/, stamp the version, write version.json.
// SITE_VERSION is set by CI only (v0.1.N); a local build says "dev".
import { existsSync, cpSync, rmSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const version = process.env.SITE_VERSION || 'dev';
rmSync('_site', { recursive: true, force: true });
cpSync('src', '_site', { recursive: true });
// Generated pages (conductor.mondweep-chakravorty@, 2026-11-18): the pages from data/ (generate.mjs),
// the five designs (designs.mjs) and /behind-the-scenes/ from team/ and git log (behind.mjs), each
// run at build time when present. Each writes into _site/.
for (const step of ['generate', 'designs', 'behind']) if (existsSync(`scripts/${step}.mjs`)) await import(`./${step}.mjs`);
const walk = d => readdirSync(d).flatMap(f => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
for (const f of walk('_site')) {
  if (!/\.(html|js|css|json|md|txt)$/.test(f)) continue;
  const s = readFileSync(f, 'utf8');
  if (s.includes('__VERSION__')) writeFileSync(f, s.replaceAll('__VERSION__', version));
}
writeFileSync('_site/version.json', JSON.stringify({ version, commit: process.env.GITHUB_SHA || 'local', built: new Date().toISOString() }, null, 2) + '\n');
writeFileSync('_site/.nojekyll', '');
console.log(`built _site/ (${version})`);
