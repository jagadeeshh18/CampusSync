import React, { useState, useEffect } from 'react';
import { authService } from '../../services/authService';
import { roleService } from '../../services/roleService';
import { availabilityService } from '../../services/availabilityService';
import { Loader } from '../../components/common/Loader';
import { Users, Award, Calendar, CheckCircle2 } from 'lucide-react';

export const AssignFaculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [faculty, allRoles, allAvail] = await Promise.all([
          authService.getFacultyMembers(),
          roleService.getAllRoles(),
          availabilityService.getAllAvailability()
        ]);
        setFacultyList(faculty);
        setRoles(allRoles);
        setAvailability(allAvail);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loader text="Loading faculty directory and assignments..." />;
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <span className="badge badge-primary" style={{ marginBottom: '6px' }}>
          Academic Rosters
        </span>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Faculty Directory &amp; Duty Roster</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Inspect active workloads, past event history, and expertise tags of eligible faculty.
        </p>
      </div>

      <div className="grid-cards">
        {facultyList.map((faculty) => {
          const facultyRoles = roles.filter((r) => r.facultyId === faculty.id);
          const leaveRecords = availability.filter(
            (a) => a.facultyId === faculty.id && a.status === 'leave'
          );

          return (
            <div
              key={faculty.id}
              className="glass-panel"
              style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <img
                  src={faculty.avatar}
                  alt={faculty.name}
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{faculty.name}</h4>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {faculty.designation}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary-500)', fontWeight: 600 }}>
                    {faculty.department}
                  </div>
                </div>
              </div>

              {/* Expertise tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {faculty.expertise?.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.72rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats Bar */}
              <div
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)'
                }}
              >
                <div>
                  Assigned Roles: <strong style={{ color: 'var(--text-primary)' }}>{facultyRoles.length}</strong>
                </div>
                <div>
                  Leave Days: <strong style={{ color: 'var(--text-primary)' }}>{leaveRecords.length}</strong>
                </div>
                <div>
                  Experience: <strong style={{ color: 'var(--text-primary)' }}>{faculty.experienceYears}y</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssignFaculty;
