import React, { useState } from 'react';
import { UserCheck, X, Check } from 'lucide-react';

export const AssignFacultyForm = ({ role, facultyList = [], onSubmit, onCancel }) => {
  const [selectedFacultyId, setSelectedFacultyId] = useState(role?.facultyId || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFacultyId) return;

    setLoading(true);
    try {
      await onSubmit(role.id, selectedFacultyId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '28px', maxWidth: '500px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'rgba(99, 102, 241, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-500)'
              }}
            >
              <UserCheck size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '2px' }}>Assign Faculty</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {role.title} ({role.roleType})
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Faculty Member:</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
              {facultyList.map((f) => {
                const isSelected = selectedFacultyId === f.id;
                return (
                  <div
                    key={f.id}
                    onClick={() => setSelectedFacultyId(f.id)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-secondary)',
                      border: isSelected ? '1px solid var(--primary-500)' : '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <img
                      src={f.avatar}
                      alt={f.name}
                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{f.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {f.department} &bull; {f.designation}
                      </div>
                    </div>
                    {isSelected && <Check size={18} color="var(--primary-500)" />}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" onClick={onCancel} className="btn btn-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !selectedFacultyId}
              className="btn btn-primary"
            >
              {loading ? 'Assigning...' : 'Confirm Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignFacultyForm;
