export type JourneyStageNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type DocumentType = 
  | 'national_id' 
  | 'freelance_license' 
  | 'health_cert' 
  | 'bank_iban' 
  | 'national_address' 
  | 'agreement';

export type DocumentReviewStatus = 'pending' | 'accepted' | 'rejected' | 'needs_update';

export interface DocumentItem {
  id: string;
  type: DocumentType;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  isRequired: boolean;
  requiresFoodActivityOnly?: boolean;
  fileName?: string;
  fileUrl?: string;
  fileSize?: string;
  uploadedAt?: string;
  status: DocumentReviewStatus;
  adminNotes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export type ApplicationOverallStatus = 
  | 'draft' 
  | 'submitted' 
  | 'under_review' 
  | 'needs_completion' 
  | 'needs_amendment' 
  | 'accepted' 
  | 'rejected' 
  | 'completed';

export type ActivityType = 'culinary' | 'crafts' | 'hospitality' | 'home_products';

export interface AppointmentSlot {
  id: string;
  date: string; // YYYY-MM-DD
  dayNameAr: string;
  dayNameEn: string;
  timeSlot: string; // e.g. "10:00 AM - 10:45 AM"
  timeSlotAr: string;
  timeSlotEn: string;
  type: 'virtual' | 'in_person';
  locationAr?: string;
  locationEn?: string;
  available: boolean;
  maxCapacity: number;
  bookedCount: number;
  consultantNameAr: string;
  consultantNameEn: string;
}

export interface AppointmentBooking {
  id: string;
  userId: string;
  slotId: string;
  date: string;
  timeSlotAr: string;
  timeSlotEn: string;
  type: 'virtual' | 'in_person';
  locationAr?: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  projectName: string;
  activityType: ActivityType;
  status: 'confirmed' | 'rescheduled' | 'cancelled' | 'attended' | 'no_show';
  meetingLink?: string;
  consultationNotes?: string;
  consultationStatus?: 'passed_ready' | 'needs_prep' | 'rescheduled';
  createdAt: string;
  attendedAt?: string;
}

export interface ApplicantProfile {
  id: string;
  userId: string;
  fullName: string;
  nationalId: string;
  phone: string;
  email: string;
  nationality: 'SA' | string;
  isSaudi: boolean;
  activityType: ActivityType;
  projectName: string;
  city: string;
  bio?: string;
  
  // Bank & Financials
  bankName?: string;
  iban?: string;
  
  // National Address
  nationalAddress?: string;
  shortAddress?: string;
  
  // Socials
  socialLinks?: {
    instagram?: string;
    tiktok?: string;
    twitter?: string;
    website?: string;
  };
  
  // Agreement
  agreementAccepted: boolean;
  agreementAcceptedAt?: string;
  agreementVersion?: string;

  // Documents
  documents: DocumentItem[];

  // Journey Progress
  currentStageNumber: JourneyStageNumber;
  overallStatus: ApplicationOverallStatus;
  stageProgress: {
    stage1_session: boolean;
    stage2_registration: boolean;
    stage3_documents: boolean;
    stage4_admission: boolean;
    stage5_workshop: boolean;
    stage6_evaluation: boolean;
    stage7_guarantee: boolean;
  };

  // Appointment Link
  activeBookingId?: string;

  // LMS Record
  lmsProgressPercent: number;
  lmsAttendanceDurationSeconds: number;
  lmsEntryTime?: string;
  lmsExitTime?: string;
  lmsCompleted: boolean;
  lmsQuizScore?: number;
  lmsQuizPassed?: boolean;

  // Evaluation Record
  evaluationScore?: number;
  evaluationNotes?: string;
  evaluatedAt?: string;
  evaluatedBy?: string;

  // Golden Guarantee Certificate Link
  accreditationId?: string;

  createdAt: string;
  updatedAt: string;
}

export interface TrainingLesson {
  id: string;
  titleAr: string;
  titleEn: string;
  durationMinutes: number;
  summaryAr: string;
  summaryEn: string;
  videoEmbedUrl?: string;
  keyPointsAr: string[];
  keyPointsEn: string[];
}

export interface TrainingModule {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  totalDurationMinutes: number;
  instructorAr: string;
  instructorEn: string;
  instructorTitleAr: string;
  instructorTitleEn: string;
  lessons: TrainingLesson[];
  downloadableMaterials: {
    titleAr: string;
    titleEn: string;
    size: string;
    fileType: string;
    url: string;
  }[];
}

export interface LMSQuizQuestion {
  id: string;
  questionAr: string;
  questionEn: string;
  optionsAr: string[];
  optionsEn: string[];
  correctOptionIndex: number;
  explanationAr: string;
  explanationEn: string;
}

export type AccreditationStatus = 'active' | 'expired' | 'suspended' | 'revoked';

export interface GoldenGuaranteeCertificate {
  id: string;
  accreditationNumber: string; // e.g. ERG-2026-8942
  userId: string;
  applicantName: string;
  projectName: string;
  activityType: ActivityType;
  activityLabelAr: string;
  activityLabelEn: string;
  issueDate: string; // e.g. 2026-08-19
  issueDateHijri?: string;
  expiryDate?: string;
  status: AccreditationStatus;
  qrVerificationUrl: string;
  issuedByAr: string;
  issuedByEn: string;
  qualityBadgeTier: 'gold' | 'platinum';
  standardsPassed: string[];
  officialDisclaimerAr: string;
  officialDisclaimerEn: string;
  notes?: string;
  revokedReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProgramNotification {
  id: string;
  userId: string;
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
  type: 'appointment' | 'document' | 'admission' | 'lms' | 'evaluation' | 'accreditation' | 'system';
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}
