import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NotificationBell } from './NotificationBell';
import {
  Calendar,
  Layers,
  Sparkles,
  Users,
  Shield,
  UserCheck,
  RotateCcw,
  Menu,
  X,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const Navbar = () => {
  const { user, users, switchUser, resetAllData } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const getDashboardPath = () => {
    if (!user) return '/events';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'organizer') return '/organizer';
    if (user.role === 'faculty') return '/faculty';
    return '/events';
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'all 0.2s'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px'
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none'
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'var(--primary-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
            }}
          >
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
                Campus<span className="gradient-text">Sync</span>
              </span>
              <span className="badge badge-gemini" style={{ padding: '1px 6px', fontSize: '0.65rem' }}>
                Gemini AI
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1 }}>
              Event & Faculty Allocation System
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '24px'
          }}
          className="desktop-nav"
        >
          <Link
            to="/"
            style={{
              fontWeight: 500,
              fontSize: '0.92rem',
              color: isActive('/') ? 'var(--primary-500)' : 'var(--text-secondary)',
              transition: 'color 0.15s'
            }}
          >
            Home
          </Link>
          <Link
            to="/events"
            style={{
              fontWeight: 500,
              fontSize: '0.92rem',
              color: isActive('/events') ? 'var(--primary-500)' : 'var(--text-secondary)',
              transition: 'color 0.15s'
            }}
          >
            Browse Events
          </Link>
          <Link
            to="/clubs"
            style={{
              fontWeight: 500,
              fontSize: '0.92rem',
              color: isActive('/clubs') ? 'var(--primary-500)' : 'var(--text-secondary)',
              transition: 'color 0.15s'
            }}
          >
            Clubs & Societies
          </Link>
          <Link
            to="/about"
            style={{
              fontWeight: 500,
              fontSize: '0.92rem',
              color: isActive('/about') ? 'var(--primary-500)' : 'var(--text-secondary)',
              transition: 'color 0.15s'
            }}
          >
            About & Architecture
          </Link>
        </nav>

        {/* Right Section Actions & Quick Role Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Quick Demo Role Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              title="Switch demo user or role to test perspectives"
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background:
                    user?.role === 'admin'
                      ? '#ef4444'
                      : user?.role === 'organizer'
                      ? '#6366f1'
                      : user?.role === 'faculty'
                      ? '#10b981'
                      : '#06b6d4'
                }}
              />
              <span style={{ textTransform: 'capitalize' }}>
                Role: {user?.role || 'Guest'}
              </span>
              <ChevronDown size={14} />
            </button>

            {roleDropdownOpen && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '280px',
                  zIndex: 1100,
                  background: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '8px',
                  border: '1px solid var(--border-medium)'
                }}
              >
                <div
                  style={{
                    padding: '8px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  Quick Role Switcher (Live Demo)
                </div>

                {users.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchUser(u.id);
                      setRoleDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      background: u.id === user?.id ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <img
                      src={u.avatar}
                      alt={u.name}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{u.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                        {u.role} &bull; {u.department ? u.department.split(' ')[0] : ''}
                      </div>
                    </div>
                  </button>
                ))}

                <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '6px', paddingTop: '6px' }}>
                  <button
                    onClick={() => {
                      if (window.confirm('Reset all demo data back to clean initial state?')) {
                        resetAllData();
                      }
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--danger)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <RotateCcw size={14} /> Reset Demo Data
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <NotificationBell />

          {/* Dashboard Portal Button */}
          {user && user.role !== 'student' && (
            <Link
              to={getDashboardPath()}
              className="btn btn-primary btn-sm"
              style={{ display: 'none' }}
              id="dashboard-cta"
            >
              {user.role === 'admin' ? (
                <>
                  <Shield size={14} /> Admin Portal
                </>
              ) : user.role === 'organizer' ? (
                <>
                  <Layers size={14} /> Organizer Portal
                </>
              ) : (
                <>
                  <UserCheck size={14} /> Faculty Portal
                </>
              )}
            </Link>
          )}

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              padding: '6px'
            }}
            className="mobile-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-elevated)',
            borderBottom: '1px solid var(--border-medium)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 600, color: 'var(--text-primary)' }}
          >
            Home
          </Link>
          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 600, color: 'var(--text-primary)' }}
          >
            Browse Events
          </Link>
          <Link
            to="/clubs"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 600, color: 'var(--text-primary)' }}
          >
            Clubs & Societies
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontWeight: 600, color: 'var(--text-primary)' }}
          >
            About & Architecture
          </Link>
          {user && user.role !== 'student' && (
            <Link
              to={getDashboardPath()}
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary btn-sm"
              style={{ marginTop: '8px', textAlign: 'center' }}
            >
              Go to {user.role.toUpperCase()} Dashboard
            </Link>
          )}
        </div>
      )}

      <style>{`
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          #dashboard-cta { display: inline-flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
