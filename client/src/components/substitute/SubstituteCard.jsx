import React from 'react';
import { Sparkles, Check, CheckCircle2, Award, Briefcase, Calendar, ChevronRight } from 'lucide-react';

export const SubstituteCard = ({ suggestion, onSelect, isSelected, onApprove, loading }) => {
  const { faculty, matchPercentage, reasoningPoints, aiJustification, badge } = suggestion;

  // Determine score color
  const getScoreColor = (score) => {
    if (score >= 85) return '#10b981';
    if (score >= 70) return '#6366f1';
    return '#f59e0b';
  };

  const scoreColor = getScoreColor(matchPercentage);

  return (
    <div
      className="glass-panel"
      style={{
        padding: '24px',
        borderRadius: 'var(--radius-xl)',
        border: isSelected ? '2px solid var(--primary-500)' : '1px solid var(--border-medium)',
        background: isSelected
          ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.12), var(--bg-surface))'
          : 'var(--bg-surface)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.2s',
        boxShadow: isSelected ? 'var(--shadow-glow)' : 'var(--shadow-md)'
      }}
    >
      <div>
        {/* Header: Faculty Details + Compatibility Dial */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '14px',
            marginBottom: '16px'
          }}
        >
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <img
              src={faculty.avatar}
              alt={faculty.name}
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid rgba(255, 255, 255, 0.12)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{faculty.name}</h4>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {faculty.designation} &bull; {faculty.department}
              </div>
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                <span className="badge badge-gemini" style={{ fontSize: '0.68rem' }}>
                  <Sparkles size={10} /> {badge}
                </span>
                <span className="badge badge-info" style={{ fontSize: '0.68rem' }}>
                  {faculty.experienceYears} Yrs Experience
                </span>
              </div>
            </div>
          </div>

          {/* AI Match Dial */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              border: `3px solid ${scoreColor}`,
              background: 'rgba(0, 0, 0, 0.2)',
              flexShrink: 0
            }}
          >
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: scoreColor, lineHeight: 1 }}>
              {matchPercentage}%
            </span>
            <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Match
            </span>
          </div>
        </div>

        {/* Gemini AI Justification Quote */}
        <div
          style={{
            padding: '12px 14px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(155, 114, 203, 0.08)',
            border: '1px solid rgba(155, 114, 203, 0.25)',
            marginBottom: '16px',
            fontSize: '0.82rem',
            lineHeight: 1.55,
            color: '#e9d5ff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '4px', color: '#c084fc' }}>
            <Sparkles size={13} /> Gemini AI Recommendation Rationale:
          </div>
          {aiJustification}
        </div>

        {/* Factor Breakdown Points */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px' }}>
            Algorithm Scoring Evaluation:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {reasoningPoints.map((pt, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.78rem',
                  color: pt.includes('⚠️') ? '#fbbf24' : 'var(--text-secondary)'
                }}
              >
                {!pt.includes('⚠️') && <Check size={13} color="#10b981" />}
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Workload: <strong>{faculty.currentWorkload || 0} active assignments</strong>
        </div>

        <button
          onClick={() => onApprove(faculty.id)}
          disabled={loading}
          className="btn btn-primary btn-sm"
          style={{ gap: '6px' }}
        >
          {loading ? (
            'Allocating...'
          ) : (
            <>
              <CheckCircle2 size={14} /> Approve & Assign Substitute
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SubstituteCard;
