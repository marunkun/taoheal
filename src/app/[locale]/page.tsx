import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/home/Hero';
import Newsletter from '@/components/home/Newsletter';
import { getAllArticlesMeta } from '@/lib/articles';
import { WebsiteJsonLd, OrganizationJsonLd } from '@/components/seo/JsonLd';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const localeKey = locale as 'zh' | 'en';
  const isZh = locale === 'zh';
  const articles = getAllArticlesMeta().slice(0, 3);

  const stats = [
    { value: '100+', label: isZh ? '养生文章' : 'Wellness Articles', icon: '📚' },
    { value: '9', label: isZh ? '体质类型' : 'Body Types', icon: '🧬' },
    { value: '5000+', label: isZh ? '满意用户' : 'Happy Users', icon: '🌿' },
    { value: '24/7', label: isZh ? '健康知识' : 'Health Info', icon: '⏰' },
  ];

  const features = [
    {
      icon: '📖',
      title: isZh ? '系统知识库' : 'Knowledge Base',
      desc: isZh ? '涵盖中医基础、体质辨识、食疗养生、经络穴位等多方面内容' : 'Covering TCM fundamentals, body type identification, dietary therapy, acupoints and more',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: '🎯',
      title: isZh ? '体质测试' : 'Body Type Quiz',
      desc: isZh ? '通过9道专业问题，快速了解自己的中医体质类型' : 'Quickly understand your TCM body type with 9 professional questions',
      color: 'from-amber-400 to-orange-500',
    },
    {
      icon: '🍲',
      title: isZh ? '食疗方案' : 'Dietary Therapy',
      desc: isZh ? '根据不同体质，提供个性化的食疗建议和食谱' : 'Personalized dietary suggestions and recipes based on different body types',
      color: 'from-red-400 to-rose-500',
    },
    {
      icon: '🧘',
      title: isZh ? '生活养生' : 'Lifestyle Wellness',
      desc: isZh ? '结合传统智慧与现代科学，打造健康生活方式' : 'Combining traditional wisdom with modern science for a healthy lifestyle',
      color: 'from-blue-400 to-indigo-500',
    },
  ];

  return (
    <div>
      <WebsiteJsonLd locale={locale} />
      <OrganizationJsonLd />
      <Hero locale={locale} />

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-gradient-to-br from-bg-section to-white rounded-2xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">{stat.value}</div>
                <div className="text-sm text-text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-bg-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {isZh ? '核心功能' : 'Core Features'}
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              {isZh ? '全方位的中医养生体验，从知识学习到实践应用' : 'A comprehensive TCM wellness experience from learning to practice'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="group bg-white rounded-2xl p-6 border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 text-2xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
            <div>
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full mb-3">
                {isZh ? '最新内容' : 'Latest Content'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
                {isZh ? '精选养生文章' : 'Featured Articles'}
              </h2>
              <p className="text-text-secondary">
                {isZh ? '精选中医养生知识，助您健康生活' : 'Handpicked TCM wellness knowledge for a healthy life'}
              </p>
            </div>
            <Link
              href={`/${locale}/knowledge`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary-700 font-medium transition-colors"
            >
              {isZh ? '查看全部' : 'View All'}
              <span>→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/${locale}/knowledge/articles/${article.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="h-48 relative overflow-hidden">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title[localeKey]}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
                      <span className="text-7xl opacity-80 group-hover:scale-110 transition-transform duration-500">🌿</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur text-primary-700 text-xs font-medium rounded-full shadow-sm">
                      {article.category[localeKey]}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title[localeKey]}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                    {article.description?.[localeKey] || ''}
                  </p>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    {article.readingTime && (
                      <span className="flex items-center gap-1">
                        <span>⏱️</span>
                        {article.readingTime} {isZh ? '分钟' : 'min'}
                      </span>
                    )}
                    <span className="text-primary font-medium group-hover:translate-x-1 transition-transform">
                      {isZh ? '阅读更多' : 'Read More'} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-6">🎯</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isZh ? '了解你的体质类型' : 'Know Your Body Type'}
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            {isZh ? '通过专业的中医体质测试，了解自己的体质特点，获取个性化的养生建议' : 'Through professional TCM body type assessment, understand your body characteristics and get personalized wellness suggestions'}
          </p>
          <Link
            href={`/${locale}/tools/body-type-quiz`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors text-lg shadow-lg shadow-primary-600/25"
          >
            <span>🎯</span>
            {isZh ? '立即测试' : 'Start Quiz Now'}
          </Link>
        </div>
      </section>

      <section className="py-8 bg-bg-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
            <p className="text-amber-800 text-sm">
              {isZh ? '⚠️ 本站内容仅供参考，不能替代专业医疗建议。如有健康问题，请咨询专业医师。' : '⚠️ Content on this site is for reference only and does not replace professional medical advice. Please consult a qualified healthcare professional for health concerns.'}
            </p>
          </div>
        </div>
      </section>

      <Newsletter locale={locale} />
    </div>
  );
}
