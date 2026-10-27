import React, { useState, useEffect } from 'react';
import { substituteService } from '../../services/substituteService';
import { ApprovalPanel } from '../../components/substitute/ApprovalPanel';
import { Loader } from '../../components/common/Loader';
import { Sparkles, BrainCircuit, ShieldAlert, Key, Settings } from 'lucide-react';
import { STORAGE_KEYS } from '../../utils/constants';
import { useNotifications } from '../../hooks/useNotifications';

export const SubstituteRequests = () => {
  const { addToast } = useNotifications();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gemini API key state
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(STORAGE_KEYS.GEMINI_API_KEY) || '');

  const fetchRequests = async () => {
    try {
      const data = await substituteService.getRequests();
      setRequests(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem(STORAGE_KEYS.GEMINI_API_KEY, apiKey.trim());
      addToast({
        title: 'Gemini Key Configured',
        message: 'Custom Google Gemini API key saved for live inference.',
        type: 'success'
      });
    } else {
      localStorage.removeItem(STORAGE_KEYS.GEMINI_API_KEY);
      addToast({
        title: 'Standard Engine Active',
        message: 'Using built-in deterministic Gemini 1.5 simulation engine.',
        type: 'info'
      });
    }
    setShowKeyModal(false);
  };

  if (loading) {
    return <Loader text="Scanning Substitute Allocation Queue..." />;
  }

  return (
    <div>
      {/* Page Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="badge badge-gemini">
              <Sparkles size={12} /> Google Gemini AI Engine
            </span>
            <span className="badge badge-success">Socket.io Broadcast Active</span>
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800 }}>Smart Substitute Allocation</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Automated ranking and allocation of eligible faculty substitutes when absence or unavailability is reported.
          </p>
        </div>

        <button
          onClick={() => setShowKeyModal(true)}
          className="btn btn-secondary btn-sm"
          style={{ gap: '6px' }}
        >
          <Key size={14} /> Configure Gemini API Key
        </button>
      </div>

      {/* Main Approval Panel */}
      <ApprovalPanel requests={requests} onRequestUpdated={fetchRequests} />

      {/* Optional Gemini API Key Modal */}
      {showKeyModal && (
        <div className="modal-overlay" onClick={() => setShowKeyModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ padding: '28px', maxWidth: '520px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--gemini-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <Sparkles size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '2px' }}>Google Gemini AI Settings</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Optional live Google Gemini API Key configuration
                </p>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '18px' }}>
              The application includes a built-in deterministic simulation of Gemini 1.5 Flash that evaluates department synergy, prior role history, date availability, and workload balance out of the box. You may also provide a live Google Gemini API key:
            </p>

            <form onSubmit={handleSaveApiKey}>
              <div className="form-group">
                <label className="form-label">Google Gemini API Key (Optional):</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="form-input"
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Keys are stored exclusively in your local browser storage and never transmitted elsewhere.
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubstituteRequests;
