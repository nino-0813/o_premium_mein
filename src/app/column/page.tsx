import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'コラム | 歯科の水はね対策・穴あきタオル | O PREMIUM',
  description:
    '歯科治療中の水はね対策、歯科用穴あきタオル（ドレープタオル）の選び方、患者様の不快感軽減など、現場目線でまとめたコラムです。',
  alternates: { canonical: '/column' },
};

const posts = [
  {
    slug: 'dental-water-splash',
    title: '歯科治療中の水はね・飛散対策｜患者様の不快感を減らす方法',
    lead: '課題認識型の入り口に。水はねの原因と、患者様体験を落とさない現実的な対策を整理します。',
    image: {
      src: '/images/hero-water-splash.webp',
      alt: '歯科医院の水はね対策ガイド（原因と改善ステップの図解）',
    },
  },
  {
    slug: 'drape-towel-guide',
    title: '歯科用穴あきタオル（ドレープタオル）の選び方｜素材・サイズ・肌触りで比べる',
    lead: '購買意図が高いキーワードの受け皿。比較観点と、院内導入で失敗しないポイントをまとめます。',
    image: {
      src: '/images/hero-drape-towel.webp',
      alt: '失敗しない歯科用穴あきタオルの選び方（比較ポイントの図解）',
    },
  },
  {
    slug: 'patient-satisfaction-towel',
    title: '患者満足度を上げる歯科医院のタオル活用法｜治療中の不快感を減らす',
    lead: '「経営改善」文脈で刺さるテーマ。タオルが患者体験と口コミに効く理由を整理します。',
    image: {
      src: '/images/hero-patient-satisfaction.webp',
      alt: '患者満足度を上げる歯科医院のタオル活用法（スライド）',
    },
  },
] as const;

export default function ColumnIndexPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative py-24 sm:py-32 bg-brand-green-light/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 tracking-widest break-words sm:break-keep">
            コラム
          </h1>
          <div className="w-16 h-0.5 bg-brand-green mx-auto" />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/column/${p.slug}`}
                className="group block rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[16/9] bg-gray-50">
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] tracking-widest text-gray-700 border border-white/50">
                      COLUMN
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <h2 className="font-serif text-base sm:text-lg text-gray-900 leading-snug">
                    {p.title}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed mt-3">
                    {p.lead}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-sm text-brand-green tracking-widest">
                    <span>読む</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 sm:mt-12 rounded-2xl bg-brand-green-light/30 border border-brand-green/20 p-6 sm:p-8 text-center">
            <p className="text-gray-700 mb-4">まずは実物で確かめたい方へ</p>
            <Link
              href="/sample"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-widest text-white bg-brand-green hover:bg-brand-green-dark transition-colors rounded-sm shadow-md"
            >
              無料サンプルを請求する
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

