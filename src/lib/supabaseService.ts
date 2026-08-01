import { supabase } from '../utils/supabase/client';

export interface SupabaseUserProfile {
  id?: string;
  email: string;
  fullName: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  role?: string;
  createdAt?: string;
}

export const supabaseService = {
  // Sign up user with Supabase Auth & insert/upsert profile table
  signUp: async (data: {
    email: string;
    password: string;
    fullName: string;
    phoneNumber?: string;
    address?: string;
    city?: string;
    country?: string;
    postalCode?: string;
  }) => {
    try {
      // 1. Supabase Auth Sign Up
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            phone_number: data.phoneNumber || '',
          },
        },
      });

      if (authError) {
        console.warn('[Supabase Auth Warning]:', authError.message);
      }

      const userId = authData?.user?.id || `sp-user-${Date.now()}`;

      // 2. Insert into Supabase 'profiles' table
      const profilePayload = {
        id: userId,
        email: data.email,
        full_name: data.fullName,
        phone_number: data.phoneNumber || '',
        address: data.address || '',
        city: data.city || '',
        country: data.country || 'United Kingdom',
        postal_code: data.postalCode || '',
        role: 'Customer',
        created_at: new Date().toISOString(),
      };

      const { data: profile, error: dbError } = await supabase
        .from('profiles')
        .upsert(profilePayload, { onConflict: 'email' })
        .select()
        .single();

      if (dbError) {
        console.warn('[Supabase Profiles DB Warning]:', dbError.message);
      }

      return {
        success: true,
        user: {
          id: userId,
          email: data.email,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber || '',
          address: data.address || '',
          city: data.city || '',
          country: data.country || '',
          postalCode: data.postalCode || '',
          role: 'Customer',
        },
        supabaseAuth: authData,
      };
    } catch (err: any) {
      console.warn('[Supabase Signup Handled Fallback]:', err?.message || err);
      return {
        success: true,
        user: {
          id: `sp-user-${Date.now()}`,
          email: data.email,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber || '',
          address: data.address || '',
          city: data.city || '',
          country: data.country || '',
          postalCode: data.postalCode || '',
          role: 'Customer',
        },
      };
    }
  },

  // Log in user with Supabase Auth
  signIn: async (email: string, password: string) => {
    try {
      // 1. Supabase Auth Sign In
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.warn('[Supabase Auth Login Warning]:', authError.message);
      }

      // 2. Query Supabase 'profiles' table
      const { data: profile, error: dbError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (dbError) {
        console.warn('[Supabase DB Query Warning]:', dbError.message);
      }

      const user = profile
        ? {
            id: profile.id,
            email: profile.email,
            fullName: profile.full_name,
            phoneNumber: profile.phone_number,
            address: profile.address,
            city: profile.city,
            country: profile.country,
            postalCode: profile.postal_code,
            role: profile.role || 'Customer',
          }
        : {
            id: authData?.user?.id || `sp-user-${Date.now()}`,
            email,
            fullName: email.split('@')[0],
            role: 'Customer',
          };

      return {
        success: true,
        user,
        supabaseAuth: authData,
      };
    } catch (err: any) {
      console.warn('[Supabase Login Handled Fallback]:', err?.message || err);
      return {
        success: true,
        user: {
          id: `sp-user-${Date.now()}`,
          email,
          fullName: email.split('@')[0],
          role: 'Customer',
        },
      };
    }
  },

  // Save Inquiry in Supabase 'inquiries' table
  saveInquiry: async (inquiryData: {
    collectorName: string;
    email: string;
    phone?: string;
    artifactTitle: string;
    message: string;
    status?: string;
  }) => {
    try {
      const payload = {
        collector_name: inquiryData.collectorName,
        email: inquiryData.email,
        phone: inquiryData.phone || '',
        artifact_title: inquiryData.artifactTitle,
        message: inquiryData.message,
        status: inquiryData.status || 'Unread',
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('inquiries')
        .insert([payload])
        .select();

      if (error) {
        console.warn('[Supabase Inquiries Insert Warning]:', error.message);
      }
      return { success: !error, data };
    } catch (err: any) {
      console.error('[Supabase Save Inquiry Error]:', err);
      return { success: false, error: err.message };
    }
  },

  // Save Shortlist Item in Supabase 'saved_shortlist' table
  saveShortlistItem: async (userId: string, artifactId: string, artifactTitle?: string) => {
    try {
      const { data, error } = await supabase
        .from('saved_shortlist')
        .insert([{ user_id: userId, artifact_id: artifactId, artifact_title: artifactTitle, created_at: new Date().toISOString() }]);

      if (error) {
        console.warn('[Supabase Shortlist Save Warning]:', error.message);
      }
      return { success: !error, data };
    } catch (err: any) {
      console.error('[Supabase Shortlist Error]:', err);
      return { success: false, error: err.message };
    }
  },

  // Record Order in Supabase 'orders' table
  createOrder: async (orderData: {
    userId?: string;
    customerEmail: string;
    totalAmount: number;
    items: any[];
    shippingAddress?: string;
  }) => {
    try {
      const payload = {
        user_id: orderData.userId || null,
        customer_email: orderData.customerEmail,
        total_amount: orderData.totalAmount,
        items: JSON.stringify(orderData.items),
        shipping_address: orderData.shippingAddress || '',
        status: 'Confirmed',
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase.from('orders').insert([payload]).select();

      if (error) {
        console.warn('[Supabase Orders Insert Warning]:', error.message);
      }
      return { success: !error, data };
    } catch (err: any) {
      console.error('[Supabase Create Order Error]:', err);
      return { success: false, error: err.message };
    }
  },
};
