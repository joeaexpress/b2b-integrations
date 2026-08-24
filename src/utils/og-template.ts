// src/utils/og-template.ts - High-resolution 1200x630 Open Graph SVG template generator
import type { IntegrationRecord } from '../types/integration';

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export function generateIntegrationOgSvg(item: IntegrationRecord): string {
  const toolA = escapeXml(item.toolA);
  const toolB = escapeXml(item.toolB);
  const typeText = item.nativeIntegration ? '⚡ Native Direct Sync' : `🔄 ${escapeXml(item.recommendedMiddleware)} Engine`;
  const timeText = `⏱️ ~${item.setupTimeMinutes}m Setup`;
  const diffText = `Level: ${item.difficulty}`;

  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <linearGradient id="pillGradA" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="pillGradB" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="60" result="blur" />
    </filter>
  </defs>

  <!-- Background Layer -->
  <rect width="1200" height="630" fill="url(#bgGrad)" />
  
  <!-- Glowing Background Orbs -->
  <circle cx="200" cy="120" r="220" fill="#6366f1" opacity="0.18" filter="url(#glow)" />
  <circle cx="1050" cy="500" r="260" fill="#10b981" opacity="0.15" filter="url(#glow)" />
  <circle cx="600" cy="300" r="180" fill="#38bdf8" opacity="0.12" filter="url(#glow)" />

  <!-- Outer Border Frame -->
  <rect x="30" y="30" width="1140" height="570" rx="24" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2" />

  <!-- Top Brand Navigation Bar -->
  <g transform="translate(80, 85)">
    <!-- Logo Icon -->
    <rect x="0" y="0" width="44" height="44" rx="10" fill="url(#brandGrad)" />
    <path d="M14 30 L30 14 M30 22 L30 14 L22 14 M14 22 L14 30 L22 30" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    
    <!-- Brand Title -->
    <text x="56" y="28" fill="#ffffff" font-size="24" font-family="system-ui, -apple-system, sans-serif" font-weight="800" letter-spacing="-0.02em">
      SaaS<tspan fill="#38bdf8">Connect</tspan>
    </text>
    <text x="195" y="28" fill="#64748b" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="600">
      • B2B INTEGRATION DIRECTORY
    </text>
  </g>

  <!-- Central Connection Card Container -->
  <g transform="translate(80, 165)">
    <!-- Main Title -->
    <text x="0" y="48" fill="#f8fafc" font-size="46" font-family="system-ui, -apple-system, sans-serif" font-weight="900" letter-spacing="-0.03em">
      ${toolA} to ${toolB} Integration
    </text>
    
    <!-- Subtitle / Meta -->
    <text x="0" y="92" fill="#94a3b8" font-size="22" font-family="system-ui, -apple-system, sans-serif" font-weight="500">
      Complete Step-by-Step Architecture, Field Mapping &amp; Automation Guide
    </text>

    <!-- Visual Tool Flow Diagram -->
    <g transform="translate(0, 140)">
      <!-- Tool A Box -->
      <rect x="0" y="0" width="280" height="74" rx="14" fill="url(#pillGradA)" stroke="rgba(99, 102, 241, 0.4)" stroke-width="2" />
      <text x="140" y="46" fill="#ffffff" font-size="24" font-family="system-ui, -apple-system, sans-serif" font-weight="800" text-anchor="middle">
        ${toolA}
      </text>

      <!-- Connection Connector -->
      <g transform="translate(295, 37)">
        <line x1="0" y1="0" x2="160" y2="0" stroke="rgba(99, 102, 241, 0.6)" stroke-width="3" stroke-dasharray="6,6" />
        <circle cx="80" cy="0" r="18" fill="#0f172a" stroke="#6366f1" stroke-width="2.5" />
        <text x="80" y="6" fill="#38bdf8" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="800" text-anchor="middle">⇄</text>
      </g>

      <!-- Tool B Box -->
      <rect x="470" y="0" width="280" height="74" rx="14" fill="url(#pillGradB)" stroke="rgba(56, 189, 248, 0.4)" stroke-width="2" />
      <text x="610" y="46" fill="#ffffff" font-size="24" font-family="system-ui, -apple-system, sans-serif" font-weight="800" text-anchor="middle">
        ${toolB}
      </text>
    </g>

    <!-- Badges Row -->
    <g transform="translate(0, 260)">
      <!-- Type Badge -->
      <rect x="0" y="0" width="240" height="42" rx="21" fill="rgba(99, 102, 241, 0.15)" stroke="rgba(99, 102, 241, 0.4)" stroke-width="1.5" />
      <text x="120" y="26" fill="#a5b4fc" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="700" text-anchor="middle">
        ${typeText}
      </text>

      <!-- Time Badge -->
      <rect x="255" y="0" width="165" height="42" rx="21" fill="rgba(255, 255, 255, 0.06)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5" />
      <text x="337" y="26" fill="#e2e8f0" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="600" text-anchor="middle">
        ${timeText}
      </text>

      <!-- Difficulty Badge -->
      <rect x="435" y="0" width="165" height="42" rx="21" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.35)" stroke-width="1.5" />
      <text x="517" y="26" fill="#6ee7b7" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="700" text-anchor="middle">
        ${diffText}
      </text>
    </g>
  </g>

  <!-- Footer Info -->
  <g transform="translate(80, 545)">
    <text x="0" y="0" fill="#64748b" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="600">
      50+ Production Blueprints • Zero Coding Required • b2b-integrations.vercel.app
    </text>
  </g>
