import { PackageItem, CategoryData } from './components/PackagesModal';

export interface ExtendedPackageItem extends PackageItem {
  categoryId: 'productive_family' | 'pilgrim' | 'visitor' | 'individual';
  status: 'active' | 'inactive' | 'hidden';
  isFree?: boolean;
  periodType?: 'monthly' | 'yearly' | 'once' | 'free';
  displayOrder?: number;
  icon?: string;
}

export const INITIAL_DYNAMIC_PACKAGES: ExtendedPackageItem[] = [
  // 1. الأسرة المنتجة
  {
    id: 'pf_starter',
    categoryId: 'productive_family',
    name: 'باقة الانطلاقة الحرفية',
    badge: 'مجانية 100%',
    shortDescription: 'خطوة البداية لإنشاء متجرك الرقمي وعرض منتجاتك المباشرة لنزلاء الفنادق وزوار مكة المكرمة.',
    price: 'مجاناً',
    period: 'دائم',
    periodType: 'free',
    isFree: true,
    isPopular: false,
    status: 'active',
    displayOrder: 1,
    icon: '👩‍🍳',
    features: [
      'إنشاء متجر إلكتروني فرعي مستقل باسمك',
      'عرض حتى 5 منتجات طهي أو حرفيات تراثية',
      'ربط بوابات دفع إلكترونية ميسرة للعملاء',
      'استقبال الطلبات المباشرة والتنبيهات الفورية',
      'دعم أكاديمي وتدريبي مجاني بالتعليم الذاتي'
    ],
    detailedDescription: 'تعد باقة الانطلاقة الحرفية البوابة الأساسية والمجانية بالكامل لكل رائدة عمل حر أو طاهية حرفية ترغب في الانضمام إلى منصة إرث أجيال. تضمن لك هذه الباقة استقلالية كاملة في إدارة المنتجات واستقبال المدفوعات إلكترونياً بدون أي رسوم إعداد.',
    includedServices: [
      'متجر إلكتروني سريع متوافق مع كافة الجوالات',
      'إشعار فوري عبر النظام عند ورود أي طلب جديد',
      'إمكانية مشاركة رابط متجرك المباشر في شبكات التواصل',
      'الوصول لدورة التدريب الرقمي في منصة التعلم'
    ],
    termsAndConditions: [
      'الالتزام بمعايير الجودة والنظافة في تحضير الأطعمة',
      'تحديث حالة المنتجات والتوفر أولاً بأول'
    ]
  },
  {
    id: 'pf_gold',
    categoryId: 'productive_family',
    name: 'باقة النماء والتوسع الذهبية',
    badge: 'الأكثر طلباً ومُدعمة',
    shortDescription: 'الباقة المتكاملة للربط بمواسم مكة، الفنادق، التمويل التمكيني، وزيادة المبيعات المباشرة.',
    price: '149 ر.س',
    period: 'شهرياً',
    periodType: 'monthly',
    isFree: false,
    isPopular: true,
    status: 'active',
    displayOrder: 2,
    icon: '✨',
    features: [
      'عرض لا محدود للمنتجات التراثية والوجبات الحجازية',
      'أولوية البيع والتوريد لنزلاء الفنادق بمكة والمدينة',
      'أولوية التمويل التمكيني الخالي من الفوائد حتى 50,000 ر.س',
      'استشارات أسبوعية مباشرة مع خبراء التفكير والنماء TND',
      'تغليف ووسم تراثي معتمد مجاني للطلبات',
      'أولوية المشاركة في البازارات والمواسم'
    ],
    detailedDescription: 'تم تصميم باقة النماء الذهبية للنهوض برائدات العمل الحر المتميزات ونقلهن من نطاق البيع المحدود إلى نطاق التوسع التجاري والمؤسسي. تتيح لك الباقة الوصول المباشر لطلبات المعتمرين والزوار في فنادق مكة المكرمة.',
    includedServices: [
      'ربط مباشر مع شبكة التوصيل اللوجستي المبردة بمكة',
      'تصميم هوية بصرية ووسم تراثي خاص بمنتجاتك',
      'جلسة استشارية شهرياً مع مستشار تسويق وإدارة أعمال',
      'أولوية ترشيح المنتجات في الصفحة الرئيسية للمتجر'
    ],
    termsAndConditions: [
      'توفير شهادة صحية سارية للطهاة',
      'الالتزام بمواعيد تسليم الطلبات المحددة'
    ]
  },
  {
    id: 'pf_export',
    categoryId: 'productive_family',
    name: 'باقة الاحتراف والتصدير المكي',
    badge: 'للتميز والتوريد',
    shortDescription: 'تمكين الحرفيين المتميزين من التوريد للمهرجانات والمؤسسات الحكومية ومنافذ بيع التذكارات.',
    price: '299 ر.س',
    period: 'شهرياً',
    periodType: 'monthly',
    isFree: false,
    isPopular: false,
    status: 'active',
    displayOrder: 3,
    icon: '👑',
    features: [
      'تغطية تسويقية مخصصة بالذكاء الاصطناعي والإعلانات',
      'ربط لوجستي متكامل مع شبكات الشحن السريع للمملكة',
      'توثيق جودة معتمد واعتماد ختم "صنع في مكة"',
      'أولوية حجز منافذ البيع الحصرية بالفعاليات التراثية',
      'إدارة محاسبية وضريبية ميسرة لمتجرك'
    ],
    detailedDescription: 'تستهدف هذه الباقة الطهاة والحرفيين الذين يمتلكون طاقة إنتاجية عالية ويرغبون في التوريد بالكميات للقطاعات الفندقية والشركات والهيئات الرسمية.',
    includedServices: [
      'تصوير احترافي عالي الدقة لمنتجاتك وحرفك',
      'إعداد وتجهيز العقود والعروض التجارية نيابة عنك',
      'مدير حساب خاص لمتابعة عملياتك اليومية'
    ],
    termsAndConditions: [
      'قدرة إنتاجية مناسبة لتلبية الطلبات الكبيرة',
      'سجل حرفي أو تجاري ساري'
    ]
  },

  // 2. المعتمر
  {
    id: 'plg_hospitality',
    categoryId: 'pilgrim',
    name: 'باقة الضيافة المكية التراثية',
    badge: 'توصيل فندقي مباشر',
    shortDescription: 'وجبات ومأكولات حجازية أصيلة طازجة تُعدها رائدات العمل الحر وتصلك لمقر إقامتك بالفندق.',
    price: '85 ر.س',
    period: 'مرة واحدة',
    periodType: 'once',
    isFree: false,
    isPopular: true,
    status: 'active',
    displayOrder: 1,
    icon: '🕋',
    features: [
      'وجبة حجازية طازجة (سليق مكي، رز بليلة، معجنات مكة)',
      'توصيل مباشر وغرفي للفندق أو السكن بمركزية مكة',
      'هدايا تذكارية حرفية صغيرة من صنع رائدات مكة',
      'تطبيق تتبع الطلب بالذكاء الاصطناعي والدعم المباشر',
      'تضمين ماء زمزم مبارك غلاف تراثي'
    ],
    detailedDescription: 'احصل على طعم مكة الأصيل أثناء رحلة العمرة! تضمن لك باقة الضيافة المكية وصول وجبات شعبية حجازية طازجة مطبوخة بأيدي رائدات عمل حر مكيات معتمدات صحياً.',
    includedServices: [
      'اختيار قائمة الوجبات المفضل لك يومياً',
      'توصيل حراري مبرد حافظ للحرارة',
      'بطاقة إهداء ودعاء مخصصة المعتمر'
    ],
    termsAndConditions: [
      'الطلب قبل الموعد بـ 3 ساعات على الأقل',
      'التوصيل يغطي النطاق الفندقي لمركزية مكة المكرمة'
    ]
  },
  {
    id: 'plg_complete',
    categoryId: 'pilgrim',
    name: 'باقة المعتمر المتكاملة (ضيافة + بركة)',
    badge: 'الأكثر تكاملاً',
    shortDescription: 'تجربة ضيافة كاملة تجمع بين الوجبات المجهزة وسلة هدايا الحرفيين التراثية للعودة للوطن.',
    price: '185 ر.س',
    period: 'طوال رحلة العمرة',
    periodType: 'once',
    isFree: false,
    isPopular: false,
    status: 'active',
    displayOrder: 2,
    icon: '🎁',
    features: [
      '3 وجبات حجازية معتمدة صحياً ومتنوعة',
      'سلة هدايا حرفية تراثية (سبحة سدو، ماء زمزم، عطر ورد مكي)',
      'توصيل فندقي مجاني ومجدول حسب مواعيد صلواتك',
      'دليل تفاعلي رقمي لمعالم مكة الأثرية',
      'خصم 15% على كافة طلبات متجر إرث أجيال'
    ],
    detailedDescription: 'تجمع هذه الباقة بين الضيافة الغذائية اليومية والتذكارات التراثية المتميزة لتكون ذكرى باركة من جوار بيت الله الحرام.',
    includedServices: [
      'تغليف فاخر مخصص للسفر والهدايا',
      'جدولة الوجبات تلقائياً حسب جدول رحلتك'
    ],
    termsAndConditions: [
      'تأكيد المواعيد عبر التطبيق بعد حجز الباقة'
    ]
  },
  {
    id: 'plg_family',
    categoryId: 'pilgrim',
    name: 'باقة بركة مكة العائلية',
    badge: 'للعائلات والمجموعات',
    shortDescription: 'وجبات جماعية وسلال ضيافة فاخرة للعائلات والمجموعات المعتمرة بأسعار مناسبة.',
    price: '340 ر.س',
    period: 'تكفي 5 - 7 أفراد',
    periodType: 'once',
    isFree: false,
    isPopular: false,
    status: 'active',
    displayOrder: 3,
    icon: '👨‍👩‍👧‍👦',
    features: [
      'وجبات عائلية تكفي 5-7 أفراد من المطابخ المكية',
      'تشكيلة حلويات ومشروبات شعبية (سوبيا، حنيني، معصوب)',
      'هدايا تذكارية تراثية لكل فرد من أفراد العائلة',
      'خدمة عملاء مخصصة فورية لمتابعة احتياجات العائلة',
      'خصم 20% على طلبات المنتجات الحرفية'
    ],
    detailedDescription: 'مصممة خصيصاً للعائلات الكريمة القادمة لأداء مناسك العمرة، لتقديم أرقى مستويات الضيافة المكية الجماعية.',
    includedServices: [
      'تنسيق وجبات الإفطار أو العشاء حسب رغبة العائلة',
      'توصيل موحد للمقر السكني'
    ],
    termsAndConditions: [
      'إشعار فريق الدعم قبل 4 ساعات من موعد الوجبة'
    ]
  },

  // 3. الزائر
  {
    id: 'vis_explorer',
    categoryId: 'visitor',
    name: 'باقة مستكشف التراث المكي',
    badge: 'للزوار والسياح',
    shortDescription: 'اكتشف أصالة المأكولات المكية والحرف اليدوية أثناء زيارتك للمعالم التاريخية.',
    price: '65 ر.س',
    period: 'مرة واحدة',
    periodType: 'once',
    isFree: false,
    isPopular: false,
    status: 'active',
    displayOrder: 1,
    icon: '🕌',
    features: [
      'دليل رقمي تفاعلي لأحياء مكة التاريخية ومراكز الحرفيين',
      'خصم 15% على جميع المأكولات والمصنوعات الحرفية',
      'ضيافة خفيفة ومشروب حجازي تقليدي مجاناً',
      'تطبيق تتبع الفعاليات والبازارات التراثية المباشرة'
    ],
    detailedDescription: 'تمنحك باقة مستكشف التراث المكي فرصة خوض رحلة استكشافية ثقافية ممتعة للتراث الحجازي.',
    includedServices: [
      'خرائط تفاعلية للمزارات والمقاهي التراثية',
      'قسائم خصم فورية في متجر إرث أجيال'
    ],
    termsAndConditions: [
      'صالحة للاستخدام خلال فترة الزيارة'
    ]
  },
  {
    id: 'vis_gold',
    categoryId: 'visitor',
    name: 'باقة الزائر الذهبي (تجارب حية)',
    badge: 'تجربة حية تفاعلية',
    shortDescription: 'حضور ورش العمل التراثية وتذوق طهي رائدات العمل الحر المباشر والمشاركة الحرفية.',
    price: '195 ر.س',
    period: 'مرة واحدة',
    periodType: 'once',
    isFree: false,
    isPopular: true,
    status: 'active',
    displayOrder: 2,
    icon: '🎨',
    features: [
      'حضور ورشة عمل حية للحرف السدو أو الطهي الحجازي',
      'قسيمة شراء بقيمة 100 ر.س لمنتجات المتجر التراثي',
      'توصيل سريع للوجبات والتذكارات بمقر الإقامة',
      'دعم فني ذكي وإرشاد ثقافي على مدار 24/7'
    ],
    detailedDescription: 'عش تجربة الحرفة والتراث بنفسك! تتيح لك هذه الباقة الجلوس مع الحرفيين والحرفيات، والتعلم المباشر لصناعة المنسوجات.',
    includedServices: [
      'توفير الأدوات والمواد التراثية للورشة',
      'شهادة مشاركة وتقدير تراثية معتمدة'
    ],
    termsAndConditions: [
      'حجز موعد الورشة قبل 24 ساعة عبر التطبيق'
    ]
  },
  {
    id: 'vis_souvenir',
    categoryId: 'visitor',
    name: 'باقة صندوق المقتنيات الملكي',
    badge: 'هدايا تذكارية فاخرة',
    shortDescription: 'صندوق مقتنيات تراثية فاخرة مُصنعة يدوياً بأيدي حرفيات مكة مع توثيق الأثر التنموي.',
    price: '290 ر.س',
    period: 'مقتنيات دائمة',
    periodType: 'once',
    isFree: false,
    isPopular: false,
    status: 'active',
    displayOrder: 3,
    icon: '🏺',
    features: [
      'صندوق هدايا سدو ومصنوعات مذهبة معتمدة',
      'شهادة كفالة أثر اجتماعي لدعم رائدة عمل حر مكية',
      'تغليف فاخر وإهداء مخصص باسمك أو اسم من تحب',
      'توصيل مجاني لكافة مناطق المملكة العربية السعودية'
    ],
    detailedDescription: 'صندوق فاخر يحمل رائحة وأصالة مكة المكرمة، يحتوي على مقتنيات يدوية فريدة صُنعت بكل حب وشغف بأيدي رائدات العمل الحر.',
    includedServices: [
      'كتابة بطاقة إهداء بخط عربي فاخر',
      'شحن آمن ومؤمن للقطعة'
    ],
    termsAndConditions: [
      'مدة التجهيز والشحن من 2 إلى 4 أيام عمل'
    ]
  },

  // 4. الفرد
  {
    id: 'ind_supporter',
    categoryId: 'individual',
    name: 'باقة محب التراث (عضوية فردية)',
    badge: 'مجانية 100%',
    shortDescription: 'انضم كعضو محب للتراث ومساهم في تشجيع ودعم رائدات العمل الحر والحرفيين.',
    price: 'مجاناً',
    period: 'دائم',
    periodType: 'free',
    isFree: true,
    isPopular: false,
    status: 'active',
    displayOrder: 1,
    icon: '👤',
    features: [
      'حساب شخصي لمتابعة وشراء المنتجات التراثية',
      'إشعارات دورية بالمنتجات الطازجة والعروض المباشرة',
      'المساهمة والاطلاع على تقارير الأثر التنموي',
      'شارات دعم لرائدات العمل الحر عند الشراء'
    ],
    detailedDescription: 'عضوية مفتوحة ومجانية لكل فرد في المجتمع يرغب في تسوق المنتجات الوطنية الأصيلة والماكولات الشعبية الطازجة.',
    includedServices: [
      'تصفح كامل للمتجر وتقييم المنتجات',
      'حفظ المنتجات المفضلة'
    ]
  },
  {
    id: 'ind_pioneer',
    categoryId: 'individual',
    name: 'باقة رواد التراث (اشتراك سنوي)',
    badge: 'مميزات وخصومات دائمة',
    shortDescription: 'مميزات حصرية للمتسوقين الشغوفين بالمنتجات الحرفية الأصيلة مع خصومات وتوصيل مجاني.',
    price: '120 ر.س',
    period: 'سنوياً',
    periodType: 'yearly',
    isFree: false,
    isPopular: true,
    status: 'active',
    displayOrder: 2,
    icon: '🌟',
    features: [
      'خصم ثابت 10% على كافة طلبات المتجر والوجبات',
      'توصيل مجاني للطلبات فوق 100 ر.س',
      'دعوات خاصة لمعارض وبازارات إرث أجيال',
      'أولوية حجز القطع الحرفية النادرة المصنوعة بالطلب'
    ],
    detailedDescription: 'لأنك صديق وداعم دائم للتراث الوطني، توفر لك هذه الباقة خصومات حقيقية وتوصيل مجاني مستمر طوال العام.',
    includedServices: [
      'بطاقة عضوية رقمية خاصة بـ "رواد التراث"',
      'خدمة تسوق شخصية لتلبية الطلبات الخاصة'
    ],
    termsAndConditions: [
      'الخصم يسري على كافة منتجات المتجر بدون استثناء'
    ]
  },
  {
    id: 'ind_patron',
    categoryId: 'individual',
    name: 'باقة الراعي التنموي الفردي',
    badge: 'رعاية وكفالة أثر',
    shortDescription: 'اكفل تمكين وتدريب رائدة عمل حر واحصل على هدايا ومميزات حصرية باسمك.',
    price: '350 ر.س',
    period: 'سنوياً',
    periodType: 'yearly',
    isFree: false,
    isPopular: false,
    status: 'active',
    displayOrder: 3,
    icon: '🎖️',
    features: [
      'رعاية حاضنة وتدريب لرائدة عمل حر أو حرفية',
      'تقرير أثر تنموي شهري باسمك يوضح النمو والتوسع',
      'صندوق هدايا تراثي سنوي فاخر يُرسل لمنزلك',
      'عضوية شرفية بجميع فعاليات وملتقيات المنصة'
    ],
    detailedDescription: 'باقة الأثر المستدام! تتيح لك رعاية وتمويل البرامج التدريبية والأدوات الحرفية لرائدة عمل حر بمكة.',
    includedServices: [
      'توثيق الأثر ورسالة شكر خاصة من الرائدة المكفولة',
      'دعوة حضور حفل التخرج والتكريم السنوي'
    ],
    termsAndConditions: [
      'يتم إرسال تقرير الأثر بشكل مستمر عبر التطبيق والبريد'
    ]
  }
];

