import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const LanguageContext = createContext();

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Traducciones
const translations = {
  es: {
    // Header
    appTitle: 'Control de Presupuesto',
    appSubtitle: 'Gestiona tus finanzas personales de manera inteligente',
    healthyFinances: 'Finanzas Saludables',
    
    // Auth
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    logout: 'Cerrar Sesión',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    name: 'Nombre Completo',
    confirmPassword: 'Confirmar Contraseña',
    forgotPassword: '¿Olvidaste tu contraseña?',
    noAccount: '¿No tienes cuenta?',
    hasAccount: '¿Ya tienes cuenta?',
    
    // Dashboard
    welcome: '¡Bienvenido a tu Control de Presupuesto!',
    welcomeMessage: 'Para comenzar, establece tu presupuesto mensual',
    configureBudget: 'Configurar Presupuesto',
    recentTransactions: 'Transacciones Recientes',
    adjustBudget: 'Ajustar Presupuesto',
    newTransaction: 'Nueva Transacción',
    
    // Budget Overview
    monthlyBudget: 'Presupuesto Mensual',
    totalIncome: 'Ingresos Totales',
    totalExpenses: 'Gastos Totales',
    totalBalance: 'Balance Total',
    budgetStatus: 'Estado del Presupuesto',
    withinBudget: 'Dentro del presupuesto',
    budgetExceeded: 'Presupuesto excedido',
    spent: 'Gastado',
    budget: 'Presupuesto',
    remaining: 'Restante',
    
    // Transactions
    description: 'Descripción',
    amount: 'Monto',
    category: 'Categoría',
    expense: 'Gasto',
    income: 'Ingreso',
    selectCategory: 'Selecciona una categoría',
    cancel: 'Cancelar',
    add: 'Agregar',
    
    // Categories
    food: 'Alimentación',
    transport: 'Transporte',
    entertainment: 'Entretenimiento',
    health: 'Salud',
    education: 'Educación',
    otherExpenses: 'Otros Gastos',
    salary: 'Salario',
    freelance: 'Trabajo Independiente',
    investments: 'Inversiones',
    otherIncome: 'Otros Ingresos',
    
    // Charts & Analytics
    analytics: 'Análisis',
    charts: 'Gráficos',
    monthlyTrend: 'Tendencia Mensual',
    categoryDistribution: 'Distribución por Categorías',
    incomeVsExpenses: 'Ingresos vs Gastos',
    balanceEvolution: 'Evolución del Balance',
    noDataAvailable: 'No hay datos disponibles',
    thisMonth: 'Este Mes',
    lastMonths: 'Últimos Meses',
    totalTransactions: 'Total de Transacciones',
    averageExpense: 'Gasto Promedio',
    averageIncome: 'Ingreso Promedio',
    
    // Preferences
    preferences: 'Preferencias',
    language: 'Idioma',
    currency: 'Moneda',
    spanish: 'Español',
    english: 'Inglés',
    
    // Common
    save: 'Guardar',
    delete: 'Eliminar',
    edit: 'Editar',
    search: 'Buscar',
    filter: 'Filtrar',
    all: 'Todas',
    close: 'Cerrar',
    settings: 'Configuración'
  },
  
  en: {
    // Header
    appTitle: 'Budget Control',
    appSubtitle: 'Manage your personal finances intelligently',
    healthyFinances: 'Healthy Finances',
    
    // Auth
    login: 'Login',
    register: 'Sign Up',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    name: 'Full Name',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot your password?',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    
    // Dashboard
    welcome: 'Welcome to your Budget Control!',
    welcomeMessage: 'To get started, set your monthly budget',
    configureBudget: 'Configure Budget',
    recentTransactions: 'Recent Transactions',
    adjustBudget: 'Adjust Budget',
    newTransaction: 'New Transaction',
    
    // Budget Overview
    monthlyBudget: 'Monthly Budget',
    totalIncome: 'Total Income',
    totalExpenses: 'Total Expenses',
    totalBalance: 'Total Balance',
    budgetStatus: 'Budget Status',
    withinBudget: 'Within budget',
    budgetExceeded: 'Budget exceeded',
    spent: 'Spent',
    budget: 'Budget',
    remaining: 'Remaining',
    
    // Transactions
    description: 'Description',
    amount: 'Amount',
    category: 'Category',
    expense: 'Expense',
    income: 'Income',
    selectCategory: 'Select a category',
    cancel: 'Cancel',
    add: 'Add',
    
    // Categories
    food: 'Food',
    transport: 'Transport',
    entertainment: 'Entertainment',
    health: 'Health',
    education: 'Education',
    otherExpenses: 'Other Expenses',
    salary: 'Salary',
    freelance: 'Freelance Work',
    investments: 'Investments',
    otherIncome: 'Other Income',
    
    // Charts & Analytics
    analytics: 'Analytics',
    charts: 'Charts',
    monthlyTrend: 'Monthly Trend',
    categoryDistribution: 'Category Distribution',
    incomeVsExpenses: 'Income vs Expenses',
    balanceEvolution: 'Balance Evolution',
    noDataAvailable: 'No data available',
    thisMonth: 'This Month',
    lastMonths: 'Last Months',
    totalTransactions: 'Total Transactions',
    averageExpense: 'Average Expense',
    averageIncome: 'Average Income',
    
    // Preferences
    preferences: 'Preferences',
    language: 'Language',
    currency: 'Currency',
    spanish: 'Spanish',
    english: 'English',
    
    // Common
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    filter: 'Filter',
    all: 'All',
    close: 'Close',
    settings: 'Settings'
  }
};

export function LanguageProvider({ children }) {
  const { userPreferences, updateUserPreferences } = useAuth();
  const currentLanguage = userPreferences?.language || 'es';

  const t = (key) => {
    return translations[currentLanguage]?.[key] || key;
  };

  const changeLanguage = (newLanguage) => {
    updateUserPreferences({ language: newLanguage });
  };

  const value = {
    currentLanguage,
    t,
    changeLanguage,
    availableLanguages: [
      { code: 'es', name: 'Español' },
      { code: 'en', name: 'English' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
} 