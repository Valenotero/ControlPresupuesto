import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { useChartData } from '../hooks/useChartData';
import StatisticsCards from './Charts/StatisticsCards';
import MonthlyTrendChart from './Charts/MonthlyTrendChart';
import CategoryPieChart from './Charts/CategoryPieChart';
import BalanceLineChart from './Charts/BalanceLineChart';
import { BarChart3, PieChart, TrendingUp, X } from 'lucide-react';

function Analytics({ isOpen, onClose }) {
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
    { id: 'overview', name: t('analytics'), icon: BarChart3 },
    { id: 'categories', name: t('categoryDistribution'), icon: PieChart },
    { id: 'trends', name: t('balanceEvolution'), icon: TrendingUp }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t('analytics')}
              </h2>
              <p className="text-sm text-gray-600">
                Análisis detallado de tus finanzas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Statistics Cards */}
              <StatisticsCards statistics={statistics} />
              
              {/* Monthly Trend Chart */}
              <MonthlyTrendChart data={monthlyData} />
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Expense Categories */}
              <CategoryPieChart 
                data={expenseCategoryData}
                title={`${t('categoryDistribution')} - ${t('expense')}`}
                type="expenses"
              />
              
              {/* Income Categories */}
              <CategoryPieChart 
                data={incomeCategoryData}
                title={`${t('categoryDistribution')} - ${t('income')}`}
                type="income"
              />
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="space-y-6">
              {/* Balance Evolution */}
              <BalanceLineChart data={balanceEvolutionData} />
              
              {/* Monthly Data Table */}
              {monthlyData.length > 0 && (
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t('lastMonths')}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mes
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('income')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('expense')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Balance
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {monthlyData.slice(-6).map((month, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {month.month}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-success-600 font-medium">
                              {formatCurrency(month.income)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-danger-600 font-medium">
                              {formatCurrency(month.expenses)}
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                              month.balance >= 0 ? 'text-success-600' : 'text-danger-600'
                            }`}>
                              {formatCurrency(month.balance)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analytics; 