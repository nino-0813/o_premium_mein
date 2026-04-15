import type { Metadata } from 'next';
import Script from 'next/script';
import { getSiteUrl } from '@/src/lib/site';
import ProductClient from './ProductClient';

const productUrl = '/product';

export const metadata: Metadata = {
  title: '歯科用 穴あきタオル（ドレープタオル） | 製品情報 | O PREMIUM',
  description:
    '歯科用の穴あきタオル（ドレープタオル）を、超甘撚り糸のふわふわ感と吸水性で。治療中の水はね対策・患者様の不快感軽減に。無料サンプル請求も可能です。',
  alternates: { canonical: productUrl },
  openGraph: { title: '歯科用 穴あきタオル（ドレープタオル） | O PREMIUM', url: productUrl },
};

export default function ProductPage() {
  const siteUrl = getSiteUrl();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'O PREMIUM（オー・プレミアム）',
    description: '歯科用の穴あきタオル（ドレープタオル）。超甘撚り糸の肌触りと吸水性で水はね対策に。',
    brand: { '@type': 'Brand', name: 'O PREMIUM' },
    sku: 'opremium-towel-01',
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}${productUrl}`,
      priceCurrency: 'JPY',
      price: '1100',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <Script id="ld-product" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <ProductClient />
    </>
  );
}
