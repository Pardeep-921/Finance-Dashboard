import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { Bell, Sun, Moon, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ activeTab, toggleSidebar }) => {
  const { role, setRole, isDarkMode, toggleTheme } = useFinance();

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Overview';
      case 'transactions': return 'Transactions';
      case 'insights': return 'Insights';
      default: return 'Overview';
    }
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.25rem 2.5rem',
      backgroundColor: 'transparent',
      width: '100%',
      zIndex: 100
    }}>
      {/* Left Section: Title */}
      <div className="flex align-center gap-4">
        <button 
          className="show-mobile flex-center"
          onClick={toggleSidebar}
          style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '12px', 
            background: 'var(--bg-secondary)',
            border: '2px solid var(--primary-glow)',
            padding: '0',
            boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
            color: 'var(--text-primary)'
          }}
        >
          <Menu size={24} />
        </button>
        <h1 style={{ 
          fontSize: '1.75rem', 
          fontWeight: '700', 
          color: 'var(--primary)',
          letterSpacing: '-0.03em'
        }}>
          {getTitle()}
        </h1>
      </div>

      {/* Right Section: Controls & Profile */}
      <div className="flex align-center gap-6">
        {/* Role Toggle Switch */}
        <div className="hide-tablet" style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid var(--outline)',
          position: 'relative'
        }}>
          {['ADMIN', 'VIEWER'].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r.charAt(0) + r.slice(1).toLowerCase())}
              style={{
                padding: '8px 20px',
                borderRadius: '10px',
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '0.05em',
                zIndex: 2,
                color: (role.toUpperCase() === r) ? '#0b1326' : 'var(--text-muted)',
                transition: 'color 0.3s ease'
              }}
            >
              {r}
            </button>
          ))}
          <motion.div
            layoutId="role-bg"
            animate={{ 
              x: role.toUpperCase() === 'ADMIN' ? 0 : '100%',
            }}
            initial={false}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'absolute',
              top: '4px',
              left: '4px',
              bottom: '4px',
              width: 'calc(50% - 4px)',
              background: 'var(--primary)',
              borderRadius: '10px',
              zIndex: 1
            }}
          />
        </div>

        {/* Theme & Notifications */}
        <div className="flex align-center gap-2">
          <button 
            onClick={toggleTheme}
            className="flex-center glass-hover" 
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.03)',
              color: 'var(--text-secondary)'
            }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button 
            className="flex-center glass-hover" 
            style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.03)',
              color: 'var(--text-secondary)',
              position: 'relative'
            }}
          >
            <Bell size={20} />
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '8px',
              height: '8px',
              background: 'var(--tertiary)',
              borderRadius: '50%',
              border: '2px solid var(--bg-primary)'
            }} />
          </button>
        </div>

        {/* Vertical Divider */}
        <div style={{ height: '32px', width: '1px', background: 'var(--outline)', margin: '0 8px' }} />

        {/* User Card */}
        <div className="flex align-center gap-3">
          <div style={{ textAlign: 'right' }} className="hide-mobile">
            <p style={{ 
              fontSize: '0.9rem', 
              fontWeight: '800', 
              color: 'var(--text-primary)',
              lineHeight: '1.2' 
            }}>
              Alex Sterling
            </p>
            <p style={{ 
              fontSize: '0.7rem', 
              fontWeight: '700', 
              color: 'var(--primary)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Portfolio Manager
            </p>
          </div>
          
          <div style={{ 
            width: '45px', 
            height: '45px', 
            borderRadius: '12px',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--outline-bright)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              alt="Avatar" 
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
