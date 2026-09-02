// src/data/services.ts
//
// Extracted from src/pages/servicos/[service]/[neighborhood].astro on 2026-09-01.
// Same reason as neighborhoods.ts's extraction (2026-08-31): a route file that
// also exports getStaticPaths() cannot export a second top-level const without
// breaking Astro's esbuild parse pass. This data also needed to be importable
// from the new src/pages/servicos/[service]/[city]/index.astro route.
//
// WHY: Dynamic content per service = unique page per combo, avoids thin/doorway flag
// SEO: faqTemplate() generates 5 natural-language Q&As per page for FAQPage schema
//      whatToDo[] and prevention[] provide 400+ words of unique editorial content
// SAFETY: Electrical & gas whatToDo[] NEVER gives DIY repair steps — always redirects
//         to professional or Bombeiros (193). Project instruction — non-negotiable.

import { ar_condicionado } from './ar_condicionado.js';
import { chaveiros }       from './chaveiros.js';
import { eletricistas }    from './eletricistas.js';
import { encanadores }     from './encanadores.js';
import { maridos }         from './maridos.js';

export const serviceContext: Record<string, {
  displayName: string;
  displayNamePlural: string;
  titleName: string;
  icon: string;
  emergencyVerb: string;
  urgencyPhrase: string;
  whatToDo: string[];
  prevention: string[];
  relatedServices: { slug: string; name: string; icon: string }[];
  faqTemplate: (neighborhood: string, hasPricing: boolean) => { question: string; answer: string }[];
  localData: any[];
  color: string;
  heroKeyword: string;
}> = {

  // ── ENCANADOR ──────────────────────────────────────────────────────────────
  'encanador': {
    displayName: 'Encanador',
    titleName: 'Encanador',
    displayNamePlural: 'Encanadores',
    icon: '🔧',
    emergencyVerb: 'vazamento',
    urgencyPhrase: 'Cada minuto de vazamento aumenta o dano — não espere',
    // SAFETY: Only safe containment steps — no DIY pipe repair instructions
    whatToDo: [
      'Feche o registro geral de água imediatamente (fica perto do hidrômetro ou na entrada do apartamento).',
      'Desligue os disjuntores de circuitos próximos à área molhada para eliminar risco elétrico.',
      'Fotografe o dano antes de qualquer limpeza — essencial para acionamento do seguro.',
      'Chame um encanador verificado imediatamente para diagnóstico — não tente reparos improvisados em tubulação pressurizada.',
    ],
    prevention: [
      'Faça revisão anual de registros, caixas d\'água e flexíveis de pias e vasos sanitários.',
      'Instale válvulas redutoras de pressão se morar em andar alto — previne rompimento de flexíveis.',
      'Cheque calhas e rufos antes da temporada de chuvas (outubro–março em SJC).',
    ],
    relatedServices: [
      { slug: 'eletricista',       name: 'Eletricista',       icon: '⚡' },
      { slug: 'marido-de-aluguel', name: 'Marido de Aluguel', icon: '🛠️' },
      { slug: 'ar-condicionado',   name: 'Ar-Condicionado',   icon: '❄️' },
    ],
    faqTemplate: (neighborhood: string, hasPricing: boolean) => [
      {
        question: `Encanador atende ${neighborhood} 24 horas?`,
        answer: `Sim. Profissionais cadastrados em nosso diretório atendem emergências hidráulicas em ${neighborhood} 24h por dia, incluindo madrugadas, finais de semana e feriados. O tempo médio de chegada varia conforme o horário e a localização dentro do bairro — em pico de trânsito, preveja 10–15 minutos a mais.`,
      },
      {
        question: `Quanto custa um encanador em ${neighborhood}?`,
        answer: hasPricing
          ? `O valor varia conforme o serviço: visita técnica simples R$ 80–150, desentupimento de pia ou vaso sanitário R$ 150–300, caça-vazamento eletrônico com geofone R$ 350–600, troca de registro ou flexível R$ 120–250. Emergências noturnas (22h–6h) ou em fins de semana têm acréscimo de 30–50%. Solicite orçamento antes de autorizar qualquer serviço.`
          : `Ainda não temos valores médios verificados para encanadores em ${neighborhood}. Peça um orçamento gratuito diretamente ao profissional antes de autorizar qualquer serviço — o valor varia conforme o problema (visita simples, desentupimento, caça-vazamento) e o horário do atendimento.`,
      },
      {
        question: `Qual o tempo de chegada de um encanador em ${neighborhood}?`,
        answer: `Em situações de emergência — vazamento grave, cano estourado — profissionais da região chegam em média em 25–50 minutos dependendo do horário. Em horário comercial (9h–18h) o trânsito em SJC pode estender o prazo. Tenha o endereço completo e o acesso ao registro geral prontos para agilizar o atendimento.`,
      },
      {
        question: `O que fazer enquanto espero o encanador chegar em ${neighborhood}?`,
        answer: `Feche imediatamente o registro geral de água. Se houver risco de curto-circuito pela umidade, desligue os disjuntores da área afetada. Fotografe o dano para registro. Não tente fazer reparos improvisados em tubulações sob pressão — o risco de agravamento é alto. Retire objetos de valor da área úmida e aguarde o profissional com segurança.`,
      },
      {
        question: `Encanador faz caça-vazamento sem quebrar paredes em ${neighborhood}?`,
        answer: `Sim. Profissionais equipados com geofone eletrônico localizam vazamentos ocultos sem necessidade de demolir toda a parede. O equipamento detecta o som do vazamento e aponta o ponto exato. Em imóveis de ${neighborhood}, essa tecnologia evita obras desnecessárias e reduz significativamente o custo total do reparo.`,
      },
    ],
    localData: encanadores,
    color: 'blue',
    heroKeyword: 'Encanador 24h',
  },

  // ── ELETRICISTA ────────────────────────────────────────────────────────────
  'eletricista': {
    displayName: 'Eletricista',
    titleName: 'Eletricista',
    displayNamePlural: 'Eletricistas',
    icon: '⚡',
    emergencyVerb: 'problema elétrico',
    urgencyPhrase: 'Problemas elétricos são emergências — risco de incêndio e choque',
    // SAFETY CRITICAL: Zero DIY electrical steps. Always redirect to professional/Bombeiros.
    // Project instruction: never provide step-by-step instructions for electrical work.
    whatToDo: [
      'NUNCA toque em fios expostos ou equipamentos elétricos úmidos — risco de morte.',
      'Desligue o disjuntor geral da residência pelo lado seco do quadro.',
      'Se houver cheiro de queimado, faíscas visíveis ou fumaça: saia do ambiente e ligue para o Corpo de Bombeiros (193) imediatamente.',
      'Chame um eletricista verificado para diagnóstico — não tente qualquer reparo elétrico sozinho.',
    ],
    prevention: [
      'Instale DPS (Dispositivo de Proteção contra Surtos) no quadro elétrico para proteger equipamentos.',
      'Revise o quadro elétrico a cada 5 anos — disjuntores e fiação têm vida útil limitada.',
      'Não sobrecarregue tomadas com extensões e filtros de linha em cascata.',
    ],
    relatedServices: [
      { slug: 'encanador',         name: 'Encanador',         icon: '🔧' },
      { slug: 'ar-condicionado',   name: 'Ar-Condicionado',   icon: '❄️' },
      { slug: 'marido-de-aluguel', name: 'Marido de Aluguel', icon: '🛠️' },
    ],
    faqTemplate: (neighborhood: string, hasPricing: boolean) => [
      {
        question: `Eletricista atende ${neighborhood} 24 horas?`,
        answer: `Sim. Eletricistas cadastrados em nosso diretório atendem emergências em ${neighborhood} em qualquer horário. Para situações com risco imediato — fio partido, curto com faíscas, cheiro de queimado — ligue também para o Corpo de Bombeiros (193) enquanto aguarda o profissional. Não fique no ambiente até a situação ser avaliada.`,
      },
      {
        question: `Quanto custa um eletricista emergencial em ${neighborhood}?`,
        answer: hasPricing
          ? `Valores médios em SJC: visita técnica R$ 80–150, troca de disjuntor simples R$ 80–200, instalação de tomada ou ponto de luz R$ 100–200, modernização de quadro elétrico R$ 500–1.500. Atendimentos noturnos e em fins de semana têm acréscimo de 30–50%. Sempre confirme o valor total antes de autorizar o serviço.`
          : `Ainda não temos valores médios verificados para eletricistas em ${neighborhood}. Peça um orçamento gratuito antes de autorizar qualquer serviço — o valor varia conforme o tipo de reparo (troca de disjuntor, instalação de ponto, modernização de quadro) e o horário do atendimento.`,
      },
      {
        question: `Disjuntor caindo é emergência em ${neighborhood}?`,
        answer: `Depende da frequência. Se o disjuntor cai uma vez após sobrecarga pontual, pode ser ajuste de carga. Se cai repetidamente sem sobrecarga evidente, indica problema na fiação, no próprio disjuntor ou subdimensionamento — chame um eletricista. Em ${neighborhood}, especialmente em imóveis mais antigos, fiação subdimensionada é causa comum desse sintoma.`,
      },
      {
        question: `Eletricista instala ar-condicionado em ${neighborhood}?`,
        answer: `Sim. A instalação elétrica do ar-condicionado — ponto dedicado, disjuntor específico e fiação calibrada para a potência — deve ser feita por eletricista qualificado, não pelo técnico de AC. Em ${neighborhood}, verifique se o quadro suporta a carga adicional antes da compra do equipamento para evitar retrabalho.`,
      },
      {
        question: `O que fazer em caso de falta de luz em ${neighborhood}?`,
        answer: `Primeiro verifique se é falta da EDP (distribuidora) ou problema interno: acesse o quadro elétrico e veja se algum disjuntor desarmou. Se todos os disjuntores estiverem normais, a falta é da concessionária — registre na EDP São Paulo (0800 721 0123, 24h). Se houver disjuntor desarmado com cheiro de queimado, chame um eletricista antes de tentar religar.`,
      },
    ],
    localData: eletricistas,
    color: 'yellow',
    heroKeyword: 'Eletricista de Emergência',
  },

  // ── CHAVEIRO ───────────────────────────────────────────────────────────────
  'chaveiro': {
    displayName: 'Chaveiro',
    titleName: 'Chaveiro',
    displayNamePlural: 'Chaveiros',
    icon: '🔑',
    emergencyVerb: 'porta trancada',
    urgencyPhrase: 'Trancado para fora é estressante — profissionais chegam sem danificar sua fechadura',
    whatToDo: [
      'Mantenha a calma — forçar a porta por conta própria costuma causar danos maiores e mais caros.',
      'Verifique se há janelas acessíveis de forma segura (apenas térreo e com boa iluminação).',
      'Contate um chaveiro verificado — informe o modelo e marca da fechadura se souber.',
      'Fique em local seguro e bem iluminado para receber o profissional.',
    ],
    prevention: [
      'Deixe uma cópia de chave com familiar ou vizinho de confiança.',
      'Instale fechadura com chave codificada — mais segura e com cópias controladas.',
      'Considere uma fechadura digital para eliminar definitivamente o risco de ficar sem acesso.',
    ],
    relatedServices: [
      { slug: 'eletricista',       name: 'Eletricista',       icon: '⚡' },
      { slug: 'marido-de-aluguel', name: 'Marido de Aluguel', icon: '🛠️' },
      { slug: 'encanador',         name: 'Encanador',         icon: '🔧' },
    ],
    faqTemplate: (neighborhood: string, hasPricing: boolean) => [
      {
        question: `Chaveiro atende ${neighborhood} 24 horas?`,
        answer: `Sim. Chaveiros cadastrados em nosso diretório atendem emergências de porta trancada em ${neighborhood} em qualquer horário, incluindo madrugadas e feriados. A maioria opera com atendimento prioritário para não deixar o cliente vulnerável na rua por tempo prolongado.`,
      },
      {
        question: `Quanto custa abrir uma porta trancada em ${neighborhood}?`,
        answer: hasPricing
          ? `Abertura de porta residencial simples em SJC varia de R$ 80–180 em horário comercial. Fechaduras tetra, penta ou de alta segurança custam R$ 200–400. Atendimentos noturnos (22h–6h) e fins de semana têm acréscimo de 30–50%. Troca de cilindro ou fechadura após a abertura é orçada separadamente. Confirme o valor completo antes de autorizar.`
          : `Ainda não temos valores médios verificados para chaveiros em ${neighborhood}. Peça um orçamento gratuito antes de autorizar o serviço — o valor varia conforme o tipo de fechadura e o horário do atendimento.`,
      },
      {
        question: `Chaveiro abre porta sem danificar a fechadura em ${neighborhood}?`,
        answer: `Profissionais qualificados utilizam técnicas de abertura não destrutiva — lockpicking e decodificação — que preservam a fechadura original. Em ${neighborhood}, especialmente em apartamentos de condomínio, isso evita a necessidade de troca imediata de toda a fechadura. Solicite especificamente "abertura sem dano" ao contatar o profissional.`,
      },
      {
        question: `Chaveiro faz cópia de chave codificada em ${neighborhood}?`,
        answer: `Sim, mas requer equipamento específico. Chaves codificadas (tipo Yale, Mul-T-Lock, ASSA) precisam de máquina de corte especial e, em alguns modelos, autorização da cerralheria fabricante. Em ${neighborhood}, solicite esse serviço com hora marcada — nem todo chaveiro de emergência dispõe do equipamento completo para codificadas.`,
      },
      {
        question: `Quanto tempo um chaveiro leva para chegar em ${neighborhood}?`,
        answer: `Profissionais da região atendem ${neighborhood} com tempo médio de chegada de 20–40 minutos, dependendo do horário e da localização específica no bairro. Informe referências locais para facilitar o acesso, especialmente em condomínios com portaria controlada ou endereços internos sem numeração visível da rua.`,
      },
    ],
    localData: chaveiros,
    color: 'orange',
    heroKeyword: 'Chaveiro 24h',
  },

  // ── AR-CONDICIONADO ────────────────────────────────────────────────────────
  'ar-condicionado': {
    displayName: 'Técnico de Ar-Condicionado',
    titleName: 'Ar-Condicionado',
    displayNamePlural: 'Técnicos de Ar-Condicionado',
    icon: '❄️',
    emergencyVerb: 'problema no ar-condicionado',
    urgencyPhrase: 'No calor de SJC, AC parado é emergência — especialmente com crianças e idosos',
    whatToDo: [
      'Desligue o aparelho e aguarde 10–15 minutos antes de tentar religá-lo (reset térmico).',
      'Verifique se o disjuntor específico do AC desarmou no quadro elétrico.',
      'Limpe o filtro de ar — lavável em água corrente — filtro sujo é a causa nº 1 de falhas e bloqueios.',
      'Se pingar água internamente ou emitir cheiro de queimado: mantenha desligado e chame o técnico imediatamente.',
    ],
    prevention: [
      'Faça higienização química das serpentinas (limpeza profissional) anualmente — ou semestralmente em bairros mais empoeirados.',
      'Limpe o filtro básico mensalmente com água corrente — leva 5 minutos e evita a maioria das falhas.',
      'Verifique o dreno externo antes da temporada de chuvas (outubro em SJC) para evitar goteiras internas.',
    ],
    relatedServices: [
      { slug: 'eletricista',       name: 'Eletricista',       icon: '⚡' },
      { slug: 'marido-de-aluguel', name: 'Marido de Aluguel', icon: '🛠️' },
      { slug: 'encanador',         name: 'Encanador',         icon: '🔧' },
    ],
    faqTemplate: (neighborhood: string, hasPricing: boolean) => [
      {
        question: `Técnico de ar-condicionado atende ${neighborhood} 24 horas?`,
        answer: `Sim. Técnicos cadastrados em nosso diretório atendem ${neighborhood} em horário estendido, incluindo finais de semana. Para emergências com crianças pequenas, idosos ou ambientes de saúde — como clínicas e consultórios em ${neighborhood} — informe ao solicitar, pois alguns profissionais priorizam esses atendimentos.`,
      },
      {
        question: `Quanto custa limpeza de ar-condicionado em ${neighborhood}?`,
        answer: hasPricing
          ? `Higienização completa (serpentinas + dreno + bandeja) de split 9.000–12.000 BTUs em SJC varia de R$ 200–350 por aparelho. Recarga de gás refrigerante R$ 250–500. Troca de placa eletrônica R$ 400–900. Instalação de novo split — mão de obra — R$ 300–500. Confirme com o técnico antes de autorizar qualquer serviço.`
          : `Ainda não temos valores médios verificados para técnicos de ar-condicionado em ${neighborhood}. Peça um orçamento gratuito antes de autorizar qualquer serviço — o valor varia conforme o tipo de atendimento (limpeza, recarga de gás, reparo) e a potência do aparelho.`,
      },
      {
        question: `Por que o AC pinga água dentro do quarto em ${neighborhood}?`,
        answer: `Em ${neighborhood}, especialmente durante a temporada chuvosa (outubro–março), o aparelho condensa mais água do que o dreno consegue escoar — principalmente se houver biofilme (lodo) bloqueando a saída. Outras causas: desnível na instalação ou vento contrário ao dreno externo, comum em apartamentos altos. Chame um técnico para limpeza do dreno.`,
      },
      {
        question: `AC não gela mesmo ligado — o que fazer em ${neighborhood}?`,
        answer: `As causas mais comuns são: filtro entupido (limpe e aguarde 30 min), falta de gás refrigerante (exige técnico certificado — não é DIY), compressor com defeito ou serpentina suja. Se a limpeza do filtro não resolver em 30 minutos, o problema é interno e requer diagnóstico profissional em ${neighborhood}.`,
      },
      {
        question: `Com que frequência fazer manutenção de AC em ${neighborhood}?`,
        answer: `Para uso residencial padrão em SJC: limpeza de filtro mensal (você mesmo, água corrente) e higienização técnica anual. Em ${neighborhood}, bairros com obras próximas, muito trânsito ou densa vegetação, recomenda-se higienização semestral para evitar acúmulo de fungos e biofilme nas serpentinas, que reduzem a eficiência e aumentam o consumo de energia.`,
      },
    ],
    localData: ar_condicionado,
    color: 'cyan',
    heroKeyword: 'Técnico de Ar-Condicionado',
  },

  // ── MARIDO-DE-ALUGUEL ──────────────────────────────────────────────────────
  'marido-de-aluguel': {
    displayName: 'Marido de Aluguel',
    titleName: 'Marido de Aluguel',
    displayNamePlural: 'Profissionais Marido de Aluguel',
    icon: '🛠️',
    emergencyVerb: 'reparo urgente',
    urgencyPhrase: 'Reparos pequenos ignorados viram grandes problemas — resolva agora',
    whatToDo: [
      'Liste todos os reparos necessários — profissionais multifuncionais resolvem vários em uma única visita.',
      'Separe materiais que você já tem (parafusos, buchas, lâmpadas) para agilizar e reduzir custo.',
      'Tire fotos dos pontos que precisam de reparo para mostrar ao profissional no primeiro contato.',
      'Informe o tipo de parede (alvenaria, drywall, madeira) — impacta a técnica e as ferramentas necessárias.',
    ],
    prevention: [
      'Faça uma vistoria trimestral: verifique dobradiças, vedações, rejuntes e tomadas frouxas.',
      'Não adie pequenos reparos — uma torneira pingando desperdiça mais de 50 litros por dia e deteriora a alvenaria.',
      'Mantenha um kit básico (chave de fenda, alicate, fita veda-rosca) para emergências menores.',
    ],
    relatedServices: [
      { slug: 'encanador',   name: 'Encanador',  icon: '🔧' },
      { slug: 'eletricista', name: 'Eletricista', icon: '⚡' },
      { slug: 'chaveiro',    name: 'Chaveiro',    icon: '🔑' },
    ],
    faqTemplate: (neighborhood: string, hasPricing: boolean) => [
      {
        question: `Marido de aluguel atende ${neighborhood}?`,
        answer: `Sim. Profissionais multifuncionais cadastrados em nosso diretório atendem ${neighborhood} para reparos gerais, montagem de móveis, instalações e pequenas obras. Ideal para resolver vários problemas em uma única visita — economizando tempo e o custo de deslocamento de múltiplos especialistas.`,
      },
      {
        question: `Quanto custa marido de aluguel em ${neighborhood}?`,
        answer: hasPricing
          ? `O valor é cobrado por hora (R$ 80–150/hora em SJC) ou por serviço: montagem de móvel simples R$ 60–120, instalação de prateleira R$ 50–100, troca de torneira R$ 80–150, fixação de suporte de TV R$ 80–200. Materiais são cobrados à parte. Confirme a forma de cobrança (hora ou serviço fechado) antes de iniciar.`
          : `Ainda não temos valores médios verificados para profissionais marido de aluguel em ${neighborhood}. Peça um orçamento gratuito antes de iniciar — o valor varia conforme a cobrança (por hora ou por serviço) e a lista de reparos.`,
      },
      {
        question: `Marido de aluguel faz instalação elétrica e hidráulica em ${neighborhood}?`,
        answer: `Pequenas instalações — troca de tomada, luminária, torneira — são serviços comuns. Para trabalhos mais complexos como quadro elétrico, caça-vazamento ou instalação de chuveiro elétrico, é mais seguro contratar eletricista ou encanador especializado. O profissional avalia no local e indica quando o serviço exige especialista.`,
      },
      {
        question: `Marido de aluguel monta qualquer móvel em ${neighborhood}?`,
        answer: `Sim. Montagem de móveis Tok&Stok, IKEA, MadeiraMadeira e demais fabricantes é serviço padrão. Em ${neighborhood}, especialmente em apartamentos com paredes de drywall — comuns em empreendimentos novos — informe o tipo de parede para que o profissional traga fixadores adequados e garanta a segurança da instalação.`,
      },
      {
        question: `Quanto tempo dura uma visita de marido de aluguel em ${neighborhood}?`,
        answer: `Depende da lista de serviços. Um reparo simples (troca de torneira, fixação de prateleira) leva 30–60 minutos. Uma lista com 4–6 reparos pode ocupar meio período (3–4 horas). Para otimizar o custo em ${neighborhood}, agrupe todos os reparos necessários em uma única visita — profissionais trabalham com maior eficiência em listas completas.`,
      },
    ],
    localData: maridos,
    color: 'green',
    heroKeyword: 'Marido de Aluguel',
  },
};
