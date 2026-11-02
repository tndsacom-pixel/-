import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Eye, 
  FileText, 
  Calendar, 
  UserCheck, 
  ShieldCheck, 
  Check, 
  X, 
  RefreshCw, 
  Download, 
  Printer, 
  ExternalLink,
  Edit,
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { 
  getAllApplicants, 
  saveAllApplicants, 
  adminReviewDocument, 
  adminCompleteConsultation,
  issueGoldenGuarantee, 
  updateCertificateStatus,
  getAllCertificates,
  getAppointmentSlots,
  getAppointmentBookings
} from '../services/goldenGuaranteeService';
import { 
  ApplicantProfile, 
  DocumentItem, 
  DocumentReviewStatus, 
  GoldenGuaranteeCertificate,
  AppointmentBooking,
  AppointmentSlot,
  JourneyStageNumber
} from '../types/goldenGuaranteeTypes';
import GoldenGuaranteeCertificateCard from './GoldenGuaranteeCertificateCard';
import PublicCertificateVerificationModal from './PublicCertificateVerificationModal';

export const AdminGoldenGuaranteeManager: React.FC = () => {
  const { isEn } = useLanguage();

  // State
  const [applicants, setApplicants] = useState<ApplicantProfile[]>(() => getAllApplicants());
  const [certificates, setCertificates] = useState<GoldenGuaranteeCertificate[]>(() => getAllCertificates());
  const [bookings, setBookings] = useState<AppointmentBooking[]>(() => getAppointmentBookings());
  const [slots, setSlots] = useState<AppointmentSlot[]>(() => getAppointmentSlots());

  // Filter & Search
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'applicants' | 'appointments' | 'certificates' | 'lms_audit'>('applicants');

  // Selected Applicant for Document Audit Modal
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantProfile | null>(null);
  const [docNotesState, setDocNotesState] = useState<Record<string, string>>({});
  const [selectedCertForView, setSelectedCertForView] = useState<GoldenGuaranteeCertificate | null>(null);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState<string>('');

  // Sync listener
  useEffect(() => {
    const refresh = () => {
      setApplicants(getAllApplicants());
      setCertificates(getAllCertificates());
      setBookings(getAppointmentBookings());
      setSlots(getAppointmentSlots());
    };

    window.addEventListener('warath_golden_guarantee_updated', refresh);
    return () => window.removeEventListener('warath_golden_guarantee_updated', refresh);
  }, []);

  // Filtered Applicants
  const filteredApplicants = applicants.filter(app => {
    const matchesSearch = 
      (app.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.projectName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.nationalId || '').includes(searchTerm) ||
      (app.phone || '').includes(searchTerm);

    const matchesStage = stageFilter === 'all' || app.currentStageNumber.toString() === stageFilter;
    const matchesStatus = statusFilter === 'all' || app.overallStatus === statusFilter;

    return matchesSearch && matchesStage && matchesStatus;
  });

  // KPI Calculations
  const totalApplicantsCount = applicants.length;
  const underReviewDocsCount = applicants.filter(a => a.documents.some(d => d.status === 'pending' && d.fileName)).length;
  const passedOrientationCount = applicants.filter(a => a.stageProgress.stage1_session).length;
  const activeCertificatesCount = certificates.filter(c => c.status === 'active').length;

  // Handle Document Decision
  const handleDocumentDecision = (docType: string, status: DocumentReviewStatus) => {
    if (!selectedApplicant) return;
    const notes = docNotesState[docType] || '';
    adminReviewDocument(selectedApplicant.id, docType, status, notes, 'فريق التدقيق والجودة (الإدارة)');

    // Refresh selected applicant
    const updatedAll = getAllApplicants();
    const updatedOne = updatedAll.find(a => a.id === selectedApplicant.id);
    if (updatedOne) {
      setSelectedApplicant(updatedOne);
    }
  };

  // Handle Issue Golden Guarantee
  const handleIssueGuarantee = (applicantId: string) => {
    try {
      const cert = issueGoldenGuarantee(applicantId);
      alert(`✅ تم إصدار اعتماد الضمان الذهبي بنجاح برقم (${cert.accreditationNumber}).`);
      setSelectedCertForView(cert);
    } catch (err: any) {
      alert(err.message || 'حدث خطأ أثناء إصدار الشهادة');
    }
  };

  return (
    <div className="space-y-6 text-stone-900" dir={isEn ? 'ltr' : 'rtl'}>
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black">
            <Award className="w-4 h-4 text-amber-700" />
            <span>نظام الاعتماد والضمان الذهبي</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900">
            إدارة البرنامج التأهيلي واعتماد «الضمان الذهبي»
          </h2>
          <p className="text-xs text-stone-500 font-light">
            متابعة مراحل المستفيدين من الجلسات الإرشادية وحتى إصدار الشهادات الرقمية وتدقيق المستندات.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setVerifyCode('');
              setIsVerifyModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-[#174F3E]" />
            <span>استعلام سجل الشهادات</span>
          </button>
        </div>
      </div>

      {/* KPI Counters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500">إجمالي المسجلين بالبرنامج</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#174F3E] flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-stone-900">{totalApplicantsCount}</p>
          <span className="text-[11px] text-stone-400 block">مستفيد ومستفيدة مسجلين</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500">مستندات قيد التدقيق</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-700">{underReviewDocsCount}</p>
          <span className="text-[11px] text-stone-400 block">ملفات تتطلب قرار المراجع</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500">الجلسات الإرشادية المكتملة</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-blue-900">{passedOrientationCount}</p>
          <span className="text-[11px] text-stone-400 block">جلسة استشارية معتمدة</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500">الشهادات والاعتمادات السارية</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-900 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-900">{activeCertificatesCount}</p>
          <span className="text-[11px] text-stone-400 block">اعتماد ضمان ذهبي نشط</span>
        </div>

      </div>

      {/* Admin Module Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('applicants')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'applicants' ? 'bg-[#174F3E] text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          قائمة المتقدمين وتدقيق المستندات ({applicants.length})
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'appointments' ? 'bg-[#174F3E] text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          الجلسات الإرشادية والمواعيد ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab('certificates')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'certificates' ? 'bg-[#174F3E] text-white shadow-xs' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
          }`}
        >
          سجل شهادات الضمان الذهبي ({certificates.length})
        </button>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 1: APPLICANTS & DOCUMENT AUDIT TABLE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'applicants' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-6">
          
          {/* Search & Filter Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="بحث بالاسم، الهوية، الجوال أو المشروع..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 pr-10 pl-4 text-xs font-bold focus:outline-none focus:border-[#174F3E]"
              />
            </div>

            <div>
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-3 text-xs font-bold focus:outline-none"
              >
                <option value="all">كافة المراحل (1 إلى 7)</option>
                <option value="1">المرحلة 1: الجلسة الإرشادية</option>
                <option value="2">المرحلة 2: التسجيل والبيانات</option>
                <option value="3">المرحلة 3: المستندات والاتفاقية</option>
                <option value="4">المرحلة 4: القبول بالبرنامج</option>
                <option value="5">المرحلة 5: الورشة التأهيلية LMS</option>
                <option value="6">المرحلة 6: التقييم والاختبار</option>
                <option value="7">المرحلة 7: اعتماد الضمان الذهبي</option>
              </select>
            </div>

            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-3 text-xs font-bold focus:outline-none"
              >
                <option value="all">كافة الحالات</option>
                <option value="draft">مسودة</option>
                <option value="under_review">قيد المراجعة</option>
                <option value="needs_amendment">يحتاج تعديل مستند</option>
                <option value="accepted">مقبول في البرنامج</option>
                <option value="completed">مكتمل ومعتمد</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
                <tr>
                  <th className="p-3.5">المستفيد / المشروع</th>
                  <th className="p-3.5">الهوية / الجوال</th>
                  <th className="p-3.5">النشاط</th>
                  <th className="p-3.5">المرحلة الحالية</th>
                  <th className="p-3.5">حالة المستندات</th>
                  <th className="p-3.5">اختبار LMS</th>
                  <th className="p-3.5 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredApplicants.map(applicant => {
                  const acceptedDocs = applicant.documents.filter(d => d.status === 'accepted').length;
                  const totalDocs = applicant.documents.filter(d => d.isRequired && (!d.requiresFoodActivityOnly || applicant.activityType === 'culinary')).length;

                  return (
                    <tr key={applicant.id} className="hover:bg-stone-50/80 transition-colors">
                      
                      {/* Name & Project */}
                      <td className="p-3.5">
                        <span className="font-black text-stone-900 block">{applicant.fullName || 'متقدم جديد'}</span>
                        <span className="text-[11px] text-[#174F3E] font-bold block">{applicant.projectName || '—'}</span>
                      </td>

                      {/* ID & Phone */}
                      <td className="p-3.5 font-mono">
                        <span className="block text-stone-800 font-bold">{applicant.nationalId || '—'}</span>
                        <span className="text-[11px] text-stone-500 block">{applicant.phone || '—'}</span>
                      </td>

                      {/* Activity */}
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-lg bg-stone-100 text-stone-800 text-[11px] font-bold">
                          {applicant.activityType === 'culinary' ? 'طهي ومأكولات' : applicant.activityType === 'crafts' ? 'حرف ومشغولات' : 'ضيافة وتجارب'}
                        </span>
                      </td>

                      {/* Current Stage */}
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-[#174F3E] font-bold text-[11px] border border-emerald-200">
                          المرحلة {applicant.currentStageNumber}
                        </span>
                      </td>

                      {/* Documents Status */}
                      <td className="p-3.5">
                        <span className={`font-bold ${acceptedDocs === totalDocs ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {acceptedDocs} من {totalDocs} معتمد
                        </span>
                      </td>

                      {/* LMS Quiz */}
                      <td className="p-3.5">
                        {applicant.lmsQuizPassed ? (
                          <span className="text-emerald-700 font-bold">اجتاز ({applicant.lmsQuizScore}%) ✓</span>
                        ) : applicant.lmsProgressPercent > 0 ? (
                          <span className="text-amber-700 font-bold">حضور {applicant.lmsProgressPercent}%</span>
                        ) : (
                          <span className="text-stone-400">لم يبدأ</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSelectedApplicant(applicant)}
                            className="px-3 py-1.5 rounded-xl bg-[#174F3E] text-white font-bold hover:bg-[#123e31] transition-all cursor-pointer flex items-center gap-1"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>تدقيق ومراجعة</span>
                          </button>

                          {applicant.currentStageNumber >= 6 && !applicant.accreditationId && (
                            <button
                              onClick={() => handleIssueGuarantee(applicant.id)}
                              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold transition-all cursor-pointer flex items-center gap-1"
                              title="إصدار الضمان الذهبي"
                            >
                              <Award className="w-3.5 h-3.5" />
                              <span>اعتماد</span>
                            </button>
                          )}
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 2: APPOINTMENTS & CONSULTATION LOG
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'appointments' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-stone-900">سجل حجوزات الجلسات الإرشادية</h3>
            <span className="text-xs text-stone-500">{bookings.length} موعد مسجل</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-stone-50 text-stone-500 font-bold border-b border-stone-200">
                <tr>
                  <th className="p-3.5">المستفيد</th>
                  <th className="p-3.5">تاريخ ووقت الموعد</th>
                  <th className="p-3.5">نوع الجلسة</th>
                  <th className="p-3.5">الحالة</th>
                  <th className="p-3.5">قرار المستشار</th>
                  <th className="p-3.5 text-center">إجراءات المراجعة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {bookings.map(booking => (
                  <tr key={booking.id} className="hover:bg-stone-50/80">
                    <td className="p-3.5">
                      <span className="font-bold text-stone-900 block">{booking.applicantName}</span>
                      <span className="text-[11px] text-stone-500 font-mono">{booking.applicantPhone}</span>
                    </td>
                    <td className="p-3.5 font-bold text-stone-800">
                      {booking.date} ({booking.timeSlotAr})
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[11px]">
                        {booking.type === 'virtual' ? 'عن بُعد' : 'حضوري بمكة'}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : booking.status === 'attended' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {booking.status === 'confirmed' ? 'مؤكد' : booking.status === 'attended' ? 'تم الحضور' : 'ملغى'}
                      </span>
                    </td>
                    <td className="p-3.5">
                      {booking.consultationStatus ? (
                        <span className="text-emerald-700 font-bold">
                          {booking.consultationStatus === 'passed_ready' ? 'جاهز للتسجيل ✓' : 'يحتاج جاهزية'}
                        </span>
                      ) : (
                        <span className="text-stone-400">بانتظار الانعقاد</span>
                      )}
                    </td>
                    <td className="p-3.5 text-center">
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => {
                            const notes = prompt('أدخل ملاحظات الجلسة الإرشادية:', 'تمت مناقشة المشروع واستيفاء شروط الجاهزية والتمكين.');
                            if (notes !== null) {
                              adminCompleteConsultation(booking.id, 'passed_ready', notes);
                              alert('✅ تم تأكيد حضور الجلسة وترقية المستفيد للمرحلة التالية.');
                            }
                          }}
                          className="px-3 py-1 rounded-xl bg-[#174F3E] text-white font-bold hover:bg-[#123e31] cursor-pointer"
                        >
                          تأكيد الاجتياز ✓
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TAB 3: CERTIFICATES REPOSITORY
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {activeTab === 'certificates' && (
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-stone-900">سجل اعتمادات الضمان الذهبي الصادرة</h3>
            <span className="text-xs text-stone-500">{certificates.length} شهادة رقمية</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map(cert => (
              <div key={cert.id} className="p-5 rounded-2xl border border-stone-200 bg-stone-50/60 hover:bg-white hover:border-[#174F3E] transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-amber-800 text-sm">{cert.accreditationNumber}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    cert.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {cert.status === 'active' ? 'ساري ومعتمد' : 'موقوف / ملغى'}
                  </span>
                </div>

                <div>
                  <h4 className="font-black text-stone-900 text-sm">{cert.applicantName}</h4>
                  <p className="text-xs text-[#174F3E] font-bold">{cert.projectName}</p>
                  <p className="text-[11px] text-stone-500 mt-1">تاريخ الإصدار: {cert.issueDate} • الصلاحية: {cert.expiryDate}</p>
                </div>

                <div className="pt-2 border-t border-stone-200 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedCertForView(cert)}
                    className="px-3 py-1.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold cursor-pointer flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>عرض الشهادة</span>
                  </button>

                  <button
                    onClick={() => {
                      const nextStatus = cert.status === 'active' ? 'suspended' : 'active';
                      updateCertificateStatus(cert.id, nextStatus);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                      cert.status === 'active' ? 'bg-rose-50 text-rose-800 border border-rose-200' : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {cert.status === 'active' ? 'إيقاف مؤقت' : 'تفعيل الاعتماد'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DOCUMENT AUDIT MODAL (FOR SELECTED APPLICANT)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 border border-stone-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                  لوحة تدقيق المستندات الرسمية
                </span>
                <h3 className="text-lg font-black text-stone-900">
                  {selectedApplicant.fullName} — {selectedApplicant.projectName}
                </h3>
                <p className="text-xs text-stone-500 font-mono">
                  الهوية: {selectedApplicant.nationalId} | الجوال: {selectedApplicant.phone} | النشاط: {selectedApplicant.activityType}
                </p>
              </div>

              <button
                onClick={() => setSelectedApplicant(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Document Verification List */}
            <div className="space-y-4">
              {selectedApplicant.documents.map(doc => {
                const isFoodOnly = doc.requiresFoodActivityOnly;
                const isExempt = isFoodOnly && selectedApplicant.activityType !== 'culinary';

                return (
                  <div key={doc.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/70 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-black text-stone-900">{doc.titleAr}</h4>
                        <p className="text-[11px] text-stone-500">{doc.descriptionAr}</p>
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        doc.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' : doc.status === 'needs_update' ? 'bg-amber-100 text-amber-900' : 'bg-stone-200 text-stone-700'
                      }`}>
                        {doc.status === 'accepted' ? 'مقبول ✓' : doc.status === 'needs_update' ? 'يحتاج تعديل ⚠' : 'قيد المراجعة'}
                      </span>
                    </div>

                    {/* File Attachment Pill */}
                    {doc.fileName ? (
                      <div className="bg-white p-2.5 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
                        <span className="font-bold text-stone-800 truncate">📄 {doc.fileName} ({doc.fileSize || '1.2 MB'})</span>
                        <span className="text-[10px] text-stone-400">تاريخ الرفع: {doc.uploadedAt || 'اليوم'}</span>
                      </div>
                    ) : (
                      <div className="text-[11px] text-stone-400 italic">لم يتم رفع الملف بعد</div>
                    )}

                    {/* Review Notes Input */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-stone-600 block">ملاحظات التدقيق والمراجعة للمستفيد:</label>
                      <input
                        type="text"
                        value={docNotesState[doc.type] ?? doc.adminNotes ?? ''}
                        onChange={(e) => setDocNotesState({ ...docNotesState, [doc.type]: e.target.value })}
                        placeholder="أدخل ملاحظاتك (مثال: الهوية واضحة ومطابقة / يرجى إعادة رفع الآيبان...)"
                        className="w-full bg-white border border-stone-300 rounded-xl p-2 text-xs focus:outline-none focus:border-[#174F3E]"
                      />
                    </div>

                    {/* Action Decision Buttons */}
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleDocumentDecision(doc.type, 'rejected')}
                        className="px-3 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 cursor-pointer"
                      >
                        رفض ✗
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDocumentDecision(doc.type, 'needs_update')}
                        className="px-3 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 cursor-pointer"
                      >
                        طلب تعديل ⚠
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDocumentDecision(doc.type, 'accepted')}
                        className="px-4 py-1 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer"
                      >
                        قبول واعتماد ✓
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-stone-100 pt-4 flex justify-between items-center">
              <button
                onClick={() => setSelectedApplicant(null)}
                className="px-5 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold cursor-pointer"
              >
                إغلاق
              </button>

              <button
                onClick={() => {
                  handleIssueGuarantee(selectedApplicant.id);
                  setSelectedApplicant(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#174F3E] text-white text-xs font-black hover:bg-[#123e31] cursor-pointer flex items-center gap-1.5"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>إصدار اعتماد الضمان الذهبي فوراً</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CERTIFICATE FULL VIEWER MODAL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {selectedCertForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 space-y-4 max-h-[95vh] overflow-y-auto">
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedCertForView(null)}
                className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <GoldenGuaranteeCertificateCard certificate={selectedCertForView} />
          </div>
        </div>
      )}

      {/* Public Verification Modal */}
      <PublicCertificateVerificationModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        initialCode={verifyCode}
      />

    </div>
  );
};
export default AdminGoldenGuaranteeManager;
