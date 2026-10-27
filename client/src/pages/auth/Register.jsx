import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';
import { DEPARTMENTS, USER_ROLES } from '../../utils/constants';
import { Sparkles, UserPlus } from 'lucide-react';

export const Register = () => {
  const { register } = useAuth();
  const { addToast } = useNotifications();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: USER_ROLES.STUDENT,
    department: DEPARTMENTS[0],
    designation: 'Student'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      designation:
        name === 'role'
          ? value === USER_ROLES.FACULTY
            ? 'Assistant Professor'
            : value === USER_ROLES.ORGANIZER
            ? 'Club Lead'
            : 'Student'
          : prev.designation
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newUser = await register(formData);
      addToast({
        title: 'Account Registered',
        message: `Welcome ${newUser.name}! Your account has been initialized.`,
        type: 'success'
      });
      navigate('/events');
    } catch (err) {
      addToast({
        title: 'Registration Failed',
        message: err.message,
        type: 'danger'
      });
    } finally {
      setLoading(false);
    }
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
      <div style={{ maxWidth: '500px', width: '100%' }}>
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
              margin: '0 auto 12px auto'
            }}
          >
            <Sparkles size={24} color="#ffffff" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Create an Account</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Join the centralized campus event management portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-xl)' }}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Prof. Alan Turing"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Institutional Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@college.edu"
              className="form-input"
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">User Role *</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-select"
              >
                <option value={USER_ROLES.STUDENT}>Student</option>
                <option value={USER_ROLES.FACULTY}>Faculty Member</option>
                <option value={USER_ROLES.ORGANIZER}>Club Organizer</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Designation / Title</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Academic Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-select"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '12px' }}
          >
            {loading ? 'Creating Account...' : 'Complete Registration'} <UserPlus size={16} />
          </button>

          <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary-500)', fontWeight: 600 }}>
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
