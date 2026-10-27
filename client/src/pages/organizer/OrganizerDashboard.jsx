import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { eventService } from '../../services/eventService';
import { roleService } from '../../services/roleService';
import { substituteService } from '../../services/substituteService';
import { DashboardStats } from '../../components/admin/DashboardStats';
import { EventTable } from '../../components/admin/EventTable';
import { EventForm } from '../../components/admin/EventForm';
import { useNotifications } from '../../hooks/useNotifications';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Layers,
  Calendar
} from 'lucide-react';

export const OrganizerDashboard = () => {
  const { user } = useAuth();
  const { addToast } = useNotifications();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [rolesCountMap, setRolesCountMap] = useState({});
  const [substitutes, setSubstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit event modal
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchOrganizerData = async () => {
    try {
      const [evts, clbs, roles, subs] = await Promise.all([
        eventService.getEvents(),
        eventService.getClubs(),
        roleService.getAllRoles(),
        substituteService.getRequests()
      ]);
      setEvents(evts);
      setClubs(clbs);
      setSubstitutes(subs);

      const countMap = {};
      roles.forEach((r) => {
        countMap[r.eventId] = (countMap[r.eventId] || 0) + 1;
      });
      setRolesCountMap(countMap);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizerData();
  }, []);

  const handleUpdateEvent = async (updatedFields) => {
    try {
      await eventService.updateEvent(editingEvent.id, updatedFields);
      addToast({
        title: 'Event Updated',
        message: 'Event parameters saved successfully.',
        type: 'success'
      });
      setEditingEvent(null);
      fetchOrganizerData();
    } catch (err) {
      addToast({
        title: 'Update Error',
        message: err.message,
        type: 'danger'
      });
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event and its assigned roles?')) {
      try {
        await eventService.deleteEvent(id);
        addToast({
          title: 'Event Deleted',
          message: 'The event has been removed from the schedule.',
          type: 'info'
        });
        fetchOrganizerData();
      } catch (err) {
        addToast({
          title: 'Delete Failed',
          message: err.message,
          type: 'danger'
        });
      }
    }
  };

  const pendingSubstitutes = substitutes.filter((s) => s.status === 'pending');

  return (
    <div>
      {/* Top Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '14px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-primary">Organizer Studio</span>
            <span className="badge badge-gemini">
              <Sparkles size={11} /> Gemini 1.5 Flash Active
            </span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Organizer Overview</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Coordinate campus events, manage faculty roles, and oversee AI substitute allocations.
          </p>
        </div>

        <Link to="/organizer/create-event" className="btn btn-primary" style={{ gap: '8px' }}>
          <PlusCircle size={18} /> Publish New Event
        </Link>
      </div>

      {/* KPI Stats */}
      <DashboardStats
        eventsCount={events.length}
        rolesCount={Object.values(rolesCountMap).reduce((a, b) => a + b, 0)}
        substitutesCount={substitutes.filter((s) => s.status === 'approved').length}
        clubsCount={clubs.length}
        pendingSubstitutes={pendingSubstitutes.length}
      />

      {/* Urgent AI Substitute Alert Banner if pending */}
      {pendingSubstitutes.length > 0 && (
        <div
          className="glass-panel pulse-glow"
          style={{
            padding: '20px 24px',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(155, 114, 203, 0.15))',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            marginBottom: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--gemini-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                  {pendingSubstitutes.length} Faculty Role Substitution Required
                </h3>
                <span className="badge badge-warning">Action Required</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Faculty reported absence. Google Gemini has generated ranked candidates with compatibility scores.
              </p>
            </div>
          </div>

          <Link to="/organizer/substitutes" className="btn btn-gemini" style={{ gap: '6px' }}>
            <Sparkles size={16} /> Review Gemini Recommendations <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Event Management Table */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>Published Events Schedule</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Manage event agendas, venues, and assign faculty roles
            </p>
          </div>
        </div>

        <EventTable
          events={events}
          rolesCountMap={rolesCountMap}
          onEdit={(evt) => setEditingEvent(evt)}
          onDelete={handleDeleteEvent}
        />
      </div>

      {/* Edit Event Modal */}
      {editingEvent && (
        <div className="modal-overlay" onClick={() => setEditingEvent(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '800px', padding: 0 }}
          >
            <EventForm
              initialData={editingEvent}
              clubs={clubs}
              onSubmit={handleUpdateEvent}
              onCancel={() => setEditingEvent(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerDashboard;
