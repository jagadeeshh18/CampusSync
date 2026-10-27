import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { storage } from '../services/storage';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [users, setUsers] = useState(() => authService.getAllUsers());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Keep user updated
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setUsers(authService.getAllUsers());
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const loggedIn = await authService.login(email, password);
      setUser(loggedIn);
      return loggedIn;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const newUser = await authService.register(userData);
      setUser(newUser);
      setUsers(authService.getAllUsers());
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    const guestUser = authService.getCurrentUser();
    setUser(guestUser);
  };

  const switchUser = (userId) => {
    const switched = authService.switchUser(userId);
    if (switched) {
      setUser({ ...switched });
    }
  };

  const switchRole = (role) => {
    const allUsers = authService.getAllUsers();
    const targetUser = allUsers.find((u) => u.role === role);
    if (targetUser) {
      switchUser(targetUser.id);
    }
  };

  const resetAllData = () => {
    storage.resetToDefaults();
    setUser(authService.getCurrentUser());
    setUsers(authService.getAllUsers());
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        loading,
        login,
        register,
        logout,
        switchUser,
        switchRole,
        resetAllData,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
