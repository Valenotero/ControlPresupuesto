import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';
import { TrendingUp, TrendingDown, BarChart3, Calculator } from 'lucide-react';

function StatisticsCards({ statistics }) {
  const { t } = useLanguage();
  const { formatCurrency } = useCurrency();

  const cards = [
    {
      title: t('totalTransactions'),
      value: statistics.totalTransactions,
      subtitle: `${statistics.thisMonthTransactions} ${t('thisMonth')}`,
      icon: BarChart3,
      color: 'primary'
    },
    {
      title: t('averageIncome'),
      value: formatCurrency(statistics.averageIncome),
      subtitle: t('averageIncome'),
      icon: TrendingUp,
      color: 'success'
    },
    {
      title: t('averageExpense'),
      value: formatCurrency(statistics.averageExpense),
      subtitle: t('averageExpense'),
      icon: TrendingDown,
      color: 'danger'
    },
    {
      title: `${t('totalBalance')} ${t('thisMonth')}`,
      value: formatCurrency(statistics.thisMonthIncome - statistics.thisMonthExpenses),
      subtitle: `${formatCurrency(statistics.thisMonthIncome)} - ${formatCurrency(statistics.thisMonthExpenses)}`,
      icon: Calculator,
      color: statistics.thisMonthIncome - statistics.thisMonthExpenses >= 0 ? 'success' : 'danger'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return {
          bg: 'bg-success-50',
          icon: 'text-success-600',
          text: 'text-success-600'
        };
      case 'danger':
        return {
          bg: 'bg-danger-50',
          icon: 'text-danger-600',
          text: 'text-danger-600'
        };
      case 'primary':
        return {
          bg: 'bg-primary-50',
          icon: 'text-primary-600',
          text: 'text-primary-600'
        };
      default:
        return {
          bg: 'bg-gray-50',
          icon: 'text-gray-600',
          text: 'text-gray-600'
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => {
        const colors = getColorClasses(card.color);
        const Icon = card.icon;

        return (
          <div key={index} className="card p-4">
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${colors.bg}`}>
                <Icon className={`h-5 w-5 ${colors.icon}`} />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {card.title}
              </p>
              <p className={`text-xl font-bold ${colors.text} mb-1`}>
                {card.value}
              </p>
              <p className="text-xs text-gray-500">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatisticsCards; 