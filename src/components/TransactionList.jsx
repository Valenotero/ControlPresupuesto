import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Trash2, TrendingUp, TrendingDown, Search, Filter } from 'lucide-react';

function TransactionList() {
  const { transactions, deleteTransaction, categories } = useBudget();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "d 'de' MMMM, yyyy", { locale: es });
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Sin categoría';
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
    if (window.confirm('¿Estás seguro de que quieres eliminar esta transacción?')) {
      deleteTransaction(id);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="card text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <TrendingUp className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No hay transacciones
        </h3>
        <p className="text-gray-600 mb-4">
          Comienza agregando tus primeros ingresos y gastos para visualizar tu balance financiero.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Búsqueda */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar transacciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        {/* Filtro */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field pl-10 pr-8"
          >
            <option value="all">Todas</option>
            <option value="income">Ingresos</option>
            <option value="expense">Gastos</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTransactions.map(transaction => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              {/* Icono y color de categoría */}
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: getCategoryColor(transaction.category) }}
              ></div>
              
              {/* Información de la transacción */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {transaction.description}
                </p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>{getCategoryName(transaction.category)}</span>
                  <span>•</span>
                  <span>{formatDate(transaction.date)}</span>
                </div>
              </div>
            </div>

            {/* Monto y acciones */}
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  {transaction.type === 'income' ? (
                    <TrendingUp className="h-4 w-4 text-success-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-danger-500" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      transaction.type === 'income' ? 'text-success-600' : 'text-danger-600'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => handleDelete(transaction.id)}
                className="text-gray-400 hover:text-danger-600 transition-colors p-1"
                title="Eliminar transacción"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (searchTerm || filter !== 'all') && (
        <div className="text-center py-8 text-gray-500">
          <p>No se encontraron transacciones que coincidan con tu búsqueda.</p>
        </div>
      )}

      {filteredTransactions.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Mostrando {filteredTransactions.length} de {transactions.length} transacciones
          </p>
        </div>
      )}
    </div>
  );
}

export default TransactionList; 