import Link from 'next/link';

export default async function CommunityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  const categories = [
    {
      icon: '💬',
      title: isZh ? '问答交流' : 'Q&A Forum',
      desc: isZh ? '与其他养生爱好者交流经验，解答疑问' : 'Connect with wellness enthusiasts, share experiences',
      color: 'from-blue-400 to-blue-600',
      count: '1,234',
    },
    {
      icon: '🍲',
      title: isZh ? '食疗食谱' : 'Recipes',
      desc: isZh ? '分享健康美味的食疗食谱，吃出健康好身体' : 'Share healthy and delicious therapeutic recipes',
      color: 'from-amber-400 to-orange-500',
      count: '567',
    },
    {
      icon: '🧘',
      title: isZh ? '运动养生' : 'Exercise Wellness',
      desc: isZh ? '太极、八段锦、瑜伽等养生运动交流' : 'Tai Chi, Ba Duan Jin, Yoga and more',
      color: 'from-purple-400 to-pink-500',
      count: '432',
    },
    {
      icon: '🌿',
      title: isZh ? '中草药' : 'Herbs',
      desc: isZh ? '中草药识别与使用心得分享' : 'Chinese herb identification and usage tips',
      color: 'from-green-400 to-emerald-600',
      count: '891',
    },
  ];

  const discussions = [
    {
      title: isZh ? '春季养肝有哪些好方法？' : 'What are good ways to nourish the liver in spring?',
      author: isZh ? '养生达人小王' : 'Wellness Expert',
      replies: isZh ? '42 回复' : '42 replies',
      time: isZh ? '2 小时前' : '2 hours ago',
      hot: true,
    },
    {
      title: isZh ? '如何改善失眠问题？求推荐食疗方' : 'How to improve insomnia? Seeking dietary advice',
      author: isZh ? '失眠患者' : 'Insomnia Sufferer',
      replies: isZh ? '28 回复' : '28 replies',
      time: isZh ? '5 小时前' : '5 hours ago',
    },
    {
      title: isZh ? '气血不足怎么调理？分享我的经验' : 'How to nourish Qi and Blood? Sharing my experience',
      author: isZh ? '中医爱好者' : 'TCM Enthusiast',
      replies: isZh ? '56 回复' : '56 replies',
      time: isZh ? '1 天前' : '1 day ago',
    },
  ];

  return (
    <div className="min-h-screen bg-bg-section">
      <section className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">💬</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isZh ? '养生社区' : 'Wellness Community'}
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            {isZh
              ? '与全球养生爱好者交流，分享经验，共同成长'
              : 'Connect with wellness enthusiasts worldwide, share experiences, and grow together'}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm">
            <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">5,000+</div>
              <div className="text-purple-200">{isZh ? '活跃用户' : 'Active Users'}</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">10,000+</div>
              <div className="text-purple-200">{isZh ? '讨论话题' : 'Discussions'}</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl px-6 py-3">
              <div className="text-2xl font-bold">100+</div>
              <div className="text-purple-200">{isZh ? '专家入驻' : 'TCM Experts'}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category) => (
              <div
                key={category.title}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-border"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{category.title}</h3>
                <p className="text-sm text-text-muted mb-4">{category.desc}</p>
                <div className="text-sm text-primary font-medium">
                  {category.count} {isZh ? '讨论' : 'posts'} →
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">
                  {isZh ? '热门讨论' : 'Hot Discussions'}
                </h2>
                <p className="text-sm text-text-muted mt-1">
                  {isZh ? '看看大家最近在讨论什么' : 'See what everyone is discussing'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {discussions.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-bg-section transition-colors cursor-pointer border border-border hover:border-primary-200"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {item.author.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors mb-1">
                      {item.hot && <span className="mr-2">🔥</span>}
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span>{item.author}</span>
                      <span>•</span>
                      <span>{item.replies}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                  <span className="text-text-muted group-hover:text-primary-500 transition-colors">→</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-200 text-center">
            <div className="text-4xl mb-4">🚧</div>
            <h3 className="text-xl font-bold text-text-primary mb-2">
              {isZh ? '社区功能建设中' : 'Community Features Coming Soon'}
            </h3>
            <p className="text-text-secondary">
              {isZh
                ? '我们正在打造更完善的社区交流平台，敬请期待！'
                : 'We are building a more complete community platform, stay tuned!'}
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              href={`/${locale}/tools/body-type-quiz`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors font-medium shadow-lg shadow-green-600/20"
            >
              🎯 {isZh ? '测试你的体质类型' : 'Test Your Body Type'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
