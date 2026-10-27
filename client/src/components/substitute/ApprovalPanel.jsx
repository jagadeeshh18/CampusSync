import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { SubstituteSuggestionList } from './SubstituteSuggestionList';
import { substituteService } from '../../services/substituteService';
import { useNotifications } from '../../hooks/useNotifications';
import { useAuth } from '../../hooks/useAuth';
import { useSocket } from '../../hooks/useSocket';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Calendar,
  User,
  ArrowRight,
  Clock
} from 'lucide-react';
import { formatDate } from '../../utils/formatDate';

export const ApprovalPanel = ({ requests = [], onRequestUpdated }) => {
  const { user } = useAuth();
  const socket = useSocket();
  const { addToast } = useNotifications();

  const [activeRequest, setActiveRequest] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  // Load AI suggestions for a request
  const handleLoadSuggestions = async (request) => {
    setActiveRequest(request);
    setLoadingSuggestions(true);
    try {
      const results = await substituteService.getSuggestions(request.id);
      setSuggestions(results);
    } catch (err) {
      addToast({
        title: 'AI Processing Error',
        message: err.message,
        type: 'danger'
      });
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Approve a substitute
  const handleApproveSubstitute = async (substituteFacultyId) => {
    if (!activeRequest) return;

    try {
      const updated = await substituteService.approveSubstitute(
        activeRequest.id,
        substituteFacultyId,
        user?.id
      );

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }

      addToast({
        title: 'Substitute Approved!',
        message: `Successfully allocated substitute for "${activeRequest.roleTitle}".`,
        type: 'success'
      });

      // Emit real-time socket event
      socket.emit('SUBSTITUTE_APPROVED', {
        requestId: activeRequest.id,
        roleId: activeRequest.roleId,
        facultyId: substituteFacultyId,
        message: `Substitute assigned for "${activeRequest.roleTitle}".`
      });

      setActiveRequest(null);
      setSuggestions([]);
      if (onRequestUpdated) onRequestUpdated();
    } catch (err) {
      addToast({
        title: 'Allocation Failed',
        message: err.message,
        type: 'danger'
      });
    }
  };

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const resolvedRequests = requests.filter((r) => r.status !== 'pending');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Pending Requests Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>
              Action Required: Pending Substitutions ({pendingRequests.length})
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Faculty members marked unavailable requiring urgent role replacement
            </p>
          </div>
          {pendingRequests.length > 0 && (
            <span className="badge badge-warning">
              <AlertTriangle size={12} /> {pendingRequests.length} Unresolved
            </span>
          )}
        </div>

        {pendingRequests.length === 0 ? (
          <div
            className="glass-panel"
            style={{ padding: '2.5rem', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}
          >
            <CheckCircle2 size={36} color="var(--success)" style={{ margin: '0 auto 10px auto' }} />
            <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>All Roles Fully Covered</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              No faculty unavailability reports are awaiting substitute allocation.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {pendingRequests.map((req) => {
              const isActive = activeRequest?.id === req.id;

              return (
                <div
                  key={req.id}
                  className="glass-panel"
                  style={{
                    padding: '20px 24px',
                    borderRadius: 'var(--radius-lg)',
                    borderLeft: '4px solid var(--warning)',
                    background: isActive ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-surface)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                >
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="badge badge-warning">Unavailability Reported</span>
                      <span className="badge badge-primary">{req.roleType}</span>
                    </div>

                    <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px' }}>
                      {req.roleTitle}
                    </h4>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '6px' }}>
                      Event: {req.eventTitle}
                    </div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      Original Assignee: <strong>{req.originalFacultyName}</strong> ({req.originalFacultyDept})
                    </div>

                    <div
                      style={{
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(245, 158, 11, 0.1)',
                        border: '1px solid rgba(245, 158, 11, 0.2)',
                        fontSize: '0.8rem',
                        color: '#fef3c7'
                      }}
                    >
                      <strong>Reason for Absence:</strong> {req.reason}
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => handleLoadSuggestions(req)}
                      className="btn btn-gemini"
                      style={{ gap: '8px' }}
                    >
                      <Sparkles size={16} />
                      {isActive ? 'Refreshing AI Pool...' : 'Run Gemini AI Substitute Allocation'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Active AI Suggestion List Modal or Section */}
      {activeRequest && (
        <div style={{ marginTop: '1rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>
                Gemini Recommendations for: <span className="gradient-text">{activeRequest.roleTitle}</span>
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Compare candidate suitability, inspect rationale, and assign substitute in 1 click.
              </p>
            </div>
            <button
              onClick={() => setActiveRequest(null)}
              className="btn btn-secondary btn-sm"
            >
              Close AI Panel
            </button>
          </div>

          <SubstituteSuggestionList
            suggestions={suggestions}
            loading={loadingSuggestions}
            request={activeRequest}
            onApproveSubstitute={handleApproveSubstitute}
          />
        </div>
      )}

      {/* Resolved Substitute History */}
      {resolvedRequests.length > 0 && (
        <div>
          <h4 style={{ fontSize: '1.15rem', marginBottom: '14px', color: 'var(--text-secondary)' }}>
            Completed & Approved Substitutions History
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {resolvedRequests.map((res) => (
              <div
                key={res.id}
                className="glass-panel"
                style={{
                  padding: '14px 20px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderLeft: '4px solid var(--success)',
                  fontSize: '0.85rem',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <div>
                  <strong>{res.roleTitle}</strong> at {res.eventTitle}
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Original: {res.originalFacultyName} &rarr; Replaced by: <strong>{res.selectedSubstituteName}</strong>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-success">
                    <CheckCircle2 size={12} /> Approved
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {formatDate(res.reviewedAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalPanel;
