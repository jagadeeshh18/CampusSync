import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  UserCheck,
  AlertTriangle,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Award,
  BookOpen,
  CalendarCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const RoleCard = ({ role, onReportUnavailable, onTriggerSubstitute }) => {
  const { user } = useAuth();
  const faculty = role.faculty;

  const isAssignedToCurrentUser = user && faculty && user.id === faculty.id;
  const isOrganizerOrAdmin = user && (user.role === 'organizer' || user.role === 'admin');

  // Role Type styling
  const getRoleBadgeClass = (type) => {
    switch (type?.toLowerCase()) {
      case 'judge':
        return 'badge-primary';
      case 'coordinator':
        return 'badge-info';
      case 'session chair':
        return 'badge-gemini';
      case 'evaluator':
        return 'badge-warning';
      default:
        return 'badge-secondary';
    }
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '24px',
        borderRadius: 'var(--radius-lg)',
        borderLeft:
          role.status === 'unavailable'
            ? '4px solid var(--warning)'
            : role.status === 'confirmed'
            ? '4px solid var(--success)'
            : '4px solid var(--border-medium)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s'
      }}
    >
      <div>
        {/* Header Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px',
            flexWrap: 'wrap',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className={`badge ${getRoleBadgeClass(role.roleType)}`}>
              <Award size={12} /> {role.roleType}
            </span>
            {role.status === 'unavailable' && (
              <span className="badge badge-warning">
                <AlertTriangle size={12} /> Unavailable
              </span>
            )}
            {role.status === 'confirmed' && (
              <span className="badge badge-success">
                <CalendarCheck size={12} /> Confirmed
              </span>
            )}
          </div>

          {/* AI substitute notification alert */}
          {role.status === 'unavailable' && (
            <span
              className="badge badge-gemini"
              style={{ fontSize: '0.72rem', animation: 'pulseGlow 2s infinite' }}
            >
              <Sparkles size={11} /> Gemini AI Substitute Required
            </span>
          )}
        </div>

        {/* Role Title & Description */}
        <h3 style={{ fontSize: '1.18rem', fontWeight: 700, marginBottom: '8px' }}>
          {role.title}
        </h3>
        <p
          style={{
            fontSize: '0.86rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '18px'
          }}
        >
          {role.description}
        </p>

        {/* Unavailability Note if marked */}
        {role.status === 'unavailable' && role.unavailabilityReason && (
          <div
            style={{
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.25)',
              marginBottom: '18px',
              fontSize: '0.82rem',
              color: '#fef3c7'
            }}
          >
            <strong>Reported Reason:</strong> {role.unavailabilityReason}
          </div>
        )}
      </div>

      {/* Assigned Faculty Section */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '16px',
          marginTop: '8px'
        }}
      >
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>
          Assigned Faculty Member
        </div>

        {faculty ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={faculty.avatar}
              alt={faculty.name}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid rgba(255, 255, 255, 0.1)'
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                {faculty.name}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {faculty.designation} &bull; {faculty.department}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontStyle: 'italic' }}>
            No faculty currently assigned
          </div>
        )}

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
          {/* Faculty action: Report Unavailability */}
          {isAssignedToCurrentUser && role.status === 'confirmed' && (
            <button
              onClick={() => onReportUnavailable && onReportUnavailable(role)}
              className="btn btn-secondary btn-sm"
              style={{ color: 'var(--warning)', borderColor: 'rgba(245, 158, 11, 0.3)' }}
            >
              <AlertTriangle size={14} /> Report Unavailability
            </button>
          )}

          {/* Organizer action: Run Gemini AI Substitute Allocation */}
          {isOrganizerOrAdmin && role.status === 'unavailable' && (
            <Link
              to="/organizer/substitutes"
              className="btn btn-gemini btn-sm"
              style={{ gap: '6px' }}
            >
              <Sparkles size={14} /> Allocate Substitute (Gemini AI) <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleCard;
