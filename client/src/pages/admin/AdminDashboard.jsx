import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { eventService } from '../../services/eventService';
import { substituteService } from '../../services/substituteService';
import { roleService } from '../../services/roleService';
import { DashboardStats } from '../../components/admin/DashboardStats';
import { Link } from 'react-router-dom';
import {
  Shield,
  Users,
  Building2,
  Layers,
  Sparkles,
  ArrowRight,
  Activity,
  CheckCircle2,
  Database
} from 'lucide-react';

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [substitutes, setSubstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [usr, clb, evt, sub] = await Promise.all([
          authService.getAllUsers(),
          eventService.getClubs(),
          eventService.getEvents(),
          substituteService.getRequests()
        ]);
        setUsers(usr);
        setClubs(clb);
        setEvents(evt);
        setSubstitutes(sub);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  const facultyMembers = users.filter((u) => u.role === 'faculty');
  const organizers = users.filter((u) => u.role === 'organizer');

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-danger">Super Admin Console</span>
          <span className="badge badge-gemini">
            <Sparkles size={11} /> Institutional Governance
          </span>
        </div>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>Campus Operations Control</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Executive oversight for user access, club recognition, academic departments, and automated substitution audits.
        </p>
      </div>

      {/* KPI Stats */}
      <DashboardStats
        eventsCount={events.length}
        rolesCount={users.length}
        substitutesCount={substitutes.length}
        clubsCount={clubs.length}
      />

      {/* Quick Action Portals */}
      <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(99, 102, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-500)',
              marginBottom: '14px'
            }}
          >
            <Users size={20} />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Manage Users &amp; Faculty</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
            Audit {facultyMembers.length} faculty profiles, assign RBAC access, and inspect workload equity metrics.
          </p>
          <Link to="/admin/users" className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
            User Directory <ArrowRight size={13} />
          </Link>
        </div>

        <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--success)',
              marginBottom: '14px'
            }}
          >
            <Building2 size={20} />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Manage Recognized Clubs</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
            Approve {clubs.length} registered campus societies, chapter leads, and published activities.
          </p>
          <Link to="/admin/clubs" className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
            Club Registry <ArrowRight size={13} />
          </Link>
        </div>

        <div
          className="glass-panel"
          style={{
            padding: '24px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(155, 114, 203, 0.35)',
            background: 'linear-gradient(135deg, rgba(155, 114, 203, 0.1), var(--bg-surface))'
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'var(--gemini-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              marginBottom: '14px'
            }}
          >
            <Sparkles size={20} />
          </div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Gemini AI Substitutions</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
            Audit {substitutes.length} total substitute requests with AI matching breakdown and decision log.
          </p>
          <Link to="/organizer/substitutes" className="btn btn-gemini btn-sm" style={{ gap: '6px' }}>
            AI Substitute Engine <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* System Status Panel */}
      <div
        className="glass-panel"
        style={{
          padding: '20px 24px',
          borderRadius: 'var(--radius-xl)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Activity size={24} color="#10b981" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>CampusSync Engine Health Status</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              All client subsystems, AI algorithms, and simulated real-time event buses operating normally
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <span className="badge badge-success">
            <CheckCircle2 size={12} /> Local Mock Repository: Synced
          </span>
          <span className="badge badge-gemini">
            <Sparkles size={12} /> Gemini 1.5 Flash: Operational
          </span>
          <span className="badge badge-info">
            <Activity size={12} /> Cross-Tab Sockets: Connected
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
