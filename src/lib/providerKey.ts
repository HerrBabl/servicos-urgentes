// Deterministic provider key for the clicks table (clicks.provider_key).
//
// The data files carry no shared id (only maridos.js has an integer id, which
// would collide with the other files), so a provider is identified by its
// display name plus city. This is the only place that slug is built; pages
// read it from the card's data-provider-key attribute and never rebuild it.
//
// Example: ("Torres Manutenção", "São José dos Campos") ->
//          "torres-manutencao-sao-jose-dos-campos"

export function providerKey(name: string, city: string): string {
  return `${name} ${city}`
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
