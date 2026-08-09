import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Heart, 
  BookOpen, 
  ChevronLeft, 
  CheckCircle, 
  Clock, 
  Info, 
  Sparkles, 
  ShieldAlert, 
  Coffee, 
  Compass, 
  User, 
  UtensilsCrossed, 
  Search, 
  Bell, 
  ShoppingCart,
  Check,
  Star,
  Users
} from 'lucide-react';

interface SmartJourneyProps {
  profile: any;
  subscription: any;
  onUpdateSubscription: (sub: any) => void;
}

export default function SmartJourney({ profile, subscription, onUpdateSubscription }: SmartJourneyProps) {
  const [selectedDay, setSelectedDay] = useState<string>('الأحد');
  const [activeTab, setActiveTab] = useState<'calendar' | 'dish_stories' | 'health_filter' | 'group_catering'>('calendar');
  
  // Health preferences states
  const [healthCondition, setHealthCondition] = useState<string[]>(['low_sodium']);
  const [selectedCity, setSelectedCity] = useState<string>('مكة المكرمة');
  const [onboardingData, setOnboardingData] = useState<any>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('onboarding_answers');
      if (stored) {
        const data = JSON.parse(stored);
        setOnboardingData(data);
        if (data.visitorHealth && Array.isArray(data.visitorHealth)) {
          const tags: string[] = [];
          if (data.visitorHealth.includes('diabetes')) {
            tags.push('low_sugar', 'diabetic');
          }
          if (data.visitorHealth.includes('allergy')) {
            tags.push('gluten_free', 'nut_free');
          }
          if (data.visitorHealth.includes('diet')) {
            tags.push('low_carb', 'keto');
          }
          if (tags.length > 0) {
            setHealthCondition(tags);
          } else {
            setHealthCondition([]);
          }
        }
        if (data.visitorLocation) {
          if (data.visitorLocation.includes('مكة')) {
            setSelectedCity('مكة المكرمة');
          } else if (data.visitorLocation.includes('المدينة')) {
            setSelectedCity('المدينة المنورة');
          } else if (data.visitorLocation.includes('الرياض')) {
            setSelectedCity('الرياض');
          } else if (data.visitorLocation.includes('عسير') || data.visitorLocation.includes('أبها')) {
            setSelectedCity('عسير - أبها');
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);
  
  // Story interactive state
  const [selectedStory, setSelectedStory] = useState<string>('jareesh');

  // Interactive suggestions 8-15 states
  const [reviews, setReviews] = useState<Array<{ id: number, day: string, author: string, stars: number, text: string, date: string }>>([
    { id: 1, day: 'السبت', author: 'أبو فهد (معتمر كويتي)', stars: 5, text: 'الجريش طعم مدهش ونظيف للغاية ويذكرنا ببيوتنا الأولى، بارك الله في أصحاب الأيدي المنتجة.', date: 'أمس' },
    { id: 2, day: 'الأحد', author: 'الحاج عبد الرحمن (مصر)', stars: 5, text: 'الرز الحساوي الأصيل فاجأني بنكهته الغنية وسهولة هضمه. الكبسة كانت ممتازة والتوصيل في الموعد تماماً.', date: 'منذ يومين' }
  ]);
  const [ratingStars, setRatingStars] = useState<number>(5);
  const [reviewText, setReviewText] = useState<string>('');
  const [isPlayingStory, setIsPlayingStory] = useState<boolean>(false);
  const [selectedHotel, setSelectedHotel] = useState<string>('فندق أنوار المدينة بفندق ماريوت - المنطقة المركزية مكة');
  const [customHotelText, setCustomHotelText] = useState<string>('');
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot', text: string }>>([
    { sender: 'bot', text: 'مرحباً بك ضيف الرحمن! أنا مرشدك الغذائي الذكي من ورث أجيال. هل لديك أي استفسار حول المكونات التراثية أو الحساسية أو الوجبات المخصصة؟' }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [mealPlanType, setMealPlanType] = useState<'weekly' | 'monthly'>('weekly');

  const daysOfWeek = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'];

  // Meal Calendar Data
  const [mealCalendar, setMealCalendar] = useState<Record<string, {
    dishName: string;
    chefName: string;
    desc: string;
    storyId: string;
    time: string;
    calories: number;
    healthTags: string[];
    img: string;
    rating: number;
  }>>({
    'السبت': {
      dishName: 'الجريش السعودي الفاخر بالزبدة البلدية',
      chefName: 'أم أحمد للطهي التراثي',
      desc: 'قمح مجروش مطبوخ بالحليب واللبن مع السمن البري والبصل المكرمل بنكهة نجدية أصيلة.',
      storyId: 'jareesh',
      time: '12:30 م - الغداء',
      calories: 450,
      healthTags: ['خالي من السكر', 'غني بالألياف'],
      img: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=400',
      rating: 4.9
    },
    'الأحد': {
      dishName: 'الكبسة الحساوية بالليمون الأسود والأرز الحساوي',
      chefName: 'أم علي للمأكولات الشعبية',
      desc: 'أرز حساوي بني أصيل مع لحم الضأن الطازج وخلطة التوابل الشرقية مع رشة الصنوبر والزبيب.',
      storyId: 'kabsa',
      time: '01:00 م - الغداء',
      calories: 680,
      healthTags: ['مناسب للبروتين العالي'],
      img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400',
      rating: 5.0
    },
    'الاثنين': {
      dishName: 'المرقوق المطبوخ بالخضار الطازجة وحطب السمر',
      chefName: 'أم سارة للطهي التراثي',
      desc: 'رقائق العجين الرقيقة المطبوخة مع مرق اللحم والخضار الموسمية كالكوسا والقرع والباذنجان.',
      storyId: 'marqooq',
      time: '12:45 م - الغداء',
      calories: 380,
      healthTags: ['قليل الصوديوم', 'غني بالفيتامينات'],
      img: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&q=80&w=400',
      rating: 4.8
    },
    'الثلاثاء': {
      dishName: 'الحنيذ التهامي العسيري بالمرخ',
      chefName: 'أسرة فتاة عسير التراثية',
      desc: 'لحم تيس بلدي مندي تحت حرارة الجمر وبين أعواد نبات المرخ الجبلي العطري.',
      storyId: 'haneeth',
      time: '01:30 م - الغداء',
      calories: 720,
      healthTags: ['كيتو دايت'],
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400',
      rating: 4.9
    },
    'الأربعاء': {
      dishName: 'القرصان النجدي اللذيذ باللحم المفروم والقرع',
      chefName: 'مطبخ التراث النبيل المطور',
      desc: 'خبز صاج رقيق جداً مشرب بمرق اللحم ومزين بالخضار المستوية والصلصة النجدية اللذيذة.',
      storyId: 'qursan',
      time: '01:00 م - الغداء',
      calories: 420,
      healthTags: ['قليل الدسم'],
      img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=400',
      rating: 4.7
    },
    'الخميس': {
      dishName: 'السليق الطائفي بالدجاج البلدي المستور',
      chefName: 'أم يوسف للأكلات الغربية المعتمَدة',
      desc: 'أرز مطبوخ بالحليب والسمن والمسكة على الطريقة الطائفية الأصيلة، يقدم مع دقوس الطماطم الحار.',
      storyId: 'saleeq',
      time: '12:30 م - الغداء',
      calories: 590,
      healthTags: ['خالي من الجلوتين'],
      img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400',
      rating: 4.9
    },
    'الجمعة': {
      dishName: 'المطازيز القصيمية المسبكة باللحم والخضار',
      chefName: 'أم سليمان للقمح البلدي',
      desc: 'دوائر العجين المخبوزة من قمح البر والمعجونة يدوياً، والمطبوخة ببطء بمرق اللحم العطري الخاثر.',
      storyId: 'matazeez',
      time: '01:15 م - الغداء',
      calories: 460,
      healthTags: ['حبوب كاملة ممتاز'],
      img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400',
      rating: 5.0
    }
  });

  // Alternative dishes available for drag & drop
  const alternativeDishes = [
    {
      dishName: 'الكليجا القصيمية الفاخرة بالدبس الدافئ',
      chefName: 'أم سليمان للقمح البلدي',
      desc: 'بسكويت تراثي قصيمي محشو بدبس التمر والهيل والقرفة والليمون الأسود المطبوخ ببطء.',
      storyId: 'matazeez',
      time: '04:00 م - العصر',
      calories: 320,
      healthTags: ['طاقة سريعة', 'حبوب كاملة'],
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
      rating: 4.9
    },
    {
      dishName: 'اللحوح الحجازي المسبك بالخضار والعدس',
      chefName: 'أم أحمد للطهي التراثي',
      desc: 'طبقات اللحوح الرقيق المشرب بمرق الخضار والعدس بنكهة حجازية تراثية أصيلة.',
      storyId: 'jareesh',
      time: '01:00 م - الغداء',
      calories: 390,
      healthTags: ['قليل الصوديوم', 'غني بالألياف'],
      img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
      rating: 4.8
    },
    {
      dishName: 'المعصوب الحجازي الملكي بالعسل والقشطة',
      chefName: 'أم علي للمأكولات الشعبية',
      desc: 'طحين بر معجون ومفروم مع الموز والسمن والقشطة ومغطى بعسل السدر الطبيعي المصفى.',
      storyId: 'kabsa',
      time: '08:00 ص - الإفطار',
      calories: 520,
      healthTags: ['طاقة نشطة', 'فطور متميز'],
      img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=400',
      rating: 5.0
    }
  ];

  // Drag and Drop & click-swap States
  const [draggedDish, setDraggedDish] = useState<any>(null);
  const [selectedAltDish, setSelectedAltDish] = useState<any>(null);

  const handleDragStart = (e: React.DragEvent, dish: any) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(dish));
    setDraggedDish(dish);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetDay: string) => {
    e.preventDefault();
    try {
      const dataStr = e.dataTransfer.getData('text/plain');
      const dish = dataStr ? JSON.parse(dataStr) : draggedDish;
      if (dish) {
        setMealCalendar(prev => ({
          ...prev,
          [targetDay]: {
            ...dish,
            time: prev[targetDay]?.time || dish.time
          }
        }));
        setDraggedDish(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectAltDishClick = (dish: any) => {
    setSelectedAltDish((prev: any) => prev?.dishName === dish.dishName ? null : dish);
  };

  const handleDayClickToSwap = (day: string) => {
    if (selectedAltDish) {
      setMealCalendar(prev => ({
        ...prev,
        [day]: {
          ...selectedAltDish,
          time: prev[day]?.time || selectedAltDish.time
        }
      }));
      setSelectedAltDish(null);
    } else {
      setSelectedDay(day);
    }
  };

  // Dish Stories database for visual storytelling
  const dishStories: Record<string, {
    title: string;
    origin: string;
    era: string;
    historyText: string;
    heritageImportance: string;
    culturalFact: string;
  }> = {
    'jareesh': {
      title: 'الجريش النجدي',
      origin: 'إقليم نجد - وسط الجزيرة العربية',
      era: 'منذ عهود ما قبل الإسلام وعصر صدر الإسلام الأول',
      historyText: 'يُعد الجريش سيد المائدة النجدية وأقدم طبق شعبي وطني موثق. تذكر كتب التراث العربي القديم كيف كان القمح يجرش يدوياً بالمراحي الحجرية ويوضع في قدور الطين الفخارية ويطبخ بالماء واللبن لساعات طويلة حتى يتماسك، وكان رمزاً للضيافة والكرم والاجتماعات العائلية الممتدة.',
      heritageImportance: 'تم اعتماده مؤخراً من قبل هيئة فنون الطهي كطبق وطني رسمي يمثل تراث وثقافة المملكة العربية السعودية للعالم أجمع.',
      culturalFact: 'تسميته تأتي من طريقة جرش حبوب القمح الكاملة بخشونة دون طحنها ناعماً، مما يحافظ على قيمتها الغذائية وقشرتها الغنية بالألياف الطبيعية.'
    },
    'kabsa': {
      title: 'الكبسة السعودية الحساوية',
      origin: 'المنطقة الشرقية (الأحساء) والمملكة عامة',
      era: 'مئات السنين من التجارة والتبادل عبر الموانئ القديمة',
      historyText: 'نشأت الكبسة كتجانس عبقري بين الأرز المستورد عبر تجارة التوابل والبهارات المارة بموانئ الخليج العربي وبين اللحوم والخضار المحلية. تتميز النسخة الحساوية باستخدام الأرز البني الأحسائي النادر الذي يُزرع في عيون واحة الأحساء الشهيرة ويعد من أغلى أنواع الأرز عالمياً.',
      heritageImportance: 'الكبسة تمثل روح الكرم الجماعي السعودي، حيث يتم مشاركتها في صحن واحد كبير لتعميق الترابط والمحبة.',
      culturalFact: 'تسمى بالكبسة لأن كافة المكونات من أرز ولحم وبهارات تًكبس معاً في قدر واحد مغلق ببطء لتمتص الطعم الغني.'
    },
    'marqooq': {
      title: 'المرقوق التراثي',
      origin: 'نجد والمناطق الشمالية والوسطى',
      era: 'بدايات العصور الإسلامية',
      historyText: 'هو مرق غني باللحم والخضار تطرح فيه رقائق العجين الرقيقة المصنوعة من البر بانتظام واحدة تلو الأخرى لتمتص المرق الخاثر وتستوي على نار هادئة. يعكس المرقوق تكيف سكان الصحراء والقرى مع الخضار الموسمية المتوفرة والدقيق الذي تجود به مزارع النخيل والواحات.',
      heritageImportance: 'طبق شتوي بامتياز يمد الجسم بالطاقة والدفء ومصنف كصنف أساسي في رحلة التثقيف الغذائي السياحي.',
      culturalFact: 'يعود اسمه لفعل "الرق" حيث يتم مد العجينة وورقها يدوياً حتى تكاد تصبح شفافة ثم تُنزل فوراً بمرق اللحم العارم.'
    },
    'haneeth': {
      title: 'الحنيذ التهامي الجنوبي',
      origin: 'تهامة عسير والمناطق الجنوبية للمملكة',
      era: 'آلاف السنين من طبخ الحجر والمندي الأرضي',
      historyText: 'الحنيذ ليس مجرد طريقة طهو بل طقس اجتماعي عريق. يُطهى اللحم بوضعه فوق جمر الحطب المتقد وفصل طبقات اللحم عن بعضها بأغصان نبات "المرخ" المحلي الذي يضفي نكهة عطرية طبيعية لا تقاوم ويسهل نضج اللحم بطريقة صحية مدهشة تفصل الشحوم الزائدة.',
      heritageImportance: 'يعتبر الوجبة الرئيسية في كافة الاحتفالات والأعياد الجنوبية والوفود الدبلوماسية والسياحية في عسير.',
      culturalFact: 'تغطية اللحم بالمرخ تمنحه طبقة عازلة تحفظ الرطوبة وتمنع احتراقه باللهب المباشر مما يجعله طرياً يذوب كالمسكة.'
    }
  };

  const currentMeal = mealCalendar[selectedDay] || mealCalendar['الأحد'];
  const currentStory = dishStories[selectedStory] || dishStories['jareesh'];

  const toggleHealthCondition = (cond: string) => {
    if (healthCondition.includes(cond)) {
      setHealthCondition(healthCondition.filter(c => c !== cond));
    } else {
      setHealthCondition([...healthCondition, cond]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-4 bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden text-right" id="smart-journey-container" dir="rtl">
      
      {/* Banner */}
      <div className="bg-primary text-stone-100 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-stone-200" id="journey-banner">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-accent/20 rounded-2xl border border-accent/30 text-accent">
            <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '20s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-black">بوابة "رحلتي الذكية" للزوار والمعتمرين</h2>
              <span className="bg-accent text-primary text-[9px] font-black px-2.5 py-0.5 rounded-full">Screen 8</span>
            </div>
            <p className="text-stone-300 text-xs mt-1 max-w-xl">
              تصفح خطتك الغذائية، ومواعيد وجباتك المجدولة المنبثقة من مطابخ الأسر التراثية المعتمدة، مع الفلاتر الصحية والقصص العتيقة لكل أكلة.
            </p>
          </div>
        </div>

        {/* User Pilgrim Status */}
        <div className="bg-white/10 border border-white/15 p-3.5 rounded-2xl text-xs space-y-1 text-center md:text-right min-w-[200px]">
          <div className="flex items-center justify-between gap-4">
            <span className="text-stone-300">نوع عضويتك التراثية:</span>
            <span className="font-extrabold text-accent">العضوية الذهبية 👑</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-stone-300">المدينة الحالية:</span>
            <span className="font-extrabold text-white flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>{selectedCity}</span>
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-stone-300">أيام متبقية بالرحلة:</span>
            <span className="font-mono font-bold text-stone-100">12 يوم</span>
          </div>
        </div>
      </div>

      {/* Customized Onboarding Welcome Status Bar */}
      {onboardingData && (
        <div className="bg-gradient-to-r from-emerald-500/10 via-amber-500/5 to-transparent border-b border-stone-150 p-4 px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-700">
          <div className="flex items-center gap-2">
            <span className="text-accent text-sm">✨</span>
            <div>
              <span className="font-bold text-primary block sm:inline">أهلاً بك {onboardingData.name || 'ضيف الرحمن'}! </span>
              <span className="font-light text-stone-600">قمنا بتخصيص خطتك وجدولك بناءً على هدفك: <strong className="text-primary">{onboardingData.visitorGoal}</strong></span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            {onboardingData.visitorDeliveryTime && (
              <span className="bg-primary/5 border border-primary/20 text-primary font-bold px-2.5 py-1 rounded-lg">
                🚚 وقت الاستلام المفضل: {onboardingData.visitorDeliveryTime}
              </span>
            )}
            {onboardingData.visitorFamilySize && (
              <span className="bg-amber-500/10 border border-amber-500/20 text-stone-800 font-bold px-2.5 py-1 rounded-lg">
                👥 باقتك العائلية: {onboardingData.visitorFamilySize} أفراد
              </span>
            )}
          </div>
        </div>
      )}

      {/* Tabs navigation for Screen 8 features */}
      <div className="flex border-b border-stone-100 bg-stone-50 overflow-x-auto" id="journey-tabs">
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex-1 py-4 px-5 text-center text-xs md:text-sm font-bold transition-all border-b-2 flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'calendar' ? 'border-primary text-primary bg-white' : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Calendar className="w-4 h-4 text-accent" />
          <span>جدول وجباتي المجدول الدروي</span>
        </button>

        <button
          onClick={() => setActiveTab('dish_stories')}
          className={`flex-1 py-4 px-5 text-center text-xs md:text-sm font-bold transition-all border-b-2 flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'dish_stories' ? 'border-primary text-primary bg-white' : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <BookOpen className="w-4 h-4 text-accent" />
          <span>سجل "قصة الطبخة" التراثية</span>
        </button>

        <button
          onClick={() => setActiveTab('health_filter')}
          className={`flex-1 py-4 px-5 text-center text-xs md:text-sm font-bold transition-all border-b-2 flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'health_filter' ? 'border-primary text-primary bg-white' : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Heart className="w-4 h-4 text-accent" />
          <span>الفلاتر الصحية والذكية للوفود</span>
        </button>

        <button
          onClick={() => setActiveTab('group_catering')}
          className={`flex-1 py-4 px-5 text-center text-xs md:text-sm font-bold transition-all border-b-2 flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'group_catering' ? 'border-primary text-primary bg-white' : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Users className="w-4 h-4 text-accent" />
          <span>ضيافة حملات الحج والعمرة</span>
        </button>
      </div>

      <div className="p-6 md:p-8">
        
        {/* TAB 1: MEAL CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="space-y-6" id="calendar-view">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-stone-50 border border-stone-200 p-4 rounded-2xl">
              <div className="space-y-1">
                <h3 className="font-bold text-stone-800 text-sm flex items-center gap-1.5">
                  <UtensilsCrossed className="w-4 h-4 text-primary" />
                  <span>برنامج الغداء التراثي اليومي لرحلتك</span>
                </h3>
                <p className="text-stone-500 text-[11px]">
                  معد من المكونات البلدية الطازجة ومعبأ ومغلف بمعايير النظافة المعتمدة ويصل لغرفتك أو مخيمك ساخناً.
                </p>
              </div>

              {/* City switcher for local geofenced culinary mapping */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 whitespace-nowrap">عرض الوجبات بمدينة:</span>
                <select 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-white border border-stone-200 p-1.5 rounded-lg text-xs font-bold text-primary focus:outline-none"
                >
                  <option value="مكة المكرمة">📍 مكة المكرمة</option>
                  <option value="المدينة المنورة">📍 المدينة المنورة</option>
                  <option value="الرياض">📍 الرياض</option>
                  <option value="عسير">📍 عسير</option>
                </select>
              </div>
            </div>

            {/* Week days selector */}
            <div className="flex justify-between gap-1 overflow-x-auto pb-2" id="days-selector-grid">
              {daysOfWeek.map((day) => {
                const isSelected = selectedDay === day;
                const dayMeal = mealCalendar[day];
                return (
                  <button
                    key={day}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, day)}
                    onClick={() => handleDayClickToSwap(day)}
                    className={`flex-1 py-3 px-2 rounded-xl text-center text-xs font-bold transition-all border flex flex-col items-center gap-1 min-w-[75px] cursor-pointer relative ${
                      isSelected
                        ? 'bg-primary text-accent border-primary shadow-md scale-105'
                        : selectedAltDish
                        ? 'bg-amber-50 border-dashed border-amber-300 text-stone-700 animate-pulse'
                        : 'bg-white border-stone-200 text-stone-600 hover:border-primary/20'
                    }`}
                  >
                    <span>{day}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-light block ${isSelected ? 'bg-accent text-primary' : 'bg-stone-100 text-stone-500'}`}>
                      {dayMeal ? 'وجبة 🍛' : 'فارغ'}
                    </span>
                    {selectedAltDish && (
                      <span className="absolute -top-1 -left-1 bg-amber-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                        ↓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected day meal showcase detail card */}
            <motion.div 
              key={selectedDay}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-12"
            >
              {/* Product preview image */}
              <div className="md:col-span-5 relative h-64 md:h-auto bg-stone-100">
                <img src={currentMeal.img} alt={currentMeal.dishName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-xs text-accent text-[10px] font-bold px-3 py-1 rounded-full border border-accent/20">
                  {currentMeal.time}
                </div>
                {/* Visual indicator of the chef family rating */}
                <div className="absolute bottom-3 right-3 bg-white/95 text-stone-800 text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                  <span>{currentMeal.rating} / 5</span>
                  <span className="text-stone-400 font-normal">(مطبخ موثق)</span>
                </div>
              </div>

              {/* Meal description, health warnings and action buttons */}
              <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-accent/15 text-primary font-bold px-2.5 py-0.5 rounded-full border border-accent/10">
                      وجبة اليوم المتكاملة ({selectedDay})
                    </span>
                    <span className="text-[10px] text-stone-400 font-light">مفلترة بالذكاء الاصطناعي وصحية</span>
                  </div>

                  <h4 className="font-extrabold text-stone-800 text-base md:text-lg leading-tight">
                    {currentMeal.dishName}
                  </h4>

                  <div className="flex items-center gap-1 bg-stone-50 border border-stone-100 p-2.5 rounded-xl text-xs text-stone-600">
                    <User className="w-4 h-4 text-accent" />
                    <span>من إعداد وتطوير:</span>
                    <strong className="text-primary font-bold">{currentMeal.chefName}</strong>
                    <span className="text-stone-400 text-[10px] bg-stone-200/50 px-1.5 py-0.5 rounded mr-auto">مشروع معتمد</span>
                  </div>

                  {/* Suggestion 9: Daily Nutrition & Carb Breakdown */}
                  <div className="bg-stone-50 p-3 rounded-2xl border border-stone-100 space-y-2 text-right">
                    <span className="text-[10px] text-stone-500 font-bold block">التركيب الغذائي والماكروز الدقيق للوجبة:</span>
                    <div className="grid grid-cols-3 gap-2 text-[9px]">
                      <div>
                        <div className="flex justify-between text-stone-600 mb-0.5">
                          <span>نشويات معقدة:</span>
                          <span className="font-bold">45%</span>
                        </div>
                        <div className="w-full bg-stone-200 h-1 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-stone-600 mb-0.5">
                          <span>بروتين بلدي:</span>
                          <span className="font-bold">35%</span>
                        </div>
                        <div className="w-full bg-stone-200 h-1 rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-stone-600 mb-0.5">
                          <span>دهون صحية:</span>
                          <span className="font-bold">20%</span>
                        </div>
                        <div className="w-full bg-stone-200 h-1 rounded-full overflow-hidden">
                          <div className="bg-orange-400 h-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Suggestion 10: Chef Family Story Audio Playback Simulation */}
                  <div className="bg-amber-50/60 border border-amber-100 p-3 rounded-xl flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🎙️</span>
                      <div>
                        <span className="font-bold text-stone-800 block">حكاية الطاهية بصوتها:</span>
                        <span className="text-[9px] text-stone-500">استمع لـ "القصة الصوتية التراثية" ملهمة ومسجلة</span>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setIsPlayingStory(!isPlayingStory)}
                      className="bg-primary text-accent hover:bg-primary/95 px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 shadow-xs transition-all"
                    >
                      <span>{isPlayingStory ? '⏸️ إيقاف مؤقت' : '▶️ استمع للقصة'}</span>
                    </button>
                  </div>

                  {isPlayingStory && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-amber-50/30 p-2 rounded-xl border border-dashed border-amber-100 flex items-center justify-center gap-1.5"
                    >
                      <span className="text-[9px] text-stone-400 font-mono">0:14 / 2:30</span>
                      <div className="flex gap-0.5 items-center h-4">
                        {[1,2,3,4,5,4,3,2,1,2,3,4,5,4,3,2,1].map((h, i) => (
                          <div 
                            key={i} 
                            className="w-[3px] bg-primary rounded-full animate-pulse" 
                            style={{ 
                              height: `${h * 3}px`,
                              animationDelay: `${i * 0.1}s`
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] text-primary font-bold">جاري تشغيل محاكي الصوت التراثي...</span>
                    </motion.div>
                  )}

                  <p className="text-stone-500 text-xs font-light leading-relaxed">
                    {currentMeal.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {currentMeal.healthTags.map((tag, idx) => (
                      <span key={idx} className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>{tag}</span>
                      </span>
                    ))}
                    <span className="bg-stone-100 text-stone-600 text-[10px] font-mono px-2 py-0.5 rounded-full">
                      🔥 {currentMeal.calories} سعرة حرارية
                    </span>
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-4 flex flex-wrap items-center justify-between gap-3">
                  <button 
                    onClick={() => {
                      setSelectedStory(currentMeal.storyId);
                      setActiveTab('dish_stories');
                    }}
                    className="text-primary hover:text-primary/80 font-bold text-xs flex items-center gap-1 transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-accent" />
                    <span>اقرأ قصة وتراث هذه الأكلة الأصيلة</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold px-4 py-2 rounded-xl transition-all">
                      استبدال الطبق
                    </button>
                    <button className="bg-primary hover:bg-primary/95 text-accent text-xs font-bold px-5 py-2 rounded-xl transition-all shadow-md flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      <span>تأكيد موعد التوصيل</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Suggestion 11: Drag and Drop & click-to-swap Heritage Alternative Dishes Pool */}
            <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-stone-800 text-xs md:text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                    <span>مخزن الأطباق البديلة المتاحة للجدولة والتبديل التفاعلي</span>
                  </h4>
                  <p className="text-[10px] text-stone-500 font-light">
                    💡 اسحب أي من الأطباق التالية وأفلته على أحد أيام الأسبوع بالأعلى، أو اضغط على الطبق ثم اضغط على اليوم المراد استبداله!
                  </p>
                </div>
                {selectedAltDish && (
                  <button 
                    onClick={() => setSelectedAltDish(null)}
                    className="bg-amber-100 text-amber-800 text-[10px] px-3 py-1 rounded-full font-bold hover:bg-amber-200 transition-all self-start sm:self-auto cursor-pointer"
                  >
                    إلغاء التحديد (×)
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {alternativeDishes.map((altDish, idx) => {
                  const isSelectedForSwap = selectedAltDish?.dishName === altDish.dishName;
                  return (
                    <div
                      key={idx}
                      draggable="true"
                      onDragStart={(e) => handleDragStart(e, altDish)}
                      onClick={() => handleSelectAltDishClick(altDish)}
                      className={`bg-white rounded-2xl border p-3.5 flex gap-3 cursor-grab active:cursor-grabbing transition-all hover:shadow-md ${
                        isSelectedForSwap 
                          ? 'border-amber-400 ring-2 ring-amber-400/50 scale-[1.02]' 
                          : 'border-stone-200 hover:border-accent/40'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100">
                        <img src={altDish.img} alt={altDish.dishName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[10px] font-bold text-stone-700 truncate">{altDish.dishName}</span>
                          <span className="text-[9px] bg-amber-50 text-accent font-black px-1.5 py-0.2 rounded flex items-center gap-0.5 shrink-0">
                            ★ {altDish.rating}
                          </span>
                        </div>
                        <p className="text-[9px] text-stone-400 truncate leading-relaxed">{altDish.desc}</p>
                        <div className="flex items-center justify-between text-[9px] pt-1">
                          <span className="text-stone-500">🔥 {altDish.calories} سعرة</span>
                          <span className="text-primary font-bold">{altDish.chefName}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order simulated status timeline (Step 4 of User Journey) */}
            <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-4">
              <h4 className="font-bold text-stone-800 text-xs md:text-sm flex items-center gap-1.5">
                <Clock className="w-4.5 h-4.5 text-accent" />
                <span>محاكي التوصيل والتتبع اللوجستي المباشر (وجبة اليوم)</span>
              </h4>

              <div className="grid grid-cols-4 gap-3 relative" id="delivery-timeline-grid">
                {/* Timeline progress line */}
                <div className="absolute top-4 left-[12%] right-[12%] h-1 bg-stone-200 z-0">
                  <div className="w-[75%] h-full bg-emerald-600"></div>
                </div>

                <div className="text-center z-10 space-y-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mx-auto shadow-sm">
                    ✓
                  </div>
                  <span className="text-stone-800 text-[10px] md:text-xs font-bold block">طلب معتمَد</span>
                  <span className="text-stone-400 text-[9px] block">09:00 ص</span>
                </div>

                <div className="text-center z-10 space-y-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mx-auto shadow-sm">
                    ✓
                  </div>
                  <span className="text-stone-800 text-[10px] md:text-xs font-bold block">قيد الطهو بالفخار</span>
                  <span className="text-stone-400 text-[9px] block">11:15 ص</span>
                </div>

                <div className="text-center z-10 space-y-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mx-auto shadow-sm animate-pulse">
                    🚚
                  </div>
                  <span className="text-emerald-700 text-[10px] md:text-xs font-black block">جاري التوصيل</span>
                  <span className="text-stone-400 text-[9px] block">12:10 م (جاهز API)</span>
                </div>

                <div className="text-center z-10 space-y-1">
                  <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-400 flex items-center justify-center font-bold text-xs mx-auto border border-stone-300">
                    🏠
                  </div>
                  <span className="text-stone-400 text-[10px] md:text-xs block font-bold">وصول متوقع</span>
                  <span className="text-stone-400 text-[9px] block">12:35 م</span>
                </div>
              </div>
            </div>

            {/* Suggestion 12 & 13: Interactive Delivery Address Marker & Pilgrim Achievement Rewards Progress */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Hotel Address Mapping Widget */}
              <div className="bg-white border border-stone-200 p-5 rounded-2xl space-y-3 text-right shadow-xs">
                <div className="flex items-center gap-2 text-primary font-bold text-xs">
                  <span>📍</span>
                  <span>عنوان التوصيل وتحديد موقع الفندق بمكة/المدينة</span>
                </div>
                <p className="text-[10px] text-stone-400 leading-normal font-light">
                  حدد فندق إقامتك الحالي من القائمة لنقوم بتوجيه سائق التوصيل المحلي لموقع الفندق بدقة متكاملة.
                </p>
                <div className="space-y-1.5">
                  {[
                    'فندق أنوار المدينة بفندق ماريوت - المنطقة المركزية مكة',
                    'فندق فيرمونت برج الساعة - مكة المكرمة',
                    'فندق أوبروي - المنطقة المركزية المدينة المنورة',
                    'فندق دار التقوى - المدينة المنورة'
                  ].map((hotel, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedHotel(hotel)}
                      className={`w-full p-2.5 rounded-xl border text-right text-[11px] block transition-all ${
                        selectedHotel === hotel 
                          ? 'border-primary bg-primary/5 font-bold text-primary' 
                          : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                      }`}
                    >
                      {hotel} {selectedHotel === hotel && '✓'}
                    </button>
                  ))}
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-stone-600">أو اكتب عنواناً/رقم الغرفة يدوياً:</label>
                  <input
                    type="text"
                    value={customHotelText}
                    onChange={(e) => {
                      setCustomHotelText(e.target.value);
                      setSelectedHotel(e.target.value);
                    }}
                    placeholder="مثال: فندق موفنبيك هاجر، برج أ، الطابق 14، غرفة 1402"
                    className="w-full p-2 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  />
                </div>
              </div>

              {/* Pilgrim Badge & Achievements Widget */}
              <div className="bg-gradient-to-br from-primary to-[#0A4B27] text-white p-5 rounded-2xl space-y-4 shadow-sm text-right relative overflow-hidden">
                <div className="absolute top-0 left-0 w-24 h-24 bg-accent opacity-10 rounded-full blur-xl -ml-6 -mt-6"></div>
                <div className="space-y-1">
                  <span className="text-[10px] bg-accent/20 text-accent font-bold px-2.5 py-0.5 rounded-full border border-accent/30 inline-block">الأثر والنقاط التراثية</span>
                  <h4 className="font-extrabold text-white text-xs md:text-sm">رصيد أوسمة الولاء والتمكين</h4>
                  <p className="text-stone-300 text-[10px] leading-relaxed font-light">
                    بطلبك من الأسر المنتجة، أنت لا تتناول طعاماً شهياً فحسب، بل تمكن أسرة سعودية اقتصادياً وترفع نقاط دعم الموروث لديك!
                  </p>
                </div>

                <div className="bg-white/10 p-3 rounded-xl border border-white/5 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>الرصيد التراكمي:</span>
                    <span className="text-accent font-mono">1,420 نقطة إرثية</span>
                  </div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-accent h-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-between text-[9px] text-stone-300">
                    <span>مستوى المروّج التراثي</span>
                    <span>باقي 80 نقطة للوسام البلاتيني</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[9px]">
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5 text-center">
                    <span className="text-lg block">🛡️</span>
                    <span className="font-bold text-accent block">حامي الموروث</span>
                    <span className="text-stone-300 text-[8px] font-light">مفعل بطلبين من طهي مكة</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5 text-center opacity-70">
                    <span className="text-lg block">👑</span>
                    <span className="font-bold text-accent block">المستكشف الذهبي</span>
                    <span className="text-stone-300 text-[8px] font-light">قفل: اطلب وجبة حساوية</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestion 11: Interactive Rating & Live Review Form */}
            <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-4 text-right">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-stone-800 text-xs md:text-sm">آراء وتقييمات الوفود والمعتمرين لطبق ({currentMeal.dishName})</h4>
                <span className="text-[10px] text-stone-400">عدد التقييمات: {reviews.filter(r => r.day === selectedDay).length + 4} تقييمات</span>
              </div>

              {/* Reviews list */}
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {reviews.map((r, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-800 text-xs">{r.author}</span>
                        <div className="flex text-accent text-[10px]">
                          {Array.from({ length: r.stars }).map((_, idx) => (
                            <Star key={idx} className="w-3 h-3 fill-accent text-accent" />
                          ))}
                        </div>
                      </div>
                      <p className="text-stone-500 text-[11px] font-light">{r.text}</p>
                    </div>
                    <span className="text-[9px] text-stone-400 whitespace-nowrap">{r.date}</span>
                  </div>
                ))}
              </div>

              {/* Form to submit review */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!reviewText.trim()) return;
                  const newReview = {
                    id: Date.now(),
                    day: selectedDay,
                    author: profile?.name || 'معتمر كريم',
                    stars: ratingStars,
                    text: reviewText,
                    date: 'الآن'
                  };
                  setReviews([newReview, ...reviews]);
                  setReviewText('');
                  setRatingStars(5);
                }}
                className="bg-white border border-stone-200 p-4 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-bold text-stone-700">اضغط لتقييم وجبة اليوم وإرسال تعليقك المباشر:</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingStars(star)}
                        className="text-accent hover:scale-125 transition-all focus:outline-none"
                      >
                        <Star className={`w-5 h-5 ${star <= ratingStars ? 'fill-accent text-accent' : 'text-stone-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="اكتب رأيك الصادق في الطعم والنظافة والتوصيل..."
                    className="w-full p-2.5 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary/95 text-accent font-bold px-4 py-2.5 rounded-xl text-xs shadow-xs transition-all whitespace-nowrap"
                  >
                    نشر التقييم
                  </button>
                </div>
              </form>
            </div>

          </div>
        )}

        {/* TAB 2: DISH STORIES (Storytelling Shopping) */}
        {activeTab === 'dish_stories' && (
          <div className="space-y-6" id="stories-view">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs bg-accent/20 text-primary font-bold px-3 py-1 rounded-full border border-accent/20">ثقافة الموروث والطهي السعودي</span>
              <h3 className="font-extrabold text-stone-800 text-lg md:text-xl">ميزة "قصة الطبخة" لربط الزائر عاطفياً وثقافياً</h3>
              <p className="text-stone-500 text-xs font-light">
                استكشف الجذور التاريخية لكل طبق نعده لك، لتجرب وتستمتع بمأكولات غنية بالتاريخ والبطولات والكرم الأصيل.
              </p>
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4" id="stories-tabs">
              {Object.keys(dishStories).map((key) => {
                const story = dishStories[key];
                const isSelected = selectedStory === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedStory(key)}
                    className={`p-4 rounded-2xl text-right transition-all border ${
                      isSelected
                        ? 'bg-primary text-accent border-primary shadow-md scale-[1.02]'
                        : 'bg-white border-stone-200 hover:border-accent text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Coffee className={`w-5 h-5 mb-2 ${isSelected ? 'text-accent' : 'text-stone-400'}`} />
                    <span className="text-xs md:text-sm font-extrabold block">{story.title}</span>
                    <span className={`text-[10px] block mt-1 font-light ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>{story.origin}</span>
                  </button>
                );
              })}
            </div>

            {/* Story Showcase Content */}
            <motion.div
              key={selectedStory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-bgwarm border border-accent/20 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden"
            >
              {/* Decorative background logo */}
              <div className="absolute -bottom-10 -left-10 text-primary/5 select-none pointer-events-none">
                <Compass className="w-56 h-56" />
              </div>

              <div className="border-b border-accent/20 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-black text-stone-800 text-lg md:text-xl">{currentStory.title}</h4>
                  <p className="text-stone-500 text-xs mt-1">الأصل الجغرافي: <strong className="text-primary">{currentStory.origin}</strong></p>
                </div>
                <div className="bg-primary/10 text-primary text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full border border-primary/20">
                  العصر التاريخي: {currentStory.era}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h5 className="font-bold text-stone-800 text-sm flex items-center gap-1 text-primary">
                    <BookOpen className="w-4 h-4 text-accent" />
                    <span>تاريخ وحكايات الطبخة العريقة:</span>
                  </h5>
                  <p className="text-stone-600 text-xs md:text-sm leading-relaxed font-light text-justify">
                    {currentStory.historyText}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-accent/10">
                  <div className="bg-white/80 border border-stone-200 p-4 rounded-xl space-y-1">
                    <h6 className="font-bold text-stone-800 text-xs flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                      <span>الأهمية الإرثية والمعاصرة:</span>
                    </h6>
                    <p className="text-stone-500 text-xs font-light leading-relaxed">
                      {currentStory.heritageImportance}
                    </p>
                  </div>

                  <div className="bg-white/80 border border-stone-200 p-4 rounded-xl space-y-1">
                    <h6 className="font-bold text-stone-800 text-xs flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-primary" />
                      <span>حقيقة تراثية طريفة:</span>
                    </h6>
                    <p className="text-stone-500 text-xs font-light leading-relaxed">
                      {currentStory.culturalFact}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* TAB 3: HEALTH FILTERS AND AI CUSTOMIZATION */}
        {activeTab === 'health_filter' && (
          <div className="space-y-6" id="health-view">
            <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl text-right space-y-2">
              <h3 className="font-bold text-stone-800 text-sm flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>الفلترة الصحية وتفضيلات السلامة للوفود</span>
              </h3>
              <p className="text-stone-500 text-xs font-light leading-relaxed">
                تقوم منصة ورث أجيال بمواءمة الأطعمة والوجبات المصنعة منزلياً لتتوافق بدقة مع الحالة الطبية أو الأهداف الغذائية لزوار الرحمن لضمان طعام صحي، لذيذ، ومطابق للاشتراطات الفنية والبلدية.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Selection Column */}
              <div className="md:col-span-7 bg-white border border-stone-200 p-5 rounded-2xl space-y-4">
                <h4 className="font-bold text-stone-800 text-xs md:text-sm">اختر حالتك الصحية أو تفضيلاتك الغذائية:</h4>
                
                <div className="grid grid-cols-2 gap-3" id="health-options">
                  {[
                    { id: 'low_sodium', label: 'قليل الملح والصوديوم', desc: 'لمرضى الضغط والقلب' },
                    { id: 'diabetic', label: 'صديق لمرضى السكري', desc: 'محسوب الكربوهيدرات' },
                    { id: 'gluten_free', label: 'خالي من الجلوتين', desc: 'لمرضى السيلياك والحساسية' },
                    { id: 'keto', label: 'حمية الكيتو دايت', desc: 'دهون صحية وبروتين مرتفع' },
                    { id: 'lactose_free', label: 'خالي من اللاكتوز', desc: 'لحساسية الحليب ومشتقاته' },
                    { id: 'low_fat', label: 'قليل الدهون والسعرات', desc: 'للتخسيس والوزن المثالي' }
                  ].map((opt) => {
                    const isSelected = healthCondition.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleHealthCondition(opt.id)}
                        className={`p-3 rounded-xl border text-right transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/50 text-stone-800 shadow-xs'
                            : 'border-stone-200 bg-stone-50 hover:border-stone-300 text-stone-600'
                        }`}
                      >
                        <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 ${isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300'}`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold block">{opt.label}</span>
                          <span className="text-[9px] text-stone-400 font-light block">{opt.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="bg-primary/5 p-3.5 rounded-xl border border-primary/10 flex gap-2">
                  <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-stone-600 font-light leading-relaxed">
                    <strong>تنبيه طبي:</strong> تحرص أمانة المنصة على إخضاع الأسر المنتجة لتدريب بلدية مخصص لضمان سلامة الأغذية وخلطهما لمنع حدوث الحساسية المتقاطعة.
                  </p>
                </div>
              </div>

              {/* Live matching results column */}
              <div className="md:col-span-5 bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-4">
                <h4 className="font-bold text-stone-800 text-xs md:text-sm flex items-center gap-1 text-primary">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>توصيات ومطابقة الذكاء الاصطناعي:</span>
                </h4>

                <div className="space-y-3">
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-800">الأطعمة المناسبة لحالتك:</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">ملائمة ممتازة</span>
                    </div>
                    <ul className="space-y-1.5 text-[10px] text-stone-500 font-light">
                      <li className="flex items-center gap-1">✓ الجريش النجدي قليل الملح بالحليب الخفيف.</li>
                      <li className="flex items-center gap-1">✓ المرقوق المحضر بدقيق البر الكامل وخضار الواحة.</li>
                      <li className="flex items-center gap-1">✓ مرق اللحم الصافي المتبل بالهال والزعفران.</li>
                    </ul>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-red-700 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                        <span>أطعمة يوصى بتجنبها:</span>
                      </span>
                      <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-bold">أولوية حذر</span>
                    </div>
                    <p className="text-[10px] text-stone-500 font-light leading-relaxed">
                      يُنصح بالابتعاد عن الكبسة العادية الحارة واللحم الحنيذ الثقيل ذو الدهون المشبعة لتجنب ارتفاع مستويات ضغط الدم ليلاً.
                    </p>
                  </div>
                </div>

                <button className="w-full bg-primary text-accent hover:bg-primary/95 text-xs font-bold py-3 rounded-xl transition-all shadow-sm">
                  حفظ إعدادات الصحة والملف الطبي
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GROUP CATERING */}
        {activeTab === 'group_catering' && (
          <div className="space-y-6" id="catering-view">
            <div className="bg-primary text-white p-6 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
              <div className="space-y-2 text-right">
                <h3 className="font-extrabold text-white text-base md:text-lg">ضيافة وبوفيهات حملات الحج والعمرة التراثية</h3>
                <p className="text-stone-300 text-xs font-light leading-relaxed">
                  هل تدير حملة حج وعمرة أو وفداً سياحياً لبيت الله الحرام؟ تتيح لك منصة ورث أجيال توفير وجبات وبوفيهات شعبية مجهزة بالكامل من قبل الأسر المنتجة المدربة والمحكومة صحياً، لتجربة موروثية ساحرة لضيوف الرحمن.
                </p>
              </div>
              <div className="bg-accent text-primary px-4 py-2 rounded-2xl font-black text-xs text-center whitespace-nowrap">
                خدمة معتمدة للوفود 🇸🇦
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5" id="catering-packages">
              {[
                {
                  title: 'باقة الوفد الميسر (برونز)',
                  price: '18 ريال / وجبة للفرد',
                  desc: 'تشمل وجبة كبسة رئيسية، سلطة دقوس شعبية، ماء، وتمر خلاص فاخر.',
                  features: ['أقل عدد 20 فرد', 'حفظ حراري متميز', 'توصيل مجاني للفنادق في مكة']
                },
                {
                  title: 'باقة ضيافة الكرام (فضي)',
                  price: '29 ريال / وجبة للفرد',
                  desc: 'تشمل تشكيلة وجبات (كبسة وجريش)، سلطات، حلا تراثي (حنيني أو كليجا)، وقهوة سعودية.',
                  features: ['أقل عدد 15 فرد', 'أطباق فخارية فخمة ممتازة', 'عربات تقديم شعبية أنيقة']
                },
                {
                  title: 'باقة بوفيه الموروث الملكي (ذهب)',
                  price: '49 ريال / وجبة للفرد',
                  desc: 'بوفيه شعبي مفتوح كامل يشمل 4 أطباق رئيسية، مقبلات شعبية، صبّابين قهوة وتمر فاخر باللوز والسمسم.',
                  features: ['أقل عدد 30 فرد', 'إشراف ومراقبة صحية بلدية كاملة', 'أواني نحاسية تراثية فخمة']
                }
              ].map((pkg, idx) => (
                <div key={idx} className="bg-white border border-stone-200 p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-primary/30 transition-all shadow-xs">
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-stone-800 text-sm">{pkg.title}</h4>
                    <p className="text-primary font-black text-base font-mono">{pkg.price}</p>
                    <p className="text-stone-500 text-[11px] font-light leading-relaxed">{pkg.desc}</p>
                    
                    <ul className="space-y-1.5 pt-2 text-[10px] text-stone-500">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-primary" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full bg-stone-100 hover:bg-primary/10 text-stone-800 hover:text-primary py-2 rounded-xl text-xs font-bold transition-all border border-transparent hover:border-primary/15">
                    طلب تسعيرة وتنسيق بوفيه
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Suggestion 15: Live Chat Assistance Bot for Pilgrim Accommodations */}
      <div className="border-t border-stone-100 p-4 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" id="chat-bot-footer">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-stone-700">مرشد ضيوف الرحمن التراثي الذكي متصل ومستعد للمساعدة</span>
        </div>
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-accent hover:bg-accent/90 text-primary font-black px-4 py-2 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-sm"
        >
          <span>💬 {chatOpen ? 'إغلاق المساعد الذكي' : 'استشر المساعد الذكي للحساسية والتوصيل'}</span>
        </button>
      </div>

      {chatOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-t border-stone-200 p-4 space-y-4 text-right"
        >
          <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl flex items-center gap-2">
            <span className="text-sm">🤖</span>
            <div>
              <span className="font-bold text-stone-800 text-xs block">مستشارك الصحي واللوجستي الفوري</span>
              <span className="text-[10px] text-stone-400">يجيبك فوراً حول المكونات التراثية، مسببات الحساسية، وتوصيل الفنادق بمكة والمدينة</span>
            </div>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto bg-stone-50/50 p-3 rounded-xl border border-stone-100" id="chat-messages-container">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`p-2.5 rounded-2xl text-xs max-w-[80%] leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none shadow-xs'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick FAQ buttons */}
          <div className="flex flex-wrap gap-1.5 justify-start">
            {[
              'هل الوجبات خالية من الغلوتين؟ 🌾',
              'كيف أغير الفندق المسجل للتوصيل؟ 📍',
              'هل اللحوم المستخدمة بلدية طازجة؟ 🥩',
              'أريد تقليل مستوى الملح والبهارات 🌶️'
            ].map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  const userMsg = q;
                  const currentMsgs = [...chatMessages, { sender: 'user', text: userMsg } as const];
                  setChatMessages(currentMsgs);
                  
                  // Bot answers
                  let botReply = '';
                  if (q.includes('الغلوتين')) {
                    botReply = 'نعم يا ضيف الرحمن! كبسة الأرز الحساوي والجريش واللحوم المطهوة بالفخار خالية تماماً من الغلوتين بطبيعتها، ونقوم بعزل المخابز التراثية لضمان سلامتك 100%.';
                  } else if (q.includes('الفندق')) {
                    botReply = 'بإمكانك تغيير الفندق فوراً عبر اختيار الفندق المناسب من مربع "عنوان التوصيل" أعلاه، وسيتم تحديث المسار اللوجستي فوراً لدى السائق.';
                  } else if (q.includes('اللحوم')) {
                    botReply = 'نلتزم بالكامل مع الأسر المنتجة بوزارة البلدية بأن تكون اللحوم المستخدمة بلدية طازجة 100% ومذبوحة تحت رقابة الأمانة والمسالخ المعتمدة.';
                  } else {
                    botReply = 'يسعدنا جداً تلبية رغباتكم! قمنا بتفعيل تفضيل "قليل الصوديوم" في ملفك الصحي، وسيتم طهو وجبتك بملح مخفف جداً وبهارات خفيفة تلائم راحتك الصحية.';
                  }

                  setTimeout(() => {
                    setChatMessages([...currentMsgs, { sender: 'bot', text: botReply }]);
                  }, 800);
                }}
                className="bg-stone-100 hover:bg-stone-200 text-stone-600 text-[10px] font-bold px-2.5 py-1.5 rounded-lg border border-stone-200/50 transition-all"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="اكتب استفسارك الصحي أو الغذائي هنا..."
              className="w-full p-2.5 rounded-xl border border-stone-200 text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && chatInput.trim()) {
                  const currentMsgs = [...chatMessages, { sender: 'user', text: chatInput } as const];
                  setChatMessages(currentMsgs);
                  const typed = chatInput;
                  setChatInput('');
                  
                  setTimeout(() => {
                    setChatMessages([...currentMsgs, { 
                      sender: 'bot', 
                      text: `أهلاً بك! لقد تم تسجيل استفسارك بخصوص: "${typed}". نقوم بمطابقتها مع المكونات العضوية للأسر المنتجة وسيتواصل معك مشرف الوفد الصحي حالاً لتأكيدها.` 
                    }]);
                  }, 800);
                }
              }}
            />
            <button
              onClick={() => {
                if (!chatInput.trim()) return;
                const currentMsgs = [...chatMessages, { sender: 'user', text: chatInput } as const];
                setChatMessages(currentMsgs);
                const typed = chatInput;
                setChatInput('');
                
                setTimeout(() => {
                  setChatMessages([...currentMsgs, { 
                    sender: 'bot', 
                    text: `أهلاً بك! لقد تم تسجيل استفسارك بخصوص: "${typed}". نقوم بمطابقتها مع المكونات العضوية للأسر المنتجة وسيتواصل معك مشرف الوفد الصحي حالاً لتأكيدها.` 
                  }]);
                }, 800);
              }}
              className="bg-primary hover:bg-primary/95 text-accent font-bold px-5 py-2.5 rounded-xl text-xs transition-all"
            >
              إرسال
            </button>
          </div>
        </motion.div>
      )}

    </div>
  );
}
