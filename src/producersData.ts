import { ProducerFamily } from './types';

export const INITIAL_PRODUCERS: ProducerFamily[] = [
  {
    id: 'producer-1',
    brandName: 'أم أحمد للطهي التراثي الحجازي',
    ownerName: 'فاطمة أحمد الزهراني',
    phone: '0501234567',
    email: 'um.ahmed@warath.sa',
    city: 'مكة المكرمة',
    projectType: 'culinary',
    specialty: 'مأكولات حجازية وتراثية ووجبات المعتمرين',
    description: 'مطبخ منزلي معتمد متخصص في إعداد الوجبات التراثية الحجازية الكلاسيكية، وتوفير الضيافة اليومية للمعتمرين وزوار مكة المكرمة بأجود المكونات المحلية.',
    story: 'بدأت الرحلة قبل ١٢ عاماً من مطبخ منزلنا الصغير بمدينة مكة المكرمة، وبفضل الله ثم دعم برنامج «ورث أجيال» بمؤسسة التفكير والنماء، نجحنا في تطوير مطبخنا وفق أعلى معايير سلامة الأغذية وخدمة آلاف المعتمرين يومياً.',
    experience: '١٢ عاماً في الطهي التراثي الحجازي',
    status: 'approved',
    rating: 4.9,
    reviewsCount: 128,
    logoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80',
    kitchenPhotos: [
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80'
    ],
    licenses: ['شهادة السلامة الغذائية SFDA-8821', 'وثيقة العمل الحر FL-90412', 'اعتماد ورث أجيال 🏅'],
    joinedDate: '2024-01-15',
    totalSales: 84500,
    qualityVerified: true,
    participatingPackages: ['باقة الجود المكي', 'باقة المعتمر الفضية', 'باقة الضيافة التراثية'],
    products: [
      {
        id: 'prod-p1-1',
        name: 'جريش سعودي بالزبدة البلدية والمصلي',
        price: 45,
        description: 'قمح مجروش مطبوخ بالحليب والسمن البري والبصل المكرمل بطعم زمان.',
        imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=500&auto=format&fit=crop&q=60',
        category: 'culinary',
        producerId: 'producer-1',
        producerName: 'أم أحمد للطهي التراثي الحجازي',
        producerCity: 'مكة المكرمة'
      },
      {
        id: 'prod-p1-2',
        name: 'سليق حجازي بالدجاج المحمر والسمن',
        price: 55,
        description: 'أرز مطبوخ بالحليب والمرق الغني يقدم مع الدجاج المحمر بالسمن البلدي والدقوس الحار.',
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=60',
        category: 'culinary',
        producerId: 'producer-1',
        producerName: 'أم أحمد للطهي التراثي الحجازي',
        producerCity: 'مكة المكرمة'
      },
      {
        id: 'prod-p1-3',
        name: 'وجبة البركة للمعتمر (كبسة لحم ضأن مع التمر والماء)',
        price: 65,
        description: 'وجبة متكاملة مخصصة للمعتمرين تحتوي على كبسة اللحم المكي، تمر فاخر، وماء زمزم مغلف هيدروليكياً.',
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60',
        category: 'culinary',
        producerId: 'producer-1',
        producerName: 'أم أحمد للطهي التراثي الحجازي',
        producerCity: 'مكة المكرمة'
      }
    ]
  },
  {
    id: 'producer-2',
    brandName: 'ورشة سارة العتيبي لنسج السدو',
    ownerName: 'سارة العتيبي',
    phone: '0559876543',
    email: 'sara.crafts@warath.sa',
    city: 'الرياض',
    projectType: 'crafts',
    specialty: 'صناعة حقائب ومفارش وهدايا السدو التراثي المنسوج يدوياً',
    description: 'نبتكر قطعاً فنية مستوحاة من نسيج السدو السعودي المسجل في اليونسكو، ندمج فيها التراث الأصيل مع الاستخدامات العصريّة الأنيقة.',
    story: 'تعلمت غزل وحياكة السدو من جدتي في البادية، وحولت هذا الشغف إلى علامة تجارية محلية تُصدّر الهدايا التذكارية للوفود الدولية والمهرجانات الوطنية.',
    experience: '٧ سنوات في الحرف اليدوية والسدو',
    status: 'approved',
    rating: 4.8,
    reviewsCount: 94,
    logoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&auto=format&fit=crop&q=80',
    kitchenPhotos: [
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?w=600&auto=format&fit=crop&q=80'
    ],
    licenses: ['شهادة الحرفي المعتمد HC-331', 'وثيقة العمل الحر FL-88120'],
    joinedDate: '2024-02-10',
    totalSales: 62000,
    qualityVerified: true,
    participatingPackages: ['باقة التراث الذهبية', 'باقة الهدايا والوفود'],
    products: [
      {
        id: 'prod-p2-1',
        name: 'حقيبة سدو تراثية منسوجة يدوياً',
        price: 250,
        description: 'حقيبة مصنوعة من الصوف الطبيعي المنقوش بنقوش السدو النجدية التقليدية.',
        imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&auto=format&fit=crop&q=60',
        category: 'crafts',
        producerId: 'producer-2',
        producerName: 'ورشة سارة العتيبي لنسج السدو',
        producerCity: 'الرياض'
      },
      {
        id: 'prod-p2-2',
        name: 'مفرش طاولة سدو نجدي مزخرف',
        price: 190,
        description: 'قطع ديكور فاخرة مزخرفة يدوياً تناسب المجالس والسفرات العربية التراثية.',
        imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=60',
        category: 'crafts',
        producerId: 'producer-2',
        producerName: 'ورشة سارة العتيبي لنسج السدو',
        producerCity: 'الرياض'
      }
    ]
  },
  {
    id: 'producer-3',
    brandName: 'أم نورة للضيافة العربية والقهوة',
    ownerName: 'نورة الدوسري',
    phone: '0543210987',
    email: 'um.noura@warath.sa',
    city: 'جدة',
    projectType: 'hospitality',
    specialty: 'تجهيز طاولات القهوة السعودية والضيافة في المناسبات',
    description: 'نقدم خدمات الضيافة العربية المتكاملة وخلاطات القهوة السعودية المجهزة بأفخر أنواع الهيل والزعفران مع التمور الفاخرة.',
    story: 'نحافظ على أصول الضيافة الكرم السعودية وسخاء الاستقبال لتقديم تجربة حفل أو مجلس استثنائية لجميع ضيوفك.',
    experience: '٩ سنوات في الضيافة وتنظيم المجالس',
    status: 'approved',
    rating: 4.95,
    reviewsCount: 162,
    logoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1000&auto=format&fit=crop&q=80',
    licenses: ['ترخيص هيئة الضيافة HOS-554', 'اعتماد الجودة الوطنية'],
    joinedDate: '2024-03-01',
    totalSales: 95400,
    qualityVerified: true,
    participatingPackages: ['باقة الضيافة الملكية', 'باقة المعتمر الفضية'],
    products: [
      {
        id: 'prod-p3-1',
        name: 'خلطة قهوة سعودية ملكية بالهيل والزعفران',
        price: 55,
        description: 'بن هرري فاخر حمصة شقراء مخلوط بالهيل والزعفران والخلطة القصيمية السرية.',
        imageUrl: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=500&auto=format&fit=crop&q=60',
        category: 'hospitality',
        producerId: 'producer-3',
        producerName: 'أم نورة للضيافة العربية والقهوة',
        producerCity: 'جدة'
      },
      {
        id: 'prod-p3-2',
        name: 'طقم فناجيل ضيافة نجدية منقوشة',
        price: 180,
        description: 'طقم فناجيل سيراميك فاخر منقوش يدوياً بنقوش تراثية لتقديم القهوة السعودية.',
        imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500&auto=format&fit=crop&q=60',
        category: 'hospitality',
        producerId: 'producer-3',
        producerName: 'أم نورة للضيافة العربية والقهوة',
        producerCity: 'جدة'
      }
    ]
  },
  {
    id: 'producer-4',
    brandName: 'فاطمة الحربي (كليجا وخيرات القصيم)',
    ownerName: 'فاطمة سليم الحربي',
    phone: '0567891234',
    email: 'fatimah.harbi@warath.sa',
    city: 'بريدة - القصيم',
    projectType: 'home_products',
    specialty: 'كليجا القصيم الحطبية، المعمول، ودبس التمر الصافي',
    description: 'من قلب القصيم، نصنع أطيب أقراص الكليجا التراثية المخبوزة على الحطب ومحشوة بدبس التمر النقي والبهارات الدافئة.',
    story: 'وورثنا صنعة الكليجا أباً عن جد، وحافظنا على طريقة الخبز التقليدية لنسعد زوار المملكة بطعم الأصالة النجدي.',
    experience: '١٥ سنة في صناعة الكليجا والمعمول',
    status: 'approved',
    rating: 4.75,
    reviewsCount: 89,
    logoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1000&auto=format&fit=crop&q=80',
    licenses: ['شهادة الغذاء الصحي SFDA-4421'],
    joinedDate: '2024-03-20',
    totalSales: 48000,
    qualityVerified: true,
    participatingPackages: ['سلة جود القصيم'],
    products: [
      {
        id: 'prod-p4-1',
        name: 'كليجا القصيم الأصلية بدبس التمر',
        price: 60,
        description: 'أقراص الكليجا الهشة المحشوة بالسكر والهيل والقرفة مع دبس التمر الفاخر.',
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=60',
        category: 'culinary',
        producerId: 'producer-4',
        producerName: 'فاطمة الحربي (كليجا وخيرات القصيم)',
        producerCity: 'بريدة - القصيم'
      }
    ]
  },
  {
    id: 'producer-5',
    brandName: 'خديجة المكية (عطور ومباخر التراث)',
    ownerName: 'خديجة محمد الهوساوي',
    phone: '0512349876',
    email: 'khadija.perfumes@warath.sa',
    city: 'مكة المكرمة',
    projectType: 'home_products',
    specialty: 'صناعة البخور الملكي، دهن العود المعتق والرشوش المباشرة',
    description: 'متخصصة في خلطات البخور الملكية الدوسري والحجازي والرشوش التراثية وتجهيز هدايا المعتمرين التذكارية من الروائح العطرية.',
    story: 'أعمل من مكة المكرمة بجوار البيت الحرام، وصممت خلطات عطرية خاصة تعبق بالمكان والسكينة وتستحضر الأجواء الإيمانية.',
    experience: '١٠ سنوات في خلطات البخور والروائح',
    status: 'approved',
    rating: 4.92,
    reviewsCount: 115,
    logoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=300&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=1000&auto=format&fit=crop&q=80',
    licenses: ['اعتماد السلامة العطرية PERF-992'],
    joinedDate: '2024-02-01',
    totalSales: 71200,
    qualityVerified: true,
    participatingPackages: ['هدايا المعتمر التذكارية', 'باقة عبق التراث'],
    products: [
      {
        id: 'prod-p5-1',
        name: 'بخور دوسري ملكي فاخر',
        price: 120,
        description: 'بخور دوسري أصيل مجهز يدوياً بخلطات عطرية فاخرة تدوم طويلاً.',
        imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60',
        category: 'perfumes',
        producerId: 'producer-5',
        producerName: 'خديجة المكية (عطور ومباخر التراث)',
        producerCity: 'مكة المكرمة'
      }
    ]
  }
];
