import React, { useState } from 'react';
import { ExternalLink, CheckCircle, Ticket } from 'lucide-react';

export const RegisterButton = ({ registrationLink, eventTitle, maxParticipants }) => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleOpenLink = () => {
    window.open(registrationLink || 'https://forms.google.com', '_blank', 'noopener,noreferrer');
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-primary"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 700
        }}
      >
        <Ticket size={18} /> Register for Event
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ padding: '28px', maxWidth: '480px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: 'var(--primary-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <ExternalLink size={20} color="#ffffff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '2px' }}>External Registration</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  CampusSync redirects to official club registration form
                </p>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px', lineHeight: 1.6 }}>
              You are about to be redirected to the official Google Form / registration portal for:
              <br />
              <strong style={{ color: 'var(--text-primary)' }}>{eventTitle}</strong>
            </p>

            {maxParticipants && (
              <div
                style={{
                  background: 'var(--bg-secondary)',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '20px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>Capacity limit:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {maxParticipants} participants max
                </span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleOpenLink}
                className="btn btn-primary"
              >
                Proceed to Form <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterButton;
