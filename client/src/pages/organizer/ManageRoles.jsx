import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { roleService } from '../../services/roleService';
import { authService } from '../../services/authService';
import { RoleForm } from '../../components/admin/RoleForm';
import { AssignFacultyForm } from '../../components/admin/AssignFacultyForm';
import { useNotifications } from '../../hooks/useNotifications';
import { useSocket } from '../../hooks/useSocket';
import { Loader } from '../../components/common/Loader';
import {
  Users,
  PlusCircle,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Trash2,
  UserPlus,
  ArrowLeft
} from 'lucide-react';

export const ManageRoles = () => {
  const { eventId } = useParams();
  const socket = useSocket();
  const { addToast } = useNotifications();

  const [event, setEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(eventId || '');
  const [roles, setRoles] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Modals
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState(null);
  const [roleToAssign, setRoleToAssign] = useState(null);

  const fetchInitialData = async () => {
    try {
      const [evts, faculty] = await Promise.all([
        eventService.getEvents(),
        authService.getFacultyMembers()
      ]);
      setAllEvents(evts);
      setFacultyList(faculty);

      const targetId = eventId || selectedEventId || evts[0]?.id;
      if (targetId) {
        setSelectedEventId(targetId);
        const [evt, rls] = await Promise.all([
          eventService.getEventById(targetId),
          roleService.getRolesByEvent(targetId)
        ]);
        setEvent(evt);
        setRoles(rls);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [eventId]);

  const handleSelectEvent = async (id) => {
    setSelectedEventId(id);
    setLoading(true);
    try {
      const [evt, rls] = await Promise.all([
        eventService.getEventById(id),
        roleService.getRolesByEvent(id)
      ]);
      setEvent(evt);
      setRoles(rls);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRole = async (roleData) => {
    try {
      if (roleToEdit) {
        await roleService.updateRole(roleToEdit.id, roleData);
        addToast({ title: 'Role Updated', message: 'Role parameters modified.', type: 'success' });
      } else {
        await roleService.createRole(roleData);
        addToast({ title: 'Role Defined', message: 'New faculty role created successfully.', type: 'success' });
      }
      setShowRoleForm(false);
      setRoleToEdit(null);
      handleSelectEvent(selectedEventId);
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'danger' });
    }
  };

  const handleAssignFaculty = async (roleId, facultyId) => {
    try {
      await roleService.assignFacultyToRole(roleId, facultyId);
      addToast({
        title: 'Faculty Assigned',
        message: 'Role assignment confirmed.',
        type: 'success'
      });
      socket.emit('ROLE_UPDATED', { roleId, message: 'Faculty assigned to role.' });
      setRoleToAssign(null);
      handleSelectEvent(selectedEventId);
    } catch (err) {
      addToast({ title: 'Assignment Failed', message: err.message, type: 'danger' });
    }
  };

  const handleDeleteRole = async (id) => {
    if (window.confirm('Delete this faculty role?')) {
      try {
        await roleService.deleteRole(id);
        addToast({ title: 'Role Removed', message: 'Role deleted.', type: 'info' });
        handleSelectEvent(selectedEventId);
      } catch (err) {
        addToast({ title: 'Delete Failed', message: err.message, type: 'danger' });
      }
    }
  };

  if (loading && !event) {
    return <Loader text="Loading role specifications..." />;
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

      {/* Header and Event Selector */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-primary">Role Management Studio</span>
            <span className="badge badge-gemini">
              <Sparkles size={11} /> AI Substitute Monitored
            </span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Manage Faculty Roles</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Define roles (Judge, Coordinator, Session Chair, Evaluator) and allocate faculty members.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Switch Event Dropdown */}
          <select
            value={selectedEventId}
            onChange={(e) => handleSelectEvent(e.target.value)}
            className="form-select"
            style={{ width: '240px', height: '42px', fontSize: '0.85rem' }}
          >
            {allEvents.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.title}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setRoleToEdit(null);
              setShowRoleForm(true);
            }}
            className="btn btn-primary"
            style={{ gap: '6px' }}
          >
            <PlusCircle size={16} /> Define Role
          </button>
        </div>
      </div>

      {/* Selected Event Details Card */}
      {event && (
        <div
          className="glass-panel"
          style={{
            padding: '16px 20px',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(99, 102, 241, 0.08)',
            border: '1px solid rgba(99, 102, 241, 0.25)'
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary-500)', fontWeight: 700 }}>
              Active Event Target
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{event.title}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Venue: {event.venue} &bull; Club: {event.clubName}
            </div>
          </div>
          <Link to={`/events/${event.id}`} className="btn btn-secondary btn-sm">
            View Public Page &rarr;
          </Link>
        </div>
      )}

      {/* Role Creation Form Modal */}
      {showRoleForm && (
        <div className="modal-overlay" onClick={() => setShowRoleForm(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '640px', padding: 0 }}
          >
            <RoleForm
              eventId={selectedEventId}
              initialData={roleToEdit}
              facultyList={facultyList}
              onSubmit={handleSaveRole}
              onCancel={() => setShowRoleForm(false)}
            />
          </div>
        </div>
      )}

      {/* Faculty Assignment Modal */}
      {roleToAssign && (
        <AssignFacultyForm
          role={roleToAssign}
          facultyList={facultyList}
          onSubmit={handleAssignFaculty}
          onCancel={() => setRoleToAssign(null)}
        />
      )}

      {/* Roles List */}
      {roles.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3.5rem', textAlign: 'center' }}>
          <Users size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
          <h4 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>No Roles Defined Yet</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
            Click "Define Role" above to specify Judge, Coordinator, Session Chair, or Evaluator positions.
          </p>
          <button
            onClick={() => {
              setRoleToEdit(null);
              setShowRoleForm(true);
            }}
            className="btn btn-primary btn-sm"
          >
            <PlusCircle size={14} /> Define First Role
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {roles.map((r) => {
            const faculty = r.faculty;
            const isUnavailable = r.status === 'unavailable';

            return (
              <div
                key={r.id}
                className="glass-panel"
                style={{
                  padding: '20px 24px',
                  borderRadius: 'var(--radius-lg)',
                  borderLeft: isUnavailable
                    ? '4px solid var(--warning)'
                    : r.status === 'confirmed'
                    ? '4px solid var(--success)'
                    : '4px solid var(--border-medium)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge badge-primary">{r.roleType}</span>
                    {isUnavailable ? (
                      <span className="badge badge-warning">
                        <AlertTriangle size={12} /> Unavailable
                      </span>
                    ) : r.status === 'confirmed' ? (
                      <span className="badge badge-success">
                        <CheckCircle2 size={12} /> Confirmed
                      </span>
                    ) : (
                      <span className="badge badge-info">Unassigned</span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px' }}>
                    {r.title}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
                    {r.description}
                  </p>

                  {/* Assigned Faculty info */}
                  {faculty ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={faculty.avatar}
                        alt={faculty.name}
                        style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div style={{ fontSize: '0.84rem' }}>
                        Assigned: <strong>{faculty.name}</strong> ({faculty.department})
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: '0.82rem', color: 'var(--warning)', fontStyle: 'italic' }}>
                      No faculty assigned to this role yet
                    </div>
                  )}

                  {isUnavailable && r.unavailabilityReason && (
                    <div
                      style={{
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(245, 158, 11, 0.1)',
                        fontSize: '0.8rem',
                        color: '#fef3c7',
                        marginTop: '10px'
                      }}
                    >
                      <strong>Absence Reason:</strong> {r.unavailabilityReason}
                    </div>
                  )}
                </div>

                {/* Role Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  {isUnavailable ? (
                    <Link
                      to="/organizer/substitutes"
                      className="btn btn-gemini btn-sm"
                      style={{ gap: '6px' }}
                    >
                      <Sparkles size={14} /> Allocate Substitute (Gemini AI) &rarr;
                    </Link>
                  ) : (
                    <button
                      onClick={() => setRoleToAssign(r)}
                      className="btn btn-secondary btn-sm"
                      style={{ gap: '6px' }}
                    >
                      <UserPlus size={14} /> {faculty ? 'Reassign' : 'Assign Faculty'}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setRoleToEdit(r);
                      setShowRoleForm(true);
                    }}
                    className="btn btn-secondary btn-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteRole(r.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageRoles;
