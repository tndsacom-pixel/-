import React, { useState } from 'react';
import { Sparkles, ChevronLeft, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';

interface AboutPlatformIntroProps {
  onSelectTrack?: (track: 'family' | 'pilgrim' | 'visitor' | 'supporter') => void;
}

export default function AboutPlatformIntro({ onSelectTrack }: AboutPlatformIntroProps) {
  const [showMore, setShowMore] = useState<boolean>(false);

  const steps = [
    { icon: '👩‍🍳', title: 'الأسرة المنتجة والحرفي', desc: 'الانطلاقة بالمهارة اليدوية والتراثية' },
    { icon: '📊', title: 'تقييم الجاهزية', desc: 'تحليل دقيق ونقاط النمو' },
    { icon: '🎓', title: 'التدريب والتأهيل', desc: 'برامج تطويرية ورفع كفاءة' },
    { icon: '🏆', title: 'التوثيق والجودة', desc: 'شهادات واعتمادات معتمدة' },
    { icon: '🛍️', title: 'التسويق والبيع', desc: 'عرض المنتجات بالمتجر الذكي' },
    { icon: '🤝', title: 'الوصول إلى العملاء والأسواق', desc: 'ربط بالمعتمرين والشركاء' },
  ];

  const targetAudiences = [
    {
      id: 'family' as const,
      icon: '👩‍🍳',
      title: 'الأسر المنتجة والحرفيون',
      desc: 'تأهيل وتمكين وتسويق وفرص نمو.',
      color: 'bg-[#F4FEF6] hover:bg-amber-50/80 text-[#1E3D34] border-[#1E3D34]/20 hover:border-[#C8A96B]',
      badge: 'المرتكز الأساسي',
      actionText: 'الانتقال لمسار الأسرة المنتجة'
    },
    {
      id: 'pilgrim' as const,
      icon: '🕋',
      title: 'المعتمرون',
      desc: 'منتجات وضيافة وتجارب سعودية أصيلة.',
      color: 'bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-950 border-emerald-200/80 hover:border-emerald-400',
      badge: 'ضيافة الحرمين',
      actionText: 'الانتقال لمسار المعتمرين'
    },
    {
      id: 'visitor' as const,
      icon: '🕌',
      title: 'الزوار والسياح',
      desc: 'حرف ومنتجات وتجارب تراثية.',
      color: 'bg-amber-50/70 hover:bg-amber-100/70 text-amber-950 border-amber-200/80 hover:border-amber-400',
      badge: 'إثراء التجربة',
      actionText: 'الانتقال لمسار الزوار'
    },
    {
      id: 'supporter' as const,
      icon: 'supporter' as const,
      iconEmoji: '🤝',
      title: 'الجهات والشركاء',
      desc: 'فرص شراكة وتمكين وربط بالأسواق.',
      color: 'bg-stone-50 hover:bg-stone-100 text-stone-900 border-stone-200 hover:border-stone-400',
      badge: 'الاستدامة والأثر',
      actionText: 'الانتقال لمسار الشركاء والداعمين'
    },
  ];

  const handleAudienceClick = (id: 'family' | 'pilgrim' | 'visitor' | 'supporter') => {
    if (onSelectTrack) {
      onSelectTrack(id);
    } else {
      const journeyElem = document.getElementById('choose-your-journey');
      if (journeyElem) {
        journeyElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="space-y-8 my-8 text-right font-sans" id="about-platform-intro">
      {/* 1. 🇸🇦 ما هو إرث أجيال؟ */}
      <div className="bg-[#F4FEF6] border-2 border-[#1E3D34]/20 p-6 md:p-10 rounded-3xl space-y-8 shadow-xs relative overflow-hidden">
        {/* Subtle Decorative Background Element */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#C8A96B]/5 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#1E3D34] text-[#C8A96B] px-4 py-1.5 rounded-full text-xs font-black shadow-xs">
            <span>🇸🇦 ما هو إرث أجيال؟</span>
          </div>

          <h2 className="font-black text-stone-900 text-2xl md:text-3xl leading-snug">
            ما هو إرث أجيال؟
          </h2>

          <p className="text-stone-800 text-sm md:text-base font-medium leading-relaxed bg-white/95 border border-[#1E3D34]/15 p-4 md:p-5 rounded-2xl shadow-2xs">
            «إرث أجيال منصة تمكين للأسر المنتجة والحرفيين، تهدف إلى تحويل المهارات التراثية إلى فرص إنتاج ودخل مستدام، من خلال التأهيل والتطوير والجودة والتسويق وربط المستفيدين بالأسواق والعملاء.»
          </p>

          {/* Short summary text with Expand / Read More toggle */}
          <div className="space-y-3 pt-1">
            <p className="text-stone-700 text-xs md:text-sm font-semibold leading-relaxed">
              «إرث أجيال ليست متجرًا فقط، وليست برنامجًا تدريبيًا فقط؛ بل منظومة متكاملة تربط المهارة التراثية بالتأهيل والجودة والسوق.»
            </p>

            {/* Read More Collapsible Toggle */}
            <div>
              <button
                type="button"
                onClick={() => setShowMore(!showMore)}
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#1E3D34] bg-white border border-[#1E3D34]/20 px-4 py-1.5 rounded-xl hover:bg-[#1E3D34] hover:text-[#C8A96B] transition-all cursor-pointer shadow-2xs"
              >
                <span>{showMore ? 'طي التفاصيل' : 'عرض المزيد'}</span>
                {showMore ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Expanded Detailed Description */}
            {showMore && (
              <div className="mt-3 p-4 bg-white/90 border border-[#C8A96B]/30 rounded-2xl text-xs text-stone-700 leading-relaxed text-right space-y-2 animate-fadeIn">
                <p>
                  تعمل المنصة كحاضنة رقمية تفاعلية تقدم باقات تمكينية شاملا التقييم الذاتي، الاستشارات التخصصية، إصدار الاعتمادات والتراخيص الرسمية، وتوفير منافذ بيع إلكترونية وميادين ضيافة مباشرة تستهدف زوار الحرمين الشريفين والمعتمرين.
                </p>
                <p className="font-bold text-[#1E3D34]">
                  💡 الركيزة الأساسية: الاعتماد على التأهيل والتطوير المستمر وفتح منافذ السوق لضمان النمو والاستدامة.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Visual Journey Workflow (مسار التمكين البصري) */}
        <div className="space-y-5 pt-6 border-t border-[#1E3D34]/15">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-black text-[#1E3D34] tracking-wider uppercase block">
              مسار التمكين المتكامل
            </span>
            <h3 className="font-bold text-stone-900 text-base md:text-lg">
              رحلة التمكين الشاملة من المهارة إلى السوق
            </h3>
          </div>

          {/* Desktop/Laptop Grid */}
          <div className="hidden md:grid grid-cols-6 gap-2.5 items-stretch relative">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-white border-2 border-[#1E3D34]/15 p-3.5 rounded-2xl text-center space-y-2 relative shadow-xs hover:border-[#C8A96B] transition-all hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </span>
                  <h4 className="font-black text-stone-900 text-xs leading-tight">
                    {step.title}
                  </h4>
                </div>
                <p className="text-[10px] text-stone-500 font-light leading-snug pt-1 border-t border-stone-100">
                  {step.desc}
                </p>
                <span className="absolute -top-2.5 -right-2 bg-[#1E3D34] text-[#C8A96B] text-[9px] font-mono font-black w-5 h-5 rounded-full flex items-center justify-center border border-[#C8A96B]">
                  {idx + 1}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile Vertical Flow */}
          <div className="grid md:hidden grid-cols-1 sm:grid-cols-2 gap-3">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white border border-[#1E3D34]/15 p-3.5 rounded-2xl flex items-center gap-3 relative shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-[#1E3D34] text-[#C8A96B] flex items-center justify-center text-xl flex-shrink-0 font-bold border border-[#C8A96B]/30">
                  {step.icon}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-black bg-[#C8A96B] text-stone-900 px-1.5 py-0.2 rounded-md">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-stone-900 text-xs">{step.title}</h4>
                  </div>
                  <p className="text-[10px] text-stone-500 font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tagline Conclusion */}
          <div className="text-center pt-3">
            <div className="inline-flex items-center gap-2 bg-[#1E3D34] text-amber-300 font-black px-6 py-2.5 rounded-2xl text-sm border-2 border-[#C8A96B] shadow-sm">
              <Sparkles className="w-4 h-4 text-[#C8A96B]" />
              <span>«من المهارة إلى مشروع مستدام»</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 🎯 اختر رحلتك مع إرث أجيال */}
      <div className="bg-white border border-stone-200 p-6 md:p-8 rounded-3xl space-y-6 shadow-xs" id="choose-your-journey">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-[#C8A96B] text-xs font-black bg-[#1E3D34] px-3.5 py-1 rounded-full border border-[#C8A96B]/30 inline-block">
            🎯 مسارات التمكين
          </span>
          <h2 className="font-black text-stone-900 text-2xl md:text-3xl">
            اختر رحلتك مع إرث أجيال
          </h2>
          <p className="text-stone-600 text-xs md:text-sm font-medium">
            اختر الفئة المناسبة لك للوصول إلى الخدمات والفرص المخصصة لاحتياجك.
          </p>
        </div>

        {/* 4 Interactive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {targetAudiences.map((aud) => (
            <div
              key={aud.id}
              onClick={() => handleAudienceClick(aud.id)}
              className={`p-5 rounded-2xl border ${aud.color} space-y-4 transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer flex flex-col justify-between group`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-3xl group-hover:scale-110 transition-transform">
                    {aud.iconEmoji || aud.icon}
                  </span>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-white/90 border border-stone-200 text-stone-700 shadow-2xs">
                    {aud.badge}
                  </span>
                </div>
                <h3 className="font-black text-stone-900 text-base">{aud.title}</h3>
                <p className="text-xs text-stone-600 font-medium leading-relaxed">
                  {aud.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between text-[11px] font-bold text-[#1E3D34] group-hover:text-[#C8A96B]">
                <span>{aud.actionText}</span>
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
