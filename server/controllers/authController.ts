import { Request, Response } from 'express';
import crypto from 'crypto';
import User from '../models/User';
import Cart from '../models/Cart';
import Wishlist from '../models/Wishlist';
import { AuthRequest } from '../middleware/auth';

// Send Token Response Helper
const sendTokenResponse = (user: any, statusCode: number, res: Response, message: string) => {
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profileImage: user.profileImage,
      role: user.role,
      address: user.address,
      city: user.city,
      country: user.country,
      postalCode: user.postalCode,
      createdAt: user.createdAt,
    },
  });
};

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, and password.',
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists.',
      });
    }

    // Default role is Customer unless explicitly specified and authorized
    const assignedRole = role === 'Admin' ? 'Admin' : 'Customer';

    const user = await User.create({
      fullName,
      email,
      password,
      phoneNumber: phoneNumber || '',
      role: assignedRole,
    });

    // Initialize Cart and Wishlist for user
    await Cart.create({ user: user._id, items: [] });
    await Wishlist.create({ user: user._id, products: [] });

    sendTokenResponse(user, 201, res, 'Account created successfully!');
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration.',
    });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.',
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User not found.',
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Incorrect password.',
      });
    }

    sendTokenResponse(user, 200, res, 'Logged in successfully!');
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during login.',
    });
  }
};

// @desc    Admin login
// @route   POST /api/v1/auth/admin-login
// @access  Public
export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username and password.',
      });
    }

    // Support both username (full name) or email matching
    const trimmedUser = username.trim();
    const user = await User.findOne({
      $or: [
        { email: trimmedUser.toLowerCase() },
        { fullName: new RegExp(`^${trimmedUser}$`, 'i') },
        { fullName: new RegExp(`^${trimmedUser.replace(/\s+/g, '')}$`, 'i') },
        { fullName: new RegExp(`^${trimmedUser.replace(/([a-z])([A-Z])/g, '$1 $2')}$`, 'i') },
      ],
      role: 'Admin',
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials or non-admin account.',
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials. Password incorrect.',
      });
    }

    sendTokenResponse(user, 200, res, 'Admin authenticated successfully!');
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during admin authentication.',
    });
  }
};

// @desc    Logout user / clear token
// @route   GET /api/v1/auth/logout
// @access  Private
export const logout = async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
    token: null,
  });
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user!._id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error retrieving user profile.',
    });
  }
};

// @desc    Forgot Password Token Generation
// @route   POST /api/v1/auth/forgot-password
// @access  Public
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account registered with this email address.',
      });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: 'Password reset link/token generated.',
      resetToken, // Returned for testing / email workflow
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error processing forgot password request.',
    });
  }
};

// @desc    Reset Password with Token
// @route   PUT /api/v1/auth/reset-password/:resetToken
// @access  Public
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token.',
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendTokenResponse(user, 200, res, 'Password reset successful!');
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error resetting password.',
    });
  }
};

// @desc    Change Password
// @route   PUT /api/v1/auth/change-password
// @access  Private
export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user!._id).select('+password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect.',
      });
    }

    user.password = newPassword;
    await user.save();

    sendTokenResponse(user, 200, res, 'Password changed successfully!');
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error changing password.',
    });
  }
};

// @desc    Update Profile Details
// @route   PUT /api/v1/auth/update-profile
// @access  Private
export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const { fullName, phoneNumber, address, city, country, postalCode, profileImage } = req.body;

    const fieldsToUpdate: any = {};
    if (fullName) fieldsToUpdate.fullName = fullName;
    if (phoneNumber !== undefined) fieldsToUpdate.phoneNumber = phoneNumber;
    if (address !== undefined) fieldsToUpdate.address = address;
    if (city !== undefined) fieldsToUpdate.city = city;
    if (country !== undefined) fieldsToUpdate.country = country;
    if (postalCode !== undefined) fieldsToUpdate.postalCode = postalCode;
    if (profileImage !== undefined) fieldsToUpdate.profileImage = profileImage;

    const user = await User.findByIdAndUpdate(req.user!._id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating user profile.',
    });
  }
};

// @desc    Upload Profile Image
// @route   POST /api/v1/auth/upload-profile-image
// @access  Private
export const uploadProfileImage = async (req: AuthRequest, res: Response) => {
  try {
    let imageUrl = req.body.imageUrl;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an image file or URL.',
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user!._id,
      { profileImage: imageUrl },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile image uploaded successfully.',
      profileImage: imageUrl,
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error uploading profile image.',
    });
  }
};

// @desc    Get all customers (Admin only)
// @route   GET /api/v1/auth/customers
// @access  Private/Admin
export const getAllCustomers = async (req: AuthRequest, res: Response) => {
  try {
    const customers = await User.find({ role: 'Customer' }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: customers.length,
      customers,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching customers.',
    });
  }
};
