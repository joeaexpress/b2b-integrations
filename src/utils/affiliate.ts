/**
 * Affiliate & Middleware Referral URL Builder with Dynamic Sub-ID Tracking
 * 
 * Automatically attaches campaign parameters and sub-tracking IDs to outbound links
 * to support granular Earnings-Per-Click (EPC) telemetry per integration slug.
 */

export interface AffiliateUrlOptions {
  toolA?: string;
  toolB?: string;
  position?: 'hero_cta' | 'sidebar_cta' | 'body_link' | 'footer_link';
  customParams?: Record<string, string>;
}

/**
 * Builds a tracking-parameterized affiliate URL for a given middleware or partner.
 * 
 * @param middleware The recommended automation middleware (e.g. 'Make', 'Zapier', 'Relay', 'n8n')
 * @param slug The unique integration identifier (e.g. 'stripe-to-quickbooks')
 * @param options Optional context including tool names and CTA placement
 * @returns Fully formatted and URL-safe affiliate destination link
 */
export function buildAffiliateUrl(
  middleware: string,
  slug: string,
  options: AffiliateUrlOptions = {}
): string {
  const normalized = (middleware || '').toLowerCase().trim();

  // Determine base partner URL from environment variable or standard default
  let baseUrl = '';

  if (normalized.includes('make') || normalized.includes('integromat')) {
    baseUrl =
      import.meta.env.PUBLIC_MAKE_AFFILIATE_URL ||
      'https://www.make.com/en/register?pc=b2bsaasdirectory';
  } else if (normalized.includes('zapier')) {
    baseUrl =
      import.meta.env.PUBLIC_ZAPIER_AFFILIATE_URL ||
      'https://zapier.com/apps/integrations?ref=b2bsaasdirectory';
  } else {
    // If native or unlisted middleware, fallback to internal anchor
    return '#step-by-step-guide';
  }

  try {
    const url = new URL(baseUrl);

    // Standard Sub-ID parameter for affiliate platforms (e.g. subid, s1, sid)
    url.searchParams.set('subid', slug);

    // UTM Attribution Tags
    url.searchParams.set('utm_source', 'b2b-integrations');
    url.searchParams.set('utm_medium', options.position || 'affiliate_cta');
    url.searchParams.set('utm_campaign', slug);

    if (options.toolA && options.toolB) {
      url.searchParams.set('utm_content', `${options.toolA.toLowerCase()}-${options.toolB.toLowerCase()}`);
    }

    // Append any custom parameters provided
    if (options.customParams) {
      for (const [key, value] of Object.entries(options.customParams)) {
        if (value) {
          url.searchParams.set(key, value);
        }
      }
    }

    return url.toString();
  } catch {
    // Fallback in case of an invalid base URL format
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}subid=${encodeURIComponent(slug)}&utm_source=b2b-integrations&utm_campaign=${encodeURIComponent(slug)}`;
  }
}
