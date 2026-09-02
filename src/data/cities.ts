// src/data/cities.ts
//
// Extracted from src/pages/[city]/index.astro on 2026-09-01. Same reason as
// neighborhoods.ts and services.ts (Aug 31 – Sep 1, 2026): a route file that
// also exports getStaticPaths() cannot export a second top-level const without
// breaking Astro's esbuild parse pass. This data is also needed by the new
// src/pages/servicos/[service]/[city]/index.astro route — no longer true that
// [city]/index.astro is the only consumer, which is why this moved out.

export const cityHomepageContext: Record<string, {
  displayName: string;
  heroHeadline: string;
  heroSubhead: string;
  metaTitle: string;
  metaDescription: string;
  canonicalURL: string;
}> = {
  'jacarei': {
    displayName: 'Jacareí',
    heroHeadline: 'Emergência Doméstica em Jacareí? Ajuda Agora.',
    heroSubhead: 'Encanador, eletricista, chaveiro, técnico de ar-condicionado e marido de aluguel — profissionais verificados atendendo Jacareí 24 horas.',
    metaTitle: 'Serviços de Emergência 24h em Jacareí | Serviços Urgentes',
    metaDescription: 'Encontre encanador, eletricista, chaveiro, ar-condicionado e marido de aluguel em Jacareí. Profissionais verificados, contato direto, sem intermediação.',
    canonicalURL: 'https://servicosurgentes.com/jacarei/',
  },
};
