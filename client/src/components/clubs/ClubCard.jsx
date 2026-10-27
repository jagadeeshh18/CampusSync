import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Mail, ArrowRight } from 'lucide-react';

export const ClubCard = ({ club }) => {
  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        height: '100%'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
    >
      {/* Club Banner */}
      <div style={{ position: 'relative', height: '120px' }}>
        <img
          src={club.banner}
          alt={club.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, var(--bg-surface) 0%, rgba(0,0,0,0.3) 100%)'
          }}
        />
      </div>

      {/* Club Details */}
      <div
        style={{
          padding: '0 20px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          position: 'relative'
        }}
      >
        <div>
          {/* Logo overlapping banner */}
          <div style={{ marginTop: '-32px', marginBottom: '12px' }}>
            <img
              src={club.logo}
              alt={club.name}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                objectFit: 'cover',
                border: '3px solid var(--bg-surface)',
                boxShadow: 'var(--shadow-md)'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              <Link to={`/clubs/${club.id}`} style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
                {club.name}
              </Link>
            </h3>
            <span className="badge badge-primary">{club.category}</span>
          </div>

          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              marginBottom: '16px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {club.description}
          </p>
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={14} color="var(--primary-500)" /> {club.membersCount} Members
            </span>
            <Link
              to={`/clubs/${club.id}`}
              className="btn btn-secondary btn-sm"
              style={{ gap: '4px' }}
            >
              Explore <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubCard;
