import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ChevronRight,
  LogOut, 
  Menu, 
  X,
  FileText,
  HeartHandshake,
  Calendar,
  Phone,
  Video,
  MoreVertical,
  MessageSquare,
  Moon,
  Sun,
  Globe,
  Settings,
  Gift,
  Home,
  HelpCircle,
  PackageCheck,
  Bell
} from 'lucide-react';

import { BeneficiaryProfile, Course, Assessment, SubscriptionState, ProducerFamily, Product } from './types';
import { INITIAL_CHALLENGES, INITIAL_STATS, INITIAL_PROFILE, INITIAL_SUBSCRIPTION } from './initialData';
import { INITIAL_COURSES } from './courses';
import { INITIAL_PRODUCERS } from './producersData';

// Component Imports
import LandingPage from './components/LandingPage';
import StoryLens from './components/StoryLens';
import ProfileForm from './components/ProfileForm';
import SmartEvaluation from './components/SmartEvaluation';
import TrainingHub from './components/TrainingHub';
import StoreManager from './components/StoreManager';
import SmartJourney from './components/SmartJourney';
import GrowthTracker from './components/GrowthTracker';
import AdminPanel from './components/AdminPanel';
import ImpactScreen from './components/ImpactScreen';
import SmartSupportModal from './components/SmartSupportModal';
import PackagesModal from './components/PackagesModal';
import LoginPage from './components/LoginPage';

