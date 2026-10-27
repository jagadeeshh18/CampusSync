import React from 'react';
import { ClubCard } from './ClubCard';
import { CardSkeleton } from '../common/Loader';

export const ClubList = ({ clubs, loading }) => {
  if (loading) {
    return (
      <div className="grid-cards">
        {[1, 2, 3, 4].map((n) => (
          <CardSkeleton key={n} />
        ))}
      </div>
    );
  }

  if (!clubs || clubs.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No clubs registered yet.</p>
      </div>
    );
  }

  return (
    <div className="grid-cards">
      {clubs.map((club) => (
        <ClubCard key={club.id} club={club} />
      ))}
    </div>
  );
};

export default ClubList;
