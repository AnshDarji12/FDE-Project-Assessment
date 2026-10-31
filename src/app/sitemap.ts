import type { MetadataRoute } from 'next';
import { AVAILABLE } from '@/lib/data';

const BASE = 'https://puppy.instabizweb.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/puppies', '/happy-families', '/how-it-works', '/faq', '/contact', '/gone-home'];
  const now = new Date();

  return [
    ...staticPages.map((p) => ({
      url: `${BASE}${p}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: p === '' ? 1 : 0.8,
    })),
    ...AVAILABLE.map((p) => ({
      url: `${BASE}/puppies/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];
}
