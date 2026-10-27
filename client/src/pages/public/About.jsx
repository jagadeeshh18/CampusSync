import React from 'react';
import { Sparkles, Layers, ShieldCheck, Database, Zap, Cpu, Users, GitBranch } from 'lucide-react';

export const About = () => {
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-gemini" style={{ marginBottom: '8px' }}>
            System Architecture &amp; Specifications
          </span>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 800, marginBottom: '12px' }}>
            About CampusSync AI
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            AI-Assisted Event and Faculty Role Management System with Smart Gemini Substitute Allocation.
          </p>
        </div>

        {/* Client-Only Execution Banner */}
        <div
          className="glass-panel"
          style={{
            padding: '20px 24px',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(99, 102, 241, 0.08))',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            marginBottom: '2.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Zap size={20} color="#10b981" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#34d399' }}>
              Client-Side Standalone Front-End Architecture
            </h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            This application is built as a complete, zero-dependency, self-contained front-end application as requested. All data models, Express controller behaviors, Socket.io real-time event broadcasting, and Google Gemini AI candidate ranking algorithms run smoothly in the browser using a reactive mock data store with LocalStorage persistence.
          </p>
        </div>

        {/* 4 User Roles Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>Role Matrix &amp; Permissions</h2>
          <div className="grid-2">
            <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-info">Role 1</span>
                <h4 style={{ fontSize: '1.1rem' }}>Student (Public Viewer)</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Browse campus events, inspect designated faculty juries and responsibilities, view club information, and click to register via external Google Forms or registration portals.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-success">Role 2</span>
                <h4 style={{ fontSize: '1.1rem' }}>Faculty Member</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                View assigned event duties (Judge, Coordinator, Session Chair, Evaluator), maintain personal monthly availability calendar, report unavailability with reasons, and receive substitution alerts.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-primary">Role 3</span>
                <h4 style={{ fontSize: '1.1rem' }}>Club Organizer / Admin</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Create and manage events, define faculty roles with detailed responsibility descriptions, trigger the Google Gemini AI substitute ranking engine, and approve replacements with automated notification dispatch.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span className="badge badge-danger">Role 4</span>
                <h4 style={{ fontSize: '1.1rem' }}>Super Admin / Dean</h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Manage campus users, oversee departments and club recognitions, monitor institutional workload equity, and audit automated substitution decisions.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Specs */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>Full-Stack Technology Foundation</h2>
          <div className="grid-3">
            <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--primary-500)', marginBottom: '4px' }}>
                Frontend Client
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                React (Vite 5), React Router v6, Vanilla CSS Design System, Lucide Icons, Canvas Confetti.
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#c084fc', marginBottom: '4px' }}>
                AI Model Engine
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Google Gemini API (Gemini 1.5 Flash) with contextual multi-criteria faculty ranking.
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#10b981', marginBottom: '4px' }}>
                Real-Time &amp; Persistence
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Bi-directional Socket.io abstraction, Cross-tab StorageEvent sync, LocalStorage mock repository.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
