import {
  initialUsers,
  initialClubs,
  initialDepartments,
  initialEvents,
  initialRoles,
  initialSubstituteRequests,
  initialNotifications,
  initialAvailability
} from './mockData';
import { STORAGE_KEYS } from '../utils/constants';

class StorageService {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      this.resetToDefaults();
    }
  }

  resetToDefaults() {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialUsers));
    localStorage.setItem(STORAGE_KEYS.CLUBS, JSON.stringify(initialClubs));
    localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(initialDepartments));
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(initialEvents));
    localStorage.setItem(STORAGE_KEYS.ROLES, JSON.stringify(initialRoles));
    localStorage.setItem(STORAGE_KEYS.SUBSTITUTES, JSON.stringify(initialSubstituteRequests));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(initialNotifications));
    localStorage.setItem(STORAGE_KEYS.AVAILABILITY, JSON.stringify(initialAvailability));
    // Default logged in user: Alex Rivera (Organizer)
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(initialUsers[1]));
    }
  }

  getItem(key, fallback = []) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error(`Error reading ${key} from storage:`, e);
      return fallback;
    }
  }

  setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error saving ${key} to storage:`, e);
    }
  }

  // Users
  getUsers() { return this.getItem(STORAGE_KEYS.USERS, initialUsers); }
  setUsers(users) { this.setItem(STORAGE_KEYS.USERS, users); }
  getCurrentUser() { return this.getItem(STORAGE_KEYS.CURRENT_USER, initialUsers[1]); }
  setCurrentUser(user) { this.setItem(STORAGE_KEYS.CURRENT_USER, user); }

  // Events
  getEvents() { return this.getItem(STORAGE_KEYS.EVENTS, initialEvents); }
  setEvents(events) { this.setItem(STORAGE_KEYS.EVENTS, events); }

  // Clubs
  getClubs() { return this.getItem(STORAGE_KEYS.CLUBS, initialClubs); }
  setClubs(clubs) { this.setItem(STORAGE_KEYS.CLUBS, clubs); }

  // Departments
  getDepartments() { return this.getItem(STORAGE_KEYS.DEPARTMENTS, initialDepartments); }
  setDepartments(depts) { this.setItem(STORAGE_KEYS.DEPARTMENTS, depts); }

  // Roles
  getRoles() { return this.getItem(STORAGE_KEYS.ROLES, initialRoles); }
  setRoles(roles) { this.setItem(STORAGE_KEYS.ROLES, roles); }

  // Substitutes
  getSubstitutes() { return this.getItem(STORAGE_KEYS.SUBSTITUTES, initialSubstituteRequests); }
  setSubstitutes(subs) { this.setItem(STORAGE_KEYS.SUBSTITUTES, subs); }

  // Notifications
  getNotifications() { return this.getItem(STORAGE_KEYS.NOTIFICATIONS, initialNotifications); }
  setNotifications(notifs) { this.setItem(STORAGE_KEYS.NOTIFICATIONS, notifs); }

  // Availability
  getAvailability() { return this.getItem(STORAGE_KEYS.AVAILABILITY, initialAvailability); }
  setAvailability(avail) { this.setItem(STORAGE_KEYS.AVAILABILITY, avail); }
}

export const storage = new StorageService();
