import axios from 'axios';
import { Artist, Session, Settings } from '@/lib/types';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Artists API
export const artistsApi = {
  getAll: async () => {
    const response = await api.get<Artist[]>('/artists');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Artist>(`/artists/${id}`);
    return response.data;
  },

  create: async (artist: Partial<Artist>) => {
    const response = await api.post<Artist>('/artists', artist);
    return response.data;
  },

  update: async (id: string, artist: Partial<Artist>) => {
    const response = await api.put<Artist>(`/artists/${id}`, artist);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/artists/${id}`);
  },
};

// Sessions API
export const sessionsApi = {
  getAll: async (artistId?: string) => {
    const response = await api.get<Session[]>('/sessions', {
      params: { artist_id: artistId },
    });
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Session>(`/sessions/${id}`);
    return response.data;
  },

  create: async (session: Partial<Session>) => {
    const response = await api.post<Session>('/sessions', session);
    return response.data;
  },

  update: async (id: string, session: Partial<Session>) => {
    const response = await api.put<Session>(`/sessions/${id}`, session);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/sessions/${id}`);
  },

  // Break management
  addBreak: async (sessionId: string, startTime: Date) => {
    const response = await api.post(`/sessions/${sessionId}/breaks`, { start_time: startTime });
    return response.data;
  },

  endBreak: async (sessionId: string, breakId: string, endTime: Date, duration: number) => {
    const response = await api.put(`/sessions/${sessionId}/breaks/${breakId}`, {
      end_time: endTime,
      duration,
    });
    return response.data;
  },
};

// Settings API
export const settingsApi = {
  get: async () => {
    const response = await api.get<Settings>('/settings');
    return response.data;
  },

  update: async (settings: Partial<Settings>) => {
    const response = await api.put<Settings>('/settings', settings);
    return response.data;
  },
};

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error?.message || 'An error occurred';
    // You can integrate this with your toast notification system
    console.error('API Error:', message);
    return Promise.reject(error);
  }
); 