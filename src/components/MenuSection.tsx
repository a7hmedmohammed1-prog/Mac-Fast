import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, Plus, Minus, Check, Flame, Clock } from 'lucide-react';
import { MenuItem, CategoryId } from '../types';
import { CATEGORIES } from '../data/menuData';

interface MenuSectionProps {
  items: MenuItem[];
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  searchQuery: string;
  onQuickAdd: (item: MenuItem) => void;
  onCustomize: (item: MenuItem) => void;
  getCartQuantity: (productId: number) => number;
  onUpdateQuantity: (productId: number, newQty: number) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onQuickAdd,
  onCustomize,
  getCartQuantity,
  onUpdateQuantity,
}) => {
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
  const [filterPopularOnly, setFilterPopularOnly] = useState(false);

  // Filter items
  const filteredItems = items.filter((item) => {
    // category
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    // search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchCat = item.categoryName.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }
    // spicy
    if (filterSpicyOnly && !item.isSpicy) return false;
    // popular
    if (filterPopularOnly && !item.isPopular) return false;

    return true;
  });

  return (
    <section id="menu-section" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="font-black text-3xl sm:text-4xl text-gray-900 mb-3">
          قائمة الطعام
        </h2>
        <div className="w-24 h-1.5 bg-[#DA291C] mx-auto rounded-full mb-4" aria-hidden="true" />
        <p className="text-gray-600 font-semibold text-base sm:text-lg">
          اختر ما تشتهيه من قائمتنا المتنوعة والغنية بألذ الأطعمة الساخنة والشهية
        </p>
      </div>

      {/* Category Buttons */}
      <div
        id="category-buttons"
        className="flex justify-center flex-wrap gap-2.5 sm:gap-3 mb-8"
        role="group"
        aria-label="تصفية قائمة الطعام"
      >
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id as CategoryId)}
              aria-pressed={isSelected}
              className={`font-bold px-5 sm:px-6 py-2.5 rounded-full shadow-xs sm:shadow-sm transition-all duration-200 text-sm sm:text-base flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-[#DA291C] text-white shadow-md scale-105'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Quick Filters: Spicy, Popular, Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-white p-3.5 sm:p-4 rounded-2xl shadow-xs border border-gray-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-gray-500 flex items-center gap-1 ml-2">
            <SlidersHorizontal className="w-3.5 h-3.5" /> تصفية سريعة:
          </span>

          <button
            type="button"
            onClick={() => setFilterPopularOnly(!filterPopularOnly)}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition flex items-center gap-1 ${
              filterPopularOnly
                ? 'bg-amber-100 border-[#FFC72C] text-amber-900 font-black'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#FFC72C]" />
            <span>الأكثر طلباً ⭐</span>
          </button>

          <button
            type="button"
            onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition flex items-center gap-1 ${
              filterSpicyOnly
                ? 'bg-red-100 border-[#DA291C] text-[#DA291C] font-black'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Flame className="w-3 h-3 text-[#DA291C]" />
            <span>سبايسي وحار 🌶️</span>
          </button>
        </div>

        <div className="text-xs font-bold text-gray-500">
          عرض <span className="text-[#DA291C] font-black">{filteredItems.length}</span> من أصل{' '}
          {items.length} وجبة
        </div>
      </div>

      {/* Food Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 shadow-xs p-6">
          <div className="w-16 h-16 bg-red-50 text-[#DA291C] rounded-full grid place-items-center mx-auto mb-4 text-2xl font-black">
            🍔
          </div>
          <h3 className="text-xl font-black text-gray-800 mb-2">لم نعثر على وجبات مطابقة</h3>
          <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
            جرّب تغيير كلمات البحث أو إعادة ضبط خيارات التصفية لتصفح جميع الأصناف اللذيذة.
          </p>
          <button
            type="button"
            onClick={() => {
              onSelectCategory('all');
              setFilterSpicyOnly(false);
              setFilterPopularOnly(false);
            }}
            className="bg-[#DA291C] hover:bg-[#B31B1B] text-white font-bold px-6 py-2.5 rounded-xl transition shadow-md text-sm"
          >
            عرض جميع الوجبات
          </button>
        </div>
      ) : (
        <div id="food-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredItems.map((item) => {
            const inCartQuantity = getCartQuantity(item.id);

            return (
              <article
                key={item.id}
                data-product-id={item.id}
                data-category={item.category}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group hover:-translate-y-1.5"
              >
                {/* Image & Badges */}
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-107 transition-transform duration-500"
                    src={item.image}
                    alt={item.name}
                  />

                  {/* Gradient shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Price Tag (matching template at top left) */}
                  <span
                    className="absolute top-3 left-3 bg-[#FFC72C] text-[#202124] font-black px-3 py-1 rounded-full shadow-md text-sm"
                    dir="ltr"
                  >
                    {item.price.toFixed(2)} ج.م
                  </span>

                  {/* Category / Spicy / Popular tag top right */}
                  <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
                    {item.isPopular && (
                      <span className="bg-[#DA291C] text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#FFC72C]" />
                        <span>الأكثر طلباً</span>
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="bg-orange-600 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                        <Flame className="w-3 h-3 text-yellow-300" />
                        <span>حار</span>
                      </span>
                    )}
                  </div>

                  {/* Calories & prep time preview */}
                  {(item.calories || item.prepTime) && (
                    <div className="absolute bottom-2.5 right-3 left-3 flex items-center justify-between text-[11px] text-white font-bold pointer-events-none">
                      {item.calories ? (
                        <span className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md">
                          {item.calories} سُعرة
                        </span>
                      ) : <span />}
                      {item.prepTime && (
                        <span className="bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#FFC72C]" />
                          {item.prepTime}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-xl text-gray-900 mb-2 group-hover:text-[#DA291C] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">
                      {item.description}
                    </p>
                  </div>

                  {/* Actions Area */}
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    {/* If item is in cart, show quantity stepper */}
                    {inCartQuantity > 0 ? (
                      <div className="flex items-center justify-between bg-red-50 p-1.5 rounded-xl border border-red-200">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, inCartQuantity - 1)}
                            className="w-9 h-9 rounded-lg bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 grid place-items-center font-black transition active:scale-95"
                            aria-label={`تقليل كمية ${item.name}`}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-black text-gray-900 text-base">
                            {inCartQuantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.id, inCartQuantity + 1)}
                            className="w-9 h-9 rounded-lg bg-[#DA291C] text-white hover:bg-[#B31B1B] grid place-items-center font-black transition active:scale-95 shadow-xs"
                            aria-label={`زيادة كمية ${item.name}`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onCustomize(item)}
                          className="text-xs font-bold text-[#DA291C] hover:underline px-2"
                        >
                          تخصيص الخيارات ⚙️
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {/* Quick Add Button */}
                        <button
                          type="button"
                          onClick={() => onQuickAdd(item)}
                          className="flex-1 bg-[#DA291C] hover:bg-[#B31B1B] text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                        >
                          <Plus className="w-4 h-4 text-[#FFC72C]" />
                          <span>إضافة إلى السلة</span>
                        </button>

                        {/* Customize button */}
                        {(item.availableExtras?.length || item.availableSizes?.length) && (
                          <button
                            type="button"
                            onClick={() => onCustomize(item)}
                            className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition flex items-center justify-center"
                            title="تخصيص الخيارات والإضافات"
                            aria-label={`تخصيص ${item.name}`}
                          >
                            <SlidersHorizontal className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
