import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getArticle, getRelatedArticles, type ContentBlock } from '@/lib/articles';
import ShareButtons from '@/components/articles/ShareButtons';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  
  return {
    title: article.title[locale as 'zh' | 'en'],
    description: article.description?.[locale as 'zh' | 'en'] || article.title[locale as 'zh' | 'en'],
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const localeKey = locale as 'zh' | 'en';
  const article = getArticle(slug);
  
  if (!article) {
    notFound();
  }
  
  const content = article.content[localeKey] as ContentBlock[];
  const relatedArticles = getRelatedArticles(slug, article.category, 3);

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <nav aria-label="Breadcrumb" className="text-sm text-text-muted mb-6">
        <ol className="flex items-center space-x-2">
          <li>
            <a href={`/${locale}`} className="hover:text-primary">
              {locale === 'zh' ? '首页' : 'Home'}
            </a>
          </li>
          <li>›</li>
          <li>
            <a href={`/${locale}/knowledge`} className="hover:text-primary">
              {locale === 'zh' ? '知识库' : 'Knowledge'}
            </a>
          </li>
          <li>›</li>
          <li className="text-text-secondary truncate max-w-xs">{article.title[localeKey]}</li>
        </ol>
      </nav>

      <header className="mb-8">
        <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs rounded-xl mb-3">
          {article.category[localeKey]}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
          {article.title[localeKey]}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
          {article.publishedAt && (
            <span>📅 {new Date(article.publishedAt).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')}</span>
          )}
          {article.readingTime && (
            <span>⏱️ {article.readingTime} {locale === 'zh' ? '分钟阅读' : 'min read'}</span>
          )}
          <ShareButtons
            url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://taoheal.pages.dev'}/${locale}/knowledge/articles/${slug}`}
            title={article.title[localeKey]}
            locale={locale}
          />
        </div>
        {article.image && (
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={article.image}
              alt={article.title[localeKey]}
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}
      </header>

      <div className="prose max-w-none">
        {content.map((block, index) => {
          switch (block.type) {
            case 'paragraph':
              return (
                <p key={index} className="text-text-secondary leading-relaxed mb-4">
                  {block.text}
                </p>
              );
            case 'heading':
              return (
                <h2 key={index} className="text-2xl font-semibold text-text-primary mt-8 mb-4 border-l-4 border-green-500 pl-3">
                  {block.text}
                </h2>
              );
            case 'subheading':
              return (
                <h3 key={index} className="text-xl font-semibold text-text-primary mt-6 mb-3">
                  {block.text}
                </h3>
              );
            case 'list':
              return (
                <ul key={index} className="list-disc list-inside text-text-secondary space-y-2 mb-4 pl-4">
                  {block.items?.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              );
            case 'warning':
            case 'disclaimer':
              return (
                <div
                  key={index}
                  className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-xl my-6"
                  role="alert"
                >
                  <p className="text-amber-800 text-sm">⚠️ {block.text}</p>
                </div>
              );
            case 'recipe':
              return (
                <div key={index} className="p-6 bg-primary-50 rounded-xl my-6">
                  <h4 className="text-lg font-semibold text-text-primary mb-3">🍲 {block.title}</h4>
                  <div className="mb-3">
                    <p className="font-medium text-text-secondary mb-1">
                      {locale === 'zh' ? '材料：' : 'Ingredients:'}
                    </p>
                    <ul className="list-disc list-inside text-text-secondary text-sm">
                      {block.ingredients?.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-text-secondary mb-1">
                      {locale === 'zh' ? '做法：' : 'Instructions:'}
                    </p>
                    <p className="text-text-secondary text-sm whitespace-pre-line">{block.instructions}</p>
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>

      {relatedArticles.length > 0 && (
        <section className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-text-primary mb-6">{locale === 'zh' ? '相关文章' : 'Related Articles'}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <Link
                key={related.slug}
                href={`/${locale}/knowledge/articles/${related.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-28 relative overflow-hidden">
                  {related.image ? (
                    <Image
                      src={related.image}
                      alt={related.title[localeKey]}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
                      <span className="text-4xl opacity-80 group-hover:scale-110 transition-transform">📖</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <span className="inline-block px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full mb-2">
                    {related.category[localeKey]}
                  </span>
                  <h3 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {related.title[localeKey]}
                  </h3>
                  <p className="text-sm text-text-muted line-clamp-2">{related.description?.[localeKey]}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200 text-center">
        <Link
          href={`/${locale}/knowledge`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-2xl hover:bg-primary-700 transition-colors font-medium"
        >
          ← {locale === 'zh' ? '返回知识库' : 'Back to Knowledge'}
        </Link>
      </div>
    </article>
  );
}