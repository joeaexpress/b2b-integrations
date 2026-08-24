/**
 * Affiliate & Partner Referral URL Builder with Dynamic Sub-ID Tracking
 * 
 * Supports both Middleware partners (Make.com, Zapier) and Direct SaaS Software
 * partner programs (HubSpot, Shopify, QuickBooks, Airtable, ClickUp, Monday, etc.)
 * with automated Sub-ID and UTM attribution telemetry.
 */

export interface AffiliateUrlOptions {
  toolA?: string;
  toolB?: string;
  position?: 'hero_cta' | 'sidebar_cta' | 'body_link' | 'footer_link' | 'prereq_box' | 'tool_hub' | 'roi_calculator';
  customParams?: Record<string, string>;
}

export interface ToolPartnerInfo {
  toolName: string;
  affiliateUrl: string;
  offerText: string;
  ctaText: string;
  network: string;
  hasSpecialOffer: boolean;
}

interface ToolPartnerConfig {
  name: string;
  aliases: string[];
  defaultBaseUrl: string;
  envVarKey: string;
  offerText: string;
  ctaText: string;
  network: string;
  subIdParam?: string;
}

/**
 * Direct SaaS Affiliate & Partner Program Registry
 */
const TOOL_PARTNER_REGISTRY: ToolPartnerConfig[] = [
  {
    name: 'HubSpot',
    aliases: ['hubspot', 'hubspot crm', 'hubspot marketing'],
    defaultBaseUrl: 'https://www.hubspot.com/products/get-started?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_HUBSPOT_AFFILIATE_URL',
    offerText: 'Free CRM + 14-Day Pro Suite Trial',
    ctaText: 'Start HubSpot Free Trial',
    network: 'Impact',
    subIdParam: 'subid',
  },
  {
    name: 'Shopify',
    aliases: ['shopify', 'shopify plus'],
    defaultBaseUrl: 'https://www.shopify.com/free-trial?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_SHOPIFY_AFFILIATE_URL',
    offerText: 'Free 3-Day Trial + $1/mo for 3 Months',
    ctaText: 'Start Shopify for $1/mo',
    network: 'Impact',
    subIdParam: 'subid',
  },
  {
    name: 'QuickBooks',
    aliases: ['quickbooks', 'quickbooks online', 'intuit quickbooks'],
    defaultBaseUrl: 'https://quickbooks.intuit.com/pricing/?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_QUICKBOOKS_AFFILIATE_URL',
    offerText: '30-Day Free Trial or 50% Off 3 Months',
    ctaText: 'Try QuickBooks Online',
    network: 'Impact',
    subIdParam: 'subid',
  },
  {
    name: 'Airtable',
    aliases: ['airtable'],
    defaultBaseUrl: 'https://airtable.com/signup?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_AIRTABLE_AFFILIATE_URL',
    offerText: 'Free Forever Tier • No Credit Card Required',
    ctaText: 'Create Free Airtable Account',
    network: 'Direct',
    subIdParam: 'ref',
  },
  {
    name: 'Notion',
    aliases: ['notion'],
    defaultBaseUrl: 'https://www.notion.so/signup?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_NOTION_AFFILIATE_URL',
    offerText: 'Free Personal & Team Workspace Trial',
    ctaText: 'Get Started with Notion',
    network: 'Rewardful',
    subIdParam: 'via',
  },
  {
    name: 'ClickUp',
    aliases: ['clickup'],
    defaultBaseUrl: 'https://clickup.com/signup?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_CLICKUP_AFFILIATE_URL',
    offerText: 'Free Forever Plan + Unlimited Storage Trial',
    ctaText: 'Start ClickUp for Free',
    network: 'PartnerStack',
    subIdParam: 'sid',
  },
  {
    name: 'Monday.com',
    aliases: ['monday', 'monday.com', 'monday work os'],
    defaultBaseUrl: 'https://monday.com/pricing/?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_MONDAY_AFFILIATE_URL',
    offerText: '14-Day Free Pro Trial • No Credit Card',
    ctaText: 'Try Monday.com Pro Free',
    network: 'Impact',
    subIdParam: 'subid',
  },
  {
    name: 'Pipedrive',
    aliases: ['pipedrive', 'pipedrive crm'],
    defaultBaseUrl: 'https://www.pipedrive.com/en/trial?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_PIPEDRIVE_AFFILIATE_URL',
    offerText: '14-Day Extended Free Trial',
    ctaText: 'Try Pipedrive CRM Free',
    network: 'PartnerStack',
    subIdParam: 'sid',
  },
  {
    name: 'ActiveCampaign',
    aliases: ['activecampaign'],
    defaultBaseUrl: 'https://www.activecampaign.com/free-trial?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_ACTIVECAMPAIGN_AFFILIATE_URL',
    offerText: '14-Day Full Feature Free Trial',
    ctaText: 'Start ActiveCampaign Trial',
    network: 'Impact',
    subIdParam: 'subid',
  },
  {
    name: 'Klaviyo',
    aliases: ['klaviyo'],
    defaultBaseUrl: 'https://www.klaviyo.com/sign-up?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_KLAVIYO_AFFILIATE_URL',
    offerText: 'Free Account Up to 250 Contacts',
    ctaText: 'Create Free Klaviyo Account',
    network: 'Direct',
    subIdParam: 'ref',
  },
  {
    name: 'Typeform',
    aliases: ['typeform'],
    defaultBaseUrl: 'https://www.typeform.com/signup?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_TYPEFORM_AFFILIATE_URL',
    offerText: 'Free Plan Available • Instant Form Builder',
    ctaText: 'Try Typeform Free',
    network: 'Impact',
    subIdParam: 'subid',
  },
  {
    name: 'Calendly',
    aliases: ['calendly'],
    defaultBaseUrl: 'https://calendly.com/signup?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_CALENDLY_AFFILIATE_URL',
    offerText: '14-Day Free Trial of Teams Plan',
    ctaText: 'Sign Up for Calendly Free',
    network: 'Direct',
    subIdParam: 'ref',
  },
  {
    name: 'Intercom',
    aliases: ['intercom'],
    defaultBaseUrl: 'https://www.intercom.com/early-stage?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_INTERCOM_AFFILIATE_URL',
    offerText: '14-Day Free Trial + Early Stage Discounts',
    ctaText: 'Try Intercom AI Customer Service',
    network: 'Direct',
    subIdParam: 'ref',
  },
  {
    name: 'Webflow',
    aliases: ['webflow'],
    defaultBaseUrl: 'https://webflow.com/dashboard/signup?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_WEBFLOW_AFFILIATE_URL',
    offerText: 'Build Free on Starter Tier',
    ctaText: 'Start Building on Webflow',
    network: 'Impact',
    subIdParam: 'subid',
  },
  {
    name: 'Salesforce',
    aliases: ['salesforce', 'salesforce crm'],
    defaultBaseUrl: 'https://www.salesforce.com/form/signup/starter-pricing-overview/?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_SALESFORCE_AFFILIATE_URL',
    offerText: '30-Day Free Starter Suite Trial',
    ctaText: 'Start Salesforce Free Trial',
    network: 'Direct',
    subIdParam: 'ref',
  },
  {
    name: 'Zendesk',
    aliases: ['zendesk', 'zendesk support'],
    defaultBaseUrl: 'https://www.zendesk.com/register/free-trial/?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_ZENDESK_AFFILIATE_URL',
    offerText: '14-Day Free Suite Trial',
    ctaText: 'Try Zendesk Suite Free',
    network: 'Impact',
    subIdParam: 'subid',
  },
  {
    name: 'Freshdesk',
    aliases: ['freshdesk', 'freshworks'],
    defaultBaseUrl: 'https://www.freshworks.com/freshdesk/signup/?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_FRESHDESK_AFFILIATE_URL',
    offerText: 'Free 21-Day Trial of Enterprise Plan',
    ctaText: 'Try Freshdesk Free',
    network: 'PartnerStack',
    subIdParam: 'sid',
  },
  {
    name: 'DocuSign',
    aliases: ['docusign'],
    defaultBaseUrl: 'https://www.docusign.com/products/electronic-signature/free-trial?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_DOCUSIGN_AFFILIATE_URL',
    offerText: '30-Day Free eSignature Trial',
    ctaText: 'Try DocuSign eSignature Free',
    network: 'Impact',
    subIdParam: 'subid',
  },
  {
    name: 'PandaDoc',
    aliases: ['pandadoc'],
    defaultBaseUrl: 'https://www.pandadoc.com/free-trial/?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_PANDADOC_AFFILIATE_URL',
    offerText: '14-Day Free All-In-One Document Trial',
    ctaText: 'Start PandaDoc Free Trial',
    network: 'PartnerStack',
    subIdParam: 'sid',
  },
  {
    name: 'Chargebee',
    aliases: ['chargebee'],
    defaultBaseUrl: 'https://www.chargebee.com/signup/?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_CHARGEBEE_AFFILIATE_URL',
    offerText: 'Free Sandbox Account + Test Gateway',
    ctaText: 'Create Free Chargebee Sandbox',
    network: 'Direct',
    subIdParam: 'ref',
  },
  {
    name: 'Asana',
    aliases: ['asana'],
    defaultBaseUrl: 'https://asana.com/create-account?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_ASANA_AFFILIATE_URL',
    offerText: '30-Day Free Starter & Advanced Trial',
    ctaText: 'Try Asana Free',
    network: 'Direct',
    subIdParam: 'ref',
  },
  {
    name: 'Close',
    aliases: ['close', 'close crm'],
    defaultBaseUrl: 'https://www.close.com/free-trial?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_CLOSE_AFFILIATE_URL',
    offerText: '14-Day Free CRM Trial • No Credit Card',
    ctaText: 'Try Close CRM Free',
    network: 'Rewardful',
    subIdParam: 'via',
  },
  {
    name: 'Gorgias',
    aliases: ['gorgias'],
    defaultBaseUrl: 'https://www.gorgias.com/signup?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_GORGIAS_AFFILIATE_URL',
    offerText: '7-Day Free eCommerce Helpdesk Trial',
    ctaText: 'Try Gorgias Free',
    network: 'PartnerStack',
    subIdParam: 'sid',
  },
  {
    name: 'Supabase',
    aliases: ['supabase'],
    defaultBaseUrl: 'https://supabase.com/dashboard/sign-up?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_SUPABASE_AFFILIATE_URL',
    offerText: 'Free Database & Auth Tier Included',
    ctaText: 'Create Supabase Database',
    network: 'Direct',
    subIdParam: 'ref',
  },
  {
    name: 'Stripe',
    aliases: ['stripe'],
    defaultBaseUrl: 'https://dashboard.stripe.com/register?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_STRIPE_AFFILIATE_URL',
    offerText: 'Instant Payment Account Setup',
    ctaText: 'Sign Up for Stripe',
    network: 'Direct',
    subIdParam: 'ref',
  },
  {
    name: 'Slack',
    aliases: ['slack'],
    defaultBaseUrl: 'https://slack.com/get-started?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_SLACK_AFFILIATE_URL',
    offerText: 'Free Workspace with 90-Day History',
    ctaText: 'Create Free Slack Workspace',
    network: 'Direct',
    subIdParam: 'ref',
  },
  {
    name: 'Xero',
    aliases: ['xero'],
    defaultBaseUrl: 'https://www.xero.com/us/signup/?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_XERO_AFFILIATE_URL',
    offerText: '30-Day Free Accounting Trial',
    ctaText: 'Start Xero 30-Day Trial',
    network: 'Impact',
    subIdParam: 'subid',
  },
  {
    name: 'Jira',
    aliases: ['jira', 'atlassian jira'],
    defaultBaseUrl: 'https://www.atlassian.com/software/jira/pricing?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_JIRA_AFFILIATE_URL',
    offerText: 'Free for Up to 10 Users',
    ctaText: 'Get Jira Free Tier',
    network: 'Direct',
    subIdParam: 'ref',
  },
  {
    name: 'Recurly',
    aliases: ['recurly'],
    defaultBaseUrl: 'https://recurly.com/pricing/?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_RECURLY_AFFILIATE_URL',
    offerText: 'Free Developer Sandbox Environment',
    ctaText: 'Explore Recurly Billing',
    network: 'Direct',
    subIdParam: 'ref',
  },
  {
    name: 'Zoho CRM',
    aliases: ['zoho', 'zoho crm'],
    defaultBaseUrl: 'https://www.zoho.com/crm/signup.html?ref=b2bsaasdirectory',
    envVarKey: 'PUBLIC_ZOHO_AFFILIATE_URL',
    offerText: '15-Day Free Enterprise Trial',
    ctaText: 'Start Zoho CRM Trial',
    network: 'Direct',
    subIdParam: 'ref',
  },
];

