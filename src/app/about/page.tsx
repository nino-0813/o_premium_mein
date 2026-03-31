'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative py-24 sm:py-32 bg-brand-green-light/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 tracking-widest break-words sm:break-keep"
          >
            ブランドストーリー
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-0.5 bg-brand-green mx-auto"
          />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-sm sm:prose-lg prose-green mx-auto text-gray-700 leading-loose max-w-full"
          >
            <h2 className="font-serif text-lg sm:text-xl md:text-2xl text-brand-green text-center mb-8 sm:mb-12 break-words sm:break-keep">
              「もっと患者様に優しく、もっと治療しやすいタオルを」
            </h2>

            <p className="mb-8">
              毎日、診療の現場で患者様のお顔にタオルをかける歯科衛生士。<br />
              「O PREMIUM」は、そんな現場の切実な想いから生まれました。
            </p>

            <p className="mb-8">
              歯科治療やクリーニングの際、どうしても発生してしまう水はねや、歯・金属の破片の飛散。<br />
              これらから患者様を確実にお守りしつつ、息苦しさやタオルのゴワつきによる不快感を取り除きたい。そして何より、術者である私たちが「最も治療しやすい」形状にしたい。
            </p>

            <div className="relative w-full rounded-xl my-12 overflow-hidden aspect-[2/1]">
              <Image
                src="/images/o-premium-dental-clinic.webp"
                alt="O PREMIUM ブランドタグと歯科医院の診療風景"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            <h3 className="font-serif text-lg sm:text-xl text-gray-900 mt-10 sm:mt-12 mb-4 sm:mb-6 border-l-4 border-brand-green pl-4 break-words sm:break-keep">
              たどり着いた「超甘撚り糸」と「ベストな穴（O）のサイズ」
            </h3>

            <p className="mb-8">
              私たちがこだわったのは、大きく2つのポイントです。
            </p>

            <ul className="list-disc pl-6 mb-8 space-y-4">
              <li>
                <strong>超甘撚り（ちょうあまより）糸の採用：</strong><br />
                糸の撚り（ねじり）を極限まで甘くすることで、驚くほどふんわりとした肌触りと、優れた吸水性を実現しました。毛羽立ちも少なく、患者様のお肌を優しく包み込みます。
              </li>
              <li>
                <strong>計算された「O（オー）」サイズ：</strong><br />
                口元の穴のサイズは、大きすぎても小さすぎてもいけません。飛散物から顔を守りつつ、ドクターや衛生士がスムーズにアプローチできる「ベストな穴のサイズ」を徹底的に検証しました。
              </li>
              <li>
                <strong>パイピング縫製：</strong><br />
                毎日のハードな洗濯にも耐えられるよう、ほつれ防止のためのパイピング縫製を施し、耐久性とデザイン性を両立させました。
              </li>
            </ul>

            <div className="relative w-full rounded-xl my-12 overflow-hidden aspect-[2/1]">
              <Image
                src="/images/o-premium-towels-product.webp"
                alt="O PREMIUM タオル製品（穴あきフェイスタオルとロールタオル）"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            <h3 className="font-serif text-lg sm:text-xl text-gray-900 mt-10 sm:mt-12 mb-4 sm:mb-6 border-l-4 border-brand-green pl-4 break-words sm:break-keep">
              「O PREMIUM（オー・プレミアム）」に込めた想い
            </h3>

            <p className="mb-8">
              ブランド名である「O PREMIUM」は、こだわりの穴（O）の形状と、患者様に提供するプレミアムな時間（premium）を表しています。
            </p>

            <p className="mb-16">
              現場の歯科衛生士が本気で考えた、歯科専用プレミアムタオル。<br />
              この一枚が、貴院の診療をより快適で、より質の高いものへと導くお手伝いができれば幸いです。
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
