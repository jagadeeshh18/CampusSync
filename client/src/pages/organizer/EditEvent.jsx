import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { EventForm } from '../../components/admin/EventForm';
import { useNotifications } from '../../hooks/useNotifications';
import { Loader } from '../../components/common/Loader';
import { ArrowLeft } from 'lucide-react';

export const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useNotifications();

  const [event, setEvent] = useState(null);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [evt, clbs] = await Promise.all([
          eventService.getEventById(id),
          eventService.getClubs()
        ]);
        setEvent(evt);
        setClubs(clbs);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      await eventService.updateEvent(id, formData);
      addToast({
        title: 'Event Updated',
        message: 'Modifications saved successfully.',
        type: 'success'
      });
      navigate('/organizer');
    } catch (err) {
      addToast({
        title: 'Update Error',
        message: err.message,
        type: 'danger'
      });
    }
  };

  if (loading) {
    return <Loader text="Loading event specifications..." />;
  }

  if (!event) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Event not found</h2>
        <Link to="/organizer" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Organizer Studio
        </Link>
      </div>
    );
  }

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
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Edit Event: {event.title}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Update schedule timing, venue, or external registration links.
        </p>
      </div>

      <EventForm
        initialData={event}
        clubs={clubs}
        onSubmit={handleUpdate}
        onCancel={() => navigate('/organizer')}
      />
    </div>
  );
};

export default EditEvent;
