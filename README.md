# AI-Assisted Event and Faculty Role Management System with Smart Substitute Allocation

A centralized college event management and faculty role allocation platform powered by MongoDB, Express.js, React (Vite), Node.js, Socket.io, and Google Gemini API.

---

## Project Overview
- **Centralized Event Platform**: College clubs and student organizers publish events with schedules, venues, and descriptions. Students can browse events, inspect assigned faculty roles and responsibilities, and click a button that redirects to the external event registration link/form.
- **Faculty Role Management**: Organizers create events and define roles (judge, coordinator, session chair, evaluator) along with role descriptions, then assign faculty to those roles.
- **Smart Substitute Allocation**: If a faculty member marks themselves unavailable (or is marked absent by an organizer), the system uses the Google Gemini API to suggest suitable substitutes from eligible faculty based on department, availability, and prior role history.
- **Real-Time Notifications**: Instant updates via Socket.io alerting organizers and substitutes about requests and approvals.

---

## Tech Stack
- **Database**: MongoDB (Mongoose)
- **Backend**: Node.js, Express.js
- **Frontend**: React (Vite)
- **Real-Time**: Socket.io
- **AI Engine**: Google Gemini API
- **Language**: JavaScript (ES6+)

---

## Project Structure

```text
project-root/
├── client/                              # Frontend React (Vite) Application
│   ├── public/                          # Static public assets
│   ├── src/
│   │   ├── assets/                      # Application media assets (images, icons)
│   │   │   ├── icons/
│   │   │   └── images/
│   │   ├── components/                  # Reusable modular UI components
│   │   │   ├── admin/                   # Administrative and organizer forms/tables
│   │   │   ├── clubs/                   # Club presentation and card components
│   │   │   ├── common/                  # Shared components (Navbar, Footer, Loader, etc.)
│   │   │   ├── events/                  # Event listings, cards, filters, and role viewers
│   │   │   ├── faculty/                 # Faculty availability calendar and assignment cards
│   │   │   └── substitute/              # AI substitute recommendation cards and approval panels
│   │   ├── context/                     # React context providers (Auth, Notifications, Sockets)
│   │   ├── hooks/                       # Custom React hooks
│   │   ├── layouts/                     # Page layout wrappers (MainLayout, DashboardLayout)
│   │   ├── pages/                       # Application view pages
│   │   │   ├── admin/                   # Super Admin control pages
│   │   │   ├── auth/                    # Authentication views (Login, Register)
│   │   │   ├── faculty/                 # Faculty portal views
│   │   │   ├── organizer/               # Club Organizer management views
│   │   │   └── public/                  # Public browsing views (Home, Events, Clubs, etc.)
│   │   ├── routes/                      # Route configuration (AppRoutes.jsx)
│   │   ├── services/                    # Axios API client services
│   │   ├── styles/                      # Global styles and resets (global.css)
│   │   ├── utils/                       # Client helper utilities and constants
│   │   ├── App.jsx                      # App root component
│   │   └── main.jsx                     # Vite React entry point
│   ├── index.html                       # HTML5 entry document
│   ├── .env.example                     # Client environment template
│   └── package.json                     # Client dependencies placeholder
│
├── server/                              # Backend Express & Node.js Application
│   ├── src/
│   │   ├── config/                      # Database, environment, Socket.io & Gemini configuration
│   │   ├── controllers/                 # Request handler controllers
│   │   ├── jobs/                        # Scheduled cron/reminder jobs
│   │   ├── middleware/                  # Auth, RBAC, error handling, validation, rate limiting
│   │   ├── models/                      # Mongoose data models
│   │   ├── prompts/                     # Gemini AI prompt templates for substitute ranking
│   │   ├── routes/                      # Express route endpoints
│   │   ├── services/                    # Business logic and external API integrations
│   │   ├── sockets/                     # Socket.io connection handlers and event emitters
│   │   ├── utils/                       # Helper functions and response formatters
│   │   ├── validators/                  # Request payload validation schemas
│   │   └── app.js                       # Express app configuration
│   ├── server.js                        # Server entry point
│   ├── .env.example                     # Server environment template
│   └── package.json                     # Server dependencies placeholder
│
├── .gitignore                           # Git ignore rules
└── README.md                            # Project documentation
```

---

## User Roles
1. **Student (Public Viewer)**: Browse events, view faculty roles/responsibilities, click external registration link.
2. **Faculty**: View assigned roles, manage availability calendar, report unavailability, receive substitution alerts.
3. **Organizer / Club Admin**: Create events, define roles, assign faculty, review AI substitute suggestions, approve substitutes.
4. **Super Admin**: Manage users, clubs, departments, and oversee system operations.