export const CATEGORY_METADATA = [
  {
    id: 'productive_family' as const,
    title: 'رائدة عمل حر',
    icon: '👩‍🍳',
    subtitle: 'حرفيين ومطابخ طاهية',
    badge: 'دعم وتمكين حرفي',
    bgGradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
    borderAccent: 'border-amber-500/30 hover:border-amber-500/60',
    iconBg: 'bg-amber-100 text-amber-900 border-amber-300'
  },
  {
    id: 'pilgrim' as const,
    title: 'معتمر',
    icon: '🕋',
    subtitle: 'ضيوف الرحمن والزوار للمشاعر المقدسة',
    badge: 'ضيافة مكية أصيلة',
    bgGradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
    borderAccent: 'border-emerald-500/30 hover:border-emerald-500/60',
    iconBg: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  },
  {
    id: 'visitor' as const,
    title: 'زائر',
    icon: '🕌',
    subtitle: 'زوار المعالم التراثية والفعاليات الثقافية',
    badge: 'استكشاف وتجارب حية',
    bgGradient: 'from-blue-500/10 via-blue-500/5 to-transparent',
    borderAccent: 'border-blue-500/30 hover:border-blue-500/60',
    iconBg: 'bg-blue-100 text-blue-900 border-blue-300'
  },
  {
    id: 'individual' as const,
    title: 'فرد',
    icon: '👤',
    subtitle: 'المواطنين والمقيمين الشغوفين بالتراث',
    badge: 'عضوية ومجتمع تنموي',
    bgGradient: 'from-purple-500/10 via-purple-500/5 to-transparent',
    borderAccent: 'border-purple-500/30 hover:border-purple-500/60',
    iconBg: 'bg-purple-100 text-purple-900 border-purple-300'
  }
];

