import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';

interface ContactPageProps {
  onBackToHome: () => void;
  onOpenSupport?: () => void;
}

export default function ContactPage({ onBackToHome, onOpenSupport }: ContactPageProps) {
  const [senderName, setSenderName] = useState<string>('');
  const [senderPhone, setSenderPhone] = useState<string>('');
  const [senderEmail, setSenderEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('استفسار عام');
  const [message, setMessage] = useState<string>('');
  const [sentSuccess, setSentSuccess] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>('');

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderPhone || !message) {
      alert('الرجاء تعبئة البيانات الأساسية (الاسم، الجوال، ونص الرسالة)');
      return;
    }

    const tid = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(tid);
    setSentSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 text-right p-4 sm:p-6 font-sans" id="standalone-contact-page">
      {/* Navigation Top Bar */}
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
          <span className="text-xs sm:text-sm font-black text-stone-800">تواصل معنا والمركز الرئيسي (/contact)</span>
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#0B3A60] via-primary to-emerald-950 text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl border border-accent/30">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-accent text-xs font-black bg-white/10 border border-accent/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" />
            يسعدنا تواصلكم وخدمتكم على مدار الساعة 📞
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            مركز الاتصال وبوابة التواصل المباشر
          </h1>

          <p className="text-stone-200 text-xs sm:text-sm font-light leading-relaxed">
            فريق خدمة المستفيدين بمؤسسة التفكير والنماء ومنصة ورث أجيال بانتظار استفساراتكم واقتراحاتكم بشأن التسجيل، المتجر المستقل، أو برامج التمويل والاستشارات.
          </p>
        </div>
      </div>

      {/* Main Grid: Info + Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Direct Contact Info */}
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 shadow-xs">
            <h3 className="font-black text-stone-800 text-base border-b border-stone-100 pb-3">
              قنوات التواصل الرسمية 🏢
            </h3>

            <div className="space-y-4 text-xs font-medium text-stone-700">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold flex-shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-stone-400 font-bold">المقر الرئيسي:</span>
                  <span>مؤسسة التفكير والنماء للاستشارات الإدارية - الرياض / مكة المكرمة</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-stone-400 font-bold">الهاتف والواتساب الموحد:</span>
                  <span className="font-mono font-bold text-stone-800">920000000 / 0500000000</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-stone-400 font-bold">البريد الإلكتروني:</span>
                  <span className="font-mono text-stone-800">support@warth.sa / info@tnd.sa</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center font-bold flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-stone-400 font-bold">ساعات العمل الرسمية:</span>
                  <span>الأحد - الخميس: 8:00 صباحاً حتى 5:00 مساءً</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Smart Support Banner */}
          {onOpenSupport && (
            <div className="bg-[#0B3A60] text-white p-6 rounded-3xl space-y-3 shadow-md">
              <h4 className="font-black text-sm text-white">هل تحتاج إجابة فورية بدون انتظار؟ 💬</h4>
              <p className="text-stone-300 text-xs font-light leading-relaxed">
                استخدم المساعد الفني الذكي للتواصل السريع واكتشاف الحلول التفاعلية مباشرة!
              </p>
              <button
                type="button"
                onClick={onOpenSupport}
                className="w-full bg-accent hover:bg-accent/90 text-primary font-black py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-xs"
              >
                فتح الدعم الفني الذكي الآن ⚡
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-2 bg-white border border-stone-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="font-black text-stone-800 text-lg">إرسال استفسار أو طلب تواصل ✉️</h3>
            <p className="text-stone-500 text-xs font-light mt-1">
              أدخل بياناتك وسنقوم بالرد عليك وفتح تذكرة متابعة إلكترونية فورية.
            </p>
          </div>

          {sentSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h4 className="font-black text-emerald-900 text-base">تم استلام رسالتك بنجاح! 🎉</h4>
              <p className="text-emerald-800 text-xs font-medium">
                رقم التذكرة: <span className="font-mono font-bold text-sm bg-white px-2 py-1 rounded-md border border-emerald-300">{ticketId}</span>
              </p>
              <p className="text-stone-600 text-xs font-light max-w-md mx-auto">
                سيقوم فريق خدمة العملاء بمراجعة تذكرتك التواصل معك خلال 24 ساعة عمل عبر الجوال أو البريد الإلكتروني.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSentSuccess(false);
                  setMessage('');
                }}
                className="bg-emerald-700 text-white font-bold px-6 py-2 rounded-xl text-xs hover:bg-emerald-800 transition-all cursor-pointer"
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitContact} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700">الاسم الكامل <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="مثال: محمد بن علي"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium text-right outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700">رقم الجوال <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="050XXXXXXX"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium text-left outline-none focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700">البريد الإلكتروني (اختياري):</label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium text-left outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-700">موضوع الرسالة:</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium text-right outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="استفسار عام">استفسار عام عن المنصة</option>
                    <option value="المتجر المستقل">استفسار عن المتجر والطلبات</option>
                    <option value="التمويل والتمكين">استفسار عن برامج التمويل والمرونة</option>
                    <option value="شراكات ومبادرات">طلب شراكة أو مبادرة تنموية</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-700">تفاصيل الرسالة أو الطلب <span className="text-red-500">*</span></label>
                <textarea
                  rows={4}
                  placeholder="اكتب رسالتك بالتفصيل هنا..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-200 text-xs bg-stone-50 font-medium text-right outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0B3A60] hover:bg-[#0B3A60]/90 text-white font-extrabold py-3.5 rounded-2xl text-xs transition-all shadow-md cursor-pointer hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 rotate-180" />
                <span>إرسال الرسالة وفتح تذكرة متابعة ✉️</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
