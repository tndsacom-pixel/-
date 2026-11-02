import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Building2, 
  ArrowRight, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Target, 
  Compass, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Printer, 
  Download, 
  Calendar, 
  Layers, 
  PieChart, 
  Briefcase, 
  Check, 
  AlertCircle, 
  Share2, 
  Sparkle,
  BadgePercent,
  Calculator,
  Eye,
  HeartHandshake
} from 'lucide-react';
import { RiskManagementSection } from './RiskManagementSection';
import TechnicalAndFinancialStudySection from './TechnicalAndFinancialStudySection';

interface FeasibilityStudyPageProps {
  onBackToHome: () => void;
  onOpenSupport?: () => void;
  renderWarathLogo?: (sizeClass?: string) => React.ReactNode;
  renderThinkingLogo?: (sizeClass?: string) => React.ReactNode;
}

export default function FeasibilityStudyPage({ 
  onBackToHome, 
  onOpenSupport, 
  renderWarathLogo, 
  renderThinkingLogo 
}: FeasibilityStudyPageProps) {
  const { isEn } = useLanguage();
  const [activeTab, setActiveTab] = useState<'summary' | 'strategic' | 'market' | 'licenses' | 'technical' | 'financial' | 'simulator' | 'risks'>('summary');
  
  // Interactive Financial Simulator State
  const [pilgrimsDailyCount, setPilgrimsDailyCount] = useState<number>(350); // Daily meals / experiences served
  const [avgOrderValue, setAvgOrderValue] = useState<number>(45); // SAR per meal/experience
  const [familiesCommissionPercent, setFamiliesCommissionPercent] = useState<number>(70); // % payout to productive families
  const [operatingDaysPerYear, setOperatingDaysPerYear] = useState<number>(300); // Working days including seasons
  
  // Calculated financial metrics
  const annualGrossRevenue = pilgrimsDailyCount * avgOrderValue * operatingDaysPerYear;
  const familyPayoutsAnnual = (annualGrossRevenue * familiesCommissionPercent) / 100;
  const platformGrossMargin = annualGrossRevenue - familyPayoutsAnnual;
  const estimatedAnnualFixedCosts = 240000; // Platform, compliance, storage & operations SAR
  const estimatedNetProfit = Math.max(0, platformGrossMargin - estimatedAnnualFixedCosts);
  const netMarginPercent = annualGrossRevenue > 0 ? ((estimatedNetProfit / annualGrossRevenue) * 100).toFixed(1) : '0';
  const breakEvenDailyOrders = Math.ceil(estimatedAnnualFixedCosts / ((avgOrderValue * (100 - familiesCommissionPercent) / 100) * operatingDaysPerYear));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`max-w-7xl mx-auto space-y-8 p-4 sm:p-6 font-sans ${isEn ? 'text-left' : 'text-right'}`} id="standalone-feasibility-page">
      {/* Top Header & Navigation Bar */}
      <div className="flex items-center justify-between bg-white border border-stone-200 p-4 rounded-2xl shadow-xs print:hidden">
        <button
          type="button"
          onClick={onBackToHome}
          className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowRight className={`w-4 h-4 ${isEn ? 'rotate-180' : ''}`} />
          <span>{isEn ? 'Back to Home' : 'العودة إلى الرئيسية'}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="bg-[#174F3E] hover:bg-[#123E31] text-amber-300 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{isEn ? 'Print / Export Feasibility Study' : 'طباعة / تصدير دراسة الجدوى'}</span>
          </button>
        </div>
      </div>

      {/* Official Project Cover / Header Banner */}
      <div className="bg-gradient-to-br from-[#174F3E] via-[#123E31] to-stone-900 text-white p-6 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-amber-500/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        
        <div className="relative z-10 space-y-6">
          {/* Hackathon Win Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-black px-4 py-1.5 rounded-full text-xs shadow-md border border-amber-300">
              <Award className="w-4 h-4 text-stone-950 fill-stone-950" />
              <span>{isEn ? 'Top 10 Winner - Makkah Tourism Hackathon' : 'تتويج ضمن أفضل 10 مشاريع فائزة في هاكاثون السياحة بمكة المكرمة 🏆'}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-white/10 text-stone-200 px-3 py-1.5 rounded-full text-xs border border-white/10 font-medium">
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>{isEn ? 'Date: August 2026' : 'التاريخ: أغسطس 2026م'}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full text-xs border border-emerald-400/30 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEn ? 'Stage: Idea & Initial Foundation' : 'المرحلة: مرحلة الفكرة والتأسيس الأول'}</span>
            </div>
          </div>

          {/* Project Title & Location */}
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {isEn ? 'Integrated Economic Feasibility Study Model' : 'نموذج دراسة جدوى اقتصادية متكاملة'}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-amber-200 text-sm sm:text-base font-bold">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-5 h-5 text-amber-400" />
                <span>{isEn ? 'Project Name: Warath Ajyal for Hospitality' : 'اسم المشروع: ورث أجيال للضيافة'}</span>
              </span>
              <span className="text-stone-400">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>{isEn ? 'Proposed Location: Makkah Al-Mukarramah, Saudi Arabia' : 'الموقع المقترح: مكة المكرمة، المملكة العربية السعودية'}</span>
              </span>
            </div>
          </div>

          <p className="text-stone-200 text-xs sm:text-sm font-light leading-relaxed max-w-4xl border-t border-white/10 pt-4">
            {isEn
              ? 'A Saudi venture aimed at transforming cultural heritage, culinary arts, and crafts into authentic tourism experiences by empowering productive families, chefs, and artisans to deliver Saudi hospitality to pilgrims and visitors in Makkah.'
              : 'مشروع سعودي يهدف إلى تحويل الموروث الثقافي والطهي والحرف اليدوية إلى تجارب سياحية وأصيلة. يعتمد المشروع على تمكين الأسر المنتجة، الطهاة، والحرفيين السعوديين لتقديم الضيافة السعودية كجزء أساسي من الهوية الوطنية وإثراء تجربة زوار وضيوف الرحمن بمكة المكرمة.'}
          </p>
        </div>
      </div>

      {/* Navigation Tabs for Feasibility Sections */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200 print:hidden scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('summary')}
          className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'summary'
              ? 'bg-[#174F3E] text-amber-300 shadow-sm'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{isEn ? '1. Summary' : '1. الملخص التنفيذي'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('strategic')}
          className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'strategic'
              ? 'bg-[#174F3E] text-amber-300 shadow-sm'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>{isEn ? '2. Strategic Scope' : '2. الأهداف والنطاق'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('market')}
          className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'market'
              ? 'bg-[#174F3E] text-amber-300 shadow-sm'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>{isEn ? '3. Market Gap' : '3. دراسة السوق'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('licenses')}
          className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'licenses'
              ? 'bg-[#174F3E] text-amber-300 shadow-sm'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{isEn ? '4. Licenses' : '4. التراخيص والامتثال'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('technical')}
          className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'technical'
              ? 'bg-[#174F3E] text-amber-300 shadow-sm'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Building2 className="w-4 h-4 text-amber-400" />
          <span>{isEn ? '5. Technical & Space Plan (630 m²)' : '5. الدراسة الفنية والتشغيلية (630 م²)'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('financial')}
          className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'financial'
              ? 'bg-[#174F3E] text-amber-300 shadow-sm'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>{isEn ? '6. Financial Feasibility & CapEx/OpEx' : '6. الدراسة والهيكل المالي'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('simulator')}
          className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'simulator'
              ? 'bg-[#174F3E] text-amber-300 shadow-sm'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>{isEn ? '7. Profit Simulator & ROI' : '7. محاكي الأرباح والعائد'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('risks')}
          className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'risks'
              ? 'bg-[#174F3E] text-amber-300 shadow-sm'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{isEn ? '8. Risk Management' : '8. إدارة المخاطر'}</span>
        </button>
      </div>

      {/* SECTION 1: الملخص التنفيذي والعام (Project Summary) */}
      {(activeTab === 'summary' || typeof window !== 'undefined') && (
        <section className={`space-y-6 ${activeTab !== 'summary' ? 'hidden print:block' : ''}`}>
          <div className="bg-white border border-stone-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-black">
                  1
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-stone-900">
                    {isEn ? 'Executive & General Summary (Project Summary)' : 'الملخص التنفيذي والعام (Project Summary)'}
                  </h2>
                  <p className="text-stone-500 text-xs font-light">
                    {isEn ? 'Overview, Vision, Mission, and Key Milestones' : 'نبذة المشروع، الرؤية، الرسالة، وأبرز الإنجازات والأوسمة'}
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                {isEn ? 'August 2026 Edition' : 'إصدار أغسطس 2026'}
              </span>
            </div>

            {/* Quick Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-stone-500 text-[11px] font-bold block">{isEn ? 'Project Name' : 'اسم المشروع'}</span>
                <span className="text-stone-900 font-black text-sm">{isEn ? 'Warath Ajyal for Hospitality' : 'ورث أجيال للضيافة'}</span>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-stone-500 text-[11px] font-bold block">{isEn ? 'Proposed Location' : 'الموقع المقترح'}</span>
                <span className="text-stone-900 font-black text-sm">{isEn ? 'Makkah Al-Mukarramah, KSA' : 'مكة المكرمة، السعودية'}</span>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-stone-500 text-[11px] font-bold block">{isEn ? 'Project Stage' : 'مرحلة المشروع'}</span>
                <span className="text-emerald-800 font-black text-sm">{isEn ? 'Idea & First Foundation' : 'الفكرة والتأسيس الأول'}</span>
              </div>

              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <span className="text-stone-500 text-[11px] font-bold block">{isEn ? 'Target Milestone' : 'الرمز والمنظومة'}</span>
                <span className="text-amber-700 font-black text-sm">{isEn ? 'TND.SA Enabled' : 'تمكين التفكير والنماء'}</span>
              </div>
            </div>

            {/* Project Idea Box */}
            <div className="bg-[#FAF9F6] border border-amber-500/20 p-6 rounded-2xl space-y-3">
              <h3 className="text-stone-900 font-black text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{isEn ? 'Project Idea' : 'فكرة المشروع:'}</span>
              </h3>
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-light">
                {isEn
                  ? 'A Saudi project aimed at transforming cultural heritage, traditional culinary arts, and handicrafts into authentic tourism experiences. The project relies on empowering freelance women entrepreneurs, chefs, and Saudi artisans to offer Saudi hospitality as a fundamental pillar of national identity and enrich the experience of visitors and pilgrims in Makkah Al-Mukarramah.'
                  : 'مشروع سعودي يهدف إلى تحويل الموروث الثقافي والطهي والحرف اليدوية إلى تجارب سياحية وأصيلة. يعتمد المشروع على تمكين رائدات العمل الحر، الطهاة، والحرفيين السعوديين لتقديم الضيافة السعودية كجزء أساسي من الهوية الوطنية وإثراء تجربة زوار وضيوف الرحمن بمكة المكرمة.'}
              </p>
            </div>

            {/* Highlights & Hackathon Achievement */}
            <div className="bg-gradient-to-r from-amber-50 to-stone-50 border border-amber-300 p-6 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-black text-sm">
                <Award className="w-5 h-5 text-amber-600" />
                <span>{isEn ? 'Key Achievements & Honors' : 'أبرز الإنجازات والأوسمة:'}</span>
              </div>
              <p className="text-stone-800 text-xs sm:text-sm font-bold leading-relaxed">
                {isEn
                  ? 'Crown achievement as one of the Top 10 Winning Projects in the Makkah Tourism Hackathon.'
                  : 'حصول المشروع على التتويج ضمن أفضل 10 مشاريع فائزة في هاكاثون السياحة بمكة المكرمة.'}
              </p>
            </div>

            {/* Vision & Mission 2-col Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-black text-xl">
                  👁️
                </div>
                <h3 className="font-black text-stone-900 text-base">{isEn ? 'Vision' : 'الرؤية:'}</h3>
                <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                  {isEn
                    ? 'To be the leading destination in empowering freelance women entrepreneurs and artisans, and transforming Saudi heritage into a sustainable economic ecosystem with local and global impact.'
                    : 'أن نكون الوجهة الرائدة في تمكين رائدات العمل الحر والحرفيين، وتحويل التراث السعودي إلى منظومة اقتصادية مستدامة ذات أثر محلي وعالمي.'}
                </p>
              </div>

              <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-xl">
                  🎯
                </div>
                <h3 className="font-black text-stone-900 text-base">{isEn ? 'Mission' : 'الرسالة:'}</h3>
                <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                  {isEn
                    ? 'Creating a sustainable economic and social impact by incubating talents and freelance women entrepreneurs, and reviving national heritage through modern and governed methodologies.'
                    : 'صناعة أثر اقتصادي واجتماعي مستدام من خلال احتضان المواهب ورائدات العمل الحر، وإحياء الموروث الوطني بأساليب عصرية.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: الأهداف الاستراتيجية والنطاق الجغرافي */}
      {(activeTab === 'strategic' || typeof window !== 'undefined') && (
        <section className={`space-y-6 ${activeTab !== 'strategic' ? 'hidden print:block' : ''}`}>
          <div className="bg-white border border-stone-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-black">
                  2
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-stone-900">
                    {isEn ? 'Strategic Goals & Geographic Scope' : 'الأهداف الاستراتيجية والنطاق الجغرافي'}
                  </h2>
                  <p className="text-stone-500 text-xs font-light">
                    {isEn ? 'Objectives and Operations Launch in Makkah Al-Mukarramah' : 'الأهداف الرئيسية للمشروع ونطاق التوسع التدريجي'}
                  </p>
                </div>
              </div>
            </div>

            {/* Strategic Goals List */}
            <div className="space-y-4">
              <h3 className="text-stone-900 font-black text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-700" />
                <span>{isEn ? 'Primary Strategic Goals' : 'الأهداف الرئيسية للمشروع:'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">
                      {isEn ? 'Promoting National Identity' : 'تعزيز الهوية الوطنية'}
                    </h4>
                    <p className="text-stone-600 text-xs font-light mt-1">
                      {isEn ? 'Highlighting authentic Saudi hospitality with modern and creative methods.' : 'إبراز أصالة الضيافة السعودية بأساليب مبتكرة تعكس كرم وثراء المجتمع.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">
                      {isEn ? 'Enriching Pilgrim & Visitor Experience' : 'إثراء تجربة الزائر وضيوف الرحمن'}
                    </h4>
                    <p className="text-stone-600 text-xs font-light mt-1">
                      {isEn ? 'Enriching the spiritual and cultural journey of pilgrims in Makkah.' : 'تقديم وجبات تراثية وتجارب ثقافية مباشرة في فنادق ومواقع مكة المكرمة.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">
                      {isEn ? 'Empowering National Talents & Freelancers' : 'تمكين الكفاءات الوطنية ورائدات العمل الحر'}
                    </h4>
                    <p className="text-stone-600 text-xs font-light mt-1">
                      {isEn ? 'Upskilling freelance women entrepreneurs, chefs, and artisans for tourism and cultural work.' : 'رفع جاهزية رائدات العمل الحر والطهاة للعمل السياحي والثقافي والامتثال لمعايير الجودة.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">
                      {isEn ? 'Unified "Erth Ajyal" Platform' : 'إنشاء منصة موحدة تحت مظلة "إرث أجيال"'}
                    </h4>
                    <p className="text-stone-600 text-xs font-light mt-1">
                      {isEn ? 'Unified platform to govern and manage hospitality and cultural experiences.' : 'إدارة وتنسيق التجارب الضيافية والثقافية والطلبات الفندقية وحوكمة المدفوعات.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3 md:col-span-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    5
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-xs">
                      {isEn ? 'Supporting Saudi Vision 2030 Local Economy' : 'دعم التنمية الاقتصادية المحلية ورؤية 2030'}
                    </h4>
                    <p className="text-stone-600 text-xs font-light mt-1">
                      {isEn ? 'Direct alignment with Saudi Vision 2030 targets in local content, tourism, and social entrepreneurship.' : 'تحقيق مستهدفات رفع مساهمة رائدات العمل الحر والقطاع غير الربحي والقطاع السياحي في الناتج المحلي الإجمالي.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Geographic Scope Box */}
            <div className="bg-[#174F3E]/5 border border-[#174F3E]/20 p-6 rounded-2xl space-y-3">
              <h3 className="text-stone-900 font-black text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#174F3E]" />
                <span>{isEn ? 'Geographic Scope & Phasing' : 'النطاق الجغرافي وخطة التوسع:'}</span>
              </h3>
              <p className="text-stone-700 text-xs sm:text-sm font-light leading-relaxed">
                {isEn
                  ? 'Location: Launching from Makkah Al-Mukarramah in Phase 1 to capitalize on high religious tourism density (Hajj & Umrah pilgrims), with phased expansion to other regions across Saudi Arabia in subsequent phases.'
                  : 'الموقع: الانطلاق من مدينة مكة المكرمة كمرحلة أولى لاستغلال الكثافة السياحية والدينية (حجاج ومعتمرين)، مع قابلية التوسع مستقبلاً لمناطق أخرى داخل المملكة (المدينة المنورة، العلا، الرياض، الدرعية، والمنطقة الشرقية).'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: الدراسة السوقية والفجوة */}
      {(activeTab === 'market' || typeof window !== 'undefined') && (
        <section className={`space-y-6 ${activeTab !== 'market' ? 'hidden print:block' : ''}`}>
          <div className="bg-white border border-stone-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-black">
                  3
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-stone-900">
                    {isEn ? 'Market Analysis & Market Gap' : 'الدراسة السوقية (Market Analysis)'}
                  </h2>
                  <p className="text-stone-500 text-xs font-light">
                    {isEn ? 'Target Segments, Customer Personas, and Market Gaps' : 'الشريحة المستهدفة (Target Market) والفجوة السوقية (Market Gap)'}
                  </p>
                </div>
              </div>
            </div>

            {/* Target Segments */}
            <div className="space-y-4">
              <h3 className="text-stone-900 font-black text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-700" />
                <span>{isEn ? 'Target Market Segments' : 'الشريحة المستهدفة (Target Market):'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
                  <div className="text-2xl">🕋</div>
                  <h4 className="font-bold text-stone-900 text-xs">
                    {isEn ? '1. Pilgrims & Umrah Performers' : '1. الحجاج والمعتمرون وزوار مكة المكرمة'}
                  </h4>
                  <p className="text-stone-600 text-xs font-light leading-relaxed">
                    {isEn ? 'Millions of visitors seeking pure authentic hospitality and approved heritage meals directly delivered to their hotels.' : 'الباحثون عن وجبات التعتيمة الحجازية والضيافة الأصيلة مع التوصيل الدقيق للفنادق.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                  <div className="text-2xl">🧭</div>
                  <h4 className="font-bold text-stone-900 text-xs">
                    {isEn ? '2. Local & International Tourists' : '2. السياح المحليون والدوليون'}
                  </h4>
                  <p className="text-stone-600 text-xs font-light leading-relaxed">
                    {isEn ? 'Passionate explorers interested in cultural immersion, crafts, workshops, and storytelling.' : 'المهتمون بالتجارب الثقافية والجولات التراثية وورش عمل الحرف اليدوية الحية.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-2">
                  <div className="text-2xl">👑</div>
                  <h4 className="font-bold text-stone-900 text-xs">
                    {isEn ? '3. Official Delegations & VIP Sector' : '3. الوفود الرسمية وقطاع كبار الشخصيات (VIP)'}
                  </h4>
                  <p className="text-stone-600 text-xs font-light leading-relaxed">
                    {isEn ? 'High-end tailored hospitality menus, premium gifting boxes, and diplomatic cultural events.' : 'باقات الضيافة التراثية الفاخرة والهدايا التذكارية الحرفية لكبار الضيوف.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
                  <div className="text-2xl">🏢</div>
                  <h4 className="font-bold text-stone-900 text-xs">
                    {isEn ? '4. Government & Corporate Entities' : '4. الجهات الحكومية والشركات الخاصة'}
                  </h4>
                  <p className="text-stone-600 text-xs font-light leading-relaxed">
                    {isEn ? 'Entities organizing heritage catering, social responsibility (CSR) programs, and events.' : 'الراغبة في تنظيم برامج تجارب ضيافية أصيلة ورعاية الأثر المجتمعي المستدام.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-stone-100 border border-stone-200 space-y-2 sm:col-span-2 lg:col-span-2">
                  <div className="text-2xl">👩‍🍳</div>
                  <h4 className="font-bold text-stone-900 text-xs">
                    {isEn ? '5. Freelance Women Entrepreneurs, Artisans & Chefs' : '5. رائدات العمل الحر والحرفيون والطهاة'}
                  </h4>
                  <p className="text-stone-600 text-xs font-light leading-relaxed">
                    {isEn ? 'Supply partners participating as trained and certified producers earning sustainable income through the platform.' : 'كمشاركين وشركاء تشغيل رئيسيين يستفيدون من سلاسل الإمداد المضمونة والتسويق المؤسسي.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Market Gap Section */}
            <div className="border-t border-stone-200 pt-6 space-y-4">
              <h3 className="text-stone-900 font-black text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>{isEn ? 'Identified Market Gap (Market Gap)' : 'الفجوة السوقية (Market Gap):'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
                  <span className="text-rose-700 font-bold text-xs block">{isEn ? 'Gap 1: Fragmentation' : '١. تشتت الجهود وغياب المظلة'}</span>
                  <p className="text-stone-700 text-xs font-light leading-relaxed">
                    {isEn ? 'Lack of a unified, trusted entity or platform offering an integrated and verified Saudi cultural hospitality experience.' : 'عدم وجود جهة أو منصة موحدة تقدم تجربة ضيافية وثقافية سعودية متكاملة وموثوقة للفنادق والزوار.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
                  <span className="text-rose-700 font-bold text-xs block">{isEn ? 'Gap 2: Supply Disconnect' : '٢. تشتت جهود رائدات العمل الحر'}</span>
                  <p className="text-stone-700 text-xs font-light leading-relaxed">
                    {isEn ? 'Scattered individual efforts of heritage providers and freelance women entrepreneurs lacking marketing and commercial scale.' : 'تشتت جهود مقدمي الخدمات التراثية والحرفية وصعوبة وصولهم للطلبات المؤسسية والفنادق الكبرى.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <span className="text-emerald-800 font-bold text-xs block">{isEn ? 'The "Warath Ajyal" Solution' : '٣. حوكمة الجودة وضمان الهوية'}</span>
                  <p className="text-stone-700 text-xs font-light leading-relaxed">
                    {isEn ? 'Providing guaranteed service quality, certified product safety, and showcasing authentic national identity.' : 'توفير منصة موحدة تضمن جودة الخدمة، سلامة المنتجات الغذائية، وتبرز الهوية الوطنية بمعايير عالمية.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: التراخيص والامتثال التشغيلي */}
      {(activeTab === 'licenses' || typeof window !== 'undefined') && (
        <section className={`space-y-6 ${activeTab !== 'licenses' ? 'hidden print:block' : ''}`}>
          <div className="bg-white border border-stone-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-black">
                  4
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-stone-900">
                    {isEn ? 'Operational Licenses & Regulatory Compliance' : 'التراخيص المطلوبة لتشغيل المشروع'}
                  </h2>
                  <p className="text-stone-500 text-xs font-light">
                    {isEn ? 'Official Governmental Licensing Roadmap' : 'المتطلبات النظامية والتراخيص الرسمية اللازمة لانطلاق وتشغيل المشروع'}
                  </p>
                </div>
              </div>

              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isEn ? '100% Compliant Plan' : 'خطة امتثال نظامي مكتملة'}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* License 1 */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  📜
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-stone-900 text-sm">{isEn ? 'Commercial Registration (CR)' : 'سجل تجاري'}</h4>
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-full border border-blue-200">
                      {isEn ? 'Ministry of Commerce' : 'وزارة التجارة'}
                    </span>
                  </div>
                  <p className="text-stone-600 text-xs font-light">
                    {isEn ? 'Registration for tourism hospitality, catering, event management, and e-commerce.' : 'قيد النشاط للضيافة السياحية، الإعاشة وتقديم الوجبات، وتنظيم الفعاليات والتجارة الإلكترونية.'}
                  </p>
                </div>
              </div>

              {/* License 2 */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  🏛️
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-stone-900 text-sm">{isEn ? 'Municipal License' : 'رخصة بلدية'}</h4>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      {isEn ? 'Balady Platform' : 'منصة بلدي'}
                    </span>
                  </div>
                  <p className="text-stone-600 text-xs font-light">
                    {isEn ? 'Municipal permit for central prep kitchen, packaging hubs, and hospitality headquarters.' : 'رخصة نشاط تجاري للمقر والمطبخ المركزي ونقاط التجميع والتغليف بمكة المكرمة.'}
                  </p>
                </div>
              </div>

              {/* License 3 */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  🧯
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-stone-900 text-sm">{isEn ? 'Safety Certificate' : 'شهادة سلامة'}</h4>
                    <span className="text-[10px] bg-rose-50 text-rose-700 font-bold px-2 py-0.5 rounded-full border border-rose-200">
                      {isEn ? 'Civil Defense' : 'الدفاع المدني'}
                    </span>
                  </div>
                  <p className="text-stone-600 text-xs font-light">
                    {isEn ? 'Safety and fire prevention compliance for logistics hubs and kitchen facilities.' : 'مطابقة المنشأة لمعايير السلامة والوقاية من الحريق المعتمدة لدى الدفاع المدني.'}
                  </p>
                </div>
              </div>

              {/* License 4 */}
              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  🩺
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-black text-stone-900 text-sm">{isEn ? 'Health Certificates for Workers' : 'شهادات صحية للعاملين'}</h4>
                    <span className="text-[10px] bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                      {isEn ? 'Accredited Medical Centers' : 'المستوصفات والمراكز المعتمدة'}
                    </span>
                  </div>
                  <p className="text-stone-600 text-xs font-light">
                    {isEn ? 'Mandatory health cards & food safety certificates for all participating cooks and handlers.' : 'شهادات صحية سارية المفعول لجميع الطهاة والعاملين في مناولة الأغذية والتوصيل.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5 & 6: الدراسة الفنية والتشغيلية + الدراسة المالية والهيكل المالي */}
      {((activeTab === 'technical' || activeTab === 'financial') || typeof window !== 'undefined') && (
        <div className={`space-y-6 ${activeTab !== 'technical' && activeTab !== 'financial' ? 'hidden print:block' : ''}`}>
          <TechnicalAndFinancialStudySection />
        </div>
      )}

      {/* SECTION 7: النموذج المالي والمحاكي التفاعلي */}
      {(activeTab === 'simulator' || typeof window !== 'undefined') && (
        <section className={`space-y-6 ${activeTab !== 'simulator' ? 'hidden print:block' : ''}`}>
          <div className="bg-white border border-stone-200 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-black">
                  7
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-stone-900">
                    {isEn ? 'Interactive Financial Model & Projections' : '7. النموذج المالي التقديري ومحاكي الأرباح والعائد'}
                  </h2>
                  <p className="text-stone-500 text-xs font-light">
                    {isEn ? 'Simulate annual volume, revenue sharing, and profitability in Makkah' : 'محاكاة ديناميكية لحجم الطلبات، عوائد الأسر، وهامش أرباح المنصة بمكة المكرمة'}
                  </p>
                </div>
              </div>

              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                {isEn ? 'Dynamic Calculator' : 'حاسبة تفاعلية'}
              </span>
            </div>

            {/* Interactive Sliders (hidden on print) */}
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-6 print:hidden">
              <h3 className="text-stone-900 font-black text-sm flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-700" />
                <span>{isEn ? 'Adjust Simulation Parameters' : 'تعديل متغيرات المحاكاة الاقتصادية:'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Param 1: Daily Orders */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-stone-700">
                    <span>{isEn ? 'Daily Orders/Meals' : 'عدد الوجبات/الطلبات اليومية:'}</span>
                    <span className="text-[#174F3E] font-black">{pilgrimsDailyCount} {isEn ? 'orders' : 'طلب'}</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="2000" 
                    step="25"
                    value={pilgrimsDailyCount}
                    onChange={(e) => setPilgrimsDailyCount(Number(e.target.value))}
                    className="w-full accent-[#174F3E] cursor-pointer"
                  />
                  <span className="text-[10px] text-stone-500 block">{isEn ? 'Pilgrims, hotel guests & groups' : 'معتمرون، نزلاء فنادق، ووفود'}</span>
                </div>

                {/* Param 2: Avg Order Value */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-stone-700">
                    <span>{isEn ? 'Avg Value per Order' : 'متوسط قيمة الطلب/الوجبة:'}</span>
                    <span className="text-[#174F3E] font-black">{avgOrderValue} {isEn ? 'SAR' : 'ر.س'}</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="150" 
                    step="5"
                    value={avgOrderValue}
                    onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                    className="w-full accent-[#174F3E] cursor-pointer"
                  />
                  <span className="text-[10px] text-stone-500 block">{isEn ? 'Standard & VIP packages' : 'باقات عادية و VIP'}</span>
                </div>

                {/* Param 3: Productive Families Payout % */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-stone-700">
                    <span>{isEn ? 'Freelancers Payout Share' : 'نسبة تمكين رائدات العمل الحر:'}</span>
                    <span className="text-emerald-700 font-black">{familiesCommissionPercent}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="60" 
                    max="85" 
                    step="5"
                    value={familiesCommissionPercent}
                    onChange={(e) => setFamiliesCommissionPercent(Number(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                  <span className="text-[10px] text-stone-500 block">{isEn ? 'Direct income to cooks/artisans' : 'دخل مباشر للأسر والطهاة'}</span>
                </div>

                {/* Param 4: Operating Days */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-stone-700">
                    <span>{isEn ? 'Operating Days/Year' : 'أيام التشغيل السنوية:'}</span>
                    <span className="text-[#174F3E] font-black">{operatingDaysPerYear} {isEn ? 'days' : 'يوم'}</span>
                  </div>
                  <input 
                    type="range" 
                    min="180" 
                    max="365" 
                    step="10"
                    value={operatingDaysPerYear}
                    onChange={(e) => setOperatingDaysPerYear(Number(e.target.value))}
                    className="w-full accent-[#174F3E] cursor-pointer"
                  />
                  <span className="text-[10px] text-stone-500 block">{isEn ? 'Umrah & Hajj seasons' : 'مواسم العمرة والحج على مدار العام'}</span>
                </div>
              </div>
            </div>

            {/* Simulated Key Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-stone-900 text-white space-y-1">
                <span className="text-stone-400 text-xs block">{isEn ? 'Projected Annual GMV' : 'إجمالي المبيعات السنوية (GMV)'}</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-300">
                  {annualGrossRevenue.toLocaleString()} <span className="text-xs font-bold text-stone-300">ر.س</span>
                </span>
                <span className="text-[10px] text-stone-400 block">{isEn ? 'Total platform transactions' : 'إجمالي حجم التداول بالمنصة'}</span>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-800 text-white space-y-1">
                <span className="text-emerald-200 text-xs block">{isEn ? 'Freelance Entrepreneurs Share' : 'عوائد تمكين رائدات العمل الحر'}</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-200">
                  {familyPayoutsAnnual.toLocaleString()} <span className="text-xs font-bold text-emerald-300">ر.س</span>
                </span>
                <span className="text-[10px] text-emerald-300 block">{isEn ? 'Sustainable local household income' : 'دخل مباشر للأسر والطهاة'}</span>
              </div>

              <div className="p-5 rounded-2xl bg-amber-500 text-stone-950 space-y-1">
                <span className="text-stone-900 font-bold text-xs block">{isEn ? 'Platform Gross Revenue' : 'إجمالي دخل منصة ورث أجيال'}</span>
                <span className="text-2xl sm:text-3xl font-black text-stone-950">
                  {platformGrossMargin.toLocaleString()} <span className="text-xs font-bold text-stone-900">ر.س</span>
                </span>
                <span className="text-[10px] text-stone-900 block">{isEn ? 'Platform service & logistics fees' : 'رسوم المنصة والتشغيل والحوكمة'}</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#174F3E] text-white space-y-1">
                <span className="text-amber-300 text-xs block">{isEn ? 'Estimated Net Profit' : 'صافي الربح التشغيلي التقديري'}</span>
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {estimatedNetProfit.toLocaleString()} <span className="text-xs font-bold text-amber-300">ر.س</span>
                </span>
                <span className="text-[10px] text-stone-300 block">
                  {isEn ? `Net Margin: ${netMarginPercent}%` : `هامش صافي الربح: ${netMarginPercent}% (نقطة التعادل: ${breakEvenDailyOrders} طلب/يوم)`}
                </span>
              </div>
            </div>

            {/* Breakeven & Sustainability Statement */}
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
              <p className="text-emerald-900 text-xs font-medium leading-relaxed">
                {isEn
                  ? `Economic Feasibility Conclusion: The project reaches operational break-even at approximately ${breakEvenDailyOrders} daily orders in Makkah, leveraging high religious tourism density and yielding strong financial sustainability.`
                  : `خلاصة الجدوى الاقتصادية: يحقق المشروع نقطة التعادل التشغيلي عند خدمة حوالي ${breakEvenDailyOrders} طلباً يومياً فقط بمكة المكرمة، مما يجعله نموذجاً عالي الجدوى وقليل المخاطر الرأسمالية بفضل اعتماده على سلاسل إمداد الأسر القائمة.`}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8: إدارة المخاطر واستراتيجيات الحد منها */}
      {(activeTab === 'risks' || typeof window !== 'undefined') && (
        <section className={`space-y-6 ${activeTab !== 'risks' ? 'hidden print:block' : ''}`}>
          <RiskManagementSection />
        </section>
      )}

      {/* Institutional Backing Footer Card */}
      <div className="bg-[#1E3D34] text-white p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg print:border print:border-stone-400">
        <div className="space-y-2 text-right">
          <span className="text-amber-300 text-xs font-bold bg-white/10 px-3 py-1 rounded-full inline-block">
            {isEn ? 'Consulting Partner & Enabler' : 'الشريك الاستشاري والمُمكّن المؤسسي'}
          </span>
          <h3 className="font-black text-lg sm:text-xl text-white">
            {isEn ? 'Thinking and Growth Foundation for Management Consulting (TND.SA)' : 'مؤسسة التفكير والنماء للاستشارات الإدارية (TND.SA)'}
          </h3>
          <p className="text-stone-300 text-xs font-light max-w-2xl leading-relaxed">
            {isEn
              ? 'Providing institutional governance, social impact assessment, and economic feasibility frameworks for Saudi heritage and tourism ventures.'
              : 'بيت خبرة وطني معتمد في إعداد دراسات الجدوى الاقتصادية، قياس الأثر التنموي، وحوكمة المبادرات المتوافقة مع رؤية المملكة 2030.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
          <a
            href="https://tnd.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-400 hover:bg-amber-300 text-stone-950 font-black py-2.5 px-5 rounded-xl text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer print:hidden"
          >
            <span>{isEn ? 'Visit Official TND.SA ↗' : 'زيارة موقع TND.SA الرسمي ↗'}</span>
          </a>
          
          <button
            type="button"
            onClick={handlePrint}
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-4 rounded-xl text-xs border border-white/20 transition-all flex items-center gap-2 cursor-pointer print:hidden"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>{isEn ? 'Print Study' : 'طباعة الوثيقة'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