</svg>
  `.trim();
}

export function generateToolOgSvg(tool: { name: string; category: string; integrationsCount: number }): string {
  const toolName = escapeXml(tool.name);
  const category = escapeXml(tool.category);
  const count = tool.integrationsCount;

  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="60" result="blur" />
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <circle cx="200" cy="120" r="220" fill="#6366f1" opacity="0.2" filter="url(#glow)" />
  <circle cx="1050" cy="500" r="260" fill="#06b6d4" opacity="0.15" filter="url(#glow)" />

  <rect x="30" y="30" width="1140" height="570" rx="24" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2" />

  <g transform="translate(80, 85)">
    <rect x="0" y="0" width="44" height="44" rx="10" fill="url(#brandGrad)" />
    <path d="M14 30 L30 14 M30 22 L30 14 L22 14 M14 22 L14 30 L22 30" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <text x="56" y="28" fill="#ffffff" font-size="24" font-family="system-ui, -apple-system, sans-serif" font-weight="800" letter-spacing="-0.02em">
      SaaS<tspan fill="#38bdf8">Connect</tspan>
    </text>
    <text x="195" y="28" fill="#64748b" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="600">
      • TOOL HUB &amp; AUTOMATION DIRECTORY
    </text>
  </g>

  <g transform="translate(80, 190)">
    <rect x="0" y="0" width="180" height="36" rx="18" fill="rgba(56, 189, 248, 0.15)" stroke="rgba(56, 189, 248, 0.35)" stroke-width="1.5" />
    <text x="90" y="23" fill="#38bdf8" font-size="15" font-family="system-ui, -apple-system, sans-serif" font-weight="700" text-anchor="middle">
      ${category}
    </text>

    <text x="0" y="90" fill="#f8fafc" font-size="52" font-family="system-ui, -apple-system, sans-serif" font-weight="900" letter-spacing="-0.03em">
      ${toolName} Integrations
    </text>

    <text x="0" y="140" fill="#94a3b8" font-size="24" font-family="system-ui, -apple-system, sans-serif" font-weight="500">
      Browse ${count} verified B2B workflows, sync guides &amp; middleware pipelines.
    </text>

    <g transform="translate(0, 190)">
      <rect x="0" y="0" width="280" height="50" rx="12" fill="rgba(99, 102, 241, 0.2)" stroke="rgba(99, 102, 241, 0.4)" stroke-width="1.5" />
      <text x="140" y="32" fill="#a5b4fc" font-size="18" font-family="system-ui, -apple-system, sans-serif" font-weight="700" text-anchor="middle">
        🛡️ Enterprise Tested Blueprints
      </text>
    </g>
  </g>

  <g transform="translate(80, 545)">
    <text x="0" y="0" fill="#64748b" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="600">
      b2b-integrations.vercel.app • Direct &amp; Middleware Integration Directory
    </text>
  </g>
</svg>
  `.trim();
}

