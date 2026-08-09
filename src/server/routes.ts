import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db/index.ts';
import {
  users,
  producers,
  products,
  packages,
  packageSubscriptions,
  orders,
  supportTickets,
  reviews,
  notifications,
  auditLogs,
} from '../db/schema.ts';
import { eq, and, sql, desc, or, ilike } from 'drizzle-orm';
import { authenticateToken, requireRole, generateToken, AuthenticatedRequest } from './authMiddleware.ts';
import { logAuditAction, createUserNotification } from './auditService.ts';
import { sendEmail, buildProductStatusEmail } from './emailService.ts';

export const apiRouter = Router();

// ==========================================
// 1. AUTHENTICATION & RBAC
// ==========================================

// Login
apiRouter.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'يرجى إدخال البريد الإلكتروني وكلمة المرور' });
    }

    const [user] = await db.select().from(users).where(eq(users.email, email.trim().toLowerCase()));
    if (!user) {
      return res.status(401).json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    if (!user.passwordHash) {
      return res.status(401).json({ error: 'حساب مسجل عبر المزود الخارجي' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Fetch associated producer details if producer role
    let producerData = null;
    if (user.role === 'producer') {
      const [prod] = await db.select().from(producers).where(eq(producers.userId, user.id));
      producerData = prod || null;
    }

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        producer: producerData,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: 'حدث خطأ في تسجيل الدخول: ' + error.message });
  }
});

// Register
apiRouter.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone, role, familyName, city, specialization } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'يرجى ملء جميع الحقول المطلوبة' });
    }

    const existing = await db.select().from(users).where(eq(users.email, email.trim().toLowerCase()));
    if (existing.length > 0) {
      return res.status(400).json({ error: 'البريد الإلكتروني مسجل بالفعل' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Default role is 'buyer' unless specified as producer, pilgrim, or visitor
    const userRole = ['producer', 'buyer', 'pilgrim', 'visitor'].includes(role) ? role : 'buyer';

    const [newUser] = await db.insert(users).values({
      email: email.trim().toLowerCase(),
      passwordHash,
      name,
      phone: phone || null,
      role: userRole,
      isEmailVerified: true,
    }).returning();

    let producerData = null;
    if (userRole === 'producer') {
      const slug = (familyName || name).trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u0621-\u064A-]/g, '') + '-' + newUser.id;
      const [newProd] = await db.insert(producers).values({
        userId: newUser.id,
        familyName: familyName || name,
        slug,
        city: city || 'مكة المكرمة',
        specialization: specialization || 'منتجات وتراث سعودي',
        verificationStatus: 'pending',
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://warath.sa/producer/${slug}`,
      }).returning();
      producerData = newProd;

      await logAuditAction({
        userId: newUser.id,
        userEmail: newUser.email,
        action: 'PRODUCER_REGISTERED',
        targetType: 'PRODUCER',
        targetId: newProd.id.toString(),
        details: { familyName: newProd.familyName, city: newProd.city },
      });
    }

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    res.json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        phone: newUser.phone,
        avatarUrl: newUser.avatarUrl,
        producer: producerData,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: 'حدث خطأ أثناء إنشاء الحساب: ' + error.message });
  }
});

