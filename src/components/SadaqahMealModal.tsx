import { useState } from 'react';
import { motion } from 'motion/react';
import { HeartHandshake, X, Check, Sparkles, MapPin, CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react';

interface SadaqahMealModalProps {
  dishName?: string;
  familyName?: string;
  pricePerMeal?: number;
  onClose: () => void;
  onConfirmOrder?: (details: any) => void;
}

export default function SadaqahMealModal({
  dishName = 'وجبة سليم حجازي كابلي باللحم الضاني',
  familyName = 'أسرة أم أحمد الحجازية',
  pricePerMeal = 25,
  onClose,
  onConfirmOrder
}: SadaqahMealModalProps) {

  const [quantity, setQuantity] = useState<number>(10); // Default 10 meals
  const [destination, setDestination] = useState<'haram_courtyard' | 'makkah_needy' | 'pilgrim_tents'>('haram_courtyard');
  const [dedicationMsg, setDedicationMsg] = useState<string>('صدقة عني وعن والدي لضيوف الرحمن');
  const [donorName, setDonorName] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');

  const [submitted, setSubmitted] = useState<boolean>(false);

  const totalPrice = quantity * pricePerMeal;

  const handleConfirm = () => {
    setSubmitted(true);
    if (onConfirmOrder) {
      onConfirmOrder({
        dishName,
        familyName,
        quantity,
        destination,
        dedicationMsg,
        totalPrice,
        date: new Date().toLocaleDateString('ar-SA')
      });
    }
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
        <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
          <div className="p-2.5 bg-rose-50 text-rose-700 rounded-2xl">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 bg-rose-100 text-rose-900 text-[10px] font-black px-2.5 py-0.5 rounded-full mb-0.5">
              <Sparkles className="w-3 h-3 text-rose-700" />
              <span>خدمة وجبة البر والصدقة بالحرم (Sadaqah & Goodness Meal Flow)</span>
            </div>
            <h3 className="font-extrabold text-[#174F3E] text-base">
              شراء وإهداء وجبات إطعام لضيوف الرحمن بمكة
            </h3>
          </div>
        </div>

        {!submitted ? (
          <div className="space-y-4">
            
            {/* Dish Info */}
            <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-900 font-bold block">الوجبة المختارة:</span>
                <strong className="text-xs font-black text-[#174F3E]">{dishName}</strong>
                <span className="text-[10px] text-stone-500 block">من إعداد: {familyName}</span>
              </div>
              <div className="text-left font-mono font-black text-amber-900 text-sm">
                {pricePerMeal} ر.س / وجبة
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-stone-700 block">عدد الوجبات المراد إهداؤها:</label>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 25, 50].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuantity(num)}
                    className={`py-2 rounded-xl text-xs font-black font-mono border transition-all cursor-pointer ${
                      quantity === num
                        ? 'bg-[#174F3E] text-white border-[#174F3E]'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {num} وجبة
                  </button>
                ))}
              </div>
            </div>

            {/* Destination Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-stone-700 block">وجهة التوزيع الخيرية المعتمدة:</label>
              <div className="space-y-2">
                {[
                  { id: 'haram_courtyard', label: '🕌 ساحات الحرم المكي الشريف ومصليات المعتمرين', sub: 'توزيع مباشر قبيل الإفطار والصلوات' },
                  { id: 'makkah_needy', label: '🏡 الأسر المتعففة والمحتاجة بأحياء مكة المكرمة', sub: 'توزيع عبر الجمعيات المعتمدة' },
                  { id: 'pilgrim_tents', label: '⛺ مخيمات بعثات ضيوف الرحمن في المشاعر', sub: 'توزيع وجبات ساخنة للمخيمات' },
                ].map((dest) => (
                  <label
                    key={dest.id}
                    className={`flex items-start gap-2.5 p-3 rounded-2xl border transition-all cursor-pointer ${
                      destination === dest.id
                        ? 'bg-[#EBF1FA] border-[#174F3E] text-[#174F3E]'
                        : 'bg-stone-50/60 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="dest" 
                      checked={destination === dest.id} 
                      onChange={() => setDestination(dest.id as any)}
                      className="mt-1 accent-[#174F3E]" 
                    />
                    <div>
                      <span className="font-extrabold text-xs block">{dest.label}</span>
                      <span className="text-[10px] text-stone-500 font-light">{dest.sub}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Dedication Message */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-stone-700 block">رسالة الإهداء أو الدعاء (اختياري):</label>
              <input 
                type="text" 
                value={dedicationMsg}
                onChange={(e) => setDedicationMsg(e.target.value)}
                placeholder="اكتب دعاءً أو إهداءً سيتم إرفاقه بطاقة التوزيع..."
                className="w-full bg-stone-50 border border-stone-200 p-2.5 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#174F3E]"
              />
            </div>

            {/* Total summary */}
            <div className="bg-[#174F3E] text-white p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-amber-300 font-bold block">إجمالي قيمة المساهمة:</span>
                <span className="text-xs font-extrabold text-stone-200">{quantity} وجبة × {pricePerMeal} ر.س</span>
              </div>
              <div className="text-xl font-black font-mono text-amber-300">
                {totalPrice.toLocaleString('ar-SA')} ر.س
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleConfirm}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-black py-3.5 rounded-2xl text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span>تأكيد مساهمة البر والصدقة والتوزيع الفوري ➔</span>
            </button>

          </div>
        ) : (
          /* Confirmation Certificate View */
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-5 bg-emerald-50 border border-emerald-200 rounded-2.5xl space-y-4 text-center text-emerald-950"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h4 className="font-black text-lg text-emerald-900">تقبل الله طاعتكم ومساهمتكم المباركة! 🕊️</h4>
              <p className="text-xs text-emerald-800 leading-relaxed font-light">
                تم اعتماد مساهمتكم بشراء ({quantity} وجبة بر وصدقة). جاري تجهيزها فوراً بواسطة ({familyName}) وتوجيهها للتوزيع بساحات الحرم المكي.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-emerald-200 text-right space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-stone-500">رقم وثيقة التوزيع:</span>
                <strong className="text-emerald-900">SDQ-2026-9912</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">جهة التوزيع:</span>
                <strong className="text-emerald-900">ساحات الحرم المكي الشريف</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">إشعار التوثيق:</span>
                <strong className="text-emerald-900">سيصلك إشعار بالصورة فور التوزيع 📲</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-black py-3 rounded-2xl text-xs transition-all cursor-pointer"
            >
              تم وإغلاق
            </button>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}
