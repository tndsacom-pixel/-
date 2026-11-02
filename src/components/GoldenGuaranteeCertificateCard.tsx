import React, { useRef } from 'react';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Printer, 
  Download, 
  Share2, 
  Sparkles, 
  Calendar, 
  ExternalLink,
  QrCode,
  Landmark,
  FileCheck2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { GoldenGuaranteeCertificate } from '../types/goldenGuaranteeTypes';
import { useLanguage } from '../context/LanguageContext';

interface GoldenGuaranteeCertificateCardProps {
  certificate: GoldenGuaranteeCertificate;
  isPrintOnly?: boolean;
  className?: string;
  onVerifyClick?: () => void;
}

export const GoldenGuaranteeCertificateCard: React.FC<GoldenGuaranteeCertificateCardProps> = ({
  certificate,
  isPrintOnly = false,
  className = '',
  onVerifyClick
}) => {
  const { isEn } = useLanguage();
  const certRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const statusLabels = {
    active: { ar: 'ساري ومعتمد', en: 'Active & Verified', bg: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    expired: { ar: 'منتهي الصلاحية', en: 'Expired', bg: 'bg-stone-100 text-stone-700 border-stone-300' },
    suspended: { ar: 'موقوف مؤقتاً', en: 'Temporarily Suspended', bg: 'bg-amber-100 text-amber-900 border-amber-300' },
    revoked: { ar: 'ملغى', en: 'Revoked', bg: 'bg-rose-100 text-rose-900 border-rose-300' }
  };

  const statusInfo = statusLabels[certificate.status] || statusLabels.active;

  return (
    <div className={`space-y-6 ${className}`} dir={isEn ? 'ltr' : 'rtl'}>
      {/* Top Action Bar (hidden on print) */}
      {!isPrintOnly && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-stone-500 block">
                {isEn ? 'Official Digital Certificate' : 'الشهادة الرقمية المعتمدة'}
              </span>
              <span className="text-sm font-black text-stone-900">
                {certificate.accreditationNumber}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#174F3E] hover:bg-[#123e31] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{isEn ? 'Print Certificate' : 'طباعة الشهادة (A4)'}</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `اعتماد الضمان الذهبي - ${certificate.applicantName}`,
                    text: `شهادة اعتماد الضمان الذهبي لمنظومة إرث أجيال برقم ${certificate.accreditationNumber}`,
                    url: certificate.qrVerificationUrl
                  }).catch(() => {});
                } else if (onVerifyClick) {
                  onVerifyClick();
                } else {
                  alert(`رابط التحقق: ${certificate.qrVerificationUrl}`);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{isEn ? 'Share & Verify' : 'مشاركة وتحقق'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LUXURY HERITAGE CERTIFICATE CANVAS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div 
        ref={certRef}
        id="golden-guarantee-printable-certificate"
        className="relative bg-[#FAF9F6] border-4 sm:border-8 border-[#174F3E] rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-xl overflow-hidden w-full max-w-full print:border-4 print:p-8 print:shadow-none print:m-0 print:rounded-none"
      >
        {/* Subtle Luxury Geometric Border Inset */}
        <div className="absolute inset-1.5 sm:inset-2 border sm:border-2 border-dashed border-[#C8A96B]/50 rounded-xl sm:rounded-2xl pointer-events-none" />
        
        {/* Watermark Background Seal */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
          <Award className="w-56 h-56 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] text-[#174F3E]" />
        </div>

        {/* Certificate Content Container */}
        <div className="relative z-10 space-y-8">
          
          {/* Header with Logos and Title */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b-2 border-[#174F3E]/20 pb-6 text-center sm:text-right">
            
            {/* Platform Brand Identity */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#174F3E] text-amber-300 flex items-center justify-center font-black text-xl shadow-xs">
                  إ
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#174F3E] tracking-tight">
                    إرث أجيال للضيافة
                  </h3>
                  <p className="text-[11px] font-bold text-[#C8A96B]">
                    ERTH AJYAL HOSPITALITY & HERITAGE
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-stone-500 font-medium">
                مكة المكرمة • المملكة العربية السعودية
              </p>
            </div>

            {/* Accreditation Badge Seal */}
            <div className="flex flex-col items-center sm:items-end gap-1.5">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-600/30 text-amber-900 text-xs font-black">
                <Award className="w-4 h-4 text-amber-700" />
                <span>{isEn ? 'GOLDEN GUARANTEE ACCREDITED' : 'اعتماد الضمان الذهبي'}</span>
              </div>
              <span className={`text-[11px] font-bold px-3 py-0.5 rounded-full border ${statusInfo.bg}`}>
                {isEn ? statusInfo.en : statusInfo.ar}
              </span>
            </div>
          </div>

          {/* Certificate Main Declaration */}
          <div className="text-center space-y-4 max-w-2xl mx-auto py-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#C8A96B]">
              {isEn ? 'CERTIFICATE OF QUALIFICATION & QUALITY ACCREDITATION' : 'شهادة التأهيل والاعتماد المهني'}
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#174F3E] leading-tight">
              {isEn ? 'GOLDEN GUARANTEE ACCREDITATION' : 'اعتماد الضمان الذهبي'}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
              {isEn 
                ? 'This is to officially certify that the beneficiary has successfully satisfied all rigorous quality, hygiene, and hospitality requirements under the Erth Ajyal Hospitality Ecosystem.'
                : 'تشهد منصة «إرث أجيال للضيافة» بأن المستفيد المذكورة بياناته أدناه قد اجتاز بنجاح كافة متطلبات البرنامج التأهيلي والتقييم المهني، ومُنح اعتماد الضمان الذهبي للجاهزية والامتثال الضيافي:'}
            </p>
          </div>

          {/* Beneficiary Featured Box */}
          <div className="bg-white/90 border border-stone-200/90 rounded-2xl p-6 shadow-xs space-y-4 backdrop-blur-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Beneficiary Name & Project */}
              <div className="space-y-3">
                <div>
                  <span className="text-[11px] font-bold text-stone-400 block uppercase tracking-wider">
                    {isEn ? 'Accredited Beneficiary' : 'اسم المستفيد / المستفيدة'}
                  </span>
                  <p className="text-lg sm:text-xl font-black text-stone-900">
                    {certificate.applicantName}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-stone-400 block uppercase tracking-wider">
                    {isEn ? 'Project & Brand Name' : 'اسم المشروع والنشاط'}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-[#174F3E]">
                    {certificate.projectName}
                  </p>
                </div>
              </div>

              {/* Activity Type & Serial Number */}
              <div className="space-y-3">
                <div>
                  <span className="text-[11px] font-bold text-stone-400 block uppercase tracking-wider">
                    {isEn ? 'Accreditation Serial Number' : 'رقم الاعتماد الرقمي'}
                  </span>
                  <p className="text-lg sm:text-xl font-black text-amber-800 font-mono tracking-wider">
                    {certificate.accreditationNumber}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-stone-400 block uppercase tracking-wider">
                    {isEn ? 'Activity Category' : 'مجال ونوع النشاط التراثي'}
                  </span>
                  <p className="text-sm sm:text-base font-bold text-stone-800">
                    {isEn ? certificate.activityLabelEn : certificate.activityLabelAr}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Standards Passed Chips */}
            <div className="pt-3 border-t border-stone-100">
              <span className="text-[11px] font-bold text-stone-500 block mb-2">
                {isEn ? 'Verified Standards & Benchmarks:' : 'المعايير المعتمدة التي تم اجتيازها:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {certificate.standardsPassed.map((std, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-700 bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">{std}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dates & QR Verification Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center bg-stone-100/70 p-4 rounded-2xl border border-stone-200/70">
            
            {/* Issue Date */}
            <div className="space-y-0.5 text-center sm:text-right">
              <span className="text-[10px] font-bold text-stone-400 block">
                {isEn ? 'Issue Date' : 'تاريخ الإصدار'}
              </span>
              <p className="text-xs sm:text-sm font-bold text-stone-900">
                {certificate.issueDate} {certificate.issueDateHijri ? `(${certificate.issueDateHijri})` : ''}
              </p>
            </div>

            {/* Expiry / Renewal Date */}
            <div className="space-y-0.5 text-center">
              <span className="text-[10px] font-bold text-stone-400 block">
                {isEn ? 'Validity / Renewal Date' : 'تاريخ سريان الاعتماد'}
              </span>
              <p className="text-xs sm:text-sm font-bold text-stone-900">
                {certificate.expiryDate ? `حتى ${certificate.expiryDate}` : (isEn ? 'Annual Periodic Review' : 'تجديد سنوي دوري')}
              </p>
            </div>

            {/* QR Code & Direct Scan */}
            <div className="flex items-center justify-center sm:justify-end gap-3">
              <div className="bg-white p-2 rounded-xl border border-stone-300 shadow-2xs">
                <QRCodeSVG 
                  value={certificate.qrVerificationUrl} 
                  size={64}
                  level="M"
                  includeMargin={false}
                />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black text-[#174F3E] block">
                  {isEn ? 'Scan to Verify' : 'امسح للتحقق'}
                </span>
                <span className="text-[9px] text-stone-500 block">
                  {isEn ? 'Instant Verification' : 'تحقق فوري مباشر'}
                </span>
              </div>
            </div>
          </div>

          {/* Official Signatures & Seal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-stone-200 text-center sm:text-right">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-stone-400 block">
                {isEn ? 'Issuing Authority' : 'الجهة المصدرة للاعتماد'}
              </span>
              <p className="text-xs font-black text-[#174F3E]">
                {isEn ? certificate.issuedByEn : certificate.issuedByAr}
              </p>
              <p className="text-[9px] text-stone-500">
                لجنة التأهيل والاعتماد والجودة التراثية
              </p>
            </div>

            {/* Official Seal Graphic */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#C8A96B] bg-white flex flex-col items-center justify-center shadow-xs text-center p-1">
                <Award className="w-6 h-6 text-[#C8A96B]" />
                <span className="text-[8px] font-black text-[#174F3E] leading-none mt-0.5">
                  إرث أجيال
                </span>
              </div>
            </div>
          </div>

          {/* Regulatory Disclaimer (Mandatory) */}
          <div className="bg-stone-50 border border-stone-200/90 rounded-xl p-3 text-center">
            <p className="text-[10px] text-stone-500 leading-relaxed font-normal">
              {isEn ? certificate.officialDisclaimerEn : certificate.officialDisclaimerAr}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
export default GoldenGuaranteeCertificateCard;
