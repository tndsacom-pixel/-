export interface SpaceItem {
  id: string;
  nameAr: string;
  nameEn: string;
  area: number;
  usageAr: string;
  usageEn: string;
  iconName: string;
}

export interface EquipmentCategory {
  id: string;
  titleAr: string;
  titleEn: string;
  iconName: string;
  itemsAr: string[];
  itemsEn: string[];
}

export interface OpExCategoryItem {
  id: string;
  nameAr: string;
  nameEn: string;
  detailAr?: string;
  detailEn?: string;
  itemsAr?: string[];
  itemsEn?: string[];
}

export interface ProjectStudyData {
  totalOperationalArea: number; // 630 m²
  spaces: SpaceItem[];
  equipmentCategories: EquipmentCategory[];
  financialMethodologyNoteAr: string;
  financialMethodologyNoteEn: string;
  capEx: {
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    itemsAr: string[];
    itemsEn: string[];
  };
  opEx: {
    titleAr: string;
    titleEn: string;
    descriptionAr: string;
    descriptionEn: string;
    maintenancePercent: number; // 5%
    depreciationPercent: number; // 10%
    categories: OpExCategoryItem[];
  };
  workingCapitalAndFunding: {
    titleAr: string;
    titleEn: string;
    workingCapitalMonthsMin: number; // 3
    workingCapitalMonthsMax: number; // 6
    workingCapitalDescAr: string;
    workingCapitalDescEn: string;
    fundingStructureDescAr: string;
    fundingStructureDescEn: string;
  };
}

