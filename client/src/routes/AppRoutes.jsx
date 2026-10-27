import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Common
import ProtectedRoute from '../components/common/ProtectedRoute';

// Public Pages
import Home from '../pages/public/Home';
import Events from '../pages/public/Events';
import EventDetails from '../pages/public/EventDetails';
import Clubs from '../pages/public/Clubs';
import ClubDetails from '../pages/public/ClubDetails';
import About from '../pages/public/About';
import NotFound from '../pages/public/NotFound';

// Auth Pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Faculty Pages
import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import MyRoles from '../pages/faculty/MyRoles';
import MyAvailability from '../pages/faculty/MyAvailability';
import Notifications from '../pages/faculty/Notifications';

// Organizer Pages
import OrganizerDashboard from '../pages/organizer/OrganizerDashboard';
import CreateEvent from '../pages/organizer/CreateEvent';
import EditEvent from '../pages/organizer/EditEvent';
import ManageRoles from '../pages/organizer/ManageRoles';
import AssignFaculty from '../pages/organizer/AssignFaculty';
import SubstituteRequests from '../pages/organizer/SubstituteRequests';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageClubs from '../pages/admin/ManageClubs';
import ManageDepartments from '../pages/admin/ManageDepartments';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/:id" element={<ClubDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Faculty Portal with DashboardLayout */}
      <Route
        path="/faculty"
        element={
          <ProtectedRoute allowedRoles={['faculty', 'admin', 'organizer']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<FacultyDashboard />} />
        <Route path="my-roles" element={<MyRoles />} />
        <Route path="availability" element={<MyAvailability />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      {/* Organizer Portal with DashboardLayout */}
      <Route
        path="/organizer"
        element={
          <ProtectedRoute allowedRoles={['organizer', 'admin', 'faculty']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OrganizerDashboard />} />
        <Route path="create-event" element={<CreateEvent />} />
        <Route path="edit-event/:id" element={<EditEvent />} />
        <Route path="manage-roles" element={<ManageRoles />} />
        <Route path="manage-roles/:eventId" element={<ManageRoles />} />
        <Route path="assign-faculty" element={<AssignFaculty />} />
        <Route path="substitutes" element={<SubstituteRequests />} />
      </Route>

      {/* Super Admin Portal with DashboardLayout */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin', 'organizer']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="clubs" element={<ManageClubs />} />
        <Route path="departments" element={<ManageDepartments />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
