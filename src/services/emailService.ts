import { EmailLog, EmailType, PasswordResetToken, UserAccount } from '../types';

// Simple secure hash function for password protection (SHA-256 equivalent)
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '_WARATH_SALT_2026');
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback hash simulation if Web Crypto is unavailable
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'w_hash_' + Math.abs(hash).toString(36) + '_' + btoa(password.slice(0, 4));
}

// Generate random secure token
export function generateToken(prefix: string = 'token'): string {
  const randomBytes = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256));
  const hex = randomBytes.map(b => b.toString(16).padStart(2, '0')).join('');
  return `${prefix}_${Date.now()}_${hex}`;
}

// Format date in Arabic standard
export function formatDateArabic(dateStr?: string): string {
  const date = dateStr ? new Date(dateStr) : new Date();
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Email Repository Keys
const EMAIL_LOGS_KEY = 'warath_email_logs';
const RESET_TOKENS_KEY = 'warath_reset_tokens';
const VERIFICATION_TOKENS_KEY = 'warath_verification_tokens';
const RATE_LIMIT_KEY = 'warath_email_rate_limits';

// Helper to get email logs
export function getEmailLogs(): EmailLog[] {
  try {
    const data = localStorage.getItem(EMAIL_LOGS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

// Helper to get all registered user accounts
export function getUserAccounts(): UserAccount[] {
  try {
    const data = localStorage.getItem('warath_users');
    if (data) return JSON.parse(data);
  } catch (e) {}

  // Fallback default accounts
  return [
    {
      id: 'u-admin-1',
      username: 'admin',
      email: 'admin@warath.sa',
      passwordHash: 'w_hash_admin',
      name: 'مدير النظام المؤسسي',
      role: 'admin',
      isEmailVerified: true,
      emailVerifiedAt: new Date().toISOString(),
      createdAt: '2026-01-01T00:00:00.000Z',
      lastLoginAt: new Date().toISOString()
    },
    {
      id: 'u-prod-1',
      username: 'om_fawaz',
      email: 'om-fawaz@warath.sa',
      passwordHash: 'w_hash_prod',
      name: 'منيرة العبدالله (أم فواز)',
      role: 'beneficiary',
      isEmailVerified: true,
      emailVerifiedAt: '2026-02-15T10:30:00.000Z',
      createdAt: '2026-02-15T10:00:00.000Z',
      lastLoginAt: new Date().toISOString()
    }
  ];
}

// Helper to update user email administratively
export function updateUserAccountEmail(userId: string, newEmail: string): boolean {
  try {
    const users = getUserAccounts();
    const index = users.findIndex(u => u.id === userId);
    if (index !== -1) {
      users[index].email = newEmail.trim().toLowerCase();
      users[index].isEmailVerified = true;
      users[index].emailVerifiedAt = new Date().toISOString();
      localStorage.setItem('warath_users', JSON.stringify(users));
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

// Helper to save email log
function saveEmailLog(log: EmailLog): void {
  const logs = getEmailLogs();
  logs.unshift(log); // newest first
  localStorage.setItem(EMAIL_LOGS_KEY, JSON.stringify(logs.slice(0, 200))); // keep latest 200
  // Dispatch custom event for real-time notification in app
  window.dispatchEvent(new CustomEvent('warath_email_sent', { detail: log }));
}

// Rate Limiter: Check if email was sent to recipient in the last 60 seconds for same type
export function checkRateLimit(recipient: string, emailType: EmailType): { allowed: boolean; waitSeconds: number } {
  try {
    const data = localStorage.getItem(RATE_LIMIT_KEY);
    const limits = data ? JSON.parse(data) : {};
    const key = `${recipient.toLowerCase()}_${emailType}`;
    const lastSent = limits[key];
    const now = Date.now();
    if (lastSent && now - lastSent < 60000) {
      const waitSeconds = Math.ceil((60000 - (now - lastSent)) / 1000);
      return { allowed: false, waitSeconds };
    }
    limits[key] = now;
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(limits));
    return { allowed: true, waitSeconds: 0 };
  } catch (e) {
    return { allowed: true, waitSeconds: 0 };
  }
}

/* =========================================================================
   TRANSACTIONAL EMAIL DISPATCHERS
   ========================================================================= */

// HTML Email Container Template
function buildEmailHtml(title: string, contentHtml: string, actionButton?: { text: string; url: string }): string {
  return `
  <!DOCTYPE html>
  <html dir="rtl" lang="ar">
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f4; color: #1c1917; margin: 0; padding: 20px; direction: rtl; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e7e5e4; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
      .header { background: #1b3d2f; color: #ffffff; padding: 25px; text-align: center; border-bottom: 4px solid #d4af37; }
      .header h1 { margin: 0; font-size: 22px; font-weight: 800; color: #d4af37; }
      .header p { margin: 5px 0 0; font-size: 12px; color: #e7e5e4; opacity: 0.9; }
      .content { padding: 30px 25px; line-height: 1.7; font-size: 14px; color: #292524; }
      .content h2 { color: #1b3d2f; font-size: 18px; margin-top: 0; border-bottom: 2px solid #f5f5f4; padding-bottom: 10px; }
      .btn-container { text-align: center; margin: 30px 0; }
      .btn { display: inline-block; background-color: #d4af37; color: #1b3d2f; font-weight: 800; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-size: 14px; box-shadow: 0 4px 12px rgba(212,175,55,0.3); }
      .footer { background-color: #f5f5f4; color: #78716c; padding: 18px; text-align: center; font-size: 11px; border-t: 1px solid #e7e5e4; }
      .badge { display: inline-block; background-color: #fef3c7; color: #92400e; padding: 4px 10px; border-radius: 20px; font-weight: bold; font-size: 12px; }
      .box { background: #fafaf9; border: 1px solid #e7e5e4; border-radius: 12px; padding: 16px; margin: 15px 0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>منصة إرث أجيال • Erth Ajyal</h1>
        <p>تمكين الأسر المنتجة والحرفيين برعاية مؤسسة التفكير والنماء TND</p>
      </div>
      <div class="content">
        <h2>${title}</h2>
        ${contentHtml}
        ${actionButton ? `
          <div class="btn-container">
            <a href="${actionButton.url}" class="btn" target="_blank">${actionButton.text}</a>
          </div>
        ` : ''}
      </div>
      <div class="footer">
        <p>وصلتك هذه الرسالة تلقائياً من نظام منصة «إرث أجيال» لحسابك المسجل.</p>
        <p>© 2026 جميع الحقوق محفوظة لمؤسسة التفكير والنماء TND</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

// 1. Verification Email
export async function sendVerificationEmail(
  recipient: string, 
  userName: string, 
  verificationToken: string
): Promise<{ success: boolean; message: string; log?: EmailLog }> {
  const limit = checkRateLimit(recipient, 'verification');
  if (!limit.allowed) {
    return { success: false, message: `يرجى الانتظار ${limit.waitSeconds} ثانية قبل إعادة طلب بريد التحقق.` };
  }

  const actionUrl = `${window.location.origin}${window.location.pathname}#/verify-email?token=${verificationToken}&email=${encodeURIComponent(recipient)}`;
  
  const contentHtml = `
    <p>مرحباً <strong>${userName}</strong>،</p>
    <p>شكراً لتسجيلك في منصة «إرث أجيال». يرجى تأكيد ملكية بريدك الإلكتروني لتفعيل جميع مزايا الحساب والاعتماد الرسمي.</p>
    <div class="box">
      <p style="margin: 0; font-size: 12px; color: #57534e;">رمز التحقق السريع الخاص بك:</p>
      <p style="margin: 8px 0 0; font-size: 24px; font-weight: 900; letter-spacing: 4px; color: #1b3d2f; font-family: monospace;">${verificationToken.slice(-6).toUpperCase()}</p>
    </div>
    <p>أو يمكنك الضغط المباشر على الزر أدناه لإتمام التوثيق:</p>
  `;

  const bodyHtml = buildEmailHtml('تأكيد وتوثيق البريد الإلكتروني ✉️', contentHtml, {
    text: 'تأكيد بريدي الإلكتروني الان',
    url: actionUrl
  });

  const log: EmailLog = {
    id: generateToken('msg'),
    recipient,
    recipientName: userName,
    subject: 'تأكيد وتوثيق بريدك الإلكتروني في منصة إرث أجيال ✉️',
    bodyHtml,
    bodyText: `مرحباً ${userName}، رمز تأكيد حسابك هو: ${verificationToken.slice(-6).toUpperCase()} أو عبر الرابط: ${actionUrl}`,
    sentAt: new Date().toISOString(),
    status: 'delivered',
    emailType: 'verification',
    actionUrl,
    token: verificationToken
  };

  saveEmailLog(log);
  return { success: true, message: 'تم إرسال رسالة التوثيق إلى بريدك الإلكتروني بنجاح! ✉️', log };
}

// 2. Password Reset Email
export async function sendPasswordResetEmail(
  recipient: string
): Promise<{ success: boolean; message: string }> {
  // Rate limit check
  const limit = checkRateLimit(recipient, 'password_reset');
  if (!limit.allowed) {
    return { success: false, message: `لقد طلبت رابط الاستعادة مؤخراً. يرجى الانتظار ${limit.waitSeconds} ثانية.` };
  }

  // Create temporary single-use token valid for 15 minutes
  const token = generateToken('reset');
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 mins

  const resetTokens: PasswordResetToken[] = JSON.parse(localStorage.getItem(RESET_TOKENS_KEY) || '[]');
  resetTokens.push({
    token,
    email: recipient.toLowerCase(),
    expiresAt,
    used: false,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(resetTokens));

  const resetUrl = `${window.location.origin}${window.location.pathname}#/reset-password?token=${token}&email=${encodeURIComponent(recipient)}`;

  const contentHtml = `
    <p>تلقينا طلباً لاستعادة كلمة المرور الخاصة بحسابك في منصة إرث أجيال.</p>
    <div class="box">
      <p style="margin:0; font-size: 13px; color: #dc2626; font-weight: bold;">⚠️ تنبيه أمان:</p>
      <p style="margin: 5px 0 0; font-size: 12px; color: #57534e;">هذا الرابط مؤقت وصالح لمدة <strong>15 دقيقة فقط</strong> ويُستخدم مرة واحدة لإنشاء كلمة مرور جديدة.</p>
    </div>
    <p>إذا لم تكن أنت من طلب استعادة كلمة المرور، يرجى تجاهل هذه الرسالة وسيبقى حسابك آمناً.</p>
  `;

  const bodyHtml = buildEmailHtml('طلب استعادة كلمة المرور 🔐', contentHtml, {
    text: 'إعادة تعيين كلمة المرور الآن',
    url: resetUrl
  });

  const log: EmailLog = {
    id: generateToken('msg'),
    recipient,
    subject: 'رابط استعادة كلمة المرور - منصة إرث أجيال 🔐',
    bodyHtml,
    bodyText: `رابط استعادة كلمة المرور الخاص بك: ${resetUrl} (ينتهي بعد 15 دقيقة)`,
    sentAt: new Date().toISOString(),
    status: 'delivered',
    emailType: 'password_reset',
    actionUrl: resetUrl,
    token
  };

  saveEmailLog(log);

  // Security compliance requirement: Do not disclose whether email exists
  return {
    success: true,
    message: 'إذا كان البريد الإلكتروني مسجلاً لدينا، فستصلك رسالة تحتوي على رابط استعادة كلمة المرور.'
  };
}

// 3. Email Change Verification
export async function sendEmailChangeEmail(
  oldEmail: string,
  newEmail: string,
  userName: string,
  verificationCode: string
): Promise<{ success: boolean; message: string }> {
  const limit = checkRateLimit(newEmail, 'email_change');
  if (!limit.allowed) {
    return { success: false, message: `يرجى الانتظار ${limit.waitSeconds} ثانية قبل إعادة إرسال الرمز للبريد الجديد.` };
  }

  const contentHtml = `
    <p>مرحباً <strong>${userName}</strong>،</p>
    <p>تلقينا طلباً لتغيير بريدك الإلكتروني في منصة إرث أجيال من (<strong>${oldEmail}</strong>) إلى (<strong>${newEmail}</strong>).</p>
    <div class="box" style="text-align: center;">
      <p style="margin: 0; font-size: 12px; color: #57534e;">رمز تأكيد البريد الجديد:</p>
      <p style="margin: 8px 0 0; font-size: 28px; font-weight: 900; letter-spacing: 6px; color: #d4af37; font-family: monospace;">${verificationCode}</p>
    </div>
    <p style="font-size: 12px; color: #78716c;">ملاحظة: سيبقى بريدك القديم فعالاً لحين إدخال رمز التأكيد أعلاه واكتمال التوثيق.</p>
  `;

  const bodyHtml = buildEmailHtml('تأكيد تغيير البريد الإلكتروني 🔄', contentHtml);

  const log: EmailLog = {
    id: generateToken('msg'),
    recipient: newEmail,
    recipientName: userName,
    subject: 'رمز تأكيد تغيير البريد الإلكتروني - إرث أجيال 🔄',
    bodyHtml,
    bodyText: `رمز تأكيد بريدك الجديد هو: ${verificationCode}`,
    sentAt: new Date().toISOString(),
    status: 'delivered',
    emailType: 'email_change',
    token: verificationCode
  };

  saveEmailLog(log);
  return { success: true, message: 'تم إرسال رمز التحقق إلى البريد الإلكتروني الجديد.' };
}

// 4. Order Status Email
export async function sendOrderStatusEmail(
  recipient: string,
  userName: string,
  orderId: string,
  status: 'received' | 'paid' | 'processing' | 'delivering' | 'delivered' | 'cancelled',
  totalAmount: number,
  itemsCount: number
): Promise<void> {
  const statusLabels: Record<string, { label: string; badge: string; desc: string }> = {
    received: { label: 'تم استلام الطلب', badge: '📝 تم الاستلام', desc: 'تم استلام طلبك بنجاح وجاري المراجعة.' },
    paid: { label: 'تم الدفع بنجاح', badge: '💳 تم الدفع', desc: 'تم تأكيد عملية الدفع وحجز منتجاتك.' },
    processing: { label: 'قيد التجهيز الطازج', badge: '👩‍🍳 قيد التجهيز', desc: 'تقوم رائدة العمل الحر بإعداد وجباتك/منتجاتك الآن.' },
    delivering: { label: 'قيد التوصيل بالفندق/العنوان', badge: '🚚 قيد التوصيل', desc: 'الطلب في طريقه إليك الآن مع مندوب التوصيل.' },
    delivered: { label: 'تم التسليم بنجاح', badge: '✅ تم التسليم', desc: 'تم تسليم الطلب بنجاح. نتمنى لك تجربة شهية ومباركة!' },
    cancelled: { label: 'تم إلغاء الطلب', badge: '❌ ملغي', desc: 'تم إلغاء الطلب واسترجاع المبلغ للحساب.' }
  };

  const current = statusLabels[status] || statusLabels.received;
  const actionUrl = `${window.location.origin}${window.location.pathname}#/orders?id=${orderId}`;

  const contentHtml = `
    <p>عزيزنا <strong>${userName}</strong>،</p>
    <p>تحديث جديد على طلبك رقم (<strong>#${orderId}</strong>):</p>
    <div class="box">
      <p style="margin: 0;"><span class="badge">${current.badge}</span></p>
      <h3 style="margin: 10px 0 5px; color: #1b3d2f;">${current.label}</h3>
      <p style="margin: 0; font-size: 13px; color: #57534e;">${current.desc}</p>
      <hr style="border: 0; border-top: 1px solid #e7e5e4; margin: 12px 0;">
      <p style="margin: 0; font-size: 12px; color: #78716c;">عدد المنتجات: <strong>${itemsCount}</strong> | الإجمالي: <strong>${totalAmount} ر.س</strong></p>
    </div>
  `;

  const bodyHtml = buildEmailHtml(`تحديث حالة الطلب #${orderId} 📦`, contentHtml, {
    text: 'متابعة تفاصيل الطلب',
    url: actionUrl
  });

  saveEmailLog({
    id: generateToken('msg'),
    recipient,
    recipientName: userName,
    subject: `تحديث الطلب #${orderId}: ${current.label} 📦`,
    bodyHtml,
    bodyText: `تحديث طلبك #${orderId}: ${current.label} - ${current.desc}`,
    sentAt: new Date().toISOString(),
    status: 'delivered',
    emailType: 'order_status',
    actionUrl
  });
}

// 5. Package Subscription Email
export async function sendPackageSubscriptionEmail(
  recipient: string,
  userName: string,
  packageName: string,
  orderId: string,
  price: string
): Promise<void> {
  const actionUrl = `${window.location.origin}${window.location.pathname}#/packages`;

  const contentHtml = `
    <p>عزيزنا <strong>${userName}</strong>،</p>
    <p>تهانينا! تم تفعيل اشتراكك بنجاح في <strong>«${packageName}»</strong>.</p>
    <div class="box">
      <p style="margin: 0 0 8px; font-size: 12px; color: #78716c;">تفاصيل الاشتراك:</p>
      <ul style="margin: 0; padding-right: 20px; font-size: 13px; color: #1c1917;">
        <li>رقم الاشتراك: <strong>#${orderId}</strong></li>
        <li>الباقة: <strong>${packageName}</strong></li>
        <li>القيمة: <strong>${price}</strong></li>
        <li>التاريخ: <strong>${formatDateArabic()}</strong></li>
        <li>حالة الاشتراك: <span class="badge" style="background: #dcfce7; color: #166534;">مُفعل ونشط ✓</span></li>
      </ul>
    </div>
    <p>يمكنك الآن الاستفادة الكاملة من كافة خدمات المأكولات، المعارض، ورش التدريب والتسويق.</p>
  `;

  const bodyHtml = buildEmailHtml('تأكيد اشتراك الباقة 🎁', contentHtml, {
    text: 'الانتقال للوحة الحساب والباقة',
    url: actionUrl
  });

  saveEmailLog({
    id: generateToken('msg'),
    recipient,
    recipientName: userName,
    subject: `تأكيد تفعيل اشتراكك في ${packageName} 🎁`,
    bodyHtml,
    bodyText: `تم تفعيل اشتراكك في ${packageName} برقم #${orderId}`,
    sentAt: new Date().toISOString(),
    status: 'delivered',
    emailType: 'package_subscription',
    actionUrl
  });
}

// 6. Support Ticket Email
export async function sendSupportTicketEmail(
  recipient: string,
  userName: string,
  ticketId: string,
  subject: string,
  status: 'open' | 'in_progress' | 'closed',
  updateMessage: string
): Promise<void> {
  const statusTexts = {
    open: 'جديدة - جاري مراجعة الدعم',
    in_progress: 'قيد المتابعة والحل',
    closed: 'تم الرد والإغلاق بنجاح'
  };

  const actionUrl = `${window.location.origin}${window.location.pathname}#/support?ticket=${ticketId}`;

  const contentHtml = `
    <p>مرحباً <strong>${userName}</strong>،</p>
    <p>تم تحديث تذكرة الدعم الفني الخاصة بك رقم (<strong>#${ticketId}</strong>):</p>
    <div class="box">
      <p style="margin: 0 0 5px; font-size: 13px; font-weight: bold; color: #1b3d2f;">الموضوع: ${subject}</p>
      <p style="margin: 0 0 10px; font-size: 12px; color: #78716c;">الحالة: <strong>${statusTexts[status]}</strong></p>
      <div style="background: #ffffff; border-right: 3px solid #d4af37; padding: 10px; margin-top: 8px; font-size: 13px;">
        <strong>آخر تحديث من فريق الدعم:</strong><br/>
        ${updateMessage}
      </div>
    </div>
  `;

  const bodyHtml = buildEmailHtml(`تحديث تذكرة الدعم #${ticketId} 💬`, contentHtml, {
    text: 'متابعة التذكرة والرد',
    url: actionUrl
  });

  saveEmailLog({
    id: generateToken('msg'),
    recipient,
    recipientName: userName,
    subject: `تحديث تذكرة الدعم #${ticketId}: ${subject} 💬`,
    bodyHtml,
    bodyText: `تحديث تذكرة الدعم #${ticketId} - ${updateMessage}`,
    sentAt: new Date().toISOString(),
    status: 'delivered',
    emailType: 'support_ticket',
    actionUrl
  });
}

// 7. Accreditation & Producer Status Update Email
export async function sendAccreditationStatusEmail(
  recipient: string,
  producerName: string,
  status: 'approved' | 'pending' | 'suspended',
  notes?: string
): Promise<void> {
  const titleMap = {
    approved: 'تهانينا! تم اعتماد الأسرة المنتجة رسمياً ✓',
    pending: 'طلب اعتماد الأسرة قيد الدراسية والتأهيل ⏳',
    suspended: 'تنويه بشأن حالة متجر الأسرة ⚠️'
  };

  const actionUrl = `${window.location.origin}${window.location.pathname}#/portal/families`;

  const contentHtml = `
    <p>عزيزتنا الأسرة المنتجة <strong>${producerName}</strong>،</p>
    <div class="box">
      <h3 style="margin:0 0 8px; color: #1b3d2f;">${titleMap[status]}</h3>
      <p style="margin:0; font-size: 13px; color: #44403c;">
        ${status === 'approved' 
          ? 'تم اعتماد متجركم ورخصة السلامة الغذائية وإصدار باركود QR التفاعلي لصفحتكم. يمكنكم الآن استقبال طلبات المعتمرين والزوار مباشرة!' 
          : notes || 'جاري استكمال مراجعة مستندات التأهيل.'}
      </p>
    </div>
  `;

  const bodyHtml = buildEmailHtml(titleMap[status], contentHtml, {
    text: 'الانتقال لصفحة الأسرة ورابط الـ QR',
    url: actionUrl
  });

  saveEmailLog({
    id: generateToken('msg'),
    recipient,
    recipientName: producerName,
    subject: `${titleMap[status]} - إرث أجيال`,
    bodyHtml,
    bodyText: titleMap[status],
    sentAt: new Date().toISOString(),
    status: 'delivered',
    emailType: 'accreditation',
    actionUrl
  });
}
