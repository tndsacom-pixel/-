import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Layers, 
  GraduationCap, 
  ShoppingBag, 
  UtensilsCrossed, 
  Utensils, 
  Users, 
  Briefcase, 
  Package, 
  Camera, 
  HeartHandshake, 
  Monitor, 
  Video, 
  ShieldCheck, 
  CheckCircle2, 
  Coins, 
  DollarSign, 
  Landmark, 
  TrendingUp, 
  Info, 
  Percent, 
  Sparkles,
  PieChart,
  Boxes,
  FileCheck2,
  Receipt,
  PiggyBank
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ProjectStudyData, 
  getProjectStudyData, 
  DEFAULT_PROJECT_STUDY_DATA 
} from '../services/projectStudyService';

interface TechnicalAndFinancialStudySectionProps {
  initialData?: ProjectStudyData;
  className?: string;
}

export const TechnicalAndFinancialStudySection: React.FC<TechnicalAndFinancialStudySectionProps> = ({ 
  initialData, 
  className = '' 
}) => {
  const { isEn } = useLanguage();
  const [data, setData] = useState<ProjectStudyData>(() => initialData || getProjectStudyData());

  useEffect(() => {
    const handleUpdate = () => {
      setData(getProjectStudyData());
    };
    window.addEventListener('warath_project_study_updated', handleUpdate);
    return () => window.removeEventListener('warath_project_study_updated', handleUpdate);
  }, []);

  // Compute calculated total area dynamically
  const calculatedTotalArea = data.spaces.reduce((acc, curr) => acc + (Number(curr.area) || 0), 0);

  // Helper for space icons
  const getSpaceIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-[#174F3E]" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-[#174F3E]" />;
      case 'Utensils':
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5 text-[#174F3E]" />;
      case 'Users': return <Users className="w-5 h-5 text-[#174F3E]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#174F3E]" />;
      case 'Package':
      case 'Boxes': return <Boxes className="w-5 h-5 text-[#174F3E]" />;
      case 'Camera': return <Camera className="w-5 h-5 text-[#174F3E]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-[#174F3E]" />;
      default: return <Building className="w-5 h-5 text-[#174F3E]" />;
    }
  };

  // Helper for equipment category icons
  const getEquipmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor': return <Monitor className="w-6 h-6 text-[#174F3E]" />;
      case 'Video': return <Video className="w-6 h-6 text-amber-800" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-6 h-6 text-[#174F3E]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-stone-800" />;
      default: return <Package className="w-6 h-6 text-[#174F3E]" />;
    }
  };

  return (
    <div className={`space-y-12 ${className}`} dir={isEn ? 'ltr' : 'rtl'} id="technical-financial-study-wrapper">
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 5: الدراسة الفنية والتشغيلية (Technical & Operational Study)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 md:p-10 space-y-8 shadow-xs" id="operational-technical-study-section">
        
        {/* Section Main Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#174F3E]/10 text-[#174F3E] text-xs font-black px-3.5 py-1.5 rounded-full border border-[#174F3E]/20">
              <Layers className="w-4 h-4 text-[#174F3E]" />
              <span>{isEn ? 'Operational & Physical Framework' : 'المحددات المادية والتشغيلية'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#174F3E] tracking-tight">
              {isEn ? '5. Technical & Operational Feasibility Study' : '5. الدراسة الفنية والتشغيلية'}
            </h2>
            <h3 className="text-sm sm:text-base font-bold text-stone-700">
              {isEn ? 'Proposed Space & Facility Allocation Plan' : 'توزيع المساحات والمقرات المقترحة'}
            </h3>
          </div>

          <div className="bg-[#FAF9F6] border border-stone-200/80 rounded-2xl p-4 flex items-center gap-4 flex-shrink-0 self-start md:self-auto">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#174F3E] flex items-center justify-center font-black text-xl border border-emerald-200/50">
              📐
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-stone-500 block">
                {isEn ? 'Total Operational Area' : 'إجمالي المساحة التشغيلية'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#174F3E] font-mono block">
                {calculatedTotalArea} {isEn ? 'm²' : 'م²'}
              </span>
            </div>
          </div>
        </div>

        {/* Introductory Description */}
        <div className="bg-[#FAF9F6] border border-stone-200/70 p-4 sm:p-5 rounded-2xl flex items-start gap-3">
          <Info className="w-5 h-5 text-[#174F3E] flex-shrink-0 mt-0.5" />
          <p className="text-stone-700 text-xs sm:text-sm font-normal leading-relaxed">
            {isEn
              ? `The estimated total operational area for the project is ${calculatedTotalArea} square meters, distributed strategically across dedicated operational, administrative, training, culinary production, and media zones.`
              : `إجمالي المساحة المقدرة للاستغلال التشغيلي هو ${calculatedTotalArea} مترًا مربعًا، موزعة على مجموعة من المساحات التشغيلية والإدارية والتدريبية والإنتاجية والإعلامية.`}
          </p>
        </div>

        {/* Visual Space Allocation Bar / Proportion Meter */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-stone-600">
            <span>{isEn ? 'Space Distribution Architecture (630 m²)' : 'مخطط التوزيع النسبي للمساحات (630 م²)'}</span>
            <span className="text-[#174F3E] font-mono font-bold">100% {isEn ? 'Utilized' : 'مستغل بالكامل'}</span>
          </div>
          <div className="h-4 w-full bg-stone-100 rounded-full overflow-hidden flex shadow-inner border border-stone-200">
            {data.spaces.map((space, idx) => {
              const percent = ((space.area / calculatedTotalArea) * 100).toFixed(1);
              const colors = [
                'bg-[#174F3E]',
                'bg-amber-600',
                'bg-emerald-600',
                'bg-stone-700',
                'bg-emerald-800',
                'bg-amber-700',
                'bg-stone-900',
                'bg-teal-700'
              ];
              return (
                <div
                  key={space.id}
                  style={{ width: `${percent}%` }}
                  className={`${colors[idx % colors.length]} h-full transition-all duration-300 relative group`}
                  title={`${isEn ? space.nameEn : space.nameAr}: ${space.area} m² (${percent}%)`}
                />
              );
            })}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 text-[11px] text-stone-500">
            {data.spaces.map((space) => (
              <span key={space.id} className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#174F3E]" />
                <span className="font-medium text-stone-700">{isEn ? space.nameEn : space.nameAr}:</span>
                <span className="font-bold font-mono text-[#174F3E]">{space.area} {isEn ? 'm²' : 'م²'}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 8 Space Allocation Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.spaces.map((space, index) => (
            <div
              key={space.id}
              id={`space-card-${space.id}`}
              className="bg-[#FAF9F6] border border-stone-200/80 hover:border-[#174F3E]/40 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all duration-200 shadow-2xs hover:shadow-sm group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    {getSpaceIcon(space.iconName)}
                  </div>
                  <span className="text-xs font-mono font-bold text-stone-400">
                    0{index + 1}
                  </span>
                </div>

                <div>
                  <h4 className="font-black text-sm sm:text-base text-[#174F3E] leading-snug">
                    {isEn ? space.nameEn : space.nameAr}
                  </h4>
                  <div className="inline-flex items-center gap-1 mt-1.5 bg-white border border-stone-200/80 px-2.5 py-0.5 rounded-lg text-xs font-bold text-[#174F3E] font-mono shadow-2xs">
                    <span>{isEn ? 'Area:' : 'المساحة:'}</span>
                    <span>{space.area} {isEn ? 'm²' : 'م²'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 border border-stone-200/60 rounded-xl p-3 space-y-1">
                <span className="text-[10px] font-bold text-stone-400 block uppercase tracking-wider">
                  {isEn ? 'Planned Usage' : 'الاستخدام المخصص:'}
                </span>
                <p className="text-stone-600 text-xs font-normal leading-relaxed">
                  {isEn ? space.usageEn : space.usageAr}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Space Allocation Footer Summary Badge */}
        <div className="bg-gradient-to-r from-[#174F3E] to-[#123E31] text-white p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 text-center sm:text-right">
            <Building className="w-6 h-6 text-emerald-300 flex-shrink-0" />
            <div>
              <h4 className="font-black text-sm sm:text-base text-white">
                {isEn ? 'Comprehensive Operational Facility Distribution' : 'تكامل وتجانس المقرات والمساحات التشغيلية'}
              </h4>
              <p className="text-stone-300 text-xs font-light">
                {isEn 
                  ? 'Designed to meet hospitality, safety, and training standards under the unified ecosystem.'
                  : 'مخطط متوازن يجمع بين الإنتاجية، العرض التجاري، والتأهيل المعرفي المستدام.'}
              </p>
            </div>
          </div>

          <div className="bg-white/10 border border-white/20 px-5 py-2.5 rounded-xl text-center flex-shrink-0">
            <span className="text-[11px] text-stone-200 font-bold block">{isEn ? 'Total Built Space' : 'إجمالي المساحة التشغيلية'}</span>
            <span className="text-lg sm:text-xl font-black text-amber-300 font-mono">{calculatedTotalArea} {isEn ? 'm²' : 'م²'}</span>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            Sub-Section: أهم الأصول والمعدات المطلوبة للتأسيس (Assets & Equipment)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <div className="border-t border-stone-200 pt-8 space-y-6" id="assets-and-equipment-subpart">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{isEn ? 'Core Capital Assets' : 'الأصول الرأسمالية والتجهيزات الأساسية'}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#174F3E]">
              {isEn ? 'Key Assets & Equipment Required for Establishment' : 'أهم الأصول والمعدات المطلوبة للتأسيس'}
            </h3>
            <p className="text-stone-600 text-xs font-normal">
              {isEn
                ? 'Categorized into four dedicated functional groups ensuring full culinary and technological readiness.'
                : 'مقسمة إلى أربع فئات تشغيلية رئيسية تضمن الجاهزية التامة للمطبخ والاستوديو والتقنية والسلامة.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.equipmentCategories.map((cat, idx) => (
              <div
                key={cat.id}
                id={`equipment-cat-${cat.id}`}
                className="bg-[#FAF9F6] border border-stone-200/80 rounded-2xl p-5 space-y-4 shadow-2xs hover:border-[#174F3E]/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center shadow-2xs">
                      {getEquipmentIcon(cat.iconName)}
                    </div>
                    <span className="text-[11px] font-mono font-bold text-stone-400">
                      {idx + 1}
                    </span>
                  </div>

                  <h4 className="font-black text-stone-900 text-base">
                    {isEn ? cat.titleEn : cat.titleAr}
                  </h4>
                </div>

                <div className="bg-white rounded-xl p-3.5 border border-stone-200/60 space-y-2 mt-auto">
                  <span className="text-[10px] font-bold text-stone-400 block uppercase">
                    {isEn ? 'Included Assets:' : 'تشمل:'}
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-700">
                    {(isEn ? cat.itemsEn : cat.itemsAr).map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#174F3E] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 6: الدراسة المالية والهيكل المالي (Financial Study & Financial Structure)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 md:p-10 space-y-8 shadow-xs" id="financial-study-and-structure-section">
        
        {/* Section Header */}
        <div className="space-y-2 border-b border-stone-100 pb-6">
          <div className="inline-flex items-center gap-2 bg-[#174F3E]/10 text-[#174F3E] text-xs font-black px-3.5 py-1.5 rounded-full border border-[#174F3E]/20">
            <Coins className="w-4 h-4 text-[#174F3E]" />
            <span>{isEn ? 'Financial Architecture' : 'الهيكلة والنماذج المالية'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#174F3E] tracking-tight">
            {isEn ? '6. Financial Feasibility Study & Financial Structure' : '6. الدراسة المالية والهيكل المالي'}
          </h2>
        </div>

        {/* Official Financial Methodology Note */}
        <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5 sm:p-6 space-y-2 relative overflow-hidden" id="financial-methodology-note-box">
          <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
            <Info className="w-4 h-4 text-amber-800 flex-shrink-0" />
            <span>{isEn ? 'Financial Methodology & Governance Note:' : 'ملاحظة منهجية مالية:'}</span>
          </div>
          <p className="text-amber-950/90 text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line">
            {isEn ? data.financialMethodologyNoteEn : data.financialMethodologyNoteAr}
          </p>
        </div>

        {/* 3 Main Financial Parts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Part 1: تكاليف التأسيس والرأسمالية (CapEx) */}
          <div className="bg-[#FAF9F6] border border-stone-200/80 rounded-2xl p-6 flex flex-col justify-between space-y-5 shadow-2xs hover:border-[#174F3E]/40 transition-all" id="capex-card">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center text-[#174F3E]">
                  <Landmark className="w-6 h-6" />
                </div>
                <span className="bg-emerald-100 text-[#174F3E] text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                  CapEx
                </span>
              </div>

              <div>
                <h3 className="font-black text-base sm:text-lg text-[#174F3E]">
                  {isEn ? data.capEx.titleEn : data.capEx.titleAr}
                </h3>
                <p className="text-stone-600 text-xs font-normal leading-relaxed mt-1">
                  {isEn ? data.capEx.descriptionEn : data.capEx.descriptionAr}
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone-200/60 rounded-xl p-4 space-y-2 mt-auto">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                {isEn ? 'CapEx Components Include:' : 'وتشمل:'}
              </span>
              <ul className="space-y-2 text-xs text-stone-700">
                {(isEn ? data.capEx.itemsEn : data.capEx.itemsAr).map((item, i) => (
                  <li key={i} className="flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#174F3E] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Part 2: التكاليف التشغيلية (OpEx) */}
          <div className="bg-[#FAF9F6] border border-stone-200/80 rounded-2xl p-6 flex flex-col justify-between space-y-5 shadow-2xs hover:border-[#174F3E]/40 transition-all" id="opex-card">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center text-amber-800">
                  <Receipt className="w-6 h-6" />
                </div>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
                  OpEx
                </span>
              </div>

              <div>
                <h3 className="font-black text-base sm:text-lg text-[#174F3E]">
                  {isEn ? data.opEx.titleEn : data.opEx.titleAr}
                </h3>
                <p className="text-stone-600 text-xs font-normal leading-relaxed mt-1">
                  {isEn ? data.opEx.descriptionEn : data.opEx.descriptionAr}
                </p>
              </div>
            </div>

            <div className="bg-white border border-stone-200/60 rounded-xl p-4 space-y-3 mt-auto">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                {isEn ? 'OpEx Categories Include:' : 'وتشمل العناصر التالية:'}
              </span>
              
              <div className="space-y-2.5 text-xs text-stone-700 divide-y divide-stone-100">
                {data.opEx.categories.map((cat) => (
                  <div key={cat.id} className="pt-2 first:pt-0 space-y-1">
                    <div className="flex items-center justify-between font-bold text-stone-900 text-xs">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#174F3E]" />
                        <span>{isEn ? cat.nameEn : cat.nameAr}</span>
                      </span>
                    </div>

                    {cat.detailAr && (
                      <p className="text-stone-600 text-[11px] font-normal leading-relaxed pr-3 pl-3">
                        {isEn ? cat.detailEn : cat.detailAr}
                      </p>
                    )}

                    {cat.itemsAr && cat.itemsAr.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pr-3 pl-3 pt-0.5">
                        {(isEn ? (cat.itemsEn || cat.itemsAr) : cat.itemsAr).map((subItem, idx) => (
                          <span key={idx} className="bg-stone-50 text-stone-600 border border-stone-200 px-2 py-0.5 rounded-md text-[10px]">
                            {subItem}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Maintenance & Depreciation Rates Highlight */}
              <div className="bg-emerald-50/80 border border-emerald-200/70 p-3 rounded-xl space-y-1 text-xs">
                <div className="flex items-center justify-between font-bold text-[#174F3E]">
                  <span>{isEn ? 'Maintenance Benchmark' : 'صيانة المعدات:'}</span>
                  <span className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300/60 font-black">
                    {data.opEx.maintenancePercent}% {isEn ? 'annually' : 'سنويًا'}
                  </span>
                </div>
                <div className="flex items-center justify-between font-bold text-[#174F3E]">
                  <span>{isEn ? 'Depreciation Benchmark' : 'الإهلاك الدائم:'}</span>
                  <span className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300/60 font-black">
                    {data.opEx.depreciationPercent}% {isEn ? 'annually' : 'سنويًا'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Part 3: رأس المال العامل وهيكل التمويل (Working Capital & Funding Structure) */}
          <div className="bg-[#FAF9F6] border border-stone-200/80 rounded-2xl p-6 flex flex-col justify-between space-y-5 shadow-2xs hover:border-[#174F3E]/40 transition-all" id="funding-structure-card">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-white border border-stone-200/80 flex items-center justify-center text-[#174F3E]">
                  <PiggyBank className="w-6 h-6" />
                </div>
                <span className="bg-stone-200 text-stone-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-stone-300">
                  Funding & Capital
                </span>
              </div>

              <div>
                <h3 className="font-black text-base sm:text-lg text-[#174F3E]">
                  {isEn ? data.workingCapitalAndFunding.titleEn : data.workingCapitalAndFunding.titleAr}
                </h3>
              </div>
            </div>

            <div className="space-y-4 mt-auto">
              {/* Working Capital Reserve Block */}
              <div className="bg-white border border-stone-200/60 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#174F3E]" />
                    <span>{isEn ? 'Working Capital Reserve:' : 'رأس المال العامل:'}</span>
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-[#174F3E] font-bold px-2 py-0.5 rounded-full border border-emerald-200 font-mono">
                    {data.workingCapitalAndFunding.workingCapitalMonthsMin} - {data.workingCapitalAndFunding.workingCapitalMonthsMax} {isEn ? 'Months' : 'أشهر'}
                  </span>
                </div>
                <p className="text-stone-600 text-xs font-normal leading-relaxed">
                  {isEn 
                    ? data.workingCapitalAndFunding.workingCapitalDescEn 
                    : data.workingCapitalAndFunding.workingCapitalDescAr}
                </p>
              </div>

              {/* Funding Structure Flexibility Block */}
              <div className="bg-white border border-stone-200/60 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-[#174F3E]" />
                  <span>{isEn ? 'Financing Structure Options:' : 'هيكل التمويل:'}</span>
                </span>
                <p className="text-stone-600 text-xs font-normal leading-relaxed whitespace-pre-line">
                  {isEn 
                    ? data.workingCapitalAndFunding.fundingStructureDescEn 
                    : data.workingCapitalAndFunding.fundingStructureDescAr}
                </p>
              </div>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};

export default TechnicalAndFinancialStudySection;
