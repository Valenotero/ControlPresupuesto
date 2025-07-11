import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { useLanguage } from '../context/LanguageContext';
import BudgetOverview from './BudgetOverview';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import BudgetForm from './BudgetForm';
import CategoryBreakdown from './CategoryBreakdown';
import Analytics from './Analytics';
import { Plus, Settings, BarChart3 } from 'lucide-react';

function Dashboard() {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const { budget, loading } = useBudget();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Mostrar formulario de presupuesto si no está configurado */}
      {budget === 0 && !showBudgetForm && (
        <div className="card bg-primary-50 border-primary-200 mx-2 sm:mx-0">
          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-semibold text-primary-900 mb-2">
              {t('welcome')}
            </h2>
            <p className="text-sm sm:text-base text-primary-700 mb-4">
              {t('welcomeMessage')}
            </p>
            <button
              onClick={() => setShowBudgetForm(true)}
              className="btn-primary w-full sm:w-auto"
            >
              <Settings className="h-4 w-4 mr-2" />
              {t('configureBudget')}
            </button>
          </div>
        </div>
      )}

      {/* Formulario de presupuesto */}
      {showBudgetForm && (
        <div className="animate-slide-up mx-2 sm:mx-0">
          <BudgetForm onClose={() => setShowBudgetForm(false)} />
        </div>
      )}

      {/* Resumen del presupuesto */}
      <div className="animate-fade-in">
        <BudgetOverview />
      </div>

      {/* Sección de transacciones */}
      <div className="mx-2 sm:mx-0">
        {/* Header con título y botones */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {t('recentTransactions')}
          </h2>
          
          {/* Botones de acción - Stack en móvil, fila en desktop */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* Botón principal - Nueva Transacción */}
            <button
              onClick={() => setShowTransactionForm(true)}
              className="btn-primary w-full sm:w-auto flex items-center justify-center order-1 sm:order-3"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="font-medium">{t('newTransaction')}</span>
            </button>
            
            {/* Botones secundarios */}
            <div className="flex gap-2 order-2 sm:order-1">
              <button
                onClick={() => setShowAnalytics(true)}
                className="btn-secondary flex-1 sm:flex-none flex items-center justify-center"
                title={t('analytics')}
              >
                <BarChart3 className="h-4 w-4 sm:mr-2" />
                <span className="ml-2 sm:ml-0">{t('charts')}</span>
              </button>
              
              <button
                onClick={() => setShowBudgetForm(true)}
                className="btn-secondary flex-1 sm:flex-none flex items-center justify-center"
                title={t('adjustBudget')}
              >
                <Settings className="h-4 w-4 sm:mr-2" />
                <span className="ml-2 sm:ml-0 hidden sm:inline">{t('adjustBudget')}</span>
                <span className="ml-2 sm:hidden">{t('budget')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Formulario de transacción */}
        {showTransactionForm && (
          <div className="animate-slide-up mb-6">
            <TransactionForm onClose={() => setShowTransactionForm(false)} />
          </div>
        )}

        {/* Grid principal - Responsive mejorado */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Lista de transacciones - Prioridad en móvil */}
          <div className="xl:col-span-2 order-1">
            <TransactionList />
          </div>

          {/* Desglose por categorías - Después en móvil */}
          <div className="order-2">
            <CategoryBreakdown />
          </div>
        </div>
      </div>

      {/* Modal de Analytics */}
      <Analytics 
        isOpen={showAnalytics}
        onClose={() => setShowAnalytics(false)}
      />
    </div>
  );
}

export default Dashboard; 