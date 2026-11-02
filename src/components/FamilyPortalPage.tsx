import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
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
  QrCode,
  Stethoscope,
  Clock,
  Calendar
} from 'lucide-react';
import { ProducerFamily } from '../types';
import { getConsultationRequests, ConsultationRequest } from '../services/consultationService';

interface FamilyPortalPageProps {
  producers: ProducerFamily[];
  onSelectProducer: (producer: ProducerFamily) => void;
  onOpenRegisterModal: () => void;
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  renderWarathLogo: (sizeClass?: string) => ReactNode;
  renderThinkingLogo: (sizeClass?: string) => ReactNode;
  onChangeTrack?: () => void;
  onNavigateToConsulting?: () => void;
}

export default function FamilyPortalPage({
  producers,
  onSelectProducer,
  onOpenRegisterModal,
  onNavigateHome,
  onNavigateLogin,
  renderWarathLogo,
  renderThinkingLogo,
  onChangeTrack,
  onNavigateToConsulting
}: FamilyPortalPageProps) {
  const { t, isEn } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [latestConsultations, setLatestConsultations] = useState<ConsultationRequest[]>(() => getConsultationRequests());

  useEffect(() => {
    const handleUpdate = () => setLatestConsultations(getConsultationRequests());
    window.addEventListener('warath_consultations_updated', handleUpdate);
    return () => window.removeEventListener('warath_consultations_updated', handleUpdate);
  }, []);

  const completedFreeConsultations = latestConsultations.filter(c => c.isFreeSession && c.status === 'completed');

  const handleOpenConsulting = () => {
    if (onNavigateToConsulting) {
      onNavigateToConsulting();
    } else {
      window.dispatchEvent(new CustomEvent('trigger-consulting-page'));
    }
  };

  const faqs = [
    {
      q: 'ما هي الشروط الأساسية للانضمام لبرنامج رائدات ورواد العمل الحر والمشاريع الصغيرة؟',
      a: 'أن يكون المتقدم أو المتقدمة من مواطني المملكة أو المقيمين بها، والشغف بالإنتاج التراثي أو الطهي أو الحرف، والالتزام بحضور الدورات التأهيلية واجتياز اختبار التقييم الذكي للجاهزية.'
    },
    {
      q: 'هل توفر المنصة حلول تمويل وإتاحة أدوات بدون كفيل غارم؟',
      a: 'نعم! بالتعاون مع مؤسسة التفكير والنماء TND، نقدم محفظة تمكين مباشرة وحلول تمويلية ميسرة للمشاريع المؤهلة بدون تعقيدات الكفيل التقليدي.'
    },
    {
      q: 'كيف أستفيد من رمز الـ QR الخاص بمتجري؟',
      a: 'تحصل كل رائدة عمل حر على رمز QR مستقل ورابط فريد لصفحتها الرقمية. يمكنك طباعته على عبوات المنتجات، المطبوعات، أو الكروت ليمسحه العميل ويتصفح كافة أكلاتك ومنتجاتك مباشرة.'
    },
    {
      q: 'كيف يتم اعتماد المنتجات والأغذية على المنصة؟',
      a: 'يتم تقييم جودة المنتج ونظافة موقع الإنتاج وفق معايير السلامة الغذائية SFDA، وتُمنح رائدة العمل الحر شارة "رائدة معتمدة وموثوقة ✓" على ملفها العام.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 w-full max-w-full overflow-x-hidden" id="portal-families">
      {/* 1️⃣ Portal Context Sub-Bar (Under main header) */}
      <div className="bg-[#174F3E] text-white border-b border-[#C8A96B]/20 py-2.5 px-3 sm:px-6 shadow-sm w-full" id="portal-families-bar">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 w-full">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-base shrink-0">👩‍🍳</span>
            <div className={`min-w-0 ${isEn ? 'text-left' : 'text-right'}`}>
              <h1 className="font-extrabold text-xs sm:text-sm text-[#C8A96B] truncate">
                {t('portal.familyTitle') || 'بوابة رائدات العمل الحر والمشاريع التراثية'}
              </h1>
              <p className="text-[10px] text-stone-300 hidden md:block truncate">
                {t('portal.familyDesc') || 'منظومة التمكين والتأهيل وربط رائدات العمل الحر بضيوف الرحمن'}
              </p>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            {onChangeTrack && (
              <button
                onClick={onChangeTrack}
                className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 shrink-0" />
                <span>{t('portal.changeTrack')}</span>
              </button>
            )}

            <button
              onClick={onNavigateHome}
              className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
            >
              <ArrowRight className="w-3 h-3 shrink-0" />
              <span>الرئيسية</span>
            </button>

            <button
              onClick={onOpenRegisterModal}
              className="bg-[#C8A96B] hover:bg-amber-400 text-[#174F3E] font-black px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] transition-all flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <UserPlus className="w-3 h-3 shrink-0" />
              <span>انضمام رائدة عمل حر 📝</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary via-primary/95 to-stone-900 text-white py-10 sm:py-16 px-4 sm:px-8 overflow-hidden w-full">
        <div className="max-w-5xl mx-auto text-center space-y-4 sm:space-y-6 relative z-10 w-full">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 bg-accent/20 text-accent text-[11px] sm:text-xs font-black px-3 sm:px-4 py-1.5 rounded-full border border-accent/30 max-w-full text-center">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent shrink-0" />
            <span className="truncate">منظومة التمكين الاقتصادي الشاملة لرائدات العمل الحر والحرفيين</span>
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight sm:leading-tight break-words">
            حولي شغفك التراثي والمهني إلى <span className="text-accent underline decoration-amber-500 underline-offset-8">مشروع استثماري مستدام</span>
          </h2>

          <p className="text-stone-300 text-xs sm:text-base max-w-3xl mx-auto leading-relaxed">
            برنامج «إرث أجيال» برعاية مؤسسة التفكير والنماء يوفر لك التدريب التأهيلي، الاعتماد الرسمي، الهوية الرقمية، وربط مأكولاتك ومنتجاتك مباشرة مع آلاف المعتمرين والزوار.
          </p>

          <div className="pt-2 sm:pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onOpenRegisterModal}
              className="w-full sm:w-auto bg-accent hover:bg-amber-400 text-primary font-black px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>سجّلي كرائدة عمل حر الآن (مجاناً) 📝</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-12 space-y-10 sm:space-y-16 w-full">

        {/* 1. Why Join? Benefits Section */}
        <section className="space-y-6 sm:space-y-8 w-full">
          <div className="text-center space-y-1.5 sm:space-y-2">
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">لماذا الانضمام لبرنامج إرث أجيال؟ 🌟</h3>
            <p className="text-xs sm:text-sm text-stone-600">مزايانا المخصصة لدعم وتمكين استدامة مشاريع رائدات ورواد العمل الحر والمشاريع الصغيرة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
            <div className="bg-white border border-stone-200 p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all space-y-3 w-full">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm sm:text-base">صفحة رقمية ورمز QR فريد</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                لكل رائدة عمل حر صفحة مستقلة متكاملة تعرض القصة والاعتمادات والمنتجات، مع باركود QR قابل للطباعة على التغليف والكروت.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all space-y-3 w-full">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm sm:text-base">الربط بمبيعات المعتمرين والزوار</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                تشارك رائدات العمل الحر في باقات الجود المكي ووجبات ضيوف الرحمن مع خدمة توصيل للفنادق والمنازل.
              </p>
            </div>

            <div className="bg-white border border-stone-200 p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all space-y-3 w-full">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-stone-900 text-sm sm:text-base">التأهيل وحقيبة التمكين</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                دورات تدريبية متخصصة في السلامة الغذائية، التسعير الذكي، والتسويق الرقمي مع حلول تمويل تمكينية بدون كفيل.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Free 1-Hour Consultation & Advanced Consultation Section */}
        <section className="bg-gradient-to-r from-emerald-950 via-[#174F3E] to-stone-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl border border-accent/30 space-y-6 w-full">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 w-full">
            <div className="space-y-3 max-w-2xl min-w-0">
              <span className="inline-flex items-center gap-1.5 bg-accent/20 text-accent text-[11px] sm:text-xs font-black px-3 py-1 rounded-full border border-accent/30 max-w-full">
                <Sparkles className="w-3.5 h-3.5 text-accent animate-spin shrink-0" />
                <span className="truncate">برعاية مؤسسة التفكير والنماء للاستشارات الإدارية TND</span>
              </span>

              <h3 className="text-lg sm:text-2xl lg:text-3xl font-black leading-tight break-words">
                استشارات التمكين ودراسات الجدوى والطهي التراثي 🩺
              </h3>

              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-light">
                لكل رائدة عمل حر وحرفي <strong className="text-accent font-bold">جلسة استشارية أولى مجانية بالكامل (لمدة 1 ساعة / 60 دقيقة)</strong> مع نخبة من الخبراء لدراسة التكاليف والتسعير والجاهزية، مع إمكانية طلب جلسات استشارية متقدمة لاحقة بقيمة <strong className="text-accent font-bold">1,000 ريال / ساعة</strong>.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="bg-emerald-900/80 border border-emerald-400/40 text-emerald-300 text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-xl font-bold flex items-center gap-1.5">
                  <span>🎁 الأولى مجاناً (1 ساعة)</span>
                </span>
                <span className="bg-amber-950/80 border border-amber-400/40 text-amber-300 text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-xl font-bold flex items-center gap-1.5">
                  <span>💎 اللاحقة: 1,000 ريال / ساعة</span>
                </span>
                <span className="bg-white/10 text-white text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-xl font-medium flex items-center gap-1.5">
                  <span>⏱️ المدة: 60 دقيقة</span>
                </span>
              </div>
            </div>

            {/* Action Box */}
            <div className="bg-white/10 border border-white/20 p-5 rounded-2xl w-full lg:w-80 shrink-0 text-center space-y-3 backdrop-blur-xs">
              <div className="w-12 h-12 rounded-2xl bg-accent text-primary flex items-center justify-center mx-auto text-2xl font-black">
                🩺
              </div>
              <h4 className="font-extrabold text-white text-sm">احجزي جلستك الآن فوراً</h4>
              <p className="text-[11px] text-stone-300">اختاري موعدك وتحدثي مباشرة مع مستشار التمكين المالي أو الجودة</p>
              
              <button
                onClick={handleOpenConsulting}
                className="w-full bg-accent hover:bg-amber-400 text-primary font-black py-3 px-4 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>حجز استشارتك (مجانية / 1000 ر.س)</span>
              </button>
            </div>
          </div>

          {/* If there are completed free consultations */}
          {completedFreeConsultations.length > 0 && (
            <div className="bg-emerald-900/50 border border-emerald-500/30 p-3.5 sm:p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs w-full">
              <div className="flex items-center gap-2 text-emerald-200 font-bold min-w-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="break-words">آخر تحديث للاستشارات: تم إنجاز واعتماد {completedFreeConsultations.length} استشارة مجانية لرائدات العمل الحر بنجاح ✓</span>
              </div>
              <button
                onClick={handleOpenConsulting}
                className="text-accent underline hover:text-white font-bold cursor-pointer shrink-0"
              >
                متابعة حالتك الاستشارية
              </button>
            </div>
          )}
        </section>

        {/* 3. Registration Steps & Accreditation Journey */}
        <section className="bg-stone-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 space-y-6 sm:space-y-8 w-full">
          <div className="text-center space-y-1.5 sm:space-y-2">
            <span className="text-accent text-[11px] sm:text-xs font-bold uppercase tracking-wider">رحلة الاعتماد والتمكين</span>
            <h3 className="text-xl sm:text-3xl font-black">خطوات التسجيل والاعتماد لرائدات العمل الحر 🚀</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
            <div className="bg-stone-800/80 border border-stone-700 p-5 sm:p-6 rounded-2xl space-y-2.5 sm:space-y-3 relative w-full">
              <span className="text-2xl sm:text-3xl font-black text-accent font-mono">01</span>
              <h4 className="font-bold text-xs sm:text-sm text-stone-100">تعبئة نموذج التسجيل</h4>
              <p className="text-[11px] sm:text-xs text-stone-400 leading-relaxed">إدخال اسم المشروع / المتجر، البيانات الأساسية، ونوع النشاط والحرفة.</p>
            </div>

            <div className="bg-stone-800/80 border border-stone-700 p-5 sm:p-6 rounded-2xl space-y-2.5 sm:space-y-3 relative w-full">
              <span className="text-2xl sm:text-3xl font-black text-accent font-mono">02</span>
              <h4 className="font-bold text-xs sm:text-sm text-stone-100">التقييم الذكي للجاهزية</h4>
              <p className="text-[11px] sm:text-xs text-stone-400 leading-relaxed">تحليل معايير الجودة والمهارات عبر محرك التقييم التفاعلي.</p>
            </div>

            <div className="bg-stone-800/80 border border-stone-700 p-5 sm:p-6 rounded-2xl space-y-2.5 sm:space-y-3 relative w-full">
              <span className="text-2xl sm:text-3xl font-black text-accent font-mono">03</span>
              <h4 className="font-bold text-xs sm:text-sm text-stone-100">التأهيل والدورة التدريبية</h4>
              <p className="text-[11px] sm:text-xs text-stone-400 leading-relaxed">حضور مسارات التعليم الرقمي للحصول على شهادات السلامة.</p>
            </div>

            <div className="bg-stone-800/80 border border-stone-700 p-5 sm:p-6 rounded-2xl space-y-2.5 sm:space-y-3 relative w-full">
              <span className="text-2xl sm:text-3xl font-black text-accent font-mono">04</span>
              <h4 className="font-bold text-xs sm:text-sm text-stone-100">اعتماد المتجر والبيع</h4>
              <p className="text-[11px] sm:text-xs text-stone-400 leading-relaxed">تفعيل الملف الرقمي ورمز الـ QR وبدء استقبال الطلبات والأرباح.</p>
            </div>
          </div>
        </section>

        {/* 4. Directory of Active Approved Families */}
        <section className="space-y-6 w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-200 pb-4 w-full">
            <div className="space-y-0.5">
              <h3 className="text-lg sm:text-xl font-black text-stone-900">رائدات ورواد العمل الحر والمشاريع الصغيرة المعتمدين حالياً 👩‍🍳🧵</h3>
              <p className="text-xs text-stone-500">اضغط على الاسم للتعرف على القصة والمنتجات أو طباعة باركود الـ QR</p>
            </div>
            <button
              onClick={onOpenRegisterModal}
              className="bg-primary text-accent text-xs font-black px-4 py-2 rounded-xl hover:bg-primary/95 transition-all cursor-pointer w-full sm:w-auto text-center"
            >
              + سجل مشروعك ليظهر هنا
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            {producers.map((producer) => (
              <div
                key={producer.id}
                onClick={() => onSelectProducer(producer)}
                className="bg-white border border-stone-200 rounded-2xl sm:rounded-3xl p-4 sm:p-5 hover:shadow-xl hover:border-primary/50 transition-all cursor-pointer space-y-3 sm:space-y-4 group w-full"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={producer.logoUrl}
                    alt={producer.brandName}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-primary/20 bg-stone-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-right flex-1 min-w-0">
                    <h4 className="font-black text-stone-900 text-xs sm:text-sm group-hover:text-primary transition-colors truncate">
                      {producer.brandName}
                    </h4>
                    <p className="text-xs text-stone-500 truncate mt-0.5">{producer.specialty}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] sm:text-[11px] text-stone-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary shrink-0" />
                        <span className="truncate">{producer.city}</span>
                      </span>
                      <span className="text-amber-600 font-bold flex items-center gap-1 shrink-0">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {producer.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed bg-stone-50 p-2.5 sm:p-3 rounded-xl border border-stone-100">
                  {producer.description}
                </p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] sm:text-xs">
                  <span className="text-stone-400 font-medium truncate">المنتجات: {producer.products.length} أصناف</span>
                  <span className="text-primary font-black group-hover:underline flex items-center gap-1 shrink-0">
                    <span>زيارة الملف والباركود</span>
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. FAQ Section */}
        <section className="bg-white border border-stone-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6 w-full">
          <div className="text-center space-y-1">
            <h3 className="text-lg sm:text-xl font-black text-stone-900">الأسئلة الشائعة لرائدات العمل الحر والحرفيين ❓</h3>
            <p className="text-xs text-stone-500">إجابات عن التمكين والاعتماد والتمويل الرقمي</p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto w-full">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-stone-200 rounded-2xl overflow-hidden w-full">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full text-right p-3.5 sm:p-4 font-bold text-xs sm:text-sm text-stone-800 bg-stone-50 hover:bg-stone-100 flex items-center justify-between gap-3 cursor-pointer"
                >
                  <span className="break-words">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-500 transition-transform shrink-0 ${openFaqIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaqIndex === idx && (
                  <div className="p-3.5 sm:p-4 text-xs text-stone-600 leading-relaxed bg-white border-t border-stone-200 break-words">
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
