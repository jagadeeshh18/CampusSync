export const initialUsers = [
  {
    id: 'usr-admin-1',
    name: 'Dr. Vikram Malhotra',
    email: 'admin@college.edu',
    role: 'admin',
    department: 'Dean of Academics',
    designation: 'Dean of Student & Academic Affairs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-org-1',
    name: 'Alex Rivera',
    email: 'alex.rivera@acm.college.edu',
    role: 'organizer',
    department: 'Computer Science & Engineering',
    designation: 'ACM Chapter Lead',
    clubId: 'club-1',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-org-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@robotics.college.edu',
    role: 'organizer',
    department: 'Electronics & Communication Engineering',
    designation: 'Robotics Society President',
    clubId: 'club-2',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-1',
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@college.edu',
    role: 'faculty',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'Cloud Systems'],
    experienceYears: 12,
    currentWorkload: 3,
    pastRoleHistory: [
      { role: 'judge', count: 5 },
      { role: 'evaluator', count: 3 },
      { role: 'session chair', count: 4 }
    ],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-2',
    name: 'Prof. Robert Chen',
    email: 'robert.chen@college.edu',
    role: 'faculty',
    department: 'Computer Science & Engineering',
    designation: 'Assistant Professor',
    expertise: ['Cybersecurity', 'Algorithms', 'Fullstack Web Architectures'],
    experienceYears: 8,
    currentWorkload: 1,
    pastRoleHistory: [
      { role: 'judge', count: 4 },
      { role: 'coordinator', count: 3 }
    ],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-3',
    name: 'Dr. Ananya Sen',
    email: 'ananya.sen@college.edu',
    role: 'faculty',
    department: 'Data Science & AI',
    designation: 'Professor',
    expertise: ['Deep Learning', 'Computer Vision', 'Generative AI', 'NLP'],
    experienceYears: 15,
    currentWorkload: 2,
    pastRoleHistory: [
      { role: 'judge', count: 6 },
      { role: 'session chair', count: 7 },
      { role: 'evaluator', count: 4 }
    ],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-4',
    name: 'Prof. Michael Vance',
    email: 'michael.vance@college.edu',
    role: 'faculty',
    department: 'Electronics & Communication Engineering',
    designation: 'Associate Professor',
    expertise: ['Embedded Systems', 'IoT Devices', 'Autonomous Drones', 'VLSI'],
    experienceYears: 10,
    currentWorkload: 2,
    pastRoleHistory: [
      { role: 'coordinator', count: 5 },
      { role: 'judge', count: 2 }
    ],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-5',
    name: 'Dr. Kavita Nair',
    email: 'kavita.nair@college.edu',
    role: 'faculty',
    department: 'Information Technology',
    designation: 'Assistant Professor',
    expertise: ['Cloud Infrastructure', 'DevOps', 'Mobile Applications'],
    experienceYears: 7,
    currentWorkload: 1,
    pastRoleHistory: [
      { role: 'evaluator', count: 4 },
      { role: 'coordinator', count: 3 },
      { role: 'judge', count: 2 }
    ],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'fac-6',
    name: 'Dr. Rajesh Verma',
    email: 'rajesh.verma@college.edu',
    role: 'faculty',
    department: 'Mechanical Engineering',
    designation: 'Professor & HOD',
    expertise: ['Robotics Kinematics', 'Mechatronics', 'CAD/CAM Modeling'],
    experienceYears: 18,
    currentWorkload: 4,
    pastRoleHistory: [
      { role: 'session chair', count: 4 },
      { role: 'judge', count: 3 }
    ],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-student-1',
    name: 'Jordan Lee',
    email: 'jordan.lee@student.college.edu',
    role: 'student',
    department: 'Computer Science & Engineering',
    designation: 'Final Year B.Tech Student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  }
];

export const initialClubs = [
  {
    id: 'club-1',
    name: 'ACM Student Chapter',
    category: 'Technical',
    lead: 'Alex Rivera',
    description: 'Premier computing society hosting hackathons, competitive programming contests, and software development bootcamps.',
    membersCount: 180,
    logo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    contactEmail: 'acm@college.edu'
  },
  {
    id: 'club-2',
    name: 'IEEE Robotics Society',
    category: 'Hardware & Robotics',
    lead: 'Priya Sharma',
    description: 'Pioneering hands-on robotics workshops, RoboWars tournaments, and autonomous drone innovations.',
    membersCount: 140,
    logo: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
    contactEmail: 'robotics@college.edu'
  },
  {
    id: 'club-3',
    name: 'GDSC (Google Developer Student Club)',
    category: 'Innovation & AI',
    lead: 'Ethan Miller',
    description: 'Empowering students to build impactful solutions with Google technologies, Cloud, Flutter, and Gemini AI.',
    membersCount: 220,
    logo: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80',
    contactEmail: 'gdsc@college.edu'
  },
  {
    id: 'club-4',
    name: 'Cultural & Literary Guild',
    category: 'Cultural',
    lead: 'Maya Joshi',
    description: 'Celebrating arts, poetry, theatre, and college cultural festivals.',
    membersCount: 110,
    logo: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=150&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
    contactEmail: 'cultural@college.edu'
  }
];

