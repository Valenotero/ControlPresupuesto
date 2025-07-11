import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { PieChart, TrendingDown, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

function CategoryBreakdown() {
  const { transactions, categories } = useBudget();
  const { t } = useLanguage();
  const { formatCurrency } = useCurrency();
  const [showExpenses, setShowExpenses] = useState(true);
  const [showIncome, setShowIncome] = useState(false);

  const calculateCategoryTotals = (type) => {
    const categoryTotals = {};
    
    transactions
      .filter(transaction => transaction.type === type)
      .forEach(transaction => {
        const categoryId = transaction.category;
        if (!categoryTotals[categoryId]) {
          categoryTotals[categoryId] = 0;
        }
        categoryTotals[categoryId] += transaction.amount;
      });

    return Object.entries(categoryTotals)
      .map(([categoryId, amount]) => {
        const category = categories.find(cat => cat.id === categoryId);
        return {
          id: categoryId,
          name: category ? category.name : t('uncategorized') || 'Sin categoría',
          color: category ? category.color : '#6b7280',
          amount
        };
      })
      .sort((a, b) => b.amount - a.amount);
  };

  const expenseCategories = calculateCategoryTotals('expense');
  const incomeCategories = calculateCategoryTotals('income');

  const totalExpenses = expenseCategories.reduce((sum, cat) => sum + cat.amount, 0);
  const totalIncome = incomeCategories.reduce((sum, cat) => sum + cat.amount, 0);

  const CategorySection = ({ title, categories, total, type, isExpanded, onToggle }) => {
    const isEmpty = categories.length === 0;
    
    return (
      <div className="space-y-3">
        {/* Header clickeable */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <div className="flex items-center space-x-2">
            {type === 'expense' ? (
              <TrendingDown className="h-4 w-4 text-danger-500" />
            ) : (
              <TrendingUp className="h-4 w-4 text-success-500" />
            )}
            <span className="text-sm sm:text-base font-semibold text-gray-900">
              {title}
            </span>
            <span className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full ${
              type === 'expense' 
                ? 'bg-danger-100 text-danger-700' 
                : 'bg-success-100 text-success-700'
            }`}>
              {categories.length}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm sm:text-base font-semibold ${
              type === 'expense' ? 'text-danger-600' : 'text-success-600'
            }`}>
              {formatCurrency(total)}
            </span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </div>
        </button>

        {/* Contenido expandible */}
        {isExpanded && (
          <div className="space-y-2">
            {isEmpty ? (
              <div className="text-center py-6 text-gray-500">
                <PieChart className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">
                  {type === 'expense' ? t('noExpensesRecorded') : t('noIncomeRecorded')}
                </p>
              </div>
            ) : (
              categories.map((category) => {
                const percentage = total > 0 ? (category.amount / total) * 100 : 0;
                
                return (
                  <div
                    key={category.id}
                    className="group p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        {/* Indicador de color */}
                        <div
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        
                        {/* Nombre de categoría */}
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {category.name}
                        </span>
                      </div>
                      
                      {/* Monto y porcentaje */}
                      <div className="text-right flex-shrink-0 ml-2">
                        <div className={`text-sm sm:text-base font-semibold ${
                          type === 'expense' ? 'text-danger-600' : 'text-success-600'
                        }`}>
                          {formatCurrency(category.amount)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    
                    {/* Barra de progreso */}
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            type === 'expense' ? 'bg-danger-500' : 'bg-success-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="card mx-2 sm:mx-0">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4 sm:mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <PieChart className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            {t('categoryBreakdown')}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            {t('detailedAnalysis')}
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="space-y-4">
        {/* Sección de Gastos */}
        <CategorySection
          title={`${t('expense')} (${expenseCategories.length})`}
          categories={expenseCategories}
          total={totalExpenses}
          type="expense"
          isExpanded={showExpenses}
          onToggle={() => setShowExpenses(!showExpenses)}
        />

        {/* Sección de Ingresos */}
        <CategorySection
          title={`${t('income')} (${incomeCategories.length})`}
          categories={incomeCategories}
          total={totalIncome}
          type="income"
          isExpanded={showIncome}
          onToggle={() => setShowIncome(!showIncome)}
        />
      </div>

      {/* Resumen total */}
      {(totalExpenses > 0 || totalIncome > 0) && (
        <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-xs text-gray-600">{t('totalExpenses')}</p>
              <p className="text-sm sm:text-base font-semibold text-danger-600">
                {formatCurrency(totalExpenses)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-gray-600">{t('totalIncome')}</p>
              <p className="text-sm sm:text-base font-semibold text-success-600">
                {formatCurrency(totalIncome)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Estado vacío */}
      {totalExpenses === 0 && totalIncome === 0 && (
        <div className="text-center py-8">
          <PieChart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h4 className="text-base font-medium text-gray-900 mb-2">
            {t('noDataToShow')}
          </h4>
          <p className="text-sm text-gray-600">
            {t('addTransactionsToSeeBreakdown')}
          </p>
        </div>
      )}
    </div>
  );
}

export default CategoryBreakdown; 