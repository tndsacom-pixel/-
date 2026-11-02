import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Calendar, 
  UserCheck, 
  FileText, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Upload, 
  Eye, 
  Play, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Video, 
  BookOpen, 
  CheckSquare, 
  Download, 
  Printer, 
  RefreshCw, 
  HelpCircle,
  FileCheck2,
  Building,
  Info,
  CalendarCheck,
  ChevronRight,
  ChevronLeft,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { 
  getApplicantProfile, 
  saveApplicantProfile, 
  getAppointmentSlots, 
  bookAppointment, 
  cancelAppointment,
  getAppointmentBookings,
  INITIAL_TRAINING_MODULES,
  INITIAL_LMS_QUIZ,
  issueGoldenGuarantee,
  getAllCertificates
} from '../services/goldenGuaranteeService';
import { 
  ApplicantProfile, 
  AppointmentSlot, 
  AppointmentBooking, 
  DocumentItem, 
  DocumentReviewStatus,
  JourneyStageNumber,
  ActivityType,
  GoldenGuaranteeCertificate
} from '../types/goldenGuaranteeTypes';
import GoldenGuaranteeCertificateCard from './GoldenGuaranteeCertificateCard';
import PublicCertificateVerificationModal from './PublicCertificateVerificationModal';

interface QualificationJourneyPageProps {
  onBackToHome?: () => void;
  className?: string;
  onOpenVerification?: (code?: string) => void;
}

