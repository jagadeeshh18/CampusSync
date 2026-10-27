import React from 'react';
import { Users, Mail, ShieldCheck, Sparkles } from 'lucide-react';

export const ClubHeader = ({ club }) => {
  if (!club) return null;

  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        marginBottom: '2rem'
      }}
    >
      <div style={{ height: '220px', width: '100%', position: 'relative' }}>
        <img
          src={club.banner}
          alt={club.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--bg-surface) 0%, rgba(10, 14, 23, 0.4) 100%)'
          }}
        />
      </div>

      <div
        style={{
          padding: '0 32px 28px 32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '20px',
          marginTop: '-40px',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <img
            src={club.logo}
            alt={club.name}
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '20px',
              objectFit: 'cover',
              border: '4px solid var(--bg-surface)',
              boxShadow: 'var(--shadow-lg)'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-primary">{club.category}</span>
              <span className="badge badge-success">
                <ShieldCheck size={12} /> Recognized College Body
              </span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>{club.name}</h1>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Faculty & Student Leadership: <strong>{club.lead}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-500)' }}>
              {club.membersCount}+
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Registered Members</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubHeader;
