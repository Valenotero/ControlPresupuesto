import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { Settings, DollarSign, X } from 'lucide-react';

function BudgetForm({ onClose }) {
  const { budget, setBudget } = useBudget();
  const { t } = useLanguage();
  const { currencySymbol, validateAmount } = useCurrency();
  const [amount, setAmount] = useState(budget || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    const amountValidation = validateAmount(amount);
    if (!amountValidation.isValid) {
      setError(amountValidation.error);
      return false;
    }
    
    if (amountValidation.value <= 0) {
      setError(t('budgetRequired'));
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const amountValidation = validateAmount(amount);
      await setBudget(amountValidation.value);
      onClose();
    } catch (error) {
      console.error('Error setting budget:', error);
      setError(t('budgetSaveError'));
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (value) => {
    // Limitar la entrada de números muy grandes
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Verificar que no exceda el límite máximo
    if (numericValue && parseFloat(numericValue) > 1e12) {
      setError(`${t('numberTooLarge')} (${t('maxAmount')})`);
      return;
    }
    
    setAmount(numericValue);
    if (error) {
      setError('');
    }
  };

  const isUpdate = budget && budget > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Settings className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {isUpdate ? t('adjustBudgetTitle') : t('configureBudgetTitle')}
              </h2>
              <p className="text-sm text-gray-600">
                {isUpdate ? t('modifyBaseIncome') : t('setBaseIncome')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Campo de presupuesto */}
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              {t('monthlyBaseIncome')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 font-medium text-lg">{currencySymbol}</span>
              </div>
              <input
                id="budget"
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                placeholder={t('placeholderAmount')}
                className={`input-field pl-12 h-14 text-xl font-semibold ${error ? 'border-danger-500 focus:ring-danger-500' : 'focus:ring-primary-500 focus:border-primary-500'}`}
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-danger-600">{error}</p>
            )}
            
            {/* Indicador de número grande */}
            {amount && parseFloat(amount) >= 1e6 && (
              <p className="mt-2 text-xs text-warning-600">
                💡 {t('largeNumberDetected')} {currencySymbol}{(parseFloat(amount) / 1e6).toFixed(1)}M
              </p>
            )}
            
            {/* Sugerencias visuales */}
            {amount && parseFloat(amount) > 0 && parseFloat(amount) < 1e6 && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  💡 <strong>{t('suggestion')}:</strong> {t('baseIncomeSuggestion')}
                </p>
              </div>
            )}
          </div>

          {/* Información adicional */}
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-primary-900 mb-2">
              {t('aboutBaseIncome')}
            </h4>
            <ul className="text-xs sm:text-sm text-primary-700 space-y-1">
              <li>• {t('baseIncomeInfo1')}</li>
              <li>• {t('baseIncomeInfo2')}</li>
              <li>• {t('baseIncomeInfo3')}</li>
            </ul>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={loading || !amount}
              className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              {loading ? t('saving') : (isUpdate ? t('update') : t('set'))}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BudgetForm; 