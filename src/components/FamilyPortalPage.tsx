import { useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import ProfitCalculator from './ProfitCalculator';
import { 
  Award, 
  CheckCircle2, 
  HelpCircle, 
  UserPlus, 
  LogIn, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  GraduationCap, 
  DollarSign, 
  Headphones, 
  ChevronDown, 
  ShoppingBag, 
  MapPin, 
  Star, 
  QrCode
} from 'lucide-react';
import { ProducerFamily } from '../types';

interface FamilyPortalPageProps {
  producers: ProducerFamily[];
  onSelectProducer: (producer: ProducerFamily) => void;
  onOpenRegisterModal: () => void;
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  renderWarathLogo: (sizeClass?: string) => ReactNode;
  renderThinkingLogo: (sizeClass?: string) => ReactNode;
  onChangeTrack?: () => void;
}

export default function FamilyPortalPage({
  producers,
  onSelectProducer,
  onOpenRegisterModal,
  onNavigateHome,
  onNavigateLogin,
  renderWarathLogo,
  renderThinkingLogo,
  onChangeTrack
}: FamilyPortalPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'ما هي الشروط الأساسية للانضمام لبرنامج الأسر المنتجة والحرفيين؟',
      a: 'أن تكون الأسرة أو الحرفي من مواطني المملكة أو المقيمين بها، والشغف بالإنتاج التراثي أو الطهي أو الحرف، والالتزام بحضور الدورات التأهيلية واجتياز اختبار التقييم الذكي للجاهزية.'
    },
    {
      q: 'هل توفر المنصة حلول تمويل وإتاحة أدوات بدون كفيل غارم؟',
      a: 'نعم! بالتعاون مع مؤسسة التفكير والنماء TND، نقدم محفظة تمكين مباشرة وحلول تمويلية ميسرة للمشاريع المؤهلة بدون تعقيدات الكفيل التقليدي.'
    },
    {
      q: 'كيف أستفيد من رمز الـ QR الخاص بأسرتي؟',
      a: 'تحصل كل أسرة على رمز QR مستقل ورابط فريد لصفحتها الرقمية. يمكنك طباعته على عبوات المنتجات، المطبوعات، أو الكروت ليمسحه العميل ويتصفح كافة أكلاتك ومنتجاتك مباشرة.'
    },
    {
      q: 'كيف يتم اعتماد المنتجات والأغذية على المنصة؟',
      a: 'يتم تقييم جودة المنتج ونظافة موقع الإنتاج وفق معايير السلامة الغذائية SFDA، وتُمنح الأسرة شارة "أسرة معتمدة وموثوقة ✓" على ملفها العام.'
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 dir-rtl" id="portal-families">
      {/* 1️⃣ Independent Header Bar */}
      <header className="bg-primary text-white border-b border-accent/20 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {renderWarathLogo('w-10 h-10 text-lg')}
            {renderThinkingLogo('w-10 h-10 text-[10px]')}
            <div className="text-right hidden sm:block border-r border-accent/20 pr-3 mr-1">
              <h1 className="font-extrabold text-sm leading-tight text-accent">بوابة الأسر المنتجة والحرفيين</h1>
              <p className="text-[10px] text-stone-300">مبادرة ورث أجيال • تمكين واستدامة</p>
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
              className="bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-600 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-accent" />
              <span>تسجيل الدخول</span>
            </button>

            <button
              onClick={onOpenRegisterModal}
              className="bg-accent hover:bg-amber-400 text-primary font-black px-4 py-1.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>انضمام أسرة جديدة 📝</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary via-primary/95 to-stone-900 text-white py-16 px-4 sm:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 bg-accent/20 text-accent text-xs font-black px-4 py-1.5 rounded-full border border-accent/30">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>منظومة التمكين الاقتصادي الشاملة للأسر والشباب الحرفيين</span>
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
            حول شغفك التراثي والمنزلي إلى <span className="text-accent underline decoration-amber-500 underline-offset-8">مشروع استثماري مستدام</span>
          </h2>

          <p className="text-stone-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            برنامج «ورث أجيال» برعاية مؤسسة التفكير والنماء يوفر لك التدريب التأهيلي، الاعتماد الرسمي، الهوية الرقمية، وربط مأكولاتك ومنتجاتك مباشرة مع آلاف المعتمرين والزوار.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenRegisterModal}
              className="bg-accent hover:bg-amber-400 text-primary font-black px-8 py-3.5 rounded-2xl text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              <span>سجّل كأُسرة منتجة الآن (مجاناً) 📝</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">

        {/* 1. Why Join? Benefits Section */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-black text-stone-900">لماذا تنضم الأسرة لبرنامج ورث أجيال؟ 🌟</h3>
            <p className="text-xs sm:text-sm text-stone-600">مزايانا المخصصة لدعم وتمكين استدامة مشاريع الأسر المنتجة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-stone-900 text-base">صفحة رقمية ورمز QR فريد</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                لكل أسرة صفحة مستقلة متكاملة تعرض القصة والاعتمادات والمنتجات، مع باركود QR قابل للطباعة على التغليف والكروت.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-stone-900 text-base">الربط بمبيعات المعتمرين والزوار</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                تشارك الأسرة في باقات الجود المكي ووجبات ضيوف الرحمن مع خدمة توصيل للفنادق والمنازل.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-stone-900 text-base">التأهيل وحقيبة التمكين</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                دورات تدريبية متخصصة في السلامة الغذائية، التسعير الذكي، والتسويق الرقمي مع حلول تمويل تمكينية بدون كفيل.
              </p>
            </div>
          </div>
        </section>

        {/* 📊 حاسبة الأرباح التقديرية */}
        <section>
          <ProfitCalculator />
        </section>

        {/* 2. Registration Steps & Accreditation Journey */}
        <section className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-accent text-xs font-bold uppercase tracking-wider">رحلة الاعتماد والاعتماد</span>
            <h3 className="text-2xl sm:text-3xl font-black">خطوات التسجيل والاعتماد للأسرة المنتجة 🚀</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-stone-800/80 border border-stone-700 p-6 rounded-2xl space-y-3 relative">
              <span className="text-3xl font-black text-accent font-mono">01</span>
              <h4 className="font-bold text-sm text-stone-100">تعبئة نموذج التسجيل</h4>
              <p className="text-xs text-stone-400">إدخال اسم الأسرة، البيانات الأساسية، ونوع النشاط والحرفة.</p>
            </div>

            <div className="bg-stone-800/80 border border-stone-700 p-6 rounded-2xl space-y-3 relative">
              <span className="text-3xl font-black text-accent font-mono">02</span>
              <h4 className="font-bold text-sm text-stone-100">التقييم الذكي للجاهزية</h4>
              <p className="text-xs text-stone-400">تحليل معايير الجودة والمهارات عبر محرك التقييم التفاعلي.</p>
            </div>

            <div className="bg-stone-800/80 border border-stone-700 p-6 rounded-2xl space-y-3 relative">
              <span className="text-3xl font-black text-accent font-mono">03</span>
              <h4 className="font-bold text-sm text-stone-100">التأهيل والدورة التدريبية</h4>
              <p className="text-xs text-stone-400">حضور مسارات التعليم الرقمي للحصول على شهادات السلامة.</p>
            </div>

            <div className="bg-stone-800/80 border border-stone-700 p-6 rounded-2xl space-y-3 relative">
              <span className="text-3xl font-black text-accent font-mono">04</span>
              <h4 className="font-bold text-sm text-stone-100">اعتماد المتجر والبيع</h4>
              <p className="text-xs text-stone-400">تفعيل الملف الرقمي ورمز الـ QR وبدء استقبال الطلبات والأرباح.</p>
            </div>
          </div>
        </section>

        {/* 3. Directory of Active Approved Families */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <h3 className="text-xl font-black text-stone-900">الأسر المنتجة والحرفية المعتمدة حالياً 👩‍🍳🧵</h3>
              <p className="text-xs text-stone-500">اضغط على اسم الأسرة للتعرف على قصتها ومنتجاتها أو طباعة باركود الـ QR</p>
            </div>
            <button
              onClick={onOpenRegisterModal}
              className="bg-primary text-accent text-xs font-black px-4 py-2 rounded-xl hover:bg-primary/95 transition-all cursor-pointer"
            >
              + سجل أسرتك لتظهر هنا
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {producers.map((producer) => (
              <div
                key={producer.id}
                onClick={() => onSelectProducer(producer)}
                className="bg-white border border-stone-200 rounded-3xl p-5 hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer space-y-4 group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={producer.logoUrl}
                    alt={producer.brandName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/20 bg-stone-100"
                  />
                  <div className="text-right flex-1 min-w-0">
                    <h4 className="font-black text-stone-900 text-sm group-hover:text-primary transition-colors truncate">
                      {producer.brandName}
                    </h4>
                    <p className="text-xs text-stone-500 truncate mt-0.5">{producer.specialty}</p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" />
                        {producer.city}
                      </span>
                      <span className="text-amber-600 font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {producer.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-100">
                  {producer.description}
                </p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-medium">المنتجات: {producer.products.length} أصناف</span>
                  <span className="text-primary font-black group-hover:underline flex items-center gap-1">
                    <span>زيارة الملف والباركود</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. FAQ Section */}
        <section className="bg-white border border-stone-200 rounded-3xl p-8 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black text-stone-900">الأسئلة الشائعة للأسر والحرفيين ❓</h3>
            <p className="text-xs text-stone-500">إجابات عن التمكين والاعتماد والتمويل الرقمي</p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-stone-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full text-right p-4 font-bold text-xs sm:text-sm text-stone-800 bg-stone-50 hover:bg-stone-100 flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaqIndex === idx && (
                  <div className="p-4 text-xs text-stone-600 leading-relaxed bg-white border-t border-stone-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
