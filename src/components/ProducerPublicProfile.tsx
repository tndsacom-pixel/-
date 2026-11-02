import { useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  MapPin, 
  Star, 
  CheckCircle, 
  Phone, 
  Mail, 
  Calendar, 
  ShoppingBag, 
  QrCode, 
  Printer, 
  Share2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Gift
} from 'lucide-react';
import { ProducerFamily, Product } from '../types';

interface ProducerPublicProfileProps {
  producer: ProducerFamily;
  onBack: () => void;
  onAddToCart?: (product: Product) => void;
  onOpenSupportModal?: (info?: { familyName?: string; familyCode?: string; productName?: string }) => void;
  renderWarathLogo?: (sizeClass?: string) => ReactNode;
  renderThinkingLogo?: (sizeClass?: string) => ReactNode;
}

export default function ProducerPublicProfile({ producer, onBack, onAddToCart, onOpenSupportModal }: ProducerPublicProfileProps) {
  const [activeSection, setActiveSection] = useState<'products' | 'story' | 'reviews' | 'packages' | 'qr'>('products');
  const [copiedLink, setCopiedLink] = useState(false);

  const familyCode = producer.familyCode || `ERG-000${producer.id}`;

  const handleSupportPlatform = () => {
    if (onOpenSupportModal) {
      onOpenSupportModal({
        familyName: producer.brandName,
        familyCode: familyCode,
      });
    }
  };

  // Generate QR Code URL using public QR API based on unique producer ID link
  const producerPageUrl = `${window.location.origin}/#/producer/${producer.id}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(producerPageUrl)}&color=064e3b&bgcolor=ffffff`;

  const handleShare = () => {
    navigator.clipboard.writeText(producerPageUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrintQR = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html dir="rtl">
          <head>
            <title>رمز QR - ${producer.brandName}</title>
            <style>
              body { font-family: sans-serif; text-align: center; padding: 40px; background: #fafaf9; }
              .card { background: white; border: 2px solid #064e3b; padding: 30px; border-radius: 20px; display: inline-block; max-width: 400px; }
              h1 { color: #064e3b; margin-bottom: 5px; font-size: 22px; }
              p { color: #57534e; font-size: 14px; margin-top: 5px; }
              img { width: 220px; height: 220px; margin: 20px 0; border: 1px solid #e7e5e4; border-radius: 12px; }
              .badge { background: #ecfdf5; color: #047857; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="card">
              <span class="badge">منصة إرث أجيال • أسرة معتمدة</span>
              <h1>${producer.brandName}</h1>
              <p>امسح الكود للتسوق والاطلاع على منتجات الأسرة ومأكولاتها الأصيلة</p>
              <img src="${qrImageUrl}" alt="QR Code" />
              <p style="font-size:12px; font-weight:bold; color:#d97706;">مدعوم من مؤسسة التفكير والنماء TND</p>
            </div>
            <script>
              window.onload = function() { window.print(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 pb-20 dir-rtl" id={`producer-profile-${producer.id}`}>
      {/* Top Header Bar */}
      <div className="bg-primary text-white py-4 px-4 sm:px-8 border-b border-accent/20 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للأسر والمنتجات</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="bg-accent text-primary hover:bg-amber-400 px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'تم نسخ الرابط! ✓' : 'مشاركة الصفحة'}</span>
            </button>

            <button
              onClick={() => setActiveSection('qr')}
              className="bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <QrCode className="w-3.5 h-3.5 text-accent" />
              <span className="hidden sm:inline">رمز QR للأسرة</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Cover Banner */}
      <div className="relative h-48 md:h-64 bg-stone-800 overflow-hidden">
        <img 
          src={producer.coverUrl || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80'} 
          alt={producer.brandName} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />
      </div>

      {/* Profile Card Overlay */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-16 md:-mt-20 relative z-10">
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
            <div className="flex items-center gap-4">
              <img
                src={producer.logoUrl}
                alt={producer.brandName}
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-4 border-white shadow-lg bg-stone-100"
              />
              <div className="text-right">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl md:text-2xl font-black text-stone-900">{producer.brandName}</h1>
                  <span className="bg-amber-100 text-amber-900 font-mono text-[11px] font-black px-2.5 py-1 rounded-full border border-amber-300">
                    رمز الأسرة: {familyCode}
                  </span>
                  {producer.qualityVerified && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      أسرة معتمدة وموثقة ✓
                    </span>
                  )}
                </div>

                <p className="text-xs md:text-sm text-stone-600 font-bold mt-1">{producer.specialty}</p>

                <div className="flex items-center gap-4 text-xs text-stone-500 mt-2 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {producer.city}
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {producer.rating} ({producer.reviewsCount} تقييم)
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    خبرة {producer.experience}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Support & Assistance Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
              <button
                onClick={handleSupportPlatform}
                className="bg-primary hover:bg-primary/95 text-accent px-5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>المساعدة والدعم الفني للمتجر 🎧</span>
              </button>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="flex items-center gap-2 pt-4 border-b border-stone-200 overflow-x-auto">
            <button
              onClick={() => setActiveSection('products')}
              className={`pb-3 px-4 text-xs md:text-sm font-black transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'products' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>المنتجات والمأكولات ({producer.products.length})</span>
            </button>

            <button
              onClick={() => setActiveSection('story')}
              className={`pb-3 px-4 text-xs md:text-sm font-black transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'story' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>قصتنا والاعتمادات</span>
            </button>

            <button
              onClick={() => setActiveSection('reviews')}
              className={`pb-3 px-4 text-xs md:text-sm font-black transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>التقييمات وآراء العملاء</span>
            </button>

            <button
              onClick={() => setActiveSection('packages')}
              className={`pb-3 px-4 text-xs md:text-sm font-black transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'packages' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Gift className="w-4 h-4" />
              <span>الباقات المشاركة</span>
            </button>

            <button
              onClick={() => setActiveSection('qr')}
              className={`pb-3 px-4 text-xs md:text-sm font-black transition-all border-b-2 whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeSection === 'qr' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>رمز QR للأسرة 🔳</span>
            </button>
          </div>

          {/* Tab 1: Products List */}
          {activeSection === 'products' && (
            <div className="py-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-stone-900">أصناف ومنتجات {producer.brandName}</h3>
                  <p className="text-xs text-stone-500 mt-0.5">جميع المنتجات محددة بضمان الجودة والتوصيل السريع للمعتمرين والمنازل.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {producer.products.map((item) => (
                  <div key={item.id} className="bg-stone-50 border border-stone-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between">
                    <div>
                      <div className="h-44 overflow-hidden relative">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-xs text-accent font-black text-[10px] px-2.5 py-1 rounded-full border border-accent/20">
                          {producer.city}
                        </span>
                      </div>

                      <div className="p-4 space-y-2">
                        <h4 className="font-black text-stone-900 text-sm leading-tight">{item.name}</h4>
                        <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">{item.description}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 border-t border-stone-200/60 mt-2 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-stone-400 block">السعر</span>
                        <span className="text-base font-black text-primary font-mono">{item.price} ر.س</span>
                      </div>

                      <button
                        onClick={() => {
                          if (onAddToCart) onAddToCart(item);
                          alert(`تمت إضافة "${item.name}" إلى السلة بنجاح! 🛍️`);
                        }}
                        className="bg-primary hover:bg-primary/95 text-accent font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>طلب الآن</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Story & Qualifications */}
          {activeSection === 'story' && (
            <div className="py-6 space-y-6 text-right">
              <div className="bg-amber-50/60 border border-amber-200/80 p-5 rounded-2xl space-y-2">
                <h3 className="font-black text-amber-950 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>قصة نجاح الأسرة والمسيرة التمكينية</span>
                </h3>
                <p className="text-xs md:text-sm text-stone-700 leading-relaxed">{producer.story}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-3">
                  <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    <span>الاعتمادات وتراخيص الجودة</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {producer.licenses?.map((lic, idx) => (
                      <li key={idx} className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-stone-200">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-bold">{lic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-3">
                  <h4 className="font-extrabold text-stone-900 text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>بيئة الإنتاج والطهي المعتمدة</span>
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    تمت معاينة وتقييم مقر الإنتاج بواسطة فريق التقييم الذكي والجودة لمبادرة التفكير والنماء للتأكد من المعايير الصحية وسلامة الغذاء.
                  </p>
                  {producer.kitchenPhotos && (
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      {producer.kitchenPhotos.map((photo, i) => (
                        <img key={i} src={photo} alt="Workshop" className="w-full h-24 object-cover rounded-xl border border-stone-200" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Customer Reviews */}
          {activeSection === 'reviews' && (
            <div className="py-6 space-y-4 text-right">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="font-black text-stone-900 text-sm">تقييمات زوار إرث أجيال والمعتمرين</h3>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  متوسط التقييم: {producer.rating} من 5 ⭐
                </span>
              </div>

              <div className="space-y-3">
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900">سعد الشمري (معتمر من حائل)</span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-600">طعم الأصالة الحقيقي والنظافة الممتازة والتسليم في الفندق في الوقت المحدد تماماً. شكراً لأسرة {producer.brandName}.</p>
                </div>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900">د. مريم الغامدي (زائرة)</span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-600">التغليف فاخر والمنتج يتحدث عن الجودة والتفاني. تجربة رائعة وسأكرر الشراء بكل تأكيد.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Packages */}
          {activeSection === 'packages' && (
            <div className="py-6 space-y-4 text-right">
              <h3 className="font-black text-stone-900 text-sm">الباقات التي تشارك فيها الأسرة بالمنصة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {producer.participatingPackages?.map((pkg, i) => (
                  <div key={i} className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Gift className="w-6 h-6 text-amber-600" />
                      <div>
                        <h4 className="font-bold text-stone-900 text-xs">{pkg}</h4>
                        <p className="text-[10px] text-stone-500">متاحة حالياً للمعتمرين والعملاء</p>
                      </div>
                    </div>
                    <span className="bg-amber-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full">نشطة ✓</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Dedicated QR Code */}
          {activeSection === 'qr' && (
            <div className="py-8 text-center space-y-6 max-w-lg mx-auto">
              <div className="bg-stone-50 border-2 border-[#C8A96B] p-8 rounded-3xl shadow-lg space-y-4">
                <span className="bg-amber-50 text-amber-900 text-xs font-black px-4 py-1.5 rounded-full border border-amber-200 inline-block">
                  باركود QR الخاص بالأسرة 🔳
                </span>

                <h3 className="text-lg font-black text-stone-900">{producer.brandName}</h3>
                <p className="text-xs text-stone-600">
                  يمكن للعميل مسح هذا الكود بواسطة الجوال للانتقال المباشر لهذه الصفحة والاستعراض والطلب.
                </p>

                <div className="flex justify-center py-2">
                  <img 
                    src={qrImageUrl} 
                    alt="QR Code" 
                    className="w-56 h-56 rounded-2xl border-4 border-white shadow-md"
                  />
                </div>

                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={handlePrintQR}
                    className="bg-primary hover:bg-primary/95 text-accent font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>طباعة ملصق الباركود</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-stone-600" />
                    <span>نسخ رابط الصفحة</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
