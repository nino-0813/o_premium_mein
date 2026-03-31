'use client';

import { motion } from 'motion/react';
import { ExternalLink, Quote } from 'lucide-react';
import Image from 'next/image';

export default function Reviews() {
  const clinicLogo = '/images/ueda-clinic-logo.webp';
  const clinicUrl = 'https://udc-kens.net/';
  const reviews = [
    {
      clinic: '医療法人UDC うえだ歯科クリニック',
      role: '理事長',
      name: '植田憲太郎先生',
      image: clinicLogo,
      quote: '患者様からの反応も良く、導入してよかったと感じています',
      text: '患者様からの反応も良く、導入してよかったと感じています。吸水性が高く、水はねや飛沫をしっかり防げるため、治療中の快適さが向上しました。こうした細かな配慮が、医院の印象や信頼につながっていると実感しています。',
    },
    {
      clinic: '医療法人UDC うえだ歯科クリニック',
      role: '歯科衛生士',
      name: 'Uさん',
      image: clinicLogo,
      quote: '目元にかけた際のフィット感が良く、ズレにくく使いやすい',
      text: '実際に使用してみて、患者さんの目元にかけた際のフィット感が良く、ズレにくく使いやすいと感じました。また、肌触りも柔らかく、見た目にも清潔感があるため、患者さんにも安心してお使いいただける良いタオルだと思います。',
    },
    {
      clinic: '医療法人UDC うえだ歯科クリニック',
      role: '歯科衛生士',
      name: 'Tさん',
      image: clinicLogo,
      quote: '何度洗ってもモケモケにならず、ふわふわで気持ち良い',
      text: '何度洗ってもモケモケにならず、ふわふわで気持ち良いです(^^) 穴の大きさも丁度よく施術の邪魔にならず、快適です★☺ 患者様の目元に安心して使用させてもらっています♫',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="relative py-24 sm:py-32 bg-brand-green-light/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 tracking-widest break-words sm:break-keep"
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
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-green-light shrink-0 bg-white">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-contain p-2"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-brand-green font-medium mb-1">{review.clinic}</p>
                    <p className="text-sm font-medium text-gray-900">{review.role} {review.name}</p>
                  </div>
                </div>

                <a
                  href={clinicUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-brand-green hover:text-brand-green-dark transition-colors tracking-widest mb-4"
                >
                  クリニック公式サイトを見る
                  <ExternalLink className="w-4 h-4" />
                </a>

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
