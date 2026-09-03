# Serviços Urgentes - Site Structure
Last updated: 2026-09-03

## Tech Stack
- Astro v5.15.2
- Tailwind CSS (utility classes only)
- Supabase (schema built, not yet wired into combo-page filtering — local .js files remain source of truth)
- Deployed on Netlify via GitHub
- IndexNow key: y3tsh6k5pyqu51n1pzhpzpggbuhwvrcj
- Claude Code — in active use, primary tool for all file/git operations. Claude Chat used for strategy, content drafting, review.
- reference/ folder (repo root, 5 files, git-tracked, mirrored in Project Knowledge): content-rules.md, tone.md, vocabulary.md, beliefs.md, business-context.md. Standard CC prompt: "Read @reference/content-rules.md, @reference/tone.md, and @reference/vocabulary.md before writing [task]."

## Current Content Totals (confirmed via build, 2026-09-02)
- **224 pages total**
- 29 bairro pages (24 SJC + 5 Jacareí)
- 26 blog posts (23 SJC + 3 Jacareí)
- 6 emergencias pages (SJC only — hub + 5 scenarios)
- 2 city hub pages (SJC homepage `/`, Jacareí `/jacarei/`)
- 10 service hub pages (5 SJC static hubs + 5 Jacareí service×city aggregation pages)
- 145 programmatic combo pages (`/servicos/[service]/[neighborhood]/` — 120 SJC + 25 Jacareí)
- Other: `/sobre/`, `/cadastro/`, `/politica-de-privacidade/`, `/servicos/` (SJC index), `/bairros/` (hub)

## Cities Live
| City | Bairros | Hub page | Service aggregation pages | Blog posts | Emergencias |
|---|---|---|---|---|---|
| São José dos Campos | 24 | `/` (homepage) | 5 static hubs at `/servicos/[service]/` | 23 | 6 pages |
| Jacareí | 5 | `/jacarei/` | 5 at `/servicos/[service]/jacarei/` | 3 | none yet |

Jacareí bairros: Centro, Vila Branca, Jardim Califórnia, Jardim Santa Maria, Cidade Salvador.

## The `/[city]/` Pattern (established Aug 31, 2026)
Built as a reusable pattern for future Vale do Paraíba expansion, not a Jacareí-only page.
- `src/pages/[city]/index.astro` — `getStaticPaths()` generates one page per city present in `cityHomepageContext` (today: just `jacarei`). SJC's homepage stays separate, untouched.
- `src/pages/servicos/[service]/[city]/index.astro` (added Sep 1, 2026) — same pattern one level down: service×city aggregation pages, listing every provider for a service across all of a city's bairros. `getStaticPaths()` cross-product of 5 services × cities in `cityHomepageContext`.
- To add a third city: create bairro `.md` files + `neighborhoodContext` entries (as with Jacareí), add one `cityHomepageContext` entry in `src/data/cities.ts`, add provider rosters with the correct `city` field. Both `/[city]/` and `/servicos/[service]/[city]/` routes generate automatically from that — no route code changes needed.
- Nav: Header.astro and Footer.astro's Serviços links are city-aware (pathname-detected against `cityHomepageContext`) — automatically correct for any future city added this way, no nav code changes needed either.

## Data Layer

