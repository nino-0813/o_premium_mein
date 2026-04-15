'use client';

import { motion } from 'motion/react';
import { Check, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProductClient() {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative py-24 sm:py-32 bg-brand-green-light/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 tracking-widest break-words sm:break-keep"
          >
            製品情報
          </motion.h1>
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-0.5 bg-brand-green mx-auto"
          />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16">
            <motion.div initial={false} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 relative">
                <Image
                  src="/images/o-premium-face-towel-main.webp"
                  alt="O PREMIUM 歯科用 穴あきタオル（ドレープタオル）"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src="/images/ChatGPT Image 2026年3月25日 23_04_05.png"
                    alt="超甘撚り糸のタオル生地"
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src="/images/スクリーンショット 2026-03-25 22.59.05.png"
                    alt="穴あき部分のパイピング縫製"
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image src="/images/スクリーンショット 2026-03-25 22.58.58.png" alt="ブランドタグ" fill className="object-cover" sizes="150px" />
                </div>
              </div>
            </motion.div>

            <motion.div initial={false} animate={{ opacity: 1, x: 0 }} className="flex flex-col justify-center">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-brand-green-light text-brand-green text-xs font-medium tracking-widest rounded-full">
                  歯科専用設計
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-gray-900 mb-4 break-words sm:break-keep">O PREMIUM（オー・プレミアム）</h2>
              <p className="text-2xl text-brand-green font-serif mb-8">
                ¥1,100 <span className="text-sm text-gray-500 font-sans">/ 1枚 (税込)</span>
              </p>

              <p className="text-gray-600 leading-relaxed mb-10">
                歯科用の穴あきタオル（ドレープタオル）。超甘撚り糸による極上のふわふわ感と優れた吸水性で、治療中の水はねや飛散物から患者様を守ります。
              </p>

              <div className="space-y-4 mb-12">
                <h3 className="font-medium text-gray-900 border-b border-gray-200 pb-2">製品仕様</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-sm">
                  <div className="flex justify-between sm:block border-b border-gray-100 pb-2 sm:border-0 sm:pb-0">
                    <dt className="text-gray-500 mb-1">サイズ</dt>
                    <dd className="text-gray-900 font-medium">約 35cm × 34cm</dd>
                  </div>
                  <div className="flex justify-between sm:block border-b border-gray-100 pb-2 sm:border-0 sm:pb-0">
                    <dt className="text-gray-500 mb-1">素材</dt>
                    <dd className="text-gray-900 font-medium">綿100%（超甘撚り糸使用）</dd>
                  </div>
                  <div className="flex justify-between sm:block border-b border-gray-100 pb-2 sm:border-0 sm:pb-0">
                    <dt className="text-gray-500 mb-1">重さ</dt>
                    <dd className="text-gray-900 font-medium">約 50g</dd>
                  </div>
                  <div className="flex justify-between sm:block border-b border-gray-100 pb-2 sm:border-0 sm:pb-0">
                    <dt className="text-gray-500 mb-1">生産国</dt>
                    <dd className="text-gray-900 font-medium">中国</dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-4 mb-12">
                <h3 className="font-medium text-gray-900 border-b border-gray-200 pb-2">特徴</h3>
                <ul className="space-y-3">
                  {[
                    '治療中の水はね・飛散対策に',
                    '患者様の不快感を減らす肌触り',
                    '治療しやすい「O」サイズ設計',
                    'ほつれ防止のパイピング縫製',
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <Check className="w-5 h-5 text-brand-green mr-3 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/purchase"
                  className="flex-1 flex items-center justify-center px-8 py-4 text-sm font-medium tracking-widest text-white bg-brand-green hover:bg-brand-green-dark transition-colors rounded-sm"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  購入ページへ
                </Link>
                <Link
                  href="/sample"
                  className="flex-1 flex items-center justify-center px-8 py-4 text-sm font-medium tracking-widest text-brand-green bg-white border border-brand-green hover:bg-brand-green-light transition-colors rounded-sm"
                >
                  無料サンプル請求
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

