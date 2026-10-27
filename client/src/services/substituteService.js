import { storage } from './storage';
import { delay } from './api';
import { getGeminiSubstituteRecommendations } from './geminiService';

export const substituteService = {
  getRequests: async () => {
    await delay(100);
    return storage.getSubstitutes();
  },

  getRequestById: async (id) => {
    await delay(100);
    const requests = storage.getSubstitutes();
    return requests.find((r) => r.id === id) || null;
  },

  getSuggestions: async (requestId) => {
    const requests = storage.getSubstitutes();
    const req = requests.find((r) => r.id === requestId);
    if (!req) throw new Error('Substitute request not found');

    const events = storage.getEvents();
    const roles = storage.getRoles();
    const users = storage.getUsers();

    const event = events.find((e) => e.id === req.eventId);
    const role = roles.find((r) => r.id === req.roleId);
    const originalFaculty = users.find((u) => u.id === req.originalFacultyId);
    const allFaculty = users.filter((u) => u.role === 'faculty');

    return getGeminiSubstituteRecommendations({
      event: event || { title: req.eventTitle, startDate: '' },
      role: role || { title: req.roleTitle, roleType: req.roleType },
      originalFaculty: originalFaculty || { id: req.originalFacultyId, department: req.originalFacultyDept },
      allFaculty
    });
  },

  approveSubstitute: async (requestId, newFacultyId, approvedByUserId) => {
    await delay(300);
    const requests = storage.getSubstitutes();
    const reqIndex = requests.findIndex((r) => r.id === requestId);
    if (reqIndex === -1) throw new Error('Substitute request not found');

    const req = requests[reqIndex];
    const users = storage.getUsers();
    const newFaculty = users.find((u) => u.id === newFacultyId);
    const approver = users.find((u) => u.id === approvedByUserId);

    // Update request
    requests[reqIndex] = {
      ...req,
      status: 'approved',
      selectedSubstituteId: newFacultyId,
      selectedSubstituteName: newFaculty?.name || 'Substitute Faculty',
      reviewedBy: approver?.name || 'Organizer',
      reviewedAt: new Date().toISOString()
    };
    storage.setSubstitutes(requests);

    // Update the Role Assignment
    const roles = storage.getRoles();
    const roleIndex = roles.findIndex((r) => r.id === req.roleId);
    if (roleIndex !== -1) {
      roles[roleIndex] = {
        ...roles[roleIndex],
        facultyId: newFacultyId,
        status: 'confirmed',
        substitutedFrom: req.originalFacultyId,
        assignedAt: new Date().toISOString()
      };
      storage.setRoles(roles);
    }

    // Workload updates
    if (newFaculty) {
      newFaculty.currentWorkload = (newFaculty.currentWorkload || 0) + 1;
      storage.setUsers(users);
    }

    // Broadcast Notifications
    const notifs = storage.getNotifications();
    const timestamp = new Date().toISOString();

    // 1. Notify the new substitute
    notifs.unshift({
      id: `notif-${Date.now()}-1`,
      userId: newFacultyId,
      title: 'Substitute Role Assigned',
      message: `You have been assigned as substitute for "${req.roleTitle}" at ${req.eventTitle}.`,
      type: 'info',
      link: '/faculty/my-roles',
      read: false,
      createdAt: timestamp
    });

    // 2. Notify original faculty
    notifs.unshift({
      id: `notif-${Date.now()}-2`,
      userId: req.originalFacultyId,
      title: 'Substitute Confirmed',
      message: `Substitute approved for "${req.roleTitle}". ${newFaculty?.name} has assumed the responsibility.`,
      type: 'success',
      link: '/faculty/my-roles',
      read: false,
      createdAt: timestamp
    });

    // 3. Notify organizer
    notifs.unshift({
      id: `notif-${Date.now()}-3`,
      userId: approvedByUserId || 'usr-org-1',
      title: 'Substitution Approved',
      message: `Successfully allocated ${newFaculty?.name} to "${req.roleTitle}" for ${req.eventTitle}.`,
      type: 'success',
      link: '/organizer/substitutes',
      read: false,
      createdAt: timestamp
    });

    storage.setNotifications(notifs);

    return requests[reqIndex];
  },

  rejectRequest: async (requestId) => {
    await delay(200);
    const requests = storage.getSubstitutes();
    const reqIndex = requests.findIndex((r) => r.id === requestId);
    if (reqIndex === -1) throw new Error('Substitute request not found');

    requests[reqIndex] = {
      ...requests[reqIndex],
      status: 'rejected',
      reviewedAt: new Date().toISOString()
    };
    storage.setSubstitutes(requests);
    return requests[reqIndex];
  }
};

export default substituteService;
