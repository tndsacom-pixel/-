import { useState } from 'react';
import { motion } from 'motion/react';
import { QrCode, X, Heart, Sparkles, ShieldCheck, MapPin, Share2, Star, CheckCircle2 } from 'lucide-react';

interface MealQrCodeModalProps {
  dishName?: string;
  familyName?: string;
  heritageStory?: string;
  ingredients?: string[];
  healthStatus?: string;
  onClose: () => void;
}

export default function MealQrCodeModal({
  dishName = 'وجبة سليم حجازي كابلي باللحم الضاني',
  familyName = 'أسرة أم أحمد الحجازية',
  heritageStory = 'وصفة حجازية عريقة تتوارثها أسرة أم أحمد منذ أكثر من 45 عاماً في حارات مكة القديمة، تعتمد على التتبيلة المكاوية العتيقة ونقع الأرز بالزعفران والبهارات المسبكة.',
  ingredients = ['لحم ضاني بلدي طازج', 'أرز بشاور هندي فاخر', 'زعفران مكة وماء ورد', 'بهارات كابلي سرية'],
  healthStatus = 'معتمدة صحياً من بلدي 🟢',
  onClose
}: MealQrCodeModalProps) {

  const [ratingGiven, setRatingGiven] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 font-sans text-right">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-stone-200 relative overflow-hidden"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full cursor-pointer transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
          <QrCode className="w-5 h-5 text-amber-600" />
          <h3 className="font-extrabold text-[#0B3A60] text-base">
            بطاقة الوجبة والتصريح التراثي (Meal Heritage Story Card)
          </h3>
        </div>

        {/* Card Body */}
        <div className="space-y-4">
          
          <div className="bg-gradient-to-br from-[#003B6F] to-[#0B3A60] text-white p-5 rounded-2.5xl space-y-3 relative overflow-hidden">
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-[10px] font-bold">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>رمز التوثيق التراثي للوجبة</span>
            </div>
            
            <h4 className="text-xl font-black text-amber-300">{dishName}</h4>
            <div className="text-xs text-stone-200 font-bold flex items-center gap-2">
              <span>إعداد: {familyName}</span>
              <span>•</span>
              <span className="text-emerald-300 font-mono">{healthStatus}</span>
            </div>

            <p className="text-xs leading-relaxed text-stone-200/90 font-light border-t border-white/10 pt-3">
              "{heritageStory}"
            </p>
          </div>

          {/* Ingredients Breakdown */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2">
            <span className="text-xs font-black text-stone-700 block">المكونات الطبيعية والمقادير:</span>
            <div className="flex flex-wrap gap-1.5">
              {ingredients.map((ing, i) => (
                <span key={i} className="bg-white border border-stone-200 text-stone-700 text-[11px] font-extrabold px-3 py-1 rounded-xl shadow-2xs">
                  • {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Pilgrim Rating Prompt */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center space-y-2">
            <span className="text-xs font-extrabold text-amber-950 block">هل تناولت هذه الوجبة؟ قيم تجربتك وادعم الأسرة:</span>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatingGiven(star)}
                  className="cursor-pointer transition-transform hover:scale-125"
                >
                  <Star className={`w-6 h-6 ${star <= ratingGiven ? 'text-amber-500 fill-amber-500' : 'text-stone-300'}`} />
                </button>
              ))}
            </div>
            {ratingGiven > 0 && (
              <span className="text-[11px] font-bold text-emerald-700 block animate-fade-in">
                شكراً لتقييمك الرائع ({ratingGiven}/5) ⭐! تم توثيق تقييمك في سجل الأسرة.
              </span>
            )}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleShare}
            className="px-4 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-[#003B6F]" />
            <span>{copied ? 'تم نسخ الرابط!' : 'مشاركة قصة الوجبة'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-[#003B6F] hover:bg-[#002D54] text-white font-black py-3.5 px-4 rounded-2xl text-xs shadow-md transition-all cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </motion.div>
    </div>
  );
}
