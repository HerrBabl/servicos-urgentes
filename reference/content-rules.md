# content-rules.md — Serviços Urgentes

Non-negotiable rules. Apply to every page, post, or copy edit without exception.
If a generated draft violates any rule below, fix it before presenting it — do not ask the user to catch it.

---

## 1. Directory language (sitewide, zero exceptions unless explicitly whitelisted below)

Serviços Urgentes is a **directory**, not a service provider. Never imply we employ, manage, or vouch personally for professionals.

| Never write | Write instead |
|---|---|
| Nossos parceiros | Profissionais da região |
| Nossa equipe | Técnicos cadastrados |
| Nossa rede | Prestadores locais |
| Nosso time | Profissionais verificados |
| Qualquer "nosso/nossa/nossos" implying ownership of professionals | Third-person, directory-neutral phrasing |

**Whitelisted exceptions (do not flag these):**
- Serviços Urgentes citing its own data/methodology (e.g., "nosso levantamento mostrou...")
- Content describing a neighborhood's own character where "nosso" refers to the neighborhood/community, not to professionals

If uncertain whether a "nosso" usage is a violation, default to rewriting it neutrally.

## 2. Pricing rules

- Use **"a partir de"** for all lower-bound price or arrival-time figures. Never use "em" for a lower bound (e.g., "a partir de R$150," never "em R$150").
- **Never invent a number.** Any price, time estimate, or statistic not present in the page's own existing content must not be generated. If the page has no pricing data yet and one is needed, stop and flag it — don't fill the gap with a plausible-sounding figure.
- Insert the mandatory price disclaimer HTML block immediately after the FIRST pricing mention on any page — once per page, not once per section. Never modify the disclaimer's wording except swapping the region phrase for neighborhood-specific content.

## 3. Safety — no DIY technical instructions

Never provide step-by-step instructions for:
- Electrical work (wires, breakers, panels)
- Gas systems (leak detection, shutoff)
- Structural assessment
- Medical emergencies
- Fire safety beyond "call bombeiros"

Always redirect using this register:
- "Chame profissional imediatamente"
- "Ligue para Bombeiros (193) ou Defesa Civil"
- "Não tente resolver sozinho — risco de morte"

We describe PROBLEMS. We never describe SOLUTIONS that require technical expertise.

## 4. Structural non-negotiables

- Trailing slash on every internal link and every canonicalURL, no exceptions.
- `[⬆️ Voltar ao topo]` after every major section — two separate anchor conventions exist, do not mix them:
  - `/bairros/*.md` pages: `<span id="top"></span>` + `[⬆️ Voltar ao topo](#top)`
  - `/blog/*.md` and `/emergencias/*.md` pages: `<a id="inicio">` + `[⬆️ Voltar ao topo](#inicio)`
  Match whichever convention the page type already uses. Using the wrong one breaks the anchor link silently — no build error, just a dead link on click.
- FAQ section: minimum 4, maximum 6, must appear in visible page body, not only in frontmatter schema.
- `dateModified` updated on every meaningful markdown edit (not required for `.astro` components).
- **"marido de aluguel [cidade]"** always at keyword position 4 in the frontmatter `keywords` field, where `[cidade]` matches the page's own city (e.g. "marido de aluguel sjc" for São José dos Campos pages, "marido de aluguel jacareí" for Jacareí pages, "marido de aluguel taubaté" for future Taubaté pages).
- Never add a `# Heading` in markdown body — `ContentLayout.astro` renders H1 from frontmatter `title`. A body-level H1 creates a duplicate.
- Street references: Aquarius = Av. Cassiano Ricardo; Urbanova = Av. Possidônio José de Freitas.

## 5. Schema

- Provider/organization schema must use the disambiguated object: name "Profissionais Verificados via Serviços Urgentes" with directory-clarifying description. Never a plain Organization named "Serviços Urgentes" standing in for providers.
- `encanador.astro`'s `Thing`-typed `about` structure is the reference pattern for listing schemas.

## 6. Category taxonomy (approved values only)

