import { 
  ApplicantProfile, 
  AppointmentSlot, 
  AppointmentBooking, 
  DocumentItem, 
  TrainingModule, 
  LMSQuizQuestion, 
  GoldenGuaranteeCertificate, 
  ProgramNotification,
  DocumentReviewStatus,
  JourneyStageNumber,
  ActivityType
} from '../types/goldenGuaranteeTypes';

const STORAGE_APPLICANT_KEY = 'warath_applicant_profile';
const STORAGE_SLOTS_KEY = 'warath_appointment_slots';
const STORAGE_BOOKINGS_KEY = 'warath_appointment_bookings';
const STORAGE_CERTIFICATES_KEY = 'warath_golden_certificates';
const STORAGE_NOTIFICATIONS_KEY = 'warath_program_notifications';
const STORAGE_ALL_APPLICANTS_KEY = 'warath_all_applicants_list';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INITIAL DEFAULT DOCUMENT ITEMS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const INITIAL_REQUIRED_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-national-id',
    type: 'national_id',
    titleAr: 'الهوية الوطنية',
    titleEn: 'National ID',
    descriptionAr: 'صورة واضحة للهوية الوطنية سارية المفعول (للمواطنين والمواطنات).',
    descriptionEn: 'Clear copy of valid Saudi National ID (Citizens).',
    isRequired: true,
    status: 'pending'
  },
  {
    id: 'doc-freelance-license',
    type: 'freelance_license',
    titleAr: 'وثيقة العمل الحر',
    titleEn: 'Freelance License',
    descriptionAr: 'وثيقة العمل الحر سارية المفعول الصادرة من وزارة الموارد البشرية.',
    descriptionEn: 'Valid Freelance Certificate from the Ministry of Human Resources.',
    isRequired: true,
    status: 'pending'
  },
  {
    id: 'doc-health-cert',
    type: 'health_cert',
    titleAr: 'الشهادة الصحية',
    titleEn: 'Health Certificate',
    descriptionAr: 'شهادة صحية سارية من مركز طبي معتمد (إلزامية للأنشطة الغذائية والطهي فقط).',
    descriptionEn: 'Valid medical health card (Mandatory for food & culinary activities only).',
    isRequired: true,
    requiresFoodActivityOnly: true,
    status: 'pending'
  },
  {
    id: 'doc-bank-iban',
    type: 'bank_iban',
    titleAr: 'البيانات البنكية (شهادة الآيبان IBAN)',
    titleEn: 'Bank Account / IBAN Certificate',
    descriptionAr: 'شهادة رسمية مطبوعة برقم الحساب البنكي التجاري والآيبان المعتمد.',
    descriptionEn: 'Official bank letter or certificate showing validated commercial IBAN.',
    isRequired: true,
    status: 'pending'
  },
  {
    id: 'doc-national-address',
    type: 'national_address',
    titleAr: 'العنوان الوطني المعتمد',
    titleEn: 'National Address Proof',
    descriptionAr: 'إثبات العنوان الوطني المسجل في البريد السعودي سبل.',
    descriptionEn: 'Saudi Post SPL official National Address registration proof.',
    isRequired: true,
    status: 'pending'
  },
  {
    id: 'doc-agreement',
    type: 'agreement',
    titleAr: 'اتفاقية التمكين والالتزام (إرث أجيال)',
    titleEn: 'Erth Ajyal Program & Governance Agreement',
    descriptionAr: 'وثيقة الالتزام بمعايير الجودة والتوريد والامتثال الضيافي التراثي.',
    descriptionEn: 'Binding agreement on heritage quality standards, hospitality ethics, and operational compliance.',
    isRequired: true,
    status: 'pending'
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INITIAL DEFAULT APPOINTMENT SLOTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const INITIAL_APPOINTMENT_SLOTS: AppointmentSlot[] = [
  {
    id: 'slot-1',
    date: '2026-08-23',
    dayNameAr: 'الأحد',
    dayNameEn: 'Sunday',
    timeSlot: '10:00 AM - 10:45 AM',
    timeSlotAr: '10:00 صباحاً - 10:45 صباحاً',
    timeSlotEn: '10:00 AM - 10:45 AM',
    type: 'virtual',
    available: true,
    maxCapacity: 5,
    bookedCount: 2,
    consultantNameAr: 'أ. عبد الله الحازمي (مستشار التفكير والنماء)',
    consultantNameEn: 'Abdullah Al-Hazmi (TND Senior Consultant)'
  },
  {
    id: 'slot-2',
    date: '2026-08-23',
    dayNameAr: 'الأحد',
    dayNameEn: 'Sunday',
    timeSlot: '04:00 PM - 04:45 PM',
    timeSlotAr: '04:00 عصراً - 04:45 عصراً',
    timeSlotEn: '04:00 PM - 04:45 PM',
    type: 'virtual',
    available: true,
    maxCapacity: 5,
    bookedCount: 1,
    consultantNameAr: 'د. ريما الشريف (مستشارة الجودة والضيافة)',
    consultantNameEn: 'Dr. Reema Al-Sharif (Hospitality Advisor)'
  },
  {
    id: 'slot-3',
    date: '2026-08-24',
    dayNameAr: 'الإثنين',
    dayNameEn: 'Monday',
    timeSlot: '11:00 AM - 11:45 AM',
    timeSlotAr: '11:00 صباحاً - 11:45 صباحاً',
    timeSlotEn: '11:00 AM - 11:45 AM',
    type: 'virtual',
    available: true,
    maxCapacity: 5,
    bookedCount: 3,
    consultantNameAr: 'أ. فهد الغامدي (خبير سلاسل الإمداد)',
    consultantNameEn: 'Fahad Al-Ghamdi (Supply Chain Expert)'
  },
  {
    id: 'slot-4',
    date: '2026-08-25',
    dayNameAr: 'الثلاثاء',
    dayNameEn: 'Tuesday',
    timeSlot: '05:00 PM - 05:45 PM',
    timeSlotAr: '05:00 عصراً - 05:45 عصراً',
    timeSlotEn: '05:00 PM - 05:45 PM',
    type: 'virtual',
    available: true,
    maxCapacity: 5,
    bookedCount: 0,
    consultantNameAr: 'أ. سارة البار (مستشارة الحرف والموروث)',
    consultantNameEn: 'Sarah Al-Bar (Heritage & Crafts Specialist)'
  },
  {
    id: 'slot-5',
    date: '2026-08-26',
    dayNameAr: 'الأربعاء',
    dayNameEn: 'Wednesday',
    timeSlot: '01:00 PM - 01:45 PM',
    timeSlotAr: '01:00 ظهراً - 01:45 ظهراً',
    timeSlotEn: '01:00 PM - 01:45 PM',
    type: 'in_person',
    locationAr: 'مركز إرث أجيال للتدريب - مكة المكرمة',
    locationEn: 'Erth Ajyal Training Hub - Makkah Al-Mukarramah',
    available: true,
    maxCapacity: 8,
    bookedCount: 4,
    consultantNameAr: 'فريق الاستشارات الإدارية المشتركة',
    consultantNameEn: 'Joint Advisory Committee'
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INITIAL DEFAULT TRAINING MODULES (LMS)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const INITIAL_TRAINING_MODULES: TrainingModule[] = [
  {
    id: 'mod-1',
    titleAr: 'المعيار الذهبي للسلامة الغذائية والصحة المهنية',
    titleEn: 'The Golden Standard for Food Safety & Hygiene',
    descriptionAr: 'معايير النظافة والتعقيم وإجراءات الحفظ السليم وسلاسل التبريد المتوافقة مع اشتراطات هيئة الغذاء والدواء والبلديات.',
    descriptionEn: 'HACCP-aligned sanitary benchmarks, storage protocols, and cold chain preservation meeting SFDA and municipal regulations.',
    totalDurationMinutes: 25,
    instructorAr: 'د. خالد السقاف',
    instructorEn: 'Dr. Khaled Al-Saqqaf',
    instructorTitleAr: 'استشاري سلامة الأغذية والصحة العامة',
    instructorTitleEn: 'Food Safety & Public Health Consultant',
    lessons: [
      {
        id: 'les-1-1',
        titleAr: 'مبادئ السلامة في إعداد وتجهيز الوجبات المكية',
        titleEn: 'Safety Principles in Traditional Makkah Meal Preparation',
        durationMinutes: 10,
        summaryAr: 'فصل الأطعمة النيئة عن المطهية، والتحكم الصارم في درجات الحرارة والتعقيم.',
        summaryEn: 'Segregation of raw and cooked items, strict temperature regulation, and equipment sanitization.',
        videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        keyPointsAr: [
          'الالتزام بغسل اليدين والقفازات وغطاء الرأس أثناء كافة مراحل التحضير.',
          'حفظ الأطعمة الساخنة فوق 60° مئوية والمبردة تحت 4° مئوية.',
          'التعقيم اليومي المستمر لأسطح الستانلس ستيل.'
        ],
        keyPointsEn: [
          'Wearing gloves, hairnets, and constant hand sanitation.',
          'Maintaining hot food above 60°C and cold storage below 4°C.',
          'Daily chemical sanitization of stainless steel workstations.'
        ]
      },
      {
        id: 'les-1-2',
        titleAr: 'التغليف الصحي وعزل مسببات الحساسية',
        titleEn: 'Hygienic Packaging & Allergen Segregation',
        durationMinutes: 15,
        summaryAr: 'استخدام أوعية تغليف مخصصة صديقة للبيئة مع وضع ملصق المكونات ومسببات الحساسية.',
        summaryEn: 'Employing eco-friendly food grade containers with mandatory allergen and nutritional labeling.',
        videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        keyPointsAr: [
          'كتابة تاريخ وساعة الإعداد وفترة الصلاحية بشكل واضح.',
          'توضيح المكسرات أو منتجات الألبان أو الغلوتين في الملصق التعريفي.',
          'إحكام إغلاق العبوات بأختام أمان لا تقبل الفتح قبل الوصول للمعتمر.'
        ],
        keyPointsEn: [
          'Clear timestamps for preparation and best-before duration.',
          'Highlighting nuts, dairy, or gluten on tamper-evident labels.',
          'Tamper-evident seals on every single meal box.'
        ]
      }
    ],
    downloadableMaterials: [
      {
        titleAr: 'دليل اشتراطات السلامة الغذائية للأسر المنتجة (PDF)',
        titleEn: 'Food Safety Guidelines Handbook for Productive Families (PDF)',
        size: '2.4 MB',
        fileType: 'PDF',
        url: '#'
      },
      {
        titleAr: 'قائمة التدقيق اليومية للنظافة الشخصية والمطبخ (Checklist)',
        titleEn: 'Daily Kitchen & Personal Hygiene Audit Checklist',
        size: '1.1 MB',
        fileType: 'PDF',
        url: '#'
      }
    ]
  },
  {
    id: 'mod-2',
    titleAr: 'فنون الضيافة السعودية وإثراء تجربة ضيوف الرحمن',
    titleEn: 'Saudi Hospitality Protocols & Pilgrim Experience Enrichment',
    descriptionAr: 'أساليب تقديم القهوة السعودية، الترحيب بالوفود، سرد القصص التراثية المرتبطة بكل طبق وحرفة، وحسن الاستقبال.',
    descriptionEn: 'Traditional Saudi coffee etiquette, welcoming protocols, storytelling heritage narratives, and cultural hospitality.',
    totalDurationMinutes: 20,
    instructorAr: 'أ. هتون البكري',
    instructorEn: 'Hatoon Al-Bakri',
    instructorTitleAr: 'خبيرة البروتوكول والضيافة التراثية',
    instructorTitleEn: 'Heritage Hospitality & Protocol Specialist',
    lessons: [
      {
        id: 'les-2-1',
        titleAr: 'سرد قصة المنتج والموروث الحجازي',
        titleEn: 'Heritage Storytelling & Hijazi Culinary Heritage',
        durationMinutes: 10,
        summaryAr: 'كيف تروي لضيوف الرحمن أصل الطبق أو الحرفة وقيمتها الوجدانية والتاريخية.',
        summaryEn: 'How to narrate the cultural origin and emotional significance of each dish or craft.',
        videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        keyPointsAr: [
          'الترحيب بعبارات الحفاوة المكية الأصيلة.',
          'شرح سر الخلطات التراثية والبهارات الحجازية بأسلوب مشوق.',
          'الابتسامة والجاهزية العالية للخدمة بروح الضيافة الوطنية.'
        ],
        keyPointsEn: [
          'Warm traditional Makkah greetings.',
          'Explaining the spice blends and heritage craft traditions.',
          'Professional warmth and dedication to pilgrim hospitality.'
        ]
      },
      {
        id: 'les-2-2',
        titleAr: 'معايير تقديم الهدايا والقطع الحرفية التذكارية',
        titleEn: 'Presenting Heritage Keepsakes & Souvenir Packaging',
        durationMinutes: 10,
        summaryAr: 'طرق تغليف التحف والمنسوجات والسبح بتغليف عالي الفخامة يحمل بطاقة تعريفية وهوية إرث أجيال.',
        summaryEn: 'Packaging artisanal textiles, prayer beads, and keepsakes with bespoke luxury branding.',
        videoEmbedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        keyPointsAr: [
          'إرفاق بطاقة تحمل اسم الحرفي/رائدة العمل ورقم الاعتماد.',
          'استخدام العبوات ذات الطابع التراثي الفاخر.'
        ],
        keyPointsEn: [
          'Attaching artisan identification card and accreditation serial.',
          'Using luxury heritage gift boxes.'
        ]
      }
    ],
    downloadableMaterials: [
      {
        titleAr: 'دليل بروتوكول الضيافة السعودية والترحيب بالمعتمرين (PDF)',
        titleEn: 'Saudi Hospitality & Pilgrim Welcome Protocol Guide (PDF)',
        size: '3.1 MB',
        fileType: 'PDF',
        url: '#'
      }
    ]
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INITIAL QUIZ QUESTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const INITIAL_LMS_QUIZ: LMSQuizQuestion[] = [
  {
    id: 'q1',
    questionAr: 'ما هي درجة الحرارة الواجب حفظ الأطعمة الساخنة عندها لضمان سلامتها حتى وصولها للمعتمر؟',
    questionEn: 'What is the required storage temperature for hot cooked meals to ensure microbiological safety?',
    optionsAr: [
      'فوق 60 درجة مئوية.',
      'بين 20 و 30 درجة مئوية.',
      'تحت 10 درجات مئوية.',
      'لا تشترط درجة حرارة محددة.'
    ],
    optionsEn: [
      'Above 60 degrees Celsius.',
      'Between 20 and 30 degrees Celsius.',
      'Below 10 degrees Celsius.',
      'No specific temperature required.'
    ],
    correctOptionIndex: 0,
    explanationAr: 'يجب حفظ الأطعمة الساخنة دائماً فوق 60° مئوية لمنع تكاثر البكتيريا والحفاظ على طزاجة الوجبة.',
    explanationEn: 'Hot meals must remain above 60°C to prevent bacterial growth and maintain food safety.'
  },
  {
    id: 'q2',
    questionAr: 'ما هو الإجراء الإلزامي عند تغليف وتجهيز المنتجات الغذائية المحتوية على مسببات حساسية كالمكسرات والسمسم؟',
    questionEn: 'What is the mandatory procedure when packaging food containing known allergens (nuts, sesame)?',
    optionsAr: [
      'إخفاء المكونات للحفاظ على سرية الوصفة.',
      'توضيح مسببات الحساسية بشكل بارز على الملصق التعريفي للعبوة.',
      'إبلاغ العميل شفهياً فقط دون ملصق.',
      'لا يلزم توضيح مسببات الحساسية.'
    ],
    optionsEn: [
      'Hide ingredients to maintain recipe secrecy.',
      'Clearly disclose allergens prominently on the package label.',
      'Only inform verbally without written label.',
      'No disclosure required.'
    ],
    correctOptionIndex: 1,
    explanationAr: 'توضيح مسببات الحساسية على الملصق إلزامي لحماية صحة ضيوف الرحمن وتفادي نوبات الحساسية.',
    explanationEn: 'Prominent allergen declaration is strictly mandatory to safeguard consumer health.'
  },
  {
    id: 'q3',
    questionAr: 'ما الذي تمثله شارة «اعتماد الضمان الذهبي» الصادرة من منصة إرث أجيال؟',
    questionEn: 'What does the Erth Ajyal "Golden Guarantee" accreditation badge signify?',
    optionsAr: [
      'ترخيص حكومي بديل عن السجل التجاري.',
      'اعتماد جودة واحترافية داخلي يثبت اجتياز الأسرة للبرنامج التأهيلي وجاهزيتها لخدمة ضيوف الرحمن.',
      'ضمان تمويل مالي مباشر غير مشروط.',
      'إعفاء من الاشتراطات والشهادات الصحية.'
    ],
    optionsEn: [
      'A government license replacing commercial registration.',
      'An internal quality mark proving the beneficiary successfully completed training and achieved readiness to serve pilgrims.',
      'An unconditional direct bank loan guarantee.',
      'An exemption from health cards and municipal compliance.'
    ],
    correctOptionIndex: 1,
    explanationAr: 'الضمان الذهبي هو علامة جودة وتأهيل مهني معتمدة من منصة إرث أجيال تؤكد جاهزية المستفيد ومطابقته لأعلى معايير الضيافة والسلامة.',
    explanationEn: 'The Golden Guarantee is an internal quality and readiness accreditation badge validating adherence to top hospitality standards.'
  },
  {
    id: 'q4',
    questionAr: 'ما هي الشروط الأساسية للأهلية في البرنامج التأهيلي لإرث أجيال؟',
    questionEn: 'What is the primary eligibility condition for the Erth Ajyal qualification program?',
    optionsAr: [
      'أن يكون المتقدم سعودي/سعودية ولديه وثيقة عمل حر أو وثيقة معتمدة ومطابقة للاشتراطات.',
      'وجود رأس مال لا يقل عن مليون ريال.',
      'امتلاك مطعم تجاري قائم خارج المنزل فقط.',
      'عدم الحاجة لأي شهادات صحية.'
    ],
    optionsEn: [
      'Saudi citizenship with valid freelance certificate and compliance with program terms.',
      'Capital exceeding one million SAR.',
      'Owning a physical commercial restaurant outside home.',
      'No health certificates needed.'
    ],
    correctOptionIndex: 0,
    explanationAr: 'البرنامج مخصص للمواطنين والمواطنات ورواد الأعمال والأسر المنتجة الحاصلين على وثائق عمل حر معتمدة.',
    explanationEn: 'The program is designed for Saudi citizens, productive families, and artisans with verified freelance licenses.'
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INITIAL SAMPLE APPLICANTS (For Demonstration & Admin)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const INITIAL_SAMPLE_APPLICANTS: ApplicantProfile[] = [
  {
    id: 'app-sample-1',
    userId: 'user-huda-makki',
    fullName: 'هدى بنت عبد الله المكي',
    nationalId: '1088492019',
    phone: '0555123456',
    email: 'huda.makki@gmail.com',
    nationality: 'SA',
    isSaudi: true,
    activityType: 'culinary',
    projectName: 'مطبخ أم عبد الله للأكلات المكية التراثية',
    city: 'مكة المكرمة - حي العوالي',
    bio: 'شغوفة بإحياء المطبخ المكي التقليدي، خبرة 12 سنة في تقديم السليق المكي، الدبياز، والمنتو لوفود الحج والعمرة.',
    bankName: 'مصرف الراجحي',
    iban: 'SA4480000412608010123456',
    nationalAddress: 'مكة المكرمة، حي العوالي، شارع إبراهيم الجفالي، مبنى 4210',
    shortAddress: 'MKAK-4210',
    socialLinks: {
      instagram: '@huda_makkah_kitchen',
      tiktok: '@um_abdullah_food',
      website: 'https://huda-makkah.erth.sa'
    },
    agreementAccepted: true,
    agreementAcceptedAt: '2026-08-15 14:30:00',
    agreementVersion: 'v2.1',
    documents: [
      {
        id: 'doc-1-1',
        type: 'national_id',
        titleAr: 'الهوية الوطنية',
        titleEn: 'National ID',
        descriptionAr: 'صورة واضحة للهوية الوطنية سارية المفعول.',
        descriptionEn: 'Valid Saudi National ID copy.',
        isRequired: true,
        fileName: 'national_id_huda.pdf',
        fileSize: '1.2 MB',
        uploadedAt: '2026-08-15 14:10',
        status: 'accepted',
        adminNotes: 'الهوية سارية ومطابقة للبيانات.',
        reviewedAt: '2026-08-16 10:00',
        reviewedBy: 'أ. عبد الله الحازمي'
      },
      {
        id: 'doc-1-2',
        type: 'freelance_license',
        titleAr: 'وثيقة العمل الحر',
        titleEn: 'Freelance License',
        descriptionAr: 'وثيقة العمل الحر سارية المفعول.',
        descriptionEn: 'Freelance certificate from MHRSD.',
        isRequired: true,
        fileName: 'freelance_cert_fl-8942.pdf',
        fileSize: '890 KB',
        uploadedAt: '2026-08-15 14:15',
        status: 'accepted',
        adminNotes: 'الوثيقة سارية ونشاط الطهي التراثي معتمد.',
        reviewedAt: '2026-08-16 10:05',
        reviewedBy: 'أ. عبد الله الحازمي'
      },
      {
        id: 'doc-1-3',
        type: 'health_cert',
        titleAr: 'الشهادة الصحية',
        titleEn: 'Health Certificate',
        descriptionAr: 'شهادة صحية سارية من مركز طبي معتمد.',
        descriptionEn: 'Valid health card.',
        isRequired: true,
        requiresFoodActivityOnly: true,
        fileName: 'health_card_balady.pdf',
        fileSize: '1.5 MB',
        uploadedAt: '2026-08-15 14:20',
        status: 'accepted',
        adminNotes: 'الشهادة الصحية صادرة عبر منصة بلدي ومطابقة.',
        reviewedAt: '2026-08-16 10:10',
        reviewedBy: 'أ. عبد الله الحازمي'
      },
      {
        id: 'doc-1-4',
        type: 'bank_iban',
        titleAr: 'البيانات البنكية (شهادة الآيبان IBAN)',
        titleEn: 'Bank Account / IBAN Certificate',
        descriptionAr: 'شهادة رسمية مطبوعة برقم الآيبان.',
        descriptionEn: 'Bank letter with validated IBAN.',
        isRequired: true,
        fileName: 'rajhi_iban_cert.pdf',
        fileSize: '650 KB',
        uploadedAt: '2026-08-15 14:25',
        status: 'accepted',
        adminNotes: 'الآيبان مطابق لاسم المستفيدة لدى مصرف الراجحي.',
        reviewedAt: '2026-08-16 10:12',
        reviewedBy: 'أ. عبد الله الحازمي'
      },
      {
        id: 'doc-1-5',
        type: 'national_address',
        titleAr: 'العنوان الوطني المعتمد',
        titleEn: 'National Address Proof',
        descriptionAr: 'إثبات العنوان الوطني المسجل في سبل.',
        descriptionEn: 'SPL National Address proof.',
        isRequired: true,
        fileName: 'spl_national_address.pdf',
        fileSize: '420 KB',
        uploadedAt: '2026-08-15 14:28',
        status: 'accepted',
        adminNotes: 'العنوان موثق داخل النطاق الجغرافي لمكة المكرمة.',
        reviewedAt: '2026-08-16 10:15',
        reviewedBy: 'أ. عبد الله الحازمي'
      },
      {
        id: 'doc-1-6',
        type: 'agreement',
        titleAr: 'اتفاقية التمكين والالتزام',
        titleEn: 'Program Agreement',
        descriptionAr: 'وثيقة الالتزام بمعايير الجودة والضيافة.',
        descriptionEn: 'Quality and service agreement.',
        isRequired: true,
        fileName: 'signed_erth_agreement.pdf',
        fileSize: '310 KB',
        uploadedAt: '2026-08-15 14:30',
        status: 'accepted',
        adminNotes: 'تمت الموافقة والتوقيع الرقمي بنجاح.',
        reviewedAt: '2026-08-16 10:20',
        reviewedBy: 'أ. عبد الله الحازمي'
      }
    ],
    currentStageNumber: 7,
    overallStatus: 'completed',
    stageProgress: {
      stage1_session: true,
      stage2_registration: true,
      stage3_documents: true,
      stage4_admission: true,
      stage5_workshop: true,
      stage6_evaluation: true,
      stage7_guarantee: true
    },
    activeBookingId: 'book-sample-1',
    lmsProgressPercent: 100,
    lmsAttendanceDurationSeconds: 2700,
    lmsCompleted: true,
    lmsQuizScore: 100,
    lmsQuizPassed: true,
    evaluationScore: 96,
    evaluationNotes: 'مستوى استثنائي في إتقان معايير الطهي التراثي الحجازي والسلامة الغذائية.',
    evaluatedAt: '2026-08-17 11:30',
    evaluatedBy: 'لجنة التقييم والاعتماد - إرث أجيال',
    accreditationId: 'cert-sample-1',
    createdAt: '2026-08-15 10:00:00',
    updatedAt: '2026-08-17 12:00:00'
  },
  {
    id: 'app-sample-2',
    userId: 'user-salem-crafts',
    fullName: 'سالم بن مروان الحربي',
    nationalId: '1092837461',
    phone: '0544987654',
    email: 'salem.harbi.crafts@gmail.com',
    nationality: 'SA',
    isSaudi: true,
    activityType: 'crafts',
    projectName: 'أنامل الحجاز لصناعة السبح والمسبوكات التراثية',
    city: 'مكة المكرمة - حي العزيزية',
    bio: 'حرفي متخصص في صياغة السبح الفاخرة من حجر اليسر والكوك وخشب الأبنوس، وصناعة الهدايا التذكارية لضيوف الرحمن.',
    bankName: 'البنك الأهلي السعودي (SNB)',
    iban: 'SA1210000019283746550011',
    nationalAddress: 'مكة المكرمة، العزيزية الجنوبية، شارع عبدالله خياط، عمارة 18',
    shortAddress: 'MKAZ-7721',
    socialLinks: {
      instagram: '@anamel_alhijaz',
      tiktok: '@salem_subah'
    },
    agreementAccepted: true,
    agreementAcceptedAt: '2026-08-18 11:00:00',
    agreementVersion: 'v2.1',
    documents: [
      {
        id: 'doc-2-1',
        type: 'national_id',
        titleAr: 'الهوية الوطنية',
        titleEn: 'National ID',
        descriptionAr: 'صورة واضحة للهوية الوطنية.',
        descriptionEn: 'Saudi National ID copy.',
        isRequired: true,
        fileName: 'salem_national_id.jpg',
        fileSize: '950 KB',
        uploadedAt: '2026-08-18 10:40',
        status: 'accepted',
        adminNotes: 'الهوية سارية ومطابقة.',
        reviewedAt: '2026-08-18 15:00',
        reviewedBy: 'أ. سارة البار'
      },
      {
        id: 'doc-2-2',
        type: 'freelance_license',
        titleAr: 'وثيقة العمل الحر',
        titleEn: 'Freelance License',
        descriptionAr: 'وثيقة العمل الحر في المشغولات اليدوية.',
        descriptionEn: 'Valid craft freelance license.',
        isRequired: true,
        fileName: 'freelance_salem_crafts.pdf',
        fileSize: '780 KB',
        uploadedAt: '2026-08-18 10:45',
        status: 'accepted',
        adminNotes: 'نشاط الحرف اليدوية معتمد.',
        reviewedAt: '2026-08-18 15:05',
        reviewedBy: 'أ. سارة البار'
      },
      {
        id: 'doc-2-3',
        type: 'health_cert',
        titleAr: 'الشهادة الصحية (غير مطلوبة للحرفيين)',
        titleEn: 'Health Certificate (Not required for pure crafts)',
        descriptionAr: 'غير ملزمة للنشاط الحرفي غير الغذائي.',
        descriptionEn: 'Exempt for non-food artisans.',
        isRequired: false,
        requiresFoodActivityOnly: true,
        status: 'accepted',
        adminNotes: 'تم الإعفاء نظراً لطبيعة النشاط الحرفي غير الغذائي.'
      },
      {
        id: 'doc-2-4',
        type: 'bank_iban',
        titleAr: 'البيانات البنكية (شهادة الآيبان IBAN)',
        titleEn: 'Bank Account / IBAN Certificate',
        descriptionAr: 'شهادة رسمية بالآيبان التجاري.',
        descriptionEn: 'Bank letter with validated IBAN.',
        isRequired: true,
        fileName: 'snb_iban_salem.pdf',
        fileSize: '1.1 MB',
        uploadedAt: '2026-08-18 10:50',
        status: 'needs_update',
        adminNotes: 'صورة شهادة الآيبان غير واضحة جزئياً، يرجى إعادة رفع مستند الآيبان المباشر من تطبيق البنك.',
        reviewedAt: '2026-08-18 15:10',
        reviewedBy: 'أ. فهد الغامدي'
      },
      {
        id: 'doc-2-5',
        type: 'national_address',
        titleAr: 'العنوان الوطني المعتمد',
        titleEn: 'National Address Proof',
        descriptionAr: 'إثبات العنوان الوطني.',
        descriptionEn: 'National Address proof.',
        isRequired: true,
        fileName: 'salem_address_spl.pdf',
        fileSize: '510 KB',
        uploadedAt: '2026-08-18 10:55',
        status: 'accepted',
        adminNotes: 'العنوان معتمد بمكة المكرمة.',
        reviewedAt: '2026-08-18 15:12',
        reviewedBy: 'أ. فهد الغامدي'
      },
      {
        id: 'doc-2-6',
        type: 'agreement',
        titleAr: 'اتفاقية التمكين والالتزام',
        titleEn: 'Program Agreement',
        descriptionAr: 'وثيقة الالتزام.',
        descriptionEn: 'Quality and service agreement.',
        isRequired: true,
        fileName: 'agreement_salem.pdf',
        fileSize: '290 KB',
        uploadedAt: '2026-08-18 11:00',
        status: 'accepted',
        adminNotes: 'تمت الموافقة الرقمية.',
        reviewedAt: '2026-08-18 15:15',
        reviewedBy: 'أ. سارة البار'
      }
    ],
    currentStageNumber: 3,
    overallStatus: 'needs_amendment',
    stageProgress: {
      stage1_session: true,
      stage2_registration: true,
      stage3_documents: false,
      stage4_admission: false,
      stage5_workshop: false,
      stage6_evaluation: false,
      stage7_guarantee: false
    },
    activeBookingId: 'book-sample-2',
    lmsProgressPercent: 0,
    lmsAttendanceDurationSeconds: 0,
    lmsCompleted: false,
    createdAt: '2026-08-17 09:15:00',
    updatedAt: '2026-08-18 15:15:00'
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INITIAL SAMPLE CERTIFICATES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const INITIAL_SAMPLE_CERTIFICATES: GoldenGuaranteeCertificate[] = [
  {
    id: 'cert-sample-1',
    accreditationNumber: 'ERG-2026-8842',
    userId: 'user-huda-makki',
    applicantName: 'هدى بنت عبد الله المكي',
    projectName: 'مطبخ أم عبد الله للأكلات المكية التراثية',
    activityType: 'culinary',
    activityLabelAr: 'الطهي والمأكولات التراثية المكية',
    activityLabelEn: 'Traditional Makkah Culinary & Heritage Food',
    issueDate: '2026-08-17',
    issueDateHijri: '04 صفر 1448 هـ',
    expiryDate: '2027-08-17',
    status: 'active',
    qrVerificationUrl: 'https://ais-dev-vzatlg52o7pkaptay5t6eg-985306123246.europe-west2.run.app/#/verify-guarantee?code=ERG-2026-8842',
    issuedByAr: 'منصة إرث أجيال للضيافة والتجارب التراثية',
    issuedByEn: 'Erth Ajyal Platform for Hospitality & Heritage',
    qualityBadgeTier: 'gold',
    standardsPassed: [
      'معايير السلامة الغذائية والاشتراطات الصحية المعتمدة.',
      'معايير التغليف التراثي الآمن والمطابق لباقات المعتمرين.',
      'بروتوكول الضيافة السعودية والترحيب بضيوف الرحمن.',
      'اجتياز ورش العمل التأهيلية والاختبار التقييمي بنسبة 96%.'
    ],
    officialDisclaimerAr: 'تنويه نظامي: هذه الشارة والشهادة تمثل اعتماد الجودة والجاهزية المهنية الصادرة من برنامج ومنظومة «إرث أجيال»، ولا تُعد بديلاً عن التراخيص والسجلات التجارية الحكومية الصادرة من الجهات الرسمية ذات الاختصاص.',
    officialDisclaimerEn: 'Regulatory Note: This badge and certificate represent internal quality and operational readiness accreditation issued by the "Erth Ajyal" ecosystem, and do not substitute official government commercial registrations or municipal permits.',
    notes: 'معتمد للتوريد في باقات ضيوف الرحمن VIP والمعارض التراثية بمكة المكرمة.',
    createdAt: '2026-08-17 12:00:00',
    updatedAt: '2026-08-17 12:00:00'
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INITIAL SAMPLE NOTIFICATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const INITIAL_SAMPLE_NOTIFICATIONS: ProgramNotification[] = [
  {
    id: 'notif-1',
    userId: 'user-huda-makki',
    titleAr: '🏅 مبروك! تم إصدار اعتماد الضمان الذهبي',
    titleEn: 'Congratulations! Golden Guarantee Issued',
    bodyAr: 'تم اجتياز كافة المراحل والتقييم بنجاح وإصدار شهادة اعتماد الضمان الذهبي برقم (ERG-2026-8842).',
    bodyEn: 'You have passed all qualification stages. Your Golden Guarantee Certificate (ERG-2026-8842) is ready.',
    type: 'accreditation',
    isRead: false,
    actionUrl: '#/journey/guarantee',
    createdAt: '2026-08-17 12:05:00'
  },
  {
    id: 'notif-2',
    userId: 'user-salem-crafts',
    titleAr: '⚠ تنبيه: مستند بحاجة إلى تحديث',
    titleEn: 'Notice: Document requires update',
    bodyAr: 'يرجى مراجعة وتحديث شهادة الآيبان البنكي لعدم وضوح الصورة المرفوعة.',
    bodyEn: 'Please re-upload a clear copy of your official bank IBAN certificate.',
    type: 'document',
    isRead: false,
    actionUrl: '#/journey/documents',
    createdAt: '2026-08-18 15:15:00'
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SERVICE METHODS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Get or Initialize current user's Applicant Profile
export const getApplicantProfile = (userId = 'user-current'): ApplicantProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_APPLICANT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id) return parsed;
    }
  } catch (e) {
    console.error('Error reading applicant profile:', e);
  }

  // Default clean profile for current logged in user
  const defaultProfile: ApplicantProfile = {
    id: `app-${Date.now()}`,
    userId,
    fullName: '',
    nationalId: '',
    phone: '',
    email: '',
    nationality: 'SA',
    isSaudi: true,
    activityType: 'culinary',
    projectName: '',
    city: 'مكة المكرمة',
    bankName: '',
    iban: '',
    nationalAddress: '',
    agreementAccepted: false,
    documents: JSON.parse(JSON.stringify(INITIAL_REQUIRED_DOCUMENTS)),
    currentStageNumber: 1,
    overallStatus: 'draft',
    stageProgress: {
      stage1_session: false,
      stage2_registration: false,
      stage3_documents: false,
      stage4_admission: false,
      stage5_workshop: false,
      stage6_evaluation: false,
      stage7_guarantee: false
    },
    lmsProgressPercent: 0,
    lmsAttendanceDurationSeconds: 0,
    lmsCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  saveApplicantProfile(defaultProfile);
  return defaultProfile;
};

// 2. Save current user's Applicant Profile
export const saveApplicantProfile = (profile: ApplicantProfile): void => {
  try {
    profile.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_APPLICANT_KEY, JSON.stringify(profile));
    
    // Also sync with all applicants list
    const all = getAllApplicants();
    const index = all.findIndex(a => a.id === profile.id || a.userId === profile.userId);
    if (index >= 0) {
      all[index] = profile;
    } else {
      all.push(profile);
    }
    localStorage.setItem(STORAGE_ALL_APPLICANTS_KEY, JSON.stringify(all));

    window.dispatchEvent(new CustomEvent('warath_golden_guarantee_updated', { detail: profile }));
  } catch (e) {
    console.error('Error saving applicant profile:', e);
  }
};

// 3. Get All Applicants (for Admin Panel)
export const getAllApplicants = (): ApplicantProfile[] => {
  try {
    const raw = localStorage.getItem(STORAGE_ALL_APPLICANTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error reading all applicants:', e);
  }

  // Seed sample applicants if empty
  localStorage.setItem(STORAGE_ALL_APPLICANTS_KEY, JSON.stringify(INITIAL_SAMPLE_APPLICANTS));
  return INITIAL_SAMPLE_APPLICANTS;
};

// 4. Save All Applicants List
export const saveAllApplicants = (list: ApplicantProfile[]): void => {
  try {
    localStorage.setItem(STORAGE_ALL_APPLICANTS_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('warath_golden_guarantee_updated'));
  } catch (e) {
    console.error('Error saving all applicants:', e);
  }
};

// 5. Get Appointment Slots
export const getAppointmentSlots = (): AppointmentSlot[] => {
  try {
    const raw = localStorage.getItem(STORAGE_SLOTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error reading slots:', e);
  }
  localStorage.setItem(STORAGE_SLOTS_KEY, JSON.stringify(INITIAL_APPOINTMENT_SLOTS));
  return INITIAL_APPOINTMENT_SLOTS;
};

// 6. Save Appointment Slots
export const saveAppointmentSlots = (slots: AppointmentSlot[]): void => {
  try {
    localStorage.setItem(STORAGE_SLOTS_KEY, JSON.stringify(slots));
    window.dispatchEvent(new CustomEvent('warath_golden_guarantee_updated'));
  } catch (e) {
    console.error('Error saving slots:', e);
  }
};

// 7. Get All Bookings
export const getAppointmentBookings = (): AppointmentBooking[] => {
  try {
    const raw = localStorage.getItem(STORAGE_BOOKINGS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error('Error reading bookings:', e);
  }
  return [];
};

// 8. Create or Update Booking
export const bookAppointment = (
  slotId: string, 
  applicant: { fullName: string; phone: string; email: string; projectName: string; activityType: ActivityType },
  userId = 'user-current'
): AppointmentBooking => {
  const slots = getAppointmentSlots();
  const slot = slots.find(s => s.id === slotId);
  if (!slot) throw new Error('الموعد غير متوفر');

  // Increment slot booked count
  slot.bookedCount = (slot.bookedCount || 0) + 1;
  if (slot.bookedCount >= slot.maxCapacity) {
    slot.available = false;
  }
  saveAppointmentSlots(slots);

  const newBooking: AppointmentBooking = {
    id: `book-${Date.now()}`,
    userId,
    slotId,
    date: slot.date,
    timeSlotAr: slot.timeSlotAr,
    timeSlotEn: slot.timeSlotEn,
    type: slot.type,
    locationAr: slot.locationAr,
    applicantName: applicant.fullName,
    applicantPhone: applicant.phone,
    applicantEmail: applicant.email,
    projectName: applicant.projectName,
    activityType: applicant.activityType,
    status: 'confirmed',
    meetingLink: slot.type === 'virtual' ? 'https://meet.google.com/ert-haji-yal' : undefined,
    createdAt: new Date().toISOString()
  };

  const bookings = getAppointmentBookings();
  bookings.push(newBooking);
  localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));

  // Update profile
  const profile = getApplicantProfile(userId);
  profile.activeBookingId = newBooking.id;
  profile.fullName = profile.fullName || applicant.fullName;
  profile.phone = profile.phone || applicant.phone;
  profile.email = profile.email || applicant.email;
  profile.projectName = profile.projectName || applicant.projectName;
  profile.activityType = applicant.activityType;
  profile.stageProgress.stage1_session = true; // Booked / scheduled
  saveApplicantProfile(profile);

  // Trigger Notification
  addProgramNotification({
    userId,
    titleAr: '📅 تم تأكيد حجز جلستك الإرشادية بنجاح',
    titleEn: 'Appointment Confirmed',
    bodyAr: `موعدك المحدد هو ${slot.dayNameAr} (${slot.date}) في تمام ${slot.timeSlotAr}. ${slot.type === 'virtual' ? 'رابط الجلسة عبر Google Meet متاح في لوحتك.' : 'المقر: مركز إرث أجيال بمكة.'}`,
    bodyEn: `Your session is booked on ${slot.dayNameEn} (${slot.date}) at ${slot.timeSlotEn}.`,
    type: 'appointment',
    isRead: false,
    actionUrl: '#/journey/session'
  });

  return newBooking;
};

// 9. Cancel or Reschedule Booking
export const cancelAppointment = (bookingId: string, userId = 'user-current'): void => {
  const bookings = getAppointmentBookings();
  const booking = bookings.find(b => b.id === bookingId);
  if (booking) {
    booking.status = 'cancelled';
    localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));

    const slots = getAppointmentSlots();
    const slot = slots.find(s => s.id === booking.slotId);
    if (slot && slot.bookedCount > 0) {
      slot.bookedCount -= 1;
      slot.available = true;
      saveAppointmentSlots(slots);
    }

    const profile = getApplicantProfile(userId);
    profile.activeBookingId = undefined;
    profile.stageProgress.stage1_session = false;
    saveApplicantProfile(profile);
  }
};

// 10. Admin confirms attendance & consultation readiness
export const adminCompleteConsultation = (
  bookingId: string, 
  status: 'passed_ready' | 'needs_prep' | 'rescheduled', 
  notes: string
): void => {
  const bookings = getAppointmentBookings();
  const booking = bookings.find(b => b.id === bookingId);
  if (booking) {
    booking.status = 'attended';
    booking.consultationStatus = status;
    booking.consultationNotes = notes;
    booking.attendedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(bookings));

    // Update applicant profile
    const all = getAllApplicants();
    const target = all.find(a => a.userId === booking.userId || a.id === booking.userId || a.activeBookingId === bookingId);
    if (target) {
      target.stageProgress.stage1_session = true;
      if (status === 'passed_ready') {
        if (target.currentStageNumber < 2) target.currentStageNumber = 2;
        addProgramNotification({
          userId: target.userId,
          titleAr: '✅ اجتياز الجلسة الإرشادية - جاهز للتسجيل الرسمي',
          titleEn: 'Orientation Passed - Ready for Registration',
          bodyAr: 'أكد مستشار التفكير والنماء جاهزيتك. يمكنك الآن الانتقال لمرحلة تسجيل البيانات ورفع المستندات.',
          bodyEn: 'Consultation completed. You can now proceed to official registration and document uploads.',
          type: 'appointment',
          isRead: false,
          actionUrl: '#/journey/registration'
        });
      } else {
        addProgramNotification({
          userId: target.userId,
          titleAr: '📋 ملاحظات استشارية من الجلسة الإرشادية',
          titleEn: 'Consultation Feedback Notes',
          bodyAr: `ملاحظات المستشار: ${notes}`,
          bodyEn: `Advisor notes: ${notes}`,
          type: 'appointment',
          isRead: false,
          actionUrl: '#/journey/session'
        });
      }
      saveAllApplicants(all);

      // If current active profile
      const cur = getApplicantProfile();
      if (cur.id === target.id || cur.userId === target.userId) {
        saveApplicantProfile(target);
      }
    }
  }
};

// 11. Individual Document Review by Admin
export const adminReviewDocument = (
  applicantId: string, 
  docType: string, 
  status: DocumentReviewStatus, 
  adminNotes: string,
  reviewerName = 'لجنة المراجعة والتدقيق'
): void => {
  const all = getAllApplicants();
  const applicant = all.find(a => a.id === applicantId || a.userId === applicantId);
  if (!applicant) return;

  const doc = applicant.documents.find(d => d.type === docType);
  if (doc) {
    doc.status = status;
    doc.adminNotes = adminNotes;
    doc.reviewedAt = new Date().toISOString();
    doc.reviewedBy = reviewerName;
  }

  // Recalculate stage 3 (documents) completion
  const requiredDocs = applicant.documents.filter(d => d.isRequired && (!d.requiresFoodActivityOnly || applicant.activityType === 'culinary'));
  const allAccepted = requiredDocs.length > 0 && requiredDocs.every(d => d.status === 'accepted');
  const hasNeedsUpdate = applicant.documents.some(d => d.status === 'needs_update');
  const hasRejected = applicant.documents.some(d => d.status === 'rejected');

  if (allAccepted) {
    applicant.stageProgress.stage3_documents = true;
    applicant.stageProgress.stage4_admission = true; // Admitted!
    if (applicant.currentStageNumber < 5) applicant.currentStageNumber = 5; // Ready for LMS!
    applicant.overallStatus = 'accepted';

    addProgramNotification({
      userId: applicant.userId,
      titleAr: '🎉 تم قبول جميع المستندات والقبول في البرنامج التأهيلي',
      titleEn: 'Documents Approved & Program Admission Granted',
      bodyAr: 'تهانينا! تم اعتماد جميع مستنداتك وتأهيلك رسمياً لبدء ورش العمل والبرنامج التدريبي.',
      bodyEn: 'All documents have been verified. You are now officially admitted into the LMS training workshop.',
      type: 'admission',
      isRead: false,
      actionUrl: '#/journey/workshop'
    });
  } else if (hasNeedsUpdate) {
    applicant.overallStatus = 'needs_amendment';
    addProgramNotification({
      userId: applicant.userId,
      titleAr: '⚠ تنبيه: أحد المستندات بحاجة إلى تعديل',
      titleEn: 'Document Needs Amendment',
      bodyAr: `المستند (${doc?.titleAr}): ${adminNotes || 'يرجى مراجعة وتحديث الملف.'}`,
      bodyEn: `Document (${doc?.titleEn}): ${adminNotes || 'Please re-upload a valid file.'}`,
      type: 'document',
      isRead: false,
      actionUrl: '#/journey/documents'
    });
  } else if (hasRejected) {
    applicant.overallStatus = 'needs_completion';
  } else {
    applicant.overallStatus = 'under_review';
  }

  saveAllApplicants(all);

  const cur = getApplicantProfile();
  if (cur.id === applicant.id || cur.userId === applicant.userId) {
    saveApplicantProfile(applicant);
  }
};

// 12. Issue Golden Guarantee Certificate
export const issueGoldenGuarantee = (
  applicantId: string, 
  customSerial?: string, 
  expiryYears = 1,
  issuedBy = 'منصة إرث أجيال للضيافة والتجارب التراثية'
): GoldenGuaranteeCertificate => {
  const all = getAllApplicants();
  const applicant = all.find(a => a.id === applicantId || a.userId === applicantId);
  if (!applicant) throw new Error('المستفيد غير موجود');

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const serial = customSerial || `ERG-${new Date().getFullYear()}-${randomNum}`;
  
  const issueDateObj = new Date();
  const issueDateStr = issueDateObj.toISOString().split('T')[0];
  
  const expiryDateObj = new Date();
  expiryDateObj.setFullYear(expiryDateObj.getFullYear() + expiryYears);
  const expiryDateStr = expiryDateObj.toISOString().split('T')[0];

  const activityLabels: Record<ActivityType, { ar: string; en: string }> = {
    culinary: { ar: 'الطهي والمأكولات التراثية المكية', en: 'Traditional Makkah Culinary & Heritage Food' },
    crafts: { ar: 'الحرف اليدوية والمشغولات التراثية', en: 'Artisanal Crafts & Traditional Works' },
    hospitality: { ar: 'خدمات الضيافة والتجارب الثقافية', en: 'Hospitality Services & Cultural Experiences' },
    home_products: { ar: 'المنتجات المنزلية والتراثية', en: 'Homegrown Heritage Products' }
  };

  const certId = `cert-${Date.now()}`;
  const originUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const verificationUrl = `${originUrl}/#/verify-guarantee?code=${serial}`;

  const newCert: GoldenGuaranteeCertificate = {
    id: certId,
    accreditationNumber: serial,
    userId: applicant.userId,
    applicantName: applicant.fullName || 'مستفيد إرث أجيال',
    projectName: applicant.projectName || 'مشروع إرث أجيال التراثي',
    activityType: applicant.activityType || 'culinary',
    activityLabelAr: activityLabels[applicant.activityType]?.ar || 'الضيافة التراثية',
    activityLabelEn: activityLabels[applicant.activityType]?.en || 'Heritage Hospitality',
    issueDate: issueDateStr,
    issueDateHijri: 'صفر 1448 هـ',
    expiryDate: expiryDateStr,
    status: 'active',
    qrVerificationUrl: verificationUrl,
    issuedByAr: issuedBy,
    issuedByEn: 'Erth Ajyal Platform for Hospitality & Heritage',
    qualityBadgeTier: 'gold',
    standardsPassed: [
      'معايير السلامة والجودة والاشتراطات التشغيلية المعتمدة.',
      'التغليف التراثي الآمن والمطابق لباقات المعتمرين وزوار مكة المكرمة.',
      'بروتوكول الضيافة السعودية والترحيب بضيوف الرحمن.',
      'اجتياز ورش العمل التأهيلية والاختبار التقييمي بنجاح.'
    ],
    officialDisclaimerAr: 'تنويه نظامي: هذه الشارة والشهادة تمثل اعتماد الجودة والجاهزية المهنية الصادرة من برنامج ومنظومة «إرث أجيال»، ولا تُعد بديلاً عن التراخيص والسجلات التجارية الحكومية الصادرة من الجهات الرسمية ذات الاختصاص.',
    officialDisclaimerEn: 'Regulatory Note: This badge and certificate represent internal quality and operational readiness accreditation issued by the "Erth Ajyal" ecosystem, and do not substitute official government commercial registrations or municipal permits.',
    notes: 'معتمد للمشاركة في باقات ضيوف الرحمن والتجارب التراثية الموسعة.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Save certificate
  const certificates = getAllCertificates();
  const existingIdx = certificates.findIndex(c => c.accreditationNumber === serial || c.userId === applicant.userId);
  if (existingIdx >= 0) {
    certificates[existingIdx] = newCert;
  } else {
    certificates.push(newCert);
  }
  localStorage.setItem(STORAGE_CERTIFICATES_KEY, JSON.stringify(certificates));

  // Update applicant stages
  applicant.accreditationId = newCert.id;
  applicant.currentStageNumber = 7;
  applicant.overallStatus = 'completed';
  applicant.stageProgress.stage7_guarantee = true;
  applicant.stageProgress.stage6_evaluation = true;
  saveAllApplicants(all);

  const cur = getApplicantProfile();
  if (cur.id === applicant.id || cur.userId === applicant.userId) {
    saveApplicantProfile(applicant);
  }

  // Trigger Notification
  addProgramNotification({
    userId: applicant.userId,
    titleAr: '🏅 تم إصدار شهادة اعتماد الضمان الذهبي رسمياً',
    titleEn: 'Official Golden Guarantee Certificate Issued',
    bodyAr: `تم إصدار شهادتك برقم الاعتماد (${serial}). يمكنك الآن استعراضها وطباعتها وتنزيلها بصيغة PDF.`,
    bodyEn: `Your certificate (${serial}) is officially active. You can now view, print, or download your PDF certificate.`,
    type: 'accreditation',
    isRead: false,
    actionUrl: '#/journey/guarantee'
  });

  return newCert;
};

// 13. Update Certificate Status (Active, Suspended, Revoked)
export const updateCertificateStatus = (
  certId: string, 
  status: 'active' | 'suspended' | 'revoked' | 'expired', 
  reason?: string
): void => {
  const certificates = getAllCertificates();
  const cert = certificates.find(c => c.id === certId || c.accreditationNumber === certId);
  if (cert) {
    cert.status = status;
    cert.revokedReason = reason;
    cert.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_CERTIFICATES_KEY, JSON.stringify(certificates));
    window.dispatchEvent(new CustomEvent('warath_golden_guarantee_updated'));
  }
};

// 14. Get All Certificates
export const getAllCertificates = (): GoldenGuaranteeCertificate[] => {
  try {
    const raw = localStorage.getItem(STORAGE_CERTIFICATES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error reading certificates:', e);
  }
  localStorage.setItem(STORAGE_CERTIFICATES_KEY, JSON.stringify(INITIAL_SAMPLE_CERTIFICATES));
  return INITIAL_SAMPLE_CERTIFICATES;
};

// 15. Verify Certificate Publicly (By Code or ID)
export const verifyCertificatePublicly = (codeOrId: string): GoldenGuaranteeCertificate | null => {
  if (!codeOrId) return null;
  const clean = codeOrId.trim().toUpperCase();
  const certificates = getAllCertificates();
  const found = certificates.find(c => 
    c.accreditationNumber.toUpperCase() === clean || 
    c.id.toUpperCase() === clean ||
    c.userId.toUpperCase() === clean
  );
  return found || null;
};

// 16. Notifications Manager
export const getProgramNotifications = (userId = 'user-current'): ProgramNotification[] => {
  try {
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter(n => !n.userId || n.userId === userId || userId === 'admin');
      }
    }
  } catch (e) {
    console.error('Error reading notifications:', e);
  }
  return INITIAL_SAMPLE_NOTIFICATIONS;
};

export const addProgramNotification = (notif: Omit<ProgramNotification, 'id' | 'createdAt'>): void => {
  try {
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS_KEY);
    const list: ProgramNotification[] = raw ? JSON.parse(raw) : INITIAL_SAMPLE_NOTIFICATIONS;
    const newNotif: ProgramNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    list.unshift(newNotif);
    localStorage.setItem(STORAGE_NOTIFICATIONS_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('warath_notification_created', { detail: newNotif }));
  } catch (e) {
    console.error('Error adding notification:', e);
  }
};

export const markNotificationAsRead = (notifId: string): void => {
  try {
    const raw = localStorage.getItem(STORAGE_NOTIFICATIONS_KEY);
    if (raw) {
      const list: ProgramNotification[] = JSON.parse(raw);
      const found = list.find(n => n.id === notifId);
      if (found) found.isRead = true;
      localStorage.setItem(STORAGE_NOTIFICATIONS_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('warath_notification_created'));
    }
  } catch (e) {
    console.error('Error marking notification:', e);
  }
};
