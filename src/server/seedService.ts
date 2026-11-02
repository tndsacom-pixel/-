import bcrypt from 'bcryptjs';
import { db } from '../db/index.ts';
import { users, producers, products, packages, platformSettings } from '../db/schema.ts';
import { eq } from 'drizzle-orm';

export async function runDatabaseSeed() {
  try {
    const existingUsers = await db.select().from(users);
    if (existingUsers.length > 0) {
      console.log('Database already initialized. Skipping seed.');
      return;
    }

    console.log('Seeding initial production data into Cloud SQL PostgreSQL database...');

    const salt = await bcrypt.genSalt(10);
    const defaultPasswordHash = await bcrypt.hash('WarathTND2026!', salt);

    // 1. Seed Users
    const [adminUser] = await db.insert(users).values({
      email: 'admin@tnd.sa.com',
      passwordHash: defaultPasswordHash,
      role: 'admin',
      name: 'مدير المنصة - TND',
      phone: '+966500000001',
      isEmailVerified: true,
    }).returning();

    const [omAhmadUser] = await db.insert(users).values({
      email: 'om.ahmad@warath.sa',
      passwordHash: defaultPasswordHash,
      role: 'producer',
      name: 'أم أحمد - حلويات مكة التراثية',
      phone: '+966551234567',
      isEmailVerified: true,
    }).returning();

    const [omFawazUser] = await db.insert(users).values({
      email: 'om.fawaz@warath.sa',
      passwordHash: defaultPasswordHash,
      role: 'producer',
      name: 'أم فواز - عطور الهيل والمأكولات الحجازية',
      phone: '+966552345678',
      isEmailVerified: true,
    }).returning();

    const [fatimaUser] = await db.insert(users).values({
      email: 'fatima@warath.sa',
      passwordHash: defaultPasswordHash,
      role: 'producer',
      name: 'فاطمة الحربي - سدو القصيم',
      phone: '+966553456789',
      isEmailVerified: true,
    }).returning();

    const [buyerUser] = await db.insert(users).values({
      email: 'buyer@warath.sa',
      passwordHash: defaultPasswordHash,
      role: 'buyer',
      name: 'عبد الرحمن المشتري',
      phone: '+966554567890',
      isEmailVerified: true,
    }).returning();

    const [pilgrimUser] = await db.insert(users).values({
      email: 'pilgrim@warath.sa',
      passwordHash: defaultPasswordHash,
      role: 'pilgrim',
      name: 'الشيخ عبد الله - معتمر زائر',
      phone: '+966555678901',
      isEmailVerified: true,
    }).returning();

    const [supportUser] = await db.insert(users).values({
      email: 'support@tnd.sa.com',
      passwordHash: defaultPasswordHash,
      role: 'support',
      name: 'فريق الدعم الفني - TND',
      phone: '+966556789012',
      isEmailVerified: true,
    }).returning();

    // 2. Seed Producers
    const [producerOmAhmad] = await db.insert(producers).values({
      userId: omAhmadUser.id,
      familyName: 'أسرة أم أحمد للمأكولات والحلويات التراثية',
      slug: 'om-ahmad',
      city: 'مكة المكرمة',
      specialization: 'المأكولات المكية والحلويات التراثية',
      bio: 'أسرة مكية عريقة متخصصة في إعداد معمول العجوة والحلويات الحجازية بأجود أنواع السمن البلدي.',
      story: 'بدأت رحلتنا من أزقة مكة المكرمة قبل 15 عاماً بنقل أصالة المطبخ الحجازي للزوار والمعتمرين.',
      experienceYears: 15,
      verificationStatus: 'approved',
      logoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
      bannerUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop',
      phone: '+966551234567',
      experiences: 'خبرة 15 عاماً في الحلويات المكية والمأكولات والشعبيات الحجازية الأصيلة.',
      certifications: ['شهادة سلامة الغذاء (نفاذ)', 'اعتماد الأسر المنتجة - التفكير والنماء TND', 'رخصة العمل الحر'],
      rating: '4.9',
      reviewsCount: 38,
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://warath.sa/producer/om-ahmad',
    }).returning();

    const [producerOmFawaz] = await db.insert(producers).values({
      userId: omFawazUser.id,
      familyName: 'أسرة أم فواز للعطور والسليق الحجازي',
      slug: 'om-fawaz',
      city: 'مكة المكرمة',
      specialization: 'السليق الحجازي والبخور المكّي',
      bio: 'نقدم السليق المكّي العريق المطبوخ بالسمن البلدي مع أطيب أنواع البخور والدوسري والخلطات الحجازية.',
      story: 'نحافظ على أسرار الطهي الحجازي التقليدي والخلطات العطرية المورثة عبر الأجيال.',
      experienceYears: 12,
      verificationStatus: 'approved',
      logoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
      bannerUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1200&auto=format&fit=crop',
      phone: '+966552345678',
      experiences: 'طهي المناسبات الكبرى، تصنيع البخور الملكي.',
      certifications: ['رخصة حرفية معتمدة', 'اعتماد مؤسسة TND'],
      rating: '5.0',
      reviewsCount: 52,
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://warath.sa/producer/om-fawaz',
    }).returning();

    const [producerFatima] = await db.insert(producers).values({
      userId: fatimaUser.id,
      familyName: 'حرف سدو فاطمة الحربي',
      slug: 'fatima-alharbi',
      city: 'القصيم',
      specialization: 'الحرف اليدوية ونسيج السدو الأصيل',
      bio: 'حرفية متخصصة في نسيج السدو التراثي المنسوج يدوياً لإنتاج الحقائب والمجالس الفاخرة.',
      story: 'شغفي هو حماية التراث السعودي الأصيل ونقله للأجيال الجديدة بأيدي سعودية ماهرة.',
      experienceYears: 20,
      verificationStatus: 'approved',
      logoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
      bannerUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop',
      phone: '+966553456789',
      experiences: 'عضو الحرف التراثية السعودية، مشاركة في المهرجانات الوطنية.',
      certifications: ['شهادة الاعتماد الحرفي - هيئة التراث', 'اعتماد TND'],
      rating: '4.8',
      reviewsCount: 24,
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://warath.sa/producer/fatima-alharbi',
    }).returning();

    // 3. Seed Products
    await db.insert(products).values([
      {
        producerId: producerOmFawaz.id,
        name: 'سليق حجازي بالسمن البلدي واللحم',
        price: '65',
        description: 'طبق السليق المكّي العريق المطبوخ على حطب السمر بالأرز المصري، الحليب النقي، والسمن البلدي مع لحم الحاشي الطازج.',
        category: 'culinary',
        stock: 20,
        images: ['https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop'],
        ingredients: 'أرز مصري، حليب طازج، لحم حاشي، سمن بلدي، مستكة، هيل، ملح بحري',
        allergens: 'يحتوي على مشتقات الحليب (لاكتوز)',
        storageMethod: 'يحفظ ساخناً أو يُعاد تسخينه بالمايكرويف',
        expiryDuration: 'يستهلك خلال 6 ساعات من الاستلام',
        status: 'approved',
      },
      {
        producerId: producerFatima.id,
        name: 'حقيبة سدو تراثية منسوجة يدوياً',
        price: '250',
        description: 'حقيبة يد فاخرة منسوجة بنسيج السدو الأصيل، مبطنة بالقماش الحريري ومزودة بسحاب نحاسي متين.',
        category: 'crafts',
        stock: 8,
        images: ['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop'],
        ingredients: 'خيوط صوف طبيعي، قماش حريري، سحاب نحاسي',
        allergens: 'لا يوجد',
        storageMethod: 'تنظيف جاف فقط',
        expiryDuration: 'منتج مستدام صلب',
        status: 'approved',
      },
      {
        producerId: producerOmFawaz.id,
        name: 'بخور دوسري ملكي فاخر',
        price: '120',
        description: 'خلطة بخور عتيقة معجونة بدهن العود الملكي، الورد الطائفي، والظفر المعطر لتبخير المساجد والمنازل.',
        category: 'perfumes',
        stock: 15,
        images: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop'],
        ingredients: 'خشب عود، دهن عود ملكي، ورد طائفي، ظفر معطر، مسك',
        allergens: 'لا يوجد',
        storageMethod: 'يحفظ في مكان بارد وجاف بعيداً عن الشمس',
        expiryDuration: 'صالح لمدة 3 سنوات',
        status: 'approved',
      },
      {
        producerId: producerOmAhmad.id,
        name: 'معمول حجازي بالتمر والفستق الحلبي',
        price: '85',
        description: 'معمول هشش ولذيذ مجهز بالطحين السمن البلدي الفاخر، محشو بتمر المدينة العجوة ومزين بالفستق.',
        category: 'culinary',
        stock: 30,
        images: ['https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop'],
        ingredients: 'طحين بر، تمر عجوة المدينة، سمن بلدي، فستق حلبي، بهارات معمول',
        allergens: 'يحتوي على المكسرات والغلوتين',
        storageMethod: 'يحفظ في علبة محكمة الإغلاق بدرجة حرارة الغرفة',
        expiryDuration: 'صالح لمدة 30 يوماً',
        status: 'approved',
      },
      {
        producerId: producerOmAhmad.id,
        name: 'مجموعة ضيافة قهوة عربية بالهيل والزعفران',
        price: '180',
        description: 'طقم ضيافة متكامل يشمل 500 جرام قهوة خولانية متبلة بالهيل والزعفران النقي مع تمر سكري فاخر.',
        category: 'hospitality',
        stock: 12,
        images: ['https://images.unsplash.com/photo-1595981267035-7b04ec82a897?q=80&w=600&auto=format&fit=crop'],
        ingredients: 'بن خولاني، هيل سوبر، زعفران سوبر نقيل، تمر سكري',
        allergens: 'لا يوجد',
        storageMethod: 'يحفظ في مكان بارد وجاف',
        expiryDuration: 'صالح لمدة 6 أشهر',
        status: 'approved',
      },
    ]);

    // 4. Seed Packages
    await db.insert(packages).values([
      {
        name: 'باقة تمكين الأسرة الحرفية التنافسية',
        description: 'باقة مخصصة للأسر المنتجة والحرفيين للحصول على هوية بصرية، اعتماد جودة، وسطح عرض بالمتجر.',
        targetCategory: 'producer',
        price: '499 ر.س / سنوياً',
        features: [
          'صفحة أسرة مستقلة مع QR Code دائم',
          'عرض حتى 20 منتج معتمد بالمتجر',
          'دعم تسويقي عبر منصة إرث أجيال × TND',
          'إحصائيات المبيعات والوصول التفاعلية',
          'شهادة توثيق جودة معتمدة'
        ],
        durationMonths: 12,
        terms: 'مخصصة للأسر ذات الرخصة الحرفية أو نفاذ.',
        isActive: true,
      },
      {
        name: 'باقة ضيافة المعتمر والبركة المكية',
        description: 'باقة متكاملة للمعتمرين والزوار تشمل التوصيل المباشر للفندق، وجبات وسليق حجازي، وهدايا سدو.',
        targetCategory: 'pilgrim',
        price: '299 ر.س / رحلة',
        features: [
          'توصيل مباشر للفندق في مكة المكرمة أو المدينة المنورة',
          'وجبة سليق حجازي طازجة لشخصين',
          'علبة معمول عجوة المدينة الفاخر',
          'هدية تذكارية سدو منسوجة يدوياً'
        ],
        durationMonths: 1,
        terms: 'متاحة للمعتمرين والزوار طوال العام.',
        isActive: true,
      },
      {
        name: 'باقة التفكير والنماء الريادية الشاملة',
        description: 'باقة احترافية للأسر الراغبة بالتوسع والربط مع الفنادق والمتاجر الكبرى.',
        targetCategory: 'producer',
        price: '899 ر.س / سنوياً',
        features: [
          'عرض غير محدود للمنتجات بالمتجر',
          'أولوية الاعتماد والمراجعة السريعة (خلال 24 ساعة)',
          'ربط مباشر مع طلبات التوريد بالفنادق والمؤسسات',
          'ورش تدريبية استشارية من مؤسسة التفكير والنماء TND'
        ],
        durationMonths: 12,
        terms: 'تشمل استشارات ريادية متخصصة.',
        isActive: true,
      }
    ]);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during database seed:', error);
  }
}
