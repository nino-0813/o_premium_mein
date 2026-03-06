'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { FileText, Package, Send } from 'lucide-react';
import { useState, FormEvent, useEffect, useCallback } from 'react';

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

const ZIPCODE_API = 'https://zipcloud.ibsnet.co.jp/api/search';

export default function SampleRequest() {
  const [formData, setFormData] = useState({
    clinicName: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    requestType: 'both' as 'sample' | 'doc' | 'both',
    message: '',
  });
  const [postalCode, setPostalCode] = useState('');
  const [addressLoading, setAddressLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const fetchAddressByZip = useCallback(async (zip: string) => {
    const digits = zip.replace(/\D/g, '');
    if (digits.length !== 7) return;
    setAddressLoading(true);
    try {
      const res = await fetch(`${ZIPCODE_API}?zipcode=${digits}`);
      const data = await res.json();
      if (data.status !== 200 || !data.results?.length) {
        setAddressLoading(false);
        return;
      }
      const first = data.results[0];
      const baseAddress = [first.address1, first.address2, first.address3].filter(Boolean).join('');
      setFormData((prev) => ({ ...prev, address: baseAddress }));
    } catch {
      // ignore
    } finally {
      setAddressLoading(false);
    }
  }, []);

  useEffect(() => {
    const digits = postalCode.replace(/\D/g, '');
    if (digits.length !== 7) return;
    const t = setTimeout(() => fetchAddressByZip(postalCode), 500);
    return () => clearTimeout(t);
  }, [postalCode, fetchAddressByZip]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitStatus('sending');
    try {
      const res = await fetch('/api/sample-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, postalCode }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMessage(data.error || '送信に失敗しました。');
        setSubmitStatus('error');
        return;
      }
      setSubmitStatus('success');
      setPostalCode('');
      setFormData({
        clinicName: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        requestType: 'both',
        message: '',
      });
    } catch {
      setErrorMessage('送信に失敗しました。しばらくしてからお試しください。');
      setSubmitStatus('error');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <section className="relative py-24 sm:py-32 bg-brand-green-light/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-2xl sm:text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6 tracking-widest break-keep"
          >
            サンプル・資料請求
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="font-serif text-xl sm:text-2xl text-gray-900 mb-4 break-keep">無料でお試しいただけます</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                実際の肌触りや吸水性をご確認いただけるよう、歯科医院様限定で無料サンプルをお送りしております。<br />
                製品の詳細な仕様や価格表が記載された資料も同封いたします。
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">ご希望の内容 <span className="text-red-500 ml-1">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${formData.requestType === 'sample' ? 'border-brand-green bg-brand-green-light/20' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input type="radio" name="requestType" value="sample" className="sr-only" checked={formData.requestType === 'sample'} onChange={(e) => setFormData({ ...formData, requestType: e.target.value as 'sample' })} />
                    <Package className={`w-5 h-5 mr-2 ${formData.requestType === 'sample' ? 'text-brand-green' : 'text-gray-400'}`} />
                    <span className={`text-sm font-medium ${formData.requestType === 'sample' ? 'text-brand-green' : 'text-gray-600'}`}>サンプルのみ</span>
                  </label>
                  <label className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${formData.requestType === 'doc' ? 'border-brand-green bg-brand-green-light/20' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input type="radio" name="requestType" value="doc" className="sr-only" checked={formData.requestType === 'doc'} onChange={(e) => setFormData({ ...formData, requestType: e.target.value as 'doc' })} />
                    <FileText className={`w-5 h-5 mr-2 ${formData.requestType === 'doc' ? 'text-brand-green' : 'text-gray-400'}`} />
                    <span className={`text-sm font-medium ${formData.requestType === 'doc' ? 'text-brand-green' : 'text-gray-600'}`}>資料のみ</span>
                  </label>
                  <label className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors ${formData.requestType === 'both' ? 'border-brand-green bg-brand-green-light/20' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input type="radio" name="requestType" value="both" className="sr-only" checked={formData.requestType === 'both'} onChange={(e) => setFormData({ ...formData, requestType: e.target.value as 'both' })} />
                    <div className="flex items-center">
                      <Package className={`w-4 h-4 mr-1 ${formData.requestType === 'both' ? 'text-brand-green' : 'text-gray-400'}`} />
                      <span className="mx-1 text-gray-300">+</span>
                      <FileText className={`w-4 h-4 mr-2 ${formData.requestType === 'both' ? 'text-brand-green' : 'text-gray-400'}`} />
                    </div>
                    <span className={`text-sm font-medium ${formData.requestType === 'both' ? 'text-brand-green' : 'text-gray-600'}`}>両方</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700 mb-1">医院名・法人名 <span className="text-red-500 ml-1">*</span></label>
                <input
                  type="text"
                  id="clinicName"
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm py-3 px-4 border"
                  value={formData.clinicName}
                  onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                  placeholder="例：青山デンタルクリニック"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">ご担当者名 <span className="text-red-500 ml-1">*</span></label>
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
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">電話番号 <span className="text-red-500 ml-1">*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm py-3 px-4 border"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="例：03-1234-5678"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">郵便番号</label>
                  <input
                    type="text"
                    id="postalCode"
                    inputMode="numeric"
                    maxLength={8}
                    className="block w-full max-w-[200px] rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm py-3 px-4 border"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value.replace(/[^0-9-]/g, ''))}
                    placeholder="例：107-0062（ハイフンなしでも可）"
                  />
                  <p className="text-xs text-gray-500 mt-1">7桁入力で住所を自動で入れます</p>
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">お届け先住所 <span className="text-red-500 ml-1">*</span></label>
                  <input
                    type="text"
                    id="address"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm py-3 px-4 border"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="例：東京都港区南青山1-1-1 青山ビル2F"
                  />
                  {addressLoading && <p className="text-xs text-brand-green mt-1">住所を検索しています...</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">ご質問・ご要望など</label>
                <textarea
                  id="message"
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green sm:text-sm py-3 px-4 border"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="その他、気になる点がございましたらご記入ください。"
                />
              </div>

              <div className="pt-6 space-y-4">
                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  className="w-full flex items-center justify-center px-8 py-4 text-base font-medium tracking-widest text-white bg-brand-green hover:bg-brand-green-dark transition-colors rounded-sm shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitStatus === 'sending' ? (
                    <>送信中...</>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      送信する
                    </>
                  )}
                </button>
                {submitStatus === 'success' && (
                  <div className="p-4 rounded-xl bg-brand-green-light/30 border border-brand-green/20 text-center">
                    <p className="font-medium text-brand-green mb-1">送信が完了しました</p>
                    <p className="text-sm text-gray-600">ご請求いただいた内容を確認のうえ、ご連絡いたします。</p>
                  </div>
                )}
                {submitStatus === 'error' && errorMessage && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-100 text-sm text-red-800">
                    {errorMessage}
                  </div>
                )}
                <p className="text-xs text-center text-gray-500">
                  ※ 個人情報の取り扱いについては、<Link href="/privacy" className="text-brand-green hover:underline">プライバシーポリシー</Link>をご確認ください。
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
