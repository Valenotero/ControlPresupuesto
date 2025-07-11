import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';

function CategoryPieChart({ data, title, type = 'expenses' }) {
  const { t } = useLanguage();
  const { formatCurrency } = useCurrency();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            {formatCurrency(data.value)}
          </p>
          <p className="text-xs text-gray-500">
            {((data.value / data.total) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <ul className="flex flex-wrap gap-2 justify-center mt-4">
        {payload.map((entry, index) => (
          <li key={index} className="flex items-center text-sm">
            <span 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-gray-700 truncate max-w-20">
              {entry.value}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  // Calcular el total para los porcentajes
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithTotal = data.map(item => ({ ...item, total }));

  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {title}
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
        {title}
      </h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataWithTotal}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {dataWithTotal.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Resumen numérico */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-1 gap-2">
          {data.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-gray-700">{item.name}</span>
              </div>
              <div className="text-right">
                <span className="font-medium">{formatCurrency(item.value)}</span>
                <span className="text-gray-500 ml-2">
                  ({((item.value / total) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
          {data.length > 3 && (
            <div className="text-xs text-gray-500 text-center mt-2">
              +{data.length - 3} categorías más
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryPieChart; 