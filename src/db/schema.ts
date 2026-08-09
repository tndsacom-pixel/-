import { pgTable, serial, text, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. Users table (Supports Admin, Producer, Buyer, Pilgrim, Visitor, Support)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').unique(), // Firebase Auth UID if using OAuth or unique ID
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash'),
  role: text('role').notNull().default('buyer'), // 'admin' | 'producer' | 'buyer' | 'pilgrim' | 'visitor' | 'support'
  name: text('name').notNull(),
  phone: text('phone'),
  avatarUrl: text('avatar_url'),
  isEmailVerified: boolean('is_email_verified').default(false),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 2. Producers (الأسر المنتجة)
export const producers = pgTable('producers', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  familyName: text('family_name').notNull(),
  slug: text('slug').notNull().unique(), // e.g., 'om-ahmad' for /producer/om-ahmad
  city: text('city').notNull(),
  specialization: text('specialization'),
  bio: text('bio'),
  story: text('story'),
  experienceYears: integer('experience_years').default(1),
  verificationStatus: text('verification_status').notNull().default('pending'), // 'pending' | 'approved' | 'rejected'
  logoUrl: text('logo_url'),
  bannerUrl: text('banner_url'),
  phone: text('phone'),
  socialLinks: jsonb('social_links'),
  experiences: text('experiences'),
  certifications: jsonb('certifications'), // Documents/certificates
  rating: text('rating').default('5.0'),
  reviewsCount: integer('reviews_count').default(0),
  qrCodeUrl: text('qr_code_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 3. Products (المنتجات)
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  producerId: integer('producer_id').references(() => producers.id).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  price: text('price').notNull(),
  stock: integer('stock').default(10),
  images: jsonb('images'), // Array of image URLs
  ingredients: text('ingredients'),
  allergens: text('allergens'),
  storageMethod: text('storage_method'),
  expiryDuration: text('expiry_duration'),
  documents: jsonb('documents'),
  status: text('status').notNull().default('pending'), // 'pending' | 'approved' | 'rejected' | 'revision_requested'
  adminNotes: text('admin_notes'),
  sentAt: timestamp('sent_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

// 4. Packages (الباقات)
export const packages = pgTable('packages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  targetCategory: text('target_category'), // 'pilgrim' | 'producer' | 'visitor'
  price: text('price').notNull(),
  features: jsonb('features'), // Array of feature strings
  durationMonths: integer('duration_months').default(1),
  bannerUrl: text('banner_url'),
  terms: text('terms'),
  isActive: boolean('is_active').default(true),
  subscribersCount: integer('subscribers_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

// 5. Package Subscriptions (اشتراكات الباقات)
export const packageSubscriptions = pgTable('package_subscriptions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  packageId: integer('package_id').references(() => packages.id).notNull(),
  status: text('status').notNull().default('active'), // 'active' | 'expired' | 'cancelled'
  startDate: timestamp('start_date').defaultNow(),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 6. Orders (الطلبات والمبيعات)
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderNumber: text('order_number').notNull().unique(),
  buyerId: integer('buyer_id').references(() => users.id).notNull(),
  producerId: integer('producer_id').references(() => producers.id),
  totalAmount: text('total_amount').notNull(),
  status: text('status').notNull().default('new'), // 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: jsonb('items').notNull(), // Array of ordered items with details
  deliveryAddress: text('delivery_address'),
  hotelName: text('hotel_name'),
  trackingNumber: text('tracking_number'),
  paymentStatus: text('payment_status').default('paid'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 7. Support Tickets (تذاكر الدعم)
export const supportTickets = pgTable('support_tickets', {
  id: serial('id').primaryKey(),
  referenceNumber: text('reference_number').notNull().unique(),
  userId: integer('user_id').references(() => users.id).notNull(),
  title: text('title').notNull(),
  category: text('category'),
  priority: text('priority').default('medium'), // 'low' | 'medium' | 'high'
  status: text('status').notNull().default('open'), // 'open' | 'in_progress' | 'closed'
  messages: jsonb('messages'), // Array of message objects { sender, message, timestamp }
  createdAt: timestamp('created_at').defaultNow(),
});

// 8. Reviews (التقييمات)
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id),
  producerId: integer('producer_id').references(() => producers.id),
  userId: integer('user_id').references(() => users.id).notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 9. Notifications (الإشعارات)
export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  isRead: boolean('is_read').default(false),
  link: text('link'),
  type: text('type').default('info'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 10. Audit Logs (سجل العمليات الإدارية)
export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  userEmail: text('user_email'),
  action: text('action').notNull(),
  targetType: text('target_type').notNull(),
  targetId: text('target_id'),
  details: jsonb('details'),
  createdAt: timestamp('created_at').defaultNow(),
});

// 11. Platform Settings (إعدادات المنصة)
export const platformSettings = pgTable('platform_settings', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: jsonb('value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relationships
export const usersRelations = relations(users, ({ many, one }) => ({
  producer: one(producers, { fields: [users.id], references: [producers.userId] }),
  orders: many(orders),
  subscriptions: many(packageSubscriptions),
  tickets: many(supportTickets),
  notifications: many(notifications),
}));

export const producersRelations = relations(producers, ({ one, many }) => ({
  user: one(users, { fields: [producers.userId], references: [users.id] }),
  products: many(products),
  reviews: many(reviews),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  producer: one(producers, { fields: [products.producerId], references: [producers.id] }),
  reviews: many(reviews),
}));
