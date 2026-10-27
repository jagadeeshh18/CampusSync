import { storage } from './storage';
import { delay } from './api';

export const availabilityService = {
  getFacultyAvailability: async (facultyId) => {
    await delay(100);
    const records = storage.getAvailability();
    return records.filter((r) => r.facultyId === facultyId);
  },

  getAllAvailability: async () => {
    await delay(100);
    return storage.getAvailability();
  },

  setSlotStatus: async ({ facultyId, date, status, note = '' }) => {
    await delay(150);
    let records = storage.getAvailability();
    const index = records.findIndex(
      (r) => r.facultyId === facultyId && r.date === date
    );

    if (index !== -1) {
      records[index] = { ...records[index], status, note };
    } else {
      records.push({ facultyId, date, status, note });
    }

    storage.setAvailability(records);
    return records;
  },

  removeSlot: async (facultyId, date) => {
    await delay(100);
    let records = storage.getAvailability();
    records = records.filter(
      (r) => !(r.facultyId === facultyId && r.date === date)
    );
    storage.setAvailability(records);
    return records;
  }
};

export default availabilityService;
