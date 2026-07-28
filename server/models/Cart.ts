import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
  product: mongoose.Types.ObjectId | string;
  quantity: number;
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId | string;
  items: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema: Schema<ICart> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICart>('Cart', CartSchema);
