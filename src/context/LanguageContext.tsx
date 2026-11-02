import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'ar' | 'en';

export const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Brand
    'brand.name': 'إرث أجيال',
    'brand.tagline': 'منصة رائدات ورواد العمل الحر والمشاريع الصغيرة',
    'brand.fullName': 'منصة إرث أجيال لتمكين رائدات ورواد العمل الحر والمشاريع الصغيرة',

    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'عن إرث أجيال',
    'nav.services': 'الخدمات',
    'nav.producers': 'رواد العمل الحر',
    'nav.partners': 'الشركاء',
    'nav.blog': 'المدونة',
    'nav.contact': 'تواصل معنا',
    'nav.login': 'تسجيل الدخول',
    'nav.myAccount': 'حسابي',
    'nav.logout': 'تسجيل الخروج',
    'nav.langToggle': 'English 🇬🇧',

    // Hero
    'hero.badge': 'منصة سعودية موثوقة لتمكين التراث والعمل الحر',
    'hero.title': 'منصة تجمع السوق، التجارب والخدمات',
    'hero.subtitle': 'اكتشف منتجات رائدات ورواد العمل الحر والمشاريع الصغيرة، واستمتع بتجارب أصيلة، وتعرّف على قصص ومهارات انتقلت من جيل إلى جيل.',
    'hero.btnExplore': 'اكتشف الآن',
    'hero.btnBook': 'احجز تجربة',

    // Action Cards
    'card.order': 'اطلب الآن',
    'card.orderDesc': 'منتجات رائدات العمل الحر وحرفية فاخرة',
    'card.book': 'احجز تجربة أو مساحة',
    'card.bookDesc': 'ورش وجولات وضيافة تراثية',
    'card.producer': 'أنا رائدة عمل حر',
    'card.producerDesc': 'سجلي مشروعك وابدئي النمو',
    'card.training': 'التدريب والتأهيل',
    'card.trainingDesc': 'برامج تطويرية وحزم دعم',
    'card.partners': 'الشركاء والجهات',
    'card.partnersDesc': 'رعاية الأثر وتمكين المبادرات',
    'card.about': 'عن إرث أجيال',
    'card.aboutDesc': 'قصتنا ورؤيتنا المستقبلية',

    // Features Bar
    'feat.quality': 'جودة مضمونة',
    'feat.support': 'دعم مستمر',
    'feat.payment': 'دفع آمن وسهل',
    'feat.delivery': 'توصيل سريع',
    'feat.verified': 'رائدات معتمدات',

    // Impact
    'impact.title': 'أثرنا بالأرقام',
    'impact.subtitle': 'منجزات حقيقية تصنع فارقاً مستداماً في تمكين رائدات العمل الحر والتراث',
    'impact.producers': '+850',
    'impact.producersLabel': 'رائدة عمل حر',
    'impact.orders': '+25,000',
    'impact.ordersLabel': 'طلب مكتمل',
    'impact.experiences': '+120',
    'impact.experiencesLabel': 'تجربة ومساحة',
    'impact.rating': '4.9/5',
    'impact.ratingLabel': 'تقييم العملاء',
    'impact.partners': '+45',
    'impact.partnersLabel': 'شريك وجهة داعمة',

    // What You Find
    'find.title': 'ماذا تجد في إرث أجيال؟',
    'find.subtitle': 'منظومة متكاملة تدعم التراث وتلبي تطلعات الزوار والمبتاعين',
    'find.products': 'المنتجات التراثية',
    'find.productsDesc': 'مأكولات شعبية، حرف سدو، وعطور أصلية',
    'find.experiences': 'التجارب الثقافية',
    'find.experiencesDesc': 'ورش طهي حية وجولات حرفية تفاعلية',
    'find.hospitality': 'الضيافة التراثية',
    'find.hospitalityDesc': 'خدمات ضيافة الفنادق وضيوف الرحمن',
    'find.gifts': 'الهدايا والتذكارات',
    'find.giftsDesc': 'توزيعات خاصة ومصنوعات يدوية فاخرة',
    'find.pilgrim': 'خدمات المعتمرين',
    'find.pilgrimDesc': 'وجبات طازجة وتجارب ضيافة حول الحرمين',
    'find.empowerment': 'برامج التمكين',
    'find.empowermentDesc': 'تمويل، تدريب، استشارات وحاضنات أعمال',

    // What You Want To Do
    'do.title': 'ماذا تريد أن تفعل؟',
    'do.subtitle': 'اختر مسارك المخصص للوصول السريع إلى الخدمات المناسبة',
    'do.path1Title': 'أريد الشراء والتسوق',
    'do.path1Desc': 'تصفح منتجات رائدات العمل الحر واطلب مباشرة بحماية جودة',
    'do.path2Title': 'أنا معتمر أو زائر',
    'do.path2Desc': 'احجز خدمات الضيافة والتجارب التراثية المميزة',
    'do.path3Title': 'أنا رائدة عمل حر أو حرفية',
    'do.path3Desc': 'سجلي مشروعك واحصلي على التمويل والتسويق',
    'do.path4Title': 'أنا جهة أو شريك',
    'do.path4Desc': 'ساهم في رعاية الأثر والشراكات الاستراتيجية',
    'do.enterPath': 'الدخول للمسار ⬅️',

    // About Sec
    'about.title': 'نبذة عن إرث أجيال',
    'about.subtitle': 'منصة سعودية تمكّنية تربط بين الموهبة والحرفيين والعملاء',
    'about.text': 'تسعى منصة «إرث أجيال» إلى إحياء التراث السعودي الأصيل وتمكين رائدات ورواد العمل الحر والمشاريع الصغيرة من خلال تقديم منظومة متكاملة تشمل التسويق، التدريب، الضيافة، والدعم المالي، لربطهم بالعملاء والزوار والمعتمرين محلياً ودولياً.',
    'about.discover': 'اكتشف قصتنا الكاملة',

    // Journey
    'journey.title': 'رحلة التمكين المستدام',
    'journey.subtitle': '6 خطوات مدروسة تحول شغفك وحرفتك إلى مشروع مستدام',
    'journey.step1': '1. التسجيل',
    'journey.step1Desc': 'إنشاء حساب جديد وتعبئة بيانات المشـروع',
    'journey.step2': '2. التقييم الذكي',
    'journey.step2Desc': 'تحليل الجاهزية والجودة بواسطة الذكاء الاصطناعي',
    'journey.step3': '3. التأهيل',
    'journey.step3Desc': 'ورش عمل تخصصية وحزم تطوير المهارات',
    'journey.step4': '4. الجودة والتوثيق',
    'journey.step4Desc': 'إصدار الشهادات وبادج الجودة المعتمد',
    'journey.step5': '5. التسويق والبيع',
    'journey.step5Desc': 'عرض المنتجات في المتجر وبوابات الضيافة',
    'journey.step6': '6. النمو والتمكين',
    'journey.step6Desc': 'ربط بالداعمين وحاضنات الأعمال الكبرى',

    // Products
    'prod.title': 'منتجات مختارة',
    'prod.subtitle': 'صُنعت بحب وأصالة بأيدي رائدات العمل الحر والحرفيين السعوديين',
    'prod.exploreStore': 'استكشف المتجر الكامل',
    'prod.sar': 'ر.س',
    'prod.addToCart': 'إضافة للسلة',

    // Producers
    'producers.title': 'رائدات عمل حر مختارات',
    'producers.subtitle': 'قصص نجاح سعودية تصنع التراث بأعلى معايير الجودة',
    'producers.viewAll': 'عرض كافة رائدات العمل الحر',
    'producers.verified': 'رائدة معتمدة',

    // Visitor/Pilgrim
    'visitor.title': 'تجربة الزائر والمعتمر',
    'visitor.subtitle': 'خدمات ضيافة وتجارب حية مخصصة لضيوف الرحمن والسياح',
    'visitor.food': 'الطعام والوجبات',
    'visitor.hospitality': 'الضيافة',
    'visitor.gifts': 'الهدايا',
    'visitor.experiences': 'التجارب',
    'visitor.delivery': 'التوصيل',
    'visitor.schedule': 'جدولة الطلبات',
    'visitor.discover': 'اكتشف تجربة المعتمر والزائر',

    // Stories
    'stories.title': 'قصص مختارة من إرث أجيال',
    'stories.subtitle': 'حكايات شغف وإصرار تحولت إلى مشاريع ناجحة',
    'stories.viewAll': 'عرض جميع القصص',

    // Partners
    'partners.title': 'الشركاء والداعمون',
    'partners.subtitle': 'جهات حكومية وخاصة تدعم تمكين رائدات العمل الحر والحرفيين',

    // CTA
    'cta.title': 'ابدأ رحلتك مع إرث أجيال',
    'cta.subtitle': 'انضم إلى المنصة الرقمية الأولى لتمكين التراث ورائدات ورواد العمل الحر والمشاريع الصغيرة',
    'cta.btnShop': 'أريد التسوق',
    'cta.btnVisitor': 'أنا زائر أو معتمر',
    'cta.btnProducer': 'أنا رائد/ة عمل حر',

    // Footer
    'footer.desc': 'منصة تمكين تجمع السوق والتجارب والخدمات في مكان واحد برعاية وإشراف مؤسسة التفكير والنماء TND.',
    'footer.platformServices': 'المنصة والخدمات',
    'footer.portalsTracks': 'البوابات والمسارات',
    'footer.supportHelp': 'الدعم والمساعدة',
    'footer.rights': '© 2026 إرث أجيال — جميع الحقوق محفوظة.',
    'footer.visionSubtitle': 'منصة تمكين وتنمية مستدامة متوافقة مع رؤية المملكة 2030',
    'footer.techSupport': 'الدعم الفني',
    'footer.terms': 'الشروط والأحكام',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.faq': 'الأسئلة الشائعة',

    // Portals Sub-bars
    'portal.familyTitle': 'بوابة رائدات ورواد العمل الحر والمشاريع الصغيرة',
    'portal.familySub': 'مبادرة إرث أجيال • تمكين واستدامة',
    'portal.pilgrimTitle': 'بوابة المعتمرين وزوار الحرمين',
    'portal.pilgrimSub': 'خدمات الضيافة والوجبات التراثية للفنادق',
    'portal.visitorTitle': 'بوابة الزائر والسائح',
    'portal.visitorSub': 'التجارب التراثية والجولات والحرف اليدوية',
    'portal.partnerTitle': 'بوابة الشركاء والجهات والداعمين',
    'portal.partnerSub': 'برامج الشراكة الاستراتيجية ورعاية الأثر المجتمعي',
    'portal.buyerTitle': 'بوابة المشتري والتسوق',
    'portal.buyerSub': 'منتجات رائدات ورواد العمل الحر والمشاريع الصغيرة مباشرة',
    'portal.changeTrack': 'تغيير المسار',
    'portal.joinFamily': 'انضمام رائد/ة عمل 📝',

    // Auth & Messages
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'إنشاء حساب جديد',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.dontHaveAccount': 'ليس لديك حساب؟',
    'auth.alreadyHaveAccount': 'لديك حساب بالفعل؟',
    'auth.loginSuccess': 'تم تسجيل الدخول بنجاح!',
    'auth.loginError': 'عفواً، البيانات غير صحيحة',
    'auth.logoutSuccess': 'تم تسجيل الخروج بنجاح',

    // Operational App
    'app.title': 'تطبيق إرث أجيال التشغيلي',
    'app.orders': 'الطلبات',
    'app.tracking': 'متابعة الطلب',
    'app.delivery': 'التوصيل',
    'app.messages': 'الرسائل',
    'app.notifications': 'الإشعارات',
    'app.account': 'حسابي',
    'app.orderStatus': 'حالة الطلب',

    // Common
    'common.search': 'بحث...',
    'common.filter': 'تصفية',
    'common.all': 'الكل',
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ، يرجى المحاولة مرة أخرى',
    'common.success': 'تمت العملية بنجاح',
    'common.close': 'إغلاق',
    'common.back': 'عودة',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء'
  },

  en: {
    // Brand
    'brand.name': 'Erth Ajyal',
    'brand.tagline': 'Productive Families Platform',
    'brand.fullName': 'Erth Ajyal Platform for Empowering Productive Families & Artisans',

    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.producers': 'Productive Families',
    'nav.partners': 'Partners',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact Us',
    'nav.login': 'Sign In',
    'nav.myAccount': 'My Account',
    'nav.logout': 'Sign Out',
    'nav.langToggle': 'العربية 🇸🇦',

    // Hero
    'hero.badge': 'Trusted Saudi Platform for Heritage & Family Empowerment',
    'hero.title': 'A Platform Unifying Market, Experiences & Services',
    'hero.subtitle': 'Discover authentic products from productive families, enjoy rich cultural experiences, and explore heritage skills passed down through generations.',
    'hero.btnExplore': 'Explore Now',
    'hero.btnBook': 'Book Experience',

    // Action Cards
    'card.order': 'Order Now',
    'card.orderDesc': 'Finest artisanal & family handmade goods',
    'card.book': 'Book Experience or Space',
    'card.bookDesc': 'Heritage workshops, tours & hospitality',
    'card.producer': 'I am a Productive Family',
    'card.producerDesc': 'Register your business and start growing',
    'card.training': 'Training & Qualification',
    'card.trainingDesc': 'Skill boost programs & growth packages',
    'card.partners': 'Partners & Entities',
    'card.partnersDesc': 'Impact sponsorship & initiative empowerment',
    'card.about': 'About Erth Ajyal',
    'card.aboutDesc': 'Our story & future vision',

    // Features Bar
    'feat.quality': 'Guaranteed Quality',
    'feat.support': 'Continuous Support',
    'feat.payment': 'Safe & Easy Payment',
    'feat.delivery': 'Fast Delivery',
    'feat.verified': 'Verified Families',

    // Impact
    'impact.title': 'Our Impact in Numbers',
    'impact.subtitle': 'Real achievements making a sustainable impact empowering heritage families',
    'impact.producers': '+850',
    'impact.producersLabel': 'Productive Families',
    'impact.orders': '+25,000',
    'impact.ordersLabel': 'Completed Orders',
    'impact.experiences': '+120',
    'impact.experiencesLabel': 'Experiences & Venues',
    'impact.rating': '4.9/5',
    'impact.ratingLabel': 'Customer Rating',
    'impact.partners': '+45',
    'impact.partnersLabel': 'Partners & Sponsors',

    // What You Find
    'find.title': 'What Do You Find in Erth Ajyal?',
    'find.subtitle': 'An integrated ecosystem preserving heritage and serving visitors & shoppers',
    'find.products': 'Heritage Products',
    'find.productsDesc': 'Traditional dishes, Sadu crafts & authentic perfumes',
    'find.experiences': 'Cultural Experiences',
    'find.experiencesDesc': 'Live cooking workshops & interactive craft tours',
    'find.hospitality': 'Heritage Hospitality',
    'find.hospitalityDesc': 'Hotel hospitality & pilgrim guest services',
    'find.gifts': 'Gifts & Souvenirs',
    'find.giftsDesc': 'Custom event favors & fine handcrafted items',
    'find.pilgrim': 'Pilgrim Services',
    'find.pilgrimDesc': 'Fresh meals & hospitality around the Holy Mosques',
    'find.empowerment': 'Empowerment Programs',
    'find.empowermentDesc': 'Funding, training, consulting & incubators',

    // What You Want To Do
    'do.title': 'What Do You Want to Do?',
    'do.subtitle': 'Choose your dedicated track for quick access to the right services',
    'do.path1Title': 'I Want to Shop',
    'do.path1Desc': 'Browse family goods & order directly with quality assurance',
    'do.path2Title': 'I am a Pilgrim or Visitor',
    'do.path2Desc': 'Book hospitality services & unique cultural experiences',
    'do.path3Title': 'I am a Productive Family',
    'do.path3Desc': 'Register your project & access funding and marketing',
    'do.path4Title': 'I am an Entity or Partner',
    'do.path4Desc': 'Sponsor social impact programs & strategic partnerships',
    'do.enterPath': 'Enter Track ➡️',

    // About Sec
    'about.title': 'About Erth Ajyal',
    'about.subtitle': 'A Saudi empowerment platform bridging talent, artisans, and clients',
    'about.text': 'Erth Ajyal platform aims to revive authentic Saudi heritage and empower productive families and artisans through an integrated ecosystem spanning marketing, training, hospitality, and financial support, connecting them with local and international clients, visitors, and pilgrims.',
    'about.discover': 'Discover Our Full Story',

    // Journey
    'journey.title': 'Sustainable Empowerment Journey',
    'journey.subtitle': '6 structured steps turning your passion and craft into a sustainable business',
    'journey.step1': '1. Registration',
    'journey.step1Desc': 'Create account & complete project profile',
    'journey.step2': '2. Smart Evaluation',
    'journey.step2Desc': 'AI-driven readiness and quality assessment',
    'journey.step3': '3. Qualification',
    'journey.step3Desc': 'Specialized workshops & skill development packages',
    'journey.step4': '4. Quality & Certification',
    'journey.step4Desc': 'Issuing certificates & verified quality badge',
    'journey.step5': '5. Marketing & Sales',
    'journey.step5Desc': 'Listing products in store & hospitality portals',
    'journey.step6': '6. Growth & Empowerment',
    'journey.step6Desc': 'Connecting with major sponsors & business incubators',

    // Products
    'prod.title': 'Featured Products',
    'prod.subtitle': 'Crafted with passion & authenticity by Saudi productive families & artisans',
    'prod.exploreStore': 'Explore Full Store',
    'prod.sar': 'SAR',
    'prod.addToCart': 'Add to Cart',

    // Producers
    'producers.title': 'Featured Productive Families',
    'producers.subtitle': 'Saudi success stories preserving heritage with top quality standards',
    'producers.viewAll': 'View All Families',
    'producers.verified': 'Verified Family',

    // Visitor/Pilgrim
    'visitor.title': 'Visitor & Pilgrim Experience',
    'visitor.subtitle': 'Hospitality services & live experiences tailored for Holy Mosque guests & tourists',
    'visitor.food': 'Traditional Food & Meals',
    'visitor.hospitality': 'Hospitality',
    'visitor.gifts': 'Gifts',
    'visitor.experiences': 'Experiences',
    'visitor.delivery': 'Delivery',
    'visitor.schedule': 'Order Scheduling',
    'visitor.discover': 'Discover Visitor & Pilgrim Experience',

    // Stories
    'stories.title': 'Featured Stories from Erth Ajyal',
    'stories.subtitle': 'Inspiring tales of passion and perseverance transformed into thriving businesses',
    'stories.viewAll': 'View All Stories',

    // Partners
    'partners.title': 'Partners & Sponsors',
    'partners.subtitle': 'Governmental and private entities supporting family empowerment',

    // CTA
    'cta.title': 'Start Your Journey with Erth Ajyal',
    'cta.subtitle': 'Join the leading digital platform empowering Saudi heritage & productive families',
    'cta.btnShop': 'I Want to Shop',
    'cta.btnVisitor': 'I am a Visitor or Pilgrim',
    'cta.btnProducer': 'I am a Productive Family',

    // Footer
    'footer.desc': 'Empowerment platform unifying market, experiences, and services under TND foundation management.',
    'footer.platformServices': 'Platform & Services',
    'footer.portalsTracks': 'Portals & Tracks',
    'footer.supportHelp': 'Support & Help',
    'footer.rights': '© 2026 Erth Ajyal — All Rights Reserved.',
    'footer.visionSubtitle': 'Sustainable empowerment platform aligned with Saudi Vision 2030',
    'footer.techSupport': 'Technical Support',
    'footer.terms': 'Terms & Conditions',
    'footer.privacy': 'Privacy Policy',
    'footer.faq': 'FAQ',

    // Portals Sub-bars
    'portal.familyTitle': 'Productive Families & Artisans Portal',
    'portal.familySub': 'Erth Ajyal Initiative • Empowerment & Sustainability',
    'portal.pilgrimTitle': 'Pilgrims & Holy Mosque Visitors Portal',
    'portal.pilgrimSub': 'Hospitality services & traditional meals for hotels',
    'portal.visitorTitle': 'Visitors & Tourists Portal',
    'portal.visitorSub': 'Cultural experiences, guided tours & handicrafts',
    'portal.partnerTitle': 'Partners, Sponsors & Entities Portal',
    'portal.partnerSub': 'Strategic partnership programs & social impact sponsorship',
    'portal.buyerTitle': 'Shoppers & Buyers Portal',
    'portal.buyerSub': 'Direct handmade goods from productive families',
    'portal.changeTrack': 'Change Track',
    'portal.joinFamily': 'Join Family 📝',

    // Auth & Messages
    'auth.login': 'Sign In',
    'auth.register': 'Create New Account',
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.dontHaveAccount': "Don't have an account?",
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.loginSuccess': 'Signed in successfully!',
    'auth.loginError': 'Sorry, invalid credentials',
    'auth.logoutSuccess': 'Signed out successfully',

    // Operational App
    'app.title': 'Erth Ajyal Operational App',
    'app.orders': 'Orders',
    'app.tracking': 'Track Order',
    'app.delivery': 'Delivery',
    'app.messages': 'Messages',
    'app.notifications': 'Notifications',
    'app.account': 'My Account',
    'app.orderStatus': 'Order Status',

    // Common
    'common.search': 'Search...',
    'common.filter': 'Filter',
    'common.all': 'All',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred, please try again',
    'common.success': 'Operation completed successfully',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.save': 'Save',
    'common.cancel': 'Cancel'
  }
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
  isEn: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('warth_lang') as Language) || 'ar';
  });

  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem('warth_lang', lang);
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const toggleLanguage = () => {
    setLangState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key: string, fallback?: string): string => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    // Fallback to Arabic if not found in English
    if (translations['ar'] && translations['ar'][key]) {
      return translations['ar'][key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, isEn: lang === 'en' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
