import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://taoheal.pages.dev';
  
  const locales = ['zh', 'en'];
  
  const staticPages = [
    '',
    '/knowledge',
    '/tools/body-type-quiz',
    '/community',
    '/about',
    '/legal/disclaimer',
    '/legal/privacy',
    '/legal/terms',
  ];

  const articleSlugs = [
    'sleep-acupoints',
    'seasonal-wellness-spring',
    'tcm-diet-fundamentals',
    'stress-management-tcm',
    'spleen-stomach-regulation',
  ];

  const pages: MetadataRoute.Sitemap = [];

  locales.forEach(locale => {
    staticPages.forEach(path => {
      pages.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1.0 : 0.8,
      });
    });

    articleSlugs.forEach(slug => {
      pages.push({
        url: `${baseUrl}/${locale}/knowledge/articles/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });

  return pages;
}