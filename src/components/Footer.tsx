import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t, isEn } = useLanguage();

  const handleNavigate = (path: string, hash: string) => {
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D3B2E] text-white p-8 md:p-12 border-t border-[#174F3E] text-start transition-all" id="global-platform-footer" dir={isEn ? 'ltr' : 'rtl'}>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-stone-800">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🇸🇦</span>
              <div>
                <span className="font-black text-lg text-[#C8A96B] block">{t('brand.name')}</span>
                <span className="text-[10px] text-stone-400 font-bold">{t('brand.tagline')}</span>
              </div>
            </div>
            <p className="text-stone-400 text-xs font-normal leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#C8A96B] text-sm mb-3">{t('footer.platformServices')}</h4>
            <ul className="space-y-2 text-xs text-stone-300 font-normal">
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNavigate('/', '#/?view=standalone_about')} 
                  className="hover:text-[#C8A96B] transition-colors cursor-pointer"
                >
                  {t('nav.about')}
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNavigate('/', '#/?view=standalone_services')} 
                  className="hover:text-[#C8A96B] transition-colors cursor-pointer"
                >
                  {t('nav.services')}
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNavigate('/', '#/?view=standalone_store')} 
                  className="hover:text-[#C8A96B] transition-colors cursor-pointer"
                >
                  {t('prod.title')}
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNavigate('/portal/visitors', '#/portal/visitors')} 
                  className="hover:text-[#C8A96B] transition-colors cursor-pointer"
                >
                  {t('visitor.title')}
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#C8A96B] text-sm mb-3">{t('footer.portalsTracks')}</h4>
            <ul className="space-y-2 text-xs text-stone-300 font-normal">
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNavigate('/portal/families', '#/portal/families')} 
                  className="hover:text-[#C8A96B] transition-colors cursor-pointer"
                >
                  {t('nav.producers')}
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNavigate('/portal/partners', '#/portal/partners')} 
                  className="hover:text-[#C8A96B] transition-colors cursor-pointer"
                >
                  {t('nav.partners')}
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNavigate('/', '#/?view=standalone_news')} 
                  className="hover:text-[#C8A96B] transition-colors cursor-pointer"
                >
                  {t('nav.blog')}
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#C8A96B] text-sm mb-3">{t('footer.supportHelp')}</h4>
            <ul className="space-y-2 text-xs text-stone-300 font-normal">
              <li>
                <button 
                  type="button" 
                  onClick={() => handleNavigate('/', '#/?view=standalone_contact')} 
                  className="hover:text-[#C8A96B] transition-colors cursor-pointer"
                >
                  {t('nav.contact')}
                </button>
              </li>
              <li>
                <span className="text-stone-400 text-[11px] block">
                  {t('footer.faq')} • {t('footer.terms')} • {t('footer.privacy')}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-normal">
          <p>{t('footer.rights')}</p>
          <p className="text-[11px] text-stone-500">{t('footer.visionSubtitle')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
