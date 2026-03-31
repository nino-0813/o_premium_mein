'use client';

import { motion } from 'motion/react';
import { Mail, MapPin } from 'lucide-react';
import { useState, FormEvent } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    clinicName: '',
    name: '',
    email: '',
    phone: '',
    subject: '製品について',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitStatus('error');
        setSubmitMessage(data.error || '送信に失敗しました。');
        return;
      }
      setSubmitStatus('success');
      setSubmitMessage('送信しました。ありがとうございます。');
      setFormData({ clinicName: '', name: '', email: '', phone: '', subject: '製品について', message: '' });
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('送信に失敗しました。しばらくしてからお試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="relative py-24 sm:py-32 bg-brand-green-light/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 tracking-widest break-words sm:break-keep"
          >
            お問い合わせ
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:gap-16">
            <div className="lg:col-span-1 space-y-10">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-4 sm:mb-6 break-words sm:break-keep">お問い合わせ先</h2>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-green-light rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-brand-green" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">お問い合わせは下記のフォームからお願いいたします。</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-10">
                <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-4 sm:mb-6 break-words sm:break-keep">運営会社</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed space-y-1">
                      <p className="font-medium text-gray-900">合同会社Proof</p>
                      <p>〒567-0086<br />大阪府茨木市彩都やまぶき2-2-Ｂ209</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed space-y-2 pt-2">
                    <p><span className="text-gray-500">代表社員</span> 奥濵 隆史</p>
                    <p><span className="text-gray-500">法人番号</span> 6120903004360</p>
                    <p><span className="text-gray-500">設立</span> 2022年11月7日</p>
                    <p><span className="text-gray-500">資本金</span> 300万円</p>
                    <p><span className="text-gray-500">取引銀行</span> GMOあおぞら銀行</p>
                  </div>
                  <div className="text-xs text-gray-500 leading-relaxed pt-2 border-t border-gray-100">
                    <p className="font-medium text-gray-700 mb-1">事業内容</p>
                    <p>衣料品、衣料雑貨品、繊維製品、日用品の企画、輸出入、製造及び販売 / 各種コンサルティング業務 / 物品の保管、管理、梱包及び配送 / 上記に附帯する一切の事業</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-12">
                <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-6 sm:mb-8 break-words sm:break-keep">お問い合わせフォーム</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">お問い合わせ種別 <span className="text-red-500 ml-1">*</span></label>
                    <select
                      id="subject"
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm py-3 px-4 border"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    >
                      <option value="製品について">製品について</option>
                      <option value="ご注文について">ご注文について</option>
                      <option value="お支払いについて">お支払いについて</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700 mb-1">医院名・法人名</label>
                    <input
                      type="text"
                      id="clinicName"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm py-3 px-4 border"
                      value={formData.clinicName}
                      onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                      placeholder="例：青山デンタルクリニック"
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">お名前 <span className="text-red-500 ml-1">*</span></label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm py-3 px-4 border"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="例：山田 太郎"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">メールアドレス <span className="text-red-500 ml-1">*</span></label>
                      <input
                        type="email"
                        id="email"
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm py-3 px-4 border"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="例：info@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">電話番号</label>
                      <input
                        type="tel"
                        id="phone"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm py-3 px-4 border"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="例：03-1234-5678"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">お問い合わせ内容 <span className="text-red-500 ml-1">*</span></label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm py-3 px-4 border"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="お問い合わせ内容をご記入ください。"
                    />
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center px-8 py-4 text-base font-medium tracking-widest text-white bg-brand-green hover:bg-brand-green-dark transition-colors rounded-sm shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitting ? '送信中…' : '送信する'}
                    </button>
                    {submitStatus === 'success' && (
                      <p className="text-sm text-center text-brand-green mt-4">{submitMessage}</p>
                    )}
                    {submitStatus === 'error' && (
                      <p className="text-sm text-center text-red-600 mt-4">{submitMessage}</p>
                    )}
                    <p className="text-xs text-center text-gray-500 mt-4">
                      ご入力いただいた内容は、お問い合わせ対応の目的のみに使用いたします。
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