// Current User Details
apiRouter.get('/auth/me', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (!user) {
      return res.status(404).json({ error: 'المستخدم غير موجود' });
    }

    let producerData = null;
    if (user.role === 'producer') {
      const [prod] = await db.select().from(producers).where(eq(producers.userId, user.id));
      producerData = prod || null;
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      producer: producerData,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Forgot Password Request
apiRouter.post('/auth/forgot-password', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'يرجى إدخال البريد الإلكتروني' });

    const [user] = await db.select().from(users).where(eq(users.email, email.trim().toLowerCase()));
    if (user) {
      await sendEmail({
        to: user.email,
        subject: 'إعادة تعيين كلمة المرور - منصة ورث أجيال',
        html: `<p>عزيزي ${user.name}، اضغط على الرابط التالي لإعادة تعيين كلمة المرور الخاصة بك.</p>`,
      });
    }
    res.json({ message: 'تم إرسال تعليمات إعادة تعيين كلمة المرور إلى بريدك الإلكتروني.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 2. PRODUCER MANAGEMENT & PUBLIC PROFILES
// ==========================================

// Public Producers List
apiRouter.get('/producers', async (req: Request, res: Response) => {
  try {
    const approvedProducers = await db
      .select()
      .from(producers)
      .where(eq(producers.verificationStatus, 'approved'));
    res.json(approvedProducers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get Public Producer Profile by Slug
apiRouter.get('/producers/slug/:slug', async (req: Request, res: Response) => {
  try {
    const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
    const [producer] = await db.select().from(producers).where(eq(producers.slug, slug));
    if (!producer) {
      return res.status(404).json({ error: 'صفحة الأسرة غير موجودة' });
    }

    // Strictly fetch only APPROVED products for the public producer page
    const approvedProducts = await db
      .select()
      .from(products)
      .where(and(eq(products.producerId, producer.id), eq(products.status, 'approved')));

    res.json({
      producer,
      products: approvedProducts,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get My Producer Profile
apiRouter.get('/producers/my', authenticateToken, requireRole('producer', 'admin'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const [producer] = await db.select().from(producers).where(eq(producers.userId, req.user!.id));
    res.json(producer || null);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update My Producer Profile
apiRouter.put('/producers/my', authenticateToken, requireRole('producer', 'admin'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const [producer] = await db.select().from(producers).where(eq(producers.userId, userId));

    const {
      familyName,
      city,
      specialization,
      bio,
      story,
      experienceYears,
      logoUrl,
      bannerUrl,
      phone,
      experiences,
      certifications,
    } = req.body;

    if (!producer) {
      // Create producer profile if missing
      const slug = (familyName || req.user!.name).trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\u0621-\u064A-]/g, '') + '-' + userId;
      const [created] = await db.insert(producers).values({
        userId,
        familyName: familyName || req.user!.name,
        slug,
        city: city || 'مكة المكرمة',
        specialization,
        bio,
        story,
        experienceYears,
        logoUrl,
        bannerUrl,
        phone,
        experiences,
        certifications: certifications || [],
        verificationStatus: 'pending',
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://warath.sa/producer/${slug}`,
      }).returning();
      return res.json(created);
    }

    const [updated] = await db
      .update(producers)
      .set({
        familyName: familyName ?? producer.familyName,
        city: city ?? producer.city,
        specialization: specialization ?? producer.specialization,
        bio: bio ?? producer.bio,
        story: story ?? producer.story,
        experienceYears: experienceYears ?? producer.experienceYears,
        logoUrl: logoUrl ?? producer.logoUrl,
        bannerUrl: bannerUrl ?? producer.bannerUrl,
        phone: phone ?? producer.phone,
        experiences: experiences ?? producer.experiences,
        certifications: certifications ?? producer.certifications,
      })
      .where(eq(producers.id, producer.id))
      .returning();

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Get All Producers
apiRouter.get('/admin/producers', authenticateToken, requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const allProducers = await db.select().from(producers).orderBy(desc(producers.createdAt));
    res.json(allProducers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Approve/Reject Producer
apiRouter.put('/admin/producers/:id/status', authenticateToken, requireRole('admin'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const producerId = parseInt(rawId);
    const { status, notes } = req.body;

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ error: 'حالة اعتماد غير صالحة' });
    }

    const [updated] = await db
      .update(producers)
      .set({ verificationStatus: status })
      .where(eq(producers.id, producerId))
      .returning();

    if (updated && updated.userId) {
      await createUserNotification({
        userId: updated.userId,
        title: status === 'approved' ? 'تهانينا! تم اعتماد ملف الأسرة' : 'تحديث على حالة اعتماد الأسرة',
        message: status === 'approved' 
          ? 'تم اعتماد أسرتك المنتجة بنجاح. يمكنك الآن إضافة المنتجات واستقبال الطلبات.' 
          : `ملاحظة الإدارة: ${notes || 'يرجى استكمال البيانات والوثائق المطلوبة.'}`,
        type: status === 'approved' ? 'success' : 'warning',
      });
    }

    await logAuditAction({
      userId: req.user!.id,
      userEmail: req.user!.email,
      action: status === 'approved' ? 'PRODUCER_APPROVED' : 'PRODUCER_REJECTED',
      targetType: 'PRODUCER',
      targetId: producerId.toString(),
      details: { status, notes, familyName: updated?.familyName },
    });

    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 3. PRODUCTS WORKFLOW (APPROVED / PENDING / REJECTED / REVISION)
// ==========================================

// Public Products (Only Approved)
apiRouter.get('/products', async (req: Request, res: Response) => {
  try {
    const { category, search, producerId } = req.query;

    let query = db.select().from(products).where(eq(products.status, 'approved'));

    const allApproved = await query;
    let filtered = allApproved;

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
    if (producerId) {
      filtered = filtered.filter(p => p.producerId === parseInt(producerId as string));
    }
    if (search) {
      const s = (search as string).toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(s) || (p.description && p.description.toLowerCase().includes(s)));
    }

    res.json(filtered);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Producer: Get My Products (Includes pending, approved, rejected, revision_requested)
apiRouter.get('/products/my', authenticateToken, requireRole('producer', 'admin'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const [producer] = await db.select().from(producers).where(eq(producers.userId, req.user!.id));
    if (!producer) {
      return res.json([]);
    }

    const myProducts = await db
      .select()
      .from(products)
      .where(eq(products.producerId, producer.id))
      .orderBy(desc(products.createdAt));

    res.json(myProducts);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Producer: Add New Product (Strictly set status: 'pending' for Admin review)
apiRouter.post('/products', authenticateToken, requireRole('producer', 'admin'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const [producer] = await db.select().from(producers).where(eq(producers.userId, req.user!.id));
    if (!producer) {
      return res.status(400).json({ error: 'يرجى إنشاء ملف الأسرة المنتجة أولاً' });
    }

    const {
      name,
      description,
      category,
      price,
      stock,
      images,
      ingredients,
      allergens,
      storageMethod,
      expiryDuration,
      documents,
    } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ error: 'يرجى إدخال اسم المنتج، التصنيف، والسعر' });
    }

    // Product is created with status 'pending' (Does NOT appear in public shop until approved by Admin)
    const [newProduct] = await db
      .insert(products)
      .values({
        producerId: producer.id,
        name,
        description,
        category,
        price: price.toString(),
        stock: parseInt(stock || 10),
        images: images || [],
        ingredients,
        allergens,
        storageMethod,
        expiryDuration,
        documents: documents || [],
        status: 'pending',
        sentAt: new Date(),
      })
      .returning();

    await logAuditAction({
      userId: req.user!.id,
      userEmail: req.user!.email,
      action: 'PRODUCT_SUBMITTED_FOR_REVIEW',
      targetType: 'PRODUCT',
      targetId: newProduct.id.toString(),
      details: { productName: newProduct.name, producerName: producer.familyName },
    });

    res.json(newProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Producer: Update Product
apiRouter.put('/products/:id', authenticateToken, requireRole('producer', 'admin'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const productId = parseInt(rawId);
    const [existingProduct] = await db.select().from(products).where(eq(products.id, productId));
    if (!existingProduct) {
      return res.status(404).json({ error: 'المنتج غير موجود' });
    }

    // Reset status to pending if previously revision_requested
    const newStatus = existingProduct.status === 'revision_requested' ? 'pending' : existingProduct.status;

    const [updatedProduct] = await db
      .update(products)
      .set({
        ...req.body,
        status: newStatus,
        sentAt: existingProduct.status === 'revision_requested' ? new Date() : existingProduct.sentAt,
      })
      .where(eq(products.id, productId))
      .returning();

    res.json(updatedProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Get All Products with Review Queue
apiRouter.get('/admin/products', authenticateToken, requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const allProducts = await db
      .select({
        product: products,
        producer: producers,
      })
      .from(products)
      .leftJoin(producers, eq(products.producerId, producers.id))
      .orderBy(desc(products.sentAt));

    const formatted = allProducts.map(item => ({
      ...item.product,
      producerName: item.producer?.familyName || 'أسرة غير محددة',
      producerCity: item.producer?.city || 'مكة المكرمة',
    }));

    res.json(formatted);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Review Product (Approve, Reject, or Request Revision with mandatory reason)
apiRouter.put('/admin/products/:id/review', authenticateToken, requireRole('admin'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const productId = parseInt(rawId);
    const { status, adminNotes } = req.body;

    if (!['approved', 'rejected', 'revision_requested'].includes(status)) {
      return res.status(400).json({ error: 'حالة مراجعة غير صالحة' });
    }

    if ((status === 'rejected' || status === 'revision_requested') && !adminNotes) {
      return res.status(400).json({ error: 'يجب كتابة سبب القرار عند الرفض أو طلب التعديل' });
    }

    const [updatedProduct] = await db
      .update(products)
      .set({
        status,
        adminNotes: adminNotes || null,
      })
      .where(eq(products.id, productId))
      .returning();

    // Fetch producer to notify via Notification + Email
    const [producer] = await db.select().from(producers).where(eq(producers.id, updatedProduct.producerId));
    if (producer && producer.userId) {
      const statusTitle = 
        status === 'approved' ? '🟢 تم اعتماد منتجك' :
        status === 'rejected' ? '🔴 تم رفض طلب المنتج' : '🟡 مطلوب تعديل على المنتج';

      const statusMsg = 
        status === 'approved' ? `تم اعتماد المنتج (${updatedProduct.name}) وهو يظهر الآن في المتجر.` :
        `الملاحظات: ${adminNotes}`;

      await createUserNotification({
        userId: producer.userId,
        title: statusTitle,
        message: statusMsg,
        type: status === 'approved' ? 'success' : 'warning',
        link: '/producer-dashboard',
      });

      // Send Email Notification
      const [producerUser] = await db.select().from(users).where(eq(users.id, producer.userId));
      if (producerUser && producerUser.email) {
        const emailContent = buildProductStatusEmail({
          producerName: producer.familyName,
          productName: updatedProduct.name,
          status,
          reason: adminNotes,
        });
        await sendEmail({
          to: producerUser.email,
          subject: emailContent.subject,
          html: emailContent.html,
        });
      }
    }

    // Log Audit Action
    await logAuditAction({
      userId: req.user!.id,
      userEmail: req.user!.email,
      action: `PRODUCT_${status.toUpperCase()}`,
      targetType: 'PRODUCT',
      targetId: productId.toString(),
      details: { productName: updatedProduct.name, status, adminNotes },
    });

    res.json(updatedProduct);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 4. ADMIN DASHBOARD - ACTION REQUIRED COUNTERS
// ==========================================

apiRouter.get('/admin/action-required', authenticateToken, requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const pendingProducersList = await db.select().from(producers).where(eq(producers.verificationStatus, 'pending'));
    const pendingProductsList = await db.select().from(products).where(eq(products.status, 'pending'));
    const revisionProductsList = await db.select().from(products).where(eq(products.status, 'revision_requested'));
    const newOrdersList = await db.select().from(orders).where(eq(orders.status, 'new'));
    const openTicketsList = await db.select().from(supportTickets).where(eq(supportTickets.status, 'open'));

    res.json({
      pendingProducersCount: pendingProducersList.length,
      pendingProductsCount: pendingProductsList.length,
      revisionProductsCount: revisionProductsList.length,
      newOrdersCount: newOrdersList.length,
      openTicketsCount: openTicketsList.length,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 5. PACKAGES & SUBSCRIPTIONS MANAGEMENT
// ==========================================

apiRouter.get('/packages', async (req: Request, res: Response) => {
  try {
    const allPackages = await db.select().from(packages);
    res.json(allPackages);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post('/packages', authenticateToken, requireRole('admin'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const [newPkg] = await db.insert(packages).values(req.body).returning();
    await logAuditAction({
      userId: req.user!.id,
      userEmail: req.user!.email,
      action: 'PACKAGE_CREATED',
      targetType: 'PACKAGE',
      targetId: newPkg.id.toString(),
      details: { name: newPkg.name, price: newPkg.price },
    });
    res.json(newPkg);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.put('/packages/:id', authenticateToken, requireRole('admin'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const pkgId = parseInt(rawId);
    const [updatedPkg] = await db.update(packages).set(req.body).where(eq(packages.id, pkgId)).returning();
    await logAuditAction({
      userId: req.user!.id,
      userEmail: req.user!.email,
      action: 'PACKAGE_UPDATED',
      targetType: 'PACKAGE',
      targetId: pkgId.toString(),
      details: { name: updatedPkg?.name },
    });
    res.json(updatedPkg);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.delete('/packages/:id', authenticateToken, requireRole('admin'), async (req: AuthenticatedRequest, res: Response) => {
  try {
    const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const pkgId = parseInt(rawId);
    await db.delete(packages).where(eq(packages.id, pkgId));
    await logAuditAction({
      userId: req.user!.id,
      userEmail: req.user!.email,
      action: 'PACKAGE_DELETED',
      targetType: 'PACKAGE',
      targetId: pkgId.toString(),
    });
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// ==========================================
// 6. ORDERS & SUPPORT TICKETS
// ==========================================

apiRouter.get('/orders', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.user!.role === 'admin') {
      const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));
      return res.json(allOrders);
    }
    const myOrders = await db.select().from(orders).where(eq(orders.buyerId, req.user!.id)).orderBy(desc(orders.createdAt));
    res.json(myOrders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post('/orders', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { items, totalAmount, deliveryAddress, hotelName } = req.body;
    const orderNum = 'ORD-' + Date.now().toString().slice(-6);

    const [newOrder] = await db
      .insert(orders)
      .values({
        orderNumber: orderNum,
        buyerId: req.user!.id,
        totalAmount: totalAmount.toString(),
        items,
        deliveryAddress,
        hotelName,
        status: 'new',
        paymentStatus: 'paid',
      })
      .returning();

    await createUserNotification({
      userId: req.user!.id,
      title: `تم إنشاء الطلب ${orderNum} بنجاح`,
      message: 'شكراً لشرائك من منصة ورث أجيال. طلبك قيد التجهيز الآن.',
      type: 'success',
    });

    res.json(newOrder);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Support Tickets
apiRouter.get('/support', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (['admin', 'support'].includes(req.user!.role)) {
      const allTickets = await db.select().from(supportTickets).orderBy(desc(supportTickets.createdAt));
      return res.json(allTickets);
    }
    const myTickets = await db.select().from(supportTickets).where(eq(supportTickets.userId, req.user!.id)).orderBy(desc(supportTickets.createdAt));
    res.json(myTickets);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

apiRouter.post('/support', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, category, message } = req.body;
    const refNum = 'TND-' + Math.floor(100000 + Math.random() * 900000);

    const initialMessage = {
      sender: req.user!.name,
      message,
      timestamp: new Date().toISOString(),
      isAdmin: false,
    };

    const [newTicket] = await db
      .insert(supportTickets)
      .values({
        referenceNumber: refNum,
        userId: req.user!.id,
        title,
        category: category || 'عام',
        status: 'open',
        messages: [initialMessage],
      })
      .returning();

    res.json(newTicket);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Audit Logs (Admin only)
apiRouter.get('/admin/audit-logs', authenticateToken, requireRole('admin'), async (req: Request, res: Response) => {
  try {
    const logs = await db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(50);
    res.json(logs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
