import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Wallet, TrendingUp, LogOut, Settings, User } from 'lucide-react';
import PreferencesModal from './Preferences/PreferencesModal';

function Header() {
  const { currentUser, logout } = useAuth();
  const { t } = useLanguage();
  const [showPreferences, setShowPreferences] = useState(false);

  const handleLogout = async () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      await logout();
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full">
                <Wallet className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {t('appTitle')}
                </h1>
                <p className="text-sm text-gray-600">
                  {t('appSubtitle')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* User Info */}
              <div className="hidden sm:flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-success-600">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm font-medium">{t('healthyFinances')}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {currentUser?.displayName || currentUser?.email}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title={t('preferences')}
                >
                  <Settings className="h-5 w-5" />
                </button>
                
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
                  title={t('logout')}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile User Info */}
          <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {currentUser?.displayName || currentUser?.email}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-success-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-medium">{t('healthyFinances')}</span>
              </div>
            </div>
          </div>
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