// Post-build guard: every content page must have exactly one <h1>, and it must
// equal the page's <title>. Run manually after a build: npm run check:h1
//
// Guards against the regression in 32ac0b6, where ContentLayout.astro started
// rendering a neighborhood-list heading instead of the page title on blog,
// bairro and emergency pages. Not chained into "build", so a bad check can
// never block a deploy.

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const SECTIONS = ['blog', 'bairros', 'emergencias'];

const NAMED_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
};

function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (match, name) => NAMED_ENTITIES[name.toLowerCase()] ?? match);
}

const clean = (text) => decodeEntities(text.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

const problems = [];
let checked = 0;

for (const section of SECTIONS) {
  const sectionDir = join(DIST, section);
  if (!existsSync(sectionDir)) {
    problems.push(`/${section}/ missing from ${DIST}/ (did the build run?)`);
    continue;
  }
  for (const entry of readdirSync(sectionDir).sort()) {
    const pageDir = join(sectionDir, entry);
    // Skip the section's own index.html and anything that is not a page folder.
    if (!statSync(pageDir).isDirectory()) continue;
    const file = join(pageDir, 'index.html');
    if (!existsSync(file)) continue;

    checked++;
    const path = `/${section}/${entry}/`;
    const html = readFileSync(file, 'utf8');
    const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => clean(m[1]));
    const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? clean(titleMatch[1]) : '';

    if (h1s.length === 0) {
      problems.push(`${path}\n    zero H1s (title: "${title}")`);
    } else if (h1s.length > 1) {
      problems.push(`${path}\n    ${h1s.length} H1s: ${h1s.map((t) => `"${t}"`).join(' | ')}`);
    } else if (h1s[0] !== title) {
      problems.push(`${path}\n    H1:    "${h1s[0]}"\n    title: "${title}"`);
    }
  }
}

if (problems.length > 0) {
  console.error(`check:h1 FAILED: ${problems.length} problem(s) in ${checked} pages checked\n`);
  console.error(problems.join('\n'));
  process.exit(1);
}

console.log(`check:h1 OK: ${checked} pages, each with one H1 equal to its title`);
