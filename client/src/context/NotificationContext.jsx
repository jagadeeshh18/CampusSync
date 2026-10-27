import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { notificationService } from '../services/notificationService';
import { SocketContext } from './SocketContext';

export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const socket = useContext(SocketContext);
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);

  const refreshNotifications = async () => {
    if (!user) return;
    const notifs = await notificationService.getUserNotifications(user.id);
    setNotifications(notifs);
  };

  useEffect(() => {
    refreshNotifications();
  }, [user]);

  // Listen for socket events to show real-time toasts and update notification list
  useEffect(() => {
    if (!socket) return;

    const handleRoleUpdate = (data) => {
      refreshNotifications();
      addToast({
        title: 'Role Allocation Update',
        message: data.message || 'A faculty assignment was updated.',
        type: 'info'
      });
    };

    const handleSubstituteRequested = (data) => {
      refreshNotifications();
      addToast({
        title: 'New Substitute Request',
        message: data.message || 'A substitute request was submitted.',
        type: 'warning'
      });
    };

    const handleSubstituteApproved = (data) => {
      refreshNotifications();
      addToast({
        title: 'Substitute Approved!',
        message: data.message || 'A substitute has been confirmed and assigned.',
        type: 'success'
      });
    };

    const unsub1 = socket.on('ROLE_UPDATED', handleRoleUpdate);
    const unsub2 = socket.on('SUBSTITUTE_REQUESTED', handleSubstituteRequested);
    const unsub3 = socket.on('SUBSTITUTE_APPROVED', handleSubstituteApproved);

    return () => {
      unsub1 && unsub1();
      unsub2 && unsub2();
      unsub3 && unsub3();
    };
  }, [socket, user]);

  const addToast = ({ title, message, type = 'info', duration = 4500 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    const newToast = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markAsRead = async (id) => {
    await notificationService.markAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = async () => {
    if (!user) return;
    await notificationService.markAllAsRead(user.id);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        toasts,
        addToast,
        removeToast,
        markAsRead,
        markAllAsRead,
        refreshNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
