import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { X, DollarSign } from 'lucide-react';

function BudgetForm({ onClose }) {
  const { budget, setBudget } = useBudget();
  const { t } = useLanguage();
  const { getCurrencySymbol } = useCurrency();
  const [amount, setAmount] = useState(budget || '');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!amount || amount <= 0) {
      newErrors.amount = 'El presupuesto debe ser mayor a 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setBudget(parseFloat(amount));
      onClose();
    }
  };

  return (
    <div className="card max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {t('configureBudget')}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
            {t('monthlyBudget')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">{getCurrencySymbol()}</span>
            </div>
            <input
              type="number"
              id="budget"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`input-field pl-10 ${errors.amount ? 'border-danger-500 focus:ring-danger-500' : ''}`}
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-danger-600">{errors.amount}</p>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            ¿Qué es el presupuesto mensual?
          </h3>
          <p className="text-sm text-gray-600">
            Es la cantidad máxima que planeas gastar cada mes. Te ayudará a 
            controlar tus gastos y mantener tus finanzas en orden.
          </p>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            {t('cancel')}
          </button>
          <button
            type="submit"
            className="btn-primary flex-1"
          >
            {budget > 0 ? 'Actualizar' : 'Establecer'} {t('budget')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BudgetForm; 