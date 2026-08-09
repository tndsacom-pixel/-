import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle, Upload, ShieldCheck, FileText, User, MapPin, Briefcase, Phone, Mail, AlertCircle } from 'lucide-react';
import { ProducerFamily, ProjectType } from '../types';
import { sendAccreditationStatusEmail, sendVerificationEmail } from '../services/emailService';

interface ProducerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (newFamily: ProducerFamily) => void;
}

export default function ProducerRegistrationModal({ isOpen, onClose, onRegisterSuccess }: ProducerRegistrationModalProps) {
  const [brandName, setBrandName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('مكة المكرمة');
  const [projectType, setProjectType] = useState<ProjectType>('culinary');
  const [specialty, setSpecialty] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState('');
  const [licenses, setLicenses] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!agreed) {
      setErrorMessage('يرجى الموافقة على الشروط وأحكام الاعتماد للانضمام.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMessage('يرجى كتابة بريد إلكتروني رسمي صحيح لاستقبال التنبيهات والطلبات.');
      return;
    }

    const newFamily: ProducerFamily = {
      id: `producer-${Date.now()}`,
      brandName,
      ownerName,
      phone,
      email: email.trim().toLowerCase(),
      city,
      projectType,
      specialty: specialty || 'طهي وتراث سعودي أصيل',
      description,
      story: description,
      experience: experience || 'خبرة متميزة في الإنتاج المحلي',
      status: 'pending', // Pending approval by Admin
      rating: 5.0,
      reviewsCount: 0,
      logoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
      coverUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80',
      licenses: licenses ? licenses.split('\n').filter(Boolean) : ['طلب قيد الاعتماد والدراسة'],
      joinedDate: new Date().toISOString().split('T')[0],
      totalSales: 0,
      qualityVerified: false,
      participatingPackages: ['باقة الانطلاق'],
      products: []
    };

    // Send transactional email notification to Producer Family
    const token = 'v_prod_' + Math.random().toString(36).substring(2, 9);
    await sendVerificationEmail(newFamily.email, brandName || ownerName, token);
    await sendAccreditationStatusEmail(newFamily.email, brandName || ownerName, 'pending', 'تم استلام طلب اعتماد أسرتك بنجاح. سيقوم فريق التفكير والنماء بفرز الملف وتفعيل صفحتك وبادج QR.');

    setSubmitted(true);
    setTimeout(() => {
      onRegisterSuccess(newFamily);
      setSubmitted(false);
      onClose();
    }, 1500);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs dir-rtl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl border border-stone-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto text-stone-900"
      >
        {/* Modal Header */}
        <div className="bg-primary text-white p-5 flex items-center justify-between border-b border-accent/20 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent text-primary font-black flex items-center justify-center text-lg shadow-sm">
              👩‍🍳
            </div>
            <div className="text-right">
              <h3 className="font-black text-base md:text-lg">تسجيل أسرة منتجة وحرفية جديدة 📝</h3>
              <p className="text-[10px] text-accent font-light">مبادرة التمكين الاقتصادي ورث أجيال × التفكير والنماء</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-white/70 hover:text-white bg-white/10 rounded-xl transition-all cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-xl font-black text-stone-900">تم تقديم طلب التسجيل بنجاح! 🎉</h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              تم إنشاء ملف الأسرة الرقمي وهو الآن تحت التقييم والاعتماد من فريق التفكير والنماء. يمكنك الدخول للوحة التحكم لإكمال التقييم الذكي.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 text-right">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-3 text-xs text-amber-900">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
              <span>التسجيل مجاني بالكامل ويضمن لك الحصول على حقيبة التمكين والتسويق لمنتجاتك على المنصة.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">اسم الأسرة / العلامة التجارية *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: مطبخ الكرم الأصيل"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-right focus:bg-white focus:ring-2 focus:ring-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">اسم صاحب/ة المشروع *</label>
                <input
                  type="text"
                  required
                  placeholder="الاسم الثلاثي"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-right focus:bg-white focus:ring-2 focus:ring-primary focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">رقم الجوال (واتساب) *</label>
                <input
                  type="tel"
                  required
                  placeholder="05XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-left focus:bg-white focus:ring-2 focus:ring-primary focus:outline-hidden"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-left focus:bg-white focus:ring-2 focus:ring-primary focus:outline-hidden"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">المدينة *</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-right focus:bg-white focus:ring-2 focus:ring-primary focus:outline-hidden"
                >
                  <option value="مكة المكرمة">مكة المكرمة 🕋</option>
                  <option value="المدينة المنورة">المدينة المنورة 🕌</option>
                  <option value="الرياض">الرياض 🏛️</option>
                  <option value="جدة">جدة 🌊</option>
                  <option value="القصيم">القصيم 🌴</option>
                  <option value="منطقة أخرى">منطقة أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">نوع النشاط الرئيسي *</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value as ProjectType)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-right focus:bg-white focus:ring-2 focus:ring-primary focus:outline-hidden"
                >
                  <option value="culinary">فنون الطهي والمأكولات التراثية 🍲</option>
                  <option value="crafts">الحرف اليدوية والمصنوعات 🧵</option>
                  <option value="hospitality">الضيافة العربية والقهوة ☕</option>
                  <option value="home_products">البخور والمنتجات العطرية 🌿</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">التخصص الدقيق *</label>
              <input
                type="text"
                required
                placeholder="مثال: طهي الأكلات الحجازية، نسج السدو، خلط البخور الدوسري..."
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-right focus:bg-white focus:ring-2 focus:ring-primary focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">نبذة عن النشاط وقصة البداية *</label>
              <textarea
                required
                rows={3}
                placeholder="اذكر تفاصيل منتجاتك وكيف بدأت الصنعة..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-right focus:bg-white focus:ring-2 focus:ring-primary focus:outline-hidden resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">سنوات الخبرة</label>
                <input
                  type="text"
                  placeholder="مثال: 5 سنوات"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-right"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">التراخيص والشهادات إن وجدت</label>
                <input
                  type="text"
                  placeholder="وثيقة عمل حر / شهادة سلامة أغذية"
                  value={licenses}
                  onChange={(e) => setLicenses(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-right"
                />
              </div>
            </div>

            {/* Documents & Files Upload UI Mock */}
            <div className="border-2 border-dashed border-stone-200 rounded-2xl p-4 text-center hover:bg-stone-50 transition-colors">
              <Upload className="w-8 h-8 text-stone-400 mx-auto mb-1" />
              <p className="text-xs font-bold text-stone-700">مرفقات المشروع (الشعار، صورة الهوية، صور المنتجات)</p>
              <p className="text-[10px] text-stone-400 mt-0.5">يمكنك رفع الصور لاحقاً من لوحة تحكم الأسرة الرقمية</p>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 text-primary rounded-md border-stone-300 focus:ring-primary"
              />
              <span>أتعهد بصحة البيانات المدخلة والموافقة على معايير الجودة والالتزام بلوائح منصة ورث أجيال.</span>
            </label>

            {/* Submit button */}
            <div className="pt-4 border-t border-stone-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-stone-100 text-stone-700 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-stone-200 cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="bg-primary hover:bg-primary/95 text-accent font-black px-7 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md cursor-pointer"
              >
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>تقديم طلب التسجيل 🚀</span>
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
