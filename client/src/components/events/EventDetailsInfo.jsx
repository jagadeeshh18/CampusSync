import React from 'react';
import { Calendar, Clock, MapPin, Users, Award, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/formatDate';
import { RegisterButton } from './RegisterButton';
import { Link } from 'react-router-dom';

export const EventDetailsInfo = ({ event, club }) => {
  if (!event) return null;

  return (
    <div style={{ marginBottom: '2.5rem' }}>
      {/* Hero Banner Section */}
      <div
        className="glass-panel"
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          marginBottom: '2rem'
        }}
      >
        <div style={{ height: '360px', width: '100%', position: 'relative' }}>
          <img
            src={event.banner}
            alt={event.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, var(--bg-primary) 0%, rgba(10, 14, 23, 0.7) 50%, rgba(10, 14, 23, 0.3) 100%)'
            }}
          />

          {/* Banner Overlaid Content */}
          <div
            style={{
              position: 'absolute',
              bottom: '28px',
              left: '28px',
              right: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <span className="badge badge-primary">{event.category}</span>
              {club && (
                <Link
                  to={`/clubs/${club.id}`}
                  className="badge badge-gemini"
                  style={{ textDecoration: 'none' }}
                >
                  Hosted by {club.name}
                </Link>
              )}
              <span className="badge badge-success">
                <CheckCircle2 size={12} /> {event.status || 'Active'}
              </span>
            </div>

            <h1
              style={{
                fontSize: '2.4rem',
                fontWeight: 800,
                color: '#ffffff',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                lineHeight: 1.2
              }}
            >
              {event.title}
            </h1>
          </div>
        </div>

        {/* Highlights Bar below banner */}
        <div
          style={{
            padding: '24px 28px',
            background: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '18px',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(99, 102, 241, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-500)'
              }}
            >
              <Calendar size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date</div>
              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{formatDate(event.startDate)}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(6, 182, 212, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--info)'
              }}
            >
              <Clock size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Schedule Time</div>
              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                {formatTime(event.startDate)} - {formatTime(event.endDate)}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--warning)'
              }}
            >
              <MapPin size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Venue & Location</div>
              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{event.venue}</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <RegisterButton
              registrationLink={event.registrationLink}
              eventTitle={event.title}
              maxParticipants={event.maxParticipants}
            />
          </div>
        </div>
      </div>

      {/* Main Content & Description */}
      <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr', alignItems: 'start' }}>
        <div
          className="glass-panel"
          style={{ padding: '28px', borderRadius: 'var(--radius-lg)' }}
        >
          <h2 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>About This Event</h2>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.7,
              whiteSpace: 'pre-line'
            }}
          >
            {event.description}
          </p>
        </div>

        {/* Club Host Info Box */}
        {club && (
          <div
            className="glass-panel"
            style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}
          >
            <h3 style={{ fontSize: '1.1rem', marginBottom: '14px', color: 'var(--text-primary)' }}>
              Organized by
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
              <img
                src={club.logo}
                alt={club.name}
                style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{club.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{club.category}</div>
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
              {club.description}
            </p>
            <Link to={`/clubs/${club.id}`} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              View Club Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailsInfo;
