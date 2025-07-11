import React from 'react';
import { Wallet, TrendingUp } from 'lucide-react';

function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full">
              <Wallet className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Control de Presupuesto
              </h1>
              <p className="text-sm text-gray-600">
                Gestiona tus finanzas personales de manera inteligente
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-success-600">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-medium">Finanzas Saludables</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 