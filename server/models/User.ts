import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  fullName: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  profileImage?: string;
  role: 'Admin' | 'Customer';
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email address',
      ],
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [5, 'Password must be at least 5 characters'],
      select: false,
    },
    profileImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    },
    role: {
      type: String,
      enum: ['Admin', 'Customer'],
      default: 'Customer',
    },
    address: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: 'United Kingdom',
    },
    postalCode: {
      type: String,
      default: '',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt before saving
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password!, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password!);
};

// Sign JWT token
UserSchema.methods.getSignedJwtToken = function (): string {
  const secret = process.env.JWT_SECRET || 'heritage_antiques_jwt_secret_key_2026';
  const expire = process.env.JWT_EXPIRE || '30d';
  return jwt.sign({ id: this._id, role: this.role }, secret, {
    expiresIn: expire as any,
  });
};

export default mongoose.model<IUser>('User', UserSchema);
