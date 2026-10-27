export const USER_ROLES = {
  STUDENT: 'student',
  FACULTY: 'faculty',
  ORGANIZER: 'organizer',
  ADMIN: 'admin'
};

export const FACULTY_ROLES = {
  JUDGE: 'judge',
  COORDINATOR: 'coordinator',
  SESSION_CHAIR: 'session chair',
  EVALUATOR: 'evaluator'
};

export const SUBSTITUTE_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  CANCELLED: 'cancelled'
};

export const AVAILABILITY_STATUS = {
  AVAILABLE: 'available',
  BUSY: 'busy',
  LEAVE: 'leave'
};

export const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Electronics & Communication Engineering',
  'Information Technology',
  'Mechanical Engineering',
  'Electrical & Electronics Engineering',
  'Biotechnology',
  'Data Science & AI'
];

export const EVENT_CATEGORIES = [
  'All',
  'Hackathon',
  'Technical',
  'Workshop',
  'Symposium',
  'Cultural',
  'Seminar',
  'Sports'
];

export const STORAGE_KEYS = {
  USERS: 'campussync_users',
  EVENTS: 'campussync_events',
  CLUBS: 'campussync_clubs',
  DEPARTMENTS: 'campussync_departments',
  ROLES: 'campussync_roles',
  AVAILABILITY: 'campussync_availability',
  SUBSTITUTES: 'campussync_substitutes',
  NOTIFICATIONS: 'campussync_notifications',
  CURRENT_USER: 'campussync_current_user',
  THEME: 'campussync_theme',
  GEMINI_API_KEY: 'campussync_gemini_key'
};
