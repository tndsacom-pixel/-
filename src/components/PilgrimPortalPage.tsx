import { useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Building2, 
  Calendar, 
  Clock, 
  ShoppingBag, 
  ArrowRight, 
  LogIn, 
  CheckCircle, 
  MapPin, 
  Phone, 
  Star, 
  Gift, 
  Truck, 
  Sparkles, 
  ShieldCheck, 
  Heart,
  ChevronLeft
} from 'lucide-react';
import { ProducerFamily, Product } from '../types';

interface PilgrimPortalPageProps {
  producers: ProducerFamily[];
  onSelectProducer: (producer: ProducerFamily) => void;
  onAddToCart?: (product: Product) => void;
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  renderWarathLogo: (sizeClass?: string) => ReactNode;
  renderThinkingLogo: (sizeClass?: string) => ReactNode;
  onChangeTrack?: () => void;
}

export default function PilgrimPortalPage({
  producers,
  onSelectProducer,
  onAddToCart,
  onNavigateHome,
  onNavigateLogin,
  renderWarathLogo,
  renderThinkingLogo,
  onChangeTrack
}: PilgrimPortalPageProps) {
  const { t, isEn } = useLanguage();
  const [selectedCity, setSelectedCity] = useState('مكة المكرمة');
  const [selectedHotel, setSelectedHotel] = useState('فندق فيرمونت برج الساعة - مكة');
  const [deliveryDate, setDeliveryDate] = useState('2026-08-03');
  const [deliveryTime, setDeliveryTime] = useState('07:30 مساءً (بعد صلاة العشاء)');

  // Collect all culinary & pilgrim products across producing families
  const pilgrimMeals = producers.flatMap(p => 
    p.products.map(prod => ({
      ...prod,
      producer: p
    }))
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 w-full max-w-full overflow-x-hidden" id="portal-pilgrims">
      {/* 🕋 Pilgrim Portal Context Sub-Bar */}
      <div className="bg-[#174F3E] text-white border-b border-[#C8A96B]/20 py-2.5 px-3 sm:px-6 shadow-sm w-full" id="portal-pilgrims-bar">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 w-full">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-base shrink-0">🕋</span>
            <div className={`min-w-0 ${isEn ? 'text-left' : 'text-right'}`}>
              <h1 className="font-extrabold text-xs sm:text-sm text-[#C8A96B] truncate">{t('portal.pilgrimTitle')}</h1>
              <p className="text-[10px] text-stone-300 hidden md:block truncate">{t('portal.pilgrimDesc')}</p>
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
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-stone-900 via-primary to-stone-900 text-white py-10 sm:py-14 px-4 sm:px-8 overflow-hidden w-full">
        <div className="max-w-5xl mx-auto text-center space-y-5 relative z-10">
          <span className="inline-flex items-center gap-2 bg-accent/20 text-accent text-xs font-black px-4 py-1.5 rounded-full border border-accent/30">
            🕋 طعام مبارك بأيدي أسر مكية ومدنية معتمدة
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
            الوجبات الحجازية والضيافة التراثية <br />
            <span className="text-accent underline decoration-amber-500 underline-offset-8">تصل مباشرة إلى غرفتك بالفندق</span>
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            استمتع بأطيب المأكولات التراثية المحضرة بطازجية عالية من الأسر المنتجة المحلية، ودعم تمكين مجتمع مكة المكرمة والمدينة المنورة.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">

        {/* 1. Hotel & Delivery Selector */}
        <section className="bg-white border-2 border-primary/20 rounded-3xl p-6 md:p-8 shadow-lg space-y-6">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-accent text-primary font-black flex items-center justify-center text-lg">
              📍
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base">تحديد وجهة وموعد التوصيل للفندق</h3>
              <p className="text-xs text-stone-500">اختر مدينتك وفندقك لضمان التوصيل الساخن والمباشر</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">المدينة المباركة</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-right font-bold focus:bg-white focus:ring-2 focus:ring-primary"
              >
                <option value="مكة المكرمة">مكة المكرمة 🕋</option>
                <option value="المدينة المنورة">المدينة المنورة 🕌</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">الفندق أو مكان الإقامة</label>
              <input
                type="text"
                value={selectedHotel}
                onChange={(e) => setSelectedHotel(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-right font-bold focus:bg-white focus:ring-2 focus:ring-primary"
                placeholder="اسم الفندق والرقم"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">تاريخ التوصيل المطلوب</label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-center font-bold focus:bg-white focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">موعد التسليم المفصل</label>
              <select
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-right font-bold focus:bg-white focus:ring-2 focus:ring-primary"
              >
                <option value="07:30 مساءً (بعد صلاة العشاء)">بعد صلاة العشاء 🌙</option>
                <option value="01:30 ظهراً (بعد صلاة الظهر)">بعد صلاة الظهر ☀️</option>
                <option value="05:30 فجراً (بعد الإشراق)">بعد صلاة الفجر 🌅</option>
              </select>
            </div>
          </div>
        </section>

        {/* 2. Dynamic Meals & Producer Binding */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <h3 className="text-xl font-black text-stone-900">وجبات وأطعمة المعتمرين التراثية 🍲</h3>
              <p className="text-xs text-stone-500">من إعداد الأسر المنتجة المعتمدة بمكة والمدينة — انقر على اسم الأسرة لاستعراض قصتها</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-200">
              توصيل مجاني لجميع باقات الجود المكي ✓
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pilgrimMeals.map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-stone-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-stone-900/90 text-accent font-black text-[10px] px-2.5 py-1 rounded-full border border-accent/20">
                      طازج طهي يومي
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h4 className="font-black text-stone-900 text-base leading-tight">{item.name}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">{item.description}</p>

                    {/* DYNAMIC PRODUCER FAMILY BINDING 🔗 */}
                    <div className="bg-amber-50/80 border border-amber-200/80 p-3 rounded-2xl flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <img 
                          src={item.producer.logoUrl} 
                          alt={item.producer.brandName} 
                          className="w-8 h-8 rounded-xl object-cover border border-amber-300" 
                        />
                        <div className="text-right">
                          <span className="text-[10px] text-amber-800 font-bold block">من إعداد:</span>
                          <span className="text-xs font-black text-stone-900 block truncate max-w-[150px]">
                            {item.producer.brandName}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectProducer(item.producer)}
                        className="bg-accent text-primary hover:bg-amber-400 font-black px-2.5 py-1 rounded-lg text-[10px] transition-all cursor-pointer whitespace-nowrap shadow-xs"
                      >
                        زيارة صفحة الأسرة 👩‍🍳
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 block">السعر شامل التوصيل</span>
                    <span className="text-base font-black text-primary font-mono">{item.price} ر.س</span>
                  </div>

                  <button
                    onClick={() => {
                      if (onAddToCart) onAddToCart(item);
                      alert(`تمت إضافة وجبة "${item.name}" لسلة حجز المعتمر! 🕋`);
                    }}
                    className="bg-primary hover:bg-primary/95 text-accent font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>حجز الوجبة</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Pilgrim Packages */}
        <section className="bg-gradient-to-r from-stone-900 via-primary to-stone-900 text-white rounded-3xl p-8 md:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-accent text-xs font-black uppercase">باقات التكافل والضيافة</span>
              <h3 className="text-2xl font-black mt-1">باقات «الجود المكي» الشاملة 🎁</h3>
            </div>
            <p className="text-xs text-stone-300 max-w-md">تشمل الوجبات اليومية، التمور، القهوة السعودية، والهدايا التذكارية</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl space-y-4">
              <span className="bg-accent/20 text-accent text-[10px] font-black px-2.5 py-1 rounded-full border border-accent/30">
                باقة المعتمر الفضية
              </span>
              <h4 className="font-extrabold text-lg text-white">وجبة يومية + قهوة وسدر</h4>
              <p className="text-xs text-stone-300 leading-relaxed">3 وجبات حجازية طازجة على مدار 3 أيام مع قهوة سعودية ملكية وتمر فاخر.</p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xl font-black text-accent font-mono">190 ر.س</span>
                <button 
                  onClick={() => alert('تم تفعيل طلب باقة المعتمر الفضية.')}
                  className="bg-accent text-primary font-black px-4 py-1.5 rounded-xl text-xs hover:bg-amber-400 cursor-pointer"
                >
                  اشتراك الآن
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-b from-amber-500/30 to-amber-700/30 backdrop-blur-md border-2 border-amber-400/60 p-6 rounded-2xl space-y-4 relative">
              <span className="bg-amber-400 text-primary text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                الأكثر طلباً 👑
              </span>
              <h4 className="font-extrabold text-lg text-white">باقة الجود الذهبية الكاملة</h4>
              <p className="text-xs text-amber-100 leading-relaxed">وجبات إفطار وعشاء يومية مع مأدبة ضيافة خاصة لـ 5 أشخاص وهدية بخور دوسري.</p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xl font-black text-amber-300 font-mono">420 ر.س</span>
                <button 
                  onClick={() => alert('تم تفعيل طلب باقة الجود الذهبية.')}
                  className="bg-amber-400 text-primary font-black px-4 py-1.5 rounded-xl text-xs hover:bg-white cursor-pointer"
                >
                  حجز الباقة
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl space-y-4">
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-400/30">
                باقة التبرع والسقيا
              </span>
              <h4 className="font-extrabold text-lg text-white">سقيا وإطعام المعتمرين</h4>
              <p className="text-xs text-stone-300 leading-relaxed">تجهيز 10 وجبات طازجة باسمك أو اسم والديك وتوزيعها على زوار الحرمين.</p>
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xl font-black text-accent font-mono">250 ر.س</span>
                <button 
                  onClick={() => alert('جزاك الله خيراً! تم تسليم طلب السقيا والإطعام.')}
                  className="bg-white text-stone-900 font-black px-4 py-1.5 rounded-xl text-xs hover:bg-stone-100 cursor-pointer"
                >
                  تبرع الآن
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
