import React, { createContext, useContext, useState } from 'react';
import { useLanguage } from './LanguageContext';

const CurrencyContext = createContext();

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

// Configuración de monedas con traducciones
const currencies = {
  EUR: { 
    symbol: '€', 
    locale: 'es-ES',
    names: {
      es: 'Euro',
      en: 'Euro',
      fr: 'Euro',
      pt: 'Euro',
      it: 'Euro'
    }
  },
  USD: { 
    symbol: '$', 
    locale: 'en-US',
    names: {
      es: 'Dólar Estadounidense',
      en: 'US Dollar',
      fr: 'Dollar Américain',
      pt: 'Dólar Americano',
      it: 'Dollaro Americano'
    }
  },
  GBP: { 
    symbol: '£', 
    locale: 'en-GB',
    names: {
      es: 'Libra Esterlina',
      en: 'British Pound',
      fr: 'Livre Sterling',
      pt: 'Libra Esterlina',
      it: 'Sterlina Britannica'
    }
  },
  JPY: { 
    symbol: '¥', 
    locale: 'ja-JP',
    names: {
      es: 'Yen Japonés',
      en: 'Japanese Yen',
      fr: 'Yen Japonais',
      pt: 'Iene Japonês',
      it: 'Yen Giapponese'
    }
  },
  MXN: { 
    symbol: '$', 
    locale: 'es-MX',
    names: {
      es: 'Peso Mexicano',
      en: 'Mexican Peso',
      fr: 'Peso Mexicain',
      pt: 'Peso Mexicano',
      it: 'Peso Messicano'
    }
  },
  ARS: { 
    symbol: '$', 
    locale: 'es-AR',
    names: {
      es: 'Peso Argentino',
      en: 'Argentine Peso',
      fr: 'Peso Argentin',
      pt: 'Peso Argentino',
      it: 'Peso Argentino'
    }
  },
  COP: { 
    symbol: '$', 
    locale: 'es-CO',
    names: {
      es: 'Peso Colombiano',
      en: 'Colombian Peso',
      fr: 'Peso Colombien',
      pt: 'Peso Colombiano',
      it: 'Peso Colombiano'
    }
  },
  CLP: { 
    symbol: '$', 
    locale: 'es-CL',
    names: {
      es: 'Peso Chileno',
      en: 'Chilean Peso',
      fr: 'Peso Chilien',
      pt: 'Peso Chileno',
      it: 'Peso Cileno'
    }
  },
  PEN: { 
    symbol: 'S/', 
    locale: 'es-PE',
    names: {
      es: 'Sol Peruano',
      en: 'Peruvian Sol',
      fr: 'Sol Péruvien',
      pt: 'Sol Peruano',
      it: 'Sol Peruviano'
    }
  },
  BRL: { 
    symbol: 'R$', 
    locale: 'pt-BR',
    names: {
      es: 'Real Brasileño',
      en: 'Brazilian Real',
      fr: 'Réal Brésilien',
      pt: 'Real Brasileiro',
      it: 'Real Brasiliano'
    }
  },
  CAD: { 
    symbol: 'C$', 
    locale: 'en-CA',
    names: {
      es: 'Dólar Canadiense',
      en: 'Canadian Dollar',
      fr: 'Dollar Canadien',
      pt: 'Dólar Canadense',
      it: 'Dollaro Canadese'
    }
  },
  CHF: { 
    symbol: 'Fr', 
    locale: 'de-CH',
    names: {
      es: 'Franco Suizo',
      en: 'Swiss Franc',
      fr: 'Franc Suisse',
      pt: 'Franco Suíço',
      it: 'Franco Svizzero'
    }
  },
  CNY: { 
    symbol: '¥', 
    locale: 'zh-CN',
    names: {
      es: 'Yuan Chino',
      en: 'Chinese Yuan',
      fr: 'Yuan Chinois',
      pt: 'Yuan Chinês',
      it: 'Yuan Cinese'
    }
  },
  INR: { 
    symbol: '₹', 
    locale: 'hi-IN',
    names: {
      es: 'Rupia India',
      en: 'Indian Rupee',
      fr: 'Roupie Indienne',
      pt: 'Rupia Indiana',
      it: 'Rupia Indiana'
    }
  }
};

