import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Heart, 
  ArrowRight, 
  ArrowLeft,
  LogIn, 
  Star, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Gift, 
  Building2, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Sparkles, 
  ChevronLeft,
  Compass,
  Ticket,
  ChefHat,
  Phone,
  UserCheck,
  Award,
  Layers,
  X
} from 'lucide-react';
import { ProducerFamily, Product } from '../types';
import { useLanguage } from '../context/LanguageContext';

export type CustomerTab = 'buyer' | 'pilgrim' | 'visitor';

interface CustomerPortalPageProps {
  initialTab?: CustomerTab;
  producers: ProducerFamily[];
  onSelectProducer: (producer: ProducerFamily) => void;
  onNavigateHome: () => void;
  onNavigateLogin: () => void;
  onSwitchToFamilyPortal: () => void;
  renderWarathLogo: (sizeClass?: string) => ReactNode;
  renderThinkingLogo: (sizeClass?: string) => ReactNode;
}

export default function CustomerPortalPage({
  initialTab = 'buyer',
  producers,
  onSelectProducer,
  onNavigateHome,
  onNavigateLogin,
  onSwitchToFamilyPortal,
  renderWarathLogo,
  renderThinkingLogo
}: CustomerPortalPageProps) {
  const { t, isEn } = useLanguage();
  const [activeTab, setActiveTab] = useState<CustomerTab>(initialTab);
  
  // Buyer Search & Filter
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('all');

  // Pilgrim booking form
  const [selectedCity, setSelectedCity] = useState('مكة المكرمة');
  const [selectedHotel, setSelectedHotel] = useState('فندق فيرمونت برج الساعة - مكة');
  const [deliveryDate, setDeliveryDate] = useState('2026-08-03');
  const [deliveryTime, setDeliveryTime] = useState('07:30 مساءً (بعد صلاة العشاء)');

  // Quick Order Modal
  const [orderingProduct, setOrderingProduct] = useState<Product | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [orderName, setOrderName] = useState<string>('');
  const [orderPhone, setOrderPhone] = useState<string>('');
  const [orderAddress, setOrderAddress] = useState<string>('');
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [orderPayment, setOrderPayment] = useState<'cod' | 'mada' | 'applepay'>('cod');
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [orderInvoice, setOrderInvoice] = useState<string>('');
  const [orderError, setOrderError] = useState<string>('');

  // Experiences for Visitors & Tourists
  const experiences = [
    {
      id: 'exp-1',
      title: 'ورشة غزل وحياكة السدو التراثي النجدي',
      location: 'الرياض - حي الطريف التاريخي',
      duration: 'ساعتان',
      price: 150,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80',
      producer: producers.find(p => p.id === 'producer-2') || producers[0],
      seats: 8
    },
    {
      id: 'exp-2',
      title: 'تجربة إعداد القهوة السعودية الملكية وحمس البن',
      location: 'جدة - البلد التاريخية',
      duration: 'ساعة ونصف',
      price: 120,
      image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&auto=format&fit=crop&q=80',
      producer: producers.find(p => p.id === 'producer-3') || producers[0],
      seats: 12
    },
    {
      id: 'exp-3',
      title: 'مأدبة العشاء التراثي الحجازي والتذوق التفاعلي',
      location: 'مكة المكرمة - بطحاء قريش',
      duration: 'ساعتان ونصف',
      price: 220,
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&auto=format&fit=crop&q=80',
      producer: producers.find(p => p.id === 'producer-1') || producers[0],
      seats: 15
    },
    {
      id: 'exp-4',
      title: 'جولة الحرف اليدوية وصناعة الفخار الحساوي',
      location: 'الأحساء - جبل القارة',
      duration: '٣ ساعات',
      price: 180,
      image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop&q=80',
      producer: producers.find(p => p.id === 'producer-4') || producers[0],
      seats: 10
    }
  ];

  // All products flattened
  const allProducts = producers.flatMap(p => 
    p.products.map(prod => ({
      ...prod,
      producer: p
    }))
  );

  const filteredProducts = allProducts.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesCity = selectedCityFilter === 'all' || item.producer.city.includes(selectedCityFilter);
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.producer.brandName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesCity && matchesSearch;
  });

  const handlePlaceOrder = () => {
    if (!orderName.trim() || !orderPhone.trim() || !orderAddress.trim()) {
      setOrderError('يرجى تعبئة كافة الحقول الإلزامية (الاسم، رقم الجوال، عنوان الفندق أو التوصيل)');
      return;
    }
    setOrderError('');
    const invoiceNum = `ORD-${Date.now().toString().slice(-6)}`;
    setOrderInvoice(invoiceNum);

    const newOrder = {
      id: invoiceNum,
      productName: orderingProduct?.name,
      productPrice: orderingProduct?.price,
      family: orderingProduct?.producer.brandName,
      buyerName: orderName,
      buyerPhone: orderPhone,
      deliveryAddress: orderAddress,
      quantity: orderQuantity,
      paymentMethod: orderPayment === 'cod' ? 'الدفع عند الاستلام' : orderPayment === 'mada' ? 'مدى' : 'Apple Pay',
      totalAmount: (orderingProduct?.price || 0) * orderQuantity + 15,
      date: new Date().toLocaleDateString('ar-SA'),
      status: 'new'
    };

    try {
      const existing = localStorage.getItem('warth_orders');
      const orders = existing ? JSON.parse(existing) : [];
      orders.push(newOrder);
      localStorage.setItem('warth_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }

    setOrderSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 dir-rtl w-full max-w-full overflow-x-hidden" id="portal-customer-hub">
      {/* Top Customer Hub Header Bar */}
      <div className="bg-[#174F3E] text-white border-b border-[#C8A96B]/30 py-3 px-4 sm:px-6 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Title & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-300/40 text-amber-300 flex items-center justify-center text-xl shadow-xs font-black">
              🛍️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-sm sm:text-base text-amber-300">
                  بوابة العميل الشاملة
                </h1>
                <span className="bg-white/10 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                  المشتري • السائح • المعتمر
                </span>
              </div>
              <p className="text-[11px] text-stone-200 hidden sm:block">
                مأكولات تراثية طازجة، باقات ضيافة الحرمين، هدايا السدو، وتجارب ثقافية أصيلة
              </p>
            </div>
          </div>

          {/* Quick Switch to Family Portal & Main Navigation */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
            <button
              onClick={onSwitchToFamilyPortal}
              className="bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 hover:text-white border border-amber-300/50 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>👩‍🍳 بوابة العمل الحر والمشاريع</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>الرئيسية</span>
            </button>
          </div>

        </div>
      </div>

      {/* Sub-Tabs: المشتري / المعتمر / السائح */}
      <div className="bg-white border-b border-stone-200 py-3 px-4 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button
              onClick={() => setActiveTab('buyer')}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'buyer'
                  ? 'bg-[#174F3E] text-amber-300 shadow-md scale-102'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
              id="tab-customer-buyer"
            >
              <span>🛒</span>
              <span>المشتري (تسوق المنتجات)</span>
              <span className="bg-white/20 text-inherit text-[10px] px-1.5 py-0.5 rounded-full font-mono">
                {allProducts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pilgrim')}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'pilgrim'
                  ? 'bg-[#174F3E] text-amber-300 shadow-md scale-102'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
              id="tab-customer-pilgrim"
            >
              <span>🕋</span>
              <span>المعتمر (وجبات وضيافة مكة)</span>
              <span className="bg-amber-400 text-stone-900 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                فندقي 🌟
              </span>
            </button>

            <button
              onClick={() => setActiveTab('visitor')}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'visitor'
                  ? 'bg-[#174F3E] text-amber-300 shadow-md scale-102'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
              id="tab-customer-visitor"
            >
              <span>🕌</span>
              <span>السائح والزائر (تجارب وجولات)</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                حجز حي
              </span>
            </button>
          </div>

          <div className="text-[11px] text-stone-500 font-medium hidden lg:flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>منتجات ومطابخ مرخصة وخاضعة لاشتراطات سلامة الغذاء</span>
          </div>
        </div>
      </div>

      {/* Main Content Area Based on Active Tab */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ========================================================================= */}
        {/* TAB 1: BUYER (المشتري) */}
        {/* ========================================================================= */}
        {activeTab === 'buyer' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Buyer Hero Header */}
            <div className="bg-gradient-to-r from-[#174F3E] to-[#1d5c49] text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl text-right z-10">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-300/30 text-xs font-bold px-3 py-1 rounded-full inline-block">
                  🛍️ تسوق مباشر من أيدي رائدات ورواد العمل الحر والمشاريع الصغيرة
                </span>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                  سوق المأكولات التراثية والمشغولات الحرفية
                </h2>
                <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
                  اطلب الآن أشهى الأطباق التراثية كالجريش والكبسة والكليجا، واقتنِ هدايا السدو والمباخر الحائلية الفاخرة مع خدمة التوصيل السريع والدفع عند الاستلام.
                </p>
              </div>

              <div className="flex gap-3 flex-shrink-0 z-10">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center">
                  <span className="block text-2xl font-black text-amber-300 font-mono">{producers.length}</span>
                  <span className="text-[11px] text-stone-200">أسر معتمدة</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center">
                  <span className="block text-2xl font-black text-amber-300 font-mono">{allProducts.length}</span>
                  <span className="text-[11px] text-stone-200">صنف تراثي</span>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white border border-stone-200 p-4 sm:p-5 rounded-3xl shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Search input */}
                <div className="w-full md:w-80 relative">
                  <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث عن أكلة شعبية أو حرفة..."
                    className="w-full pr-10 pl-4 py-2.5 rounded-2xl border border-stone-200 text-xs focus:ring-2 focus:ring-[#174F3E] focus:outline-none bg-stone-50"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute left-3 top-3 text-[10px] text-stone-400 hover:text-stone-600"
                    >
                      مسح
                    </button>
                  )}
                </div>

                {/* City Filter */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <span className="text-xs font-bold text-stone-500 whitespace-nowrap">المدينة:</span>
                  <select
                    value={selectedCityFilter}
                    onChange={(e) => setSelectedCityFilter(e.target.value)}
                    className="bg-stone-50 border border-stone-200 text-stone-800 text-xs rounded-xl px-3 py-2 focus:ring-1 focus:ring-[#174F3E] outline-none"
                  >
                    <option value="all">كافة المدن والمناطق</option>
                    <option value="مكة">مكة المكرمة</option>
                    <option value="المدينة">المدينة المنورة</option>
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="الأحساء">الأحساء</option>
                    <option value="القصيم">القصيم</option>
                    <option value="حائل">حائل</option>
                  </select>
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 w-full md:w-auto">
                  {[
                    { id: 'all', label: 'الكل' },
                    { id: 'culinary', label: '🍲 طهي تراثي' },
                    { id: 'crafts', label: '🧵 حرف وسدو' },
                    { id: 'hospitality', label: '☕ ضيافة وباقات' },
                    { id: 'sweets', label: '🍪 حلويات وتمور' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-[#174F3E] text-amber-300 shadow-xs'
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-stone-200 hover:border-[#174F3E] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[#174F3E] text-[10px] font-black px-2.5 py-1 rounded-xl shadow-xs border border-stone-200">
                      {prod.category === 'food' ? 'مأكولات شعبية 🍲' : prod.category === 'crafts' ? 'حرف وسدو 🧵' : prod.category === 'perfumes' ? 'بخور وعطور 🌸' : 'منتج تراثي 🎁'}
                    </span>
                    <span className="absolute bottom-3 left-3 bg-[#174F3E]/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-lg backdrop-blur-xs">
                      📍 {prod.producer.city}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => onSelectProducer(prod.producer)}
                          className="text-[11px] font-bold text-stone-500 hover:text-[#174F3E] transition-colors flex items-center gap-1 group/p cursor-pointer"
                        >
                          <span>{prod.producer.brandName}</span>
                          <span className="text-[9px] text-[#C8A96B] font-normal group-hover/p:underline">
                            (الملف المهني ↗)
                          </span>
                        </button>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{prod.producer.rating}</span>
                        </div>
                      </div>

                      <h3 className="font-black text-stone-900 text-sm md:text-base leading-snug group-hover:text-[#174F3E] transition-colors">
                        {prod.name}
                      </h3>

                      <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed font-light">
                        {prod.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-stone-400 block font-light">السعر</span>
                        <span className="text-base font-black font-mono text-[#174F3E]">
                          {prod.price} ر.س
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setOrderingProduct(prod);
                          setOrderQuantity(1);
                          setOrderSuccess(false);
                          setOrderError('');
                        }}
                        className="bg-[#174F3E] hover:bg-[#123e31] text-amber-300 hover:text-white px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>طلب فوري</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-white border border-stone-200 rounded-3xl p-8 space-y-3">
                <span className="text-4xl">🔍</span>
                <h4 className="font-extrabold text-stone-800 text-base">لم نجد منتجات مطابقة لخيارات البحث</h4>
                <p className="text-xs text-stone-500">جرب البحث بكلمات أخرى أو اختر تصنيفاً عاماً لعرض كافة الأصناف</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedCityFilter('all');
                  }}
                  className="bg-[#174F3E] text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer mt-2"
                >
                  إعادة ضبط الفلاتر
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PILGRIM (المعتمر وضيوف الرحمن) */}
        {/* ========================================================================= */}
        {activeTab === 'pilgrim' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Pilgrim Hero Header */}
            <div className="bg-gradient-to-r from-[#174F3E] to-[#266854] text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl text-right z-10">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-300/30 text-xs font-bold px-3 py-1 rounded-full inline-block">
                  🕋 ضيافة الحرمين الشريفين وإكرام ضيوف الرحمن
                </span>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                  الوجبات التراثية وباقات الضيافة الفندقية بمكة والمدينة
                </h2>
                <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
                  تذوق البركة والأصالة بأيدي أسر سعودية مكية معتمدة صحياً. جدولة توصيل حراري مباشر إلى غرف الفنادق في مواعيد الصلوات والغداء والعشاء.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-right space-y-2 flex-shrink-0 z-10">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>معايير بلدية وصحية مشددة</span>
                </div>
                <div className="flex items-center gap-2 text-stone-200 text-xs">
                  <Truck className="w-4 h-4 text-emerald-300" />
                  <span>توصيل فندقي حراري معقم</span>
                </div>
                <div className="flex items-center gap-2 text-stone-200 text-xs">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>اعتماد الضمان الذهبي</span>
                </div>
              </div>
            </div>

            {/* Fast Booking Bar for Pilgrims */}
            <div className="bg-white border border-stone-200 p-5 rounded-3xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                <span>📍 تخصيص موعد ومكان التوصيل الفندقي:</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-stone-700">المدينة:</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-bold text-stone-800 outline-none"
                  >
                    <option value="مكة المكرمة">مكة المكرمة (المنطقة المركزية)</option>
                    <option value="المدينة المنورة">المدينة المنورة (المنطقة المركزية)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-stone-700">فندق الإقامة:</label>
                  <input
                    type="text"
                    value={selectedHotel}
                    onChange={(e) => setSelectedHotel(e.target.value)}
                    placeholder="اسم الفندق ورقم الغرفة"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-800 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-stone-700">تاريخ التسليم:</label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-mono text-stone-800 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-stone-700">فترة التوصيل:</label>
                  <select
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs font-bold text-stone-800 outline-none"
                  >
                    <option value="12:30 ظهراً (الغداء)">12:30 ظهراً (الغداء)</option>
                    <option value="07:30 مساءً (بعد صلاة العشاء)">07:30 مساءً (بعد صلاة العشاء)</option>
                    <option value="04:30 فجراً (السحور / الإفطار)">04:30 فجراً (السحور / الإفطار)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Pilgrim Meals Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProducts.filter(p => p.category === 'culinary' || p.category === 'hospitality').map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-stone-200 hover:border-emerald-700 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-24 h-24 rounded-2xl object-cover border border-stone-200 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1 text-right flex-1">
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-bold">
                        وجبة ضيافة مكية
                      </span>
                      <h4 className="font-black text-stone-900 text-sm">{prod.name}</h4>
                      <p className="text-[10px] text-stone-400">إعداد: {prod.producer.brandName}</p>
                      <p className="text-[11px] font-black text-[#174F3E] font-mono">{prod.price} ر.س</p>
                    </div>
                  </div>

                  <p className="text-stone-500 text-xs line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      توصيل حراري فندقي
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setOrderingProduct(prod);
                        setOrderAddress(selectedHotel);
                        setOrderQuantity(1);
                        setOrderSuccess(false);
                        setOrderError('');
                      }}
                      className="bg-[#174F3E] hover:bg-[#123e31] text-white px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer"
                    >
                      حجز الوجبة 🕋
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: VISITOR & TOURIST (السائح والزائر) */}
        {/* ========================================================================= */}
        {activeTab === 'visitor' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Visitor Hero Header */}
            <div className="bg-gradient-to-r from-[#174F3E] to-[#8C7338] text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl text-right z-10">
                <span className="bg-amber-400/20 text-amber-300 border border-amber-300/30 text-xs font-bold px-3 py-1 rounded-full inline-block">
                  🕌 تجارب حية وجولات سياحية تراثية
                </span>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight">
                  عِش التجربة التراثية السعودية وتعرف على الحرفيين
                </h2>
                <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
                  احجز ورش حياكة السدو، جلسات إعداد القهوة السعودية الأصيلة، ومأدبة التذوق الحجازية مع الحرفيين وأصحاب الحكايات التراثية.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-center flex-shrink-0 z-10">
                <span className="block text-3xl font-black text-amber-300 font-mono">4+</span>
                <span className="text-xs text-stone-200">تجارب تفاعلية حية</span>
              </div>
            </div>

            {/* Experiences Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-white border border-stone-200 hover:border-[#C8A96B] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="relative h-56 overflow-hidden bg-stone-100">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 right-3 bg-[#174F3E] text-amber-300 text-xs font-black px-3 py-1 rounded-xl shadow-xs">
                      {exp.price} ر.س / للشخص
                    </span>
                    <span className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-[11px] font-bold px-3 py-1 rounded-xl shadow-xs flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      {exp.location}
                    </span>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-black text-stone-900 text-base md:text-lg group-hover:text-[#174F3E] transition-colors">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-stone-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          المدة: {exp.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                          المقاعد المتاحة: {exp.seats} مقاعد
                        </span>
                      </div>
                      <p className="text-stone-500 text-xs font-light leading-relaxed">
                        تقديم الأسرة المنتجة المعتمدة: <strong>{exp.producer.brandName}</strong> - تجربة شاملة للمواد، الضيافة، والشهادة التذكارية.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <button
                        onClick={() => onSelectProducer(exp.producer)}
                        className="text-xs text-primary font-bold hover:underline"
                      >
                        زيارة صفحة الحرفي ↗
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          alert(`تم تأكيد حجز تجربة "${exp.title}"! سنتواصل معك عبر الواتساب لتأكيد موعد اللقاء.`);
                        }}
                        className="bg-[#174F3E] hover:bg-[#123e31] text-amber-300 hover:text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                      >
                        <Ticket className="w-4 h-4" />
                        <span>حجز التجربة التراثية</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Heritage Souvenirs & Crafts Section for Tourists */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3 border-b border-amber-200/60 pb-4">
                <div>
                  <h3 className="font-black text-stone-900 text-lg sm:text-xl">
                    🎁 هدايا وتذكارات التراث السعودي للزوار والسياح
                  </h3>
                  <p className="text-xs text-stone-600 font-light mt-1">
                    سدو منسوج، مباخر حائلية، عطور برائحة الخزامى، وتمور محشوة فاخرة
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('buyer')}
                  className="bg-[#174F3E] text-amber-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  عرض كافة المنتجات في المتجر ←
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allProducts.filter(p => p.category === 'crafts' || p.category === 'sweets').slice(0, 3).map((prod) => (
                  <div key={prod.id} className="bg-white p-4 rounded-2xl border border-amber-200/50 flex gap-3 items-center">
                    <img src={prod.imageUrl} alt={prod.name} className="w-16 h-16 rounded-xl object-cover border border-stone-200" />
                    <div className="space-y-1 text-right flex-1">
                      <h5 className="font-bold text-xs text-stone-900">{prod.name}</h5>
                      <span className="text-[10px] text-stone-500 block">{prod.producer.brandName}</span>
                      <span className="text-xs font-black text-[#174F3E] font-mono">{prod.price} ر.س</span>
                    </div>
                    <button
                      onClick={() => {
                        setOrderingProduct(prod);
                        setOrderQuantity(1);
                        setOrderSuccess(false);
                        setOrderError('');
                      }}
                      className="bg-[#174F3E] text-white p-2 rounded-xl text-xs cursor-pointer hover:bg-emerald-900"
                      title="طلب فوري"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* QUICK ORDER MODAL (للشراء المباشر للعميل) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {orderingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs dir-rtl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white border border-stone-200 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto text-right"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#174F3E] text-amber-300 flex items-center justify-center text-sm font-bold">
                    🛍️
                  </div>
                  <div>
                    <h3 className="font-black text-stone-900 text-sm sm:text-base">تأكيد طلب الشراء المباشر</h3>
                    <p className="text-[10px] text-stone-400">دون الحاجة لاشتراك مسبق</p>
                  </div>
                </div>
                <button
                  onClick={() => setOrderingProduct(null)}
                  className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!orderSuccess ? (
                <div className="space-y-4">
                  {/* Product card */}
                  <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 flex gap-3 items-center">
                    <img
                      src={orderingProduct.imageUrl}
                      alt={orderingProduct.name}
                      className="w-16 h-16 rounded-xl object-cover border border-stone-200"
                    />
                    <div className="space-y-0.5 flex-1">
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                        {orderingProduct.categoryLabel}
                      </span>
                      <h4 className="font-black text-stone-900 text-xs sm:text-sm">{orderingProduct.name}</h4>
                      <p className="text-[10px] text-stone-500">من إعداد: {orderingProduct.producer.brandName}</p>
                      <p className="text-xs font-black text-[#174F3E] font-mono">{orderingProduct.price} ر.س</p>
                    </div>
                  </div>

                  {orderError && (
                    <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200 font-bold">
                      ⚠️ {orderError}
                    </div>
                  )}

                  {/* Customer fields */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-stone-700">اسم العميل الكريم <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={orderName}
                          onChange={(e) => setOrderName(e.target.value)}
                          placeholder="مثال: عبد الرحمن بن فهد"
                          className="w-full p-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50 focus:ring-1 focus:ring-[#174F3E] outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-stone-700">رقم الجوال للتوصيل <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={orderPhone}
                          onChange={(e) => setOrderPhone(e.target.value)}
                          placeholder="مثال: 05XXXXXXXX"
                          className="w-full p-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50 focus:ring-1 focus:ring-[#174F3E] outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-stone-700">عنوان التوصيل أو اسم الفندق والغرفة بمكة/المدينة <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={orderAddress}
                        onChange={(e) => setOrderAddress(e.target.value)}
                        placeholder="مثال: فندق فيرمونت برج الساعة مكة - غرفة 402"
                        className="w-full p-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50 focus:ring-1 focus:ring-[#174F3E] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-stone-700">الكمية:</label>
                        <div className="flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl p-1 justify-center">
                          <button
                            type="button"
                            onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                            className="w-7 h-7 bg-white rounded-lg border border-stone-200 text-xs font-bold"
                          >
                            -
                          </button>
                          <span className="font-mono font-black text-xs px-3">{orderQuantity}</span>
                          <button
                            type="button"
                            onClick={() => setOrderQuantity(orderQuantity + 1)}
                            className="w-7 h-7 bg-white rounded-lg border border-stone-200 text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-bold text-stone-700">طريقة الدفع:</label>
                        <select
                          value={orderPayment}
                          onChange={(e) => setOrderPayment(e.target.value as any)}
                          className="w-full p-2.5 rounded-xl border border-stone-200 text-xs bg-white focus:ring-1 focus:ring-[#174F3E] outline-none font-bold"
                        >
                          <option value="cod">الدفع عند الاستلام (كاش / شبكة) 💵</option>
                          <option value="mada">بطاقة مدى / فيزا 💳</option>
                          <option value="applepay">Apple Pay 🍏</option>
                        </select>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="bg-[#174F3E]/5 p-3 rounded-2xl border border-[#174F3E]/10 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-stone-500 font-bold block">الإجمالي الكلي (شامل التوصيل):</span>
                        <span className="text-[10px] text-stone-400 font-light">+15 ر.س رسوم التوصيل المباشر</span>
                      </div>
                      <span className="text-base font-black font-mono text-[#174F3E]">
                        {(orderingProduct.price * orderQuantity) + 15} ر.س
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="w-full bg-[#174F3E] hover:bg-[#123e31] text-amber-300 hover:text-white font-black py-3 rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>إرسال الطلب إلى الأسرة المنتجة 🚀</span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-3xl mx-auto">
                    🎉
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-stone-900 text-base sm:text-lg">تم استلام طلبك بنجاح!</h4>
                    <p className="text-xs text-stone-500">رقم الفاتورة المرجعي: <strong className="font-mono text-[#174F3E]">{orderInvoice}</strong></p>
                    <p className="text-xs text-stone-600 leading-relaxed pt-2">
                      تم توجيه الطلب إلى <strong>{orderingProduct.producer.brandName}</strong> وسيتم تجهيز طلبك والتواصل معك فوراً لتأكيد وصول المندوب.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOrderingProduct(null)}
                    className="bg-[#174F3E] text-white font-bold px-6 py-2.5 rounded-xl text-xs cursor-pointer"
                  >
                    متابعة التصفح والتسوق
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
