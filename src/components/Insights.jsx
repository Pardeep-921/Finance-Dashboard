import React from 'react';
import { useFinance } from '../context/FinanceContext';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Target, AlertCircle, Lightbulb, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const InsightCard = ({ title, description, icon, color, progress, footer }) => (
  <motion.div 
    className="glass flex flex-col justify-between"
    whileHover={{ translateY: -5 }}
    style={{ 
      padding: '2rem', 
      flex: '1 1 300px',
      minWidth: '300px',
      borderLeft: `4px solid ${color}`
    }}
  >
    <div>
      <div className="flex align-center gap-3" style={{ marginBottom: '1.5rem' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '10px', 
          background: `${color}20`, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: color 
        }}>
          {icon}
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{title}</h3>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>{description}</p>
    </div>
    
    {progress !== undefined && (
      <div style={{ marginTop: '1.5rem' }}>
        <div className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.8rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Completion</span>
          <span style={{ color: color, fontWeight: '700' }}>{progress}%</span>
        </div>
        <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '10px', overflow: 'hidden' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ height: '100%', background: color }}
          />
        </div>
      </div>
    )}

    {footer && (
      <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--outline)', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>
        {footer}
      </div>
    )}
  </motion.div>
);

const Insights = () => {
  const { transactions } = useFinance();

  const calculateInsights = () => {
    if (transactions.length === 0) return { highestCategory: { name: 'None', amount: 0 }, percentageOfTotal: 0 };
    
    const categoryTotals = transactions.reduce((acc, tx) => {
      if (tx.type === 'expense') {
        acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      }
      return acc;
    }, {});

    const sorted = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    
    return {
      highestCategory: sorted.length > 0 ? { name: sorted[0][0], amount: sorted[0][1] } : { name: 'None', amount: 0 },
      percentageOfTotal: totalExpenses > 0 && sorted.length > 0 ? (sorted[0][1] / totalExpenses) * 100 : 0
    };
  };

  const { highestCategory, percentageOfTotal } = calculateInsights();

  const comparisonData = [
    { month: 'Jan', amount: 4500 },
    { month: 'Feb', amount: 3200 },
    { month: 'Mar', amount: 4800 },
    { month: 'Apr', amount: 3900 },
    { month: 'May', amount: 5200 },
    { month: 'Jun (Now)', amount: 4100 },
  ];

  return (
    <div className="flex flex-col gap-8 md:gap-10">
      <div className="flex gap-6 md:gap-8 flex-wrap">
        <InsightCard 
          title="Highest Spending" 
          description={`Your highest spending category this month is ${highestCategory.name}, accounting for ${percentageOfTotal.toFixed(1)}% of your total expenditures.`}
          icon={<AlertCircle size={20} />} 
          color="var(--tertiary)"
          progress={Math.round(percentageOfTotal)}
          footer={`Total in ${highestCategory.name}: $${highestCategory.amount.toLocaleString()}`}
        />
        <InsightCard 
          title="Savings Potential" 
          description="Based on your fixed costs, you could potentially save an additional $450 this month by reducing 'Entertainment' spending by 15%."
          icon={<Lightbulb size={20} />} 
          color="var(--primary)"
          footer="View Budget Plan →"
        />
        <InsightCard 
          title="Financial Health" 
          description="Global markers indicate you are in the top 15% of savers for your income bracket. Good job maintaining a 42% savings rate!"
          icon={<CheckCircle2 size={20} />} 
          color="var(--secondary)"
          footer="Excellent Score: 810/850"
        />
      </div>

      <div className="grid gap-6 md:gap-10" style={{ 
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
        width: '100%' 
      }}>
        <div className="glass" style={{ padding: '2rem', minWidth: 0 }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Monthly Expense Comparison</h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--outline)', borderRadius: '12px' }}
                  itemStyle={{ color: 'var(--primary)' }}
                />
                <Bar dataKey="amount" fill="var(--primary)" fillOpacity={0.8} radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass" style={{ padding: '2rem', minWidth: 0 }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>AI Spending Observations</h3>
          <div className="flex flex-col gap-4 md:gap-5">
            {[
              { type: 'warning', text: "Your spending on 'Food' increased by 22% compared to last week.", icon: <TrendingUp size={16} /> },
              { type: 'success', text: "You have spent 12% less on 'Technology' this month.", icon: <Award size={16} /> },
              { type: 'info', text: "Potential saving: $120/mo by switching to yearly Netflix billing.", icon: <Target size={16} /> }
            ].map((obs, i) => (
              <div key={i} className="flex align-center gap-4" style={{ 
                padding: '1.25rem', 
                borderRadius: '16px', 
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--outline)'
              }}>
                <div style={{ color: obs.type === 'warning' ? 'var(--tertiary)' : obs.type === 'success' ? 'var(--primary)' : 'var(--secondary)' }}>
                  {obs.icon}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{obs.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