/**
 * Normalizes tool name for robust lookup.
 */
function normalizeName(str: string): string {
  return (str || '').toLowerCase().trim().replace(/[^a-z0-9]/g, '');
}

/**
 * Retrieves direct affiliate / partner referral information for a specific SaaS tool.
 * 
 * @param toolName The name of the software tool (e.g. 'HubSpot', 'Shopify', 'QuickBooks')
 * @param integrationSlug The current integration page slug for Sub-ID attribution (optional)
 * @param position Placement identifier for conversion tracking (e.g. 'prereq_box', 'tool_hub')
 */
export function getToolAffiliateInfo(
  toolName: string,
  integrationSlug?: string,
  position: string = 'tool_referral'
): ToolPartnerInfo {
  const norm = normalizeName(toolName);
  const matched = TOOL_PARTNER_REGISTRY.find(
    (cfg) =>
      normalizeName(cfg.name) === norm ||
      cfg.aliases.some((alias) => normalizeName(alias) === norm)
  );

  let baseUrl = '';
  let offerText = 'Free Trial or Starter Tier Available';
  let ctaText = `Try ${toolName} Free`;
  let network = 'Direct';
  let subIdParam = 'ref';
  let hasSpecialOffer = false;

  if (matched) {
    // Check if user set an environment variable override for this partner
    const envOverride = (import.meta.env as Record<string, string | undefined>)[matched.envVarKey];
    baseUrl = envOverride && envOverride.trim() !== '' ? envOverride : matched.defaultBaseUrl;
    offerText = matched.offerText;
    ctaText = matched.ctaText;
    network = matched.network;
    subIdParam = matched.subIdParam || 'subid';
    hasSpecialOffer = true;
  } else {
    // Universal Clean Fallback for any tool
    const cleanDomain = toolName.toLowerCase().replace(/[^a-z0-9]/g, '');
    baseUrl = `https://www.${cleanDomain}.com/?ref=b2bsaasdirectory`;
  }

  // Parameterize URL with tracking tags and sub-id
  let affiliateUrl = baseUrl;
  try {
    const url = new URL(baseUrl);
    if (integrationSlug) {
      url.searchParams.set(subIdParam, integrationSlug);
      url.searchParams.set('utm_campaign', integrationSlug);
    }
    url.searchParams.set('utm_source', 'b2b-integrations');
    url.searchParams.set('utm_medium', position);
    url.searchParams.set('utm_content', normalizeName(toolName));
    affiliateUrl = url.toString();
  } catch {
    const sep = baseUrl.includes('?') ? '&' : '?';
    affiliateUrl = `${baseUrl}${sep}utm_source=b2b-integrations&utm_medium=${encodeURIComponent(position)}`;
  }

  return {
    toolName,
    affiliateUrl,
    offerText,
    ctaText,
    network,
    hasSpecialOffer,
  };
}

