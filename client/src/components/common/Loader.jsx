import React from 'react';

export const Loader = ({ size = 'medium', text = 'Loading...' }) => {
  const pixelSize = size === 'small' ? 24 : size === 'large' ? 48 : 36;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem',
        gap: '1rem',
        color: 'var(--text-secondary)'
      }}
    >
      <div
        style={{
          width: `${pixelSize}px`,
          height: `${pixelSize}px`,
          border: '3px solid rgba(99, 102, 241, 0.15)',
          borderTopColor: 'var(--primary-500)',
          borderRightColor: '#8b5cf6',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}
      />
      {text && <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{text}</span>}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export const CardSkeleton = () => (
  <div
    className="glass-panel"
    style={{
      height: '320px',
      borderRadius: 'var(--radius-lg)',
      background: 'linear-gradient(90deg, var(--bg-surface) 25%, var(--bg-surface-hover) 50%, var(--bg-surface) 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.8s infinite'
    }}
  >
    <style>{`
      @keyframes shimmer {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  </div>
);

export default Loader;
