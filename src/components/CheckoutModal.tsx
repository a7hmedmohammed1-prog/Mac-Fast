import React, { useState } from 'react';
import { X, MapPin, Phone, User, CreditCard, Banknote, ShieldCheck, CheckCircle2, Building2, Truck } from 'lucide-react';
import { CartItem, OrderDetails, Coupon } from '../types';
import { BRANCHES } from '../data/menuData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  appliedCoupon: Coupon | null;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  appliedCoupon,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [address, setAddress] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0].name);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'applepay'>('cash');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Totals calculations
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const isFreeDeliveryQualified = subtotal >= 200 || appliedCoupon?.freeDelivery;
  const deliveryFee = deliveryType === 'pickup' ? 0 : (isFreeDeliveryQualified ? 0 : 30);

  let discount = 0;
  if (appliedCoupon && subtotal > 0) {
    if (appliedCoupon.discountPercent) {
      discount = (subtotal * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.discountAmount) {
      discount = Math.min(subtotal, appliedCoupon.discountAmount);
    }
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * 0.14;
  const total = taxableAmount + tax + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!customerName.trim()) {
      newErrors.name = 'يرجى كتابة الاسم';
    }
    if (!customerPhone.trim() || customerPhone.length < 9) {
      newErrors.phone = 'يرجى إدخال رقم جوال صحيح (مثال: 0512345678)';
    }
    if (deliveryType === 'delivery' && !address.trim()) {
      newErrors.address = 'يرجى إدخال عنوان التوصيل بالتفصيل';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: OrderDetails = {
        orderId: 'MC-' + Math.floor(100000 + Math.random() * 900000),
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        deliveryType,
        address: deliveryType === 'delivery' ? address.trim() : `استلام من: ${selectedBranch}`,
        branch: selectedBranch,
        paymentMethod,
        notes: notes.trim(),
        items,
        subtotal,
        tax,
        deliveryFee,
        discount,
        total,
        createdAt: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
        estimatedMinutes: deliveryType === 'delivery' ? 30 : 15,
        status: 'received',
      };

      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
      >
        {/* Header */}
        <div className="p-5 bg-[#DA291C] text-white flex justify-between items-center shrink-0">
          <div>
            <h3 id="checkout-title" className="text-xl font-black">
              تأكيد بيانات الطلب
            </h3>
            <p className="text-xs text-red-100">
              أدخل معلومات التوصيل لإعداد وإرسال طلبك فوراً
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:text-[#FFC72C] p-1.5 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 text-right flex-1">
          {/* Delivery or Pickup toggle */}
          <div>
            <label className="block text-xs font-black text-gray-700 mb-2">
              طريقة استلام الطلب:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryType('delivery')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-black transition cursor-pointer ${
                  deliveryType === 'delivery'
                    ? 'border-[#DA291C] bg-red-50 text-[#DA291C] shadow-xs'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>توصيل للمنزل</span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('pickup')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-black transition cursor-pointer ${
                  deliveryType === 'pickup'
                    ? 'border-[#DA291C] bg-red-50 text-[#DA291C] shadow-xs'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>استلام من الفرع</span>
              </button>
            </div>
          </div>

          {/* Personal Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-black text-gray-700 mb-1">
                الاسم الكريم: *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="مثال: محمد العمري"
                  className="w-full pr-10 pl-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-[#DA291C] focus:ring-1 focus:ring-red-100 outline-none"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-black text-gray-700 mb-1">
                رقم الجوال: *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  dir="ltr"
                  value={customerPhone}
                  onChange={(e) => {
                    setCustomerPhone(e.target.value);
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="01XXXXXXXXX"
                  className="w-full pr-10 pl-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-right focus:bg-white focus:border-[#DA291C] focus:ring-1 focus:ring-red-100 outline-none"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1 font-bold">{errors.phone}</p>}
            </div>
          </div>

          {/* Address or Branch Selection */}
          {deliveryType === 'delivery' ? (
            <div>
              <label className="block text-xs font-black text-gray-700 mb-1">
                عنوان التوصيل (المحافظة، الحي، اسم الشارع، رقم العمارة والشقة): *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-gray-400 absolute right-3.5 top-3" />
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) setErrors({ ...errors, address: '' });
                  }}
                  placeholder="مثال: القاهرة، مدينة نصر، شارع عباس العقاد، عمارة 15، شقة 4"
                  className="w-full pr-10 pl-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-[#DA291C] focus:ring-1 focus:ring-red-100 outline-none"
                />
              </div>
              {errors.address && <p className="text-red-500 text-xs mt-1 font-bold">{errors.address}</p>}
            </div>
          ) : (
            <div>
              <label className="block text-xs font-black text-gray-700 mb-1">
                اختر الفرع للاستلام:
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:bg-white focus:border-[#DA291C] outline-none"
              >
                {BRANCHES.map((b) => (
                  <option key={b.name} value={b.name}>
                    {b.name} ({b.hours})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-black text-gray-700 mb-2">
              طريقة الدفع:
            </label>
            <div className="grid grid-cols-3 gap-2.5 text-xs font-bold">
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition cursor-pointer ${
                  paymentMethod === 'cash'
                    ? 'border-[#DA291C] bg-red-50 text-[#DA291C]'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-600" />
                <span>دفع عند الاستلام</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-[#DA291C] bg-red-50 text-[#DA291C]'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span>بطاقة مدى / فيزا</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('applepay')}
                className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition cursor-pointer ${
                  paymentMethod === 'applepay'
                    ? 'border-[#DA291C] bg-red-50 text-[#DA291C]'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="font-black text-base leading-none">Pay</span>
                <span>أبل باي</span>
              </button>
            </div>
          </div>

          {/* Notes for driver */}
          <div>
            <label className="block text-xs font-black text-gray-700 mb-1">
              ملاحظات للمندوب أو المطبخ (اختياري):
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="مثال: يرجى عدم رن الجرس، الاتصال عند الوصول..."
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:border-[#DA291C] outline-none"
            />
          </div>

          {/* Order Summary Recap */}
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-xs space-y-1.5">
            <div className="flex justify-between font-bold text-gray-600">
              <span>عدد الوجبات:</span>
              <span>{items.reduce((s, i) => s + i.quantity, 0)} وجبة</span>
            </div>
            <div className="flex justify-between font-bold text-gray-600">
              <span>المجموع الفرعي:</span>
              <span dir="ltr">{subtotal.toFixed(2)} ج.م</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between font-bold text-emerald-700">
                <span>الخصم المطبق:</span>
                <span dir="ltr">-{discount.toFixed(2)} ج.م</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-gray-600">
              <span>التوصيل:</span>
              <span dir="ltr">{deliveryFee === 0 ? 'مجاني' : `${deliveryFee.toFixed(2)} ج.م`}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-600">
              <span>ضريبة القيمة المضافة (14%):</span>
              <span dir="ltr">{tax.toFixed(2)} ج.م</span>
            </div>
            <div className="flex justify-between text-base font-black text-gray-900 border-t pt-2">
              <span>المبلغ المطلوب سداده:</span>
              <span dir="ltr" className="text-[#DA291C] font-black text-lg">
                {total.toFixed(2)} ج.م
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#DA291C] hover:bg-[#B31B1B] text-white font-black py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>جاري إرسال الطلب للمطبخ...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#FFC72C]" />
                <span>تأكيد وإتمام الطلب الآن ({total.toFixed(2)} ج.م)</span>
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
