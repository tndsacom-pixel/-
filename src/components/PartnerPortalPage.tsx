import React, { useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Handshake, 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  FileText, 
  Send, 
  ArrowRight, 
  LogIn, 
  CheckCircle2, 
  Users, 
  Coins, 
  BarChart3, 
  Sparkles, 
  HelpCircle,
  ChevronDown
} from 'lucide-react';

interface PartnerPortalPageProps {
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  renderWarathLogo: (sizeClass?: string) => ReactNode;
  renderThinkingLogo: (sizeClass?: string) => ReactNode;
  onChangeTrack?: () => void;
}

export default function PartnerPortalPage({
  onNavigateHome,
  onNavigateLogin,
  renderWarathLogo,
  renderThinkingLogo,
  onChangeTrack
}: PartnerPortalPageProps) {
  const [partnerType, setPartnerType] = useState<'corporate' | 'nonprofit' | 'government' | 'investor'>('corporate');
  const [entityName, setEntityName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [programInterest, setProgramInterest] = useState('كفالة وتمكين الأسر المنتجة');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entityName || !contactName || !contactPhone) {
      alert('يرجى تعبئة الحقول الأساسية لطلب الشراكة.');
      return;
    }
    setSubmitted(true);
  };

  const partnerPrograms = [
    {
      id: 'csr-families',
      title: 'برنامج كفالة وتمكين الأسر المنتجة (CSR)',
      desc: 'تمويل حقائب الإنتاج والتجهيز الصحي وتدريب 10 إلى 100 أسرة منتجة مع قياس الأثر التنموي المباشر.',
      icon: Users,
      badge: 'مسؤولية مجتمعية',
      impact: 'تمكين +85% من الأسر كمنشآت مستدامة'
    },
    {
      id: 'institutional-catering',
      title: 'عقود التوريد والضيافة المؤسسية',
      desc: 'اعتماد منتجات الأسر المنتجة كمورد معتمد لفعاليات، مؤتمرات، وهدايا منطقتكم أو جهتك بأسعار منافسة.',
      icon: Building2,
      badge: 'توريد معتمد',
      impact: 'عقود مستدامة وشراء مباشر'
    },
    {
      id: 'waqf-endowment',
      title: 'صندوق الاستثمار الاجتماعي والوقف التنموي',
      desc: 'المساهمة في المحفظة التمويلية الميسرة لدعم القروض الحسنة بدون كفيل للأسر والشباب الحرفيين.',
      icon: Coins,
      badge: 'تمويل مستدام',
      impact: 'عوائد اجتماعية وتنمية اقتصادية'
    },
    {
      id: 'heritage-sponsorship',
      title: 'رعاية حاضنات ومراكز التدريب التراثي',
      desc: 'تمويل ورش العمل ومطبخ التمكين المركزي بحي التراث لتأهيل الكوادر وتخريج الأجيال الحرفية.',
      icon: Award,
      badge: 'رعاية استراتيجية',
      impact: 'استدامة الهوية الوطنية'
    }
  ];

  const faqs = [
    {
      q: 'كيف يمكن لشركتنا أو جهتنا عقد شراكة مع منصة ورث أجيال؟',
      a: 'يمكن للجهات الحكومية، شركات القطاع الخاص، والمؤسسات الأهلية تقديم طلب شراكة عبر هذه البوابة، ويقوم فريق الاستثمار الاجتماعي بمؤسسة التفكير والنماء بالتواصل معكم لإعداد مذكرة التفاهم وطرح البرامج المناسبة.'
    },
    {
      q: 'هل تحصل الجهة الداعمة على تقارير قياس الأثر الاجتماعي والتنموي؟',
      a: 'نعم! نزوّد كل شريك بتقارير أثر دورية موثقة ببيانات حية تشمل: عدد الأسر الممكنة، نمو الدخل الشهري، الساعات التدريبية، ونسبة التحول المالي المستدام.'
    },
    {
      q: 'هل هناك إمكانية لإطلاق برنامج كفالة خاص باسم الجهة الداعمة؟',
      a: 'بالتأكيد، يمكن تصميم برامج تمكين مخصصة تحمل اسم الشريك (مثل: "مبادرة [اسم الجهة] لتمكين الحرفيين") وتغطية منطقة جغرافية أو نشاط حرفي محدد.'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 dir-rtl" id="portal-partner">
      {/* Header Bar */}
      <header className="bg-primary text-white border-b border-accent/20 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {renderWarathLogo('w-10 h-10 text-lg')}
            {renderThinkingLogo('w-10 h-10 text-[10px]')}
            <div className="text-right hidden sm:block border-r border-accent/20 pr-3 mr-1">
              <h1 className="font-extrabold text-sm leading-tight text-accent">بوابة الشركاء والجهات والداعمين 🤝</h1>
              <p className="text-[10px] text-stone-300">برامج الشراكة الاستراتيجية ورعاية الأثر المجتمعي</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onChangeTrack && (
              <button
                onClick={onChangeTrack}
                className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>تغيير المسار</span>
              </button>
            )}

            <button
              onClick={onNavigateHome}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">الرئيسية</span>
            </button>

            <button
              onClick={onNavigateLogin}
              className="bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-600 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-accent" />
              <span>تسجيل الدخول</span>
            </button>
          </div>
        </div>
      </header>

      {/* Track Banner */}
      <section className="bg-gradient-to-br from-[#0B3A60] via-[#1E3D34] to-stone-900 text-white py-12 md:py-16 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="bg-amber-400/20 text-amber-300 px-4 py-1 rounded-full text-xs font-extrabold border border-amber-400/30 inline-flex items-center gap-1.5">
            <Handshake className="w-4 h-4" /> مسار الاستثمار الاجتماعي والشراكات المؤسسية
          </span>
          <h2 className="text-2xl md:text-4xl font-black leading-tight text-white">
            اصنع أثرًا تنمويًا مستدامًا مع ورث أجيال
          </h2>
          <p className="text-stone-300 text-xs md:text-sm font-light max-w-2xl mx-auto leading-relaxed">
            نمكن الجهات الحكومية والخاصة والمؤسسات غير الربحية من تحويل برامج المسؤولية المجتمعية والاستثمار الاجتماعي إلى فرص حقيقية تمكن الأسر السعودية وتنمي الاقتصاد التراثي.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-2xl font-black text-amber-300">+450</div>
              <div className="text-[11px] text-stone-300 font-medium">أسرة ممكنة تنمويًا</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-2xl font-black text-emerald-400">100%</div>
              <div className="text-[11px] text-stone-300 font-medium">شفافية وتدقيق للأثر</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-2xl font-black text-amber-300">+12</div>
              <div className="text-[11px] text-stone-300 font-medium">شراكة استراتيجية موثقة</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <div className="text-2xl font-black text-emerald-400">2.8 م ر.س</div>
              <div className="text-[11px] text-stone-300 font-medium">عقود تمكين وتوريد مباشر</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Programs Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-primary text-xs font-black bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
              برامج ومسارات الشراكة
            </span>
            <h3 className="font-extrabold text-2xl text-stone-900">
              اختر المسار المناسب لأهداف جهتك
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm max-w-xl mx-auto font-light">
              نصمم حلول الشراكة بما يتوافق مع استراتيجيتكم في المسؤولية المجتمعية والتمكين التنموي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnerPrograms.map((prog) => {
              const Icon = prog.icon;
              return (
                <div 
                  key={prog.id}
                  className="bg-white border border-stone-200 p-6 rounded-2xl shadow-xs space-y-4 hover:border-amber-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full">
                        {prog.badge}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-stone-900 text-lg">{prog.title}</h4>
                    <p className="text-stone-600 text-xs leading-relaxed font-light">{prog.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {prog.impact}
                    </span>
                    <a
                      href="#partner-form"
                      className="text-primary font-bold hover:underline flex items-center gap-1"
                    >
                      طلب شراكة ←
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Partnership Request Form */}
        <div className="bg-white border border-stone-200 p-6 md:p-10 rounded-3xl shadow-sm space-y-6" id="partner-form">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-accent text-xs font-black bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
              الانضمام كشريك
            </span>
            <h3 className="font-black text-2xl text-stone-900">
              طلب عقد شراكة واستثمار اجتماعي
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm font-light">
              قم بتعبئة بيانات جهتك وسيتواصل معكم فريق الاستثمار الاجتماعي بمؤسسة التفكير والنماء
            </p>
          </div>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-4 max-w-lg mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl">
                🎉
              </div>
              <h4 className="font-extrabold text-stone-900 text-lg">تم استلام طلب الشراكة بنجاح!</h4>
              <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                شكرًا لاهتمامكم بالتمكين والاستثمار الاجتماعي. سيتواصل معكم مستشار الشراكات خلال 24 ساعة لاستكمال مذكرة التفاهم.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-all cursor-pointer"
              >
                تقديم طلب آخر
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmitRequest} className="max-w-2xl mx-auto space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">نوع الجهة الشريكة *</label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 font-medium focus:ring-2 focus:ring-primary outline-none"
                  >
                    <option value="corporate">شركة قطاع خاص / منشأة</option>
                    <option value="government">جهة حكومية / شبه حكومية</option>
                    <option value="nonprofit">مؤسسة أهلية / جمعية خيرية</option>
                    <option value="investor">مستثمر اجتماعي / مانح فردي</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">اسم الجهة / الشركة *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: شركة التنمية الوطنية"
                    value={entityName}
                    onChange={(e) => setEntityName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 font-medium focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">اسم ممثل الجهة *</label>
                  <input
                    type="text"
                    required
                    placeholder="الاسم الثلاثي"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 font-medium focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">رقم الجوال للتواصل *</label>
                  <input
                    type="tel"
                    required
                    placeholder="05xxxxxxxx"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 font-medium focus:ring-2 focus:ring-primary outline-none dir-ltr text-right"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">البريد الإلكتروني المهني</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 font-medium focus:ring-2 focus:ring-primary outline-none dir-ltr text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">البرنامج أو مجال الشراكة المستهدف</label>
                <select
                  value={programInterest}
                  onChange={(e) => setProgramInterest(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 font-medium focus:ring-2 focus:ring-primary outline-none"
                >
                  <option value="كفالة وتمكين الأسر المنتجة">برنامج كفالة وتمكين الأسر المنتجة (CSR)</option>
                  <option value="عقود التوريد والضيافة المؤسسية">عقود التوريد والضيافة المؤسسية</option>
                  <option value="صندوق الوقف التنموي">صندوق الاستثمار الاجتماعي والوقف التنموي</option>
                  <option value="رعاية حاضنات التدريب">رعاية حاضنات ومراكز التدريب التراثي</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">تفاصيل الطلب أو التطلعات (اختياري)</label>
                <textarea
                  rows={3}
                  placeholder="اذكر أي تفاصيل إضافية عن حجم الشراكة المتوقع أو الأهداف المرجوة..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-800 font-medium focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-accent font-black py-3.5 px-6 rounded-xl text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>إرسال طلب الشراكة لمؤسسة التفكير والنماء</span>
              </button>
            </form>
          )}
        </div>

        {/* FAQs */}
        <div className="bg-stone-100 border border-stone-200 p-6 md:p-8 rounded-3xl space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-extrabold text-stone-900 text-xl">الأسئلة الشائعة للشركاء والداعمين</h3>
            <p className="text-stone-500 text-xs font-light">إجابات حول آليات عقد الشراكة وتقارير الأثر التنموي</p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-right p-4 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-stone-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-stone-600 text-xs leading-relaxed font-light border-t border-stone-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
