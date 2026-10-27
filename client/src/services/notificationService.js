import { storage } from './storage';
import { delay } from './api';

export const notificationService = {
  getUserNotifications: async (userId) => {
    await delay(100);
    const notifs = storage.getNotifications();
    return notifs.filter((n) => !userId || n.userId === userId);
  },

  markAsRead: async (id) => {
    const notifs = storage.getNotifications();
    const index = notifs.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifs[index].read = true;
      storage.setNotifications(notifs);
    }
    return notifs;
  },

  markAllAsRead: async (userId) => {
    const notifs = storage.getNotifications();
    notifs.forEach((n) => {
      if (!userId || n.userId === userId) {
        n.read = true;
      }
    });
    storage.setNotifications(notifs);
    return notifs;
  },

  addNotification: async (notifData) => {
    const notifs = storage.getNotifications();
    const newNotif = {
      id: `notif-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString(),
      ...notifData
    };
    notifs.unshift(newNotif);
    storage.setNotifications(notifs);
    return newNotif;
  }
};

export default notificationService;
