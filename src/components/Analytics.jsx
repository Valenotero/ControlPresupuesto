// src/components/Analytics.jsx
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useChartData } from '../hooks/useChartData';
import StatisticsCards from './Charts/StatisticsCards';
import MonthlyTrendChart from './Charts/MonthlyTrendChart';
import CategoryPieChart from './Charts/CategoryPieChart';
import BalanceLineChart from './Charts/BalanceLineChart';
import { BarChart3, PieChart, TrendingUp, X } from 'lucide-react';

export default function Analytics({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { formatCurrency } = useCurrency();
  const {
    monthlyData,
    expenseCategoryData,
    incomeCategoryData,
    balanceEvolutionData,
    statistics
  } = useChartData();

  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const tabs = [
    { id: 'overview', name: t('analytics'), icon: BarChart3, shortName: 'Análisis' },
    { id: 'categories', name: t('categoryDistribution'), icon: PieChart, shortName: 'Categorías' },
    { id: 'trends', name: t('balanceEvolution'), icon: TrendingUp, shortName: 'Tendencias' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl w-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="p-1.5 sm:p-2 bg-primary-100 rounded-lg">
              <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {t('analytics')}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                {t('detailedAnalysis')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 flex-shrink-0">
          <nav className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-1 sm:space-x-2 py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 bg-primary-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.name}</span>
                  <span className="sm:hidden">{tab.shortName}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 sm:p-6">
            {activeTab === 'overview' && (
              <div className="space-y-4 sm:space-y-6">
                {/* Statistics Cards */}
                <StatisticsCards statistics={statistics} />

                {/* Monthly Trend Chart */}
                <div className="card">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                    {t('monthlyTrend')}
                  </h3>
                  <MonthlyTrendChart data={monthlyData} />
                </div>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-6">
                  {/* Expense Categories */}
                  <div className="card">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                      {`${t('categoryDistribution')} - ${t('expense')}`}
                    </h3>
                    <CategoryPieChart data={expenseCategoryData} />
                  </div>

                  {/* Income Categories */}
                  <div className="card">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                      {`${t('categoryDistribution')} - ${t('income')}`}
                    </h3>
                    <CategoryPieChart data={incomeCategoryData} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'trends' && (
              <div className="space-y-4 sm:space-y-6">
                {/* Balance Evolution */}
                <div className="card">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                    {t('balanceEvolution')}
                  </h3>
                  <BalanceLineChart data={balanceEvolutionData} />
                </div>

                {/* Monthly Data Table */}
                {monthlyData.length > 0 && (
                  <div className="card">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                      {t('lastMonths')}
                    </h3>
                    <div className="overflow-x-auto -mx-3 sm:mx-0">
                      <div className="inline-block min-w-full align-middle">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Mes
                              </th>
                              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t('income')}
                              </th>
                              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {t('expense')}
                              </th>
                              <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Balance
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {monthlyData.slice(-6).map((month, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                                  {month.month}
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-success-600 font-medium">
                                  {formatCurrency(month.income)}
                                </td>
                                <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-danger-600 font-medium">
                                  {formatCurrency(month.expenses)}
                                </td>
                                <td
                                  className={`px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium ${
                                    month.balance >= 0 ? 'text-success-600' : 'text-danger-600'
                                  }`}
                                >
                                  {formatCurrency(month.balance)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
