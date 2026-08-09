import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getFormattedCategories } from '../packagesData';
import { 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Gift, 
  UtensilsCrossed, 
  Building, 
  User, 
  Compass, 
  Star, 
  Info, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  Check, 
  Zap, 
  Award,
  ChevronLeft,
  Heart,
  Send,
  Calendar
} from 'lucide-react';

export interface PackageItem {
  id: string;
  name: string;
  badge?: string;
  shortDescription: string;
  price?: string;
  period?: string;
  isPopular?: boolean;
  features: string[];
  detailedDescription: string;
  includedServices: string[];
  termsAndConditions?: string[];
}

export interface CategoryData {
  id: 'productive_family' | 'pilgrim' | 'visitor' | 'individual';
  title: string;
  icon: string;
  subtitle: string;
  badge: string;
  bgGradient: string;
  borderAccent: string;
  iconBg: string;
  packages: PackageItem[];
}

interface PackagesModalProps {
  onClose: () => void;
  onSelectPackage?: (pkg: PackageItem, category: CategoryData) => void;
  activeTrack?: 'general' | 'family' | 'pilgrim' | 'visitor' | 'partner';
}

export default function PackagesModal({ onClose, onSelectPackage, activeTrack }: PackagesModalProps) {
  // Categories State loaded dynamically
  const [categories, setCategories] = useState<CategoryData[]>(() => getFormattedCategories());

  // Navigation State
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(() => {
    const formatted = getFormattedCategories();
    if (activeTrack === 'family') {
      return formatted.find(c => c.id === 'productive_family') || null;
    }
    if (activeTrack === 'pilgrim') {
      return formatted.find(c => c.id === 'pilgrim') || null;
    }
    if (activeTrack === 'visitor') {
      return formatted.find(c => c.id === 'visitor') || null;
    }
    if (activeTrack === 'partner') {
      return formatted.find(c => c.id === 'individual') || null;
    }
    return null;
  });
  const [detailedPackage, setDetailedPackage] = useState<{ pkg: PackageItem; category: CategoryData } | null>(null);
  const [subscribingPackage, setSubscribingPackage] = useState<{ pkg: PackageItem; category: CategoryData } | null>(null);

  // Form State for Checkout/Subscription
  const [subscriberName, setSubscriberName] = useState('');
  const [subscriberPhone, setSubscriberPhone] = useState('');
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscriberNotes, setSubscriberNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNo, setTicketNo] = useState('');

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberName.trim() || !subscriberPhone.trim()) return;
    const generatedTicket = 'PKG-' + Math.floor(100000 + Math.random() * 900000);
    setTicketNo(generatedTicket);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubscribingPackage(null);
    setSubscriberName('');
    setSubscriberPhone('');
    setSubscriberEmail('');
    setSubscriberNotes('');
  };

  return (
    <div className="fixed inset-0 bg-stone-900/70 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-stone-50 border border-stone-200 rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col max-h-[92vh] text-right dir-rtl my-auto"
        id="packages-modal-container"
      >
        {/* Modal Header Bar */}
        <div className="bg-gradient-to-r from-[#0B3A60] via-[#0D4470] to-[#0B3A60] text-white p-4 sm:p-5 flex items-center justify-between border-b border-white/10 flex-shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-inner">
              <Gift className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg text-white">منظومة الباقات والعضويات 🎁</h3>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  جديد 2026
                </span>
              </div>
              <p className="text-xs text-stone-200/90 font-light mt-0.5">
                اختر الفئة المناسبة لك واستمتع بالخدمات والمزايا المخصصة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedCategory && (
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className="hidden sm:flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-xl transition-all cursor-pointer border border-white/15"
              >
                <ArrowRight className="w-4 h-4 ml-1" />
                <span>العودة للفئات</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer border border-white/15"
              title="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-grow space-y-6">
          
          {/* STEP 1: CATEGORY SELECTION SCREEN */}
          {!selectedCategory && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Category Selection Heading */}
              <div className="text-center max-w-xl mx-auto space-y-2 py-2">
                <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-black">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  خطوة واحدة للبدء
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                  اختر الفئة المناسبة لك:
                </h2>
                <p className="text-xs sm:text-sm text-stone-600">
                  حدد فئتك لاستعراض الباقات المخصصة لاحتياجاتك بدقة وسهولة
                </p>
              </div>

              {/* 4 Category Cards Grid (STRICTLY Productive Family, Pilgrim, Visitor, Individual) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                {categories.map((cat) => (
                  <motion.div
                    key={cat.id}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(cat)}
                    className={`bg-white rounded-2xl p-5 border-2 transition-all cursor-pointer shadow-md hover:shadow-xl flex flex-col justify-between group relative overflow-hidden ${cat.borderAccent}`}
                  >
                    {/* Top background accent */}
                    <div className={`absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r ${cat.bgGradient}`} />

                    <div>
                      {/* Icon & Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm border ${cat.iconBg}`}>
                          {cat.icon}
                        </div>
                        <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                          {cat.badge}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg font-black text-stone-900 group-hover:text-[#0B3A60] transition-colors mb-1">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-stone-500 font-medium leading-relaxed mb-4">
                        {cat.subtitle}
                      </p>
                    </div>

                    {/* Action Prompt */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#0B3A60]">
                      <span>استعرض الباقات</span>
                      <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quality & Trust Banner */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-800 text-xs mt-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-amber-700 flex-shrink-0" />
                  <div>
                    <span className="font-extrabold text-stone-900 block">ضمان الشفافية والأثر الاجتماعي المباشر</span>
                    <span className="text-stone-600">جميع عوائد واشتراكات الباقات تساهم في التمكين الاقتصادي للأسر المنتجة بمكة المكرمة.</span>
                  </div>
                </div>
                <div className="text-stone-700 font-bold text-[11px] bg-white px-3 py-1.5 rounded-xl border border-amber-200 shadow-xs whitespace-nowrap">
                  الاستشارات والتسجيل مجاني 100%
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PACKAGES DISPLAY FOR SELECTED CATEGORY */}
          {selectedCategory && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-5"
            >
              {/* Back to Categories Button Bar */}
              <div className="flex items-center justify-between bg-white p-3 sm:p-4 rounded-2xl border border-stone-200 shadow-xs">
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all cursor-pointer border border-stone-300"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>↩ العودة للفئات</span>
                </button>

                <div className="flex items-center gap-2 text-right">
                  <span className="text-xl">{selectedCategory.icon}</span>
                  <div>
                    <h2 className="font-extrabold text-sm sm:text-base text-stone-900">
                      باقات {selectedCategory.title}
                    </h2>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {selectedCategory.packages.length} باقات مخصصة مجهزة
                    </span>
                  </div>
                </div>
              </div>

              {/* Packages Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {selectedCategory.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`bg-white rounded-2xl p-5 border-2 flex flex-col justify-between transition-all relative shadow-sm hover:shadow-xl ${
                      pkg.isPopular 
                        ? 'border-amber-500 ring-2 ring-amber-500/20' 
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    {/* Popular Badge */}
                    {pkg.isPopular && (
                      <div className="absolute -top-3 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] font-black px-3 py-0.5 rounded-full shadow-md flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white" />
                        <span>الأكثر اختياراً</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      {/* Package Name & Badge */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-extrabold text-base text-stone-900">
                            {pkg.name}
                          </h3>
                        </div>
                        {pkg.badge && (
                          <span className="inline-block text-[10px] font-extrabold bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-0.5 rounded-full">
                            {pkg.badge}
                          </span>
                        )}
                        <p className="text-xs text-stone-600 mt-2 leading-relaxed min-h-[40px]">
                          {pkg.shortDescription}
                        </p>
                      </div>

                      {/* Price & Period Section */}
                      <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80 text-center">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-2xl font-black text-[#0B3A60]">
                            {pkg.price}
                          </span>
                        </div>
                        {pkg.period && (
                          <span className="text-[11px] text-stone-500 font-bold block mt-0.5">
                            المدة: {pkg.period}
                          </span>
                        )}
                      </div>

                      {/* Key Features List */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-extrabold text-stone-900 block border-b border-stone-100 pb-1">
                          المزايا والخدمات:
                        </span>
                        <ul className="space-y-2">
                          {pkg.features.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span className="leading-tight">{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-5 mt-5 border-t border-stone-100 space-y-2">
                      <button
                        type="button"
                        onClick={() => setSubscribingPackage({ pkg, category: selectedCategory })}
                        className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                          pkg.isPopular
                            ? 'bg-amber-500 hover:bg-amber-600 text-stone-950'
                            : 'bg-[#0B3A60] hover:bg-[#0B3A60]/90 text-white'
                        }`}
                      >
                        <Zap className="w-4 h-4" />
                        <span>اختيار الباقة / اشترك الآن</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDetailedPackage({ pkg, category: selectedCategory })}
                        className="w-full py-2 px-4 rounded-xl font-bold text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-stone-200"
                      >
                        <Info className="w-3.5 h-3.5 text-stone-500" />
                        <span>عرض التفاصيل الشاملة</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 p-3 sm:p-4 border-t border-stone-200 text-stone-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 flex-shrink-0">
          <div className="flex items-center gap-2 text-[11px] font-medium text-stone-600">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>جميع الباقات خاضعة لمعايير وتوجيهات تمكين الأسر المنتجة بمنصة ورث أجيال</span>
          </div>

          {selectedCategory && (
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-black text-[#0B3A60] hover:underline cursor-pointer"
            >
              ↩ العودة لاختيار فئة أخرى
            </button>
          )}
        </div>
      </motion.div>

      {/* 📖 DETAILED PACKAGE OVERLAY MODAL */}
      <AnimatePresence>
        {detailedPackage && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-6 max-w-xl w-full border border-stone-200 shadow-2xl text-right dir-rtl space-y-5 max-h-[85vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{detailedPackage.category.icon}</span>
                  <div>
                    <h3 className="font-extrabold text-lg text-stone-900">
                      {detailedPackage.pkg.name}
                    </h3>
                    <span className="text-xs text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      {detailedPackage.category.title}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDetailedPackage(null)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-stone-900">وصف الباقة الشامل:</h4>
                <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-200">
                  {detailedPackage.pkg.detailedDescription}
                </p>
              </div>

              {/* Price & Duration */}
              <div className="grid grid-cols-2 gap-3 bg-amber-50/50 p-3 rounded-xl border border-amber-200 text-xs">
                <div>
                  <span className="text-stone-500 block font-bold">السعر:</span>
                  <span className="text-base font-black text-[#0B3A60]">{detailedPackage.pkg.price}</span>
                </div>
                <div>
                  <span className="text-stone-500 block font-bold">المدة / الصلاحية:</span>
                  <span className="font-bold text-stone-800">{detailedPackage.pkg.period || 'غير محدد'}</span>
                </div>
              </div>

              {/* Included Services */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-stone-900">الخدمات والمزايا المشمولة:</h4>
                <div className="space-y-1.5">
                  {detailedPackage.pkg.includedServices.map((srv, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-700 bg-stone-50 p-2 rounded-lg border border-stone-150">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms & Conditions if any */}
              {detailedPackage.pkg.termsAndConditions && detailedPackage.pkg.termsAndConditions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-stone-900">الشروط والتوجيهات:</h4>
                  <ul className="list-disc list-inside text-[11px] text-stone-600 space-y-1 bg-stone-50 p-3 rounded-xl border border-stone-200">
                    {detailedPackage.pkg.termsAndConditions.map((term, tIdx) => (
                      <li key={tIdx}>{term}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDetailedPackage(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition-all cursor-pointer"
                >
                  إغلاق
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const target = detailedPackage;
                    setDetailedPackage(null);
                    setSubscribingPackage(target);
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-stone-950 px-5 py-2 rounded-xl text-xs font-black transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4" />
                  <span>اشترك الآن في الباقة</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 📝 SUBSCRIPTION / CHECKOUT FORM MODAL */}
      <AnimatePresence>
        {subscribingPackage && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-lg w-full border border-stone-200 shadow-2xl text-right dir-rtl space-y-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-base text-stone-900">
                    نموذج الاشتراك بالباقة 📝
                  </h3>
                  <p className="text-xs text-amber-800 font-bold mt-0.5">
                    {subscribingPackage.pkg.name} ({subscribingPackage.pkg.price})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubscribeSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-extrabold text-stone-800 mb-1">
                      الاسم الكامل <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="أدخل اسمك الكريم..."
                      value={subscriberName}
                      onChange={(e) => setSubscriberName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0B3A60] focus:bg-white text-right"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-extrabold text-stone-800 mb-1">
                      رقم الجوال والواتساب <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="05XXXXXXXX"
                      value={subscriberPhone}
                      onChange={(e) => setSubscriberPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0B3A60] focus:bg-white text-right dir-ltr"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-extrabold text-stone-800 mb-1">
                      البريد الإلكتروني (اختياري)
                    </label>
                    <input
                      type="email"
                      placeholder="example@domain.com"
                      value={subscriberEmail}
                      onChange={(e) => setSubscriberEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0B3A60] focus:bg-white text-right dir-ltr"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-extrabold text-stone-800 mb-1">
                      ملاحظات أو طلبات خاصة
                    </label>
                    <textarea
                      rows={2}
                      placeholder="أي استفسار أو تفاصيل إضافية تريد مشاركتها مع الفريق..."
                      value={subscriberNotes}
                      onChange={(e) => setSubscriberNotes(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0B3A60] focus:bg-white text-right"
                    />
                  </div>

                  {/* Pricing summary */}
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                    <span className="text-stone-700 font-bold">المبلغ المطلوب:</span>
                    <span className="font-black text-amber-900 text-sm">{subscribingPackage.pkg.price}</span>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition-all cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="bg-[#0B3A60] hover:bg-[#0B3A60]/90 text-white px-6 py-2.5 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>تأكيد طلب الاشتراك</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* SUCCESS RECEIPT */
                <div className="text-center space-y-4 py-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-4 border-emerald-50">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-black text-stone-900">تم تسجيل طلب اشتراكك بنجاح! 🎉</h4>
                    <p className="text-xs text-stone-600">
                      شكراً لك {subscriberName}. رقم تذكرة الاشتراك الخاص بك هو:
                    </p>
                    <div className="inline-block bg-amber-100 text-amber-900 font-mono font-black text-base px-4 py-1.5 rounded-xl border border-amber-300 mt-2">
                      {ticketNo}
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200 leading-relaxed max-w-sm mx-auto">
                    سيقوم ممثل خدمة العملاء ومستشار التمكين بالتواصل معك على الجوال ({subscriberPhone}) لإكمال تفعيل الباقة وتأكيد التفاصيل خلال أقل من ساعة.
                  </p>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="bg-[#0B3A60] text-white text-xs font-extrabold px-6 py-2.5 rounded-xl transition-all hover:bg-[#0B3A60]/90 cursor-pointer shadow-md inline-block"
                  >
                    تم، عودة للرئيسية
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
