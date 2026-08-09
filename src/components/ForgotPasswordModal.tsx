import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KeyRound, X, Mail, Send, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { sendPasswordResetEmail } from '../services/emailService';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateLogin?: () => void;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  onNavigateLogin
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmittedMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setErrorMessage('يرجى كتابة عنوان بريد إلكتروني صحيح (مثال: example@domain.com).');
      return;
    }

    setIsLoading(true);

    try {
      const res = await sendPasswordResetEmail(email.trim());
      setIsLoading(false);
      setSubmittedMessage(res.message);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('حدث خطأ أثناء إرسال البريد. يرجى المحاولة لاحقاً.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 dir-rtl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200"
      >
        {/* Header */}
        <div className="bg-primary text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 left-5 text-white/70 hover:text-white p-1 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-accent text-primary flex items-center justify-center font-black text-xl shadow-md">
              🔑
            </div>
            <div>
              <h3 className="text-lg font-black text-accent">استعادة كلمة المرور 🔐</h3>
              <p className="text-xs text-stone-300">سيتم إرسال رابط مؤقت آمن لبريدك الإلكتروني</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {submittedMessage ? (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-2xl">
                ✉️
              </div>
              <h4 className="font-extrabold text-stone-900 text-base">تم إرسال تعليمات الاستعادة ✉️</h4>
              <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200">
                {submittedMessage}
              </p>
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-right text-[11px] text-amber-900 leading-relaxed">
                💡 <strong>ملاحظة للمعاينة:</strong> يمكنك مشاهدة الرسالة مباشرة عبر زر «صندوق البريد 📬» في زاوية الشاشة لتجربة الرابط فوراً.
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateLogin) onNavigateLogin();
                  }}
                  className="w-full bg-primary text-accent hover:bg-primary/95 font-black py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>العودة لصفحة تسجيل الدخول</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs text-stone-600 leading-relaxed">
                أدخل البريد الإلكتروني المرتبط بحسابك. سنرسل لك رابطاً مؤقتاً مخصصاً لإعادة تعيين كلمة المرور بأمان.
              </p>

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-xs font-bold text-stone-800">
                  البريد الإلكتروني <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 pr-10 pl-4 text-xs font-bold text-stone-900 focus:bg-white focus:ring-2 focus:ring-primary focus:outline-hidden transition-all text-right"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute top-3.5 right-3.5" />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-accent hover:bg-amber-400 text-primary font-black py-3.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>جاري إرسال البريد... ⏳</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>إرسال رابط استعادة كلمة المرور</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onNavigateLogin) onNavigateLogin();
                  }}
                  className="text-xs text-stone-500 hover:text-stone-900 font-bold transition-colors cursor-pointer"
                >
                  تذكرت كلمة المرور؟ تسجيل الدخول
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
