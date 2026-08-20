Serviços Urgentes - Site Structure
Last updated: 2026-08-20

Tech Stack
	•	Astro v5.15.2
	•	Tailwind CSS (utility classes only)
	•	Supabase (active — schema built and used for programmatic SEO pages)
	◦	Project: servicos-urgentes-database (nano tier, FREE plan)
	◦	Tables: providers (6 cols), services (5 cols), neighborhoods (8 cols), provider_services (2 cols), provider_neighborhoods (2 cols)
	◦	Note: local .js files remain source of truth for service listing pages
	•	Deployed on Netlify via GitHub
	•	IndexNow key: y3tsh6k5pyqu51n1pzhpzpggbuhwvrcj
	•	Claude Code: set up via Claude Desktop (macOS) — in active use since Jul 2026
	•	reference/ folder (repo root, 5 files) — established Aug 1, 2026: voice/rules reference for Claude Code to read before generating content. Tracked in git as of commit f65cbee. Also uploaded to this Project's Knowledge base for Claude Chat parity.
	◦	content-rules.md — non-negotiables: directory language, pricing/"a partir de" rules, no-DIY safety redirects, structural requirements (trailing slashes, FAQ min/max, dateModified, keyword position 4, schema, anchor conventions, three-source-of-truth bairro rule, landmark/geography verification rule, provider attribute confirmation rule)
	◦	tone.md — register guide: urgency+empathy, direct/calming/authoritative, no humor on emergency-scenario pages
	◦	vocabulary.md — approved/banned terms, regional street references
	◦	beliefs.md — editorial judgment principles for situations rules don't explicitly cover
	◦	business-context.md — stack, site structure, GBP status, outreach conventions ⚠️ KNOWN STALE (see Watch Items) — still shows 15 bairros/75 combo pages, not yet corrected as of this write-up
	◦	Standard CC prompt for content generation: "Read @reference/content-rules.md, @reference/tone.md, and @reference/vocabulary.md before writing [task]."
	◦	Section 8 (Aug 11, 2026) — verifying landmark/geography claims from third-party sources.
	◦	NEW: Section 9 (Aug 20, 2026) — provider attribute fields (women-owned, LGBTQ+ friendly, 24h). "Identifies as women-owned" and "LGBTQ+ friendly" require direct provider confirmation — never set from a Google Business Profile badge alone, since a GBP badge is self-attested by the business owner and not verified by Google, and doesn't equal a claim the provider would necessarily stand behind if asked directly. "is_24h" is fine to source from Google Maps listing data — operating-hours data is objective, unlike an identity attribute.

