# Serviços Urgentes - Site Structure
Last updated: 2026-11-24 (facts rebuilt from the live repo with the commands shown inline; the Sep 22 copy predated Guaratinguetá and Aparecida)

## Tech Stack
- Astro v5.15.2
- Tailwind CSS (utility classes only)
- Supabase (5 tables, schema built, confirmed empty, NOT wired into any page's rendering/filter logic) — local `.js` files remain source of truth for all combo/service pages
- Deployed on Netlify via GitHub (handle HerrBabl)
- IndexNow key: y3tsh6k5pyqu51n1pzhpzpggbuhwvrcj
- Claude Code — in active use, primary tool for all file/git operations. Claude Chat used for strategy, content drafting, review.
- Monitoring: IndexNow, Ahrefs Webmaster Tools, GSC, GA4 (Gemini-powered Ask Advisor), Microsoft Clarity
- Research/verification: `places_search` tool + Ian's Google Maps screenshots; haversine distance calculations for proximity-accuracy audits
- Outreach email: cadastroservicosurgentes@gmail.com (individual framing, no CNPJ)
- reference/ folder (repo root, git-tracked, mirrored in Project Knowledge): content-rules.md, tone.md, vocabulary.md, beliefs.md, business-context.md, social-content-engine.md, SITE-STRUCTURE.md (`ls reference`). business-context.md now correctly says Supabase is not wired into page rendering/filtering (checked Nov 24). Standard CC prompt: "Read @reference/content-rules.md, @reference/tone.md, and @reference/vocabulary.md before writing [task]."

## Current Content Totals (verified Nov 24, 2026 from a clean build — re-run the commands before trusting; see content-rules.md Section 7)
- **368 pages total**, 6 cities live. `rm -rf dist && npm run build` reports "368 page(s) built"; `find dist -name '*.html' | wc -l` = 368.
- 49 bairro pages across all cities: `ls src/pages/bairros/*.md | wc -l` = 49 (SJC 24, Jacareí 5, Taubaté 5, Pindamonhangaba 5, Guaratinguetá 5, Aparecida 5; per-city prefix count with `ls src/pages/bairros | grep -c "^<city>-"`, SJC = files with no city prefix). Plus the `/bairros/` hub: `find dist/bairros -name index.html | wc -l` = 50.
- Blog posts: `ls src/pages/blog/*.md | wc -l` (the built blog section also has an index page: `find dist/blog -name index.html | wc -l`).
- 5 emergencias scenario pages, all SJC: `ls src/pages/emergencias/*.md | wc -l` = 5 (6 built pages with the hub: `find dist/emergencias -name index.html | wc -l`).
- 6 city entry pages: SJC homepage `/` plus `/jacarei/`, `/taubate/`, `/pindamonhangaba/`, `/guaratingueta/`, `/aparecida/` (`find dist/<slug> -name index.html` = 1 each).
- 25 service×city aggregation pages (5 services × 5 non-SJC cities via `/servicos/[service]/[city]/`): `ls dist/servicos/<service>` shows the 5 city folders for each service.
- 245 service×bairro combo pages (5 services × 49 bairros): `find dist/servicos/<service> -mindepth 2 -name index.html | wc -l` = 54 per service, which is 49 bairros + 5 city aggregation pages.
- `/servicos/` total: `find dist/servicos -name index.html | wc -l` = 276 = 1 index + 5 SJC hubs + 25 city aggregations + 245 combos.
- 324 provider records across the 5 `.js` files, all 6 cities (per-file and per-city counts under Data Layer).
- Other: `/sobre/`, `/cadastro/`, `/politica-de-privacidade/`, `/servicos/` (SJC index), `/bairros/` (hub). Reconciliation: 1 + 5 + 276 + 50 + 27 + 6 + 3 = 368 (home, city pages, servicos, bairros, blog, emergencias, sobre/cadastro/privacidade).

## Cities Live
| City | Bairros | Hub page | Status |
|---|---|---|---|
| São José dos Campos | 24 | `/` (homepage) | Full build, reference template for pricing/blog depth |
| Jacareí | 5 | `/jacarei/` | Live, city #2 |
| Taubaté | 5 | `/taubate/` | Live, city #3 — "clean Minimum Viable City" reference template (no known gaps as of Sep 11) |
| Pindamonhangaba ("Pinda") | 5 | `/pindamonhangaba/` | Live, city #4 |
| Guaratinguetá ("Guará") | 5 (Centro, Pedregulho, Parque do Sol, Nova Guará, Jardim do Vale) | `/guaratingueta/` | Live, city #5 (launched Sep 21, commits `8ee9e2a`/`9cb3628`/`2b4547d`) |
| Aparecida | 5 (Centro, Ponte Alta, São Roque, Santa Rita, Jardim Paraíba) | `/aparecida/` | Live, city #6 (launched 29/09/2026 per social-content-engine.md; `cityHomepageContext` key `aparecida` present in `src/data/cities.ts`) |

City keys: `grep -n "^  '[a-z]*': {" src/data/cities.ts` returns jacarei, taubate, pindamonhangaba, guaratingueta, aparecida (SJC has no key; it is the hardcoded default).

**Aparecida** (Basílica/Santuário Nacional) was deliberately NOT merged into Guará despite proximity; it is its own full city build (own `cityHomepageContext`, bairro pages, `getStaticPaths` registration) since the site architecture assumes one city = one slug = one bairro set.

## The `/[city]/` and `/servicos/[service]/[city]/` Patterns
Established Aug 31–Sep 1, 2026, proven across 5 subsequent city launches (Jacareí → Taubaté → Pinda → Guará → Aparecida).
- `src/pages/[city]/index.astro` — `getStaticPaths()` generates one page per city in `cityHomepageContext` via `Object.keys(...)` (fixed from a hardcoded single-entry array during the Taubaté launch, Sep 10). SJC's homepage stays separate — no key in `cityHomepageContext`, always hardcoded as the first nav entry.
- `src/pages/servicos/[service]/[city]/index.astro` — same pattern one level down, `getStaticPaths()` cross-products 5 services × cities in `cityHomepageContext`.
- **To add a new city:** create bairro `.md` files + `neighborhoodContext` entries, add one `cityHomepageContext` entry in `src/data/cities.ts`, add provider rosters with the correct `city` field. Both city-level routes generate automatically — no route code changes needed if the pattern is followed correctly.
- Nav: `Header.astro` and `Footer.astro`'s dropdowns are city-aware via `Object.entries(cityHomepageContext)`, fixed Sep 11 (previously hardcoded SJC+Jacareí only, silently missing Taubaté at launch).

## Data Layer

### `src/data/*.ts` — extracted shared modules
Astro's esbuild cannot export a second top-level `const` alongside `getStaticPaths()` in a route file (confirmed via isolated build test) — this is why context data lives in standalone modules, not inline in route files:
- `neighborhoods.ts` — `neighborhoodContext` (all bairros' rich copy: description, characteristics, crisisScenario, landmarks, responseTime, `imageUrl` — renamed from `unsplashId` during Guará launch since it now also holds Pexels URLs for cities where Unsplash coverage was too thin)
- `services.ts` — `serviceContext` (per-service copy, FAQ templates, safety-critical whatToDo/prevention lists, `localData` references to provider `.js` files)
- `cities.ts` — `cityHomepageContext` (per-city hero copy, meta tags; SJC has no key here — it's the hardcoded default)

### Provider `.js` files (`src/data/`)
- `ar_condicionado.js`, `chaveiros.js`, `eletricistas.js`, `encanadores.js` — standardized schema (business_name, phone_number as digits-only, star_rating, total_reviews, address, neighborhood, city, website, `service_type` with exact per-file capitalization — verify exact casing per file, e.g. `ar_condicionado.js` uses lowercase `"Ar condicionado"` not `"Ar Condicionado"`, confirmed Sep 22 — is_24h boolean, last_updated, status, "Identifies as women-owned" boolean, "LGBTQ+ friendly" boolean, `whatsapp` as a full `https://wa.me/...` URL string derived from phone, optional "note" field)
- `maridos.js` — DISTINCT schema: unquoted keys, id/name/rating/reviews/neighborhood/city/address/service_type/phone (formatted, not digits-only)/whatsapp (**boolean here, not a URL**)/services array/description/badges array. Never mix with the other 4 files.
- Record counts drift with every city launch and review refresh — verify before trusting any number here. Counted Nov 24, 2026 by matching the city field in each file (`grep -c '"city":' src/data/<file>.js` for the four standardized files; `grep -c 'city:' src/data/maridos.js` for maridos), then split by city value:

| File | Total | SJC | Jacareí | Taubaté | Pindamonhangaba | Guaratinguetá | Aparecida |
|---|---|---|---|---|---|---|---|
| `encanadores.js` | 39 | 21 | 3 | 9 | 3 | 1 | 2 |
| `eletricistas.js` | 95 | 40 | 10 | 17 | 14 | 10 | 4 |
| `chaveiros.js` | 88 | 42 | 11 | 11 | 13 | 9 | 2 |
| `ar_condicionado.js` | 80 | 33 | 9 | 8 | 22 | 7 | 1 |
| `maridos.js` | 22 | 8 | 2 | 3 | 7 | 1 | 1 |

Total 324 records; SJC column sums to 144 (21 + 40 + 42 + 33 + 8). The counts are objects per file (each file imported and grouped by its `city` field); no file has a duplicate name+city, every `status` is "Active" in the four standardized files, and the `grep -c` counts above match the imported counts. 15 providers appear in more than one file (listed under several services), so unique name+city pairs across files are 309. History with the same grep method: 330 on 2026-09-22, 340 on 2026-09-30 (Aparecida launch), 342 on 2026-11-18, 324 now (the 18 SJC removals of 2026-11-19). The older "283" figure in this file did not match this method on its own date and should not be used. Each file exports one array named like the file (`encanadores`, `eletricistas`, `chaveiros`, `ar_condicionado`, `maridos`). SJC review counts and ratings were refreshed from Google Maps on 2026-11-19 (header comment line 1 of each SJC-bearing file). Hub pages (`/servicos/<service>/`) filter to SJC only; other cities are served by their aggregation pages.
- Legacy `.csv`/`.json` files + `csv-to-json-converter.cjs` still present in `src/data/` (`ls src/data`). They are not imported by any page and hold old data; do not regenerate the `.js` files from them.
- Other modules: `src/lib/attribution.ts` (first-touch UTM/referrer/landing capture), `src/lib/providerKey.ts` (provider slug of name+city, used as `provider_key` in click logs), `src/lib/supabase.ts`; components `BusinessListing`, `CityServiceLinks`, `Header`, `Footer`, `PriceDisclaimer` (`ls src/components src/lib`).

### Cross-City Provider Policy (adopted Sep 17, 2026)
Solves thin-category gaps (e.g. Guará's Encanador/Marido de Aluguel) by cross-listing verified providers from a neighboring city:
- Applies only when a category has fewer than 2 genuine local candidates after an exhausted multi-angle search
- Requires genuine willingness-to-travel evidence (explicit service-area statement, a review from a customer in the target city, or explicit regional-coverage language) — proximity alone is not sufficient
- Scope-limited to only the gapped category — never applied to categories already well-supplied locally
- Requires explicit on-page labeling that the provider is based in the neighboring city (e.g. "Baseado em Aparecida, atende também Guaratinguetá") — never presented as locally based
- Standard verification bar (4+ stars, meaningful reviews, on-site-services-confirmed) still applies in full
- Intended as a durable rule for future thin-category situations (e.g. Cachoeira Paulista, Cruzeiro), not a one-off patch

### Supabase
5 tables (providers, services, neighborhoods, provider_services, provider_neighborhoods) exist but are confirmed empty and not wired into any filter path. The one live use is click logging: `BusinessListing.astro` posts to the `clicks` table via `${PUBLIC_SUPABASE_URL}/rest/v1/clicks` (`grep -n "rest/v1/clicks" src/components/BusinessListing.astro`), leaving `provider_id` NULL and writing `provider_key` plus UTM/referrer/landing columns instead. Full migration scope documented (Sep 11 discovery pass) but not started — genuine multi-week undertaking, needs its own dedicated planning session. Key blockers: no `city` column anywhere in the Supabase schema (every current filter depends on `city`); `providers` table has only 6 columns vs. the local schema's 15; `maridos.js`'s extra structure has no relational home; build-time-vs-runtime (SSG vs SSR) decision leans toward staying SSG (query Supabase at build time) but not finalized.

## WhatsApp Provider Attribution (shipped Sep 22, 2026)
`BusinessListing.astro` (single component, all provider cards across the site) now appends a pre-filled, `encodeURIComponent`-encoded message to every WhatsApp link, keyed by `business.service_type`. Purpose: give providers visible proof that a lead came from Serviços Urgentes, supporting the provider-badge outreach re-approach. Handles both data shapes (string URL in the 4 standardized files; boolean + constructed URL in `maridos.js`). Verified on-device (iPhone) for both shapes — message renders correctly in the WhatsApp compose box, accented characters (á, ç, ã, é) decode correctly, not as escaped garbage.

## Schema (JSON-LD)
- Sitewide Organization schema (`Layout.astro`) — `areaServed` is a hardcoded array of City objects, manually updated per city launch (deliberately kept hardcoded rather than dynamic — single literal block, no duplication to eliminate). Confirmed current as of Nov 24, 2026 by parsing `dist/index.html`: all 6 live cities present (SJC, Jacareí, Taubaté, Pindamonhangaba, Guaratinguetá, Aparecida). Top-level keys: @context, @type, name, description, url, logo, sameAs (Instagram, Facebook, LinkedIn), areaServed. No contactPoint or address on the Organization itself.
- BreadcrumbList — sitewide format standardized Sep 1, 2026: plain URL strings for `item` (Google's documented format), not nested WebPage objects. Fixed a real bug affecting 158 pages.
- FAQPage schema — blog + emergencias pages (min 4, max 6 FAQs)
- Service + CollectionPage schema — service hub and aggregation pages, city-parameterized
- Place schema — bairro pages
- ✅ Fixed Sep 15, 2026 (commit `f7af18a`): `ContentLayout.astro`'s `Place.geo` now looks up the real bairro's coordinates from `neighborhoodContext` by URL slug, falling back to frontmatter/SJC only for the (currently unreachable) non-bairro-page case.
- ⚠️ Known accuracy gap, not fixed: `ContentLayout.astro`'s Service schema block has a separate hardcoded-SJC `areaServed` bug (distinct from the Layout.astro Organization schema fix).

## Known Backlog Items (not yet actioned)
- **`PriceDisclaimer.astro`** — complete working component exists, imported nowhere; every price disclaimer sitewide is still hand-typed inline. Worth adopting to fix drift risk.
- **Bairro `neighborhood` value normalization** — many provider records across cities have `neighborhood` values that don't match any launched bairro slug. Non-issue in practice: bairro pages show all city-wide providers, not bairro-headquartered-only ("atendem [bairro] e toda a região de [cidade]"), so this doesn't affect page correctness — confirmed working as designed across Jacareí, Taubaté, and Guará.
- ✅ **`sobre.astro`'s `canonicalURL`** — now has the trailing slash (`grep -n "canonicalURL =" src/pages/sobre.astro` → `https://servicosurgentes.com/sobre/`). Resolved.
- **Emoji-heading anchor bug** — `ContentLayout.astro` client-side script fix was verified locally (hexdump-confirmed pure ASCII regex) as of Jul 24; commit status at that time was pending — confirm whether this shipped.
- ✅ **"Voltar ao topo" (#inicio)** — confirmed Sep 29, 2026: all 5 emergencias pages have the `<a id="inicio">` anchor. No gap.
- **H2 generic label fix** — last remaining open item from the original April 2026 AEO/GEO audit.
- **Marido-de-aluguel `description:` frontmatter field** — missing "marido de aluguel" keyword on 31 of 49 bairro pages (counted Nov 24: 49 bairro `.md` files have a `description:` line, 31 of them lack the phrase). Meta/social-preview only, low severity.
- **Hand-authored inline `AdministrativeArea` blocks** — `grep -rl "AdministrativeArea" src/pages --include=*.md | wc -l` = 36 files as of Nov 24 (the Sep figure was 16 files; the count was not re-scoped by folder). Removal deferred pending evaluation of actual GEO impact; the earlier "5 bairros would lose their only geo-specificity" note was not re-verified.
- **Performance watch** — marido-de-aluguel pages flagged as underperforming by both Ahrefs (slow-page) and Clarity (high INP). Revisit once Clarity accumulates more sessions.

## Notes / Standing Conventions
- H1 source: `ContentLayout.astro` renders H1 from frontmatter `title`. Never add a duplicate `# Heading` in markdown body.
- Service hub pages use `<h1 class="sr-only">` above `BusinessListing`.
- `maridos.js` uses a distinct schema — never mix with other provider files.
- Trailing slashes required on all internal links and canonicalURLs.
- `dateModified` updated on every meaningful markdown content edit.
- Price disclaimer required after first pricing mention on any page (see `PriceDisclaimer.astro` backlog item).
- Bairro pages use `#top` as the anchor id; blog/emergencias pages use `#inicio`. Do not mix.
- `[neighborhood].astro` has three sources of truth for any bairro: `neighborhoodContext`, `getStaticPaths()`'s array, and the matching `/bairros/[slug].md` file. All three must be updated together — missing `getStaticPaths()` causes silent 404s on all 5 combo pages for that neighborhood, no build error.
- Landmark/geography claims from third-party sources need independent corroboration before shipping (content-rules.md Section 8) — haversine distance verification against real coordinates is the standard method, has caught real errors multiple times across multiple cities.
- Provider identity attributes (women-owned, LGBTQ+-friendly) require direct provider confirmation, not a GBP badge alone; `is_24h` is fine from Maps data (content-rules.md Section 9).
- `places_search` (Claude Chat tool) is the preferred method for provider research and coordinate verification.
- When a new city is added to any route family, grep the route file(s) for the previous city's literal slug string, not just `getStaticPaths()` — hardcoded hrefs elsewhere in the same file are an easy miss since they don't affect page count. This exact bug pattern has recurred 3+ times across city launches.
- GEO/AEO audit history and query-by-query tracking live in Claude's memory, not this document.

## Redirects (`public/_redirects`)
- `/blog/retrofit-vila-adyana/` → `/bairros/vila-adyana/` (301)
- `/blog/ar-condicionado-emergencia-sjc/` → `/blog/ar-condicionado-nao-gela-sjc/` (301)
- `/blog/vazamento-no-teto-sjc/` → `/emergencias/vazamento-no-teto-sjc/` (301)
- `/blog/cano-estourado-sjc/` → `/emergencias/cano-estourado-sjc/` (301)

## Pending / On the Horizon
- **Monetization scoping** (started Sep 22): display-ad networks (Mediavine/Raptive/Ezoic) evaluated and set aside — traffic far below thresholds, Brazilian/PT-BR traffic doesn't help since these networks gate on visitor location not language. English/Mandarin translation considered and parked for the same reason (translation doesn't change visitor location). Priority path: WhatsApp attribution (shipped) → provider outreach round 2 (~3-4 weeks out, WhatsApp-based, leads with value not ask) → backlink outreach intensification → AdSense on blog content only, once traffic grows.
- **Backlink outreach** — very incipient (~2 emails sent: Unione Condomínios, Riccio Imóveis). Haganá Segurança and Marcondes Cesar declined (no accessible individual contact). Two more Aquarius-area agencies have drafts prepared. Ian considering deepening this before further city-expansion work, now that all 6 cities are live.
- **Supabase migration** — full scope documented, genuine multi-week undertaking, not started. Needs its own dedicated planning session.
- ✅ **City #6: Aparecida** — live (see Cities Live).
- **CNPJ registration** — pending, unlocks further GBP category changes.
- Domain Rating remains the primary ranking gap — backlink acquisition is the lever, not more pages.