import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Star 
} from 'lucide-react';

interface MembershipPageProps {
  onBackToHome: () => void;
  onOpenSupport?: () => void;
}

export default function MembershipPage({ onBackToHome, onOpenSupport }: MembershipPageProps) {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'silver',
      name: 'العضوية الفضية الحرفية 🥈',
      price: 'مجانية بالكامل',
      desc: 'مخصصة للورش الناشئة ورائدات العمل الحر الراغبات ببدء عرض منتجاتهن التراثية وتوثيق هويتهن بالمتجر المستقل.',
      features: [
        'إنشاء ملف مهني رقمي بمتجر المنصة',
        'عرض حتى 5 منتجات طهي أو حرفية',
        'استقبال الطلبات والدفع الإلكتروني',
        'حضور الدورات الأساسية بالأكاديمية'
      ],
      badge: 'مجانية 100%',
      buttonText: 'الاشتراك في العضوية الفضية (مجاناً)'
    },
    {
      id: 'gold',
      name: 'العضوية الذهبية للتمكين التنموي 🥇',
      price: 'مُدعمة بالكامل',
      desc: 'للمطابخ والورش الراغبة في التوسع الفندقي، أولوية التمويل التمكيني، والتسويق لضيوف الرحمن.',
      features: [
        'أولوية البيع بالمتجر والربط بالفنادق',
        'أولوية التمويل المرن حتى 50,000 ريال',
        'استشارات مجانية أسبوعية في الجودة',
        'توثيق منتجاتك في نظارة الحكايات StoryLens'
      ],
      badge: 'الأكثر طلباً ⭐',
      buttonText: 'الانضمام للعضوية الذهبية'
    },
    {
      id: 'diamond',
      name: 'عضوية حاضنات الأعمال والشركاء 💎',
      price: 'للجمعيات والمؤسسات',
      desc: 'عضوية مؤسسية مخصصة للجمعيات الأهلية والقطاع الثالث لرعاية وتأهيل مجموعات رائدات العمل الحر.',
      features: [
        'لوحة حوكمة وإدارة متابعة شاملة',
        'تقارير قياس الأثر التنموي والمالي',
        'ربط تقني مخصص بمدفوعات المنصة',
        'استشارات استراتيجية من TND.SA'
      ],
      badge: 'للشراكات المؤسسية',
      buttonText: 'طلب شراكة مؤسسية'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 text-right p-4 sm:p-6 font-sans" id="standalone-membership-page">
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
          <span className="text-xs sm:text-sm font-black text-stone-800">باقات العضويات وحاضنات التسويق (/membership)</span>
          <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping"></span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#174F3E] via-primary to-emerald-950 text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl border border-accent/30">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-accent text-xs font-black bg-white/10 border border-accent/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" />
            عضويات حصرية لتعزيز النمو والاستدامة 🎖️
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            اختر الباقة المناسبة لتنمية مشروعات رائدات العمل الحر
          </h1>

          <p className="text-stone-200 text-xs sm:text-sm font-light leading-relaxed">
            صُممت باقات العضوية لتمنحك الأدوات والخدمات الاستشارية والتمويلية والتسويقية اللازمة للوصول بمنتجاتك التراثية إلى آفاق اقتصادية واسعة.
          </p>
        </div>
      </div>

      {/* Selection Confirmation Banner */}
      {selectedPlan && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>تم استلام طلب اختيارك لـ [{selectedPlan}]! جاري تجهيز تفعيل الحساب.</span>
          </div>
          <button
            type="button"
            onClick={() => setSelectedPlan(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white border rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-6 text-right relative ${
              plan.id === 'gold' ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-stone-200'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                  {plan.badge}
                </span>
                <span className="font-mono text-sm font-extrabold text-[#174F3E]">{plan.price}</span>
              </div>

              <div>
                <h3 className="font-black text-stone-800 text-lg">{plan.name}</h3>
                <p className="text-stone-500 text-xs font-light leading-relaxed mt-2">{plan.desc}</p>
              </div>

              <div className="space-y-2 pt-3 border-t border-stone-100">
                {plan.features.map((ft, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{ft}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedPlan(plan.name)}
              className="w-full bg-[#174F3E] hover:bg-[#174F3E]/90 text-white font-extrabold py-3 rounded-xl text-xs transition-all shadow-xs cursor-pointer hover:scale-[1.02]"
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
