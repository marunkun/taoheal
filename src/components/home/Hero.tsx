import Link from 'next/link';

interface HeroProps {
  locale: string;
}

export default function Hero({ locale }: HeroProps) {
  const isZh = locale === 'zh';

  return (
    <section className="bg-gradient-to-br from-primary-50 via-bg-white to-accent-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <div className="text-6xl mb-6">🌿</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {isZh ? '传承千年智慧，开启健康人生' : 'Inherit Millennium Wisdom, Start a Healthy Life'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {isZh 
              ? '探索中医养生奥秘，结合现代科学，让古老智慧为您所用。专业体质测试，个性化养生方案，让健康触手可及。' 
              : 'Explore the mysteries of TCM wellness, combine with modern science, and let ancient wisdom work for you. Professional body type testing, personalized health plans, making health accessible.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/tools/body-type-quiz`}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              {isZh ? '开始体质测试' : 'Start Body Type Quiz'}
            </Link>
            <Link
              href={`/${locale}/knowledge`}
              className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
            >
              {isZh ? '探索知识库' : 'Explore Knowledge Base'}
            </Link>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="font-semibold text-gray-800 mb-2">{isZh ? '权威知识' : 'Authoritative Knowledge'}</h3>
            <p className="text-gray-600 text-sm">{isZh ? '汇集中医经典理论，科学验证的养生方法' : 'Collection of TCM classics and scientifically verified wellness methods'}</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">🧬</div>
            <h3 className="font-semibold text-text-primary mb-2">{isZh ? '个性化方案' : 'Personalized Plans'}</h3>
            <p className="text-text-secondary text-sm">{isZh ? '根据您的体质类型，定制专属养生计划' : 'Customized wellness plans based on your body type'}</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="font-semibold text-text-primary mb-2">{isZh ? '双语呈现' : 'Bilingual Presentation'}</h3>
            <p className="text-text-secondary text-sm">{isZh ? '中英双语内容，方便全球用户学习' : 'Chinese and English content for global users'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}