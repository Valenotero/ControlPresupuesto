import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import { X, DollarSign, Calendar, Tag } from 'lucide-react';

function TransactionForm({ onClose }) {
  const { addTransaction, categories } = useBudget();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
  });
  const [errors, setErrors] = useState({});

  const expenseCategories = categories.filter(cat => cat.type === 'expense');
  const incomeCategories = categories.filter(cat => cat.type === 'income');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }
    
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'El monto debe ser mayor a 0';
    }
    
    if (!formData.category) {
      newErrors.category = 'Selecciona una categoría';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      addTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      onClose();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Reset category when type changes
      ...(field === 'type' && { category: '' })
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const availableCategories = formData.type === 'expense' ? expenseCategories : incomeCategories;

  return (
    <div className="card max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Nueva Transacción
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tipo de transacción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Transacción
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleInputChange('type', 'expense')}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                formData.type === 'expense'
                  ? 'border-danger-500 bg-danger-50 text-danger-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              💸 Gasto
            </button>
            <button
              type="button"
              onClick={() => handleInputChange('type', 'income')}
              className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                formData.type === 'income'
                  ? 'border-success-500 bg-success-50 text-success-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              💰 Ingreso
            </button>
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <input
            type="text"
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Ej: Compra en supermercado"
            className={`input-field ${errors.description ? 'border-danger-500 focus:ring-danger-500' : ''}`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-danger-600">{errors.description}</p>
          )}
        </div>

        {/* Monto */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Monto
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
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

        {/* Categoría */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Tag className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`input-field pl-10 ${errors.category ? 'border-danger-500 focus:ring-danger-500' : ''}`}
            >
              <option value="">Selecciona una categoría</option>
              {availableCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {errors.category && (
            <p className="mt-1 text-sm text-danger-600">{errors.category}</p>
          )}
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`flex-1 ${
              formData.type === 'expense' ? 'btn-danger' : 'btn-success'
            }`}
          >
            Agregar {formData.type === 'expense' ? 'Gasto' : 'Ingreso'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm; 