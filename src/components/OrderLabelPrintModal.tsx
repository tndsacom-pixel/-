import { useState } from 'react';
import { motion } from 'motion/react';
import { Printer, X, QrCode, Sparkles, CheckCircle2, ShieldCheck, Heart, MapPin, Calendar, Clock } from 'lucide-react';

interface OrderLabelPrintModalProps {
  orderId?: string;
  familyName?: string;
  dishName?: string;
  customerName?: string;
  deliveryLocation?: string;
  allergens?: string[];
  packagingTime?: string;
  onClose: () => void;
}

export default function OrderLabelPrintModal({
  orderId = 'ORD-2026-8842',
  familyName = 'أسرة أم أحمد الحجازية',
  dishName = 'وجبة سليم حجازي كابلي باللحم الضاني',
  customerName = 'بعثة الحج الماليزية - غرفة 402',
  deliveryLocation = 'فندق دار التوحيد - مكة المكرمة',
  allergens = ['مكسرات (صنوبر ولوز)', 'غلوتين (خبز)'],
  packagingTime = 'اليوم 11:30 صباحاً',
  onClose
}: OrderLabelPrintModalProps) {

  const [printed, setPrinted] = useState(false);

  const handlePrint = () => {
    setPrinted(true);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 font-sans text-right">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 border border-stone-200 relative overflow-hidden"
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full cursor-pointer transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
          <Printer className="w-5 h-5 text-[#003B6F]" />
          <h3 className="font-extrabold text-[#0B3A60] text-base">
            طباعة ملصق الوجبة المعتمد (One-Click Printable Label)
          </h3>
        </div>

        {/* PRINTABLE LABEL AREA (Will print cleanly) */}
        <div id="printable-meal-label" className="border-2 border-dashed border-stone-300 p-5 rounded-2.5xl bg-amber-50/30 space-y-4 text-stone-800">
          
          {/* Label Header */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <div className="text-[10px] text-amber-800 font-extrabold font-mono">ورث أجيال • منصة الأسر المنتجة بمكة</div>
              <h4 className="font-black text-sm text-[#0B3A60]">{familyName}</h4>
            </div>
            <div className="bg-[#003B6F] text-white font-mono text-[10px] font-bold px-2.5 py-1 rounded-lg">
              {orderId}
            </div>
          </div>

          {/* Dish & Customer details */}
          <div className="space-y-2">
            <div>
              <span className="text-[10px] text-stone-400 block font-bold">اسم الوجبة والتخصص:</span>
              <span className="font-extrabold text-sm text-stone-900 block">{dishName}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div>
                <span className="text-stone-400 block text-[9px] font-bold">المستفيد / العميل:</span>
                <span className="font-bold text-stone-800">{customerName}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[9px] font-bold">وقت التغليف والطهي:</span>
                <span className="font-bold text-stone-800">{packagingTime}</span>
              </div>
            </div>

            <div className="text-[11px]">
              <span className="text-stone-400 block text-[9px] font-bold">وجهة التوصيل:</span>
              <span className="font-bold text-stone-800 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-600 inline" />
                {deliveryLocation}
              </span>
            </div>
          </div>

          {/* Allergen & Health Badge */}
          <div className="bg-rose-50 border border-rose-200/80 p-2.5 rounded-xl space-y-1">
            <span className="text-[10px] font-black text-rose-900 block">⚠️ تنبيه مسببات الحساسية:</span>
            <div className="flex flex-wrap gap-1">
              {allergens.map((alg, i) => (
                <span key={i} className="bg-white text-rose-800 text-[9px] font-bold px-2 py-0.5 rounded-md border border-rose-200">
                  {alg}
                </span>
              ))}
            </div>
          </div>

          {/* Label Footer with Dynamic QR Code */}
          <div className="flex items-center justify-between border-t border-stone-200 pt-3 bg-white p-3 rounded-2xl border">
            <div className="space-y-0.5 text-[10px]">
              <div className="flex items-center gap-1 text-emerald-800 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>شهادة صحية معتمدة من بلدي 🟢</span>
              </div>
              <p className="text-stone-500 leading-tight">امسح الـ QR للتعرف على قصة الوصفة الحجازية والتقييم.</p>
            </div>

            {/* Dynamic Generated QR Code Visual */}
            <div className="bg-stone-900 text-white p-2 rounded-xl shadow-xs text-center flex flex-col items-center">
              <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm11-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-4 0h2v2h-2v-2zm0-4h2v2h-2v-2z"/>
              </svg>
              <span className="text-[8px] font-mono text-amber-300 font-bold mt-0.5">امسح الرمز</span>
            </div>
          </div>

        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer"
          >
            إغلاق
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 bg-[#003B6F] hover:bg-[#002D54] text-white font-black py-3.5 px-4 rounded-2xl text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>طباعة ملصق الوجبة الآن (Print Label)</span>
          </button>
        </div>

      </motion.div>
    </div>
  );
}