// Category Portals & Producer Public Profile
import FamilyPortalPage from './components/FamilyPortalPage';
import PilgrimPortalPage from './components/PilgrimPortalPage';
import VisitorPortalPage from './components/VisitorPortalPage';
import BuyerPortalPage from './components/BuyerPortalPage';
import CustomerPortalPage, { CustomerTab } from './components/CustomerPortalPage';
import PartnerPortalPage from './components/PartnerPortalPage';
import TrackSwitcherModal from './components/TrackSwitcherModal';
import EntryIdentityGateModal from './components/EntryIdentityGateModal';
import ProducerPublicProfile from './components/ProducerPublicProfile';
import ProducerRegistrationModal from './components/ProducerRegistrationModal';
import QualificationJourneyPage from './components/QualificationJourneyPage';
import Footer from './components/Footer';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  // Authentication State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Brand Logo Customization State (with localStorage persistence)
  const [warathLogo, setWarathLogoState] = useState<string>(() => {
    return localStorage.getItem('warath_logo') || '';
  });

  const [thinkingLogo, setThinkingLogoState] = useState<string>(() => {
    return localStorage.getItem('thinking_logo') || '';
  });

  // Active Site-Wide Heritage Theme (Official, Founding Day, National Day, Ramadan)
  const [activeTheme, setActiveTheme] = useState<string>(() => {
    return localStorage.getItem('warth_active_theme') || 'official';
  });

  // Main Page Primary Color Setting (#174F3E Heritage Dark Green default)
  const [mainPrimaryColor, setMainPrimaryColor] = useState<string>(() => {
    return localStorage.getItem('warth_main_primary_color') || '#174F3E';
  });

  // Language Context (Arabic / English)
  const { lang, setLang, toggleLanguage, t, isEn } = useLanguage();

  const setWarathLogo = (val: string) => {
    setWarathLogoState(val);
    localStorage.setItem('warath_logo', val);
  };

  const setThinkingLogo = (val: string) => {
    setThinkingLogoState(val);
    localStorage.setItem('thinking_logo', val);
  };

  // Helper renderers for dynamic custom logos
  const renderWarathLogo = (sizeClass = "w-11 h-11 text-xl") => {
    if (warathLogo && (warathLogo.startsWith('http') || warathLogo.startsWith('/') || warathLogo.startsWith('data:'))) {
      return (
        <img 
          src={warathLogo} 
          alt="شعار إرث أجيال" 
          className={`${sizeClass.split(' ')[0]} ${sizeClass.split(' ')[1]} object-contain rounded-xl shadow-sm border border-accent/30 bg-white`} 
          referrerPolicy="no-referrer" 
        />
      );
    }
    return (
      <div className={`bg-accent text-primary rounded-xl flex items-center justify-center shadow-md font-bold font-mono ${sizeClass}`}>
        {warathLogo ? warathLogo.substring(0, 3) : 'و'}
      </div>
    );
  };

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

  // Application State
  const [profile, setProfile] = useState<BeneficiaryProfile>(INITIAL_PROFILE);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionState>(INITIAL_SUBSCRIPTION);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('story');
  const [navHistory, setNavHistory] = useState<string[]>(['story']);
  const [isGlobalSupportOpen, setIsGlobalSupportOpen] = useState<boolean>(false);
  const [isPackagesOpen, setIsPackagesOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'beneficiary' | 'admin' | 'pilgrim' | 'visitor'>('beneficiary');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Producer Families Data & Portals
  const [producers, setProducers] = useState<ProducerFamily[]>(() => {
    const saved = localStorage.getItem('warath_producers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return INITIAL_PRODUCERS;
  });

  const [selectedProducerForView, setSelectedProducerForView] = useState<ProducerFamily | null>(null);
  const [isProducerRegisterOpen, setIsProducerRegisterOpen] = useState(false);

  // Route Path & Track State
  const [activeTrack, setActiveTrack] = useState<'general' | 'family' | 'pilgrim' | 'visitor' | 'partner'>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash.includes('family') || hash.includes('families')) return 'family';
    if (hash.includes('pilgrim') || hash.includes('pilgrims')) return 'pilgrim';
    if (hash.includes('visitor') || hash.includes('visitors') || hash.includes('customer') || hash.includes('client') || hash.includes('buyer')) return 'visitor';
    if (hash.includes('partner') || hash.includes('partners') || hash.includes('supporter')) return 'partner';
    return 'general';
  });
  const [isTrackSwitcherOpen, setIsTrackSwitcherOpen] = useState<boolean>(false);
  const [isIdentityGateOpen, setIsIdentityGateOpen] = useState<boolean>(() => {
    const savedRole = localStorage.getItem('warath_selected_role_track');
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== '/' && hash !== '' && hash !== 'home') return false;
    return !savedRole;
  });
  const [customerInitialTab, setCustomerInitialTab] = useState<CustomerTab>('buyer');

  const handleIdentitySelectRole = (
    role: 'family' | 'customer', 
    customerSubTab?: 'buyer' | 'pilgrim' | 'visitor',
    contactInfo?: { type: 'phone' | 'email'; value: string; name?: string }
  ) => {
    localStorage.setItem('warath_selected_role_track', role);
    if (contactInfo) {
      localStorage.setItem('warath_user_contact', JSON.stringify({
        ...contactInfo,
        role,
        savedAt: new Date().toISOString()
      }));
      setProfile(prev => ({
        ...prev,
        name: contactInfo.name || prev.name,
        phone: contactInfo.type === 'phone' ? contactInfo.value : prev.phone,
        email: contactInfo.type === 'email' ? contactInfo.value : prev.email
      }));
    }
    setIsIdentityGateOpen(false);
    if (role === 'family') {
      setActiveTrack('family');
      setCurrentPath('/portal/families');
      window.location.hash = '#/portal/families';
    } else {
      setActiveTrack('visitor');
      if (customerSubTab) {
        setCustomerInitialTab(customerSubTab);
      }
      setCurrentPath('/portal/customer');
      window.location.hash = '#/portal/customer';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTrack = (track: 'family' | 'pilgrim' | 'visitor' | 'partner') => {
    setActiveTrack(track);
    if (track === 'family') {
      window.location.hash = '#/portal/families';
      setCurrentPath('/portal/families');
    } else if (track === 'pilgrim') {
      setCustomerInitialTab('pilgrim');
      window.location.hash = '#/portal/customer';
      setCurrentPath('/portal/customer');
    } else if (track === 'visitor') {
      setCustomerInitialTab('visitor');
      window.location.hash = '#/portal/customer';
      setCurrentPath('/portal/customer');
    } else if (track === 'partner') {
      window.location.hash = '#/portal/partners';
      setCurrentPath('/portal/partners');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === '/login' || hash === 'login' || hash === 'pathway-selection' || hash === '/pathway-selection') return '/login';
    if (hash === '/store' || hash === 'store') return '/store';
    if (hash === '/packages' || hash === 'packages') return '/packages';
    if (hash === '/smart-journey' || hash === 'smart-journey') return '/smart-journey';
    if (hash === '/support' || hash === 'support') return '/support';
    if (hash === '/admin' || hash === 'admin') return '/admin';
    if (hash === '/journey' || hash === 'journey' || hash === '/qualification' || hash === 'qualification' || hash === '/golden-guarantee' || hash === 'golden-guarantee') return '/journey';
    if (hash === '/portal/families' || hash === 'portal/families' || hash === '/family' || hash === 'family' || hash === '/families' || hash === 'families' || hash.includes('journey/family')) return '/portal/families';
    if (hash === '/portal/customer' || hash === 'portal/customer' || hash === '/customer' || hash === 'customer' || hash === '/client' || hash === 'client' || hash === '/portal/buyers' || hash === 'portal/buyers') return '/portal/customer';
    if (hash === '/portal/pilgrims' || hash === 'portal/pilgrims' || hash.includes('journey/pilgrim')) return '/portal/pilgrims';
    if (hash === '/portal/visitors' || hash === 'portal/visitors' || hash.includes('journey/visitor')) return '/portal/visitors';
    if (hash === '/portal/partners' || hash === 'portal/partners' || hash.includes('journey/partner')) return '/portal/partners';
    if (hash.startsWith('/producer/') || hash.startsWith('producer/')) return '/producer';
    return '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const raw = window.location.hash.replace('#', '');

      if (raw.startsWith('/producer/') || raw.startsWith('producer/')) {
        const id = raw.replace('/producer/', '').replace('producer/', '');
        const found = producers.find(p => p.id === id);
        if (found) setSelectedProducerForView(found);
        else setSelectedProducerForView(producers[0]);
        setCurrentPath('/producer');
        return;
      }

      if (raw === '/portal/families' || raw === 'portal/families' || raw === '/family' || raw === 'family' || raw === '/families' || raw === 'families' || raw.includes('journey/family')) {
        setSelectedProducerForView(null);
        setActiveTrack('family');
        setCurrentPath('/portal/families');
        return;
      }
      if (raw === '/portal/customer' || raw === 'portal/customer' || raw === '/customer' || raw === 'customer' || raw === '/client' || raw === 'client' || raw === '/portal/buyers' || raw === 'portal/buyers') {
        setSelectedProducerForView(null);
        setActiveTrack('visitor');
        setCurrentPath('/portal/customer');
        return;
      }
      if (raw === '/portal/pilgrims' || raw === 'portal/pilgrims' || raw.includes('journey/pilgrim')) {
        setSelectedProducerForView(null);
        setActiveTrack('pilgrim');
        setCustomerInitialTab('pilgrim');
        setCurrentPath('/portal/customer');
        return;
      }
      if (raw === '/portal/visitors' || raw === 'portal/visitors' || raw.includes('journey/visitor')) {
        setSelectedProducerForView(null);
        setActiveTrack('visitor');
        setCustomerInitialTab('visitor');
        setCurrentPath('/portal/customer');
        return;
      }
      if (raw === '/portal/partners' || raw === 'portal/partners' || raw.includes('journey/partner')) {
        setSelectedProducerForView(null);
        setActiveTrack('partner');
        setCurrentPath('/portal/partners');
        return;
      }

      if (raw === '/login' || raw === 'login' || raw === 'pathway-selection' || raw === '/pathway-selection') {
        setSelectedProducerForView(null);
        setCurrentPath('/login');
      } else if (raw === '/store' || raw === 'store') {
        setSelectedProducerForView(null);
        setCurrentPath('/store');
      } else if (raw === '/packages' || raw === 'packages') {
        setSelectedProducerForView(null);
        setCurrentPath('/packages');
        setIsPackagesOpen(true);
      } else if (raw === '/smart-journey' || raw === 'smart-journey') {
        setSelectedProducerForView(null);
        setCurrentPath('/smart-journey');
      } else if (raw === '/support' || raw === 'support') {
        setSelectedProducerForView(null);
        setCurrentPath('/support');
        setIsGlobalSupportOpen(true);
      } else if (raw === '/admin' || raw === 'admin') {
        setSelectedProducerForView(null);
        setCurrentPath('/admin');
      } else if (raw === '/journey' || raw === 'journey' || raw === '/qualification' || raw === 'qualification' || raw === '/golden-guarantee' || raw === 'golden-guarantee') {
        setSelectedProducerForView(null);
        setCurrentPath('/journey');
      } else if (!raw || raw === '/' || raw === 'home') {
        setSelectedProducerForView(null);
        setActiveTrack('general');
        setCurrentPath('/');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [producers]);

  // Global Interactive Support WhatsApp-style Chat State
  const [globalSupportChats, setGlobalSupportChats] = useState([
    { id: 1, sender: 'agent', text: 'أهلاً بك في الدعم المباشر لمنصة إرث أجيال الموحدة. كيف يمكنني مساعدتك اليوم؟ 🌴', time: '12:00 م' }
  ]);
  const [isSupportTyping, setIsSupportTyping] = useState<boolean>(false);
  const [supportInput, setSupportInput] = useState<string>('');

  const handleSendSupportMessage = (text: string) => {
    if (!text.trim()) return;
    
    const userMsgId = Date.now();
    setGlobalSupportChats(prev => [...prev, { id: userMsgId, sender: 'user', text, time: 'الآن' }]);
    setSupportInput('');
    setIsSupportTyping(true);
    
    setTimeout(() => {
      setIsSupportTyping(false);
      
      setTimeout(() => {
        let replyText = 'يسعدني خدمتك! نحن هنا لتوجيهك في مسيرة التمكين والتمويل المستدام لدى مؤسسة التفكير والنماء.';
        const cleanText = text.toLowerCase();
        
        if (cleanText.includes('أرباح') || cleanText.includes('أرباحي') || cleanText.includes('عوائد') || cleanText.includes('مبيعات')) {
          replyText = 'منصة إرث أجيال تتيح لك إدارة مبيعاتك وتتبع طلباتك عبر المتجر الإلكتروني المخصص لمشروعك بكل سهولة وشفافية! 📈';
        } else if (cleanText.includes('سجل') || cleanText.includes('تسجيل') || cleanText.includes('انضم') || cleanText.includes('تمكين')) {
          replyText = 'يسعدنا انضمامك! اضغط على زر "ابدأ استبيان التمكين" في أعلى الرئيسية لتعبئة الاستبيان الذكي للجاهزية، وسيقوم مستشارو التفكير والنماء بتقييم دراسة مشروعك وبدء تدريبك فوراً. 📋';
        } else if (cleanText.includes('كفيل') || cleanText.includes('تمويل') || cleanText.includes('بدون كفيل')) {
          replyText = 'نعم! نركز في منصة إرث أجيال ومؤسسة التفكير والنماء على تمكين العمل الحر للأسر والشباب الحرفيين، ونقدم حلول تمويل تمكينية ميسرة لخدمتكم لبناء مشاريعكم بدون كفيل غارم معقد. 🛡️';
        } else if (cleanText.includes('شروط') || cleanText.includes('أهلية') || cleanText.includes('الضيافة') || cleanText.includes('حرفية')) {
          replyText = 'شروطنا بسيطة: الشغف بالتراث، الجدية في الاستدامة، واجتياز اختبار التقييم الذكي وحضور 3 دورات تأهيلية على الأقل في المهارات الصحية والتسويقية على منصتنا! ☕';
        }
        
        setGlobalSupportChats(prev => [...prev, { id: Date.now() + 1, sender: 'agent', text: replyText, time: 'الآن' }]);
      }, 500);
    }, 2000);
  };

  useEffect(() => {
    const handleOpenSupportEvent = () => {
      setIsGlobalSupportOpen(true);
    };
    const handleOpenPackagesEvent = () => {
      setIsPackagesOpen(true);
    };
    window.addEventListener('open-smart-support', handleOpenSupportEvent);
    window.addEventListener('open-packages-modal', handleOpenPackagesEvent);
    return () => {
      window.removeEventListener('open-smart-support', handleOpenSupportEvent);
      window.removeEventListener('open-packages-modal', handleOpenPackagesEvent);
    };
  }, []);

  const navigateToTab = (tabId: string) => {
    setNavHistory(prev => {
      if (prev[prev.length - 1] === tabId) return prev;
      return [...prev, tabId];
    });
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Safe back navigation with scroll restoration
  const navigateBack = () => {
    if (navHistory.length > 1) {
      const updatedHistory = [...navHistory];
      updatedHistory.pop();
      const prevTab = updatedHistory[updatedHistory.length - 1];
      setNavHistory(updatedHistory);
      setActiveTab(prevTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('story');
    }
  };

  // Handle Login and Logout
  const handleLogin = (role: 'beneficiary' | 'admin' | 'pilgrim' | 'visitor', name?: string) => {
    setUserRole(role);
    setIsLoggedIn(true);
    if ((role === 'beneficiary' || role === 'pilgrim' || role === 'visitor') && name) {
      setProfile(prev => ({
        ...prev,
        name: name,
        projectName: name,
        registered: true
      }));
    }

    if (role === 'admin') {
      window.location.hash = '#/admin';
      setCurrentPath('/admin');
    } else {
      window.location.hash = '#/profile';
      setCurrentPath('/profile');
      navigateToTab('profile');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('beneficiary');
    setActiveTab('story');
    setNavHistory(['story']);
    window.location.hash = '#/';
    setCurrentPath('/');
  };

  // Sync / Calculate Dynamic Readiness Score
  const [dynamicReadinessScore, setDynamicReadinessScore] = useState<number>(0);

  useEffect(() => {
    let score = 0;
    if (profile.registered) score += 25;
    if (assessment) score += 25;
    
    // Add points for each completed course / passed quiz
    const completedCount = courses.filter(c => c.completed).length;
    const quizCount = courses.filter(c => c.quizPassed).length;
    
    score += completedCount * 6.5; // Up to 39 points
    score += quizCount * 1.8; // Up to ~11 points
    
    setDynamicReadinessScore(Math.min(Math.round(score), 100));
  }, [profile, assessment, courses]);

  // Handle Admin Approving user project directly
  const handleAdminApproveProject = () => {
    if (!profile.registered) return;
    
    // Set all courses as complete, quiz as passed, evaluation as complete to simulate 100% readiness!
    const fullyCompletedCourses = courses.map(c => ({
      ...c,
      completed: true,
      quizPassed: true,
      completedLessons: c.lessons.map(l => l.id)
    }));
    
    const simulatedAssessment: Assessment = {
      evaluated: true,
      score: 95,
      productQuality: 5,
      founderSkills: 5,
      strengths: [
        'معتمد رسمياً من أمانة المنصة والشركاء الماليين.',
        'ملف مهني رقمي متكامل يبرز اللمسات التراثية بصور فائقة الجودة.',
        'كتالوج منتجات نشط متصل ومطابق لباقات المعتمرين والزوار.'
      ],
      improvements: [
        'المحافظة على مستويات الجودة الراقية وتطوير المنتجات بصورة مستمرة.'
      ],
      recommendations: [
        'البدء في توريد وجبات وضيافة للوفود السياحية والفنادق الفاخرة الشريكة.',
        'المشاركة الفعالة في الجناح الموسمي لمعارض رائدات العمل الحر المدعومة.'
      ],
      answers: [],
      reportDate: new Date().toLocaleDateString('ar-SA')
    };

    setCourses(fullyCompletedCourses);
    setAssessment(simulatedAssessment);
    setProfile({
      ...profile,
      registered: true
    });
    
    // Redirect to growth tracker
    setActiveTab('growth');
    alert('تم اعتماد وثيقة جاهزية المشروع بنجاح وترقية المستفيد ليكون ممكناً اقتصادياً بنسبة 100%! 🎉');
  };

  // Pre-configured tab metadata
  const tabs = [
    { id: 'story', label: lang === 'en' ? 'Erth Ajyal Story' : 'قصة إرث أجيال', icon: Compass, desc: lang === 'en' ? 'Vision & Empowerment' : 'الرؤية وفلسفة التمكين' },
    { id: 'profile', label: lang === 'en' ? 'Digital Profile' : 'إنشاء الملف الرقمي', icon: User, desc: lang === 'en' ? 'Catalog & Products' : 'كتالوج ومنتجات رائدات العمل الحر' },
    { id: 'evaluation', label: lang === 'en' ? 'Smart Readiness' : 'التقييم الذكي للجاهزية', icon: Brain, desc: lang === 'en' ? 'Project Diagnostic' : 'تحليل وتشخيص المشروع' },
    { id: 'training', label: lang === 'en' ? 'Training Hub' : 'مسار التأهيل والتدريب', icon: GraduationCap, desc: lang === 'en' ? 'Courses & Certificates' : 'الدروس والكويزات والشهادات' },
    { id: 'store', label: lang === 'en' ? 'Store & Subscriptions' : 'المتجر والاشتراكات', icon: ShoppingBag, desc: lang === 'en' ? 'Pilgrim Packages' : 'باقات المعتمرين والمتاجر' },
    { id: 'pilgrim_journey', label: lang === 'en' ? 'Pilgrim/Visitor Journey' : 'رحلتي الذكية زائر/معتمر', icon: Calendar, desc: lang === 'en' ? 'Memberships & Meals' : 'العضويات وجدول الوجبات' },
    { id: 'growth', label: lang === 'en' ? 'Growth & Financing' : 'بوابة الجاهزية للنمو', icon: TrendingUp, desc: lang === 'en' ? 'Funding Opportunities' : 'فرص التمويل والتوسع المالي' },
    { id: 'impact', label: lang === 'en' ? 'Impact Indicators' : 'مؤشرات قياس الأثر', icon: Award, desc: lang === 'en' ? 'Transformation Stories' : 'قصص التحول والتمكين الختامي' }
  ];

  const filteredTabs = tabs.filter(tab => {
    if (userRole === 'visitor' || userRole === 'pilgrim') {
      return ['story', 'store', 'pilgrim_journey', 'impact'].includes(tab.id);
    }
    return true;
  });

  // Standalone Login Screen (Completely separated from the Landing Page)
  if (currentPath === '/login' && !isLoggedIn) {
    return (
      <LoginPage
        onLogin={handleLogin}
        onGoHome={() => {
          window.location.hash = '#/';
          setCurrentPath('/');
        }}
        warathLogo={warathLogo}
      />
    );
  }

  return (
    <div className="min-h-screen bg-bgwarm text-darktext flex flex-col font-sans selection:bg-primary selection:text-accent pb-20 lg:pb-0 w-full max-w-full overflow-x-hidden" dir={isEn ? "ltr" : "rtl"} id="app-root-container">
      
      {/* Single, Elegant, Responsive Top Navigation Bar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-50 shadow-xs" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4 relative">
          
          {/* 1. الجهة اليمنى/اليُسرى: شعار إرث أجيال الرسمي والوصف المعتمد */}
          <a 
            href="#/" 
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = '#/';
              setCurrentPath('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
            id="header-brand-logo"
          >
            {renderWarathLogo("w-9 h-9 sm:w-11 sm:h-11 text-base sm:text-xl")}
            <div className={isEn ? 'text-left' : 'text-right'}>
              <h1 className="text-sm sm:text-lg font-black text-[#174F3E] tracking-tight leading-none group-hover:text-[#0D3B2E] transition-colors">
                {t('brand.name')}
              </h1>
              <p className="text-[10px] text-[#6B756F] font-bold leading-tight mt-0.5">
                {t('brand.tagline')}
              </p>
            </div>
          </a>

          {/* 2. المنتصف: القائمة الرئيسية النظيفة (على الشاشات الكبيرة) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-bold text-[#19352D]">
            <button 
              onClick={() => { window.location.hash = '#/'; setCurrentPath('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="px-3 py-1.5 rounded-xl hover:bg-[#DDE9E1]/50 hover:text-[#174F3E] transition-all cursor-pointer"
            >
              {t('nav.home')}
            </button>
            <button 
              onClick={() => { window.location.hash = '#/?view=standalone_about'; setCurrentPath('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="px-3 py-1.5 rounded-xl hover:bg-[#DDE9E1]/50 hover:text-[#174F3E] transition-all cursor-pointer"
            >
              {t('nav.about')}
            </button>
            <button 
              onClick={() => { window.location.hash = '#/?view=standalone_services'; setCurrentPath('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="px-3 py-1.5 rounded-xl hover:bg-[#DDE9E1]/50 hover:text-[#174F3E] transition-all cursor-pointer"
            >
              {t('nav.services')}
            </button>
            <button 
              onClick={() => { window.location.hash = '#/portal/families'; setCurrentPath('/portal/families'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="px-3 py-1.5 rounded-xl hover:bg-[#DDE9E1]/50 hover:text-[#174F3E] transition-all cursor-pointer"
            >
              {t('nav.producers')}
            </button>
            <button 
              onClick={() => { window.location.hash = '#/portal/partners'; setCurrentPath('/portal/partners'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="px-3 py-1.5 rounded-xl hover:bg-[#DDE9E1]/50 hover:text-[#174F3E] transition-all cursor-pointer"
            >
              {t('nav.partners')}
            </button>
            <button 
              onClick={() => { window.location.hash = '#/?view=standalone_news'; setCurrentPath('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="px-3 py-1.5 rounded-xl hover:bg-[#DDE9E1]/50 hover:text-[#174F3E] transition-all cursor-pointer"
            >
              {t('nav.blog')}
            </button>
            <button 
              onClick={() => { window.location.hash = '#/?view=standalone_contact'; setCurrentPath('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="px-3 py-1.5 rounded-xl hover:bg-[#DDE9E1]/50 hover:text-[#174F3E] transition-all cursor-pointer"
            >
              {t('nav.contact')}
            </button>
          </nav>

          {/* 3. الجهة الأخرى: تحويل اللغة + زر تحديد الهوية والمسار + زر تسجيل الدخول */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Role / Persona Gateway Switcher */}
            <button
              onClick={() => setIsIdentityGateOpen(true)}
              className="flex items-center gap-1.5 bg-[#FAF9F6] hover:bg-[#EBF1FA] text-[#174F3E] border border-[#C8A96B]/60 hover:border-[#174F3E] px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs font-black transition-all cursor-pointer shadow-2xs"
              title="تحديد أو تبديل الهوية: العمل الحر أو العميل"
              id="top-role-selector-btn"
            >
              <span className="text-sm shrink-0">
                {currentPath.includes('families') || currentPath.includes('family') ? '👩‍🍳' : '🛍️'}
              </span>
              <span className="text-xs font-black whitespace-nowrap">
                {currentPath.includes('families') || currentPath.includes('family') ? 'العمل الحر' : 'العميل'}
              </span>
              <span className="text-[10px] bg-[#174F3E] text-amber-300 px-1.5 py-0.5 rounded-md sm:rounded-lg font-bold shrink-0">
                ⇄
              </span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => toggleLanguage()}
              className="hidden sm:flex items-center gap-1.5 bg-[#F5F4EE] hover:bg-[#DDE9E1] text-[#174F3E] border border-stone-200/80 px-3 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer"
              title={isEn ? "Switch to Arabic" : "تغيير للإنجليزية"}
            >
              <Globe className="w-4 h-4 text-[#174F3E]" />
              <span>{isEn ? 'العربية 🇸🇦' : 'English 🇬🇧'}</span>
            </button>

            {/* Login / Account Button with Heritage Green Theme & Rounded Corners */}
            <div className="relative">
              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    window.location.hash = '#/login';
                    setCurrentPath('/login');
                  } else {
                    setIsAccountMenuOpen(!isAccountMenuOpen);
                  }
                }}
                className="bg-[#174F3E] hover:bg-[#0D3B2E] text-white border border-[#174F3E] py-2 px-3.5 sm:px-4 rounded-2xl transition-all flex items-center gap-2 cursor-pointer shadow-xs hover:scale-[1.02]"
                id="top-account-btn"
                title={isLoggedIn ? (isEn ? "My Account" : "حسابي والخيارات") : t('nav.login')}
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-[#C8A96B] text-white font-black flex items-center justify-center text-xs shadow-inner">
                  {isLoggedIn ? (profile.name ? profile.name.charAt(0) : '👤') : '👤'}
                </div>
                <span className="text-xs font-bold text-white">
                  {isLoggedIn ? profile.name || t('nav.myAccount') : t('nav.login')}
                </span>
              </button>

              {/* Account Dropdown Menu (When Logged In) */}
              <AnimatePresence>
                {isAccountMenuOpen && isLoggedIn && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-64 bg-white border border-stone-200 rounded-3xl shadow-2xl p-3 z-50 text-stone-800 text-right space-y-1"
                  >
                    <div className="p-3 bg-stone-50 rounded-2xl border border-stone-100 mb-2">
                      <p className="text-xs font-black text-primary">{profile.name || 'مستخدم المنصة'}</p>
                      <p className="text-[10px] text-stone-500 font-bold">
                        {userRole === 'admin' ? 'مدير المنصة 👑' :
                         userRole === 'pilgrim' ? 'زائر / معتمر كريم 📍' : 'رائدة عمل حر وحرفية 👩‍🍳'}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        if (userRole === 'admin') {
                          window.location.hash = '#/admin';
                          setCurrentPath('/admin');
                        } else {
                          window.location.hash = '#/profile';
                          setCurrentPath('/profile');
                          navigateToTab('profile');
                        }
                      }}
                      className="w-full text-right p-2.5 rounded-xl hover:bg-stone-100 text-xs font-bold text-stone-700 flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <User className="w-4 h-4 text-primary" />
                      <span>الملف الشخصي</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        window.location.hash = '#/orders';
                        navigateToTab('store');
                      }}
                      className="w-full text-right p-2.5 rounded-xl hover:bg-stone-100 text-xs font-bold text-stone-700 flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <ShoppingBag className="w-4 h-4 text-primary" />
                      <span>طلباتي</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        window.location.hash = '#/bookings';
                        navigateToTab('pilgrim_journey');
                      }}
                      className="w-full text-right p-2.5 rounded-xl hover:bg-stone-100 text-xs font-bold text-stone-700 flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>حجوزاتي</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        setIsPackagesOpen(true);
                      }}
                      className="w-full text-right p-2.5 rounded-xl hover:bg-amber-50 text-amber-900 border border-amber-200/60 text-xs font-extrabold flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <Gift className="w-4 h-4 text-amber-600" />
                      <span>الباقات والعضويات 🎁</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsAccountMenuOpen(false);
                        setIsGlobalSupportOpen(true);
                      }}
                      className="w-full text-right p-2.5 rounded-xl hover:bg-stone-100 text-xs font-bold text-stone-700 flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span>التذاكر والدعم 💬</span>
                    </button>

                    <div className="border-t border-stone-100 pt-1 mt-1">
                      <button
                        onClick={() => {
                          setIsAccountMenuOpen(false);
                          handleLogout();
                        }}
                        className="w-full text-right p-2.5 rounded-xl hover:bg-rose-50 text-rose-700 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        <span>تسجيل الخروج</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Settings Gear Icon */}
            <div className="relative">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="bg-[#F5F4EE] hover:bg-[#DDE9E1] text-[#174F3E] border border-stone-200/80 p-2 rounded-2xl transition-all flex items-center justify-center cursor-pointer"
                title="إعدادات المنصة"
              >
                <Settings className={`w-4 h-4 text-[#174F3E] transition-transform duration-300 ${isSettingsOpen ? 'rotate-90' : ''}`} />
              </button>

              <AnimatePresence>
                {isSettingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-52 bg-white border border-stone-200 rounded-2xl shadow-xl p-3 z-50 text-[#19352D] text-right"
                  >
                    <div className="text-[10px] font-bold text-[#174F3E] uppercase tracking-wider mb-2 px-2 border-b border-stone-100 pb-1 flex items-center gap-1">
                      <Settings className="w-3 h-3 text-[#174F3E]" />
                      <span>إعدادات المنصة</span>
                    </div>

                    <button
                      onClick={() => {
                        toggleLanguage();
                        setIsSettingsOpen(false);
                      }}
                      className="w-full text-right flex items-center justify-between p-2 rounded-xl hover:bg-[#DDE9E1]/40 text-xs font-bold cursor-pointer mb-1"
                    >
                      <span className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#174F3E]" />
                        <span>لغة الواجهة</span>
                      </span>
                      <span className="bg-[#DDE9E1] text-[#174F3E] text-[10px] px-2 py-0.5 rounded-lg border border-[#174F3E]/20 font-black">
                        {lang === 'ar' ? 'English 🇬🇧' : 'العربية 🇸🇦'}
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Drawer Hamburger Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="lg:hidden bg-[#F5F4EE] hover:bg-[#DDE9E1] text-[#174F3E] border border-stone-200/80 p-2 rounded-2xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              id="top-drawer-hamburger-btn"
              title="القائمة الرئيسية ☰"
            >
              <Menu className="w-5 h-5 text-[#174F3E]" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Drawer Menu ☰ */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50"
            />

            {/* Slide-over Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 bottom-0 right-0 w-80 sm:w-96 bg-white z-50 shadow-2xl flex flex-col dir-rtl overflow-hidden"
              id="side-drawer-menu"
            >
              {/* Drawer Header */}
              <div className="bg-primary text-white p-5 flex items-center justify-between border-b border-accent/20">
                <div className="flex items-center gap-2.5">
                  {renderWarathLogo("w-10 h-10 text-lg")}
                  <div className="text-right">
                    <h3 className="font-black text-base leading-tight">إرث أجيال</h3>
                    <p className="text-[10px] text-accent font-light">دليل جميع أقسام المنصة 🌴</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-1 text-right divide-y divide-stone-100">
                <div className="space-y-2 pb-3">
                  <div className="flex items-center justify-between px-1">
                    <p className="text-[10px] font-bold text-accent bg-primary/90 px-3 py-1 rounded-lg">
                      📌 اختر بوابتك المستقلة
                    </p>
                    <button
                      onClick={() => {
                        setIsDrawerOpen(false);
                        setIsIdentityGateOpen(true);
                      }}
                      className="text-[11px] text-amber-700 font-bold hover:underline cursor-pointer"
                    >
                      شاشة الاختيار 🌟
                    </button>
                  </div>

                  {/* 1. بوابة رائدات العمل الحر */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setActiveTrack('family');
                      window.location.hash = '#/portal/families';
                      setCurrentPath('/portal/families');
                    }}
                    className="w-full text-right p-2.5 sm:p-3 rounded-2xl hover:bg-amber-50 text-stone-900 text-xs sm:text-sm font-black flex items-center justify-between group transition-all border-2 border-amber-300 bg-amber-50/60 shadow-xs cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg sm:text-xl shrink-0">👩‍🍳</span>
                      <div className="min-w-0">
                        <span className="block text-stone-900 font-black truncate text-xs sm:text-sm">بوابة رائدات العمل الحر</span>
                        <span className="text-[10px] text-stone-500 font-normal truncate block">التأهيل والتمكين والمتجر</span>
                      </div>
                    </div>
                    <span className="bg-[#174F3E] text-amber-300 text-[10px] font-black px-2 py-1 rounded-xl shrink-0 whitespace-nowrap">تبديل ⇄</span>
                  </button>

                  {/* 2. بوابة العميل الشاملة */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setActiveTrack('visitor');
                      window.location.hash = '#/portal/customer';
                      setCurrentPath('/portal/customer');
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-emerald-50 text-stone-900 text-xs md:text-sm font-black flex items-center justify-between group transition-all border-2 border-emerald-300/80 bg-emerald-50/50 shadow-xs cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🛍️</span>
                      <div>
                        <span className="block text-stone-900">بوابة العميل الشاملة</span>
                        <span className="text-[10px] text-stone-500 font-normal">المشتري • السائح • المعتمر</span>
                      </div>
                    </div>
                    <span className="bg-emerald-700 text-white text-[10px] font-black px-2 py-0.5 rounded-full">دخول ←</span>
                  </button>
                </div>

                <div className="space-y-1 pb-2 pt-2">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-3 mb-1">
                    أقسام تجربة العميل
                  </p>

                  {/* بوابة المعتمرين */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setCustomerInitialTab('pilgrim');
                      window.location.hash = '#/portal/customer';
                      setCurrentPath('/portal/customer');
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-amber-50 text-stone-900 text-xs md:text-sm font-black flex items-center justify-between group transition-all border border-amber-200/60 bg-amber-50/40 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Compass className="w-5 h-5 text-amber-800 group-hover:scale-110 transition-transform" />
                      <span>🕋 خدمات المعتمرين وزوار الحرمين</span>
                    </div>
                    <span className="bg-[#C8A96B] text-white text-[10px] font-black px-2 py-0.5 rounded-full">ضيافة الحرم</span>
                  </button>

                  {/* بوابة الزائر والسائح */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setCustomerInitialTab('visitor');
                      window.location.hash = '#/portal/customer';
                      setCurrentPath('/portal/customer');
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-blue-50 text-stone-900 text-xs md:text-sm font-black flex items-center justify-between group transition-all border border-blue-200/60 bg-blue-50/40 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-blue-700 group-hover:scale-110 transition-transform" />
                      <span>🕌 تجارب الزوار والسياح</span>
                    </div>
                    <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">تجارب حية</span>
                  </button>

                  {/* متجر المشتري */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setCustomerInitialTab('buyer');
                      window.location.hash = '#/portal/customer';
                      setCurrentPath('/portal/customer');
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-stone-100 text-stone-900 text-xs md:text-sm font-black flex items-center justify-between group transition-all border border-stone-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <span>🛒 متجر المأكولات والتسوق الفوري</span>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-stone-400" />
                  </button>
                </div>

                <div className="space-y-1 pb-2 pt-2">
                  {/* 1. الرئيسية */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      window.location.hash = '#/';
                      setCurrentPath('/');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-stone-100 text-stone-800 text-xs md:text-sm font-black flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Home className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <span>🏠 الصفحة الرئيسية للمنصة</span>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-stone-300 group-hover:text-primary" />
                  </button>

                  {/* 2. المتجر */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      window.location.hash = '#/store';
                      setCurrentPath('/store');
                      if (isLoggedIn) navigateToTab('store');
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-stone-100 text-stone-800 text-xs md:text-sm font-black flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <span>🛍️ المتجر</span>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">منتجات حصرية</span>
                  </button>

                  {/* 3. رحلتي الذكية */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      window.location.hash = '#/smart-journey';
                      setCurrentPath('/smart-journey');
                      if (isLoggedIn) navigateToTab('pilgrim_journey');
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-stone-100 text-stone-800 text-xs md:text-sm font-black flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <span>🧭 رحلتي الذكية</span>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-stone-300 group-hover:text-primary" />
                  </button>

                  {/* 4. الباقات والعضويات */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setIsPackagesOpen(true);
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-amber-50 text-amber-950 text-xs md:text-sm font-black flex items-center justify-between group transition-all border border-amber-200/60 my-1"
                  >
                    <div className="flex items-center gap-3">
                      <Gift className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                      <span>🎁 الباقات والعضويات</span>
                    </div>
                    <span className="bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">جديد 👑</span>
                  </button>

                  {/* 4.5 البرنامج التأهيلي واعتماد الضمان الذهبي */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      window.location.hash = '#/journey';
                      setCurrentPath('/journey');
                    }}
                    className="w-full text-right p-3 rounded-2xl bg-amber-50/80 hover:bg-amber-100/90 text-[#174F3E] text-xs md:text-sm font-black flex items-center justify-between group transition-all border border-amber-300 shadow-2xs my-1"
                  >
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-amber-700 group-hover:scale-110 transition-transform" />
                      <span>🏅 رحلة التأهيل والضمان الذهبي</span>
                    </div>
                    <span className="bg-[#174F3E] text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                      7 مراحل 🌟
                    </span>
                  </button>

                  {/* 5. الدعم الفني الذكي */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setIsGlobalSupportOpen(true);
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-amber-50 text-stone-900 text-xs md:text-sm font-black flex items-center justify-between group transition-all border border-amber-200/60 my-1"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-amber-700 group-hover:scale-110 transition-transform" />
                      <span>💬 الدعم الفني الذكي</span>
                    </div>
                    <span className="bg-[#C8A96B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">مباشر 🟢</span>
                  </button>
                </div>

                <div className="space-y-1 py-2">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-3 mb-1">خدمات التمكين والمشاريع</p>

                  {/* 6. رائدات ورواد العمل الحر والمشاريع الصغيرة */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      if (isLoggedIn) {
                        navigateToTab('profile');
                      } else {
                        window.location.hash = '#/login';
                        setCurrentPath('/login');
                      }
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-stone-100 text-stone-800 text-xs md:text-sm font-bold flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-stone-500" />
                      <span>👩‍🍳 رائدات ورواد العمل الحر والمشاريع الصغيرة</span>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-stone-300" />
                  </button>

                  {/* 7. التقييم الذكي */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      if (isLoggedIn) {
                        navigateToTab('evaluation');
                      } else {
                        window.location.hash = '#/login';
                        setCurrentPath('/login');
                      }
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-stone-100 text-stone-800 text-xs md:text-sm font-bold flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5 text-stone-500" />
                      <span>📊 التقييم الذكي</span>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-stone-300" />
                  </button>

                  {/* 8. التمويل والاستشارات */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      if (isLoggedIn) {
                        navigateToTab('growth');
                      } else {
                        window.location.hash = '#/login';
                        setCurrentPath('/login');
                      }
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-stone-100 text-stone-800 text-xs md:text-sm font-bold flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-stone-500" />
                      <span>💰 التمويل والاستشارات</span>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-stone-300" />
                  </button>

                  {/* 9. مبادرات إرث أجيال */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      window.dispatchEvent(new CustomEvent('trigger-initiatives-page'));
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-stone-100 text-stone-800 text-xs md:text-sm font-bold flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Landmark className="w-5 h-5 text-stone-500" />
                      <span>🏛️ مبادرات إرث أجيال</span>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-stone-300" />
                  </button>

                  {/* 10. قصتنا ورؤيتنا */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      if (isLoggedIn) navigateToTab('story');
                      else window.location.hash = '#/';
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-stone-100 text-stone-800 text-xs md:text-sm font-bold flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Compass className="w-5 h-5 text-stone-500" />
                      <span>📖 قصتنا ورؤيتنا</span>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-stone-300" />
                  </button>
                </div>

                <div className="space-y-1 py-2">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-3 mb-1">المساعدة والخدمات</p>

                  {/* 11. الأسئلة الشائعة */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      const faqEl = document.getElementById('faq-section');
                      if (faqEl) faqEl.scrollIntoView({ behavior: 'smooth' });
                      else alert('يمكنك التواصل مع الدعم الفني الذكي للحصول على إجابات فورية.');
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-stone-100 text-stone-800 text-xs md:text-sm font-bold flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-stone-500" />
                      <span>❓ الأسئلة الشائعة</span>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-stone-300" />
                  </button>

                  {/* 12. تتبع الطلبات */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      if (isLoggedIn) navigateToTab('store');
                      else alert('يرجى تسجيل الدخول لتتبع طلباتك وحجوزاتك.');
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-stone-100 text-stone-800 text-xs md:text-sm font-bold flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <PackageCheck className="w-5 h-5 text-stone-500" />
                      <span>📦 تتبع الطلبات</span>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-stone-300" />
                  </button>

                  {/* 13. الإشعارات */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      alert('لا توجد إشعارات جديدة حالياً.');
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-stone-100 text-stone-800 text-xs md:text-sm font-bold flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-stone-500" />
                      <span>🔔 الإشعارات</span>
                    </div>
                    <ChevronLeft className="w-4 h-4 text-stone-300" />
                  </button>

                  {/* 14. حسابي */}
                  <button
                    onClick={() => {
                      setIsDrawerOpen(false);
                      if (isLoggedIn) {
                        if (userRole === 'admin') {
                          window.location.hash = '#/admin';
                          setCurrentPath('/admin');
                        } else {
                          window.location.hash = '#/profile';
                          setCurrentPath('/profile');
                          navigateToTab('profile');
                        }
                      } else {
                        window.location.hash = '#/login';
                        setCurrentPath('/login');
                      }
                    }}
                    className="w-full text-right p-3 rounded-2xl hover:bg-primary/10 text-primary text-xs md:text-sm font-black flex items-center justify-between group transition-all border border-primary/20 my-1"
                  >
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <span>👤 حسابي</span>
                    </div>
                    <span className="text-[11px] font-bold text-primary">
                      {isLoggedIn ? profile.name : 'دخول'}
                    </span>
                  </button>

                  {/* 15. تسجيل الخروج (If Logged In) */}
                  {isLoggedIn && (
                    <button
                      onClick={() => {
                        setIsDrawerOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-right p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs md:text-sm font-bold flex items-center justify-between group transition-all border border-rose-200 mt-2"
                    >
                      <div className="flex items-center gap-3">
                        <LogOut className="w-5 h-5 text-rose-600" />
                        <span>🚪 تسجيل الخروج</span>
                      </div>
                      <ChevronLeft className="w-4 h-4 text-rose-400" />
                    </button>
                  )}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="bg-stone-50 p-4 border-t border-stone-200 text-center space-y-1">
                <p className="text-[11px] font-bold text-stone-700">منصة إرث أجيال × التفكير والنماء TND</p>
                <p className="text-[9px] text-stone-400 font-light">تمكين اقتصادي مستدام وتنمية التراث الأصيل</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Conditional Rendering: Independent Portals vs Landing Page vs Workspace */}
      {selectedProducerForView !== null || currentPath === '/producer' ? (
        <>
          <ProducerPublicProfile
            producer={selectedProducerForView || producers[0]}
            onBack={() => {
              setSelectedProducerForView(null);
              setCurrentPath('/');
              window.location.hash = '#/';
            }}
            renderWarathLogo={renderWarathLogo}
            renderThinkingLogo={renderThinkingLogo}
          />
          <ProducerRegistrationModal
            isOpen={isProducerRegisterOpen}
            onClose={() => setIsProducerRegisterOpen(false)}
            onRegisterSuccess={(newFamily) => {
              const updated = [newFamily, ...producers];
              setProducers(updated);
              localStorage.setItem('warath_producers', JSON.stringify(updated));
              setIsProducerRegisterOpen(false);
              alert('تم تقديم طلب تسجيل أسرتك بنجاح! سيتم مراجعة البيانات وتفعيل صفحتك وبادج الـ QR خلال 24 ساعة.');
            }}
          />
        </>
      ) : currentPath === '/portal/families' ? (
        <>
          <FamilyPortalPage
            producers={producers}
            onSelectProducer={(prod) => {
              setSelectedProducerForView(prod);
              window.location.hash = `#/producer/${prod.id}`;
            }}
            onOpenRegisterModal={() => setIsProducerRegisterOpen(true)}
            onNavigateHome={() => {
              setCurrentPath('/');
              window.location.hash = '#/';
            }}
            onNavigateLogin={() => {
              setCurrentPath('/login');
              window.location.hash = '#/login';
            }}
            renderWarathLogo={renderWarathLogo}
            renderThinkingLogo={renderThinkingLogo}
            onChangeTrack={() => setIsTrackSwitcherOpen(true)}
          />
          <ProducerRegistrationModal
            isOpen={isProducerRegisterOpen}
            onClose={() => setIsProducerRegisterOpen(false)}
            onRegisterSuccess={(newFamily) => {
              const updated = [newFamily, ...producers];
              setProducers(updated);
              localStorage.setItem('warath_producers', JSON.stringify(updated));
              setIsProducerRegisterOpen(false);
              alert('تم تقديم طلب تسجيل أسرتك بنجاح! سيتم مراجعة البيانات وتفعيل صفحتك وبادج الـ QR خلال 24 ساعة.');
            }}
          />
        </>
      ) : currentPath === '/portal/customer' ? (
        <CustomerPortalPage
          initialTab={customerInitialTab}
          producers={producers}
          onSelectProducer={(prod) => {
            setSelectedProducerForView(prod);
            window.location.hash = `#/producer/${prod.id}`;
          }}
          onNavigateHome={() => {
            setCurrentPath('/');
            window.location.hash = '#/';
          }}
          onNavigateLogin={() => {
            setCurrentPath('/login');
            window.location.hash = '#/login';
          }}
          onSwitchToFamilyPortal={() => {
            setActiveTrack('family');
            setCurrentPath('/portal/families');
            window.location.hash = '#/portal/families';
          }}
          renderWarathLogo={renderWarathLogo}
          renderThinkingLogo={renderThinkingLogo}
        />
      ) : currentPath === '/portal/pilgrims' ? (
        <PilgrimPortalPage
          producers={producers}
          onSelectProducer={(prod) => {
            setSelectedProducerForView(prod);
            window.location.hash = `#/producer/${prod.id}`;
          }}
          onNavigateHome={() => {
            setCurrentPath('/');
            window.location.hash = '#/';
          }}
          onNavigateLogin={() => {
            setCurrentPath('/login');
            window.location.hash = '#/login';
          }}
          renderWarathLogo={renderWarathLogo}
          renderThinkingLogo={renderThinkingLogo}
          onChangeTrack={() => setIsTrackSwitcherOpen(true)}
        />
      ) : currentPath === '/portal/visitors' ? (
        <VisitorPortalPage
          producers={producers}
          onSelectProducer={(prod) => {
            setSelectedProducerForView(prod);
            window.location.hash = `#/producer/${prod.id}`;
          }}
          onNavigateHome={() => {
            setCurrentPath('/');
            window.location.hash = '#/';
          }}
          onNavigateLogin={() => {
            setCurrentPath('/login');
            window.location.hash = '#/login';
          }}
          renderWarathLogo={renderWarathLogo}
          renderThinkingLogo={renderThinkingLogo}
          onChangeTrack={() => setIsTrackSwitcherOpen(true)}
        />
      ) : currentPath === '/portal/partners' ? (
        <PartnerPortalPage
          onNavigateHome={() => {
            setCurrentPath('/');
            window.location.hash = '#/';
          }}
          onNavigateLogin={() => {
            setCurrentPath('/login');
            window.location.hash = '#/login';
          }}
          renderWarathLogo={renderWarathLogo}
          renderThinkingLogo={renderThinkingLogo}
          onChangeTrack={() => setIsTrackSwitcherOpen(true)}
        />
      ) : currentPath === '/portal/buyers' ? (
        <BuyerPortalPage
          producers={producers}
          onSelectProducer={(prod) => {
            setSelectedProducerForView(prod);
            window.location.hash = `#/producer/${prod.id}`;
          }}
          onNavigateHome={() => {
            setCurrentPath('/');
            window.location.hash = '#/';
          }}
          onNavigateLogin={() => {
            setCurrentPath('/login');
            window.location.hash = '#/login';
          }}
          renderWarathLogo={renderWarathLogo}
          renderThinkingLogo={renderThinkingLogo}
        />
      ) : currentPath === '/journey' || currentPath === '/qualification' ? (
        <QualificationJourneyPage
          onBackHome={() => {
            setCurrentPath('/');
            window.location.hash = '#/';
          }}
        />
      ) : !isLoggedIn ? (
        <LandingPage 
          onLogin={handleLogin} 
          warathLogo={warathLogo} 
          thinkingLogo={thinkingLogo} 
          activeTheme={activeTheme}
          lang={lang}
          onToggleLanguage={toggleLanguage}
          onSelectTrack={handleSelectTrack}
        />
      ) : (
        <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8" id="workspace-container">
          
          {/* Left Sidebar Navigation Menu (Desktop) */}
          {(userRole === 'beneficiary' || userRole === 'pilgrim' || userRole === 'visitor') && (
            <aside className="hidden lg:block lg:w-72 flex-shrink-0 space-y-4" id="desktop-sidebar-nav">
            <div className="bg-white border border-stone-200 rounded-3xl p-5 shadow-sm sticky top-28 space-y-4">
              <div className="border-b border-stone-100 pb-3">
                <h4 className="font-bold text-stone-400 text-[10px] uppercase tracking-wider">
                  {userRole === 'beneficiary' ? 'رحلة التمكين المستدام' : 'دليل ضيوف الرحمن والزوار'}
                </h4>
                <p className="text-darktext text-xs font-bold mt-1">
                  {userRole === 'beneficiary' ? 'تتبع خطوات تأهيل مشروعك:' : 'تصفح بوابات الضيافة التراثية:'}
                </p>
              </div>

              <div className="space-y-1.5">
                {filteredTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => navigateToTab(tab.id)}
                      className={`w-full text-right px-4 py-3 rounded-2xl flex items-center gap-3.5 transition-all group ${
                        isActive
                           ? 'bg-primary text-accent font-bold shadow-md'
                           : 'text-stone-600 hover:bg-bgwarm hover:text-primary'
                      }`}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-accent' : 'text-stone-400 group-hover:text-stone-600'}`} />
                      <div className="min-w-0">
                        <span className="text-xs md:text-sm block">{tab.label}</span>
                        <span className={`text-[10px] font-light block ${isActive ? 'text-stone-200' : 'text-stone-400'}`}>{tab.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Progress Box / Loyalty points in Sidebar */}
              {userRole === 'beneficiary' ? (
                <div className="bg-bgwarm p-4 rounded-2xl border border-stone-100 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-stone-600">
                    <span>نسبة جاهزية التمويل:</span>
                    <span className="font-mono text-primary">{dynamicReadinessScore}%</span>
                  </div>
                  <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-full transition-all duration-500" style={{ width: `${dynamicReadinessScore}%` }}></div>
                  </div>
                  <p className="text-[9px] text-stone-400 leading-relaxed font-light">
                    أكمل إضافة المنتجات، والتقييم، وحضور الدروس لتصل إلى الجاهزية الكاملة وتفتح أبواب الشراكات الاستثمارية.
                  </p>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-primary to-[#0A4B27] text-white p-4 rounded-2xl space-y-3.5 shadow-xs text-right">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] bg-accent/20 text-accent font-bold px-2 py-0.5 rounded-full">المروّج التراثي 🛡️</span>
                    <span className="text-[9px] font-mono text-accent">1,420 نقطة</span>
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-bold text-[11px]">مستكشف مكة والمدينة التراثي</h5>
                    <p className="text-[9px] text-stone-200 font-light leading-relaxed">
                      طلباتك المباشرة تمكن عوائلنا المنتجة وتصنع أثراً حقيقياً في حماية هوية وثقافة ضيافة ضيوف الرحمن.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Mobile menu panel overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (userRole === 'beneficiary' || userRole === 'pilgrim' || userRole === 'visitor') && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden bg-white border-b border-stone-200 p-5 space-y-4 shadow-md absolute top-20 left-0 right-0 z-40"
              id="mobile-navigation-overlay"
            >
              <div className="space-y-1.5">
                {filteredTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        navigateToTab(tab.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-right p-3.5 rounded-xl flex items-center gap-3 transition-all ${
                        isActive
                          ? 'bg-primary text-accent font-bold'
                          : 'text-stone-600 hover:bg-bgwarm hover:text-primary'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-stone-400" />
                      <span className="text-xs md:text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary Content Render Workspace */}
        <main className="flex-grow min-w-0" id="primary-content-viewport">
          <AnimatePresence mode="wait">
            <motion.div
              key={userRole === 'admin' ? 'admin' : activeTab}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {userRole === 'admin' ? (
                /* RENDER ADMINISTRATOR PANEL */
                <AdminPanel
                  profile={profile}
                  courses={courses}
                  assessment={assessment}
                  onApproveProject={handleAdminApproveProject}
                  warathLogo={warathLogo}
                  setWarathLogo={setWarathLogo}
                  thinkingLogo={thinkingLogo}
                  setThinkingLogo={setThinkingLogo}
                  activeTheme={activeTheme}
                  setActiveTheme={setActiveTheme}
                  mainPrimaryColor={mainPrimaryColor}
                  setMainPrimaryColor={setMainPrimaryColor}
                />
              ) : (
                /* RENDER CURRENT TAB COMPONENT */
                <div className="space-y-4">
                  {/* High-Fidelity Back Arrow Navigation (Scroll Restoration included) */}
                  {navHistory.length > 1 && (
                    <div 
                      className="mb-4 flex justify-between items-center bg-white border border-stone-200 p-4 rounded-2xl shadow-xs transition-all hover:shadow-sm" 
                      id="back-navigation-banner"
                    >
                      <button
                        type="button"
                        onClick={navigateBack}
                        className="flex items-center gap-2 text-xs font-black text-stone-600 hover:text-primary transition-all cursor-pointer group"
                        id="back-btn-action"
                      >
                        <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-0.5 transition-transform" />
                        <span>العودة للشاشة السابقة</span>
                      </button>
                      <div className="text-left flex items-center gap-1.5 text-[10px]">
                        <span className="text-stone-400 font-light">مسار التنقل:</span>
                        <span className="bg-primary/5 text-primary border border-primary/10 px-2.5 py-0.5 rounded-full font-bold">
                          {tabs.find(t => t.id === activeTab)?.label || activeTab}
                        </span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'story' && (
                    <StoryLens
                      challenges={INITIAL_CHALLENGES}
                      onStartJourney={() => navigateToTab('profile')}
                    />
                  )}
                  
                  {activeTab === 'profile' && (
                    <ProfileForm
                      profile={profile}
                      userRole={userRole}
                      onSave={(updatedProfile) => {
                        setProfile(updatedProfile);
                        navigateToTab('evaluation');
                      }}
                    />
                  )}
                  
                  {activeTab === 'evaluation' && (
                    <SmartEvaluation
                      profile={profile}
                      assessment={assessment}
                      onSaveAssessment={(updatedAssessment) => setAssessment(updatedAssessment)}
                    />
                  )}
                  
                  {activeTab === 'training' && (
                    <TrainingHub
                      profile={profile}
                      courses={courses}
                      onUpdateCourses={(updatedCourses) => setCourses(updatedCourses)}
                    />
                  )}
                  
                  {activeTab === 'store' && (
                    <StoreManager
                      profile={profile}
                      subscription={subscription}
                      onUpdateSubscription={(updatedSub) => setSubscription(updatedSub)}
                    />
                  )}

                  {activeTab === 'pilgrim_journey' && (
                    <SmartJourney
                      profile={profile}
                      subscription={subscription}
                      onUpdateSubscription={(updatedSub) => setSubscription(updatedSub)}
                    />
                  )}
                  
                  {activeTab === 'growth' && (
                    <GrowthTracker
                      profile={profile}
                      courses={courses}
                      assessment={assessment}
                    />
                  )}
                  
                  {activeTab === 'impact' && (
                    <ImpactScreen
                      stats={INITIAL_STATS}
                      challenges={INITIAL_CHALLENGES}
                    />
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
      )}

      {/* Single Global Platform Footer */}
      <Footer />

      {/* Dynamic Bottom Navigation Bar (Sleek Mobile Bottom Nav) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-stone-200/80 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] py-3 px-4 flex justify-around items-center lg:hidden z-50">
        {/* Tab 1: الرئيسية */}
        <button
          onClick={() => {
            if (!isLoggedIn) {
              window.location.hash = '';
              window.dispatchEvent(new CustomEvent('trigger-home-page'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigateToTab('story');
            }
          }}
          className={`flex flex-col items-center justify-center transition-all gap-1 cursor-pointer hover:scale-105 ${
            (!isLoggedIn || activeTab === 'story')
              ? 'text-primary font-black scale-102'
              : 'text-stone-400 hover:text-stone-600'
          }`}
          id="mobile-nav-home"
        >
          <Compass className={`w-5.5 h-5.5 ${(!isLoggedIn || activeTab === 'story') ? 'text-primary' : 'text-stone-400'}`} />
          <span className="text-[10px] font-bold tracking-tight">الرئيسية</span>
        </button>

        {/* Tab 2: المتجر */}
        <button
          onClick={() => {
            if (!isLoggedIn) {
              window.location.hash = '#store';
              window.dispatchEvent(new CustomEvent('trigger-store-page'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              navigateToTab('store');
            }
          }}
          className={`flex flex-col items-center justify-center transition-all gap-1 cursor-pointer hover:scale-105 ${
            (isLoggedIn && activeTab === 'store')
              ? 'text-primary font-black scale-102'
              : 'text-stone-400 hover:text-stone-600'
          }`}
          id="mobile-nav-store"
        >
          <ShoppingBag className={`w-5.5 h-5.5 ${(isLoggedIn && activeTab === 'store') ? 'text-primary' : 'text-stone-400'}`} />
          <span className="text-[10px] font-bold tracking-tight">المتجر</span>
        </button>

        {/* Tab 3: رحلتي الذكية */}
        <button
          onClick={() => {
            if (!isLoggedIn) {
              const el = document.getElementById('pathway-selection');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            } else {
              if (userRole === 'beneficiary') {
                navigateToTab('training');
              } else {
                navigateToTab('pilgrim_journey');
              }
            }
          }}
          className={`flex flex-col items-center justify-center transition-all gap-1 cursor-pointer hover:scale-105 ${
            (isLoggedIn && (activeTab === 'pilgrim_journey' || activeTab === 'training'))
              ? 'text-primary font-black scale-102'
              : 'text-stone-400 hover:text-stone-600'
          }`}
          id="mobile-nav-journey"
        >
          <Calendar className={`w-5.5 h-5.5 ${(isLoggedIn && (activeTab === 'pilgrim_journey' || activeTab === 'training')) ? 'text-primary' : 'text-stone-400'}`} />
          <span className="text-[10px] font-bold tracking-tight">رحلتي الذكية</span>
        </button>

        {/* Tab 4: الباقات 🎁 */}
        <button
          onClick={() => {
            setIsPackagesOpen(true);
          }}
          className={`flex flex-col items-center justify-center transition-all gap-1 cursor-pointer hover:scale-105 ${
            isPackagesOpen
              ? 'text-amber-600 font-black scale-102'
              : 'text-stone-400 hover:text-stone-600'
          }`}
          id="mobile-nav-packages"
        >
          <Gift className={`w-5.5 h-5.5 ${isPackagesOpen ? 'text-amber-600' : 'text-stone-400'}`} />
          <span className="text-[10px] font-bold tracking-tight">الباقات 🎁</span>
        </button>

        {/* Tab 5: الدعم الفني الذكي */}
        <button
          onClick={() => {
            setIsGlobalSupportOpen(true);
          }}
          className={`flex flex-col items-center justify-center transition-all gap-1 cursor-pointer hover:scale-105 ${
            isGlobalSupportOpen
              ? 'text-primary font-black scale-102'
              : 'text-stone-400 hover:text-stone-600'
          }`}
          id="mobile-nav-support"
        >
          <MessageSquare className={`w-5.5 h-5.5 ${isGlobalSupportOpen ? 'text-primary' : 'text-stone-400'}`} />
          <span className="text-[10px] font-bold tracking-tight">الدعم الفني الذكي</span>
        </button>
      </div>

      {/* Floating Smart Technical Support Assistant Button (Always accessible) */}
      <div className="fixed bottom-20 sm:bottom-6 left-4 z-40">
        <button
          type="button"
          onClick={() => setIsGlobalSupportOpen(true)}
          className="bg-[#174F3E] hover:bg-[#174F3E]/95 text-white p-3.5 sm:px-5 sm:py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer border border-white/20 group"
          id="floating-smart-support-btn"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
          </div>
          <div className="hidden sm:block text-right">
            <span className="block font-black text-xs text-white">الدعم الفني الذكي 💬</span>
            <span className="block text-[9px] text-accent/90 font-light">مساعد تفاعلي فوري</span>
          </div>
        </button>
      </div>

      {/* Smart Support Modal */}
      {isGlobalSupportOpen && (
        <SmartSupportModal 
          onClose={() => {
            setIsGlobalSupportOpen(false);
          }}
          lang={lang}
        />
      )}

      {/* Track Switcher Modal */}
      <TrackSwitcherModal
        isOpen={isTrackSwitcherOpen}
        onClose={() => setIsTrackSwitcherOpen(false)}
        activeTrack={activeTrack}
        onSelectTrack={handleSelectTrack}
      />

      {/* Entry Identity Gate Modal (أسر منتجة أو عميل) */}
      <EntryIdentityGateModal
        isOpen={isIdentityGateOpen}
        onClose={() => setIsIdentityGateOpen(false)}
        onSelectRole={handleIdentitySelectRole}
      />

      {/* Packages Modal */}
      {isPackagesOpen && (
        <PackagesModal
          activeTrack={activeTrack}
          onClose={() => {
            setIsPackagesOpen(false);
          }}
        />
      )}

    </div>
  );
}
