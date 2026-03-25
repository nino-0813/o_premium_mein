'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Mail, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'ホーム', path: '/' },
    { name: 'ブランドストーリー', path: '/about' },
    { name: '製品情報', path: '/product' },
    { name: 'ご購入', path: '/purchase' },
    { name: '導入事例・口コミ', path: '/reviews' },
    { name: 'サンプル請求', path: '/sample' },
    { name: 'お問い合わせ', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-20">
            <div className="flex-shrink-0 flex items-center min-w-0">
              <Link href="/" className="flex items-center gap-2 min-w-0">
                <span className="font-serif text-lg sm:text-xl tracking-widest text-brand-green truncate">O PREMIUM</span>
              </Link>
            </div>

            <nav className="hidden lg:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-sm tracking-widest hover:text-brand-green transition-colors ${
                    pathname === item.path ? 'text-brand-green font-medium' : 'text-gray-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-brand-green focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-100 absolute w-full">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block px-3 py-2 text-base tracking-wider ${
                    pathname === item.path
                      ? 'text-brand-green font-medium bg-brand-green-light/30'
                      : 'text-gray-600 hover:text-brand-green hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow pt-14 sm:pt-20 overflow-x-hidden">
        {children}
      </main>

      <footer className="bg-brand-green text-white py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <span className="font-serif text-lg sm:text-xl tracking-widest">O PREMIUM</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                現場の歯科衛生士が考えた、<br />
                超甘撚り糸で織りあげた<br />
                歯科専用プレミアムタオル。
              </p>
            </div>

            <div>
              <h3 className="font-serif text-base sm:text-lg mb-3 sm:mb-4 tracking-widest">LINKS</h3>
              <ul className="space-y-2">
                {navItems.slice(0, 4).map((item) => (
                  <li key={item.path}>
                    <Link href={item.path} className="text-sm text-gray-300 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/privacy" className="text-sm text-gray-300 hover:text-white transition-colors">
                    プライバシーポリシー
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-base sm:text-lg mb-3 sm:mb-4 tracking-widest">CONTACT</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-gray-300">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white">合同会社Proof</p>
                    <p className="mt-1 leading-relaxed">
                      〒567-0086<br />
                      大阪府茨木市彩都やまぶき2-2-Ｂ209
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <Mail className="w-5 h-5 shrink-0" />
                  <a href="mailto:proof.llc1107@gmail.com" className="hover:text-white transition-colors break-all">
                    proof.llc1107@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-300">
                  <Mail className="w-5 h-5 shrink-0" />
                  <Link href="/contact" className="hover:text-white transition-colors">
                    お問い合わせフォーム
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/20 text-center text-xs text-gray-400 tracking-wider">
            <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
            <span className="mx-2">|</span>
            &copy; {new Date().getFullYear()} 合同会社Proof / O PREMIUM. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
