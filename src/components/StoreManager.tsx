import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowLeftCircle, Check, Tag, Sparkles, MessageSquare, Truck, HelpCircle, Landmark, ShieldAlert, Award, Compass, Heart, Calculator, Printer, Wand2, ShieldCheck, QrCode, FileText, CheckCircle2 } from 'lucide-react';
import { BeneficiaryProfile, SubscriptionState, StorePackageId, PilgrimPackageId, Product } from '../types';

import SmartCostCalculator from './SmartCostCalculator';
import CreditScoringEngine from './CreditScoringEngine';
import OrderLabelPrintModal from './OrderLabelPrintModal';
import AiDescriptionGeneratorModal from './AiDescriptionGeneratorModal';
import MealQrCodeModal from './MealQrCodeModal';

interface StoreManagerProps {
  profile: BeneficiaryProfile;
  subscription: SubscriptionState;
  onUpdateSubscription: (updatedSub: SubscriptionState) => void;
}

export default function StoreManager({ profile, subscription, onUpdateSubscription }: StoreManagerProps) {
  const [activeTab, setActiveTab] = useState<'store_view' | 'productive_packages' | 'pilgrim_packages' | 'calculator' | 'financing'>('productive_packages');

  // Modals States
  const [isPrintLabelOpen, setIsPrintLabelOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedProductForAi, setSelectedProductForAi] = useState<string>('');
  const [hasHealthCert, setHasHealthCert] = useState<boolean>(true);

  // Auto-Deduction Loan State
  const [loanBalance, setLoanBalance] = useState(15000);
  const [totalRepaid, setTotalRepaid] = useState(3250);
  const [autoDeductionRate, setAutoDeductionRate] = useState(8); // 8% deducted per order

  
  // Suggestion 17 & 16 Local States
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [couponMsg, setCouponMsg] = useState<string>('');
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  // Suggestion 20: Digital Store Setup Checklist
  const [checklist, setChecklist] = useState([
    { id: 1, title: 'تحديث الحساب البنكي والآيبان التجاري للأسر المنتجة', completed: true },
    { id: 2, title: 'رفع وثيقة العمل الحر أو السجل التجاري المعتمد لدى بلدي', completed: true },
    { id: 3, title: 'ربط إعدادات التوصيل الجغرافي للفنادق المحيطة بمكة', completed: true },
    { id: 4, title: 'تحديد مسببات الحساسية وقائمة المكونات الصحية بدقة', completed: false },
    { id: 5, title: 'رفع الجدوى المالية لمشروعك للحصول على تمويل بدون كفيل', completed: false },
  ]);

  const handleSubscribeStore = (pkgId: StorePackageId) => {
    onUpdateSubscription({
      ...subscription,
      storePackage: pkgId,
      storeSubscriptionDate: new Date().toLocaleDateString('ar-SA')
    });
  };

  const handleSubscribePilgrim = (pkgId: PilgrimPackageId) => {
    onUpdateSubscription({
      ...subscription,
      pilgrimPackage: pkgId,
      pilgrimSubscriptionDate: new Date().toLocaleDateString('ar-SA')
    });
  };

  // Pre-configured packages details
  const storePackages = [
    {
      id: 'basic' as StorePackageId,
      name: '🔵 الباقة الأولى: البداية',
      price: '49 ريال / شهرياً',
      desc: 'مناسبة للأسر المنتجة التي تبدأ البيع وتأسيس الحضور الرقمي بسهولة.',
      features: [
        'إنشاء متجر إلكتروني متكامل داخل المنصة',
        'إضافة حتى 15 منتج في الكتالوج الموحد',
        'عرض صور ووصف المنتج بدقة',
        'استقبال وإدارة الطلبات المباشرة',
        'عرض تقييمات العملاء وآرائهم',
        'إحصائيات وتقارير بسيطة للمبيعات'
      ]
    },
    {
      id: 'growth' as StorePackageId,
      name: '🔵 الباقة الثانية: النمو',
      price: '149 ريال / شهرياً',
      desc: 'مناسبة للأسر النشطة والراغبة في زيادة الإنتاج والانتشار التسويقي.',
      features: [
        'جميع مميزات باقة البداية كاملة',
        'إضافة منتجات غير محدودة في المتجر',
        'ظهور أعلى ومميز في نتائج البحث داخل المنصة',
        'كوبونات خصم وعروض خاصة للزبائن',
        'تقارير مبيعات وسلوك العملاء المتقدمة',
        'اقتراحات الذكاء الاصطناعي لتحسين جودة المنتجات',
        'دعم فني سريع مخصص للأسر النشطة'
      ]
    },
    {
      id: 'professional' as StorePackageId,
      name: '🟣 الباقة الثالثة: الاحتراف',
      price: '299 ريال / شهرياً',
      desc: 'مناسبة للأسر الكبيرة، المطابخ المنزلية، والمصانع الحرفية الكثيفة الطلب.',
      features: [
        'جميع مميزات باقة النمو كاملة',
        'مساعد ذكاء اصطناعي ذكي لإدارة المتجر آلياً',
        'تحليل طلبات وسلوكيات الزبائن المعقدة',
        'توصيات ذكية لتعديل الأسعار والمكونات والوجبات',
        'ربط مؤتمت مباشر مع خدمات التوصيل السريع',
        'حملات تسويقية وتثبيت في بنر الصفحة الرئيسية',
        'لوحة تحكم إدارية متقدمة لحساب الأرباح والخسائر'
      ]
    }
  ];

  const pilgrimPackages = [
    {
      id: 'free' as PilgrimPackageId,
      name: 'الباقة المجانية: الأساسية',
      price: '0 ريال',
      desc: 'للزوار والمعتمرين الباحثين عن الوجبات والأطعمة المنزلية النظيفة.',
      features: [
        'إنشاء ملف شخصي للمعتمر / الزائر',
        'البحث عن الأطعمة المناسبة والأسر المنتجة',
        'مشاهدة تقييمات المنتجات والأسعار',
        'اقتراحات غذائية عامة بالذكاء الاصطناعي',
        'دليل الأطعمة المناسبة لرحلة المعتمر'
      ]
    },
    {
      id: 'silver' as PilgrimPackageId,
      name: '🔵 الباقة الفضية: الراحة',
      price: '29 ريال / أسبوع',
      desc: 'مخصصة للمعتمرين ذوي الحالات الصحية أو المتطلبات الغذائية الخاصة.',
      features: [
        'جميع مميزات الباقة المجانية كاملة',
        'توصيات ذكاء اصطناعي حسب العمر والحالة الصحية',
        'اقتراح وجبات لمرضى السكري والضغط وحساسية الغلوتين',
        'خصومات حصرية من الأسر المنتجة المشاركة',
        'حفظ الوجبات والأطباق المفضلة',
        'دعم وتصفح بلغات متعددة للوفود غير العربية'
      ]
    },
    {
      id: 'gold' as PilgrimPackageId,
      name: '🟣 الباقة الذهبية: المعتمر الذكي',
      price: '79 ريال / شهرياً',
      desc: 'التجربة المثالية لرحلة عمرة ذكية ومريحة بدون عناء تخطيط التغذية.',
      features: [
        'جميع مميزات الباقة الفضية كاملة',
        'مساعد ذكاء اصطناعي شخصي للتغذية متاح 24/7',
        'خطة غذائية يومية متكاملة أثناء أداء مناسك العمرة',
        'اقتراح أوقات تناول الوجبات بناء على جدول زياراتك',
        'أولوية مطلقة في خدمة العملاء وحجز الطلبات',
        'عروض وتخفيضات كبرى من المطاعم والطهي المنزلي'
      ]
    },
    {
      id: 'family' as PilgrimPackageId,
      name: '🟡 الباقة العائلية: رفقة',
      price: '149 ريال / شهرياً',
      desc: 'توفير التغذية الصحية والنظيفة لكافة أفراد العائلة طوال الرحلة.',
      features: [
        'تغطية اشتراك لـ حتى 5 أفراد من العائلة',
        'ملفات صحية وغذائية متعددة لكل فرد على حدة',
        'اقتراح وجبات مناسبة لاحتياج كل فرد اليومي',
        'إدارة الطلبات والدفع العائلي الموحد بسهولة',
        'عروض وتوصيات جماعية لتقليل ميزانية الأكل'
      ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto my-4 bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden" id="store-manager-card">
      
      {/* Suggestion 19: Live Order Ticker Simulation */}
      <div className="bg-amber-50 border-b border-amber-100 py-1.5 px-4 text-center overflow-hidden whitespace-nowrap text-[10px] text-stone-600 font-medium" id="order-ticker">
        <div className="inline-block animate-marquee" style={{ animationDuration: '30s', animationIterationCount: 'infinite', animationTimingFunction: 'linear' }}>
          ✨ <span className="font-bold text-primary">نشاط مباشر الأسر المنتجة بمكة:</span> أم أحمد تلقت طلباً بقيمة <span className="font-bold text-primary">120 ر.س</span> من وفد ماليزي بفندق أنوار المدينة • أم يوسف شحنت <span className="font-bold text-primary">4 علب بخور دوسري</span> لوفد عماني بفندق فيرمونت • نورة العتيبي أكدت توصيل <span className="font-bold text-primary">بوفيه الضيافة الملكية</span> لمجموعة حجاج كويتيين • مريم الحربي استلمت تقييم <span className="font-bold text-accent">5 نجوم</span> على كبسة اللحم الحاشي الحساوية! ✨
        </div>
      </div>

      {/* Tab Select Banner */}
      <div className="bg-primary text-stone-100 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-200" id="store-banner">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-accent" />
          <div>
            <h2 className="text-xl font-bold">باقات المتاجر والتسويق الرقمي</h2>
            <p className="text-stone-300 text-xs mt-0.5">اختر الباقة المناسبة لمشروعك، أو تصفح متجرك الإلكتروني، واطلع على باقات الزوار والمعتمرين الذكية.</p>
          </div>
        </div>

        <div className="flex flex-wrap bg-white/10 p-1 rounded-xl border border-white/10 gap-1" id="store-tab-selector">
          <button
            onClick={() => setActiveTab('productive_packages')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'productive_packages' ? 'bg-accent text-primary' : 'text-stone-200 hover:text-white'
            }`}
          >
            باقات الأسر المنتجة
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === 'calculator' ? 'bg-amber-400 text-stone-900' : 'text-stone-200 hover:text-white'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>حاسبة الأرباح الذكية</span>
          </button>
          <button
            onClick={() => setActiveTab('financing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              activeTab === 'financing' ? 'bg-emerald-400 text-stone-950' : 'text-stone-200 hover:text-white'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>الجدارة والسداد الآلي</span>
          </button>
          <button
            onClick={() => setActiveTab('pilgrim_packages')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'pilgrim_packages' ? 'bg-accent text-primary' : 'text-stone-200 hover:text-white'
            }`}
          >
            باقات المعتمرين
          </button>
          <button
            onClick={() => setActiveTab('store_view')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'store_view' ? 'bg-accent text-primary' : 'text-stone-200 hover:text-white'
            }`}
          >
            معاينة المتجر المباشر
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8">
        
        {activeTab === 'productive_packages' && (
          /* PRODUCTIVE FAMILIES SUBSCRIPTION PACKAGES */
          <div className="space-y-6" id="prod-packages">
            
            {/* Suggestion 17: Coupon Code Field with Interactive Simulator */}
            <div className="bg-amber-50/50 border border-amber-200/60 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-right">
              <div className="space-y-1">
                <h4 className="font-bold text-stone-800 text-xs flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-primary" />
                  <span>هل تمتلك كود خصم ترويجي أو رمز يوم التأسيس؟</span>
                </h4>
                <p className="text-[10px] text-stone-500 font-light">
                  اكتب الكود الفعال لتخفيض أسعار جميع الباقات التسويقية والزوار بنسبة <span className="font-bold text-primary">15% فوراً!</span>
                </p>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="مثال: WARTH أو FOUNDING"
                  className="bg-white px-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none uppercase w-full sm:w-44 font-mono text-center"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (couponCode === 'WARTH' || couponCode === 'FOUNDING') {
                      setDiscountApplied(true);
                      setDiscountRate(0.15);
                      setCouponMsg('✓ تم تطبيق كود الخصم الترويجي بنجاح! تم تخفيض 15% من قيمة الاشتراك.');
                    } else {
                      setDiscountApplied(false);
                      setDiscountRate(0);
                      setCouponMsg('❌ عذراً، كود الخصم هذا غير صالح أو انتهت صلاحيته.');
                    }
                  }}
                  className="bg-primary hover:bg-primary/95 text-accent text-xs font-bold px-4 py-2 rounded-xl transition-all whitespace-nowrap shadow-xs"
                >
                  تطبيق الكود
                </button>
              </div>
            </div>

            {couponMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-xl text-center text-xs font-bold ${discountApplied ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-rose-50 text-rose-800 border border-rose-100'}`}
              >
                {couponMsg}
              </motion.div>
            )}

            <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-stone-800 text-sm">الباقات الرقمية لتمكين المتاجر المنزلية</h3>
                <p className="text-stone-500 text-xs mt-0.5">رسوم اشتراك بسيطة تدفع شهرياً لتمويل استضافة متجرك ودعم خدمات التغليف والتسويق للمنتجات.</p>
              </div>
              <div className="text-xs">
                <span>اشتراكك الحالي:</span>
                <span className="font-black text-primary bg-primary/5 px-2 py-0.5 rounded-full mr-1.5">
                  {subscription.storePackage === 'none' ? 'لا يوجد اشتراك نشط' : 
                   subscription.storePackage === 'basic' ? 'باقة البداية' :
                   subscription.storePackage === 'growth' ? 'باقة النمو' : 'باقة الاحتراف 👑'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="prod-packages-grid">
              {storePackages.map((pkg) => {
                const isCurrent = subscription.storePackage === pkg.id;
                const originalPriceNum = pkg.id === 'basic' ? 49 : pkg.id === 'growth' ? 149 : 299;
                const finalPrice = discountApplied ? Math.round(originalPriceNum * 0.85) : originalPriceNum;
                
                return (
                  <div
                    key={pkg.id}
                    className={`bg-white border rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                      isCurrent 
                        ? 'border-2 border-primary shadow-lg scale-[1.01]' 
                        : 'border-stone-200 shadow-sm hover:border-primary/30'
                    }`}
                  >
                    {isCurrent && (
                      <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-accent px-3 py-1 rounded-full text-[10px] font-bold border border-accent/20">
                        باقة متجرك الحالية
                      </span>
                    )}

                    <div className="space-y-4">
                      <div className="border-b border-stone-100 pb-4 text-right">
                        <h4 className="font-bold text-stone-800 text-base md:text-lg">{pkg.name}</h4>
                        <div className="mt-2">
                          {discountApplied ? (
                            <div className="flex items-center gap-2">
                              <span className="text-primary text-xl font-black font-mono">{finalPrice} ريال</span>
                              <span className="text-stone-400 text-xs line-through font-mono">{originalPriceNum} ريال</span>
                              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">حسم 15%</span>
                            </div>
                          ) : (
                            <span className="text-primary text-xl font-black font-mono">{pkg.price}</span>
                          )}
                        </div>
                        <p className="text-stone-500 text-xs mt-1.5 font-light leading-relaxed">{pkg.desc}</p>
                      </div>

                      <div className="space-y-2 text-right">
                        <h5 className="font-bold text-stone-700 text-xs">مزايا ومواصفات الباقة:</h5>
                        <ul className="space-y-2">
                          {pkg.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2 text-stone-600 text-xs leading-relaxed">
                              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-stone-100">
                      <button
                        onClick={() => handleSubscribeStore(pkg.id)}
                        className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                          isCurrent
                            ? 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15'
                            : 'bg-primary text-accent hover:bg-primary/95 shadow-md'
                        }`}
                      >
                        {isCurrent ? 'تجديد الاشتراك الحالي' : 'الاشتراك وتفعيل الباقة'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Suggestion 18: Premium Package Comparison Matrix Table */}
            <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-4 text-right">
              <div className="space-y-1">
                <span className="text-[10px] bg-primary/10 text-primary font-bold px-2.5 py-0.5 rounded-full border border-primary/10 inline-block">الشفافية الكاملة</span>
                <h4 className="font-extrabold text-stone-800 text-xs md:text-sm">جدول المقارنة التفصيلي لباقات المتاجر</h4>
                <p className="text-stone-500 text-[10px] font-light">قارن المميزات الإدارية والتسويقية واللوجستية المتقدمة لجميع الباقات لتحديد خطة نموك.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-100/80">
                      <th className="p-3 font-bold text-stone-700">الخاصية والميزة</th>
                      <th className="p-3 font-bold text-stone-700 text-center">باقة البداية (49 ر.س)</th>
                      <th className="p-3 font-bold text-stone-700 text-center">باقة النمو (149 ر.س)</th>
                      <th className="p-3 font-bold text-stone-700 text-center bg-primary/5">باقة الاحتراف 👑 (299 ر.س)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-stone-100 hover:bg-stone-100/30">
                      <td className="p-3 font-medium text-stone-800">حد إدراج المنتجات</td>
                      <td className="p-3 text-center text-stone-600">حتى 15 منتج</td>
                      <td className="p-3 text-center text-stone-600">غير محدود</td>
                      <td className="p-3 text-center font-bold text-primary bg-primary/5">غير محدود + إدارة ذكية</td>
                    </tr>
                    <tr className="border-b border-stone-100 hover:bg-stone-100/30">
                      <td className="p-3 font-medium text-stone-800">مساعد الذكاء الاصطناعي (AI)</td>
                      <td className="p-3 text-center text-stone-400">❌ غير متوفر</td>
                      <td className="p-3 text-center text-stone-600">اقتراحات تحسين بسيطة</td>
                      <td className="p-3 text-center font-bold text-emerald-700 bg-primary/5">✓ توليد ذكي وأتمتة 24/7</td>
                    </tr>
                    <tr className="border-b border-stone-100 hover:bg-stone-100/30">
                      <td className="p-3 font-medium text-stone-800">الربط اللوجستي (توصيل تلقائي)</td>
                      <td className="p-3 text-center text-stone-400">❌ إدخال يدوي</td>
                      <td className="p-3 text-center text-stone-600">توصيل يدوي مخفض</td>
                      <td className="p-3 text-center font-bold text-emerald-700 bg-primary/5">✓ ربط فوري آلي مع السائقين</td>
                    </tr>
                    <tr className="border-b border-stone-100 hover:bg-stone-100/30">
                      <td className="p-3 font-medium text-stone-800">الأولوية التسويقية بالفنادق</td>
                      <td className="p-3 text-center text-stone-400">❌ عادية</td>
                      <td className="p-3 text-center text-stone-600">متوسطة (ظهور بحث)</td>
                      <td className="p-3 text-center font-bold text-primary bg-primary/5">✓ تثبيت مميز بصفحة المعتمرين</td>
                    </tr>
                    <tr className="border-b border-stone-100 hover:bg-stone-100/30">
                      <td className="p-3 font-medium text-stone-800">شعار "مطبخ موثق" الفخم</td>
                      <td className="p-3 text-center text-stone-600">✓ بعد الفحص</td>
                      <td className="p-3 text-center text-stone-600">✓ مع جولات تفتيش</td>
                      <td className="p-3 text-center font-bold text-emerald-700 bg-primary/5">✓ وسم مميز "مطبخ ذهبي"</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'pilgrim_packages' && (
          /* PILGRIMS AND VISITORS SMART FOOD PACKAGES */
          <div className="space-y-6" id="pilgrim-packages">
            <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-stone-800 text-sm">باقات المعتمرين والزوار للتغذية الذكية</h3>
                <p className="text-stone-500 text-xs mt-0.5">باقات مخصصة تتيح لضيوف الرحمن طلب مأكولات شعبية صحية ومحكومة الجودة وموصلة لمكان إقامتهم مباشرة.</p>
              </div>
              <div className="text-xs">
                <span>الاشتراك المختار:</span>
                <span className="font-black text-primary bg-primary/5 px-2 py-0.5 rounded-full mr-1.5">
                  {subscription.pilgrimPackage === 'none' ? 'لا يوجد باقة مفعّلة' : 
                   subscription.pilgrimPackage === 'free' ? 'الباقة المجانية' :
                   subscription.pilgrimPackage === 'silver' ? 'الباقة الفضية' :
                   subscription.pilgrimPackage === 'gold' ? 'الباقة الذهبية 🌟' : 'الباقة العائلية رفقة 👨‍👩‍👧‍👦'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" id="pilgrim-packages-grid">
              {pilgrimPackages.map((pkg) => {
                const isCurrent = subscription.pilgrimPackage === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    className={`bg-white border rounded-2xl p-5 flex flex-col justify-between transition-all relative ${
                      isCurrent 
                        ? 'border-2 border-primary shadow-lg scale-[1.01]' 
                        : 'border-stone-200 shadow-sm hover:border-primary/30'
                    }`}
                  >
                    {isCurrent && (
                      <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent text-primary px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-primary/10">
                        مفعلة لرحلتك
                      </span>
                    )}

                    <div className="space-y-4">
                      <div className="border-b border-stone-100 pb-3">
                        <h4 className="font-bold text-stone-800 text-xs md:text-sm leading-tight">{pkg.name}</h4>
                        <p className="text-primary text-lg font-black mt-1.5 font-mono">{pkg.price}</p>
                        <p className="text-stone-500 text-[11px] mt-1 leading-relaxed font-light">{pkg.desc}</p>
                      </div>

                      <div className="space-y-1.5">
                        <h5 className="font-bold text-stone-700 text-[10px]">مزايا الباقة:</h5>
                        <ul className="space-y-1.5">
                          {pkg.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-1.5 text-stone-600 text-[10px] leading-relaxed">
                              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6 pt-3 border-t border-stone-100">
                      <button
                        onClick={() => handleSubscribePilgrim(pkg.id)}
                        className={`w-full py-2 rounded-xl text-[10px] font-bold transition-all ${
                          isCurrent
                            ? 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15'
                            : 'bg-primary text-accent hover:bg-primary/95'
                        }`}
                      >
                        {isCurrent ? 'نشط الآن' : 'تفعيل باقة المعتمر'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: SMART COST & PROFIT CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <SmartCostCalculator onApplyPrice={(suggestedPrice) => {
              console.log('Applied suggested price:', suggestedPrice);
            }} />
          </div>
        )}

        {/* TAB 5: FINANCING & ALTERNATIVE SCORING */}
        {activeTab === 'financing' && (
          <div className="space-y-6">
            <CreditScoringEngine 
              completedCoursesCount={4} 
              totalCoursesCount={5} 
              hasHealthCertificate={hasHealthCert} 
              orderFulfillmentRate={98}
              customerRating={4.9}
            />

            {/* Auto Deduction & Loan Repayment Card */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm space-y-6 text-right">
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-50 rounded-2xl text-amber-700">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#0B3A60] text-base md:text-lg">
                      آلية السداد الآلي من المبيعات (Auto-Deduction Repayment Mechanism)
                    </h3>
                    <p className="text-stone-500 text-xs">
                      اقتطاع تلقائي ميسر بنسبة %8 من قيمة كل طلب مبيعات مكتمل لسداد القسط التمويلي آلياً.
                    </p>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                  السداد الآلي نشط 🟢
                </span>
              </div>

              {/* Loan Progress Meter */}
              <div className="space-y-2 bg-stone-50 p-5 rounded-2.5xl border border-stone-200">
                <div className="flex justify-between items-center text-xs font-bold font-mono">
                  <span className="text-stone-700">إجمالي القسط التمويلي المسدد:</span>
                  <span className="text-emerald-700">{totalRepaid.toLocaleString('ar-SA')} من {loanBalance.toLocaleString('ar-SA')} ر.س</span>
                </div>

                <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 to-amber-500 rounded-full"
                    style={{ width: `${(totalRepaid / loanBalance) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-stone-500 font-mono pt-1">
                  <span>المستقطع لكل طلب: {autoDeductionRate}%</span>
                  <span>المتبقي: {(loanBalance - totalRepaid).toLocaleString('ar-SA')} ر.س</span>
                </div>
              </div>

              {/* Health Certificate status & upload option */}
              <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h4 className="font-extrabold text-xs text-emerald-950">الشهادة الصحية (بلدي) والتوثيق الرسمي:</h4>
                    <p className="text-[11px] text-emerald-800 font-light">حسابك موثق بشهادة صحية معتمدة سارية المفعول حتى 2027/02/15.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setHasHealthCert(!hasHealthCert)}
                  className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  {hasHealthCert ? 'تحديث الشهادة الصحية 📄' : 'رفع الشهادة الصحية'}
                </button>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'store_view' && (
          /* BENEFICIARY LIVE STORE PREVIEW */
          <div className="space-y-6 text-right" id="live-store-preview">
            
            {/* Health & Print Label Actions Bar */}
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2.5xl flex flex-col sm:flex-row items-center justify-between gap-3 text-right">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <div>
                  <h4 className="font-black text-xs text-amber-950">أدوات الطباعة وإدارة وجبات المتجر:</h4>
                  <p className="text-[11px] text-stone-600 font-light">طباعة الملصق بضغطة واحدة مع رمز الـ QR وتوليد وصف الوجبات بالذكاء الاصطناعي.</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPrintLabelOpen(true)}
                  className="bg-[#003B6F] hover:bg-[#002D54] text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4 text-amber-300" />
                  <span>طباعة ملصق الوجبة (Label)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Wand2 className="w-4 h-4 text-stone-900" />
                  <span>وصف الذكاء الاصطناعي ✨</span>
                </button>
              </div>
            </div>
            <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-stone-800 text-sm md:text-base">معاينة متجر: {profile.projectName || 'اسم مشروعك'}</h3>
                <p className="text-stone-500 text-xs mt-1">هذه هي الواجهة العامة لمتجرك الموحد كما يراها العملاء والزوار والمعتمرون لطلب منتجاتك.</p>
              </div>
              <div className="flex items-center gap-1 bg-primary text-accent text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                <Compass className="w-4 h-4 animate-spin" />
                <span>متجر معتمد ونشط</span>
              </div>
            </div>

            {/* Suggestion 20: Digital Store Setup Checklist Stepper */}
            <div className="bg-amber-50/40 border border-amber-200/60 p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">📋</span>
                <div>
                  <h4 className="font-extrabold text-stone-800 text-xs md:text-sm">دليل إعداد المتجر الإلكتروني وجاهزية التمويل بدون كفيل</h4>
                  <p className="text-stone-500 text-[10px] font-light">أكمل الخطوات التالية لتفعيل متجرك بالكامل واستيفاء معايير الجدارة الائتمانية لدى المانحين والشركاء.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2">
                {checklist.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => {
                      // Toggle completed state on click to make it interactive!
                      setChecklist(checklist.map(c => c.id === step.id ? { ...c, completed: !c.completed } : c));
                    }}
                    className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between h-24 ${
                      step.completed 
                        ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800' 
                        : 'bg-white border-stone-200 text-stone-600 hover:border-primary/30'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-mono text-xs font-black">خطوة {step.id}</span>
                      <span className="text-xs">{step.completed ? '✅ مكتمل' : '⏳ قيد الإجراء'}</span>
                    </div>
                    <p className="text-[10px] font-medium leading-snug mt-1.5">{step.title}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Profile banner inside store preview */}
            <div className="bg-primary text-stone-100 p-6 md:p-8 rounded-2xl border border-stone-200 relative overflow-hidden flex flex-col sm:flex-row items-center gap-5">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 flex items-center justify-center flex-shrink-0 border-2 border-accent">
                {profile.imageUrl ? (
                  <img src={profile.imageUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <ShoppingBag className="w-8 h-8 text-accent" />
                )}
              </div>
              <div className="text-center sm:text-right space-y-1">
                <span className="text-[10px] font-bold text-accent bg-white/10 px-2 py-0.5 rounded-full">
                  {profile.projectType === 'hospitality' ? 'الضيافة والقهوة السعودية' :
                   profile.projectType === 'culinary' ? 'طهي المأكولات التراثية' :
                   profile.projectType === 'crafts' ? 'الحرف اليدوية المتقنة' : 'المنتجات المنزلية والبخور'}
                </span>
                <h4 className="text-lg font-bold">{profile.projectName || 'متجر الأسر المنتجة'}</h4>
                <p className="text-stone-300 text-xs font-light max-w-xl">{profile.description || 'لم يتم ملء وصف للمشروع بعد. يرجى التوجه لإنشاء الملف الرقمي.'}</p>
              </div>
            </div>

            {/* Product Grid showcase */}
            <div className="space-y-4">
              <h4 className="font-bold text-stone-800 text-sm md:text-base flex items-center gap-2">
                <Tag className="w-5 h-5 text-accent" />
                <span>منتجات وكتالوج المتجر المتاح للطلب</span>
              </h4>

              {profile.products.length === 0 ? (
                <div className="text-center py-16 bg-stone-50 border border-dashed border-stone-200 rounded-2xl text-stone-400 text-xs">
                  لم تقم بإضافة منتجات لكتالوجك الرقمي بعد.<br />
                  <span className="text-primary font-semibold mt-1 inline-block">توجه لـ "إنشاء الملف الرقمي" وأضف أولى منتجاتك لتظهر هنا!</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" id="store-products-grid">
                  {profile.products.map((prod) => {
                    const isHovered = hoveredProductId === prod.id;
                    return (
                      <div 
                        key={prod.id} 
                        className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between"
                        onMouseEnter={() => setHoveredProductId(prod.id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                      >
                        {/* Suggestion 16: Interactive Product Image Magnifier */}
                        <div className="relative h-44 overflow-hidden bg-stone-100 cursor-zoom-in">
                          <img 
                            src={prod.imageUrl} 
                            alt={prod.name} 
                            className={`w-full h-full object-cover transition-all duration-500 ${
                              isHovered ? 'scale-125 rotate-1' : 'scale-100'
                            }`} 
                            referrerPolicy="no-referrer" 
                          />
                          <span className="absolute top-2 right-2 bg-primary text-accent text-[9px] font-bold px-2 py-0.5 rounded-full z-10">
                            {prod.category}
                          </span>
                          
                          {isHovered && (
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center text-center p-2 text-white transition-all">
                              <div className="space-y-1">
                                <span className="text-xl">🔍</span>
                                <span className="text-[10px] font-black bg-primary/90 text-accent px-2 py-0.5 rounded-full block">تكبير ذكي فائق الجودة للوفود</span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                          <div>
                            <h5 className="font-bold text-stone-800 text-sm md:text-base leading-snug">{prod.name}</h5>
                            <p className="text-stone-500 text-[11px] leading-relaxed font-light">{prod.description}</p>
                          </div>

                          <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-3">
                            <span className="text-primary font-black text-xs md:text-sm font-mono">{prod.price} ر.س</span>
                            <button className="bg-stone-100 hover:bg-primary/5 text-stone-700 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1">
                              <ShoppingBag className="w-3.5 h-3.5 text-accent" />
                              <span>طلب سريع</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Simulated Reviews */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
              <h5 className="font-bold text-stone-800 text-xs md:text-sm">آخر آراء وتجرب عملاء المتجر والزوار</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-xl border border-stone-100 space-y-1.5 shadow-xs">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-stone-800">أحمد بن محمد (معتمر من الكويت)</span>
                    <span className="text-accent">★★★★★</span>
                  </div>
                  <p className="text-stone-500 text-[10px] md:text-xs leading-relaxed font-light">"الوجبات لذيذة وتصل ساخنة وفي الموعد، نشكر الأسر المنتجة على هذا المجهود والنظافة والتغليف الرائع!"</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-stone-100 space-y-1.5 shadow-xs">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-stone-800">موضي العتيبي</span>
                    <span className="text-accent">★★★★★</span>
                  </div>
                  <p className="text-stone-500 text-[10px] md:text-xs leading-relaxed font-light">"القهوة السعودية ممتازة وخلطة البخور الدوسري رائعة جداً، التغليف يثبت أنهم مدربين باحتراف."</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* MODALS */}
      {isPrintLabelOpen && (
        <OrderLabelPrintModal 
          familyName={profile.projectName || 'أسرة أم أحمد الحجازية'}
          onClose={() => setIsPrintLabelOpen(false)}
        />
      )}

      {isAiModalOpen && (
        <AiDescriptionGeneratorModal 
          initialTitle="وجبة كابلي باللحم الضاني والزعفران"
          onApplyDescription={(generatedDesc) => {
            console.log('Generated AI Description:', generatedDesc);
          }}
          onClose={() => setIsAiModalOpen(false)}
        />
      )}

      {isQrModalOpen && (
        <MealQrCodeModal 
          familyName={profile.projectName || 'أسرة أم أحمد الحجازية'}
          onClose={() => setIsQrModalOpen(false)}
        />
      )}

    </div>
  );
}
