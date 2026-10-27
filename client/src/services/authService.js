import { storage } from './storage';
import { delay } from './api';

export const authService = {
  login: async (email, password) => {
    await delay(250);
    const users = storage.getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      throw new Error('User not found with this email. You can use any demo account.');
    }
    storage.setCurrentUser(user);
    return user;
  },

  register: async (userData) => {
    await delay(300);
    const users = storage.getUsers();
    const existing = users.find((u) => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      role: userData.role || 'student',
      pastRoleHistory: [],
      currentWorkload: 0,
      ...userData
    };

    users.push(newUser);
    storage.setUsers(users);
    storage.setCurrentUser(newUser);
    return newUser;
  },

  getCurrentUser: () => {
    return storage.getCurrentUser();
  },

  switchUser: (userId) => {
    const users = storage.getUsers();
    const user = users.find((u) => u.id === userId);
    if (user) {
      storage.setCurrentUser(user);
      return user;
    }
    return null;
  },

  logout: async () => {
    await delay(100);
    // Don't erase users, just clear current session or default to student
    const student = storage.getUsers().find((u) => u.role === 'student');
    storage.setCurrentUser(student || null);
  },

  getAllUsers: () => {
    return storage.getUsers();
  },

  getFacultyMembers: () => {
    return storage.getUsers().filter((u) => u.role === 'faculty');
  }
};

export default authService;
