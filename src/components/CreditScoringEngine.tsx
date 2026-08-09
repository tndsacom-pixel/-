import { useState } from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, CheckCircle2, TrendingUp, Landmark, Sparkles, AlertCircle, FileText, ChevronLeft } from 'lucide-react';

interface CreditScoringEngineProps {
  completedCoursesCount?: number;
  totalCoursesCount?: number;
  hasHealthCertificate?: boolean;
  orderFulfillmentRate?: number; // e.g. 98%
  customerRating?: number; // e.g. 4.9
  onApplyForLoan?: () => void;
}

export default function CreditScoringEngine({
  completedCoursesCount = 4,
  totalCoursesCount = 5,
  hasHealthCertificate = true,
  orderFulfillmentRate = 98,
  customerRating = 4.9,
  onApplyForLoan
}: CreditScoringEngineProps) {
  
  // Calculate weighted Alternative Scoring Index (0 - 100)
  // 1. Course completion (Max 35 points)
  const coursePoints = Math.round((completedCoursesCount / totalCoursesCount) * 35);
  // 2. Order Fulfillment (Max 30 points)
  const fulfillmentPoints = Math.round((orderFulfillmentRate / 100) * 30);
  // 3. Health & Hygiene Cert (Max 15 points)
  const healthPoints = hasHealthCertificate ? 15 : 0;
  // 4. Rating (Max 20 points)
  const ratingPoints = Math.round((customerRating / 5) * 20);

  const totalScore = coursePoints + fulfillmentPoints + healthPoints + ratingPoints;

  // Unlocked Loan Tier based on Score
  let loanTier = 'الدرجة الأولى (برونزية)';
  let maxLoanAmount = 10000;
  let tierBadgeColor = 'bg-amber-100 text-amber-900 border-amber-300';

  if (totalScore >= 90) {
    loanTier = 'الدرجة الماسية (استحقاق مباشر فوري بدون كفيل)';
    maxLoanAmount = 50000;
    tierBadgeColor = 'bg-emerald-100 text-emerald-950 border-emerald-300';
  } else if (totalScore >= 75) {
    loanTier = 'الدرجة الذهبية (استحقاق ميسر بدون كفيل)';
    maxLoanAmount = 30000;
    tierBadgeColor = 'bg-cyan-100 text-cyan-950 border-cyan-300';
  } else if (totalScore >= 60) {
    loanTier = 'الدرجة الفضية (استحقاق أولي)';
    maxLoanAmount = 15000;
    tierBadgeColor = 'bg-blue-100 text-blue-950 border-blue-300';
  }

  const [appliedLoan, setAppliedLoan] = useState(false);

  const handleApply = () => {
    setAppliedLoan(true);
    if (onApplyForLoan) onApplyForLoan();
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm space-y-6 text-right font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-700">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-[10px] font-black px-2.5 py-0.5 rounded-full mb-1">
              <Sparkles className="w-3 h-3 text-emerald-700" />
              <span>مؤشر الجدارة الائتمانية البديل (Alternative Credit Scoring Engine)</span>
            </div>
            <h3 className="font-extrabold text-[#0B3A60] text-lg">
              تقييم استحقاق التمويل بدون كفيل غارم (Sponsorless Financing Eligibility)
            </h3>
            <p className="text-stone-500 text-xs">
              نظام ذكي يحلل التزام الأسرة بالتدريب والصحة والجودة لمنح تمويل فوري ميسر بدون اشتراط كفيل.
            </p>
          </div>
        </div>

        <div className={`px-4 py-2 rounded-2xl border text-xs font-black font-mono flex items-center gap-2 ${tierBadgeColor}`}>
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>{loanTier}</span>
        </div>
      </div>

      {/* Main Scoring Meter & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        
        {/* Score Radial Card */}
        <div className="bg-gradient-to-br from-[#003B6F] to-[#0B3A60] text-white p-6 rounded-3xl text-center space-y-4 shadow-md relative overflow-hidden">
          <span className="text-xs text-amber-300 font-extrabold block">مؤشر الجدارة التراكمي للأسرة:</span>
          
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="#34D399"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={376}
                strokeDashoffset={376 - (376 * totalScore) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
              <span className="text-3xl font-black text-white">{totalScore}</span>
              <span className="text-[10px] text-emerald-300 font-bold">من 100 نقطة</span>
            </div>
          </div>

          <div className="bg-white/10 p-3 rounded-2xl text-xs font-mono">
            <span className="text-stone-300 block text-[10px]">مبلغ التمويل المتاح فوراً</span>
            <strong className="text-amber-300 text-lg font-black">{maxLoanAmount.toLocaleString('ar-SA')} ر.س</strong>
          </div>
        </div>

        {/* Breakdown Factors Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1">
            <div className="flex justify-between font-bold text-stone-700">
              <span>1. الالتزام بالمسار التدريبي (%40):</span>
              <span className="font-mono text-emerald-700 font-extrabold">{coursePoints} / 35 نقطة</span>
            </div>
            <p className="text-[10px] text-stone-500">إنجاز {completedCoursesCount} من {totalCoursesCount} دورات تدريبية بالمنصة.</p>
          </div>

          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1">
            <div className="flex justify-between font-bold text-stone-700">
              <span>2. سرعة وجودة تسليم الطلبات (%30):</span>
              <span className="font-mono text-emerald-700 font-extrabold">{fulfillmentPoints} / 30 نقطة</span>
            </div>
            <p className="text-[10px] text-stone-500">نسبة التزام بالتسليم المباشر للفنادق والحرم: {orderFulfillmentRate}%</p>
          </div>

          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1">
            <div className="flex justify-between font-bold text-stone-700">
              <span>3. الشهادات الصحية والسلامة (%15):</span>
              <span className="font-mono text-emerald-700 font-extrabold">{healthPoints} / 15 نقطة</span>
            </div>
            <p className="text-[10px] text-stone-500">
              {hasHealthCertificate ? 'تم توثيق الشهادة الصحية من بلدي 🟢' : 'شهادة صحية قيد التوثيق'}
            </p>
          </div>

          <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1">
            <div className="flex justify-between font-bold text-stone-700">
              <span>4. تقييم الزوار والمعتمرين (%15):</span>
              <span className="font-mono text-emerald-700 font-extrabold">{ratingPoints} / 20 نقطة</span>
            </div>
            <p className="text-[10px] text-stone-500">متوسط تقييم الوجبات والتغليف: {customerRating} ⭐</p>
          </div>

        </div>

      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-stone-500 leading-relaxed font-light">
          💡 يتم تحديث مؤشر الجدارة الائتمانية آلياً فور إكمال الدورات وحصولك على تقييمات إيجابية.
        </div>

        {appliedLoan ? (
          <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold text-xs px-4 py-3 rounded-2xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>تم رفع طلب التمويل التمكيني بمبلغ ({maxLoanAmount.toLocaleString('ar-SA')} ر.س) بنجاح!</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleApply}
            className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-black px-6 py-3.5 rounded-2xl text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>تقديم طلب التمويل المباشر بدون كفيل ({maxLoanAmount.toLocaleString('ar-SA')} ر.س) ➔</span>
          </button>
        )}
      </div>

    </div>
  );
}