// Helper to get stored packages from localStorage with fallback
export function getStoredPackages(): ExtendedPackageItem[] {
  try {
    const raw = localStorage.getItem('warth_dynamic_packages');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse warth_dynamic_packages from localStorage:', e);
  }
  // Initialize default
  saveStoredPackages(INITIAL_DYNAMIC_PACKAGES);
  return INITIAL_DYNAMIC_PACKAGES;
}

// Helper to save packages to localStorage and dispatch update event
export function saveStoredPackages(packages: ExtendedPackageItem[]): void {
  try {
    localStorage.setItem('warth_dynamic_packages', JSON.stringify(packages));
    window.dispatchEvent(new Event('warth-packages-updated'));
  } catch (e) {
    console.error('Failed to save warth_dynamic_packages to localStorage:', e);
  }
}

// Helper to return categories populated with active (non-hidden) packages for user display
export function getFormattedCategories(includeHidden = false): CategoryData[] {
  const allPackages = getStoredPackages();

  return CATEGORY_METADATA.map((cat) => {
    const catPackages = allPackages
      .filter((pkg) => pkg.categoryId === cat.id)
      .filter((pkg) => includeHidden || pkg.status !== 'hidden')
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    return {
      id: cat.id,
      title: cat.title,
      icon: cat.icon,
      subtitle: cat.subtitle,
      badge: cat.badge,
      bgGradient: cat.bgGradient,
      borderAccent: cat.borderAccent,
      iconBg: cat.iconBg,
      packages: catPackages
    };
  });
}
