import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Briefcase, 
  ArrowRight, 
  GraduationCap, 
  ShoppingBag, 
  Landmark, 
  Stethoscope, 
  HeartHandshake, 
  Award, 
  Sparkles, 
  ChevronLeft, 
  CheckCircle2 
} from 'lucide-react';

interface ServicesPageProps {
  onBackToHome: () => void;
  onNavigateToStore?: () => void;
  onNavigateToConsulting?: () => void;
  onOpenSupport?: () => void;
}

export default function ServicesPage({ 
  onBackToHome, 
  onNavigateToStore, 
  onNavigateToConsulting,
  onOpenSupport 
}: ServicesPageProps) {
  const { t, isEn } = useLanguage();
  
  const services = [
    {
      id: 'store',
      icon: '🛍️',
      title: 'المتجر التراثي المستقل والبيع المباشر',
      subtitle: 'تمكين التسويق المباشر للمعتمرين والسياح',
      desc: 'منصة بيع الكترونية فورية تمكّن الأسر والحرفيين من تسويق الوجبات الشعبية الطازجة، هدايا السدو، والمنتجات العطرية مع توصيل سريع للفنادق.',
      features: [
        'عرض مباشر بدون رسوم اشتراك مسبقة',
        'ربط فورى بالفنادق بمكة والمدينة',
        'تحصيل مالي آمن ودفع عند الاستلام'
      ],
      actionLabel: 'الانتقال لمتجر المنتجات 🛍️',
      action: onNavigateToStore
    },
    {
      id: 'consulting',
      icon: '🩺',
      title: 'مركز الاستشارات الإدارية والمالية',
      subtitle: 'توجيه احترافي مع خبراء التفكير والنماء',
      desc: 'جلسات استشارية فردية في حوكمة المشاريع، دراسات الجدوى المالي، تطوير وصفات الطهي، ومعايير الجودة والسلامة الغذائية.',
      features: [
        'جلسة استشارية أولى مجانية (لمدة 1 ساعة / 60 دقيقة)',
        'استشارات تخصصية لاحقة (1,000 ريال / ساعة)',
        'صيغ متعددة (زووم عن بعد، هاتف مباشر، حضوري)',
        'خطة عمل تنفيذية وتوصيات معتمدة'
      ],
      actionLabel: 'حجز استشارة مهنية 🩺',
      action: onNavigateToConsulting
    },
    {
      id: 'training',
      icon: '🎓',
      title: 'الأكاديمية والحاضنة الحرفية الرقمية',
      subtitle: 'تأهيل وتدريب احترافي معتمد',
      desc: 'برامج تدريبية مكثفة في فنون الضيافة والطهي التراثي، التغليف الحراري الحديث، والتسويق الرقمي للأسر المنتجة.',
      features: [
        'شهادات معتمدة فور إتمام المسارات',
        'حاضنات أعمال مجانية للمتفوقين',
        'محتوى مرئي وعملي متجدد'
      ],
      actionLabel: 'استكشاف الدورات بالأكاديمية 🎓',
      action: () => {
        window.location.hash = '#pathway-selection';
        window.dispatchEvent(new CustomEvent('reset-unified-login'));
      }
    },
    {
      id: 'funding',
      icon: '💰',
      title: 'برنامج التمويل التمكيني المرن',
      subtitle: 'دعم مالي بدون فوائد وبدون كفيل غارم',
      desc: 'تقديم مبالغ تمويل تنموي تصل لـ 50,000 ريال بناءً على نقاط جدارات الأسرة بالمنصة وتقييم الجودة والالتزام.',
      features: [
        'بدون فوائد وبدون كفيل غارم',
        'دراسة أهلية سريعة خلال 48 ساعة',
        'سداد مرن ميسر حسب المبيعات'
      ],
      actionLabel: 'تقديم طلب التمويل 💰',
      action: onOpenSupport
    },
    {
      id: 'sadaqah',
      icon: '🕊️',
      title: 'برنامج إطعام ضيوف الرحمن بركة الحرمين',
      subtitle: 'تجهيز وتوزيع وجبات الإطعام بالمشاعر',
      desc: 'إتاحة الفرصة للداعمين لطلب وجبات الصدقة والبر وتجهيزها بأيدي الأسر وتوزيعها بساحات الحرمين وتوثيقها فوراً.',
      features: [
        'توزيع موثق بالصورة والفاتورة الرسمية',
        'إشراف صحي كامل من طهاة مرخصين',
        'وصول مباشر لساحات مكة والمدينة'
      ],
      actionLabel: 'استفسار عن برنامج الإطعام 🕊️',
      action: onOpenSupport
    },
    {
      id: 'memberships',
      icon: '🎖️',
      title: 'العضويات وحاضنات التسويق',
      subtitle: 'مزايا حصرية وعضويات ذهبية للحرفيين',
      desc: 'باقات عضوية تقدم أولوية المشاركة في المعارض الوطنية، خصومات استشارية، وحواضن تسويقية مستدامة.',
      features: [
        'عضوية فضية مجانية للحرفيين الناشئين',
        'أولوية البيع بالمتجر المستقل',
        'تغطية إعلامية للمنتجات المميزة'
      ],
      actionLabel: 'صفحة العضويات 🎖️',
      action: () => {
        window.location.hash = '/membership';
        window.dispatchEvent(new CustomEvent('trigger-membership-page'));
      }
    }
  ];

  return (
    <div className={`max-w-7xl mx-auto space-y-8 p-4 sm:p-6 font-sans ${isEn ? 'text-left' : 'text-right'}`} id="standalone-services-page">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between bg-white border border-stone-200 p-4 rounded-2xl shadow-xs">
        <button
          type="button"
          onClick={onBackToHome}
          className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <ArrowRight className={`w-4 h-4 ${isEn ? 'rotate-180' : ''}`} />
          <span>{t('portal.backToHome')}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-black text-stone-800">منظومة الخدمات الشاملة (/services)</span>
          <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping"></span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#174F3E] via-primary to-emerald-900 text-white p-8 sm:p-12 rounded-3xl relative overflow-hidden shadow-xl border border-accent/30">
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="text-accent text-xs font-black bg-white/10 border border-accent/30 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" />
            خدمات متكاملة لتمكين الأسر والحرفيين ورعاة الضيافة 💼
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            دليل خدمات إرث أجيال ومؤسسة التفكير والنماء
          </h1>

          <p className="text-stone-200 text-xs sm:text-sm font-light leading-relaxed">
            نقدم حزمة موحدة من الخدمات التنموية والاقتصادية المصممة بعناية لتأهيل الكوادر الوطنية والأسر المنتجة، وربطها المباشر بسوق الضيافة والسياحة بالمملكة.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div 
            key={srv.id}
            className="bg-white border border-stone-200 hover:border-[#174F3E] rounded-3xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center font-black text-2xl group-hover:scale-110 transition-transform">
                {srv.icon}
              </div>
              <div>
                <h3 className="font-black text-stone-800 text-base group-hover:text-[#174F3E] transition-colors">
                  {srv.title}
                </h3>
                <span className="text-[11px] text-accent font-bold bg-primary/10 px-2.5 py-0.5 rounded-full inline-block mt-1">
                  {srv.subtitle}
                </span>
              </div>
              <p className="text-stone-500 text-xs font-light leading-relaxed">
                {srv.desc}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-stone-100">
                {srv.features.map((ft, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] text-stone-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{ft}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              {srv.action && (
                <button
                  type="button"
                  onClick={srv.action}
                  className="w-full bg-[#174F3E] hover:bg-[#174F3E]/90 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>{srv.actionLabel}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
