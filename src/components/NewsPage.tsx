import React from 'react';
import { motion } from 'motion/react';
import { 
  Newspaper, 
  ArrowRight, 
  Calendar, 
  Share2, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';

interface NewsPageProps {
  onBackToHome: () => void;
  onOpenSupport?: () => void;
}

export default function NewsPage({ onBackToHome, onOpenSupport }: NewsPageProps) {
  const newsItems = [
    {
      id: '1',
      title: 'إطلاق منصة "ورث أجيال" بحضور نخبة من قيادات قطاع التمكين التنموي والضيافة',
      date: '01 أغسطس 2026',
      category: 'أخبار المنصة 🗞️',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
      summary: 'تم بحمد الله إشهار وتدشين منصة ورث أجيال المستقلة بدعم مؤسسة التفكير والنماء للاستشارات الإدارية TND.SA لتمكين وتأهيل الأسر الوطنية المنتجة وربط مخرجاتها بالمتجر المستقل.',
      readTime: '3 دقائق قراءة'
    },
    {
      id: '2',
      title: 'توقيع اتفاقية تعاون استراتيجي لتوفير وجبات التراث الوطني بالفنادق بمكة والمدينة',
      date: '28 يوليو 2026',
      category: 'شراكات استراتيجية 🤝',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
      summary: 'وقعت المنصة مذكرة تفاهم لتسهيل توصيل أطباق المأكولات والمشروبات التراثية الطازجة لنزلاء الفنادق الكبرى في الحرمين الشريفين لتسهيل وصول الأسر لسوق الضيافة.',
      readTime: '4 دقائق قراءة'
    },
    {
      id: '3',
      title: 'تخريج دفعة جديدة من الحرفيات في مسارات حياكة السدو والتغليف الحراري',
      date: '20 يوليو 2026',
      category: 'الأكاديمية والتدريب 🎓',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=800',
      summary: 'اختتمت الأكاديمية الرقمية بالمنصة برنامجاً تدريبياً مكثفاً شمل أكثر من 120 متدربة من مختلف مناطق المملكة مع تسليمهن شهادات معتمدة وتمويل تمكيني مرن.',
      readTime: '2 دقيقة قراءة'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 text-right p-4 sm:p-6 font-sans" id="standalone-news-page">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between bg-white border border-stone-200 p-4 rounded-2xl shadow-xs">
        <button
          type="button"
          onClick={onBackToHome}
          className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى الرئيسية</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-black text-stone-800">المركز الإعلامي والأخبار (/news)</span>
          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping"></span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#0B3A60] via-primary to-emerald-950 text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl border border-accent/30">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-accent text-xs font-black bg-white/10 border border-accent/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" />
            تغطيات ومستجدات منصة ورث أجيال 📰
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            آخر المستجدات والإنجازات والشراكات التنموية
          </h1>

          <p className="text-stone-200 text-xs sm:text-sm font-light leading-relaxed">
            تابع التغطيات الصحفية وأخبار تخريج الدفعات الحرفية، وتوقيع الاتفاقيات الاستراتيجية لتوسيع نطاق أثر الأسر الوطنية المنتجة بالمملكة.
          </p>
        </div>
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="relative h-48 overflow-hidden bg-stone-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 right-3 bg-[#0B3A60] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-xs">
                {item.category}
              </span>
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col justify-between text-right">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] text-stone-400 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <span>{item.date}</span>
                  <span>•</span>
                  <span>{item.readTime}</span>
                </div>

                <h3 className="font-black text-stone-800 text-sm leading-snug group-hover:text-[#0B3A60] transition-colors">
                  {item.title}
                </h3>

                <p className="text-stone-500 text-xs font-light leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => alert(`تم نسخ رابط الخبر: ${item.title}`)}
                  className="text-stone-400 hover:text-stone-600 font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>مشاركة</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert(`قراءة التقرير الكامل: ${item.title}`)}
                  className="text-primary hover:text-emerald-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <span>اقرأ المزيد ↗</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
