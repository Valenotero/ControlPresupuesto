import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';
import { X, Globe, DollarSign } from 'lucide-react';

function PreferencesModal({ isOpen, onClose }) {
  const { updateUserPreferences } = useAuth();
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const { currentCurrency, changeCurrency, availableCurrencies } = useCurrency();
  const [tempLanguage, setTempLanguage] = useState(currentLanguage);
  const [tempCurrency, setTempCurrency] = useState(currentCurrency);

  if (!isOpen) return null;

  const handleSave = async () => {
    // Cambiar preferencias locales
    if (tempLanguage !== currentLanguage) {
      changeLanguage(tempLanguage);
    }
    if (tempCurrency !== currentCurrency) {
      changeCurrency(tempCurrency);
    }
    
    // Sincronizar con Firebase si hay cambios
    if (tempLanguage !== currentLanguage || tempCurrency !== currentCurrency) {
      try {
        await updateUserPreferences({
          language: tempLanguage,
          currency: tempCurrency
        });
      } catch (error) {
        console.error('Error syncing preferences:', error);
      }
    }
    
    onClose();
  };

  const handleCancel = () => {
    setTempLanguage(currentLanguage);
    setTempCurrency(currentCurrency);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {t('preferences')}
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>{t('language')}</span>
              </div>
            </label>
            <div className="space-y-2">
              {availableLanguages.map(language => (
                <label
                  key={language.code}
                  className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="language"
                    value={language.code}
                    checked={tempLanguage === language.code}
                    onChange={(e) => setTempLanguage(e.target.value)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {language.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Currency Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>{t('currency')}</span>
              </div>
            </label>
            <div className="relative">
              <select
                value={tempCurrency}
                onChange={(e) => setTempCurrency(e.target.value)}
                className="input-field pr-8"
              >
                {availableCurrencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={handleCancel}
            className="btn-secondary flex-1"
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleSave}
            className="btn-primary flex-1"
          >
            {t('save')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreferencesModal; 