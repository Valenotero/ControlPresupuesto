// src/components/TransactionForm.jsx
import React, { useState, useEffect } from 'react';
import { useBudget } from '../context/BudgetContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { Plus, FileText, Tag, DollarSign, X } from 'lucide-react';

export default function TransactionForm({ onClose }) {
  const { addTransaction, categories } = useBudget();
  const { t } = useLanguage();
  const { currencySymbol, validateAmount } = useCurrency();

  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'expense'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Trigger CSS transitions on mount
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.description.trim()) {
      newErrors.description = t('descriptionRequired');
    }
    const amountValidation = validateAmount(formData.amount);
    if (!amountValidation.isValid) {
      newErrors.amount = amountValidation.error;
    } else if (amountValidation.value <= 0) {
      newErrors.amount = t('amountRequired');
    }
    if (!formData.category) {
      newErrors.category = t('categoryRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const amountValidation = validateAmount(formData.amount);
      await addTransaction({
        ...formData,
        amount: amountValidation.value,
        date: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAmountChange = (value) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    if (numericValue && parseFloat(numericValue) > 1e12) {
      setErrors(prev => ({
        ...prev,
        amount: `${t('numberTooLarge')} (${t('maxAmount')})`
      }));
      return;
    }
    handleInputChange('amount', numericValue);
  };

  const filteredCategories = categories.filter(cat => cat.type === formData.type);

  return (
    <div
      className={`
        fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50
        transition-opacity duration-300 ease-out
        ${visible ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={onClose}
    >
      <div
        className={`
          bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto
          transform transition-transform duration-300 ease-out
          ${visible ? 'scale-100' : 'scale-95'}
        `}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            {t('addNewTransaction')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Tipo de transacción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('transactionType')}
            </label>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => handleInputChange('type', 'expense')}
                className={`flex-1 py-2 px-4 border rounded-lg text-sm font-medium transition-colors ${
                  formData.type === 'expense'
                    ? 'bg-danger-100 border-danger-200 text-danger-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t('expense')}
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('type', 'income')}
                className={`flex-1 py-2 px-4 border rounded-lg text-sm font-medium transition-colors ${
                  formData.type === 'income'
                    ? 'bg-success-100 border-success-200 text-success-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t('income')}
              </button>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t('description')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="description"
                type="text"
                value={formData.description}
                onChange={e => handleInputChange('description', e.target.value)}
                placeholder={t('transactionPlaceholder')}
                className={`input-field pl-10 h-12 w-full ${
                  errors.description ? 'border-danger-500 focus:ring-danger-500' : ''
                }`}
                maxLength={100}
              />
            </div>
            {errors.description && (
              <p className="mt-1 text-sm text-danger-600">{errors.description}</p>
            )}
          </div>

          {/* Monto */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t('amount')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 font-medium">{currencySymbol}</span>
              </div>
              <input
                id="amount"
                type="text"
                inputMode="decimal"
                value={formData.amount}
                onChange={e => handleAmountChange(e.target.value)}
                placeholder="0.00"
                className={`input-field pl-10 h-12 w-full text-lg ${
                  errors.amount ? 'border-danger-500 focus:ring-danger-500' : ''
                }`}
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-danger-600">{errors.amount}</p>
            )}
            {formData.amount && parseFloat(formData.amount) >= 1e6 && (
              <p className="mt-1 text-xs text-warning-600">
                💡 {t('largeNumberDetected')} {currencySymbol}
                {(parseFloat(formData.amount) / 1e6).toFixed(1)}M
              </p>
            )}
          </div>

          {/* Categoría */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {t('category')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="category"
                value={formData.category}
                onChange={e => handleInputChange('category', e.target.value)}
                className={`input-field pl-10 h-12 w-full ${
                  errors.category ? 'border-danger-500 focus:ring-danger-500' : ''
                }`}
              >
                <option value="">{t('selectCategory')}</option>
                {filteredCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.category && (
              <p className="mt-1 text-sm text-danger-600">{errors.category}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors"
            >
              {loading ? t('saving') : t('add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
