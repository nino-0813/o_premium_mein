import type { MetadataRoute } from 'next';

function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return 'http://localhost:3000';
  return raw.replace(/\/+$/, '');
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  const routes = [
    { path: '/', priority: 1 },
    { path: '/product', priority: 0.9 },
    { path: '/purchase', priority: 0.8 },
    { path: '/about', priority: 0.7 },
    { path: '/reviews', priority: 0.6 },
    { path: '/sample', priority: 0.6 },
    { path: '/contact', priority: 0.5 },
    { path: '/privacy', priority: 0.3 },
  ] as const;

  return routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: r.priority,
  }));
}

