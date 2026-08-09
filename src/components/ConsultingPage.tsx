import React, { useState } from 'react';
import { motion } from 'motion/react';
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
  Building2 
} from 'lucide-react';

interface ConsultingPageProps {
  onBackToHome: () => void;
  onOpenSupport?: () => void;
}

export default function ConsultingPage({ onBackToHome, onOpenSupport }: ConsultingPageProps) {
  const [selectedConsultationType, setSelectedConsultationType] = useState<string>('financial');
  const [consultantName, setConsultantName] = useState<string>('د. أحمد السليمان - خبير التمكين المالي');
  const [sessionFormat, setSessionFormat] = useState<'zoom' | 'phone' | 'presence'>('zoom');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('10:00 ص');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [bookingNotes, setBookingNotes] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingTicket, setBookingTicket] = useState<string>('');

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone || !bookingDate) {
      alert('الرجاء تعبئة جميع الحقول المطلوبة (الاسم، الجوال، وتاريخ الاستشارة)');
      return;
    }

    const ticket = `CNS-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingTicket(ticket);
    setBookingSuccess(true);
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

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-black text-stone-800">مركز الاستشارات والتطوير المالي والتنفيذي (/consulting)</span>
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#0B3A60] via-primary to-emerald-950 text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl border border-accent/30">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-accent text-xs font-black bg-white/10 border border-accent/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" />
            استشارات متخصصة برعاية مؤسسة التفكير والنماء TND.SA 🩺
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            استشارات حوكمة الأعمال والتأهيل المالي والطهي التراثي
          </h1>

          <p className="text-stone-200 text-xs sm:text-sm font-light leading-relaxed">
            نساعدك في تحويل مشروعك الحرفي أو المنزلي إلى علامة تجارية مستدامة وموثقة. احجز جلسة استشارية فردية مع نخبة من مستشاري التفكير والنماء لتقييم الجدارات وتطوير دراسات الجدوى وتسعير المنتجات.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#booking-form"
              className="bg-accent hover:bg-accent/90 text-primary font-black py-3 px-6 rounded-2xl text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>احجز استشارتك المجانية الأولى الآن 📅</span>
            </a>
            {onOpenSupport && (
              <button
                type="button"
                onClick={onOpenSupport}
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-2xl text-xs transition-all border border-white/20 flex items-center gap-2 cursor-pointer"
              >
                <span>استفسر عبر الدعم الفني الذكي 💬</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Consultation Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category 1 */}
        <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-xs space-y-3 hover:border-accent transition-all">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-black text-xl">
            📈
          </div>
          <h3 className="font-black text-stone-800 text-sm">استشارات التخطيط والتمويل التمكيني</h3>
          <p className="text-stone-500 text-xs font-light leading-relaxed">
            مراجعة الملاءة المالية والميزانيات، وتحديد قيمة التمويل المستحق بدون فوائد وبدون كفيل لورش الأسر المنتجة.
          </p>
          <div className="pt-2 text-xs text-primary font-bold">
            ✓ مجانية للمستفيدين المسجلين بالمنصة
          </div>
        </div>

        {/* Category 2 */}
        <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-xs space-y-3 hover:border-accent transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black text-xl">
            🍳
          </div>
          <h3 className="font-black text-stone-800 text-sm">استشارات الطهي والجودة والسلامة</h3>
          <p className="text-stone-500 text-xs font-light leading-relaxed">
            تطوير وصفات الأطباق التراثية، رفع معايير سلامة الغذاء، واختيار طرق التغليف الحراري المطابق لمعايير هيئة الغذاء والدواء.
          </p>
          <div className="pt-2 text-xs text-primary font-bold">
            ✓ معتمدة وموجهة لضيوف الرحمن والسياح
          </div>
        </div>

        {/* Category 3 */}
        <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-xs space-y-3 hover:border-accent transition-all">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-black text-xl">
            📣
          </div>
          <h3 className="font-black text-stone-800 text-sm">استشارات التسويق وبناء العلامة</h3>
          <p className="text-stone-500 text-xs font-light leading-relaxed">
            استراتيجيات الاستهداف الفندقي، بناء الهوية البصرية، وتسويق المنتجات التراثية والسدو للمعتمرين والمنظمين.
          </p>
          <div className="pt-2 text-xs text-primary font-bold">
            ✓ تشمل خطة تسويق إلكتروني مخصصة
          </div>
        </div>
      </div>

      {/* Booking Form Section */}
      <div id="booking-form" className="bg-white border border-stone-200 p-6 sm:p-8 rounded-3xl shadow-md space-y-6">
        <div className="border-b border-stone-100 pb-4">
          <h2 className="font-black text-stone-800 text-lg sm:text-xl">حجز جلسة استشارية جديدة 📅</h2>
          <p className="text-stone-500 text-xs font-light mt-1">
            اختر نوع الاستشارة وصيغة الجلسة المناسبة لك واملأ البيانات للحصول على تأكيد الموعد فوراً.
          </p>
        </div>

        {bookingSuccess ? (
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <h3 className="font-black text-emerald-900 text-base">تم تأكيد حجز الاستشارة بنجاح! 🎉</h3>
            <p className="text-emerald-800 text-xs font-medium">
              رقم الحجز: <span className="font-mono font-bold text-sm bg-white px-2 py-1 rounded-md border border-emerald-300">{bookingTicket}</span>
            </p>
            <p className="text-stone-600 text-xs font-light max-w-md mx-auto">
              سيتم التواصل معك عبر رقم الجوال المرفق وإرسال رابط الجلسة أو تفاصيل اللقاء الحضوري بمقر التفكير والنماء.
            </p>
            <button
              type="button"
              onClick={() => setBookingSuccess(false)}
              className="bg-emerald-700 text-white font-bold px-6 py-2 rounded-xl text-xs hover:bg-emerald-800 transition-all cursor-pointer"
            >
              حجز استشارة أخرى
            </button>
          </div>
        ) : (
          <form onSubmit={handleBookConsultation} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700">نوع الاستشارة المطلوبة:</label>
                <select
                  value={selectedConsultationType}
                  onChange={(e) => setSelectedConsultationType(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium text-right outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="financial">استشارة التمويل والجدوى الاقتصادية</option>
                  <option value="culinary">استشارة جودة واشتراطات الطهي التراثي</option>
                  <option value="marketing">استشارة التسويق واستهداف الفنادق والسياح</option>
                  <option value="governance">استشارات اللوائح والتراخيص الرسمية</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700">صيغة الجلسة:</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSessionFormat('zoom')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      sessionFormat === 'zoom'
                        ? 'bg-[#0B3A60] text-white border-[#0B3A60]'
                        : 'bg-stone-50 text-stone-600 border-stone-200'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>عبر زووم</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSessionFormat('phone')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      sessionFormat === 'phone'
                        ? 'bg-[#0B3A60] text-white border-[#0B3A60]'
                        : 'bg-stone-50 text-stone-600 border-stone-200'
                    }`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>مكالمة هاتفية</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSessionFormat('presence')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                      sessionFormat === 'presence'
                        ? 'bg-[#0B3A60] text-white border-[#0B3A60]'
                        : 'bg-stone-50 text-stone-600 border-stone-200'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>حضورياً بمقرنا</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700">تاريخ الجلسة:</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium text-right outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700">وقت الجلسة:</label>
                <select
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium text-right outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="10:00 ص">10:00 صباحاً</option>
                  <option value="01:00 م">01:00 ظهراً</option>
                  <option value="04:00 م">04:00 عصراً</option>
                  <option value="08:00 م">08:00 مساءً</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
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

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700">رقم الجوال للتواصل وتأكيد الحجز:</label>
                <input
                  type="text"
                  placeholder="050XXXXXXX"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium text-left outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-stone-700">ملخص التحدي أو الموضوع المراد مناقشته:</label>
              <textarea
                rows={3}
                placeholder="اكتب باختصار الاستفسار الرئيسي أو الهدف من الجلسة..."
                value={bookingNotes}
                onChange={(e) => setBookingNotes(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium text-right outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0B3A60] hover:bg-[#0B3A60]/90 text-white font-extrabold py-3.5 rounded-2xl text-xs transition-all shadow-md cursor-pointer hover:scale-[1.01]"
            >
              تأكيد حجز الموعد الاستشاري 📅
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
