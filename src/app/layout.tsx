import type { Metadata } from 'next';
import './globals.css';
import { fonts } from '@/lib/fonts';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata('zh');

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
        <meta name="theme-color" content="#5A8A6A" />
      </head>
      <body className="min-h-screen flex flex-col bg-bg">{children}</body>
    </html>
  );
}