import React from 'react';
import { Tag, Plus, Check } from 'lucide-react';
import { SPECIAL_OFFERS, MENU_ITEMS } from '../data/menuData';
import { MenuItem } from '../types';

interface SpecialDealsProps {
  onAddToCart: (item: MenuItem) => void;
  cartItemIds: Set<number>;
}

export const SpecialDeals: React.FC<SpecialDealsProps> = ({ onAddToCart, cartItemIds }) => {
  return (
    <section id="offers" className="bg-amber-50/60 py-14 border-y border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-[#DA291C] text-white px-3.5 py-1 rounded-full text-xs font-black mb-3">
            <Tag className="w-3.5 h-3.5 text-[#FFC72C]" />
            <span>عروض وتخفيضات لفترة محدودة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
            عروض التوفير الحصرية من ماك فاست
          </h2>
          <p className="text-gray-600 text-sm sm:text-base font-semibold">
            كومبوهات ووجبات عائلية مصممة لتوفر عليك أكثر وتمنحك أقصى درجات اللذة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPECIAL_OFFERS.map((deal) => {
            const product = MENU_ITEMS.find((item) => item.id === deal.productId);
            const isInCart = product ? cartItemIds.has(product.id) : false;

            return (
              <div
                key={deal.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-amber-200/70 flex flex-col group relative"
              >
                {/* Badge */}
                <div className="absolute top-3 right-3 z-10 bg-[#FFC72C] text-[#202124] font-black text-xs px-3 py-1 rounded-full shadow-md">
                  {deal.badge}
                </div>

                {/* Deal Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 right-3 text-white">
                    <span className="text-xs bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md font-bold">
                      وفر {deal.originalPrice - deal.price} ج.م
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-lg text-gray-900 mb-1.5 group-hover:text-[#DA291C] transition-colors">
                      {deal.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">
                      {deal.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-[#DA291C]">
                          {deal.price.toFixed(2)} ج.م
                        </span>
                        <span className="text-xs line-through text-gray-400 font-bold">
                          {deal.originalPrice.toFixed(2)} ج.م
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400 block font-semibold">شامل الضريبة 14%</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => product && onAddToCart(product)}
                      className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 ${
                        isInCart
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-[#DA291C] text-white hover:bg-[#B31B1B]'
                      }`}
                    >
                      {isInCart ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>في السلة (+1)</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>أضف العرض</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
