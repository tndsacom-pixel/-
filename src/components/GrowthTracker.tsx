import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Compass, Award, HeartHandshake, Zap, HelpCircle, CheckCircle2, AlertCircle, Coins, Building2, DollarSign, Activity, FileText, Check } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { BeneficiaryProfile, Course, Assessment } from '../types';

interface GrowthTrackerProps {
  profile: BeneficiaryProfile;
  courses: Course[];
  assessment: Assessment | null;
}

export default function GrowthTracker({ profile, courses, assessment }: GrowthTrackerProps) {
  // Calculate aggregate progress metrics
  const completedCoursesCount = courses.filter(c => c.completed).length;
  const passedQuizzesCount = courses.filter(c => c.quizPassed).length;

  // States for Suggestions 26-30
  const [targetSavings, setTargetSavings] = useState<number>(10000);
  const [monthlyProfit, setMonthlyProfit] = useState<number>(1500);
  const [exporting, setExporting] = useState<boolean>(false);
  const [milestoneUnlocked, setMilestoneUnlocked] = useState<boolean>(false);
  const [activeChartTab, setActiveChartTab] = useState<'revenue' | 'orders'>('revenue');

  // Calculate progress level towards Empowerment
  const profileCompletedPct = profile.registered ? 25 : 0;
  const evaluationCompletedPct = assessment ? 25 : 0;
  const coursesCompletedPct = courses.length > 0 ? (completedCoursesCount / courses.length) * 40 : 0;
  const quizPct = courses.length > 0 ? (passedQuizzesCount / courses.length) * 10 : 0;
  
  const totalEmpowermentPct = Math.round(profileCompletedPct + evaluationCompletedPct + coursesCompletedPct + quizPct);

  // Dynamic status label
  const getStatusLabel = (pct: number) => {
    if (pct >= 85) return { text: 'مؤهل وجاهز للنمو والتمكين المستدام 🏆', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (pct >= 50) return { text: 'في مرحلة التأهيل والتدريب والتشغيل 🎓', color: 'text-[#C5A85A] bg-amber-50 border-amber-200' };
    return { text: 'في مرحلة بناء الملف والتقييم الذكي المبدئي 📝', color: 'text-stone-600 bg-stone-100 border-stone-200' };
  };

  const statusInfo = getStatusLabel(totalEmpowermentPct);

  // Simulated AI funding/partnership matches based on project type
  const getPartnershipMatches = () => {
    const defaultMatches = [
      {
        provider: 'بنك التنمية الاجتماعية',
        program: 'برنامج نفاذ للعمل الحر والأسر المنتجة',
        type: 'تمويل ميسر وشراكات تدريبية',
        matchRate: '92%',
        desc: 'يقدم تمويلاً متناهي الصغر لمساعدة الأسر المنتجة الحاصلة على وثائق العمل الحر المعتمدة.'
      },
      {
        provider: 'وزارة الموارد البشرية والتنمية الاجتماعية',
        program: 'مبادرة دعم وتمكين الأسر المنتجة',
        type: 'مشاركات معارض وحاضنات أعمال',
        matchRate: '88%',
        desc: 'توفير منافذ بيع مجانية في المولات والفعاليات الوطنية لتشجيع الحرف والطهي التراثي.'
      }
    ];

    if (profile.projectType === 'culinary') {
      return [
        {
          provider: 'هيئة فنون الطهي',
          program: 'شراكة إحياء الأطباق التراثية السعودية',
          type: 'تمثيل تراثي ومنافذ بيع رسمية',
          matchRate: '95%',
          desc: 'ترشيح الشيفات المتميزين لتقديم بوفيهات رسمية في الفعاليات السياحية وإعداد دليل الأكلات التراثية.'
        },
        ...defaultMatches
      ];
    } else if (profile.projectType === 'hospitality') {
      return [
        {
          provider: 'الهيئة السعودية للسياحة (روح السعودية)',
          program: 'مقدمي تجارب الضيافة والقهوة السعودية الأصيلة',
          type: 'تسويق سياحي للوفود الدولية',
          matchRate: '94%',
          desc: 'ربط مجالس ومقدمات الضيافة التراثية بالمنظمين والشركات السياحية لخدمة الوفود الزائرة للمملكة.'
        },
        ...defaultMatches
      ];
    } else if (profile.projectType === 'crafts') {
      return [
        {
          provider: 'الجمعية السعودية للمحافظة على التراث (نحن تراثنا)',
          program: 'دعم وتمكين حرفيي السدو والأعمال التراثية',
          type: 'شراء منتجات جماعي وهدايا بروتوكولية',
          matchRate: '97%',
          desc: 'شراء التذكارات والمصنوعات اليدوية الفاخرة لتقديمها كإهداءات رسمية وتذكارية لضيوف المملكة.'
        },
        ...defaultMatches
      ];
    } else {
      return [
        {
          provider: 'برنامج كفالة (تمويل المنشآت الصغيرة والمتوسطة)',
          program: 'كفالة تمويل الأسر والحرف الكبيرة',
          type: 'ضمانات تمويلية لرفع الطاقة الإنتاجية',
          matchRate: '91%',
          desc: 'توفير الضمانات اللازمة للبنوك لإقراض أصحاب خلطات البخور والرشوش لشراء أجهزة تعبئة وتغليف آلية.'
        },
        ...defaultMatches
      ];
    }
  };

  const matches = getPartnershipMatches();

  return (
    <div className="max-w-5xl mx-auto my-4 bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden" id="growth-tracker-card">
      {/* Banner */}
      <div className="bg-primary text-stone-100 p-6 flex items-center justify-between border-b border-stone-200" id="growth-banner">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-accent" />
          <div>
            <h2 className="text-xl font-bold">بوابة الجاهزية للنمو والتمكين</h2>
            <p className="text-stone-300 text-xs mt-0.5">متابعة دقيقة لمستوى نضج مشروعك التشغيلي والتسويقي، ومطابقته آلياً بفرص التمويل والشراكات المتاحة.</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Dynamic Empowerment Progress Gauge */}
        <div className="bg-stone-50 border border-stone-200 p-6 md:p-8 rounded-2xl shadow-sm text-center space-y-5" id="empowerment-gauge">
          <div>
            <h3 className="font-extrabold text-stone-800 text-base md:text-lg">مستوى نضوج وتمكين مشروعك</h3>
            <p className="text-stone-500 text-xs mt-1 leading-relaxed">تكامل ملفك المهني، واجتياز التقييم الذكي، وإتمام المسارات الأكاديمية يرفع من درجة جاهزيتك للتمكين المستدام.</p>
          </div>

          {/* Progress Bar with Indicator */}
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-600 font-mono">
              <span>جاهزية المشروع:</span>
              <span className="text-lg text-primary">{totalEmpowermentPct}%</span>
            </div>
            
            <div className="w-full bg-stone-200 rounded-full h-4 overflow-hidden shadow-inner flex p-0.5">
              <div
                className="bg-gradient-to-r from-accent to-primary h-full rounded-full transition-all duration-1000"
                style={{ width: `${totalEmpowermentPct}%` }}
              ></div>
            </div>

            <div className={`mt-3 border px-4 py-2 rounded-xl text-xs font-bold text-center w-max mx-auto shadow-sm ${statusInfo.color}`}>
              {statusInfo.text}
            </div>
          </div>

          {/* Sub milestones list */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4 border-t border-stone-200 text-right">
            <div className="bg-white p-3.5 rounded-xl border border-stone-100 flex items-center gap-2.5">
              <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${profile.registered ? 'text-emerald-600' : 'text-stone-300'}`} />
              <div>
                <h5 className="font-bold text-stone-800 text-xs">الملف الرقمي المهني</h5>
                <p className="text-[10px] text-stone-400 mt-0.5">{profile.registered ? 'مكتمل وموثّق' : 'غير مكتمل'}</p>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-stone-100 flex items-center gap-2.5">
              <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${assessment ? 'text-emerald-600' : 'text-stone-300'}`} />
              <div>
                <h5 className="font-bold text-stone-800 text-xs">التقييم الذكي المبدئي</h5>
                <p className="text-[10px] text-stone-400 mt-0.5">{assessment ? 'مكتمل ومحلل' : 'بانتظار الإجراء'}</p>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-stone-100 flex items-center gap-2.5">
              <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${completedCoursesCount >= 3 ? 'text-emerald-600' : 'text-stone-300'}`} />
              <div>
                <h5 className="font-bold text-stone-800 text-xs">المساقات المكتملة</h5>
                <p className="text-[10px] text-stone-400 mt-0.5">{completedCoursesCount} من 6 مساقات</p>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-stone-100 flex items-center gap-2.5">
              <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${passedQuizzesCount >= 3 ? 'text-emerald-600' : 'text-stone-300'}`} />
              <div>
                <h5 className="font-bold text-stone-800 text-xs">الكويزات المنجزة</h5>
                <p className="text-[10px] text-stone-400 mt-0.5">{passedQuizzesCount} كويزات ناجحة</p>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestions 26-30: Financial Goal Calculator, SIMAH-style Eligibility Gauge, Projections Chart & Milestone Celebrations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4" id="financial-suite">
          
          {/* SIMAH-style Sponsor-Free Loan Eligibility Gauge (Suggestion 27) */}
          <div className="lg:col-span-4 bg-stone-50 border border-stone-200 p-5 rounded-3xl space-y-4 text-right flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full inline-block">حساب جدارة بدون كفيل</span>
              <h4 className="font-extrabold text-stone-800 text-xs md:text-sm">مؤشر الجدارة الائتمانية للمشاريع المنزلية</h4>
              <p className="text-stone-500 text-[10px] font-light leading-relaxed">
                مقياس تشخيصي متكامل يحلل جاهزيتك لطلب التمويل بدون كفيل بناءً على نقاط جدارتك الرقمية.
              </p>
            </div>

            {/* Visual Dial Gauge */}
            {(() => {
              const baseScore = 300;
              const profileBonus = profile.registered ? 150 : 0;
              const evalBonus = assessment ? 150 : 0;
              const courseBonus = completedCoursesCount >= 3 ? 150 : 0;
              const productBonus = profile.products.length > 0 ? 100 : 0;
              const score = baseScore + profileBonus + evalBonus + courseBonus + productBonus;
              
              let scoreColor = 'text-rose-600';
              let scoreLabel = 'ضعيف - يتطلب تأهيل';
              if (score >= 700) { scoreColor = 'text-emerald-600'; scoreLabel = 'ممتاز - مؤهل للتمويل فوراً! 🚀'; }
              else if (score >= 500) { scoreColor = 'text-amber-600'; scoreLabel = 'جيد جداً - جاري رفع الجاهزية'; }

              return (
                <div className="space-y-4 py-2">
                  <div className="relative flex flex-col items-center justify-center">
                    <svg className="w-32 h-20" viewBox="0 0 100 60">
                      {/* Outer track */}
                      <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#e7e5e4" strokeWidth="8" strokeLinecap="round" />
                      {/* Active track */}
                      <path 
                        d="M 10 50 A 40 40 0 0 1 90 50" 
                        fill="none" 
                        stroke="url(#gauge-grad)" 
                        strokeWidth="8" 
                        strokeLinecap="round" 
                        strokeDasharray="125"
                        strokeDashoffset={125 - (125 * (score - 300)) / 550}
                      />
                      <defs>
                        <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ef4444" />
                          <stop offset="50%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute bottom-1 text-center">
                      <span className={`text-2xl font-black font-mono ${scoreColor}`}>{score}</span>
                      <span className="text-[9px] block text-stone-400">من أصل 850</span>
                    </div>
                  </div>

                  <div className="text-center space-y-1">
                    <span className="text-[10px] bg-white px-2.5 py-1 rounded-full border border-stone-200 font-bold block w-max mx-auto">
                      {scoreLabel}
                    </span>
                    <p className="text-stone-400 text-[9px] font-light">تكامل الملف والمساقات والأكاديمية يرفع النقاط تلقائياً.</p>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Savings Goal Calculator (Suggestion 26) */}
          <div className="lg:col-span-4 bg-stone-50 border border-stone-200 p-5 rounded-3xl space-y-3.5 text-right flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full inline-block">تخطيط مالي ذكي</span>
              <h4 className="font-extrabold text-stone-800 text-xs md:text-sm">حاسبة الادخار وتجهيز المعدات الاحترافية</h4>
              <p className="text-stone-500 text-[10px] font-light leading-relaxed">
                اكتبي تكلفة المعدة المستهدفة ومبيعاتك المتوقعة لحساب فترة الوصول الذاتي بدون ديون.
              </p>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="space-y-1">
                  <label className="font-bold text-stone-600 block">تكلفة الآلة المستهدفة (ر.س):</label>
                  <input 
                    type="number" 
                    value={targetSavings} 
                    onChange={(e) => setTargetSavings(Math.max(100, parseInt(e.target.value) || 0))}
                    className="w-full bg-white p-2 rounded-xl border border-stone-200 font-mono font-bold text-center" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-stone-600 block">صافي الربح الشهري المتوقع (ر.س):</label>
                  <input 
                    type="number" 
                    value={monthlyProfit} 
                    onChange={(e) => setMonthlyProfit(Math.max(50, parseInt(e.target.value) || 0))}
                    className="w-full bg-white p-2 rounded-xl border border-stone-200 font-mono font-bold text-center" 
                  />
                </div>
              </div>

              {(() => {
                const months = Math.ceil(targetSavings / monthlyProfit);
                return (
                  <div className="bg-white p-3 rounded-xl border border-stone-100 text-center space-y-2">
                    <p className="text-[11px] font-medium text-stone-700">
                      ستتمكنين من شراء المعدة بالكامل خلال <span className="font-black text-primary font-mono text-xs">{months}</span> أشهر فقط من الادخار الممنهج!
                    </p>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: `${Math.min(100, (monthlyProfit / targetSavings) * 100 * months)}%` }}></div>
                    </div>
                    <span className="text-[9px] text-[#C5A85A] font-serif block">✨ "من وفر سيله، نفع كيله!" - مثل مكي أصيل</span>
                  </div>
                );
              })()}

              <div className="bg-amber-50/80 border border-amber-200/90 p-2.5 rounded-xl text-[10px] text-amber-900 font-medium leading-normal flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>تنبه: النتائج تقديرية وليست ضمانًا للأرباح أو التمويل، وتعتمد على البيانات المدخلة وظروف السوق والتكاليف الفعلية.</span>
              </div>
            </div>
          </div>

          {/* Export Report & Celebration Controls (Suggestions 29 & 30) */}
          <div className="lg:col-span-4 bg-stone-50 border border-stone-200 p-5 rounded-3xl space-y-3.5 text-right flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[9px] bg-[#C5A85A]/10 text-[#C5A85A] font-bold px-2.5 py-0.5 rounded-full inline-block">إنجازات واعتمادات</span>
              <h4 className="font-extrabold text-stone-800 text-xs md:text-sm">تصدير الملف الرقمي والاحتفال بالنجاح</h4>
              <p className="text-stone-500 text-[10px] font-light leading-relaxed">
                صدري تقريراً ائتمانياً معتمداً لتقديمه للجهات الشريكة، أو احتفلي مع أسرتك بتحقيقك للمقاييس!
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setExporting(true);
                  setTimeout(() => {
                    setExporting(false);
                    alert('✓ تم تصدير التقرير الائتماني الرقمي (PDF) بنجاح! تم تضمين درجات الأكاديمية والتقييم الذكي.');
                  }, 2000);
                }}
                disabled={exporting}
                className="w-full bg-primary hover:bg-primary/95 text-accent font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <FileText className="w-4 h-4" />
                <span>{exporting ? 'جاري تصدير الملف الائتماني المعتمد...' : '📄 تحميل وتصدير ملف الجدارة الائتمانية'}</span>
              </button>

              <button
                onClick={() => {
                  setMilestoneUnlocked(true);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>🎉 الاحتفال بالنجاح والتمكين المالي</span>
              </button>
            </div>
          </div>

        </div>

        {/* Suggestion 28: Interactive Month-on-Month Growth Projections Chart */}
        <div className="bg-stone-50 border border-stone-200 p-5 rounded-3xl space-y-4 text-right">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div>
              <span className="text-[10px] bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded-full border border-primary/10 inline-block">التنبؤ المالي للمبيعات</span>
              <h4 className="font-extrabold text-stone-800 text-xs md:text-sm">رسم بياني: توقعات النمو والمبيعات المتضاعفة 6 أشهر</h4>
              <p className="text-stone-500 text-[10px] font-light mt-0.5">مقارنة بصرية بين نموذج مبيعاتك الفردية القديم مقابل نموذج "إرث أجيال" المرتبط بالفنادق.</p>
            </div>

            <div className="flex bg-stone-200 p-1 rounded-xl gap-1 text-[10px] font-bold self-start sm:self-auto">
              <button 
                onClick={() => setActiveChartTab('revenue')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeChartTab === 'revenue' ? 'bg-white text-stone-800 shadow-xs' : 'text-stone-500'}`}
              >
                عوائد المبيعات المتوقعة
              </button>
              <button 
                onClick={() => setActiveChartTab('orders')}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeChartTab === 'orders' ? 'bg-white text-stone-800 shadow-xs' : 'text-stone-500'}`}
              >
                عدد الطلبات المنفذة للوفود
              </button>
            </div>
          </div>

          {/* High Fidelity Custom Interactive Recharts Bar Chart matching the design theme */}
          <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>{activeChartTab === 'revenue' ? 'عوائد المبيعات التقديرية (ر.س)' : 'عدد الطلبات المنفذة للوفود'}</span>
              <span>تطور مبيعات الأسر شهرياً</span>
            </div>

            <div className="h-64 w-full pt-2" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'الشهر 1', targetVal: activeChartTab === 'revenue' ? 1200 : 15, currentVal: activeChartTab === 'revenue' ? 3100 : 40 },
                    { name: 'الشهر 2', targetVal: activeChartTab === 'revenue' ? 1500 : 18, currentVal: activeChartTab === 'revenue' ? 4500 : 58 },
                    { name: 'الشهر 3', targetVal: activeChartTab === 'revenue' ? 1300 : 16, currentVal: activeChartTab === 'revenue' ? 5900 : 75 },
                    { name: 'الشهر 4', targetVal: activeChartTab === 'revenue' ? 1800 : 22, currentVal: activeChartTab === 'revenue' ? 7800 : 99 },
                    { name: 'الشهر 5', targetVal: activeChartTab === 'revenue' ? 1600 : 20, currentVal: activeChartTab === 'revenue' ? 9200 : 120 },
                    { name: 'الشهر 6', targetVal: activeChartTab === 'revenue' ? 2100 : 25, currentVal: activeChartTab === 'revenue' ? 12400 : 160 },
                  ]}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                  barGap={4}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#78716c', fontSize: 10, fontWeight: 700 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#a8a29e', fontSize: 9, fontFamily: 'monospace' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(11, 58, 96, 0.02)' }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const isRevenue = activeChartTab === 'revenue';
                        const oldVal = payload[0].value as number;
                        const newVal = payload[1].value as number;
                        const pctGrowth = Math.round(((newVal - oldVal) / oldVal) * 100);
                        return (
                          <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200/80 shadow-md text-right font-sans">
                            <p className="text-xs font-black text-stone-800 mb-2">{label}</p>
                            <div className="space-y-1.5 text-xs">
                              <div className="flex items-center gap-2 justify-between">
                                <span className="text-stone-500">النموذج التقليدي القديم:</span>
                                <span className="font-bold text-stone-700">
                                  {oldVal.toLocaleString()} {isRevenue ? 'ر.س' : 'طلب'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 justify-between border-t border-stone-100 pt-1.5 mt-1.5">
                                <span className="text-[#174F3E] font-bold">تمكين إرث أجيال:</span>
                                <span className="font-extrabold text-[#174F3E] flex items-center gap-1">
                                  ✨ {newVal.toLocaleString()} {isRevenue ? 'ر.س' : 'طلب'}
                                </span>
                              </div>
                              <div className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md mt-2 text-center">
                                🚀 نسبة زيادة الأثر: +{pctGrowth}%
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="targetVal" fill="#d6d3d1" radius={[4, 4, 0, 0]} barSize={14} />
                  <Bar dataKey="currentVal" fill="#174F3E" radius={[4, 4, 0, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-5 text-[10px] font-bold pt-3 border-t border-stone-100">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#174F3E] rounded"></span>
                <span className="text-stone-700">النموذج الموحد لـ "إرث أجيال" للوفود</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-stone-300 rounded"></span>
                <span className="text-stone-500">البيع العادي الفردي للأسر</span>
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Unlocked Modal Celebration Overlay (Suggestion 30) */}
        <AnimatePresence>
          {milestoneUnlocked && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 text-right"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white p-6 md:p-8 rounded-3xl max-w-lg w-full border-2 border-accent relative space-y-5 shadow-2xl"
              >
                {/* Traditional motif design element */}
                <div className="absolute top-2 left-2 text-2xl">🏆</div>
                <div className="text-center space-y-2">
                  <span className="text-5xl animate-bounce inline-block">🎉</span>
                  <h3 className="font-serif font-extrabold text-primary text-lg md:text-xl">مبارك! تم تحقيق معايير الجودة والاستقلالية المالية</h3>
                  <p className="text-stone-500 text-xs font-light max-w-md mx-auto">
                    لقد تخطيت كافة الاختبارات والمقاييس اللوجستية المطلوبة لدخول سوق الضيافة والتمكين الائتماني بنجاح تام!
                  </p>
                </div>

                <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/50 space-y-3">
                  <h4 className="font-bold text-stone-800 text-xs">مكتسبات التمكين المحققة في ملفك الرقمي:</h4>
                  <ul className="space-y-2 text-stone-600 text-[11px] leading-relaxed">
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>تخطي "شرط الكفيل التقليدي" بالكامل بفضل سمعتك وجدارتك الرقمية الأكاديمية.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>اعتماد فوري للتوصيل بالفنادق لخدمة ضيوف مكة والمشروعات الوطنية الكبرى.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>شعار "مطبخ معتمد وذهبي" يظهر بجوار كافة أطباقك التراثية.</span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={() => setMilestoneUnlocked(false)}
                    className="w-full bg-primary hover:bg-primary/95 text-accent font-bold py-3 px-4 rounded-xl text-xs transition-all shadow-md text-center"
                  >
                    متابعة رحلتي بفخر
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Matched Partnerships & Funding Programs */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-accent" />
            <h4 className="font-bold text-stone-800 text-sm md:text-base">برامج التمويل والشراكات المطابقة بواسطة الذكاء الاصطناعي</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="partnerships-grid">
            {matches.map((match, idx) => (
              <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:border-primary/30 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <span className="text-[10px] text-primary font-extrabold bg-primary/5 px-2 py-0.5 rounded-full">نسبة الملاءمة: {match.matchRate}</span>
                    <Building2 className="w-4 h-4 text-accent" />
                  </div>

                  <div>
                    <h5 className="font-bold text-stone-800 text-xs md:text-sm leading-snug">{match.provider}</h5>
                    <p className="text-primary text-xs font-bold mt-1">{match.program}</p>
                    <p className="text-stone-400 text-[10px] font-mono mt-1">النوع: {match.type}</p>
                  </div>

                  <p className="text-stone-500 text-[10px] leading-relaxed font-light">{match.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex justify-between items-center">
                  <span className="text-[9px] text-stone-400 font-mono">محدثة قبل ساعة</span>
                  
                  <button
                    disabled={totalEmpowermentPct < 60}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                      totalEmpowermentPct >= 60
                        ? 'bg-primary text-accent hover:bg-primary/95'
                        : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    {totalEmpowermentPct >= 60 ? 'طلب تقديم مباشر' : 'يتطلب جاهزية ≥ 60%'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expansion & Growth Opportunities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100" id="expansion-block">
          
          {/* Opportunities Card */}
          <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h4 className="font-bold text-stone-800 text-sm md:text-base flex items-center gap-2 border-b border-stone-100 pb-2">
              <Zap className="w-5 h-5 text-accent" />
              <span>فرص التوسع والنمو الموصى بها</span>
            </h4>
            
            <div className="space-y-3.5 text-xs text-stone-600">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 space-y-1">
                <p className="font-bold text-stone-800">التوريد والربط مع الفنادق الراقية</p>
                <p className="text-[10px] text-stone-500 font-light leading-relaxed">المشروعات التي تتجاوز جاهزيتها 80% يتم ترشيحها لتوريد وجبات ضيافة أو هدايا يدوية لتوضع في غرف ضيوف الفنادق الفاخرة.</p>
              </div>

              <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 space-y-1">
                <p className="font-bold text-stone-800">جناح المعارض الوطنية الموسمي</p>
                <p className="text-[10px] text-stone-500 font-light leading-relaxed">المشاركة المجانية في منافذ المبيعات في معارض المملكة الكبرى كمعرض الحرف اليدوية ومعارض الطهي بتنظيم الهيئات الثقافية.</p>
              </div>
            </div>
          </div>

          {/* Development Areas needing work */}
          <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h4 className="font-bold text-stone-800 text-sm md:text-base flex items-center gap-2 border-b border-stone-100 pb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span>مجالات تحتاج إلى تحسين لفتح فرص التمويل</span>
            </h4>

            <div className="space-y-3">
              {completedCoursesCount < 3 && (
                <div className="flex items-start gap-2.5 bg-red-50/40 p-3 rounded-xl border border-red-50 text-stone-700 text-xs">
                  <span className="text-red-500 font-bold">•</span>
                  <div>
                    <p className="font-bold">استكمال المناهج التدريبية والتأهيل</p>
                    <p className="text-[10px] text-stone-500 mt-0.5 font-light">يجب إنهاء 3 مسارات تدريبية كحد أدنى لزيادة نقاط جاهزية المبيعات والتسويق.</p>
                  </div>
                </div>
              )}

              {profile.products.length === 0 && (
                <div className="flex items-start gap-2.5 bg-red-50/40 p-3 rounded-xl border border-red-50 text-stone-700 text-xs">
                  <span className="text-red-500 font-bold">•</span>
                  <div>
                    <p className="font-bold">إضافة منتجات للكتالوج الرقمي الموحد</p>
                    <p className="text-[10px] text-stone-500 mt-0.5 font-light">يجب إضافة منتجين على الأقل لكي يتمكن المعتمرون والزوار والجهات من تصفح معروضاتك وطلبها.</p>
                  </div>
                </div>
              )}

              {completedCoursesCount >= 3 && profile.products.length > 0 ? (
                <div className="bg-emerald-50/40 p-5 rounded-2xl border border-emerald-100 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h5 className="font-bold text-emerald-800 text-xs">مستوفٍ لكافة الشروط والمقاييس!</h5>
                  <p className="text-stone-500 text-[10px] font-light leading-relaxed">لقد قمت بتأسيس ملف متكامل وإضافة المنتجات، ولا توجد حالياً أي عوائق إدارية أو أكاديمية تعيق تمكين مشروعك.</p>
                </div>
              ) : (
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                  يرجى استكمال بنود التأهيل المطلوبة لتفادي استبعاد ملفك عند فرز المستفيدين من قبل بنوك الشراكة والتمكين المالي.
                </p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
