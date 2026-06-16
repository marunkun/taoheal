import type { Metadata } from 'next';
import './globals.css';
import { fonts } from '@/lib/fonts';

export const metadata: Metadata = {
  metadataBase: new URL('https://taoheal.pages.dev'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${fonts.heading} ${fonts.body} ${fonts.cnBody} ${fonts.cnHeading}`}>
      <body className="min-h-screen flex flex-col bg-bg">{children}</body>
    </html>
  );
}