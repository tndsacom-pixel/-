import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Sparkles, TrendingUp, Users, CheckCircle, ShieldCheck, Flame, MessageCircleHeart, Trophy, Coins, Compass } from 'lucide-react';
import { ImpactStats, ChallengeItem } from '../types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const salesData = [
  { name: 'يناير', sales: 50 },
  { name: 'فبراير', sales: 100 },
  { name: 'مارس', sales: 150 },
  { name: 'أبريل', sales: 210 },
  { name: 'مايو', sales: 290 },
  { name: 'يونيو', sales: 340 },
  { name: 'يوليو', sales: 380 }
];

const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#121A21]/95 text-stone-100 p-3 rounded-2xl border border-stone-800 shadow-xl text-right font-sans text-xs space-y-1 backdrop-blur-md">
        <p className="font-extrabold text-[#C5A85A]">{label}</p>
        <p className="font-mono text-[11px] text-stone-200">
          المبيعات: <strong className="text-white text-xs">{payload[0].value} ألف ر.س</strong>
        </p>
        <p className="text-[9px] text-[#C5A85A]/80">✨ من باقات المعتمرين والزوار الحرة</p>
      </div>
    );
  }
  return null;
};

interface ImpactScreenProps {
  stats: ImpactStats;
  challenges: ChallengeItem[];
}

