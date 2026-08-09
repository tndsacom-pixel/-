import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Info, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ProfitCalculator() {
  const [dailyMeals, setDailyMeals] = useState<number>(30);
  const [mealPrice, setMealPrice] = useState<number>(35);
  const workingDays = 26;
  const costPercentage = 0.35; // 35%

  // Dynamic calculations
  const monthlyRevenue = dailyMeals * mealPrice * workingDays;
  const materialCost = Math.round(monthlyRevenue * costPercentage);
  const netProfit = monthlyRevenue - materialCost;

  // Formatting helper
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  return (
    <div className="bg-[#F4FEF6] border-2 border-[#1E3D34]/20 p-6 md:p-10 rounded-3xl space-y-8 shadow-sm text-right my-8" id="profit-calculator">
      {/* Header Section */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#1E3D34]/10 border border-[#1E3D34]/20 text-[#1E3D34] px-4 py-1.5 rounded-full text-xs font-black">
          <Calculator className="w-4 h-4 text-[#B49A5A]" />
          <span>حاسبة الأرباح التقديرية</span>
        </div>
        <h2 className="font-black text-stone-900 text-2xl md:text-3xl leading-snug">
          احسب أرباحك التقديرية وجاهزية سداد تمويل العمل الحر
        </h2>
        <p className="text-stone-600 text-xs md:text-sm font-light leading-relaxed">
          مرر الأشرطة أدناه لتحديد عدد الوجبات المتوقع بيعها يوميًا عبر اشتراكات المعتمرين والزوار وسعر الوجبة لمعرفة العائد الشهري التقريبي.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sliders & Controls (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-stone-200 p-6 rounded-2xl space-y-6 shadow-xs">
          <h3 className="font-extrabold text-stone-800 text-base border-b border-stone-100 pb-3 flex items-center justify-between">
            <span>⚙️ مدخلات المشروع</span>
            <span className="text-xs text-[#B49A5A] font-bold">تعديل حي</span>
          </h3>

          {/* Slider 1: Daily Meals */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-stone-800 text-xs md:text-sm">
                1. عدد الوجبات المباعة يوميًا
              </label>
              <span className="bg-[#1E3D34] text-[#B49A5A] px-3 py-1 rounded-xl text-xs font-black font-mono">
                {dailyMeals} وجبة
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={150}
              step={5}
              value={dailyMeals}
              onChange={(e) => setDailyMeals(Number(e.target.value))}
              className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#1E3D34]"
            />
            <div className="flex justify-between text-[11px] text-stone-400 font-mono">
              <span>5 وجبات</span>
              <span>150 وجبة</span>
            </div>
          </div>

          {/* Slider 2: Meal Price */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-stone-800 text-xs md:text-sm">
                2. سعر الوجبة المقترح
              </label>
              <span className="bg-[#1E3D34] text-[#B49A5A] px-3 py-1 rounded-xl text-xs font-black font-mono">
                {mealPrice} ريال
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={mealPrice}
              onChange={(e) => setMealPrice(Number(e.target.value))}
              className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#1E3D34]"
            />
            <div className="flex justify-between text-[11px] text-stone-400 font-mono">
              <span>10 ريال</span>
              <span>100 ريال</span>
            </div>
          </div>

          {/* Info 3: Working Days */}
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-800 text-xs md:text-sm">3. عدد أيام العمل</span>
              <span className="font-mono font-black text-xs text-[#1E3D34]">{workingDays} يومًا / شهر</span>
            </div>
            <p className="text-[11px] text-stone-500 font-light leading-normal pt-1">
              (معدل العمل: 26 يومًا في الشهر مع استبعاد أيام العطل والتنظيف والتحضير الدوري).
            </p>
          </div>
        </div>

        {/* Right Column: Calculated Results & Financing Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Calculation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Box 1: Monthly Revenue */}
            <div className="bg-white border border-stone-200 p-5 rounded-2xl space-y-2 text-center shadow-xs">
              <span className="text-stone-500 text-xs font-bold block">العائد الشهري التقديري</span>
              <div className="text-2xl md:text-3xl font-black text-stone-900 font-mono">
                {formatNumber(monthlyRevenue)} <span className="text-xs font-normal">ريال</span>
              </div>
              <span className="text-[10px] text-stone-400 block">
                ({dailyMeals} × {mealPrice} × {workingDays})
              </span>
            </div>

            {/* Box 2: Material Cost */}
            <div className="bg-white border border-stone-200 p-5 rounded-2xl space-y-2 text-center shadow-xs">
              <span className="text-stone-500 text-xs font-bold block">تكلفة المواد التقريبية (35%)</span>
              <div className="text-2xl md:text-3xl font-black text-rose-700 font-mono">
                {formatNumber(materialCost)} <span className="text-xs font-normal">ريال</span>
              </div>
              <span className="text-[10px] text-stone-400 block">
                (العائد × 35%)
              </span>
            </div>

            {/* Box 3: Net Profit */}
            <div className="bg-gradient-to-b from-[#1E3D34] to-[#152B25] text-white p-5 rounded-2xl space-y-2 text-center shadow-md border border-[#B49A5A]/30">
              <span className="text-[#B49A5A] text-xs font-black block">صافي الربح الشهري المتوقع</span>
              <div className="text-2xl md:text-3xl font-black text-white font-mono">
                {formatNumber(netProfit)} <span className="text-xs font-normal text-stone-300">ريال</span>
              </div>
              <span className="text-[10px] text-emerald-300 block">
                (العائد - تكلفة المواد)
              </span>
            </div>
          </div>

          {/* Financing Card */}
          <div className="bg-white border-2 border-[#B49A5A]/40 p-6 rounded-2xl space-y-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-2 h-full bg-[#B49A5A]"></div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
              <h4 className="font-black text-stone-900 text-sm md:text-base flex items-center gap-2">
                <span>💡 القسط الشهري التقديري لتمويل العمل الحر</span>
              </h4>
              <span className="text-xs bg-[#B49A5A]/15 text-stone-800 font-black px-3 py-1 rounded-full border border-[#B49A5A]/30">
                تمويل بدون فوائد
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-xl">
              <div>
                <span className="text-xs text-stone-500 font-medium block">قيمة التمويل الافتراضية:</span>
                <span className="text-lg font-black text-[#1E3D34] font-mono">40,000 ريال</span>
              </div>
              <div>
                <span className="text-xs text-stone-500 font-medium block">القسط الشهري التقديري:</span>
                <span className="text-lg font-black text-emerald-700 font-mono">833 ريال / شهرياً</span>
              </div>
            </div>

            <p className="text-xs text-stone-700 leading-relaxed font-medium bg-emerald-50/80 border border-emerald-200/80 p-3.5 rounded-xl">
              «القسط الشهري التقديري لتمويل العمل الحر (40,000 ريال) هو حوالي 833 ريال، مغطى بالكامل من عوائد مشروعك التقديرية.»
            </p>

            <p className="text-[11px] text-stone-400 font-light italic">
              * ويجب ألا يتم تقديم هذا الرقم باعتباره عرضًا تمويليًا مضمونًا أو موافقة تمويلية فعلية.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <div className="border-t border-stone-200/80 pt-4 text-center">
        <p className="text-[11px] text-stone-500 font-light leading-relaxed max-w-3xl mx-auto">
          *هذه الأرقام استرشادية وتقديرية وليست ضمانًا للأرباح أو التمويل، وتعتمد على المدخلات التي يحددها المستخدم. يجب التحقق من شروط التمويل الفعلية من الجهة التمويلية المختصة.*
        </p>
      </div>
    </div>
  );
}
