import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const CurrencyContext = createContext();

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

// Configuración de monedas
const currencies = {
  EUR: { symbol: '€', name: 'Euro', locale: 'es-ES' },
  USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' },
  GBP: { symbol: '£', name: 'British Pound', locale: 'en-GB' },
  JPY: { symbol: '¥', name: 'Japanese Yen', locale: 'ja-JP' },
  MXN: { symbol: '$', name: 'Mexican Peso', locale: 'es-MX' },
  ARS: { symbol: '$', name: 'Argentine Peso', locale: 'es-AR' },
  COP: { symbol: '$', name: 'Colombian Peso', locale: 'es-CO' },
  CLP: { symbol: '$', name: 'Chilean Peso', locale: 'es-CL' },
  PEN: { symbol: 'S/', name: 'Peruvian Sol', locale: 'es-PE' },
  BRL: { symbol: 'R$', name: 'Brazilian Real', locale: 'pt-BR' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
  CHF: { symbol: 'Fr', name: 'Swiss Franc', locale: 'de-CH' },
  CNY: { symbol: '¥', name: 'Chinese Yuan', locale: 'zh-CN' },
  INR: { symbol: '₹', name: 'Indian Rupee', locale: 'hi-IN' }
};

export function CurrencyProvider({ children }) {
  const { userPreferences, updateUserPreferences } = useAuth();
  const currentCurrency = userPreferences?.currency || 'EUR';

  const formatCurrency = (amount) => {
    const currency = currencies[currentCurrency];
    if (!currency) return amount;

    try {
      return new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currentCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    } catch (error) {
      // Fallback if locale is not supported
      return `${currency.symbol}${amount.toFixed(2)}`;
    }
  };

  const changeCurrency = (newCurrency) => {
    if (currencies[newCurrency]) {
      updateUserPreferences({ currency: newCurrency });
    }
  };

  const getCurrencySymbol = (currencyCode = currentCurrency) => {
    return currencies[currencyCode]?.symbol || '';
  };

  const value = {
    currentCurrency,
    formatCurrency,
    changeCurrency,
    getCurrencySymbol,
    availableCurrencies: Object.entries(currencies).map(([code, info]) => ({
      code,
      name: info.name,
      symbol: info.symbol
    }))
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
} 