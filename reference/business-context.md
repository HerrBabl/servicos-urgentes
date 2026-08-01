# business-context.md — Serviços Urgentes

Factual reference. Update the metrics section periodically; the rest is stable.

## What this is

servicosurgentes.com — an AI-first emergency home services directory for São José dos Campos (SJC) and the Vale do Paraíba region, Brazil. Connects residents with verified local professionals for emergency and urgent home needs: chaveiro, eletricista, encanador, marido de aluguel, desentupidora, ar-condicionado.

**Operator:** Ian, sole operator. No CNPJ (deliberate, cost-driven decision — a second CNPJ at ~R$195/month isn't justified pre-revenue). This affects legal framing (individual, not registered company) but not the quality bar for content or outreach.

**Site language:** All public content in pt-BR. Internal strategy in English.

## Stack

- Astro v5.15.2 (static site generation) + Tailwind CSS
- Deployed on Netlify via GitHub
- Supabase active: 5 tables (providers, services, neighborhoods, provider_services, provider_neighborhoods), powers programmatic combo pages
- Local `.js` files remain source of truth for service listing pages (`maridos.js` has a distinct schema from the other four — never mix)
- Monitoring: Ahrefs, GA4, GSC, Microsoft Clarity, IndexNow (immediate submission after every deploy)

## Site structure (order of magnitude — check SITE-STRUCTURE.md for exact current counts)

5 service pages · 15 bairro pages · 24 blog posts · 6 emergencias pages (hub + 5 scenarios) · 75 programmatic combo pages (5 services × 15 neighborhoods)

## GBP (Google Business Profile)

Live, category fix permanently deferred (Google's suspension risk for category changes now outweighs the benefit; no second CNPJ planned). Primary category "Internet marketing service," secondaries "Property Maintenance" + "Handyman/Handywoman/Handyperson." No phone number listed. Open 24 hours. This is an accepted structural constraint, not an open task.

## Outreach conventions (learned from badge-outreach and link-insert campaigns)

- **Individual framing outperforms corporate framing.** "Mantenho um diretório local" not "somos uma empresa" or "o diretório." This is both more effective (higher response rates observed) and more accurate given no-CNPJ status.
- **Never claim an evaluative relationship we don't have.** Drop "avaliado e aprovado" style language — it implies formal vetting. "Profissionais verificados" (implies a listing standard) is fine; "aprovado por nós" (implies formal judgment) is not.
- **Reference the specific content, not a generic pitch.** Outreach that names the actual article read is the difference between a personal note and a mass blast.
- **Target selection principle:** favor small, active, genuinely topic-relevant blogs (condomínio management companies, local real estate blogs) over large marketplaces, competing directories, or link-exchange-flavored sites. Relevance and editorial fit matter more than raw domain authority.
- **Subject line pattern (badge outreach):** "Selo gratuito para o site do [Business Name] 🏅" — proven template, keep for that specific campaign type.

## Known structural facts worth remembering when writing content or making claims

- Aquarius = Av. Cassiano Ricardo (main commercial artery)
- Urbanova = Av. Possidônio José de Freitas
- Carrefour SJC location: Av. Deputado Benedito Matarazzo (near Via Dutra + Aquarius access road) — relevant if content ever references landmark-based directions
- "Marido de aluguel sjc" is the mandatory keyword-position-4 term across all frontmatter — reflects that this is a strong-performing, high-priority service category for the site (matches GSC top-page performance historically)

## What NOT to assume

- Do not assume the site has a phone number for GBP purposes (it doesn't, by design).
- Do not assume Ian operates as a company in any outreach or legal-adjacent copy — he is an individual maintaining a directory project.
- Do not invent metrics (traffic, review counts, client numbers) — check current GSC/Ahrefs data or ask, never fill from memory of a prior session's numbers as if they're current.
