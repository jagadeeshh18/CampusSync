import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { roleService } from '../../services/roleService';
import { EventCard } from '../../components/events/EventCard';
import { ClubCard } from '../../components/clubs/ClubCard';
import { useAuth } from '../../hooks/useAuth';
import {
  Sparkles,
  Calendar,
  Users,
  ShieldCheck,
  BrainCircuit,
  ArrowRight,
  Layers,
  Award,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const Home = () => {
  const { user, switchRole } = useAuth();
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [rolesMap, setRolesMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [evts, clbs, roles] = await Promise.all([
          eventService.getEvents(),
          eventService.getClubs(),
          roleService.getAllRoles()
        ]);
        setEvents(evts.slice(0, 3));
        setClubs(clbs.slice(0, 3));

        const rMap = {};
        roles.forEach((r) => {
          rMap[r.eventId] = (rMap[r.eventId] || 0) + 1;
        });
        setRolesMap(rMap);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '5rem 0 4rem 0',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.25), transparent)'
        }}
      >
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          {/* Top AI Badge */}
          <div style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>
            <span
              className="badge badge-gemini"
              style={{
                padding: '6px 14px',
                fontSize: '0.82rem',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={14} /> Powered by Google Gemini AI &bull; No Backend Required
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 800,
              maxWidth: '920px',
              margin: '0 auto 1.5rem auto',
              lineHeight: 1.15
            }}
          >
            Intelligent College Event Platform &amp;{' '}
            <span className="gradient-text">Smart Faculty Role Allocation</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: 'var(--text-secondary)',
              maxWidth: '720px',
              margin: '0 auto 2.5rem auto',
              lineHeight: 1.6
            }}
          >
            A unified campus platform for student event discovery, transparent faculty role responsibilities, and automated Google Gemini substitute reallocation when scheduling conflicts arise.
          </p>

          {/* Call to Actions */}
          <div
            style={{
              display: 'flex',
              gap: '14px',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '3rem'
            }}
          >
            <Link to="/events" className="btn btn-primary btn-lg" style={{ gap: '8px' }}>
              <Calendar size={18} /> Browse College Events
            </Link>
            <Link to="/organizer/substitutes" className="btn btn-gemini btn-lg" style={{ gap: '8px' }}>
              <Sparkles size={18} /> Test Gemini Substitute Engine
            </Link>
          </div>

          {/* Quick Interactive Role Switcher Banner */}
          <div
            className="glass-panel"
            style={{
              maxWidth: '850px',
              margin: '0 auto',
              padding: '16px 24px',
              borderRadius: 'var(--radius-xl)',
              background: 'rgba(16, 23, 38, 0.75)',
              border: '1px solid var(--border-medium)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                ⚡ Test Any Role Instantly (Live Simulation)
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Current view: <strong style={{ color: 'var(--primary-500)', textTransform: 'capitalize' }}>{user?.role}</strong> ({user?.name})
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => switchRole('student')}
                className={`btn btn-sm ${user?.role === 'student' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Student View
              </button>
              <button
                onClick={() => switchRole('faculty')}
                className={`btn btn-sm ${user?.role === 'faculty' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Faculty View
              </button>
              <button
                onClick={() => switchRole('organizer')}
                className={`btn btn-sm ${user?.role === 'organizer' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Organizer Studio
              </button>
              <button
                onClick={() => switchRole('admin')}
                className={`btn btn-sm ${user?.role === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
              >
                Super Admin
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section style={{ padding: '3rem 0', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="grid-3" style={{ gap: '1.5rem' }}>
            <div
              className="glass-panel"
              style={{ padding: '28px', borderRadius: 'var(--radius-lg)' }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(99, 102, 241, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-500)',
                  marginBottom: '16px'
                }}
              >
                <Calendar size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                Centralized Event Platform
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                College clubs publish events with schedules, venues, and descriptions. Students browse verified events and register via official links.
              </p>
            </div>

            <div
              className="glass-panel"
              style={{ padding: '28px', borderRadius: 'var(--radius-lg)' }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(6, 182, 212, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--info)',
                  marginBottom: '16px'
                }}
              >
                <Users size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                Faculty Role Management
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Organizers define specific duties (Judge, Coordinator, Session Chair, Evaluator) and assign faculty with transparent responsibilities.
              </p>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: '28px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(155, 114, 203, 0.3)',
                background: 'linear-gradient(135deg, rgba(155, 114, 203, 0.1), var(--bg-surface))'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'var(--gemini-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  marginBottom: '16px'
                }}
              >
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
                Smart Gemini Substitute Allocation
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                When faculty report unavailability, Google Gemini analyzes department, experience, availability calendar, and workload to rank replacements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Upcoming Events Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '8px' }}>
                Active Schedules
              </span>
              <h2 style={{ fontSize: '2rem' }}>Featured College Events</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Discover upcoming hackathons, symposiums, and cultural tournaments
              </p>
            </div>
            <Link to="/events" className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
              View All Events <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid-cards">
            {events.map((evt) => (
              <EventCard key={evt.id} event={evt} rolesCount={rolesMap[evt.id] || 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Registered Clubs & Chapters Showcase */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <span className="badge badge-gemini" style={{ marginBottom: '8px' }}>
                Student Societies
              </span>
              <h2 style={{ fontSize: '2rem' }}>Active Clubs &amp; Chapters</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Empowering student innovators across technical and cultural domains
              </p>
            </div>
            <Link to="/clubs" className="btn btn-secondary btn-sm" style={{ gap: '6px' }}>
              Explore All Clubs <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid-cards">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </div>
      </section>

      {/* How the Gemini AI Engine Works */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem auto' }}>
            <span className="badge badge-gemini" style={{ marginBottom: '8px' }}>
              Algorithmic Transparency
            </span>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
              How Smart Substitute Allocation Works
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              When a faculty member is marked absent, our Google Gemini AI pipeline computes a multidimensional suitability score across four key vectors:
            </p>
          </div>

          <div className="grid-4" style={{ gap: '1.25rem' }}>
            <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-500)', marginBottom: '8px' }}>
                35%
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>Department Fit</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Direct alignment between event subject matter (e.g. CSE for Hackathons) and faculty home department.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#c084fc', marginBottom: '8px' }}>
                30%
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>Prior Role Track</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Verified institutional track record serving as Judge, Coordinator, Evaluator, or Session Chair.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginBottom: '8px' }}>
                20%
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>Date Availability</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Verification against the faculty availability calendar to ensure no active leave or conflicting academic slots.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginBottom: '8px' }}>
                15%
              </div>
              <h4 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>Workload Balance</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Distributes institutional event responsibilities fairly, preventing faculty fatigue and duty burnout.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
