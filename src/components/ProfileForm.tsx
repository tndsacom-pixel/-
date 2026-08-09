import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Phone, Mail, Award, Plus, Trash2, Save, ShoppingBag, FolderHeart, Star, CheckCircle, AlertCircle, RefreshCw, KeyRound, ShieldCheck } from 'lucide-react';
import { BeneficiaryProfile, ProjectType, Product } from '../types';
import { sendEmailChangeEmail, sendVerificationEmail } from '../services/emailService';
import { addNewProduct } from '../services/productService';

interface ProfileFormProps {
  profile: BeneficiaryProfile;
  onSave: (updatedProfile: BeneficiaryProfile) => void;
  userRole?: 'beneficiary' | 'admin' | 'pilgrim' | 'visitor';
}

export default function ProfileForm({ profile, onSave, userRole = 'beneficiary' }: ProfileFormProps) {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'orders' | 'bookings' | 'packages' | 'tickets'>('orders');

  const [name, setName] = useState(profile.name || '');
  const [phone, setPhone] = useState(profile.phone || '');
  const [email, setEmail] = useState(profile.email || 'user@warath.sa');
  const [projectName, setProjectName] = useState(profile.projectName || '');
  const [projectType, setProjectType] = useState<ProjectType>(profile.projectType || 'culinary');
  const [description, setDescription] = useState(profile.description || '');
  const [experience, setExperience] = useState(profile.experience || '');
  
  // Email status state (Section 9 requirement)
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(() => {
    return localStorage.getItem('warath_email_verified_' + email) === 'true' || true;
  });
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [newEmailInput, setNewEmailInput] = useState('');
  const [pendingNewEmail, setPendingNewEmail] = useState<string | null>(null);
  const [verificationCodeInput, setVerificationCodeInput] = useState('');
  const [expectedCode, setExpectedCode] = useState<string | null>(null);
  const [emailMsg, setEmailMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Handle Request Email Change
  const handleRequestEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMsg(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newEmailInput || !emailRegex.test(newEmailInput.trim())) {
      setEmailMsg({ type: 'error', text: 'يرجى كتابة بريد إلكتروني جديد صحيح.' });
      return;
    }

    if (newEmailInput.trim().toLowerCase() === email.toLowerCase()) {
      setEmailMsg({ type: 'error', text: 'البريد الإلكتروني الجديد مطابق للبريد الحالي.' });
      return;
    }

    // Generate verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setExpectedCode(code);
    setPendingNewEmail(newEmailInput.trim().toLowerCase());

    const res = await sendEmailChangeEmail(email, newEmailInput.trim(), name || 'مستخدم المنصة', code);
    if (res.success) {
      setEmailMsg({ type: 'success', text: `تم إرسال رمز التحقق إلى البريد الجديد (${newEmailInput}). البريد الحالي لا يزال فعالاً حتى كتابة الرمز.` });
    } else {
      setEmailMsg({ type: 'error', text: res.message });
    }
  };

  // Confirm Verification Code for New Email
  const handleConfirmEmailCode = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMsg(null);

    if (verificationCodeInput.trim() !== expectedCode) {
      setEmailMsg({ type: 'error', text: 'رمز التحقق غير صحيح. يرجى مراجعة البريد الإلكتروني الجديد.' });
      return;
    }

    // Approve email update
    const approvedEmail = pendingNewEmail!;
    setEmail(approvedEmail);
    setIsEmailVerified(true);
    localStorage.setItem('warath_email_verified_' + approvedEmail, 'true');
    setPendingNewEmail(null);
    setExpectedCode(null);
    setVerificationCodeInput('');
    setIsChangingEmail(false);
    setEmailMsg({ type: 'success', text: `تم توثيق واعتماد البريد الإلكتروني الجديد (${approvedEmail}) بنجاح! 🎉` });

    // Save profile update
    onSave({ ...profile, email: approvedEmail });
  };

  
  // Tag-based arrays
  const [skills, setSkills] = useState<string[]>(profile.skills || []);
  const [newSkill, setNewSkill] = useState('');
  
  const [achievements, setAchievements] = useState<string[]>(profile.achievements || []);
  const [newAchievement, setNewAchievement] = useState('');

  // Product additions
  const [products, setProducts] = useState<Product[]>(profile.products || []);
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodCat, setProdCat] = useState('');

  // Simulated images to choose from
  const mockProductImages = [
    'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=200&auto=format&fit=crop', // Coffee/culinary
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=200&auto=format&fit=crop', // Bakery
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=200&auto=format&fit=crop', // Crafts
    'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=200&auto=format&fit=crop', // Incense/home
    'https://images.unsplash.com/photo-1595981267035-7b04ec82a897?q=80&w=200&auto=format&fit=crop'  // Hospitality/plates
  ];
  const [selectedProdImg, setSelectedProdImg] = useState(mockProductImages[0]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim() && !achievements.includes(newAchievement.trim())) {
      setAchievements([...achievements, newAchievement.trim()]);
      setNewAchievement('');
    }
  };

  const handleRemoveAchievement = (ach: string) => {
    setAchievements(achievements.filter(a => a !== ach));
  };

  const handleAddProduct = () => {
    if (prodName.trim() && prodPrice.trim()) {
      const newProd = addNewProduct({
        name: prodName.trim(),
        price: parseFloat(prodPrice) || 0,
        description: prodDesc.trim(),
        category: prodCat.trim() || 'culinary',
        imageUrl: selectedProdImg,
        producerId: (profile as any).id || 'fam-1',
        producerName: profile.name || profile.projectName || 'أسرة منتجة',
        producerCity: 'مكة المكرمة'
      });
      setProducts([...products, newProd]);
      setProdName('');
      setProdPrice('');
      setProdDesc('');
      setProdCat('');
      alert('تم إرسال المنتج جديد بنجاح! وهو الآن بانتظار مراجعة واعتماد الإدارة 🟡');
    }
  };

  const handleRemoveProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      phone,
      email,
      projectName,
      projectType,
      description,
      skills,
      experience,
      achievements,
      products,
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop', // Default beautiful female avatar
      registered: true
    });
  };

  if (userRole === 'visitor' || userRole === 'pilgrim') {
    return (
      <div className="max-w-4xl mx-auto my-4 bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden" id="buyer-account-card">
        {/* Buyer Account Banner */}
        <div className="bg-primary text-stone-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-accent/20" id="buyer-banner">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-accent text-primary font-black text-xl flex items-center justify-center shadow-md">
              {name ? name.charAt(0) : '👤'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold">{name || 'حساب المشتري والزائر'}</h2>
                <span className="bg-accent/20 text-accent text-[10px] font-black px-2.5 py-0.5 rounded-full border border-accent/30">
                  {userRole === 'pilgrim' ? 'معتمر مكي 📍' : 'زائر المنصة ✨'}
                </span>
              </div>
              <p className="text-stone-300 text-xs mt-0.5">مرحباً بك في لوحة حسابك الموحدة لمتابعة الطلبات، الحجوزات، والباقات النشطة.</p>
            </div>
          </div>
        </div>

        {/* Subtabs Bar */}
        <div className="bg-stone-50 border-b border-stone-200 px-4 pt-3 flex items-center gap-2 overflow-x-auto" id="buyer-subtabs">
          <button
            onClick={() => setActiveSubTab('orders')}
            className={`pb-3 px-4 text-xs font-black transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'orders' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>طلباتي ومشترياتي (3)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('bookings')}
            className={`pb-3 px-4 text-xs font-black transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'bookings' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <FolderHeart className="w-4 h-4" />
            <span>حجوزاتي والوجبات (2)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('packages')}
            className={`pb-3 px-4 text-xs font-black transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'packages' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>الباقات والعضويات 🎁</span>
          </button>

          <button
            onClick={() => setActiveSubTab('tickets')}
            className={`pb-3 px-4 text-xs font-black transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'tickets' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>التذاكر والدعم</span>
          </button>

          <button
            onClick={() => setActiveSubTab('profile')}
            className={`pb-3 px-4 text-xs font-black transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeSubTab === 'profile' ? 'border-primary text-primary' : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <User className="w-4 h-4" />
            <span>بيانات حسابي</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8 space-y-6">
          {activeSubTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="font-bold text-stone-800 text-sm flex items-center justify-between">
                <span>سجل الطلبات والمشتريات من الأسر المنتجة</span>
                <span className="text-xs text-emerald-600 font-extrabold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  جميع الطلبات مكتملة وتدعم الأسر المحليّة
                </span>
              </h3>

              <div className="space-y-3">
                <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/40 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-black flex items-center justify-center text-xs">
                      #1042
                    </div>
                    <div className="text-right">
                      <h4 className="font-black text-stone-800 text-sm">بكج الجود المكي - سلة كرم الضيافة</h4>
                      <p className="text-xs text-stone-500 mt-0.5">المطبخ: أم أحمد للطهي التراثي • مكة المكرمة</p>
                    </div>
                  </div>
                  <div className="text-left flex items-center sm:flex-col justify-between sm:justify-center">
                    <span className="text-xs font-black text-primary font-mono">340 ر.س</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md mt-1">
                      تم التسليم ✓
                    </span>
                  </div>
                </div>

                <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/40 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-black flex items-center justify-center text-xs">
                      #1038
                    </div>
                    <div className="text-right">
                      <h4 className="font-black text-stone-800 text-sm">عبوة دهن العود المعتق التراثي</h4>
                      <p className="text-xs text-stone-500 mt-0.5">الحرفية: نورة الحارثي • الحرف اليدوية والعطور</p>
                    </div>
                  </div>
                  <div className="text-left flex items-center sm:flex-col justify-between sm:justify-center">
                    <span className="text-xs font-black text-primary font-mono">180 ر.س</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md mt-1">
                      تم التوصيل ✓
                    </span>
                  </div>
                </div>

                <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/40 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 font-black flex items-center justify-center text-xs">
                      #1019
                    </div>
                    <div className="text-right">
                      <h4 className="font-black text-stone-800 text-sm">صينية كليجة القصيم الفاخرة</h4>
                      <p className="text-xs text-stone-500 mt-0.5">الأسر المنتجة: مخابز الكرم الأصيل</p>
                    </div>
                  </div>
                  <div className="text-left flex items-center sm:flex-col justify-between sm:justify-center">
                    <span className="text-xs font-black text-primary font-mono">120 ر.س</span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md mt-1">
                      جاري التجهيز ⏳
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'bookings' && (
            <div className="space-y-4">
              <h3 className="font-bold text-stone-800 text-sm">الحجوزات والوجبات الخاصة للمعتمرين والزوار</h3>

              <div className="bg-stone-50 border border-stone-200 p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                  <div className="text-right">
                    <span className="text-[10px] bg-primary/10 text-primary font-black px-2.5 py-0.5 rounded-full">
                      حجز مؤكد 📅
                    </span>
                    <h4 className="font-extrabold text-stone-800 text-base mt-1">مأدبة ضيافة مكية لـ 10 أشخاص</h4>
                    <p className="text-xs text-stone-500">الموقع: مكة المكرمة - حي العزيزية بالقرب من الحرم</p>
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black text-primary">15 رجب 1447 هـ</p>
                    <p className="text-[10px] text-stone-400">الوقت: 07:30 مساءً</p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  تشمل المأدبة: القهوة السعودية والتمور الفاخرة، كبسة الحاشي المكي الأصيلة، والحلى التراثي المحضر طازجاً من أيدي الأسر المنتجة.
                </p>
              </div>
            </div>
          )}

          {activeSubTab === 'packages' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-6 rounded-3xl shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-white/20 text-white text-[10px] font-black px-3 py-1 rounded-full border border-white/30">
                    نشطة حالياً ✨
                  </span>
                  <Award className="w-6 h-6 text-amber-200" />
                </div>
                <div>
                  <h3 className="text-lg font-black">عضوية «الجود المكي الممتازة» 👑</h3>
                  <p className="text-xs text-amber-100 mt-1">تتيح لك الخصومات الحصرية وتوصيل مجاني لحجوزات ووجبات المعتمرين</p>
                </div>
                <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs">
                  <span>الصلاحية: ممتدة حتى نهاية موسم الحج</span>
                  <button 
                    onClick={() => alert('عضويتك سارية ومفعّلة بنجاح.')}
                    className="bg-white text-amber-900 font-black px-3 py-1 rounded-xl hover:bg-amber-50 cursor-pointer"
                  >
                    تفاصيل العضوية
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'tickets' && (
            <div className="space-y-4">
              <h3 className="font-bold text-stone-800 text-sm">التذاكر والدعم الفني</h3>
              <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-800 text-xs">تذكرة رقم #T-88: استفسار عن مواعيد توصيل وجبات الحرم</h4>
                  <p className="text-[10px] text-stone-500 mt-0.5">الحالة: تم الرد من الفريق الفني الذكي • مغلقة</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg">
                  مكتملة ✓
                </span>
              </div>
            </div>
          )}

          {activeSubTab === 'profile' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-base font-bold text-primary border-b border-stone-100 pb-2">
                تعديل البيانات الشخصية
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">الاسم الكامل</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-right"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">رقم الجوال</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-left"
                    dir="ltr"
                  />
                </div>

                {/* Section 9: Dedicated Email Management UI Block */}
                <div className="md:col-span-2 bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        <span className="font-extrabold text-xs text-stone-900">البريد الإلكتروني الأساسي:</span>
                        <strong className="text-primary font-mono text-xs">{email}</strong>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-stone-500 font-bold">حالة التوثيق:</span>
                        {isEmailVerified ? (
                          <span className="bg-emerald-100 text-emerald-800 font-black px-2.5 py-0.5 rounded-full text-[11px] border border-emerald-300 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" />
                            ✅ البريد موثق (Verified)
                          </span>
                        ) : (
                          <span className="bg-amber-100 text-amber-900 font-black px-2.5 py-0.5 rounded-full text-[11px] border border-amber-300 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            ⚠️ البريد غير موثق
                          </span>
                        )}
                      </div>
                    </div>

                    {!isChangingEmail && (
                      <button
                        type="button"
                        onClick={() => { setIsChangingEmail(true); setEmailMsg(null); }}
                        className="bg-primary hover:bg-primary/95 text-accent font-black text-xs px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>[تغيير البريد الإلكتروني]</span>
                      </button>
                    )}
                  </div>

                  {/* Feedback Message */}
                  {emailMsg && (
                    <div className={`p-3 rounded-xl text-xs font-bold leading-relaxed ${
                      emailMsg.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                      {emailMsg.text}
                    </div>
                  )}

                  {/* Change Email Subform */}
                  {isChangingEmail && (
                    <div className="bg-white border border-stone-200 p-4 rounded-xl space-y-4">
                      <h4 className="font-bold text-xs text-stone-800 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-accent" />
                        <span>تغيير البريد الإلكتروني (يتطلب إدخال رمز التحقق للبريد الجديد)</span>
                      </h4>

                      {!pendingNewEmail ? (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="email"
                            required
                            placeholder="أدخل البريد الإلكتروني الجديد (example@email.com)"
                            value={newEmailInput}
                            onChange={(e) => setNewEmailInput(e.target.value)}
                            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-bold"
                            dir="ltr"
                          />
                          <button
                            type="button"
                            onClick={handleRequestEmailChange}
                            className="bg-accent text-primary font-black px-4 py-2 rounded-xl text-xs hover:bg-amber-400 transition-all cursor-pointer whitespace-nowrap"
                          >
                            إرسال رمز التوثيق للبريد الجديد
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsChangingEmail(false)}
                            className="bg-stone-200 text-stone-700 font-bold px-3 py-2 rounded-xl text-xs hover:bg-stone-300 transition-all cursor-pointer"
                          >
                            إلغاء
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-xs text-stone-600">
                            أرسلنا رمز تأكيد إلى بريدك الجديد <strong>({pendingNewEmail})</strong>. أدخل الرمز المكون من 6 أرقام هنا لإتمام الاعتماد:
                          </p>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="أدخل الرمز المكون من 6 أرقام"
                              value={verificationCodeInput}
                              onChange={(e) => setVerificationCodeInput(e.target.value)}
                              className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-mono font-bold tracking-widest text-center"
                            />
                            <button
                              type="button"
                              onClick={handleConfirmEmailCode}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-5 py-2 rounded-xl text-xs transition-all cursor-pointer"
                            >
                              تأكيد واعتماد البريد الجديد
                            </button>
                          </div>
                          <p className="text-[10px] text-stone-400">
                            * سيبقى البريد القديم ({email}) هو البريد الفعّال للحساب لحين إدخال رمز التحقق بنجاح.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-end">
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/95 text-accent font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ التعديلات</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-4 bg-white rounded-3xl border border-stone-200 shadow-lg overflow-hidden" id="profile-builder-card">
      {/* Tab Banner */}
      <div className="bg-primary text-stone-100 p-6 flex items-center justify-between" id="profile-banner">
        <div className="flex items-center gap-3">
          <FolderHeart className="w-8 h-8 text-accent" />
          <div>
            <h2 className="text-xl font-bold">إنشاء الملف المهني الرقمي</h2>
            <p className="text-stone-300 text-xs mt-0.5">قم بتمثيل مشروعك وقدراتك بشكل احترافي لتبرهن على جاهزيتك وتزيد ثقة عملائك وشركائك.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8" id="profile-form">
        {/* Sections: 1. Personal & Project Info */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-primary border-b border-stone-100 pb-2 flex items-center gap-2">
            <User className="w-5 h-5 text-accent" />
            <span>البيانات الأساسية وتفاصيل المشروع</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">اسم المستفيد / المستفيدة <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="أدخل اسمك الثلاثي"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all text-right"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">اسم المشروع <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="مثال: مطبخ الكرم التراثي"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all text-right"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">رقم الجوال <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05xxxxxxxx"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all text-left"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username@example.com"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all text-left"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">مجال النشاط الرئيسي <span className="text-red-500">*</span></label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value as ProjectType)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all font-semibold"
              >
                <option value="hospitality">الضيافة والقهوة السعودية</option>
                <option value="culinary">فنون الطهي والمأكولات التراثية</option>
                <option value="crafts">الحرف اليدوية والسدو والتطريز</option>
                <option value="home_products">المنتجات المنزلية والبخور والرشوش</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">الخبرة المهنية (بالسنوات)</label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="مثال: سنتان في طهي المعجنات من المنزل"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all text-right"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">وصف مختصر وقصة المشروع <span className="text-red-500">*</span></label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب نبذة عن مشروعك، قصته، والمواد التي تستخدمها وأهدافك لمستقبل المشروع..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all text-right leading-relaxed"
            />
          </div>
        </div>

        {/* Sections: 2. Skills & Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-stone-100">
          {/* Skills builder */}
          <div className="space-y-4">
            <h4 className="font-bold text-stone-800 text-sm md:text-base flex items-center gap-1.5">
              <Star className="w-4 h-4 text-accent" />
              <span>المهارات والقدرات الخاصة</span>
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="مثال: التصوير، التغليف الفاخر"
                className="flex-grow bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="bg-primary text-accent px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1 hover:bg-primary/95"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.length === 0 ? (
                <span className="text-xs text-stone-400 font-light">لم تقم بإضافة مهارات بعد</span>
              ) : (
                skills.map((skill, index) => (
                  <span key={index} className="inline-flex items-center gap-1.5 bg-stone-100 border border-stone-200 text-stone-700 text-xs px-2.5 py-1.5 rounded-lg">
                    <span>{skill}</span>
                    <button type="button" onClick={() => handleRemoveSkill(skill)} className="text-red-500 hover:text-red-700 font-bold text-sm">×</button>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Achievements builder */}
          <div className="space-y-4">
            <h4 className="font-bold text-stone-800 text-sm md:text-base flex items-center gap-1.5">
              <Award className="w-4 h-4 text-accent" />
              <span>الإنجازات السابقة والشهادات</span>
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={newAchievement}
                onChange={(e) => setNewAchievement(e.target.value)}
                placeholder="مثال: بيع 200 علبة في رمضان"
                className="flex-grow bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddAchievement(); } }}
              />
              <button
                type="button"
                onClick={handleAddAchievement}
                className="bg-primary text-accent px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1 hover:bg-primary/95"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              {achievements.length === 0 ? (
                <span className="text-xs text-stone-400 font-light">لم تقم بإضافة إنجازات بعد</span>
              ) : (
                achievements.map((ach, index) => (
                  <span key={index} className="inline-flex items-center gap-1.5 bg-stone-100 border border-stone-200 text-stone-700 text-xs px-2.5 py-1.5 rounded-lg">
                    <span>{ach}</span>
                    <button type="button" onClick={() => handleRemoveAchievement(ach)} className="text-red-500 hover:text-red-700 font-bold text-sm">×</button>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sections: 3. Add Products (Digital Catalog) */}
        <div className="pt-6 border-t border-stone-100 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-accent" />
              <span>كتالوج المنتجات والأعمال</span>
            </h3>
            <span className="text-xs text-stone-400 font-mono">كتالوج المنتجات الخاص بك</span>
          </div>
          
          <p className="text-xs text-stone-500 bg-stone-50 p-3 rounded-xl border border-stone-200">
            أضف بعض المنتجات لملفك المهني. ستظهر هذه المنتجات بشكل مباشر في متجرك وتساعد الذكاء الاصطناعي في قياس مدى جاهزيتك للتسويق.
          </p>

          <div className="bg-stone-50/50 border border-stone-200 p-4 md:p-6 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            <div className="md:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">اسم المنتج</label>
                  <input
                    type="text"
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="مثال: كيلو معمول تمر هولندي"
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">السعر (ريال سعودي)</label>
                  <input
                    type="number"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="مثال: 75"
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">التصنيف</label>
                  <input
                    type="text"
                    value={prodCat}
                    onChange={(e) => setProdCat(e.target.value)}
                    placeholder="مثال: حلويات، بخور، سدو"
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">صورة تعبيرية للمنتج</label>
                  <div className="flex gap-1.5 items-center">
                    {mockProductImages.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedProdImg(img)}
                        className={`w-10 h-10 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-all ${
                          selectedProdImg === img ? 'border-primary scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="Product placeholder" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1">وصف المنتج ومكوناته</label>
                <input
                  type="text"
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  placeholder="مثال: معمول منزلي هش ومعبأ بعناية فائقة..."
                  className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="button"
                onClick={handleAddProduct}
                className="bg-primary text-accent px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-primary/95 transition-all flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة المنتج للكتالوج</span>
              </button>
            </div>

            {/* Live catalog list */}
            <div className="md:col-span-4 border-r border-stone-200 pr-5 space-y-3 max-h-[300px] overflow-y-auto w-full">
              <h5 className="font-bold text-stone-700 text-xs mb-2">الكتالوج المضاف ({products.length} منتجات)</h5>
              {products.length === 0 ? (
                <div className="text-center py-8 bg-white border border-dashed border-stone-200 rounded-xl text-stone-400 text-xs font-light">
                  لم تقم بإضافة منتجات بعد
                </div>
              ) : (
                products.map((p) => (
                  <div key={p.id} className="bg-white border border-stone-200 rounded-xl p-2.5 flex items-center justify-between gap-2.5 shadow-sm">
                    <img src={p.imageUrl} alt={p.name} className="w-10 h-10 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-grow min-w-0">
                      <h6 className="font-bold text-stone-800 text-xs truncate">{p.name}</h6>
                      <p className="text-stone-500 font-mono text-[10px]">{p.price} ر.س</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(p.id)}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg flex-shrink-0 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stone-100" id="profile-submit-bar">
          <p className="text-xs text-stone-400 text-center sm:text-right">
            بالضغط على حفظ، سيتم بناء ملفك الرقمي الموحد وتحديث بياناتك في المتجر والتسجيل.
          </p>
          <button
            type="submit"
            className="bg-primary hover:bg-primary/95 text-accent font-bold px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 shadow-lg transition-all transform hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            id="save-profile-btn"
          >
            <Save className="w-4 h-4" />
            <span>حفظ وتحديث الملف الرقمي المهني</span>
          </button>
        </div>
      </form>
    </div>
  );
}
