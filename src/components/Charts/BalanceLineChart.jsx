import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';

function BalanceLineChart({ data }) {
  const { t } = useLanguage();
  const { formatCurrency } = useCurrency();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-1">{label}</p>
          <p className={`text-sm font-semibold ${
            value >= 0 ? 'text-success-600' : 'text-danger-600'
          }`}>
            {t('totalBalance')}: {formatCurrency(value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const formatXAxisLabel = (tickItem) => {
    return tickItem;
  };

  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t('balanceEvolution')}
        </h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>{t('noDataAvailable')}</p>
        </div>
      </div>
    );
  }

  // Determinar si la mayoría del balance es positivo o negativo para el color del área
  const lastBalance = data[data.length - 1]?.balance || 0;
  const isPositive = lastBalance >= 0;

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t('balanceEvolution')}
      </h3>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop 
                  offset="5%" 
                  stopColor={isPositive ? "#22c55e" : "#ef4444"} 
                  stopOpacity={0.3}
                />
                <stop 
                  offset="95%" 
                  stopColor={isPositive ? "#22c55e" : "#ef4444"} 
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              interval="preserveStartEnd"
              tickFormatter={formatXAxisLabel}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              tickFormatter={(value) => formatCurrency(value)}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke={isPositive ? "#22c55e" : "#ef4444"}
              strokeWidth={2}
              fill="url(#balanceGradient)"
              dot={{ fill: isPositive ? "#22c55e" : "#ef4444", strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, stroke: isPositive ? "#22c55e" : "#ef4444", strokeWidth: 2 }}
            />
            {/* Línea de referencia en cero */}
            <Line 
              type="monotone" 
              dataKey={() => 0} 
              stroke="#6b7280" 
              strokeDasharray="2 2" 
              dot={false}
              activeDot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Información adicional */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <p className="text-gray-600 mb-1">Balance Actual</p>
            <p className={`font-semibold ${
              lastBalance >= 0 ? 'text-success-600' : 'text-danger-600'
            }`}>
              {formatCurrency(lastBalance)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-1">Tendencia</p>
            <p className={`font-semibold ${
              data.length > 1 && data[data.length - 1].balance > data[0].balance 
                ? 'text-success-600' 
                : 'text-danger-600'
            }`}>
              {data.length > 1 && data[data.length - 1].balance > data[0].balance ? '↗ Positiva' : '↘ Negativa'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceLineChart; 