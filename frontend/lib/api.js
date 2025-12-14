import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
if (typeof window !== 'undefined') {
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No token found in localStorage');
    }
    return config;
  });

  // Response interceptor for error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized - token may be invalid');
        // Optionally clear token and redirect
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
      }
      return Promise.reject(error);
    }
  );
}

// Auth API
export const authAPI = {
  signup: async (username, email, password) => {
    const response = await api.post('/auth/signup', { username, email, password });
    return response.data;
  },
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getProfile: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },
  follow: async (userId) => {
    const response = await api.post(`/users/${userId}/follow`);
    return response.data;
  },
  unfollow: async (userId) => {
    const response = await api.delete(`/users/${userId}/follow`);
    return response.data;
  },
  getUserPosts: async (userId) => {
    const response = await api.get(`/users/${userId}/posts`);
    return response.data;
  },
};

// Posts API
export const postsAPI = {
  create: async (imageUrl, caption) => {
    const response = await api.post('/posts', { imageUrl, caption });
    return response.data;
  },
  getPost: async (postId) => {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  },
  like: async (postId) => {
    const response = await api.post(`/posts/${postId}/like`);
    return response.data;
  },
  unlike: async (postId) => {
    const response = await api.delete(`/posts/${postId}/like`);
    return response.data;
  },
  comment: async (postId, text) => {
    const response = await api.post(`/posts/${postId}/comment`, { text });
    return response.data;
  },
  delete: async (postId) => {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  },
};

// Feed API
export const feedAPI = {
  getFeed: async () => {
    const response = await api.get('/feed');
    return response.data;
  },
};

export default api;
