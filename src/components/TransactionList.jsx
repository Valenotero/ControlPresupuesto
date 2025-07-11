import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { Trash2, TrendingUp, TrendingDown, Search, Filter, Calendar } from 'lucide-react';

function TransactionList() {
  const { transactions, deleteTransaction, categories } = useBudget();
  const { t, formatDate, formatRelativeDate } = useLanguage();
  const { formatCurrency } = useCurrency();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const formatTransactionDate = (dateString) => {
    // En móvil, formato más corto
    const isSmallScreen = window.innerWidth < 640;
    if (isSmallScreen) {
      return formatDate(dateString, 'short');
    }
    
    return formatRelativeDate(dateString);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : t('uncategorized');
  };

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#6b7280';
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesFilter = filter === 'all' || transaction.type === filter;
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getCategoryName(transaction.category).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id) => {
    if (window.confirm(t('confirmDeleteTransaction') || '¿Estás seguro de que quieres eliminar esta transacción?')) {
      deleteTransaction(id);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="card mx-2 sm:mx-0 text-center py-8 sm:py-12">
        <div className="mx-auto w-16 h-16 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <TrendingUp className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
        </div>
        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
          {t('noTransactions')}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-4 px-4">
          Comienza agregando tus primeros ingresos y gastos para visualizar tu balance financiero.
        </p>
      </div>
    );
  }

  return (
    <div className="card mx-2 sm:mx-0">
      {/* Header */}
      <div className="flex items-center space-x-2 mb-4 sm:mb-6">
        <div className="p-2 bg-gray-100 rounded-lg">
          <TrendingUp className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            {t('recentTransactions')}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            {transactions.length} transacciones
          </p>
        </div>
      </div>

      {/* Filtros - Stack en móvil */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
        {/* Búsqueda */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t('searchTransactions')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-9 sm:pl-10 h-10 sm:h-11 text-sm"
          />
        </div>

        {/* Filtro */}
        <div className="relative sm:w-48">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field pl-9 sm:pl-10 pr-8 h-10 sm:h-11 text-sm w-full"
          >
            <option value="all">{t('all')}</option>
            <option value="income">{t('income')}</option>
            <option value="expense">{t('expense')}</option>
          </select>
        </div>
      </div>

      {/* Lista de transacciones - Responsive */}
      <div className="space-y-2 sm:space-y-3">
        {filteredTransactions.map(transaction => (
          <div
            key={transaction.id}
            className="group relative bg-gray-50 sm:bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-200"
          >
            {/* Layout móvil vs desktop */}
            <div className="flex items-center justify-between">
              {/* Lado izquierdo */}
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {/* Indicador de categoría */}
                <div className="flex-shrink-0">
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full"
                    style={{ backgroundColor: getCategoryColor(transaction.category) }}
                  ></div>
                </div>
                
                {/* Información principal */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    {/* Descripción y categoría */}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                        {transaction.description}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-0.5">
                        <span className="truncate">{getCategoryName(transaction.category)}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 sm:hidden" />
                          <span>{formatTransactionDate(transaction.date)}</span>
                        </span>
                      </div>
                    </div>
                    
                    {/* Monto - En la misma línea en desktop */}
                    <div className="flex items-center justify-between sm:justify-end mt-2 sm:mt-0 sm:ml-4">
                      <div className="flex items-center space-x-1">
                        {transaction.type === 'income' ? (
                          <TrendingUp className="h-4 w-4 text-success-500 flex-shrink-0" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-danger-500 flex-shrink-0" />
                        )}
                        <span
                          className={`text-sm sm:text-base font-semibold ${
                            transaction.type === 'income' ? 'text-success-600' : 'text-danger-600'
                          }`}
                        >
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </span>
                      </div>
                      
                      {/* Botón eliminar */}
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="ml-3 text-gray-400 hover:text-danger-600 transition-colors p-1 opacity-60 group-hover:opacity-100"
                        title={t('deleteTransaction')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mensaje cuando no hay resultados */}
      {filteredTransactions.length === 0 && (searchTerm || filter !== 'all') && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">
            {t('noTransactionsFound')}
          </p>
        </div>
      )}

      {/* Footer con estadísticas */}
      {filteredTransactions.length > 0 && (
        <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs sm:text-sm text-gray-600">
              {t('showing')} {filteredTransactions.length} {t('of')} {transactions.length} {t('transactions')}
            </p>
            
            {/* Stats rápidas en una sola línea en móvil */}
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3 text-success-500" />
                <span>{filteredTransactions.filter(t => t.type === 'income').length}</span>
              </span>
              <span className="flex items-center space-x-1">
                <TrendingDown className="h-3 w-3 text-danger-500" />
                <span>{filteredTransactions.filter(t => t.type === 'expense').length}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionList; 