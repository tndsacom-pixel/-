import React from 'react';
import { PRODUCTIVE_FAMILIES, HERITAGE_PRODUCTS, HeritageProduct } from '../data/familiesData';
import { useLanguage } from '../context/LanguageContext';
import { RiskManagementSection } from './RiskManagementSection';

interface MainLandingSectionsProps {
  setLandingView: (view: string) => void;
  setSelectedProduct: (product: HeritageProduct | null) => void;
  setShowSupport: (show: boolean) => void;
  setSupportInitialInfo: (info: { familyName?: string; familyCode?: string; message?: string } | null) => void;
}

export const MainLandingSections: React.FC<MainLandingSectionsProps> = ({
  setLandingView,
  setSelectedProduct,
  setShowSupport,
  setSupportInitialInfo,
}) => {
  const { t, isEn } = useLanguage();

  return (
    <div className={`space-y-16 animate-fade-in ${isEn ? 'text-left' : 'text-right'}`} id="landing-sections-wrapper" dir={isEn ? 'ltr' : 'rtl'}>
      
      {/* 🟢 1. بطاقات الخدمات الرئيسية (6 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" id="main-services-cards">
        {/* Card 1: اطلب الآن */}
        <div 
          onClick={() => { setLandingView('standalone_store'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          className="bg-white border border-stone-200 hover:border-amber-500 p-5 rounded-2xl text-center space-y-3 cursor-pointer transition-all shadow-xs hover:shadow-lg"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-2xl mx-auto font-black">🛍️</div>
          <h3 className="font-black text-stone-900 text-sm">{t('card.order')}</h3>
          <p className="text-stone-500 text-[11px] font-normal leading-relaxed">{t('card.orderDesc')}</p>
        </div>

        {/* Card 2: احجز تجربة أو مساحة */}
        <div 
          onClick={() => { window.location.hash = '#/portal/visitors'; }} 
          className="bg-white border border-stone-200 hover:border-emerald-500 p-5 rounded-2xl text-center space-y-3 cursor-pointer transition-all shadow-xs hover:shadow-lg"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center text-2xl mx-auto font-black">📍</div>
          <h3 className="font-black text-stone-900 text-sm">{t('card.book')}</h3>
          <p className="text-stone-500 text-[11px] font-normal leading-relaxed">{t('card.bookDesc')}</p>
        </div>

        {/* Card 3: أنا أسرة منتجة */}
        <div 
          onClick={() => { setLandingView('family_landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          className="bg-white border border-amber-300 hover:border-amber-600 p-5 rounded-2xl text-center space-y-3 cursor-pointer transition-all shadow-xs hover:shadow-lg bg-gradient-to-b from-amber-50/40 to-white"
        >
          <div className="w-12 h-12 rounded-2xl bg-stone-900 text-[#C8A96B] flex items-center justify-center text-2xl mx-auto font-black">👩‍🍳</div>
          <h3 className="font-black text-stone-900 text-sm">{t('card.producer')}</h3>
          <p className="text-stone-500 text-[11px] font-normal leading-relaxed">{t('card.producerDesc')}</p>
        </div>

        {/* Card 4: التدريب والتأهيل */}
        <div 
          onClick={() => { setLandingView('standalone_services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          className="bg-white border border-stone-200 hover:border-blue-500 p-5 rounded-2xl text-center space-y-3 cursor-pointer transition-all shadow-xs hover:shadow-lg"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center text-2xl mx-auto font-black">🎓</div>
          <h3 className="font-black text-stone-900 text-sm">{t('card.training')}</h3>
          <p className="text-stone-500 text-[11px] font-normal leading-relaxed">{t('card.trainingDesc')}</p>
        </div>

        {/* Card 5: الشركاء والجهات */}
        <div 
          onClick={() => { window.location.hash = '#/portal/partners'; }} 
          className="bg-white border border-stone-200 hover:border-purple-500 p-5 rounded-2xl text-center space-y-3 cursor-pointer transition-all shadow-xs hover:shadow-lg"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center text-2xl mx-auto font-black">🤝</div>
          <h3 className="font-black text-stone-900 text-sm">{t('card.partners')}</h3>
          <p className="text-stone-500 text-[11px] font-normal leading-relaxed">{t('card.partnersDesc')}</p>
        </div>

        {/* Card 6: عن إرث أجيال */}
        <div 
          onClick={() => { setLandingView('standalone_about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
          className="bg-white border border-stone-200 hover:border-emerald-500 p-5 rounded-2xl text-center space-y-3 cursor-pointer transition-all shadow-xs hover:shadow-lg"
        >
          <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center text-2xl mx-auto font-black">🇸🇦</div>
          <h3 className="font-black text-stone-900 text-sm">{t('card.about')}</h3>
          <p className="text-stone-500 text-[11px] font-normal leading-relaxed">{t('card.aboutDesc')}</p>
        </div>
      </div>

      {/* 🟢 2. شريط المميزات (5 Items) */}
      <div className="bg-gradient-to-r from-[#174F3E] via-[#0D3B2E] to-stone-900 text-[#C8A96B] p-5 md:p-6 rounded-2xl shadow-md border border-amber-400/20" id="features-strip">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-amber-400/20">
          <div className="p-2 space-y-1">
            <span className="text-xl block">🛡️</span>
            <h4 className="font-black text-xs md:text-sm text-white">{t('feat.quality')}</h4>
            <p className="text-[10px] text-stone-300 font-light">{isEn ? 'Verified health & quality' : 'فحص وتراخيص صحية موثقة'}</p>
          </div>
          <div className="p-2 space-y-1 pt-3 md:pt-2">
            <span className="text-xl block">🎧</span>
            <h4 className="font-black text-xs md:text-sm text-white">{t('feat.support')}</h4>
            <p className="text-[10px] text-stone-300 font-light">{isEn ? '24/7 dedicated assistance' : 'فريق خدمة وإشراف دائم'}</p>
          </div>
          <div className="p-2 space-y-1 pt-3 md:pt-2">
            <span className="text-xl block">💳</span>
            <h4 className="font-black text-xs md:text-sm text-white">{t('feat.payment')}</h4>
            <p className="text-[10px] text-stone-300 font-light">{isEn ? 'Mada, Apple Pay & Cards' : 'مدى، Apple Pay والدفع الآمن'}</p>
          </div>
          <div className="p-2 space-y-1 pt-3 md:pt-2">
            <span className="text-xl block">🚚</span>
            <h4 className="font-black text-xs md:text-sm text-white">{t('feat.delivery')}</h4>
            <p className="text-[10px] text-stone-300 font-light">{isEn ? 'Hotels & residence delivery' : 'توصيل للفنادق والمنازل'}</p>
          </div>
          <div className="p-2 space-y-1 pt-3 md:pt-2 col-span-2 md:col-span-1">
            <span className="text-xl block">🏅</span>
            <h4 className="font-black text-xs md:text-sm text-white">{t('feat.verified')}</h4>
            <p className="text-[10px] text-stone-300 font-light">{isEn ? 'Official capability testing' : 'تأهيل واختبار جدارة رسمية'}</p>
          </div>
        </div>
      </div>

      {/* 🟢 3. أثرنا بالأرقام (Our Impact in Numbers) */}
      <div className="bg-white border border-stone-200 p-6 md:p-8 rounded-3xl space-y-6 shadow-xs" id="impact-statistics">
        <div className="text-center space-y-1">
          <span className="text-[#C8A96B] text-xs font-black bg-amber-100/60 text-amber-900 px-3.5 py-1 rounded-full border border-amber-300/50 inline-block">
            {t('impact.title')}
          </span>
          <h2 className="font-black text-stone-900 text-2xl md:text-3xl">
            {isEn ? 'Erth Ajyal Achievements' : 'إنجازات إرث أجيال'}
          </h2>
          <p className="text-stone-500 text-xs md:text-sm font-medium">
            {t('impact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-1">
            <span className="text-2xl md:text-3xl font-black text-[#174F3E] font-mono block">{t('impact.producers')}</span>
            <span className="text-stone-600 text-xs font-bold block">{t('impact.producersLabel')}</span>
          </div>
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-1">
            <span className="text-2xl md:text-3xl font-black text-[#174F3E] font-mono block">{t('impact.orders')}</span>
            <span className="text-stone-600 text-xs font-bold block">{t('impact.ordersLabel')}</span>
          </div>
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-1">
            <span className="text-2xl md:text-3xl font-black text-[#174F3E] font-mono block">{t('impact.experiences')}</span>
            <span className="text-stone-600 text-xs font-bold block">{t('impact.experiencesLabel')}</span>
          </div>
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-1">
            <span className="text-2xl md:text-3xl font-black text-[#174F3E] font-mono block">{t('impact.rating')}</span>
            <span className="text-stone-600 text-xs font-bold block">{t('impact.ratingLabel')}</span>
          </div>
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl space-y-1 col-span-2 md:col-span-1">
            <span className="text-2xl md:text-3xl font-black text-[#174F3E] font-mono block">{t('impact.partners')}</span>
            <span className="text-stone-600 text-xs font-bold block">{t('impact.partnersLabel')}</span>
          </div>
        </div>
      </div>

      {/* 🟢 4. ماذا تجد في إرث أجيال؟ (What does Erth Ajyal offer?) */}
      <div className="bg-white border border-stone-200 p-6 md:p-10 rounded-3xl space-y-8 shadow-xs" id="erth-what-offers">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[#C8A96B] text-xs font-black bg-amber-100/60 text-amber-900 px-3.5 py-1 rounded-full border border-amber-300/50 inline-block">
            {isEn ? 'Ecosystem Offerings' : 'خدمات وتخصصات المنظومة'}
          </span>
          <h2 className="font-black text-stone-900 text-2xl md:text-3xl">
            {t('find.title')}
          </h2>
          <p className="text-stone-600 text-xs md:text-sm font-medium">
            {t('find.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-stone-50 border border-stone-200/80 p-4 rounded-2xl text-center space-y-2 hover:border-amber-400 transition-all">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-xl mx-auto font-black shadow-inner">🛍️</div>
            <h3 className="font-black text-stone-900 text-xs">{t('find.products')}</h3>
            <p className="text-stone-500 text-[10px] leading-relaxed">{t('find.productsDesc')}</p>
          </div>

          <div className="bg-stone-50 border border-stone-200/80 p-4 rounded-2xl text-center space-y-2 hover:border-emerald-400 transition-all">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center text-xl mx-auto font-black shadow-inner">📍</div>
            <h3 className="font-black text-stone-900 text-xs">{t('find.experiences')}</h3>
            <p className="text-stone-500 text-[10px] leading-relaxed">{t('find.experiencesDesc')}</p>
          </div>

          <div className="bg-stone-50 border border-stone-200/80 p-4 rounded-2xl text-center space-y-2 hover:border-amber-400 transition-all">
            <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-900 flex items-center justify-center text-xl mx-auto font-black shadow-inner">☕</div>
            <h3 className="font-black text-stone-900 text-xs">{t('find.hospitality')}</h3>
            <p className="text-stone-500 text-[10px] leading-relaxed">{t('find.hospitalityDesc')}</p>
          </div>

          <div className="bg-stone-50 border border-stone-200/80 p-4 rounded-2xl text-center space-y-2 hover:border-purple-400 transition-all">
            <div className="w-11 h-11 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center text-xl mx-auto font-black shadow-inner">🎁</div>
            <h3 className="font-black text-stone-900 text-xs">{t('find.gifts')}</h3>
            <p className="text-stone-500 text-[10px] leading-relaxed">{t('find.giftsDesc')}</p>
          </div>

          <div className="bg-stone-50 border border-stone-200/80 p-4 rounded-2xl text-center space-y-2 hover:border-blue-400 transition-all">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-900 flex items-center justify-center text-xl mx-auto font-black shadow-inner">🕋</div>
            <h3 className="font-black text-stone-900 text-xs">{t('find.pilgrim')}</h3>
            <p className="text-stone-500 text-[10px] leading-relaxed">{t('find.pilgrimDesc')}</p>
          </div>

          <div className="bg-stone-50 border border-stone-200/80 p-4 rounded-2xl text-center space-y-2 hover:border-emerald-400 transition-all col-span-2 md:col-span-1">
            <div className="w-11 h-11 rounded-2xl bg-stone-900 text-[#C8A96B] flex items-center justify-center text-xl mx-auto font-black shadow-inner">🤝</div>
            <h3 className="font-black text-stone-900 text-xs">{t('find.empowerment')}</h3>
            <p className="text-stone-500 text-[10px] leading-relaxed">{t('find.empowermentDesc')}</p>
          </div>
        </div>
      </div>

      {/* 🟢 5. ماذا تريد أن تفعل؟ (4 Portals) */}
      <div className="bg-stone-50 border border-stone-200 p-6 md:p-10 rounded-3xl space-y-8" id="pathways-cards">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-emerald-800 text-xs font-black bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300 inline-block">
            {isEn ? 'Choose Goal' : 'حدد هدفك'}
          </span>
          <h2 className="font-black text-stone-900 text-2xl md:text-3xl">
            {t('do.title')}
          </h2>
          <p className="text-stone-600 text-xs md:text-sm font-medium">
            {t('do.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: أريد الشراء */}
          <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 hover:border-amber-500 transition-all shadow-xs hover:shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-2xl font-black">
                🛍️
              </div>
              <h3 className="font-black text-stone-900 text-lg">{t('do.path1Title')}</h3>
              <p className="text-stone-600 text-xs font-normal leading-relaxed">
                {t('do.path1Desc')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setLandingView('standalone_store');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full bg-[#174F3E] hover:bg-[#0D3B2E] text-[#C8A96B] font-bold py-3 px-4 rounded-xl text-xs transition-all cursor-pointer shadow-sm text-center"
            >
              {isEn ? 'Browse Store ↗' : 'تصفح المتجر ↗'}
            </button>
          </div>

          {/* Card 2: أنا معتمر أو زائر */}
          <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 hover:border-emerald-500 transition-all shadow-xs hover:shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center text-2xl font-black">
                🕋
              </div>
              <h3 className="font-black text-stone-900 text-lg">{t('do.path2Title')}</h3>
              <p className="text-stone-600 text-xs font-normal leading-relaxed">
                {t('do.path2Desc')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                window.location.hash = '#/portal/visitors';
              }}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all cursor-pointer shadow-sm text-center"
            >
              {isEn ? 'Discover Visitor Track ↗' : 'اكتشف تجربة الزائر ↗'}
            </button>
          </div>

          {/* Card 3: أنا أسرة منتجة */}
          <div className="bg-white border border-amber-300 p-6 rounded-3xl space-y-4 hover:border-amber-600 transition-all shadow-md hover:shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className={`absolute top-0 ${isEn ? 'left-0 rounded-br-xl' : 'right-0 rounded-bl-xl'} bg-amber-500 text-stone-950 text-[9px] font-black px-3 py-1`}>
              {isEn ? 'Dedicated Portal' : 'بوابة منفصلة'}
            </div>
            <div className="space-y-3 pt-1">
              <div className="w-12 h-12 rounded-2xl bg-stone-900 text-[#C8A96B] flex items-center justify-center text-2xl font-black">
                👩‍🍳
              </div>
              <h3 className="font-black text-stone-900 text-lg">{t('do.path3Title')}</h3>
              <p className="text-stone-600 text-xs font-normal leading-relaxed">
                {t('do.path3Desc')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setLandingView('family_landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full bg-stone-900 hover:bg-stone-800 text-[#C8A96B] font-bold py-3 px-4 rounded-xl text-xs transition-all cursor-pointer shadow-sm text-center"
            >
              {isEn ? 'Productive Families Portal ↗' : 'بوابة الأسرة المنتجة ↗'}
            </button>
          </div>

          {/* Card 4: أنا جهة أو شريك */}
          <div className="bg-white border border-stone-200 p-6 rounded-3xl space-y-4 hover:border-purple-500 transition-all shadow-xs hover:shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-900 flex items-center justify-center text-2xl font-black">
                🤝
              </div>
              <h3 className="font-black text-stone-900 text-lg">{t('do.path4Title')}</h3>
              <p className="text-stone-600 text-xs font-normal leading-relaxed">
                {t('do.path4Desc')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                window.location.hash = '#/portal/partners';
              }}
              className="w-full bg-purple-800 hover:bg-purple-900 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all cursor-pointer shadow-sm text-center"
            >
              {isEn ? 'Partners Portal ↗' : 'بوابة الشركاء ↗'}
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 6. قسم «عن إرث أجيال» (About Erth Ajyal) */}
      <div className="bg-white border border-stone-200 p-8 md:p-12 rounded-3xl shadow-sm space-y-6" id="about-erth-section">
        <div className="max-w-3xl space-y-4">
          <span className="text-[#C8A96B] text-xs font-black bg-amber-100/60 text-amber-900 px-3.5 py-1 rounded-full border border-amber-300/50 inline-block">
            {t('about.title')}
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-stone-900">
            {isEn ? 'What is Erth Ajyal?' : 'ما هو إرث أجيال؟'}
          </h2>
          <p className="text-stone-700 text-sm md:text-base leading-relaxed font-normal">
            {t('about.text')}
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setLandingView('standalone_about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 px-6 rounded-xl text-xs transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
            >
              <span>{t('about.discover')} ↗</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 7. رحلة التمكين (من المهارة إلى التمكين - Timeline) */}
      <div className="bg-[#FCFBF7] text-[#19352D] p-8 md:p-12 rounded-3xl space-y-8 shadow-xs border border-stone-200/80" id="empowerment-journey-section">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[#174F3E] text-xs font-black bg-[#DDE9E1] px-3.5 py-1 rounded-full border border-[#174F3E]/20 inline-block">
            {isEn ? 'Economic Transformation Track' : 'مسار التحول الاقتصادي'}
          </span>
          <h2 className="font-black text-2xl md:text-3xl text-[#174F3E]">
            {t('journey.title')}
          </h2>
          <p className="text-[#6B756F] text-xs md:text-sm font-normal">
            {t('journey.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
          <div className="bg-white border border-stone-200/80 p-4 rounded-2xl space-y-2 text-start shadow-2xs">
            <span className="w-8 h-8 rounded-full bg-[#174F3E] text-white font-black text-xs flex items-center justify-center">1</span>
            <h3 className="font-black text-[#174F3E] text-sm">{t('journey.step1')}</h3>
            <p className="text-[#6B756F] text-[11px] font-light leading-relaxed">{t('journey.step1Desc')}</p>
          </div>

          <div className="bg-white border border-stone-200/80 p-4 rounded-2xl space-y-2 text-start shadow-2xs">
            <span className="w-8 h-8 rounded-full bg-[#174F3E] text-white font-black text-xs flex items-center justify-center">2</span>
            <h3 className="font-black text-[#174F3E] text-sm">{t('journey.step2')}</h3>
            <p className="text-[#6B756F] text-[11px] font-light leading-relaxed">{t('journey.step2Desc')}</p>
          </div>

          <div className="bg-white border border-stone-200/80 p-4 rounded-2xl space-y-2 text-start shadow-2xs">
            <span className="w-8 h-8 rounded-full bg-[#174F3E] text-white font-black text-xs flex items-center justify-center">3</span>
            <h3 className="font-black text-[#174F3E] text-sm">{t('journey.step3')}</h3>
            <p className="text-[#6B756F] text-[11px] font-light leading-relaxed">{t('journey.step3Desc')}</p>
          </div>

          <div className="bg-white border border-stone-200/80 p-4 rounded-2xl space-y-2 text-start shadow-2xs">
            <span className="w-8 h-8 rounded-full bg-[#174F3E] text-white font-black text-xs flex items-center justify-center">4</span>
            <h3 className="font-black text-[#174F3E] text-sm">{t('journey.step4')}</h3>
            <p className="text-[#6B756F] text-[11px] font-light leading-relaxed">{t('journey.step4Desc')}</p>
          </div>

          <div className="bg-white border border-stone-200/80 p-4 rounded-2xl space-y-2 text-start shadow-2xs">
            <span className="w-8 h-8 rounded-full bg-[#174F3E] text-white font-black text-xs flex items-center justify-center">5</span>
            <h3 className="font-black text-[#174F3E] text-sm">{t('journey.step5')}</h3>
            <p className="text-[#6B756F] text-[11px] font-light leading-relaxed">{t('journey.step5Desc')}</p>
          </div>

          <div className="bg-white border border-stone-200/80 p-4 rounded-2xl space-y-2 text-start shadow-2xs">
            <span className="w-8 h-8 rounded-full bg-[#C8A96B] text-white font-black text-xs flex items-center justify-center">6</span>
            <h3 className="font-black text-[#174F3E] text-sm">{t('journey.step6')}</h3>
            <p className="text-[#6B756F] text-[11px] font-light leading-relaxed">{t('journey.step6Desc')}</p>
          </div>
        </div>
      </div>

      {/* 🟢 8. المتجر التراثي (اكتشف منتجات إرث أجيال) */}
      <div className="bg-stone-50 border border-stone-200 p-6 md:p-10 rounded-3xl space-y-8" id="featured-store-preview">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[#C8A96B] text-xs font-black bg-amber-100/60 text-amber-900 px-3.5 py-1 rounded-full border border-amber-300/50 inline-block">
            {isEn ? 'Heritage Store' : 'المتجر التراثي'}
          </span>
          <h2 className="font-black text-stone-900 text-2xl md:text-3xl">
            {t('prod.title')}
          </h2>
          <p className="text-stone-500 text-xs md:text-sm font-medium">
            {t('prod.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {HERITAGE_PRODUCTS.slice(0, 3).map((prod) => (
            <div 
              key={prod.id}
              className="bg-white border border-stone-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden bg-stone-200">
                <img 
                  src={prod.image} 
                  alt={prod.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
                <span className={`absolute top-3 ${isEn ? 'left-3' : 'right-3'} bg-stone-900/90 backdrop-blur-xs text-[#C8A96B] text-[10px] font-bold px-2.5 py-1 rounded-lg`}>
                  {prod.category === 'culinary' || prod.category === 'food' ? (isEn ? '🍲 Culinary' : '🍲 طهي تراثي') : (isEn ? '🏺 Handicraft' : '🏺 حرفة يدوية')}
                </span>
              </div>
              <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span>👩‍🍳 {prod.family}</span>
                    <span className="text-amber-600 font-bold">⭐ {prod.rating}</span>
                  </div>
                  <h3 className="font-extrabold text-stone-900 text-sm">{prod.title}</h3>
                  <p className="text-stone-500 text-[11px] line-clamp-2 font-normal leading-relaxed">{prod.desc}</p>
                </div>
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-2">
                  <span className="font-black text-[#174F3E] text-base font-mono">{prod.price} {t('prod.sar')}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(prod)}
                    className="bg-[#174F3E] hover:bg-[#0D3B2E] text-[#C8A96B] font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer shadow-2xs"
                  >
                    {isEn ? 'Quick Order 🛒' : 'طلب سريع 🛒'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => {
              setLandingView('standalone_store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-stone-900 hover:bg-stone-800 text-white font-black py-3.5 px-8 rounded-2xl text-xs sm:text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <span>{t('prod.exploreStore')} 🛍️</span>
          </button>
        </div>
      </div>

      {/* 🟢 9. الأسر المنتجة (تعرف على الأسر المنتجة - Certified Families) */}
      <div className="bg-white border border-stone-200 p-6 md:p-10 rounded-3xl space-y-8" id="certified-families-section">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="space-y-2">
            <span className="text-[#C8A96B] text-xs font-black bg-amber-100/60 text-amber-900 px-3.5 py-1 rounded-full border border-amber-300/50 inline-block">
              {isEn ? 'Verified Families' : 'الأسر المعتمدة'}
            </span>
            <h2 className="font-black text-stone-900 text-2xl md:text-3xl">
              {t('producers.title')}
            </h2>
            <p className="text-stone-500 text-xs md:text-sm font-medium">
              {t('producers.subtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setLandingView('family_landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-stone-900 hover:bg-stone-800 text-[#C8A96B] font-bold px-5 py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-2xs self-start md:self-auto"
          >
            {isEn ? 'Productive Families Portal ↗' : 'بوابة الأسر المنتجة ↗'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTIVE_FAMILIES.slice(0, 3).map((fam) => (
            <div 
              key={fam.id}
              className="bg-stone-50 border border-stone-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden bg-stone-200">
                <img 
                  src={fam.banner} 
                  alt={fam.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent"></div>
                <span className={`absolute top-3 ${isEn ? 'left-3' : 'right-3'} bg-[#174F3E] text-[#C8A96B] text-[10px] font-black px-2.5 py-1 rounded-lg border border-[#C8A96B]/30 flex items-center gap-1 shadow-md`}>
                  <span>🏅 {t('producers.verified')}</span>
                </span>
                <span className={`absolute top-3 ${isEn ? 'right-3' : 'left-3'} bg-amber-100/90 text-amber-900 font-mono text-[10px] font-black px-2 py-0.5 rounded-md border border-amber-300`}>
                  ERG-000{fam.id}
                </span>
                <span className={`absolute bottom-3 ${isEn ? 'left-3' : 'right-3'} text-white text-xs font-black`}>
                  📍 {fam.region}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="bg-amber-100 text-amber-900 font-extrabold px-2.5 py-0.5 rounded-full text-[10px]">
                      {fam.category}
                    </span>
                    <span className="text-amber-600 font-black">⭐ {fam.rating} ({fam.productsCount})</span>
                  </div>
                  <h3 className="font-black text-stone-900 text-base">{fam.name}</h3>
                  <p className="text-stone-600 text-xs line-clamp-2 font-normal leading-relaxed">{fam.desc}</p>
                </div>

                <div className="pt-3 border-t border-stone-200/80 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        window.location.hash = `#/producer/${fam.id}`;
                      }}
                      className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold py-2.5 px-3 rounded-xl text-xs transition-all text-center cursor-pointer"
                    >
                      {isEn ? 'View Profile ↗' : 'عرض الملف ↗'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSupportInitialInfo({
                          familyName: fam.name,
                          familyCode: `ERG-000${fam.id}`
                        });
                        setShowSupport(true);
                      }}
                      className="bg-[#174F3E] hover:bg-[#0D3B2E] text-[#C8A96B] font-bold py-2.5 px-3 rounded-xl text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <span>{isEn ? 'Store Support 🎧' : 'المساعدة بشأن المتجر 🎧'}</span>
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-400 text-center font-medium">
                    🔒 {isEn ? 'All inquiries are centrally protected' : 'التعامل الاستفساري آمن ومدار مركزياً عبر المنصة'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🟢 10. قسم المعتمرين والزوار (تجربة المعتمر والزائر) */}
      <div className="bg-white border border-stone-200 p-6 md:p-10 rounded-3xl space-y-8" id="visitors-experiences-preview">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-emerald-800 text-xs font-black bg-emerald-100 px-3.5 py-1 rounded-full border border-emerald-300 inline-block">
            {isEn ? 'Pilgrim & Visitor Care' : 'خدمة المعتمرين والضيوف'}
          </span>
          <h2 className="font-black text-stone-900 text-2xl md:text-3xl">
            {t('visitor.title')}
          </h2>
          <p className="text-stone-600 text-xs md:text-sm font-medium">
            {t('visitor.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl text-center space-y-2">
            <span className="text-2xl block">🕋</span>
            <h3 className="font-black text-stone-900 text-xs">{t('visitor.food')}</h3>
            <p className="text-stone-500 text-[10px]">{isEn ? 'Healthy traditional meals' : 'وجبات تراثية صحية'}</p>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl text-center space-y-2">
            <span className="text-2xl block">☕</span>
            <h3 className="font-black text-stone-900 text-xs">{t('visitor.hospitality')}</h3>
            <p className="text-stone-500 text-[10px]">{isEn ? 'Saudi coffee & buffets' : 'قهوة سعودية وبوفيهات'}</p>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl text-center space-y-2">
            <span className="text-2xl block">🎁</span>
            <h3 className="font-black text-stone-900 text-xs">{t('visitor.gifts')}</h3>
            <p className="text-stone-500 text-[10px]">{isEn ? 'Gift boxes & souvenirs' : 'صناديق إهداء وتذكارات'}</p>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl text-center space-y-2">
            <span className="text-2xl block">📍</span>
            <h3 className="font-black text-stone-900 text-xs">{t('visitor.experiences')}</h3>
            <p className="text-stone-500 text-[10px]">{isEn ? 'Live cooking & crafts' : 'ورش طهي وحرف حية'}</p>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl text-center space-y-2">
            <span className="text-2xl block">🚚</span>
            <h3 className="font-black text-stone-900 text-xs">{t('visitor.delivery')}</h3>
            <p className="text-stone-500 text-[10px]">{isEn ? 'Direct to hotel rooms' : 'توصيل لمقر الإقامة بالفنادق'}</p>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl text-center space-y-2">
            <span className="text-2xl block">📅</span>
            <h3 className="font-black text-stone-900 text-xs">{t('visitor.schedule')}</h3>
            <p className="text-stone-500 text-[10px]">{isEn ? 'Custom delivery dates' : 'تحديد مواعيد التسليم'}</p>
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => {
              window.location.hash = '#/portal/visitors';
            }}
            className="bg-[#174F3E] hover:bg-[#0D3B2E] text-[#C8A96B] font-black py-3.5 px-8 rounded-2xl text-xs sm:text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <span>{t('visitor.discover')} 🕋</span>
          </button>
        </div>
      </div>

      {/* 🟢 11. قصص التراث (قصص من إرث أجيال) */}
      <div className="bg-gradient-to-br from-[#174F3E] to-[#0D3B2E] text-white p-6 md:p-10 rounded-3xl space-y-8 shadow-2xl border border-amber-400/20" id="heritage-stories">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[#C8A96B] text-xs font-black bg-white/10 px-3.5 py-1 rounded-full border border-[#C8A96B]/30 inline-block">
            {isEn ? 'Authenticity & Identity' : 'الأصالة والهوية'}
          </span>
          <h2 className="font-black text-2xl md:text-3xl text-[#C8A96B]">
            {t('stories.title')}
          </h2>
          <p className="text-amber-100/90 text-xs md:text-sm font-medium">
            {t('stories.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3">
            <span className="text-3xl block">🌾</span>
            <h3 className="font-black text-[#C8A96B] text-base">{isEn ? 'Secret of Najdi Jareesh' : 'سر الجريش النجدي التراثي'}</h3>
            <p className="text-stone-200 text-xs leading-relaxed font-light">
              {isEn ? 'A family recipe passed down through generations made with local ghee and pure laban.' : 'وصفة عائلية تتوارثها عائلة أم سعود منذ أربعة عقود، تعتمد على الجريش البلدي المنقوع بالسمن البري واللبن الخالص.'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3">
            <span className="text-3xl block">🧵</span>
            <h3 className="font-black text-[#C8A96B] text-base">{isEn ? 'Traditional Sadu Weaving' : 'حياكة السدو الشعبي'}</h3>
            <p className="text-stone-200 text-xs leading-relaxed font-light">
              {isEn ? 'Artisan Nourah crafts Bedouin Sadu textiles in vibrant sustainable colors preserving authentic motifs.' : 'تتألق الحرفية نورة في خياطة وتشكيل أنسجة السدو البدوية بألوان حية ومستدامة، مخلدة النقوش الحجازية والنجدية الأصيلة.'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 space-y-3">
            <span className="text-3xl block">☕</span>
            <h3 className="font-black text-[#C8A96B] text-base">{isEn ? 'Saudi Coffee & Hospitality' : 'عبق القهوة السعودية والضيافة'}</h3>
            <p className="text-stone-200 text-xs leading-relaxed font-light">
              {isEn ? 'From mountain Khawlani beans to cardamom blends, our artisans present the history of Saudi generosity.' : 'من تحميص البن الخولاني الجبلي وتجهيز الهيل والخلطات التراثية، يقدم الحرفيون خلطات قهوة سعودية تروي للزوار تاريخ الضيافة الكريمة.'}
            </p>
          </div>
        </div>
      </div>

      {/* 🟢 12. إدارة المخاطر واستراتيجيات الحد منها */}
      <RiskManagementSection />

      {/* 🟢 13. قسم الشركاء (شركاء إرث أجيال) */}
      <div className="bg-white border border-stone-200/80 p-8 md:p-10 rounded-3xl space-y-6 shadow-2xs" id="partners-section">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-100 pb-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[#174F3E] text-xs font-black bg-[#DDE9E1] px-3.5 py-1 rounded-full border border-[#174F3E]/20 inline-block">
              {t('partners.title')}
            </span>
            <h2 className="font-black text-[#19352D] text-2xl md:text-3xl">
              {isEn ? 'Erth Ajyal Partners' : 'شركاء إرث أجيال'}
            </h2>
            <p className="text-[#6B756F] text-xs md:text-sm font-normal leading-relaxed">
              {t('partners.subtitle')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              window.location.hash = '#/portal/partners';
            }}
            className="bg-[#174F3E] hover:bg-[#0D3B2E] text-white font-bold px-6 py-3 rounded-xl text-xs transition-all cursor-pointer shadow-xs self-start md:self-auto"
          >
            {isEn ? 'Partners Portal ↗' : 'بوابة الشركاء ↗'}
          </button>
        </div>
      </div>

      {/* 🟢 13. دعوة الإجراء الأخيرة (ابدأ رحلتك مع إرث أجيال) */}
      <div className="bg-gradient-to-r from-[#174F3E] to-[#0D3B2E] text-white p-8 md:p-12 rounded-3xl shadow-xl border border-[#C8A96B]/30 text-center space-y-6" id="final-cta-section">
        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="font-black text-2xl md:text-3xl text-[#C8A96B]">
            {t('cta.title')}
          </h2>
          <p className="text-stone-200 text-xs md:text-sm font-normal">
            {t('cta.subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => {
              setLandingView('standalone_store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#C8A96B] hover:bg-[#b39356] text-stone-950 font-black px-8 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-md hover:scale-105 cursor-pointer"
          >
            🛍️ {t('cta.btnShop')}
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.hash = '#/portal/visitors';
            }}
            className="bg-[#174F3E] hover:bg-[#0D3B2E] text-white font-black px-8 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-md hover:scale-105 cursor-pointer border border-[#DDE9E1]/30"
          >
            🕋 {t('cta.btnVisitor')}
          </button>

          <button
            type="button"
            onClick={() => {
              setLandingView('family_landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#0D3B2E] hover:bg-[#174F3E] text-[#C8A96B] font-black px-8 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-md hover:scale-105 cursor-pointer border border-[#C8A96B]/30"
          >
            👩‍🍳 {t('cta.btnProducer')}
          </button>
        </div>
      </div>

    </div>
  );
};
