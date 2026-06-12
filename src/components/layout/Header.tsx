'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Search from './Search';

export default function Header() {
  const params = useParams<{ locale: string }>();
  const locale = params.locale || 'zh';
  const isZh = locale === 'zh';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = isZh
    ? [
        { label: '首页', href: `/${locale}` },
        { label: '知识库', href: `/${locale}/knowledge` },
        { label: '体质测试', href: `/${locale}/tools/body-type-quiz` },
        { label: '社区', href: `/${locale}/community` },
        { label: '关于', href: `/${locale}/about` },
      ]
    : [
        { label: 'Home', href: `/${locale}` },
        { label: 'Knowledge', href: `/${locale}/knowledge` },
        { label: 'Body Type Quiz', href: `/${locale}/tools/body-type-quiz` },
        { label: 'Community', href: `/${locale}/community` },
        { label: 'About', href: `/${locale}/about` },
      ];

  const otherLang = isZh ? 'en' : 'zh';

  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50" role="banner">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            href={`/${locale}`}
            className="flex items-center space-x-2 group"
            aria-label="TaoHeal Home"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300" role="img" aria-label="leaf">
              🌿
            </span>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              TaoHeal
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-primary-50 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <Search locale={locale} />
            <Link
              href={`/${otherLang}`}
              className="hidden sm:flex px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors text-sm font-medium"
              aria-label={isZh ? 'Switch to English' : '切换到中文'}
            >
              {isZh ? 'EN' : '中文'}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-border-light pt-3 animate-in slide-in-from-top-2">
            <nav className="flex flex-col space-y-1" role="navigation" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-text-primary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors text-sm font-medium"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-border-light">
                <Link
                  href={`/${otherLang}`}
                  className="block px-4 py-3 text-left text-text-primary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {isZh ? 'English' : '中文'}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
