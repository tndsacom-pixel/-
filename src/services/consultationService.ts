import { addProgramNotification } from './goldenGuaranteeService';

export interface ConsultationRequest {
  id: string; // e.g. "CNS-849201"
  userId?: string;
  clientName: string;
  clientPhone: string;
  consultationType: 'financial' | 'culinary' | 'marketing' | 'governance';
  consultationTypeLabel: string;
  sessionFormat: 'zoom' | 'phone' | 'presence';
  sessionFormatLabel: string;
  bookingDate: string;
  bookingTime: string;
  durationMinutes: number; // 60 min (1 hour)
  isFreeSession: boolean; // true if free (1st hour), false if paid (1000 SAR)
  feeAmount: number; // 0 for first session, 1000 SAR for extra
  paymentStatus: 'free_granted' | 'paid' | 'pay_on_session';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  bookingNotes?: string;
  adminNotes?: string;
  consultantName: string;
  createdAt: string;
  completedAt?: string;
}

const STORAGE_KEY = 'erth_consultation_requests_v1';

const INITIAL_REQUESTS: ConsultationRequest[] = [
  {
    id: 'CNS-492018',
    userId: 'user_om_ahmed',
    clientName: 'أم أحمد - مطبخ العريكة والكبسة المكية',
    clientPhone: '0501234567',
    consultationType: 'culinary',
    consultationTypeLabel: 'استشارة جودة واشتراطات الطهي التراثي وسلامة الغذاء',
    sessionFormat: 'zoom',
    sessionFormatLabel: 'عبر زووم (عن بُعد)',
    bookingDate: '2026-08-25',
    bookingTime: '10:00 ص',
    durationMinutes: 60,
    isFreeSession: true,
    feeAmount: 0,
    paymentStatus: 'free_granted',
    status: 'pending',
    bookingNotes: 'أريد مراجعة طرق التغليف الحراري المطابقة لمعايير هيئة الغذاء والدواء لوجبات المعتمرين.',
    consultantName: 'م. سارة البارقي - مستشارة سلامة الغذاء والتغذية',
    createdAt: '2026-08-20T09:30:00.000Z'
  },
  {
    id: 'CNS-783912',
    userId: 'user_sado_craft',
    clientName: 'أبو صالح - حرفي سدو وخوص تراثي',
    clientPhone: '0559876543',
    consultationType: 'financial',
    consultationTypeLabel: 'استشارة التمويل والجدوى الاقتصادية والتسعير',
    sessionFormat: 'presence',
    sessionFormatLabel: 'حضورياً بمقر التفكير والنماء',
    bookingDate: '2026-08-23',
    bookingTime: '01:00 م',
    durationMinutes: 60,
    isFreeSession: true,
    feeAmount: 0,
    paymentStatus: 'free_granted',
    status: 'completed',
    bookingNotes: 'تحديد تكلفة الخامات وحساب نقطة التعادل لهدايا السدو التذكارية للفنادق.',
    adminNotes: 'تمت الاستشارة بنجاح، وتم تسليم دراسة تسعيرية ونموذج الملاءة المالية بدون كفيل.',
    consultantName: 'د. أحمد السليمان - خبير التمكين المالي ودراسات الجدوى',
    createdAt: '2026-08-18T14:15:00.000Z',
    completedAt: '2026-08-21T11:00:00.000Z'
  },
  {
    id: 'CNS-902143',
    userId: 'user_sado_craft',
    clientName: 'أبو صالح - حرفي سدو وخوص تراثي',
    clientPhone: '0559876543',
    consultationType: 'marketing',
    consultationTypeLabel: 'استشارة التسويق المتقدم واستهداف الفنادق الكبرى',
    sessionFormat: 'phone',
    sessionFormatLabel: 'مكالمة هاتفية استشارية',
    bookingDate: '2026-08-26',
    bookingTime: '04:00 م',
    durationMinutes: 60,
    isFreeSession: false,
    feeAmount: 1000,
    paymentStatus: 'paid',
    status: 'pending',
    bookingNotes: 'جلسة إضافية متقدمة لتوقيع عقود توريد هدايا تذكارية مع 3 فنادق في المنطقة المركزية.',
    consultantName: 'أ. ماجد الحربي - مستشار التسويق وتطوير الأعمال',
    createdAt: '2026-08-21T16:00:00.000Z'
  }
];

export const getConsultationRequests = (): ConsultationRequest[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
      return INITIAL_REQUESTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_REQUESTS;
  }
};

export const saveConsultationRequests = (requests: ConsultationRequest[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    window.dispatchEvent(new CustomEvent('warath_consultations_updated'));
  } catch (e) {
    console.error('Error saving consultation requests:', e);
  }
};

/**
 * Checks if a productive family / user / phone number has already used their free 1-hour consultation.
 */
export const hasUsedFreeConsultation = (phoneOrUserId: string): boolean => {
  if (!phoneOrUserId || !phoneOrUserId.trim()) return false;
  const cleanKey = phoneOrUserId.trim().toLowerCase();
  const requests = getConsultationRequests();
  return requests.some(r => {
    const phoneMatch = r.clientPhone && r.clientPhone.replace(/\s+/g, '') === cleanKey.replace(/\s+/g, '');
    const userMatch = r.userId && r.userId.toLowerCase() === cleanKey;
    // Considered used if they booked a free session (whether completed or pending/confirmed)
    return (phoneMatch || userMatch) && r.isFreeSession;
  });
};

