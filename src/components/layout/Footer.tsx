import Link from 'next/link';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const isZh = locale === 'zh';

  return (
    <footer className="bg-gray-800 text-text-inverse">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🌿</span>
              <span className="text-xl font-bold">DaoHeal</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              {isZh ? 'No Tox, All TCM - 用自然方式找回健康' : 'No Tox, All TCM - Reclaim your health naturally'}
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-inverse hover:bg-gray-700 p-2 rounded-lg transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://weibo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-text-inverse hover:bg-gray-700 p-2 rounded-lg transition-colors"
                aria-label="Weibo"
              >
                <span className="text-sm font-bold">微</span>
              </a>
              <a
                href="#"
                className="text-text-muted hover:text-text-inverse hover:bg-gray-700 p-2 rounded-lg transition-colors"
                aria-label="WeChat"
              >
                <span className="text-sm font-bold">信</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">{isZh ? '导航' : 'Navigation'}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}`} className="text-text-muted hover:text-text-inverse transition-colors">
                  {isZh ? '首页' : 'Home'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/knowledge`} className="text-text-muted hover:text-text-inverse transition-colors">
                  {isZh ? '知识库' : 'Knowledge'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/tools/body-type-quiz`} className="text-text-muted hover:text-text-inverse transition-colors">
                  {isZh ? '体质测试' : 'Body Type Quiz'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">{isZh ? '社区' : 'Community'}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/community`} className="text-text-muted hover:text-text-inverse transition-colors">
                  {isZh ? '社区交流' : 'Community'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-text-muted hover:text-text-inverse transition-colors">
                  {isZh ? '关于我们' : 'About Us'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide">{isZh ? '法律' : 'Legal'}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/legal/disclaimer`} className="text-text-muted hover:text-text-inverse transition-colors">
                  {isZh ? '免责声明' : 'Disclaimer'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/legal/privacy`} className="text-text-muted hover:text-text-inverse transition-colors">
                  {isZh ? '隐私政策' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/legal/terms`} className="text-text-muted hover:text-text-inverse transition-colors">
                  {isZh ? '服务条款' : 'Terms of Service'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-sm">
            © 2026 DaoHeal · 道·疗愈. {isZh ? '保留所有权利。' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span>🌿</span>
            <span>{isZh ? 'No Tox, All TCM' : 'No Tox, All TCM'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
