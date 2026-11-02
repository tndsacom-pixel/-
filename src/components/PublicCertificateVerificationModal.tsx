import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Award, 
  Calendar, 
  Building2, 
  Tag, 
  QrCode,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { verifyCertificatePublicly, getAllCertificates } from '../services/goldenGuaranteeService';
import { GoldenGuaranteeCertificate } from '../types/goldenGuaranteeTypes';

interface PublicCertificateVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
}

export const PublicCertificateVerificationModal: React.FC<PublicCertificateVerificationModalProps> = ({
  isOpen,
  onClose,
  initialCode = ''
}) => {
  const { isEn } = useLanguage();
  const [searchCode, setSearchCode] = useState<string>(initialCode);
  const [searched, setSearched] = useState<boolean>(false);
  const [result, setResult] = useState<GoldenGuaranteeCertificate | null>(null);

  useEffect(() => {
    if (initialCode) {
      setSearchCode(initialCode);
      const res = verifyCertificatePublicly(initialCode);
      setResult(res);
      setSearched(true);
    } else if (isOpen) {
      // Default to sample code for quick testing
      const certs = getAllCertificates();
      if (certs.length > 0) {
        setSearchCode(certs[0].accreditationNumber);
      }
    }
  }, [initialCode, isOpen]);

  if (!isOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchCode.trim()) return;
    const res = verifyCertificatePublicly(searchCode.trim());
    setResult(res);
    setSearched(true);
  };

  const statusDisplay = {
    active: {
      ar: 'ساري ومعتمد رسميًا',
      en: 'Active & Officially Verified',
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: CheckCircle2
    },
    expired: {
      ar: 'منتهي الصلاحية',
      en: 'Accreditation Expired',
      bg: 'bg-stone-100 text-stone-700 border-stone-300',
      icon: AlertCircle
    },
    suspended: {
      ar: 'موقوف مؤقتاً للمراجعة',
      en: 'Temporarily Suspended',
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: AlertCircle
    },
    revoked: {
      ar: 'ملغى من قبل الإدارة',
      en: 'Revoked by Administration',
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
      icon: AlertCircle
    }
  };

  const currentStatus = result ? (statusDisplay[result.status] || statusDisplay.active) : statusDisplay.active;
  const StatusIcon = currentStatus.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto" dir={isEn ? 'ltr' : 'rtl'}>
      <div className="bg-[#FAF9F6] border border-stone-200 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#174F3E] text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                {isEn ? 'Golden Guarantee Verification' : 'التحقق من اعتماد «الضمان الذهبي»'}
              </h3>
              <p className="text-stone-300 text-xs font-light">
                {isEn ? 'Official registry lookup for Erth Ajyal accreditations' : 'بوابة الاستعلام والتحقق الرقمي المعتمدة لمنصة إرث أجيال'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Search Input Box */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="text-xs font-bold text-stone-700 block">
              {isEn ? 'Enter Accreditation Number or Scan Code:' : 'أدخل رقم الاعتماد أو امسح رمز QR:'}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  placeholder="مثال: ERG-2026-8842"
                  className="w-full bg-white border border-stone-300 rounded-xl py-2.5 pr-10 pl-4 text-xs font-bold text-stone-900 focus:outline-none focus:border-[#174F3E] focus:ring-1 focus:ring-[#174F3E] uppercase font-mono"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#174F3E] hover:bg-[#123e31] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{isEn ? 'Verify' : 'تحقق الآن'}</span>
              </button>
            </div>
          </form>

          {/* Verification Result */}
          {searched && (
            <div className="space-y-4">
              {result ? (
                <div className="bg-white border-2 border-emerald-600/30 rounded-2xl p-5 space-y-4 shadow-xs">
                  
                  {/* Status Banner */}
                  <div className={`flex items-center justify-between p-3 rounded-xl border ${currentStatus.bg}`}>
                    <div className="flex items-center gap-2">
                      <StatusIcon className="w-5 h-5" />
                      <span className="text-xs font-black">
                        {isEn ? currentStatus.en : currentStatus.ar}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-black">
                      {result.accreditationNumber}
                    </span>
                  </div>

                  {/* Public Details Grid (Safe Privacy: No personal phone or national ID exposed) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="text-stone-400 font-bold block text-[10px]">
                        {isEn ? 'Beneficiary Name' : 'اسم المستفيد'}
                      </span>
                      <p className="font-bold text-stone-900">
                        {result.applicantName}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="text-stone-400 font-bold block text-[10px]">
                        {isEn ? 'Project / Brand' : 'اسم المشروع والنشاط'}
                      </span>
                      <p className="font-bold text-[#174F3E]">
                        {result.projectName}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="text-stone-400 font-bold block text-[10px]">
                        {isEn ? 'Activity Field' : 'نوع النشاط'}
                      </span>
                      <p className="font-bold text-stone-800">
                        {isEn ? result.activityLabelEn : result.activityLabelAr}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="text-stone-400 font-bold block text-[10px]">
                        {isEn ? 'Issue Date' : 'تاريخ الإصدار'}
                      </span>
                      <p className="font-bold text-stone-800">
                        {result.issueDate}
                      </p>
                    </div>
                  </div>

                  {/* Standards Verified */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100">
                    <span className="text-[11px] font-bold text-stone-500 block">
                      {isEn ? 'Accreditation Benchmarks:' : 'المعايير المعتمدة:'}
                    </span>
                    <ul className="space-y-1 text-stone-600 text-xs">
                      {result.standardsPassed.map((std, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{std}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Public Legal Disclaimer */}
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200/80">
                    <p className="text-[10px] text-stone-500 leading-relaxed text-center">
                      {isEn ? result.officialDisclaimerEn : result.officialDisclaimerAr}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white border-2 border-rose-300 rounded-2xl p-6 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-black text-stone-900">
                    {isEn ? 'No Certificate Found' : 'لم يتم العثور على اعتماد بهذا الرقم'}
                  </h4>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    {isEn 
                      ? 'Please check the accreditation serial number or scan the QR code again directly from the official certificate.' 
                      : 'يرجى التأكد من كتابة رقم الاعتماد بشكل صحيح أو مسح رمز QR مباشرة من الشهادة الرسمية.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Quick Demo Code helper */}
          {!searched && (
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>
                  {isEn ? 'Try sample accreditation number:' : 'يمكنك تجربة رقم الاعتماد التجريبي:'} <strong>ERG-2026-8842</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSearchCode('ERG-2026-8842');
                  const res = verifyCertificatePublicly('ERG-2026-8842');
                  setResult(res);
                  setSearched(true);
                }}
                className="px-3 py-1 rounded-lg bg-[#174F3E] text-white text-[11px] font-bold cursor-pointer"
              >
                {isEn ? 'Check' : 'فحص'}
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-stone-100 p-4 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-all cursor-pointer"
          >
            {isEn ? 'Close' : 'إغلاق'}
          </button>
        </div>

      </div>
    </div>
  );
};
export default PublicCertificateVerificationModal;
