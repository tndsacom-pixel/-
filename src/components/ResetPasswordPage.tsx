import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, CheckCircle2, AlertCircle, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { PasswordResetToken, UserAccount } from '../types';
import { hashPassword } from '../services/emailService';

interface ResetPasswordPageProps {
  tokenParam?: string;
  emailParam?: string;
  onNavigateLogin: () => void;
  renderWarathLogo: (sizeClass?: string) => React.ReactNode;
}

export default function ResetPasswordPage({
  tokenParam,
  emailParam,
  onNavigateLogin,
  renderWarathLogo
}: ResetPasswordPageProps) {
  const [token, setToken] = useState<string>(tokenParam || '');
  const [email, setEmail] = useState<string>(emailParam || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Validate token on component mount
  useEffect(() => {
    // Check hash URL params if not explicitly passed
    let t = tokenParam;
    let e = emailParam;

    if (!t || !e) {
      const hash = window.location.hash;
      const queryStr = hash.includes('?') ? hash.split('?')[1] : '';
      const params = new URLSearchParams(queryStr);
      t = t || params.get('token') || '';
      e = e || params.get('email') || '';
    }

    setToken(t || '');
    setEmail(e || '');

    if (!t) {
      setIsValidToken(false);
      setTokenError('رابط غير صالح أو ناقص المكونات.');
      return;
    }

    // Verify token validity from localStorage
    try {
      const tokens: PasswordResetToken[] = JSON.parse(localStorage.getItem('warath_reset_tokens') || '[]');
      const found = tokens.find(item => item.token === t && !item.used);

      if (!found) {
        setIsValidToken(false);
        setTokenError('هذا الرابط غير صالح أو تم استخدامه سابقاً. يرجى طلب رابط جديد.');
        return;
      }

      const now = new Date();
      const expires = new Date(found.expiresAt);
      if (now > expires) {
        setIsValidToken(false);
        setTokenError('انتهت صلاحية هذا الرابط المؤقت (تستغرق الصلاحية 15 دقيقة فقط).');
        return;
      }

      setIsValidToken(true);
    } catch (err) {
      setIsValidToken(false);
      setTokenError('حدث خطأ أثناء التحقق من الرابط.');
    }
  }, [tokenParam, emailParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (newPassword.length < 6) {
      setErrorMessage('يجب أن تحتوي كلمة المرور على 6 خانات أو أكثر.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('كلمة المرور غير متطابقة في الخانتين.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Hash new password
      const newHash = await hashPassword(newPassword);

      // Update user account in localStorage
      const users: UserAccount[] = JSON.parse(localStorage.getItem('warath_users') || '[]');
      let updatedUser = false;

      const newUsers = users.map(u => {
        if (u.email.toLowerCase() === email.toLowerCase()) {
          updatedUser = true;
          return {
            ...u,
            passwordHash: newHash
          };
        }
        return u;
      });

      if (!updatedUser) {
        // Also check beneficiary profile or producers if stored separately
        const savedProfile = localStorage.getItem('warath_beneficiary_profile');
        if (savedProfile) {
          const prof = JSON.parse(savedProfile);
          prof.passwordHash = newHash;
          localStorage.setItem('warath_beneficiary_profile', JSON.stringify(prof));
        }
      } else {
        localStorage.setItem('warath_users', JSON.stringify(newUsers));
      }

      // Mark token as used (single-use restriction)
      const tokens: PasswordResetToken[] = JSON.parse(localStorage.getItem('warath_reset_tokens') || '[]');
      const updatedTokens = tokens.map(t => {
        if (t.token === token) {
          return { ...t, used: true };
        }
        return t;
      });
      localStorage.setItem('warath_reset_tokens', JSON.stringify(updatedTokens));

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage('حدث خطأ أثناء حفظ كلمة المرور الجديدة.');
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex items-center justify-center p-4 dir-rtl" id="reset-password-screen">
      <div className="max-w-md w-full bg-stone-800 border border-stone-700 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-primary p-6 text-center space-y-3 relative border-b border-accent/20">
          <div className="flex justify-center">{renderWarathLogo('w-12 h-12 text-xl')}</div>
          <h2 className="text-xl font-black text-accent">إعادة تعيين كلمة المرور 🔐</h2>
          <p className="text-xs text-stone-300">منظومة إرث أجيال • حماية الحساب والبيانات</p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {isValidToken === false ? (
            /* Invalid / Expired Token Error */
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-red-900/40 text-red-400 border border-red-500/30 rounded-full flex items-center justify-center mx-auto text-2xl">
                ⚠️
              </div>
              <h3 className="font-extrabold text-white text-base">رابط الاستعادة غير صالح</h3>
              <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/50 p-4 rounded-2xl border border-stone-700">
                {tokenError || 'انتهت صلاحية هذا الرابط أو تم استخدامه مسبقاً.'}
              </p>
              <div className="pt-2">
                <button
                  onClick={onNavigateLogin}
                  className="w-full bg-accent hover:bg-amber-400 text-primary font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>العودة لطلب رابط جديد أو تسجيل الدخول</span>
                </button>
              </div>
            </div>
          ) : isSuccess ? (
            /* Success State */
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-3xl">
                ✓
              </div>
              <h3 className="font-black text-xl text-white">تم تغيير كلمة المرور بنجاح 🎉</h3>
              <p className="text-xs text-emerald-300 bg-emerald-950/60 p-4 rounded-2xl border border-emerald-800 leading-relaxed font-bold">
                تم تغيير كلمة المرور بنجاح، يمكنك تسجيل الدخول الآن باستخدام كلمة المرور الجديدة. 🔐
              </p>

              <div className="pt-4">
                <button
                  onClick={onNavigateLogin}
                  className="w-full bg-accent hover:bg-amber-400 text-primary font-black py-3.5 rounded-xl text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>تسجيل الدخول الآن 🚀</span>
                </button>
              </div>
            </div>
          ) : (
            /* Password Reset Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-stone-900/60 p-3 rounded-xl border border-stone-700 text-xs text-stone-300 space-y-1">
                <p>الحساب: <strong className="text-accent">{email || 'المستخدم'}</strong></p>
                <p className="text-[11px] text-stone-400">يرجى كتابة كلمة مرور جديدة قوية وتأكيدها.</p>
              </div>

              {errorMessage && (
                <div className="bg-red-950/80 border border-red-800 text-red-300 p-3 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-300">
                  كلمة المرور الجديدة <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl py-3 pr-10 pl-10 text-xs text-white focus:border-accent focus:outline-hidden transition-all text-right"
                  />
                  <Lock className="w-4 h-4 text-stone-500 absolute top-3.5 right-3.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-3.5 left-3.5 text-stone-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-300">
                  تأكيد كلمة المرور الجديدة <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl py-3 pr-10 pl-4 text-xs text-white focus:border-accent focus:outline-hidden transition-all text-right"
                  />
                  <Lock className="w-4 h-4 text-stone-500 absolute top-3.5 right-3.5" />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-amber-400 text-primary font-black py-3.5 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>جاري حفظ كلمة المرور... ⏳</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>حفظ كلمة المرور الجديدة وتحديث الحساب</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
