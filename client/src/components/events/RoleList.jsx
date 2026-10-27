import React from 'react';
import { RoleCard } from './RoleCard';
import { Users, ShieldAlert } from 'lucide-react';

export const RoleList = ({ roles, onReportUnavailable, onTriggerSubstitute }) => {
  if (!roles || roles.length === 0) {
    return (
      <div
        className="glass-panel"
        style={{
          padding: '2.5rem',
          textAlign: 'center',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <Users size={32} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
        <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>
          No Faculty Roles Assigned Yet
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          The event organizers are currently finalizing faculty assignments for this event.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}
    >
      {roles.map((role) => (
        <RoleCard
          key={role.id}
          role={role}
          onReportUnavailable={onReportUnavailable}
          onTriggerSubstitute={onTriggerSubstitute}
        />
      ))}
    </div>
  );
};

export default RoleList;
