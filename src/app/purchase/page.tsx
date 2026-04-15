'use client';

import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function Purchase() {
  const [quantity, setQuantity] = useState(1);
  const unitPriceTaxIncluded = 1100;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleCheckout() {
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });

      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || '決済セッションの作成に失敗しました。');
      }

      window.location.assign(data.url);
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : 'エラーが発生しました。');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="relative py-24 sm:py-32 bg-brand-green-light/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 tracking-widest break-words sm:break-keep"
          >
            ご購入
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-2 bg-gray-50 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-gray-100">
                <div className="aspect-square rounded-xl overflow-hidden mb-6 bg-white border border-gray-100 relative">
                  <Image
                    src="/images/o-premium-face-towel-main.webp"
                    alt="O PREMIUM 歯科専用フェイスタオル"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h2 className="font-serif text-xl text-gray-900 mb-2">O PREMIUM（オー・プレミアム）</h2>
                <p className="text-sm text-gray-500 mb-4">グレー / 穴あき仕様</p>
                <div className="text-2xl text-brand-green font-serif">
                  ¥{unitPriceTaxIncluded.toLocaleString()}{' '}
                  <span className="text-xs text-gray-500 font-sans">/ 枚 (税込)</span>
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
                    <div className="flex justify-between items-end gap-4">
                      <span className="text-base font-medium text-gray-900">
                        合計金額（税込）
                        <span className="block text-sm font-normal text-gray-600 mt-1">{quantity * 10}枚</span>
                      </span>
                      <span className="text-3xl font-serif text-brand-green shrink-0">
                        ¥{(unitPriceTaxIncluded * quantity * 10).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="bg-red-50 text-red-700 text-sm rounded-md px-4 py-3">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-8 py-4 text-base font-medium tracking-widest text-white bg-brand-green hover:bg-brand-green-dark transition-colors rounded-sm shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    {isLoading ? '決済画面へ移動中…' : '購入手続きへ進む'}
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