export default function ImpactScreen({ stats, challenges }: ImpactScreenProps) {
  const [selectedCase, setSelectedCase] = useState<string>('1');

  const currentCase = challenges.find(c => c.id === selectedCase) || challenges[0];

  return (
    <div className="max-w-5xl mx-auto my-4 bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden" id="impact-screen-card">
      {/* Banner */}
      <div className="bg-primary text-stone-100 p-8 text-center relative overflow-hidden" id="impact-banner">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent opacity-5 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-1.5 bg-accent/20 border border-accent/40 px-4 py-1.5 rounded-full text-accent text-xs font-bold mb-4"
        >
          <Award className="w-4 h-4" />
          <span>الأثر التنموي والاقتصادي الملموس</span>
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-stone-100">مؤشرات قياس الأثر والتمكين المستدام</h2>
        <p className="text-stone-300 max-w-xl mx-auto text-xs md:text-sm font-light mt-2 leading-relaxed">
          نحن في إرث أجيال نقيس نجاحنا بمستوى نضج واستدامة مشاريع أسرنا المنتجة، وحجم الفرص الاقتصادية التي نفتحها لهم في سوق العمل السعودي.
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-12">
        {/* Core Impact Statistics Dashboard Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5" id="stats-dashboard-grid">
          
          <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-2 left-2 text-primary opacity-5">
              <Users className="w-16 h-16" />
            </div>
            <div className="space-y-1">
              <span className="text-stone-400 text-[10px] md:text-xs block font-mono">عدد المستفيدين الكلي</span>
              <span className="text-xl md:text-2xl font-black text-primary font-mono">{stats.totalBeneficiaries.toLocaleString('ar-SA')}</span>
            </div>
            <p className="text-stone-500 text-[10px] mt-2 border-t border-stone-100 pt-1.5 font-light">أسرة منتجة ورائد عمل مسجل</p>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-2 left-2 text-primary opacity-5">
              <CheckCircle className="w-16 h-16" />
            </div>
            <div className="space-y-1">
              <span className="text-stone-400 text-[10px] md:text-xs block font-mono">المشاريع المؤهلة للنمو</span>
              <span className="text-xl md:text-2xl font-black text-primary font-mono">{stats.qualifiedProjects.toLocaleString('ar-SA')}</span>
            </div>
            <p className="text-stone-500 text-[10px] mt-2 border-t border-stone-100 pt-1.5 font-light">أنهت التقييم والتدريب بنجاح</p>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-2 left-2 text-primary opacity-5">
              <Coins className="w-16 h-16" />
            </div>
            <div className="space-y-1">
              <span className="text-stone-400 text-[10px] md:text-xs block font-mono">حجم مبيعات المستفيدين</span>
              <span className="text-xl md:text-2xl font-black text-primary font-mono">+{stats.salesVolume.toLocaleString('ar-SA')} ر.س</span>
            </div>
            <p className="text-stone-500 text-[10px] mt-2 border-t border-stone-100 pt-1.5 font-light">مبيعات تراكمية عبر متجر المنصة</p>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute top-2 left-2 text-primary opacity-5">
              <Trophy className="w-16 h-16" />
            </div>
            <div className="space-y-1">
              <span className="text-stone-400 text-[10px] md:text-xs block font-mono">المشاريع الممكنة اقتصاديًا</span>
              <span className="text-xl md:text-2xl font-black text-emerald-700 font-mono">{stats.empoweredProjects.toLocaleString('ar-SA')}</span>
            </div>
            <p className="text-stone-500 text-[10px] mt-2 border-t border-stone-100 pt-1.5 pt-1.5 font-light">وصلت لمرحلة الكفاية والتمويل المباشر</p>
          </div>

        </div>

        {/* Secondary detailed statistics indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="secondary-stats-grid">
          <div className="bg-stone-50 border border-stone-100 p-4 rounded-xl flex items-center justify-between text-right">
            <div>
              <h5 className="font-bold text-stone-800 text-xs">البرامج التدريبية المكتملة</h5>
              <p className="text-primary font-black text-sm font-mono mt-0.5">{stats.completedCourses.toLocaleString('ar-SA')} برنامج</p>
            </div>
            <span className="text-[10px] text-stone-400 font-light">على مستوى المملكة</span>
          </div>

          <div className="bg-stone-50 border border-stone-100 p-4 rounded-xl flex items-center justify-between text-right">
            <div>
              <h5 className="font-bold text-stone-800 text-xs">فرص التشغيل والوظائف المفتوحة</h5>
              <p className="text-primary font-black text-sm font-mono mt-0.5">+{stats.jobOpportunities.toLocaleString('ar-SA')} فرصة</p>
            </div>
            <span className="text-[10px] text-stone-400 font-light">تنظيم ضيافة وتصنيع</span>
          </div>

          <div className="bg-stone-50 border border-stone-100 p-4 rounded-xl flex items-center justify-between text-right">
            <div>
              <h5 className="font-bold text-stone-800 text-xs">متوسط جاهزية المشاريع للتمويل</h5>
              <p className="text-primary font-black text-sm font-mono mt-0.5">{stats.avgReadiness}%</p>
            </div>
            <span className="text-[10px] text-stone-400 font-light">ارتفاع بـ 40% عن السابق</span>
          </div>
        </div>

        {/* Visual Analytics Charts (Using custom beautiful responsive SVGs for React 19) */}
        <div className="bg-stone-50 border border-stone-200 p-6 rounded-3xl space-y-6" id="charts-dashboard">
          <h4 className="font-bold text-stone-800 text-sm md:text-base flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <span>نمو التمكين والمبيعات للأسر المنتجة (دراسة نصف سنوية)</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* SVG line chart representing cumulative sales */}
            <div className="md:col-span-8 bg-white border border-stone-200 p-4 md:p-6 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between text-xs text-stone-400 mb-4 font-mono">
                <span>نمو المبيعات التراكمية (ألف ريال سعودي)</span>
                <span>النصف الأول لعام 2026</span>
              </div>
              <div className="w-full h-48 md:h-56" style={{ direction: 'ltr' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={salesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSalesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#174F3E" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#174F3E" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F0EC" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#8C8A85', fontSize: 10, fontFamily: 'Cairo' }} 
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fill: '#8C8A85', fontSize: 10 }} 
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value}K`}
                    />
                    <Tooltip content={<CustomChartTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#174F3E" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorSalesGrad)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Side insights */}
            <div className="md:col-span-4 bg-white border border-stone-200 p-5 rounded-2xl shadow-sm h-full flex flex-col justify-between space-y-4">
              <div>
                <h5 className="font-bold text-stone-800 text-xs">قراءة في مؤشرات النجاح</h5>
                <p className="text-stone-500 text-[10px] leading-relaxed font-light mt-1.5">
                  يوضح الرسم البياني النمو المطرد لحجم مبيعات الأسر المشاركة فور ربطهم بمتجر المنصة الذكي وتفعيل باقات التغذية الخاصة بالمعتمرين والزوار.
                </p>
              </div>
              <div className="space-y-2 pt-3 border-t border-stone-100">
                <div className="flex items-center justify-between text-[11px] text-stone-600 font-semibold">
                  <span>نسبة زيادة المبيعات:</span>
                  <span className="text-emerald-700 font-black font-mono">180% ↑</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-600 font-semibold">
                  <span>معدل نمو المستفيدين:</span>
                  <span className="text-emerald-700 font-black font-mono">42% ↑</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-600 font-semibold">
                  <span>معدل الاستدامة:</span>
                  <span className="text-accent font-black font-mono">92%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONCLUDING SCENE (المشهد الختامي) */}
        {/* Transforming the visual challenge cards of the start into success stories */}
        <div className="border-2 border-dashed border-accent/50 bg-stone-50/50 p-6 md:p-8 rounded-3xl space-y-6" id="concluding-scene">
          <div className="text-center space-y-2">
            <span className="text-accent text-2xl font-black block">✨ المشهد الختامي ✨</span>
            <h3 className="font-extrabold text-primary text-lg md:text-xl">تأثير إرث أجيال: تحول التحديات إلى تمكين وازدهار</h3>
            <p className="text-stone-500 text-xs md:text-sm max-w-xl mx-auto font-light leading-relaxed">
              اختر إحدى الحالات الدراسية لترى كيف تحولت التحديات المعقدة والصعوبات التي واجهتهم في البداية إلى بطاقات نجاح وتمكين اقتصادي مستدام.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-2xl mx-auto" id="conclude-tabs">
            {challenges.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedCase(item.id)}
                className={`py-3 px-2 text-xs font-bold rounded-xl border transition-all text-center flex flex-col items-center gap-1 ${
                  selectedCase === item.id
                    ? 'border-primary bg-primary/5 text-primary shadow-xs'
                    : 'border-stone-200 bg-white text-stone-500 hover:border-stone-300'
                }`}
              >
                <span>{item.beneficiaryName}</span>
                <span className="text-[9px] text-accent font-light">{item.domainLabel}</span>
              </button>
            ))}
          </div>

          {/* Dual visual card showing Challenge vs Success transformation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCase}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              id="transformation-cards-showcase"
            >
              {/* Challenge Card */}
              <div className="bg-red-50/20 border border-red-100 p-5 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-red-700 pb-2 border-b border-red-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                  <h4 className="font-bold text-xs md:text-sm">التحديات السابقة (قبل التأهيل):</h4>
                </div>
                <div className="space-y-3">
                  {currentCase.challenges.map((ch, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-stone-700 text-xs leading-relaxed">
                      <span className="font-mono text-[10px] font-bold text-red-500 bg-red-100/60 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{idx + 1}</span>
                      <p>{ch}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Indicators Card */}
              <div className="bg-primary/5 border border-emerald-100 p-5 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 pb-2 border-b border-emerald-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <h4 className="font-bold text-xs md:text-sm">قصة التمكين والنجاح المستدام:</h4>
                </div>
                <div className="space-y-3">
                  {currentCase.successIndicators.map((succ, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={idx}
                      className="flex items-start gap-2.5 text-stone-700 text-xs leading-relaxed"
                    >
                      <span className="text-accent font-black bg-primary w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">✓</span>
                      <p>{succ}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slogan */}
          <div className="text-center pt-8 border-t border-stone-200 space-y-3" id="final-slogan">
            <h3 className="text-xl md:text-2xl font-black text-primary uppercase tracking-wider">
              إرث أجيال… من التأهيل إلى التمكين
            </h3>
            <p className="text-xs text-stone-500 font-light max-w-md mx-auto leading-relaxed">
              معاً نحول طاقة الأسر الإبداعية والطهي والحرف التراثية إلى رافد اقتصادي واعد يحافظ على هويتنا ويصنع مستقبلاً زاهراً للجميع.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
