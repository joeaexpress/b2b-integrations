import type { APIRoute } from 'astro';
import { generateDefaultOgSvg } from '../../utils/og-template';
import sharp from 'sharp';

export const GET: APIRoute = async () => {
  const svg = generateDefaultOgSvg();
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
