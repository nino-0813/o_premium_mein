import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: '歯科用 穴あきタオル（ドレープタオル）なら | O PREMIUM（オー・プレミアム）',
  description:
    '歯科用の穴あきタオル（ドレープタオル）を、超甘撚り糸のふわふわ感と吸水性で。治療中の水はね対策や患者様の不快感軽減に。無料サンプル請求受付中。',
  alternates: { canonical: '/' },
  openGraph: { title: '歯科用 穴あきタオル（ドレープタオル）なら | O PREMIUM', url: '/' },
};

export default function Home() {
  return <HomeClient />;
}
