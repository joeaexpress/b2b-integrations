import type { APIRoute, GetStaticPaths } from 'astro';
import { getAllCategories } from '../../../utils/slugs';
import { generateCategoryOgSvg } from '../../../utils/og-template';
import sharp from 'sharp';

export const getStaticPaths: GetStaticPaths = () => {
  const categories = getAllCategories();
  return categories.map((c) => ({
    params: { category: c.slug },
    props: { category: c },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const category = props.category as { name: string; integrations: any[] };
  const svg = generateCategoryOgSvg({
    name: category.name,
    integrationsCount: category.integrations.length,
  });
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
