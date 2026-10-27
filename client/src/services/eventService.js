import { storage } from './storage';
import { delay } from './api';

export const eventService = {
  getEvents: async (filters = {}) => {
    await delay(150);
    let events = storage.getEvents();

    if (filters.search) {
      const q = filters.search.toLowerCase();
      events = events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.clubName.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== 'All') {
      events = events.filter(
        (e) => e.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.clubId) {
      events = events.filter((e) => e.clubId === filters.clubId);
    }

    return events;
  },

  getEventById: async (id) => {
    await delay(100);
    const events = storage.getEvents();
    return events.find((e) => e.id === id) || null;
  },

  createEvent: async (eventData) => {
    await delay(250);
    const events = storage.getEvents();
    const newEvent = {
      id: `evt-${Date.now()}`,
      status: 'published',
      banner:
        eventData.banner ||
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
      ...eventData
    };
    events.unshift(newEvent);
    storage.setEvents(events);
    return newEvent;
  },

  updateEvent: async (id, updatedFields) => {
    await delay(200);
    const events = storage.getEvents();
    const index = events.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Event not found');

    events[index] = { ...events[index], ...updatedFields };
    storage.setEvents(events);
    return events[index];
  },

  deleteEvent: async (id) => {
    await delay(200);
    let events = storage.getEvents();
    events = events.filter((e) => e.id !== id);
    storage.setEvents(events);

    // Also remove associated roles
    let roles = storage.getRoles();
    roles = roles.filter((r) => r.eventId !== id);
    storage.setRoles(roles);

    return true;
  },

  // Clubs
  getClubs: async () => {
    await delay(100);
    return storage.getClubs();
  },

  getClubById: async (id) => {
    await delay(100);
    const clubs = storage.getClubs();
    return clubs.find((c) => c.id === id) || null;
  },

  createClub: async (clubData) => {
    await delay(200);
    const clubs = storage.getClubs();
    const newClub = {
      id: `club-${Date.now()}`,
      membersCount: 0,
      logo:
        clubData.logo ||
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&auto=format&fit=crop&q=80',
      banner:
        clubData.banner ||
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
      ...clubData
    };
    clubs.push(newClub);
    storage.setClubs(clubs);
    return newClub;
  },

  updateClub: async (id, clubData) => {
    await delay(200);
    const clubs = storage.getClubs();
    const index = clubs.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Club not found');
    clubs[index] = { ...clubs[index], ...clubData };
    storage.setClubs(clubs);
    return clubs[index];
  },

  deleteClub: async (id) => {
    await delay(200);
    let clubs = storage.getClubs();
    clubs = clubs.filter((c) => c.id !== id);
    storage.setClubs(clubs);
    return true;
  },

  // Departments
  getDepartments: async () => {
    await delay(50);
    return storage.getDepartments();
  }
};

export default eventService;
