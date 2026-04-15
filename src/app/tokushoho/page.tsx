'use client';

import type { ReactNode } from 'react';
import { motion } from 'motion/react';

const rows: { label: string; body: ReactNode }[] = [
  {
    label: '事業者の名称',
    body: '合同会社Proof',
  },
  {
    label: '代表者名',
    body: '奥濵 隆史',
  },
  {
    label: '所在地',
    body: (
      <>
        〒567-0086
        <br />
        大阪府茨木市彩都やまぶき2-2-B209
      </>
    ),
  },
  {
    label: '電話番号',
    body: (
      <a href="tel:09049077124" className="text-brand-green hover:underline">
        090-4907-7124
      </a>
    ),
  },
  {
    label: 'メールアドレス',
    body: (
      <a href="mailto:proof.llc1107@gmail.com" className="text-brand-green hover:underline break-all">
        proof.llc1107@gmail.com
      </a>
    ),
  },
  {
    label: '販売価格',
    body: (
      <>
        ¥1,100（税込）/ 1枚
        <br />
        <span className="text-sm">※10枚単位でのご注文となります</span>
      </>
    ),
  },
  {
    label: '支払方法',
    body: 'クレジットカード（Stripe）',
  },
  {
    label: '支払時期',
    body: '注文時に決済',
  },
  {
    label: '商品の引渡時期',
    body: 'ご注文確定後、3営業日以内に発送',
  },
  {
    label: '送料',
    body: '全国一律 ¥800（税込）',
  },
  {
    label: '返品・交換・キャンセルについて',
    body: (
      <div className="leading-relaxed whitespace-pre-line">
        {`商品到着後7日以内に限り、不良品・誤送品の場合のみ
返品・交換対応いたします。
お客様都合によるキャンセル・返品はお受けできません。
返品・交換をご希望の場合は、上記メールアドレスまで
ご連絡ください。`}
      </div>
    ),
  },
];

export default function TokushohoPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative py-24 sm:py-32 bg-brand-green-light/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 tracking-widest break-words sm:break-keep"
          >
            特定商取引法に基づく表記
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-10 sm:space-y-12"
          >
            {rows.map((row) => (
              <div key={row.label}>
                <h2 className="font-serif text-lg sm:text-xl text-gray-900 mb-3 sm:mb-4 border-b border-gray-200 pb-2">
                  {row.label}
                </h2>
                <div className="text-gray-600 text-sm sm:text-base leading-relaxed">{row.body}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
