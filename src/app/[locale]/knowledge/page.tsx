import Link from 'next/link';
import Image from 'next/image';
import { getAllArticlesMeta, ArticleMeta } from '@/lib/articles';

const CATEGORIES = [
  { zh: '全部', en: 'All', key: 'all' },
  { zh: '中医基础理论', en: 'TCM Basic Theory', key: '中医基础理论' },
  { zh: '体质辨识与调理', en: 'Body Constitution', key: '体质辨识与调理' },
  { zh: '时令养生', en: 'Seasonal Wellness', key: '时令养生' },
  { zh: '经络穴位保健', en: 'Meridian & Acupoints', key: '经络穴位保健' },
  { zh: '食疗药膳', en: 'Medicinal Diet', key: '食疗药膳' },
  { zh: '中医美容养颜', en: 'TCM Beauty', key: '中医美容养颜' },
];

const CATEGORY_ICONS: { [key: string]: string } = {
  '中医基础理论': '📖',
  '体质辨识与调理': '🧬',
  '时令养生': '🌸',
  '经络穴位保健': '💆',
  '食疗药膳': '🍲',
  '中医美容养颜': '✨',
};

export default async function KnowledgePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const localeKey = locale as 'zh' | 'en';
  const isZh = locale === 'zh';

  const allArticles = getAllArticlesMeta();

  const getArticlesByCategory = (categoryKey: string): ArticleMeta[] => {
    if (categoryKey === 'all') return allArticles;
    return allArticles.filter(article => article.category.zh === categoryKey);
  };

  const categoryCounts: { [key: string]: number } = {};
  CATEGORIES.forEach(cat => {
    categoryCounts[cat.key] = getArticlesByCategory(cat.key).length;
  });

  return (
    <div className="bg-bg-section min-h-screen">
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">📚</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isZh ? '养生知识库' : 'Wellness Knowledge Base'}
          </h1>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            {isZh ? '系统学习中医养生知识，从基础理论到实践应用' : 'Systematically learn TCM wellness knowledge from fundamentals to practical applications'}
          </p>
          <div className="mt-8 inline-flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur rounded-full">
            <span className="text-2xl font-bold">{allArticles.length}</span>
            <span className="text-primary-100">{isZh ? '篇精选文章' : 'featured articles'}</span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="sticky top-24 z-10 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-border p-4">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.key}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                      category.key === 'all'
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-primary-50 text-primary-700 hover:bg-primary-100'
                    }`}
                  >
                    {category.key !== 'all' && CATEGORY_ICONS[category.key]}
                    {category[localeKey]}
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                      {categoryCounts[category.key]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/${locale}/knowledge/articles/${article.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border"
              >
                <div className="h-40 relative overflow-hidden">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title[localeKey]}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-accent-50 flex items-center justify-center">
                      <span className="text-6xl opacity-80 group-hover:scale-110 transition-transform duration-500">
                        {CATEGORY_ICONS[article.category.zh] || '🌿'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                      {CATEGORY_ICONS[article.category.zh]}
                      {article.category[localeKey]}
                    </span>
                    {article.readingTime && (
                      <span className="text-xs text-text-muted">
                        ⏱️ {article.readingTime} {isZh ? '分钟' : 'min'}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title[localeKey]}
                  </h2>
                  <p className="text-sm text-text-secondary line-clamp-3 mb-4">
                    {article.description?.[localeKey] || ''}
                  </p>
                  <div className="flex items-center justify-between">
                    {article.publishedAt && (
                      <span className="text-xs text-text-muted">
                        📅 {new Date(article.publishedAt).toLocaleDateString(isZh ? 'zh-CN' : 'en-US')}
                      </span>
                    )}
                    <span className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                      {isZh ? '阅读' : 'Read'} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 border border-primary-100">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="text-6xl">💡</div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {isZh ? '想要了解更多？' : 'Want to Learn More?'}
                </h3>
                <p className="text-text-secondary">
                  {isZh ? '尝试我们的体质测试，获取个性化的养生建议' : 'Try our body type quiz for personalized wellness suggestions'}
                </p>
              </div>
              <Link
                href={`/${locale}/tools/body-type-quiz`}
                className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium whitespace-nowrap"
              >
                {isZh ? '开始测试 →' : 'Start Quiz →'}
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-accent-50 border border-accent-200 rounded-xl p-6 max-w-2xl">
              <p className="text-accent-700 text-sm">
                {isZh ? '更多精彩内容持续更新中... 如有特定主题需求，欢迎随时关注我们的最新动态。' : 'More exciting content coming soon... Stay tuned for updates on specific wellness topics.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
