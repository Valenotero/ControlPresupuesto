import React from 'react';
import { useLanguage } from '../context/LanguageContext';

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto shadow-sm">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Logo y info */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm border border-gray-200">
              <img 
                src="/img/logotipo.jpg" 
                alt="Logo" 
                className="h-6 w-6 rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {t('appTitle')}
              </p>
              <p className="text-xs text-gray-500">
                {t('appSubtitle')}
              </p>
            </div>
          </div>

          {/* Derechos reservados */}
          <div className="text-center sm:text-right">
            <p className="text-sm text-gray-600">
              © 2025 <a href="https://vgwebstudioportfolio.netlify.app/">VGWebStudio.</a> Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 