import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div
      className="container"
      style={{
        padding: '6rem 1.5rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--danger)',
          marginBottom: '1.5rem'
        }}
      >
        <AlertCircle size={36} />
      </div>

      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '8px' }}>404</h1>
      <h2 style={{ fontSize: '1.4rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '420px', marginBottom: '2rem' }}>
        The page you are looking for does not exist or has been relocated in the campus directory.
      </p>

      <Link to="/" className="btn btn-primary" style={{ gap: '8px' }}>
        <Home size={16} /> Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
