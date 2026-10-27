import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { roleService } from '../../services/roleService';
import { availabilityService } from '../../services/availabilityService';
import { MyAssignments } from '../../components/faculty/MyAssignments';
import { UnavailableModal } from '../../components/faculty/UnavailableModal';
import { useNotifications } from '../../hooks/useNotifications';
import { useSocket } from '../../hooks/useSocket';
import { Link } from 'react-router-dom';
import {
  Calendar,
  UserCheck,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const FacultyDashboard = () => {
  const { user } = useAuth();
  const socket = useSocket();
  const { addToast } = useNotifications();

  const [assignments, setAssignments] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedRole, setSelectedRole] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchFacultyData = async () => {
    if (!user) return;
    try {
      const [roles, avail] = await Promise.all([
        roleService.getRolesByFaculty(user.id),
        availabilityService.getFacultyAvailability(user.id)
      ]);
      setAssignments(roles);
      setAvailability(avail);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacultyData();
  }, [user]);

  const handleOpenUnavailableModal = (role) => {
    setSelectedRole(role);
    setModalOpen(true);
  };

  const handleConfirmUnavailable = async (roleId, reason) => {
    try {
      await roleService.reportUnavailability(roleId, user.id, reason);
      addToast({
        title: 'Unavailability Logged',
        message: 'Google Gemini AI Substitute Engine has been engaged to allocate a replacement.',
        type: 'warning'
      });

      socket.emit('ROLE_UPDATED', {
        roleId,
        message: `${user.name} reported absence for "${selectedRole?.title}".`
      });

      fetchFacultyData();
    } catch (err) {
      addToast({
        title: 'Error Submitting Absence',
        message: err.message,
        type: 'danger'
      });
    }
  };

  const confirmedCount = assignments.filter((a) => a.status === 'confirmed').length;
  const unavailableCount = assignments.filter((a) => a.status === 'unavailable').length;
  const leaveDaysCount = availability.filter((a) => a.status === 'leave').length;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <span className="badge badge-success">Faculty Portal</span>
          <span className="badge badge-gemini">
            <Sparkles size={11} /> Smart Substitute Monitored
          </span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Welcome, {user?.name}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          {user?.designation} &bull; {user?.department}
        </p>
      </div>

      {/* KPI Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}
      >
        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Confirmed Event Duties
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--success)' }}>
            {confirmedCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Institutional roles
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Substitutions Pending
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--warning)' }}>
            {unavailableCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Reported unavailable
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Leave Days Logged
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-500)' }}>
            {leaveDaysCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            On availability calendar
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            Workload Score
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#06b6d4' }}>
            {user?.currentWorkload || 1} / 5
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Optimal capacity
          </div>
        </div>
      </div>

      {/* Quick Action: Availability Calendar banner */}
      <div
        className="glass-panel"
        style={{
          padding: '20px 24px',
          borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), var(--bg-surface))',
          marginBottom: '2.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Manage Monthly Availability</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '540px' }}>
            Keep your schedule updated. When organizers need judges or session chairs, Gemini AI prioritizes faculty with verified open calendar dates.
          </p>
        </div>
        <Link to="/faculty/availability" className="btn btn-primary" style={{ gap: '6px' }}>
          <Calendar size={16} /> Open Availability Calendar <ArrowRight size={14} />
        </Link>
      </div>

      {/* Assigned Roles List */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>My Event Assignments</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Events where you are designated as Judge, Coordinator, Session Chair, or Evaluator
            </p>
          </div>
        </div>

        <MyAssignments
          assignments={assignments}
          onReportUnavailable={handleOpenUnavailableModal}
        />
      </div>

      {/* Unavailable Modal */}
      <UnavailableModal
        role={selectedRole}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleConfirmUnavailable}
      />
    </div>
  );
};

export default FacultyDashboard;
