import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { EventForm } from '../../components/admin/EventForm';
import { useNotifications } from '../../hooks/useNotifications';
import { useAuth } from '../../hooks/useAuth';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CreateEvent = () => {
  const { user } = useAuth();
  const { addToast } = useNotifications();
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      const data = await eventService.getClubs();
      setClubs(data);
    };
    fetchClubs();
  }, []);

  const handleCreate = async (eventData) => {
    try {
      const created = await eventService.createEvent({
        ...eventData,
        createdBy: user?.id || 'usr-org-1'
      });
      addToast({
        title: 'Event Published!',
        message: `"${created.title}" has been published to the campus schedule.`,
        type: 'success'
      });
      // Redirect to manage roles for this new event!
      navigate(`/organizer/manage-roles/${created.id}`);
    } catch (err) {
      addToast({
        title: 'Publication Error',
        message: err.message,
        type: 'danger'
      });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          to="/organizer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem'
          }}
        >
          <ArrowLeft size={16} /> Back to organizer studio
        </Link>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '6px' }}>
          Event Creation Studio
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Publish New Campus Event</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Enter event schedules, venue specifications, external registration links, and assign faculty juries.
        </p>
      </div>

      <EventForm clubs={clubs} onSubmit={handleCreate} onCancel={() => navigate('/organizer')} />
    </div>
  );
};

export default CreateEvent;
