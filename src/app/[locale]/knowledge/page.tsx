import Link from 'next/link';
import Image from 'next/image';
import { getAllArticlesMeta } from '@/lib/articles';

export default async function KnowledgePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const localeKey = locale as 'zh' | 'en';
  const isZh = locale === 'zh';

  const articles = getAllArticlesMeta();

  const iconMap: { [key: string]: string } = {
    [isZh ? '睡眠养生' : 'Sleep Wellness']: '😴',
    [isZh ? '睡眠健康' : 'Sleep Health']: '😴',
    [isZh ? '时令养生' : 'Seasonal Wellness']: '🌸',
    [isZh ? '脾胃调理' : 'Spleen & Stomach']: '🌾',
    [isZh ? '情绪管理' : 'Stress Management']: '🧘',
    [isZh ? '饮食基础' : 'Dietary Fundamentals']: '🥗',
    [isZh ? '食疗药膳' : 'Dietary Therapy']: '🍲',
    [isZh ? '穴位保健' : 'Acupoint Health']: '💆',
    [isZh ? '体质辨识' : 'Body Type Identification']: '🧬',
    [isZh ? '气血调理' : 'Qi & Blood Regulation']: '💪',
    [isZh ? '美容护肤' : 'Beauty & Skincare']: '✨',
    [isZh ? '运动养生' : 'Exercise Wellness']: '🤸',
  };

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
            <span className="text-2xl font-bold">{articles.length}</span>
            <span className="text-primary-100">{isZh ? '篇精选文章' : 'featured articles'}</span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
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
                        {iconMap[article.category[localeKey]] || '🌿'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
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
