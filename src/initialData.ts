import { ChallengeItem, ImpactStats, BeneficiaryProfile, SubscriptionState } from './types';

export const INITIAL_CHALLENGES: ChallengeItem[] = [
  {
    id: '1',
    domain: 'hospitality',
    domainLabel: 'الضيافة العربية',
    beneficiaryName: 'أم نورة',
    beneficiaryStory: 'تقدم خدمات تنظيم الضيافة الشعبية والقهوة السعودية الأصيلة في المناسبات والمجالس النسائية.',
    challenges: [
      'صعوبة الوصول لعملاء جدد بسبب ضعف التسويق والاعتماد على المعارف فقط.',
      'عدم وجود ملف مهني أو صور احترافية لعرض جودة وتناسق ضيافتها.',
      'عشوائية في تحديد التكاليف وحساب أسعار الباقات والخدمات مما يؤدي لضعف الأرباح.'
    ],
    successIndicators: [
      'هوية رقمية مكتملة وباقات ضيافة احترافية معلنة بأسعار مدروسة.',
      'عقود تشغيل مستمرة مع شركات تنظيم المؤتمرات والفعاليات الكبرى.',
      'زيادة بنسبة 180% في الطلبات والمبيعات مع إدارة مالية منضبطة ومستدامة.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: '2',
    domain: 'culinary',
    domainLabel: 'فنون الطهي',
    beneficiaryName: 'أبو فهد (مطبخ الكرم)',
    beneficiaryStory: 'شيف منزلي مبدع ومتميز في طهي المأكولات التراثية ووجبات الولائم الشعبية بطعم أصيل ومميز.',
    challenges: [
      'عدم الالتزام بمعايير اتساق النكهات وحساب المكونات بدقة لغياب المقاييس الموحدة.',
      'صعوبة في توصيل الوجبات ساخنة وفي الموعد لغياب الربط مع شركات توصيل موثوقة.',
      'ضعف في تسويق قائمة الأطعمة اليومية والاعتماد الكلي على الطلبات العشوائية.'
    ],
    successIndicators: [
      'تأسيس علامة تجارية محلية مسجلة وكتيب وصفات معياري موحد لجميع المأكولات.',
      'الاشتراك في باقة المتجر الاحترافية والربط الآلي مع خدمات التوصيل السريع.',
      'الوصول لأكثر من 500 زائر ومعتمر يومياً من خلال باقات الأطعمة الذكية المخصصة.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: '3',
    domain: 'crafts',
    domainLabel: 'الحرف اليدوية',
    beneficiaryName: 'سارة العتيبي',
    beneficiaryStory: 'حرفية ماهرة تصنع منسوجات السدو وحقائب وهدايا تذكارية تجمع بين التراث والحداثة.',
    challenges: [
      'ضعف جودة وصياغة المواد البصرية والصور وتغليف المنتجات مما يقلل قيمتها التجارية.',
      'صعوبة في تسعير القطع اليدوية التي تستغرق وقتاً طويلاً لحساب الجهد الشخصي.',
      'عدم فهم كيفية إنشاء متجر رقمي لعرض الأعمال وتسويقها للمؤسسات والجهات الحكومية.'
    ],
    successIndicators: [
      'تغليف ابتكاري فاخر وصور فوتوغرافية تبرز أدق تفاصيل السدو التراثي المتقن.',
      'توفير منتجات وتذكارات للوفود والوزارات والهيئات السياحية في المملكة.',
      'التحول من عمل فردي متقطع إلى خط إنتاج منظم ومربح يحقق دخلاً مستداماً.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: '4',
    domain: 'home_products',
    domainLabel: 'المنتجات المنزلية',
    beneficiaryName: 'أم أحمد (البخور والروائح)',
    beneficiaryStory: 'متخصصة في صناعة وخلط البخور الدوسري الفاخر والروائح العطرية والرشوش المنزلية المميزة.',
    challenges: [
      'افتقاد المشروع للهيكل القانوني والتصاريح والملف المهني الذي يتيح لها المشاركة في المعارض.',
      'تغليف تقليدي لا يمنع تسرب الروائح أو يحمي العبوات الزجاجية من الكسر أثناء الشحن.',
      'غياب خدمة العملاء المنظمة والرد الآلي مما يسبب ضياع الكثير من الصفقات والعملاء.'
    ],
    successIndicators: [
      'الحصول على شهادة الجاهزية والملف المهني المعتمد والمشاركة في معارض وطنية.',
      'تصميم خط تغليف فاخر وعازل للروائح والكسر ومناسب للشحن لجميع مناطق المملكة.',
      'توظيف الرد التلقائي وبناء خدمة عملاء ممتازة تضمن ولاء العميل بنسبة 90%.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop'
  }
];

export const INITIAL_STATS: ImpactStats = {
  totalBeneficiaries: 1240,
  qualifiedProjects: 856,
  completedCourses: 3420,
  jobOpportunities: 482,
  avgReadiness: 76,
  salesVolume: 345000,
  empoweredProjects: 215
};

export const INITIAL_PROFILE: BeneficiaryProfile = {
  name: '',
  phone: '',
  email: '',
  projectName: '',
  projectType: 'culinary',
  description: '',
  skills: [],
  experience: '',
  achievements: [],
  products: [],
  imageUrl: '',
  registered: false
};

export const INITIAL_SUBSCRIPTION: SubscriptionState = {
  storePackage: 'none',
  pilgrimPackage: 'none'
};

export interface HeritageProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  categoryLabel: string;
  family: string;
  experience: string;
}

export const DEFAULT_PRODUCTS: HeritageProduct[] = [
  {
    id: 'prod-1',
    name: 'بخور دوسري ملكي فاخر',
    price: 120,
    description: 'بخور دوسري أصيل مجهز يدوياً بخلطات عطرية فاخرة تدوم طويلاً.',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60',
    category: 'perfumes',
    categoryLabel: 'الروائح والبخور',
    family: 'أم أحمد (البخور والروائح)',
    experience: 'أكثر من ١٠ سنوات'
  },
  {
    id: 'prod-2',
    name: 'حقيبة سدو تراثية منسوجة يدوياً',
    price: 250,
    description: 'حقيبة مصنوعة من الصوف الطبيعي المنقوش بنقوش السدو النجدية التقليدية.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=60',
    category: 'crafts',
    categoryLabel: 'الحرف اليدوية',
    family: 'سارة العتيبي (سدو نجد)',
    experience: '٥ سنوات'
  },
  {
    id: 'prod-3',
    name: 'جريش سعودي بالزبدة البلدية',
    price: 45,
    description: 'قمح مجروش مطبوخ بالحليب والسمن البري والبصل المكرمل بطعم زمان.',
    imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=500&auto=format&fit=crop&q=60',
    category: 'culinary',
    categoryLabel: 'الطهي التراثي',
    family: 'أم أحمد للطهي التراثي',
    experience: '١٢ سنة'
  },
  {
    id: 'prod-4',
    name: 'كليجا القصيم الأصلية بدبس التمر',
    price: 60,
    description: 'أقراص الكليجا الهشة المحشوة بالسكر والهيل والقرفة مع دبس التمر الفاخر.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60',
    category: 'culinary',
    categoryLabel: 'الطهي التراثي',
    family: 'فاطمة الحربي (كليجا القصيم)',
    experience: '٨ سنوات'
  },
  {
    id: 'prod-5',
    name: 'طقم فناجيل ضيافة نجدية منقوشة',
    price: 180,
    description: 'طقم فناجيل سيراميك فاخر منقوش يدوياً بنقوش تراثية لتقديم القهوة السعودية.',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60',
    category: 'hospitality',
    categoryLabel: 'الضيافة العربية',
    family: 'عبدالرحمن الدوسري (مجلس نجد)',
    experience: '٦ سنوات'
  },
  {
    id: 'prod-6',
    name: 'خلطة قهوة سعودية ملكية بالهيل والزعفران',
    price: 55,
    description: 'بن هرري فاخر حمصة شقراء مخلوط بالهيل والزعفران والخلطة القصيمية السرية.',
    imageUrl: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=500&auto=format&fit=crop&q=60',
    category: 'hospitality',
    categoryLabel: 'الضيافة العربية',
    family: 'أم نورة للضيافة الشعبية',
    experience: '٤ سنوات'
  }
];