export const DEFAULT_PROJECT_STUDY_DATA: ProjectStudyData = {
  totalOperationalArea: 630,
  spaces: [
    {
      id: 'training_hall',
      nameAr: 'قاعة التدريب والتأهيل',
      nameEn: 'Training & Qualification Hall',
      area: 100,
      usageAr: 'التدريب والتأهيل وتطوير مهارات رائدات العمل الحر والحرفيين.',
      usageEn: 'Training, qualification, and skill development for productive families and artisans.',
      iconName: 'GraduationCap'
    },
    {
      id: 'exhibition_sales',
      nameAr: 'مساحة العرض والبيع والتجارب',
      nameEn: 'Exhibition, Sales & Experiences Space',
      area: 150,
      usageAr: 'عرض المنتجات، البيع، استقبال الزوار وتنظيم التجارب الثقافية والتراثية.',
      usageEn: 'Product display, retail sales, welcoming visitors, and hosting cultural and heritage experiences.',
      iconName: 'ShoppingBag'
    },
    {
      id: 'kitchen_prep',
      nameAr: 'المطبخ التشغيلي والتجهيز',
      nameEn: 'Operational Kitchen & Prep Space',
      area: 150,
      usageAr: 'تجهيز المنتجات الغذائية والوجبات وتنظيم عمليات التحضير والإنتاج.',
      usageEn: 'Preparation of food products and meals, and organizing culinary processing and production.',
      iconName: 'Utensils'
    },
    {
      id: 'coworking_space',
      nameAr: 'مساحة العمل المشتركة',
      nameEn: 'Co-Working Space',
      area: 80,
      usageAr: 'مساحة للعمل والتطوير والاجتماعات واحتضان المستفيدين ورواد الأعمال.',
      usageEn: 'Collaborative workspace for business development, meetings, and incubating beneficiaries and entrepreneurs.',
      iconName: 'Users'
    },
    {
      id: 'admin_offices',
      nameAr: 'المكاتب الإدارية',
      nameEn: 'Administrative Offices',
      area: 40,
      usageAr: 'الإدارة والتشغيل والمتابعة والشؤون الإدارية.',
      usageEn: 'Executive management, operational monitoring, and administrative affairs.',
      iconName: 'Briefcase'
    },
    {
      id: 'warehouse_storage',
      nameAr: 'المستودع والتخزين',
      nameEn: 'Warehouse & Storage',
      area: 40,
      usageAr: 'تخزين المواد الخام والمنتجات والمستلزمات التشغيلية.',
      usageEn: 'Storage of raw materials, packaged goods, and operational inventory.',
      iconName: 'Package'
    },
    {
      id: 'media_studio',
      nameAr: 'الاستوديو الإعلامي',
      nameEn: 'Media & Production Studio',
      area: 30,
      usageAr: 'تصوير المنتجات والتجارب وإنتاج المحتوى الإعلامي والتسويقي.',
      usageEn: 'High-definition photography of artisanal products, filming cultural experiences, and producing marketing content.',
      iconName: 'Camera'
    },
    {
      id: 'reception_lounge',
      nameAr: 'الاستقبال والاستراحة والخدمات',
      nameEn: 'Reception, Lounge & Services',
      area: 40,
      usageAr: 'استقبال الزوار والمستفيدين وتوفير مساحة للاستراحة والخدمات المساندة.',
      usageEn: 'Welcoming visitors and beneficiaries, hospitality waiting lounge, and auxiliary support amenities.',
      iconName: 'HeartHandshake'
    }
  ],
  equipmentCategories: [
    {
      id: 'furniture_tech',
      titleAr: 'الأثاث والتقنية',
      titleEn: 'Furniture & Technology',
      iconName: 'Monitor',
      itemsAr: [
        'أثاث المكاتب.',
        'شاشات عرض ذكية.',
        'أجهزة حاسب.',
        'طابعات.',
        'أنظمة نقاط البيع (POS).'
      ],
      itemsEn: [
        'Office workstations & ergonomic furniture.',
        'Smart interactive display screens.',
        'Desktop computers & laptops.',
        'Multi-function printers & scanners.',
        'Point of Sale (POS) cloud systems.'
      ]
    },
    {
      id: 'studio_equipment',
      titleAr: 'معدات الاستوديو',
      titleEn: 'Studio Equipment',
      iconName: 'Video',
      itemsAr: [
        'كاميرات احترافية.',
        'معدات إضاءة.',
        'تجهيزات تصوير المنتجات.',
        'تجهيزات تصوير التجارب الثقافية.'
      ],
      itemsEn: [
        'Professional 4K cinema cameras.',
        'Studio softbox & LED lighting kits.',
        'Product turntable & lightbox setups.',
        'Cultural experience documentary filming gear.'
      ]
    },
    {
      id: 'kitchen_equipment',
      titleAr: 'معدات المطبخ والتجهيز',
      titleEn: 'Kitchen & Prep Equipment',
      iconName: 'UtensilsCrossed',
      itemsAr: [
        'ثلاجات تجميد وتبريد مركزية.',
        'مواقد كهربائية.',
        'أفران.',
        'خلاطات.',
        'عجانات.',
        'محطات عمل من الستانلس ستيل.',
        'معدات التعبئة والتغليف.'
      ],
      itemsEn: [
        'Central commercial freezers & cold storage units.',
        'Heavy-duty electric induction stoves.',
        'Commercial convection & stone deck ovens.',
        'Industrial culinary blenders & food processors.',
        'High-capacity dough kneaders & mixers.',
        'Hygienic stainless steel workstations.',
        'Automated food packaging & vacuum sealing machinery.'
      ]
    },
    {
      id: 'safety_storage',
      titleAr: 'معدات السلامة والتخزين',
      titleEn: 'Safety & Storage Equipment',
      iconName: 'ShieldCheck',
      itemsAr: [
        'أرفف تخزين.',
        'معدات السلامة.',
        'أنظمة ومعدات مكافحة الحريق.',
        'غسالات صحون تجارية.'
      ],
      itemsEn: [
        'Heavy-duty industrial storage shelving racks.',
        'Occupational health & personal protective safety gear.',
        'Civil Defense certified fire suppression & extinguishing systems.',
        'Commercial high-temperature sanitizing dishwashers.'
      ]
    }
  ],
  financialMethodologyNoteAr: 'ملاحظة منهجية مالية:\nلكون المشروع في مرحلة الفكرة والتأسيس، يُبنى الهيكل المالي وفق القواعد والتقديرات التالية لتعبئة نموذج منشآت القياسي.',
  financialMethodologyNoteEn: 'Financial Methodology Note:\nAs the project is in the conceptualization and foundational phase, the financial structure is established based on the following benchmarks and guidelines to fulfill the standard Monsha\'at feasibility template.',
  capEx: {
    titleAr: 'تكاليف التأسيس والرأسمالية (CapEx)',
    titleEn: 'Capital Expenditures & Foundation Costs (CapEx)',
    descriptionAr: 'تشتمل على تكاليف التجهيزات والإعداد قبل الانطلاق التشغيلي.',
    descriptionEn: 'Encompasses upfront infrastructure fit-outs, procurement, and setup expenses prior to commercial operations.',
    itemsAr: [
      'تجهيزات الديكورات والمباني.',
      'شراء الآلات والمعدات المطبخية والتقنية.',
      'مصاريف التأسيس.',
      'التراخيص.',
      'الاستشارات القانونية.',
      'التسويق الأولي.'
    ],
    itemsEn: [
      'Interior architectural decoration & facility fit-outs.',
      'Procurement of culinary machinery and technology hardware.',
      'Initial company formation & registration expenses.',
      'Government municipal licenses & regulatory compliance permits.',
      'Legal counsel, corporate structuring & advisory services.',
      'Initial pre-launch branding & go-to-market marketing campaign.'
    ]
  },
  opEx: {
    titleAr: 'التكاليف التشغيلية (OpEx)',
    titleEn: 'Operational Expenditures (OpEx)',
    descriptionAr: 'تشمل المصاريف الدورية اللازمة لضمان استمرارية وسير العمل.',
    descriptionEn: 'Recurring periodic expenditures necessary to maintain operational workflow and business continuity.',
    maintenancePercent: 5,
    depreciationPercent: 10,
    categories: [
      {
        id: 'rent',
        nameAr: 'الإيجار',
        nameEn: 'Facility Lease (Rent)',
        detailAr: 'إيجار المقر، ويُقدّر سنويًا بحسب أسعار المساحات في مكة المكرمة.',
        detailEn: 'Facility annual lease, benchmarked according to commercial space rates in Makkah Al-Mukarramah.'
      },
      {
        id: 'salaries',
        nameAr: 'الرواتب والأجور',
        nameEn: 'Salaries & Payroll',
        itemsAr: [
          'الإدارة.',
          'مدربو الحرف.',
          'طهاة الإشراف.',
          'موظفو الاستقبال.',
          'موظفو نقاط البيع.'
        ],
        itemsEn: [
          'Executive & operational management.',
          'Artisanal craft master trainers.',
          'Supervisory executive chefs.',
          'Reception & guest relations officers.',
          'Point of Sale (POS) & cashier staff.'
        ]
      },
      {
        id: 'utilities',
        nameAr: 'المنافع',
        nameEn: 'Utilities & Connectivity',
        itemsAr: [
          'الكهرباء.',
          'المياه.',
          'الإنترنت.',
          'الاتصالات.'
        ],
        itemsEn: [
          'Commercial electrical utilities.',
          'Municipal water supplies.',
          'High-speed fiber-optic internet.',
          'Telecommunications & VoIP infrastructure.'
        ]
      },
      {
        id: 'consumables',
        nameAr: 'المستهلكات والمواد الخام',
        nameEn: 'Consumables & Raw Materials',
        itemsAr: [
          'أدوات التغليف.',
          'المواد الغذائية.',
          'مستلزمات الحرف.'
        ],
        itemsEn: [
          'Sustainable branded packaging materials.',
          'Fresh food ingredients & culinary supplies.',
          'Raw materials for craft and textile manufacturing.'
        ]
      },
      {
        id: 'maintenance_depreciation',
        nameAr: 'الصيانة والإهلاك',
        nameEn: 'Maintenance & Depreciation',
        itemsAr: [
          'صيانة المعدات بنسبة تقديرية 5% سنويًا.',
          'الإهلاك الدائم للمعدات والأثاث بنسبة تقديرية 10% سنويًا.'
        ],
        itemsEn: [
          'Equipment preventative maintenance estimated at 5% annually.',
          'Perpetual straight-line depreciation for equipment and furniture estimated at 10% annually.'
        ]
      }
    ]
  },
  workingCapitalAndFunding: {
    titleAr: 'رأس المال العامل وهيكل التمويل',
    titleEn: 'Working Capital & Financing Structure',
    workingCapitalMonthsMin: 3,
    workingCapitalMonthsMax: 6,
    workingCapitalDescAr: 'تغطية التكاليف التشغيلية لفترة تأسيسية تتراوح عادة بين 3 إلى 6 أشهر، وذلك إلى حين انتظام التدفقات النقدية.',
    workingCapitalDescEn: 'Working capital reserve allocated to cover operating expenses for a foundational ramp-up period typically spanning 3 to 6 months until positive operational cash flows stabilize.',
    fundingStructureDescAr: 'يمكن أن يكون التمويل:\n• تمويلًا ذاتيًا بنسبة 100%.\nأو\n• مزيجًا من التمويل الذاتي والمنح وبرامج دعم المنشآت الواعدة والتمويل الحكومي.',
    fundingStructureDescEn: 'Financing can be structured flexibly via:\n• 100% Founder Equity / Self-Funding.\nOR\n• A balanced hybrid of equity, non-repayable empowerment grants, Monsha\'at SME accelerator programs, and government developmental concessionary loans.'
  }
};

const STORAGE_KEY = 'warath_project_study_data';

export const getProjectStudyData = (): ProjectStudyData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROJECT_STUDY_DATA;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROJECT_STUDY_DATA, ...parsed };
  } catch (err) {
    console.error('Error reading project study data:', err);
    return DEFAULT_PROJECT_STUDY_DATA;
  }
};

export const saveProjectStudyData = (data: ProjectStudyData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('warath_project_study_updated'));
  } catch (err) {
    console.error('Error saving project study data:', err);
  }
};

export const resetProjectStudyData = (): ProjectStudyData => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECT_STUDY_DATA));
    window.dispatchEvent(new Event('warath_project_study_updated'));
    return DEFAULT_PROJECT_STUDY_DATA;
  } catch (err) {
    console.error('Error resetting project study data:', err);
    return DEFAULT_PROJECT_STUDY_DATA;
  }
};
