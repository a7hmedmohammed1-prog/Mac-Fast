import React, { useState } from 'react';
import { ShoppingCart, Phone, Menu, X, Search, Sparkles, Clock } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-[#B31B1B] text-white text-xs sm:text-sm py-1.5 px-4 text-center font-bold flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-[#FFC72C] animate-pulse" />
        <span>توصيل مجاني لجميع الطلبات فوق 200 ج.م باستعمال كود: <span className="bg-[#FFC72C] text-[#202124] px-1.5 py-0.5 rounded font-black tracking-wider">FASTFREE</span></span>
        <span className="hidden md:inline-flex items-center gap-1 mr-3 text-red-200">
          <Clock className="w-3.5 h-3.5" /> متوسط وقت التوصيل: 25 - 35 دقيقة
        </span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white shadow-md border-b-4 border-[#FFC72C] transition-all">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 min-h-[76px] py-2.5">
            
            {/* Logo */}
            <a
              href="#hero"
              className="flex items-center gap-2.5 shrink-0 group focus:outline-none"
              aria-label="ماك فاست، العودة إلى الرئيسية"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#DA291C] text-[#FFC72C] rounded-full border-2 border-[#FFC72C] grid place-items-center font-black shadow-lg text-2xl group-hover:scale-105 transition-transform">
                M
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl sm:text-2xl text-[#DA291C] leading-none tracking-tight">
                  ماك فاست
                </span>
                <span className="text-[11px] font-bold text-gray-500 tracking-wide">
                  أشهى الوجبات السريعة
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 font-bold text-gray-700" aria-label="التنقل الرئيسي">
              <a
                href="#hero"
                className="hover:text-[#DA291C] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#DA291C] after:absolute after:bottom-0 after:right-0 after:transition-all"
              >
                الرئيسية
              </a>
              <a
                href="#menu-section"
                className="hover:text-[#DA291C] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#DA291C] after:absolute after:bottom-0 after:right-0 after:transition-all"
              >
                قائمة الطعام
              </a>
              <a
                href="#offers"
                className="hover:text-[#DA291C] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#DA291C] after:absolute after:bottom-0 after:right-0 after:transition-all flex items-center gap-1"
              >
                <span className="text-sm">🔥</span> العروض الخاصة
              </a>
              <a
                href="#features"
                className="hover:text-[#DA291C] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#DA291C] after:absolute after:bottom-0 after:right-0 after:transition-all"
              >
                مميزاتنا
              </a>
              <a
                href="#reviews"
                className="hover:text-[#DA291C] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#DA291C] after:absolute after:bottom-0 after:right-0 after:transition-all"
              >
                آراء العملاء
              </a>
              <a
                href="#about"
                className="hover:text-[#DA291C] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#DA291C] after:absolute after:bottom-0 after:right-0 after:transition-all"
              >
                عن المطعم
              </a>
            </nav>

            {/* Action Buttons: Phone + Search + Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Hotline link */}
              <a
                href="tel:01212203845"
                className="hidden sm:flex items-center gap-2 text-xs font-black text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full border border-gray-200 transition"
                title="اتصل بالخط الساخن"
              >
                <Phone className="w-3.5 h-3.5 text-[#DA291C]" />
                <span dir="ltr">01212203845</span>
              </a>

              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setShowSearch(!showSearch)}
                className="p-2.5 rounded-full text-gray-600 hover:text-[#DA291C] hover:bg-red-50 transition"
                title="البحث في القائمة"
                aria-label="البحث"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Button */}
              <button
                type="button"
                onClick={onOpenCart}
                aria-label="فتح سلة الطلبات"
                className="relative flex items-center gap-2.5 bg-[#DA291C] hover:bg-[#B31B1B] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full font-bold shadow-md hover:shadow-lg transition active:scale-95"
              >
                <ShoppingCart className="w-5 h-5 text-[#FFC72C]" />
                <span className="hidden sm:inline font-bold">السلة</span>
                {cartTotal > 0 && (
                  <span className="hidden md:inline text-xs font-black bg-white/20 px-2 py-0.5 rounded-full mr-1">
                    {cartTotal.toFixed(2)} ج.م
                  </span>
                )}
                {cartCount > 0 && (
                  <span
                    className="absolute -top-2 -left-2 bg-[#FFC72C] text-[#202124] text-xs font-black w-6 h-6 rounded-full grid place-items-center border-2 border-white shadow-md animate-bounce"
                    aria-label={`يوجد ${cartCount} منتجات بالسلة`}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-[#DA291C] focus:outline-none"
                aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Collapsible search bar */}
          {showSearch && (
            <div className="py-2 pb-3 border-t border-gray-100 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="ابحث عن برجر، وجبة، بطاطس، مشروب، أو حلى..."
                  className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-[#DA291C] focus:ring-2 focus:ring-red-100 outline-none transition"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs bg-gray-200 rounded-full w-5 h-5 grid place-items-center"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Mobile horizontal nav bar */}
          <nav
            className="lg:hidden flex items-center gap-4 overflow-x-auto pb-3 pt-1 font-bold text-xs sm:text-sm whitespace-nowrap scrollbar-none border-t border-gray-100"
            aria-label="تنقل الجوال"
          >
            <a href="#hero" className="text-gray-700 hover:text-[#DA291C] px-1 py-1">
              الرئيسية
            </a>
            <a href="#menu-section" className="text-gray-700 hover:text-[#DA291C] px-1 py-1">
              قائمة الطعام
            </a>
            <a href="#offers" className="text-[#DA291C] font-black px-1 py-1 flex items-center gap-1">
              🔥 العروض الخاصة
            </a>
            <a href="#features" className="text-gray-700 hover:text-[#DA291C] px-1 py-1">
              مميزاتنا
            </a>
            <a href="#reviews" className="text-gray-700 hover:text-[#DA291C] px-1 py-1">
              التقييمات
            </a>
            <a href="#about" className="text-gray-700 hover:text-[#DA291C] px-1 py-1">
              عن المطعم
            </a>
          </nav>
        </div>

        {/* Mobile dropdown menu full drawer if open */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-5 py-4 shadow-xl space-y-3">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-gray-800 hover:text-[#DA291C] py-2 border-b border-gray-100"
            >
              الرئيسية
            </a>
            <a
              href="#menu-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-gray-800 hover:text-[#DA291C] py-2 border-b border-gray-100"
            >
              قائمة الطعام وتصفح الأصناف
            </a>
            <a
              href="#offers"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-[#DA291C] py-2 border-b border-gray-100"
            >
              🔥 العروض الحصرية والكومبو
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-gray-800 hover:text-[#DA291C] py-2 border-b border-gray-100"
            >
              لماذا ماك فاست؟
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-gray-800 hover:text-[#DA291C] py-2 border-b border-gray-100"
            >
              آراء الزبائن
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-bold text-gray-800 hover:text-[#DA291C] py-2"
            >
              الفروع وساعات العمل
            </a>
            <div className="pt-2 flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
              <span>الرقم الموحد للتوصيل:</span>
              <a href="tel:01212203845" className="font-black text-[#DA291C] text-base" dir="ltr">
                01212203845
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
