# Serviços Urgentes - Site Structure
Last updated: 2026-09-22

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
- reference/ folder (repo root, git-tracked, mirrored in Project Knowledge): content-rules.md, tone.md, vocabulary.md, beliefs.md, business-context.md. **business-context.md is stale** — it claims Supabase powers combo-page filtering; it does not. Standard CC prompt: "Read @reference/content-rules.md, @reference/tone.md, and @reference/vocabulary.md before writing [task]."

## Current Content Totals (as of Guará launch, Sep 21, 2026 — verify with grep before trusting; see content-rules.md Section 7)
- **332 pages total**, 5 cities live
- 39 bairro pages across all cities
- 29+ blog posts
- 6 emergencias pages (SJC only — hub + 5 scenarios)
- 5 city hub pages (SJC homepage `/`, plus `/jacarei/`, `/taubate/`, `/pindamonhangaba/`, `/guaratingueta/`)
- 25 service×city aggregation pages (5 services × 5 cities via `/servicos/[service]/[city]/`)
- 283 provider records across 5 `.js` files, all 5 cities
- Other: `/sobre/`, `/cadastro/`, `/politica-de-privacidade/`, `/servicos/` (SJC index), `/bairros/` (hub)

## Cities Live
| City | Bairros | Hub page | Status |
|---|---|---|---|
| São José dos Campos | 24+ | `/` (homepage) | Full build, reference template for pricing/blog depth |
| Jacareí | 5 | `/jacarei/` | Live, city #2 |
| Taubaté | 5 | `/taubate/` | Live, city #3 — "clean Minimum Viable City" reference template (no known gaps as of Sep 11) |
| Pindamonhangaba ("Pinda") | 5 | `/pindamonhangaba/` | Live, city #4 |
| Guaratinguetá ("Guará") | 5 (Centro, Pedregulho, Parque do Sol, Nova Guará, Jardim do Vale) | `/guaratingueta/` | Live, city #5 (launched Sep 21, commits `8ee9e2a`/`9cb3628`/`2b4547d`) |

**City #6 planned:** Aparecida (Basílica/Santuário Nacional) — deliberately NOT merged into Guará despite proximity; kept as its own full city build (own `cityHomepageContext`, bairro pages, `getStaticPaths` registration) since the site architecture assumes one city = one slug = one bairro set.

## The `/[city]/` and `/servicos/[service]/[city]/` Patterns
Established Aug 31–Sep 1, 2026, proven across 4 subsequent city launches (Jacareí → Taubaté → Pinda → Guará).
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
- Record counts drift with every city launch — verify with grep before trusting any number here. Last full audit Sep 11 (pre-Guará) had 243 records across SJC/Jacareí/Taubaté; Guará added 28 more across the same breakdown described in its launch commits (Eletricista 10, Chaveiro 9, Ar-Condicionado 7, Encanador 1, Marido de Aluguel 1).
- Legacy `.csv`/`.json` files + `csv-to-json-converter.cjs` also present — believed dead scaffolding artifacts, never confirmed removed.

