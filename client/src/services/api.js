import { storage } from './storage';

// Delay helper to emulate network roundtrips
export const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  get: async (endpoint) => {
    await delay();
    return { data: [] };
  },
  post: async (endpoint, data) => {
    await delay();
    return { data };
  },
  put: async (endpoint, data) => {
    await delay();
    return { data };
  },
  delete: async (endpoint) => {
    await delay();
    return { success: true };
  }
};

export default api;
