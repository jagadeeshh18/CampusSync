import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

export const ClubForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || 'Technical',
    lead: initialData?.lead || '',
    contactEmail: initialData?.contactEmail || '',
    description: initialData?.description || '',
    logo: initialData?.logo || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=150&auto=format&fit=crop&q=80',
    banner: initialData?.banner || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80'
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
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <h4 style={{ fontSize: '1.25rem', fontWeight: 700 }}>
          {initialData ? 'Edit Club Profile' : 'Register New Club / Chapter'}
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
          <label className="form-label">Club Name *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. AI Research & Robotics Club"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category *</label>
          <input
            type="text"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. Technical, Cultural, Innovation"
          />
        </div>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Faculty / Student Lead *</label>
          <input
            type="text"
            name="lead"
            required
            value={formData.lead}
            onChange={handleChange}
            className="form-input"
            placeholder="Lead Organizer Name"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Official Contact Email *</label>
          <input
            type="email"
            name="contactEmail"
            required
            value={formData.contactEmail}
            onChange={handleChange}
            className="form-input"
            placeholder="club@college.edu"
          />
        </div>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Logo Image URL</label>
          <input
            type="url"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Banner Image URL</label>
          <input
            type="url"
            name="banner"
            value={formData.banner}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Description & Mission *</label>
        <textarea
          name="description"
          rows={3}
          required
          value={formData.description}
          onChange={handleChange}
          className="form-textarea"
          placeholder="Mission, activities, and goals of this club..."
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary btn-sm">
            Cancel
          </button>
        )}
        <button type="submit" disabled={loading} className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
          <Save size={14} /> {loading ? 'Saving...' : initialData ? 'Update Club' : 'Save Club'}
        </button>
      </div>
    </form>
  );
};

export default ClubForm;
