import { db } from '../db/index.ts';
import { auditLogs, notifications } from '../db/schema.ts';

export async function logAuditAction(params: {
  userId?: number;
  userEmail?: string;
  action: string;
  targetType: string;
  targetId?: string;
  details?: Record<string, any>;
}) {
  try {
    await db.insert(auditLogs).values({
      userId: params.userId,
      userEmail: params.userEmail,
      action: params.action,
      targetType: params.targetType,
      targetId: params.targetId,
      details: params.details || {},
    });
  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
}

export async function createUserNotification(params: {
  userId: number;
  title: string;
  message: string;
  link?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}) {
  try {
    await db.insert(notifications).values({
      userId: params.userId,
      title: params.title,
      message: params.message,
      link: params.link,
      type: params.type || 'info',
    });
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
}
