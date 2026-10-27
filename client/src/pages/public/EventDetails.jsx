import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { roleService } from '../../services/roleService';
import { EventDetailsInfo } from '../../components/events/EventDetailsInfo';
import { RoleList } from '../../components/events/RoleList';
import { UnavailableModal } from '../../components/faculty/UnavailableModal';
import { Loader } from '../../components/common/Loader';
import { useNotifications } from '../../hooks/useNotifications';
import { useSocket } from '../../hooks/useSocket';
import { ArrowLeft, Users, ShieldAlert, Sparkles } from 'lucide-react';

export const EventDetails = () => {
  const { id } = useParams();
  const socket = useSocket();
  const { addToast } = useNotifications();

  const [event, setEvent] = useState(null);
  const [club, setClub] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [selectedRoleForUnavailable, setSelectedRoleForUnavailable] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchEventData = async () => {
    try {
      const evt = await eventService.getEventById(id);
      setEvent(evt);

      if (evt) {
        const [clb, rls] = await Promise.all([
          eventService.getClubById(evt.clubId),
          roleService.getRolesByEvent(evt.id)
        ]);
        setClub(clb);
        setRoles(rls);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [id]);

  const handleReportUnavailable = (role) => {
    setSelectedRoleForUnavailable(role);
    setModalOpen(true);
  };

  const handleSubmitUnavailability = async (roleId, reason) => {
    try {
      const result = await roleService.reportUnavailability(
        roleId,
        selectedRoleForUnavailable.facultyId,
        reason
      );

      addToast({
        title: 'Unavailability Submitted',
        message: 'Your unavailability has been logged and the Gemini AI Substitute Allocation Engine activated.',
        type: 'warning'
      });

      socket.emit('ROLE_UPDATED', {
        roleId,
        message: `Faculty marked unavailable for "${selectedRoleForUnavailable.title}".`
      });

      fetchEventData();
    } catch (err) {
      addToast({
        title: 'Submission Error',
        message: err.message,
        type: 'danger'
      });
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <Loader size="large" text="Retrieving Event Specifications and Faculty Rosters..." />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <h2>Event Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 2rem 0' }}>
          The requested event could not be found or may have been archived.
        </p>
        <Link to="/events" className="btn btn-primary">
          Back to Events List
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      {/* Back button */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          to="/events"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem',
            fontWeight: 500,
            transition: 'color 0.15s'
          }}
        >
          <ArrowLeft size={16} /> Back to all events
        </Link>
      </div>

      {/* Hero Overview */}
      <EventDetailsInfo event={event} club={club} />

      {/* Faculty Roles & Responsibilities Section */}
      <div style={{ marginTop: '3rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="badge badge-primary">Institutional Governance</span>
              <span className="badge badge-gemini">
                <Sparkles size={11} /> Smart Substitute Monitored
              </span>
            </div>
            <h2 style={{ fontSize: '1.8rem' }}>Assigned Faculty Roles &amp; Duties</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Inspect designated academic judges, coordinators, session chairs, and evaluators
            </p>
          </div>
        </div>

        <RoleList
          roles={roles}
          onReportUnavailable={handleReportUnavailable}
        />
      </div>

      {/* Unavailability Modal */}
      <UnavailableModal
        role={selectedRoleForUnavailable}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitUnavailability}
      />
    </div>
  );
};

export default EventDetails;
