import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  HeartHandshake, 
  CheckCircle2, 
  Award, 
  Users, 
  FileText 
} from 'lucide-react';

interface InitiativesPageProps {
  onBackToHome: () => void;
  onOpenSupport?: () => void;
}

export default function InitiativesPage({ onBackToHome, onOpenSupport }: InitiativesPageProps) {
  const [registeredInitiative, setRegisteredInitiative] = useState<string | null>(null);

  const initiativesList = [
    {
      id: 'baraka',
      title: 'مبادرة بركة الحرمين لإطعام ضيوف الرحمن 🕊️',
      badge: 'مبادرة الإطعام والصدقات',
      desc: 'برنامج مخصص لتجهيز وتوصيل الوجبات الشعبية الطازجة والمشروبات التراثية لضيوف الرحمن والسياح في ساحات الحرمين الشريفين بمكة المكرمة والمدينة المنورة بأيدي أسر منتجة مرخصة.',
      metrics: 'أكثر من 50,000 وجبة موثقة distributed',
      highlights: [
        'توزيع موثق إلكترونياً بالفاتورة والصور',
        'تشغيل وتأهيل الأسر الوطنية المنتجة',
        'مطابقة كاملة لاشتراطات سلامة الأغذية'
      ]
    },
    {
      id: 'sadu',
      title: 'مبادرة سفراء السدو والحرف السعودية 🧶',
      badge: 'صون الحرف والهوية',
      desc: 'تمكين وصون الحرفيات المتخصصات في حياكة السدو، النسيج التراثي، وصناعة المنسوجات والسجاد التذكاري، وربط منتجاتهن مباشرة بالمتاجر الرسمية والفنادق الفاخرة.',
      metrics: '320+ حرفية مُمكّنة بورش حية',
      highlights: [
        'توفير خامات غزل عالية الجودة مجاناً',
        'تسويق المنتجات بأسواق السياحة والمعارض',
        'توثيق الملكية الحرفية وحماية الهوية'
      ]
    },
    {
      id: 'hirfa',
      title: 'مبادرة حرفتي أمان للتمكين التمويلي 🤝',
      badge: 'التمويل التنموي المستدام',
      desc: 'تقديم برامج التمويل التمكيني الخالي من الفوائد والأرباح للورش المنزلية والحرفية بدون الحاجة لكفيل غارم، بناءً على التقييم المباشر لجدارات الأسرة بالمنصة.',
      metrics: 'دعم يصل إلى 50,000 ريال للأسرة',
      highlights: [
        'بدون فوائد وبدون كفيل غارم',
        'دراسة أهلية سريعة خلال 48 ساعة',
        'متابعة واستشارات مجانية خلال فترة التمويل'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 text-right p-4 sm:p-6 font-sans" id="standalone-initiatives-page">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between bg-white border border-stone-200 p-4 rounded-2xl shadow-xs">
        <button
          type="button"
          onClick={onBackToHome}
          className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى الرئيسية</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-black text-stone-800">المبادرات الوطنية والتنموية (/initiatives)</span>
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#C8A96B] via-primary to-[#7D6732] text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl border border-accent/30">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-accent text-xs font-black bg-white/10 border border-accent/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" />
            مبادرات نوعية برعاية إرث أجيال والتفكير والنماء 🌟
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            المبادرات التنموية لتمكين المجتمع والأسر المنتجة
          </h1>

          <p className="text-stone-200 text-xs sm:text-sm font-light leading-relaxed">
            نطلق ونشرف على حزمة من المبادرات الوطنية المصممة لإحداث أثر مجتمعي واقتصادي ملموس، وتعزيز المشاركة في برامج التمكين والضيافة وإطعام ضيوف الرحمن.
          </p>
        </div>
      </div>

      {/* Registration Toast */}
      {registeredInitiative && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>تم تسليم طلب انضمامك إلى [{registeredInitiative}] بنجاح! سيتم التواصل معك قريباً.</span>
          </div>
          <button
            type="button"
            onClick={() => setRegisteredInitiative(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      )}

      {/* Initiatives Cards */}
      <div className="space-y-6">
        {initiativesList.map((init) => (
          <div 
            key={init.id}
            className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all space-y-4 text-right"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-accent bg-primary/10 px-3 py-1 rounded-full inline-block mb-1.5">
                  {init.badge}
                </span>
                <h3 className="font-black text-stone-800 text-lg md:text-xl">{init.title}</h3>
              </div>

              <span className="bg-stone-50 border border-stone-200 text-stone-700 font-mono text-xs font-extrabold px-3 py-1.5 rounded-xl self-start sm:self-auto">
                {init.metrics}
              </span>
            </div>

            <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
              {init.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {init.highlights.map((hl, idx) => (
                <div key={idx} className="bg-stone-50 border border-stone-200/80 p-3 rounded-2xl text-xs font-bold text-stone-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setRegisteredInitiative(init.title)}
                className="bg-[#174F3E] hover:bg-[#174F3E]/90 text-white font-extrabold py-2.5 px-6 rounded-xl text-xs transition-all shadow-xs cursor-pointer hover:scale-105"
              >
                طلب التسجيل والمشاركة بالمبادرة ✍️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
