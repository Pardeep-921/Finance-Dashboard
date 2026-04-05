import React, { createContext, useContext, useState, useEffect } from 'react';

const FinanceContext = createContext();

const MOCK_TRANSACTIONS = [
  { id: 1, date: '2026-04-01', description: 'Apple Store', category: 'Technology', amount: 999.00, type: 'expense' },
  { id: 2, date: '2026-04-02', description: 'Monthly Salary', category: 'Income', amount: 8200.00, type: 'income' },
  { id: 3, date: '2026-04-03', description: 'Whole Foods', category: 'Food', amount: 150.50, type: 'expense' },
  { id: 4, date: '2026-04-04', description: 'Shell Gas', category: 'Transport', amount: 65.00, type: 'expense' },
  { id: 5, date: '2026-04-05', description: 'Netflix', category: 'Entertainment', amount: 19.99, type: 'expense' },
  { id: 6, date: '2026-03-28', description: 'Freelance Gig', category: 'Income', amount: 1200.00, type: 'income' },
  { id: 7, date: '2026-03-25', description: 'Rent Payment', category: 'Housing', amount: 2200.00, type: 'expense' },
  { id: 8, date: '2026-03-20', description: 'Starbucks', category: 'Food', amount: 12.40, type: 'expense' },
  { id: 9, date: '2026-03-18', description: 'Amazon Purchase', category: 'Technology', amount: 299.99, type: 'expense' },
  { id: 10, date: '2026-03-15', description: 'Local Gym', category: 'Health', amount: 50.00, type: 'expense' },
  { id: 11, date: '2026-03-12', description: 'Utility Bill', category: 'Housing', amount: 185.20, type: 'expense' },
  { id: 12, date: '2026-03-10', description: 'Uber Ride', category: 'Transport', amount: 22.50, type: 'expense' },
  { id: 13, date: '2026-03-08', description: 'Cinema Tickets', category: 'Entertainment', amount: 35.00, type: 'expense' },
  { id: 14, date: '2026-03-05', description: 'Bonus Reward', category: 'Income', amount: 500.00, type: 'income' },
  { id: 15, date: '2026-03-01', description: 'Pharmacy', category: 'Health', amount: 45.15, type: 'expense' },
  { id: 16, date: '2026-02-28', description: 'Internet Fiber', category: 'Technology', amount: 79.99, type: 'expense' },
  { id: 17, date: '2026-02-25', description: 'Dinner Out', category: 'Food', amount: 88.00, type: 'expense' },
  { id: 18, date: '2026-02-20', description: 'Side Project Payment', category: 'Income', amount: 1500.00, type: 'income' },
  { id: 19, date: '2026-02-15', description: 'Flight Tickets', category: 'Transport', amount: 450.00, type: 'expense' },
  { id: 20, date: '2026-02-10', description: 'Furniture Store', category: 'Housing', amount: 890.00, type: 'expense' },
];

export const FinanceProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('is_dark_mode');
    return saved ? JSON.parse(saved) : true;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : MOCK_TRANSACTIONS;
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('user_role') || 'Admin';
  });

  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    type: 'All',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  useEffect(() => {
    localStorage.setItem('is_dark_mode', JSON.stringify(isDarkMode));
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('user_role', role);
  }, [role]);

  const addTransaction = (transaction) => {
    if (role !== 'Admin') return;
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      amount: parseFloat(transaction.amount)
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    if (role !== 'Admin') return;
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const updateTransaction = (updated) => {
    if (role !== 'Admin') return;
    setTransactions(transactions.map(t => t.id === updated.id ? updated : t));
  };

  const filteredTransactions = transactions
    .filter(t => {
      const matchSearch = t.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                          t.category.toLowerCase().includes(filters.search.toLowerCase());
      const matchCategory = filters.category === 'All' || t.category === filters.category;
      const matchType = filters.type === 'All' || t.type === filters.type;
      return matchSearch && matchCategory && matchType;
    })
    .sort((a, b) => {
      const factor = filters.sortOrder === 'asc' ? 1 : -1;
      if (filters.sortBy === 'date') return (new Date(a.date) - new Date(b.date)) * factor;
      if (filters.sortBy === 'amount') return (a.amount - b.amount) * factor;
      return 0;
    });

  const stats = {
    balance: transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount, 0),
    income: transactions.reduce((acc, t) => t.type === 'income' ? acc + t.amount : acc, 0),
    expenses: transactions.reduce((acc, t) => t.type === 'expense' ? acc + t.amount : acc, 0),
  };

  return (
    <FinanceContext.Provider value={{
      transactions,
      filteredTransactions,
      role,
      setRole,
      filters,
      setFilters,
      addTransaction,
      deleteTransaction,
      updateTransaction,
      stats,
      isDarkMode,
      toggleTheme: () => setIsDarkMode(!isDarkMode),
      resetData: () => {
        localStorage.removeItem('transactions');
        window.location.reload();
      }
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
