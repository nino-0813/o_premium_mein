'use client';

import { motion } from 'motion/react';
import { ShoppingBag, Info } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function Purchase() {
  const [quantity, setQuantity] = useState(1);
  const price = 1200;

  return (
    <div className="bg-white min-h-screen">
      <section className="relative py-24 sm:py-32 bg-brand-green-light/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 tracking-widest break-keep"
          >
            ご購入
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2 bg-gray-50 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-gray-100">
                <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-white border border-gray-100 relative">
                  <Image
                    src="/images/o-premium-face-towel-main.webp"
                    alt="O premium 歯科専用フェイスタオル"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h2 className="font-serif text-xl text-gray-900 mb-2">O premium（オー・プレミアム）</h2>
                <p className="text-sm text-gray-500 mb-4">グレー / 穴あき仕様</p>
                <div className="text-2xl text-brand-green font-serif">
                  ¥{price.toLocaleString()} <span className="text-xs text-gray-500 font-sans">/ 枚 (税抜)</span>
                </div>
              </div>

              <div className="md:col-span-3 p-6 sm:p-8 md:p-12">
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      数量 <span className="text-xs text-gray-500 font-normal ml-2">※10枚単位でのご注文となります</span>
                    </label>
                    <div className="flex items-center space-x-4">
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="block w-full max-w-[200px] rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm py-3 px-4 border"
                      >
                        {[1, 2, 3, 4, 5, 10, 20].map((num) => (
                          <option key={num} value={num}>{num * 10}枚セット</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="bg-brand-green-light/30 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">小計 ({quantity * 10}枚)</span>
                      <span className="text-lg font-medium text-gray-900">¥{(price * quantity * 10).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-600">消費税 (10%)</span>
                      <span className="text-sm text-gray-600">¥{Math.floor(price * quantity * 10 * 0.1).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-brand-green/20 pt-4 flex justify-between items-end">
                      <span className="text-base font-medium text-gray-900">合計金額</span>
                      <span className="text-3xl font-serif text-brand-green">
                        ¥{Math.floor(price * quantity * 10 * 1.1).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start bg-blue-50 p-4 rounded-md">
                    <Info className="w-5 h-5 text-blue-400 mt-0.5 mr-3 shrink-0" />
                    <p className="text-xs text-blue-800 leading-relaxed">
                      現在、オンライン決済システムの準備中です。<br />
                      「購入手続きへ進む」をクリックすると、専用の注文フォーム（Googleフォーム等）へ遷移します。請求書払い（月末締め翌月末払い）にて対応させていただきます。
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert('注文フォームへ遷移します（デモ）')}
                    className="w-full flex items-center justify-center px-8 py-4 text-base font-medium tracking-widest text-white bg-brand-green hover:bg-brand-green-dark transition-colors rounded-sm shadow-md"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    購入手続きへ進む
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
