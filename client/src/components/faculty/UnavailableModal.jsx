import React, { useState } from 'react';
import { AlertTriangle, Sparkles, X, Check } from 'lucide-react';

export const UnavailableModal = ({ role, isOpen, onClose, onSubmit }) => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !role) return null;

  const quickReasons = [
    'Attending International Academic Conference',
    'University Examination Duty / Evaluation Conflict',
    'Medical Leave / Urgent Health Consultation',
    'Department Accreditation Review Meeting',
    'Personal Emergency / Urgent Family Commitment'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) return;

    setLoading(true);
    try {
      await onSubmit(role.id, reason);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '28px', maxWidth: '540px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--warning)'
              }}
            >
              <AlertTriangle size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '2px' }}>Report Unavailability</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {role.title} &bull; {role.roleType}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* AI Notice Banner */}
        <div
          style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(155, 114, 203, 0.12)',
            border: '1px solid rgba(155, 114, 203, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
          }}
        >
          <Sparkles size={18} color="#c084fc" />
          <div style={{ fontSize: '0.82rem', color: '#e9d5ff' }}>
            Submitting this notice triggers the <strong>Google Gemini AI Allocation Engine</strong> to match an eligible substitute from available faculty.
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Quick Reason or Write Details:</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              {quickReasons.map((qr) => (
                <button
                  type="button"
                  key={qr}
                  onClick={() => setReason(qr)}
                  style={{
                    textAlign: 'left',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: reason === qr ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-secondary)',
                    border: reason === qr ? '1px solid var(--primary-500)' : '1px solid var(--border-subtle)',
                    color: reason === qr ? '#ffffff' : 'var(--text-secondary)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  {qr}
                </button>
              ))}
            </div>

            <textarea
              className="form-textarea"
              placeholder="Or specify the reason for absence..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !reason.trim()}
              style={{ background: 'var(--warning)', borderColor: 'transparent' }}
            >
              {loading ? 'Submitting...' : 'Confirm Unavailability'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UnavailableModal;
