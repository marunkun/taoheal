'use client';

import { useState } from 'react';

interface NewsletterProps {
  locale?: string;
}

export default function Newsletter({ locale = 'zh' }: NewsletterProps) {
  const isZh = locale === 'zh';
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Subscription failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary-600 to-primary-700 py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
        <span className="text-3xl">📬</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        {isZh ? '订阅健康资讯' : 'Subscribe to Wellness Updates'}
      </h2>
      <p className="text-green-100 mb-8 max-w-xl mx-auto">
        {isZh
          ? '获取最新中医养生知识、食疗建议和健康生活方式，与健康同行'
          : 'Get the latest TCM wellness knowledge, dietary therapy suggestions, and healthy lifestyle tips'}
      </p>

      {submitted ? (
        <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-5 rounded-xl max-w-md mx-auto">
          <div className="text-2xl mb-2">✅</div>
          <p className="font-medium">{isZh ? '感谢订阅！' : 'Thanks for subscribing!'}</p>
          <p className="text-sm text-green-100 mt-1">
            {isZh ? '我们会定期发送健康资讯到您的邮箱' : 'We will send wellness updates to your email regularly'}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isZh ? '输入您的邮箱地址' : 'Enter your email address'}
            className="flex-1 px-5 py-3 rounded-xl bg-white/95 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all font-medium shadow-lg shadow-amber-500/30 disabled:opacity-50 whitespace-nowrap"
          >
            {loading ? (isZh ? '订阅中...' : 'Subscribing...') : (isZh ? '立即订阅' : 'Subscribe Now')}
          </button>
        </form>
      )}

      <p className="text-primary-100 text-xs mt-6">
        {isZh ? '🔒 我们尊重您的隐私，绝不分享您的信息' : '🔒 We respect your privacy and never share your information'}
      </p>
    </div>
    </section>
  );
}
