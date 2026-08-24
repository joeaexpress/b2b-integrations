import type { APIRoute } from 'astro';
import integrationsData from '../../data/integrations.json';
import type { IntegrationRecord } from '../../types/integration';

export const GET: APIRoute = async () => {
  const integrations = integrationsData as IntegrationRecord[];

  const masterVault = {
    vault_version: '2.5.0',
    product_name: 'SaaSConnect Enterprise Automation Scenario Vault',
    license: 'Commercial Agency & Enterprise Redistribution License',
    total_scenarios_count: integrations.length,
    exported_at: new Date().toISOString(),
    documentation_hub: 'https://b2b-integrations.vercel.app/vault',
    runtime_compatibility: ['Make.com (Integromat)', 'Custom Webhook Microservices', 'AWS Lambda / Serverless'],
    scenarios: integrations.map((item, index) => ({
      index: index + 1,
      name: `${item.toolA} to ${item.toolB} Automated Pipeline`,
      slug: item.slug,
      source_platform: {
        tool: item.toolA,
        category: item.toolACategory,
      },
      destination_platform: {
        tool: item.toolB,
        category: item.toolBCategory,
      },
      setup_time_minutes: item.setupTimeMinutes,
      difficulty: item.difficulty,
      recommended_engine: item.recommendedMiddleware,
      top_use_cases: item.topUseCases,
      step_by_step_guide: item.stepByStepGuide,
      common_pitfalls: item.commonPitfalls,
      safeguards: {
        max_retry_attempts: 3,
        backoff_strategy: 'exponential',
        rate_limit_handling: 'Automatic 429 backoff buffer',
        idempotency_key: `evt_${item.slug}_{{timestamp}}`,
      },
      guide_url: `https://b2b-integrations.vercel.app/integrations/${item.slug}`,
    })),
  };

  return new Response(JSON.stringify(masterVault, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="saasconnect-scenario-vault-100-blueprints.json"',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
