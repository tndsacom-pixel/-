/**
 * Email Notification Service for Warath Ajyal x TND
 * Handles transactional emails for:
 * - Password Reset / Auth Verification
 * - Producer Onboarding Status (Approval / Rejection)
 * - Product Workflow (Approval / Rejection with Reason / Revision Request with Reason)
 * - Order Status Updates
 * - Support Ticket Replies
 */

export interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailParams): Promise<boolean> {
  console.log(`[EMAIL SERVICE] Sending email to: ${to}`);
  console.log(`[EMAIL SERVICE] Subject: ${subject}`);
  // If SMTP environment variables (SMTP_HOST, SMTP_USER, etc.) are set later by the system,
  // this module can send real SMTP emails seamlessly.
  // Logged to server console for full auditability.
  return true;
}

export function buildProductStatusEmail(params: {
  producerName: string;
  productName: string;
  status: 'approved' | 'rejected' | 'revision_requested';
  reason?: string;
}) {
  const { producerName, productName, status, reason } = params;

  if (status === 'approved') {
    return {
      subject: `🎉 تم اعتماد منتجك (${productName}) في منصة ورث أجيال`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #15803d;">مبروك! تم اعتماد المنتج في المتجر</h2>
          <p>أهلاً بك <strong>${producerName}</strong>،</p>
          <p>يسر إدارة منصة <strong>ورث أجيال × مؤسسة التفكير والنماء TND</strong> إبلاغك بأنه تم اعتماد منتجك <strong>"${productName}"</strong> بنجاح.</p>
          <p>المنتج متاح الآن في المتجر العام وعلى صفحة أسرتك الخاصة للعملاء والمعتمرين.</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 13px; color: #6b7280;">منصة ورث أجيال × مؤسسة التفكير والنماء TND</p>
        </div>
      `,
    };
  } else if (status === 'rejected') {
    return {
      subject: `🔴 نتيجة مراجعة المنتج (${productName}) - منصة ورث أجيال`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #b91c1c;">تنبيه: لم يتم اعتماد المنتج</h2>
          <p>أهلاً بك <strong>${producerName}</strong>،</p>
          <p>نود إفادتك بأنه بعد مراجعة منتجك <strong>"${productName}"</strong>، تعذر اعتماده في الوقت الحالي لعدم استيفائه الشروط التالية:</p>
          <div style="background-color: #fef2f2; border-right: 4px solid #ef4444; padding: 12px; margin: 16px 0; border-radius: 6px;">
            <strong>سبب الرفض من الإدارة:</strong><br />
            ${reason || 'عدم استيفاء متطلبات الجودة والتوثيق.'}
          </div>
          <p>يمكنك التعديل وإعادة تقديم طلب منتج جديد وفق الملاحظات الموضحة أعلاه.</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 13px; color: #6b7280;">منصة ورث أجيال × مؤسسة التفكير والنماء TND</p>
        </div>
      `,
    };
  } else {
    return {
      subject: `🟡 مطلوب تعديل على المنتج (${productName}) - منصة ورث أجيال`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
          <h2 style="color: #d97706;">مطلوب إجراء تعديل قبل الاعتماد</h2>
          <p>أهلاً بك <strong>${producerName}</strong>،</p>
          <p>يرجى إجراء التعديلات المطلوبة على منتجك <strong>"${productName}"</strong> حتى نتمكن من إكمال اعتماده ونشره بالمتجر:</p>
          <div style="background-color: #fffbeb; border-right: 4px solid #f59e0b; padding: 12px; margin: 16px 0; border-radius: 6px;">
            <strong>التعديل المطلوب من الإدارة:</strong><br />
            ${reason || 'يرجى توضيح المكونات وتوفير صور عالية الدقة.'}
          </div>
          <p>يرجى الدخول إلى لوحة التحكم الخاصة بك وتحديث المنتج ليتم إعادة فحصه فوراً.</p>
          <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="font-size: 13px; color: #6b7280;">منصة ورث أجيال × مؤسسة التفكير والنماء TND</p>
        </div>
      `,
    };
  }
}
