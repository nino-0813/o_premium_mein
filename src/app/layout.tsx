import type { Metadata } from 'next';
import { Noto_Sans_JP, Shippori_Mincho } from 'next/font/google';
import Layout from '@/src/components/Layout';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-jp',
});

const shipporiMincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-shippori-mincho',
});

export const metadata: Metadata = {
  title: '歯科専用フェイスタオル | Premium Dental Towel',
  description:
    '現場の歯科衛生士が考えた、超甘撚り糸で織りあげた歯科専用プレミアムタオル。O premium（オー・プレミアム）',
  openGraph: {
    title: '歯科専用フェイスタオル | O premium',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${shipporiMincho.variable}`}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
