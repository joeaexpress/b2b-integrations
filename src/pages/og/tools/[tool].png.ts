import type { APIRoute, GetStaticPaths } from 'astro';
import { getAllTools } from '../../../utils/slugs';
import { generateToolOgSvg } from '../../../utils/og-template';
import sharp from 'sharp';

export const getStaticPaths: GetStaticPaths = () => {
  const tools = getAllTools();
  return tools.map((t) => ({
    params: { tool: t.slug },
    props: { tool: t },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const tool = props.tool as { name: string; category: string; integrations: any[] };
  const svg = generateToolOgSvg({
    name: tool.name,
    category: tool.category,
    integrationsCount: tool.integrations.length,
  });
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