Service Guides: Hidráulica, Elétrica, Segurança Residencial, Climatização
Content Types: Guia de Instalação, Guia de Manutenção, Guia de Emergência, Guia de Bairro
Special: Dicas de Economia, Prevenção, Comparativo de Serviços

Don't invent new category values.

## 7. Adding a new bairro combo page set

`[neighborhood].astro` has **three independent sources of truth** that must ALL be updated when adding a new bairro:
1. `neighborhoodContext` object (rich copy: crisisScenario, landmarks, responseTime, etc.)
2. `getStaticPaths()`'s hardcoded `neighborhoods` array — deliberately decoupled from `neighborhoodContext` because `getStaticPaths()` runs before the rest of the file executes and cannot read the context object. Missing this step causes all 5 combo pages for that neighborhood to 404 silently.
3. The matching `/bairros/[slug].md` page itself.

Before writing any neighborhood/page count into a comment or doc, verify with an actual grep/count command run against the live file — never trust a prior comment or doc reference. Indentation quirks (e.g. one entry with 0 leading spaces vs. the standard 2) can silently break naive regex-based counts. This has caused count drift twice already.

## 8. Verifying landmark/geography claims from third-party sources

Real estate and imobiliária blog content is a useful research source for bairro pages, but it's optimized to sound impressive, not to be geographically precise — it can misstate which landmarks a neighborhood is actually near, confuse adjacent bairros, or reference things that don't exist (e.g. a "marginal do Rio Paraíba" that isn't a real road). Being internally consistent across multiple sources doesn't guarantee accuracy — several sites can repeat the same imprecise claim.

Before shipping a bairro page's landmark/proximity claims:
- Prefer claims corroborated by 2+ independent sources over a single source, but treat "independent" loosely — check whether sources are actually distinct, not just multiple listings from the same imobiliária network repeating identical copy.
- When the site owner has local knowledge and flags a claim as wrong, that correction overrides any number of web sources — ground truth beats aggregate web consensus.
- If a landmark claim can't be verified and isn't locally confirmed, cut it rather than keep a plausible-sounding but unconfirmed detail. This is the same principle as beliefs.md's "never invent data, ever" principle, extended from prices/timeframes to geography/landmarks.

## 9. Provider attribute fields (women-owned, LGBTQ+ friendly, 24h)

`"Identifies as women-owned"` and `"LGBTQ+ friendly"` require direct provider confirmation — never set from a Google Business Profile badge alone. A GBP badge reflects Google's own attribute system, not a claim the provider necessarily made or would stand behind if asked directly; treating it as equivalent to provider confirmation risks misrepresenting a business's own identity.

`"is_24h"` is fine to source from Google Maps listing data — operating-hours data is objective and Maps is a reasonable source for it, unlike an identity attribute.


Cross-City Provider Policy (adopted Sep 17, 2026)

When a service category in a newly-launched city has fewer than 2 genuine local candidates after an exhausted, multi-angle search (confirmed by trying at least 3-4 distinct search phrasings, same rigor as Guará's Encanador search), providers may be cross-listed from a neighboring city within ~10km, subject to ALL of the following:

Exhausted search first. This is a last resort for a category, not a shortcut — only applies after genuine local search has failed, the same way Guará's Encanador search failed across 4 distinct query angles before this was considered.
Genuine willingness-to-travel evidence required, not proximity alone. At least one of:
The provider's Maps listing explicitly states a service area including the target city, OR
At least one review is from a customer in the target city, confirming the provider actually traveled there, OR
The business name/description explicitly claims regional coverage (e.g. "e região," a named multi-city area)
Scope discipline: only applies to the specific category(ies) with a confirmed gap. Categories that are already well-supplied locally never get cross-listed additions, regardless of how close a neighboring city is — this isn't a general roster-padding tool.
Explicit, honest labeling on the live page: the provider's listing must clearly state it's based in the neighboring city and travels to the target city (e.g. "Baseado em Aparecida, atende também Guaratinguetá") — never presented as if the provider is locally based, since that would be a false claim on a directory whose core value is verified accuracy.
Standard verification still applies: same 4+ star / meaningful review count / on-site-services-confirmed bar as any other listing — cross-listing lowers the geographic bar, not the quality bar.