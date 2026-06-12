import Link from 'next/link';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  const values = [
    {
      icon: '🌿',
      title: isZh ? '自然为本' : 'Nature First',
      desc: isZh
        ? '相信大自然的治愈力量，倡导天然、温和的养生方式'
        : 'Trust in nature\'s healing power and advocate natural wellness practices',
      color: 'from-green-400 to-emerald-600',
    },
    {
      icon: '📚',
      title: isZh ? '知识共享' : 'Knowledge Sharing',
      desc: isZh
        ? '打破知识壁垒，让每个人都能学习和受益于中医智慧'
        : 'Break down barriers so everyone can learn from TCM wisdom',
      color: 'from-blue-400 to-indigo-600',
    },
    {
      icon: '🌍',
      title: isZh ? '东西融合' : 'East Meets West',
      desc: isZh
        ? '结合现代科学与传统智慧，创造更有效的健康方案'
        : 'Combine modern science with traditional wisdom for better health',
      color: 'from-purple-400 to-pink-600',
    },
  ];

  const features = [
    { icon: '🎯', title: isZh ? '体质测试' : 'Body Type Quiz', desc: isZh ? '个性化体质识别' : 'Personalized type identification' },
    { icon: '📖', title: isZh ? '知识库' : 'Knowledge Base', desc: isZh ? '权威养生内容' : 'Authoritative wellness content' },
    { icon: '🍲', title: isZh ? '食疗方案' : 'Dietary Therapy', desc: isZh ? '体质定制食谱' : 'Customized recipes for your type' },
    { icon: '💬', title: isZh ? '社区交流' : 'Community', desc: isZh ? '爱好者互动分享' : 'Enthusiast interaction & sharing' },
  ];

  return (
    <div className="min-h-screen bg-bg-section">
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur rounded-2xl mb-6">
            <span className="text-5xl">🌿</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isZh ? '关于 TaoHeal' : 'About TaoHeal'}
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
            {isZh
              ? '传承千年智慧，开启健康人生。我们致力于让中医养生知识触手可及。'
              : 'Inherit millennium wisdom, start a healthy life. We make TCM wellness knowledge accessible to everyone.'}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 md:p-12 border border-primary-100">
            <div className="flex items-start gap-4 mb-6">
              <span className="text-4xl">🎯</span>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  {isZh ? '我们的使命' : 'Our Mission'}
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  {isZh
                    ? 'TaoHeal 致力于让中医养生知识触手可及，帮助现代人在繁忙的生活中找到平衡与健康。我们相信，通过传承和创新，可以让古老的智慧在今天依然焕发光彩。'
                    : 'TaoHeal is dedicated to making TCM wellness knowledge accessible to everyone, helping modern people find balance and health in busy lives. We believe that through preservation and innovation, ancient wisdom can shine brightly today.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 mt-8">
              <span className="text-4xl">👁️</span>
              <div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  {isZh ? '我们的愿景' : 'Our Vision'}
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  {isZh
                    ? '成为全球最受信赖的中医养生平台，连接东西方健康理念，为人类健康福祉做出贡献。'
                    : 'To become the most trusted TCM wellness platform worldwide, bridging Eastern and Western health philosophies for human well-being.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {isZh ? '我们的价值观' : 'Our Values'}
            </h2>
            <p className="text-text-secondary">
              {isZh ? '指导我们一切行动的核心原则' : 'Core principles guiding everything we do'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{value.title}</h3>
                <p className="text-text-muted leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              {isZh ? '我们提供' : 'What We Offer'}
            </h2>
            <p className="text-text-secondary">{isZh ? '全方位的中医养生体验' : 'A comprehensive TCM wellness experience'}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-border hover:border-primary-200 transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="font-bold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-sm text-text-muted">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="text-5xl mb-6">🌟</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isZh ? '加入我们的健康旅程' : 'Join Our Wellness Journey'}
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            {isZh
              ? '无论您是中医养生的初学者还是爱好者，TaoHeal 都能为您提供专业的知识和个性化的建议'
              : 'Whether you are new to TCM or an enthusiast, TaoHeal provides professional knowledge and personalized advice'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/tools/body-type-quiz`}
              className="px-8 py-4 bg-white text-primary-700 rounded-xl hover:bg-primary-50 transition-all font-medium shadow-lg"
            >
              🎯 {isZh ? '开始测试体质' : 'Start Body Type Quiz'}
            </Link>
            <Link
              href={`/${locale}/knowledge`}
              className="px-8 py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-400 transition-all font-medium"
            >
              📚 {isZh ? '浏览知识库' : 'Explore Knowledge Base'}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-accent-50 border border-accent-200 rounded-2xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">⚠️</span>
              <div>
                <h3 className="font-bold text-text-primary mb-2">
                  {isZh ? '免责声明' : 'Disclaimer'}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {isZh
                    ? '本站内容仅供参考和学习使用，不能替代专业医疗诊断和治疗。如有健康问题，请及时咨询专业医师或中医师。'
                    : 'Content on this site is for reference and learning purposes only and does not replace professional medical diagnosis and treatment. Please consult a qualified healthcare professional for health concerns.'}
                </p>
                <Link
                  href={`/${locale}/legal/disclaimer`}
                  className="text-sm text-accent-700 hover:text-accent-800 font-medium mt-2 inline-block"
                >
                  {isZh ? '了解更多 →' : 'Learn more →'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
