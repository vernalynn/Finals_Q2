import React from 'react';
import { Info, Code, ShieldCheck, Zap } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header className="text-center mb-8">
        <h1 className="text-accent" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>About TaskFlow</h1>
        <p className="text-secondary">Version 1.0.0 | Finals Phase 2</p>
      </header>

      <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div style={{ color: 'var(--accent-primary)', padding: '0.5rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
            <Info size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Project Overview</h2>
            <p className="text-secondary">
              This application is the frontend implementation (Finals_Q2) of the Todo Management System. It seamlessly integrates with the .NET Web API backend to provide a robust, reliable task management experience.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div style={{ color: 'var(--accent-primary)', padding: '0.5rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
            <Code size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Tech Stack</h2>
            <p className="text-secondary">
              Built using Vite, React, TypeScript, and React Router. State is managed via the Context API, and form orchestration is powered by react-hook-form. Styling is achieved using a premium, custom CSS variables architecture.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div style={{ color: 'var(--accent-primary)', padding: '0.5rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Technical Debt Resolved</h2>
            <ul className="text-secondary" style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Defective filter logic (ID vs Title mismatch) - Fixed</li>
              <li>Defective update logic (Filter used instead of Map) - Fixed</li>
              <li>Defective Reconciliation (Index used as key) - Fixed</li>
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ color: 'var(--accent-primary)', padding: '0.5rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
            <Zap size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Key Features</h2>
            <p className="text-secondary">
              Full CRUD synchronization, programmatic routing, rich dynamic theming, and an intuitive user interface with modern glassmorphism aesthetics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
