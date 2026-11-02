import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  X, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Clock, 
  RefreshCw, 
  Trash2, 
  Eye, 
  ShieldCheck, 
  Send 
} from 'lucide-react';
import { EmailLog } from '../types';
import { getEmailLogs, formatDateArabic } from '../services/emailService';

interface EmailInboxDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserEmail?: string;
}

export default function EmailInboxDrawer({
  isOpen,
  onClose,
  currentUserEmail
}: EmailInboxDrawerProps) {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailLog | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const refreshLogs = () => {
    setLogs(getEmailLogs());
  };

  useEffect(() => {
    refreshLogs();
    const handleSent = (e: any) => {
      refreshLogs();
    };
    window.addEventListener('warath_email_sent', handleSent);
    return () => window.removeEventListener('warath_email_sent', handleSent);
  }, []);

  const clearLogs = () => {
    if (confirm('هل أنت تأكد من مسح جميع رسائل البريد من الصندوق؟')) {
      localStorage.removeItem('warath_email_logs');
      setLogs([]);
      setSelectedEmail(null);
    }
  };

  const filteredLogs = logs.filter(l => {
    const matchesUser = !currentUserEmail || l.recipient.toLowerCase() === currentUserEmail.toLowerCase() || filterType === 'all_system';
    const matchesCategory = filterType === 'all' || filterType === 'all_system' || l.emailType === filterType;
    return matchesUser && matchesCategory;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end dir-rtl">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between"
      >
        {/* Drawer Header */}
        <div className="bg-stone-900 text-white p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-accent/20 text-accent flex items-center justify-center border border-accent/30">
              <Mail className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-accent">صندوق البريد الإلكتروني المباشر (Email Inbox Inspector)</h3>
              <p className="text-[11px] text-stone-400">سجل الإشعارات، روابط التحقق، وتأكيدات الحسابات ✉️</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshLogs}
              title="تحديث الرسائل"
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-stone-100 p-3 border-b border-stone-200 flex items-center justify-between gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'all' ? 'bg-primary text-accent shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
              }`}
            >
              رسائلي {currentUserEmail ? `(${currentUserEmail})` : ''}
            </button>
            <button
              onClick={() => setFilterType('all_system')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'all_system' ? 'bg-primary text-accent shadow-xs' : 'bg-white text-stone-700 hover:bg-stone-200'
              }`}
            >
              جميع رسائل المنصة ({logs.length})
            </button>
            <button
              onClick={() => setFilterType('verification')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'verification' ? 'bg-amber-600 text-white' : 'bg-white text-stone-700'
              }`}
            >
              التوثيق ✉️
            </button>
            <button
              onClick={() => setFilterType('password_reset')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                filterType === 'password_reset' ? 'bg-red-600 text-white' : 'bg-white text-stone-700'
              }`}
            >
              كلمة المرور 🔐
            </button>
          </div>

          {logs.length > 0 && (
            <button
              onClick={clearLogs}
              className="text-red-600 hover:text-red-700 p-1.5 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>مسح</span>
            </button>
          )}
        </div>

        {/* Main Body: List + Detail Split View */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedEmail ? (
            /* Email Detail Preview */
            <div className="space-y-4">
              <button
                onClick={() => setSelectedEmail(null)}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer bg-stone-100 px-3 py-1.5 rounded-lg"
              >
                ← العودة إلى قائمة الرسائل
              </button>

              <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-md">
                <div className="bg-stone-50 p-4 border-b border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-primary/10 text-primary font-black text-[10px] px-2.5 py-1 rounded-full border border-primary/20">
                      {selectedEmail.emailType}
                    </span>
                    <span className="text-stone-400 text-xs flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDateArabic(selectedEmail.sentAt)}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-stone-900">{selectedEmail.subject}</h3>

                  <div className="text-xs text-stone-600 space-y-0.5">
                    <p><strong>المستلم:</strong> {selectedEmail.recipientName ? `${selectedEmail.recipientName} <${selectedEmail.recipient}>` : selectedEmail.recipient}</p>
                    <p><strong>حالة الإرسال:</strong> <span className="text-emerald-700 font-bold">✓ تم الإرسال والتسليم (Delivered)</span></p>
                  </div>

                  {selectedEmail.actionUrl && (
                    <div className="pt-2">
                      <a
                        href={selectedEmail.actionUrl}
                        target="_self"
                        onClick={() => {
                          const url = new URL(selectedEmail.actionUrl!);
                          window.location.hash = url.hash;
                          onClose();
                        }}
                        className="inline-flex items-center gap-2 bg-accent text-primary hover:bg-amber-400 font-black px-4 py-2 rounded-xl text-xs shadow-sm transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>فتح رابط الإجراء المباشر</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* HTML Body Iframe / Render */}
                <div className="p-4 overflow-x-auto">
                  <div 
                    className="prose max-w-none text-xs"
                    dangerouslySetInnerHTML={{ __html: selectedEmail.bodyHtml }}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Email List */
            filteredLogs.length === 0 ? (
              <div className="text-center py-16 text-stone-400 space-y-3">
                <Mail className="w-12 h-12 mx-auto text-stone-300 stroke-1" />
                <p className="text-xs font-bold">لا توجد رسائل بريد إلكتروني في الصندوق حالياً</p>
                <p className="text-[11px] text-stone-400">عند القيام بالتسجيل، طلب كلمة المرور، أو تغيير حالة الطلبات، ستظهر جميع رسائل البريد هنا فوراً.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    onClick={() => setSelectedEmail(log)}
                    className="bg-white border border-stone-200 hover:border-accent p-4 rounded-2xl hover:shadow-md transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <span className="font-bold text-stone-800">{log.recipient}</span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {formatDateArabic(log.sentAt)}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-xs text-stone-900 group-hover:text-primary transition-colors">
                      {log.subject}
                    </h4>

                    <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      {log.bodyText}
                    </p>

                    <div className="flex items-center justify-between text-[11px] pt-1 text-stone-400">
                      <span className="bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-bold">
                        {log.emailType}
                      </span>
                      <span className="text-primary font-bold flex items-center gap-1 group-hover:underline">
                        <Eye className="w-3.5 h-3.5" />
                        قراءة الرسالة الكاملة
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>

        {/* Footer info */}
        <div className="bg-stone-50 p-3 border-t border-stone-200 text-center text-[10px] text-stone-500">
          محاكاة نظام البريد الإلكتروني الفعلي Transactional Email Engine • إرث أجيال TND
        </div>
      </motion.div>
    </div>
  );
}