File Structure
```
└── 📁servicos-urgentes
    └── 📁.astro
        └── 📁collections
        ├── content-assets.mjs
        ├── content-modules.mjs
        ├── content.d.ts
        ├── data-store.json
        ├── settings.json
        ├── types.d.ts
    └── 📁.claude
        ├── launch.json
    └── 📁.vscode
        ├── extensions.json
        ├── launch.json
        ├── settings.json
    └── 📁public
        ├── _redirects
        ├── badge-verificado.svg
        ├── favicon.svg
        ├── llms.txt
        ├── og-default.svg
        ├── robots.txt
        ├── y3tsh6k5pyqu51n1pzhpzpggbuhwvrcj.txt
    └── 📁reference
        ├── beliefs.md
        ├── business-context.md
        ├── content-rules.md
        ├── tone.md
        ├── vocabulary.md
    └── 📁src
        └── 📁components
            ├── BusinessListing.astro
            ├── Footer.astro
            ├── Header.astro
            ├── PriceDisclaimer.astro
        └── 📁data
            ├── .DS_Store
            ├── ar_condicionado.csv
            ├── ar_condicionado.js
            ├── ar_condicionado.json
            ├── chaveiros.csv
            ├── chaveiros.js
            ├── chaveiros.json
            ├── csv-to-json-converter.cjs
            ├── eletricistas.csv
            ├── eletricistas.js
            ├── eletricistas.json
            ├── encanadores.csv
            ├── encanadores.js
            ├── encanadores.json
            ├── maridos.js
        └── 📁layouts
            ├── ContentLayout.astro
            ├── Layout.astro
        └── 📁pages
            └── 📁bairros
                ├── _servicos-urgentes.code-workspace
                ├── bosque-dos-eucaliptos.md
                ├── campos-de-sao-jose.md
                ├── centro.md
                ├── index.astro
                ├── jardim-altos-de-santana.md
                ├── jardim-america.md
                ├── jardim-apolo.md
                ├── jardim-aquarius.md
                ├── jardim-das-colinas.md
                ├── jardim-esplanada.md
                ├── jardim-maringa.md
                ├── jardim-oriente.md
                ├── jardim-satelite.md
                ├── parque-industrial.md
                ├── parque-novo-horizonte.md
                ├── parque-residencial-aquarius.md
                ├── residencial-dom-bosco.md
                ├── santana.md
                ├── sao-dimas.md
                ├── urbanova.md
                ├── vila-adyana.md
                ├── vila-ema.md
                ├── vila-industrial.md
                ├── vila-machado.md
                ├── vista-verde.md
            └── 📁blog
                ├── ac-guia-sjc.md
                ├── ar-condicionado-nao-gela-sjc.md
                ├── chaveiro-24h-sjc.md
                ├── chaveiro-aquarius-sjc-24h.md
                ├── chaveiro-carro-sjc-guia.md
                ├── chaveiro-centro-sjc-24h.md
                ├── chuveiro-queimado-sjc-guia.md
                ├── climatizacao-urbanova.md
                ├── como-contratar-chaveiro-sjc.md
                ├── desentupidora-sjc-guia.md
                ├── eletricista-residencial-sjc-guia.md
                ├── emergencia-temporal-sjc.md
                ├── encanamento-parque-aquarius.md
                ├── guia-bosque-dos-eucaliptos-sjc.md
                ├── guia-emergencia-hidraulica-sjc.md
                ├── guia-encanador-emergencia-sjc.md
                ├── index.astro
                ├── instalacao-ar-condicionado-sjc-guia.md
                ├── jardim-das-colinas-servicos.md
                ├── manutencao-ar-condicionado-verao-sjc.md
                ├── marido-de-aluguel-sjc-guia.md
                ├── melhores-chaveiros-24h-sjc.md
                ├── melhores-maridos-de-aluguel-sjc.md
                ├── vila-adyana-guia.md
            └── 📁emergencias
                ├── cano-estourado-sjc.md
                ├── chuveiro-queimado-sjc.md
                ├── curto-circuito-sjc.md
                ├── index.astro
                ├── porta-trancada-sjc.md
                ├── vazamento-no-teto-sjc.md
            └── 📁locais
            └── 📁servicos
                └── 📁[service]
                    ├── [neighborhood].astro
                ├── ar-condicionado.astro
                ├── chaveiro.astro
                ├── eletricista.astro
                ├── encanador.astro
                ├── index.astro
                ├── marido-de-aluguel.astro
            ├── _index.astro.backup
            ├── .DS_Store
            ├── cadastro.astro
            ├── index.astro
            ├── politica-de-privacidade.md
            ├── sobre.astro
        └── 📁styles
            ├── global.css
        ├── .DS_Store
    ├── .DS_Store
    ├── .env
    ├── .gitignore
    ├── astro.config.mjs
    ├── DEPLOYMENT-GUIDE.md
    ├── NETLIFY-DEPLOYMENT-GUIDE.md
    ├── package-lock.json
    ├── package.json
    ├── QUICK-START.md
    ├── README.md
    ├── server.log
    ├── SETUP-INSTRUCTIONS.md
    ├── structure-export.txt
    ├── tsconfig.json
    └── vite.config.js
```

