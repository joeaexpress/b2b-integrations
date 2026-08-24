/**
 * SaaSConnect Universal Outbound Click & Affiliate Event Telemetry
 * 
 * Intercepts outbound clicks, attributes conversions by partner & integration slug,
 * and seamlessly dispatches events across Google Analytics 4, Plausible, PostHog, and GTM.
 */

export interface TelemetryPayload {
  event: string;
  partner?: string;
  tool_a?: string;
  tool_b?: string;
  slug?: string;
  position?: string;
  destination_url?: string;
  timestamp: number;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
    posthog?: { capture: (eventName: string, properties?: Record<string, any>) => void };
    dataLayer?: any[];
    __SAASCONNECT_TELEMETRY_INITIALIZED__?: boolean;
  }
}

/**
 * Dispatches the event payload to available analytics providers.
 */
export function dispatchTelemetryEvent(payload: TelemetryPayload): void {
  const isDebug =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.localStorage.getItem('debug_telemetry') === 'true');

  if (isDebug) {
    console.groupCollapsed(
      `%c[Telemetry]%c ${payload.event} -> %c${payload.partner || 'Outbound'}%c (${payload.slug || 'direct'})`,
      'background: #3b82f6; color: white; padding: 2px 5px; border-radius: 3px; font-weight: bold;',
      'color: #94a3b8; font-weight: normal;',
      'color: #38bdf8; font-weight: bold;',
      'color: #a855f7;'
    );
    console.table(payload);
    console.groupEnd();
  }

  // 1. Google Analytics 4 (gtag.js)
  if (typeof window.gtag === 'function') {
    try {
      window.gtag('event', payload.event, {
        partner_name: payload.partner,
        tool_a: payload.tool_a,
        tool_b: payload.tool_b,
        integration_slug: payload.slug,
        cta_position: payload.position,
        outbound_destination: payload.destination_url,
      });
    } catch (err) {
      console.warn('[Telemetry] GA4 dispatch failed:', err);
    }
  }

  // 2. Plausible Analytics
  if (typeof window.plausible === 'function') {
    try {
      window.plausible('Outbound Affiliate Click', {
        props: {
          partner: payload.partner,
          slug: payload.slug,
          position: payload.position,
          destination: payload.destination_url,
        },
      });
    } catch (err) {
      console.warn('[Telemetry] Plausible dispatch failed:', err);
    }
  }

  // 3. PostHog
  if (window.posthog && typeof window.posthog.capture === 'function') {
    try {
      window.posthog.capture(payload.event, payload);
    } catch (err) {
      console.warn('[Telemetry] PostHog dispatch failed:', err);
    }
  }

  // 4. Google Tag Manager / DataLayer
  if (Array.isArray(window.dataLayer)) {
    try {
      window.dataLayer.push({
        event: payload.event,
        ...payload,
      });
    } catch (err) {
      console.warn('[Telemetry] DataLayer push failed:', err);
    }
  }

  // 5. Native Custom DOM Event (for client plugins/listeners)
  if (typeof window.dispatchEvent === 'function') {
    try {
      window.dispatchEvent(
        new CustomEvent('saasconnect:telemetry', {
          detail: payload,
          bubbles: true,
        })
      );
    } catch {
      // Ignore if CustomEvent is unsupported
    }
  }
}

/**
 * Initializes global click delegation listener for outbound affiliate and partner links.
 */
export function initTelemetry(): void {
  if (typeof window === 'undefined') return;
  if (window.__SAASCONNECT_TELEMETRY_INITIALIZED__) return;

  window.__SAASCONNECT_TELEMETRY_INITIALIZED__ = true;

  document.addEventListener(
    'click',
    (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest('a') as HTMLAnchorElement | null;
      if (!link) return;

      const eventType = link.dataset.analyticsEvent;
      const isAffiliateCta =
        eventType === 'outbound_affiliate_click' ||
        (link.rel && link.rel.includes('sponsored'));

      if (eventType || isAffiliateCta) {
        const payload: TelemetryPayload = {
          event: eventType || 'outbound_affiliate_click',
          partner: link.dataset.partner || 'Internal',
          tool_a: link.dataset.toolA || '',
          tool_b: link.dataset.toolB || '',
          slug: link.dataset.slug || '',
          position: link.dataset.position || 'body',
          destination_url: link.href || '',
          timestamp: Date.now(),
        };

        dispatchTelemetryEvent(payload);
      }
    },
    { capture: true, passive: true }
  );
}

// Auto-run if executed directly in client context
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTelemetry);
  } else {
    initTelemetry();
  }
}