### Cross-City Provider Policy (adopted Sep 17, 2026)
Solves thin-category gaps (e.g. Guará's Encanador/Marido de Aluguel) by cross-listing verified providers from a neighboring city:
- Applies only when a category has fewer than 2 genuine local candidates after an exhausted multi-angle search
- Requires genuine willingness-to-travel evidence (explicit service-area statement, a review from a customer in the target city, or explicit regional-coverage language) — proximity alone is not sufficient
- Scope-limited to only the gapped category — never applied to categories already well-supplied locally
- Requires explicit on-page labeling that the provider is based in the neighboring city (e.g. "Baseado em Aparecida, atende também Guaratinguetá") — never presented as locally based
- Standard verification bar (4+ stars, meaningful reviews, on-site-services-confirmed) still applies in full
- Intended as a durable rule for future thin-category situations (e.g. Cachoeira Paulista, Cruzeiro), not a one-off patch

### Supabase
5 tables (providers, services, neighborhoods, provider_services, provider_neighborhoods) exist but are confirmed empty and not wired into any filter path. Full migration scope documented (Sep 11 discovery pass) but not started — genuine multi-week undertaking, needs its own dedicated planning session. Key blockers: no `city` column anywhere in the Supabase schema (every current filter depends on `city`); `providers` table has only 6 columns vs. the local schema's 15; `maridos.js`'s extra structure has no relational home; build-time-vs-runtime (SSG vs SSR) decision leans toward staying SSG (query Supabase at build time) but not finalized.

## WhatsApp Provider Attribution (shipped Sep 22, 2026)
`BusinessListing.astro` (single component, all provider cards across the site) now appends a pre-filled, `encodeURIComponent`-encoded message to every WhatsApp link, keyed by `business.service_type`. Purpose: give providers visible proof that a lead came from Serviços Urgentes, supporting the provider-badge outreach re-approach. Handles both data shapes (string URL in the 4 standardized files; boolean + constructed URL in `maridos.js`). Verified on-device (iPhone) for both shapes — message renders correctly in the WhatsApp compose box, accented characters (á, ç, ã, é) decode correctly, not as escaped garbage.

## Schema (JSON-LD)
- Sitewide Organization schema (`Layout.astro`) — `areaServed` is a hardcoded array of City objects, manually updated per city launch (deliberately kept hardcoded rather than dynamic — single literal block, no duplication to eliminate). Confirmed current as of Sep 29, 2026: all 5 live cities present (SJC, Jacareí, Taubaté, Pindamonhangaba, Guaratinguetá).
- BreadcrumbList — sitewide format standardized Sep 1, 2026: plain URL strings for `item` (Google's documented format), not nested WebPage objects. Fixed a real bug affecting 158 pages.
- FAQPage schema — blog + emergencias pages (min 4, max 6 FAQs)
- Service + CollectionPage schema — service hub and aggregation pages, city-parameterized
- Place schema — bairro pages
- ✅ Fixed Sep 15, 2026 (commit `f7af18a`): `ContentLayout.astro`'s `Place.geo` now looks up the real bairro's coordinates from `neighborhoodContext` by URL slug, falling back to frontmatter/SJC only for the (currently unreachable) non-bairro-page case.
- ⚠️ Known accuracy gap, not fixed: `ContentLayout.astro`'s Service schema block has a separate hardcoded-SJC `areaServed` bug (distinct from the Layout.astro Organization schema fix).

## Known Backlog Items (not yet actioned)
- **`PriceDisclaimer.astro`** — complete working component exists, imported nowhere; every price disclaimer sitewide is still hand-typed inline. Worth adopting to fix drift risk.
- **Bairro `neighborhood` value normalization** — many provider records across cities have `neighborhood` values that don't match any launched bairro slug. Non-issue in practice: bairro pages show all city-wide providers, not bairro-headquartered-only ("atendem [bairro] e toda a região de [cidade]"), so this doesn't affect page correctness — confirmed working as designed across Jacareí, Taubaté, and Guará.
- **`sobre.astro`'s `canonicalURL`** — missing trailing slash, violates site convention.
- **Emoji-heading anchor bug** — `ContentLayout.astro` client-side script fix was verified locally (hexdump-confirmed pure ASCII regex) as of Jul 24; commit status at that time was pending — confirm whether this shipped.
- ✅ **"Voltar ao topo" (#inicio)** — confirmed Sep 29, 2026: all 5 emergencias pages have the `<a id="inicio">` anchor. No gap.
- **H2 generic label fix** — last remaining open item from the original April 2026 AEO/GEO audit.
- **Marido-de-aluguel `description:` frontmatter field** — missing "marido de aluguel" keyword on 31 of 39 bairro pages (only SJC's 8 later-added expansion bairros have it). Meta/social-preview only, low severity.
- **Hand-authored inline `AdministrativeArea` blocks** in 16 `.md` files — removal deferred pending evaluation of actual GEO impact; 5 bairros would lose their only geo-specificity if removed.
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
- **Backlink outreach** — very incipient (~2 emails sent: Unione Condomínios, Riccio Imóveis). Haganá Segurança and Marcondes Cesar declined (no accessible individual contact). Two more Aquarius-area agencies have drafts prepared. Ian considering deepening this before further city-expansion work, now that all 5 cities are live.
- **Supabase migration** — full scope documented, genuine multi-week undertaking, not started. Needs its own dedicated planning session.
- **City #6: Aparecida** — sequenced next after Guará, own full city build.
- **CNPJ registration** — pending, unlocks further GBP category changes.
- Domain Rating remains the primary ranking gap — backlink acquisition is the lever, not more pages.