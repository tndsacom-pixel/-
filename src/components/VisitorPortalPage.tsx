import { useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Ticket, 
  ArrowRight, 
  LogIn, 
  Star, 
  Sparkles, 
  Gift, 
  ShoppingBag, 
  ChevronLeft 
} from 'lucide-react';
import { ProducerFamily, Product } from '../types';

interface VisitorPortalPageProps {
  producers: ProducerFamily[];
  onSelectProducer: (producer: ProducerFamily) => void;
  onAddToCart?: (product: Product) => void;
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  renderWarathLogo: (sizeClass?: string) => ReactNode;
  renderThinkingLogo: (sizeClass?: string) => ReactNode;
  onChangeTrack?: () => void;
}

export default function VisitorPortalPage({
  producers,
  onSelectProducer,
  onAddToCart,
  onNavigateHome,
  onNavigateLogin,
  renderWarathLogo,
  renderThinkingLogo,
  onChangeTrack
}: VisitorPortalPageProps) {
  const { t, isEn } = useLanguage();
  const experiences = [
    {
      id: 'exp-1',
      title: 'ورشة غزل وحياكة السدو التراثي النجدي',
      location: 'الرياض - حي الطريف التاريخي',
      duration: 'ساعتان',
      price: 150,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
      producer: producers.find(p => p.id === 'producer-2') || producers[0]
    },
    {
      id: 'exp-2',
      title: 'تجربة إعداد القهوة السعودية الملكية وحمس البن',
      location: 'جدة - البلد التاريخية',
      duration: 'ساعة ونصف',
      price: 120,
      image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&auto=format&fit=crop&q=80',
      producer: producers.find(p => p.id === 'producer-3') || producers[0]
    },
    {
      id: 'exp-3',
      title: 'مأدبة العشاء التراثي الحجازي والتذوق التفاعلي',
      location: 'مكة المكرمة - حي العزيزية',
      duration: 'ساعتان ونص',
      price: 220,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
      producer: producers.find(p => p.id === 'producer-1') || producers[0]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 w-full max-w-full overflow-x-hidden" id="portal-visitors">
      {/* 🕌 Visitor Portal Context Sub-Bar */}
      <div className="bg-[#174F3E] text-white border-b border-[#C8A96B]/20 py-2.5 px-3 sm:px-6 shadow-sm w-full" id="portal-visitors-bar">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 w-full">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-base shrink-0">🕌</span>
            <div className={`min-w-0 ${isEn ? 'text-left' : 'text-right'}`}>
              <h1 className="font-extrabold text-xs sm:text-sm text-[#C8A96B] truncate">{t('portal.visitorTitle')}</h1>
              <p className="text-[10px] text-stone-300 hidden md:block truncate">{t('portal.visitorDesc')}</p>
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
      <section className="relative bg-gradient-to-b from-stone-900 via-emerald-950 to-stone-900 text-white py-10 sm:py-16 px-4 sm:px-8 overflow-hidden w-full">
        <div className="max-w-5xl mx-auto text-center space-y-5 relative z-10">
          <span className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-black px-4 py-1.5 rounded-full border border-emerald-400/30">
            ✨ اكتشف التراث السعودي الأصيل وروافد الثقافة المحلية
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
            تجارب حية مع الحرفيين والأسر <br />
            <span className="text-accent underline decoration-amber-500 underline-offset-8">واقتناء التذكارات الأصلية</span>
          </h2>

          <p className="text-stone-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            احجز تذكرتك لحضور ورش عمل حياكة السدو، صناعة البخور الدوسري، وحفلات التذوق التراثي برفقة الحرفيين المعتمدين لدى منصة إرث أجيال.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Heritage Experiences Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <h3 className="text-xl font-black text-stone-900">التجارب التراثية وورش العمل التفاعلية 🎨</h3>
              <p className="text-xs text-stone-500">احجز تجربتك الحية واكتشف قصة الصنعة والتراث بنفسك</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-white border border-stone-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between">
                <div>
                  <div className="h-48 overflow-hidden relative">
                    <img src={exp.image} alt={exp.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-xs text-accent text-[10px] font-black px-2.5 py-1 rounded-full">
                      {exp.duration}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h4 className="font-black text-stone-900 text-base leading-tight">{exp.title}</h4>
                    <p className="text-xs text-stone-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {exp.location}
                    </p>

                    {/* Producer Link */}
                    <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-900">تقديم: {exp.producer.brandName}</span>
                      <button
                        onClick={() => onSelectProducer(exp.producer)}
                        className="text-[10px] font-black text-primary hover:underline cursor-pointer"
                      >
                        الملف الشخصي 👤
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                  <span className="text-lg font-black text-primary font-mono">{exp.price} ر.س <span className="text-[10px] font-normal text-stone-400">/ للشخص</span></span>
                  <button
                    onClick={() => alert(`تم حجز تذكرة "${exp.title}" بنجاح! 🎉`)}
                    className="bg-primary hover:bg-primary/95 text-accent font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Ticket className="w-4 h-4 text-accent" />
                    <span>حجز التذكرة</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Participating Craft Families */}
        <section className="bg-stone-900 text-white rounded-3xl p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-700 pb-4">
            <div>
              <h3 className="text-xl font-black">أسر الحرف والتراث المشاركة 🧵🏺</h3>
              <p className="text-xs text-stone-400">يمكنك الدخول إلى ملف الأسرة لطباعة باركود الـ QR واقتناء تذكاراتك</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {producers.map((producer) => (
              <div
                key={producer.id}
                onClick={() => onSelectProducer(producer)}
                className="bg-stone-800 border border-stone-700 p-4 rounded-2xl hover:border-accent transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img src={producer.logoUrl} alt={producer.brandName} className="w-12 h-12 rounded-xl object-cover border border-accent/30" />
                  <div className="text-right min-w-0 flex-1">
                    <h4 className="font-extrabold text-xs text-white truncate">{producer.brandName}</h4>
                    <span className="text-[10px] text-accent font-bold block">{producer.city}</span>
                  </div>
                </div>
                <p className="text-[11px] text-stone-300 line-clamp-2">{producer.specialty}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
