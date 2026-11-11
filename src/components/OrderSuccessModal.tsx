import React, { useState, useEffect } from 'react';
import { CheckCircle2, Clock, MapPin, Phone, ChefHat, Bike, Home, Sparkles, Printer } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderSuccessModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  // Simulated order status progression: received -> cooking -> delivering
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [minutesLeft, setMinutesLeft] = useState<number>(order.estimatedMinutes);

  useEffect(() => {
    const timer = setInterval(() => {
      setMinutesLeft((prev) => (prev > 1 ? prev - 1 : 1));
    }, 15000); // decrement for lively feel

    const stepTimer = setTimeout(() => {
      setCurrentStep(2); // cooking
    }, 4000);

    const deliverTimer = setTimeout(() => {
      setCurrentStep(3); // on the way
    }, 12000);

    return () => {
      clearInterval(timer);
      clearTimeout(stepTimer);
      clearTimeout(deliverTimer);
    };
  }, []);

  const steps = [
    { id: 1, label: 'تم استلام الطلب', icon: CheckCircle2, time: 'فوري' },
    { id: 2, label: 'قيد التحضير في المطبخ', icon: ChefHat, time: '10 دقائق' },
    { id: 3, label: 'في الطريق مع المندوب', icon: Bike, time: '15 دقيقة' },
    { id: 4, label: 'تم التسليم بالهناء والشفاء', icon: Home, time: 'قريباً' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 text-right"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
      >
        {/* Celebration Header */}
        <div className="bg-gradient-to-l from-[#DA291C] to-[#B31B1B] p-6 text-white text-center relative overflow-hidden">
          <div className="w-16 h-16 bg-[#FFC72C] text-[#202124] rounded-full grid place-items-center mx-auto mb-3 shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 id="success-title" className="text-2xl font-black mb-1">
            تم تأكيد طلبك بنجاح!
          </h3>
          <p className="text-red-100 text-xs sm:text-sm font-semibold">
            شكراً لطلبك من ماك فاست، بدأ طهاتنا بتجهيز وجبتك الساخنة الآن.
          </p>

          <div className="mt-3 inline-block bg-white/20 backdrop-blur-xs px-4 py-1.5 rounded-full text-xs font-black tracking-wider">
            رقم الطلب: <span dir="ltr">{order.orderId}</span>
          </div>
        </div>

        {/* Live Stepper Tracker */}
        <div className="p-5 bg-amber-50/70 border-b border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#DA291C]" />
              حالة الطلب المباشرة:
            </span>
            <span className="text-xs font-black bg-[#DA291C] text-white px-2.5 py-1 rounded-full flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              متبقي تقريباً {minutesLeft} دقيقة
            </span>
          </div>

          <div className="relative flex items-center justify-between">
            {/* Connecting line */}
            <div className="absolute top-1/2 right-4 left-4 -translate-y-1/2 h-1 bg-gray-200 z-0" />
            <div
              className="absolute top-1/2 right-4 h-1 bg-[#DA291C] z-0 transition-all duration-700"
              style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
            />

            {steps.map((st) => {
              const Icon = st.icon;
              const isPassed = currentStep >= st.id;
              const isCurrent = currentStep === st.id;

              return (
                <div key={st.id} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full grid place-items-center transition-all shadow-xs ${
                      isPassed
                        ? 'bg-[#DA291C] text-white ring-4 ring-red-100'
                        : 'bg-white text-gray-400 border-2 border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] mt-1.5 font-black text-center max-w-[70px] leading-tight ${
                      isCurrent ? 'text-[#DA291C]' : 'text-gray-600'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Customer & Address Details */}
          <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-200 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-500">اسم العميل:</span>
              <span className="text-gray-900 font-black">{order.customerName}</span>
            </div>
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-500">رقم الجوال:</span>
              <span className="text-gray-900 font-black" dir="ltr">{order.customerPhone}</span>
            </div>
            <div className="flex items-start justify-between font-bold gap-2">
              <span className="text-gray-500 shrink-0">العنوان:</span>
              <span className="text-gray-900 text-left">{order.address}</span>
            </div>
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-500">طريقة الدفع:</span>
              <span className="text-gray-900">
                {order.paymentMethod === 'cash'
                  ? 'الدفع عند الاستلام'
                  : order.paymentMethod === 'applepay'
                  ? 'Apple Pay'
                  : 'بطاقة بنكية'}
              </span>
            </div>
          </div>

          {/* Items Purchased List */}
          <div>
            <h4 className="font-black text-gray-800 text-sm mb-2">الوجبات المطلوبة:</h4>
            <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden">
              {order.items.map((i) => (
                <div key={i.cartId} className="p-3 flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-red-50 text-[#DA291C] font-black grid place-items-center text-xs">
                      {i.quantity}×
                    </span>
                    <div>
                      <p className="font-black text-gray-900 text-xs">{i.product.name}</p>
                      {i.options.size && (
                        <span className="text-[10px] text-gray-500 block">
                          {i.options.size}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="font-black text-gray-900" dir="ltr">
                    {(i.unitPrice * i.quantity).toFixed(2)} ج.م
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financials Breakdown */}
          <div className="space-y-1.5 pt-2 border-t border-gray-200 font-bold text-gray-600">
            <div className="flex justify-between">
              <span>المجموع الفرعي:</span>
              <span dir="ltr">{order.subtotal.toFixed(2)} ج.م</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>الخصم المطبق:</span>
                <span dir="ltr">-{order.discount.toFixed(2)} ج.م</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>التوصيل:</span>
              <span dir="ltr">{order.deliveryFee === 0 ? 'مجاني' : `${order.deliveryFee.toFixed(2)} ج.م`}</span>
            </div>
            <div className="flex justify-between">
              <span>ضريبة القيمة المضافة (14%):</span>
              <span dir="ltr">{order.tax.toFixed(2)} ج.م</span>
            </div>
            <div className="flex justify-between text-sm font-black text-gray-900 border-t pt-2">
              <span>المبلغ الإجمالي:</span>
              <span dir="ltr" className="text-[#DA291C] font-black text-base">
                {order.total.toFixed(2)} ج.م
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-[#DA291C] hover:bg-[#B31B1B] text-white font-black py-3 rounded-xl transition text-center shadow-md cursor-pointer"
          >
            طلب جديد / العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  );
};
