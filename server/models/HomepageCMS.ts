import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial {
  collectorName: string;
  title: string;
  location: string;
  quote: string;
  avatarUrl: string;
  rating: number;
}

export interface IHomepageCMS extends Document {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  featuredProducts: (mongoose.Types.ObjectId | string)[];
  featuredCategories: (mongoose.Types.ObjectId | string)[];
  bannerText: string;
  bannerImage: string;
  testimonials: ITestimonial[];
  updatedAt: Date;
}

const HomepageCMSSchema: Schema<IHomepageCMS> = new Schema(
  {
    heroTitle: {
      type: String,
      default: 'Timeless Antiquities & Royal Masterpieces',
    },
    heroSubtitle: {
      type: String,
      default: 'Curated Heritage Vault',
    },
    heroDescription: {
      type: String,
      default: 'Discover rare, museum-verified artifacts, ancient sculptures, and royal heirlooms preserved across centuries.',
    },
    heroImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=1600',
    },
    featuredProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    featuredCategories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    bannerText: {
      type: String,
      default: 'Private Viewing Appointments Available in Mayfair Vault, London',
    },
    bannerImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=1600',
    },
    testimonials: [
      {
        collectorName: { type: String, required: true },
        title: { type: String, required: true },
        location: { type: String, required: true },
        quote: { type: String, required: true },
        avatarUrl: { type: String, required: true },
        rating: { type: Number, default: 5 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IHomepageCMS>('HomepageCMS', HomepageCMSSchema);
