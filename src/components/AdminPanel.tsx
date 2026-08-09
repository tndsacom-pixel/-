import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Landmark, 
  Users, 
  CheckSquare, 
  Award, 
  AlertCircle, 
  Search, 
  Eye, 
  Filter, 
  Sparkles, 
  FolderUp, 
  CheckCircle2, 
  Settings, 
  Image, 
  Palette, 
  RefreshCw,
  Headphones,
  MessageSquare,
  ShoppingBag,
  Plus,
  Activity,
  Mail,
  Phone,
  Globe,
  FileText,
  MapPin,
  Trash2,
  Server,
  Cpu,
  Gift,
  Edit3,
  EyeOff,
  Star,
  Zap,
  Check,
  X,
  PlusCircle
} from 'lucide-react';
import { BeneficiaryProfile, Course, Assessment } from '../types';
import SystemInfrastructurePanel from './SystemInfrastructurePanel';
import { ExtendedPackageItem, getStoredPackages, saveStoredPackages, INITIAL_DYNAMIC_PACKAGES } from '../packagesData';
import { getEmailLogs, getUserAccounts, updateUserAccountEmail } from '../services/emailService';
import { EmailLog, UserAccount, Product } from '../types';
import { getAllProducts, updateProductStatus } from '../services/productService';
import { SUGGESTIONS_LOGIN, SUGGESTIONS_FEATURES } from './LandingPage';

interface AdminPanelProps {
  profile: BeneficiaryProfile;
  courses: Course[];
  assessment: Assessment | null;
  onApproveProject: () => void;
  warathLogo: string;
  setWarathLogo: (val: string) => void;
  thinkingLogo: string;
  setThinkingLogo: (val: string) => void;
  activeTheme: string;
  setActiveTheme: (val: string) => void;
  mainPrimaryColor?: string;
  setMainPrimaryColor?: (val: string) => void;
}

