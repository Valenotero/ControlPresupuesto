import React from 'react';
import { useBudget } from '../context/BudgetContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { TrendingUp, TrendingDown, Target, Wallet, AlertTriangle, CheckCircle, Plus } from 'lucide-react';

function BudgetOverview() {
  const { totalIncome, additionalIncome, totalExpenses, budget } = useBudget();
  const { t } = useLanguage();
  const { formatCurrency, formatCurrencyCompact } = useCurrency();

  const balance = totalIncome - totalExpenses;
  const budgetRemaining = totalIncome - totalExpenses;
  const budgetPercentage = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;

  // Función para decidir qué formato usar
  const smartFormatCurrency = (amount) => {
    return Math.abs(amount) >= 1e6 ? formatCurrencyCompact(amount) : formatCurrency(amount);
  };

  const getBudgetStatus = () => {
    if (budgetPercentage <= 70) {
      return {
        color: 'text-success-600',
        bgColor: 'bg-success-100',
        icon: CheckCircle,
        message: t('withinBudget') || 'Dentro del presupuesto'
      };
    } else if (budgetPercentage <= 90) {
      return {
        color: 'text-warning-600',
        bgColor: 'bg-warning-100',
        icon: AlertTriangle,
        message: 'Acercándose al límite'
      };
    } else {
      return {
        color: 'text-danger-600',
        bgColor: 'bg-danger-100',
        icon: AlertTriangle,
        message: t('budgetExceeded') || 'Presupuesto excedido'
      };
    }
  };

  const status = getBudgetStatus();
  const StatusIcon = status.icon;

  return (
    <div className="px-2 sm:px-0">
      {/* Grid responsive mejorado */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Tarjeta de Presupuesto Base */}
        <div className="col-span-2 lg:col-span-1 card bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-primary-600 truncate">
                {t('baseIncome')}
              </p>
              <p className="text-lg sm:text-2xl font-bold text-primary-900 truncate" title={formatCurrency(budget)}>
                {smartFormatCurrency(budget)}
              </p>
            </div>
            <div className="flex-shrink-0 ml-2">
              <div className="p-2 sm:p-3 bg-primary-200 rounded-lg">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
              </div>
            </div>
          </div>
          {/* Información adicional */}
          <div className="mt-3 flex items-center space-x-2">
            <StatusIcon className={`h-4 w-4 ${status.color}`} />
            <span className={`text-xs font-medium ${status.color} truncate`}>
              {status.message}
            </span>
          </div>
        </div>

        {/* Tarjeta de Ingresos Totales (Base + Adicionales) */}
        <div className="card bg-gradient-to-br from-success-50 to-success-100 border-success-200">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-success-600 truncate">
                {t('totalIncome')}
              </p>
              <p className="text-lg sm:text-2xl font-bold text-success-900 truncate" title={formatCurrency(totalIncome)}>
                {smartFormatCurrency(totalIncome)}
              </p>
            </div>
            <div className="flex-shrink-0 ml-2">
              <div className="p-2 sm:p-3 bg-success-200 rounded-lg">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-success-600" />
              </div>
            </div>
          </div>
          {/* Mostrar desglose si hay ingresos adicionales */}
          {additionalIncome > 0 && (
            <div className="mt-2 flex items-center space-x-1 text-xs text-success-700">
              <Plus className="h-3 w-3" />
              <span className="truncate">+{smartFormatCurrency(additionalIncome)} {t('extraText')}</span>
            </div>
          )}
        </div>

        {/* Tarjeta de Gastos Totales */}
        <div className="card bg-gradient-to-br from-danger-50 to-danger-100 border-danger-200">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-danger-600 truncate">
                {t('totalExpenses')}
              </p>
              <p className="text-lg sm:text-2xl font-bold text-danger-900 truncate" title={formatCurrency(totalExpenses)}>
                {smartFormatCurrency(totalExpenses)}
              </p>
            </div>
            <div className="flex-shrink-0 ml-2">
              <div className="p-2 sm:p-3 bg-danger-200 rounded-lg">
                <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-danger-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta de Balance */}
        <div className={`card bg-gradient-to-br ${
          balance >= 0 
            ? 'from-indigo-50 to-indigo-100 border-indigo-200' 
            : 'from-orange-50 to-orange-100 border-orange-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className={`text-xs sm:text-sm font-medium ${
                balance >= 0 ? 'text-indigo-600' : 'text-orange-600'
              } truncate`}>
                {t('totalBalance')}
              </p>
              <p className={`text-lg sm:text-2xl font-bold ${
                balance >= 0 ? 'text-indigo-900' : 'text-orange-900'
              } truncate`} title={formatCurrency(balance)}>
                {smartFormatCurrency(balance)}
              </p>
            </div>
            <div className="flex-shrink-0 ml-2">
              <div className={`p-2 sm:p-3 rounded-lg ${
                balance >= 0 ? 'bg-indigo-200' : 'bg-orange-200'
              }`}>
                <Wallet className={`h-5 w-5 sm:h-6 sm:w-6 ${
                  balance >= 0 ? 'text-indigo-600' : 'text-orange-600'
                }`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progreso del presupuesto - Mejorado para la nueva lógica */}
      {totalIncome > 0 && (
        <div className="mt-4 sm:mt-6 card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-0">
              {t('financialSummary')}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${status.bgColor} ${status.color}`}>
                {Math.round(budgetPercentage)}{t('percentSpent')}
              </span>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="relative">
            <div className="overflow-hidden h-3 sm:h-4 text-xs flex rounded-full bg-gray-200">
              <div
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ${
                  budgetPercentage <= 70 
                    ? 'bg-success-500'
                    : budgetPercentage <= 90 
                    ? 'bg-warning-500' 
                    : 'bg-danger-500'
                }`}
              ></div>
            </div>
          </div>

          {/* Información detallada */}
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">{t('baseLabel')}</span>
              <span className="font-medium text-gray-900 truncate" title={formatCurrency(budget)}>
                {smartFormatCurrency(budget)}
              </span>
            </div>
            {additionalIncome > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">{t('extraLabel')}</span>
                <span className="font-medium text-success-600 truncate" title={formatCurrency(additionalIncome)}>
                  {smartFormatCurrency(additionalIncome)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">{t('spentLabel')}</span>
              <span className="font-medium text-danger-600 truncate" title={formatCurrency(totalExpenses)}>
                {smartFormatCurrency(totalExpenses)}
              </span>
            </div>
            <div className="flex justify-between col-span-2 sm:col-span-1">
              <span className="text-gray-600">{t('availableLabel')}</span>
              <span className={`font-medium ${budgetRemaining >= 0 ? 'text-success-600' : 'text-danger-600'} truncate`} title={formatCurrency(budgetRemaining)}>
                {smartFormatCurrency(budgetRemaining)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BudgetOverview; 