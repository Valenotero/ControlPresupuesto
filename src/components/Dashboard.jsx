import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import BudgetOverview from './BudgetOverview';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import BudgetForm from './BudgetForm';
import CategoryBreakdown from './CategoryBreakdown';
import { Plus, Settings } from 'lucide-react';

function Dashboard() {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const { budget } = useBudget();

  return (
    <div className="space-y-6">
      {/* Mostrar formulario de presupuesto si no está configurado */}
      {budget === 0 && !showBudgetForm && (
        <div className="card bg-primary-50 border-primary-200">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-primary-900 mb-2">
              ¡Bienvenido a tu Control de Presupuesto!
            </h2>
            <p className="text-primary-700 mb-4">
              Para comenzar, establece tu presupuesto mensual
            </p>
            <button
              onClick={() => setShowBudgetForm(true)}
              className="btn-primary"
            >
              <Settings className="h-4 w-4 mr-2" />
              Configurar Presupuesto
            </button>
          </div>
        </div>
      )}

      {/* Formulario de presupuesto */}
      {showBudgetForm && (
        <div className="animate-slide-up">
          <BudgetForm onClose={() => setShowBudgetForm(false)} />
        </div>
      )}

      {/* Resumen del presupuesto */}
      <div className="animate-fade-in">
        <BudgetOverview />
      </div>

      {/* Botón para agregar transacción */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          Transacciones Recientes
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowBudgetForm(true)}
            className="btn-secondary"
          >
            <Settings className="h-4 w-4 mr-2" />
            Ajustar Presupuesto
          </button>
          <button
            onClick={() => setShowTransactionForm(true)}
            className="btn-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Transacción
          </button>
        </div>
      </div>

      {/* Formulario de transacción */}
      {showTransactionForm && (
        <div className="animate-slide-up">
          <TransactionForm onClose={() => setShowTransactionForm(false)} />
        </div>
      )}

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de transacciones */}
        <div className="lg:col-span-2 animate-fade-in">
          <TransactionList />
        </div>

        {/* Desglose por categorías */}
        <div className="animate-fade-in">
          <CategoryBreakdown />
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 