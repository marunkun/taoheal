import { MetadataRoute } from 'next';
import { getAllArticlesMeta } from '@/lib/articles';

type ChangeFreq = 'daily' | 'weekly' | 'monthly' | 'yearly' | 'always' | 'hourly' | 'never';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://taoheal.pages.dev';
  
  const locales = ['zh', 'en'];
  
  const staticPages: { path: string; priority: number; changeFreq: ChangeFreq }[] = [
    { path: '', priority: 1.0, changeFreq: 'daily' },
    { path: '/knowledge', priority: 0.9, changeFreq: 'weekly' },
    { path: '/tools/body-type-quiz', priority: 0.8, changeFreq: 'monthly' },
    { path: '/community', priority: 0.6, changeFreq: 'monthly' },
    { path: '/about', priority: 0.7, changeFreq: 'monthly' },
    { path: '/legal/disclaimer', priority: 0.3, changeFreq: 'yearly' },
    { path: '/legal/privacy', priority: 0.3, changeFreq: 'yearly' },
    { path: '/legal/terms', priority: 0.3, changeFreq: 'yearly' },
  ];

  // 获取所有文章
  const articles = getAllArticlesMeta();

  const pages: MetadataRoute.Sitemap = [];

  // 添加静态页面
  locales.forEach(locale => {
    staticPages.forEach(({ path, priority, changeFreq }) => {
      pages.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: changeFreq,
        priority: priority,
      });
    });
  });

  // 添加所有文章页面
  locales.forEach(locale => {
    articles.forEach(article => {
      pages.push({
        url: `${baseUrl}/${locale}/knowledge/articles/${article.slug}`,
        lastModified: article.publishedAt ? new Date(article.publishedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return pages;
}