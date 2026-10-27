import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { Users, UserCheck, Shield, Sparkles, LogIn, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ManageUsers = () => {
  const { user: currentUser, switchUser } = useAuth();
  const { addToast } = useNotifications();

  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('all');

  const fetchUsers = () => {
    const all = authService.getAllUsers();
    setUsers(all);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleImpersonate = (u) => {
    switchUser(u.id);
    addToast({
      title: 'Switched User',
      message: `Active session now switched to ${u.name} (${u.role}).`,
      type: 'info'
    });
  };

  const filteredUsers = users.filter((u) => {
    if (roleFilter === 'all') return true;
    return u.role === roleFilter;
  });

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          to="/admin"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem'
          }}
        >
          <ArrowLeft size={16} /> Back to admin console
        </Link>
      </div>

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
          <span className="badge badge-primary" style={{ marginBottom: '6px' }}>
            Identity Management
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Manage Users &amp; Faculty</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Inspect role assignments, workloads, and switch test sessions instantly.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'faculty', 'organizer', 'admin', 'student'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`btn btn-sm ${roleFilter === r ? 'btn-primary' : 'btn-secondary'}`}
              style={{ textTransform: 'capitalize' }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
          <thead>
            <tr
              style={{
                borderBottom: '1px solid var(--border-medium)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase'
              }}
            >
              <th style={{ padding: '14px 18px' }}>User Details</th>
              <th style={{ padding: '14px 18px' }}>Role</th>
              <th style={{ padding: '14px 18px' }}>Department</th>
              <th style={{ padding: '14px 18px' }}>Current Workload</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Simulate Login</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => {
              const isCurrent = currentUser?.id === u.id;

              return (
                <tr
                  key={u.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    background: isCurrent ? 'rgba(99, 102, 241, 0.08)' : 'transparent'
                  }}
                >
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={u.avatar}
                        alt={u.name}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                          {u.name} {isCurrent && <span style={{ color: 'var(--primary-500)', fontSize: '0.75rem' }}>(You)</span>}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '14px 18px' }}>
                    <span
                      className={`badge ${
                        u.role === 'admin'
                          ? 'badge-danger'
                          : u.role === 'organizer'
                          ? 'badge-primary'
                          : u.role === 'faculty'
                          ? 'badge-success'
                          : 'badge-info'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td style={{ padding: '14px 18px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {u.department || 'General'}
                  </td>

                  <td style={{ padding: '14px 18px', fontSize: '0.85rem' }}>
                    {u.role === 'faculty' ? (
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {u.currentWorkload || 0} active assignments
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>N/A</span>
                    )}
                  </td>

                  <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleImpersonate(u)}
                      disabled={isCurrent}
                      className="btn btn-secondary btn-sm"
                      style={{ gap: '6px' }}
                    >
                      <LogIn size={13} /> {isCurrent ? 'Active Session' : 'Switch User'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
