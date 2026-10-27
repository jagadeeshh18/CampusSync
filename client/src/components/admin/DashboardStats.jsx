import React from 'react';
import { Calendar, Users, Sparkles, Building2, TrendingUp, AlertTriangle } from 'lucide-react';

export const DashboardStats = ({
  eventsCount = 0,
  rolesCount = 0,
  substitutesCount = 0,
  clubsCount = 0,
  pendingSubstitutes = 0
}) => {
  const stats = [
    {
      label: 'Published Events',
      value: eventsCount,
      change: '+3 this month',
      icon: <Calendar size={22} color="var(--primary-500)" />,
      bg: 'rgba(99, 102, 241, 0.12)',
      border: 'rgba(99, 102, 241, 0.25)'
    },
    {
      label: 'Assigned Faculty Roles',
      value: rolesCount,
      change: '100% verified',
      icon: <Users size={22} color="#06b6d4" />,
      bg: 'rgba(6, 182, 212, 0.12)',
      border: 'rgba(6, 182, 212, 0.25)'
    },
    {
      label: 'AI Substitutions Resolved',
      value: substitutesCount,
      change: 'Gemini 1.5 Flash',
      icon: <Sparkles size={22} color="#c084fc" />,
      bg: 'rgba(155, 114, 203, 0.12)',
      border: 'rgba(155, 114, 203, 0.25)'
    },
    {
      label: 'Active Clubs & Societies',
      value: clubsCount,
      change: 'Recognized chapters',
      icon: <Building2 size={22} color="#10b981" />,
      bg: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.25)'
    }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}
    >
      {stats.map((item, idx) => (
        <div
          key={idx}
          className="glass-panel"
          style={{
            padding: '20px 24px',
            borderRadius: 'var(--radius-lg)',
            border: `1px solid ${item.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>
              {item.label}
            </div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
              {item.value}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
              {item.change}
            </div>
          </div>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: item.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
