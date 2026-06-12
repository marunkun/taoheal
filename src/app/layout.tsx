import './globals.css';
import { fonts } from '@/lib/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={`${fonts.heading} ${fonts.body} ${fonts.cnBody} ${fonts.cnHeading}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="description" content="TaoHeal - 传承千年智慧，开启健康人生。探索中医养生奥秘，专业体质测试，个性化养生方案。" />
        <meta name="theme-color" content="#5A8A6A" />
      </head>
      <body className="min-h-screen flex flex-col bg-bg">{children}</body>
    </html>
  );
}