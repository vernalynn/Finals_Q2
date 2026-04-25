import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Monitor, LayoutDashboard } from 'lucide-react';

export const Layout = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'emerald' | 'midnight'> = ['light', 'dark', 'emerald', 'midnight'];
    const currentIndex = themes.indexOf(theme);
    setTheme(themes[(currentIndex + 1) % themes.length]);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun size={20} />;
      case 'dark': return <Moon size={20} />;
      case 'emerald': return <LayoutDashboard size={20} />;
      case 'midnight': return <Monitor size={20} />;
      default: return <Sun size={20} />;
    }
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          <span style={{ fontSize: '1.5rem', marginRight: '0.25rem' }}>✓</span> 
          TaskFlow
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Tasks
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About
          </Link>
          <button 
            onClick={cycleTheme} 
            className="btn-icon" 
            title={`Current Theme: ${theme}`}
          >
            {getThemeIcon()}
          </button>
        </div>
      </nav>
      <main className="page-wrapper container">
        <Outlet />
      </main>
    </div>
  );
};
