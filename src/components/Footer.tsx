import React from 'react';
import { Phone, MapPin, Clock, Heart, ArrowUp } from 'lucide-react';
import { BRANCHES } from '../data/menuData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="about" className="bg-[#202124] text-white pt-14 pb-8 border-t-4 border-[#DA291C] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-[#DA291C] text-[#FFC72C] rounded-full border-2 border-[#FFC72C] grid place-items-center font-black text-xl">
                M
              </div>
              <h2 className="text-[#FFC72C] font-black text-2xl">
                ماك فاست
              </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              نقدم أفضل وأجود أنواع الوجبات السريعة بتجربة ممتازة وطعم فريد يصلك ساخناً أينما كنت. لحوم طازجة وخلطات سرية لا تُقاوم!
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold bg-white/5 p-2.5 rounded-xl border border-white/10">
              <Clock className="w-4 h-4 shrink-0 text-[#FFC72C]" />
              <span>خدمة التوصيل والطلبات تعمل على مدار 24 ساعة</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#FFC72C] font-bold text-lg mb-4 border-b border-gray-700 pb-2">
              روابط سريعة
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400 font-medium">
              <li>
                <a href="#hero" className="hover:text-white transition flex items-center gap-1.5">
                  ← <span>الصفحة الرئيسية</span>
                </a>
              </li>
              <li>
                <a href="#menu-section" className="hover:text-white transition flex items-center gap-1.5">
                  ← <span>تصفح قائمة الطعام</span>
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-white transition flex items-center gap-1.5">
                  ← <span>عروض وكوبونات التوفير</span>
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition flex items-center gap-1.5">
                  ← <span>مميزات ومعايير الجودة</span>
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition flex items-center gap-1.5">
                  ← <span>تقييمات وآراء العملاء</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h3 className="text-[#FFC72C] font-bold text-lg mb-4 border-b border-gray-700 pb-2">
              فروعنا الرئيسية
            </h3>
            <ul className="space-y-3 text-xs text-gray-400">
              {BRANCHES.map((b) => (
                <li key={b.name} className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#DA291C] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-gray-200 block text-xs">{b.name}</strong>
                    <span className="text-[11px] text-gray-400">{b.hours}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us & Hotline */}
          <div>
            <h3 className="text-[#FFC72C] font-bold text-lg mb-4 border-b border-gray-700 pb-2">
              تواصل معنا
            </h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="bg-[#DA291C]/15 border border-[#DA291C]/30 p-3 rounded-2xl">
                <span className="text-xs text-red-200 block mb-1">الرقم الموحد للتوصيل والاستفسار:</span>
                <a
                  href="tel:01212203845"
                  className="text-2xl font-black text-[#FFC72C] hover:underline flex items-center gap-2"
                  dir="ltr"
                >
                  <Phone className="w-5 h-5 text-[#DA291C]" />
                  01212203845
                </a>
              </div>

              <p className="text-xs text-gray-400">
                خدمة العملاء متاحة على مدار الساعة لتلقي استفساراتكم وملاحظاتكم.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="text-center sm:text-right">
            جميع الحقوق محفوظة © 2026 لـ <span className="text-[#FFC72C] font-bold">PROF_X</span> | صنع بكل <Heart className="w-3.5 h-3.5 text-[#DA291C] inline fill-current" /> لإرضاء حواسك
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 bg-gray-800 hover:bg-[#DA291C] text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer"
          >
            <span>إلى الأعلى</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
