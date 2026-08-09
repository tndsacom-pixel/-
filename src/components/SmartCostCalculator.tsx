import { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, DollarSign, TrendingUp, Sparkles, Check, Info, ShieldCheck, ArrowRight } from 'lucide-react';

interface SmartCostCalculatorProps {
  onApplyPrice?: (suggestedPrice: number) => void;
}

export default function SmartCostCalculator({ onApplyPrice }: SmartCostCalculatorProps) {
  // Input parameters
  const [ingredientsCost, setIngredientsCost] = useState<number>(12); // cost per meal
  const [packagingCost, setPackagingCost] = useState<number>(3); // container + label + QR
  const [laborGasCost, setLaborGasCost] = useState<number>(4); // labor & energy
  const [targetMargin, setTargetMargin] = useState<number>(35); // 35% profit margin
  const [dailyQuantity, setDailyQuantity] = useState<number>(40); // 40 meals per day
  const [autoDeductionRate, setAutoDeductionRate] = useState<number>(8); // 8% loan auto-deduction

  // Calculations
  const directCostPerMeal = ingredientsCost + packagingCost + laborGasCost;
  // Retail price calculation for target profit margin %
  // Price = DirectCost / (1 - (Margin% + AutoDeduction%) / 100)
  const totalDeductionPercent = targetMargin + autoDeductionRate;
  const rawSuggestedPrice = directCostPerMeal / Math.max(0.2, (1 - totalDeductionPercent / 100));
  const suggestedPrice = Math.ceil(rawSuggestedPrice); // rounded up to nearest SAR

  const grossMarginPerMeal = suggestedPrice - directCostPerMeal;
  const loanDeductionPerMeal = +(suggestedPrice * (autoDeductionRate / 100)).toFixed(2);
  const netProfitPerMeal = +(grossMarginPerMeal - loanDeductionPerMeal).toFixed(2);

  const dailyNetProfit = Math.round(netProfitPerMeal * dailyQuantity);
  const monthlyNetProfit = Math.round(dailyNetProfit * 26); // 26 working days

  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const handleApply = () => {
    if (onApplyPrice) {
      onApplyPrice(suggestedPrice);
    }
    setAppliedSuccess(true);
    setTimeout(() => setAppliedSuccess(false), 3000);
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 p-6 md:p-8 shadow-sm space-y-6 text-right font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-50 rounded-2xl text-amber-700">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-full mb-1">
              <Sparkles className="w-3 h-3 text-amber-700" />
              <span>أداة الذكاء المالي للأسر المنتجة (Smart Pricing & Profit Engine)</span>
            </div>
            <h3 className="font-extrabold text-[#0B3A60] text-lg">
              حاسبة التكلفة والربحية الذكية (Smart Cost & Profit Calculator)
            </h3>
            <p className="text-stone-500 text-xs">
              أدخلي تكلفة المقادير والتغليف، وسيحسب النظام تلقائياً سعر البيع العادل والتنافسي وصافي أرباحك الشهرية.
            </p>
          </div>
        </div>

        {appliedSuccess && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5"
          >
            <Check className="w-4 h-4 text-emerald-600" />
            <span>تم تطبيق السعر الموصى به ({suggestedPrice} ر.س) على منتجاتك!</span>
          </motion.div>
        )}
      </div>

      {/* Input controls & Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Controls Column */}
        <div className="space-y-5 bg-stone-50/70 p-5 rounded-2.5xl border border-stone-150">
          <span className="block font-black text-xs text-[#0B3A60]">1️⃣ إدخال تكاليف الوجبة الواحدة (SAR):</span>

          {/* Input 1: Ingredients */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-extrabold text-stone-700">
              <span>تكلفة المقادير والمكونات (الأرز، اللحم، البهارات):</span>
              <span className="font-mono text-[#0B3A60] font-black">{ingredientsCost} ر.س</span>
            </div>
            <input 
              type="range" 
              min="3" 
              max="60" 
              value={ingredientsCost}
              onChange={(e) => setIngredientsCost(Number(e.target.value))}
              className="w-full accent-[#003B6F] cursor-pointer"
            />
          </div>

          {/* Input 2: Packaging & QR Label */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-extrabold text-stone-700">
              <span>التغليف الفاخر + ملصق الـ QR التراثي:</span>
              <span className="font-mono text-[#0B3A60] font-black">{packagingCost} ر.س</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="15" 
              value={packagingCost}
              onChange={(e) => setPackagingCost(Number(e.target.value))}
              className="w-full accent-[#003B6F] cursor-pointer"
            />
          </div>

          {/* Input 3: Labor & Energy */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-extrabold text-stone-700">
              <span>تكلفة الجهد والغاز والكهرباء التقديرية:</span>
              <span className="font-mono text-[#0B3A60] font-black">{laborGasCost} ر.س</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="20" 
              value={laborGasCost}
              onChange={(e) => setLaborGasCost(Number(e.target.value))}
              className="w-full accent-[#003B6F] cursor-pointer"
            />
          </div>

          <div className="pt-2 border-t border-stone-200/80 space-y-4">
            <span className="block font-black text-xs text-[#0B3A60]">2️⃣ الأهداف الحجمية والاستقطاع:</span>

            {/* Target Margin % */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-extrabold text-stone-700">
                <span>هامش الربح العادل المستهدف (%):</span>
                <span className="font-mono text-emerald-700 font-black">{targetMargin}%</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="60" 
                value={targetMargin}
                onChange={(e) => setTargetMargin(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Daily Volume */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-extrabold text-stone-700">
                <span>إنتاج الوجبات اليومي المتوقع:</span>
                <span className="font-mono text-[#0B3A60] font-black">{dailyQuantity} وجبة/يومياً</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="200" 
                step="5"
                value={dailyQuantity}
                onChange={(e) => setDailyQuantity(Number(e.target.value))}
                className="w-full accent-[#003B6F] cursor-pointer"
              />
            </div>

            {/* Auto Loan Deduction Rate % */}
            <div className="space-y-1.5 bg-amber-50 p-3 rounded-2xl border border-amber-200">
              <div className="flex justify-between items-center text-xs font-extrabold text-amber-900">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  نسبة السداد الآلي للقسط التمويلي (Auto-Deduction):
                </span>
                <span className="font-mono text-amber-900 font-black">{autoDeductionRate}%</span>
              </div>
              <input 
                type="range" 
                min="2" 
                max="15" 
                value={autoDeductionRate}
                onChange={(e) => setAutoDeductionRate(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <p className="text-[10px] text-amber-800 leading-tight">
                يتم اقتطاع هذه النسبة تلقائياً لصالح سداد القسط الميسر بدون أي تدخل منك.
              </p>
            </div>
          </div>

        </div>

        {/* Right Output Calculations Column */}
        <div className="space-y-5 flex flex-col justify-between">
          
          <div className="bg-gradient-to-br from-[#003B6F] to-[#0B3A60] text-white p-6 rounded-3xl shadow-md space-y-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 p-8 opacity-10 font-mono text-8xl font-black text-white pointer-events-none">
              SAR
            </div>

            <div className="space-y-1 relative z-10">
              <span className="text-[11px] font-bold text-amber-300 block">سعر البيع الموصى به للوجبة (Fair Retail Price):</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-black font-mono text-white">{suggestedPrice}</span>
                <span className="text-sm font-bold text-amber-200">ريال سعودي / وجبة</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs font-mono relative z-10">
              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                <span className="text-stone-300 block text-[10px]">إجمالي التكلفة المباشرة</span>
                <strong className="text-white text-base font-bold">{directCostPerMeal} ر.س</strong>
              </div>
              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                <span className="text-stone-300 block text-[10px]">ربح الوجبة المتبقي للأسرة</span>
                <strong className="text-emerald-300 text-base font-bold">+{netProfitPerMeal} ر.س</strong>
              </div>
            </div>

            <div className="bg-emerald-500/20 border border-emerald-400/30 p-4 rounded-2xl space-y-1 relative z-10">
              <div className="flex items-center justify-between text-xs text-emerald-200 font-extrabold">
                <span>صافي الدخل الشهري المتوقع للأسرة:</span>
                <span className="text-emerald-300 font-mono text-sm font-black">26 يوم عمل</span>
              </div>
              <div className="text-2xl md:text-3xl font-black font-mono text-emerald-300">
                {monthlyNetProfit.toLocaleString('ar-SA')} <span className="text-xs text-emerald-100 font-normal">ريال / شهرياً</span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            type="button"
            onClick={handleApply}
            className="w-full bg-[#003B6F] hover:bg-[#002D54] text-white font-black py-4 rounded-2xl text-xs md:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4 text-amber-300" />
            <span>اعتماد التسعير الذكي في متجري الفوري</span>
          </button>

        </div>

      </div>

    </div>
  );
}
