import mongoose, { Schema, Document } from 'mongoose';

export interface IWebsiteSettings extends Document {
  siteName: string;
  logo: string;
  favicon: string;
  contactInformation: {
    email: string;
    phone: string;
    conciergeAddress: string;
    vaultLocation: string;
  };
  socialMediaLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
  };
  footerContent: {
    copyrightText: string;
    aboutSummary: string;
    accreditationNote: string;
  };
  seoSettings: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
  };
  updatedAt: Date;
}

const WebsiteSettingsSchema: Schema<IWebsiteSettings> = new Schema(
  {
    siteName: {
      type: String,
      default: 'Heritage Antiques',
    },
    logo: {
      type: String,
      default: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=200',
    },
    favicon: {
      type: String,
      default: '/favicon.ico',
    },
    contactInformation: {
      email: { type: String, default: 'curator@heritageantiques.com' },
      phone: { type: String, default: '+44 (0) 20 7946 0912' },
      conciergeAddress: { type: String, default: '42 Grosvenor Street, Mayfair, London W1K 3JH' },
      vaultLocation: { type: String, default: 'High-Security Geneva & London Freeport Vaults' },
    },
    socialMediaLinks: {
      instagram: { type: String, default: 'https://instagram.com/heritageantiques' },
      facebook: { type: String, default: 'https://facebook.com/heritageantiques' },
      twitter: { type: String, default: 'https://twitter.com/heritageantiques' },
      linkedin: { type: String, default: 'https://linkedin.com/company/heritageantiques' },
    },
    footerContent: {
      copyrightText: { type: String, default: '© 1892-2026 Heritage Antiques Ltd. All rights reserved.' },
      aboutSummary: { type: String, default: 'Purveyors of museum-grade antiquities, fine bronzes, rare manuscripts, and royal artifacts with certified provenance.' },
      accreditationNote: { type: String, default: 'Member of International Antique & Fine Art Dealers Association (IAFADA).' },
    },
    seoSettings: {
      metaTitle: { type: String, default: 'Heritage Antiques | Rare Fine Antiquities & Certified Artifacts' },
      metaDescription: { type: String, default: 'Acquire museum-verified ancient collectibles, sculptures, bronzes, and royal jewelry with authenticated provenance.' },
      keywords: { type: String, default: 'antiques, rare artifacts, museum quality, fine art, ancient bronzes, roman statues, rare collectibles' },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IWebsiteSettings>('WebsiteSettings', WebsiteSettingsSchema);
