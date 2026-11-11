import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/menuData';

export const CustomerReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-16 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-1 text-[#FFC72C] mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
            آراء وتجارب عشّاق ماك فاست
          </h2>
          <p className="text-gray-500 font-semibold text-sm sm:text-base">
            أكثر من 50,000 عميل سعيد يشاركون تجاربهم مع أشهى الوجبات السريعة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between relative"
            >
              <MessageSquareQuote className="w-8 h-8 text-red-100 absolute top-4 left-4" />

              <div>
                <div className="flex items-center gap-1 text-[#FFC72C] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 font-semibold">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#FFC72C]"
                />
                <div>
                  <h4 className="font-black text-sm text-gray-900 leading-tight">
                    {rev.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                    <span>{rev.city}</span>
                    <span>•</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
