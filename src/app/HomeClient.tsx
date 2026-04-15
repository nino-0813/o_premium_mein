'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const HERO_VIDEO_SRC = '/videos/フェイスタオル動画制作依頼.mp4';

export default function HomeClient() {
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setVideoReady(true), 400);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="bg-white">
      <section className="relative min-h-[55vh] h-[60vh] sm:min-h-[520px] sm:h-[70vh] md:h-[80vh] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {videoReady ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover origin-center"
              style={{ transform: 'scale(1.15)' }}
              aria-hidden
            >
              <source src={HERO_VIDEO_SRC} type="video/mp4" />
            </video>
          ) : (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm tracking-widest">読み込み中</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full min-w-0">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl min-w-0"
          >
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight mb-4 sm:mb-6 break-words sm:break-keep">
              歯科専門<br />
              オー・プレミアム<br />
              <span className="text-brand-green">O PREMIUM</span>
            </h1>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10 tracking-wide">
              超甘撚り（ちょうあまより）糸で織りあげた、吸水性に優れ、とにかくふわふわのタオルです。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/sample"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-medium tracking-widest text-white bg-brand-green hover:bg-brand-green-dark transition-colors rounded-sm"
              >
                無料サンプルを請求する
                <ChevronRight className="ml-2 w-4 h-4 shrink-0" />
              </Link>
              <Link
                href="/product"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-medium tracking-widest text-brand-green bg-white border border-brand-green hover:bg-brand-green-light transition-colors rounded-sm"
              >
                製品詳細を見る
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-brand-green-light/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-gray-900 mb-3 sm:mb-4 tracking-widest break-words sm:break-keep">O PREMIUM の3つの特徴</h2>
            <div className="w-12 h-0.5 bg-brand-green mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {[
              {
                title: '飛散物から患者様を守る',
                desc: '歯科治療やクリーニング時に飛散する不快な水はね、歯や金属の破片から患者様をしっかりと守ります。',
              },
              {
                title: 'こだわりの「O」サイズ',
                desc: '治療しやすく、患者様の不快感を取り除くベストな穴（O：オー）のサイズに徹底的にこだわりました。',
              },
              {
                title: '超甘撚り糸とパイピング',
                desc: '毛羽立ちが少なく肌触りのよい超甘撚り糸で織りあげ、ほつれ防止にパイピング縫製を施しました。',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 text-center"
              >
                <h3 className="font-serif text-lg sm:text-xl text-gray-900 mb-3 sm:mb-4 break-words sm:break-keep">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/o-premium-towel-stack.webp"
                alt="O PREMIUM 歯科専用プレミアムタオル（積み上げたタオルとブランドタグ）"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              initial={false}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-gray-900 mb-4 sm:mb-6 leading-tight break-words sm:break-keep">
                「現場の歯科衛生士が<br />本当に欲しかったタオル」
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                毎日多くの患者様と接する中で気になっていた、治療中の水はねや金属片の飛散。そして、タオルを顔にかけられる患者様のわずかな緊張感。<br /><br />
                「もっと治療がしやすく、患者様も快適に過ごせるタオルはないだろうか？」<br />
                そんな現場の歯科衛生士の想いから「O PREMIUM」は誕生しました。超甘撚り糸の極上のふわふわ感と、計算し尽くされた穴（O）のサイズが、これまでにない快適な診療空間を実現します。
              </p>
              <Link
                href="/about"
                className="inline-flex items-center text-brand-green font-medium tracking-widest hover:text-brand-green-dark transition-colors"
              >
                ブランドストーリーを読む
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-brand-green py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-white mb-4 sm:mb-6 break-words sm:break-keep">まずは、その手でお確かめください。</h2>
          <p className="text-brand-green-light text-sm sm:text-base mb-8 sm:mb-10 leading-relaxed">
            実際の質感や吸水性をご確認いただけるよう、<br className="hidden sm:block" />
            歯科医院様限定で無料サンプルセットをお送りしております。
          </p>
          <Link
            href="/sample"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-medium tracking-widest text-brand-green bg-white hover:bg-gray-50 transition-colors rounded-sm shadow-lg"
          >
            無料サンプルを請求する
          </Link>
        </div>
      </section>
    </div>
  );
}

