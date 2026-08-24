import type { APIRoute, GetStaticPaths } from 'astro';
import integrationsData from '../../data/integrations.json';
import type { IntegrationRecord } from '../../types/integration';
import { generateIntegrationOgSvg } from '../../utils/og-template';
import sharp from 'sharp';

export const getStaticPaths: GetStaticPaths = () => {
  return (integrationsData as IntegrationRecord[]).map((item) => ({
    params: { slug: item.slug },
    props: { item },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const item = props.item as IntegrationRecord;
  const svg = generateIntegrationOgSvg(item);
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
