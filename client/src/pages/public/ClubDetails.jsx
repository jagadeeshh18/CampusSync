import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { ClubHeader } from '../../components/clubs/ClubHeader';
import { EventList } from '../../components/events/EventList';
import { Loader } from '../../components/common/Loader';
import { ArrowLeft, Calendar, Mail, Users } from 'lucide-react';

export const ClubDetails = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clb, evts] = await Promise.all([
          eventService.getClubById(id),
          eventService.getEvents({ clubId: id })
        ]);
        setClub(clb);
        setEvents(evts);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <Loader size="large" text="Loading Club Profile..." />
      </div>
    );
  }

  if (!club) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2>Club Not Found</h2>
        <Link to="/clubs" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Clubs
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          to="/clubs"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem'
          }}
        >
          <ArrowLeft size={16} /> Back to clubs
        </Link>
      </div>

      <ClubHeader club={club} />

      <div style={{ marginTop: '2.5rem' }}>
        <h2 style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>
          Events by {club.name} ({events.length})
        </h2>
        <EventList events={events} loading={false} />
      </div>
    </div>
  );
};

export default ClubDetails;
