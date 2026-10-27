import React, { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import { Layers, Building2, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const data = await eventService.getDepartments();
        setDepartments(data);
      } finally {
        setLoading(false);
      }
    };
    fetchDepts();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <Link
          to="/admin"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.85rem'
          }}
        >
          <ArrowLeft size={16} /> Back to admin console
        </Link>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '6px' }}>
          Academic Structure
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Academic Departments</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Overview of campus departments utilized by the Gemini AI engine for faculty allocation synergy.
        </p>
      </div>

      <div className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead>
            <tr
              style={{
                borderBottom: '1px solid var(--border-medium)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                textTransform: 'uppercase'
              }}
            >
              <th style={{ padding: '14px 18px' }}>Department Name</th>
              <th style={{ padding: '14px 18px' }}>Code</th>
              <th style={{ padding: '14px 18px' }}>Head of Department (HOD)</th>
              <th style={{ padding: '14px 18px' }}>Faculty Count</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d) => (
              <tr key={d.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px 18px', fontWeight: 600, fontSize: '0.9rem' }}>
                  {d.name}
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span className="badge badge-primary">{d.code}</span>
                </td>
                <td style={{ padding: '14px 18px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {d.hod}
                </td>
                <td style={{ padding: '14px 18px', fontSize: '0.85rem' }}>
                  {d.facultyCount} Professors
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDepartments;
