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

  // Save Category in Supabase 'categories' table
  saveCategory: async (categoryData: {
    id?: string;
    name: string;
    description?: string;
    image?: string;
    slug?: string;
    status?: string;
  }) => {
    try {
      const payload = {
        id: categoryData.id || `cat-${Date.now()}`,
        name: categoryData.name,
        category_name: categoryData.name,
        description: categoryData.description || '',
        image: categoryData.image || '',
        slug: categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        status: categoryData.status || 'Active',
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('categories')
        .upsert([payload], { onConflict: 'name' })
        .select();

      if (error) {
        console.warn('[Supabase Categories Upsert Warning]:', error.message);
      }
      return { success: !error, data: data?.[0] || payload };
    } catch (err: any) {
      console.error('[Supabase Save Category Error]:', err);
      return { success: false, error: err.message };
    }
  },

  // Update Category in Supabase
  updateCategory: async (id: string, categoryData: Partial<{
    name: string;
    description: string;
    image: string;
    status: string;
  }>) => {
    try {
      const payload: any = {};
      if (categoryData.name) {
        payload.name = categoryData.name;
        payload.category_name = categoryData.name;
        payload.slug = categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
      if (categoryData.description !== undefined) payload.description = categoryData.description;
      if (categoryData.image !== undefined) payload.image = categoryData.image;
      if (categoryData.status !== undefined) payload.status = categoryData.status;

      const { data, error } = await supabase
        .from('categories')
        .update(payload)
        .eq('id', id)
        .select();

      if (error) {
        console.warn('[Supabase Category Update Warning]:', error.message);
      }
      return { success: !error, data };
    } catch (err: any) {
      console.error('[Supabase Update Category Error]:', err);
      return { success: false, error: err.message };
    }
  },

  // Delete Category from Supabase
  deleteCategory: async (id: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) {
        console.warn('[Supabase Category Delete Warning]:', error.message);
      }
      return { success: !error };
    } catch (err: any) {
      console.error('[Supabase Delete Category Error]:', err);
      return { success: false, error: err.message };
    }
  },

  // Save Product / Artifact in Supabase 'products' / 'artifacts' tables
  saveProduct: async (productData: {
    id?: string;
    title: string;
    category: string;
    description: string;
    price: number;
    image: string;
    secondaryImages?: string[];
    material?: string;
    origin?: string;
    era?: string;
    dimensions?: string;
    condition?: string;
    featured?: boolean;
    certificateNumber?: string;
    curatorNotes?: string;
    stock?: number;
    sku?: string;
  }) => {
    try {
      const payload = {
        id: productData.id || `art-${Date.now()}`,
        title: productData.title,
        product_name: productData.title,
        category: productData.category,
        category_name: productData.category,
        description: productData.description || '',
        price: productData.price,
        image: productData.image,
        thumbnail: productData.image,
        secondary_images: JSON.stringify(productData.secondaryImages || []),
        material: productData.material || '',
        origin: productData.origin || '',
        era: productData.era || '',
        dimensions: productData.dimensions || '',
        condition: productData.condition || 'Museum Grade',
        featured: productData.featured || false,
        certificate_number: productData.certificateNumber || '',
        curator_notes: productData.curatorNotes || '',
        stock: productData.stock || 1,
        sku: productData.sku || 'HA-SKU-001',
        created_at: new Date().toISOString(),
      };

      // Try inserting into 'products' table first
      let { data, error } = await supabase
        .from('products')
        .upsert([payload])
        .select();

      // If 'products' fails or table differs, try 'artifacts' table as well
      if (error) {
        console.warn('[Supabase products insert warning, trying artifacts table...]:', error.message);
        const artResult = await supabase
          .from('artifacts')
          .upsert([{
            id: payload.id,
            title: payload.title,
            category: payload.category,
            period: payload.era || 'Historical',
            origin: payload.origin || 'Unknown',
            estimated_value: `$${payload.price}`,
            image_url: payload.image,
            description: payload.description,
            provenance: payload.curator_notes || 'Private Collection',
            year: payload.era || 'Ancient',
            featured: payload.featured
          }])
          .select();
        
        if (!artResult.error) {
          return { success: true, data: artResult.data?.[0] };
        }
      }

      return { success: !error, data: data?.[0] || payload };
    } catch (err: any) {
      console.error('[Supabase Save Product Error]:', err);
      return { success: false, error: err.message };
    }
  },

  // Update Product / Artifact in Supabase
  updateProduct: async (id: string, productData: Partial<{
    title: string;
    category: string;
    description: string;
    price: number;
    image: string;
    material: string;
    origin: string;
    era: string;
    dimensions: string;
    condition: string;
    featured: boolean;
    certificateNumber: string;
    curatorNotes: string;
    stock: number;
    sku: string;
  }>) => {
    try {
      const payload: any = {};
      if (productData.title) { payload.title = productData.title; payload.product_name = productData.title; }
      if (productData.category) { payload.category = productData.category; payload.category_name = productData.category; }
      if (productData.description !== undefined) payload.description = productData.description;
      if (productData.price !== undefined) payload.price = productData.price;
      if (productData.image) { payload.image = productData.image; payload.thumbnail = productData.image; }
      if (productData.material !== undefined) payload.material = productData.material;
      if (productData.origin !== undefined) payload.origin = productData.origin;
      if (productData.era !== undefined) payload.era = productData.era;
      if (productData.dimensions !== undefined) payload.dimensions = productData.dimensions;
      if (productData.condition !== undefined) payload.condition = productData.condition;
      if (productData.featured !== undefined) payload.featured = productData.featured;
      if (productData.certificateNumber !== undefined) payload.certificate_number = productData.certificateNumber;
      if (productData.curatorNotes !== undefined) payload.curator_notes = productData.curatorNotes;
      if (productData.stock !== undefined) payload.stock = productData.stock;

      const { data, error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', id)
        .select();

      if (error) {
        await supabase.from('artifacts').update({
          title: payload.title,
          category: payload.category,
          image_url: payload.image,
          description: payload.description,
          featured: payload.featured
        }).eq('id', id);
      }

      return { success: true, data };
    } catch (err: any) {
      console.error('[Supabase Update Product Error]:', err);
      return { success: false, error: err.message };
    }
  },

  // Delete Product / Artifact from Supabase
  deleteProduct: async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      await supabase.from('artifacts').delete().eq('id', id);

      return { success: true };
    } catch (err: any) {
      console.error('[Supabase Delete Product Error]:', err);
      return { success: false, error: err.message };
    }
  }
};