### `src/data/` — extracted shared modules (new this week)
Three data objects were extracted out of route files this week into standalone `.ts` modules, all for the same reason: **an Astro route file that exports `getStaticPaths()` cannot also export a second top-level `const`** — confirmed via isolated build test (esbuild parse failure), not assumption.
- `neighborhoods.ts` — `neighborhoodContext` (all 29 bairros' rich copy: description, characteristics, crisisScenario, landmarks, responseTime, etc.). Extracted from `[neighborhood].astro` Aug 31.
- `services.ts` — `serviceContext` (per-service copy, FAQ templates, safety-critical whatToDo/prevention lists, `localData` references to the provider `.js` files). Extracted from `[neighborhood].astro` Sep 1.
- `cities.ts` — `cityHomepageContext` (per-city hero copy, meta tags). Extracted from `[city]/index.astro` Sep 1.

`[neighborhood].astro` now imports all three; it no longer defines any of this data locally.

### Provider `.js` files (`src/data/`)
- `ar_condicionado.js`, `chaveiros.js`, `eletricistas.js`, `encanadores.js` — standardized schema, `city` field on every entry
- `maridos.js` — DISTINCT schema (unquoted keys, name/rating/services/badges) — never mix with the others
- Legacy `.csv`/`.json` files and `csv-to-json-converter.cjs` also present in this folder — believed to be artifacts from the original site-scaffolding tool (~Aug 2025), not part of the active build pipeline. Not yet confirmed dead or removed.

### Supabase
Schema exists (providers, services, neighborhoods, provider_services, provider_neighborhoods tables) but is not wired into any filtering logic. Local `.js` files remain the actual source of truth.

## Schema (JSON-LD)
- Sitewide Organization schema (`Layout.astro`) — `areaServed` is an explicit array of City objects (SJC + Jacareí), fixed Aug 31.
- BreadcrumbList — **sitewide format fix, Sep 1, 2026.** All BreadcrumbList blocks now use plain URL strings for `item` (Google's documented, preferred format), not nested WebPage objects. This was a real bug affecting 158 pages flagged by Ahrefs (`Schema.org validation error`) — traced to two sources: `[neighborhood].astro` using the wrong nested-object form on all 145 combo pages, and a second, more broken issue — `Layout.astro` carried a hardcoded, page-unaware sitewide BreadcrumbList block that rendered identical wrong content on every page and duplicated the correct page-specific blocks where those existed. That block was removed entirely; 9 pages that had relied on it as their only breadcrumb source (homepage excluded — intentionally has none) got correct, page-specific replacements.
- FAQPage schema — blog + emergencias pages (min 4, max 6 FAQs)
- Service + CollectionPage schema — service hub and aggregation pages, city-parameterized where applicable (not hardcoded per city)
- Place schema — bairro pages
- ⚠️ Known accuracy gap, not yet fixed: `ContentLayout.astro`'s `Place.geo` (GeoCoordinates) reads `lat`/`lng` from frontmatter, but no bairro `.md` file (SJC or Jacareí) actually sets these — every bairro page reports the same single hardcoded SJC coordinate. Found during the Sep 1 BreadcrumbList investigation; not the cause of that bug, logged separately.

## Known Backlog Items (not yet actioned)
- **`PriceDisclaimer.astro`** — a complete, working shared component for the price-disclaimer block exists (`src/components/`) but is imported nowhere; every price disclaimer on the site (including all 3 new Jacareí blog posts) is hand-typed inline instead. Worth adopting as the standard going forward — would fix drift risk across posts, found Sep 2.
- **Bairro `neighborhood` value normalization** — some Jacareí provider records in `eletricistas.js` (and likely other service files) have `neighborhood` values (e.g. "Jardim Maria Amélia," "Jardim Primavera") that don't match any of the 5 official Jacareí bairro slugs the site has combo pages for. Found Sep 1 during the aggregation-page build; `BusinessListing.astro` handles it gracefully today, but worth a data-accuracy pass eventually.
- **`sobre.astro`'s `canonicalURL`** — missing its trailing slash (`.../sobre` not `.../sobre/`), violating the site's own trailing-slash convention. Found Sep 1 during the BreadcrumbList diff review, not fixed (out of scope at the time).
- **`/servicos/[service]/jacarei-centro/` → `/servicos/[service]/jacarei/`** — this migration is DONE (Sep 1) for the `/jacarei/` hub's service grid links. If any other page/content still links to the old jacarei-centro workaround pattern for "all services," it wasn't part of that sweep.

## Redirects (`public/_redirects`)
- `/blog/retrofit-vila-adyana/` → `/bairros/vila-adyana/` (301)
- `/blog/ar-condicionado-emergencia-sjc/` → `/blog/ar-condicionado-nao-gela-sjc/` (301)
- `/blog/vazamento-no-teto-sjc/` → `/emergencias/vazamento-no-teto-sjc/` (301)
- `/blog/cano-estourado-sjc/` → `/emergencias/cano-estourado-sjc/` (301)

## Notes / Standing Conventions
- H1 source: `ContentLayout.astro` renders H1 from frontmatter `title`. Never add a duplicate `# Heading` in markdown body.
- Service hub pages use `<h1 class="sr-only">` above `BusinessListing`.
- `maridos.js` uses a distinct schema — never mix with other provider files.
- Trailing slashes required on all internal links and canonicalURLs (see backlog item above for one known violation).
- `dateModified` updated on every meaningful markdown content edit.
- Price disclaimer required after first pricing mention on any page (see `PriceDisclaimer.astro` backlog item — currently hand-typed, not componentized).
- Bairro pages use `#top` as the anchor id; blog/emergencias pages use `#inicio`. Do not mix the two.
- `[neighborhood].astro` has three sources of truth for any bairro: `neighborhoodContext` (now in `neighborhoods.ts`), `getStaticPaths()`'s array, and the matching `/bairros/[slug].md` file. All three must be updated together.
- Landmark/geography claims from third-party sources need independent corroboration before shipping (content-rules.md Section 8). This rule caught real errors: 9 false neighborhood-proximity claims across 5 files were found and fixed Aug 28, 2026 via haversine distance verification against real coordinates — the original claims had never been checked this way.
- Provider identity attributes (women-owned, LGBTQ+-friendly) require direct provider confirmation, not a GBP badge alone; `is_24h` is fine from Maps data (content-rules.md Section 9).
- `places_search` (Claude Chat tool) is the preferred method for provider research and coordinate verification — more reliable than general web search or Gemini-only research.
- GEO/AEO audit history and query-by-query tracking live in Claude's memory, not this document — check memory for current Q1-Q5 standing.

## Pending / On the Horizon
- `/servicos/[service]/[city]/` pattern is live for Jacareí only — third city, when added, gets this automatically per "The `/[city]/` Pattern" section above.
- Jacareí content depth: pricing research (no verified data yet — all Jacareí content honestly omits pricing), additional blog posts beyond the 3 shipped, eventual `/emergencias/`-style hub for Jacareí (deliberately deferred until blog-post pattern proves out further — bigger, higher-stakes build).
- Backlog items listed above (PriceDisclaimer adoption, neighborhood-value normalization, sobre.astro trailing slash).
- Backlink outreach — status as of last touch: Unione Condomínios and Riccio Imóveis contacted; several other prospects researched and deprioritized. Check memory for latest.
- CNPJ registration — pending, unlocks further GBP category changes.
- Domain Rating remains the primary ranking gap per project brief — backlink acquisition is the lever for this, not more pages.
