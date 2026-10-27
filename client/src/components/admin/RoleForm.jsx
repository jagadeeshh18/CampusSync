import React, { useState } from 'react';
import { FACULTY_ROLES } from '../../utils/constants';
import { Award, User, FileText, Save, X } from 'lucide-react';

export const RoleForm = ({ eventId, initialData, facultyList = [], onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    roleType: initialData?.roleType || FACULTY_ROLES.JUDGE,
    description: initialData?.description || '',
    facultyId: initialData?.facultyId || ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        eventId,
        ...formData
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
          {initialData ? 'Edit Faculty Role' : 'Define New Faculty Role'}
        </h4>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Role Title *</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. Grand Finale Technical Judge"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Role Type *</label>
          <select
            name="roleType"
            value={formData.roleType}
            onChange={handleChange}
            className="form-select"
          >
            <option value={FACULTY_ROLES.JUDGE}>Judge</option>
            <option value={FACULTY_ROLES.COORDINATOR}>Coordinator</option>
            <option value={FACULTY_ROLES.SESSION_CHAIR}>Session Chair</option>
            <option value={FACULTY_ROLES.EVALUATOR}>Evaluator</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Assign Faculty Member</label>
        <select
          name="facultyId"
          value={formData.facultyId}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Leave Unassigned (Assign later)</option>
          {facultyList.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name} &bull; {f.department} ({f.designation})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Duties & Responsibilities Description *</label>
        <textarea
          name="description"
          rows={3}
          required
          value={formData.description}
          onChange={handleChange}
          className="form-textarea"
          placeholder="Specific duties, evaluation rubric parameters, or time commitment expected..."
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary btn-sm">
            Cancel
          </button>
        )}
        <button type="submit" disabled={loading} className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
          <Save size={14} /> {loading ? 'Saving...' : initialData ? 'Update Role' : 'Save Role'}
        </button>
      </div>
    </form>
  );
};

export default RoleForm;
