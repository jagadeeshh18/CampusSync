import React, { useState } from 'react';
import { SubstituteCard } from './SubstituteCard';
import { Sparkles, BrainCircuit, ShieldCheck, Info } from 'lucide-react';
import { Loader } from '../common/Loader';

export const SubstituteSuggestionList = ({
  suggestions = [],
  loading,
  request,
  onApproveSubstitute
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [approvingId, setApprovingId] = useState(null);

  if (loading) {
    return (
      <div
        className="glass-panel"
        style={{ padding: '3.5rem', textAlign: 'center', borderRadius: 'var(--radius-xl)' }}
      >
        <Loader size="large" text="Consulting Google Gemini AI Model & Scoring Faculty Availability..." />
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
          Evaluating department alignment, prior role records, calendar conflicts, and workload metrics.
        </p>
      </div>
    );
  }

  if (!suggestions || suggestions.length === 0) {
    return (
      <div
        className="glass-panel"
        style={{ padding: '3rem', textAlign: 'center', borderRadius: 'var(--radius-xl)' }}
      >
        <p style={{ color: 'var(--text-secondary)' }}>
          No substitute suggestions available for this request.
        </p>
      </div>
    );
  }

  const handleApprove = async (facultyId) => {
    setApprovingId(facultyId);
    try {
      await onApproveSubstitute(facultyId);
    } finally {
      setApprovingId(null);
    }
  };

  return (
    <div>
      {/* AI Header Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '16px 20px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(155, 114, 203, 0.15), rgba(66, 133, 244, 0.15))',
          border: '1px solid rgba(155, 114, 203, 0.3)',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'var(--gemini-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <Sparkles size={18} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
              Gemini AI Smart Allocation Pool ({suggestions.length} Candidates Ranked)
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Weighting: Department Alignment (35%) + Prior Role History (30%) + Date Availability (20%) + Workload (15%)
            </div>
          </div>
        </div>

        <span className="badge badge-gemini">
          <BrainCircuit size={12} /> Gemini 1.5 Flash
        </span>
      </div>

      {/* Candidates Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {suggestions.map((suggestion) => (
          <SubstituteCard
            key={suggestion.faculty.id}
            suggestion={suggestion}
            isSelected={selectedId === suggestion.faculty.id}
            onSelect={() => setSelectedId(suggestion.faculty.id)}
            onApprove={handleApprove}
            loading={approvingId === suggestion.faculty.id}
          />
        ))}
      </div>
    </div>
  );
};

export default SubstituteSuggestionList;
