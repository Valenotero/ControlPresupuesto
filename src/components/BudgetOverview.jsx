import React from 'react';
import { useBudget } from '../context/BudgetContext';
import { DollarSign, TrendingUp, TrendingDown, Target } from 'lucide-react';

function BudgetOverview() {
  const { budget, totalIncome, totalExpenses, balance, budgetRemaining } = useBudget();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const getBalanceColor = (amount) => {
    if (amount > 0) return 'text-success-600';
    if (amount < 0) return 'text-danger-600';
    return 'text-gray-600';
  };

  const getBudgetColor = (remaining, total) => {
    const percentage = (remaining / total) * 100;
    if (percentage > 50) return 'text-success-600';
    if (percentage > 20) return 'text-yellow-600';
    return 'text-danger-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Presupuesto Total */}
      <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-100 text-sm font-medium">
              Presupuesto Mensual
            </p>
            <p className="text-2xl font-bold">
              {formatCurrency(budget)}
            </p>
          </div>
          <div className="bg-primary-400 bg-opacity-50 p-3 rounded-full">
            <Target className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Ingresos Totales */}
      <div className="card bg-gradient-to-r from-success-500 to-success-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-success-100 text-sm font-medium">
              Ingresos Totales
            </p>
            <p className="text-2xl font-bold">
              {formatCurrency(totalIncome)}
            </p>
          </div>
          <div className="bg-success-400 bg-opacity-50 p-3 rounded-full">
            <TrendingUp className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Gastos Totales */}
      <div className="card bg-gradient-to-r from-danger-500 to-danger-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-danger-100 text-sm font-medium">
              Gastos Totales
            </p>
            <p className="text-2xl font-bold">
              {formatCurrency(totalExpenses)}
            </p>
          </div>
          <div className="bg-danger-400 bg-opacity-50 p-3 rounded-full">
            <TrendingDown className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Balance */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm font-medium">
              Balance Total
            </p>
            <p className={`text-2xl font-bold ${getBalanceColor(balance)}`}>
              {formatCurrency(balance)}
            </p>
          </div>
          <div className="bg-gray-100 p-3 rounded-full">
            <DollarSign className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Presupuesto Restante */}
      {budget > 0 && (
        <div className="md:col-span-2 lg:col-span-4">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Estado del Presupuesto
              </h3>
              <span className={`text-sm font-medium ${getBudgetColor(budgetRemaining, budget)}`}>
                {budgetRemaining >= 0 ? 'Dentro del presupuesto' : 'Presupuesto excedido'}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Gastado</span>
                <span className="font-medium">{formatCurrency(totalExpenses)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Presupuesto</span>
                <span className="font-medium">{formatCurrency(budget)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span className={getBalanceColor(budgetRemaining)}>Restante</span>
                <span className={getBalanceColor(budgetRemaining)}>
                  {formatCurrency(budgetRemaining)}
                </span>
              </div>
              
              {/* Barra de progreso */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    budgetRemaining >= 0 
                      ? totalExpenses / budget > 0.8 
                        ? 'bg-yellow-500' 
                        : 'bg-success-500'
                      : 'bg-danger-500'
                  }`}
                  style={{
                    width: `${Math.min((totalExpenses / budget) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BudgetOverview; 