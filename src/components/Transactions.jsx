import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Search, Download, Plus, Trash2, Edit3, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Transactions = () => {
  const { transactions, deleteTransaction, addTransaction, role } = useFinance();
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    type: 'All',
    sortOrder: 'desc'
  });

  const categories = ['All', ...new Set(transactions.map(t => t.category))];

  const filteredTransactions = transactions
    .filter(tx => 
      tx.description.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.category === 'All' || tx.category === filters.category) &&
      (filters.type === 'All' || tx.type === filters.type)
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return filters.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredTransactions));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "transactions.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleAddTx = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTx = {
      description: formData.get('description'),
      amount: parseFloat(formData.get('amount')),
      category: formData.get('category'),
      type: formData.get('type'),
      date: new Date().toISOString().split('T')[0]
    };
    addTransaction(newTx);
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="flex justify-between align-center flex-wrap gap-4">
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Recent Activity</h2>
          <p className="hide-mobile" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Detailed history of your financial transactions.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={exportData}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid var(--outline-bright)'
            }}
            className="glass-hover"
          >
            <Download size={18} /> <span className="hide-mobile">Export</span>
          </button>
          
          {role === 'Admin' && (
            <button 
              onClick={() => setShowAddModal(true)}
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--primary), var(--primary-container))',
                color: '#003824',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px var(--primary-glow)'
              }}
              className="glass-hover"
            >
              <Plus size={20} strokeWidth={3} /> <span className="hide-mobile">New Transaction</span>
            </button>
          )}
        </div>
      </div>

      <div className="glass" style={{ padding: 'var(--card-padding, 1.5rem)' }}>
        <div className="flex flex-wrap gap-4 justify-between align-center" style={{ marginBottom: '2rem' }}>
          <div className="flex align-center gap-4 flex-wrap w-full md:w-auto">
            <div className="flex align-center gap-2 glass w-full md:w-auto" style={{
              padding: '8px 16px',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--outline)',
              borderRadius: '12px'
            }}>
              <Search size={18} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Search history..." 
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  width: '100%',
                  minWidth: '150px'
                }}
              />
            </div>

            <div className="flex gap-4 w-full md:w-auto">
              <select 
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--outline)',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  outline: 'none',
                  flex: 1
                }}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>

              <select 
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--outline)',
                  padding: '10px 16px',
                  borderRadius: '12px',
                  outline: 'none',
                  flex: 1
                }}
              >
                <option value="All">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>

          <button 
            onClick={() => setFilters({...filters, sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'})}
            style={{
              padding: '10px 16px',
              backgroundColor: 'transparent',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem'
            }}
          >
            Sort by Date <ChevronDown size={16} />
          </button>
        </div>

        <div style={{ overflowX: 'auto', width: '100%', borderRadius: '12px' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px', minWidth: '700px' }}>
            <thead>
              <tr style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'left', textTransform: 'uppercase' }}>
                <th style={{ padding: '0 1.5rem' }}>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th>Date</th>
                <th style={{ textAlign: 'right', padding: '0 1.5rem' }}>Amount</th>
                {role === 'Admin' && <th style={{ textAlign: 'center' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '12px' }} className="glass-hover">
                  <td style={{ padding: '1.25rem 1.5rem', borderRadius: '12px 0 0 12px' }}>
                    <p style={{ fontWeight: '600' }}>{tx.description}</p>
                  </td>
                  <td>
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--outline)',
                      color: 'var(--text-secondary)'
                    }}>
                      {tx.category}
                    </span>
                  </td>
                  <td>
                    <span style={{
                      color: tx.type === 'income' ? 'var(--primary)' : 'var(--tertiary)',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      textTransform: 'uppercase'
                    }}>
                      {tx.type}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {tx.date}
                  </td>
                  <td style={{ 
                    textAlign: 'right', 
                    padding: '0 1.5rem',
                    fontWeight: '800',
                    color: tx.type === 'income' ? 'var(--primary)' : 'var(--text-primary)'
                  }}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  {role === 'Admin' && (
                    <td style={{ borderRadius: '0 12px 12px 0', textAlign: 'center' }}>
                      <div className="flex gap-2 justify-center">
                        <button style={{ color: 'var(--text-muted)' }} className="flex-center scroll-hover"><Edit3 size={16} /></button>
                        <button onClick={() => deleteTransaction(tx.id)} style={{ color: 'var(--tertiary)' }} className="flex-center scroll-hover"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={role === 'Admin' ? 6 : 5} style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                    No transactions found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass" 
            style={{ width: '100%', maxWidth: '450px', padding: '2.5rem' }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', fontWeight: '800' }}>Add Transaction</h3>
            <form onSubmit={handleAddTx} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Description</label>
                <input 
                  name="description" 
                  required 
                  placeholder="e.g. Monthly Salary" 
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--outline)', padding: '12px', borderRadius: '12px', color: 'white', outline: 'none' }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Amount</label>
                <input 
                  name="amount" 
                  type="number" 
                  required 
                  step="0.01"
                  placeholder="0.00"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--outline)', padding: '12px', borderRadius: '12px', color: 'white', outline: 'none' }}
                />
              </div>
              <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Type</label>
                  <select 
                    name="type" 
                    required
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--outline)', padding: '12px', borderRadius: '12px', color: 'white', outline: 'none' }}
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>Category</label>
                  <select 
                    name="category" 
                    required
                    style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--outline)', padding: '12px', borderRadius: '12px', color: 'white', outline: 'none' }}
                  >
                    <option value="Salary">Salary</option>
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Housing">Housing</option>
                    <option value="Technology">Technology</option>
                    <option value="Health">Health</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4" style={{ marginTop: '1rem' }}>
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--outline)' }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', background: 'var(--primary)', color: '#003824', fontWeight: '800' }}
                >
                  Add Entry
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
