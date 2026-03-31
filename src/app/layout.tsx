import type { Metadata } from 'next';
import Script from 'next/script';
import { Noto_Sans_JP, Shippori_Mincho } from 'next/font/google';
import Layout from '@/src/components/Layout';
import { getSiteUrl } from '@/src/lib/site';
import './globals.css';

const GA_MEASUREMENT_ID = 'G-VR85FTWKJ2';

const metadataBase = new URL(getSiteUrl());
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
  metadataBase,
  title: '歯科専用フェイスタオル | Premium Dental Towel',
  description:
    '現場の歯科衛生士が考えた、超甘撚り糸で織りあげた歯科専用プレミアムタオル。O PREMIUM（オー・プレミアム）',
  openGraph: {
    title: '歯科専用フェイスタオル | O PREMIUM',
  },
  verification: {
    google: 'fDRaibgQ2klb6HO0ojrsHeY8vnxA7_-zxUzQzH66nsA',
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
        {/* Google tag (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
