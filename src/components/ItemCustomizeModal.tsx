import React, { useState } from 'react';
import { X, Flame, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { MenuItem, ExtraOption, CartItemOption } from '../types';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onConfirm: (item: MenuItem, options: CartItemOption, quantity: number) => void;
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  onClose,
  onConfirm,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [spiciness, setSpiciness] = useState<'regular' | 'spicy'>(item.isSpicy ? 'spicy' : 'regular');
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [notes, setNotes] = useState('');

  const currentSize = item.availableSizes?.[selectedSizeIndex];
  const sizePrice = currentSize ? currentSize.extraPrice : 0;
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = item.price + sizePrice + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const toggleExtra = (extra: ExtraOption) => {
    if (selectedExtras.some((e) => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const handleConfirm = () => {
    const options: CartItemOption = {
      size: currentSize?.name,
      sizePrice,
      spiciness,
      selectedExtras,
      notes: notes.trim(),
    };
    onConfirm(item, options, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="customize-title"
      >
        {/* Header with image */}
        <div className="relative h-44 sm:h-52 overflow-hidden bg-gray-100 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 left-3 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition backdrop-blur-xs focus:outline-none"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 right-4 left-4 text-white">
            <span className="text-xs font-bold bg-[#DA291C] text-white px-2.5 py-0.5 rounded-full inline-block mb-1">
              {item.categoryName}
            </span>
            <h3 id="customize-title" className="text-xl sm:text-2xl font-black">
              {item.name}
            </h3>
            <p className="text-xs text-white/80 line-clamp-1">{item.description}</p>
          </div>
        </div>

        {/* Scrollable options body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-right">
          
          {/* Sizes / Portion */}
          {item.availableSizes && item.availableSizes.length > 0 && (
            <div>
              <label className="block text-sm font-black text-gray-800 mb-2">
                اختر الحجم أو نوع الوجبة:
              </label>
              <div className="space-y-2">
                {item.availableSizes.map((size, idx) => (
                  <button
                    key={size.name}
                    type="button"
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-bold transition ${
                      selectedSizeIndex === idx
                        ? 'border-[#DA291C] bg-red-50 text-[#DA291C] shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-4 h-4 rounded-full border-2 grid place-items-center ${selectedSizeIndex === idx ? 'border-[#DA291C]' : 'border-gray-300'}`}>
                        {selectedSizeIndex === idx && <span className="w-2 h-2 rounded-full bg-[#DA291C]" />}
                      </span>
                      <span>{size.name}</span>
                    </div>
                    <span>
                      {size.extraPrice === 0 ? 'مشمول' : `+${size.extraPrice.toFixed(2)} ج.م`}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spiciness Level */}
          <div>
            <label className="block text-sm font-black text-gray-800 mb-2">
              درجة التتبيل والحرارة:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSpiciness('regular')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-bold transition ${
                  spiciness === 'regular'
                    ? 'border-[#DA291C] bg-red-50 text-[#DA291C]'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <span>عادي ولطيف 🌿</span>
              </button>
              <button
                type="button"
                onClick={() => setSpiciness('spicy')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-bold transition ${
                  spiciness === 'spicy'
                    ? 'border-[#DA291C] bg-red-50 text-[#DA291C]'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <Flame className="w-4 h-4 text-[#DA291C]" />
                <span>حار سبايسي 🌶️</span>
              </button>
            </div>
          </div>

          {/* Extras and add-ons */}
          {item.availableExtras && item.availableExtras.length > 0 && (
            <div>
              <label className="block text-sm font-black text-gray-800 mb-2">
                إضافات وترقيات شهية (اختياري):
              </label>
              <div className="space-y-2">
                {item.availableExtras.map((extra) => {
                  const isChecked = selectedExtras.some((e) => e.id === extra.id);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-bold transition ${
                        isChecked
                          ? 'border-[#FFC72C] bg-amber-50 text-gray-900 shadow-xs'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                            isChecked
                              ? 'bg-[#FFC72C] border-[#FFC72C] text-[#202124]'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span>{extra.name}</span>
                      </div>
                      <span className="text-[#DA291C]">+{extra.price.toFixed(2)} ج.م</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes textarea */}
          <div>
            <label className="block text-sm font-black text-gray-800 mb-2">
              ملاحظاتك الخاصة للمطبخ:
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="مثال: بدون بصل، صوص إضافي جانباً، شطة خفيفة..."
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-[#DA291C] focus:ring-2 focus:ring-red-100 outline-none"
            />
          </div>
        </div>

        {/* Footer actions: Quantity + Add Button */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-4 shrink-0">
          {/* Quantity stepper */}
          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-gray-200 shadow-xs">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 grid place-items-center font-black text-gray-700 transition"
              aria-label="تقليل الكمية"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-7 text-center font-black text-gray-900 text-base">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 grid place-items-center font-black text-gray-700 transition"
              aria-label="زيادة الكمية"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Confirm Button */}
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 bg-[#DA291C] hover:bg-[#B31B1B] text-white font-black py-3 px-4 rounded-xl shadow-md transition flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FFC72C]" />
              <span>إضافة إلى السلة</span>
            </span>
            <span className="bg-black/20 px-2.5 py-1 rounded-lg text-sm font-black" dir="ltr">
              {totalPrice.toFixed(2)} ج.م
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
