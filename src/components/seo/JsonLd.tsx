interface JsonLdProps {
  locale: string;
}

export function WebsiteJsonLd({ locale }: JsonLdProps) {
  const isZh = locale === 'zh';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://daoheal.pages.dev';
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DaoHeal',
    url: baseUrl,
    description: isZh 
      ? 'No Tox, All TCM - 用自然方式找回健康'
      : 'No Tox, All TCM - Reclaim your health naturally',
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${locale}/knowledge?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ArticleJsonLd({ 
  locale, 
  article 
}: JsonLdProps & { 
  article: {
    title: { zh: string; en: string };
    description: { zh: string; en: string };
    slug: string;
    image?: string;
    publishedAt?: string;
    category: { zh: string; en: string };
  }
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://daoheal.pages.dev';
  const articleUrl = `${baseUrl}/${locale}/knowledge/articles/${article.slug}`;
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title[locale === 'zh' ? 'zh' : 'en'],
    description: article.description[locale === 'zh' ? 'zh' : 'en'],
    url: articleUrl,
    datePublished: article.publishedAt || new Date().toISOString(),
    dateModified: article.publishedAt || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'DaoHeal',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'DaoHeal',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    articleSection: article.category[locale === 'zh' ? 'zh' : 'en'],
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
    image: article.image ? {
      '@type': 'ImageObject',
      url: article.image,
      width: 800,
      height: 400,
    } : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://daoheal.pages.dev';
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DaoHeal',
    url: baseUrl,
    logo: `${baseUrl}/favicon.svg`,
    description: 'DaoHeal · 道·疗愈 - No Tox, All TCM',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Chinese', 'English'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}