import mongoose, { Schema, Document } from 'mongoose';

export interface IWishlist extends Document {
  user: mongoose.Types.ObjectId | string;
  products: (mongoose.Types.ObjectId | string)[];
  createdAt: Date;
  updatedAt: Date;
}

const WishlistSchema: Schema<IWishlist> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IWishlist>('Wishlist', WishlistSchema);
