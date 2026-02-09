import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Types
export interface User {
  id: number;
  email: string;
  created_at: string;
}

export interface Expense {
  id: number;
  amount: number;
  category: string;
  description: string;
  created_at: string;
  owner_id: number;
}

export interface LoginResponse {
  token: string;
  token_type: string;
}

// Auth API
export const authApi = {
  register: async (email: string, password: string): Promise<User> => {
    const response = await api.post('/users', { email, password });
    return response.data;
  },

  login: async (email: string, password: string): Promise<LoginResponse> => {
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);

    const response = await axios.post(`${API_BASE_URL}/login`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  deleteAccount: async (): Promise<void> => {
    await api.delete('/users/profile/delete');
  },
};

// Expenses API
export const expensesApi = {
  getAll: async (): Promise<Expense[]> => {
    try {
      const response = await api.get('/expenses');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return [];
      }
      throw error;
    }
  },

  getById: async (id: number): Promise<Expense> => {
    const response = await api.get(`/expenses/${id}`);
    return response.data;
  },

  create: async (data: { amount: number; category: string; description?: string }): Promise<Expense> => {
    const response = await api.post('/expenses', data);
    return response.data;
  },

  update: async (id: number, data: { amount: number; category: string; description: string }): Promise<Expense> => {
    const response = await api.put(`/expenses/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/expenses/${id}`);
  },

  generateStory: async (): Promise<string> => {
    const response = await api.get('/llm/analysis/story');
    return response.data;
  },
};
