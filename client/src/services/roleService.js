import { storage } from './storage';
import { delay } from './api';

export const roleService = {
  getRolesByEvent: async (eventId) => {
    await delay(100);
    const roles = storage.getRoles();
    const users = storage.getUsers();

    return roles
      .filter((r) => r.eventId === eventId)
      .map((role) => {
        const assignedFaculty = users.find((u) => u.id === role.facultyId);
        return {
          ...role,
          faculty: assignedFaculty || null
        };
      });
  },

  getRolesByFaculty: async (facultyId) => {
    await delay(100);
    const roles = storage.getRoles();
    const events = storage.getEvents();

    return roles
      .filter((r) => r.facultyId === facultyId)
      .map((role) => {
        const event = events.find((e) => e.id === role.eventId);
        return {
          ...role,
          event: event || null
        };
      });
  },

  getAllRoles: async () => {
    await delay(100);
    const roles = storage.getRoles();
    const users = storage.getUsers();
    const events = storage.getEvents();

    return roles.map((role) => ({
      ...role,
      faculty: users.find((u) => u.id === role.facultyId) || null,
      event: events.find((e) => e.id === role.eventId) || null
    }));
  },

  createRole: async (roleData) => {
    await delay(200);
    const roles = storage.getRoles();
    const newRole = {
      id: `role-${Date.now()}`,
      status: roleData.facultyId ? 'confirmed' : 'unassigned',
      assignedAt: roleData.facultyId ? new Date().toISOString() : null,
      ...roleData
    };
    roles.push(newRole);
    storage.setRoles(roles);
    return newRole;
  },

  updateRole: async (id, roleData) => {
    await delay(200);
    const roles = storage.getRoles();
    const index = roles.findIndex((r) => r.id === id);
    if (index === -1) throw new Error('Role not found');
    roles[index] = { ...roles[index], ...roleData };
    storage.setRoles(roles);
    return roles[index];
  },

  deleteRole: async (id) => {
    await delay(150);
    let roles = storage.getRoles();
    roles = roles.filter((r) => r.id !== id);
    storage.setRoles(roles);
    return true;
  },

  assignFacultyToRole: async (roleId, facultyId) => {
    await delay(200);
    const roles = storage.getRoles();
    const index = roles.findIndex((r) => r.id === roleId);
    if (index === -1) throw new Error('Role not found');

    roles[index] = {
      ...roles[index],
      facultyId,
      status: 'confirmed',
      assignedAt: new Date().toISOString(),
      unavailabilityReason: null
    };

    storage.setRoles(roles);
    return roles[index];
  },

  reportUnavailability: async (roleId, facultyId, reason) => {
    await delay(250);
    const roles = storage.getRoles();
    const index = roles.findIndex((r) => r.id === roleId);
    if (index === -1) throw new Error('Role not found');

    roles[index] = {
      ...roles[index],
      status: 'unavailable',
      unavailabilityReason: reason
    };
    storage.setRoles(roles);

    // Automatically trigger a Substitute Request
    const events = storage.getEvents();
    const users = storage.getUsers();
    const event = events.find((e) => e.id === roles[index].eventId);
    const faculty = users.find((u) => u.id === facultyId);

    const subs = storage.getSubstitutes();
    const newSubReq = {
      id: `sub-req-${Date.now()}`,
      eventId: event?.id,
      eventTitle: event?.title || 'Unknown Event',
      roleId: roles[index].id,
      roleTitle: roles[index].title,
      roleType: roles[index].roleType,
      originalFacultyId: facultyId,
      originalFacultyName: faculty?.name || 'Faculty Member',
      originalFacultyDept: faculty?.department || 'Department',
      reason,
      status: 'pending',
      requestedAt: new Date().toISOString(),
      selectedSubstituteId: null
    };

    subs.unshift(newSubReq);
    storage.setSubstitutes(subs);

    // Create notification for event organizer
    const notifs = storage.getNotifications();
    notifs.unshift({
      id: `notif-${Date.now()}`,
      userId: event?.createdBy || 'usr-org-1',
      title: 'Faculty Unavailability Reported',
      message: `${faculty?.name} reported unavailability for "${roles[index].title}". Gemini AI substitute suggestions are ready.`,
      type: 'warning',
      link: '/organizer/substitutes',
      read: false,
      createdAt: new Date().toISOString()
    });
    storage.setNotifications(notifs);

    return { role: roles[index], substituteRequest: newSubReq };
  }
};

export default roleService;
