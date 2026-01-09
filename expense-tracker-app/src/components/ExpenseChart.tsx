import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Expense } from '../lib/api';

interface ExpenseChartProps {
  expenses: Expense[];
}

const COLORS = [
  '#0ea5e9', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981',
  '#ef4444', '#06b6d4', '#6366f1', '#f97316', '#14b8a6',
];

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  // Aggregate expenses by category
  const categoryData = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(categoryData)
    .map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
    }))
    .sort((a, b) => b.value - a.value);

  const renderLabel = (entry: any) => {
    return `${entry.name}: ৳${entry.value.toFixed(2)}`;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any) => `৳${value.toFixed(2)}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseChart;
