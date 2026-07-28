// Frontend API Client for Heritage Antiques REST Backend

const API_BASE_URL = '/api/v1';

export const getAuthToken = () => localStorage.getItem('heritage_token');
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('heritage_token', token);
  } else {
    localStorage.removeItem('heritage_token');
  }
};

const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An API error occurred');
  }

  return data;
};

// Auth API
export const authApi = {
  register: (data: any) => fetchWithAuth('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: any) => fetchWithAuth('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  adminLogin: (data: any) => fetchWithAuth('/auth/admin-login', { method: 'POST', body: JSON.stringify(data) }),
  logout: () => fetchWithAuth('/auth/logout'),
  getMe: () => fetchWithAuth('/auth/me'),
  forgotPassword: (email: string) => fetchWithAuth('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),
  resetPassword: (token: string, password: string) => fetchWithAuth(`/auth/reset-password/${token}`, { method: 'PUT', body: JSON.stringify({ password }) }),
  changePassword: (data: any) => fetchWithAuth('/auth/change-password', { method: 'PUT', body: JSON.stringify(data) }),
  updateProfile: (data: any) => fetchWithAuth('/auth/update-profile', { method: 'PUT', body: JSON.stringify(data) }),
  uploadProfileImage: (imageUrl: string) => fetchWithAuth('/auth/upload-profile-image', { method: 'POST', body: JSON.stringify({ imageUrl }) }),
  getCustomers: () => fetchWithAuth('/auth/customers'),
};

// Products API
export const productsApi = {
  getProducts: (params?: { category?: string; featured?: boolean; search?: string }) => {
    const query = new URLSearchParams(params as any).toString();
    return fetchWithAuth(`/products?${query}`);
  },
  getProductById: (id: string) => fetchWithAuth(`/products/${id}`),
  createProduct: (data: any) => fetchWithAuth('/products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct: (id: string, data: any) => fetchWithAuth(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProduct: (id: string) => fetchWithAuth(`/products/${id}`, { method: 'DELETE' }),
  updateInventory: (id: string, stock: number, status?: string) => fetchWithAuth(`/products/${id}/inventory`, { method: 'PUT', body: JSON.stringify({ stock, status }) }),
};

// Categories API
export const categoriesApi = {
  getCategories: () => fetchWithAuth('/categories'),
  createCategory: (data: any) => fetchWithAuth('/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id: string, data: any) => fetchWithAuth(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id: string) => fetchWithAuth(`/categories/${id}`, { method: 'DELETE' }),
};

// Orders API
export const ordersApi = {
  createOrder: (data: any) => fetchWithAuth('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getMyOrders: () => fetchWithAuth('/orders/my-orders'),
  getAllOrders: () => fetchWithAuth('/orders'),
  updateOrderStatus: (id: string, data: any) => fetchWithAuth(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify(data) }),
};

// Cart API
export const cartApi = {
  getCart: () => fetchWithAuth('/cart'),
  addToCart: (productId: string, quantity: number = 1) => fetchWithAuth('/cart/add', { method: 'POST', body: JSON.stringify({ productId, quantity }) }),
  updateCartItem: (productId: string, quantity: number) => fetchWithAuth('/cart/update', { method: 'PUT', body: JSON.stringify({ productId, quantity }) }),
  removeFromCart: (productId: string) => fetchWithAuth(`/cart/remove/${productId}`, { method: 'DELETE' }),
  clearCart: () => fetchWithAuth('/cart/clear', { method: 'DELETE' }),
};

// Wishlist API
export const wishlistApi = {
  getWishlist: () => fetchWithAuth('/wishlist'),
  addToWishlist: (productId: string) => fetchWithAuth('/wishlist/add', { method: 'POST', body: JSON.stringify({ productId }) }),
  removeFromWishlist: (productId: string) => fetchWithAuth(`/wishlist/remove/${productId}`, { method: 'DELETE' }),
};

// Reviews API
export const reviewsApi = {
  getProductReviews: (productId: string) => fetchWithAuth(`/reviews/product/${productId}`),
  createReview: (data: any) => fetchWithAuth('/reviews', { method: 'POST', body: JSON.stringify(data) }),
  getAllReviews: () => fetchWithAuth('/reviews/all'),
  approveReview: (id: string) => fetchWithAuth(`/reviews/${id}/approve`, { method: 'PUT' }),
  deleteReview: (id: string) => fetchWithAuth(`/reviews/${id}/delete`, { method: 'DELETE' }),
};

// CMS API
export const cmsApi = {
  getHomepageCMS: () => fetchWithAuth('/cms/homepage'),
  updateHomepageCMS: (data: any) => fetchWithAuth('/cms/homepage', { method: 'PUT', body: JSON.stringify(data) }),
  getWebsiteSettings: () => fetchWithAuth('/cms/settings'),
  updateWebsiteSettings: (data: any) => fetchWithAuth('/cms/settings', { method: 'PUT', body: JSON.stringify(data) }),
};
