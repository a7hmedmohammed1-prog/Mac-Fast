import React from 'react';
import { ArrowLeft, Sparkles, Clock, ShieldCheck, Star, Flame } from 'lucide-react';

interface HeroProps {
  onOrderNow: () => void;
  onExploreOffers: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onExploreOffers }) => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden text-white py-14 lg:py-20 bg-gradient-to-l from-[#DA291C] via-[#c62317] to-[#B31B1B]"
    >
      {/* Background radial highlight */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 75% 50%, #FFC72C 0%, transparent 45%)',
        }}
      />

      {/* Decorative floating dots/shapes */}
      <div className="absolute top-10 right-10 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-36 h-36 bg-[#FFC72C]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Text Content */}
        <div className="text-center lg:text-right space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#FFC72C] text-[#202124] font-black px-4 py-1.5 rounded-full shadow-md text-xs sm:text-sm hover:scale-105 transition-transform cursor-pointer" onClick={onExploreOffers}>
            <Flame className="w-4 h-4 text-[#DA291C] animate-bounce" />
            <span>عرض اليوم المميز: وجبة ماك دويل المزدوجة بخصم 30%!</span>
          </div>

          <h1 className="font-black text-3xl sm:text-5xl lg:text-[52px] leading-tight text-white drop-shadow-sm">
            طعم لا يُقاوم، وجباتك المفضلة ساخنة وسريعة!
          </h1>

          <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-red-50 leading-relaxed font-normal">
            استمتع بألذ أنواع البرجر المشوي والمقرمش، والمشروبات الباردة والبطاطس الذهبية بأعلى معايير الجودة وأفضل سعر، تصلك طازجة خلال 30 دقيقة.
          </p>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              type="button"
              onClick={onOrderNow}
              className="bg-[#FFC72C] hover:bg-[#ffcf47] active:bg-[#e6b325] text-[#202124] font-black px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition duration-200 text-center flex items-center justify-center gap-2 text-base group"
            >
              <span>اطلب الآن وتذوق الفرق</span>
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onExploreOffers}
              className="bg-white/10 hover:bg-white/20 active:bg-white/30 border-2 border-white/40 text-white font-bold px-8 py-4 rounded-xl transition text-center backdrop-blur-sm"
            >
              شاهد العروض والخصومات
            </button>
          </div>

          {/* Key Trust Badges */}
          <div className="pt-4 grid grid-cols-3 gap-3 border-t border-white/15 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-[#FFC72C] font-black text-base sm:text-lg">
                <Clock className="w-4 h-4" />
                <span>30 دقيقة</span>
              </div>
              <span className="text-[11px] sm:text-xs text-red-100">توصيل سريع وساخن</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-[#FFC72C] font-black text-base sm:text-lg">
                <ShieldCheck className="w-4 h-4" />
                <span>100% حلال</span>
              </div>
              <span className="text-[11px] sm:text-xs text-red-100">لحوم طازجة يومياً</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-[#FFC72C] font-black text-base sm:text-lg">
                <Star className="w-4 h-4 fill-current" />
                <span>4.9 / 5</span>
              </div>
              <span className="text-[11px] sm:text-xs text-red-100">+50 ألف تقييم ممتاز</span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative flex justify-center items-center">
          {/* Yellow glow circle */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-[#FFC72C]/25 rounded-full blur-2xl top-1/2 -translate-y-1/2" />
          
          <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFC72C] group">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
              alt="برجر شهي مع الخضار والجبن الذهبي الذائب"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            {/* Overlay floating badge */}
            <div className="absolute bottom-4 right-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 text-gray-900 shadow-xl flex items-center justify-between border border-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#DA291C] text-white rounded-xl grid place-items-center font-black">
                  <Sparkles className="w-5 h-5 text-[#FFC72C]" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-gray-900">وجبة ماك دويل الجبارة</h4>
                  <p className="text-xs text-gray-500 font-semibold">الأكثر طلباً هذا الأسبوع</p>
                </div>
              </div>
              <div className="text-left">
                <span className="text-xs line-through text-gray-400 block font-bold">225 ج.م</span>
                <span className="text-[#DA291C] font-black text-lg">185 ج.م</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
