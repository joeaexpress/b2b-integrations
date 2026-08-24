import type { APIRoute, GetStaticPaths } from 'astro';
import integrationsData from '../../data/integrations.json';
import type { IntegrationRecord } from '../../types/integration';

export const getStaticPaths: GetStaticPaths = () => {
  return (integrationsData as IntegrationRecord[]).map((item) => ({
    params: { slug: item.slug },
    props: { item },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const item = props.item as IntegrationRecord;

  const blueprintPayload = {
    schema_version: '2.1.0',
    generator: 'SaaSConnect B2B Integration Engine',
    name: `${item.toolA} to ${item.toolB} Automated Pipeline`,
    slug: item.slug,
    integration_type: item.nativeIntegration ? 'Native Direct Connector' : `${item.recommendedMiddleware} Middleware Workflow`,
    source_platform: {
      name: item.toolA,
      category: item.toolACategory,
      auth_type: 'OAuth 2.0 / API Token',
    },
    destination_platform: {
      name: item.toolB,
      category: item.toolBCategory,
      auth_type: 'OAuth 2.0 / Bearer Key',
    },
    estimated_setup_time_minutes: item.setupTimeMinutes,
    difficulty_rating: item.difficulty,
    recommended_engine: item.recommendedMiddleware,
    use_cases: item.topUseCases,
    execution_pipeline: {
      trigger: {
        type: 'webhook_or_polling',
        source: item.toolA,
        polling_interval_minutes: 5,
        deduplication_key: 'id_or_timestamp',
      },
      steps: item.stepByStepGuide.map((stepText, idx) => ({
        step_number: idx + 1,
        instruction: stepText,
        retry_policy: {
          max_attempts: 3,
          backoff_factor_seconds: 5,
        },
      })),
    },
    architectural_safeguards: {
      common_pitfalls: item.commonPitfalls,
      rate_limit_handling: 'Automatic throttling on HTTP 429 response',
      idempotency: 'Enabled via unique hash of event_id + entity_id',
    },
    documentation_url: `https://b2b-integrations.vercel.app/integrations/${item.slug}`,
    exported_at: new Date().toISOString(),
  };

  return new Response(JSON.stringify(blueprintPayload, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${item.slug}-blueprint.json"`,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
