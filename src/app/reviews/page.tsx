'use client';

import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

export default function Reviews() {
  const reviews = [
    {
      clinic: '青山デンタルクリニック',
      role: '理事長',
      name: '植田憲太郎先生',
      image: 'https://picsum.photos/seed/dentist-1/150/150',
      quote: '患者様からの「タオルが変わりましたね」という声に驚きました。',
      text: '以前は市販のタオルを使用していましたが、洗濯を重ねるごとに硬くなり、患者様の顔にかける際に申し訳なさを感じていました。O PREMIUMを導入してからは、超甘撚り糸の柔らかさに驚く患者様が多く、「エステに来たみたい」という嬉しいお言葉もいただいています。医院のブランディングにも一役買っています。',
    },
    {
      clinic: 'みなとみらい歯科',
      role: 'チーフ歯科衛生士',
      name: '鈴木 美咲 さん',
      image: 'https://picsum.photos/seed/hygienist-1/150/150',
      quote: '絶妙な穴のサイズで、治療が格段にスムーズになりました。',
      text: 'スケーリング中など、どうしても水しぶきが飛んでしまう場面がありますが、O PREMIUMは吸水性が非常に高く、患者様の顔に水滴が残りにくいです。また、こだわりの穴のサイズのおかげで、患者様の呼吸を妨げることなく、私たちスタッフも安心して治療に専念できます。',
    },
    {
      clinic: '銀座審美歯科クリニック',
      role: '院長',
      name: '田中 裕子 先生',
      image: 'https://picsum.photos/seed/dentist-2/150/150',
      quote: '水はねや金属片から患者様をしっかり守ってくれます。',
      text: '当院は自費診療メインのため、空間の高級感や清潔感には特にこだわっています。O PREMIUMの生地とパイピング縫製は、当院のインテリアに完璧に調和します。何より、治療中の飛散物から患者様を安全に守れるという機能面が素晴らしいです。耐久性も高く、コストパフォーマンスも非常に高いと感じています。',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="relative py-24 sm:py-32 bg-brand-green-light/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 tracking-widest break-keep"
          >
            導入事例・口コミ
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {reviews.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 relative"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-brand-green-light/50" />

                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-green-light shrink-0">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-brand-green font-medium mb-1">{review.clinic}</p>
                    <p className="text-sm font-medium text-gray-900">{review.role} {review.name}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-brand-gold fill-current" />
                  ))}
                </div>

                <h3 className="font-serif text-lg text-gray-900 mb-4 leading-snug">
                  「{review.quote}」
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {review.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-medium text-gray-500 tracking-widest mb-10">全国の歯科医院様にご導入いただいております</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="font-serif text-xl font-bold text-gray-400">
                CLINIC LOGO {num}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
