import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Activity, ShieldCheck, Zap } from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '3rem 0 2rem 0',
        marginTop: 'auto'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem'
          }}
        >
          {/* Col 1: Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--primary-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Sparkles size={16} color="#ffffff" />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.2rem' }}>
                Campus<span className="gradient-text">Sync</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Centralized college event orchestration and automated faculty role allocation powered by Google Gemini AI with smart substitute optimization.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px', alignItems: 'center' }}>
              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                <Activity size={10} /> Client-Side Mode Active
              </span>
              <span className="badge badge-gemini" style={{ fontSize: '0.7rem' }}>
                <Zap size={10} /> Gemini 1.5 Flash
              </span>
            </div>
          </div>

          {/* Col 2: Public Navigation */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
              Explore Campus
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <Link to="/events" style={{ transition: 'color 0.2s' }}>Upcoming Events</Link>
              <Link to="/clubs" style={{ transition: 'color 0.2s' }}>Student Clubs & Chapters</Link>
              <Link to="/about" style={{ transition: 'color 0.2s' }}>Project Architecture</Link>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{ transition: 'color 0.2s' }}>Source Repository</a>
            </div>
          </div>

          {/* Col 3: Role Portals */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
              Management Portals
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <Link to="/faculty" style={{ transition: 'color 0.2s' }}>Faculty Duty Portal</Link>
              <Link to="/faculty/availability" style={{ transition: 'color 0.2s' }}>Faculty Availability Calendar</Link>
              <Link to="/organizer" style={{ transition: 'color 0.2s' }}>Club Organizer Studio</Link>
              <Link to="/organizer/substitutes" style={{ transition: 'color 0.2s' }}>AI Smart Substitute Hub</Link>
              <Link to="/admin" style={{ transition: 'color 0.2s' }}>Super Admin Operations</Link>
            </div>
          </div>

          {/* Col 4: AI Engine Features */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '16px', color: 'var(--text-primary)' }}>
              Smart Allocation Engine
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              When faculty mark unavailable, Gemini AI analyzes department alignment, prior role records, date conflicts, and workload metrics to rank replacements with transparent rationale.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            fontSize: '0.82rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} CampusSync. AI-Assisted Event & Faculty Role Management System.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Built for Academic Excellence &bull; No Backend Required
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
