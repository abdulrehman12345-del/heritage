import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  product: mongoose.Types.ObjectId | string;
  productName: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId | string;
  clientName: string;
  clientEmail: string;
  orderedProducts: IOrderItem[];
  totalPrice: number;
  shippingAddress: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid' | 'Escrow Secured' | 'Failed' | 'Refunded';
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'In Escrow' | 'Cancelled';
  trackingNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clientName: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: true,
    },
    orderedProducts: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        productName: { type: String, required: true },
        thumbnail: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingAddress: {
      street: { type: String, default: 'Mayfair Heritage District' },
      city: { type: String, default: 'London' },
      country: { type: String, default: 'United Kingdom' },
      postalCode: { type: String, default: 'W1K 2HP' },
    },
    paymentMethod: {
      type: String,
      default: 'Private Escrow Wire Transfer',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Escrow Secured', 'Failed', 'Refunded'],
      default: 'Escrow Secured',
    },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'In Escrow', 'Cancelled'],
      default: 'Pending',
    },
    trackingNumber: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOrder>('Order', OrderSchema);
