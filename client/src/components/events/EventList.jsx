import React from 'react';
import { EventCard } from './EventCard';
import { CardSkeleton } from '../common/Loader';
import { CalendarX } from 'lucide-react';

export const EventList = ({ events, loading, rolesMap = {} }) => {
  if (loading) {
    return (
      <div className="grid-cards">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <CardSkeleton key={n} />
        ))}
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div
        className="glass-panel"
        style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          borderRadius: 'var(--radius-xl)'
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(99, 102, 241, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}
        >
          <CalendarX size={32} color="var(--primary-500)" />
        </div>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>No events found</h3>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
          No scheduled events match your current filter criteria. Try adjusting your search query or category tabs.
        </p>
      </div>
    );
  }

  return (
    <div className="grid-cards">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          rolesCount={rolesMap[event.id] || 0}
        />
      ))}
    </div>
  );
};

export default EventList;