Design System
	•	Colors: Blue gradients (from-blue-600 to-blue-800), Red CTAs (bg-red-600), Red hero (from-red-700 to-red-900) for /emergencias/
	•	Typography: Inter font, headings use font-bold
	•	Cards: bg-white rounded-lg shadow-md
	•	CTA button invisible-text bug: FIXED Aug 1, 2026 (was open Jul 31). Root cause: .prose-content :global(a) in ContentLayout.astro unconditionally set red text color on every anchor inside markdown body content, at higher specificity than the Tailwind .text-white utility on the CTA button. Fixed with .prose-content :global(a:not(.text-white)) (and matching :hover rule). Fixed all affected /bairros/*.md pages at once via the one layout change. Committed 5cacca3, deployed Jul 31.

Analytics & Tools
	•	GA4, GSC, Microsoft Clarity, Ahrefs Webmaster Tools all active
	•	llms.txt: https://servicosurgentes.com/llms.txt
	•	Google Business Profile: live (category: Internet Marketing Service primary; Property Maintenance + Handyman/Handywoman/Handyperson secondaries). No phone. Open 24 hours. Category fix deferred until CNPJ obtained.
	•	Ahrefs Webmaster Tools: active (Health Score 100 as of Jul 30 crawl — recheck still due, see Watch Items)
	•	GSC: IndexNow submission and GSC indexing are separate pipelines. IndexNow (direct or via Ahrefs) does not submit to Google. For each new bairro/combo page batch, also check GSC URL Inspection and use "Request Indexing" for pages showing "URL is not on Google." Sitemap confirmed live and structured correctly: sitemap-index.xml points to sitemap-0.xml (the actual URL list) — this is normal Astro sitemap-integration behavior, not a bug.
	•	Google AI Plus (Gemini, 12-month free tier) — in active use as a research supplement for bairro geography/landmark research when standard web search returns thin results. Per Section 8 rule, Gemini output is treated as a single AI-generated source requiring corroboration (via a second source, a map screenshot, or site-owner local knowledge), not a primary source on its own. Also used Aug 20 for a Google Maps density sanity-check on candidate Jacareí launch bairros — see Jacareí section below.
	•	places_search tool (Claude Chat) — new as of Aug 19/20 sessions: direct Google Places API access for provider ratings/reviews/hours/website-presence lookups. Proved more reliable than general web search (which mostly surfaces lead-gen aggregators like GetNinjas/Cronoshare/GuiaSJC rather than actual GBP data) and than the untested Gemini+Chrome-in-Maps workflow. Now the preferred first tool for any provider-gate or provider-research task.

Schema Implemented
	•	WebSite schema (sitewide)
	•	LocalBusiness schema (service pages)
	•	Article schema (blog posts)
	•	CollectionPage schema (/emergencias/ hub; also servicos/index.astro as of Jul 14, 2026)
	•	Place + Service schema (neighborhood combo pages — containedInPlace fixed May 6)
	•	BreadcrumbList (all content pages)
	•	FAQPage schema (blog + emergencias pages — min 4, max 6 per page)
	•	Sitewide Organization schema (Layout.astro) — directory-clarifying description added Jul 14, 2026. ⚠️ PENDING CHANGE: once Jacareí bairro pages go live, areaServed must become an explicit array of named City objects (SJC + Jacareí) rather than a single-city value. Not yet done — see Jacareí section.
	•	AdministrativeArea schema (bairro pages, /bairros/*.md)

Current Content (as of 2026-08-20)

Service Pages (5)
	•	/servicos/encanador/
	•	/servicos/eletricista/
	•	/servicos/chaveiro/
	•	/servicos/ar-condicionado/
	•	/servicos/marido-de-aluguel/

Neighborhood (Bairro) Pages — SJC (24) — all confirmed live, confirmed via current file tree (Aug 20)
	•	parque-residencial-aquarius
	•	urbanova
	•	centro
	•	vila-adyana
	•	bosque-dos-eucaliptos
	•	jardim-das-colinas
	•	jardim-satelite
	•	sao-dimas
	•	jardim-esplanada
	•	santana
	•	parque-industrial
	•	vila-ema
	•	jardim-america
	•	campos-de-sao-jose
	•	jardim-aquarius
	•	jardim-oriente
	•	vila-industrial
	•	vista-verde
	•	vila-machado (added Aug 3, 2026 — bairro #19)
	•	residencial-dom-bosco (added Aug 4, 2026 — bairro #20)
	•	jardim-altos-de-santana (added Aug 4, 2026 — bairro #21)
	•	jardim-apolo (added Aug 11, 2026 — bairro #22)
	•	jardim-maringa (bairro #23 — build/ship date not confirmed in current session context; was listed as an "orphan slug" as of the Aug 11 write-up, now confirmed live in both the file tree and the Aug 20 build output. ⚠️ Confirm exact ship date from git log before treating as final.)
	•	parque-novo-horizonte (bairro #24 — same flag as above: confirmed live now, exact ship date not confirmed in current session context.)
	•	Missing-neighborhoods callout is now at ZERO — both previously-orphaned slugs (jardim-maringa, parque-novo-horizonte) are confirmed live as of the Aug 20 build (185-page and 210-page build outputs both show these routes generating successfully).

Neighborhood (Bairro) Pages — Jacareí (0 live, 5 scaffolded/routing-only)
	•	Not yet live — routing exists, content does not. See Jacareí Expansion section below for full detail.

Blog Posts (23)
	•	ac-guia-sjc.md
	•	ar-condicionado-nao-gela-sjc.md
	•	chaveiro-24h-sjc.md
	•	chaveiro-aquarius-sjc-24h.md
	•	chaveiro-carro-sjc-guia.md
	•	chaveiro-centro-sjc-24h.md
	•	chuveiro-queimado-sjc-guia.md
	•	climatizacao-urbanova.md
	•	como-contratar-chaveiro-sjc.md
	•	desentupidora-sjc-guia.md
	•	eletricista-residencial-sjc-guia.md
	•	emergencia-temporal-sjc.md
	•	encanamento-parque-aquarius.md
	•	guia-bosque-dos-eucaliptos-sjc.md
	•	guia-emergencia-hidraulica-sjc.md
	•	guia-encanador-emergencia-sjc.md
	•	instalacao-ar-condicionado-sjc-guia.md
	•	jardim-das-colinas-servicos.md
	•	manutencao-ar-condicionado-verao-sjc.md
	•	marido-de-aluguel-sjc-guia.md
	•	melhores-chaveiros-24h-sjc.md
	•	melhores-maridos-de-aluguel-sjc.md
	•	vila-adyana-guia.md

Emergency Scenario Pages (6)
	•	/emergencias/ (hub — index.astro)
	•	/emergencias/cano-estourado-sjc/
	•	/emergencias/porta-trancada-sjc/
	•	/emergencias/curto-circuito-sjc/
	•	/emergencias/chuveiro-queimado-sjc/
	•	/emergencias/vazamento-no-teto-sjc/ (migrated from /blog/ May 4, 2026)

Programmatic Combo Pages (120 live SJC + 25 scaffolded Jacareí = 145 total once Jacareí content ships)
	•	/servicos/[service]/[neighborhood]/ — auto-generated
	•	SJC: 5 services × 24 neighborhoods = 120 pages (confirmed live, confirmed via Aug 20 build output)
	•	Jacareí: 5 services × 5 neighborhoods = 25 pages (routing scaffolded Aug 20, commit d9ff73a, held locally not pushed — pages build successfully but noindex/redirect to /servicos/ until content exists; see Jacareí Expansion section)
	•	Schema: containedInPlace (fixed May 6, 2026); provider disambiguation (fixed Jul 14, 2026)
	•	⚠️ IMPORTANT: [neighborhood].astro has THREE independent sources of truth that must ALL be updated when adding a bairro, not two:
		1	neighborhoodContext object (rich copy: crisisScenario, landmarks, responseTime, etc.)
		2	getStaticPaths()'s hardcoded neighborhoods array — deliberately decoupled from neighborhoodContext because getStaticPaths() runs before the rest of the file executes and cannot read the context object. Missing this step = combo pages 404 silently OR (as newly confirmed Aug 20) redirect silently to /servicos/ if a runtime guard is present — see below.
		3	The matching /bairros/[slug].md page itself
	•	NEW (Aug 20, 2026) — getStaticPaths() architecture: restructured at some point after Aug 11 from a flat single-city neighborhoods array into a cities: [{ services, neighborhoods }] array-of-objects shape, explicitly designed to support multiple cities without a rewrite. This is the scaffold that allowed Jacareí to be added Aug 20 as a clean second cities entry rather than requiring a restructure. ⚠️ Exact date/session of this restructure not confirmed in current context — worth confirming via git log (git log --follow -- "src/pages/servicos/[service]/[neighborhood].astro") if it matters for future reference.
	•	NEW (Aug 20, 2026) — confirmed existence of a runtime guard at [neighborhood].astro line ~955: if (!svc || !nbh) { return Astro.redirect('/servicos/'); }. This means a bairro slug added to getStaticPaths() without a matching neighborhoodContext entry does NOT cause a build failure — it builds successfully as a valid, noindex'd page that immediately redirects to /servicos/. Safer than a hard crash, but means incomplete routing work produces no loud CI signal — must be tracked manually (as this document + Watch Items are now doing for the 25 Jacareí routes).
	•	Always verify counts with an actual grep/count command before writing a total into a comment — indentation quirks can silently break naive regex counts. This receipt-before-write discipline is codified in reference/content-rules.md Section 7.
	•	Missing-neighborhoods callout list (SJC) is now at ZERO.

Other Pages
	•	/ (homepage)
	•	/sobre/
	•	/cadastro/
	•	/politica-de-privacidade/
	•	/servicos/ (services index)
	•	/bairros/ (neighborhood hub)
	•	/jacarei/ (city hub) — NOT YET BUILT, see Jacareí Expansion section

Data Layer

Local .js files (service listing pages) — provider counts as of Aug 19 dead-link sweep
	•	ar_condicionado.js — 39 providers, standardized schema
	•	chaveiros.js — 47 providers (down from 48 — "Chaveiro Neves" removed Aug 20, commit 489e658, pushed; could not be verified via 2 independent methods — Places API address mismatch + manual search, no satisfactory result), standardized schema
	•	eletricistas.js — 45 providers, standardized schema
	•	encanadores.js — 22 providers, standardized schema
	•	maridos.js — 7 providers, DISTINCT schema (unquoted keys, name/rating/services/badges — do not mix with other files)
	•	Dead-link sweep (Aug 18–19, 2026) — COMPLETE. All 161 (now 160) provider entries accounted for. 13 confirmed-dead URLs normalized to "N/A" across 2 commits (db8c039, 89a6d09); 5 junk placeholder values normalized (commit 962bac4); 2 curl false positives confirmed live via browser check and left unchanged. Cross-listed businesses (Torres Manutenção, Cleiton Reformas — both eletricistas.js and encanadores.js) fixed in both files.
	•	chaveiros.js website-gap finding (Aug 19, 2026) — 27 of 48 entries (now 27 of 47) had no website on file, the worst rate of any provider file. Investigated via Google Places API cross-check against all 27: zero returned a website field in Google's own data either, matching the file. Conclusion: realistic fragmentation for a highly informal, storefront/banca-based local category in SJC, not a research gap. No file changes needed from this investigation.
	•	Provider attribute policy (content-rules.md Section 9, added Aug 20) — women-owned/LGBTQ+-friendly attributes require direct provider confirmation, not GBP badge alone; is_24h is fine from Maps data.

Supabase (programmatic/neighborhood combo pages)
	•	providers — id, name, phone, rating, hours, created_at
	•	services — id, name, slug, description, created_at
	•	neighborhoods — id, name, slug, description, latitude, longitude, crisis_context, created_at
	•	provider_services — provider_id, service_id (junction)
	•	provider_neighborhoods — provider_id, neighborhood_id (junction)
	•	city field backfilled on all provider entries (Aug 14, 2026) but currently INERT — not yet wired into combo-page filtering logic. Required before Jacareí launch to prevent SJC providers showing on Jacareí pages and vice versa. See Jacareí Expansion section.

Redirects (public/_redirects)
	•	/blog/retrofit-vila-adyana/ → /bairros/vila-adyana/ (301)
	•	/blog/ar-condicionado-emergencia-sjc/ → /blog/ar-condicionado-nao-gela-sjc/ (301)
	•	/blog/vazamento-no-teto-sjc/ → /emergencias/vazamento-no-teto-sjc/ (301)
	•	/bairros/ — real page now live (redirect removed May 27, 2026)

GEO/AEO Status
Audit history, query-by-query results, and citation tracking now live in Claude's memory (updated after each audit session) rather than duplicated here — check memory for the current standing on Q1–Q5 and prior baselines. Q3 and Q5 were untested as of the Jul 17 session (Perplexity error + sign-in wall respectively) — both flagged as high-priority retests, not confirmed gaps.

AEO/GEO Schema Fixes (Jul 14, 2026)
Three fixes applied and verified — full detail in memory:
	1	Provider disambiguation on 45 combo pages + ContentLayout.astro bairro schema
	2	servicos/index.astro ItemList → Thing-typed CollectionPage schema
	3	Sitewide Organization description added (Layout.astro)

AEO Content Fixes — Callout Rollout COMPLETE (Jul 18, 2026)
Opening-structure fix ("Resumo rápido" callout, 35-45 words, dense/direct-answer style) applied to all 17 confirmed FAIL pages across servicos/*.astro, emergencias/*.md, and blog/*.md. All commits pushed, Netlify published, IndexNow submitted, Ahrefs recrawl clean. Full detail and per-file data sources in memory.

AEO Content Fixes — Directory-Language Cleanup COMPLETE (Jul 20, 2026)
All 24 flagged "nosso/nossos/nossa" instances across 7 blog posts resolved. 2 deliberate Category C exceptions left unchanged. Full detail in memory.
	•	⚠️ STILL NOT FORMALLY RE-AUDITED against bairro pages added since Jul 30. All were written following established rules ("o diretório cobre" pattern confirmed correct usage), but none have had the same systematic audit the Jul 20 cleanup gave the blog posts. Still open — see Watch Items.

AEO Content Fixes — Heading-Phrasing Fix COMPLETE (Jul 23, 2026)
Generic H2 section labels rephrased to question form across 10 files. This closes out the entire original April 2026 AEO/GEO audit.

Bugs Found & Fixed
	•	Emoji-heading anchor bug (sitewide) — fixed via a client-side script in ContentLayout.astro. Committed and deployed Jul 24, 2026.
	•	Missing "Voltar ao topo" anchor (4 of 5 emergencias files) — fixed. Committed and deployed Jul 24, 2026.
	•	isBlog/isNeighborhood schema precedence bug — RESOLVED Aug 18, 2026 (additive fix). isBairroPage derived from Astro.url.pathname now correctly appends Place schema to @graph on all 24 bairro pages without disturbing Article + FAQPage on blog/emergencias pages.
	•	BreadcrumbList bug (mislabels blog posts as "Bairros") — same root-cause unreliable isNeighborhood flag as above. Logged, NOT yet fixed. See Watch Items.
	•	Stale "9 neighborhoods" doc-comment references in [neighborhood].astro — 4 instances found and corrected Aug 20, 2026 (commit 8aec14f, pushed). File header itself (lines 4-13) had already been corrected to 24 in an earlier session; the 4 stale instances were scattered comments elsewhere in the same file that a linear read of the header wouldn't catch.

Bairro Depth-Expansion Track (SJC) — status update
SJC bairro depth-expansion is effectively PAUSED as of Aug 20 — no new SJC bairros added since jardim-apolo (Aug 11) / the jardim-maringa & parque-novo-horizonte completions. Focus has shifted to Jacareí width-expansion (see below), which passed its full provider-availability gate Aug 19.
	•	Map-sourced candidates from the Jul 30 session, not yet built: eugenio-de-melo, putim, campo-dos-alemaes, alto-da-ponte. Still pending, lower priority than Jacareí right now.
	•	Landmark Verification Lesson (content-rules.md Section 8, Aug 11, 2026) — real estate/imobiliária content can be confidently wrong or internally-consistent-but-inaccurate about a bairro's landmarks. Claims need corroboration from a genuinely independent source (not just multiple listings from the same network) or site-owner local knowledge. Prompted by the jardim-apolo correction episode (4 inaccurate claims caught by site owner before shipping).

Jacareí Expansion — ACTIVE, IN PROGRESS (accelerated Aug 19-20, 2026)
Supersedes the "Jacareí Pilot Decision (Jul 30, 2026) — NOT yet started" note from the prior version of this document.

Architecture (locked Aug 14, 2026):
	•	Flat city-prefixed slugs: /bairros/jacarei-centro/, not a nested /jacarei/bairros/ path
	•	Standalone /jacarei/ city-hub page — NOT YET BUILT
	•	No city switcher on servicos/index.astro — SJC and Jacareí stay structurally separate there
	•	city field already backfilled on all provider .js entries (Aug 14) but currently INERT — not wired into any filtering logic yet
	•	getStaticPaths() restructured to support this (see Programmatic Combo Pages section above)

Provider-availability gate — FULLY PASSED as of Aug 19, 2026 (all 5 services, not just 3):
	•	chaveiro — passed Jul 30 (12 qualifying providers, ≥4.0★/≥10 reviews)
	•	encanador — passed Jul 30 (3 qualifying)
	•	marido-de-aluguel — passed Jul 30 (3 qualifying)
	•	eletricista — passed Aug 19 (10 qualifying: Léo de Judá, Mazinho, Jackson, AL Soluções, Freitas Elétricas, SOS Eletricista 24h, ZA Instalações, Jacareí cerca elétrica, Cláudio Eletricista e ar condicionado, Tiago Luis)
	•	ar-condicionado — passed Aug 19 (9 qualifying: ClimaBless, L.O Ar Condicionado, R.A Climatização, Refrescar, TD Ar Condicionado, Bom Clima, Marcel, Refrigeração DC, Beneton Clima)
	•	Decision: Jacareí launches at ALL 5 services, not the originally-planned 3 — the eletricista/AC gate was the only remaining blocker and it cleared comfortably.
	•	Note: two provider names (Cláudio Eletricista e ar condicionado; L.O Ar Condicionado e Elétrica) straddle both service categories — flag as cross-listed in both .js files when added, per the Torres Manutenção/Cleiton Reformas precedent from the SJC dead-link sweep.
	•	Places API (Claude Chat places_search tool) used for this gate check — proved more reliable than the untested "Gemini + Google Maps in Chrome" idea floated at the start of the Aug 19 session; recommend as the standard tool for future provider-gate research.

Launch bairro list — CONFIRMED Aug 20, 2026 (5 bairros):
	1	Villa Branca → jacarei-villa-branca
	2	Jardim Califórnia → jacarei-jardim-california
	3	Jardim Santa Maria → jacarei-jardim-santa-maria
	4	Centro → jacarei-centro
	5	Cidade Salvador → jacarei-cidade-salvador
	•	Selection method: cross-verified via multiple independent source types — Jacareí municipal government site (jacarei.sp.gov.br), local news (informa.life, Apr 2026), real estate portals (Novellis Imóveis), and a Google Maps density sanity-check via Gemini. Villa Branca, Jardim Califórnia, and Jardim Santa Maria converged across all source types; Centro included as the functional/commercial-density pick (mirrors SJC's own Centro inclusion); Cidade Salvador included based on strongest raw provider-address clustering from the Aug 19 gate research (3 qualifying eletricista/AC providers) plus independent confirmation as a real, high-density bairro.
	•	Rejected as a selection method: initial idea to pick launch bairros purely by provider HQ-address clustering was abandoned as a weak signal — provider business address ≠ service coverage area, and the dataset was too thin (19 data points across 2 services) to support it alone. Population-based selection was also attempted and abandoned — Jacareí (138 bairros total) does not appear to publish per-bairro census data at usable granularity.
	•	Other Jacareí bairros surfaced during research but NOT included in this launch list (kept as a future-expansion watchlist, not independently corroborated the way the 5 above were): Jardim das Indústrias (single uncorroborated mention), Jardim Flórida, Jardim Nova Esperança, Parque Itamarati, Parque Santo Antônio, Bandeira Branca (all map-density inferences only, from the Aug 20 Gemini sanity-check, no independent source corroboration).

getStaticPaths() routing scaffold — DONE Aug 20, 2026, HELD LOCALLY (not pushed):
	•	Commit d9ff73a: Jacareí added as a second cities entry in [neighborhood].astro's getStaticPaths(), with its own identical 5-service list and the 5 confirmed neighborhood slugs above.
	•	Build verified clean: 210 pages total (up from 185), exit code 0.
	•	The 25 new Jacareí routes build successfully but are noindex'd and immediately redirect to /servicos/ (via the runtime guard described in the Programmatic Combo Pages section) — expected and safe, since neighborhoodContext entries don't exist yet for these 5 slugs.
	•	Header comment in getStaticPaths() updated to reflect new total (145 routes across 2 cities).
	•	NOT PUSHED — intentionally incomplete, holding until neighborhoodContext + .md content exists per the three-source-of-truth rule.

Still needed before Jacareí can go live (in rough sequence):
	1	Provider sourcing — compile the actual eletricista/ar-condicionado rosters (gate-check businesses above) into eletricistas.js and ar_condicionado.js with city: "Jacareí" tags and cross-listed flagging from the start. Chaveiro/encanador/marido-de-aluguel rosters for Jacareí also not yet compiled into the .js files despite passing their gate back in Jul 30 — same task, still pending.
	2	neighborhoodContext entries — rich copy (displayName, characteristics, crisisScenario, landmarks, responseTime, nearbyNeighborhoods, etc.) for the 5 confirmed Jacareí slugs. Requires real local knowledge — content-rules.md Section 8 applies (no invented landmarks/claims).
	3	Matching /bairros/jacarei-*.md files — 5 new files, following the same structure as SJC bairro pages.
	4	city field activation — wire the existing-but-inert city field into [neighborhood].astro's provider-selection logic so Jacareí combo pages don't show SJC-only providers and vice versa.
	5	/jacarei/ city-hub page — net-new page, doesn't exist yet. Needs its own Organization/LocalBusiness schema scoped to Jacareí, hero, and links into the 5×5 matrix.
	6	Sitewide Organization schema update — areaServed becomes an explicit array of named City objects (SJC + Jacareí) instead of a single value. Not yet started.
	7	GBP service-area addition for Jacareí — do after first Jacareí pages are live. No CNPJ required for this specific step.
	•	IMPORTANT: once content is added, remember to actually commit + push the held d9ff73a routing commit if it hasn't already been superseded by further work, then run the full deploy pipeline (verify → build → IndexNow → Ahrefs recrawl → GSC indexing check) same as any other new-page batch.

Reference Framework for Claude Code
reference/ folder at repo root (5 files, tracked in git as of commit f65cbee) gives CC durable, directly-readable rules instead of relying on rules being re-stated in every prompt. Standard invocation: "Read @reference/content-rules.md, @reference/tone.md, and @reference/vocabulary.md before writing [task]."
	•	content-rules.md Section 7: three-source-of-truth bairro rule + "verify counts with an actual grep" lesson.
	•	content-rules.md Section 8 (Aug 11, 2026): verifying landmark/geography claims from third-party sources.
	•	content-rules.md Section 9 (Aug 20, 2026): provider attribute confirmation rule (women-owned/LGBTQ+-friendly require direct confirmation; is_24h fine from Maps data).
	•	All 5 files mirrored in this Project's Knowledge base for Claude Chat parity. Repo version is authoritative if the two ever diverge.
	•	⚠️ NEW PROCESS NOTE (Aug 20, 2026): a real drift incident occurred this session — Claude Chat's Project Knowledge copy of [neighborhood].astro was stale relative to the actual repo file (missing a getStaticPaths() restructure that had happened in an untracked session), which caused an initial incorrect spec to be written and then had to be corrected mid-session once CC flagged the mismatch. Going forward: for any file under active development, prefer asking CC to paste current live content, or re-upload the file fresh, rather than trusting a Project Knowledge copy — PK is more reliable for stable reference docs (content-rules.md etc.) than for fast-changing code files.

Watch Items (not yet investigated)
	•	business-context.md (Project Knowledge) — confirmed stale (says 15 bairros/75 combo pages; actual is 24/120 SJC, soon 145 total with Jacareí). Not yet corrected. Needs a refresh pass — either hand-edit or regenerate from repo state via CC.
	•	Directory-language spot check still not formally run on bairro pages added since Jul 30, or on the shared neighborhoodContext template strings in [neighborhood].astro itself (a violation there would replicate across all combo pages at once — higher priority than any single hand-written page).
	•	BreadcrumbList bug (blog posts mislabeled as "Bairros") — same root-cause isNeighborhood unreliability that caused the (now-fixed) Place-schema bug. Needs a dedicated session.
	•	"Voltar ao topo" — confirm all emergencias pages have the manual anchor consistently (was fixed Jul 24 but worth a re-check given how much has shipped since).
	•	Ahrefs Health Score / crawl results not re-checked since the Jul 30 crawl. Recheck overdue — should reflect all bairro and Jacareí-scaffold changes by now.
	•	Ahrefs "Pages dropped from Top 10" (6), "Organic traffic dropped" (2), "No. of referring domains dropped" (1) — flagged "New" on the Jul 31 crawl, never investigated.
	•	Ahrefs "Slow page" count was 2 as of Jul 31 — marido-de-aluguel/ is the standing suspect given Clarity INP data.
	•	MS Clarity shows servicos/marido-de-aluguel/ and blog/marido-de-aluguel-sjc-guia/ underperforming on INP — sample size still thin, revisit once more sessions accumulate.
	•	GSC "Request Indexing" status sweep for all bairros added since #19 — not yet confirmed.
	•	GEO audit retest needed for Q3 ("serviços urgentes SJC") and Q5 ("chaveiro perto de mim SJC") — untested in the Jul 17 session due to a Perplexity error and sign-in wall respectively.
	•	"Chaveiro Neves" removal (Aug 20) — the underlying address discrepancy (40 vs 106 Rua Nepomuceno) was never fully resolved before the entry was removed; deprioritized as low-ROI to chase further, but noting for completeness in case the business resurfaces under a corrected address later.

Pending / On the Horizon
	•	Jacareí width-expansion — see full dedicated section above; this is now the primary active workstream, not a "not yet started" item.
	•	Run directory-language spot check on bairro pages + [neighborhood].astro template strings (see Watch Items)
	•	Continue SJC bairro depth-expansion (lower priority than Jacareí right now): eugenio-de-melo, putim, campo-dos-alemaes, alto-da-ponte
	•	Recheck Ahrefs crawl results — overdue
	•	Cloudflare proxy setup — deferred (resolves slow page flags + unlocks Bot Analytics)
	•	Supabase migration from local .js files — future phase
	•	CNPJ registration — pending (unlocks further GBP category changes)
	•	Netlify form honeypot on /cadastro/ — pending
	•	Supabase automated backup — pending
	•	Backlink outreach (Tactic 2) — Unione Condomínios and Riccio Imóveis emails sent Aug 19. Haganá Segurança, i9vale, and Marcondes Cesar all researched and deprioritized Aug 20 (each is a company-scale operation with a sales-funnel blog and no realistically reachable individual content contact — same structural problem across all three). Next step when picking this back up: source a fresh small-operator/single-broker backup target list rather than reusing the same "imobiliária blog SJC" search pattern, which keeps surfacing company-scale operations.
	•	Badge campaign (badge-verificado.svg) — partially deprioritized per memory
	•	Veekhuu local-domination repo deep dive — pending, not yet touched
	•	Outreach tracker — no dedicated tracker exists yet for sent/pending backlink outreach (sent date, response, link-live status). Worth setting up given outreach is now an active, recurring workstream rather than a one-off.
	•	Contact email — consideration in progress (not yet created) for a dedicated contato-servicosurgentes@gmail.com address, separate from the existing cadastroservicosurgentes@gmail.com registration inbox, to better match the framing of backlink/partnership outreach emails going forward.

Notes
	•	H1 source: ContentLayout.astro renders H1 from frontmatter title (fixed Apr 16, 2026)
	•	Service pages use sr-only H1 above BusinessListing component (fixed Apr 15, 2026)
	•	maridos.js uses a distinct schema — never mix with other data files
	•	Dead URL protocol: always verify business website URLs resolve before adding to .js files. Browser verification (person checking directly) is the most authoritative signal — more reliable than curl or search snippets, reconfirmed multiple times during the Aug 18-19 sweep.
	•	Trailing slashes required on all internal links and canonicalURLs
	•	dateModified must be updated on every meaningful markdown content edit
	•	Price disclaimer required after first pricing mention on any page
	•	llms.txt live at /llms.txt — update whenever significant new pages are added
	•	TypeScript: always add new fields to serviceContext/neighborhoodContext type definition first
	•	Bairro pages use #top as the anchor id — SEPARATE from the #inicio pattern used on blog/emergencias pages. Do not mix the two. Codified in reference/content-rules.md.
	•	[neighborhood].astro has three independent sources of truth (neighborhoodContext, getStaticPaths() array, /bairros/ page). Always update all three, always verify counts with an actual grep/count command. Codified in reference/content-rules.md Section 7.
	•	Landmark/geography claims sourced from third-party content need corroboration from a genuinely independent second source, or site-owner local confirmation, before shipping. Codified in reference/content-rules.md Section 8.
	•	Provider identity attributes (women-owned, LGBTQ+ friendly) require direct provider confirmation, not a GBP badge alone. is_24h is fine from Maps data. Codified in reference/content-rules.md Section 9 (Aug 20, 2026).
	•	IndexNow submission and GSC indexing are separate pipelines. For new pages, also check GSC URL Inspection and use "Request Indexing" if needed.
	•	reference/ folder (repo root) holds the canonical, git-tracked version of content rules for CC; the same 5 files are mirrored in this Project's Knowledge base for Claude Chat. If the two ever diverge, treat the repo version as authoritative.
	•	Prefeitura's official bairro registry PDF is useful for zone/region confirmation but is NOT comprehensive — absence from that list doesn't mean a bairro isn't real, just that it may be an informal name for a sub-area of a larger officially-registered bairro.
	•	A runtime guard in [neighborhood].astro (if (!svc || !nbh) return Astro.redirect('/servicos/')) means an incomplete bairro/city addition to getStaticPaths() fails SAFELY (noindex + redirect) rather than breaking the build — but produces no loud signal that work is incomplete, so partially-scaffolded routes must be tracked manually in this document until finished.
	•	Project Knowledge copies of actively-changing code files (e.g. [neighborhood].astro) can silently drift from the actual repo state between sessions. For any file CC is actively editing, prefer a fresh paste/upload over trusting the PK copy.