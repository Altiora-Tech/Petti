const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8080/api';

// Helper function to handle API requests
const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include', // Important for cookies and authentication
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || 'Something went wrong');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Image Service
export const imageService = {
  upload: async (file: File, category: string, referenceId?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);
    if (referenceId) {
      formData.append('referenceId', referenceId);
    }

    return fetchApi('/images/upload', {
      method: 'POST',
      body: formData,
      headers: {},
    });
  },

  delete: (imageId: string) => 
    fetchApi(`/images/${imageId}`, { method: 'DELETE' }),

  getImageUrl: (imageId: string) => 
    `${API_BASE_URL}/images/${imageId}/url`,
};

// Auth Service
export const authService = {
  login: (email: string, password: string) =>
    fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  signup: (userData: any) =>
    fetchApi('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  refreshToken: () =>
    fetchApi('/auth/refresh-token', { method: 'POST' }),

  logout: () =>
    fetchApi('/auth/logout', { method: 'POST' }),
};

// User Service
export const userService = {
  getProfile: () => fetchApi('/users/me'),
  updateProfile: (userData: any) =>
    fetchApi('/users/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),
};

export default {
  image: imageService,
  auth: authService,
  user: userService,
};
