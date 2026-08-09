import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  ArrowRight, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Target, 
  Eye, 
  Globe, 
  ExternalLink 
} from 'lucide-react';

interface AboutPageProps {
  onBackToHome: () => void;
  onOpenSupport?: () => void;
}

export default function AboutPage({ onBackToHome, onOpenSupport }: AboutPageProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-8 text-right p-4 sm:p-6 font-sans" id="standalone-about-page">
      {/* Top Navigation */}
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
          <span className="text-xs sm:text-sm font-black text-stone-800">من نحن - الرؤية والأثر التنموي (/about)</span>
          <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping"></span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#0B3A60] via-primary to-emerald-950 text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl border border-accent/30">
        <div className="relative z-10 max-w-3xl space-y-4">
          <a
            href="https://tnd.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-3.5 py-1.5 rounded-full text-accent text-xs font-bold transition-all"
          >
            <span>مبادرة مُمكّنة من قبل مؤسسة التفكير والنماء للاستشارات الإدارية</span>
            <ExternalLink className="w-3.5 h-3.5 text-accent" />
          </a>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            ورث أجيال: منصة التمكين الاقتصادي للأسر المنتجة والحرفيين
          </h1>

          <p className="text-stone-200 text-xs sm:text-sm font-light leading-relaxed">
            منظومة وطنية متكاملة تهدف إلى صون التراث السعودي الأصيل، وتمكين الأسر الوطنية المنتجة، وتحويل المهارات الحرفية والطهي التراثي إلى قطاعات إنتاجية واعدة مستدامة عبر تقنيات الحوكمة والتأهيل المالي والتسويق الرقمي.
          </p>
        </div>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vision */}
        <div className="bg-white border border-stone-200 p-8 rounded-3xl shadow-xs space-y-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-black text-2xl">
            👁️
          </div>
          <h3 className="font-black text-stone-800 text-lg">رؤيتنا الإستراتيجية</h3>
          <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
            أن نكون البوابة الوطنية الأولى والأنموذج الأبرز في المملكة لتأهيل وتمكين الأسر المنتجة والحرفيين، وربط منتجاتهم التراثية والطهوية بضيوف الرحمن والسياح بأعلى معايير الجودة والاستدامة.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white border border-stone-200 p-8 rounded-3xl shadow-xs space-y-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-2xl">
            🎯
          </div>
          <h3 className="font-black text-stone-800 text-lg">رسالتنا التنموية</h3>
          <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
            تقديم بيئة حاضنة متكاملة تجمع بين التدريب المعتمد، التمويل التمكيني بدون فوائد، الحلول الاستشارية المتقدمة، ومتجر البيع المباشر الموثق لتحقيق الاستقلال المالي والريادة الاجتماعية للأسر الوطنية.
          </p>
        </div>
      </div>

      {/* Strategic Goals */}
      <div className="bg-white border border-stone-200 p-8 rounded-3xl shadow-sm space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <h3 className="font-black text-stone-800 text-lg">مرتكزات وأهداف المنصة 🌟</h3>
          <p className="text-stone-500 text-xs font-light mt-1">تستند المنصة على أربعة أركان أساسية لدعم رؤية المملكة 2030</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
            <span className="text-2xl block">1️⃣</span>
            <h4 className="font-bold text-stone-800 text-xs">صون التراث والهوية</h4>
            <p className="text-stone-500 text-[11px] font-light leading-relaxed">
              الحفاظ على الأطباق الشعبية والمنسوجات التراثية كاللسان، السدو، والنحت التراثي.
            </p>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
            <span className="text-2xl block">2️⃣</span>
            <h4 className="font-bold text-stone-800 text-xs">التمكين المالي والمرن</h4>
            <p className="text-stone-500 text-[11px] font-light leading-relaxed">
              تقديم التمويل التنموي بدون فوائد وبدون كفيل غارم بناءً على التقييم الذكي.
            </p>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
            <span className="text-2xl block">3️⃣</span>
            <h4 className="font-bold text-stone-800 text-xs">ربط ضيوف الرحمن بالسوق</h4>
            <p className="text-stone-500 text-[11px] font-light leading-relaxed">
              تسويق مباشر للمعتمرين والزوار بالفنادق بمكة المكرمة والمدينة المنورة.
            </p>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
            <span className="text-2xl block">4️⃣</span>
            <h4 className="font-bold text-stone-800 text-xs">الحوكمة وضمان الجودة</h4>
            <p className="text-stone-500 text-[11px] font-light leading-relaxed">
              تطبيق معايير سلامة الغذاء والتراخيص المعتمدة لضمان أقصى موثوقية للمشتري.
            </p>
          </div>
        </div>
      </div>

      {/* Partner Banner */}
      <div className="bg-[#0B3A60] text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
        <div className="space-y-2 text-right">
          <span className="text-accent text-xs font-bold bg-white/10 px-3 py-1 rounded-full inline-block">
            الشريك المُمكّن والراعي الاستشاري
          </span>
          <h3 className="font-black text-xl text-white">مؤسسة التفكير والنماء للاستشارات الإدارية (TND.SA)</h3>
          <p className="text-stone-300 text-xs font-light max-w-xl leading-relaxed">
            بيت خبرة وطني متخصص في الاستشارات الإدارية، حوكمة المشاريع التنموية، ودراسات الأثر الاقتصادي والاجتماعي.
          </p>
        </div>

        <a
          href="https://tnd.sa"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent hover:bg-accent/90 text-primary font-black py-3 px-6 rounded-2xl text-xs transition-all shadow-md flex items-center gap-2 flex-shrink-0 cursor-pointer"
        >
          <span>زيارة موقع المؤسسة الرسمية TND.SA ↗</span>
        </a>
      </div>
    </div>
  );
}