export function generateCategoryOgSvg(cat: { name: string; integrationsCount: number }): string {
  const catName = escapeXml(cat.name);
  const count = cat.integrationsCount;

  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="60" result="blur" />
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <circle cx="200" cy="120" r="220" fill="#10b981" opacity="0.18" filter="url(#glow)" />
  <circle cx="1050" cy="500" r="260" fill="#6366f1" opacity="0.15" filter="url(#glow)" />

  <rect x="30" y="30" width="1140" height="570" rx="24" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2" />

  <g transform="translate(80, 85)">
    <rect x="0" y="0" width="44" height="44" rx="10" fill="url(#brandGrad)" />
    <path d="M14 30 L30 14 M30 22 L30 14 L22 14 M14 22 L14 30 L22 30" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <text x="56" y="28" fill="#ffffff" font-size="24" font-family="system-ui, -apple-system, sans-serif" font-weight="800" letter-spacing="-0.02em">
      SaaS<tspan fill="#38bdf8">Connect</tspan>
    </text>
    <text x="195" y="28" fill="#64748b" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="600">
      • CATEGORY SILO HUB
    </text>
  </g>

  <g transform="translate(80, 200)">
    <text x="0" y="48" fill="#f8fafc" font-size="50" font-family="system-ui, -apple-system, sans-serif" font-weight="900" letter-spacing="-0.03em">
      ${catName} Integrations
    </text>

    <text x="0" y="105" fill="#94a3b8" font-size="24" font-family="system-ui, -apple-system, sans-serif" font-weight="500">
      Explore ${count} verified automation blueprints and API data sync connectors.
    </text>

    <g transform="translate(0, 160)">
      <rect x="0" y="0" width="310" height="48" rx="24" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.35)" stroke-width="1.5" />
      <text x="155" y="30" fill="#6ee7b7" font-size="17" font-family="system-ui, -apple-system, sans-serif" font-weight="700" text-anchor="middle">
        ⚡ Native &amp; Middleware Matrix
      </text>
    </g>
  </g>

  <g transform="translate(80, 545)">
    <text x="0" y="0" fill="#64748b" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="600">
      b2b-integrations.vercel.app • Free B2B SaaS Workflow Directory
    </text>
  </g>
</svg>
  `.trim();
}

export function generateDefaultOgSvg(): string {
  return `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="60" result="blur" />
    </filter>
  </defs>

  <rect width="1200" height="630" fill="url(#bgGrad)" />
  <circle cx="250" cy="150" r="280" fill="#6366f1" opacity="0.22" filter="url(#glow)" />
  <circle cx="1000" cy="480" r="300" fill="#38bdf8" opacity="0.18" filter="url(#glow)" />
  <circle cx="650" cy="300" r="200" fill="#10b981" opacity="0.12" filter="url(#glow)" />

  <rect x="30" y="30" width="1140" height="570" rx="24" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2" />

  <g transform="translate(80, 85)">
    <rect x="0" y="0" width="44" height="44" rx="10" fill="url(#brandGrad)" />
    <path d="M14 30 L30 14 M30 22 L30 14 L22 14 M14 22 L14 30 L22 30" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    <text x="56" y="28" fill="#ffffff" font-size="24" font-family="system-ui, -apple-system, sans-serif" font-weight="800" letter-spacing="-0.02em">
      SaaS<tspan fill="#38bdf8">Connect</tspan>
    </text>
    <text x="195" y="28" fill="#64748b" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="600">
      • B2B INTEGRATION DIRECTORY
    </text>
  </g>

  <g transform="translate(80, 195)">
    <text x="0" y="48" fill="#f8fafc" font-size="48" font-family="system-ui, -apple-system, sans-serif" font-weight="900" letter-spacing="-0.03em">
      Connect Your SaaS Tech Stack
    </text>
    <text x="0" y="105" fill="#f8fafc" font-size="48" font-family="system-ui, -apple-system, sans-serif" font-weight="900" letter-spacing="-0.03em">
      Without Engineering Bottlenecks
    </text>

    <text x="0" y="165" fill="#94a3b8" font-size="22" font-family="system-ui, -apple-system, sans-serif" font-weight="500">
      50+ Production Blueprints • 37 Supported Platforms • Free Setup Guides
    </text>

    <g transform="translate(0, 215)">
      <rect x="0" y="0" width="220" height="44" rx="22" fill="rgba(99, 102, 241, 0.2)" stroke="rgba(99, 102, 241, 0.4)" stroke-width="1.5" />
      <text x="110" y="28" fill="#a5b4fc" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="700" text-anchor="middle">
        ⚡ 50+ Live Guides
      </text>

      <rect x="235" y="0" width="240" height="44" rx="22" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.35)" stroke-width="1.5" />
      <text x="355" y="28" fill="#6ee7b7" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="700" text-anchor="middle">
        🛡️ Enterprise Tested
      </text>
    </g>
  </g>

  <g transform="translate(80, 545)">
    <text x="0" y="0" fill="#64748b" font-size="16" font-family="system-ui, -apple-system, sans-serif" font-weight="600">
      b2b-integrations.vercel.app • Fast, programmatic B2B integration directory
    </text>
  </g>
</svg>
  `.trim();
}
