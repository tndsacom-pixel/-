import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MainLandingSections } from './MainLandingSections';
import AboutPlatformIntro from './AboutPlatformIntro';
import ConsultingPage from './ConsultingPage';
import ServicesPage from './ServicesPage';
import AboutPage from './AboutPage';
import InitiativesPage from './InitiativesPage';
import MembershipPage from './MembershipPage';
import NewsPage from './NewsPage';
import ContactPage from './ContactPage';
import SmartSupportModal from './SmartSupportModal';
import LoginPage from './LoginPage';
import { 
  Compass, 
  User, 
  Brain,
  GraduationCap, 
  ShoppingBag, 
  TrendingUp, 
  Award, 
  Landmark, 
  Sparkles, 
  ChevronLeft, 
  ArrowRight,
  Shield,
  HeartHandshake,
  CheckCircle,
  HelpCircle,
  Clock,
  Coins,
  Users,
  UserPlus,
  Eye,
  Home,
  Headphones,
  Lock,
  X,
  Check,
  CreditCard,
  MapPin,
  Search,
  Filter,
  Send,
  CheckCheck,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smartphone,
  Fingerprint,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
  Globe
} from 'lucide-react';
import { DEFAULT_PRODUCTS, HeritageProduct } from '../initialData';
import { INITIAL_PRODUCERS } from '../producersData';
import { useLanguage } from '../context/LanguageContext';

const PRODUCTIVE_FAMILIES = INITIAL_PRODUCERS.map(p => ({
  id: p.id,
  name: p.brandName,
  banner: p.coverUrl || p.logoUrl,
  region: p.city,
  category: p.projectType === 'culinary' ? 'طعام وتراث' : p.projectType === 'crafts' ? 'حرف يدوية' : p.projectType === 'hospitality' ? 'ضيافة عربية' : 'منتجات منزلية',
  rating: p.rating,
  productsCount: p.products ? p.products.length : 0,
  desc: p.description
}));

interface LandingPageProps {
  onLogin: (role: 'beneficiary' | 'admin' | 'pilgrim' | 'visitor', name?: string) => void;
  warathLogo: string;
  thinkingLogo: string;
  activeTheme: string;
  lang?: 'ar' | 'en';
  onToggleLanguage?: () => void;
  onSelectTrack?: (track: 'family' | 'pilgrim' | 'visitor' | 'partner' | 'supporter') => void;
}

