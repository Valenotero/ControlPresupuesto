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

  // Manejadores simplificados sin preventDefault/stopPropagation problemáticos
  const handleLanguageChange = (languageCode) => {
    console.log('🌐 Cambiando idioma a:', languageCode);
    changeLanguage(languageCode);
    setShowLanguageDropdown(false);
    setShowUserMenu(false);
    console.log('✅ Idioma cambiado');
  };

  const handleCurrencyChange = (currencyCode) => {
    console.log('💰 Cambiando moneda a:', currencyCode);
    changeCurrency(currencyCode);
    setShowCurrencyDropdown(false);
    setShowUserMenu(false);
    console.log('✅ Moneda cambiada');
  };

  const handleLogout = async () => {
    if (window.confirm(t('confirmLogout'))) {
      await logout({
        success: t('sessionClosed'),
        error: t('errorLoggingOut')
      });
    }
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

  // Detectar cambios en el tamaño de ventana y cerrar menús al hacer clic fuera
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
      console.log('🖥️ Window resized:', window.innerWidth, 'Desktop mode:', newIsDesktop);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    window.addEventListener('resize', handleResize);

    // Debug para verificar la nueva navegación inferior en móviles y tablets
    if (window.innerWidth < 1024) {
      console.log('📱 MOBILE/TABLET BOTTOM NAVIGATION LOADED');
      console.log('✅ Bottom navigation should be visible at the bottom of the screen');

      // Función global para testing
      window.testBottomNav = () => {
        console.log('🧪 TESTING BOTTOM NAVIGATION');
        console.log('👆 Try tapping the bottom navigation buttons');
        console.log('📍 Current screen width:', window.innerWidth);
        console.log('📱 Is mobile/tablet view:', window.innerWidth < 1024);
      };
    }

    // Debug para verificar contextos y viewport
    console.log('🔍 HEADER DEBUG:');
    console.log('- Current Language:', currentLanguage);
    console.log('- Available Languages:', availableLanguages);
    console.log('- Current Currency:', currentCurrency);
    console.log('- Available Currencies:', availableCurrencies);
    console.log('- Change Language Function:', typeof changeLanguage);
    console.log('- Change Currency Function:', typeof changeCurrency);
    console.log('- Window Width:', window.innerWidth);
    console.log('- Is Desktop (≥1024px):', window.innerWidth >= 1024);
    console.log('- Is Mobile/Tablet (<1024px):', window.innerWidth < 1024);
    console.log('- React isDesktop state:', isDesktop);
    console.log('');
    console.log('🚀 QUICK START:');
    console.log('Run window.quickTest() for automatic fixing and testing');
    console.log('Run window.diagnoseNavbar() for detailed diagnosis');

    // Auto-diagnóstico y corrección después de 2 segundos
    setTimeout(() => {
      console.log('🔄 AUTO-DIAGNOSIS AND FIX RUNNING...');
      window.quickTest();
      // Verificar espaciado del footer en móviles/tablets
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          window.checkFooterSpacing();
        }, 500);
      }
    }, 2000);

    // Función global para testing cambios
    window.testLanguageChange = (langCode) => {
      console.log('🧪 TESTING LANGUAGE CHANGE TO:', langCode);
      handleLanguageChange(langCode);
    };

    window.testCurrencyChange = (currencyCode) => {
      console.log('🧪 TESTING CURRENCY CHANGE TO:', currencyCode);
      handleCurrencyChange(currencyCode);
    };

    // Función para testear directamente desde la consola
    window.debugHeader = () => {
      console.log('🔍 DEBUGGING HEADER FUNCTIONS:');
      console.log('Available languages:', availableLanguages);
      console.log('Available currencies:', availableCurrencies);
      console.log('Current language:', currentLanguage);
      console.log('Current currency:', currentCurrency);
      console.log('Try: window.testLanguageChange("en") or window.testCurrencyChange("USD")');
      console.log('');
      console.log('📱 DEBUGGING FUNCTIONS AVAILABLE:');
      console.log('- window.checkDesktopNav() - Check desktop navigation visibility');
      console.log('- window.debugVisualNav() - Add visual debug styling');
      console.log('- window.forceDesktopNav() - Force desktop navigation to be visible');
      console.log('- window.verifyContexts() - Check if contexts are working');
    };

    // Función principal de diagnóstico
    window.diagnoseNavbar = () => {
      console.log('🏥 NAVBAR DIAGNOSIS STARTING...');
      console.log('='.repeat(50));

      // 1. Verificar viewport
      console.log('1️⃣ VIEWPORT CHECK:');
      console.log('Window width:', window.innerWidth);
      console.log('Is desktop:', window.innerWidth >= 1024);
      console.log('Is mobile/tablet:', window.innerWidth < 1024);
      console.log('React isDesktop state:', isDesktop);
      console.log('');

      // 2. Verificar navegación desktop
      console.log('2️⃣ DESKTOP NAVIGATION CHECK:');
      window.checkDesktopNav();
      console.log('');

      // 3. Verificar contextos
      console.log('3️⃣ CONTEXT CHECK:');
      window.verifyContexts();
      console.log('');

      // 4. Verificar espaciado del footer
      console.log('4️⃣ FOOTER SPACING CHECK:');
      if (window.innerWidth < 1024) {
        window.checkFooterSpacing();
      } else {
        console.log('Desktop mode - footer spacing not needed');
      }
      console.log('');

      // 5. Sugerencias
      console.log('5️⃣ SUGGESTIONS:');
      if (window.innerWidth >= 1024) {
        console.log('✅ You are on desktop - navigation should be visible');
        console.log('🔧 Try: window.forceDesktop() to force desktop mode');
        console.log('🎨 Try: window.debugVisualNav() to add visual debugging');
      } else {
        console.log('📱 You are on mobile/tablet - try resizing window to desktop size');
        console.log('🔧 Try: window.forceDesktop() to simulate desktop mode');
        console.log('🦶 Try: window.fixFooterSpacing() to fix footer spacing issues');
      }
      console.log('='.repeat(50));
    };

    // Función para forzar modo desktop (para testing)
    window.forceDesktop = () => {
      console.log('🖥️ FORCING DESKTOP MODE...');
      setIsDesktop(true);
      console.log('✅ Desktop mode forced. Navigation should now be visible.');
      setTimeout(() => {
        window.checkDesktopNav();
      }, 100);
    };

    // Función para volver a modo móvil
    window.forceMobile = () => {
      console.log('📱 FORCING MOBILE MODE...');
      setIsDesktop(false);
      console.log('✅ Mobile mode forced. Bottom navigation should now be visible.');
    };

    // Función para testing rápido
    window.quickTest = () => {
      console.log('⚡ QUICK TEST STARTING...');
      console.log('Current mode:', isDesktop ? 'Desktop' : 'Mobile');
      console.log('Window width:', window.innerWidth);

      if (!isDesktop && window.innerWidth >= 1024) {
        console.log('🔧 Fixing: Window is desktop size but state is mobile/tablet. Forcing desktop mode...');
        window.forceDesktop();
      } else if (isDesktop && window.innerWidth < 1024) {
        console.log('🔧 Fixing: Window is desktop size but state is mobile/tablet. Forcing mobile/tablet mode...');
        window.forceMobile();
      } else {
        console.log('✅ State matches window size. Testing navigation...');
        if (isDesktop) {
          console.log('🖥️ Testing desktop navigation...');
          window.testLanguageChange('en');
        } else {
          console.log('📱 Mobile/tablet navigation is active');
        }
      }
    };

    // Función para verificar que las funciones de contexto funcionen
    window.verifyContexts = () => {
      console.log('🧪 CONTEXT VERIFICATION:');
      console.log('LanguageContext working:', typeof changeLanguage === 'function');
      console.log('CurrencyContext working:', typeof changeCurrency === 'function');
      console.log('Available languages count:', availableLanguages?.length || 0);
      console.log('Available currencies count:', availableCurrencies?.length || 0);
    };

    // Función para verificar visibilidad de navegación desktop
    window.checkDesktopNav = () => {
      const desktopNav = document.querySelector('.desktop-navigation');
      console.log('🖥️ DESKTOP NAVIGATION CHECK:');
      console.log('Desktop nav element found:', !!desktopNav);
      console.log('Desktop nav visible:', desktopNav ? window.getComputedStyle(desktopNav).display !== 'none' : false);
      console.log('Window width:', window.innerWidth);
      console.log('Should be visible (≥1024px):', window.innerWidth >= 1024);
      if (desktopNav) {
        console.log('Desktop nav classes:', desktopNav.className);
        console.log('Desktop nav computed display:', window.getComputedStyle(desktopNav).display);
        console.log('Desktop nav children count:', desktopNav.children.length);
      }
    };

    // Función para activar debug visual
    window.debugVisualNav = () => {
      const desktopNav = document.querySelector('.desktop-navigation');
      if (desktopNav) {
        desktopNav.classList.add('desktop-navigation-debug');
        console.log('🎨 Added visual debug styling to desktop navigation');
      } else {
        console.log('❌ Desktop navigation element not found');
      }
    };

    // Función para forzar visibilidad (solo para testing)
    window.forceDesktopNav = () => {
      const desktopNav = document.querySelector('.desktop-navigation');
      if (desktopNav) {
        desktopNav.style.display = 'flex !important';
        desktopNav.style.alignItems = 'center !important';
        desktopNav.style.gap = '1.5rem !important';
        console.log('🔧 Forced desktop navigation to be visible');
        window.checkDesktopNav();
      } else {
        console.log('❌ Desktop navigation element not found');
      }
    };

    // Función para verificar el espaciado del footer
    window.checkFooterSpacing = () => {
      const footer = document.querySelector('footer');
      const bottomNav = document.querySelector('.fixed.bottom-0');

      console.log('👥 FOOTER SPACING CHECK:');
      console.log('Footer found:', !!footer);
      console.log('Bottom nav found:', !!bottomNav);

      if (footer && bottomNav) {
        const footerRect = footer.getBoundingClientRect();
        const bottomNavRect = bottomNav.getBoundingClientRect();
        const gap = bottomNavRect.top - footerRect.bottom;

        console.log('Footer bottom:', footerRect.bottom);
        console.log('Bottom nav top:', bottomNavRect.top);
        console.log('Gap between footer and nav:', gap + 'px');
        console.log('Is footer visible?', footerRect.bottom < bottomNavRect.top);

        if (gap < 0) {
          console.log('🚨 FOOTER IS BEING COVERED BY BOTTOM NAV!');
          console.log('Need to increase margin-bottom of footer');
        } else {
          console.log('✅ Footer has proper spacing');
        }
      }
    };

    // Función para ajustar espaciado del footer dinámicamente
    window.fixFooterSpacing = () => {
      const footer = document.querySelector('footer');
      if (footer && window.innerWidth < 1024) {
        const currentMargin = window.getComputedStyle(footer).marginBottom;
        console.log('Current footer margin-bottom:', currentMargin);

        // Agregar más espaciado
        footer.style.marginBottom = 'calc(100px + env(safe-area-inset-bottom))';
        console.log('✅ Footer spacing increased for better visibility');

        // Verificar después del cambio
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
  }, []);

  return (
    <>
      {/* Header principal */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo y título */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg">
                <img
                  src="/logotipo.jpg"
                  alt="Logo"
                  className="h-8 w-8 rounded-lg object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {t('appTitle')}
                </h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  {t('appSubtitle')}
                </p>
              </div>
            </div>

            {/* Desktop Navigation - Controlado por estado React */}
            {isDesktop && (
              <div className="desktop-navigation flex items-center space-x-6">

                {/* Estado de finanzas */}
                <div className="flex items-center space-x-2 bg-success-50 text-success-700 px-4 py-2 rounded-full">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">{t('healthyFinances')}</span>
                </div>

                {/* Selector de idioma */}
                <div className="relative" ref={languageRef}>
                  <button
                    onClick={() => {
                      console.log('🌐 Desktop language dropdown toggled:', !showLanguageDropdown);
                      setShowLanguageDropdown(!showLanguageDropdown);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 min-h-[44px] touch-manipulation"
                  >
                    <Globe className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {getLanguageFlag(currentLanguage)}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showLanguageDropdown ? 'rotate-180' : ''
                      }`} />
                  </button>

                  {showLanguageDropdown && (
                    <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-slide-down">
                      {availableLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            console.log('🖱️ Desktop language button clicked:', lang.code);
                            handleLanguageChange(lang.code);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 min-h-[44px] touch-manipulation"
                        >
                          <span className="text-lg">{getLanguageFlag(lang.code)}</span>
                          <span className="flex-1 text-left font-medium">{lang.name}</span>
                          {currentLanguage === lang.code && (
                            <Check className="h-4 w-4 text-primary-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selector de moneda */}
                <div className="relative" ref={currencyRef}>
                  <button
                    onClick={() => {
                      console.log('💰 Desktop currency dropdown toggled:', !showCurrencyDropdown);
                      setShowCurrencyDropdown(!showCurrencyDropdown);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 min-h-[44px] touch-manipulation"
                  >
                    <DollarSign className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700 font-mono">
                      {availableCurrencies.find(c => c.code === currentCurrency)?.symbol}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showCurrencyDropdown ? 'rotate-180' : ''
                      }`} />
                  </button>

                  {showCurrencyDropdown && (
                    <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-slide-down max-h-60 overflow-y-auto">
                      {availableCurrencies.map((currency) => (
                        <button
                          key={currency.code}
                          onClick={() => {
                            console.log('🖱️ Desktop currency button clicked:', currency.code);
                            handleCurrencyChange(currency.code);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 min-h-[44px] touch-manipulation"
                        >
                          <span className="text-lg font-mono text-primary-600">{currency.symbol}</span>
                          <div className="flex-1 text-left">
                            <span className="font-medium">{currency.code}</span>
                            <span className="block text-xs text-gray-500">{currency.name}</span>
                          </div>
                          {currentCurrency === currency.code && (
                            <Check className="h-4 w-4 text-primary-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Menú de usuario */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => {
                      console.log('👤 Desktop user menu toggled:', !showUserMenu);
                      setShowUserMenu(!showUserMenu);
                    }}
                    className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-primary-50 hover:bg-primary-100 transition-colors duration-200 min-h-[44px] touch-manipulation"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900 truncate max-w-32">
                        {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Usuario'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {t('preferences')}
                      </p>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''
                      }`} />
                  </button>

                  {showUserMenu && (
                    <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-slide-down">
                      {/* Información del usuario */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {currentUser?.displayName || currentUser?.email}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {currentUser?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Opciones del menú */}
                      <div className="py-1">
                        <button
                          onClick={() => {
                            console.log('⚙️ Desktop preferences clicked');
                            setShowPreferences(true);
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 min-h-[44px] touch-manipulation"
                        >
                          <Settings className="h-4 w-4 text-gray-400" />
                          <span>{t('preferences')}</span>
                        </button>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 pt-1">
                        <button
                          onClick={() => {
                            console.log('🚪 Desktop logout clicked');
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

            {/* Mobile/Tablet - Solo avatar pequeño arriba */}
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

      {/* Barra de navegación inferior para móviles y tablets */}
      {!isDesktop && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 z-50 safe-bottom bottom-nav-shadow">
          <div className="grid grid-cols-4 gap-2 px-3 py-3">

            {/* Estado de finanzas */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl mb-2 shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs text-gray-700 font-semibold">Estado</span>
              <span className="text-xs text-success-600 font-medium">Saludable</span>
            </div>

            {/* Selector de idioma móvil */}
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => {
                  console.log('🌐 Mobile language dropdown toggled:', !showLanguageDropdown);
                  setShowLanguageDropdown(!showLanguageDropdown);
                }}
                className="flex flex-col items-center justify-center py-2 w-full touch-manipulation group"
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-2xl mb-2 shadow-lg transition-all duration-200 ${showLanguageDropdown
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 scale-110'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 group-active:scale-95'
                  }`}>
                  <span className="text-2xl">{getLanguageFlag(currentLanguage)}</span>
                </div>
                <span className="text-xs text-gray-700 font-semibold">Idioma</span>
                <span className="text-xs text-gray-500 font-medium">
                  {availableLanguages.find(l => l.code === currentLanguage)?.name.substring(0, 3)}
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
                      onClick={() => {
                        console.log('📱 Mobile language button clicked:', lang.code);
                        handleLanguageChange(lang.code);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 touch-manipulation ${currentLanguage === lang.code ? 'bg-blue-50' : ''
                        }`}
                    >
                      <span className="text-lg">{getLanguageFlag(lang.code)}</span>
                      <div className="flex-1 text-left">
                        <span className="font-medium text-gray-900">{lang.name}</span>
                      </div>
                      {currentLanguage === lang.code && (
                        <Check className="h-4 w-4 text-blue-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selector de moneda móvil */}
            <div className="relative" ref={currencyRef}>
              <button
                onClick={() => {
                  console.log('💰 Mobile currency dropdown toggled:', !showCurrencyDropdown);
                  setShowCurrencyDropdown(!showCurrencyDropdown);
                }}
                className="flex flex-col items-center justify-center py-2 w-full touch-manipulation group"
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-2xl mb-2 shadow-lg transition-all duration-200 ${showCurrencyDropdown
                    ? 'bg-gradient-to-br from-amber-500 to-amber-600 scale-110'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 group-active:scale-95'
                  }`}>
                  <span className="text-xl font-mono font-bold text-gray-700">
                    {availableCurrencies.find(c => c.code === currentCurrency)?.symbol}
                  </span>
                </div>
                <span className="text-xs text-gray-700 font-semibold">Moneda</span>
                <span className="text-xs text-gray-500 font-medium">
                  {currentCurrency}
                </span>
              </button>

              {showCurrencyDropdown && (
                <div className="bottom-nav-dropdown py-1">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Moneda</h3>
                  </div>
                  {availableCurrencies.map((currency) => (
                    <button
                      key={currency.code}
                      onClick={() => {
                        console.log('📱 Mobile currency button clicked:', currency.code);
                        handleCurrencyChange(currency.code);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-3 text-sm hover:bg-gray-50 transition-colors duration-200 touch-manipulation ${currentCurrency === currency.code ? 'bg-amber-50' : ''
                        }`}
                    >
                      <span className="text-lg font-mono font-bold text-amber-600 w-6 text-center">{currency.symbol}</span>
                      <div className="flex-1 text-left">
                        <span className="font-medium text-gray-900">{currency.code}</span>
                        <span className="block text-xs text-gray-500">{currency.name}</span>
                      </div>
                      {currentCurrency === currency.code && (
                        <Check className="h-4 w-4 text-amber-500" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Menú de usuario móvil */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  console.log('👤 Mobile user menu toggled:', !showUserMenu);
                  setShowUserMenu(!showUserMenu);
                }}
                className="flex flex-col items-center justify-center py-2 w-full touch-manipulation group"
              >
                <div className={`flex items-center justify-center w-12 h-12 rounded-2xl mb-2 shadow-lg transition-all duration-200 ${showUserMenu
                    ? 'bg-gradient-to-br from-primary-500 to-primary-600 scale-110'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 group-active:scale-95'
                  }`}>
                  <User className={`h-6 w-6 ${showUserMenu ? 'text-white' : 'text-gray-700'}`} />
                </div>
                <span className="text-xs text-gray-700 font-semibold">Usuario</span>
                <span className="text-xs text-gray-500 font-medium truncate max-w-16">
                  {currentUser?.displayName?.split(' ')[0] || currentUser?.email?.split('@')[0] || 'Perfil'}
                </span>
              </button>

              {showUserMenu && (
                <div className="bottom-nav-dropdown py-1">
                  {/* Información del usuario */}
                  <div className="px-3 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {currentUser?.displayName || 'Usuario'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {currentUser?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Opciones del menú */}
                  <button
                    onClick={() => {
                      console.log('⚙️ Mobile preferences clicked');
                      setShowPreferences(true);
                      setShowUserMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 touch-manipulation"
                  >
                    <Settings className="h-4 w-4 text-gray-600" />
                    <span className="font-medium text-gray-900">{t('preferences')}</span>
                  </button>

                  {/* Logout */}
                  <div className="border-t border-gray-100">
                    <button
                      onClick={() => {
                        console.log('🚪 Mobile logout clicked');
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

      <PreferencesModal
        isOpen={showPreferences}
        onClose={() => setShowPreferences(false)}
      />
    </>
  );
}

export default Header; 