import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { Sparkles, LogIn, Shield, Users, UserCheck, ArrowRight } from 'lucide-react';

export const Login = () => {
  const { login, users, switchUser } = useAuth();
  const { addToast } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loggedUser = await login(email, password);
      addToast({
        title: 'Welcome Back!',
        message: `Logged in as ${loggedUser.name} (${loggedUser.role}).`,
        type: 'success'
      });

      if (loggedUser.role === 'admin') navigate('/admin');
      else if (loggedUser.role === 'organizer') navigate('/organizer');
      else if (loggedUser.role === 'faculty') navigate('/faculty');
      else navigate('/events');
    } catch (err) {
      addToast({
        title: 'Login Error',
        message: err.message,
        type: 'danger'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoClick = (demoUser) => {
    switchUser(demoUser.id);
    addToast({
      title: 'Demo Account Activated',
      message: `Signed in as ${demoUser.name} (${demoUser.role}).`,
      type: 'info'
    });

    if (demoUser.role === 'admin') navigate('/admin');
    else if (demoUser.role === 'organizer') navigate('/organizer');
    else if (demoUser.role === 'faculty') navigate('/faculty');
    else navigate('/events');
  };

  return (
    <div
      className="container"
      style={{
        padding: '3rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh'
      }}
    >
      <div style={{ maxWidth: '440px', width: '100%' }}>
        {/* Logo and title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'var(--primary-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              boxShadow: 'var(--shadow-glow)'
            }}
          >
            <Sparkles size={24} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Welcome to CampusSync</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Event and Faculty Role Management Platform
          </p>
        </div>

        {/* 1-Click Quick Demo Login Shortcuts */}
        <div
          className="glass-panel"
          style={{
            padding: '16px 20px',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), var(--bg-surface))'
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary-500)', marginBottom: '8px' }}>
            ⚡ 1-Click Instant Demo Login:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {users.slice(0, 4).map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleDemoClick(u)}
                className="btn btn-secondary btn-sm"
                style={{
                  fontSize: '0.75rem',
                  padding: '8px',
                  justifyContent: 'flex-start',
                  textTransform: 'capitalize'
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background:
                      u.role === 'admin'
                        ? '#ef4444'
                        : u.role === 'organizer'
                        ? '#6366f1'
                        : '#10b981'
                  }}
                />
                {u.role}: {u.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleLogin} className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-xl)' }}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. sarah.jenkins@college.edu"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '12px' }}
          >
            {loading ? 'Signing in...' : 'Sign In'} <LogIn size={16} />
          </button>

          <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            New user?{' '}
            <Link to="/register" style={{ color: 'var(--primary-500)', fontWeight: 600 }}>
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