export default function LandingPage({ onLogin, warathLogo, thinkingLogo, activeTheme, onToggleLanguage, onSelectTrack }: LandingPageProps) {
  const { t, isEn } = useLanguage();
  const renderThinkingLogo = (sizeClass = "w-11 h-11 text-xs") => {
    if (thinkingLogo && (thinkingLogo.startsWith('http') || thinkingLogo.startsWith('/') || thinkingLogo.startsWith('data:'))) {
      return (
        <img 
          src={thinkingLogo} 
          alt="شعار مؤسسة التفكير والنماء" 
          className={`${sizeClass.split(' ')[0]} ${sizeClass.split(' ')[1]} object-contain rounded-xl shadow-sm border border-accent/20 bg-white`} 
          referrerPolicy="no-referrer" 
        />
      );
    }
    return (
      <div className={`bg-[#C8A96B] text-white rounded-xl flex items-center justify-center shadow-md font-bold font-mono text-center px-1 leading-tight ${sizeClass}`}>
        {thinkingLogo ? thinkingLogo.substring(0, 8) : 'تفكير ونماء'}
      </div>
    );
  };

  const renderWarathLogo = (sizeClass = "w-11 h-11 text-xs") => {
    if (warathLogo && (warathLogo.startsWith('http') || warathLogo.startsWith('/') || warathLogo.startsWith('data:'))) {
      return (
        <img 
          src={warathLogo} 
          alt="شعار إرث أجيال" 
          className={`${sizeClass.split(' ')[0]} ${sizeClass.split(' ')[1]} object-contain rounded-2xl shadow-md border border-accent/20 bg-white`} 
          referrerPolicy="no-referrer" 
        />
      );
    }
    return (
      <div className={`bg-[#174F3E] text-amber-300 rounded-2xl flex items-center justify-center shadow-md font-extrabold font-mono text-center px-2 leading-tight ${sizeClass}`}>
        {warathLogo ? warathLogo.substring(0, 10) : 'إرث أجيال'}
      </div>
    );
  };

  const [selectedRole, setSelectedRole] = useState<'beneficiary' | 'admin' | 'pilgrim' | 'visitor' | null>(null);
  const [isGeneralQuickLogin, setIsGeneralQuickLogin] = useState<boolean>(false);
  const [landingView, setLandingView] = useState<
    'options' | 
    'unified_login' | 
    'join_portals' | 
    'family_landing' | 
    'standalone_store' | 
    'standalone_consulting' | 
    'standalone_services' | 
    'standalone_about' | 
    'standalone_initiatives' | 
    'standalone_membership' | 
    'standalone_news' | 
    'standalone_contact'
  >('options');
  const [showSupport, setShowSupport] = useState<boolean>(false);
  const [supportMessageSent, setSupportMessageSent] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [supportInitialInfo, setSupportInitialInfo] = useState<{ familyName?: string; familyCode?: string; productName?: string } | undefined>(undefined);

  // Handle Hash & URL Route Changes for Navigation and Dedicated Views
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;

      if (hash === '#store' || hash === '#/store' || hash === '#shop' || hash === '#heritage-direct-catalog' || path === '/store' || path === '/shop') {
        setLandingView('standalone_store');
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#consulting' || hash === '#/consulting' || path === '/consulting') {
        setLandingView('standalone_consulting');
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#services' || hash === '#/services' || path === '/services') {
        setLandingView('standalone_services');
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#about' || hash === '#/about' || path === '/about' || hash === '#about-platform') {
        setLandingView('standalone_about');
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#initiatives' || hash === '#/initiatives' || path === '/initiatives') {
        setLandingView('standalone_initiatives');
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#membership' || hash === '#/membership' || path === '/membership') {
        setLandingView('standalone_membership');
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#news' || hash === '#/news' || path === '/news') {
        setLandingView('standalone_news');
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#contact' || hash === '#/contact' || path === '/contact') {
        setLandingView('standalone_contact');
        setError('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#pathway-selection') {
        setLandingView('unified_login');
        setSelectedRole(null);
        setIsGeneralQuickLogin(false);
        setError('');
      } else if (hash === '#families-portal' || hash === '#family-portal') {
        setLandingView('family_landing');
        setError('');
      } else if (hash === '' || hash === '#home' || hash === '#/') {
        setLandingView('options');
        setError('');
      }
    };

    const handleResetEvent = () => {
      setLandingView('unified_login');
      setSelectedRole(null);
      setIsGeneralQuickLogin(false);
      setError('');
    };

    const handleBuyerLoginEvent = () => {
      setLandingView('unified_login');
      setSelectedRole('pilgrim');
      setIsGeneralQuickLogin(false);
      setLoginIdentifier('abdulrahman');
      setLoginPassword('123');
      setError('');
    };

    const handleFamilyPortalEvent = () => {
      setLandingView('family_landing');
      setError('');
    };

    const handleStorePageEvent = () => {
      setLandingView('standalone_store');
      setError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleConsultingPageEvent = () => {
      setLandingView('standalone_consulting');
      setError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleServicesPageEvent = () => {
      setLandingView('standalone_services');
      setError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleAboutPageEvent = () => {
      setLandingView('standalone_about');
      setError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleInitiativesPageEvent = () => {
      setLandingView('standalone_initiatives');
      setError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleMembershipPageEvent = () => {
      setLandingView('standalone_membership');
      setError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNewsPageEvent = () => {
      setLandingView('standalone_news');
      setError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleContactPageEvent = () => {
      setLandingView('standalone_contact');
      setError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleHomePageEvent = () => {
      setLandingView('options');
      setError('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    // Check on mount
    handleHashCheck();
    
    window.addEventListener('hashchange', handleHashCheck);
    window.addEventListener('reset-unified-login', handleResetEvent);
    window.addEventListener('trigger-buyer-login', handleBuyerLoginEvent);
    window.addEventListener('trigger-family-portal', handleFamilyPortalEvent);
    window.addEventListener('trigger-store-page', handleStorePageEvent);
    window.addEventListener('trigger-consulting-page', handleConsultingPageEvent);
    window.addEventListener('trigger-services-page', handleServicesPageEvent);
    window.addEventListener('trigger-about-page', handleAboutPageEvent);
    window.addEventListener('trigger-initiatives-page', handleInitiativesPageEvent);
    window.addEventListener('trigger-membership-page', handleMembershipPageEvent);
    window.addEventListener('trigger-news-page', handleNewsPageEvent);
    window.addEventListener('trigger-contact-page', handleContactPageEvent);
    window.addEventListener('trigger-home-page', handleHomePageEvent);

    return () => {
      window.removeEventListener('hashchange', handleHashCheck);
      window.removeEventListener('reset-unified-login', handleResetEvent);
      window.removeEventListener('trigger-buyer-login', handleBuyerLoginEvent);
      window.removeEventListener('trigger-family-portal', handleFamilyPortalEvent);
      window.removeEventListener('trigger-store-page', handleStorePageEvent);
      window.removeEventListener('trigger-consulting-page', handleConsultingPageEvent);
      window.removeEventListener('trigger-services-page', handleServicesPageEvent);
      window.removeEventListener('trigger-about-page', handleAboutPageEvent);
      window.removeEventListener('trigger-initiatives-page', handleInitiativesPageEvent);
      window.removeEventListener('trigger-membership-page', handleMembershipPageEvent);
      window.removeEventListener('trigger-news-page', handleNewsPageEvent);
      window.removeEventListener('trigger-contact-page', handleContactPageEvent);
      window.removeEventListener('trigger-home-page', handleHomePageEvent);
    };
  }, []);
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Registration Account States
  const [regUsername, setRegUsername] = useState<string>('');
  const [regIdNumber, setRegIdNumber] = useState<string>('');
  const [regPhone, setRegPhone] = useState<string>('');
  const [regEmail, setRegEmail] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');

  // Login Account States
  const [loginIdentifier, setLoginIdentifier] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  // SSO Passwordless OTP & Security States
  const [loginMethod, setLoginMethod] = useState<'otp' | 'password'>('password');
  const [otpPhone, setOtpPhone] = useState<string>('');
  const [otpCode, setOtpCode] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpTimer, setOtpTimer] = useState<number>(0);
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [isBruteForceLocked, setIsBruteForceLocked] = useState<boolean>(false);
  const [lockTimer, setLockTimer] = useState<number>(0);
  const [simulatedReceivedOtp, setSimulatedReceivedOtp] = useState<string>('');
  const [showBiometricSuccess, setShowBiometricSuccess] = useState<boolean>(false);
  const [isBiometricVerifying, setIsBiometricVerifying] = useState<boolean>(false);

  // Countdown timers for OTP and Lockout
  useEffect(() => {
    let interval: any = null;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  useEffect(() => {
    let interval: any = null;
    if (lockTimer > 0) {
      interval = setInterval(() => {
        setLockTimer(prev => {
          if (prev <= 1) {
            setIsBruteForceLocked(false);
            setLoginAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockTimer]);

  const [authMode, setAuthMode] = useState<'join' | 'login'>('join');
  const [wizardStep, setWizardStep] = useState<number>(0);

  // States for direct product purchase without packages
  const [selectedProduct, setSelectedProduct] = useState<HeritageProduct | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);
  const [orderName, setOrderName] = useState<string>('');
  const [orderPhone, setOrderPhone] = useState<string>('');
  const [orderAddress, setOrderAddress] = useState<string>('');
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [orderPayment, setOrderPayment] = useState<'cod' | 'mada' | 'applepay'>('cod');
  const [orderInvoice, setOrderInvoice] = useState<string>('');
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('all');
  const [productsSearch, setProductsSearch] = useState<string>('');
  const [supportMsgText, setSupportMsgText] = useState<string>('');
  const [simulationToast, setSimulationToast] = useState<{show: boolean, title: string, desc: string} | null>(null);

  // WhatsApp-style interactive support chat states
  const [supportChats, setSupportChats] = useState<Array<{
    id: string;
    sender: 'user' | 'support';
    text: string;
    time: string;
    status: 'sent' | 'delivered' | 'read';
  }>>([
    {
      id: 'init-1',
      sender: 'support',
      text: 'مرحباً بك في الدعم الفني والتمكين الموحد لمنصة إرث أجيال (مبادرة مؤسسة التفكير والنماء) 👋',
      time: '10:30 ص',
      status: 'read'
    },
    {
      id: 'init-2',
      sender: 'support',
      text: 'يسعدنا الرد على جميع استفساراتك حول برامج الدعم والتمكين للأسر المنتجة، أو طلبات ضيوف الرحمن والزوار. كيف يمكننا مساعدتك اليوم؟',
      time: '10:31 ص',
      status: 'read'
    }
  ]);
  const [supportInput, setSupportInput] = useState<string>('');
  const [isSupportTyping, setIsSupportTyping] = useState<boolean>(false);

  const handleWhatsAppSend = (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user' as const,
      text: trimmed,
      time: timeStr,
      status: 'sent' as const
    };

    // 1. Immediately append the user's message
    setSupportChats(prev => [...prev, userMsg]);
    setSupportInput('');

    // 2. Turn checkmarks blue (read) after exactly 1.0 second (1000ms)
    setTimeout(() => {
      setSupportChats(prev => prev.map(m => m.id === userMsg.id ? { ...m, status: 'read' as const } : m));
    }, 1000);

    // 3. Simulated typing indicator appears after 200ms
    setTimeout(() => {
      setIsSupportTyping(true);
    }, 200);

    // 4. Typing indicator disappears after 2 seconds (running from 200ms to 2200ms)
    setTimeout(() => {
      setIsSupportTyping(false);
    }, 2200);

    // 5. Half-second pause (2200ms to 2700ms), then actual response bubble is added
    setTimeout(() => {
      let replyText = '';
      const t = trimmed.toLowerCase();

      if (t.includes('تمكين') || t.includes('دعم') || t.includes('مؤسسة') || t.includes('التفكير') || t.includes('نماء')) {
        replyText = 'مرحباً بك! برامج التمكين بمؤسسة التفكير والنماء تقدم حقائب تأهيل متكاملة تشمل: التدريب الحرفي المتخصص، المساعدة في استخراج التراخيص الصحية والبلدية، والربط اللوجستي والتسويقي مع ضيوف الرحمن لزيادة الدخل وتحقيق الاستدامة المالية. هل تود تقييم مشروعك عبر حاسبة التمكين الذكية؟';
      } else if (t.includes('سعر') || t.includes('اسعار') || t.includes('أسعار') || t.includes('باقة') || t.includes('باقات') || t.includes('اشتراك')) {
        replyText = 'أهلاً بك! تتيح منصة "إرث أجيال" خيارين للوصول للمأكولات والحرف التراثية:\n1️⃣ الشراء المباشر الحر لمنتج فردي دون قيود.\n2️⃣ الباقات المخصصة لضيوف الرحمن (وجبات يومية طازجة للمجموعات مع التوصيل للفنادق) بأسعار تنافسية تبدأ من 35 ريال للوجبة شاملة التوصيل والخدمات اللوجستية.';
      } else if (t.includes('توصيل') || t.includes('لوجست') || t.includes('فندق') || t.includes('مكة') || t.includes('التوصيل')) {
        replyText = 'نوفر شبكة توصيل لوجستية متكاملة ومجهزة كلياً داخل مكة المكرمة والمشاعر المقدسة. يتم نقل الوجبات بحافظات حرارية متطورة ومطابقة لمعايير الهيئة العامة للغذاء والدواء لضمان وصول الوجبات طازجة وساخنة مباشرة إلى فندقك أو مكان إقامتك.';
      } else if (t.includes('تجرب') || t.includes('يوزر') || t.includes('دخول') || t.includes('حساب') || t.includes('باسورد') || t.includes('كلمة المرور')) {
        replyText = 'يمكنك استخدام بوابتنا للدخول السريع الموحد لتجربة كافة الأدوار:\n- الأسر المنتجة: om_ahmad (المرور: 123)\n- المعتمرين: abdulrahman (المرور: 123)\n- الكادر الإداري: admin (المرور: 123)\n- السياح والزوار: john_smith (المرور: 123)';
      } else if (t.includes('سدو') || t.includes('حرف') || t.includes('تراث') || t.includes('أكل') || t.includes('جريش') || t.includes('هدايا')) {
        replyText = 'تتميز منصتنا بتقديم منتجات تراثية سعودية أصيلة وموثقة:\n🥘 أطعمة شعبية (جريش، كبسة، كليجا) مطبوخة بأيدي أسر سعودية مرخصة صحياً.\n🧶 حرف يدوية وهدايا تذكارية (نسيج السدو، صناعة الخوص، الفخار) المصنوعة يدوياً بالكامل لتعكس أصالة مكة وثقافتنا الوطنية.';
      } else if (t.includes('مرحبا') || t.includes('السلام') || t.includes('اهلين') || t.includes('أهلاً') || t.includes('هلا') || t.includes('صباح') || t.includes('مساء')) {
        replyText = 'وعليكم السلام ورحمة الله وبركاته! أهلاً بك في دعم "إرث أجيال". يسعدنا مساعدتك! يمكنك الاستفسار عن برامج التمكين، تتبع النمو، أو طلبات المأكولات والحرف التراثية لمجموعات ضيوف الرحمن 🌸';
      } else {
        replyText = `شكراً لرسالتك الجيّمة! استفسارك بخصوص "${trimmed}" تم تسجيله وتوجيهه فوراً إلى أحد مستشاري التمكين بمؤسسة التفكير والنماء.\n💡 يمكنك تصفح دليل الأسئلة الشائعة بالأسفل أو الاستفسار عن باقات المأكولات والحرف وسنقوم بمتابعة طلبك حالاً عبر الهاتف المسجل بحسابك.`;
      }

      const replyMsg = {
        id: `sup-${Date.now()}`,
        sender: 'support' as const,
        text: replyText,
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
        status: 'read' as const
      };

      setSupportChats(prev => [...prev, replyMsg]);
    }, 2700);
  };

  // Initialize and seed default users on mount
  React.useEffect(() => {
    const existing = localStorage.getItem('warath_users');
    if (!existing) {
      const DEFAULT_USERS = [
        {
          username: "om_ahmad",
          password: "123",
          idNumber: "1020304050",
          email: "om-ahmad@example.com",
          name: "أم أحمد للمأكولات التراثية",
          phone: "0501234567",
          role: "beneficiary"
        },
        {
          username: "abdulrahman",
          password: "123",
          idNumber: "2030405060",
          email: "abdulrahman@example.com",
          name: "الحاج عبد الرحمن",
          phone: "0507654321",
          role: "pilgrim"
        },
        {
          username: "john_smith",
          password: "123",
          idNumber: "A12345678",
          email: "john@example.com",
          name: "جون سميث - زائر سياحي",
          phone: "0501112222",
          role: "visitor"
        },
        {
          username: "admin",
          password: "123",
          idNumber: "1111111111",
          email: "admin@example.com",
          name: "إدارة إرث أجيال",
          phone: "0550000000",
          role: "admin"
        }
      ];
      localStorage.setItem('warath_users', JSON.stringify(DEFAULT_USERS));
    }
  }, []);

  // Visitor & Pilgrim Onboarding State
  const [visitorGoal, setVisitorGoal] = useState<string>('طلب وجبات يومية طازجة (اشتراكات موظفين/طلاب)');
  const [visitorLocation, setVisitorLocation] = useState<string>('مكة المكرمة - بطحاء قريش');
  const [visitorHealth, setVisitorHealth] = useState<string[]>([]);
  const [visitorDeliveryTime, setVisitorDeliveryTime] = useState<string>('الفترة بعد الظهر (الغداء)');
  const [visitorFamilySize, setVisitorFamilySize] = useState<number>(1);

  // Productive Family Onboarding State
  const [familyActivity, setFamilyActivity] = useState<string>('طهي');
  const [familyExperience, setFamilyExperience] = useState<string>('1-3 سنوات');
  const [familyTeamSize, setFamilyTeamSize] = useState<string>('بمفردي');
  const [familyIncome, setFamilyIncome] = useState<string>('5500');
  const [familyCostCalculation, setFamilyCostCalculation] = useState<string>('تقريباً');
  const [familyMarketingChannel, setFamilyMarketingChannel] = useState<string>('انستغرام وتيك توك');
  const [familyBrandingStatus, setFamilyBrandingStatus] = useState<string>('بسيط');
  const [familyLicenses, setFamilyLicenses] = useState<string>('لا يوجد وأرغب باستخراجها');

  // Interactive addition states
  const selectedSeason = activeTheme === 'official' ? 'normal' : activeTheme as 'founding' | 'national' | 'ramadan';
  const [dailyMeals, setDailyMeals] = useState<number>(30);
  const [mealPrice, setMealPrice] = useState<number>(35);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false);
  const [selectedProductCat, setSelectedProductCat] = useState<string>('all');
  const [productMessage, setProductMessage] = useState<string | null>(null);

  const mockSearchResults = [
    { title: 'الجريش الحساوي الأصيل', cat: 'مأكولات تراثية', family: 'أم أحمد' },
    { title: 'كليجا القصيم الفاخرة', cat: 'حلويات وحرف', family: 'أم سليمان' },
    { title: 'سدو يدوي بنقوش نجدية', cat: 'حرف يدوية', family: 'نورة العتيبي' },
    { title: 'قهوة سعودية بالهيل والزعفران', cat: 'ضيافة ومشروبات', family: 'بيت الضيافة' },
  ];

  const filteredSearch = searchQuery
    ? mockSearchResults.filter(item => item.title.includes(searchQuery) || item.cat.includes(searchQuery))
    : [];

  const handleRoleSelect = (role: 'beneficiary' | 'admin' | 'pilgrim' | 'visitor') => {
    setSelectedRole(role);
    setWizardStep(0);
    setError('');
    if (role === 'admin') {
      setAuthMode('login');
    } else {
      setAuthMode('join');
    }
    
    // Clear inputs upon role change for clean real entry
    setNameInput('');
    setRegUsername('');
    setRegIdNumber('');
    setRegPhone('');
    setRegEmail('');
    setRegPassword('');
    setLoginIdentifier('');
    setLoginPassword('');
    setPasscodeInput('');
  };

  const handleUnifiedLoginRoleSelect = (role: 'beneficiary' | 'admin' | 'pilgrim' | 'visitor') => {
    setSelectedRole(role);
    setError('');
    setAuthMode('login');
    
    setLoginIdentifier('');
    setLoginPassword('');
    setPasscodeInput('');
  };

  const handleSuggestionClick = (id: number) => {
    setError('');
    
    // Find matching suggestion to show a beautiful interactive simulation toast
    const foundLogin = SUGGESTIONS_LOGIN.find(item => item.id === id);
    const foundFeature = SUGGESTIONS_FEATURES.find(item => item.id === id);
    const activeSg = foundLogin || foundFeature;
    if (activeSg) {
      setSimulationToast({
        show: true,
        title: activeSg.title,
        desc: activeSg.desc
      });
      // Auto-dismiss after 4.5 seconds
      setTimeout(() => {
        setSimulationToast(prev => prev && prev.title === activeSg.title ? null : prev);
      }, 4500);
    }
    
    // LOGIN SUGGESTIONS (1-10)
    if (id === 1) {
      setLandingView('unified_login');
      setSelectedRole('beneficiary');
      setLoginIdentifier('om_ahmad');
      setLoginPassword('123');
      onLogin('beneficiary', 'أم أحمد للمأكولات التراثية');
    } else if (id === 2) {
      setLandingView('unified_login');
      setSelectedRole('pilgrim');
      setLoginIdentifier('abdulrahman');
      setLoginPassword('123');
      onLogin('pilgrim', 'الحاج عبد الرحمن');
    } else if (id === 3) {
      setLandingView('unified_login');
      setSelectedRole('visitor');
      setLoginIdentifier('john_smith');
      setLoginPassword('123');
      onLogin('visitor', 'جون سميث - زائر سياحي');
    } else if (id === 4) {
      setLandingView('unified_login');
      setSelectedRole('admin');
      setLoginIdentifier('admin');
      setPasscodeInput('1234');
      setLoginPassword('123');
      onLogin('admin', 'إدارة إرث أجيال');
    } else if (id === 5) {
      setLandingView('join_portals');
      setSelectedRole('beneficiary');
      setAuthMode('join');
      setWizardStep(1);
      setNameInput('أسرة هيل وزعفران للطهي الأصيل');
      setRegUsername('hail_zafran');
      setRegIdNumber('1122334455');
      setRegPhone('0599998888');
      setRegEmail('hail@example.com');
      setRegPassword('123');
      const el = document.getElementById('pathway-selection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 6) {
      setLandingView('join_portals');
      setSelectedRole('pilgrim');
      setAuthMode('join');
      setWizardStep(1);
      setNameInput('أرشاد خان (معتمر كريم)');
      setRegUsername('arshad_khan');
      setRegIdNumber('P99887766');
      setRegPhone('0599112233');
      setRegEmail('arshad@example.com');
      setRegPassword('123');
      setVisitorGoal('طلب وجبات طازجة لضيوف الرحمن (وجبات فردية خالية من الغلوتين)');
      const el = document.getElementById('pathway-selection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 7) {
      setLandingView('join_portals');
      setSelectedRole('visitor');
      setAuthMode('join');
      setWizardStep(1);
      setNameInput('Robert Miller (سائح كندي)');
      setRegUsername('robert_miller');
      setRegIdNumber('C33221144');
      setRegPhone('0509988771');
      setRegEmail('robert@example.com');
      setRegPassword('123');
      setVisitorGoal('شراء هدايا تذكارية وحرف السدو اليدوية');
      const el = document.getElementById('pathway-selection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 8) {
      setLandingView('unified_login');
      setSelectedRole('admin');
      setLoginIdentifier('admin');
      setPasscodeInput('1234');
      setLoginPassword('123');
      onLogin('admin', 'مفتش الجودة والصحة البلدية');
    } else if (id === 9) {
      setLandingView('unified_login');
      setSelectedRole('admin');
      setLoginIdentifier('admin');
      setPasscodeInput('1234');
      setLoginPassword('123');
      onLogin('admin', 'ممثّل تمويل بنك التنمية الاجتماعية');
    } else if (id === 10) {
      setLandingView('unified_login');
      setSelectedRole('admin');
      setLoginIdentifier('admin');
      setPasscodeInput('1234');
      setLoginPassword('123');
      onLogin('admin', 'منسق خدمات التوصيل واللوجستيات بمكة');
    }
    
    // FEATURE SUGGESTIONS (11-30)
    else if (id === 11) {
      setSearchQuery('جريش');
      setShowSearchDropdown(true);
      const el = document.getElementById('hero-banner');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 12) {
      setDailyMeals(85);
      setMealPrice(40);
      const el = document.getElementById('earnings-calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 13) {
      setLandingView('join_portals');
      setSelectedRole('beneficiary');
      setAuthMode('join');
      setWizardStep(1);
      const el = document.getElementById('pathway-selection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 14) {
      setLandingView('join_portals');
      setSelectedRole('visitor');
      setAuthMode('join');
      setWizardStep(1);
      setVisitorGoal('طلب عينات تذوق وتوصيل سريع للفندق');
      const el = document.getElementById('pathway-selection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 15) {
      const el = document.getElementById('impact-statistics');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 16) {
      const el = document.getElementById('platform-roadmap');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 17) {
      setFamilyCostCalculation('تفصيلي دقيق لكل وجبة');
      setDailyMeals(100);
      setMealPrice(45);
      const el = document.getElementById('earnings-calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 18) {
      setLandingView('join_portals');
      setSelectedRole('pilgrim');
      setAuthMode('join');
      setWizardStep(1);
      setVisitorGoal('طلب وجبات يومية طازجة (اشتراكات موظفين/طلاب)');
      const el = document.getElementById('pathway-selection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 19) {
      setSearchQuery('سدو');
      setShowSearchDropdown(true);
      const el = document.getElementById('hero-banner');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 20) {
      const el = document.getElementById('about-platform');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 21) {
      setActiveFaq(2);
      const el = document.getElementById('faq-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 22) {
      // automated certificates view
      const el = document.getElementById('platform-roadmap');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 23) {
      const el = document.getElementById('earnings-calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 24) {
      setLandingView('join_portals');
      setSelectedRole('beneficiary');
      setAuthMode('join');
      setWizardStep(1);
      setFamilyBrandingStatus('بسيط');
      const el = document.getElementById('pathway-selection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 25) {
      setSearchQuery('مطبخ');
      setShowSearchDropdown(true);
      const el = document.getElementById('hero-banner');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 26) {
      setLandingView('join_portals');
      setSelectedRole('pilgrim');
      setAuthMode('join');
      setWizardStep(1);
      setVisitorDeliveryTime('الفترة الصباحية (الإفطار التراثي)');
      const el = document.getElementById('pathway-selection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 27) {
      setTestimonialIndex(1);
      const el = document.getElementById('testimonials');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 28) {
      const el = document.getElementById('platform-roadmap');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 29) {
      setLandingView('join_portals');
      setSelectedRole('visitor');
      setAuthMode('join');
      setWizardStep(1);
      setVisitorGoal('تجربة الأطعمة التراثية السعودية (سياحة وتذوق ثقافي)');
      const el = document.getElementById('pathway-selection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 30) {
      const el = document.getElementById('platform-roadmap');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');

    if (isBruteForceLocked) {
      setError(`النظام مقفل مؤقتاً لحماية حسابك. الرجاء المحاولة بعد ${Math.ceil(lockTimer / 60)} دقيقة أو التواصل مع الدعم الفني.`);
      return;
    }

    const cleanPhone = otpPhone.replace(/\D/g, '');
    if (cleanPhone.length < 9) {
      setError('يرجى إدخال رقم جوال سعودي صحيح مكون من 9 أرقام على الأقل (مثال: 501234567)');
      return;
    }

    // Simulate OTP Code generation
    const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
    setSimulatedReceivedOtp(generatedCode);
    setOtpSent(true);
    setOtpTimer(60);

    // Trigger simulation toast
    setSimulationToast({
      show: true,
      title: 'إشعار تأكيد رمز التحقق (SMS) 📩',
      desc: `[إرث أجيال] رمز التحقق الموحد لمرة واحدة (OTP) الخاص بك هو: ${generatedCode}`
    });
    
    // Automatically close simulation toast after 15 seconds
    setTimeout(() => {
      setSimulationToast(null);
    }, 15000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isBruteForceLocked) {
      setError(`تم قفل الدخول مؤقتاً. يرجى الانتظار أو استخدام شات الدعم الفني.`);
      return;
    }

    if (otpCode !== simulatedReceivedOtp) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      if (newAttempts >= 3) {
        setIsBruteForceLocked(true);
        setLockTimer(300); // 5 minutes lockout
        setError('⚠️ عذراً، لقد تجاوزت الحد المسموح به للمحاولات (3 محاولات خاطئة). تم قفل الدخول مؤقتاً لمدة 5 دقائق لحماية حسابك. يمكنك التواصل مع الدعم الفني عبر الواتساب.');
      } else {
        setError(`رمز التحقق غير صحيح! المحاولات المتبقية: ${3 - newAttempts}`);
      }
      return;
    }

    // Verification successful! Check user existence
    const storedUsersStr = localStorage.getItem('warath_users');
    const storedUsers = storedUsersStr ? JSON.parse(storedUsersStr) : [];
    
    // Find user by phone number
    const matched = storedUsers.find((u: any) => {
      const uPhoneClean = u.phone ? u.phone.replace(/\D/g, '') : '';
      const inputPhoneClean = otpPhone.replace(/\D/g, '');
      return uPhoneClean === inputPhoneClean || uPhoneClean.endsWith(inputPhoneClean) || inputPhoneClean.endsWith(uPhoneClean);
    });

    if (matched) {
      // Pre-existing user logged in successfully!
      setSimulationToast({
        show: true,
        title: `مرحباً بك مجدداً ${matched.name} 🎉`,
        desc: 'تم تسجيل دخولك الآمن بنجاح عبر النظام الموحد.'
      });
      setTimeout(() => setSimulationToast(null), 4000);
      onLogin(matched.role, matched.name);
    } else {
      // Auto-Registration Flow! Register new user as beneficiary
      const defaultName = `أم البواسل للتراث المكي`;
      const defaultUsername = `user_${otpPhone.replace(/\D/g, '').slice(-6)}`;
      const newUser = {
        username: defaultUsername,
        password: '123',
        idNumber: `10${Math.floor(10000000 + Math.random() * 90000000)}`, // simulated 10-digit national ID
        email: `${defaultUsername}@warath-ajyal.sa`,
        name: defaultName,
        phone: otpPhone,
        role: 'beneficiary' as const
      };
      
      storedUsers.push(newUser);
      localStorage.setItem('warath_users', JSON.stringify(storedUsers));

      // Store onboarding answers
      const onboardingAnswers = {
        name: defaultName,
        username: defaultUsername,
        phone: otpPhone,
        registered: true
      };
      localStorage.setItem('onboarding_answers', JSON.stringify(onboardingAnswers));
      
      // Dynamic Redirection to Questionnaire (Smart Evaluation tab)
      localStorage.setItem('warth_target_tab', 'evaluation');

      setSimulationToast({
        show: true,
        title: 'تم التسجيل التلقائي والدخول بنجاح! 🎉',
        desc: 'رقمك جديد بالمنصة! تم توثيق حسابك ونقلك فوراً إلى استبيان الجاهزية للتمكين.'
      });
      setTimeout(() => setSimulationToast(null), 8000);

      onLogin('beneficiary', defaultName);
    }
  };

  const handleBiometricLoginSimulate = () => {
    setIsBiometricVerifying(true);
    setError('');
    setTimeout(() => {
      setIsBiometricVerifying(false);
      setShowBiometricSuccess(true);
      setTimeout(() => {
        setShowBiometricSuccess(false);
        // Log in as Om Ahmad (the primary predefined user)
        const storedUsersStr = localStorage.getItem('warath_users');
        const storedUsers = storedUsersStr ? JSON.parse(storedUsersStr) : [];
        const omAhmad = storedUsers.find((u: any) => u.username === 'om_ahmad') || storedUsers[0];
        if (omAhmad) {
          onLogin(omAhmad.role, omAhmad.name);
        }
      }, 1500);
    }, 2000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginIdentifier.trim()) {
      setError('يرجى إدخال اليوزر أو البريد الإلكتروني أو رقم الهوية الوطنية/جواز السفر');
      return;
    }

    if (!loginPassword.trim()) {
      setError('يرجى إدخال كلمة المرور');
      return;
    }

    // Load registered users database from localStorage
    const storedUsersStr = localStorage.getItem('warath_users');
    const storedUsers = storedUsersStr ? JSON.parse(storedUsersStr) : [];

    // Find matching user with matching credential (username OR email OR idNumber) AND password
    const matched = storedUsers.find((u: any) => 
      (u.username === loginIdentifier.trim() || u.idNumber === loginIdentifier.trim() || u.email === loginIdentifier.trim()) &&
      u.password === loginPassword
    );

    if (matched) {
      onLogin(matched.role, matched.name);
      return;
    }

    // Fallback for admin if not found in db
    if (loginIdentifier.trim() === 'admin' && (loginPassword === '123' || passcodeInput === '1234' || loginPassword === '1234')) {
      onLogin('admin', 'إدارة إرث أجيال');
      return;
    }

    setError('عذراً، لم نجد حساباً متطابقاً. يرجى التثبت من اسم المستخدم/الهوية/البريد وكلمة المرور المدخلة.');
  };

  const handleRegisterUser = () => {
    if (!nameInput.trim()) {
      setError('يرجى إدخال الاسم الكريم للمتابعة');
      return false;
    }
    if (!regUsername.trim()) {
      setError('يرجى تحديد اسم مستخدم (يوزر) خاص بك');
      return false;
    }
    if (!regIdNumber.trim()) {
      setError('يرجى إدخال رقم الهوية الوطنية أو جواز السفر لتوثيق نفاذ');
      return false;
    }
    if (!regPhone.trim()) {
      setError('يرجى إدخال رقم الجوال للربط برسائل التحقق');
      return false;
    }
    if (!regEmail.trim()) {
      setError('يرجى إدخال البريد الإلكتروني');
      return false;
    }
    if (!regPassword.trim()) {
      setError('يرجى تحديد كلمة المرور الخاصة بك');
      return false;
    }

    // Save user to localStorage database
    const storedUsersStr = localStorage.getItem('warath_users');
    const storedUsers = storedUsersStr ? JSON.parse(storedUsersStr) : [];

    const duplicate = storedUsers.find((u: any) => 
      u.username === regUsername.trim() || 
      u.idNumber === regIdNumber.trim() || 
      u.email === regEmail.trim()
    );

    if (duplicate && duplicate.role === selectedRole) {
      // User already exists, we will update or proceed
    } else {
      const newUser = {
        username: regUsername.trim(),
        password: regPassword,
        idNumber: regIdNumber.trim(),
        email: regEmail.trim(),
        name: nameInput.trim(),
        phone: regPhone.trim(),
        role: selectedRole
      };
      storedUsers.push(newUser);
      localStorage.setItem('warath_users', JSON.stringify(storedUsers));
    }

    // Store onboarding answers so they can be loaded throughout App.tsx
    const onboardingAnswers = {
      name: nameInput.trim(),
      visitorGoal,
      visitorLocation,
      visitorHealth,
      visitorDeliveryTime,
      visitorFamilySize,
      username: regUsername.trim(),
      idNumber: regIdNumber.trim(),
      phone: regPhone.trim(),
      email: regEmail.trim(),
      registered: true
    };
    localStorage.setItem('onboarding_answers', JSON.stringify(onboardingAnswers));

    onLogin(selectedRole!, nameInput.trim());
    return true;
  };

  const [purchaseError, setPurchaseError] = useState<string>('');

  const handleConfirmPurchase = () => {
    if (!orderName.trim() || !orderPhone.trim() || !orderAddress.trim()) {
      setPurchaseError('الرجاء تعبئة جميع الحقول المطلوبة (الاسم، الجوال، فندق أو عنوان التوصيل)');
      return;
    }
    setPurchaseError('');
    
    const invoiceNum = `INV-${Date.now().toString().slice(-6)}`;
    const newOrder = {
      id: invoiceNum,
      productName: selectedProduct?.name,
      productPrice: selectedProduct?.price,
      family: selectedProduct?.family,
      buyerName: orderName,
      buyerPhone: orderPhone,
      deliveryAddress: orderAddress,
      quantity: orderQuantity,
      paymentMethod: orderPayment === 'cod' ? 'الدفع عند الاستلام' : orderPayment === 'mada' ? 'مدى' : 'Apple Pay',
      totalAmount: (selectedProduct?.price || 0) * orderQuantity + 15,
      date: new Date().toLocaleDateString('ar-SA'),
      status: 'new'
    };

    try {
      const existing = localStorage.getItem('warth_orders');
      const orders = existing ? JSON.parse(existing) : [];
      orders.push(newOrder);
      localStorage.setItem('warth_orders', JSON.stringify(orders));
      
      setOrderInvoice(invoiceNum);
      setPurchaseSuccess(true);
      
      // Clear fields
      setOrderName('');
      setOrderPhone('');
      setOrderAddress('');
      setOrderQuantity(1);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendSupportTicketLocal = (msgText: string) => {
    if (!msgText.trim()) return;
    try {
      const existing = localStorage.getItem('warth_support_tickets');
      const tickets = existing ? JSON.parse(existing) : [];
      const newTicket = {
        id: `ST-${Date.now().toString().slice(-6)}`,
        message: msgText,
        name: nameInput.trim() || 'زائر غير مسجل',
        phone: regPhone || 'غير متوفر',
        email: regEmail || 'غير متوفر',
        date: new Date().toLocaleDateString('ar-SA'),
        status: 'pending',
        reply: ''
      };
      tickets.push(newTicket);
      localStorage.setItem('warth_support_tickets', JSON.stringify(tickets));
      
      setSupportMsgText('');
      setSupportMessageSent(true);
      
      // Dispatch event to sync
      window.dispatchEvent(new Event('warth-support-updated'));
    } catch (e) {
      console.error(e);
    }
  };

  if (landingView === 'standalone_consulting') {
    return (
      <ConsultingPage 
        onBackToHome={() => {
          setLandingView('options');
          window.location.hash = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSupport={() => {
          window.dispatchEvent(new CustomEvent('open-smart-support'));
        }}
      />
    );
  }

  if (landingView === 'standalone_services') {
    return (
      <ServicesPage 
        onBackToHome={() => {
          setLandingView('options');
          window.location.hash = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToStore={() => {
          setLandingView('standalone_store');
          window.location.hash = '/store';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToConsulting={() => {
          setLandingView('standalone_consulting');
          window.location.hash = '/consulting';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSupport={() => {
          window.dispatchEvent(new CustomEvent('open-smart-support'));
        }}
      />
    );
  }

  if (landingView === 'standalone_about') {
    return (
      <AboutPage 
        onBackToHome={() => {
          setLandingView('options');
          window.location.hash = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSupport={() => {
          window.dispatchEvent(new CustomEvent('open-smart-support'));
        }}
      />
    );
  }

  if (landingView === 'standalone_initiatives') {
    return (
      <InitiativesPage 
        onBackToHome={() => {
          setLandingView('options');
          window.location.hash = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSupport={() => {
          window.dispatchEvent(new CustomEvent('open-smart-support'));
        }}
      />
    );
  }

  if (landingView === 'standalone_membership') {
    return (
      <MembershipPage 
        onBackToHome={() => {
          setLandingView('options');
          window.location.hash = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSupport={() => {
          window.dispatchEvent(new CustomEvent('open-smart-support'));
        }}
      />
    );
  }

  if (landingView === 'standalone_news') {
    return (
      <NewsPage 
        onBackToHome={() => {
          setLandingView('options');
          window.location.hash = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSupport={() => {
          window.dispatchEvent(new CustomEvent('open-smart-support'));
        }}
      />
    );
  }

  if (landingView === 'standalone_contact') {
    return (
      <ContactPage 
        onBackToHome={() => {
          setLandingView('options');
          window.location.hash = '';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSupport={() => {
          window.dispatchEvent(new CustomEvent('open-smart-support'));
        }}
      />
    );
  }

  if (landingView === 'standalone_store') {
    return (
      <div className="space-y-8 text-right min-h-screen py-4 px-2 md:px-4" id="landing-container">
        {/* 🛒 Dedicated Standalone Store Page View (/store or #store) */}
        <div className="max-w-7xl mx-auto space-y-8 text-right animate-fade-in" id="standalone-store-page">
          {/* Navigation Top Bar / Back button */}
          <div className="flex items-center justify-between bg-white border border-stone-200 p-4 rounded-2xl shadow-sm">
            <button
              type="button"
              onClick={() => {
                setLandingView('options');
                window.location.hash = '';
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs hover:shadow-sm"
            >
              <span>← العودة إلى الصفحة الرئيسية</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm font-black text-stone-800">متجر إرث أجيال التراثي المستقل (/store)</span>
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping"></span>
            </div>
          </div>

          {/* Standalone Store Hero Header */}
          <div className="bg-gradient-to-r from-[#174F3E] via-primary to-emerald-900 text-white p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-xl border border-accent/30">
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent opacity-15 rounded-full blur-3xl -mr-24 -mt-24"></div>
            
            <div className="relative z-10 space-y-4 max-w-3xl">
              <span className="text-accent text-xs font-black bg-white/10 border border-accent/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" />
                متجر المأكولات والتراث الشعبي السعودي (الشراء المباشر للجميع) 🛍️
              </span>
              <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight">
                تسوّق أشهى الوجبات التراثية والحرف اليدوية الأصلية
              </h1>
              <p className="text-stone-200 text-xs md:text-sm font-light leading-relaxed">
                متاح للجميع! سواءً كنت معتمراً، سائحاً، أو زائراً، يمكنك الآن اقتناء الروائح الفاخرة، المأكولات التراثية الطازجة، والمنسوجات التذكارية وتوصيلها فوراً إلى فندقك في مكة المكرمة والمدينة المنورة دون الحاجة للاشتراك في أي باقات!
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setLandingView('unified_login');
                    setSelectedRole('pilgrim');
                    setAuthMode('login');
                    setLoginIdentifier('abdulrahman');
                    setLoginPassword('123');
                    setError('');
                    const el = document.getElementById('pathway-selection');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-accent hover:bg-accent/90 text-primary font-black py-3 px-6 rounded-2xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                >
                  <span>🕋 دخول المعتمرين والسياح للشراء السريع</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLandingView('family_landing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                >
                  <span>👩‍🍳 انضمام كـ أسرة منتجة لبيع منتجاتك</span>
                </button>
              </div>
            </div>
          </div>

          {/* Full Product Catalog Block */}
          <div className="bg-white border border-stone-200 p-6 md:p-8 rounded-3xl space-y-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-3 items-center justify-between border-b border-stone-100 pb-4">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                {[
                  { id: 'all', label: 'الكل' },
                  { id: 'culinary', label: '🥘 طهي تراثي' },
                  { id: 'crafts', label: '👜 حرف يدوية' },
                  { id: 'hospitality', label: '☕ ضيافة عربية' },
                  { id: 'perfumes', label: '✨ روائح وبخور' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCatFilter(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedCatFilter === tab.id
                        ? 'bg-[#174F3E] text-white shadow-sm'
                        : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Product Search inside store */}
              <div className="w-full md:w-72 relative">
                <input
                  type="text"
                  placeholder="ابحث داخل المتجر..."
                  value={productsSearch}
                  onChange={(e) => setProductsSearch(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-right"
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DEFAULT_PRODUCTS.filter(p => {
                const matchesCat = selectedCatFilter === 'all' || p.category === selectedCatFilter;
                const matchesSearch = p.name.includes(productsSearch) || p.description.includes(productsSearch) || p.family.includes(productsSearch);
                return matchesCat && matchesSearch;
              }).map((prod) => (
                <div 
                  key={prod.id}
                  className="border border-stone-200 hover:border-[#174F3E] bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img 
                      src={prod.imageUrl} 
                      alt={prod.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-[#174F3E] font-black text-[10px] px-2.5 py-1 rounded-lg border border-stone-200 shadow-xs">
                      {prod.categoryLabel}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5 text-right">
                      <h4 className="font-extrabold text-stone-800 text-xs md:text-sm group-hover:text-[#174F3E] transition-colors">
                        {prod.name}
                      </h4>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] text-stone-400 font-bold">
                          إعداد: {prod.family}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            localStorage.setItem('warth_target_tab', 'story');
                            onLogin('visitor', prod.family);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-[10px] text-primary hover:text-emerald-700 font-black flex items-center gap-0.5 cursor-pointer underline hover:scale-[1.02] transition-transform"
                          title="توجيه مباشر إلى الملف المهني الرقمي للأسرة ونظارة الحكايات StoryLens"
                        >
                          <span>الملف المهني للأسرة 👓</span>
                        </button>
                      </div>
                      <p className="text-stone-500 text-[11px] font-light leading-relaxed line-clamp-2">
                        {prod.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-200/50 flex items-center justify-between">
                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 block font-light">السعر الفوري</span>
                        <span className="text-sm font-black font-mono text-[#174F3E]">{prod.price} ر.س</span>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProduct(prod);
                          setPurchaseSuccess(false);
                          setPurchaseError('');
                        }}
                        className="bg-[#174F3E] hover:bg-[#174F3E]/95 text-white font-black text-[10px] sm:text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                      >
                        <span>شراء سريع 🛒</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {DEFAULT_PRODUCTS.filter(p => {
                const matchesCat = selectedCatFilter === 'all' || p.category === selectedCatFilter;
                const matchesSearch = p.name.includes(productsSearch) || p.description.includes(productsSearch) || p.family.includes(productsSearch);
                return matchesCat && matchesSearch;
              }).length === 0 && (
                <div className="col-span-full text-center py-8 bg-stone-50 border border-dashed border-stone-200 rounded-2xl text-stone-400 text-xs font-light">
                  لا توجد منتجات مطابقة لخيارات الفلترة الحالية. جرب تصفح فئات أخرى!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 💳 Exquisite Direct Purchase Modal (Buy without packages) */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden text-right flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-[#174F3E] p-4 text-white flex items-center justify-between">
                <button 
                  type="button"
                  onClick={() => {
                    setSelectedProduct(null);
                    setPurchaseSuccess(false);
                  }}
                  className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
                >
                  إغلاق ✕
                </button>
                <div className="flex items-center gap-2">
                  <div>
                    <h4 className="font-extrabold text-xs md:text-sm">الشراء الفوري المباشر 🛍️</h4>
                    <p className="text-[10px] text-accent/85 font-light">دون اشتراك أو باقات مسبقة</p>
                  </div>
                  <div className="bg-white/10 p-2 rounded-xl">
                    <ShoppingBag className="w-5 h-5 text-accent" />
                  </div>
                </div>
              </div>

              {/* Modal Scrollable Content */}
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                {!purchaseSuccess ? (
                  <>
                    {/* Product quick summary card */}
                    <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 flex gap-3 items-center text-right">
                      <img 
                        src={selectedProduct.imageUrl} 
                        alt={selectedProduct.name} 
                        className="w-16 h-16 object-cover rounded-xl border border-stone-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-0.5 flex-1 text-right">
                        <span className="text-[10px] bg-[#EBF1FA] text-[#174F3E] px-2 py-0.5 rounded-full font-bold">
                          {selectedProduct.categoryLabel}
                        </span>
                        <h5 className="font-bold text-stone-800 text-xs md:text-sm">{selectedProduct.name}</h5>
                        <p className="text-[10px] text-stone-400 font-medium">إعداد: {selectedProduct.family}</p>
                        <p className="text-[11px] text-stone-500 font-mono font-bold">السعر الفردي: {selectedProduct.price} ر.س</p>
                      </div>
                    </div>

                    {/* Warning label showing no package constraint */}
                    <div className="bg-amber-50 text-amber-900 p-3 rounded-xl border border-amber-200/80 flex items-center gap-2 text-[10px] text-right">
                      <span>🎉</span>
                      <span><strong>ميزة الشراء الحر المباشر مفعلة!</strong> يمكنك إكمال الطلب الآن والحصول على توصيل سريع دون الحاجة لشراء باقة أو اشتراك.</span>
                    </div>

                    {/* Validation message if any */}
                    {purchaseError && (
                      <div className="bg-red-50 text-red-700 p-2.5 rounded-xl border border-red-100 text-[10px] font-bold text-center">
                        ⚠ {purchaseError}
                      </div>
                    )}

                    {/* Buyer Form Fields */}
                    <div className="space-y-3 pt-2 text-right">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-stone-700">الاسم الكامل للمستلم <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            placeholder="مثال: عبدالرحمن مكي"
                            value={orderName}
                            onChange={(e) => setOrderName(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-[#174F3E] outline-none text-right"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-stone-700">رقم الجوال للمتابعة والتوصيل <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            placeholder="مثال: 050XXXXXXX"
                            value={orderPhone}
                            onChange={(e) => setOrderPhone(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-[#174F3E] outline-none text-left"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-stone-700">عنوان التوصيل أو فندق الإقامة بمكة/المدينة <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          placeholder="مثال: فندق هيلتون مكة، البرج الغربي، غرفة 402"
                          value={orderAddress}
                          onChange={(e) => setOrderAddress(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-[#174F3E] outline-none text-right"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-stone-700">الكمية المطلوبة:</label>
                          <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl p-1.5 justify-center">
                            <button 
                              type="button" 
                              onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                              className="w-7 h-7 rounded-lg bg-white border border-stone-200 font-bold text-stone-700 text-xs flex items-center justify-center hover:bg-stone-100"
                            >
                              -
                            </button>
                            <span className="font-mono font-black text-xs px-3">{orderQuantity}</span>
                            <button 
                              type="button" 
                              onClick={() => setOrderQuantity(orderQuantity + 1)}
                              className="w-7 h-7 rounded-lg bg-white border border-stone-200 font-bold text-stone-700 text-xs flex items-center justify-center hover:bg-stone-100"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[11px] font-bold text-stone-700">طريقة الدفع:</label>
                          <select 
                            value={orderPayment}
                            onChange={(e) => setOrderPayment(e.target.value as any)}
                            className="w-full p-2.5 rounded-xl border border-stone-200 text-xs bg-white focus:ring-1 focus:ring-primary outline-none font-medium text-right"
                          >
                            <option value="cod">الدفع عند الاستلام بالفندق (Cash/POS) 💵</option>
                            <option value="mada">بطاقة مدى / فيزا (دفع إلكتروني آمن) 💳</option>
                            <option value="applepay">Apple Pay 🍏</option>
                          </select>
                        </div>
                      </div>

                      {/* Total Calculation */}
                      <div className="bg-[#174F3E]/5 p-3 rounded-2xl border border-[#174F3E]/10 flex items-center justify-between text-right">
                        <div>
                          <span className="text-[10px] text-stone-500 font-medium block">الإجمالي الكلي المباشر:</span>
                          <span className="text-xs text-stone-400 font-light">(شامل الضريبة المضافة والتوصيل الفندقي)</span>
                        </div>
                        <span className="text-base font-black font-mono text-[#174F3E]">
                          {(selectedProduct.price * orderQuantity) + 15} ر.س
                        </span>
                      </div>
                    </div>

                    {/* Submit Purchase Order Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (!orderName.trim() || !orderPhone.trim() || !orderAddress.trim()) {
                          setPurchaseError('يرجى تعبئة كافة الحقول المطلوبة (الاسم، الجوال، والعنوان/الفندق)');
                          return;
                        }
                        const invoiceNum = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
                        setOrderInvoice(invoiceNum);
                        setPurchaseSuccess(true);
                        setPurchaseError('');
                        
                        setSimulationToast({
                          show: true,
                          title: `تم إرسال طلب الشراء المباشر بنجاح! 🎉`,
                          desc: `رقم الفاتورة: ${invoiceNum} - تم توجيه الطلب إلى المطبخ المعتمد للبدء في التجهيز الفوري.`
                        });
                        setTimeout(() => setSimulationToast(null), 7000);
                      }}
                      className="w-full bg-[#174F3E] hover:bg-[#174F3E]/95 text-white font-black py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <span>تأكيد الطلب والشراء المباشر الفوري 🛍️</span>
                    </button>
                  </>
                ) : (
                  /* Success Invoice State */
                  <div className="text-center space-y-4 py-4 text-stone-800">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-2xl shadow-sm animate-bounce">
                      ✓
                    </div>
                    
                    <div className="space-y-1">
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 font-black px-3 py-1 rounded-full border border-emerald-200">
                        تم تأكيد عملية الشراء المباشر بنجاح
                      </span>
                      <h4 className="font-black text-stone-800 text-base md:text-lg">شكراً لك، {orderName}!</h4>
                      <p className="text-stone-500 text-xs font-light max-w-xs mx-auto">
                        تم قبول طلبك فوراً وتوجيهه إلى المطبخ/الورشة التراثية المعتمدة لطبخه وتغليفه.
                      </p>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-right text-xs">
                      <div className="flex justify-between border-b border-stone-200 pb-1.5 font-mono">
                        <span className="text-stone-400">رقم الفاتورة:</span>
                        <span className="font-bold text-[#174F3E]">{orderInvoice}</span>
                      </div>
                      <div className="flex justify-between border-b border-stone-200 pb-1.5">
                        <span className="text-stone-400">المنتج المطلوبة:</span>
                        <span className="font-bold text-stone-800">{selectedProduct.name} ({orderQuantity})</span>
                      </div>
                      <div className="flex justify-between border-b border-stone-200 pb-1.5">
                        <span className="text-stone-400">عنوان التسليم:</span>
                        <span className="font-bold text-stone-800">{orderAddress}</span>
                      </div>
                      <div className="flex justify-between font-bold text-primary pt-1">
                        <span>المبلغ الإجمالي المدفوع:</span>
                        <span className="font-mono text-sm">{(selectedProduct.price * orderQuantity) + 15} ر.س</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-stone-400 leading-relaxed font-light">
                      🚚 سيتم التواصل معك عبر رقم الجوال ({orderPhone}) لتأكيد موعد وصول مندوب التوصيل إلى الفندق.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProduct(null);
                        setPurchaseSuccess(false);
                      }}
                      className="bg-[#174F3E] text-white hover:bg-[#174F3E]/90 font-black py-2.5 px-8 rounded-xl text-xs transition-all cursor-pointer"
                    >
                      فهمت ذلك ومتابعة التصفح
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Interactive Simulation Success Toast */}
        {simulationToast && simulationToast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="fixed bottom-5 left-5 md:left-8 z-[9999] max-w-sm w-full bg-white/95 backdrop-blur-md border-2 border-[#C8A96B] rounded-2xl shadow-2xl p-4 text-right flex items-start gap-3.5"
            id="simulation-toast-alert"
          >
            <div className="bg-[#C8A96B] text-white p-2.5 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div className="space-y-1 flex-grow">
              <div className="flex items-center justify-between gap-2">
                <span className="font-black text-stone-800 text-[11px] md:text-xs bg-amber-50 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                  ⚡ إجراء تنفيذي مباشر ناجح
                </span>
                <button 
                  type="button" 
                  onClick={() => setSimulationToast(null)}
                  className="text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <h4 className="font-extrabold text-[#174F3E] text-xs leading-relaxed pt-0.5">{simulationToast.title}</h4>
              <p className="text-[10px] text-stone-500 font-light leading-relaxed">{simulationToast.desc}</p>
            </div>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-10 text-right pb-16 md:pb-8" id="landing-container">


      {/* 🔴 Section 1: القسم الرئيسي Hero Header */}
      <div 
        className="bg-gradient-to-bl from-[#022c22] via-[#064e3b] to-[#0f5132] text-white p-6 md:p-12 lg:p-14 rounded-3xl relative overflow-hidden shadow-2xl border border-amber-500/20 text-right dir-rtl" 
        id="hero-banner"
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#c59b27]/15 rounded-full blur-3xl -ml-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl -mr-20 -mb-20 pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Right Column: Hero Copy & Search & Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 bg-amber-400/15 border border-amber-400/30 text-amber-300 px-4 py-1.5 rounded-full text-xs font-black shadow-xs">
              <span>🇸🇦 {t('hero.badge')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              {t('hero.title')}
            </h1>

            <p className="text-amber-100/90 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-2xl">
              {t('hero.subtitle')}
            </p>

            {/* Primary Entry Gateway Doors (الأسر المنتجة vs العميل) - Mobile Optimized */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
              {/* Door 1: رائدات ورواد العمل الحر والمشاريع الصغيرة */}
              <button
                onClick={() => {
                  window.location.hash = '#/portal/families';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-amber-400 hover:bg-amber-300 text-[#174F3E] font-black p-2.5 sm:p-3 rounded-2xl text-xs sm:text-sm transition-all shadow-lg hover:scale-[1.02] cursor-pointer flex items-center justify-between border-2 border-amber-200 text-right"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/20 text-[#174F3E] flex items-center justify-center text-base sm:text-lg shrink-0">
                    👩‍🍳
                  </div>
                  <div>
                    <span className="block font-black text-stone-900 leading-tight">بوابة رائدات ورواد العمل الحر والمشاريع الصغيرة</span>
                    <span className="block text-[9px] sm:text-[10px] text-stone-700 font-bold">التأهيل والتمكين والمبيعات</span>
                  </div>
                </div>
                <ChevronLeft className={`w-4 h-4 text-[#174F3E] shrink-0 ${isEn ? 'rotate-180' : ''}`} />
              </button>

              {/* Door 2: العميل (مشتري • سائح • معتمر) */}
              <button
                onClick={() => {
                  window.location.hash = '#/portal/customer';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white hover:bg-stone-100 text-[#174F3E] font-black p-2.5 sm:p-3 rounded-2xl text-xs sm:text-sm transition-all shadow-lg hover:scale-[1.02] cursor-pointer flex items-center justify-between border-2 border-emerald-300 text-right"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-emerald-600/15 text-emerald-800 flex items-center justify-center text-base sm:text-lg shrink-0">
                    🛍️
                  </div>
                  <div>
                    <span className="block font-black text-stone-900 leading-tight">بوابة العميل الشاملة</span>
                    <span className="block text-[9px] sm:text-[10px] text-emerald-800 font-bold">المشتري • السائح • المعتمر</span>
                  </div>
                </div>
                <ChevronLeft className={`w-4 h-4 text-[#174F3E] shrink-0 ${isEn ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Search Bar Autocomplete inside Hero */}
            <div className="max-w-xl relative pt-3">
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex items-center shadow-inner">
                <span className="p-2 text-amber-300">🔍</span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  onFocus={() => setShowSearchDropdown(true)}
                  placeholder="ابحث عن أكلة شعبية أو هدية تراثية (مثال: جريش، كليجا، سدو، قهوة)..." 
                  className="w-full bg-transparent text-white placeholder-white/60 text-xs focus:outline-none px-2 py-1"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-[10px] bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-lg ml-2 cursor-pointer"
                  >
                    مسح
                  </button>
                )}
              </div>

              {/* Autocomplete dropdown results */}
              {showSearchDropdown && searchQuery && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 text-right p-3 z-50 text-stone-800 space-y-2 max-h-60 overflow-y-auto">
                  <div className="text-[10px] text-stone-400 font-bold border-b pb-1.5 flex justify-between items-center">
                    <span>نتائج البحث الفوري بالذكاء الاصطناعي:</span>
                    <button onClick={() => setShowSearchDropdown(false)} className="text-red-500 hover:underline">إغلاق</button>
                  </div>
                  {filteredSearch.length > 0 ? (
                    filteredSearch.map((item, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => {
                          setSearchQuery(item.title);
                          setShowSearchDropdown(false);
                        }}
                        className="p-2 hover:bg-stone-50 rounded-xl cursor-pointer flex justify-between items-center transition-all"
                      >
                        <div>
                          <span className="text-xs font-bold text-stone-800 block">{item.title}</span>
                          <span className="text-[9px] text-stone-400 font-light">من إعداد الأسرة المنتجة: {item.family}</span>
                        </div>
                        <span className="text-[9px] bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-full">{item.cat}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-xs text-stone-400 font-light">
                      لا توجد نتائج مطابقة، جرّب كتابة "جريش" أو "كليجا" لتظهر لك ميزة الفلترة!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Left Column: Rich Saudi Heritage Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/30 shadow-2xl bg-stone-900 group">
              <img 
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=900" 
                alt="ضيافة ومنتجات إرث أجيال" 
                className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent"></div>
              
              <div className="absolute bottom-4 right-4 left-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300">
                  <span>☕ ضيافة وحرف سعودية أصيلة</span>
                  <span className="bg-amber-400 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full">جودة معتمدة</span>
                </div>
                <p className="text-[11px] text-stone-200 font-light">
                  منتجات منزلية، وجبات حجازية طازجة، هدايا تراثية، وتجارب حية صُنعت بأيدٍ سعودية.
                </p>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-4 -right-4 bg-white text-stone-900 border border-amber-300 p-3 rounded-2xl shadow-xl flex items-center gap-3 font-bold text-xs hidden sm:flex">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg font-black">
                🏅
              </div>
              <div>
                <span className="block font-black text-stone-900">أسر منتجة معتمدة</span>
                <span className="text-[10px] text-stone-500 font-normal">تمكين اقتصادي وترخيص موثق</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Pathway Selection and Login Form */}
      <div id="pathway-selection" className="scroll-mt-20">
        {!selectedRole ? (
          <>
          {landingView === 'options' ? (
            <MainLandingSections 
              setLandingView={setLandingView}
              setSelectedProduct={setSelectedProduct}
              setShowSupport={setShowSupport}
              setSupportInitialInfo={setSupportInitialInfo}
            />
          ) : landingView === 'family_landing' ? (
            /* Dedicated Standalone Landing Page for Productive Families & Artisans */
            <div className="max-w-5xl mx-auto space-y-8 text-right animate-fade-in py-4" id="family-dedicated-landing">
              {/* Navigation Top Bar / Back button */}
              <div className="flex items-center justify-between bg-white border border-stone-200 p-4 rounded-2xl shadow-sm">
                <button
                  type="button"
                  onClick={() => {
                    setLandingView('options');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>← العودة إلى الرئيسية (بوابة المعتمرين والسياح)</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-stone-800">بوابة رائدات ورواد العمل الحر والمشاريع الصغيرة</span>
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                </div>
              </div>

              {/* Hero Header for Productive Families */}
              <div className="bg-gradient-to-r from-[#C8A96B] via-[#9E8447] to-[#7D6732] text-white p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-xl border border-accent/40">
                <div className="absolute top-0 right-0 w-80 h-80 bg-accent opacity-15 rounded-full blur-3xl -mr-24 -mt-24"></div>
                
                <div className="relative z-10 space-y-4 max-w-3xl">
                  <span className="text-accent text-xs font-black bg-white/10 border border-accent/30 px-3.5 py-1.5 rounded-full inline-block">
                    برنامج إرث أجيال لتمكين رائدات ورواد العمل الحر والمشاريع الصغيرة 🇸🇦
                  </span>
                  <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight">
                    من التأهيل والتدريب إلى التمكين المالي والتمويل بدون كفيل
                  </h1>
                  <p className="text-emerald-100 text-xs md:text-sm font-light leading-relaxed">
                    نرافقك خطوة بخطوة من تحويل الشغف بالطهي والحرف إلى مشروعات اقتصادية مرخصة ومستدامة. نوصل مأكولاتك ومنتجاتك مباشرة لوفود المعتمرين والحجاج والسياح بمكة المكرمة والمدينة المنورة.
                  </p>

                  {/* Action Buttons inside Hero */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setLandingView('join_portals');
                        setSelectedRole('beneficiary');
                        setAuthMode('join');
                        const el = document.getElementById('pathway-selection');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-accent hover:bg-accent/90 text-primary font-black py-3 px-6 rounded-2xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                    >
                      <span>✍️ تسجيل أسرة جديدة (تقديم طلب الانضمام)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLandingView('unified_login');
                        setSelectedRole('beneficiary');
                        setLoginIdentifier('om_ahmad');
                        setLoginPassword('123');
                        setError('');
                        const el = document.getElementById('pathway-selection');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-white hover:bg-stone-50 text-stone-800 font-bold py-3 px-6 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>🔐 دخول الأسر المسجلة (لوحة التحكم)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 1: Program Definition & Features (معلومات التعريف بالبرنامج) */}
              <div className="bg-white border border-stone-200 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
                <div className="space-y-2 border-b border-stone-100 pb-4">
                  <span className="text-primary text-xs font-bold bg-accent/30 border border-primary/20 px-3 py-1 rounded-full inline-block">
                    💡 مميزات البرنامج والتمكين المالي
                  </span>
                  <h2 className="font-black text-stone-800 text-xl md:text-2xl">
                    لماذا تنضم إلى برنامج "إرث أجيال" للأسر المنتجة؟
                  </h2>
                  <p className="text-stone-500 text-xs font-light">
                    منظومة متكاملة تدعمك في التمويل والتدريب والاعتماد الرسمي والربط المباشر مع السوق.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl font-bold">
                      💰
                    </div>
                    <h3 className="font-bold text-stone-800 text-sm">تمويل فوري بدون كفيل</h3>
                    <p className="text-stone-500 text-xs leading-relaxed font-light">
                      استبدال الكفيل التقليدي بـ "وثيقة الجدارة الرقمية". تمويل يصل إلى 50,000 ريال بالشراكة مع بنك التنمية الاجتماعية.
                    </p>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl font-bold">
                      🎓
                    </div>
                    <h3 className="font-bold text-stone-800 text-sm">أكاديمية تأهيل معتمدة</h3>
                    <p className="text-stone-500 text-xs leading-relaxed font-light">
                      دورات متخصصة في سلامة الأغذية، فنون التغليف التراثي، إدارة التكاليف، والتسويق المباشر لخدمة ضيوف الرحمن.
                    </p>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center text-xl font-bold">
                      🕋
                    </div>
                    <h3 className="font-bold text-stone-800 text-sm">ربط بمبيعات المعتمرين</h3>
                    <p className="text-stone-500 text-xs leading-relaxed font-light">
                      منفذ بيع إلكتروني مباشر يربط مطابخك وحرفك بحافلات المعتمرين والزوار وحملات الحج والعمرة بمكة والمدينة.
                    </p>
                  </div>

                  <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF1FA] text-[#174F3E] flex items-center justify-center text-xl font-bold">
                      📜
                    </div>
                    <h3 className="font-bold text-stone-800 text-sm">التراخيص ووثيقة العمل الحر</h3>
                    <p className="text-stone-500 text-xs leading-relaxed font-light">
                      مساعدة إدارية واستشارية كاملة لإصدار وثائق العمل الحر والشهادات الصحية البلدية لتكون منشأة مرخصة نظاماً.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2: Requirements & Joining Conditions (شروط واشتراطات الانضمام) */}
              <div className="bg-stone-50 border border-stone-200 p-6 md:p-8 rounded-3xl space-y-6">
                <div className="space-y-2 border-b border-stone-200 pb-4">
                  <span className="text-emerald-800 text-xs font-bold bg-emerald-100/80 border border-emerald-200 px-3 py-1 rounded-full inline-block">
                    📋 الامتثال والجودة
                  </span>
                  <h2 className="font-black text-stone-800 text-xl md:text-2xl">
                    شروط واشتراطات الانضمام لبرنامج الأسر المنتجة والحرفية
                  </h2>
                  <p className="text-stone-500 text-xs md:text-sm font-light">
                    لضمان أعلى معايير الجودة وسلامة الأغذية لحماية وصحة ضيوف الرحمن والزوار.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-stone-200 p-5 rounded-2xl flex items-start gap-4 shadow-xs">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm flex-shrink-0">
                      1
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-stone-800 text-sm">الشهادة الصحية المعتمدة لسلامة الأغذية 📜</h3>
                      <p className="text-stone-500 text-xs font-light leading-relaxed">
                        يشترط توفر شهادة صحية سارية صادرة من البلدية لجميع العاملين في إعداد المأكولات والحلويات (أو تقديم طلب استخراجها بدعم المنصة).
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-stone-200 p-5 rounded-2xl flex items-start gap-4 shadow-xs">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm flex-shrink-0">
                      2
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-stone-800 text-sm">معايير الجودة والتغليف التراثي المحكم 🛡️</h3>
                      <p className="text-stone-500 text-xs font-light leading-relaxed">
                        التزام الأسرة بالتغليف الحراري الآمن والصحي، مع وضع ملصق الهوية الوطنية وباركود تتبع الأصالة المعتمد بالمنصة.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-stone-200 p-5 rounded-2xl flex items-start gap-4 shadow-xs">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm flex-shrink-0">
                      3
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-stone-800 text-sm">حضور واجتياز الدورات التأهيلية الزامية 🎓</h3>
                      <p className="text-stone-500 text-xs font-light leading-relaxed">
                        إكمال دورة "سلامة الأغذية وحفظ التراث" ودورة "إدارة التكاليف والمبيعات" عبر أكاديمية المنصة للحصول على وثيقة الجاهزية.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white border border-stone-200 p-5 rounded-2xl flex items-start gap-4 shadow-xs">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-sm flex-shrink-0">
                      4
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-stone-800 text-sm">وثيقة العمل الحر أو السجل التجاري 💼</h3>
                      <p className="text-stone-500 text-xs font-light leading-relaxed">
                        توفر وثيقة عمل حر سارية المفعول برقم هويتك أو التقديم المباشر بطلب إصدارها فور التسجيل بمساندة المستشارين.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Action & Registration CTA Box (أزرار التسجيل ودخول اللوحة) */}
              <div className="bg-white border-2 border-primary/30 p-8 rounded-3xl text-center space-y-6 shadow-xl relative overflow-hidden">
                <div className="space-y-2">
                  <span className="text-primary font-black text-xs bg-accent/40 px-3 py-1 rounded-full">
                    🚀 ابدأ مسار التمكين الاقتصادي اليوم
                  </span>
                  <h2 className="font-black text-stone-800 text-2xl">
                    جاهز للانضمام ورفع مستنداتك أو دخول لوحة التحكم؟
                  </h2>
                  <p className="text-stone-500 text-xs md:text-sm max-w-xl mx-auto font-light">
                    اختر الخيار المناسب لك أدناه للبدء الفوري والوصول إلى خدماتك المستهدفة.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setLandingView('join_portals');
                      setSelectedRole('beneficiary');
                      setAuthMode('join');
                      const el = document.getElementById('pathway-selection');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto bg-primary hover:bg-primary/95 text-accent font-black py-3.5 px-8 rounded-2xl text-xs sm:text-sm transition-all shadow-lg hover:scale-105 cursor-pointer"
                  >
                    ✍️ تسجيل أسرة جديدة / حرفي (تقديم طلب)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLandingView('unified_login');
                      setSelectedRole('beneficiary');
                      setLoginIdentifier('om_ahmad');
                      setLoginPassword('123');
                      setError('');
                      const el = document.getElementById('pathway-selection');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto bg-[#174F3E] hover:bg-[#174F3E]/90 text-white font-black py-3.5 px-8 rounded-2xl text-xs sm:text-sm transition-all shadow-md cursor-pointer"
                  >
                    🔐 دخول الأسر المسجلة (لوحة التحكم)
                  </button>
                </div>

                <div className="pt-2 border-t border-stone-100 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setLandingView('options');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-stone-500 hover:text-stone-800 font-bold text-xs underline cursor-pointer"
                  >
                    🛍️ العودة إلى الصفحة الرئيسية (تصفح وجبات المعتمرين والسياح)
                  </button>
                </div>
              </div>
            </div>
          ) : landingView === 'standalone_store' ? (
            /* 🛒 Dedicated Standalone Store Page View (/store or #store) */
            <div className="max-w-7xl mx-auto space-y-8 text-right animate-fade-in py-4" id="standalone-store-page">
              {/* Navigation Top Bar / Back button */}
              <div className="flex items-center justify-between bg-white border border-stone-200 p-4 rounded-2xl shadow-sm">
                <button
                  type="button"
                  onClick={() => {
                    setLandingView('options');
                    window.location.hash = '';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>← العودة إلى الصفحة الرئيسية</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-stone-800">متجر إرث أجيال التراثي المستقل (/store)</span>
                  <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping"></span>
                </div>
              </div>

              {/* Standalone Store Hero Header */}
              <div className="bg-gradient-to-r from-[#174F3E] via-primary to-emerald-900 text-white p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-xl border border-accent/30">
                <div className="absolute top-0 right-0 w-80 h-80 bg-accent opacity-15 rounded-full blur-3xl -mr-24 -mt-24"></div>
                
                <div className="relative z-10 space-y-4 max-w-3xl">
                  <span className="text-accent text-xs font-black bg-white/10 border border-accent/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" />
                    متجر المأكولات والتراث الشعبي السعودي (الشراء المباشر للجميع) 🛍️
                  </span>
                  <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight">
                    تسوّق أشهى الوجبات التراثية والحرف اليدوية الأصلية
                  </h1>
                  <p className="text-stone-200 text-xs md:text-sm font-light leading-relaxed">
                    متاح للجميع! سواءً كنت معتمراً، سائحاً، أو زائراً، يمكنك الآن اقتناء الروائح الفاخرة، المأكولات التراثية الطازجة، والمنسوجات التذكارية وتوصيلها فوراً إلى فندقك في مكة المكرمة والمدينة المنورة دون الحاجة للاشتراك في أي باقات!
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setLandingView('unified_login');
                        setSelectedRole('pilgrim');
                        setAuthMode('login');
                        setLoginIdentifier('abdulrahman');
                        setLoginPassword('123');
                        setError('');
                        const el = document.getElementById('pathway-selection');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="bg-accent hover:bg-accent/90 text-primary font-black py-3 px-6 rounded-2xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                    >
                      <span>🕋 دخول المعتمرين والسياح للشراء السريع</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLandingView('family_landing');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-white/20"
                    >
                      <span>👩‍🍳 انضمام كـ أسرة منتجة لبيع منتجاتك</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Full Product Catalog Block */}
              <div className="bg-white border border-stone-200 p-6 md:p-8 rounded-3xl space-y-6 shadow-sm">
                <div className="flex flex-col md:flex-row gap-3 items-center justify-between border-b border-stone-100 pb-4">
                  {/* Category Tabs */}
                  <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
                    {[
                      { id: 'all', label: 'الكل' },
                      { id: 'culinary', label: '🥘 طهي تراثي' },
                      { id: 'crafts', label: '👜 حرف يدوية' },
                      { id: 'hospitality', label: '☕ ضيافة عربية' },
                      { id: 'perfumes', label: '✨ روائح وبخور' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedCatFilter(tab.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedCatFilter === tab.id
                            ? 'bg-[#174F3E] text-white shadow-sm'
                            : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Catalog Search input */}
                  <div className="relative w-full md:w-64">
                    <span className="absolute inset-y-0 right-3 flex items-center text-stone-400">
                      <Search className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="ابحث عن منتج مخصص..."
                      value={productsSearch}
                      onChange={(e) => setProductsSearch(e.target.value)}
                      className="w-full pl-3 pr-9 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-[#174F3E] text-right"
                    />
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {DEFAULT_PRODUCTS.filter(p => {
                    const matchesCat = selectedCatFilter === 'all' || p.category === selectedCatFilter;
                    const matchesSearch = p.name.includes(productsSearch) || p.description.includes(productsSearch) || p.family.includes(productsSearch);
                    return matchesCat && matchesSearch;
                  }).map((prod) => (
                    <div 
                      key={prod.id}
                      className="bg-stone-50 rounded-2xl border border-stone-200/60 overflow-hidden flex flex-col hover:shadow-lg hover:border-[#174F3E]/35 transition-all group"
                    >
                      {/* Product Image */}
                      <div className="relative h-44 overflow-hidden bg-stone-100">
                        <img 
                          src={prod.imageUrl} 
                          alt={prod.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-2.5 right-2.5 bg-[#174F3E] text-white text-[9px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                          {prod.categoryLabel}
                        </span>
                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] text-stone-100 font-light">
                          خبرة الأسرة: {prod.experience}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1.5 text-right">
                          <h4 className="font-extrabold text-stone-800 text-xs md:text-sm group-hover:text-[#174F3E] transition-colors">
                            {prod.name}
                          </h4>
                          <div className="flex items-center justify-between">
                            <p className="text-[10px] text-stone-400 font-bold">
                              إعداد: {prod.family}
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                localStorage.setItem('warth_target_tab', 'story');
                                onLogin('visitor', prod.family);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                              className="text-[10px] text-primary hover:text-emerald-700 font-black flex items-center gap-0.5 cursor-pointer underline hover:scale-[1.02] transition-transform"
                              title="توجيه مباشر إلى الملف المهني الرقمي للأسرة ونظارة الحكايات StoryLens"
                            >
                              <span>الملف المهني للأسرة 👓</span>
                            </button>
                          </div>
                          <p className="text-stone-500 text-[11px] font-light leading-relaxed line-clamp-2">
                            {prod.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-stone-200/50 flex items-center justify-between">
                          <div className="text-right">
                            <span className="text-[10px] text-stone-400 block font-light">السعر الفوري</span>
                            <span className="text-sm font-black font-mono text-[#174F3E]">{prod.price} ر.س</span>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProduct(prod);
                              setPurchaseSuccess(false);
                              setPurchaseError('');
                            }}
                            className="bg-[#174F3E] hover:bg-[#174F3E]/95 text-white font-black text-[10px] sm:text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1 cursor-pointer"
                          >
                            <span>شراء سريع 🛒</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {DEFAULT_PRODUCTS.filter(p => {
                    const matchesCat = selectedCatFilter === 'all' || p.category === selectedCatFilter;
                    const matchesSearch = p.name.includes(productsSearch) || p.description.includes(productsSearch) || p.family.includes(productsSearch);
                    return matchesCat && matchesSearch;
                  }).length === 0 && (
                    <div className="col-span-full text-center py-8 bg-stone-50 border border-dashed border-stone-200 rounded-2xl text-stone-400 text-xs font-light">
                      لا توجد منتجات مطابقة لخيارات الفلترة الحالية. جرب تصفح فئات أخرى!
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : landingView === 'unified_login' ? (
            <LoginPage 
              onLogin={onLogin} 
              onGoHome={() => {
                setLandingView('options');
                window.location.hash = '#/';
              }} 
              warathLogo={warathLogo} 
            />
          ) : (
            <div className="space-y-6 text-right animate-fade-in" id="join-portals-view">
              <div className="bg-stone-50 border border-stone-200 p-6 md:p-8 rounded-3xl text-center space-y-2 relative">
                <button
                  type="button"
                  onClick={() => {
                    setLandingView('options');
                    setError('');
                  }}
                  className="absolute right-4 top-4 bg-white hover:bg-stone-100 text-stone-700 font-bold py-1.5 px-3 rounded-lg text-[10px] border border-stone-200 flex items-center gap-1.5 transition-all shadow-inner"
                >
                  <span>← العودة</span>
                </button>
                <span className="text-accent text-xs font-bold bg-primary/10 px-3 py-1 rounded-full border border-primary/20 inline-block">
                  بوابات التمكين والهوية الإرثية السعودية 🇸🇦
                </span>
                <h3 className="font-black text-stone-800 text-lg md:text-2xl">
                  اختر البوابة المستقلة للانضمام كعضو جديد 🚪
                </h3>
                <p className="text-stone-500 text-xs md:text-sm max-w-2xl mx-auto font-light leading-relaxed">
                  لكل صفة في المنصة رحلة وبوابة متكاملة مستقلة تناسب احتياجاتها؛ من التأهيل وتوفير الدعم المالي للأسر الحرفية، إلى حجز الوجبات التراثية وطلب الهدايا التذكارية لضيوف الرحمن.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    id: 'beneficiary',
                    label: 'رائدات العمل الحر / مستفيد',
                    desc: 'بناء الجدارة والتأهيل والتمكين',
                    detail: 'لرائدات العمل الحر والمشاريع الصغيرة والحرفيين الراغبين في بناء جاهزية مشاريعهم واجتياز برامج التأهيل الصحي، والحصول على شهادة ملاءمة للتمويل الفوري بدون كفيل غارم.',
                    features: [
                      '✓ استبيان تقييم الجاهزية الآلي',
                      '✓ مسارات تدريبية وحقائب معتمدة',
                      '✓ تمويل العمل الحر بدون كفيل'
                    ],
                    bg: 'border-amber-100 hover:border-primary bg-white hover:shadow-xl',
                    accentColor: 'text-primary bg-primary/5',
                    buttonStyle: 'bg-primary hover:bg-primary/95 text-accent',
                    icon: User
                  },
                  {
                    id: 'pilgrim',
                    label: 'معتمر كريم',
                    desc: 'اشتراكات وجبات وخدمات مكة',
                    detail: 'لضيوف الرحمن والمعتمرين الراغبين في تنظيم إقامتهم عبر حجز وجبات شعبية يومية مطهوة بحب وإتقان، وباقات الضيافة التراثية المؤمّنة.',
                    features: [
                      '✓ اشتراكات وجبات طازجة مجدولة',
                      '✓ مطابخ أسر مرخصة وموثقة صحياً',
                      '✓ توصيل آمن ومباشر للفنادق'
                    ],
                    bg: 'border-amber-100 hover:border-[#C8A96B] bg-white hover:shadow-xl',
                    accentColor: 'text-[#8C7338] bg-amber-50',
                    buttonStyle: 'bg-[#C8A96B] hover:bg-[#9E8447] text-white',
                    icon: Compass
                  },
                  {
                    id: 'visitor',
                    label: 'زائر وسائح',
                    desc: 'مأكولات وهدايا إرثية فاخرة',
                    detail: 'للسياح والزوار الشغوفين باستكشاف موروثنا الثقافي، وتذوق الأطباق السعودية الأصيلة، واقتناء قطع السدو الحرفية التذكارية الفاخرة.',
                    features: [
                      '✓ متجر هدايا السدو والمشغولات',
                      '✓ طلب عينات تذوق وتوصيل سريع',
                      '✓ دعم الحرفيين والأسر الوطنية'
                    ],
                    bg: 'border-amber-100 hover:border-amber-500 bg-white hover:shadow-xl',
                    accentColor: 'text-amber-700 bg-amber-50',
                    buttonStyle: 'bg-amber-600 hover:bg-amber-700 text-white',
                    icon: Sparkles
                  }
                ].map((role) => {
                  const Icon = role.icon;
                  return (
                    <motion.div
                      key={role.id}
                      whileHover={{ y: -6 }}
                      className={`border-2 rounded-3xl p-6 text-right flex flex-col justify-between space-y-6 transition-all duration-300 ${role.bg}`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className={`p-3 rounded-2xl ${role.accentColor}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] text-stone-400 font-bold bg-stone-100 py-1 px-2 rounded-lg">بوابة مستقلة 🚪</span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-base font-black text-stone-800">{role.label}</h4>
                          <span className="text-xs font-bold text-accent block">{role.desc}</span>
                        </div>

                        <p className="text-stone-500 text-xs font-light leading-relaxed min-h-[60px]">
                          {role.detail}
                        </p>

                        <div className="space-y-1.5 border-t border-stone-100 pt-3">
                          {role.features.map((feat, idx) => (
                            <span key={idx} className="block text-[11px] font-medium text-stone-600">
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRoleSelect(role.id as any)}
                        className={`w-full py-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md ${role.buttonStyle}`}
                      >
                        <span>انضمام للبوابة</span>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          </>
        ) : (
          // Case B: Dedicated Role Workspace Page
          <div className="space-y-6">
            {/* Elegant Back Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-stone-200 p-4 md:p-5 rounded-3xl shadow-xs">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl text-white shadow-sm ${
                  selectedRole === 'beneficiary' ? 'bg-primary' :
                  selectedRole === 'pilgrim' ? 'bg-[#C8A96B]' :
                  selectedRole === 'visitor' ? 'bg-amber-600' : 'bg-slate-700'
                }`}>
                  {selectedRole === 'beneficiary' && <User className="w-6 h-6" />}
                  {selectedRole === 'pilgrim' && <Compass className="w-6 h-6" />}
                  {selectedRole === 'visitor' && <Sparkles className="w-6 h-6" />}
                  {selectedRole === 'admin' && <Landmark className="w-6 h-6" />}
                </div>
                <div className="text-right">
                  <h3 className="font-extrabold text-stone-800 text-sm md:text-base flex items-center gap-2">
                    <span>
                      {selectedRole === 'beneficiary' && 'بوابة الأسر المنتجة والمستفيدين والتمكين الإرثي'}
                      {selectedRole === 'pilgrim' && 'بوابة ضيوف الرحمن والمعتمرين والزوار الكرام'}
                      {selectedRole === 'visitor' && 'بوابة السياح والزوار والمأكولات والهدايا الإرثية'}
                      {selectedRole === 'admin' && 'بوابة الحوكمة والرقابة السيادية واعتماد المشروعات'}
                    </span>
                    <span className="text-[9px] bg-accent/20 text-primary font-bold px-2 py-0.5 rounded-full">بوابة مخصصة 🔐</span>
                  </h3>
                  <p className="text-stone-500 text-[10px] md:text-xs font-light mt-0.5">
                    {selectedRole === 'beneficiary' && 'بناء مسارات التدريب واحتساب الجدارة الائتمانية والتمويل دون كفيل غارم'}
                    {selectedRole === 'pilgrim' && 'حجز باقات طعوم المطهوة بحب والاشتراكات المجدولة مسبقاً بمكة المكرمة'}
                    {selectedRole === 'visitor' && 'تصفح واقتناء نوادر الهدايا اليدوية والتراثية وإيصالها لمحل إقامتك'}
                    {selectedRole === 'admin' && 'لوحة مراجعة وتقييم طلبات الأسر ومنح وثائق الجودة والاعتماد التمويلي'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole(null);
                  setLandingView('unified_login');
                }}
                className="bg-stone-50 hover:bg-stone-100 text-stone-700 font-bold py-2.5 px-4 rounded-xl text-xs border border-stone-200 flex items-center gap-2 self-start sm:self-center transition-all shadow-inner"
              >
                <span>العودة للبوابات الرئيسية</span>
                <ArrowRight className="w-4 h-4 text-stone-500" />
              </button>
            </div>

            {/* Grid Layout containing Form (col-span-5) and Custom Info (col-span-7) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left/Right Interactive Login Area */}
              <div className="lg:col-span-5 bg-white border border-stone-200 p-6 md:p-8 rounded-3xl shadow-lg space-y-6 flex flex-col justify-between h-full" id="auth-wizard-panel">
                <div>
                  <div className="border-b border-stone-100 pb-4 text-center">
                    <h3 className="font-extrabold text-stone-800 text-lg leading-tight">
                      {selectedRole === 'beneficiary' && 'بوابة الأسر والتمكين'}
                      {selectedRole === 'pilgrim' && 'حجز المعتمرين والاشتراكات'}
                      {selectedRole === 'visitor' && 'بوابة الزوار والسياح'}
                      {selectedRole === 'admin' && 'تسجيل الإدارة والاعتماد'}
                    </h3>
                    <p className="text-stone-500 text-xs mt-1">من التأهيل إلى التمكين والتسويق الرقمي</p>
                  </div>

                  {/* Join vs Login Tabs Selection */}
                  {selectedRole !== 'admin' && (
                    <div className="flex bg-stone-50 p-1.5 rounded-2xl border border-stone-200 gap-1 my-4">
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('join');
                          setWizardStep(0);
                          setError('');
                        }}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          authMode === 'join'
                            ? 'bg-primary text-accent shadow-sm'
                            : 'text-stone-600 hover:text-stone-800'
                        }`}
                      >
                        <span>✨ انضمام جديد (تسجيل)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('login');
                          setWizardStep(0);
                          setError('');
                        }}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          authMode === 'login'
                            ? 'bg-primary text-accent shadow-sm'
                            : 'text-stone-600 hover:text-stone-800'
                        }`}
                      >
                        <span>🔑 لديك حساب بالفعل؟</span>
                      </button>
                    </div>
                  )}

                  {/* Error Message banner */}
                  {error && (
                    <p className="text-red-600 text-[11px] font-bold bg-red-50 p-2.5 rounded-lg border border-red-100 my-3">
                      ⚠️ {error}
                    </p>
                  )}

                  {/* conditional rendering of screens */}
                  {authMode === 'login' ? (
              /* LOGIN STATE (لديه حساب) */
              <motion.form
                key="login-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleLoginSubmit}
                className="space-y-4 text-right"
              >
                {selectedRole === 'admin' ? (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-stone-700">اليوزر للإدارة:</label>
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="أدخل اسم المستخدم الإداري"
                        className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs font-mono focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-stone-700">رمز الدخول للإدارة والاعتماد:</label>
                      <input
                        type="password"
                        value={passcodeInput}
                        onChange={(e) => setPasscodeInput(e.target.value)}
                        placeholder="أدخل رمز المرور الإداري الخاص بك"
                        className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs font-mono focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-stone-700">رقم الهوية الوطنية، البريد الإلكتروني، أو اسم المستخدم:</label>
                      <input
                        type="text"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder="أدخل اسم المستخدم، الهوية، أو البريد الإلكتروني"
                        className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-stone-700">كلمة المرور الخاص بك:</label>
                      <input
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="أدخل كلمة المرور الخاصة بحسابك"
                        className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      />
                    </div>
                    <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-150 text-[10px] text-stone-500 leading-relaxed flex items-center gap-2">
                      <span>🛡️</span>
                      <span><strong>حماية مشفّرة:</strong> تسجيل الدخول آمن ومحمي بالكامل ببروتوكولات الأمان العالية.</span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/95 text-accent font-bold py-3.5 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    <span>تسجيل الدخول للمنصة ↺</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[10px] text-stone-400 font-medium leading-relaxed">
                    🛡️ بوابة إرث أجيال محمية وموثقة من قبل الجهات الاستراتيجية التمويلية
                  </p>
                </div>
              </motion.form>
            ) : (
              /* JOIN STATE (انضمام جديد مع استبيان ذكي بالكامل) */
              <motion.div
                key="join-form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 text-right"
              >
                {selectedRole === 'admin' ? (
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-stone-700 text-xs leading-relaxed space-y-2">
                    <span className="font-bold text-amber-800 block">🛑 تنبيه حوكمة سيادي:</span>
                    <p>
                      تسجيل مدراء جدد واعتماد المشرفين يتطلب موافقة مجلس المنصة والربط السيادي.
                    </p>
                    <p className="font-semibold text-primary">
                      يرجى التوجه لتبويب "لديك حساب بالفعل؟" للوصول المباشر بواسطة الحساب الإداري المعتمد.
                    </p>
                  </div>
                ) : selectedRole === 'beneficiary' ? (
                  /* PRODUCTIVE FAMILY WIZARD (أسر منتجة) */
                  <div className="space-y-3">
                    {/* Progress indicator */}
                    <div className="flex justify-between items-center text-[10px] font-bold text-stone-400">
                      <span>محرك الجدارة الائتمانية والتمكين</span>
                      <span>الخطوة {wizardStep + 1} من 5</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full transition-all duration-300" style={{ width: `${(wizardStep + 1) * 20}%` }}></div>
                    </div>

                    {/* Step 0: Name & Brand Setup */}
                    {wizardStep === 0 && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">اسم رائدة/رائد التراث أو اسم مشروعك:</label>
                          <input
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            placeholder="مثال: أم أحمد للمأكولات التراثية"
                            className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                          />
                        </div>

                        {/* Account Verification Credentials */}
                        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                          <span className="block text-[11px] font-bold text-primary border-b border-stone-200 pb-1.5 flex items-center gap-1.5">
                            <span>🔐 معلومات العضوية وبيانات التوثيق الرسمي</span>
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-1">اسم المستخدم (اليوزر):</label>
                              <input
                                type="text"
                                value={regUsername}
                                onChange={(e) => setRegUsername(e.target.value)}
                                placeholder="مثال: om_ahmad"
                                className="w-full p-2.5 rounded-lg border border-stone-200 bg-white text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-1">كلمة المرور:</label>
                              <input
                                type="password"
                                value={regPassword}
                                onChange={(e) => setRegPassword(e.target.value)}
                                placeholder="أدخل كلمة مرور حسابك"
                                className="w-full p-2.5 rounded-lg border border-stone-200 bg-white text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-1">رقم الهوية الوطنية أو جواز السفر:</label>
                              <input
                                type="text"
                                value={regIdNumber}
                                onChange={(e) => setRegIdNumber(e.target.value)}
                                placeholder="أدخل رقم الهوية أو جواز السفر"
                                className="w-full p-2.5 rounded-lg border border-stone-200 bg-white text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none font-mono"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[10px] font-bold text-stone-600 mb-1">رقم الجوال:</label>
                                <input
                                  type="text"
                                  value={regPhone}
                                  onChange={(e) => setRegPhone(e.target.value)}
                                  placeholder="مثال: 05XXXXXXXX"
                                  className="w-full p-2.5 rounded-lg border border-stone-200 bg-white text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none font-mono"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-stone-600 mb-1">البريد الإلكتروني:</label>
                                <input
                                  type="email"
                                  value={regEmail}
                                  onChange={(e) => setRegEmail(e.target.value)}
                                  placeholder="name@example.com"
                                  className="w-full p-2.5 rounded-lg border border-stone-200 bg-white text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none font-mono"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">مجال النشاط الإرثي الأساسي:</label>
                          <div className="grid grid-cols-2 gap-2">
                            {['طهي تراثي وشعبي', 'حلويات وتمور تمكين', 'حرف يدوية وسدو', 'ضيافة وبوفيهات حملات'].map((act) => (
                              <button
                                key={act}
                                type="button"
                                onClick={() => setFamilyActivity(act)}
                                className={`p-2.5 rounded-lg border text-xs text-center font-bold transition-all ${
                                  familyActivity === act
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                                }`}
                              >
                                {act}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 1: الركن التشغيلي والفني */}
                    {wizardStep === 1 && (
                      <div className="space-y-3">
                        <span className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">1. الركن التشغيلي والفني</span>
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">كم سنوات خبرتك الحالية بالنشاط الحرفي؟</label>
                          <div className="grid grid-cols-2 gap-2">
                            {['أقل من سنة', '1-3 سنوات', '3-5 سنوات', '+5 سنوات'].map((exp) => (
                              <button
                                key={exp}
                                type="button"
                                onClick={() => setFamilyExperience(exp)}
                                className={`p-2 rounded-lg border text-[11px] text-center font-semibold transition-all ${
                                  familyExperience === exp
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-stone-200 hover:bg-stone-50 text-stone-500'
                                }`}
                              >
                                {exp}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">حجم فريق العمل التشغيلي الحالي بمطبخك/مستودعك؟</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['بمفردي', '2-3 أفراد', 'أكثر من 3'].map((team) => (
                              <button
                                key={team}
                                type="button"
                                onClick={() => setFamilyTeamSize(team)}
                                className={`p-2 rounded-lg border text-[11px] text-center font-semibold transition-all ${
                                  familyTeamSize === team
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-stone-200 hover:bg-stone-50 text-stone-500'
                                }`}
                              >
                                {team}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: الركن المالي والتسعير */}
                    {wizardStep === 2 && (
                      <div className="space-y-3">
                        <span className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">2. الركن المالي والتسعير</span>
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">كم يبلغ متوسط دخلك ومبيعاتك الشهرية الحالية تقريباً؟</label>
                          <div className="relative">
                            <input
                              type="number"
                              value={familyIncome}
                              onChange={(e) => setFamilyIncome(e.target.value)}
                              className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none text-left font-mono"
                            />
                            <span className="absolute right-3 top-3.5 text-xs text-stone-400 font-bold">ريال سعودي</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">هل تمتلك آلية دقيقة لحساب تكلفة المواد الأولية والأرباح؟</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['نعم بدقة', 'تقريباً', 'لا يوجد'].map((cost) => (
                              <button
                                key={cost}
                                type="button"
                                onClick={() => setFamilyCostCalculation(cost)}
                                className={`p-2 rounded-lg border text-[11px] text-center font-semibold transition-all ${
                                  familyCostCalculation === cost
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-stone-200 hover:bg-stone-50 text-stone-500'
                                }`}
                              >
                                {cost}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: ركن التسويق والمبيعات */}
                    {wizardStep === 3 && (
                      <div className="space-y-3">
                        <span className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">3. ركن التسويق والمبيعات</span>
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">كيف تسوق لمنتجاتك وتصرف إنتاجك حالياً؟</label>
                          <div className="grid grid-cols-2 gap-2">
                            {['البيع المباشر والمعارف', 'انستغرام وتيك توك', 'الواتساب فقط', 'بازارات ومواسم'].map((market) => (
                              <button
                                key={market}
                                type="button"
                                onClick={() => setFamilyMarketingChannel(market)}
                                className={`p-2 rounded-lg border text-[11px] text-center font-semibold transition-all ${
                                  familyMarketingChannel === market
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-stone-200 hover:bg-stone-50 text-stone-500'
                                }`}
                              >
                                {market}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">هل تمتلك علامة تجارية وتغليفاً خاصاً بمنتجاتك؟</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['نعم باحتراف', 'بسيط ومحلي', 'لا يوجد'].map((brand) => (
                              <button
                                key={brand}
                                type="button"
                                onClick={() => setFamilyBrandingStatus(brand)}
                                className={`p-2 rounded-lg border text-[11px] text-center font-semibold transition-all ${
                                  familyBrandingStatus === brand
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-stone-200 hover:bg-stone-50 text-stone-500'
                                }`}
                              >
                                {brand}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 4: ركن الامتثال والتراخيص */}
                    {wizardStep === 4 && (
                      <div className="space-y-3">
                        <span className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold">4. ركن الامتثال والتراخيص</span>
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">ما هي التراخيص أو الشهادات الرسمية المتوفرة لديك؟</label>
                          <div className="space-y-1.5">
                            {[
                              'رخصة وثيقة عمل حر سارية',
                              'شهادة صحية بلدية معتمدة للطهي',
                              'ترخيص منصة الأسر الوطنية',
                              'لا يوجد حالياً وأرغب باستخراجها فورياً من المنصة'
                            ].map((license) => (
                              <button
                                key={license}
                                type="button"
                                onClick={() => setFamilyLicenses(license)}
                                className={`w-full p-2.5 rounded-xl border text-right text-[11px] block transition-all ${
                                  familyLicenses === license
                                    ? 'border-primary bg-primary/5 font-bold text-primary'
                                    : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                                }`}
                              >
                                {license} {familyLicenses === license && '✓'}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl text-emerald-800 text-[10px] leading-relaxed">
                          ✨ <strong>بشرى تمكينية:</strong> بانتهاء هذا الاستبيان، سيقوم محرك الذكاء الاصطناعي ببناء نموذج جدارة ائتمانية رقمي لمشروعك ليكون بديلاً معتمداً لشرط الكفيل التقليدي لتمويلات بنك التنمية الاجتماعية.
                        </div>
                      </div>
                    )}

                    {/* Wizard control buttons */}
                    <div className="flex gap-2 pt-3 border-t">
                      {wizardStep > 0 && (
                        <button
                          type="button"
                          onClick={() => setWizardStep(prev => prev - 1)}
                          className="flex-1 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all text-center"
                        >
                          السابق
                        </button>
                      )}
                      {wizardStep < 4 ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (wizardStep === 0) {
                              if (!nameInput.trim()) {
                                setError('يرجى كتابة اسم رائدة/رائد التراث أو اسم المشروع');
                                return;
                              }
                              if (!regUsername.trim()) {
                                setError('يرجى إدخال اسم المستخدم (اليوزر)');
                                return;
                              }
                              if (!regIdNumber.trim()) {
                                setError('يرجى إدخال رقم الهوية الوطنية أو جواز السفر');
                                return;
                              }
                              if (!regPhone.trim()) {
                                setError('يرجى إدخال رقم الجوال');
                                return;
                              }
                              if (!regEmail.trim()) {
                                setError('يرجى إدخال البريد الإلكتروني');
                                return;
                              }
                              if (!regPassword.trim()) {
                                setError('يرجى إدخال كلمة المرور');
                                return;
                              }
                            }
                            setError('');
                            setWizardStep(prev => prev + 1);
                          }}
                          className="flex-grow py-2 rounded-xl text-xs font-bold bg-primary hover:bg-primary/95 text-accent transition-all text-center"
                        >
                          التالي
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            handleRegisterUser();
                          }}
                          className="flex-grow py-3 rounded-xl text-xs font-bold bg-accent hover:bg-accent/90 text-primary transition-all text-center shadow-md animate-pulse"
                        >
                          إتمام التسجيل وبدء التمكين ✨
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* PILGRIM / VISITOR WIZARD (معتمر أو زائر وسائح) */
                  <div className="space-y-3">
                    {/* Progress indicator */}
                    <div className="flex justify-between items-center text-[10px] font-bold text-stone-400">
                      <span>تخصيص تجربة الوجبات التراثية الذكية</span>
                      <span>الخطوة {wizardStep + 1} من 6</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full transition-all duration-300" style={{ width: `${(wizardStep + 1) * 16.6}%` }}></div>
                    </div>

                    {/* Step 0: Name & City selection */}
                    {wizardStep === 0 && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">الاسم الكريم لضيف الرحمن أو الزائر:</label>
                          <input
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            placeholder="مثال: عبد الرحمن بن فهد"
                            className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                          />
                        </div>

                        {/* Account Verification Credentials */}
                        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                          <span className="block text-[11px] font-bold text-primary border-b border-stone-200 pb-1.5 flex items-center gap-1.5">
                            <span>🔐 معلومات العضوية وبيانات التوثيق الرسمي</span>
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-1">اسم المستخدم (اليوزر):</label>
                              <input
                                type="text"
                                value={regUsername}
                                onChange={(e) => setRegUsername(e.target.value)}
                                placeholder="مثال: abdulrahman"
                                className="w-full p-2.5 rounded-lg border border-stone-200 bg-white text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-1">كلمة المرور:</label>
                              <input
                                type="password"
                                value={regPassword}
                                onChange={(e) => setRegPassword(e.target.value)}
                                placeholder="أدخل كلمة مرور حسابك"
                                className="w-full p-2.5 rounded-lg border border-stone-200 bg-white text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <label className="block text-[10px] font-bold text-stone-600 mb-1">رقم الهوية الوطنية أو جواز السفر:</label>
                              <input
                                type="text"
                                value={regIdNumber}
                                onChange={(e) => setRegIdNumber(e.target.value)}
                                placeholder="أدخل رقم الهوية أو جواز السفر"
                                className="w-full p-2.5 rounded-lg border border-stone-200 bg-white text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none font-mono"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[10px] font-bold text-stone-600 mb-1">رقم الجوال:</label>
                                <input
                                  type="text"
                                  value={regPhone}
                                  onChange={(e) => setRegPhone(e.target.value)}
                                  placeholder="مثال: 05XXXXXXXX"
                                  className="w-full p-2.5 rounded-lg border border-stone-200 bg-white text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none font-mono"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-stone-600 mb-1">البريد الإلكتروني:</label>
                                <input
                                  type="email"
                                  value={regEmail}
                                  onChange={(e) => setRegEmail(e.target.value)}
                                  placeholder="name@example.com"
                                  className="w-full p-2.5 rounded-lg border border-stone-200 bg-white text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none font-mono"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">النطاق الجغرافي أو موقعك الحالي:</label>
                          <select
                            value={visitorLocation}
                            onChange={(e) => setVisitorLocation(e.target.value)}
                            className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                          >
                            <option value="مكة المكرمة - بطحاء قريش">📍 مكة المكرمة - بطحاء قريش</option>
                            <option value="مكة المكرمة - العزيزية والمنطقة المركزية">📍 مكة المكرمة - العزيزية والمنطقة المركزية</option>
                            <option value="المدينة المنورة - المنطقة المركزية">📍 المدينة المنورة - المنطقة المركزية</option>
                            <option value="الرياض - النخيل وحي الملك فهد">📍 الرياض - النخيل وحي الملك فهد</option>
                            <option value="عسير - أبها والقرى التراثية">📍 عسير - أبها والقرى التراثية</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Step 1: الهدف الأساسي */}
                    {wizardStep === 1 && (
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-stone-700 mb-1">ما هو الهدف الأساسي من استخدامك للمنصة؟</label>
                        <div className="space-y-1.5">
                          {[
                            'طلب وجبات يومية طازجة (اشتراكات موظفين/طلاب)',
                            'تجربة الأطعمة التراثية السعودية (سياحة وتذوق ثقافي)',
                            'حجز ضيافة وبوفيهات لمناسبة خاصة أو حملة عمرة وعائلية',
                            'اقتناء حرف يدوية وهدايا تذكارية إرثية ممتازة'
                          ].map((goal) => (
                            <button
                              key={goal}
                              type="button"
                              onClick={() => setVisitorGoal(goal)}
                              className={`w-full p-2.5 rounded-xl border text-right text-[11px] block transition-all ${
                                visitorGoal === goal
                                  ? 'border-primary bg-primary/5 font-bold text-primary'
                                  : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                              }`}
                            >
                              {goal} {visitorGoal === goal && '✓'}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 2: التفضيلات الصحية والقيود الغذائية */}
                    {wizardStep === 2 && (
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-stone-700 mb-1">هل تعاني أنت أو أحد عائلتك من حالات صحية أو قيود؟ (متعدد)</label>
                        <div className="grid grid-cols-1 gap-1.5">
                          {[
                            { id: 'diabetes', label: 'داء السكري / ارتفاع ضغط الدم' },
                            { id: 'allergy', label: 'حساسية من مكونات معينة (جلوتين، مكسرات، لاكتوز)' },
                            { id: 'diet', label: 'أتبع حمية غذائية محددة (كيتو، قليلة السعرات، نباتي)' },
                            { id: 'none', label: 'لا توجد أي قيود صحية أو تفضيلات خاصة' }
                          ].map((item) => {
                            const isChecked = visitorHealth.includes(item.id);
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  if (item.id === 'none') {
                                    setVisitorHealth(['none']);
                                  } else {
                                    const filtered = visitorHealth.filter(id => id !== 'none');
                                    if (isChecked) {
                                      setVisitorHealth(filtered.filter(id => id !== item.id));
                                    } else {
                                      setVisitorHealth([...filtered, item.id]);
                                    }
                                  }
                                }}
                                className={`p-2.5 rounded-xl border text-right text-[11px] flex items-center justify-between transition-all ${
                                  isChecked
                                    ? 'border-primary bg-primary/5 font-bold text-primary'
                                    : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                                }`}
                              >
                                <span>{item.label}</span>
                                <span className={`w-4 h-4 rounded border flex items-center justify-center text-[9px] ${isChecked ? 'bg-primary border-primary text-accent font-bold' : 'border-stone-300'}`}>
                                  {isChecked ? '✓' : ''}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Step 3: فترات التوصيل المفضلة */}
                    {wizardStep === 3 && (
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-stone-700 mb-1">ما هي فترات التوصيل المفضلة لديك لاستلام الوجبات؟</label>
                        <div className="space-y-1.5">
                          {[
                            'الفترة الصباحية (وجبات الإفطار والقهوة التراثية)',
                            'الفترة بعد الظهر (الغداء المنزلي الساخن)',
                            'الفترة المسائية (العشاء الخفيف والحلويات الإرثية)'
                          ].map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setVisitorDeliveryTime(time)}
                              className={`w-full p-2.5 rounded-xl border text-right text-[11px] block transition-all ${
                                visitorDeliveryTime === time
                                  ? 'border-primary bg-primary/5 font-bold text-primary'
                                  : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                              }`}
                            >
                              {time} {visitorDeliveryTime === time && '✓'}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 4: الباقة العائلية وعدد الأفراد */}
                    {wizardStep === 4 && (
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-stone-700 mb-1">في حال اختيار الباقة العائلية (رفقة)، كم عدد أفراد عائلتك؟</label>
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            max="15"
                            value={visitorFamilySize}
                            onChange={(e) => setVisitorFamilySize(parseInt(e.target.value) || 1)}
                            className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-xs text-center font-bold focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                          />
                        </div>
                        <p className="text-[10px] text-stone-400 font-light leading-relaxed">
                          تحديد هذا العدد سيسمح لمحرك الوجبات بتوليد ملفات صحية فرعية مخصصة لكل فرد وتنزيل الوجبات التراثية المتطابقة مع احتياجاتهم تلقائياً.
                        </p>
                      </div>
                    )}

                    {/* Step 5: Onboarding Summary & Finish */}
                    {wizardStep === 5 && (
                      <div className="space-y-2 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs">
                        <span className="font-extrabold text-primary block border-b pb-1">ملخص تفضيلاتك الذكية:</span>
                        <div className="space-y-1 text-stone-600 text-[11px]">
                          <p>● <strong>الاسم:</strong> {nameInput}</p>
                          <p>● <strong>النطاق الجغرافي:</strong> {visitorLocation}</p>
                          <p>● <strong>الهدف:</strong> {visitorGoal}</p>
                          <p>● <strong>التوصيل المفضل:</strong> {visitorDeliveryTime}</p>
                          <p>● <strong>أفراد العائلة المضافين:</strong> {visitorFamilySize} أفراد</p>
                        </div>
                        <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl text-[10px] border border-emerald-100 font-light">
                          🎉 تم ضبط الفلاتر الصحية وجدولة الأطباق التراثية كالجريش والكبسة والقرصان المطابق لك بنسبة 100%!
                        </div>
                      </div>
                    )}

                    {/* Wizard control buttons */}
                    <div className="flex gap-2 pt-3 border-t">
                      {wizardStep > 0 && (
                        <button
                          type="button"
                          onClick={() => setWizardStep(prev => prev - 1)}
                          className="flex-1 py-2 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 transition-all text-center"
                        >
                          السابق
                        </button>
                      )}
                      {wizardStep < 5 ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (wizardStep === 0) {
                              if (!nameInput.trim()) {
                                setError('يرجى كتابة الاسم الكريم لضيف الرحمن أو الزائر');
                                return;
                              }
                              if (!regUsername.trim()) {
                                setError('يرجى إدخال اسم المستخدم (اليوزر)');
                                return;
                              }
                              if (!regIdNumber.trim()) {
                                setError('يرجى إدخال رقم الهوية الوطنية أو جواز السفر');
                                return;
                              }
                              if (!regPhone.trim()) {
                                setError('يرجى إدخال رقم الجوال');
                                return;
                              }
                              if (!regEmail.trim()) {
                                setError('يرجى إدخال البريد الإلكتروني');
                                return;
                              }
                              if (!regPassword.trim()) {
                                setError('يرجى إدخال كلمة المرور');
                                return;
                              }
                            }
                            setError('');
                            setWizardStep(prev => prev + 1);
                          }}
                          className="flex-grow py-2 rounded-xl text-xs font-bold bg-primary hover:bg-primary/95 text-accent transition-all text-center"
                        >
                          التالي
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            handleRegisterUser();
                          }}
                          className="flex-grow py-3 rounded-xl text-xs font-bold bg-accent hover:bg-accent/90 text-primary transition-all text-center shadow-md animate-pulse"
                        >
                          إتمام التسجيل وتخصيص باقتي الذكية ✨
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          <div className="border-t border-stone-100 pt-4 text-center">
            <span className="text-[10px] text-stone-400 font-light">بوابة إرث أجيال محمية وموثقة من قبل الجهات الاستراتيجية التمويلية</span>
          </div>
        </div>

        {/* Right Info Section tailored to the selected role */}
        <div className="lg:col-span-7 space-y-6">
          {selectedRole === 'beneficiary' && (
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-stone-200 p-6 md:p-8 rounded-3xl shadow-lg space-y-6 text-right"
            >
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <GraduationCap className="w-6 h-6 text-primary" />
                <h3 className="font-extrabold text-stone-800 text-base md:text-lg">دليل الأسر المنتجة والحرفية لتمويل الجدارة</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                  <h4 className="font-bold text-stone-850 text-xs mb-1">📋 كيف تحصل على دعم بنك التنمية الاجتماعية بدون كفيل؟</h4>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    استبدل الكفيل بـ <strong>"وثيقة الجاهزية والمهارة"</strong>. عند استكمال خطوات التسجيل واجتياز الاستبيان والتقييم الفني، سيتم إصدار شهادة جاهزية ترفع ملفك مباشرة لبرنامج تمويل العمل الحر (نفاذ) بقيمة تصل إلى 40 ألف ريال.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-stone-200 p-4 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-stone-800 block">⭐ اختبار الجاهزية الرقمية</span>
                    <p className="text-stone-500 text-[10px] leading-normal font-light">تحليل جاهزية مشروعك التشغيلية وتحديد نقاط التطوير الفنية فورياً.</p>
                  </div>
                  <div className="border border-stone-200 p-4 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-stone-800 block">🎓 حقائب التأهيل المعتمدة</span>
                    <p className="text-stone-500 text-[10px] leading-normal font-light">تدريب تفاعلي مدمج في سلامة الغذاء، التسعير، والتعبئة الفاخرة.</p>
                  </div>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl text-[11px] text-stone-500 leading-relaxed font-light">
                  💡 <strong>نصيحة المنصة:</strong> احرص على إدخال أرقام صحيحة لهويتك الوطنية وبريدك الإلكتروني لتسهيل ربط حسابك بمنصة النفاذ الوطني ومطابقة رخصة العمل الحر عند صدورها.
                </div>
              </div>
            </motion.div>
          )}

          {selectedRole === 'pilgrim' && (
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-stone-200 p-6 md:p-8 rounded-3xl shadow-lg space-y-6 text-right"
            >
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <Compass className="w-6 h-6 text-[#8C7338]" />
                <h3 className="font-extrabold text-stone-800 text-base md:text-lg">دليل المعتمر الكريم لحجز الوجبات التراثية</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80">
                  <h4 className="font-bold text-amber-900 text-xs mb-1">🕌 مأكولات تراثية طازجة من أيدي العائلات المكية</h4>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    نحن نمكّنك من تذوق البركة والأصالة. جميع الوجبات التي تطلبها تُحضر يومياً بأيدي أسر سعودية معتمدة ومؤهلة صحياً بالكامل وخاضعة لأعلى معايير سلامة الأغذية والبلدية.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-amber-200/60 p-4 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-amber-900 block">🕒 مواعيد التسليم المنظمة</span>
                    <p className="text-stone-500 text-[10px] leading-normal font-light">توصيل حراري آمن وموثق للفنادق في أوقات الغداء والعشاء المحددة مسبقاً.</p>
                  </div>
                  <div className="border border-amber-200/60 p-4 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-amber-900 block">🛡️ شهادات سلامة الغذاء</span>
                    <p className="text-stone-500 text-[10px] leading-normal font-light">جميع المطابخ خاضعة لجولات التفتيش والاعتماد من إدارة شؤون الحوكمة.</p>
                  </div>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl text-[11px] text-stone-500 leading-relaxed font-light">
                  🕌 <strong>موسم رمضان:</strong> تتوفر اشتراكات وباقات إفطار الصائم الجماعية المخصصة للحملات والفنادق بالمنطقة المركزية بمكة والمدينة المنورة.
                </div>
              </div>
            </motion.div>
          )}

          {selectedRole === 'visitor' && (
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-stone-200 p-6 md:p-8 rounded-3xl shadow-lg space-y-6 text-right"
            >
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <Sparkles className="w-6 h-6 text-amber-600" />
                <h3 className="font-extrabold text-stone-800 text-base md:text-lg">اقتناء الأصالة - هدايا السدو والطهي الإرثي</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
                  <h4 className="font-bold text-amber-950 text-xs mb-1">🎁 هدايا تذكارية مصنوعة يدوياً بقصص واقعية</h4>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    كل قطعة تقتنيها من بوابتنا تحمل شهادة أصالة ورقم رخصة الحرفية الوطنية التي نسجتها بحب وعناية. تصفح روائع السدو، البشوت المصغرة، والسبح الفاخرة المعطرة.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-amber-100 p-4 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-amber-800 block">✨ باركود الهوية الإرثية</span>
                    <p className="text-stone-500 text-[10px] leading-normal font-light">امسح الكود المرفق مع القطعة لتشاهد كواليس صناعتها والتعريف بصانعتها.</p>
                  </div>
                  <div className="border border-amber-100 p-4 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-amber-800 block">📦 تغليف تراثي فاخر</span>
                    <p className="text-stone-500 text-[10px] leading-normal font-light">علب مخصصة لحماية القطع الحرفية أثناء سفرك، مناسبة للإهداء الدولي.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedRole === 'admin' && (
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-stone-200 p-6 md:p-8 rounded-3xl shadow-lg space-y-6 text-right"
            >
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <Shield className="w-6 h-6 text-slate-700" />
                <h3 className="font-extrabold text-stone-800 text-base md:text-lg">ميثاق الإشراف والحوكمة السيادية للمنصة</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-xs mb-1">🛡️ تدقيق واعتماد طلبات التمويل وبناء الجدارة</h4>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    نحن ندير الثقة التنموية. يتم مراجعة وفلترة مشاريع الأسر الحاصلة على نسب جاهزية معتمدة من بنك التنمية الاجتماعية لإثبات ملاءمتها ومطابقتها للمتطلبات الوطنية.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-200 p-4 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-slate-800 block">⚖️ حوكمة واختبار عادل</span>
                    <p className="text-stone-500 text-[10px] leading-normal font-light">تقييم مبني بالكامل على إحصاءات الجدارة الرقمية والمشاركات التدريبية الفعلية.</p>
                  </div>
                  <div className="border border-slate-200 p-4 rounded-xl space-y-1">
                    <span className="text-xs font-bold text-slate-800 block">🔒 حماية البيانات الشخصية</span>
                    <p className="text-stone-500 text-[10px] leading-normal font-light">كافة وثائق الهوية والجوازات مشفرة وتخضع للسرية الرقابية المطلقة.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  )}
</div>

      {/* Smart Technical Support Modal */}
      {showSupport && (
        <SmartSupportModal 
          onClose={() => {
            setShowSupport(false);
            setSupportInitialInfo(undefined);
          }} 
          initialInfo={supportInitialInfo}
        />
      )}

      {/* 💳 Exquisite Direct Purchase Modal (Buy without packages) */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl overflow-hidden text-right flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="bg-[#174F3E] p-4 text-white flex items-center justify-between">
              <button 
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  setPurchaseSuccess(false);
                }}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer"
              >
                إغلاق ✕
              </button>
              <div className="flex items-center gap-2">
                <div>
                  <h4 className="font-extrabold text-xs md:text-sm">الشراء الفوري المباشر 🛍️</h4>
                  <p className="text-[10px] text-accent/85 font-light">دون اشتراك أو باقات مسبقة</p>
                </div>
                <div className="bg-white/10 p-2 rounded-xl">
                  <ShoppingBag className="w-5 h-5 text-accent" />
                </div>
              </div>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {!purchaseSuccess ? (
                <>
                  {/* Product quick summary card */}
                  <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 flex gap-3 items-center text-right">
                    <img 
                      src={selectedProduct.imageUrl} 
                      alt={selectedProduct.name} 
                      className="w-16 h-16 object-cover rounded-xl border border-stone-200"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-0.5 flex-1 text-right">
                      <span className="text-[10px] bg-[#EBF1FA] text-[#174F3E] px-2 py-0.5 rounded-full font-bold">
                        {selectedProduct.categoryLabel}
                      </span>
                      <h5 className="font-bold text-stone-800 text-xs md:text-sm">{selectedProduct.name}</h5>
                      <p className="text-[10px] text-stone-400 font-medium">إعداد: {selectedProduct.family}</p>
                      <p className="text-[11px] text-stone-500 font-mono font-bold">السعر الفردي: {selectedProduct.price} ر.س</p>
                    </div>
                  </div>

                  {/* Warning label showing no package constraint */}
                  <div className="bg-amber-50 text-amber-900 p-3 rounded-xl border border-amber-200/80 flex items-center gap-2 text-[10px] text-right">
                    <span>🎉</span>
                    <span><strong>ميزة الشراء الحر المباشر مفعلة!</strong> يمكنك إكمال الطلب الآن والحصول على توصيل سريع دون الحاجة لشراء باقة أو اشتراك.</span>
                  </div>

                  {/* Validation message if any */}
                  {purchaseError && (
                    <div className="bg-red-50 text-red-700 p-2.5 rounded-xl border border-red-100 text-[10px] font-bold text-center">
                      ⚠ {purchaseError}
                    </div>
                  )}

                  {/* Buyer Form Fields */}
                  <div className="space-y-3 pt-2 text-right">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-stone-700">الاسم الكامل للمستلم <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          placeholder="مثال: عبدالرحمن مكي"
                          value={orderName}
                          onChange={(e) => setOrderName(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-[#174F3E] outline-none text-right"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-stone-700">رقم الجوال للمتابعة والتوصيل <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          placeholder="مثال: 050XXXXXXX"
                          value={orderPhone}
                          onChange={(e) => setOrderPhone(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-[#174F3E] outline-none text-left"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-stone-700">عنوان التوصيل أو فندق الإقامة بمكة/المدينة <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        placeholder="مثال: فندق هيلتون مكة، البرج الغربي، غرفة 402"
                        value={orderAddress}
                        onChange={(e) => setOrderAddress(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-[#174F3E] outline-none text-right"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-stone-700">الكمية المطلوبة</label>
                        <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-white">
                          <button 
                            type="button" 
                            onClick={() => setOrderQuantity(prev => Math.max(1, prev - 1))}
                            className="bg-stone-100 hover:bg-stone-200 px-3 py-2 text-xs font-bold transition-all cursor-pointer"
                          >
                            -
                          </button>
                          <span className="flex-1 text-center font-mono font-bold text-xs">{orderQuantity}</span>
                          <button 
                            type="button" 
                            onClick={() => setOrderQuantity(prev => prev + 1)}
                            className="bg-stone-100 hover:bg-stone-200 px-3 py-2 text-xs font-bold transition-all cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-stone-700">طريقة الدفع الفوري</label>
                        <select
                          value={orderPayment}
                          onChange={(e: any) => setOrderPayment(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-[#174F3E] outline-none text-right bg-white"
                        >
                          <option value="cod">💵 الدفع عند الاستلام</option>
                          <option value="mada">💳 مدى (تأكيد فوري)</option>
                          <option value="applepay">🍎 Apple Pay (سريع)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Invoice Summary */}
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 pt-3 text-right">
                    <h6 className="font-bold text-stone-700 text-xs border-b pb-1">تفاصيل الحساب الفوري:</h6>
                    <div className="flex justify-between text-[11px] text-stone-500">
                      <span>سعر المنتجات (الكمية × {selectedProduct.price} ر.س):</span>
                      <span className="font-mono font-bold text-stone-800">{selectedProduct.price * orderQuantity} ر.س</span>
                    </div>
                    <div className="flex justify-between text-[11px] text-stone-500">
                      <span>توصيل فوري مخصص للفندق/السكن:</span>
                      <span className="font-mono font-bold text-stone-800">15 ر.س</span>
                    </div>
                    <div className="flex justify-between text-xs font-black text-[#174F3E] border-t border-dashed pt-2">
                      <span>الإجمالي الكلي المطلوب:</span>
                      <span className="font-mono">{selectedProduct.price * orderQuantity + 15} ر.س</span>
                    </div>
                  </div>

                  {/* Confirmation button */}
                  <button
                    type="button"
                    onClick={handleConfirmPurchase}
                    className="w-full bg-[#174F3E] hover:bg-[#174F3E]/95 text-white font-black py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                  >
                    <span>🧾 تأكيد طلب الشراء المباشر</span>
                  </button>
                </>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <span className="text-5xl">🎉</span>
                  <div className="space-y-1">
                    <h5 className="font-black text-amber-900 text-sm md:text-base">تم تسجيل طلبك المباشر بنجاح!</h5>
                    <p className="text-[10px] text-stone-400 font-mono">رقم الفاتورة الفورية: {orderInvoice}</p>
                  </div>
                  
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-right space-y-2.5 max-w-md mx-auto">
                    <div className="text-xs font-bold text-stone-800 border-b pb-1.5">ملخص طلبك:</div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-stone-500">المنتج المطلوب:</span>
                      <span className="font-bold text-stone-800">{selectedProduct.name}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-stone-500">الكمية:</span>
                      <span className="font-mono font-bold text-stone-800">{orderQuantity}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-stone-500">طريقة الدفع:</span>
                      <span className="font-bold text-stone-800">
                        {orderPayment === 'cod' ? 'الدفع عند الاستلام' : orderPayment === 'mada' ? 'مدى' : 'Apple Pay'}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs font-black text-[#174F3E] border-t border-dashed pt-2">
                      <span>القيمة المدفوعة:</span>
                      <span className="font-mono">{selectedProduct.price * orderQuantity + 15} ر.س</span>
                    </div>
                  </div>

                  <p className="text-stone-500 text-xs font-light leading-relaxed px-4">
                    شكراً لاقتنائك موروثنا ودعمك للأسر الوطنية المنتجة! تم تحويل طلبك مباشرة للأسرة المنتجة <strong>{selectedProduct.family}</strong> للبدء في التجهيز الفوري، وسيصلك مندوب التوصيل خلال مدة وجيزة إلى: <span className="font-bold">{orderAddress}</span>.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProduct(null);
                      setPurchaseSuccess(false);
                    }}
                    className="bg-[#174F3E] text-white hover:bg-[#174F3E]/90 font-black py-2.5 px-8 rounded-xl text-xs transition-all cursor-pointer"
                  >
                    فهمت ذلك ومتابعة التصفح
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Interactive Simulation Success Toast */}
      {simulationToast && simulationToast.show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-5 left-5 md:left-8 z-[9999] max-w-sm w-full bg-white/95 backdrop-blur-md border-2 border-[#C8A96B] rounded-2xl shadow-2xl p-4 text-right flex items-start gap-3.5"
          id="simulation-toast-alert"
        >
          <div className="bg-[#C8A96B] text-white p-2.5 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-1 flex-grow">
            <div className="flex items-center justify-between gap-2">
              <span className="font-black text-stone-800 text-[11px] md:text-xs bg-amber-50 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                ⚡ إجراء تنفيذي مباشر ناجح
              </span>
              <button 
                type="button" 
                onClick={() => setSimulationToast(null)}
                className="text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h4 className="font-extrabold text-[#174F3E] text-xs leading-relaxed pt-0.5">{simulationToast.title}</h4>
            <p className="text-[10px] text-stone-500 font-light leading-relaxed">{simulationToast.desc}</p>
          </div>
        </motion.div>
      )}



    </div>
  );
}

export const SUGGESTIONS_LOGIN = [
  {
    id: 1,
    title: "تسجيل دخول: أم أحمد (أسرة منتجة)",
    desc: "ولوج مباشر لبيئة الأسر المنتجة المليئة بمبيعات الطهي والشهادات المعتمدة."
  },
  {
    id: 2,
    title: "تسجيل دخول: عبدالرحمن (معتمر كريم)",
    desc: "استعراض حساب معتمر يحجز باقات الغذائية والضيافة بمكة."
  },
  {
    id: 3,
    title: "تسجيل دخول: جون سميث (زائر وسائح)",
    desc: "دخول حساب زائر أجنبي لاقتناء السدو التراثي وتذوق الأطعمة."
  },
  {
    id: 4,
    title: "تسجيل دخول: مدير إرث أجيال (المدير الإداري)",
    desc: "مراقبة وإدارة ملفات التمويل، جولات التفتيش الصحي، وتقارير الأداء."
  },
  {
    id: 5,
    title: "إنشاء حساب أسرة طهي وحفظ أغذية جديدة",
    desc: "تسجيل فوري لأسرة جديدة للطهي وحفظ المأكولات لبدء المسار."
  },
  {
    id: 6,
    title: "دخول سريع: معتمر هندي باشتراطات صحية",
    desc: "طلب وجبات خالية تماماً من الغلوتين ومحددة السعرات."
  },
  {
    id: 7,
    title: "دخول سريع: سائح كندي مهتم بمنسوجات السدو",
    desc: "تصفح هدايا السدو التراثي والمشغولات الفاخرة."
  },
  {
    id: 8,
    title: "تسجيل دخول: مراقبة جودة صحية وبلدية (إدارة)",
    desc: "دخول الإدارة لمطابقة الشروط الصحية لمطابخ الأسر."
  },
  {
    id: 9,
    title: "تسجيل دخول: ممثل بنك التنمية الاجتماعية (إدارة)",
    desc: "دخول إداري لمتابعة دراسات جدوى التمويل الفوري دون كفيل."
  },
  {
    id: 10,
    title: "تسجيل دخول: منسق اللوجستيات والتسليم بمكة",
    desc: "دخول إداري بتركيز على تسليم وجبات المعتمرين وحفظ فائض الأطعمة."
  }
];

export const SUGGESTIONS_FEATURES = [
  {
    id: 11,
    title: "تصفح وجبة جريش حساوي أصيل",
    desc: "البحث المباشر عن صنف الجريش وعرض المطابخ المحضرة له."
  },
  {
    id: 12,
    title: "عرض برامج التمكين والتأهيل",
    desc: "استكشف برامج التدريب والتأهيل المعتمدة لرائدات ورواد العمل الحر."
  },
  {
    id: 13,
    title: "افتح استبيان جاهزية الأسر التمويلي",
    desc: "تشغيل معالج التسجيل للأسر لعرض استمارة الجدارة والجاهزية للبنك."
  },
  {
    id: 14,
    title: "حجز باقة تذوق عينات للزوار",
    desc: "تفعيل طلب باقة عينات مأكولات تراثية سعودية بمكة."
  },
  {
    id: 15,
    title: "استعراض لوحة الإنجازات والنمو المالي",
    desc: "الانتقال السريع إلى أرقام وإحصائيات أثر المنصة الاجتماعي والمالي."
  },
  {
    id: 16,
    title: "استكشاف مسارات تأهيل مهارات الأسر",
    desc: "الذهاب لمرحلة بناء الجدارة وتأهيل المعايير الصحية والطهي الفاخر."
  },
  {
    id: 17,
    title: "تفعيل تسعير المنتجات العادل والمقنن",
    desc: "ضبط مدخلات حاسبة الأسرة بمستويات تضمن هامش ربح مدروس."
  },
  {
    id: 18,
    title: "عرض باقات وجبات المعتمرين المخصصة",
    desc: "الانتقال لنموذج حجز وجبات المعتمرين ومواعيد التسليم الفندقي."
  },
  {
    id: 19,
    title: "البحث الفوري عن السدو والمشغولات اليدوية",
    desc: "تفعيل البحث عن هدايا السدو التراثية لاستكشاف المنسوجات المتاحة."
  },
  {
    id: 20,
    title: "معلومات الشراكة مع التفكير والنماء TND.SA",
    desc: "التعرف على حوكمة المنصة ومستشاري التأهيل الإداري للعمل الحر."
  },
  {
    id: 21,
    title: "عرض تفاصيل وجبات الفنادق بالفصل الساخن",
    desc: "الذهاب للاسئلة الشائعة وتوسيع سؤال الالتزام بالمعايير البلدية."
  },
  {
    id: 22,
    title: "عرض شهادة الملاءمة الصحية والبيئية",
    desc: "الذهاب لفقرة وثيقة الجاهزية المعتمدة لعرض الشهادة الصحية الصادرة."
  },
  {
    id: 23,
    title: "معاينة قياس الهدر الغذائي وحفظ النعمة",
    desc: "استعراض آليات قياس وإعادة توجيه الوجبات الفائضة للفنادق."
  },
  {
    id: 24,
    title: "استشارة مجانية لبناء الهوية البصرية للأسرة",
    desc: "عرض خيارات بناء العلامة التجارية والتعبئة الراقية للأسر."
  },
  {
    id: 25,
    title: "تصفح المطابخ المعتمدة والتحقق الصحي",
    desc: "البحث عن مطابخ الأسر المرخصة وفحص التوثيق الآمن لها."
  },
  {
    id: 26,
    title: "الاطلاع على الروزنامة الأسبوعية للوجبات",
    desc: "استعراض مواعيد الفطور والغداء التراثي للمعتمرين بمكة."
  },
  {
    id: 27,
    title: "معاينة قصص نجاح الشريكات المستفيدات",
    desc: "الانتقال إلى التقييمات وقراءة قصص ملهمة لحرفيات المنصة."
  },
  {
    id: 28,
    title: "قائمة الاشتراطات التسعة للسلامة والصحة",
    desc: "استعراض متطلبات فحص مطابخ الأسر لتسهيل الحصول على التراخيص."
  },
  {
    id: 29,
    title: "طلب استقبال باقات الضيافة الثقافية للوفود",
    desc: "تهيئة التسجيل لحجز استقبال تراثي ملكي للوفود السياحية."
  },
  {
    id: 30,
    title: "شهادة جدارة العمل الحر والائتمان الرقمي",
    desc: "معاينة وثيقة الجدارة الرقمية التي يتم ربطها بنظام بنك التنمية."
  }
];

const HERITAGE_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'الجريش الحساوي الأصيل باللحم البلدي',
    price: 35,
    category: 'culinary',
    categoryLabel: 'فنون الطهي 🍛',
    family: 'أم أحمد للمأكولات التراثية',
    rating: 4.9,
    reviewsCount: 124,
    desc: 'جريش فاخر مطهو بالطريقة الحساوية التقليدية باللحم البلدي الطازج والسمن البري والبهارات العطرة المجهزة منزلياً بنكهة الأجداد.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-2',
    title: 'علبة كليجا القصيم الملكية الفاخرة',
    price: 45,
    category: 'sweets',
    categoryLabel: 'حلويات وتمور 🍪',
    family: 'أم سليمان (حلويات التمكين الاقتصادي)',
    rating: 4.8,
    reviewsCount: 98,
    desc: 'كليجا مقرمشة مخبوزة على الأفران الطينية التراثية، ومحشوة بدبس التمر الخلاص الطبيعي والهيل واللومي القصيمي الفواح.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-3',
    title: 'سدو يدوي بنقوش نجدية أصيلة',
    price: 180,
    category: 'crafts',
    categoryLabel: 'حرف يدوية وسدو 🧵',
    family: 'نورة العتيبي (حرف سدو الأصالة)',
    rating: 5.0,
    reviewsCount: 45,
    desc: 'قطعة سدو تراثية منسوجة يدوياً بالكامل بخيوط الصوف الطبيعي والألوان النباتية، مثالية لتزيين غرف الفنادق والمجالس التراثية كهدية تذكارية رائعة.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-4',
    title: 'مبخرة حائلية خشبية مطعمة بالنحاس',
    price: 120,
    category: 'crafts',
    categoryLabel: 'حرف يدوية وسدو 🧵',
    family: 'أبو صالح (حرفيو الشمال التراثي)',
    rating: 4.7,
    reviewsCount: 62,
    desc: 'مبخرة مصنوعة يدوياً من خشب الأثل الطبيعي الفاخر، ومزينة بمسامير النحاس اللامعة والنقوش الهندسية الحائلية الأصيلة.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-5',
    title: 'باقة استقبال ضيوف الرحمن التراثية المكاملة',
    price: 250,
    category: 'hospitality',
    categoryLabel: 'ضيافة وبوفيهات ☕',
    family: 'بيت الضيافة بمكة المكرمة',
    rating: 4.9,
    reviewsCount: 87,
    desc: 'باقة استقبال ملكية تحتوي على دلة قهوة سعودية شقراء بالهيل والزعفران، علبة تمور خلاص فاخرة محشوة بالمكسرات، ومبخرة عود دوسري فواح لإكرام الوفود.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-6',
    title: 'سفرة خوصية ملونة مجدولة باليد',
    price: 65,
    category: 'crafts',
    categoryLabel: 'حرف يدوية وسدو 🧵',
    family: 'أم يوسف (سعف النخيل المطور)',
    rating: 4.6,
    reviewsCount: 38,
    desc: 'سفرة طعام دائرية مصنوعة يدوياً من خوص النخيل الطبيعي المقاوم للماء والمصبوغ بألوان التراث الشعبي الزاهية.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop'
  }
];

