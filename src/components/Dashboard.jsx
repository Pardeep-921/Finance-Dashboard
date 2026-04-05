import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { TrendingUp, TrendingDown, DollarSign, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const Dashboard = () => {
  const { stats, transactions } = useFinance();

  // Prepare data for Trend Chart (Last 6 Months/Days for demo)
  const chartData = [
    { name: 'Oct', income: 4500, expenses: 3200 },
    { name: 'Nov', income: 5200, expenses: 3800 },
    { name: 'Dec', income: 4800, expenses: 4100 },
    { name: 'Jan', income: 6100, expenses: 3900 },
    { name: 'Feb', income: 5900, expenses: 4200 },
    { name: 'Mar', income: stats.income, expenses: stats.expenses },
  ];

  // Prepare data for Spending Breakdown Pie Chart
  const categoriesMap = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieData = Object.keys(categoriesMap).map(key => ({
    name: key,
    value: categoriesMap[key]
  }));

  const COLORS = ['#4edea3', '#10b981', '#3a4a5f', '#ffb3af', '#64748b'];

  const SummaryCard = ({ title, value, icon, trend, type }) => (
    <div className="glass glass-hover flex flex-col gap-4" style={{
      padding: '2rem',
      flex: 1,
      minWidth: '280px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="flex justify-between align-center">
        <div style={{
          padding: '12px',
          borderRadius: '12px',
          backgroundColor: type === 'income' ? 'rgba(78, 222, 163, 0.1)' : type === 'expense' ? 'rgba(255, 179, 175, 0.1)' : 'var(--bg-tertiary)',
          color: type === 'income' ? 'var(--primary)' : type === 'expense' ? 'var(--tertiary)' : 'var(--secondary)'
        }}>
          {icon}
        </div>
        <div className="flex align-center gap-1" style={{
          color: trend.startsWith('+') ? 'var(--primary)' : 'var(--tertiary)',
          fontSize: '0.85rem',
          fontWeight: '600',
          backgroundColor: trend.startsWith('+') ? 'rgba(78, 222, 163, 0.05)' : 'rgba(255, 179, 175, 0.05)',
          padding: '4px 8px',
          borderRadius: '20px'
        }}>
          {trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      </div>
      <div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>{title}</p>
        <h3 style={{ fontSize: '1.75rem', fontWeight: '800' }}>
          ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </h3>
      </div>
      <div style={{
        position: 'absolute',
        bottom: '-10px',
        right: '-10px',
        opacity: 0.05,
        color: 'var(--text-primary)'
      }}>
        {icon}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div className="flex gap-4 md:gap-8 flex-wrap">
        <SummaryCard 
          title="Total Balance" 
          value={stats.balance} 
          trend="+12.5%" 
          icon={<Wallet size={20} />} 
          type="balance"
        />
        <SummaryCard 
          title="Monthly Income" 
          value={stats.income} 
          trend="+8.2%" 
          icon={<TrendingUp size={20} />} 
          type="income"
        />
        <SummaryCard 
          title="Monthly Expenses" 
          value={stats.expenses} 
          trend="-2.4%" 
          icon={<ArrowDownRight size={20} />} 
          type="expense"
        />
      </div>

      <div className="grid gap-6 md:gap-10" style={{ 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
        width: '100%' 
      }}>
        <div className="glass" style={{ padding: 'var(--card-padding, 2rem)', minWidth: 0 }}>
          <div className="flex justify-between align-center" style={{ marginBottom: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem' }}>Balance Momentum</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Income vs Expenses trend over 6 months</p>
            </div>
            <div className="flex gap-4">
              <div className="flex align-center gap-2">
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Income</span>
              </div>
              <div className="flex align-center gap-2">
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--tertiary)' }} />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Expenses</span>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--tertiary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--tertiary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--outline)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    border: '1px solid var(--outline-bright)', 
                    borderRadius: '12px',
                    color: 'var(--text-primary)'
                  }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stroke="var(--primary)" 
                  fillOpacity={1} 
                  fill="url(#colorIncome)" 
                  strokeWidth={3}
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="var(--tertiary)" 
                  fillOpacity={1} 
                  fill="url(#colorExpense)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass" style={{ padding: 'var(--card-padding, 2rem)', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Spending Breakdown</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Allocation by expense category</p>
          
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '100%', height: '240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--bg-secondary)', 
                      border: '1px solid var(--outline-bright)', 
                      borderRadius: '12px'
                    }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(value) => <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -100%)',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Expenses</p>
              <p style={{ fontSize: '1.25rem', fontWeight: '800' }}>${stats.expenses.toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
