import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { TrendingUp, LogOut, Settings, User, Menu, X, ChevronDown, Globe, DollarSign, Check } from 'lucide-react';
import PreferencesModal from './Preferences/PreferencesModal';

function Header() {
  const { currentUser, logout } = useAuth();
  const { t, changeLanguage, availableLanguages, currentLanguage } = useLanguage();
  const { changeCurrency, availableCurrencies, currentCurrency } = useCurrency();
  const [showPreferences, setShowPreferences] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const userMenuRef = useRef(null);
  const languageRef = useRef(null);
  const currencyRef = useRef(null);

  const handleLogout = async () => {
    if (window.confirm(t('confirmLogout'))) {
      await logout({
        success: t('sessionClosed'),
        error: t('errorLoggingOut')
      });
    }
  };

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    setShowLanguageDropdown(false);
    setShowUserMenu(false); // Cerrar el menú principal después de seleccionar
  };

  const handleCurrencyChange = (currencyCode) => {
    changeCurrency(currencyCode);
    setShowCurrencyDropdown(false);
    setShowUserMenu(false); // Cerrar el menú principal después de seleccionar
  };

  // Obtener bandera del país para el idioma
  const getLanguageFlag = (langCode) => {
    const flags = {
      es: '🇪🇸',
      en: '🇺🇸', 
      fr: '🇫🇷',
      pt: '🇧🇷',
      it: '🇮🇹'
    };
    return flags[langCode] || '🌐';
  };

  const getUserDisplayName = () => {
    const name = currentUser?.displayName || currentUser?.email || '';
    // En móvil, mostrar solo el primer nombre o parte del email
    if (name.includes('@')) {
      return name.split('@')[0];
    }
    return name.split(' ')[0];
  };

  const getUserFullName = () => {
    return currentUser?.displayName || currentUser?.email || '';
  };

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setShowCurrencyDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-6">
          <div className="flex items-center justify-between">
            {/* Logo y título */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex-shrink-0 shadow-sm border border-gray-200">
                <img 
                  src="/logotipo.jpg" 
                  alt="Logo" 
                  className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                  {t('appTitle')}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  {t('appSubtitle')}
                </p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Health Status */}
              <div className="flex items-center space-x-2 text-success-600 bg-success-50 px-3 py-1.5 rounded-lg">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">{t('healthyFinances')}</span>
              </div>
              
              {/* User Menu - Desktop */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-600" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 truncate max-w-32">
                        {getUserDisplayName()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t('preferences')}
                      </p>
                    </div>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                    showUserMenu ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-slide-down">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {getUserFullName()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {currentUser?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setShowPreferences(true);
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Settings className="h-4 w-4 mr-3 text-gray-400" />
                        <span>{t('preferences')}</span>
                      </button>
                      
                      {/* Language Selector */}
                      <div className="relative" ref={languageRef}>
                        <button
                          onClick={() => {
                            setShowLanguageDropdown(!showLanguageDropdown);
                            setShowCurrencyDropdown(false); // Cerrar el otro dropdown
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Globe className="h-4 w-4 mr-3 text-gray-400" />
                          <span>{t('language')}</span>
                          <span className="ml-auto text-xs">{getLanguageFlag(currentLanguage)}</span>
                        </button>
                        
                        {/* Language Dropdown */}
                        {showLanguageDropdown && (
                          <div className="absolute right-0 top-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-slide-down">
                            {availableLanguages.map((lang) => (
                              <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code)}
                                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              >
                                <span className="mr-3">{getLanguageFlag(lang.code)}</span>
                                <span className="flex-1 text-left">{lang.name}</span>
                                {currentLanguage === lang.code && (
                                  <Check className="h-4 w-4 text-primary-600" />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Currency Selector */}
                      <div className="relative" ref={currencyRef}>
                        <button
                          onClick={() => {
                            setShowCurrencyDropdown(!showCurrencyDropdown);
                            setShowLanguageDropdown(false); // Cerrar el otro dropdown
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <DollarSign className="h-4 w-4 mr-3 text-gray-400" />
                          <span>{t('currency')}</span>
                          <span className="ml-auto text-xs font-mono">{availableCurrencies.find(c => c.code === currentCurrency)?.symbol}</span>
                        </button>
                        
                        {/* Currency Dropdown */}
                        {showCurrencyDropdown && (
                          <div className="absolute right-0 top-0 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-slide-down max-h-60 overflow-y-auto">
                            {availableCurrencies.map((currency) => (
                              <button
                                key={currency.code}
                                onClick={() => handleCurrencyChange(currency.code)}
                                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              >
                                <span className="mr-3 font-mono text-primary-600">{currency.symbol}</span>
                                <div className="flex-1 text-left">
                                  <span className="font-medium">{currency.code}</span>
                                  <span className="ml-2 text-gray-500">{currency.name}</span>
                                </div>
                                {currentCurrency === currency.code && (
                                  <Check className="h-4 w-4 text-primary-600" />
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        <span>{t('logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Usuario compacto */}
              <div className="flex items-center space-x-2 text-gray-700 min-w-0">
                <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-3 w-3 text-primary-600" />
                </div>
                <span className="text-sm font-medium truncate max-w-20">
                  {getUserDisplayName()}
                </span>
              </div>
              
              {/* Menú hamburguesa */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {showMobileMenu ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown - Mejorado */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 animate-slide-down">
              {/* User Info Card */}
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {getUserFullName()}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {currentUser?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status financiero */}
              <div className="flex items-center justify-center space-x-2 text-success-600 py-3 bg-success-50 rounded-lg mb-4">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">{t('healthyFinances')}</span>
              </div>
              
              {/* Menu Items */}
              <div className="space-y-2 mb-4">
                <button
                  onClick={() => {
                    setShowPreferences(true);
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Settings className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">{t('preferences')}</span>
                </button>
                
                {/* Language Selector Mobile */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowLanguageDropdown(!showLanguageDropdown);
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Globe className="h-5 w-5 text-gray-400" />
                    <span className="font-medium flex-1 text-left">{t('language')}</span>
                    <span className="text-sm">{getLanguageFlag(currentLanguage)}</span>
                  </button>
                  
                  {/* Language Dropdown Mobile */}
                  {showLanguageDropdown && (
                    <div className="absolute top-0 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-slide-down">
                      {availableLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            handleLanguageChange(lang.code);
                            setShowMobileMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 py-3 px-4 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <span>{getLanguageFlag(lang.code)}</span>
                          <span className="flex-1 text-left font-medium">{lang.name}</span>
                          {currentLanguage === lang.code && (
                            <Check className="h-5 w-5 text-primary-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Currency Selector Mobile */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowCurrencyDropdown(!showCurrencyDropdown);
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 py-3 px-4 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <span className="font-medium flex-1 text-left">{t('currency')}</span>
                    <span className="text-sm font-mono">{availableCurrencies.find(c => c.code === currentCurrency)?.symbol}</span>
                  </button>
                  
                  {/* Currency Dropdown Mobile */}
                  {showCurrencyDropdown && (
                    <div className="absolute top-0 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-slide-down max-h-48 overflow-y-auto">
                      {availableCurrencies.map((currency) => (
                        <button
                          key={currency.code}
                          onClick={() => {
                            handleCurrencyChange(currency.code);
                            setShowMobileMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 py-3 px-4 text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <span className="font-mono text-primary-600 w-8">{currency.symbol}</span>
                          <div className="flex-1 text-left">
                            <span className="font-medium">{currency.code}</span>
                            <span className="block text-xs text-gray-500">{currency.name}</span>
                          </div>
                          {currentCurrency === currency.code && (
                            <Check className="h-5 w-5 text-primary-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={() => {
                  handleLogout();
                  setShowMobileMenu(false);
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-medium">{t('logout')}</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <PreferencesModal 
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
      />
    </>
  );
}

export default Header; 