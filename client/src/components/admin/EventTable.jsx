import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Users, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

export const EventTable = ({ events = [], rolesCountMap = {}, onEdit, onDelete }) => {
  if (events.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>No events created yet.</p>
      </div>
    );
  }

  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: 'var(--radius-lg)',
        overflowX: 'auto'
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
        <thead>
          <tr
            style={{
              borderBottom: '1px solid var(--border-medium)',
              background: 'rgba(255, 255, 255, 0.02)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            <th style={{ padding: '14px 18px' }}>Event Name</th>
            <th style={{ padding: '14px 18px' }}>Host Club</th>
            <th style={{ padding: '14px 18px' }}>Date & Venue</th>
            <th style={{ padding: '14px 18px' }}>Faculty Roles</th>
            <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((evt) => (
            <tr
              key={evt.id}
              style={{
                borderBottom: '1px solid var(--border-subtle)',
                transition: 'background 0.15s'
              }}
            >
              <td style={{ padding: '14px 18px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                  <Link to={`/events/${evt.id}`} style={{ textDecoration: 'none' }}>
                    {evt.title}
                  </Link>
                </div>
                <span className="badge badge-primary" style={{ marginTop: '4px', fontSize: '0.7rem' }}>
                  {evt.category}
                </span>
              </td>

              <td style={{ padding: '14px 18px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {evt.clubName}
              </td>

              <td style={{ padding: '14px 18px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <div>{formatDate(evt.startDate)}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{evt.venue}</div>
              </td>

              <td style={{ padding: '14px 18px' }}>
                <Link
                  to={`/organizer/manage-roles/${evt.id}`}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '6px', fontSize: '0.75rem' }}
                >
                  <Users size={12} /> Manage Roles ({rolesCountMap[evt.id] || 0})
                </Link>
              </td>

              <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                <div style={{ display: 'inline-flex', gap: '8px' }}>
                  <Link
                    to={`/events/${evt.id}`}
                    className="btn btn-secondary btn-sm"
                    title="View public page"
                  >
                    <ExternalLink size={13} />
                  </Link>

                  <button
                    onClick={() => onEdit(evt)}
                    className="btn btn-secondary btn-sm"
                    title="Edit event"
                  >
                    <Edit2 size={13} />
                  </button>

                  <button
                    onClick={() => onDelete(evt.id)}
                    className="btn btn-danger btn-sm"
                    title="Delete event"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
