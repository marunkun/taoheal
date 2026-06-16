import type { Metadata } from 'next';

export const siteConfig = {
  name: 'TaoHeal',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://taoheal.pages.dev',
  description: {
    zh: '传承千年智慧，开启健康人生。探索中医养生奥秘，专业体质测试，个性化养生方案。',
    en: 'Inherit millennium wisdom, start a healthy life. Explore TCM wellness secrets with professional body type assessment.',
  },
  keywords: {
    zh: ['中医养生', '体质测试', '养生知识', '中医美容', '气血调理', '穴位保健', '食疗药膳', '经络养生', '阴阳五行', '子午流注'],
    en: ['TCM wellness', 'body type quiz', 'Chinese medicine', 'acupoints', 'dietary therapy', 'meridian health', 'Qi blood', 'herbal beauty'],
  },
  author: 'TaoHeal',
  twitter: '@taoheal',
  locale: {
    zh: 'zh_CN',
    en: 'en_US',
  },
};

export function generateMetadata(locale: string): Metadata {
  const isZh = locale === 'zh';
  const localeKey = locale as 'zh' | 'en';
  const baseUrl = siteConfig.url;
  
  return {
    title: {
      default: `${siteConfig.name} - ${isZh ? '中医养生智慧平台' : 'TCM Wellness Platform'}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description[localeKey],
    keywords: siteConfig.keywords[localeKey],
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'zh-CN': `${baseUrl}/zh`,
        'en-US': `${baseUrl}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale[localeKey],
      url: `${baseUrl}/${locale}`,
      siteName: siteConfig.name,
      title: `${siteConfig.name} - ${isZh ? '中医养生智慧平台' : 'TCM Wellness Platform'}`,
      description: siteConfig.description[localeKey],
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteConfig.name} - ${isZh ? '中医养生智慧平台' : 'TCM Wellness Platform'}`,
      description: siteConfig.description[localeKey],
      images: [`${baseUrl}/og-image.png`],
      creator: siteConfig.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

export function generateArticleMetadata(locale: string, article: {
  title: { zh: string; en: string };
  description: { zh: string; en: string };
  slug: string;
  image?: string;
  publishedAt?: string;
}): Metadata {
  const localeKey = locale as 'zh' | 'en';
  const baseUrl = siteConfig.url;
  const articleUrl = `${baseUrl}/${locale}/knowledge/articles/${article.slug}`;
  
  return {
    title: article.title[localeKey],
    description: article.description[localeKey],
    alternates: {
      canonical: articleUrl,
      languages: {
        'zh-CN': `${baseUrl}/zh/knowledge/articles/${article.slug}`,
        'en-US': `${baseUrl}/en/knowledge/articles/${article.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      locale: siteConfig.locale[localeKey],
      url: articleUrl,
      siteName: siteConfig.name,
      title: article.title[localeKey],
      description: article.description[localeKey],
      images: article.image ? [
        {
          url: article.image,
          width: 800,
          height: 400,
          alt: article.title[localeKey],
        },
      ] : [],
      publishedTime: article.publishedAt,
      authors: [siteConfig.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title[localeKey],
      description: article.description[localeKey],
      images: article.image ? [article.image] : [],
      creator: siteConfig.twitter,
    },
  };
}