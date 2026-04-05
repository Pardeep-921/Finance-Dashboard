import React from 'react';
import { LayoutDashboard, Receipt, BarChart3, Settings, LogOut, Wallet, X } from 'lucide-react';
import { useFinance } from '../context/FinanceContext';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const { resetData } = useFinance();
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'transactions', label: 'Transactions', icon: <Receipt size={20} /> },
    { id: 'insights', label: 'Insights', icon: <BarChart3 size={20} /> },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <motion.aside 
      className="glass"
      initial={false}
      animate={{ 
        x: (window.innerWidth <= 768 && !isOpen) ? '-110%' : 0,
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      style={{
        width: '280px',
        height: 'calc(100vh - 3rem)',
        position: window.innerWidth <= 768 ? 'fixed' : 'sticky',
        top: '1.5rem',
        left: window.innerWidth <= 768 ? '1.5rem' : '0',
        margin: window.innerWidth <= 768 ? '0' : '1.5rem 0 1.5rem 1.5rem',
        borderRadius: '24px',
        padding: '2.5rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 1000,
        background: 'var(--bg-glass)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--outline)',
        overflowY: 'auto'
      }}
    >
      <div>
        <div className="flex align-center justify-between" style={{ marginBottom: '3rem', paddingLeft: '0.5rem' }}>
          <div className="flex align-center gap-4">
            <div style={{
              background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
              padding: '10px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px var(--primary-glow)'
            }}>
              <Wallet size={24} color="#003824" />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: '800' }}>
              Sovereign
            </h2>
          </div>
          <button 
            className="show-mobile flex-center"
            onClick={() => setIsOpen(false)}
            style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '10px', 
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--outline)'
            }}
          >
            <X size={20} color="var(--text-muted)" />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex align-center gap-4 w-full glass-hover ${activeTab === item.id ? 'glass' : ''}`}
              style={{
                padding: '12px 16px',
                borderRadius: '16px',
                color: activeTab === item.id ? 'var(--primary)' : 'var(--text-secondary)',
                background: activeTab === item.id ? 'rgba(78, 222, 163, 0.1)' : 'transparent',
                border: activeTab === item.id ? '1px solid rgba(78, 222, 163, 0.2)' : '1px solid transparent',
                transition: 'var(--transition)',
                transform: activeTab === item.id ? 'translateX(4px)' : 'none'
              }}
            >
              <span style={{ color: activeTab === item.id ? 'var(--primary)' : 'var(--text-muted)' }}>
                {item.icon}
              </span>
              <span style={{ fontWeight: activeTab === item.id ? '700' : '500' }}>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-2">
        <button 
          onClick={resetData}
          className="flex align-center gap-4 w-full glass-hover" 
          style={{
            padding: '12px 16px',
            borderRadius: '16px',
            color: 'var(--text-secondary)',
          }}
        >
          <LayoutDashboard size={18} /> Reset Defaults
        </button>
        <button className="flex align-center gap-4 w-full glass-hover" style={{
          padding: '12px 16px',
          borderRadius: '16px',
          color: 'var(--text-secondary)',
        }}>
          <Settings size={18} /> Settings
        </button>
        <button className="flex align-center gap-4 w-full glass-hover" style={{
          padding: '12px 16px',
          borderRadius: '16px',
          color: 'var(--tertiary)',
        }}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
