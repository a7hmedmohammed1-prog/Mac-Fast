import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, Check, Sparkles, Truck } from 'lucide-react';
import { CartItem, Coupon } from '../types';
import { AVAILABLE_COUPONS } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => { success: boolean; message: string };
  onRemoveCoupon: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isOpen) return null;

  // Subtotal calculations
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Delivery calculation (standard 30 EGP, free over 200 EGP or if coupon applied)
  const isFreeDeliveryQualified = subtotal >= 200 || appliedCoupon?.freeDelivery;
  const deliveryFee = subtotal === 0 ? 0 : isFreeDeliveryQualified ? 0 : 30;
  const freeDeliveryThreshold = 200;
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  // Discount calculation
  let discount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.discountPercent) {
      discount = (subtotal * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.discountAmount) {
      discount = Math.min(subtotal, appliedCoupon.discountAmount);
    }
  }

  // Tax calculation 14% on (subtotal - discount)
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * 0.14;
  const total = taxableAmount + tax + deliveryFee;

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = onApplyCoupon(couponInput.trim());
    if (res.success) {
      setCouponFeedback({ type: 'success', message: res.message });
      setCouponInput('');
    } else {
      setCouponFeedback({ type: 'error', message: res.message });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="cart-heading">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        id="cart-drawer"
        className="fixed top-0 right-0 z-50 w-full sm:w-[440px] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out animate-in slide-in-from-right"
      >
        {/* Drawer Header */}
        <div className="p-5 bg-[#DA291C] text-white flex justify-between items-center shadow-md shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/15 grid place-items-center">
              <ShoppingBag className="w-5 h-5 text-[#FFC72C]" />
            </div>
            <div>
              <h2 id="cart-heading" className="font-black text-xl leading-none">
                سلة الطلبات
              </h2>
              <span className="text-xs text-red-100 font-bold">
                {items.reduce((s, i) => s + i.quantity, 0)} وجبات مختارة
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="text-xs font-bold bg-white/10 hover:bg-white/20 text-red-100 hover:text-white px-2.5 py-1.5 rounded-lg transition"
                title="تفريغ السلة"
              >
                تفريغ
              </button>
            )}
            <button
              id="cart-close-btn"
              type="button"
              onClick={onClose}
              aria-label="إغلاق السلة"
              className="text-white hover:text-[#FFC72C] p-1.5 rounded-lg hover:bg-white/10 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Free Delivery Bar */}
        {subtotal > 0 && (
          <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-200 shrink-0 text-xs">
            {isFreeDeliveryQualified ? (
              <div className="flex items-center justify-between text-emerald-800 font-black">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>مبروك! حصلت على توصيل مجاني للطلب 🎉</span>
                </span>
                <Truck className="w-4 h-4" />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between font-bold text-gray-700 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#DA291C]" />
                    <span>أضف <strong className="text-[#DA291C]">{amountToFreeDelivery.toFixed(2)} ج.م</strong> للحصول على توصيل مجاني!</span>
                  </span>
                  <span>{Math.round(freeDeliveryProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#DA291C] h-full transition-all duration-300"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cart Items List */}
        <div id="cart-items" className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 divide-y divide-gray-100">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-20 h-20 bg-red-50 text-[#DA291C] rounded-full grid place-items-center mx-auto mb-4">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="font-black text-gray-800 text-lg mb-1">السلة فارغة حالياً</h3>
              <p className="text-gray-500 text-xs sm:text-sm font-semibold max-w-xs mx-auto mb-6">
                استكشف قائمتنا وأضف وجباتك المفضلة وسنجهزها لك على الفور ساخنة ولذيذة!
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#DA291C] hover:bg-[#B31B1B] text-white font-black px-6 py-2.5 rounded-xl text-sm transition shadow-md"
              >
                تصفح قائمة الطعام
              </button>
            </div>
          ) : (
            items.map((cartItem) => (
              <div
                key={cartItem.cartId}
                className="flex items-start gap-3 pt-3.5 first:pt-0 group"
              >
                {/* Thumbnail */}
                <img
                  src={cartItem.product.image}
                  alt={cartItem.product.name}
                  className="w-16 h-16 rounded-xl object-cover border border-gray-200 shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-black text-sm text-gray-900 leading-tight">
                      {cartItem.product.name}
                    </h4>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(cartItem.cartId)}
                      className="text-gray-400 hover:text-red-600 p-1 transition"
                      aria-label={`حذف ${cartItem.product.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Options tags */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {cartItem.options.size && (
                      <span className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-bold">
                        {cartItem.options.size}
                      </span>
                    )}
                    {cartItem.options.spiciness === 'spicy' && (
                      <span className="text-[10px] bg-red-100 text-[#DA291C] px-1.5 py-0.5 rounded font-bold">
                        سبايسي حار 🌶️
                      </span>
                    )}
                    {cartItem.options.selectedExtras?.map((ex) => (
                      <span
                        key={ex.id}
                        className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold"
                      >
                        +{ex.name}
                      </span>
                    ))}
                  </div>

                  {cartItem.options.notes && (
                    <p className="text-[11px] text-gray-500 italic mt-0.5">
                      ملاحظة: {cartItem.options.notes}
                    </p>
                  )}

                  {/* Stepper + Price */}
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center gap-1.5 bg-gray-100 rounded-lg p-1">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(cartItem.cartId, -1)}
                        className="w-6 h-6 rounded bg-white hover:bg-gray-200 text-gray-700 grid place-items-center font-bold text-xs shadow-2xs transition"
                        aria-label="تقليل الكمية"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center font-black text-xs text-gray-900">
                        {cartItem.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(cartItem.cartId, 1)}
                        className="w-6 h-6 rounded bg-white hover:bg-gray-200 text-gray-700 grid place-items-center font-bold text-xs shadow-2xs transition"
                        aria-label="زيادة الكمية"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-left font-black text-[#DA291C] text-sm" dir="ltr">
                      {(cartItem.unitPrice * cartItem.quantity).toFixed(2)} ج.م
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Calculations */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t bg-gray-50 space-y-3.5 shrink-0">
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-xs font-bold text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600" />
                    <span>كود مطبق: <strong>{appliedCoupon.code}</strong> ({appliedCoupon.description})</span>
                  </div>
                  <button
                    type="button"
                    onClick={onRemoveCoupon}
                    className="text-red-600 hover:underline text-xs"
                  >
                    إلغاء
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCouponSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="لديك كود خصم؟ (جرب MAC20)"
                    className="flex-1 uppercase px-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-bold focus:border-[#DA291C] focus:ring-1 focus:ring-red-100 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#202124] hover:bg-gray-800 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition"
                  >
                    تطبيق
                  </button>
                </form>
              )}

              {couponFeedback && (
                <p
                  className={`text-[11px] font-bold mt-1.5 ${
                    couponFeedback.type === 'success' ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {couponFeedback.message}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs font-bold text-gray-600">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span dir="ltr">{subtotal.toFixed(2)} ج.م</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>الخصم المطبق:</span>
                  <span dir="ltr">-{discount.toFixed(2)} ج.م</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>رسوم التوصيل:</span>
                <span dir="ltr" className={deliveryFee === 0 ? 'text-emerald-700' : ''}>
                  {deliveryFee === 0 ? 'مجاني 🎉' : `${deliveryFee.toFixed(2)} ج.م`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>ضريبة القيمة المضافة (14%):</span>
                <span dir="ltr">{tax.toFixed(2)} ج.م</span>
              </div>

              <div className="flex justify-between text-lg font-black text-gray-900 border-t border-gray-200 pt-2">
                <span>الإجمالي الكلي:</span>
                <span dir="ltr" className="text-[#DA291C] text-xl font-black">
                  {total.toFixed(2)} ج.م
                </span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              id="checkout-btn"
              type="button"
              onClick={onProceedToCheckout}
              className="w-full bg-[#FFC72C] hover:bg-[#ffcf47] active:bg-[#e6b325] text-[#202124] font-black py-3.5 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <span>متابعة وتأكيد الطلب</span>
              <ArrowLeft className="w-5 h-5" />
            </button>

            <p className="text-center text-gray-400 text-[11px] font-semibold">
              تجربة توضيحية كاملة؛ يمكنك طلب وتتبع وجبتك فورياً!
            </p>
          </div>
        )}
      </aside>
    </div>
  );
};
