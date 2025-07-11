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
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mostrar formulario de presupuesto si no está configurado */}
      {budget === 0 && !showBudgetForm && (
        <div className="card bg-primary-50 border-primary-200">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-primary-900 mb-2">
              {t('welcome')}
            </h2>
            <p className="text-primary-700 mb-4">
              {t('welcomeMessage')}
            </p>
            <button
              onClick={() => setShowBudgetForm(true)}
              className="btn-primary"
            >
              <Settings className="h-4 w-4 mr-2" />
              {t('configureBudget')}
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

      {/* Botones de acción */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">
          {t('recentTransactions')}
        </h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAnalytics(true)}
            className="btn-secondary flex items-center"
            title={t('analytics')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t('charts')}</span>
            <span className="sm:hidden">{t('analytics')}</span>
          </button>
          <button
            onClick={() => setShowBudgetForm(true)}
            className="btn-secondary"
          >
            <Settings className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">{t('adjustBudget')}</span>
          </button>
          <button
            onClick={() => setShowTransactionForm(true)}
            className="btn-primary"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('newTransaction')}
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

      {/* Modal de Analytics */}
      <Analytics 
        isOpen={showAnalytics}
        onClose={() => setShowAnalytics(false)}
      />
    </div>
  );
}

export default Dashboard; 