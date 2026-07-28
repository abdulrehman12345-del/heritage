import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  productName: string;
  slug: string;
  category: mongoose.Types.ObjectId | string;
  categoryName: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
  sku: string;
  images: string[];
  thumbnail: string;
  material: string;
  origin: string;
  historicalEra: string;
  dimensions: string;
  condition: string;
  featured: boolean;
  status: 'Vaulted' | 'Available' | 'Sold' | 'Acquired';
  certificateId: string;
  provenance: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    categoryName: {
      type: String,
      required: true,
      default: 'Sculptures',
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    salePrice: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      default: 1,
      min: [0, 'Stock cannot be negative'],
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    images: {
      type: [String],
      default: [],
    },
    thumbnail: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      default: 'Bronze & Gold Leaf',
    },
    origin: {
      type: String,
      default: 'Florence, Italy',
    },
    historicalEra: {
      type: String,
      default: '18th Century',
    },
    dimensions: {
      type: String,
      default: '45cm x 30cm x 22cm',
    },
    condition: {
      type: String,
      default: 'Museum Quality - Restored Conservation Status',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['Vaulted', 'Available', 'Sold', 'Acquired'],
      default: 'Available',
    },
    certificateId: {
      type: String,
      default: 'HA-VAULT-1892',
    },
    provenance: {
      type: String,
      default: 'Private European Royal Collection, Documented Lineage',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
