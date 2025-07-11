import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';

function MonthlyTrendChart({ data }) {
  const { t } = useLanguage();
  const { formatCurrency } = useCurrency();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'income' ? t('income') : 
               entry.dataKey === 'expenses' ? t('expense') : t('totalBalance')}
              : {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('monthlyTrend')}
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>{t('noDataAvailable')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t('monthlyTrend')}
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '14px' }}
              formatter={(value) => 
                value === 'income' ? t('income') :
                value === 'expenses' ? t('expense') : value
              }
            />
            <Bar 
              dataKey="income" 
              fill="#22c55e" 
              radius={[4, 4, 0, 0]}
              name="income"
            />
            <Bar 
              dataKey="expenses" 
              fill="#ef4444" 
              radius={[4, 4, 0, 0]}
              name="expenses"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyTrendChart; 