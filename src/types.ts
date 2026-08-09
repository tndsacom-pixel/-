export type ProjectType = 'hospitality' | 'culinary' | 'crafts' | 'home_products';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  producerId?: string;
  producerName?: string;
  producerCity?: string;
  status?: 'approved' | 'pending' | 'rejected' | 'needs_modification';
  quantity?: number;
  city?: string;
  prepTime?: string;
  preservationMethod?: string;
  ingredients?: string;
  allergyInfo?: string;
  adminNotes?: string;
  extraImages?: string[];
  createdAt?: string;
}

export interface ProducerFamily {
  id: string;
  brandName: string;
  ownerName: string;
  phone: string;
  email: string;
  city: string;
  projectType: ProjectType;
  specialty: string;
  description: string;
  story: string;
  experience: string;
  status: 'approved' | 'pending' | 'suspended';
  rating: number;
  reviewsCount: number;
  logoUrl: string;
  coverUrl?: string;
  kitchenPhotos?: string[];
  licenses?: string[];
  products: Product[];
  joinedDate: string;
  qrCodeUrl?: string;
  totalSales?: number;
  participatingPackages?: string[];
  qualityVerified: boolean;
}

export interface BeneficiaryProfile {
  name: string;
  phone: string;
  email: string;
  projectName: string;
  projectType: ProjectType;
  description: string;
  skills: string[];
  experience: string;
  achievements: string[];
  products: Product[];
  imageUrl: string;
  registered: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: string;
}

export interface QuizQuestion {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  lessonsCount: number;
  lessons: Lesson[];
  quiz: Quiz;
  completed: boolean;
  quizPassed: boolean;
  completedLessons: string[];
}

export interface AssessmentAnswer {
  questionId: string;
  questionText: string;
  answer: string;
}

export interface Assessment {
  answers: AssessmentAnswer[];
  evaluated: boolean;
  score: number;
  productQuality: number; // 1-5
  founderSkills: number; // 1-5
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  reportDate: string;
}

export type StorePackageId = 'none' | 'basic' | 'growth' | 'professional';
export type PilgrimPackageId = 'none' | 'free' | 'silver' | 'gold' | 'family';

export interface SubscriptionState {
  storePackage: StorePackageId;
  pilgrimPackage: PilgrimPackageId;
  storeSubscriptionDate?: string;
  pilgrimSubscriptionDate?: string;
}

export interface ImpactStats {
  totalBeneficiaries: number;
  qualifiedProjects: number;
  completedCourses: number;
  jobOpportunities: number;
  avgReadiness: number;
  salesVolume: number;
  empoweredProjects: number;
}

export interface ChallengeItem {
  id: string;
  domain: ProjectType;
  domainLabel: string;
  beneficiaryName: string;
  beneficiaryStory: string;
  challenges: string[];
  successIndicators: string[];
  imageUrl: string;
}

export interface PilgrimOnboardingAnswers {
  goal: string;
  location: string;
  healthConditions: string[];
  deliveryTime: string;
  familySize: number;
}

export type UserRole = 'beneficiary' | 'admin' | 'producer' | 'pilgrim' | 'visitor' | 'buyer';

export interface UserAccount {
  id: string;
  username: string;
  email: string;
  name: string;
  passwordHash: string;
  role: UserRole;
  isEmailVerified: boolean;
  emailVerifiedAt?: string;
  emailVerificationToken?: string;
  createdAt: string;
  lastLoginAt?: string;
  phone?: string;
  metadata?: Record<string, any>;
  pendingEmailChange?: {
    newEmail: string;
    token: string;
    createdAt: string;
  };
}

export type EmailType = 
  | 'verification' 
  | 'password_reset' 
  | 'order_status' 
  | 'package_subscription' 
  | 'support_ticket' 
  | 'accreditation' 
  | 'email_change' 
  | 'general';

export interface EmailLog {
  id: string;
  recipient: string;
  recipientName?: string;
  subject: string;
  bodyHtml: string;
  bodyText: string;
  sentAt: string;
  status: 'sent' | 'delivered' | 'failed';
  emailType: EmailType;
  actionUrl?: string;
  token?: string;
  metadata?: Record<string, any>;
}

export interface PasswordResetToken {
  token: string;
  email: string;
  expiresAt: string;
  used: boolean;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userEmail: string;
  userName: string;
  subject: string;
  category: string;
  status: 'open' | 'in_progress' | 'closed';
  createdAt: string;
  updatedAt: string;
  messages: {
    id: string;
    sender: 'user' | 'admin';
    senderName: string;
    message: string;
    timestamp: string;
  }[];
}

export interface PlatformOrder {
  id: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    producerId?: string;
    producerName?: string;
  }[];
  totalAmount: number;
  deliveryAddress: string;
  city: string;
  status: 'received' | 'paid' | 'processing' | 'delivering' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