export default function AdminPanel({ 
  profile, 
  courses, 
  assessment, 
  onApproveProject,
  warathLogo,
  setWarathLogo,
  thinkingLogo,
  setThinkingLogo,
  activeTheme,
  setActiveTheme,
  mainPrimaryColor = '#B49A5A',
  setMainPrimaryColor
}: AdminPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDomain, setFilterDomain] = useState('all');

  // Subtab for Admin Panel sections
  const [adminSubTab, setAdminSubTab] = useState<'families' | 'product_requests' | 'pilgrims' | 'tourists' | 'orders' | 'tickets' | 'packages' | 'branding' | 'infra' | 'emails' | 'testing_center'>('families');

  // 🛍️ Product Approval Management State
  const [adminProducts, setAdminProducts] = useState<Product[]>(() => getAllProducts());
  const [prodStatusFilter, setProdStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'needs_modification'>('all');
  const [prodSearch, setProdSearch] = useState('');
  
  // Modal for Product Rejection / Modification Notes
  const [selectedProdForAction, setSelectedProdForAction] = useState<Product | null>(null);
  const [actionType, setActionType] = useState<'reject' | 'modify' | null>(null);
  const [actionNotes, setActionNotes] = useState('');
  const [adminProdSuccessMsg, setAdminProdSuccessMsg] = useState('');

  const refreshProductsList = () => {
    setAdminProducts(getAllProducts());
  };

  useEffect(() => {
    refreshProductsList();
    window.addEventListener('warath_products_updated', refreshProductsList);
    return () => window.removeEventListener('warath_products_updated', refreshProductsList);
  }, []);

  const handleApproveProdDirect = (prodId: string) => {
    const updated = updateProductStatus(prodId, 'approved');
    if (updated) {
      setAdminProdSuccessMsg(`تم اعتماد المنتج (${updated.name}) بنجاح! وظهر الآن في المتجر العام.`);
      refreshProductsList();
      setTimeout(() => setAdminProdSuccessMsg(''), 4000);
    }
  };

  const handleConfirmProdAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProdForAction || !actionType) return;
    if (!actionNotes.trim()) {
      alert('الرجاء كتابة سبب الرفض أو ملاحظات التعديل.');
      return;
    }

    const targetStatus = actionType === 'reject' ? 'rejected' : 'needs_modification';
    const updated = updateProductStatus(selectedProdForAction.id, targetStatus, actionNotes.trim());
    if (updated) {
      setAdminProdSuccessMsg(
        actionType === 'reject' 
          ? `تم رفض المنتج (${updated.name}) وإرسال سبب الرفض إلى الأسرة.`
          : `تم طلب تعديل المنتج (${updated.name}) وإرسال الملاحظات إلى الأسرة.`
      );
      setSelectedProdForAction(null);
      setActionType(null);
      setActionNotes('');
      refreshProductsList();
      setTimeout(() => setAdminProdSuccessMsg(''), 4000);
    }
  };

  // 📧 Email System & User Accounts State (Section 10)
  const [adminUserAccounts, setAdminUserAccounts] = useState<UserAccount[]>(() => getUserAccounts());
  const [adminEmailLogs, setAdminEmailLogs] = useState<EmailLog[]>(() => getEmailLogs());
  const [editingUserAccount, setEditingUserAccount] = useState<UserAccount | null>(null);
  const [editingNewEmail, setEditingNewEmail] = useState('');
  const [adminEmailMsg, setAdminEmailMsg] = useState('');

  // Refresh email logs & accounts
  const refreshEmailSystemData = () => {
    setAdminUserAccounts(getUserAccounts());
    setAdminEmailLogs(getEmailLogs());
  };

  useEffect(() => {
    refreshEmailSystemData();
    window.addEventListener('warath_email_sent', refreshEmailSystemData);
    return () => window.removeEventListener('warath_email_sent', refreshEmailSystemData);
  }, []);

  const handleAdminUpdateUserEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUserAccount || !editingNewEmail.trim()) return;

    const updated = updateUserAccountEmail(editingUserAccount.id, editingNewEmail.trim());
    if (updated) {
      setAdminEmailMsg(`تم تعديل بريد المستخدم (${editingUserAccount.name || editingUserAccount.username}) إداريًا بنجاح.`);
      setEditingUserAccount(null);
      setEditingNewEmail('');
      refreshEmailSystemData();
      setTimeout(() => setAdminEmailMsg(''), 4000);
    } else {
      alert('حدث خطأ أثناء تعديل البريد.');
    }
  };

  // 🎁 Package Management State & Dynamic CRUD
  const [packagesList, setPackagesList] = useState<ExtendedPackageItem[]>(() => getStoredPackages());
  const [pkgCategoryFilter, setPkgCategoryFilter] = useState<'all' | 'productive_family' | 'pilgrim' | 'visitor' | 'individual'>('all');
  const [pkgSearchTerm, setPkgSearchTerm] = useState('');

  // Package Edit/Create Modal State
  const [isPkgModalOpen, setIsPkgModalOpen] = useState(false);
  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);

  // Package Form Fields
  const [pkgFormCategoryId, setPkgFormCategoryId] = useState<'productive_family' | 'pilgrim' | 'visitor' | 'individual'>('productive_family');
  const [pkgFormName, setPkgFormName] = useState('');
  const [pkgFormBadge, setPkgFormBadge] = useState('');
  const [pkgFormShortDesc, setPkgFormShortDesc] = useState('');
  const [pkgFormPrice, setPkgFormPrice] = useState('');
  const [pkgFormPeriod, setPkgFormPeriod] = useState('');
  const [pkgFormStatus, setPkgFormStatus] = useState<'active' | 'hidden'>('active');
  const [pkgFormIsPopular, setPkgFormIsPopular] = useState(false);
  const [pkgFormFeatures, setPkgFormFeatures] = useState('');
  const [pkgFormDetailedDesc, setPkgFormDetailedDesc] = useState('');
  const [pkgFormServices, setPkgFormServices] = useState('');
  const [pkgFormTerms, setPkgFormTerms] = useState('');

  // Synchronize packages state across windows/modals
  useEffect(() => {
    const handlePackagesUpdate = () => {
      setPackagesList(getStoredPackages());
    };
    window.addEventListener('warth-packages-updated', handlePackagesUpdate);
    return () => window.removeEventListener('warth-packages-updated', handlePackagesUpdate);
  }, []);

  const handleOpenCreatePkg = () => {
    setEditingPkgId(null);
    setPkgFormCategoryId('productive_family');
    setPkgFormName('');
    setPkgFormBadge('');
    setPkgFormShortDesc('');
    setPkgFormPrice('');
    setPkgFormPeriod('');
    setPkgFormStatus('active');
    setPkgFormIsPopular(false);
    setPkgFormFeatures('');
    setPkgFormDetailedDesc('');
    setPkgFormServices('');
    setPkgFormTerms('');
    setIsPkgModalOpen(true);
  };

  const handleOpenEditPkg = (pkg: ExtendedPackageItem) => {
    setEditingPkgId(pkg.id);
    setPkgFormCategoryId(pkg.categoryId);
    setPkgFormName(pkg.name);
    setPkgFormBadge(pkg.badge || '');
    setPkgFormShortDesc(pkg.shortDescription || '');
    setPkgFormPrice(pkg.price || '');
    setPkgFormPeriod(pkg.period || '');
    setPkgFormStatus(pkg.status || 'active');
    setPkgFormIsPopular(!!pkg.isPopular);
    setPkgFormFeatures((pkg.features || []).join('\n'));
    setPkgFormDetailedDesc(pkg.detailedDescription || '');
    setPkgFormServices((pkg.includedServices || []).join('\n'));
    setPkgFormTerms((pkg.termsAndConditions || []).join('\n'));
    setIsPkgModalOpen(true);
  };

  const handleSavePackageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkgFormName.trim()) return;

    const parseLines = (text: string) => text.split('\n').map(s => s.trim()).filter(Boolean);

    const updatedPkg: ExtendedPackageItem = {
      id: editingPkgId || `pkg_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      categoryId: pkgFormCategoryId,
      name: pkgFormName.trim(),
      badge: pkgFormBadge.trim() || undefined,
      shortDescription: pkgFormShortDesc.trim() || 'لا يوجد وصف مختصر',
      price: pkgFormPrice.trim() || 'مجاناً',
      period: pkgFormPeriod.trim() || 'دائم',
      status: pkgFormStatus,
      isPopular: pkgFormIsPopular,
      features: parseLines(pkgFormFeatures).length ? parseLines(pkgFormFeatures) : ['خدمة متميزة معتمدة'],
      detailedDescription: pkgFormDetailedDesc.trim() || pkgFormShortDesc.trim() || 'وصف تفصيلي شامل للباقة',
      includedServices: parseLines(pkgFormServices).length ? parseLines(pkgFormServices) : ['خدمة وتوصيل مباشر'],
      termsAndConditions: parseLines(pkgFormTerms)
    };

    let nextList: ExtendedPackageItem[];
    if (editingPkgId) {
      nextList = packagesList.map(p => p.id === editingPkgId ? updatedPkg : p);
    } else {
      nextList = [updatedPkg, ...packagesList];
    }

    saveStoredPackages(nextList);
    setPackagesList(nextList);
    setIsPkgModalOpen(false);
  };

  const handleTogglePkgStatus = (pkgId: string) => {
    const nextList = packagesList.map(p => {
      if (p.id === pkgId) {
        return {
          ...p,
          status: (p.status === 'hidden' ? 'active' : 'hidden') as 'active' | 'hidden'
        };
      }
      return p;
    });
    saveStoredPackages(nextList);
    setPackagesList(nextList);
  };

  const handleDeletePkg = (pkgId: string) => {
    if (window.confirm('هل أنت تأكد من رغبتك في حذف هذه الباقة نهائياً؟')) {
      const nextList = packagesList.filter(p => p.id !== pkgId);
      saveStoredPackages(nextList);
      setPackagesList(nextList);
    }
  };

  const handleResetPkgsDefault = () => {
    if (window.confirm('هل تريد استعادة قائمة الباقات الافتراضية كاملة؟ سيتم استرجاع جميع الباقات الأربع للفئات الرئيسية.')) {
      saveStoredPackages(INITIAL_DYNAMIC_PACKAGES);
      setPackagesList(INITIAL_DYNAMIC_PACKAGES);
    }
  };

  // Direct Orders and Support Tickets loaded from localStorage
  const [orders, setOrders] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);

  // Expanded ticket details & reply text
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [ticketReplyText, setTicketReplyText] = useState('');

  // Manually add new ticket form states
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [newTicketName, setNewTicketName] = useState('');
  const [newTicketPhone, setNewTicketPhone] = useState('');
  const [newTicketEmail, setNewTicketEmail] = useState('');
  const [newTicketMessage, setNewTicketMessage] = useState('');
  const [newTicketError, setNewTicketError] = useState('');
  const [newTicketSuccess, setNewTicketSuccess] = useState(false);

  // Load and synchronize direct orders & support tickets
  useEffect(() => {
    const loadWarthData = () => {
      try {
        const storedOrders = localStorage.getItem('warth_orders');
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders));
        } else {
          // Pre-populate high-quality realistic seed orders so the list starts beautifully
          const defaultOrders = [
            {
              id: 'INV-726190',
              productName: 'بخور دوسري ملكي فاخر',
              productPrice: 120,
              family: 'أم فواز (عطور الهيل)',
              buyerName: 'عبدالرحمن الشهري',
              buyerPhone: '0505123456',
              deliveryAddress: 'فندق حياة ريجنسي جبل عمر، مكة المكرمة',
              quantity: 2,
              paymentMethod: 'مدى',
              totalAmount: 255,
              date: new Date().toLocaleDateString('ar-SA'),
              status: 'new'
            },
            {
              id: 'INV-183620',
              productName: 'حقيبة سدو تراثية منسوجة يدوياً',
              productPrice: 250,
              family: 'فاطمة الحربي (سدو القصيم)',
              buyerName: 'جون دو (سائح كندي)',
              buyerPhone: '0501112222',
              deliveryAddress: 'فندق فيرمونت برج الساعة، غرفة 1502',
              quantity: 1,
              paymentMethod: 'Apple Pay',
              totalAmount: 265,
              date: new Date().toLocaleDateString('ar-SA'),
              status: 'completed'
            }
          ];
          localStorage.setItem('warth_orders', JSON.stringify(defaultOrders));
          setOrders(defaultOrders);
        }

        const storedTickets = localStorage.getItem('warth_support_tickets');
        if (storedTickets) {
          setTickets(JSON.parse(storedTickets));
        } else {
          // Pre-populate beautiful seed support tickets
          const defaultTickets = [
            {
              id: 'ST-921827',
              message: 'أواجه مشكلة في مطابقة الجدوى المالية لمشروعي لدى بنك التنمية الاجتماعية، هل يمكن لمرشد ورث أجيال مراجعة دراسة الجدوى وتصحيحها؟',
              name: 'منيرة العبدالله (عطور الهيل)',
              phone: '0501234567',
              email: 'om-fawaz@example.com',
              date: '2026-06-23',
              status: 'pending',
              reply: ''
            },
            {
              id: 'ST-482910',
              message: 'أنا منظم وفود معتمرين وسياح من ماليزيا، هل تدعم منصتكم تقديم الوجبات التراثية الصحية لمرضى السكري الخالية من الغلوتين؟',
              name: 'يوسف رزاق (مترجم وفود)',
              phone: '0509876543',
              email: 'youssef@malay-hajj.org',
              date: '2026-06-24',
              status: 'resolved',
              reply: 'نعم بالتأكيد! تدعم بوابة التغذية الذكية للأسر المنتجة تصفية المأكولات حسب مسببات الحساسية لضمان سلامة ضيوف الرحمن.'
            }
          ];
          localStorage.setItem('warth_support_tickets', JSON.stringify(defaultTickets));
          setTickets(defaultTickets);
        }
      } catch (e) {
        console.error('Error loading data from localStorage', e);
      }
    };

    loadWarthData();

    // Listen to local changes
    window.addEventListener('warth-support-updated', loadWarthData);
    return () => {
      window.removeEventListener('warth-support-updated', loadWarthData);
    };
  }, []);

  // Save support tickets helper
  const saveTicketsLocal = (updatedTickets: any[]) => {
    setTickets(updatedTickets);
    localStorage.setItem('warth_support_tickets', JSON.stringify(updatedTickets));
    // Trigger event to keep landing page or other panels synced
    window.dispatchEvent(new Event('warth-support-updated'));
  };

  // Save orders helper
  const saveOrdersLocal = (updatedOrders: any[]) => {
    setOrders(updatedOrders);
    localStorage.setItem('warth_orders', JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event('warth-orders-updated'));
  };

  // Submit manual support ticket
  const handleAddManualTicket = () => {
    if (!newTicketName || !newTicketPhone || !newTicketMessage) {
      setNewTicketError('الرجاء ملء الاسم والجوال ونص المشكلة الأساسي.');
      return;
    }
    setNewTicketError('');

    const newTicket = {
      id: 'ST-' + Math.floor(100000 + Math.random() * 900000),
      name: newTicketName,
      phone: newTicketPhone,
      email: newTicketEmail || 'غير محدد',
      message: newTicketMessage,
      date: new Date().toLocaleDateString('ar-SA'),
      status: 'pending',
      reply: ''
    };

    const updated = [newTicket, ...tickets];
    saveTicketsLocal(updated);

    // Reset Form
    setNewTicketName('');
    setNewTicketPhone('');
    setNewTicketEmail('');
    setNewTicketMessage('');
    setNewTicketSuccess(true);
    setTimeout(() => {
      setNewTicketSuccess(false);
      setShowNewTicketForm(false);
    }, 2000);
  };

  // Handle support ticket reply submission
  const handleSendReply = (ticketId: string) => {
    if (!ticketReplyText.trim()) return;

    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          reply: ticketReplyText,
          status: 'resolved'
        };
      }
      return t;
    });

    saveTicketsLocal(updated);
    setTicketReplyText('');
    setActiveTicketId(null);
  };

  // Delete support ticket
  const handleDeleteTicket = (ticketId: string) => {
    const updated = tickets.filter(t => t.id !== ticketId);
    saveTicketsLocal(updated);
    if (activeTicketId === ticketId) {
      setActiveTicketId(null);
    }
  };

  // Toggle order status
  const handleToggleOrderStatus = (orderId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'new' ? 'processing' : currentStatus === 'processing' ? 'completed' : 'new';
    const updated = orders.map(o => {
      if (o.id === orderId) {
        return { ...o, status: nextStatus };
      }
      return o;
    });
    saveOrdersLocal(updated);
  };

  // Delete direct order
  const handleDeleteOrder = (orderId: string) => {
    const updated = orders.filter(o => o.id !== orderId);
    saveOrdersLocal(updated);
  };

  // Mock static list of pilgrims
  const mockPilgrims = [
    {
      id: 'pilgrim-1',
      name: 'عبدالرحمن الإندونيسي',
      nationality: 'أندونيسي 🇮🇩',
      hotel: 'فندق روتانا جبل عمر بمكة المكرمة',
      healthTags: ['منخفض الصوديوم', 'خالي من الغلوتين'],
      mealPlan: 'باقة التغذية المخصصة ٣ وجبات شعبية مطهية',
      activePackage: 'الباقة الذهبية 🌟',
      date: '2026-06-24'
    },
    {
      id: 'pilgrim-2',
      name: 'فاطمة الزهراء الماليزية',
      nationality: 'ماليزية 🇲🇾',
      hotel: 'فندق سويس أوتيل المقام بمكة',
      healthTags: ['ملائم لمرضى السكري والضغط'],
      mealPlan: 'باقة إفطار وسحور مخصصة للرحلات والمشاعر',
      activePackage: 'الباقة الفضية',
      date: '2026-06-25'
    },
    {
      id: 'pilgrim-3',
      name: 'الحاج مصطفى تورك',
      nationality: 'تركي 🇹🇷',
      hotel: 'فندق دار الغفران بمكة المكرمة',
      healthTags: ['عضوي / نباتي بالكامل'],
      mealPlan: 'باقة عشاء ساخن بالتنسيق مع حملة الحج والعمرة',
      activePackage: 'الباقة العائلية رفقة 👨‍👩‍👧‍👦',
      date: '2026-06-23'
    }
  ];

  // Mock static list of tourists/visitors
  const mockTourists = [
    {
      id: 'tourist-1',
      name: 'جون سميث (سائح كندي)',
      nationality: 'كندي 🇨🇦',
      interests: ['اقتناء السدو التراثي', 'تذوق القهوة السعودية والتمور'],
      hotel: 'فندق شيراتون جبل الكعبة',
      purchasedItem: 'حقيبة سدو تراثية منسوجة يدوياً',
      paidAmount: 265,
      date: '2026-06-22'
    },
    {
      id: 'tourist-2',
      name: 'إيما واتسون (زائرة بريطانية)',
      nationality: 'بريطانية 🇬🇧',
      interests: ['ورش صناعة الفخار التراثي', 'البخور الدوسري والروائح الطبيعية'],
      hotel: 'فندق العنوان جبل عمر بمكة',
      purchasedItem: 'بخور دوسري ملكي فاخر للضيافة',
      paidAmount: 135,
      date: '2026-06-23'
    },
    {
      id: 'tourist-3',
      name: 'تارو هيروشي (مستكشف ياباني)',
      nationality: 'ياباني 🇯🇵',
      interests: ['فنون الخط العربي التراثي', 'أطعمة الطهي الشعبي النبطية'],
      hotel: 'فندق سويس أوتيل مكة المكرمة',
      purchasedItem: 'طقم فناجيل ضيافة نجدية منقوشة',
      paidAmount: 195,
      date: '2026-06-24'
    }
  ];

  // Input states for custom logo values
  const [tempWarathLogo, setTempWarathLogo] = useState(warathLogo);
  const [tempThinkingLogo, setTempThinkingLogo] = useState(thinkingLogo);
  const [showBrandingSuccess, setShowBrandingSuccess] = useState(false);
  const [isDraggingWarath, setIsDraggingWarath] = useState(false);
  const [isDraggingThinking, setIsDraggingThinking] = useState(false);
  const [brandingError, setBrandingError] = useState('');

  const handleImageUpload = (file: File, type: 'warath' | 'thinking') => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setBrandingError('الرجاء اختيار ملف صورة صالح (PNG, JPG, SVG, JPEG, WEBP)');
      setTimeout(() => setBrandingError(''), 5000);
      return;
    }
    
    if (file.size > 3 * 1024 * 1024) {
      setBrandingError('حجم الصورة كبير جداً، الرجاء اختيار صورة أقل من 3 ميجابايت');
      setTimeout(() => setBrandingError(''), 5000);
      return;
    }

    setBrandingError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        if (type === 'warath') {
          setTempWarathLogo(result);
        } else {
          setTempThinkingLogo(result);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Interactive mock registrations for the Admin to review
  const [mockRegistrations, setMockRegistrations] = useState([
    {
      id: 'reg-1',
      name: 'منيرة العبدالله (أم فواز)',
      projectName: 'عطور الهيل الدوسري',
      domain: 'home_products',
      domainLabel: 'المنتجات المنزلية',
      experience: '3 سنوات',
      readiness: 82,
      status: 'pending_review',
      productsCount: 6,
      date: '2026-06-21'
    },
    {
      id: 'reg-2',
      name: 'عبدالرحمن الدوسري',
      projectName: 'مجلس الضيافة النجدية',
      domain: 'hospitality',
      domainLabel: 'الضيافة العربية',
      experience: '5 سنوات',
      readiness: 76,
      status: 'pending_review',
      productsCount: 4,
      date: '2026-06-22'
    },
    {
      id: 'reg-3',
      name: 'فاطمة الحربي',
      projectName: 'سدو القصيم التراثي',
      domain: 'crafts',
      domainLabel: 'الحرف اليدوية',
      experience: 'سنة واحدة',
      readiness: 91,
      status: 'approved',
      productsCount: 12,
      date: '2026-06-20'
    }
  ]);

  const handleApproveMock = (id: string) => {
    setMockRegistrations(mockRegistrations.map(reg => {
      if (reg.id === id) {
        return { ...reg, status: 'approved', readiness: 95 };
      }
      return reg;
    }));
  };

  const filteredMock = mockRegistrations.filter(reg => {
    const matchesSearch = reg.name.includes(searchTerm) || reg.projectName.includes(searchTerm);
    const matchesFilter = filterDomain === 'all' || reg.domain === filterDomain;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-5xl mx-auto my-4 bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden" id="admin-panel-card">
      {/* Banner */}
      <div className="bg-primary text-stone-100 p-6 flex items-center justify-between border-b border-stone-200" id="admin-banner">
        <div className="flex items-center gap-3">
          <Landmark className="w-8 h-8 text-accent" />
          <div>
            <h2 className="text-xl font-bold">لوحة تحكم إدارة المنصة</h2>
            <p className="text-stone-300 text-xs mt-0.5">مراجعة الملفات المهنية الرقمية المقدمة، تقييمات الجاهزية والطلبات، واعتماد الأسر المنتجة للشراكة والتشغيل.</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Statistics Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="admin-stats-widgets">
          <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl flex items-center gap-4">
            <div className="bg-primary/5 p-3 rounded-xl text-primary">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-stone-400 font-mono block">إجمالي طلبات التسجيل</span>
              <span className="text-xl font-black text-primary">45 طلباً جديداً</span>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl flex items-center gap-4">
            <div className="bg-amber-500/5 p-3 rounded-xl text-amber-600">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-stone-400 font-mono block">الملفات قيد المراجعة</span>
              <span className="text-xl font-black text-amber-600">12 ملفاً مهنياً</span>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl flex items-center gap-4">
            <div className="bg-emerald-500/5 p-3 rounded-xl text-emerald-600">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-stone-400 font-mono block">المشاريع المعتمدة للتمكين</span>
              <span className="text-xl font-black text-emerald-600">215 مشروعاً مؤهلاً</span>
            </div>
          </div>
        </div>

        {/* 📑 ADMIM SUB-TAB NAVIGATION BAR */}
        <div className="border-b border-stone-200">
          <div className="flex flex-wrap gap-1 md:gap-2 -mb-px overflow-x-auto text-right">
            <button
              onClick={() => setAdminSubTab('families')}
              className={`flex items-center gap-2 py-3 px-4 font-bold text-xs md:text-sm border-b-2 transition-all cursor-pointer ${
                adminSubTab === 'families'
                  ? 'border-[#0B3A60] text-[#0B3A60] bg-stone-50'
                  : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50/50'
              }`}
            >
              <Users className="w-4 h-4 text-accent" />
              <span>الأسر المنتجة</span>
              <span className="bg-amber-150 text-amber-800 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                {mockRegistrations.filter(r => r.status !== 'approved').length}
              </span>
            </button>

            <button
              onClick={() => setAdminSubTab('pilgrims')}
              className={`flex items-center gap-2 py-3 px-4 font-bold text-xs md:text-sm border-b-2 transition-all cursor-pointer ${
                adminSubTab === 'pilgrims'
                  ? 'border-[#0B3A60] text-[#0B3A60] bg-stone-50'
                  : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50/50'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>دليل المعتمرين</span>
              <span className="bg-[#EBF1FA] text-[#0B3A60] text-[9px] px-1.5 py-0.5 rounded-full font-mono">
                {mockPilgrims.length}
              </span>
            </button>

            <button
              onClick={() => setAdminSubTab('product_requests')}
              className={`flex items-center gap-2 py-3 px-4 font-bold text-xs md:text-sm border-b-2 transition-all cursor-pointer ${
                adminSubTab === 'product_requests'
                  ? 'border-[#0B3A60] text-[#0B3A60] bg-amber-50'
                  : 'border-transparent text-stone-600 hover:text-amber-900 hover:bg-amber-50/50'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-amber-600" />
              <span>🛍️ طلبات المنتجات والاعتماد</span>
              {adminProducts.filter(p => p.status === 'pending').length > 0 && (
                <span className="bg-amber-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-black animate-pulse">
                  {adminProducts.filter(p => p.status === 'pending').length} قيد المراجعة
                </span>
              )}
            </button>

            <button
              onClick={() => setAdminSubTab('testing_center')}
              className={`flex items-center gap-2 py-3 px-4 font-bold text-xs md:text-sm border-b-2 transition-all cursor-pointer ${
                adminSubTab === 'testing_center'
                  ? 'border-[#0B3A60] text-[#0B3A60] bg-emerald-50'
                  : 'border-transparent text-stone-600 hover:text-emerald-900 hover:bg-emerald-50/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>🧪 مركز اختبار المنصة</span>
              <span className="bg-emerald-600 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                30 مساراً
              </span>
            </button>

            <button
              onClick={() => setAdminSubTab('orders')}
              className={`flex items-center gap-2 py-3 px-4 font-bold text-xs md:text-sm border-b-2 transition-all cursor-pointer ${
                adminSubTab === 'orders'
                  ? 'border-[#0B3A60] text-[#0B3A60] bg-stone-50'
                  : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50/50'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-purple-600" />
              <span>المبيعات والمشتريات الحرة</span>
              {orders.filter(o => o.status === 'new').length > 0 && (
                <span className="bg-red-100 text-red-800 text-[9px] px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                  {orders.filter(o => o.status === 'new').length} جديد
                </span>
              )}
            </button>

            <button
              onClick={() => setAdminSubTab('tickets')}
              className={`flex items-center gap-2 py-3 px-4 font-bold text-xs md:text-sm border-b-2 transition-all cursor-pointer ${
                adminSubTab === 'tickets'
                  ? 'border-[#0B3A60] text-[#0B3A60] bg-stone-50'
                  : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50/50'
              }`}
            >
              <Headphones className="w-4 h-4 text-blue-600" />
              <span>الدعم الفني والرسائل</span>
              {tickets.filter(t => t.status === 'pending').length > 0 && (
                <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                  {tickets.filter(t => t.status === 'pending').length} معلق
                </span>
              )}
            </button>

            <button
              onClick={() => setAdminSubTab('packages')}
              className={`flex items-center gap-2 py-3 px-4 font-bold text-xs md:text-sm border-b-2 transition-all cursor-pointer ${
                adminSubTab === 'packages'
                  ? 'border-[#0B3A60] text-[#0B3A60] bg-amber-50'
                  : 'border-transparent text-stone-600 hover:text-amber-900 hover:bg-amber-50/50'
              }`}
            >
              <Gift className="w-4 h-4 text-amber-600" />
              <span>🎁 إدارة الباقات</span>
              <span className="bg-amber-150 text-amber-900 text-[9px] px-1.5 py-0.5 rounded-full font-black">
                {packagesList.length}
              </span>
            </button>

            <button
              onClick={() => setAdminSubTab('emails')}
              className={`flex items-center gap-2 py-3 px-4 font-bold text-xs md:text-sm border-b-2 transition-all cursor-pointer ${
                adminSubTab === 'emails'
                  ? 'border-[#0B3A60] text-[#0B3A60] bg-emerald-50'
                  : 'border-transparent text-stone-600 hover:text-emerald-900 hover:bg-emerald-50/50'
              }`}
            >
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>📧 سجل الإشعارات والحسابات</span>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                {adminEmailLogs.length}
              </span>
            </button>

            <button
              onClick={() => setAdminSubTab('branding')}
              className={`flex items-center gap-2 py-3 px-4 font-bold text-xs md:text-sm border-b-2 transition-all cursor-pointer ${
                adminSubTab === 'branding'
                  ? 'border-[#0B3A60] text-[#0B3A60] bg-stone-50'
                  : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50/50'
              }`}
            >
              <Palette className="w-4 h-4 text-pink-600" />
              <span>الهوية والشعارات</span>
            </button>

            <button
              onClick={() => setAdminSubTab('infra')}
              className={`flex items-center gap-2 py-3 px-4 font-bold text-xs md:text-sm border-b-2 transition-all cursor-pointer ${
                adminSubTab === 'infra'
                  ? 'border-[#0B3A60] text-[#0B3A60] bg-amber-50'
                  : 'border-transparent text-amber-700 hover:text-amber-900 hover:bg-amber-50/50'
              }`}
            >
              <Server className="w-4 h-4 text-amber-600" />
              <span>البنية التحتية والأداء (High Concurrency)</span>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                100%
              </span>
            </button>
          </div>
        </div>

        {/* 🟢 SUB-TAB VIEW RENDERERS */}
        
        {/* 1. FAMILIES TAB: Registration approvals */}
        {adminSubTab === 'families' && (
          <div className="space-y-6">
            {/* User Active Project Approval Widget */}
            <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl space-y-4 text-right" id="user-approval-section">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <h3 className="font-extrabold text-primary text-sm md:text-base">دراسة طلب المستفيد الحالي: {profile.name || '[بانتظار التسجيل]'}</h3>
                </div>
                <span className="text-[10px] text-stone-400 font-mono">ملف المستفيد النشط</span>
              </div>

              {!profile.registered ? (
                <div className="text-center py-6 text-stone-400 text-xs">
                  <AlertCircle className="w-8 h-8 mx-auto text-stone-300 mb-2" />
                  لم يقم المستفيد بتسجيل ملفه المهني أو إضافة أي بيانات حتى الآن لطلب المراجعة.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-2 text-right">
                    <p className="text-stone-800 text-xs md:text-sm">
                      <strong>اسم المشروع:</strong> {profile.projectName} | <strong>النشاط الرئيسي:</strong> {
                        profile.projectType === 'hospitality' ? 'الضيافة' :
                        profile.projectType === 'culinary' ? 'الطهي التراثي' :
                        profile.projectType === 'crafts' ? 'الحرف اليدوية' : 'المنتجات المنزلية'
                      }
                    </p>
                    <p className="text-stone-500 text-[11px] leading-relaxed font-light">{profile.description}</p>
                    <div className="flex flex-wrap gap-2 pt-1.5 justify-start">
                      <span className="bg-stone-100 text-stone-600 font-mono text-[10px] px-2 py-0.5 rounded">الكتالوج: {profile.products.length} منتج</span>
                      <span className="bg-stone-100 text-stone-600 font-mono text-[10px] px-2 py-0.5 rounded">الكويزات: {courses.filter(c => c.quizPassed).length} ناجح</span>
                      <span className="bg-stone-100 text-stone-600 font-mono text-[10px] px-2 py-0.5 rounded">التشخيص: {assessment ? 'مكتمل' : 'غير مكتمل'}</span>
                    </div>
                  </div>

                  <div className="md:col-span-4 flex flex-col gap-2 md:border-r border-stone-200 md:pr-5 w-full">
                    <button
                      onClick={onApproveProject}
                      className="bg-primary hover:bg-primary/95 text-accent font-bold px-4 py-3 rounded-xl text-xs shadow-sm transition-all text-center cursor-pointer"
                      id="approve-active-profile-btn"
                    >
                      اعتماد الملف ومنح وثيقة الجاهزية 🏆
                    </button>
                    <p className="text-[9px] text-stone-400 text-center font-light leading-snug">باعتمادك الملف، تمنح المستفيد نقاط نضج كاملة وتطابق ملفه آلياً بمستثمري الضمان والتمكين المالي.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Queue of registrations to review */}
            <div className="space-y-4" id="registrations-queue">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-100 pb-3">
                <h4 className="font-bold text-stone-800 text-sm md:text-base">قائمة طلبات الأسر المنتجة قيد المراجعة</h4>
                
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-grow sm:flex-grow-0">
                    <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="ابحث بالاسم أو المشروع..."
                      className="bg-stone-50 border border-stone-200 rounded-lg pr-9 pl-3 py-1.5 text-xs focus:outline-none w-full sm:w-60 text-right"
                    />
                  </div>
                  
                  <select
                    value={filterDomain}
                    onChange={(e) => setFilterDomain(e.target.value)}
                    className="bg-stone-50 border border-stone-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none font-semibold text-right"
                  >
                    <option value="all">كل الأنشطة</option>
                    <option value="hospitality">الضيافة</option>
                    <option value="culinary">الطهي</option>
                    <option value="crafts">الحرف</option>
                    <option value="home_products">المنزلية</option>
                  </select>
                </div>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm" id="admin-table-container">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
                      <tr>
                        <th className="p-4">اسم المستفيد / المشروع</th>
                        <th className="p-4">مجال النشاط</th>
                        <th className="p-4">الخبرة</th>
                        <th className="p-4 text-center">المنتجات</th>
                        <th className="p-4 text-center">نسبة الجاهزية</th>
                        <th className="p-4 text-center">حالة الملف</th>
                        <th className="p-4 text-center">الإجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-700">
                      {filteredMock.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-10 text-stone-400 font-light">لا توجد طلبات تطابق معايير البحث والفلترة.</td>
                        </tr>
                      ) : (
                        filteredMock.map((reg) => (
                          <tr key={reg.id} className="hover:bg-stone-50/50 transition-colors">
                            <td className="p-4">
                              <div className="font-bold text-stone-800">{reg.name}</div>
                              <div className="text-stone-400 text-[10px] mt-0.5">{reg.projectName}</div>
                            </td>
                            <td className="p-4">{reg.domainLabel}</td>
                            <td className="p-4 font-light">{reg.experience}</td>
                            <td className="p-4 text-center font-mono">{reg.productsCount} منتج</td>
                            <td className="p-4 text-center">
                              <span className={`font-mono font-bold ${
                                reg.readiness >= 80 ? 'text-emerald-600' : 'text-accent'
                              }`}>{reg.readiness}%</span>
                            </td>
                            <td className="p-4 text-center">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                reg.status === 'approved'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {reg.status === 'approved' ? 'مكتمل وموثّق' : 'قيد الدراسة'}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <button
                                disabled={reg.status === 'approved'}
                                onClick={() => handleApproveMock(reg.id)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                  reg.status === 'approved'
                                    ? 'bg-emerald-50 text-emerald-600 cursor-not-allowed border border-emerald-100'
                                    : 'bg-primary text-accent hover:bg-primary/95 shadow-xs'
                                }`}
                              >
                                {reg.status === 'approved' ? 'تم الاعتماد' : 'مراجعة واعتماد'}
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PILGRIMS TAB: Directory & health trackers */}
        {adminSubTab === 'pilgrims' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <h4 className="font-extrabold text-stone-800 text-sm md:text-base">دليل ضيوف الرحمن (المعتمرين)</h4>
                <p className="text-stone-400 text-[10px]">متابعة المعتمرين وحالاتهم الصحية وباقات الطعام الذكي الموفرة من الأسر المنتجة.</p>
              </div>
              <span className="bg-emerald-50 text-emerald-800 text-xs px-2 py-1 rounded-lg font-black">٣ معتمرين نشطين</span>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
                    <tr>
                      <th className="p-4">اسم المعتمر</th>
                      <th className="p-4">الجنسية</th>
                      <th className="p-4">الفندق واللوكيشن</th>
                      <th className="p-4">الاشتراطات الغذائية والحساسية</th>
                      <th className="p-4">باقة الوجبات الفعالة</th>
                      <th className="p-4 text-center">تاريخ الوصول</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {mockPilgrims.map((pilgrim) => (
                      <tr key={pilgrim.id} className="hover:bg-stone-50/50 transition-colors">
                        <td className="p-4 font-bold text-stone-800">{pilgrim.name}</td>
                        <td className="p-4 font-bold">{pilgrim.nationality}</td>
                        <td className="p-4 font-light flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-red-500" />
                          <span>{pilgrim.hotel}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {pilgrim.healthTags.map((tag, tIdx) => (
                              <span key={tIdx} className="bg-red-50 text-red-700 text-[9px] px-2 py-0.5 rounded-full font-bold">
                                🛡️ {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-0.5">
                            <span className="bg-[#EBF1FA] text-[#0B3A60] px-2 py-0.5 rounded-full text-[9px] font-black">{pilgrim.activePackage}</span>
                            <div className="text-[9px] text-stone-400 font-light mt-0.5">{pilgrim.mealPlan}</div>
                          </div>
                        </td>
                        <td className="p-4 text-center font-mono text-stone-500">{pilgrim.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 3. TOURISTS TAB: Visitor preferences and craft acquisition */}
        {adminSubTab === 'tourists' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <h4 className="font-extrabold text-stone-800 text-sm md:text-base">دليل الوفود السياحية والزوار الأجانب</h4>
                <p className="text-stone-400 text-[10px]">متابعة اهتمامات السياح في الموروث والقطع الفنية المقتناة والتبادل الثقافي.</p>
              </div>
              <span className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded-lg font-black">مستكشف ثقافي نشط</span>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
                    <tr>
                      <th className="p-4">اسم الزائر</th>
                      <th className="p-4">الجنسية</th>
                      <th className="p-4">محل الإقامة الفندقية</th>
                      <th className="p-4">الاهتمامات التراثية المفضلة</th>
                      <th className="p-4">أحدث مقتنيات الأسر المنتجة</th>
                      <th className="p-4 text-center">تاريخ المشتريات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {mockTourists.map((tourist) => (
                      <tr key={tourist.id} className="hover:bg-stone-50/50 transition-colors">
                        <td className="p-4 font-bold text-stone-800">{tourist.name}</td>
                        <td className="p-4 font-bold">{tourist.nationality}</td>
                        <td className="p-4 font-light flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          <span>{tourist.hotel}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {tourist.interests.map((tag, tIdx) => (
                              <span key={tIdx} className="bg-stone-100 text-stone-700 text-[9px] px-2 py-0.5 rounded-full">
                                🎨 {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-0.5">
                            <span className="font-bold text-stone-800">{tourist.purchasedItem}</span>
                            <div className="text-[10px] text-emerald-600 font-mono font-bold">تم الدفع: {tourist.paidAmount} ر.س</div>
                          </div>
                        </td>
                        <td className="p-4 text-center font-mono text-stone-500">{tourist.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 🛍️ PRODUCT REQUESTS & APPROVAL TAB */}
        {adminSubTab === 'product_requests' && (
          <div className="space-y-6 text-right dir-rtl">
            {adminProdSuccessMsg && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{adminProdSuccessMsg}</span>
                </span>
                <button onClick={() => setAdminProdSuccessMsg('')} className="text-emerald-600 hover:text-emerald-900">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <h4 className="font-extrabold text-stone-800 text-base flex items-center gap-2">
                  <span>🛍️ إدارة المنتجات وطلبات الاعتماد</span>
                  <span className="bg-amber-100 text-amber-800 text-xs font-black px-2.5 py-0.5 rounded-full">
                    {adminProducts.filter(p => p.status === 'pending').length} قيد المراجعة
                  </span>
                </h4>
                <p className="text-stone-500 text-xs font-light mt-0.5">
                  اعتماد منتجات الأسر المنتجة والحرفيين قبل ظهورها للجمهور والمعتمرين في المتجر العام.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={prodSearch}
                    onChange={(e) => setProdSearch(e.target.value)}
                    placeholder="ابحث باسم المنتج أو الأسرة..."
                    className="w-full sm:w-56 pr-9 pl-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary text-right"
                  />
                </div>

                <select
                  value={prodStatusFilter}
                  onChange={(e) => setProdStatusFilter(e.target.value as any)}
                  className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none text-right"
                >
                  <option value="all">جميع الحالات ({adminProducts.length})</option>
                  <option value="pending">🟡 قيد المراجعة ({adminProducts.filter(p => p.status === 'pending').length})</option>
                  <option value="approved">🟢 المعتمدة في المتجر ({adminProducts.filter(p => !p.status || p.status === 'approved').length})</option>
                  <option value="rejected">🔴 المرفوضة ({adminProducts.filter(p => p.status === 'rejected').length})</option>
                  <option value="needs_modification">🟠 تتطلب تعديل ({adminProducts.filter(p => p.status === 'needs_modification').length})</option>
                </select>
              </div>
            </div>

            {/* Products Table / Cards */}
            <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
                    <tr>
                      <th className="p-4">المنتج والأسرة</th>
                      <th className="p-4">التصنيف</th>
                      <th className="p-4">السعر والكمية</th>
                      <th className="p-4">المدينة ومدة التجهيز</th>
                      <th className="p-4 text-center">حالة المنتج</th>
                      <th className="p-4 text-center">الإجراءات والقرارات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {adminProducts.filter(p => {
                      const matchesSearch = p.name.includes(prodSearch) || (p.producerName && p.producerName.includes(prodSearch));
                      const matchesStatus = prodStatusFilter === 'all' || 
                        (prodStatusFilter === 'approved' && (!p.status || p.status === 'approved')) ||
                        p.status === prodStatusFilter;
                      return matchesSearch && matchesStatus;
                    }).map((prod) => (
                      <tr key={prod.id} className="hover:bg-stone-50/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={prod.imageUrl} 
                              alt={prod.name} 
                              className="w-12 h-12 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <div className="font-black text-stone-900 text-xs sm:text-sm">{prod.name}</div>
                              <div className="text-[10px] text-stone-500 font-medium">{prod.producerName || 'أسرة منتجة'}</div>
                              {prod.ingredients && (
                                <div className="text-[9px] text-stone-400 font-light mt-0.5 max-w-xs truncate">المكونات: {prod.ingredients}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="bg-stone-100 text-stone-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-stone-200">
                            {prod.category === 'culinary' ? '🥘 طهي تراثي' :
                             prod.category === 'crafts' ? '👜 حرف يدوية' :
                             prod.category === 'hospitality' ? '☕ ضيافة عربية' : '✨ روائح وبخور'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="font-extrabold text-primary">{prod.price} ر.س</div>
                          <div className="text-[10px] text-stone-400">الكمية: {prod.quantity || 10}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-stone-700">{prod.city || prod.producerCity || 'مكة المكرمة'}</div>
                          <div className="text-[10px] text-stone-400">التجهيز: {prod.prepTime || 'جاهز'}</div>
                        </td>
                        <td className="p-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black inline-block ${
                            !prod.status || prod.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                            prod.status === 'pending' ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse' :
                            prod.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {!prod.status || prod.status === 'approved' ? '🟢 معتمد في المتجر' :
                             prod.status === 'pending' ? '🟡 قيد المراجعة' :
                             prod.status === 'rejected' ? '🔴 مرفوض' : '🟠 يتطلب تعديل'}
                          </span>
                          {prod.adminNotes && (
                            <div className="text-[9px] text-rose-600 mt-1 max-w-xs font-medium">ملاحظة: {prod.adminNotes}</div>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1.5 flex-wrap">
                            <button
                              onClick={() => handleApproveProdDirect(prod.id)}
                              disabled={prod.status === 'approved'}
                              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                                prod.status === 'approved' 
                                  ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>اعتماد</span>
                            </button>

                            <button
                              onClick={() => {
                                setSelectedProdForAction(prod);
                                setActionType('modify');
                                setActionNotes(prod.adminNotes || '');
                              }}
                              className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>طلب تعديل</span>
                            </button>

                            <button
                              onClick={() => {
                                setSelectedProdForAction(prod);
                                setActionType('reject');
                                setActionNotes(prod.adminNotes || '');
                              }}
                              className="bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>رفض</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Rejection / Modification Notes Modal */}
            {selectedProdForAction && actionType && (
              <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-stone-200 shadow-2xl text-right space-y-4">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h4 className="font-extrabold text-stone-900 text-base">
                      {actionType === 'reject' ? '❌ رفض المنتج وتوثيق الملاحظات' : '✏️ طلب تعديل المنتج'}
                    </h4>
                    <button onClick={() => { setSelectedProdForAction(null); setActionType(null); }} className="text-stone-400 hover:text-stone-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-1 bg-stone-50 p-3 rounded-2xl border border-stone-100">
                    <p className="text-xs font-black text-stone-800">{selectedProdForAction.name}</p>
                    <p className="text-[10px] text-stone-500">{selectedProdForAction.producerName || 'أسرة منتجة'}</p>
                  </div>

                  <form onSubmit={handleConfirmProdAction} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        {actionType === 'reject' ? 'سبب الرفض والملاحظات الإدارية:' : 'الملاحظات والتعديلات المطلوبة من الأسرة:'}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={actionNotes}
                        onChange={(e) => setActionNotes(e.target.value)}
                        placeholder={actionType === 'reject' ? 'اكتب سبب الرفض بوضوح ليظهر للأسرة في لوحتها...' : 'اكتب التعديلات المطلوب إجرائها على الوصف أو الصورة أو الأسعار...'}
                        className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-primary text-right"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t">
                      <button
                        type="button"
                        onClick={() => { setSelectedProdForAction(null); setActionType(null); }}
                        className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-all"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className={`px-5 py-2 rounded-xl text-xs font-black text-white shadow-md transition-all ${
                          actionType === 'reject' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-amber-600 hover:bg-amber-700'
                        }`}
                      >
                        حفظ وإرسال الملاحظات
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 🧪 TESTING CENTER TAB (30 PATHWAYS) */}
        {adminSubTab === 'testing_center' && (
          <div className="space-y-6 text-right dir-rtl">
            <div className="bg-gradient-to-r from-[#8C7338] via-primary to-[#5C4B23] text-white p-6 rounded-3xl space-y-2 shadow-md">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-300" />
                <h4 className="font-extrabold text-lg text-white">🧪 مركز اختبار وتجربة خدمات المنصة (30 مساراً)</h4>
              </div>
              <p className="text-xs text-stone-200 font-light leading-relaxed">
                تم نقل جميع المسارات التفاعلية إلى لوحة التحكم الإدارية لاختبار المنصة ومراجعة تجربة المستخدم والأسر المنتجة والمعتمرين بشكل مباشر.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* 10 Login Simulations */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center gap-2 text-stone-800 font-extrabold text-sm pb-1 border-b border-stone-200">
                  <span>🔑 10 مسارات سريعة للوصول والبدء المباشر</span>
                </div>
                <div className="space-y-2">
                  {SUGGESTIONS_LOGIN.map((s, idx) => (
                    <div
                      key={s.id}
                      className="p-3.5 rounded-2xl border border-stone-200 bg-white hover:border-primary transition-all flex items-start gap-3 shadow-xs"
                    >
                      <span className="bg-primary/10 text-primary font-mono text-xs w-7 h-7 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="space-y-0.5">
                        <span className="block font-bold text-stone-800 text-xs">{s.title}</span>
                        <span className="block text-[11px] text-stone-500 font-light leading-relaxed">{s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 20 Feature Simulations */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center gap-2 text-stone-800 font-extrabold text-sm pb-1 border-b border-stone-200">
                  <span>✨ 20 اقتراحاً لتجربة خصائص وميزات المنصة</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SUGGESTIONS_FEATURES.map((s, idx) => (
                    <div
                      key={s.id}
                      className="p-3.5 rounded-2xl border border-stone-200 bg-white hover:border-amber-400 transition-all flex items-start gap-3 shadow-xs"
                    >
                      <span className="bg-amber-100 text-amber-900 font-mono text-xs w-7 h-7 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                        {idx + 11}
                      </span>
                      <div className="space-y-0.5">
                        <span className="block font-bold text-stone-800 text-xs">{s.title}</span>
                        <span className="block text-[11px] text-stone-500 font-light leading-relaxed">{s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. ORDERS TAB: Direct Sales without packages */}
        {adminSubTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2 text-right">
              <div>
                <h4 className="font-extrabold text-[#0B3A60] text-sm md:text-base">طلبات الشراء والمبيعات الحرة المباشرة 🛍️</h4>
                <p className="text-stone-400 text-[10px]">متابعة مبيعات الأسر الفورية لعامة المعتمرين والزوار والسياح دون اشتراط أي باقة.</p>
              </div>
              <span className="bg-[#0B3A60]/10 text-[#0B3A60] text-xs px-2.5 py-1 rounded-full font-black self-start">
                إجمالي الطلبات: {orders.length} مبيعة حرة
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12 bg-stone-50 border border-dashed rounded-2xl text-stone-400 text-xs">
                لا توجد طلبات شراء مباشرة مسجلة محلياً في الذاكرة حالياً.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3 text-right relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 left-0 h-1 bg-[#0B3A60]/80" />
                    
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-stone-400">فاتورة: {order.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                          order.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {order.status === 'completed' ? '✓ تم التوصيل' :
                           order.status === 'processing' ? '⚙ قيد التجهيز والتوصيل' : '⏳ طلب جديد وارد'}
                        </span>
                      </div>
                      <h5 className="font-black text-stone-800 text-xs md:text-sm">{order.productName}</h5>
                      <div className="flex gap-2 text-[10px] text-stone-500">
                        <span>الكمية: <strong>{order.quantity}</strong></span>
                        <span>|</span>
                        <span>إعداد الأسرة: <strong>{order.family}</strong></span>
                      </div>
                    </div>

                    <div className="bg-stone-50 p-2.5 rounded-xl text-[10px] space-y-1.5 font-light text-stone-600">
                      <div>👤 <strong>المشتري:</strong> {order.buyerName}</div>
                      <div>📞 <strong>الجوال:</strong> <span className="font-mono">{order.buyerPhone}</span></div>
                      <div className="flex items-start gap-1">
                        <MapPin className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span><strong>العنوان:</strong> {order.deliveryAddress}</span>
                      </div>
                      <div className="flex justify-between items-center pt-1 border-t border-dashed border-stone-200">
                        <span>طريقة الدفع: <strong className="font-bold">{order.paymentMethod === 'cod' ? '💵 كاش عند الاستلام' : '💳 دفع رقمي'}</strong></span>
                        <span className="font-mono text-xs font-black text-[#0B3A60]">{order.totalAmount} ر.س</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                      <span className="text-[9px] font-mono text-stone-400">التاريخ: {order.date}</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleToggleOrderStatus(order.id, order.status)}
                          className="bg-stone-100 hover:bg-[#0B3A60]/5 text-stone-700 hover:text-[#0B3A60] text-[9px] font-bold px-2 py-1 rounded-lg transition-all border border-stone-200 cursor-pointer"
                        >
                          {order.status === 'new' ? 'بدء التجهيز ⚙' : order.status === 'processing' ? 'توصيل الطلب ✓' : 'إعادة الطلب لجديد'}
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 p-1 rounded-lg transition-all border border-red-200 cursor-pointer"
                          title="حذف الطلب"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5. TICKETS TAB: Technical Support Ticketing with automated & manual logs */}
        {adminSubTab === 'tickets' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-2 text-right">
              <div>
                <h4 className="font-extrabold text-[#0B3A60] text-sm md:text-base flex items-center gap-1.5">
                  <Headphones className="w-5 h-5 text-accent" />
                  <span>مركز الدعم الفني وتذاكر مساعدة المستفيدين</span>
                </h4>
                <p className="text-stone-400 text-[10px]">استقبال شكاوى واستفسارات الأسر المنتجة والوفود، وإرسال الردود أو تسجيل تذاكر دعم جديدة يدوياً.</p>
              </div>
              <button
                onClick={() => setShowNewTicketForm(!showNewTicketForm)}
                className="bg-primary hover:bg-primary/95 text-accent text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition-all flex items-center gap-1 self-start cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة تذكرة دعم يدوية</span>
              </button>
            </div>

            {/* Manual Ticket Creation Form */}
            {showNewTicketForm && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-4 text-right"
              >
                <h5 className="font-bold text-stone-800 text-xs">✍ تسجيل تذكرة دعم فني جديدة للعملاء/الأسر:</h5>
                {newTicketError && (
                  <div className="bg-red-50 text-red-700 text-[10px] p-2 rounded-xl border border-red-100 font-bold">
                    ⚠ {newTicketError}
                  </div>
                )}
                {newTicketSuccess && (
                  <div className="bg-emerald-50 text-emerald-800 text-[10px] p-2 rounded-xl border border-emerald-100 font-bold">
                    🎉 تم إدراج التذكرة بنجاح في سجل الدعم الفني!
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-stone-600">اسم صاحب التذكرة *</label>
                    <input
                      type="text"
                      placeholder="مثال: أم عبدالملك"
                      value={newTicketName}
                      onChange={(e) => setNewTicketName(e.target.value)}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs text-right outline-none bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-stone-600">رقم جوال المتابعة *</label>
                    <input
                      type="text"
                      placeholder="مثال: 055XXXXXXX"
                      value={newTicketPhone}
                      onChange={(e) => setNewTicketPhone(e.target.value)}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs text-left outline-none bg-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-bold text-stone-600">البريد الإلكتروني (اختياري)</label>
                    <input
                      type="email"
                      placeholder="customer@example.com"
                      value={newTicketEmail}
                      onChange={(e) => setNewTicketEmail(e.target.value)}
                      className="w-full p-2 rounded-xl border border-stone-200 text-xs text-left outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-stone-600">مضمون الرسالة أو استفسار المشكلة الأساسية *</label>
                  <textarea
                    rows={3}
                    placeholder="اكتب تفاصيل التذكرة هنا..."
                    value={newTicketMessage}
                    onChange={(e) => setNewTicketMessage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-right outline-none bg-white resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowNewTicketForm(false)}
                    className="bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-bold py-2 px-4 rounded-xl transition-all cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="button"
                    onClick={handleAddManualTicket}
                    className="bg-primary text-accent text-xs font-bold py-2 px-5 rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    حفظ التذكرة فورياً 💾
                  </button>
                </div>
              </motion.div>
            )}

            {/* Support Tickets Queue */}
            {tickets.length === 0 ? (
              <div className="text-center py-10 bg-stone-50 border border-dashed rounded-2xl text-stone-400 text-xs">
                لا توجد تذاكر دعم فني مسجلة حالياً.
              </div>
            ) : (
              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="bg-white border border-stone-200 rounded-2xl p-4 text-right space-y-3 hover:shadow-xs transition-all">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-stone-400">تذكرة: #{ticket.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                          ticket.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ticket.status === 'resolved' ? '✓ تم الحل والرد' : '⏳ قيد المراجعة والدراسة'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400">{ticket.date}</span>
                    </div>

                    <div className="text-xs text-stone-800 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-150">
                      <strong>نص الرسالة:</strong> {ticket.message}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] text-stone-500 py-1 font-light">
                      <div>👤 <strong>المستفيد:</strong> {ticket.name}</div>
                      <div>📞 <strong>رقم الجوال:</strong> <span className="font-mono">{ticket.phone}</span></div>
                      <div>✉ <strong>البريد:</strong> <span className="font-mono">{ticket.email}</span></div>
                    </div>

                    {/* Show Reply if exists */}
                    {ticket.reply && (
                      <div className="bg-emerald-50/50 text-emerald-900 text-[11px] p-3 rounded-xl border border-emerald-100 space-y-1">
                        <div className="font-bold">💬 الرد الرسمي للمؤسسة:</div>
                        <p className="font-light">{ticket.reply}</p>
                      </div>
                    )}

                    {/* Form to submit reply or update */}
                    <div className="pt-2 border-t border-stone-100 flex justify-between items-center">
                      {activeTicketId === ticket.id ? (
                        <div className="w-full space-y-2">
                          <textarea
                            rows={2}
                            value={ticketReplyText}
                            onChange={(e) => setTicketReplyText(e.target.value)}
                            placeholder="اكتب رد الدعم الفني الفوري الذي سيظهر للعميل..."
                            className="w-full p-2 rounded-xl border border-[#0B3A60]/30 text-xs focus:ring-1 focus:ring-[#0B3A60] outline-none text-right"
                          />
                          <div className="flex justify-end gap-1">
                            <button
                              onClick={() => {
                                setActiveTicketId(null);
                                setTicketReplyText('');
                              }}
                              className="bg-stone-150 text-stone-600 text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                            >
                              إلغاء
                            </button>
                            <button
                              onClick={() => handleSendReply(ticket.id)}
                              className="bg-[#0B3A60] text-white text-[10px] font-bold px-4 py-1.5 rounded-lg shadow-sm cursor-pointer"
                            >
                              إرسال الرد الفوري 💬
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setActiveTicketId(ticket.id);
                              setTicketReplyText(ticket.reply || '');
                            }}
                            className="text-[#0B3A60] hover:text-[#0B3A60]/80 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{ticket.reply ? 'تعديل الرد الحالي' : 'إرسال رد رسمي مسجّل'}</span>
                          </button>
                          <button
                            onClick={() => handleDeleteTicket(ticket.id)}
                            className="text-red-500 hover:text-red-600 text-[11px] font-bold flex items-center gap-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>حذف التذكرة</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. BRANDING TAB: Branding and logos management hub */}
        {adminSubTab === 'branding' && (
          <div className="bg-stone-50/60 border border-stone-200 p-6 rounded-3xl space-y-6 text-right animate-fadeIn" id="branding-management-hub">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
              <div className="space-y-1">
                <h3 className="font-extrabold text-primary text-sm md:text-base flex items-center gap-2">
                  <Palette className="w-5 h-5 text-accent" />
                  <span>مركز إدارة الهوية البصرية والشعارات الرسمية</span>
                </h3>
                <p className="text-stone-500 text-[11px] font-light">
                  ورث أجيال هي مبادرة وطنية تابعة لمبادرات <strong className="font-semibold text-stone-800">مؤسسة التفكير والنماء</strong>. يمكنك تحميل صور الشعارات وتعديل هوية وموسم الموقع فورياً من خيار واحد.
                </p>
              </div>
              <span className="text-[10px] font-bold text-accent bg-accent/10 px-3 py-1 rounded-full self-start sm:self-center">بوابة التحكم بالهوية 🛡️</span>
            </div>

            {/* 🎛️ DYNAMIC MAIN PAGE PRIMARY COLOR SELECTOR */}
            <div className="bg-white border border-stone-200 p-5 rounded-2xl space-y-4 shadow-xs text-right">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h4 className="font-extrabold text-stone-800 text-xs md:text-sm flex items-center gap-2">
                  <Palette className="w-4 h-4 text-primary" />
                  <span>تحديد اللون الأساسي للصفحة الرئيسية والمنصة 🎨</span>
                </h4>
                <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-full border border-stone-200">
                  تطبيق ديناميكي أوتوماتيكي
                </span>
              </div>

              <p className="text-[11px] text-stone-500 font-light leading-relaxed">
                حدد اللون الأساسي المعتمد في الصفحة الرئيسية وعناصر الهوية. النظام ينعكس تلقائياً وديناميكياً على كامل الأزرار والأيقونات دون حاجة لتعديل الكود. الخلفية المساعدة المعتمدة هي <strong>الأوف وايت الفاتح (#F4FEF6)</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Option 1: #B49A5A Warm Gold / Brown */}
                <button
                  type="button"
                  onClick={() => setMainPrimaryColor && setMainPrimaryColor('#B49A5A')}
                  className={`p-4 rounded-2xl border-2 text-right transition-all flex items-start gap-3.5 cursor-pointer ${
                    mainPrimaryColor === '#B49A5A'
                      ? 'border-[#B49A5A] bg-[#B49A5A]/5 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#B49A5A] border-2 border-white shadow-md flex-shrink-0 flex items-center justify-center text-white font-black text-sm">
                    {mainPrimaryColor === '#B49A5A' ? '✓' : ''}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-stone-800 text-xs md:text-sm">الذهبي / البني الدافئ</span>
                      <span className="font-mono text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">#B49A5A</span>
                    </div>
                    <p className="text-[10px] text-stone-500 font-light leading-normal">
                      اللون الأساسي الافتراضي للمنصة والصفحة الرئيسية، مظهر دافئ وفاخر يعبر عن الأصالة التراثية.
                    </p>
                  </div>
                </button>

                {/* Option 2: #1E3D34 Dark Green */}
                <button
                  type="button"
                  onClick={() => setMainPrimaryColor && setMainPrimaryColor('#1E3D34')}
                  className={`p-4 rounded-2xl border-2 text-right transition-all flex items-start gap-3.5 cursor-pointer ${
                    mainPrimaryColor === '#1E3D34'
                      ? 'border-[#1E3D34] bg-[#1E3D34]/5 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1E3D34] border-2 border-white shadow-md flex-shrink-0 flex items-center justify-center text-white font-black text-sm">
                    {mainPrimaryColor === '#1E3D34' ? '✓' : ''}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-stone-800 text-xs md:text-sm">الأخضر الداكن</span>
                      <span className="font-mono text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-bold">#1E3D34</span>
                    </div>
                    <p className="text-[10px] text-stone-500 font-light leading-normal">
                      اللون الأساسي البديل، طابع زراعي وعريق يمثل النماء والاستدامة والهوية السعودية الملكية.
                    </p>
                  </div>
                </button>
              </div>

              {/* Active State Preview Bar */}
              <div className="bg-[#F4FEF6] border border-emerald-200/80 p-3 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-stone-300 shadow-xs flex-shrink-0" style={{ backgroundColor: mainPrimaryColor }}></div>
                  <span className="font-bold text-stone-800">اللون الأساسي المطبق حالياً:</span>
                  <span className="font-mono font-extrabold text-stone-900 px-2.5 py-0.5 rounded-md bg-white border border-stone-200">
                    {mainPrimaryColor} {mainPrimaryColor === '#B49A5A' ? '🟤 (الذهبي/البني الدافئ)' : '🟢 (الأخضر الداكن)'}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-800 font-bold bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                  الخلفية المساعدة المعتمدة: #F4FEF6 ⚪
                </span>
              </div>
            </div>

            {/* 🎨 UNIFIED HERITAGE THEME SWITCHER */}
            <div className="bg-white border border-stone-200 p-5 rounded-2xl space-y-4 shadow-xs text-right">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h4 className="font-extrabold text-stone-800 text-xs md:text-sm flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-primary" />
                  <span>تخصيص الهوية التراثية والموسم النشط للموقع بالكامل 🇸🇦</span>
                </h4>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">تغيير موحد 🎛️</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-7 space-y-1">
                  <label className="block text-xs font-bold text-stone-700">اختر الطابع الإرثي أو الموسم الفعّال حالياً:</label>
                  <p className="text-[10px] text-stone-400 font-light leading-relaxed">
                    تبديل هذا الخيار يعيد صياغة طابع المنصة بالكامل (تدرجات الألوان، الأزرار، الخلفيات، واللمسات الاحتفالية) ليتناسب فورياً مع ذوق المناسبة والزوار.
                  </p>
                </div>
                <div className="md:col-span-5">
                  <select
                    value={activeTheme}
                    onChange={(e) => setActiveTheme(e.target.value)}
                    className="w-full bg-stone-50 border-2 border-stone-200 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none focus:border-primary text-right cursor-pointer shadow-xs transition-all text-stone-700"
                  >
                    <option value="official">الهوية الرسمية 🇸🇦 (الأخضر العشبي العريق والذهب)</option>
                    <option value="founding">يوم التأسيس 🤎 (الماروني التراثي والذهبي الرملي الأصيل)</option>
                    <option value="national">اليوم الوطني 💚 (أخضر العلم السعودي المهيب والنقاء)</option>
                    <option value="ramadan">موسم رمضان المبارك 🌙 (بنفسجي السكينة والذهبي الهلالي)</option>
                    <option value="dark">الوضع الليلي الفاخر 🌙 (توهج ذهبي وأخضر ملكي داكن للبعثات)</option>
                  </select>
                </div>
              </div>

              {/* Theme State Info Card */}
              <div className="bg-bgwarm/40 border border-stone-150 p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent animate-pulse flex-shrink-0" />
                  <span><strong>الطابع البصري النشط:</strong></span>
                  <span className="font-extrabold text-primary">
                    {activeTheme === 'official' && 'الهوية الرسمية 🇸🇦'}
                    {activeTheme === 'founding' && 'يوم التأسيس 🤎'}
                    {activeTheme === 'national' && 'اليوم الوطني 💚'}
                    {activeTheme === 'ramadan' && 'موسم رمضان 🌙'}
                    {activeTheme === 'dark' && 'الوضع الليلي الفاخر 🌙'}
                  </span>
                </div>
                <div className="text-[10px] text-stone-500 font-light">
                  {activeTheme === 'official' && '✓ تصميم كلاسيكي متزن يعزز الضيافة والتأهيل المهني للأسر.'}
                  {activeTheme === 'founding' && '✓ يعبر عن الهوية المارونية والعمق التاريخي منذ ثلاثة قرون.'}
                  {activeTheme === 'national' && '✓ طابع "نحلم ونحقق" المشرق مع تدرجات اللون الأخضر الزاهي.'}
                  {activeTheme === 'ramadan' && '✓ مائدة الضيافة الرمضانية وأجواء الطهي الساكنة المبهجة.'}
                  {activeTheme === 'dark' && '✓ وضع ليلي فاخر للبعثات والفنادق لاستعراض المنتجات والكتالوج بتوهج ذهبي مريح.'}
                </div>
              </div>
            </div>

            {brandingError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-2xl text-xs font-bold flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{brandingError}</span>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
              {/* COLUMN 1: Warath Ajyal Logo */}
              <div className="bg-white border border-stone-150 p-5 rounded-2xl space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-stone-800 text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    <span>تعديل شعار مبادرة ورث أجيال</span>
                  </h4>
                  <span className="text-[10px] text-stone-400 font-mono">شعار ورث أجيال الرسمي</span>
                </div>

                {/* Preview */}
                <div className="flex items-center gap-4 bg-stone-50 p-3.5 rounded-xl border border-stone-100 justify-end">
                  <div className="flex-1 min-w-0 text-right">
                    <span className="text-[10px] text-stone-400 block font-light">معاينة الشعار الحالي:</span>
                    <span className="text-xs font-bold text-stone-800 truncate block">
                      {tempWarathLogo ? (tempWarathLogo.startsWith('data:') ? 'صورة محملة مباشرة 📁' : 'رابط خارجي مخصص') : 'الشعار الأساسي (الافتراضي)'}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    {tempWarathLogo && (tempWarathLogo.startsWith('http') || tempWarathLogo.startsWith('/') || tempWarathLogo.startsWith('data:')) ? (
                      <img src={tempWarathLogo} alt="معاينة" className="w-12 h-12 object-contain rounded-xl border border-stone-200 bg-white" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="bg-accent text-primary w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl font-mono shadow-inner">
                        {tempWarathLogo || 'و'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Drag and Drop File Upload Area */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-stone-600">تحميل ملف صورة الشعار (اسحب وأسقط أو اضغط):</label>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingWarath(true);
                    }}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      setIsDraggingWarath(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDraggingWarath(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingWarath(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleImageUpload(e.dataTransfer.files[0], 'warath');
                      }
                    }}
                    onClick={() => document.getElementById('warath-logo-file')?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                      isDraggingWarath
                        ? 'border-primary bg-primary/5'
                        : 'border-stone-200 hover:border-primary/50 bg-stone-50/30 hover:bg-stone-50/60'
                    }`}
                  >
                    <input
                      type="file"
                      id="warath-logo-file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageUpload(e.target.files[0], 'warath');
                        }
                      }}
                    />
                    <FolderUp className={`w-8 h-8 ${isDraggingWarath ? 'text-primary' : 'text-stone-400'}`} />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-stone-700">اضغط لاختيار صورة الشعار أو اسحبها هنا</p>
                      <p className="text-[10px] text-stone-400 font-light">بحد أقصى 3 ميجابايت (PNG, JPG, WebP, SVG)</p>
                    </div>
                  </div>
                </div>

                {/* Presets and Actions */}
                <div className="space-y-2">
                  <span className="block text-[10px] text-stone-400 font-bold">نماذج وشعارات مقترحة للتغيير السريع:</span>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    <button
                      onClick={() => setTempWarathLogo('')}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-[10px] font-bold py-1 px-2.5 rounded-lg transition-all cursor-pointer"
                    >
                      الشعار الافتراضي (و)
                    </button>
                    <button
                      onClick={() => setTempWarathLogo('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=120&h=120&fit=crop')}
                      className="bg-accent/10 hover:bg-accent/20 text-primary text-[10px] font-bold py-1 px-2.5 rounded-lg transition-all cursor-pointer"
                    >
                      نمط الفنجال التراثي ☕
                    </button>
                    <button
                      onClick={() => setTempWarathLogo('https://images.unsplash.com/photo-1543257580-7269da773bf5?w=120&h=120&fit=crop')}
                      className="bg-accent/10 hover:bg-accent/20 text-primary text-[10px] font-bold py-1 px-2.5 rounded-lg transition-all cursor-pointer"
                    >
                      نمط سعف النخيل 🌴
                    </button>
                  </div>
                </div>
              </div>

              {/* COLUMN 2: Thinking & Growth Foundation Logo */}
              <div className="bg-white border border-stone-150 p-5 rounded-2xl space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-stone-800 text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span>تعديل شعار مؤسسة التفكير والنماء</span>
                  </h4>
                  <span className="text-[10px] text-stone-400 font-mono">الجهة المبادرة والراعية</span>
                </div>

                {/* Preview */}
                <div className="flex items-center gap-4 bg-stone-50 p-3.5 rounded-xl border border-stone-100 justify-end">
                  <div className="flex-1 min-w-0 text-right">
                    <span className="text-[10px] text-stone-400 block font-light">معاينة الشعار الحالي:</span>
                    <span className="text-xs font-bold text-stone-800 truncate block">
                      {tempThinkingLogo ? (tempThinkingLogo.startsWith('data:') ? 'صورة محملة مباشرة 📁' : 'رابط خارجي مخصص') : 'الشعار الأساسي (الافتراضي)'}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    {tempThinkingLogo && (tempThinkingLogo.startsWith('http') || tempThinkingLogo.startsWith('/') || tempThinkingLogo.startsWith('data:')) ? (
                      <img src={tempThinkingLogo} alt="معاينة" className="w-12 h-12 object-contain rounded-xl border border-stone-200 bg-white" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="bg-emerald-800 text-accent w-12 h-12 rounded-xl flex items-center justify-center font-bold text-[10px] font-mono shadow-inner text-center leading-tight px-1">
                        {tempThinkingLogo || 'تفكير ونماء'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Drag and Drop File Upload Area */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-stone-600">تحميل ملف صورة الشعار (اسحب وأسقط أو اضغط):</label>
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingThinking(true);
                    }}
                    onDragEnter={(e) => {
                      e.preventDefault();
                      setIsDraggingThinking(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDraggingThinking(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingThinking(false);
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleImageUpload(e.dataTransfer.files[0], 'thinking');
                      }
                    }}
                    onClick={() => document.getElementById('thinking-logo-file')?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                      isDraggingThinking
                        ? 'border-emerald-600 bg-emerald-50/10'
                        : 'border-stone-200 hover:border-emerald-600/50 bg-stone-50/30 hover:bg-stone-50/60'
                    }`}
                  >
                    <input
                      type="file"
                      id="thinking-logo-file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleImageUpload(e.target.files[0], 'thinking');
                        }
                      }}
                    />
                    <FolderUp className={`w-8 h-8 ${isDraggingThinking ? 'text-emerald-700' : 'text-stone-400'}`} />
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-stone-700">اضغط لاختيار صورة الشعار أو اسحبها هنا</p>
                      <p className="text-[10px] text-stone-400 font-light">بحد أقصى 3 ميجابايت (PNG, JPG, WebP, SVG)</p>
                    </div>
                  </div>
                </div>

                {/* Presets and Actions */}
                <div className="space-y-2">
                  <span className="block text-[10px] text-stone-400 font-bold">نماذج مقترحة للتغيير السريع:</span>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    <button
                      onClick={() => setTempThinkingLogo('')}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-[10px] font-bold py-1 px-2.5 rounded-lg transition-all cursor-pointer"
                    >
                      الشعار الافتراضي (مؤسسي)
                    </button>
                    <button
                      onClick={() => setTempThinkingLogo('https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=120&h=120&fit=crop')}
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold py-1 px-2.5 rounded-lg transition-all cursor-pointer"
                    >
                      الدرع الذهبي للتنمية 🛡️
                    </button>
                    <button
                      onClick={() => setTempThinkingLogo('https://images.unsplash.com/photo-1448375240586-882707db888b?w=120&h=120&fit=crop')}
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold py-1 px-2.5 rounded-lg transition-all cursor-pointer"
                    >
                      نماء وازدهار (شجرة) 🌳
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200 pt-4 text-right">
              <p className="text-[10px] text-stone-400 font-light">
                بمجرد النقر على زر الحفظ، سيتم تحديث الشعارات والهوية البصرية في ترويسة الموقع وكامل صفحات المنصة وتخزينها محلياً لضمان بقائها.
              </p>
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => {
                    setWarathLogo(tempWarathLogo);
                    setThinkingLogo(tempThinkingLogo);
                    setShowBrandingSuccess(true);
                    setTimeout(() => setShowBrandingSuccess(false), 4000);
                  }}
                  className="bg-primary hover:bg-primary/95 text-accent font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>حفظ الهوية والشعارات الجديدة</span>
                </button>
              </div>
            </div>

            {showBrandingSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs font-bold text-center"
              >
                🎉 تم تحديث شعار "ورث أجيال" وشعار "مؤسسة التفكير والنماء" بنجاح وتطبيق الهوية البصرية الجديدة في كافة أنحاء المنصة!
              </motion.div>
            )}
          </div>
        )}

        {/* 6. 🎁 PACKAGES & MEMBERSHIP MANAGEMENT TAB (DYNAMIC CRUD) */}
        {adminSubTab === 'packages' && (
          <div className="space-y-6 text-right dir-rtl" id="admin-packages-management">
            {/* Header & Stats Banner */}
            <div className="bg-gradient-to-r from-[#0B3A60] via-[#0D4470] to-[#0B3A60] text-white p-5 rounded-2xl border border-white/10 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shadow-inner">
                  <Gift className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-white">إدارة الباقات والعضويات الرقمية 🎁</h3>
                  <p className="text-xs text-stone-200 mt-0.5">
                    التحكم الكامل في إضافة، تعديل، إخفاء، أو تخصيص باقات المنصة وتفعيل التعديلات فورياً لكافة المستخدمين بدون تعديل الكود.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleResetPkgsDefault}
                  className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded-xl border border-white/15 transition-all cursor-pointer flex items-center gap-1.5"
                  title="إعادة ضبط القائمة الافتراضية"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
                  <span>استعادة الافتراضي</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenCreatePkg}
                  className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>إضافة باقة جديدة ➕</span>
                </button>
              </div>
            </div>

            {/* Stats Breakdown Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl text-right">
                <span className="text-[11px] text-stone-500 font-bold block">إجمالي الباقات</span>
                <span className="text-lg font-black text-[#0B3A60]">{packagesList.length} باقة</span>
              </div>
              <div className="bg-emerald-50/60 border border-emerald-200 p-3.5 rounded-xl text-right">
                <span className="text-[11px] text-emerald-700 font-bold block">الباقات النشطة 🟢</span>
                <span className="text-lg font-black text-emerald-800">
                  {packagesList.filter(p => p.status !== 'hidden').length} باقة
                </span>
              </div>
              <div className="bg-red-50/60 border border-red-200 p-3.5 rounded-xl text-right">
                <span className="text-[11px] text-red-700 font-bold block">الباقات المخفية 🔴</span>
                <span className="text-lg font-black text-red-800">
                  {packagesList.filter(p => p.status === 'hidden').length} باقة
                </span>
              </div>
              <div className="bg-amber-50/60 border border-amber-200 p-3.5 rounded-xl text-right">
                <span className="text-[11px] text-amber-800 font-bold block">الأكثر اختياراً ⭐</span>
                <span className="text-lg font-black text-amber-900">
                  {packagesList.filter(p => p.isPopular).length} باقة
                </span>
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stone-200 shadow-xs">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setPkgCategoryFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                    pkgCategoryFilter === 'all'
                      ? 'bg-[#0B3A60] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  الكل ({packagesList.length})
                </button>
                <button
                  type="button"
                  onClick={() => setPkgCategoryFilter('productive_family')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                    pkgCategoryFilter === 'productive_family'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                  }`}
                >
                  👩‍🍳 الأسر المنتجة ({packagesList.filter(p => p.categoryId === 'productive_family').length})
                </button>
                <button
                  type="button"
                  onClick={() => setPkgCategoryFilter('pilgrim')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                    pkgCategoryFilter === 'pilgrim'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  🕋 المعتمر ({packagesList.filter(p => p.categoryId === 'pilgrim').length})
                </button>
                <button
                  type="button"
                  onClick={() => setPkgCategoryFilter('visitor')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                    pkgCategoryFilter === 'visitor'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200'
                  }`}
                >
                  🕌 الزائر ({packagesList.filter(p => p.categoryId === 'visitor').length})
                </button>
                <button
                  type="button"
                  onClick={() => setPkgCategoryFilter('individual')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                    pkgCategoryFilter === 'individual'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200'
                  }`}
                >
                  👤 الفرد ({packagesList.filter(p => p.categoryId === 'individual').length})
                </button>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-stone-400 absolute right-3 top-2.5" />
                <input
                  type="text"
                  placeholder="بحث باسم الباقة..."
                  value={pkgSearchTerm}
                  onChange={(e) => setPkgSearchTerm(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pr-9 pl-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:bg-white focus:border-[#0B3A60]"
                />
              </div>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {packagesList
                .filter(pkg => {
                  const matchesCat = pkgCategoryFilter === 'all' || pkg.categoryId === pkgCategoryFilter;
                  const matchesSearch = !pkgSearchTerm.trim() || 
                    pkg.name.toLowerCase().includes(pkgSearchTerm.toLowerCase()) || 
                    pkg.shortDescription.toLowerCase().includes(pkgSearchTerm.toLowerCase());
                  return matchesCat && matchesSearch;
                })
                .map((pkg) => {
                  const getCategoryLabel = (catId: string) => {
                    switch (catId) {
                      case 'productive_family': return { label: 'أسرة منتجة', icon: '👩‍🍳', color: 'bg-amber-100 text-amber-900 border-amber-300' };
                      case 'pilgrim': return { label: 'معتمر', icon: '🕋', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
                      case 'visitor': return { label: 'زائر', icon: '🕌', color: 'bg-blue-100 text-blue-900 border-blue-300' };
                      default: return { label: 'فرد', icon: '👤', color: 'bg-purple-100 text-purple-900 border-purple-300' };
                    }
                  };
                  const catInfo = getCategoryLabel(pkg.categoryId);

                  return (
                    <div
                      key={pkg.id}
                      className={`bg-white rounded-2xl p-4 border-2 flex flex-col justify-between transition-all relative shadow-xs hover:shadow-md ${
                        pkg.status === 'hidden'
                          ? 'border-stone-300 bg-stone-50/60 opacity-80'
                          : pkg.isPopular
                          ? 'border-amber-500/80 bg-white'
                          : 'border-stone-200 bg-white'
                      }`}
                    >
                      {/* Top Badges */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${catInfo.color}`}>
                            <span>{catInfo.icon}</span>
                            <span>{catInfo.label}</span>
                          </span>

                          <div className="flex items-center gap-1">
                            {pkg.isPopular && (
                              <span className="bg-amber-500 text-stone-950 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                                <Star className="w-2.5 h-2.5 fill-stone-950" />
                                <span>الأكثر اختياراً</span>
                              </span>
                            )}
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                              pkg.status === 'hidden'
                                ? 'bg-red-100 text-red-800 border-red-300'
                                : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            }`}>
                              {pkg.status === 'hidden' ? '🔴 مخفية' : '🟢 نشطة'}
                            </span>
                          </div>
                        </div>

                        {/* Title & Badge */}
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-sm text-stone-900">{pkg.name}</h4>
                          {pkg.badge && (
                            <span className="inline-block text-[10px] font-extrabold bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md">
                              {pkg.badge}
                            </span>
                          )}
                          <p className="text-xs text-stone-600 line-clamp-2 mt-1">
                            {pkg.shortDescription}
                          </p>
                        </div>

                        {/* Price Display */}
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 mt-3 text-center">
                          <span className="text-base font-black text-[#0B3A60]">{pkg.price}</span>
                          {pkg.period && (
                            <span className="text-[10px] text-stone-500 block font-bold mt-0.5">
                              المدة: {pkg.period}
                            </span>
                          )}
                        </div>

                        {/* Features Preview */}
                        <div className="mt-3 space-y-1">
                          <span className="text-[10px] font-extrabold text-stone-500 block">المزايا ({pkg.features?.length || 0}):</span>
                          <ul className="space-y-1">
                            {(pkg.features || []).slice(0, 2).map((feat, fIdx) => (
                              <li key={fIdx} className="text-[11px] text-stone-700 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                                <span className="truncate">{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditPkg(pkg)}
                          className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold py-1.5 px-2 rounded-xl border border-stone-300 transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-stone-600" />
                          <span>تعديل</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleTogglePkgStatus(pkg.id)}
                          className={`flex-1 text-xs font-bold py-1.5 px-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            pkg.status === 'hidden'
                              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                          }`}
                          title={pkg.status === 'hidden' ? 'إظهار الباقة' : 'إخفاء الباقة'}
                        >
                          {pkg.status === 'hidden' ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-emerald-700" />
                              <span>إظهار</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-amber-800" />
                              <span>إخفاء</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeletePkg(pkg.id)}
                          className="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 flex items-center justify-center border border-red-200 transition-all cursor-pointer"
                          title="حذف الباقة نهائياً"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* CREATE / EDIT PACKAGE OVERLAY MODAL */}
            <AnimatePresence>
              {isPkgModalOpen && (
                <div className="fixed inset-0 bg-stone-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full p-5 sm:p-6 text-right dir-rtl space-y-4 my-auto max-h-[90vh] overflow-y-auto"
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                          <Gift className="w-5 h-5 text-amber-700" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-base text-stone-900">
                            {editingPkgId ? 'تعديل بيانات الباقة ✏️' : 'إضافة باقة جديدة للمنصة ➕'}
                          </h3>
                          <p className="text-xs text-stone-500 font-medium">
                            أدخل معلومات الباقة بدقة لتظهر فوراً بداخل منظومة العضويات والرحلة الذكية.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsPkgModalOpen(false)}
                        className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Form Controls */}
                    <form onSubmit={handleSavePackageSubmit} className="space-y-4 text-xs">
                      {/* Target Category & Status Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-extrabold text-stone-800 mb-1">
                            الفئة المستهدفة <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={pkgFormCategoryId}
                            onChange={(e) => setPkgFormCategoryId(e.target.value as any)}
                            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-[#0B3A60]"
                          >
                            <option value="productive_family">👩‍🍳 أسرة منتجة (دعم وتمكين حرفي)</option>
                            <option value="pilgrim">🕋 معتمر (ضيافة وجبات وتوصيل فندقي)</option>
                            <option value="visitor">🕌 زائر (استكشاف وتجارب حية)</option>
                            <option value="individual">👤 فرد (عضوية ومجتمع تنموي)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-extrabold text-stone-800 mb-1">
                            حالة الباقة للنشر
                          </label>
                          <select
                            value={pkgFormStatus}
                            onChange={(e) => setPkgFormStatus(e.target.value as any)}
                            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-[#0B3A60]"
                          >
                            <option value="active">🟢 نشطة وبارزة للعملاء</option>
                            <option value="hidden">🔴 مخفية مؤقتاً من القائمة</option>
                          </select>
                        </div>
                      </div>

                      {/* Package Name & Badge */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-extrabold text-stone-800 mb-1">
                            اسم الباقة <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="مثال: باقة النماء والتوسع..."
                            value={pkgFormName}
                            onChange={(e) => setPkgFormName(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-[#0B3A60]"
                          />
                        </div>

                        <div>
                          <label className="block font-extrabold text-stone-800 mb-1">
                            الشارة المميزة (Badge)
                          </label>
                          <input
                            type="text"
                            placeholder="مثال: مجانية 100%، الأكثر طلباً، مُدعمة..."
                            value={pkgFormBadge}
                            onChange={(e) => setPkgFormBadge(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-[#0B3A60]"
                          />
                        </div>
                      </div>

                      {/* Price, Period, Is Popular */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-amber-50/50 p-3 rounded-2xl border border-amber-200">
                        <div>
                          <label className="block font-extrabold text-stone-800 mb-1">
                            السعر الظاهر
                          </label>
                          <input
                            type="text"
                            placeholder="مثال: 149 ر.س أو مجاناً"
                            value={pkgFormPrice}
                            onChange={(e) => setPkgFormPrice(e.target.value)}
                            className="w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs text-stone-900"
                          />
                        </div>

                        <div>
                          <label className="block font-extrabold text-stone-800 mb-1">
                            المدة / الصلاحية
                          </label>
                          <input
                            type="text"
                            placeholder="مثال: شهرياً، سنوياً، دائم"
                            value={pkgFormPeriod}
                            onChange={(e) => setPkgFormPeriod(e.target.value)}
                            className="w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs text-stone-900"
                          />
                        </div>

                        <div className="flex items-center gap-2 pt-5">
                          <input
                            type="checkbox"
                            id="isPopularCheck"
                            checked={pkgFormIsPopular}
                            onChange={(e) => setPkgFormIsPopular(e.target.checked)}
                            className="w-4 h-4 text-amber-600 rounded cursor-pointer"
                          />
                          <label htmlFor="isPopularCheck" className="font-extrabold text-stone-800 cursor-pointer">
                            علامة "الأكثر اختياراً" ⭐
                          </label>
                        </div>
                      </div>

                      {/* Short Description */}
                      <div>
                        <label className="block font-extrabold text-stone-800 mb-1">
                          الوصف المختصر (يظهر في كرت الباقة)
                        </label>
                        <textarea
                          rows={2}
                          placeholder="اكتب وصفاً معبراً ومختصراً عن هدف الباقة وفائدتها..."
                          value={pkgFormShortDesc}
                          onChange={(e) => setPkgFormShortDesc(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-[#0B3A60]"
                        />
                      </div>

                      {/* Features List */}
                      <div>
                        <label className="block font-extrabold text-stone-800 mb-1">
                          المزايا والخدمات الرئيسية (اكتب كل ميزة في سطر جديد)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="ميزة 1&#10;ميزة 2&#10;ميزة 3"
                          value={pkgFormFeatures}
                          onChange={(e) => setPkgFormFeatures(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-mono"
                        />
                      </div>

                      {/* Detailed Description */}
                      <div>
                        <label className="block font-extrabold text-stone-800 mb-1">
                          الوصف التفصيلي الشامل (يظهر في نافذة التفاصيل)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="توضيح كامل عن جميع جوانب الباقة وكيفية الاستفادة منها..."
                          value={pkgFormDetailedDesc}
                          onChange={(e) => setPkgFormDetailedDesc(e.target.value)}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
                        />
                      </div>

                      {/* Included Services & Terms */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-extrabold text-stone-800 mb-1">
                            الخدمات المشمولة (سطر لكل خدمة)
                          </label>
                          <textarea
                            rows={2}
                            placeholder="خدمة 1&#10;خدمة 2"
                            value={pkgFormServices}
                            onChange={(e) => setPkgFormServices(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
                          />
                        </div>

                        <div>
                          <label className="block font-extrabold text-stone-800 mb-1">
                            الشروط والتوجيهات (سطر لكل شرط)
                          </label>
                          <textarea
                            rows={2}
                            placeholder="شرط 1&#10;شرط 2"
                            value={pkgFormTerms}
                            onChange={(e) => setPkgFormTerms(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900"
                          />
                        </div>
                      </div>

                      {/* Modal Actions */}
                      <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => setIsPkgModalOpen(false)}
                          className="px-4 py-2.5 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition-all cursor-pointer"
                        >
                          إلغاء
                        </button>
                        <button
                          type="submit"
                          className="bg-[#0B3A60] hover:bg-[#0B3A60]/90 text-white px-6 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>حفظ الباقة وتأكيد النشر</span>
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* 8. 📧 EMAIL LOGS & USERS EMAIL MANAGEMENT TAB (SECTION 10) */}
        {adminSubTab === 'emails' && (
          <div className="space-y-8 text-right dir-rtl">
            {/* Success Alert */}
            {adminEmailMsg && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs font-bold text-center">
                ✅ {adminEmailMsg}
              </div>
            )}

            {/* Part 1: Users Account Email Table */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-stone-200 pb-3">
                <div>
                  <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>بيانات البريد الإلكتروني والحسابات المسجلة (Section 10)</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">
                    متابعة حالة توثيق البريد وتواريخ تسجيل الدخول مع إمكانية تعديل البريد إداريًا حسب الصلاحية.
                  </p>
                </div>
                <span className="bg-primary/10 text-primary text-xs font-black px-3 py-1 rounded-full border border-primary/20">
                  {adminUserAccounts.length} حساب مسجّل
                </span>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
                      <tr>
                        <th className="p-4">اسم المستخدم / الحساب</th>
                        <th className="p-4">البريد الإلكتروني</th>
                        <th className="p-4 text-center">حالة التحقق</th>
                        <th className="p-4 text-center">تاريخ التحقق</th>
                        <th className="p-4 text-center">آخر تسجيل دخول</th>
                        <th className="p-4 text-center">الإجراء الإداري</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-700">
                      {adminUserAccounts.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-stone-400">لا يوجد حسابات متوفرة في النظام حتى الآن.</td>
                        </tr>
                      ) : (
                        adminUserAccounts.map((account) => (
                          <tr key={account.id} className="hover:bg-stone-50/50 transition-colors">
                            <td className="p-4">
                              <div className="font-extrabold text-stone-900">{account.name || account.username}</div>
                              <div className="text-[10px] text-stone-400 font-mono">ID: {account.id} | دور: {account.role}</div>
                            </td>
                            <td className="p-4 font-mono font-bold text-primary" dir="ltr">
                              {account.email}
                            </td>
                            <td className="p-4 text-center">
                              {account.isEmailVerified ? (
                                <span className="bg-emerald-100 text-emerald-800 font-black px-2.5 py-0.5 rounded-full text-[10px] border border-emerald-300">
                                  ✅ البريد موثق
                                </span>
                              ) : (
                                <span className="bg-amber-100 text-amber-900 font-black px-2.5 py-0.5 rounded-full text-[10px] border border-amber-300">
                                  ⚠️ قيد التوثيق
                                </span>
                              )}
                            </td>
                            <td className="p-4 text-center font-mono text-stone-500">
                              {account.emailVerifiedAt ? new Date(account.emailVerifiedAt).toLocaleDateString('ar-SA') : 'غير محدد'}
                            </td>
                            <td className="p-4 text-center font-mono text-stone-500">
                              {account.lastLoginAt ? new Date(account.lastLoginAt).toLocaleString('ar-SA') : 'غير محدد'}
                            </td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => {
                                  setEditingUserAccount(account);
                                  setEditingNewEmail(account.email);
                                }}
                                className="bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold px-3 py-1.5 rounded-lg text-[11px] border border-stone-300 transition-all cursor-pointer flex items-center gap-1 mx-auto"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-stone-600" />
                                <span>تغيير البريد إداريًا</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Admin Edit User Email Overlay */}
            {editingUserAccount && (
              <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-md w-full p-6 text-right space-y-4">
                  <h4 className="font-extrabold text-base text-stone-900">
                    تعديل البريد الإلكتروني للمستخدم: {editingUserAccount.name || editingUserAccount.username}
                  </h4>
                  <p className="text-xs text-stone-500">
                    تغيير البريد إدارياً سيسمح للمستخدم بالدخول بهذا البريد وتلقي استعادة كلمة المرور مباشرة.
                  </p>

                  <form onSubmit={handleAdminUpdateUserEmail} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-800 mb-1">البريد الإلكتروني الجديد *</label>
                      <input
                        type="email"
                        required
                        value={editingNewEmail}
                        onChange={(e) => setEditingNewEmail(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-left font-mono"
                        dir="ltr"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => setEditingUserAccount(null)}
                        className="bg-stone-100 text-stone-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-stone-200 cursor-pointer"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="bg-primary text-accent px-5 py-2 rounded-xl text-xs font-black hover:bg-primary/95 cursor-pointer shadow-md"
                      >
                        حفظ وتحديث البريد
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Part 2: Sent Email Logs Table */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-stone-200 pb-3">
                <div>
                  <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-emerald-600" />
                    <span>سجل إشعارات البريد الإلكتروني المرسلة (Email Dispatches Log)</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium mt-0.5">
                    عرض كافة رسائل البريد التفاعلية والتأكيدات المرسلة مع حالة التسليم (تم / فشل).
                  </p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full border border-emerald-300">
                  {adminEmailLogs.length} رسالة بريدية
                </span>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
                      <tr>
                        <th className="p-4">نوع الإشعار / العنوان</th>
                        <th className="p-4">المستلم (إلى)</th>
                        <th className="p-4 text-center">التاريخ والوقت</th>
                        <th className="p-4 text-center">حالة الإرسال</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 text-stone-700">
                      {adminEmailLogs.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center py-8 text-stone-400">لا يوجد سجلات رسائل مرسلة حتى الآن.</td>
                        </tr>
                      ) : (
                        adminEmailLogs.map((log) => (
                          <tr key={log.id} className="hover:bg-stone-50/50 transition-colors">
                            <td className="p-4">
                              <div className="font-extrabold text-stone-900">{log.subject}</div>
                              <div className="text-[10px] text-stone-400 font-mono">ID: {log.id} | نوع: {log.type}</div>
                            </td>
                            <td className="p-4 font-mono font-bold text-stone-800" dir="ltr">
                              {log.to}
                            </td>
                            <td className="p-4 text-center font-mono text-stone-500">
                              {new Date(log.timestamp).toLocaleString('ar-SA')}
                            </td>
                            <td className="p-4 text-center">
                              {log.status === 'sent' || log.status === 'delivered' ? (
                                <span className="bg-emerald-100 text-emerald-800 font-black px-2.5 py-0.5 rounded-full text-[10px] border border-emerald-300">
                                  تم الإرسال ✓
                                </span>
                              ) : (
                                <span className="bg-red-100 text-red-800 font-black px-2.5 py-0.5 rounded-full text-[10px] border border-red-300">
                                  فشل الإرسال ❌
                                </span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. INFRASTRUCTURE & HIGH CONCURRENCY TAB */}
        {adminSubTab === 'infra' && (
          <SystemInfrastructurePanel />
        )}

      </div>
    </div>
  );
}
