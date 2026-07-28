import { Artifact, CategoryType } from '../types';

export type AdminTab =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'orders'
  | 'customers'
  | 'reviews'
  | 'inventory'
  | 'analytics'
  | 'media'
  | 'discounts'
  | 'homepage'
  | 'settings'
  | 'admins'
  | 'messages'
  | 'profile';

export interface OrderItem {
  artifactId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending Verification' | 'Refunded';
  trackingNumber?: string;
  date: string;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  isVip: boolean;
  joinedDate: string;
  status: 'Active' | 'Inactive';
}

export interface Review {
  id: string;
  authorName: string;
  authorTitle: string;
  artifactTitle: string;
  rating: number;
  comment: string;
  date: string;
  status: 'Published' | 'Pending' | 'Archived';
  verifiedBuyer: boolean;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  size: string;
  dimensions: string;
  folder: 'Artifacts' | 'Hero' | 'Certificates' | 'Banners';
  uploadedAt: string;
  optimized: boolean;
}

export interface DiscountCode {
  id: string;
  code: string;
  discountType: 'Percentage' | 'Fixed Amount';
  value: number;
  minPurchase?: number;
  usageLimit: number;
  timesUsed: number;
  validUntil: string;
  status: 'Active' | 'Expired' | 'Disabled';
}

export interface CustomerInquiryMessage {
  id: string;
  collectorName: string;
  email: string;
  phone: string;
  artifactTitle: string;
  message: string;
  date: string;
  status: 'Unread' | 'Replied' | 'Archived';
  preferredContact: 'Email' | 'Phone' | 'Private Viewing';
}

export interface CategoryCMS {
  id: string;
  name: CategoryType;
  slug: string;
  image: string;
  description: string;
  itemCount: number;
  status: 'Active' | 'Hidden';
}

export interface HomepageCMSConfig {
  heroHeading: string;
  heroSubheading: string;
  heroDescription: string;
  heroImage: string;
  featuredCategoryIds: string[];
  aboutHeading: string;
  aboutText: string;
  aboutImage: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
}

export interface WebsiteSettingsConfig {
  siteName: string;
  siteTagline: string;
  logoText: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  currency: string;
  socialInstagram: string;
  socialPinterest: string;
  socialLinkedIn: string;
  seoTitle: string;
  seoDescription: string;
  enableGuestCheckout: boolean;
  notifyOnNewOrder: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'Master Curator' | 'Senior Cataloguer' | 'Inventory Specialist';
  avatar: string;
  lastActive: string;
  status: 'Active' | 'Suspended';
}
