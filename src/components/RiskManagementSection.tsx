import React from 'react';
import { 
  TrendingUp, 
  Settings2, 
  CircleDollarSign, 
  Scale, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface RiskManagementSectionProps {
  className?: string;
}

export const RiskManagementSection: React.FC<RiskManagementSectionProps> = ({ className = '' }) => {
  const { isEn } = useLanguage();

  const risksData = [
    {
      id: 'market-risk',
      typeAr: 'مخاطر سوقية',
      typeEn: 'Market Risks',
      icon: TrendingUp,
      iconBg: 'bg-emerald-50 text-[#174F3E]',
      badgeBorder: 'border-emerald-200/70',
      descriptionAr: 'ضعف الإقبال في البداية أو ظهور منافسين.',
      descriptionEn: 'Initial slow adoption or emergence of new market competitors.',
      strategyAr: 'بناء شراكات استراتيجية مبكرة وتنفيذ تسويق موجه مستمر.',
      strategyEn: 'Building early strategic partnerships and executing continuous targeted marketing.'
    },
    {
      id: 'operational-risk',
      typeAr: 'مخاطر تشغيلية',
      typeEn: 'Operational Risks',
      icon: Settings2,
      iconBg: 'bg-amber-50 text-amber-900',
      badgeBorder: 'border-amber-200/70',
      descriptionAr: 'تفاوت جودة المنتجات بين الأسر المنتجة.',
      descriptionEn: 'Variation in product quality across participating productive families.',
      strategyAr: 'وضع معايير جودة موحدة، مع توقيع اتفاقيات والتزامات واضحة.',
      strategyEn: 'Establishing standardized quality benchmarks with binding agreements and clear service commitments.'
    },
    {
      id: 'financial-risk',
      typeAr: 'مخاطر مالية',
      typeEn: 'Financial Risks',
      icon: CircleDollarSign,
      iconBg: 'bg-emerald-50 text-[#174F3E]',
      badgeBorder: 'border-emerald-200/70',
      descriptionAr: 'ارتفاع المصاريف التشغيلية أو تأخر الربحية.',
      descriptionEn: 'Rising operational expenses or delayed path to profitability.',
      strategyAr: 'تنويع مصادر الدخل، التدرج في التوسع، والاحتفاظ باحتياطي مالي.',
      strategyEn: 'Diversifying revenue streams, executing phased expansion, and maintaining dedicated financial reserves.'
    },
    {
      id: 'legal-risk',
      typeAr: 'مخاطر قانونية',
      typeEn: 'Legal & Regulatory Risks',
      icon: Scale,
      iconBg: 'bg-stone-100 text-stone-800',
      badgeBorder: 'border-stone-200/80',
      descriptionAr: 'تغير الاشتراطات الصحية أو البلديات.',
      descriptionEn: 'Shifts in municipal regulations, food safety, or licensing requirements.',
      strategyAr: 'المتابعة المستمرة للأنظمة وتحديث التراخيص والامتثال المبكر.',
      strategyEn: 'Continuous regulatory monitoring, proactive license renewal, and early compliance integration.'
    }
  ];

  return (
    <section 
      id="risk-management-section" 
      className={`bg-[#FAF9F6] border border-stone-200/80 rounded-3xl p-6 sm:p-8 md:p-10 space-y-8 shadow-xs ${className}`}
      dir={isEn ? 'ltr' : 'rtl'}
    >
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#174F3E]/10 text-[#174F3E] text-xs font-black px-4 py-1.5 rounded-full border border-[#174F3E]/20">
          <ShieldCheck className="w-4 h-4 text-[#174F3E]" />
          <span>{isEn ? 'Governance & Operational Resilience' : 'الحوكمة واستدامة الأعمال'}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-[#174F3E] tracking-tight">
          {isEn ? 'Risk Management & Mitigation Strategies' : 'إدارة المخاطر واستراتيجيات الحد منها'}
        </h2>

        <p className="text-stone-600 text-xs sm:text-sm font-normal leading-relaxed">
          {isEn
            ? 'A proactive governance framework ensuring operational stability, quality assurance, and sustainable growth for the Erth Ajyal ecosystem.'
            : 'منهجية حوكمة وقائية واضحة تضمن استقرار العمليات، حماية جودة المنتجات، واستدامة العوائد التنموية لمنظومة «إرث أجيال».'}
        </p>
      </div>

      {/* 4 Responsive Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {risksData.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              id={`risk-card-${item.id}`}
              className="bg-white border border-stone-200/80 hover:border-[#174F3E]/40 rounded-2xl p-6 flex flex-col justify-between space-y-5 transition-all duration-200 shadow-xs hover:shadow-md group"
            >
              {/* Card Header: Icon & Category */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${item.iconBg}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-stone-400 font-mono">
                    0{index + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                    {isEn ? 'Risk Category' : 'نوع الخطر'}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[#174F3E]">
                    {isEn ? item.typeEn : item.typeAr}
                  </h3>
                </div>

                {/* Risk Description Block */}
                <div className="bg-stone-50/80 border border-stone-100 rounded-xl p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-stone-700 text-xs font-bold">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                    <span>{isEn ? 'Risk Description' : 'وصف الخطر:'}</span>
                  </div>
                  <p className="text-stone-600 text-xs font-normal leading-relaxed">
                    {isEn ? item.descriptionEn : item.descriptionAr}
                  </p>
                </div>
              </div>

              {/* Mitigation Strategy Block */}
              <div className="bg-[#174F3E]/5 border border-[#174F3E]/15 rounded-xl p-3.5 space-y-1.5 mt-auto">
                <div className="flex items-center gap-1.5 text-[#174F3E] text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#174F3E] flex-shrink-0" />
                  <span>{isEn ? 'Mitigation Strategy' : 'استراتيجية الحد من الخطر:'}</span>
                </div>
                <p className="text-stone-700 text-xs font-normal leading-relaxed">
                  {isEn ? item.strategyEn : item.strategyAr}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Assurance Banner */}
      <div className="bg-white border border-stone-200/80 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#174F3E] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs space-y-0.5">
            <span className="font-bold text-stone-900 block">
              {isEn ? 'Continuous Compliance & Quality Auditing' : 'متابعة دورية وتدقيق مستمر'}
            </span>
            <span className="text-stone-500 font-light block">
              {isEn
                ? 'All operating models are reviewed quarterly under our governance and advisory protocols.'
                : 'تتم مراجعة مصفوفة المخاطر والامتثال التشغيلي بشكل ربع سنوي لضمان سلامة العمليات ونمو المنظومة.'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="inline-flex items-center gap-1.5 bg-[#174F3E] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-xl shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>{isEn ? '100% Governed' : 'منظومة محوكمة وموثوقة'}</span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default RiskManagementSection;
