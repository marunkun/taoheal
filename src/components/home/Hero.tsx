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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            {isZh ? 'No Tox, All TCM' : 'No Tox, All TCM'}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {isZh 
              ? '用自然方式找回健康 - 专为海外华人及国际用户打造的中医养生双语社区' 
              : 'Reclaim your health naturally - A bilingual TCM wellness community for global Chinese and enthusiasts'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/tools/body-type-quiz`}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all font-semibold shadow-lg shadow-green-500/25"
            >
              🎯 {isZh ? '开始体质测试' : 'Start Body Type Quiz'}
            </Link>
            <Link
              href={`/${locale}/knowledge`}
              className="px-8 py-4 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-all font-semibold"
            >
              📚 {isZh ? '探索知识库' : 'Explore Knowledge Base'}
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