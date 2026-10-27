import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Navbar } from '../components/common/Navbar';
import { Toast } from '../components/common/Toast';
import {
  LayoutDashboard,
  Calendar,
  UserCheck,
  Sparkles,
  PlusCircle,
  Users,
  Building2,
  Bell,
  Layers,
  Shield,
  Menu,
  X,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export const DashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Generate Navigation Items according to User Role
  const getNavItems = () => {
    if (!user) return [];

    if (user.role === 'faculty') {
      return [
        { label: 'Faculty Dashboard', path: '/faculty', icon: <LayoutDashboard size={18} /> },
        { label: 'My Assigned Roles', path: '/faculty/my-roles', icon: <UserCheck size={18} /> },
        { label: 'Availability Calendar', path: '/faculty/availability', icon: <Calendar size={18} /> },
        { label: 'My Notifications', path: '/faculty/notifications', icon: <Bell size={18} /> }
      ];
    }

    if (user.role === 'organizer') {
      return [
        { label: 'Organizer Overview', path: '/organizer', icon: <LayoutDashboard size={18} /> },
        { label: 'Publish New Event', path: '/organizer/create-event', icon: <PlusCircle size={18} /> },
        {
          label: 'AI Substitute Requests',
          path: '/organizer/substitutes',
          icon: <Sparkles size={18} color="#c084fc" />,
          highlight: true
        },
        { label: 'Browse Public Events', path: '/events', icon: <Calendar size={18} /> }
      ];
    }

    if (user.role === 'admin') {
      return [
        { label: 'Admin Overview', path: '/admin', icon: <LayoutDashboard size={18} /> },
        { label: 'Manage Users & Faculty', path: '/admin/users', icon: <Users size={18} /> },
        { label: 'Manage Clubs', path: '/admin/clubs', icon: <Building2 size={18} /> },
        { label: 'Academic Departments', path: '/admin/departments', icon: <Layers size={18} /> },
        {
          label: 'AI Substitute Engine',
          path: '/organizer/substitutes',
          icon: <Sparkles size={18} color="#c084fc" />,
          highlight: true
        }
      ];
    }

    return [];
  };

  const navItems = getNavItems();
  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      <div className="container" style={{ display: 'flex', flex: 1, padding: '24px 1.5rem', gap: '28px' }}>
        {/* Sidebar Navigation */}
        <aside
          className="dashboard-sidebar"
          style={{
            width: '260px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {/* User Profile Summary Card */}
          {user && (
            <div
              className="glass-panel"
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user.name}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                  {user.role} &bull; {user.department ? user.department.split(' ')[0] : ''}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Items */}
          <div className="glass-panel" style={{ padding: '12px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ padding: '6px 12px', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Navigation Menu
            </div>
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: active
                      ? 'var(--primary-gradient)'
                      : item.highlight
                      ? 'rgba(155, 114, 203, 0.12)'
                      : 'transparent',
                    color: active ? '#ffffff' : item.highlight ? '#c084fc' : 'var(--text-secondary)',
                    fontWeight: active || item.highlight ? 600 : 500,
                    fontSize: '0.86rem',
                    transition: 'all 0.15s',
                    textDecoration: 'none'
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Smart AI Info Pill */}
          <div
            className="glass-panel"
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-lg)',
              marginTop: 'auto',
              background: 'linear-gradient(135deg, rgba(155, 114, 203, 0.1), rgba(99, 102, 241, 0.05))',
              border: '1px solid rgba(155, 114, 203, 0.25)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.82rem', color: '#c084fc', marginBottom: '4px' }}>
              <Sparkles size={14} /> Gemini Substitute AI
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Automatic ranking by department, prior roles, schedule availability, and workload balance.
            </p>
          </div>
        </aside>

        {/* Main Workspace Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <Outlet />
        </div>
      </div>

      <Toast />

      <style>{`
        @media (max-width: 860px) {
          .dashboard-sidebar {
            width: 100% !important;
            margin-bottom: 1.5rem;
          }
          .container {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
