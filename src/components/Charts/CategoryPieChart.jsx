import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';

function CategoryPieChart({ data, title }) {
  const { t } = useLanguage();
  const { formatCurrency } = useCurrency();
  const [showAll, setShowAll] = useState(false);

  const MAX_VISIBLE = 3;
  const sorted = [...data].sort((a, b) => b.value - a.value);
  const total = sorted.reduce((sum, item) => sum + item.value, 0);
  const hiddenCount = Math.max(0, sorted.length - MAX_VISIBLE);

  // Datos que dibujamos en el Pie
  const displayData = showAll || hiddenCount === 0
    ? sorted
    : sorted.slice(0, MAX_VISIBLE);

  // Relleno de cada porción (puedes seguir usando entry.color)
  const COLORS = displayData.map((e, i) => e.color);

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const { name, value } = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium">{name}</p>
        <p>{formatCurrency(value)}</p>
        <p className="text-xs text-gray-500">
          {((value / total) * 100).toFixed(1)}%
        </p>
      </div>
    );
  };

  // Leyenda propia opcional (puedes conservar tu CustomLegend si quieres)
  const CustomLegend = ({ payload }) => (
    <ul className="flex flex-wrap gap-2 justify-center mt-4">
      {payload.map((entry, i) => (
        <li key={i} className="flex items-center text-sm">
          <span
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="truncate max-w-[6rem]">{entry.value}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="card">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {title}
        </h3>
      )}

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={displayData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              labelLine={false}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {displayData.map((entry, idx) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Resumen numérico */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <ul className="grid grid-cols-1 gap-2">
          {displayData.map((item, idx) => (
            <li key={idx} className="flex justify-between text-sm">
              <span className="flex items-center">
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </span>
              <span className="text-right">
                {formatCurrency(item.value)}{' '}
                <span className="text-gray-500">
                  ({((item.value / total) * 100).toFixed(1)}%)
                </span>
              </span>
            </li>
          ))}

          {!showAll && hiddenCount > 0 && (
            <li
              className="text-xs text-gray-500 text-center cursor-pointer hover:text-gray-700"
              onClick={() => setShowAll(true)}
            >
              +{hiddenCount} {t('showAllCategories')}
            </li>
          )}

          {showAll && hiddenCount > 0 && (
            <li
              className="text-xs text-gray-500 text-center cursor-pointer hover:text-gray-700"
              onClick={() => setShowAll(false)}
            >
              {t('showLess')}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default CategoryPieChart;
