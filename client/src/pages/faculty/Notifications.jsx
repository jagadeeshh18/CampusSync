import React from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import { getRelativeTime } from '../../utils/formatDate';
import { Bell, Sparkles, AlertCircle, Info, Check, CheckCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Notifications = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '6px' }}>
            Activity Feed
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Notifications &amp; Alerts</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Instant notifications for role assignments, substitute allocations, and status updates.
          </p>
        </div>

        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
            <CheckCheck size={14} /> Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <Bell size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px auto' }} />
          <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>No Notifications</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            You are all caught up with your campus event alerts.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {notifications.map((item) => (
            <div
              key={item.id}
              className="glass-panel"
              style={{
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                background: item.read ? 'var(--bg-surface)' : 'rgba(99, 102, 241, 0.08)',
                borderLeft: item.read ? '4px solid transparent' : '4px solid var(--primary-500)'
              }}
            >
              <div style={{ marginTop: '2px' }}>
                {item.type === 'ai' ? (
                  <Sparkles size={18} color="#c084fc" />
                ) : item.type === 'warning' ? (
                  <AlertCircle size={18} color="#f59e0b" />
                ) : (
                  <Info size={18} color="#06b6d4" />
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ fontWeight: item.read ? 600 : 700, fontSize: '0.95rem' }}>
                    {item.title}
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {getRelativeTime(item.createdAt)}
                  </span>
                </div>

                <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  {item.message}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {item.link && (
                    <Link
                      to={item.link}
                      style={{ fontSize: '0.78rem', color: 'var(--primary-500)', fontWeight: 600 }}
                    >
                      View Details &rarr;
                    </Link>
                  )}
                  {!item.read && (
                    <button
                      onClick={() => markAsRead(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