// Función para formatear números grandes con abreviaciones
const formatLargeNumber = (number, currency) => {
  if (isNaN(number) || number === null || number === undefined) {
    return `${currency.symbol}0.00`;
  }

  const absNumber = Math.abs(number);
  const isNegative = number < 0;
  
  // Límites para mostrar abreviaciones - desde más grande a más pequeño
  if (absNumber >= 1e18) {
    // Trillones de millones (Quintillones)
    return `${isNegative ? '-' : ''}${currency.symbol}${(absNumber / 1e18).toFixed(1)}Qi`;
  } else if (absNumber >= 1e15) {
    // Cuatrillones
    return `${isNegative ? '-' : ''}${currency.symbol}${(absNumber / 1e15).toFixed(1)}Qa`;
  } else if (absNumber >= 1e12) {
    // Trillones
    return `${isNegative ? '-' : ''}${currency.symbol}${(absNumber / 1e12).toFixed(1)}T`;
  } else if (absNumber >= 1e9) {
    // Miles de millones (Billones)
    return `${isNegative ? '-' : ''}${currency.symbol}${(absNumber / 1e9).toFixed(1)}B`;
  } else if (absNumber >= 1e6) {
    // Millones
    return `${isNegative ? '-' : ''}${currency.symbol}${(absNumber / 1e6).toFixed(1)}M`;
  } else if (absNumber >= 1e3) {
    // Miles
    return `${isNegative ? '-' : ''}${currency.symbol}${(absNumber / 1e3).toFixed(1)}K`;
  }
  
  // Números normales
  return `${isNegative ? '-' : ''}${currency.symbol}${absNumber.toFixed(2)}`;
};

export function CurrencyProvider({ children }) {
  // Verificar que el contexto de idioma esté disponible antes de usarlo
  let currentLanguage = 'es'; // idioma por defecto
  let t = (key) => key; // función por defecto

  try {
    const languageContext = useLanguage();
    currentLanguage = languageContext.currentLanguage;
    t = languageContext.t;
  } catch (error) {
    // Si el contexto no está disponible, usar valores por defecto
    console.warn('LanguageContext no está disponible, usando valores por defecto');
  }

  const [currentCurrency, setCurrentCurrency] = useState(() => {
    // Inicializar desde localStorage o usar 'EUR' por defecto
    const saved = localStorage.getItem('preferred-currency');
    return (saved && currencies[saved]) ? saved : 'EUR';
  });

  const formatCurrency = (amount, options = {}) => {
    const currency = currencies[currentCurrency];
    if (!currency) return amount;

    // Si se especifica compact o el número es muy grande, usar formato compacto
    if (options.compact || Math.abs(amount) >= 1e6) {
      return formatLargeNumber(amount, currency);
    }

    try {
      return new Intl.NumberFormat(currency.locale, {
        style: 'currency',
        currency: currentCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    } catch (error) {
      // Fallback si hay error con el locale
      return formatLargeNumber(amount, currency);
    }
  };

  const formatCurrencyCompact = (amount) => {
    return formatCurrency(amount, { compact: true });
  };

  const changeCurrency = (newCurrency) => {
    if (currencies[newCurrency]) {
      setCurrentCurrency(newCurrency);
      localStorage.setItem('preferred-currency', newCurrency);
    }
  };

  // Función para validar números de entrada
  const validateAmount = (amount) => {
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount)) {
      return { isValid: false, error: t('invalidNumber') };
    }
    
    if (numAmount < 0) {
      return { isValid: false, error: t('numberMustBePositive') };
    }
    
    if (numAmount > 1e18) {
      return { isValid: false, error: t('numberTooLarge') };
    }
    
    return { isValid: true, value: numAmount };
  };

  // Obtener lista de monedas disponibles con nombres traducidos
  const availableCurrencies = Object.keys(currencies).map(code => ({
    code,
    symbol: currencies[code].symbol,
    name: currencies[code].names[currentLanguage] || currencies[code].names.en
  }));

  const value = {
    currentCurrency,
    currencySymbol: currencies[currentCurrency]?.symbol || '$',
    formatCurrency,
    formatCurrencyCompact,
    changeCurrency,
    validateAmount,
    availableCurrencies
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
} 