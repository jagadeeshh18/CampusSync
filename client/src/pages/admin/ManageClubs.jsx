import React, { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import { ClubForm } from '../../components/admin/ClubForm';
import { useNotifications } from '../../hooks/useNotifications';
import { Building2, PlusCircle, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ManageClubs = () => {
  const { addToast } = useNotifications();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingClub, setEditingClub] = useState(null);

  const fetchClubs = async () => {
    try {
      const data = await eventService.getClubs();
      setClubs(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const handleSaveClub = async (clubData) => {
    try {
      if (editingClub) {
        await eventService.updateClub(editingClub.id, clubData);
        addToast({ title: 'Club Updated', message: 'Club details updated.', type: 'success' });
      } else {
        await eventService.createClub(clubData);
        addToast({ title: 'Club Registered', message: 'New club added to registry.', type: 'success' });
      }
      setShowForm(false);
      setEditingClub(null);
      fetchClubs();
    } catch (err) {
      addToast({ title: 'Error', message: err.message, type: 'danger' });
    }
  };

  const handleDeleteClub = async (id) => {
    if (window.confirm('Are you sure you want to delete this club?')) {
      try {
        await eventService.deleteClub(id);
        addToast({ title: 'Club Deleted', message: 'Club removed from system.', type: 'info' });
        fetchClubs();
      } catch (err) {
        addToast({ title: 'Delete Failed', message: err.message, type: 'danger' });
      }
    }
  };

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
            Campus Societies
          </span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Manage Student Clubs</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Official directory of recognized student chapters, leads, and event organizers.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingClub(null);
            setShowForm(true);
          }}
          className="btn btn-primary"
          style={{ gap: '6px' }}
        >
          <PlusCircle size={16} /> Register New Club
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '640px', padding: 0 }}
          >
            <ClubForm
              initialData={editingClub}
              onSubmit={handleSaveClub}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Clubs Table */}
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
              <th style={{ padding: '14px 18px' }}>Club Name</th>
              <th style={{ padding: '14px 18px' }}>Category</th>
              <th style={{ padding: '14px 18px' }}>Lead Organizer</th>
              <th style={{ padding: '14px 18px' }}>Members</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={c.logo}
                      alt={c.name}
                      style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c.name}</div>
                  </div>
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span className="badge badge-primary">{c.category}</span>
                </td>
                <td style={{ padding: '14px 18px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {c.lead}
                </td>
                <td style={{ padding: '14px 18px', fontSize: '0.85rem' }}>
                  {c.membersCount} students
                </td>
                <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button
                      onClick={() => {
                        setEditingClub(c);
                        setShowForm(true);
                      }}
                      className="btn btn-secondary btn-sm"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteClub(c.id)}
                      className="btn btn-danger btn-sm"
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
    </div>
  );
};

export default ManageClubs;
