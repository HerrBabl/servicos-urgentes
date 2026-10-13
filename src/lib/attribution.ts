// First-touch attribution for provider click tracking.
//
// The first page a visitor lands on in a session records its utm_* params,
// document.referrer and path in sessionStorage. Every later click insert reads
// that record, so a click on page 3 is still tied to the social post that
// brought the visitor in. UTMs are never appended to internal links.
//
// Every storage read and write is wrapped in try/catch: private windows and
// blocked site data throw, and the page must work without them.

const STORAGE_KEY = 'su_attribution';

export interface Attribution {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  referrer: string | null;
  landing_path: string | null;
}

const EMPTY: Attribution = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_content: null,
  referrer: null,
  landing_path: null,
};

// Keep values short and printable so a hostile query string cannot bloat a row.
function clean(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim().slice(0, 200);
  return trimmed || null;
}

function readStored(): Attribution | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : null;
  } catch {
    return null;
  }
}

// Call once per page load. Does nothing if this session already has a record.
export function captureAttribution(): void {
  try {
    if (readStored()) return;
    const params = new URLSearchParams(window.location.search);
    const record: Attribution = {
      utm_source: clean(params.get('utm_source')),
      utm_medium: clean(params.get('utm_medium')),
      utm_campaign: clean(params.get('utm_campaign')),
      utm_content: clean(params.get('utm_content')),
      referrer: clean(document.referrer),
      landing_path: clean(window.location.pathname),
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable: attribution is simply skipped.
  }
}

// Falls back to the current page's own values when storage is unavailable, so
// the click insert always has something sensible and never throws.
export function getAttribution(): Attribution {
  const stored = readStored();
  if (stored) return stored;
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: clean(params.get('utm_source')),
      utm_medium: clean(params.get('utm_medium')),
      utm_campaign: clean(params.get('utm_campaign')),
      utm_content: clean(params.get('utm_content')),
      referrer: clean(document.referrer),
      landing_path: clean(window.location.pathname),
    };
  } catch {
    return { ...EMPTY };
  }
}
