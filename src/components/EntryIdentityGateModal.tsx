import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  ShoppingBag, 
  ChefHat, 
  CheckCircle2, 
  Award, 
  Phone,
  Mail,
  Smartphone,
  User,
  ShieldCheck,
  RefreshCw,
  Store,
  Compass,
  Globe,
  UserPlus
} from 'lucide-react';

interface EntryIdentityGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (
    role: 'family' | 'customer', 
    customerSubTab?: 'buyer' | 'pilgrim' | 'visitor',
    contactInfo?: { type: 'phone' | 'email'; value?: string; name?: string }
  ) => void;
}

export default function EntryIdentityGateModal({
  isOpen,
  onClose,
  onSelectRole
}: EntryIdentityGateModalProps) {
  const [step, setStep] = useState<'select' | 'contact'>('select');
  const [selectedRole, setSelectedRole] = useState<'family' | 'customer'>('customer');
  const [selectedSubTab, setSelectedSubTab] = useState<'buyer' | 'pilgrim' | 'visitor' | undefined>(undefined);
  
  // Subscription Form state
  const [contactType, setContactType] = useState<'phone' | 'email'>('phone');
  const [contactValue, setContactValue] = useState('');
  const [fullName, setFullName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent background body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChooseRole = (role: 'family' | 'customer', subTab?: 'buyer' | 'pilgrim' | 'visitor') => {
    setSelectedRole(role);
    setSelectedSubTab(subTab);
    setErrorMsg('');
    setStep('contact');
  };

  const handleCompleteSubscription = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanValue = contactValue.trim();

    // If user filled contact details, validate them
    if (cleanValue) {
      if (contactType === 'phone') {
        const phoneDigits = cleanValue.replace(/\D/g, '');
        if (phoneDigits.length < 8) {
          setErrorMsg('يرجى إدخال رقم جوال صحيح (مثال: 0512345678)');
          return;
        }
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanValue)) {
          setErrorMsg('يرجى إدخال بريد إلكتروني صحيح (مثال: name@example.com)');
          return;
        }
      }
    }

    setIsSubmitting(true);
    setErrorMsg('');
    
    // Save contact info for user personalization
    const contactData = {
      type: contactType,
      value: cleanValue || undefined,
      name: fullName.trim() || (selectedRole === 'family' ? 'رائدة عمل حر' : 'عميل إرث أجيال'),
      role: selectedRole,
      isSubscribed: Boolean(cleanValue || fullName.trim()),
      createdAt: new Date().toISOString()
    };

    try {
      localStorage.setItem('warath_user_contact', JSON.stringify(contactData));
      localStorage.setItem('warath_selected_role_track', selectedRole);
    } catch (err) {
      console.error('Error saving contact data:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onSelectRole(selectedRole, selectedSubTab, { 
        type: contactType, 
        value: cleanValue || undefined,
        name: fullName.trim() || undefined
      });
      onClose();
      // Reset state
      setStep('select');
      setContactValue('');
      setFullName('');
      setErrorMsg('');
    }, 350);
  };

  const handleSkipContact = () => {
    try {
      localStorage.setItem('warath_selected_role_track', selectedRole);
    } catch (err) {
      console.error('Error saving role:', err);
    }
    onSelectRole(selectedRole, selectedSubTab);
    onClose();
    setStep('select');
    setContactValue('');
    setFullName('');
    setErrorMsg('');
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-stone-950/70 backdrop-blur-xs dir-rtl"
        id="entry-identity-gate-modal"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="bg-white border border-stone-200/90 rounded-2xl sm:rounded-3xl max-w-lg w-full shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-right"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Scrollable Modal Container */}
          <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
            
            {/* 1. Header: Logo, Titles, and Close / Back buttons (Strict RTL) */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3.5">
              
              {/* Right Side: Brand Logo + Titles */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#174F3E] text-amber-300 flex items-center justify-center shadow-xs font-black text-sm sm:text-base shrink-0 border border-amber-400/20">
                  إرث
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h2 className="text-sm sm:text-base md:text-lg font-black text-stone-900 leading-tight">
                      {step === 'select' 
                        ? 'مرحباً بك في منصة إرث أجيال' 
                        : (selectedRole === 'family' ? 'اشتراك: مسار رائدات ورواد العمل الحر' : 'اشتراك: بوابة العميل الشاملة')
                      }
                    </h2>
                    <span className="hidden xs:inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-300/80 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                      {step === 'select' ? 'الضيافة الأصيلة' : 'انضمام فوري'}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-stone-500 font-medium mt-0.5">
                    {step === 'select' 
                      ? 'اختر هويتك للانتقال مباشرة إلى واجهتك المخصصة'
                      : 'أدخل بياناتك للاشتراك ومتابعة خدماتك مباشرة، أو اضغط زر تخطي'
                    }
                  </p>
                </div>
              </div>

              {/* Left Side: Back / Close Controls */}
              <div className="flex items-center gap-1 shrink-0">
                {step === 'contact' && (
                  <button
                    type="button"
                    onClick={() => {
                      setStep('select');
                      setErrorMsg('');
                    }}
                    className="p-1.5 sm:p-2 rounded-xl text-stone-500 hover:text-[#174F3E] hover:bg-stone-100 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                    title="الرجوع لاختيار المسار"
                  >
                    <ArrowRight className="w-4 h-4 text-stone-500" />
                    <span className="hidden sm:inline text-[11px]">تغيير</span>
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 sm:p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-all cursor-pointer"
                  title="إغلاق النافذة"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* STEP 1: SELECT ROLE (Compact, perfectly responsive cards) */}
            {step === 'select' && (
              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Card 1: مسار رائدات ورواد العمل الحر والمشاريع الصغيرة */}
                  <div 
                    onClick={() => handleChooseRole('family')}
                    className="group bg-gradient-to-b from-amber-50/70 to-white hover:from-amber-100/70 border-2 border-amber-300/90 hover:border-[#174F3E] rounded-2xl p-3.5 sm:p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
                    id="select-family-role-card"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/15 text-[#174F3E] flex items-center justify-center text-base sm:text-lg group-hover:scale-105 group-hover:bg-[#174F3E] group-hover:text-amber-300 transition-all shrink-0">
                            👩‍🍳
                          </div>
                          <div>
                            <h3 className="text-xs sm:text-sm font-black text-stone-900 group-hover:text-[#174F3E] transition-colors leading-tight">
                              رائدات ورواد العمل الحر والمشاريع الصغيرة
                            </h3>
                            <span className="text-[9px] sm:text-[10px] text-amber-800 font-bold">مسار التمكين والإنتاج</span>
                          </div>
                        </div>
                        <span className="bg-[#174F3E] text-amber-300 text-[9px] font-black px-2 py-0.5 rounded-md shrink-0">
                          دخول ←
                        </span>
                      </div>

                      <p className="text-[11px] text-stone-600 font-normal leading-relaxed">
                        برنامج التأهيل الشامل، اعتماد وثيقة الضمان الذهبي، وفتح المتجر الإلكتروني.
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[10px] text-stone-600 font-semibold">
                      <span>🏅 الضمان الذهبي</span>
                      <span>🏪 المتجر الرقمي</span>
                    </div>
                  </div>

                  {/* Card 2: مسار العميل الشامل (مشتري • سائح • معتمر) */}
                  <div 
                    onClick={() => handleChooseRole('customer')}
                    className="group bg-gradient-to-b from-emerald-50/60 to-white hover:from-emerald-100/60 border-2 border-emerald-300/90 hover:border-[#174F3E] rounded-2xl p-3.5 sm:p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden"
                    id="select-customer-role-card"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-600/15 text-emerald-800 flex items-center justify-center text-base sm:text-lg group-hover:scale-105 group-hover:bg-[#174F3E] group-hover:text-amber-300 transition-all shrink-0">
                            🛍️
                          </div>
                          <div>
                            <h3 className="text-xs sm:text-sm font-black text-stone-900 group-hover:text-[#174F3E] transition-colors leading-tight">
                              بوابة العميل الشاملة
                            </h3>
                            <span className="text-[9px] sm:text-[10px] text-emerald-800 font-bold">المشتري • السائح • المعتمر</span>
                          </div>
                        </div>
                        <span className="bg-emerald-700 text-white text-[9px] font-black px-2 py-0.5 rounded-md shrink-0">
                          دخول ←
                        </span>
                      </div>

                      <p className="text-[11px] text-stone-600 font-normal leading-relaxed">
                        تذوق المأكولات التراثية، باقات ضيافة الحرم، وحجز تجارب السياح الحية.
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[10px] text-stone-600 font-semibold">
                      <span>🍲 متجر الأكلات</span>
                      <span>🕋 ضيافة الفنادق</span>
                    </div>
                  </div>

                </div>

                {/* Quick Selection Pills */}
                <div className="bg-stone-50/80 rounded-xl p-2.5 border border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-[10px] sm:text-[11px] font-bold text-stone-600">
                    ⚡ وصول سريع ومباشر:
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleChooseRole('customer', 'buyer')}
                      className="bg-white hover:bg-emerald-50 text-stone-800 border border-stone-200/90 px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                    >
                      🛒 تسوق المأكولات
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChooseRole('customer', 'pilgrim')}
                      className="bg-white hover:bg-amber-50 text-stone-800 border border-stone-200/90 px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                    >
                      🕋 ضيافة المعتمرين
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChooseRole('customer', 'visitor')}
                      className="bg-white hover:bg-blue-50 text-stone-800 border border-stone-200/90 px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
                    >
                      🕌 تجارب السياح
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: SUBSCRIPTION (اشتراك وانضمام فوري بدون تعقيد، مع خيار تخطي) */}
            {step === 'contact' && (
              <form onSubmit={handleCompleteSubscription} className="space-y-4 pt-1">
                
                {/* 4. Active Role Summary Card */}
                <div className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                  selectedRole === 'family' 
                    ? 'bg-amber-50/80 border-amber-300 text-stone-900' 
                    : 'bg-emerald-50/80 border-emerald-300 text-stone-900'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                      selectedRole === 'family' ? 'bg-amber-500/20 text-[#174F3E]' : 'bg-emerald-600/20 text-emerald-800'
                    }`}>
                      {selectedRole === 'family' ? '👩‍🍳' : '🛍️'}
                    </div>
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-black block leading-tight">
                        {selectedRole === 'family' ? 'رائدات ورواد العمل الحر والمشاريع الصغيرة' : 'بوابة العميل الشاملة'}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-stone-600 font-medium">
                        {selectedRole === 'family' ? 'مسار التمكين والإنتاج والمتجر' : 'المشتري • السائح • المعتمر'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setStep('select');
                      setErrorMsg('');
                    }}
                    className="text-[11px] font-bold text-[#174F3E] bg-white hover:bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-lg transition-all shrink-0 cursor-pointer shadow-2xs"
                  >
                    تغيير المسار
                  </button>
                </div>

                {/* 5. Name Field (الاسم الكريم - اختياري) */}
                <div className="space-y-1 text-right">
                  <label className="block text-xs font-bold text-stone-700">
                    الاسم الكريم <span className="text-stone-400 font-normal">(اختياري)</span>
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 absolute right-3.5 text-stone-400 pointer-events-none" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={selectedRole === 'family' ? 'مثال: أم عبد الله / شيف أحمد' : 'مثال: محمد السعيد'}
                      className="w-full bg-stone-50/80 border border-stone-200 rounded-xl sm:rounded-2xl pr-10 pl-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#174F3E] focus:bg-white focus:ring-2 focus:ring-[#174F3E]/15 transition-all text-right"
                    />
                  </div>
                </div>

                {/* 6. Communication Method Tabs & Input (رقم الجوال أو البريد الإلكتروني) */}
                <div className="space-y-1.5 text-right">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-stone-700">
                      رقم الجوال أو البريد الإلكتروني <span className="text-stone-400 font-normal">(اختياري)</span>
                    </label>

                    {/* Method Switcher Tabs */}
                    <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200/90">
                      <button
                        type="button"
                        onClick={() => { 
                          setContactType('phone'); 
                          setContactValue(''); 
                          setErrorMsg(''); 
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          contactType === 'phone' 
                            ? 'bg-[#174F3E] text-white shadow-2xs' 
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        <Smartphone className="w-3 h-3" />
                        <span>رقم الجوال</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => { 
                          setContactType('email'); 
                          setContactValue(''); 
                          setErrorMsg(''); 
                        }}
                        className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                          contactType === 'email' 
                            ? 'bg-[#174F3E] text-white shadow-2xs' 
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        <Mail className="w-3 h-3" />
                        <span>البريد الإلكتروني</span>
                      </button>
                    </div>
                  </div>

                  {/* Phone Input with Fixed Saudi Country Code */}
                  {contactType === 'phone' ? (
                    <div className="space-y-1">
                      <div className="flex items-stretch rounded-xl sm:rounded-2xl border border-stone-200 bg-stone-50/80 overflow-hidden focus-within:border-[#174F3E] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#174F3E]/15 transition-all">
                        
                        {/* Saudi Badge on Right */}
                        <div className="px-3 sm:px-3.5 py-2.5 sm:py-3 bg-stone-100/90 border-l border-stone-200 flex items-center gap-1.5 text-xs sm:text-sm font-black text-stone-700 dir-ltr select-none shrink-0">
                          <span>🇸🇦</span>
                          <span>+966</span>
                        </div>

                        {/* Phone Number Digits Input */}
                        <input
                          type="tel"
                          inputMode="numeric"
                          value={contactValue}
                          onChange={(e) => {
                            setContactValue(e.target.value);
                            if (errorMsg) setErrorMsg('');
                          }}
                          placeholder="05X XXX XXXX"
                          dir="ltr"
                          className="flex-1 bg-transparent px-3 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-stone-900 focus:outline-none text-left tracking-wider"
                          autoFocus
                        />
                      </div>
                      <p className="text-[10px] text-stone-400 text-right pr-1">
                        لتلقي إشعارات الطلبات وتحديثات الحساب
                      </p>
                    </div>
                  ) : (
                    /* Email Input */
                    <div className="space-y-1">
                      <div className="relative flex items-center">
                        <Mail className="w-4 h-4 absolute right-3.5 text-stone-400 pointer-events-none" />
                        <input
                          type="email"
                          value={contactValue}
                          onChange={(e) => {
                            setContactValue(e.target.value);
                            if (errorMsg) setErrorMsg('');
                          }}
                          placeholder="example@domain.com"
                          dir="ltr"
                          className="w-full bg-stone-50/80 border border-stone-200 rounded-xl sm:rounded-2xl pr-10 pl-3.5 py-2.5 sm:py-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#174F3E] focus:bg-white focus:ring-2 focus:ring-[#174F3E]/15 transition-all text-left"
                          autoFocus
                        />
                      </div>
                      <p className="text-[10px] text-stone-400 text-right pr-1">
                        لربط الفواتير وتأكيدات الحجز والاشتراك
                      </p>
                    </div>
                  )}

                  {/* Error Notification */}
                  {errorMsg && (
                    <div className="text-[11px] text-rose-700 font-bold bg-rose-50 border border-rose-200 rounded-xl p-2.5 flex items-center gap-2">
                      <span className="shrink-0 text-sm">⚠️</span>
                      <span>{errorMsg}</span>
                    </div>
                  )}
                </div>

                {/* 7. Submit Button & 8. Skip Button (زر تخطي) */}
                <div className="pt-2 space-y-2.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#174F3E] hover:bg-[#123e31] text-amber-300 hover:text-white font-black py-3 sm:py-3.5 px-4 rounded-xl sm:rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-60"
                    id="submit-subscription-and-enter-btn"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                        <span>جاري تأكيد الاشتراك والتوجيه...</span>
                      </span>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 text-amber-300" />
                        <span>تأكيد الاشتراك والانتقال مباشرة ←</span>
                      </>
                    )}
                  </button>

                  {/* زر تخطي واضح ومباشر */}
                  <div className="flex items-center justify-center pt-1">
                    <button
                      type="button"
                      onClick={handleSkipContact}
                      className="w-full text-center py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 text-xs font-black transition-all border border-stone-200/90 cursor-pointer flex items-center justify-center gap-1.5"
                      id="skip-subscription-btn"
                    >
                      <span>تخطي الآن والاستمرار كزائر</span>
                      <ArrowLeft className="w-3.5 h-3.5 text-stone-500" />
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* 9. Modal Footer: Security Badge & Platform Brand */}
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500 pt-3 border-t border-stone-100">
              <span className="flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>اشتراك آمن وسريع بدون كلمة مرور</span>
              </span>
              <span className="text-stone-700 font-bold">
                منصة إرث أجيال 🇸🇦
              </span>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

