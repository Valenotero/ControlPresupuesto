import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { BudgetProvider } from './context/BudgetContext';
import AuthPage from './components/Auth/AuthPage';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';

function AppContent() {
  const { currentUser, loading } = useAuth();
  const { t } = useLanguage();

  if (loading) {
    return <Loader />;
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1">
          <AuthPage />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Simular tiempo de carga inicial
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Ocultar loader después de que la app esté lista y haya pasado tiempo mínimo
    if (appReady) {
      const hideTimer = setTimeout(() => {
        setInitialLoading(false);
      }, 1500); // Mostrar loader por al menos 1.5 segundos adicionales

      return () => clearTimeout(hideTimer);
    }
  }, [appReady]);

  if (initialLoading) {
    return (
      <LanguageProvider>
        <Loader />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <CurrencyProvider>
        <AuthProvider>
          <BudgetProvider>
            <AppContent />
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </BudgetProvider>
        </AuthProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
}

export default App; 