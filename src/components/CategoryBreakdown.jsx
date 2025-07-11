import React from 'react';
import { useBudget } from '../context/BudgetContext';
import { PieChart } from 'lucide-react';

function CategoryBreakdown() {
  const { transactions, categories, totalExpenses } = useBudget();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  // Calcular gastos por categoría
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const categoryId = transaction.category;
      if (!acc[categoryId]) {
        acc[categoryId] = 0;
      }
      acc[categoryId] += transaction.amount;
      return acc;
    }, {});

  // Convertir a array y ordenar por monto
  const categoryData = Object.entries(expensesByCategory)
    .map(([categoryId, amount]) => {
      const category = categories.find(cat => cat.id === categoryId);
      return {
        id: categoryId,
        name: category ? category.name : 'Sin categoría',
        color: category ? category.color : '#6b7280',
        amount,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      };
    })
    .sort((a, b) => b.amount - a.amount);

  // Gastos recientes por categoría (últimas 5 transacciones de gastos)
  const recentExpenses = transactions
    .filter(t => t.type === 'expense')
    .slice(0, 5);

  const getCategoryInfo = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category || { name: 'Sin categoría', color: '#6b7280' };
  };

  if (totalExpenses === 0) {
    return (
      <div className="card">
        <div className="flex items-center space-x-2 mb-4">
          <PieChart className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Desglose por Categorías
          </h3>
        </div>
        
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <PieChart className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-600 text-sm">
            Agrega algunos gastos para ver el desglose por categorías
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Desglose por categorías */}
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <PieChart className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Gastos por Categoría
          </h3>
        </div>

        <div className="space-y-4">
          {categoryData.map(category => (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="font-medium text-gray-900">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">
                    {formatCurrency(category.amount)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {category.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
              
              {/* Barra de progreso */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: category.color,
                    width: `${category.percentage}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm font-semibold text-gray-900">
            <span>Total de Gastos</span>
            <span>{formatCurrency(totalExpenses)}</span>
          </div>
        </div>
      </div>

      {/* Gastos recientes */}
      {recentExpenses.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Gastos Recientes
          </h3>
          
          <div className="space-y-3">
            {recentExpenses.map(transaction => {
              const categoryInfo = getCategoryInfo(transaction.category);
              return (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: categoryInfo.color }}
                    ></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {categoryInfo.name}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-danger-600">
                    -{formatCurrency(transaction.amount)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryBreakdown; 