export const initialDepartments = [
  { id: 'dept-1', name: 'Computer Science & Engineering', code: 'CSE', hod: 'Dr. Ramesh Sundaram', facultyCount: 32 },
  { id: 'dept-2', name: 'Electronics & Communication Engineering', code: 'ECE', hod: 'Dr. Michael Vance', facultyCount: 28 },
  { id: 'dept-3', name: 'Data Science & AI', code: 'DSAI', hod: 'Dr. Ananya Sen', facultyCount: 18 },
  { id: 'dept-4', name: 'Information Technology', code: 'IT', hod: 'Dr. Kavita Nair', facultyCount: 22 },
  { id: 'dept-5', name: 'Mechanical Engineering', code: 'MECH', hod: 'Dr. Rajesh Verma', facultyCount: 24 }
];

export const initialEvents = [
  {
    id: 'evt-101',
    title: 'HackSprint 2026: 36-Hour National Hackathon',
    clubId: 'club-1',
    clubName: 'ACM Student Chapter',
    category: 'Hackathon',
    description: 'The flagship national hackathon of CampusSync! Build groundbreaking software solutions spanning Generative AI, Web3, FinTech, and Smart Campus infrastructure. Includes mentorship, cash prizes up to $5,000, and corporate sponsorship opportunities.',
    banner: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
    startDate: '2026-11-15T09:00:00',
    endDate: '2026-11-16T21:00:00',
    venue: 'Grand Tech Auditorium & Labs 1-4',
    registrationLink: 'https://forms.gle/hacksprint2026-demo-registration',
    registrationDeadline: '2026-11-10T23:59:00',
    maxParticipants: 500,
    status: 'published',
    createdBy: 'usr-org-1'
  },
  {
    id: 'evt-102',
    title: 'RoboWars & Autonomous Drone Arena',
    clubId: 'club-2',
    clubName: 'IEEE Robotics Society',
    category: 'Technical',
    description: 'Engineered for adrenaline! Witness combat bots clash in the metal arena, followed by high-speed FPV autonomous drone obstacle course navigation. Heavyweight & featherweight brackets.',
    banner: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80',
    startDate: '2026-11-20T10:00:00',
    endDate: '2026-11-20T18:00:00',
    venue: 'Open-Air Amphitheatre Ground',
    registrationLink: 'https://forms.gle/robowars-2026-registration',
    registrationDeadline: '2026-11-18T18:00:00',
    maxParticipants: 200,
    status: 'published',
    createdBy: 'usr-org-2'
  },
  {
    id: 'evt-103',
    title: 'AI Frontiers: International Research Symposium',
    clubId: 'club-3',
    clubName: 'GDSC (Google Developer Student Club)',
    category: 'Symposium',
    description: 'A prestigious forum bringing together distinguished professors, industry researchers, and student scholars to present peer-reviewed papers on Foundation Models, Neural Graphics, and Agentic AI.',
    banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
    startDate: '2026-12-05T09:30:00',
    endDate: '2026-12-05T17:30:00',
    venue: 'Innovation & Research Tower, Hall A',
    registrationLink: 'https://forms.gle/ai-frontiers-symposium',
    registrationDeadline: '2026-12-01T23:59:00',
    maxParticipants: 350,
    status: 'published',
    createdBy: 'usr-org-1'
  },
  {
    id: 'evt-104',
    title: 'DesignVerse: Modern UI/UX & Web Performance Workshop',
    clubId: 'club-1',
    clubName: 'ACM Student Chapter',
    category: 'Workshop',
    description: 'An interactive hands-on masterclass mastering modern design systems, fluid micro-interactions, responsive CSS layouts, and performance auditing.',
    banner: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&auto=format&fit=crop&q=80',
    startDate: '2026-12-12T14:00:00',
    endDate: '2026-12-12T18:00:00',
    venue: 'Computing Center, Lab 6',
    registrationLink: 'https://forms.gle/designverse-workshop',
    registrationDeadline: '2026-12-11T12:00:00',
    maxParticipants: 80,
    status: 'published',
    createdBy: 'usr-org-1'
  }
];

