import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { TrendingUp, LogOut, Settings, User, Globe, DollarSign, Check, ChevronDown } from 'lucide-react';
import PreferencesModal from './Preferences/PreferencesModal';

function Header() {
  const { currentUser, logout } = useAuth();
  const { t, changeLanguage, availableLanguages, currentLanguage } = useLanguage();
  const { changeCurrency, availableCurrencies, currentCurrency } = useCurrency();
  const [showPreferences, setShowPreferences] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const languageRef = useRef(null);
  const currencyRef = useRef(null);
  const userMenuRef = useRef(null);

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    setShowLanguageDropdown(false);
    setShowUserMenu(false);
  };

  const handleCurrencyChange = (currencyCode) => {
    changeCurrency(currencyCode);
    setShowCurrencyDropdown(false);
    setShowUserMenu(false);
  };

  const handleLogout = async () => {
    if (window.confirm(t('confirmLogout'))) {
      await logout({
        success: t('sessionClosed'),
        error: t('errorLoggingOut')
      });
    }
  };

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

    function handleResize() {
      const newIsDesktop = window.innerWidth >= 1024;
      setIsDesktop(newIsDesktop);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('resize', handleResize);

    if (window.innerWidth < 1024) {
      window.testBottomNav = () => {
        /* testing bottom navigation */
      };
    }

    setTimeout(() => {
      window.quickTest();
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          window.checkFooterSpacing();
        }, 500);
      }
    }, 2000);

    window.testLanguageChange = (langCode) => {
      handleLanguageChange(langCode);
    };

    window.testCurrencyChange = (currencyCode) => {
      handleCurrencyChange(currencyCode);
    };

    window.debugHeader = () => {
      /* debugging header functions */
    };

    window.diagnoseNavbar = () => {
      /* navbar diagnosis */
    };

    window.forceDesktop = () => {
      setIsDesktop(true);
      setTimeout(() => {
        window.checkDesktopNav();
      }, 100);
    };

    window.forceMobile = () => {
      setIsDesktop(false);
    };

    window.quickTest = () => {
      if (!isDesktop && window.innerWidth >= 1024) {
        window.forceDesktop();
      } else if (isDesktop && window.innerWidth < 1024) {
        window.forceMobile();
      } else {
        if (isDesktop) {
          window.testLanguageChange('en');
        }
      }
    };

    window.verifyContexts = () => {
      /* context verification */
    };

    window.checkDesktopNav = () => {
      /* desktop nav check */
    };

    window.debugVisualNav = () => {
      const desktopNav = document.querySelector('.desktop-navigation');
      if (desktopNav) {
        desktopNav.classList.add('desktop-navigation-debug');
      }
    };

    window.forceDesktopNav = () => {
      const desktopNav = document.querySelector('.desktop-navigation');
      if (desktopNav) {
        desktopNav.style.display = 'flex';
        desktopNav.style.alignItems = 'center';
        desktopNav.style.gap = '1.5rem';
        window.checkDesktopNav();
      }
    };

    window.checkFooterSpacing = () => {
      /* footer spacing check */
    };

    window.fixFooterSpacing = () => {
      const footer = document.querySelector('footer');
      if (footer && window.innerWidth < 1024) {
        footer.style.marginBottom = 'calc(100px + env(safe-area-inset-bottom))';
        setTimeout(() => {
          window.checkFooterSpacing();
        }, 100);
      }
    };

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [availableLanguages, availableCurrencies, changeLanguage, changeCurrency, currentLanguage, currentCurrency, isDesktop, t, logout]);

  return (
    <>
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg">
                <img src="/logotipo.jpg" alt="Logo" className="h-8 w-8 rounded-lg object-cover" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t('appTitle')}</h1>
                <p className="text-sm text-gray-500 hidden sm:block">{t('appSubtitle')}</p>
              </div>
            </div>

            {isDesktop && (
              <div className="desktop-navigation flex items-center space-x-6">
                <div className="flex items-center space-x-2 bg-success-50 text-success-700 px-4 py-2 rounded-full">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('healthyFinances')}</span>
                </div>

                <div className="relative" ref={languageRef}>
                  <button
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 min-h-[44px] touch-manipulation"
                  >
                    <Globe className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{getLanguageFlag(currentLanguage)}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showLanguageDropdown ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {showLanguageDropdown && (
                    <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-slide-down">
                      {availableLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 min-h-[44px] touch-manipulation"
                        >
                          <span className="text-lg">{getLanguageFlag(lang.code)}</span>
                          <span className="flex-1 text-left font-medium">{lang.name}</span>
                          {currentLanguage === lang.code && <Check className="h-4 w-4 text-primary-600" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative" ref={currencyRef}>
                  <button
                    onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 min-h-[44px] touch-manipulation"
                  >
                    <DollarSign className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700 font-mono">
                      {availableCurrencies.find((c) => c.code === currentCurrency)?.symbol}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showCurrencyDropdown ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {showCurrencyDropdown && (
                    <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-slide-down max-h-60 overflow-y-auto">
                      {availableCurrencies.map((currency) => (
                        <button
                          key={currency.code}
                          onClick={() => handleCurrencyChange(currency.code)}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 min-h-[44px] touch-manipulation"
                        >
                          <span className="text-lg font-mono text-primary-600">{currency.symbol}</span>
                          <div className="flex-1 text-left">
                            <span className="font-medium">{currency.code}</span>
                            <span className="block text-xs text-gray-500">{currency.name}</span>
                          </div>
                          {currentCurrency === currency.code && <Check className="h-4 w-4 text-primary-600" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors duration-200 min-h-[44px] touch-manipulation"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 truncate max-w-32">
                        {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Usuario'}
                      </p>
                      <p className="text-xs text-gray-500">{t('preferences')}</p>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {showUserMenu && (
                    <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-slide-down">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {currentUser?.displayName || currentUser?.email}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setShowPreferences(true);
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 min-h-[44px] touch-manipulation"
                        >
                          <Settings className="h-4 w-4 text-gray-400" />
                          <span>{t('preferences')}</span>
                        </button>
                      </div>
                      <div className="border-t border-gray-100 pt-1">
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 min-h-[44px] touch-manipulation"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>{t('logout')}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!isDesktop && (
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {!isDesktop && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 z-50 safe-bottom bottom-nav-shadow">
          <div className="grid grid-cols-4 gap-2 px-3 py-3">
            <div className="flex flex-col items-center justify-center py-2">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl mb-2 shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs text-gray-700 font-semibold">Estado</span>
              <span className="text-xs text-success-600 font-medium">Saludable</span>
            </div>

            <div className="relative" ref={languageRef}>
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex flex-col items-center justify-center py-2 w-full touch-manipulation group"
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-2xl mb-2 shadow-lg transition-all duration-200 ${showLanguageDropdown
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 scale-110'
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 group-active:scale-95'
                    }`}
                >
                  <span className="text-2xl">{getLanguageFlag(currentLanguage)}</span>
                </div>
                <span className="text-xs text-gray-700 font-semibold">Idioma</span>
                <span className="text-xs text-gray-500 font-medium">
                  {availableLanguages.find((l) => l.code === currentLanguage)?.name.substring(0, 3)}
                </span>
              </button>

              {showLanguageDropdown && (
                <div className="bottom-nav-dropdown py-1">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Idioma</h3>
                  </div>
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 touch-manipulation ${currentLanguage === lang.code ? 'bg-blue-50' : ''
                        }`}
                    >
                      <span className="text-lg">{getLanguageFlag(lang.code)}</span>
                      <div className="flex-1 text-left">
                        <span className="font-medium text-gray-900">{lang.name}</span>
                      </div>
                      {currentLanguage === lang.code && <Check className="h-4 w-4 text-blue-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={currencyRef}>
              <button
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className="flex flex-col items-center justify-center py-2 w-full touch-manipulation group"
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-2xl mb-2 shadow-lg transition-all duration-200 ${showCurrencyDropdown
                      ? 'bg-gradient-to-br from-amber-500 to-amber-600 scale-110'
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 group-active:scale-95'
                    }`}
                >
                  <span className="text-xl font-mono font-bold text-gray-700">
                    {availableCurrencies.find((c) => c.code === currentCurrency)?.symbol}
                  </span>
                </div>
                <span className="text-xs text-gray-700 font-semibold">Moneda</span>
                <span className="text-xs text-gray-500 font-medium">{currentCurrency}</span>
              </button>

              {showCurrencyDropdown && (
                <div className="bottom-nav-dropdown py-1">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Moneda</h3>
                  </div>
                  {availableCurrencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => handleCurrencyChange(currency.code)}
                      className={`w-full flex items-center space-x-3 px-3 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 touch-manipulation ${currentCurrency === currency.code ? 'bg-amber-50' : ''
                        }`}
                    >
                      <span className="text-lg font-mono font-bold text-amber-600 w-6 text-center">
                        {currency.symbol}
                      </span>
                      <div className="flex-1 text-left">
                        <span className="font-medium text-gray-900">{currency.code}</span>
                        <span className="block text-xs text-gray-500">{currency.name}</span>
                      </div>
                      {currentCurrency === currency.code && <Check className="h-4 w-4 text-amber-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex flex-col items-center justify-center py-2 w-full touch-manipulation group"
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-2xl mb-2 shadow-lg transition-all duration-200 ${showUserMenu
                      ? 'bg-gradient-to-br from-primary-500 to-primary-600 scale-110'
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 group-active:scale-95'
                    }`}
                >
                  <User className={`h-6 w-6 ${showUserMenu ? 'text-white' : 'text-gray-700'}`} />
                </div>
                <span className="text-xs text-gray-700 font-semibold">Usuario</span>
                <span className="text-xs text-gray-500 font-medium truncate max-w-16">
                  {currentUser?.displayName?.split(' ')[0] || currentUser?.email?.split('@')[0] || 'Perfil'}
                </span>
              </button>

              {showUserMenu && (
                <div className="bottom-nav-dropdown py-1">
                  <div className="px-3 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {currentUser?.displayName || 'Usuario'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowPreferences(true);
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 touch-manipulation"
                  >
                    <Settings className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-gray-900">{t('preferences')}</span>
                  </button>
                  <div className="border-t border-gray-100">
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 touch-manipulation"
                    >
                      <LogOut className="h-4 w-4 text-red-600" />
                      <span className="font-medium text-red-600">{t('logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <PreferencesModal isOpen={showPreferences} onClose={() => setShowPreferences(false)} />
    </>
  );
}

export default Header;
