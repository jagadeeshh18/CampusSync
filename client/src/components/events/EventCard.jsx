import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowRight, Sparkles } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/formatDate';

export const EventCard = ({ event, rolesCount = 0 }) => {
  return (
    <div
      className="glass-panel"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
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
      {/* Banner */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
        <img
          src={event.banner}
          alt={event.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10, 14, 23, 0.9) 0%, rgba(10, 14, 23, 0.2) 60%, transparent 100%)'
          }}
        />
        {/* Category Pill */}
        <span
          className="badge badge-primary"
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            backdropFilter: 'blur(8px)',
            background: 'rgba(15, 23, 42, 0.75)'
          }}
        >
          {event.category}
        </span>

        {/* Club Name */}
        <span
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '14px',
            fontSize: '0.8rem',
            color: '#e2e8f0',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Sparkles size={13} color="#818cf8" /> {event.clubName}
        </span>
      </div>

      {/* Content */}
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <div>
          <h3
            style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              lineHeight: 1.35,
              marginBottom: '10px'
            }}
          >
            <Link
              to={`/events/${event.id}`}
              style={{ color: 'var(--text-primary)', textDecoration: 'none' }}
            >
              {event.title}
            </Link>
          </h3>

          <p
            style={{
              fontSize: '0.84rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
              marginBottom: '16px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {event.description}
          </p>
        </div>

        <div>
          {/* Metadata Grid */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border-subtle)',
              marginBottom: '16px',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={14} color="var(--primary-500)" />
              <span>
                {formatDate(event.startDate)} &bull; {formatTime(event.startDate)}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={14} color="#f59e0b" />
              <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {event.venue}
              </span>
            </div>
          </div>

          {/* Action Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Users size={14} /> Assigned Roles
            </span>

            <Link
              to={`/events/${event.id}`}
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px' }}
            >
              Inspect Roles <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
