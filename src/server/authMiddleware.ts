import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db/index.ts';
import { users } from '../db/schema.ts';
import { eq } from 'drizzle-orm';

const JWT_SECRET = process.env.JWT_SECRET || 'warath-ajyal-tnd-secure-secret-2026';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    name: string;
    role: string;
    uid?: string | null;
  };
}

export function generateToken(payload: { id: number; email: string; role: string; name: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'غير مصرح: توكن الجلسة مفقود' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string; name: string };
    
    // Verify user still exists in DB
    const [userRecord] = await db.select().from(users).where(eq(users.id, decoded.id));
    if (!userRecord) {
      return res.status(401).json({ error: 'حساب المستخدم غير موجود' });
    }

    req.user = {
      id: userRecord.id,
      email: userRecord.email,
      name: userRecord.name,
      role: userRecord.role,
      uid: userRecord.uid,
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'توكن غير صالح أو انتهت صلاحيته' });
  }
}

export function requireRole(...allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'غير مصرح: يرجى تسجيل الدخول أولاً' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'غير مصرح: ليس لديك الصلاحيات الكافية للوصول لهذا المورد' });
    }
    next();
  };
}