/**
 * Retrieves all consultation requests for a specific phone number or user ID.
 */
export const getConsultationsByPhoneOrUser = (phoneOrUserId: string): ConsultationRequest[] => {
  if (!phoneOrUserId || !phoneOrUserId.trim()) return [];
  const cleanKey = phoneOrUserId.trim().toLowerCase();
  const requests = getConsultationRequests();
  return requests.filter(r => {
    const phoneMatch = r.clientPhone && r.clientPhone.replace(/\s+/g, '') === cleanKey.replace(/\s+/g, '');
    const userMatch = r.userId && r.userId.toLowerCase() === cleanKey;
    return phoneMatch || userMatch;
  });
};

/**
 * Creates a new consultation request. Automatically decides if it's free (1 hour) or paid (1,000 SAR / hour).
 */
export const createConsultationRequest = (
  payload: Omit<ConsultationRequest, 'id' | 'createdAt' | 'status' | 'durationMinutes' | 'isFreeSession' | 'feeAmount'> & {
    forcePaid?: boolean;
    paymentMethod?: string;
  }
): ConsultationRequest => {
  const requests = getConsultationRequests();
  const identifier = payload.userId || payload.clientPhone;
  const alreadyUsedFree = hasUsedFreeConsultation(identifier);

  const isFree = !alreadyUsedFree && !payload.forcePaid;
  const fee = isFree ? 0 : 1000;

  const newRequest: ConsultationRequest = {
    ...payload,
    id: `CNS-${Math.floor(100000 + Math.random() * 900000)}`,
    durationMinutes: 60, // Exact 1 hour
    isFreeSession: isFree,
    feeAmount: fee,
    paymentStatus: isFree ? 'free_granted' : 'paid',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  const updated = [newRequest, ...requests];
  saveConsultationRequests(updated);

  // Send program notification if user is known
  if (newRequest.userId) {
    addProgramNotification({
      userId: newRequest.userId,
      titleAr: isFree ? '📅 تم حجز استشارتكم المجانية (1 ساعة)' : '💳 تم حجز استشارتكم المتقدمة (1000 ر.س / ساعة)',
      titleEn: isFree ? 'Free Consultation Booked (1 Hour)' : 'Advanced Consultation Booked (1000 SAR/hr)',
      bodyAr: `تم تسجيل طلب الجلسة الاستشارية برقم ${newRequest.id} بتاريخ ${newRequest.bookingDate} الساعة ${newRequest.bookingTime}.`,
      bodyEn: `Your consultation ${newRequest.id} is confirmed for ${newRequest.bookingDate} at ${newRequest.bookingTime}.`,
      type: 'appointment',
      isRead: false,
      actionUrl: '#/consulting'
    });
  }

  return newRequest;
};

/**
 * Admin action: Complete consultation and mark as done.
 * Triggers notification to the family with: "تم استشارتكم المجانية بنجاح" or "تمت استشارتكم بنجاح".
 */
export const adminCompleteConsultationRequest = (
  id: string,
  adminNotes: string = 'تمت الجلسة الاستشارية وتقديم التوصيات المهنية بنجاح.'
): ConsultationRequest | null => {
  const requests = getConsultationRequests();
  const index = requests.findIndex(r => r.id === id);
  if (index === -1) return null;

  const req = requests[index];
  req.status = 'completed';
  req.adminNotes = adminNotes;
  req.completedAt = new Date().toISOString();

  requests[index] = req;
  saveConsultationRequests(requests);

  // Notify the user specifically
  const successTitleAr = req.isFreeSession 
    ? '✅ تم استشارتكم المجانية بنجاح'
    : '✅ تم إنهاء جلستكم الاستشارية بنجاح';
  
  const successBodyAr = req.isFreeSession
    ? `تمت استشارتكم المجانية (لمدة ساعة واحدة) بنجاح مع المستشار ${req.consultantName}. ملاحظات المستشار: ${adminNotes}`
    : `تمت جلستكم الاستشارية بنجاح مع المستشار ${req.consultantName}. ملاحظات المستشار: ${adminNotes}`;

  if (req.userId) {
    addProgramNotification({
      userId: req.userId,
      titleAr: successTitleAr,
      titleEn: 'Consultation Completed Successfully',
      bodyAr: successBodyAr,
      bodyEn: `Your consultation with ${req.consultantName} has been completed. Notes: ${adminNotes}`,
      type: 'appointment',
      isRead: false,
      actionUrl: '#/consulting'
    });
  }

  // Also broadcast custom event for live UI feedback across tabs/components
  window.dispatchEvent(new CustomEvent('warath_consultation_completed', { 
    detail: { 
      consultation: req, 
      isFree: req.isFreeSession,
      clientName: req.clientName,
      clientPhone: req.clientPhone
    } 
  }));

  return req;
};

/**
 * Admin action: Cancel consultation.
 */
export const adminCancelConsultationRequest = (id: string): boolean => {
  const requests = getConsultationRequests();
  const filtered = requests.map(r => r.id === id ? { ...r, status: 'cancelled' as const } : r);
  saveConsultationRequests(filtered);
  return true;
};