export const initialRoles = [
  {
    id: 'role-101',
    eventId: 'evt-101',
    roleType: 'judge',
    title: 'Grand Finale Evaluation Judge',
    description: 'Lead jury member evaluating final hackathon pitch presentations, code architecture, and originality.',
    facultyId: 'fac-1', // Dr. Sarah Jenkins
    status: 'unavailable', // Triggered substitute allocation requirement!
    assignedAt: '2026-10-20T10:00:00Z',
    unavailabilityReason: 'Attending IEEE Global AI Conference in Tokyo from Nov 14 - Nov 18.'
  },
  {
    id: 'role-102',
    eventId: 'evt-101',
    roleType: 'coordinator',
    title: 'Technical Infrastructure Coordinator',
    description: 'Oversees campus server provisioning, internet bandwidth, and API access throughout the 36 hours.',
    facultyId: 'fac-2', // Prof. Robert Chen
    status: 'confirmed',
    assignedAt: '2026-10-20T10:00:00Z'
  },
  {
    id: 'role-103',
    eventId: 'evt-101',
    roleType: 'evaluator',
    title: 'Milestone 1 & 2 Progress Evaluator',
    description: 'Conducts checkpoint reviews at Hour 12 and Hour 24 to verify implementation progress.',
    facultyId: 'fac-5', // Dr. Kavita Nair
    status: 'confirmed',
    assignedAt: '2026-10-21T11:00:00Z'
  },
  {
    id: 'role-104',
    eventId: 'evt-102',
    roleType: 'coordinator',
    title: 'Arena Safety & Specs Coordinator',
    description: 'Inspects fighting bots for weight class compliance and activates arena safety perimeter.',
    facultyId: 'fac-4', // Prof. Michael Vance
    status: 'confirmed',
    assignedAt: '2026-10-22T09:30:00Z'
  },
  {
    id: 'role-105',
    eventId: 'evt-102',
    roleType: 'judge',
    title: 'Combat Scoring & Match Referee Judge',
    description: 'Awards points for aggression, control, and damage in combat rounds; assesses drone obstacle times.',
    facultyId: 'fac-6', // Dr. Rajesh Verma
    status: 'confirmed',
    assignedAt: '2026-10-22T09:30:00Z'
  },
  {
    id: 'role-106',
    eventId: 'evt-103',
    roleType: 'session chair',
    title: 'Keynote & Generative AI Session Chair',
    description: 'Introduces keynote speakers, moderates academic paper Q&A sessions, and manages time limits.',
    facultyId: 'fac-3', // Dr. Ananya Sen
    status: 'confirmed',
    assignedAt: '2026-10-23T14:00:00Z'
  },
  {
    id: 'role-107',
    eventId: 'evt-104',
    roleType: 'coordinator',
    title: 'Workshop Session Mentor & Coordinator',
    description: 'Guides participants during interactive exercises and awards certification of completion.',
    facultyId: 'fac-5', // Dr. Kavita Nair
    status: 'confirmed',
    assignedAt: '2026-10-24T16:00:00Z'
  }
];

export const initialSubstituteRequests = [
  {
    id: 'sub-req-1',
    eventId: 'evt-101',
    eventTitle: 'HackSprint 2026: 36-Hour National Hackathon',
    roleId: 'role-101',
    roleTitle: 'Grand Finale Evaluation Judge',
    roleType: 'judge',
    originalFacultyId: 'fac-1',
    originalFacultyName: 'Dr. Sarah Jenkins',
    originalFacultyDept: 'Computer Science & Engineering',
    reason: 'Attending IEEE Global AI Conference in Tokyo from Nov 14 - Nov 18.',
    status: 'pending',
    requestedAt: '2026-10-27T14:20:00Z',
    selectedSubstituteId: null,
    reviewedBy: null,
    reviewedAt: null
  }
];

export const initialNotifications = [
  {
    id: 'notif-1',
    userId: 'usr-org-1',
    title: 'Faculty Unavailability Reported',
    message: 'Dr. Sarah Jenkins marked herself unavailable for Grand Finale Evaluation Judge at HackSprint 2026.',
    type: 'warning',
    link: '/organizer/substitutes',
    read: false,
    createdAt: '2026-10-27T14:20:00Z'
  },
  {
    id: 'notif-2',
    userId: 'usr-org-1',
    title: 'Gemini AI Substitute Recommendations Ready',
    message: 'Google Gemini ranked 3 ideal substitute candidates for HackSprint 2026 with 90%+ match scores.',
    type: 'ai',
    link: '/organizer/substitutes',
    read: false,
    createdAt: '2026-10-27T14:21:00Z'
  },
  {
    id: 'notif-3',
    userId: 'fac-2',
    title: 'Role Assignment Confirmed',
    message: 'You have been assigned as Technical Infrastructure Coordinator for HackSprint 2026.',
    type: 'info',
    link: '/faculty/my-roles',
    read: true,
    createdAt: '2026-10-20T10:00:00Z'
  }
];

export const initialAvailability = [
  { facultyId: 'fac-1', date: '2026-11-15', status: 'leave', note: 'IEEE Conference Tokyo' },
  { facultyId: 'fac-1', date: '2026-11-16', status: 'leave', note: 'IEEE Conference Tokyo' },
  { facultyId: 'fac-2', date: '2026-11-15', status: 'available', note: 'HackSprint Event' },
  { facultyId: 'fac-2', date: '2026-11-16', status: 'available', note: 'HackSprint Event' },
  { facultyId: 'fac-3', date: '2026-11-15', status: 'available', note: 'Free for judging duties' },
  { facultyId: 'fac-5', date: '2026-11-15', status: 'available', note: 'Evaluating hackathon' }
];
