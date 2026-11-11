import React from 'react';
import { Truck, Flame, ShieldCheck, HeartHandshake, Award, Clock } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: 'توصيل فائق السرعة',
      desc: 'نضمن وصول وجبتك خلال 30 دقيقة أو أقل بفضل أسطولنا ومطابخنا السحابية المتطورة.',
      color: 'bg-red-50 text-[#DA291C]',
    },
    {
      icon: Flame,
      title: 'ساخن ومقرمش دائماً',
      desc: 'نستخدم حقائب حرارية ذكية وتغليفاً خاصاً يحافظ على درجة حرارة الطعام وقرمشة البطاطس.',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      icon: ShieldCheck,
      title: 'لحوم طازجة وحلال 100%',
      desc: 'لحم بقري صافي ودجاج محلي طازج يتم تحضيره يومياً دون أي مواد حافظة أو زيوت مهدرجة.',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      icon: Award,
      title: 'أعلى معايير النظافة والطهي',
      desc: 'شهادات جودة عالمية وفريق طهاة محترف يلتزم بأعلى معايير سلامة الغذاء والنظافة.',
      color: 'bg-blue-50 text-blue-600',
    },
  ];

  return (
    <section id="features" className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black text-[#DA291C] bg-red-50 px-3.5 py-1 rounded-full inline-block mb-3">
            سر تميزنا
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
            لماذا يختار الآلاف ماك فاست كل يوم؟
          </h2>
          <p className="text-gray-500 font-semibold text-sm sm:text-base">
            نجمع بين السرعة المذهلة، المذاق الذي لا يُنسى، وأعلى معايير الجودة العالمية
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-[#F8F9FA] rounded-2xl p-6 border border-gray-200/80 hover:border-[#DA291C] hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl grid place-items-center mb-4 transition-transform group-hover:scale-110 ${feat.color}`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-black text-lg text-gray-900 mb-2">{feat.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