export const QualificationJourneyPage: React.FC<QualificationJourneyPageProps> = ({
  onBackToHome,
  className = '',
  onOpenVerification
}) => {
  const { isEn } = useLanguage();
  
  // Profile & State
  const [profile, setProfile] = useState<ApplicantProfile>(() => getApplicantProfile());
  const [slots, setSlots] = useState<AppointmentSlot[]>(() => getAppointmentSlots());
  const [activeBooking, setActiveBooking] = useState<AppointmentBooking | null>(null);
  
  // Active Stage Navigation (User can view completed stages or current stage)
  const [selectedStageTab, setSelectedStageTab] = useState<JourneyStageNumber>(() => {
    const prof = getApplicantProfile();
    return (prof.currentStageNumber || 1) as JourneyStageNumber;
  });

  // Stage 1 (Booking) Form State
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [bookingFormData, setBookingFormData] = useState({
    fullName: profile.fullName || '',
    phone: profile.phone || '',
    email: profile.email || '',
    projectName: profile.projectName || '',
    activityType: (profile.activityType || 'culinary') as ActivityType
  });
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Stage 2 (Registration) Form State
  const [regStep, setRegStep] = useState<1 | 2 | 3>(1);
  const [regForm, setRegForm] = useState({
    fullName: profile.fullName || '',
    nationalId: profile.nationalId || '',
    phone: profile.phone || '',
    email: profile.email || '',
    nationality: profile.nationality || 'SA',
    isSaudi: profile.isSaudi ?? true,
    activityType: (profile.activityType || 'culinary') as ActivityType,
    projectName: profile.projectName || '',
    city: profile.city || 'مكة المكرمة',
    bio: profile.bio || '',
    bankName: profile.bankName || 'مصرف الراجحي',
    iban: profile.iban || '',
    nationalAddress: profile.nationalAddress || '',
    instagram: profile.socialLinks?.instagram || '',
    tiktok: profile.socialLinks?.tiktok || '',
    website: profile.socialLinks?.website || ''
  });

  // Stage 3 (Agreement Modal & Upload Modal)
  const [isAgreementModalOpen, setIsAgreementModalOpen] = useState<boolean>(false);
  const [activeUploadingDocId, setActiveUploadingDocId] = useState<string | null>(null);

  // Stage 5 (LMS Workshop) State
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [lmsTimerSeconds, setLmsTimerSeconds] = useState<number>(profile.lmsAttendanceDurationSeconds || 0);
  const [isLmsPlaying, setIsLmsPlaying] = useState<boolean>(false);

  // Stage 6 (Quiz & Evaluation) State
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(profile.lmsQuizPassed || false);
  const [quizScore, setQuizScore] = useState<number>(profile.lmsQuizScore || 0);

  // Stage 7 (Golden Guarantee Certificate)
  const [activeCertificate, setActiveCertificate] = useState<GoldenGuaranteeCertificate | null>(null);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState<boolean>(false);

  // Sync listener
  useEffect(() => {
    const handleUpdate = () => {
      const p = getApplicantProfile();
      setProfile(p);
      setSlots(getAppointmentSlots());
      
      const bookings = getAppointmentBookings();
      if (p.activeBookingId) {
        const found = bookings.find(b => b.id === p.activeBookingId);
        setActiveBooking(found || null);
      }

      // Check certificate
      const allCerts = getAllCertificates();
      const userCert = allCerts.find(c => c.userId === p.userId || c.id === p.accreditationId);
      if (userCert) {
        setActiveCertificate(userCert);
      }
    };

    handleUpdate();
    window.addEventListener('warath_golden_guarantee_updated', handleUpdate);
    return () => window.removeEventListener('warath_golden_guarantee_updated', handleUpdate);
  }, []);

  // LMS Attendance Timer
  useEffect(() => {
    let interval: any;
    if (selectedStageTab === 5 && isLmsPlaying) {
      interval = setInterval(() => {
        setLmsTimerSeconds(prev => {
          const next = prev + 1;
          // Every 15 seconds, save progress
          if (next % 15 === 0) {
            const updated = { ...profile, lmsAttendanceDurationSeconds: next };
            saveApplicantProfile(updated);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [selectedStageTab, isLmsPlaying, profile]);

  // Stage definitions list
  const stagesList = [
    { number: 1, titleAr: 'الجلسة الإرشادية', titleEn: 'Orientation Session', icon: Calendar },
    { number: 2, titleAr: 'التسجيل والبيانات', titleEn: 'Profile Registration', icon: UserCheck },
    { number: 3, titleAr: 'المستندات والاتفاقية', titleEn: 'Documents & Agreement', icon: FileText },
    { number: 4, titleAr: 'القبول بالبرنامج', titleEn: 'Program Admission', icon: CheckCircle2 },
    { number: 5, titleAr: 'الورشة التأهيلية LMS', titleEn: 'LMS Workshop', icon: GraduationCap },
    { number: 6, titleAr: 'التقييم والاجتياز', titleEn: 'Evaluation & Test', icon: CheckSquare },
    { number: 7, titleAr: 'اعتماد الضمان الذهبي', titleEn: 'Golden Guarantee', icon: Award }
  ];

  // Helper for stage progress completion percentage
  const completedStagesCount = Object.values(profile.stageProgress).filter(Boolean).length;
  const progressPercent = Math.round((completedStagesCount / 7) * 100);

  // Status mapping badge
  const statusBadges = {
    draft: { ar: 'مسودة', en: 'Draft', color: 'bg-stone-100 text-stone-700' },
    submitted: { ar: 'تم الإرسال', en: 'Submitted', color: 'bg-blue-100 text-blue-800' },
    under_review: { ar: 'قيد المراجعة والتدقيق', en: 'Under Review', color: 'bg-amber-100 text-amber-900' },
    needs_completion: { ar: 'يحتاج إلى استكمال', en: 'Needs Completion', color: 'bg-orange-100 text-orange-900' },
    needs_amendment: { ar: 'يحتاج إلى تعديل مستند', en: 'Needs Document Update', color: 'bg-rose-100 text-rose-900' },
    accepted: { ar: 'مقبول في البرنامج', en: 'Accepted', color: 'bg-emerald-100 text-emerald-900' },
    rejected: { ar: 'مرفوض', en: 'Rejected', color: 'bg-red-100 text-red-900' },
    completed: { ar: 'مكتمل ومعتمد بالضمان الذهبي', en: 'Completed & Accredited', color: 'bg-[#174F3E] text-amber-300' }
  };

  const currentStatusBadge = statusBadges[profile.overallStatus] || statusBadges.draft;

  // Handle Booking Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlotId) {
      alert(isEn ? 'Please select a session date & time slot.' : 'يرجى اختيار موعد الجلسة والوقت المناسب.');
      return;
    }

    try {
      const booking = bookAppointment(selectedSlotId, bookingFormData, profile.userId);
      setActiveBooking(booking);
      setBookingSuccess(true);
      
      // Advance to view confirmation
      setTimeout(() => {
        setBookingSuccess(false);
      }, 3000);
    } catch (err: any) {
      alert(err.message || 'حدث خطأ أثناء حجز الموعد');
    }
  };

  // Handle Profile Registration Step Save
  const handleSaveRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.fullName || !regForm.nationalId || !regForm.phone) {
      alert('يرجى تعبئة كافة الحقول الإلزامية.');
      return;
    }

    const updatedProfile: ApplicantProfile = {
      ...profile,
      fullName: regForm.fullName,
      nationalId: regForm.nationalId,
      phone: regForm.phone,
      email: regForm.email,
      nationality: regForm.nationality,
      isSaudi: regForm.isSaudi,
      activityType: regForm.activityType,
      projectName: regForm.projectName,
      city: regForm.city,
      bio: regForm.bio,
      bankName: regForm.bankName,
      iban: regForm.iban,
      nationalAddress: regForm.nationalAddress,
      socialLinks: {
        instagram: regForm.instagram,
        tiktok: regForm.tiktok,
        website: regForm.website
      },
      stageProgress: {
        ...profile.stageProgress,
        stage2_registration: true
      },
      currentStageNumber: profile.currentStageNumber < 3 ? 3 : profile.currentStageNumber,
      overallStatus: 'submitted'
    };

    saveApplicantProfile(updatedProfile);
    setProfile(updatedProfile);
    setSelectedStageTab(3); // Move to documents stage
    alert('✅ تم حفظ البيانات بنجاح والانتقال لمرحلة رفع المستندات.');
  };

  // Handle Document Upload Simulation
  const handleSimulateDocUpload = (docId: string) => {
    const updatedDocs = profile.documents.map(d => {
      if (d.id === docId) {
        return {
          ...d,
          fileName: `${d.type}_verified_doc.pdf`,
          fileSize: '1.4 MB',
          uploadedAt: new Date().toLocaleDateString('ar-SA') + ' ' + new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
          status: 'pending' as DocumentReviewStatus,
          adminNotes: undefined
        };
      }
      return d;
    });

    const updatedProfile: ApplicantProfile = {
      ...profile,
      documents: updatedDocs,
      overallStatus: 'under_review'
    };

    saveApplicantProfile(updatedProfile);
    setProfile(updatedProfile);
    setActiveUploadingDocId(null);
    alert('✅ تم رفع المستند بنجاح وهو الآن قيد مراجعة وتدقيق الإدارة.');
  };

  // Handle Agreement Signing
  const handleSignAgreement = () => {
    const agreementDoc = profile.documents.find(d => d.type === 'agreement');
    const updatedDocs = profile.documents.map(d => {
      if (d.type === 'agreement') {
        return {
          ...d,
          fileName: 'signed_electronic_agreement.pdf',
          fileSize: '450 KB',
          uploadedAt: new Date().toISOString(),
          status: 'accepted' as DocumentReviewStatus,
          adminNotes: 'تمت الموافقة والتوقيع الرقمي الصريح.'
        };
      }
      return d;
    });

    const updatedProfile: ApplicantProfile = {
      ...profile,
      agreementAccepted: true,
      agreementAcceptedAt: new Date().toISOString(),
      agreementVersion: 'v2026.1',
      documents: updatedDocs
    };

    saveApplicantProfile(updatedProfile);
    setProfile(updatedProfile);
    setIsAgreementModalOpen(false);
    alert('✅ تم توثيق الموافقة على الاتفاقية وتسجيل الختم الزمني بنجاح.');
  };

  // Handle Quiz Submission
  const handleQuizSubmit = () => {
    let scoreCount = 0;
    INITIAL_LMS_QUIZ.forEach(q => {
      if (quizAnswers[q.id] === q.correctOptionIndex) {
        scoreCount += 1;
      }
    });

    const scorePct = Math.round((scoreCount / INITIAL_LMS_QUIZ.length) * 100);
    const passed = scorePct >= 75;

    setQuizScore(scorePct);
    setQuizSubmitted(true);

    const updatedProfile: ApplicantProfile = {
      ...profile,
      lmsCompleted: true,
      lmsProgressPercent: 100,
      lmsQuizScore: scorePct,
      lmsQuizPassed: passed,
      stageProgress: {
        ...profile.stageProgress,
        stage5_workshop: true,
        stage6_evaluation: passed
      },
      evaluationScore: scorePct,
      evaluatedAt: new Date().toISOString(),
      currentStageNumber: passed ? 7 : 6
    };

    saveApplicantProfile(updatedProfile);
    setProfile(updatedProfile);

    if (passed) {
      // Auto issue Golden Guarantee if score passed
      const cert = issueGoldenGuarantee(profile.id);
      setActiveCertificate(cert);
      setSelectedStageTab(7);
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAF9F6] text-stone-900 pb-20 ${className}`} dir={isEn ? 'ltr' : 'rtl'}>
      
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          TOP NAVIGATION & HERO BAR
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="bg-[#174F3E] text-white border-b border-[#174F3E]/40 pt-6 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Header Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {onBackToHome && (
                <button
                  onClick={onBackToHome}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title={isEn ? 'Back to Home' : 'العودة للرئيسية'}
                >
                  {isEn ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </button>
              )}
              <div>
                <span className="text-[11px] font-bold text-amber-300 block uppercase tracking-wider">
                  {isEn ? 'Empowerment & Accreditation Pathway' : 'مسار التمكين والاعتماد المهني'}
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
                  {isEn ? 'Rehabilitation & Golden Guarantee Journey' : 'البرنامج التأهيلي واعتماد «الضمان الذهبي»'}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full border shadow-2xs ${currentStatusBadge.color}`}>
                {isEn ? currentStatusBadge.en : currentStatusBadge.ar}
              </span>

              <button
                onClick={() => setIsVerifyModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>{isEn ? 'Public Verification' : 'فحص شهادة معتمدة'}</span>
              </button>
            </div>
          </div>

          {/* User Progress Header Summary Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            
            {/* Where Am I? */}
            <div className="space-y-1">
              <span className="text-stone-300 text-[11px] font-bold block">
                {isEn ? 'Current Stage:' : 'المرحلة الحالية:'}
              </span>
              <p className="text-base sm:text-lg font-black text-amber-300 flex items-center gap-2">
                <span>{stagesList.find(s => s.number === profile.currentStageNumber)?.titleAr}</span>
              </p>
            </div>

            {/* Overall Progress */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-stone-200">
                <span>{isEn ? 'Journey Progress' : 'نسبة إنجاز الرحلة:'}</span>
                <span className="text-amber-300">{completedStagesCount} من 7 مراحل ({progressPercent}%)</span>
              </div>
              <div className="w-full h-2.5 bg-black/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-400 rounded-full transition-all duration-500" 
                  style={{ width: `${Math.max(progressPercent, 5)}%` }} 
                />
              </div>
            </div>

            {/* Next Action Callout */}
            <div className="sm:text-left text-right space-y-1">
              <span className="text-stone-300 text-[11px] font-bold block">
                {isEn ? 'Required Next Action:' : 'المطلوب منك الآن:'}
              </span>
              <p className="text-xs font-medium text-white/90">
                {profile.currentStageNumber === 1 && 'حجز موعد الجلسة الإرشادية مع المستشار.'}
                {profile.currentStageNumber === 2 && 'استكمال بيانات المشروع والتسجيل.'}
                {profile.currentStageNumber === 3 && 'رفع المستندات وتوقيع اتفاقية التمكين.'}
                {profile.currentStageNumber === 4 && 'الاطلاع على خطاب القبول الرسمي بالبرنامج.'}
                {profile.currentStageNumber === 5 && 'إكمال مشاهدة الورشة التأهيلية والدروس.'}
                {profile.currentStageNumber === 6 && 'اجتياز التقييم والاختبار التأهيلي.'}
                {profile.currentStageNumber === 7 && 'استعراض وطباعة شهادة الضمان الذهبي.'}
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MAIN WORKSPACE & 7-STAGE TIMELINE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 -mt-6 space-y-6 sm:space-y-8 w-full max-w-full">
        
        {/* 7-STAGE INTERACTIVE STEPPER TABS */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-2 sm:p-3 border border-stone-200 shadow-md w-full overflow-hidden">
          <div className="overflow-x-auto no-scrollbar py-1 w-full">
            <div className="flex items-center gap-1.5 sm:gap-2 w-max sm:w-full min-w-0">
              {stagesList.map((stage) => {
                const isCompleted = profile.stageProgress[`stage${stage.number}_${stage.number === 1 ? 'session' : stage.number === 2 ? 'registration' : stage.number === 3 ? 'documents' : stage.number === 4 ? 'admission' : stage.number === 5 ? 'workshop' : stage.number === 6 ? 'evaluation' : 'guarantee'}` as keyof typeof profile.stageProgress];
                const isCurrent = profile.currentStageNumber === stage.number;
                const isSelected = selectedStageTab === stage.number;

                return (
                  <button
                    key={stage.number}
                    onClick={() => setSelectedStageTab(stage.number as JourneyStageNumber)}
                    className={`min-w-[85px] sm:min-w-0 sm:flex-1 py-2 sm:py-3 px-1.5 sm:px-2 rounded-xl sm:rounded-2xl flex flex-col items-center gap-1 sm:gap-1.5 transition-all text-center cursor-pointer relative shrink-0 sm:shrink ${
                      isSelected 
                        ? 'bg-[#174F3E] text-white shadow-xs' 
                        : isCompleted 
                          ? 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100' 
                          : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {/* Step Badge */}
                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black ${
                      isSelected 
                        ? 'bg-amber-400 text-stone-950' 
                        : isCompleted 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-stone-200 text-stone-700'
                    }`}>
                      {isCompleted ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : stage.number}
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-bold leading-tight line-clamp-1 whitespace-nowrap">
                      {isEn ? stage.titleEn : stage.titleAr}
                    </span>

                    {isCurrent && !isSelected && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1.5 right-1.5 sm:top-2 sm:right-2 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STAGE 1: الجلسة الإرشادية والاستشارة الإدارية
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {selectedStageTab === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-stone-200 shadow-xs space-y-8 animate-in fade-in duration-200">
            
            {/* Stage Header */}
            <div className="border-b border-stone-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#174F3E] bg-emerald-50 px-3 py-1 rounded-full">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Stage 1 of 7' : 'المرحلة الأولى: الجلسة الإرشادية'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  {isEn ? 'Book Orientation & Readiness Consultation' : 'حجز الجلسة الإرشادية والاستشارة الإدارية'}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 font-light">
                  {isEn ? 'Select an appointment with our business and heritage advisors to review readiness before official filing.' : 'اختر موعد الجلسة الإرشادية لمراجعة جاهزية مشروعك والتعرف على متطلبات التمكين والضمان الذهبي.'}
                </p>
              </div>

              {activeBooking && activeBooking.status === 'confirmed' && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-1">
                  <span className="text-emerald-800 font-bold block flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{isEn ? 'Active Appointment Booked' : 'لديك موعد مؤكد'}</span>
                  </span>
                  <p className="text-stone-700 font-black">
                    {activeBooking.date} ({activeBooking.timeSlotAr})
                  </p>
                </div>
              )}
            </div>

            {/* Active Booking Details Card (If booked) */}
            {activeBooking && (
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200/70 pb-4">
                  <div>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                      {isEn ? 'Confirmed Consultation Details' : 'تفاصيل الموعد الإرشادي المؤكد:'}
                    </span>
                    <h3 className="text-base font-black text-stone-900 mt-0.5">
                      {activeBooking.date} • {activeBooking.timeSlotAr}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                      {activeBooking.status === 'confirmed' ? 'مؤكد 🟢' : activeBooking.status === 'attended' ? 'تم الحضور ✅' : 'ملغى'}
                    </span>
                    {activeBooking.status === 'confirmed' && (
                      <button
                        onClick={() => {
                          if (confirm('هل أنت متأكد من رغبتك في إلغاء هذا الموعد؟')) {
                            cancelAppointment(activeBooking.id);
                            setActiveBooking(null);
                          }
                        }}
                        className="px-3 py-1 rounded-xl bg-white text-rose-700 border border-rose-200 text-xs font-bold hover:bg-rose-50 cursor-pointer"
                      >
                        {isEn ? 'Cancel Booking' : 'إلغاء الموعد'}
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-stone-500 font-medium block">نوع الجلسة:</span>
                    <span className="font-bold text-stone-800">
                      {activeBooking.type === 'virtual' ? 'عن بُعد (Google Meet)' : 'حضورية في مقر إرث أجيال بمكة'}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium block">المتقدم:</span>
                    <span className="font-bold text-stone-800">{activeBooking.applicantName} ({activeBooking.applicantPhone})</span>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium block">النشاط المستهدف:</span>
                    <span className="font-bold text-stone-800">{activeBooking.projectName}</span>
                  </div>
                </div>

                {activeBooking.meetingLink && (
                  <div className="pt-2">
                    <a
                      href={activeBooking.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#174F3E] text-white text-xs font-bold hover:bg-[#123e31] transition-all cursor-pointer"
                    >
                      <Video className="w-4 h-4" />
                      <span>{isEn ? 'Join Virtual Session via Google Meet' : 'الانضمام للجلسة عبر Google Meet'}</span>
                    </a>
                  </div>
                )}

                {/* Consultation Feedback from Admin */}
                {activeBooking.consultationNotes && (
                  <div className="bg-white p-4 rounded-xl border border-emerald-200 text-xs space-y-1">
                    <span className="font-bold text-[#174F3E] block">ملاحظات المستشار الإداري:</span>
                    <p className="text-stone-700 leading-relaxed">{activeBooking.consultationNotes}</p>
                  </div>
                )}
              </div>
            )}

            {/* Interactive Slot Booking Form */}
            {(!activeBooking || activeBooking.status === 'cancelled') && (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                
                {/* Available Slots Grid */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-stone-800 block">
                    {isEn ? '1. Select an Available Appointment Slot:' : '1. اختر الموعد والوقت المناسب لك:'}
                  </label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {slots.map(slot => {
                      const isSelected = selectedSlotId === slot.id;
                      return (
                        <div
                          key={slot.id}
                          onClick={() => slot.available && setSelectedSlotId(slot.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                            !slot.available 
                              ? 'opacity-40 bg-stone-100 border-stone-200 cursor-not-allowed'
                              : isSelected 
                                ? 'bg-emerald-50/80 border-2 border-[#174F3E] shadow-xs' 
                                : 'bg-stone-50/60 border-stone-200 hover:border-stone-300 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-[#174F3E]">
                              {isEn ? slot.dayNameEn : slot.dayNameAr} ({slot.date})
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              slot.type === 'virtual' ? 'bg-blue-50 text-blue-800' : 'bg-amber-50 text-amber-900'
                            }`}>
                              {slot.type === 'virtual' ? 'عن بُعد 💻' : 'حضوري 📍'}
                            </span>
                          </div>

                          <div className="text-xs font-bold text-stone-800">
                            {isEn ? slot.timeSlotEn : slot.timeSlotAr}
                          </div>

                          <p className="text-[11px] text-stone-500">
                            {isEn ? slot.consultantNameEn : slot.consultantNameAr}
                          </p>

                          <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1 border-t border-stone-100">
                            <span>السعة: {slot.maxCapacity - slot.bookedCount} مقاعد متبقية</span>
                            {isSelected && <span className="text-emerald-700 font-bold">✓ تم التحديد</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Applicant Info Inputs */}
                <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
                  <h3 className="text-xs font-black text-stone-800 uppercase tracking-wider">
                    {isEn ? '2. Applicant Contact Information:' : '2. بيانات التواصل الأساسية للمتقدم:'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-stone-700 block">الاسم الثلاثي *</label>
                      <input
                        type="text"
                        required
                        value={bookingFormData.fullName}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, fullName: e.target.value })}
                        placeholder="مثال: منيرة بنت سعد الغامدي"
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-[#174F3E]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-stone-700 block">رقم الجوال *</label>
                      <input
                        type="tel"
                        required
                        value={bookingFormData.phone}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                        placeholder="05XXXXXXXX"
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-[#174F3E]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-stone-700 block">البريد الإلكتروني</label>
                      <input
                        type="email"
                        value={bookingFormData.email}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-[#174F3E]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-stone-700 block">اسم المشروع / النشاط المقترح *</label>
                      <input
                        type="text"
                        required
                        value={bookingFormData.projectName}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, projectName: e.target.value })}
                        placeholder="مثال: مطبخ الأصالة الحجازية"
                        className="w-full bg-white border border-stone-300 rounded-xl p-2.5 text-xs font-bold focus:outline-none focus:border-[#174F3E]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-2xl bg-[#174F3E] hover:bg-[#123e31] text-white text-xs sm:text-sm font-black transition-all shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <CalendarCheck className="w-4 h-4" />
                    <span>{isEn ? 'Confirm Booking & Save Session' : 'تأكيد حجز الجلسة الإرشادية'}</span>
                  </button>
                </div>

              </form>
            )}

            {/* Next Stage Navigation Button */}
            <div className="pt-6 border-t border-stone-100 flex justify-between items-center">
              <span className="text-xs text-stone-500">
                {profile.stageProgress.stage1_session ? '✓ تم إكمال حجز الجلسة الإرشادية.' : 'يرجى حجز الجلسة لمتابعة الرحلة.'}
              </span>
              <button
                onClick={() => setSelectedStageTab(2)}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-all cursor-pointer"
              >
                <span>{isEn ? 'Proceed to Stage 2: Registration' : 'الانتقال إلى المرحلة 2: التسجيل والبيانات'}</span>
                {isEn ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STAGE 2: التسجيل ونموذج البيانات متعدد المراحل
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {selectedStageTab === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-stone-200 shadow-xs space-y-8 animate-in fade-in duration-200">
            
            {/* Stage Header */}
            <div className="border-b border-stone-100 pb-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#174F3E] bg-emerald-50 px-3 py-1 rounded-full mb-1">
                <UserCheck className="w-3.5 h-3.5" />
                <span>{isEn ? 'Stage 2 of 7' : 'المرحلة الثانية: التسجيل والبيانات الأساسية'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                {isEn ? 'Beneficiary & Project Multi-Step Registration' : 'نموذج تسجيل بيانات المستفيد والمشروع التراثي'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 font-light">
                {isEn ? 'Complete basic profile details, bank IBAN, and national address.' : 'نموذج احترافي متعدد الخطوات لحفظ بياناتك الرسمية والبنكية ومطابقة شروط الجنسية السعودية.'}
              </p>
            </div>

            {/* Sub-step indicator */}
            <div className="flex items-center justify-center gap-4 border-b border-stone-100 pb-4">
              <button
                type="button"
                onClick={() => setRegStep(1)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  regStep === 1 ? 'bg-[#174F3E] text-white shadow-xs' : 'bg-stone-100 text-stone-600'
                }`}
              >
                <span>1. البيانات الأساسية والجنسية</span>
              </button>
              <button
                type="button"
                onClick={() => setRegStep(2)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  regStep === 2 ? 'bg-[#174F3E] text-white shadow-xs' : 'bg-stone-100 text-stone-600'
                }`}
              >
                <span>2. النشاط والتفاصيل البنكية والعنوان</span>
              </button>
              <button
                type="button"
                onClick={() => setRegStep(3)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  regStep === 3 ? 'bg-[#174F3E] text-white shadow-xs' : 'bg-stone-100 text-stone-600'
                }`}
              >
                <span>3. قنوات التواصل والمراجعة</span>
              </button>
            </div>

            <form onSubmit={handleSaveRegistration} className="space-y-6">
              
              {/* SUB-STEP 1: Basic & Nationality */}
              {regStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  
                  {/* Saudi Nationality Policy Callout */}
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#174F3E] flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-emerald-950 leading-relaxed">
                      <strong className="block font-black text-[#174F3E] mb-1">
                        شرط الأهلية والجنسية السعودية المعتمد:
                      </strong>
                      يُشترط أن يكون المتقدم أو المتقدمة سعودي الجنسية وفق لوائح تمكين الأسر المنتجة والضمان الذهبي. 
                      علماً بأن عملية إدخال البيانات وحدها لا تُعد إثباتاً نهائياً للأهلية، بل تخضع البيانات للمراجعة والتحقق من الهوية الوطنية.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-stone-700 block">الاسم الكامل (مطابق للهوية الوطنية) *</label>
                      <input
                        type="text"
                        required
                        value={regForm.fullName}
                        onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                        placeholder="الاسم الرباعي"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-bold focus:bg-white focus:outline-none focus:border-[#174F3E]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-stone-700 block">رقم الهوية الوطنية *</label>
                      <input
                        type="text"
                        maxLength={10}
                        required
                        value={regForm.nationalId}
                        onChange={(e) => setRegForm({ ...regForm, nationalId: e.target.value.replace(/\D/g, '') })}
                        placeholder="1XXXXXXXXX"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-bold font-mono focus:bg-white focus:outline-none focus:border-[#174F3E]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-stone-700 block">رقم الجوال *</label>
                      <input
                        type="tel"
                        required
                        value={regForm.phone}
                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                        placeholder="05XXXXXXXX"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-bold focus:bg-white focus:outline-none focus:border-[#174F3E]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-stone-700 block">البريد الإلكتروني *</label>
                      <input
                        type="email"
                        required
                        value={regForm.email}
                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                        placeholder="user@domain.sa"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-bold focus:bg-white focus:outline-none focus:border-[#174F3E]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setRegStep(2)}
                      className="px-6 py-2.5 rounded-xl bg-[#174F3E] text-white text-xs font-bold cursor-pointer"
                    >
                      التالي: النشاط والبنك والعنوان
                    </button>
                  </div>
                </div>
              )}

              {/* SUB-STEP 2: Activity, Bank, National Address */}
              {regStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    
                    {/* Activity Type */}
                    <div className="space-y-1">
                      <label className="font-bold text-stone-700 block">نوع ومجال النشاط *</label>
                      <select
                        value={regForm.activityType}
                        onChange={(e) => setRegForm({ ...regForm, activityType: e.target.value as ActivityType })}
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-bold focus:bg-white focus:outline-none focus:border-[#174F3E]"
                      >
                        <option value="culinary">الطهي والمأكولات التراثية (يتطلب شهادة صحية)</option>
                        <option value="crafts">الحرف اليدوية والمشغولات التراثية (لا يتطلب شهادة صحية)</option>
                        <option value="hospitality">خدمات الضيافة والتجارب الثقافية</option>
                        <option value="home_products">المنتجات المنزلية والتراثية</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-stone-700 block">اسم المشروع أو العلامة التجارية *</label>
                      <input
                        type="text"
                        required
                        value={regForm.projectName}
                        onChange={(e) => setRegForm({ ...regForm, projectName: e.target.value })}
                        placeholder="مثال: ورثة النسيج المكي"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-bold focus:bg-white focus:outline-none focus:border-[#174F3E]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-stone-700 block">اسم البنك المعتمد *</label>
                      <input
                        type="text"
                        required
                        value={regForm.bankName}
                        onChange={(e) => setRegForm({ ...regForm, bankName: e.target.value })}
                        placeholder="مثال: مصرف الراجحي / البنك الأهلي"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-bold focus:bg-white focus:outline-none focus:border-[#174F3E]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-stone-700 block">رقم الآيبان البنكي التجاري (IBAN) *</label>
                      <input
                        type="text"
                        required
                        value={regForm.iban}
                        onChange={(e) => setRegForm({ ...regForm, iban: e.target.value.toUpperCase() })}
                        placeholder="SA4480000000000000000000"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-bold font-mono focus:bg-white focus:outline-none focus:border-[#174F3E]"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="font-bold text-stone-700 block">العنوان الوطني المعتمد (سُبل) *</label>
                      <input
                        type="text"
                        required
                        value={regForm.nationalAddress}
                        onChange={(e) => setRegForm({ ...regForm, nationalAddress: e.target.value })}
                        placeholder="مثال: مكة المكرمة، حي العزيزية، شارع عبدالله خياط، مبنى 4022"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl p-3 text-xs font-bold focus:bg-white focus:outline-none focus:border-[#174F3E]"
                      />
                    </div>

                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setRegStep(1)}
                      className="px-6 py-2.5 rounded-xl bg-stone-200 text-stone-800 text-xs font-bold cursor-pointer"
                    >
                      السابق
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegStep(3)}
                      className="px-6 py-2.5 rounded-xl bg-[#174F3E] text-white text-xs font-bold cursor-pointer"
                    >
                      التالي: قنوات التواصل والمراجعة
                    </button>
                  </div>
                </div>
              )}

              {/* SUB-STEP 3: Socials & Review */}
              {regStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div className="space-y-1">
                      <label className="font-bold text-stone-700 block">حساب إنستغرام (اختياري)</label>
                      <input
                        type="text"
                        value={regForm.instagram}
                        onChange={(e) => setRegForm({ ...regForm, instagram: e.target.value })}
                        placeholder="@username"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-stone-700 block">حساب تيك توك (اختياري)</label>
                      <input
                        type="text"
                        value={regForm.tiktok}
                        onChange={(e) => setRegForm({ ...regForm, tiktok: e.target.value })}
                        placeholder="@username"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold text-stone-700 block">الموقع الإلكتروني / المتجر</label>
                      <input
                        type="url"
                        value={regForm.website}
                        onChange={(e) => setRegForm({ ...regForm, website: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl p-2.5 text-xs focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
                    <span className="font-bold text-stone-700 block">مراجعة سريعة للبيانات المدخلة:</span>
                    <p className="text-stone-600">
                      <strong>المستفيد:</strong> {regForm.fullName} | <strong>الهوية:</strong> {regForm.nationalId} | <strong>المشروع:</strong> {regForm.projectName} | <strong>النشاط:</strong> {regForm.activityType}
                    </p>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setRegStep(2)}
                      className="px-6 py-2.5 rounded-xl bg-stone-200 text-stone-800 text-xs font-bold cursor-pointer"
                    >
                      السابق
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-2xl bg-[#174F3E] text-white text-xs sm:text-sm font-black shadow-md hover:bg-[#123e31] cursor-pointer flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>حفظ البيانات والانتقال لرفع المستندات</span>
                    </button>
                  </div>
                </div>
              )}

            </form>

          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STAGE 3: المستندات والاتفاقية (Per-Document Status System)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {selectedStageTab === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-stone-200 shadow-xs space-y-8 animate-in fade-in duration-200">
            
            {/* Stage Header */}
            <div className="border-b border-stone-100 pb-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#174F3E] bg-emerald-50 px-3 py-1 rounded-full mb-1">
                <FileText className="w-3.5 h-3.5" />
                <span>{isEn ? 'Stage 3 of 7' : 'المرحلة الثالثة: رفع المستندات والاتفاقية'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                {isEn ? 'Document Verification & Agreement Signing' : 'نظام رفع المستندات والتحقق وتوقيع الاتفاقية'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 font-light">
                {isEn ? 'Upload required certificates with individual document review feedback.' : 'ارفع المستندات المطلوبة؛ حيث تخضع كل وثيقة لمراجعة مستقلة دون الحاجة لإعادة رفع الملفات المقبولة سابقاً.'}
              </p>
            </div>

            {/* Agreement Highlight Card */}
            <div className="p-5 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-black text-[#174F3E] flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4" />
                  <span>اتفاقية برنامج «إرث أجيال» للتمكين والجودة</span>
                </span>
                <p className="text-xs text-stone-600">
                  {profile.agreementAccepted 
                    ? `✓ تم التوقيع والموافقة الرقمية بتوثيق رسمي (${profile.agreementAcceptedAt || 'معتمد'}).`
                    : 'يُرجى قراءة الاتفاقية والموافقة الإلكترونية عليها لإتمام متطلبات المرحلة.'}
                </p>
              </div>

              <button
                onClick={() => setIsAgreementModalOpen(true)}
                className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  profile.agreementAccepted 
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                    : 'bg-[#174F3E] text-white hover:bg-[#123e31]'
                }`}
              >
                {profile.agreementAccepted ? 'عرض الاتفاقية الموقعة' : 'قراءة وتوقيع الاتفاقية ✍️'}
              </button>
            </div>

            {/* Documents Grid with Individual Status Badges */}
            <div className="space-y-4">
              <h3 className="text-xs font-black text-stone-800 uppercase tracking-wider">
                {isEn ? 'Required Document Repository:' : 'قائمة المستندات والوثائق المطلوبة:'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.documents.map(doc => {
                  const isFoodOnly = doc.requiresFoodActivityOnly;
                  const isExempt = isFoodOnly && profile.activityType !== 'culinary';

                  return (
                    <div 
                      key={doc.id}
                      className="p-5 rounded-2xl border border-stone-200 bg-white hover:border-stone-300 transition-all space-y-3 shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <h4 className="text-xs sm:text-sm font-black text-stone-900 flex items-center gap-2">
                            <span>{doc.titleAr}</span>
                            {isExempt && <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">معفى (غير غذائي)</span>}
                          </h4>
                          <p className="text-[11px] text-stone-500">{doc.descriptionAr}</p>
                        </div>

                        {/* Status Chip */}
                        <div className="flex-shrink-0">
                          {doc.status === 'accepted' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                              <Check className="w-3.5 h-3.5" />
                              <span>مقبول ✓</span>
                            </span>
                          )}
                          {doc.status === 'needs_update' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                              <AlertCircle className="w-3.5 h-3.5" />
                              <span>يحتاج تعديل ⚠</span>
                            </span>
                          )}
                          {doc.status === 'rejected' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                              <X className="w-3.5 h-3.5" />
                              <span>مرفوض ✗</span>
                            </span>
                          )}
                          {doc.status === 'pending' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-600">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{doc.fileName ? 'قيد المراجعة' : 'بانتظار الرفع'}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* File Details If Uploaded */}
                      {doc.fileName && (
                        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-xs flex items-center justify-between">
                          <span className="text-stone-700 font-bold truncate max-w-[200px]">
                            📄 {doc.fileName}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            {doc.uploadedAt}
                          </span>
                        </div>
                      )}

                      {/* Admin Feedback Notes */}
                      {doc.adminNotes && (
                        <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-950">
                          <strong>ملاحظة المراجع:</strong> {doc.adminNotes}
                        </div>
                      )}

                      {/* Upload Button */}
                      {!isExempt && doc.type !== 'agreement' && (
                        <div className="pt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleSimulateDocUpload(doc.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-[#174F3E] hover:text-white text-stone-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{doc.fileName ? 'تحديث أو إعادة رفع الملف' : 'رفع المستند (PDF / JPG)'}</span>
                          </button>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stage Footer Navigation */}
            <div className="pt-6 border-t border-stone-100 flex justify-between items-center">
              <button
                onClick={() => setSelectedStageTab(2)}
                className="px-5 py-2.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold cursor-pointer"
              >
                السابق: البيانات
              </button>
              <button
                onClick={() => setSelectedStageTab(4)}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-all cursor-pointer"
              >
                <span>الانتقال للمرحلة 4: القبول بالبرنامج</span>
                {isEn ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STAGE 4: القبول في البرنامج والخطاب الرسمي
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {selectedStageTab === 4 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-stone-200 shadow-xs space-y-8 animate-in fade-in duration-200">
            
            <div className="text-center max-w-2xl mx-auto space-y-3 py-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8 text-[#174F3E]" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-[#C8A96B] block">
                {isEn ? 'STAGE 4: OFFICIAL PROGRAM ADMISSION' : 'المرحلة الرابعة: القبول والالتحاق بالبرنامج'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
                {isEn ? 'Welcome to Erth Ajyal Qualification Program' : 'مبارك! تم قبولك رسمياً في البرنامج التأهيلي'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                {isEn 
                  ? 'Your identity, freelance documentation, and project profile have been approved. You are now officially enrolled in the specialized training workshops.'
                  : 'تمت مراجعة واعتماد ملفك وبياناتك ومستنداتك بنجاح من قبل أمانة المنصة، وأصبحت جاهزاً لبدء الورشة التأهيلية لخدمة ضيوف الرحمن.'}
              </p>
            </div>

            {/* Induction Checklist Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                <span className="font-bold text-[#174F3E] block">1. الورش التدريبية الرقمية</span>
                <p className="text-stone-600">مشاهدة الدروس التعليمية في السلامة الغذائية وبروتوكول الضيافة المكية.</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                <span className="font-bold text-[#174F3E] block">2. تسجيل الحضور الفعلي</span>
                <p className="text-stone-600">تسجيل مدة المشاهدة والتفاعل لضمان احتساب نسبة الإكمال بنجاح.</p>
              </div>
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                <span className="font-bold text-[#174F3E] block">3. التقييم والاجتياز</span>
                <p className="text-stone-600">حل الاختبار التقييمي للحصول فوراً على اعتماد الضمان الذهبي.</p>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100 flex justify-between items-center">
              <button
                onClick={() => setSelectedStageTab(3)}
                className="px-5 py-2.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold cursor-pointer"
              >
                السابق: المستندات
              </button>
              <button
                onClick={() => {
                  setSelectedStageTab(5);
                  setIsLmsPlaying(true);
                }}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-[#174F3E] hover:bg-[#123e31] text-white text-xs sm:text-sm font-black transition-all shadow-md cursor-pointer"
              >
                <GraduationCap className="w-5 h-5 text-amber-300" />
                <span>الدخول إلى الورشة التأهيلية (LMS)</span>
              </button>
            </div>

          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STAGE 5: البرنامج التأهيلي والورشة التدريبية (LMS)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {selectedStageTab === 5 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-stone-200 shadow-xs space-y-8 animate-in fade-in duration-200">
            
            {/* LMS Stage Header with Real-Time Attendance Tracker */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#174F3E] bg-emerald-50 px-3 py-1 rounded-full">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Stage 5 of 7: LMS Workshop' : 'المرحلة الخامسة: الورشة التأهيلية وتسجيل الحضور'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  {isEn ? 'Heritage Hospitality & Quality LMS Workshop' : 'الورشة التأهيلية لمعايير الجودة والضيافة المكية'}
                </h2>
              </div>

              {/* Attendance & Duration Live Monitor */}
              <div className="flex items-center gap-3 bg-stone-100/80 p-3 rounded-2xl border border-stone-200 text-xs">
                <Clock className="w-4 h-4 text-emerald-700" />
                <div>
                  <span className="text-[10px] text-stone-500 block">مدة الحضور المسجلة:</span>
                  <span className="font-mono font-black text-stone-900">
                    {Math.floor(lmsTimerSeconds / 60)} دقيقة و {lmsTimerSeconds % 60} ثانية
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  حضور نشط 🟢
                </span>
              </div>
            </div>

            {/* LMS Player & Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Video & Content Viewer (2 cols) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Simulated High-Res Heritage Training Player */}
                <div className="relative aspect-video bg-stone-900 rounded-3xl overflow-hidden shadow-lg flex flex-col justify-between p-6 text-white border border-stone-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-amber-300">
                      الوحدة {activeModuleIndex + 1}: {INITIAL_TRAINING_MODULES[activeModuleIndex].titleAr}
                    </span>
                    <span className="text-xs font-mono text-stone-300">
                      {INITIAL_TRAINING_MODULES[activeModuleIndex].lessons[activeLessonIndex]?.durationMinutes} دقيقة
                    </span>
                  </div>

                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center mx-auto shadow-xl cursor-pointer hover:scale-105 transition-transform">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black">
                      {INITIAL_TRAINING_MODULES[activeModuleIndex].lessons[activeLessonIndex]?.titleAr}
                    </h3>
                    <p className="text-xs text-stone-300 max-w-md mx-auto line-clamp-2">
                      {INITIAL_TRAINING_MODULES[activeModuleIndex].lessons[activeLessonIndex]?.summaryAr}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span>المدرب: {INITIAL_TRAINING_MODULES[activeModuleIndex].instructorAr}</span>
                    <span>منصة إرث أجيال للتدريب الرقمي</span>
                  </div>
                </div>

                {/* Key Points Checklist */}
                <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
                  <h4 className="text-xs font-black text-stone-900 uppercase tracking-wider">
                    أبرز المحاور والمعايير المكتسبة في هذا الدرس:
                  </h4>
                  <ul className="space-y-2 text-xs text-stone-700">
                    {INITIAL_TRAINING_MODULES[activeModuleIndex].lessons[activeLessonIndex]?.keyPointsAr.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Modules & Materials Sidebar (1 col) */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-stone-800 uppercase tracking-wider">
                  محاور ودروس الورشة التأهيلية:
                </h4>

                <div className="space-y-3">
                  {INITIAL_TRAINING_MODULES.map((mod, mIdx) => (
                    <div 
                      key={mod.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        activeModuleIndex === mIdx ? 'bg-emerald-50/70 border-[#174F3E]' : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <div className="text-xs font-black text-stone-900 mb-1">
                        {mod.titleAr}
                      </div>
                      <p className="text-[11px] text-stone-500 mb-3">{mod.totalDurationMinutes} دقيقة • {mod.instructorAr}</p>

                      <div className="space-y-1.5">
                        {mod.lessons.map((les, lIdx) => {
                          const isCurrentLesson = activeModuleIndex === mIdx && activeLessonIndex === lIdx;
                          return (
                            <button
                              key={les.id}
                              onClick={() => {
                                setActiveModuleIndex(mIdx);
                                setActiveLessonIndex(lIdx);
                              }}
                              className={`w-full text-right p-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                                isCurrentLesson 
                                  ? 'bg-[#174F3E] text-white font-bold' 
                                  : 'bg-white text-stone-700 hover:bg-stone-100'
                              }`}
                            >
                              <span className="truncate">{les.titleAr}</span>
                              <span className="text-[10px] opacity-70">{les.durationMinutes} د</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Downloadable Handbooks */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs">
                  <span className="font-bold text-stone-700 block">الملفات والأدلة التدريبية المعتمدة:</span>
                  <div className="space-y-1.5">
                    {INITIAL_TRAINING_MODULES[0].downloadableMaterials.map((mat, i) => (
                      <a
                        key={i}
                        href={mat.url}
                        onClick={(e) => { e.preventDefault(); alert(`تم بدء تحميل: ${mat.titleAr}`); }}
                        className="flex items-center justify-between p-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 transition-colors text-[11px] text-stone-800"
                      >
                        <span className="truncate">{mat.titleAr}</span>
                        <Download className="w-3.5 h-3.5 text-stone-400" />
                      </a>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* Advance to Stage 6 (Quiz & Evaluation) */}
            <div className="pt-6 border-t border-stone-100 flex justify-between items-center">
              <button
                onClick={() => setSelectedStageTab(4)}
                className="px-5 py-2.5 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold cursor-pointer"
              >
                السابق
              </button>
              <button
                onClick={() => setSelectedStageTab(6)}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-[#174F3E] text-white text-xs sm:text-sm font-black shadow-md hover:bg-[#123e31] cursor-pointer"
              >
                <span>الانتقال لمرحلة التقييم والاختبار التأهيلي</span>
                {isEn ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STAGE 6: التقييم والاجتياز (Evaluation & Quiz)
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {selectedStageTab === 6 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-stone-200 shadow-xs space-y-8 animate-in fade-in duration-200">
            
            <div className="border-b border-stone-100 pb-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-black text-[#174F3E] bg-emerald-50 px-3 py-1 rounded-full mb-1">
                <CheckSquare className="w-3.5 h-3.5" />
                <span>{isEn ? 'Stage 6 of 7: Assessment' : 'المرحلة السادسة: التقييم والاجتياز'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                {isEn ? 'Qualification Assessment & Passing Criteria' : 'الاختبار التقييمي لمعايير الجودة والسلامة والضيافة'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 font-light">
                {isEn ? 'Answer all qualification questions (75%+ score required to unlock Golden Guarantee Certificate).' : 'أجب عن الأسئلة التأهيلية التالية (يُشترط الحصول على نسبة 75% فأعلى لاجتياز البرنامج واعتماد الضمان الذهبي).'}
              </p>
            </div>

            {/* Quiz Questions List */}
            <div className="space-y-6">
              {INITIAL_LMS_QUIZ.map((q, qIndex) => {
                const selectedOption = quizAnswers[q.id];
                return (
                  <div key={q.id} className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                    <h3 className="text-xs sm:text-sm font-black text-stone-900 flex items-start gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#174F3E] text-white flex items-center justify-center text-xs flex-shrink-0">
                        {qIndex + 1}
                      </span>
                      <span>{q.questionAr}</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.optionsAr.map((opt, optIndex) => {
                        const isChosen = selectedOption === optIndex;
                        return (
                          <button
                            key={optIndex}
                            type="button"
                            onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: optIndex })}
                            className={`text-right p-3 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-between ${
                              isChosen 
                                ? 'bg-[#174F3E] text-white border-[#174F3E] shadow-xs' 
                                : 'bg-white text-stone-800 border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <span>{opt}</span>
                            {isChosen && <Check className="w-4 h-4" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit Quiz Action */}
            <div className="bg-stone-100 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-0.5 text-center sm:text-right">
                <span className="text-xs font-bold text-stone-700 block">معيار الاجتياز:</span>
                <p className="text-xs text-stone-500">الحصول على 3 إجابات صحيحة على الأقل من 4 أسئلة (75%+).</p>
              </div>

              <button
                type="button"
                onClick={handleQuizSubmit}
                className="px-8 py-3 rounded-2xl bg-[#174F3E] hover:bg-[#123e31] text-white text-xs sm:text-sm font-black shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Award className="w-5 h-5 text-amber-300" />
                <span>تصحيح الاختبار وإصدار الضمان الذهبي</span>
              </button>
            </div>

            {/* Quiz Result Feedback If Submitted */}
            {quizSubmitted && (
              <div className={`p-6 rounded-2xl border-2 space-y-3 ${
                quizScore >= 75 ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}>
                <div className="flex items-center gap-2 font-black text-sm">
                  {quizScore >= 75 ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-rose-600" />}
                  <span>
                    {quizScore >= 75 
                      ? `تهانينا! تم اجتياز البرنامج التأهيلي بنجاح بنسبة (${quizScore}%).`
                      : `حصلت على نسبة (${quizScore}%). يمكنك إعادة المحاولة لاستيفاء معايير الاجتياز.`}
                  </span>
                </div>

                {quizScore >= 75 && (
                  <button
                    onClick={() => setSelectedStageTab(7)}
                    className="px-6 py-2.5 rounded-xl bg-[#174F3E] text-white text-xs font-bold hover:bg-[#123e31] cursor-pointer"
                  >
                    عرض وتنزيل شهادة الضمان الذهبي 🏅
                  </button>
                )}
              </div>
            )}

          </div>
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            STAGE 7: اعتماد «الضمان الذهبي» والشهادة الإلكترونية
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {selectedStageTab === 7 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-right">
                <div className="inline-flex items-center gap-1.5 text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full mb-1 border border-amber-300">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>{isEn ? 'Stage 7 of 7: Accreditation Issued' : 'المرحلة السابعة: اعتماد وإصدار الضمان الذهبي'}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-stone-900">
                  {isEn ? 'Golden Guarantee Official Accreditation Certificate' : 'شهادة اعتماد «الضمان الذهبي» الرسمية'}
                </h2>
                <p className="text-xs text-stone-500 font-light">
                  {isEn ? 'Official accreditation badge with high-resolution card, QR code verification, and A4 print.' : 'تم توثيق الاعتماد الإلكتروني بنجاح مع إصدار رمز QR للتحقق المباشر وإمكانية الطباعة الرسمية.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsVerifyModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-[#174F3E]" />
                  <span>{isEn ? 'Verify via Registry' : 'فحص السجل العام'}</span>
                </button>
              </div>
            </div>

            {/* Official Digital Certificate Card Render */}
            {activeCertificate ? (
              <GoldenGuaranteeCertificateCard 
                certificate={activeCertificate}
                onVerifyClick={() => setIsVerifyModalOpen(true)}
              />
            ) : (
              <div className="bg-white p-8 rounded-3xl border border-stone-200 text-center space-y-3">
                <Award className="w-12 h-12 text-amber-600 mx-auto" />
                <h3 className="text-base font-black text-stone-900">
                  لم يتم إصدار شهادة الضمان الذهبي بعد
                </h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  يرجى التأكد من اجتياز المراحل السابقة وحل الاختبار التأهيلي ليتم إصدار الشهادة تلقائياً لحسابك.
                </p>
                <button
                  onClick={() => {
                    const cert = issueGoldenGuarantee(profile.id);
                    setActiveCertificate(cert);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#174F3E] text-white text-xs font-bold cursor-pointer"
                >
                  إصدار الشهادة الآن 🏅
                </button>
              </div>
            )}

          </div>
        )}

      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          AGREEMENT VIEW & SIGNING MODAL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {isAgreementModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 border border-stone-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="text-base sm:text-lg font-black text-[#174F3E] flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#174F3E]" />
                <span>اتفاقية التمكين والالتزام بمنظومة «إرث أجيال»</span>
              </h3>
              <button
                onClick={() => setIsAgreementModalOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs text-stone-700 leading-relaxed space-y-3">
              <p className="font-bold text-stone-900">البند الأول: الغرض من الاتفاقية</p>
              <p>تهدف هذه الاتفاقية إلى تنظيم مشاركة الأسر المنتجة والحرفيين في منصة إرث أجيال لتقديم منتجات الضيافة والموروث الثقافي وفق أعلى معايير الجودة والسلامة لضيوف الرحمن.</p>
              
              <p className="font-bold text-stone-900">البند الثاني: التزامات المستفيد (الأسرة / الحرفي)</p>
              <p>• الالتزام بمعايير النظافة والاشتراطات الصحية المعتمدة من الجهات المختصة.<br/>
              • المحافظة على الهوية التراثية الأصيلة للمنتجات.<br/>
              • الالتزام بالمواعيد ومواصفات التغليف الآمن المعتمدة من المنصة.</p>

              <p className="font-bold text-stone-900">البند الثالث: شارة الضمان الذهبي</p>
              <p>تُعد شارة الضمان الذهبي اعتماد جودة داخلي يمنح المنتجات المعتمدة أولوية التوريد والعرض في باقات المنصة ولا تغني عن التراخيص النظامية.</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-stone-500">
                بالنقر على "موافق وتوقيع إلكتروني"، يتم تسجيل موافقتك الصريحة مع الختم الزمني.
              </span>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsAgreementModalOpen(false)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleSignAgreement}
                  className="flex-1 sm:flex-none px-6 py-2 rounded-xl bg-[#174F3E] text-white text-xs font-bold hover:bg-[#123e31] cursor-pointer"
                >
                  موافق وتوقيع إلكتروني ✓
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          PUBLIC VERIFICATION LOOKUP MODAL
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <PublicCertificateVerificationModal 
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
        initialCode={activeCertificate?.accreditationNumber || 'ERG-2026-8842'}
      />

    </div>
  );
};
export default QualificationJourneyPage;
