import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import HtmlLangSetter from '@/components/layout/HtmlLangSetter';

const locales = ['zh', 'en'];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isZh = locale === 'zh';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://daoheal.pages.dev';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: isZh ? 'DaoHeal - 道·疗愈 | 中医养生双语社区' : 'DaoHeal · 道·疗愈 | Bilingual TCM Wellness Community',
      template: isZh ? '%s | DaoHeal 中医养生' : '%s | DaoHeal TCM Wellness',
    },
    description: isZh
      ? 'No Tox, All TCM - 用自然方式找回健康。专为海外华人及国际用户打造的中医养生双语社区，提供专业的中医知识、体质测试和食疗建议。'
      : 'No Tox, All TCM - Reclaim your health naturally. A bilingual TCM wellness community for global Chinese and enthusiasts. Professional TCM knowledge, body type quizzes, and dietary advice.',
    keywords: isZh
      ? ['中医', '养生', '体质测试', '穴位按摩', '食疗', '双语', '健康', 'DaoHeal']
      : ['TCM', 'Traditional Chinese Medicine', 'wellness', 'body type quiz', 'acupressure', 'dietary therapy', 'health', 'DaoHeal'],
    authors: [{ name: 'DaoHeal' }],
    creator: 'DaoHeal',
    publisher: 'DaoHeal',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: locale === 'zh' ? ['en_US'] : ['zh_CN'],
      siteName: 'DaoHeal',
      title: isZh ? 'DaoHeal - 道·疗愈 | 中医养生双语社区' : 'DaoHeal · 道·疗愈 | Bilingual TCM Wellness Community',
      description: isZh
        ? 'No Tox, All TCM - 用自然方式找回健康'
        : 'No Tox, All TCM - Reclaim your health naturally',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'DaoHeal · 道·疗愈 - TCM Wellness Community',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh ? 'DaoHeal - 道·疗愈 | 中医养生双语社区' : 'DaoHeal · 道·疗愈 | Bilingual TCM Wellness Community',
      description: isZh
        ? 'No Tox, All TCM - 用自然方式找回健康'
        : 'No Tox, All TCM - Reclaim your health naturally',
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) {
    return null;
  }

  return (
    <>
      <HtmlLangSetter locale={locale} />
      <Header locale={locale} />
      <main className="flex-1" role="main">
        {children}
      </main>
      <Footer locale={locale} />
      <BackToTop />
    </>
  );
}