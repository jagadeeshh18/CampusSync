import React, { useState } from 'react';
import { EVENT_CATEGORIES } from '../../utils/constants';
import { Calendar, MapPin, Link2, FileText, Image, Save, X } from 'lucide-react';

export const EventForm = ({ initialData, clubs = [], onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    clubId: initialData?.clubId || (clubs[0]?.id || 'club-1'),
    category: initialData?.category || 'Technical',
    startDate: initialData?.startDate ? initialData.startDate.slice(0, 16) : '2026-11-25T10:00',
    endDate: initialData?.endDate ? initialData.endDate.slice(0, 16) : '2026-11-25T17:00',
    venue: initialData?.venue || '',
    registrationLink: initialData?.registrationLink || 'https://forms.gle/demo-registration',
    registrationDeadline: initialData?.registrationDeadline ? initialData.registrationDeadline.slice(0, 16) : '2026-11-24T23:59',
    maxParticipants: initialData?.maxParticipants || 150,
    banner: initialData?.banner || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80',
    description: initialData?.description || ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const selectedClub = clubs.find((c) => c.id === formData.clubId);

    try {
      await onSubmit({
        ...formData,
        clubName: selectedClub?.name || 'Student Club'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-xl)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>
          {initialData ? 'Edit Event Details' : 'Publish New College Event'}
        </h3>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Event Title *</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. HackSprint 2026"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Host Club / Chapter *</label>
          <select
            name="clubId"
            value={formData.clubId}
            onChange={handleChange}
            className="form-select"
          >
            {clubs.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid-3">
        <div className="form-group">
          <label className="form-label">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="form-select"
          >
            {EVENT_CATEGORIES.filter((c) => c !== 'All').map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Start Date & Time *</label>
          <input
            type="datetime-local"
            name="startDate"
            required
            value={formData.startDate}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">End Date & Time *</label>
          <input
            type="datetime-local"
            name="endDate"
            required
            value={formData.endDate}
            onChange={handleChange}
            className="form-input"
          />
        </div>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Campus Venue *</label>
          <input
            type="text"
            name="venue"
            required
            value={formData.venue}
            onChange={handleChange}
            className="form-input"
            placeholder="e.g. Auditorium Hall B & Lab 3"
          />
        </div>

        <div className="form-group">
          <label className="form-label">External Registration Form Link *</label>
          <input
            type="url"
            name="registrationLink"
            required
            value={formData.registrationLink}
            onChange={handleChange}
            className="form-input"
            placeholder="https://forms.gle/..."
          />
        </div>
      </div>

      <div className="grid-2">
        <div className="form-group">
          <label className="form-label">Max Participants Capacity</label>
          <input
            type="number"
            name="maxParticipants"
            value={formData.maxParticipants}
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
        <label className="form-label">Event Description & Guidelines *</label>
        <textarea
          name="description"
          rows={4}
          required
          value={formData.description}
          onChange={handleChange}
          className="form-textarea"
          placeholder="Detailed breakdown of event rounds, eligibility, prizes, and schedule..."
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        )}
        <button type="submit" disabled={loading} className="btn btn-primary" style={{ gap: '6px' }}>
          <Save size={16} /> {loading ? 'Saving...' : initialData ? 'Update Event' : 'Publish Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