/**
 * Builds a tracking-parameterized affiliate URL for a given middleware or partner.
 * 
 * @param middleware The recommended automation middleware (e.g. 'Make', 'Zapier')
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

  // Base partner URL from environment variable or standard Make partner default
  let baseUrl =
    import.meta.env.PUBLIC_MAKE_AFFILIATE_URL ||
    'https://www.make.com/en/register?pc=jamlung';

  // If native or unlisted and explicitly None, fallback to internal anchor
  if (normalized === 'none' || normalized === '') {
    return '#step-by-step-guide';
  }

  if (normalized.includes('zapier') && import.meta.env.PUBLIC_ZAPIER_AFFILIATE_URL) {
    baseUrl = import.meta.env.PUBLIC_ZAPIER_AFFILIATE_URL;
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
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}subid=${encodeURIComponent(slug)}&utm_source=b2b-integrations&utm_campaign=${encodeURIComponent(slug)}`;
  }
}

/**
 * Builds a checkout URL for the All-in-One Scenario Vault digital product.
 * Supports Stripe Payment Links, LemonSqueezy, Polar.sh, Gumroad, or fallback interactive checkout modal.
 */
export function getVaultCheckoutUrl(
  tier: 'individual' | 'agency' = 'individual',
  position: string = 'vault_page'
): string {
  const envKey = tier === 'agency' ? 'PUBLIC_AGENCY_VAULT_CHECKOUT_URL' : 'PUBLIC_VAULT_CHECKOUT_URL';
  const customUrl = (import.meta.env as Record<string, string | undefined>)[envKey];

  if (customUrl && customUrl.trim() !== '') {
    try {
      const url = new URL(customUrl.trim());
      url.searchParams.set('utm_source', 'b2b-integrations');
      url.searchParams.set('utm_medium', position);
      url.searchParams.set('utm_campaign', `scenario-vault-${tier}`);
      return url.toString();
    } catch {
      const sep = customUrl.includes('?') ? '&' : '?';
      return `${customUrl}${sep}utm_source=b2b-integrations&utm_medium=${encodeURIComponent(position)}`;
    }
  }

  // Fallback direct checkout modal trigger or anchor on the /vault page
  return `/vault?tier=${tier}#checkout`;
}

