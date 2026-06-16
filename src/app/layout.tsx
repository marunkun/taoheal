import type { Metadata } from 'next';
import './globals.css';
import { fonts } from '@/lib/fonts';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://daoheal.pages.dev'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${fonts.heading} ${fonts.body} ${fonts.cnBody} ${fonts.cnHeading}`}>
      <body className="min-h-screen flex flex-col bg-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}