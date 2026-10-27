import React from 'react';
import { Calendar, MapPin, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { formatDate } from '../../utils/formatDate';
import { Link } from 'react-router-dom';

export const MyAssignments = ({ assignments = [], onReportUnavailable }) => {
  if (assignments.length === 0) {
    return (
      <div
        className="glass-panel"
        style={{ padding: '3rem', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}
      >
        <p style={{ color: 'var(--text-secondary)' }}>
          You have no active event roles assigned at this time.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {assignments.map((item) => {
        const isUnavailable = item.status === 'unavailable';

        return (
          <div
            key={item.id}
            className="glass-panel"
            style={{
              padding: '20px 24px',
              borderRadius: 'var(--radius-lg)',
              borderLeft: isUnavailable ? '4px solid var(--warning)' : '4px solid var(--success)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div style={{ flex: 1, minWidth: '260px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span className="badge badge-primary">{item.roleType}</span>
                {isUnavailable ? (
                  <span className="badge badge-warning">
                    <AlertTriangle size={12} /> Unavailable
                  </span>
                ) : (
                  <span className="badge badge-success">
                    <CheckCircle2 size={12} /> Confirmed Assignment
                  </span>
                )}
              </div>

              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px' }}>
                {item.title}
              </h4>
              <div style={{ fontSize: '0.85rem', color: 'var(--primary-500)', fontWeight: 600, marginBottom: '8px' }}>
                Event: {item.event?.title || 'College Event'}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} /> {formatDate(item.event?.startDate)}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={13} /> {item.event?.venue}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {item.event && (
                <Link
                  to={`/events/${item.event.id}`}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '4px' }}
                >
                  Event Details <ArrowRight size={13} />
                </Link>
              )}

              {!isUnavailable && (
                <button
                  onClick={() => onReportUnavailable(item)}
                  className="btn btn-sm"
                  style={{
                    background: 'rgba(245, 158, 11, 0.15)',
                    color: '#fbbf24',
                    border: '1px solid rgba(245, 158, 11, 0.3)'
                  }}
                >
                  <AlertTriangle size={13} /> Report Unavailability
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyAssignments;
