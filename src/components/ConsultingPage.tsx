import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Stethoscope, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  UserCheck, 
  Clock, 
  FileText, 
  Award, 
  Sparkles, 
  PhoneCall, 
  Video, 
  Building2,
  DollarSign,
  AlertCircle,
  CreditCard,
  Search,
  MessageSquare,
  BadgePercent,
  ChevronLeft
} from 'lucide-react';
import { 
  ConsultationRequest, 
  getConsultationRequests, 
  createConsultationRequest, 
  hasUsedFreeConsultation, 
  getConsultationsByPhoneOrUser 
} from '../services/consultationService';

interface ConsultingPageProps {
  onBackToHome: () => void;
  onOpenSupport?: () => void;
  initialPhone?: string;
  initialName?: string;
}

export default function ConsultingPage({ 
  onBackToHome, 
  onOpenSupport,
  initialPhone = '',
  initialName = ''
}: ConsultingPageProps) {
  const [selectedConsultationType, setSelectedConsultationType] = useState<string>('financial');
  const [sessionFormat, setSessionFormat] = useState<'zoom' | 'phone' | 'presence'>('zoom');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('10:00 ص');
  const [clientName, setClientName] = useState<string>(initialName);
  const [clientPhone, setClientPhone] = useState<string>(initialPhone);
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'mada' | 'apple_pay' | 'visa' | 'pay_on_session'>('mada');
  
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingTicket, setBookingTicket] = useState<string>('');
  const [lastCreatedRequest, setLastCreatedRequest] = useState<ConsultationRequest | null>(null);

  // Active view: 'book' or 'my_consultations'
  const [activeTab, setActiveTab] = useState<'book' | 'my_consultations'>('book');
  const [allRequests, setAllRequests] = useState<ConsultationRequest[]>(() => getConsultationRequests());
  const [searchPhone, setSearchPhone] = useState<string>(initialPhone);

  // Sync with global consultation updates
  const refreshRequests = () => {
    setAllRequests(getConsultationRequests());
  };

  useEffect(() => {
    refreshRequests();
    window.addEventListener('warath_consultations_updated', refreshRequests);
    return () => window.removeEventListener('warath_consultations_updated', refreshRequests);
  }, []);

  // Determine if the current phone number has already used the free 1-hour session
  const isFreeEligible = !hasUsedFreeConsultation(clientPhone);

  // Filter consultations for user tracking
  const userConsultations = searchPhone.trim() 
    ? getConsultationsByPhoneOrUser(searchPhone)
    : (clientPhone.trim() ? getConsultationsByPhoneOrUser(clientPhone) : allRequests);

  const getConsultantForType = (type: string) => {
    switch (type) {
      case 'financial':
        return 'د. أحمد السليمان - خبير التمكين المالي ودراسات الجدوى';
      case 'culinary':
        return 'م. سارة البارقي - مستشارة سلامة الغذاء والتغذية وجودة الطهي';
      case 'marketing':
        return 'أ. ماجد الحربي - مستشار التسويق وتطوير الأعمال والاستهداف الفندقي';
      case 'governance':
        return 'أ. عبد الله الحازمي - مستشار الحوكمة واللوائح والتراخيص الرسمية';
      default:
        return 'فريق مستشاري التفكير والنماء TND';
    }
  };

  const getConsultationTypeLabel = (type: string) => {
    switch (type) {
      case 'financial':
        return 'استشارة التمويل والجدوى الاقتصادية والتسعير';
      case 'culinary':
        return 'استشارة جودة واشتراطات الطهي التراثي وسلامة الغذاء';
      case 'marketing':
        return 'استشارة التسويق المتقدم واستهداف الفنادق الكبرى';
      case 'governance':
        return 'استشارات اللوائح والتراخيص الرسمية';
      default:
        return 'استشارة إدارية وتطويرية';
    }
  };

  const getFormatLabel = (fmt: 'zoom' | 'phone' | 'presence') => {
    switch (fmt) {
      case 'zoom':
        return 'عبر زووم (عن بُعد)';
      case 'phone':
        return 'مكالمة هاتفية استشارية';
      case 'presence':
        return 'حضورياً بمقر التفكير والنماء بمكة';
    }
  };

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim() || !bookingDate) {
      alert('الرجاء تعبئة جميع الحقول المطلوبة (الاسم، الجوال، وتاريخ الاستشارة)');
      return;
    }

    const consultant = getConsultantForType(selectedConsultationType);
    const typeLabel = getConsultationTypeLabel(selectedConsultationType);
    const formatLabel = getFormatLabel(sessionFormat);

    const newReq = createConsultationRequest({
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      consultationType: selectedConsultationType as any,
      consultationTypeLabel: typeLabel,
      sessionFormat,
      sessionFormatLabel: formatLabel,
      bookingDate,
      bookingTime,
      paymentStatus: isFreeEligible ? 'free_granted' : (paymentMethod === 'pay_on_session' ? 'pay_on_session' : 'paid'),
      bookingNotes: bookingNotes.trim(),
      consultantName: consultant,
      paymentMethod
    });

    setLastCreatedRequest(newReq);
    setBookingTicket(newReq.id);
    setBookingSuccess(true);
    setSearchPhone(clientPhone.trim());
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 text-right p-4 sm:p-6 font-sans" id="standalone-consulting-page">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between bg-white border border-stone-200 p-4 rounded-2xl shadow-xs">
        <button
          type="button"
          onClick={onBackToHome}
          className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى الرئيسية</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex bg-stone-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('book')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'book' ? 'bg-[#174F3E] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              📅 حجز استشارة جديدة
            </button>
            <button
              onClick={() => setActiveTab('my_consultations')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'my_consultations' ? 'bg-[#174F3E] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              📋 متابعة حالة استشاراتي
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 border-r border-stone-200 pr-3">
            <span className="text-xs font-black text-stone-800">مركز الاستشارات الإدارية والمالية</span>
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#174F3E] via-primary to-emerald-950 text-white p-6 sm:p-10 rounded-3xl relative overflow-hidden shadow-xl border border-accent/30">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-accent text-xs font-black bg-white/10 border border-accent/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" />
            استشارات التمكين المؤسسي برعاية مؤسسة التفكير والنماء TND.SA 🩺
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            استشارات حوكمة الأعمال والتأهيل المالي والطهي التراثي
          </h1>

          <p className="text-stone-200 text-xs sm:text-sm font-light leading-relaxed">
            نساعد الأسر المنتجة والحرفيين في تحويل مشاريعهم المنزلية إلى علامات تجارية مستدامة وموثوقة. 
            احجز <strong className="text-accent font-bold">جلستك الاستشارية الأولى مجاناً لمدة 1 ساعة كاملة</strong>، ويمكنك طلب جلسات استشارية متقدمة لاحقة بـ <strong className="text-accent font-bold">1,000 ريال / ساعة</strong>.
          </p>

          {/* Pricing Highlight Pill */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-emerald-900/60 border border-emerald-400/40 p-3.5 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-lg">
                🎁
              </div>
              <div>
                <h4 className="text-xs font-black text-emerald-300">الاستشارة الأولى للأسر المنتجة</h4>
                <p className="text-[11px] text-stone-200 font-medium">مجانية بالكامل (لمدة 1 ساعة / 60 دقيقة)</p>
              </div>
            </div>

            <div className="bg-amber-950/60 border border-amber-400/40 p-3.5 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-900 flex items-center justify-center font-black text-lg">
                💎
              </div>
              <div>
                <h4 className="text-xs font-black text-amber-300">الاستشارات اللاحقة المتقدمة</h4>
                <p className="text-[11px] text-stone-200 font-medium">1,000 ريال سعودي / ساعة استشارية</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#booking-form"
              onClick={() => setActiveTab('book')}
              className="bg-accent hover:bg-accent/90 text-primary font-black py-3 px-6 rounded-2xl text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>احجز جلستك الآن 📅</span>
            </a>
            <button
              type="button"
              onClick={() => setActiveTab('my_consultations')}
              className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-2xl text-xs transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
            >
              <span>عرض حالة الاستشارات السابقة 🔍</span>
            </button>
            {onOpenSupport && (
              <button
                type="button"
                onClick={onOpenSupport}
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-2xl text-xs transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
              >
                <span>الدعم الفني المباشر 💬</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 1: BOOKING VIEW
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'book' && (
        <div className="space-y-8">
          {/* Consultation Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category 1 */}
            <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-xs space-y-3 hover:border-accent transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-black text-xl">
                📈
              </div>
              <h3 className="font-black text-stone-800 text-sm">استشارات التخطيط والتمويل التمكيني</h3>
              <p className="text-stone-500 text-xs font-light leading-relaxed">
                مراجعة الملاءة المالية والميزانيات، وحساب تكلفة الوجبات، وتحديد قيمة التمويل المستحق بدون فوائد وبدون كفيل.
              </p>
              <div className="pt-2 text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>الاستشارة الأولى: مجانية (ساعة) • اللاحقة: 1000 ر.س</span>
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-xs space-y-3 hover:border-accent transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-xl">
                🍳
              </div>
              <h3 className="font-black text-stone-800 text-sm">استشارات الطهي والجودة والسلامة</h3>
              <p className="text-stone-500 text-xs font-light leading-relaxed">
                تطوير وصفات الأطباق التراثية، رفع معايير سلامة الغذاء، واختيار طرق التغليف الحراري المطابق لمعايير SFDA.
              </p>
              <div className="pt-2 text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>الاستشارة الأولى: مجانية (ساعة) • اللاحقة: 1000 ر.س</span>
              </div>
            </div>

            {/* Category 3 */}
            <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-xs space-y-3 hover:border-accent transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-xl">
                📣
              </div>
              <h3 className="font-black text-stone-800 text-sm">استشارات التسويق وبناء العلامة</h3>
              <p className="text-stone-500 text-xs font-light leading-relaxed">
                استراتيجيات الاستهداف الفندقي، بناء الهوية البصرية، وتسويق المنتجات التراثية والسدو لضيوف الرحمن.
              </p>
              <div className="pt-2 text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>الاستشارة الأولى: مجانية (ساعة) • اللاحقة: 1000 ر.س</span>
              </div>
            </div>
          </div>

          {/* Booking Form Card */}
          <div id="booking-form" className="bg-white border border-stone-200 p-6 sm:p-8 rounded-3xl shadow-md space-y-6">
            <div className="border-b border-stone-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="font-black text-stone-800 text-lg sm:text-xl">حجز جلسة استشارية جديدة 📅</h2>
                <p className="text-stone-500 text-xs font-light mt-1">
                  مدة الجلسة الاستشارية هي <span className="font-bold text-stone-800">ساعة واحدة كاملة (60 دقيقة)</span> مع نخبة من مستشاري التفكير والنماء.
                </p>
              </div>

              {/* Real-time Pricing Status Badge */}
              {clientPhone.trim() && (
                <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
                  isFreeEligible 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}>
                  {isFreeEligible ? (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>استشارة مجانية أولى (0 ريال)</span>
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                      <span>استشارة إضافية (1,000 ريال / ساعة)</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {bookingSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 sm:p-8 rounded-3xl text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-2xl font-bold shadow-md">
                  ✓
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-emerald-900 text-lg">تم تأكيد حجز طلب الاستشارة بنجاح! 🎉</h3>
                  <p className="text-emerald-800 text-xs font-medium">
                    {lastCreatedRequest?.isFreeSession ? (
                      <span className="bg-emerald-100 text-emerald-900 px-2.5 py-1 rounded-full font-bold">
                        🎁 جلستكم الأولى المجانية (لمدة 1 ساعة) - تم اعتماد الحجز بدون أي رسوم
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-bold">
                        💳 جلسة استشارية متقدمة (1,000 ريال / ساعة) - تم تسجيل الحجز بنجاح
                      </span>
                    )}
                  </p>
                </div>

                <div className="bg-white border border-emerald-200 rounded-2xl p-4 max-w-md mx-auto text-right space-y-2 text-xs">
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span className="text-stone-500">رقم الحجز:</span>
                    <span className="font-mono font-black text-primary text-sm">{bookingTicket}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span className="text-stone-500">اسم الأسرة / المستفيد:</span>
                    <span className="font-bold text-stone-800">{lastCreatedRequest?.clientName}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span className="text-stone-500">نوع الاستشارة:</span>
                    <span className="font-bold text-stone-800">{lastCreatedRequest?.consultationTypeLabel}</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-100 pb-2">
                    <span className="text-stone-500">الموعد والمدة:</span>
                    <span className="font-bold text-stone-800">{lastCreatedRequest?.bookingDate} ({lastCreatedRequest?.bookingTime}) - مدة ساعة</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">قيمة الاستشارة:</span>
                    <span className="font-black text-emerald-700">
                      {lastCreatedRequest?.isFreeSession ? '0 ريال (مجاناً)' : '1,000 ريال سعودي'}
                    </span>
                  </div>
                </div>

                <p className="text-stone-600 text-xs font-light max-w-md mx-auto leading-relaxed">
                  تم إشعار إدارة التفكير والنماء بطلبكم. فور انعقاد الجلسة والانتهاء منها والضغط على اعتماد الاستشارة، ستصلكم رسالة التأكيد والإشعار الرسمي.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setBookingSuccess(false);
                      setActiveTab('my_consultations');
                    }}
                    className="bg-[#174F3E] text-white font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-[#123e31] transition-all cursor-pointer"
                  >
                    متابعة سجل وحالة الاستشارة 📋
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingSuccess(false)}
                    className="bg-stone-100 text-stone-700 font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-stone-200 transition-all cursor-pointer"
                  >
                    حجز استشارة أخرى
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookConsultation} className="space-y-5">
                {/* Free vs 1000 SAR Notice Box */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  isFreeEligible 
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50/80 border-amber-200 text-amber-950'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                      isFreeEligible ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-stone-950'
                    }`}>
                      {isFreeEligible ? '🎁' : '💳'}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-extrabold text-xs">
                        {isFreeEligible 
                          ? 'استشارتك الأولى مجانية لمدة ساعة كاملة (60 دقيقة)!' 
                          : 'لقد استفدت مسبقاً من الاستشارة المجانية - سعر الجلسة الإضافية 1,000 ريال / ساعة'}
                      </h4>
                      <p className="text-[11px] leading-relaxed opacity-90">
                        {isFreeEligible 
                          ? 'تقدم مؤسسة التفكير والنماء جلسة استشارية أولى مجانية لكل أسرة منتجة وحرفي لدعم الانطلاقة والجاهزية، ومدتها ساعة واحدة.'
                          : 'تُقدم الجلسات الاستشارية التخصصية الإضافية بواسطة خبراء استشاريين معتمدين بقيمة 1,000 ريال للساعة الواحدة.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">اسم صاحب الطلب / الأسرة المنتجة:</label>
                    <input
                      type="text"
                      placeholder="مثال: أم أحمد - المطبخ المكي التراثي"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium text-right outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">
                      رقم الجوال للتواصل وتأكيد الحجز:
                      <span className="text-[10px] text-stone-400 font-normal mr-1">(يحدد الأهلية المجانية تلقائياً)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="050XXXXXXX"
                      value={clientPhone}
                      onChange={(e) => {
                        setClientPhone(e.target.value);
                        setSearchPhone(e.target.value);
                      }}
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium text-left outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">نوع الاستشارة المطلوبة:</label>
                    <select
                      value={selectedConsultationType}
                      onChange={(e) => setSelectedConsultationType(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium text-right outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="financial">استشارة التمويل والجدوى الاقتصادية والتسعير</option>
                      <option value="culinary">استشارة جودة واشتراطات الطهي التراثي وسلامة الغذاء</option>
                      <option value="marketing">استشارة التسويق المتقدم واستهداف الفنادق الكبرى</option>
                      <option value="governance">استشارات اللوائح والتراخيص الرسمية</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">المستشار المرشح للجلسة:</label>
                    <div className="p-3 rounded-xl border border-stone-200 bg-stone-100 text-xs font-bold text-stone-700">
                      {getConsultantForType(selectedConsultationType)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">صيغة الجلسة:</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSessionFormat('zoom')}
                        className={`p-2.5 rounded-xl border text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                          sessionFormat === 'zoom'
                            ? 'bg-[#174F3E] text-white border-[#174F3E]'
                            : 'bg-stone-50 text-stone-600 border-stone-200'
                        }`}
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>عبر زووم</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSessionFormat('phone')}
                        className={`p-2.5 rounded-xl border text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                          sessionFormat === 'phone'
                            ? 'bg-[#174F3E] text-white border-[#174F3E]'
                            : 'bg-stone-50 text-stone-600 border-stone-200'
                        }`}
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>هاتفياً</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSessionFormat('presence')}
                        className={`p-2.5 rounded-xl border text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                          sessionFormat === 'presence'
                            ? 'bg-[#174F3E] text-white border-[#174F3E]'
                            : 'bg-stone-50 text-stone-600 border-stone-200'
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>حضورياً</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">تاريخ الجلسة:</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium text-right outline-none focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700">وقت الجلسة (المدة: 1 ساعة):</label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium text-right outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value="10:00 ص">10:00 صباحاً (10:00 - 11:00 ص)</option>
                      <option value="01:00 م">01:00 ظهراً (01:00 - 02:00 م)</option>
                      <option value="04:00 م">04:00 عصراً (04:00 - 05:00 م)</option>
                      <option value="08:00 م">08:00 مساءً (08:00 - 09:00 م)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">ملخص الموضوع أو التحدي المراد مناقشته في الساعة الاستشارية:</label>
                  <textarea
                    rows={3}
                    placeholder="اكتب باختصار الاستفسار الرئيسي أو الهدف من الجلسة..."
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium text-right outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* If Paid: Payment Selector */}
                {!isFreeEligible && (
                  <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-primary" />
                        <span className="text-xs font-black text-stone-800">طريقة سداد رسوم الاستشارة (1,000 ريال / ساعة):</span>
                      </div>
                      <span className="text-xs font-black text-primary">المجموع: 1,000 ر.س</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('mada')}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          paymentMethod === 'mada' ? 'bg-primary text-white border-primary shadow-xs' : 'bg-white text-stone-700 border-stone-200'
                        }`}
                      >
                        💳 مدى Mada
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('apple_pay')}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          paymentMethod === 'apple_pay' ? 'bg-primary text-white border-primary shadow-xs' : 'bg-white text-stone-700 border-stone-200'
                        }`}
                      >
                         Apple Pay
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('visa')}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          paymentMethod === 'visa' ? 'bg-primary text-white border-primary shadow-xs' : 'bg-white text-stone-700 border-stone-200'
                        }`}
                      >
                        💳 فيزا / ماستركارد
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('pay_on_session')}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          paymentMethod === 'pay_on_session' ? 'bg-primary text-white border-primary shadow-xs' : 'bg-white text-stone-700 border-stone-200'
                        }`}
                      >
                        🏢 سداد عند موعد الجلسة
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#174F3E] hover:bg-[#123e31] text-white font-extrabold py-4 rounded-2xl text-xs sm:text-sm transition-all shadow-md cursor-pointer hover:scale-[1.005] flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {isFreeEligible 
                      ? 'تأكيد حجز الاستشارة المجانية الأولى (لمدة ساعة - 0 ريال) 🎁' 
                      : 'تأكيد حجز الاستشارة المتقدمة (1,000 ريال / ساعة) 💳'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 2: MY CONSULTATIONS & TRACKING
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'my_consultations' && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-stone-900">سجل الاستشارات ومتابعة الاعتماد</h3>
                <p className="text-xs text-stone-500">ابحث برقم الجوال لمتابعة حالة استشاراتك وتوصيات المستشار</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="ابحث برقم الجوال (مثال: 0501234567)"
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  className="p-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50 font-mono text-left outline-none focus:ring-1 focus:ring-primary w-64"
                />
                <button
                  onClick={() => setSearchPhone(searchPhone)}
                  className="bg-primary text-white p-2.5 rounded-xl text-xs font-bold cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {userConsultations.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 border border-stone-100 rounded-2xl space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center mx-auto text-xl">
                  🔍
                </div>
                <p className="text-xs text-stone-600 font-bold">لا توجد طلبات استشارة مسجلة بهذا الرقم حالياً</p>
                <button
                  onClick={() => setActiveTab('book')}
                  className="text-xs text-primary font-bold underline cursor-pointer"
                >
                  احجز جلستك الأولى المجانية الآن 📅
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {userConsultations.map((req) => (
                  <div
                    key={req.id}
                    className={`p-5 rounded-3xl border transition-all ${
                      req.status === 'completed'
                        ? 'bg-emerald-50/70 border-emerald-300 shadow-sm'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    {/* Top banner if completed */}
                    {req.status === 'completed' && (
                      <div className="bg-emerald-600 text-white p-3 rounded-2xl mb-4 flex items-center justify-between text-xs font-bold shadow-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                          <span>
                            {req.isFreeSession 
                              ? '🎉 تم استشارتكم المجانية بنجاح!' 
                              : '🎉 تم إنهاء جلستكم الاستشارية بنجاح!'}
                          </span>
                        </div>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md font-mono">
                          مكتملة وموثقة ✓
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-bold text-xs bg-stone-100 text-stone-800 px-2.5 py-1 rounded-lg border border-stone-200">
                            {req.id}
                          </span>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            req.isFreeSession 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {req.isFreeSession ? '🎁 استشارة مجانية (1 ساعة)' : '💳 استشارة مدفوعة (1,000 ر.س / ساعة)'}
                          </span>
                          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                            req.status === 'completed'
                              ? 'bg-emerald-200 text-emerald-900'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {req.status === 'completed' ? 'تمت الاستشارة بنجاح ✓' : 'قيد المتابعة / بانتظار الموعد'}
                          </span>
                        </div>

                        <h4 className="font-black text-stone-900 text-sm">{req.consultationTypeLabel}</h4>
                        <p className="text-xs text-stone-600">
                          <strong>صاحب الطلب:</strong> {req.clientName} ({req.clientPhone})
                        </p>
                        <p className="text-xs text-stone-600">
                          <strong>المستشار:</strong> {req.consultantName} • <strong>الصيغة:</strong> {req.sessionFormatLabel}
                        </p>
                        <p className="text-xs text-stone-600">
                          <strong>الموعد:</strong> {req.bookingDate} الساعة {req.bookingTime} (مدة الجلسة: ساعة واحدة)
                        </p>
                        {req.bookingNotes && (
                          <p className="text-xs text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                            <strong>ملاحظاتك:</strong> {req.bookingNotes}
                          </p>
                        )}
                      </div>

                      {/* Right-side status or admin notes */}
                      <div className="sm:max-w-xs w-full bg-white/80 border border-stone-200 p-3.5 rounded-2xl space-y-2 text-right">
                        <span className="text-[11px] font-bold text-stone-500 block">إفادة واعتماد المستشار الإداري:</span>
                        {req.status === 'completed' ? (
                          <div className="space-y-1.5">
                            <p className="text-xs text-emerald-900 font-medium bg-emerald-100/60 p-2.5 rounded-xl border border-emerald-200 leading-relaxed">
                              {req.adminNotes || 'تمت الاستشارة بنجاح ومناقشة دراسة الجدوى وخطة التمكين.'}
                            </p>
                            {req.completedAt && (
                              <span className="text-[10px] text-stone-400 block font-mono">
                                تاريخ الإنجاز: {new Date(req.completedAt).toLocaleDateString('ar-SA')}
                              </span>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs text-stone-500 italic">
                            بانتظار انعقاد الجلسة والاعتماد من قِبل المستشار المختص.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
