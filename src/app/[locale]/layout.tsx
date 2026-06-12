import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';

const locales = ['zh', 'en'];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isZh = locale === 'zh';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://taoheal.pages.dev';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: isZh ? 'TaoHeal - 中医养生双语社区' : 'TaoHeal - Bilingual TCM Wellness Community',
      template: isZh ? '%s | TaoHeal 中医养生' : '%s | TaoHeal TCM Wellness',
    },
    description: isZh
      ? '用自然方式找回健康 - 专为全球华人及中国文化爱好者打造的中医养生双语社区，提供专业的中医知识、体质测试和食疗建议。'
      : 'Reclaim your health naturally - A bilingual TCM wellness community for global Chinese and enthusiasts. Professional TCM knowledge, body type quizzes, and dietary advice.',
    keywords: isZh
      ? ['中医', '养生', '体质测试', '穴位按摩', '食疗', '双语', '健康']
      : ['TCM', 'Traditional Chinese Medicine', 'wellness', 'body type quiz', 'acupressure', 'dietary therapy', 'health'],
    authors: [{ name: 'TaoHeal' }],
    creator: 'TaoHeal',
    publisher: 'TaoHeal',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: locale === 'zh' ? ['en_US'] : ['zh_CN'],
      siteName: 'TaoHeal',
      title: isZh ? 'TaoHeal - 中医养生双语社区' : 'TaoHeal - Bilingual TCM Wellness Community',
      description: isZh
        ? '用自然方式找回健康 - 专为全球华人及中医爱好者打造的中医养生双语社区'
        : 'Reclaim your health naturally - A bilingual TCM wellness community',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'TaoHeal - TCM Wellness Community',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isZh ? 'TaoHeal - 中医养生双语社区' : 'TaoHeal - Bilingual TCM Wellness Community',
      description: isZh
        ? '用自然方式找回健康 - 专为全球华人及中医爱好者打造的中医养生双语社区'
        : 'Reclaim your health naturally - A bilingual TCM wellness community',
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
      <Header />
      <main className="flex-1" role="main">
        {children}
      </main>
      <Footer locale={locale} />
      <BackToTop />
    </>
  );
}