import React, { useState } from 'react';
import { FinanceProvider } from './context/FinanceContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'transactions': return <Transactions />;
      case 'insights': return <Insights />;
      default: return <Dashboard />;
    }
  };

  return (
    <FinanceProvider>
      <div className="flex" style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
        {/* Mobile Backdrop */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
                zIndex: 998
              }}
            />
          )}
        </AnimatePresence>

        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isOpen={isSidebarOpen} 
          setIsOpen={setSidebarOpen} 
        />
        
        <main style={{ 
          flex: 1, 
          overflowY: 'auto', 
          paddingBottom: '4rem',
          maxWidth: '100vw'
        }}>
          <Header activeTab={activeTab} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
          
          <div className="container" style={{ 
            padding: '2rem 1.5rem',
            marginTop: '0.5rem' 
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </FinanceProvider>
  );
}

export default App;
