import React, { createContext, useContext, useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es, enUS, fr, ptBR, it } from 'date-fns/locale';

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
    createAccountSubtitle: 'Crea tu cuenta para comenzar a gestionar tu presupuesto',
    creatingAccount: 'Creando cuenta...',
    passwordMinLength: 'La contraseña debe tener al menos 6 caracteres',
    confirmPasswordRequired: 'Confirma tu contraseña',
    passwordsNoMatch: 'Las contraseñas no coinciden',
    changePassword: 'Cambiar Contraseña',
    currentPassword: 'Contraseña Actual',
    newPassword: 'Nueva Contraseña',
    confirmNewPassword: 'Confirmar Nueva Contraseña',
    changePasswordTitle: 'Cambiar tu contraseña',
    changePasswordDescription: 'Para cambiar tu contraseña, necesitas confirmar tu contraseña actual',
    currentPasswordRequired: 'La contraseña actual es requerida',
    newPasswordRequired: 'La nueva contraseña es requerida',
    confirmNewPasswordRequired: 'Confirma tu nueva contraseña',
    newPasswordMinLength: 'La nueva contraseña debe tener al menos 6 caracteres',
    newPasswordsNoMatch: 'Las nuevas contraseñas no coinciden',
    passwordChanged: 'Contraseña cambiada exitosamente',
    errorChangingPassword: 'Error al cambiar la contraseña',
    currentPasswordPlaceholder: 'Tu contraseña actual',
    newPasswordPlaceholder: 'Tu nueva contraseña',
    confirmNewPasswordPlaceholder: 'Confirma la nueva contraseña',
    confirmLogout: '¿Estás seguro de que quieres cerrar sesión?',
    confirmDeleteTransaction: '¿Estás seguro de que quieres eliminar esta transacción? Esta acción es permanente.',
    deleteAccount: 'Eliminar Cuenta',
    deleteAccountDescription: 'Esta acción eliminará permanentemente tu cuenta y todos tus datos.',
    confirmDeleteAccount: '¿Estás seguro de que quieres eliminar tu cuenta?',
    confirmDeleteAccountPermanent: 'Escribe "ELIMINAR" para confirmar que quieres borrar permanentemente tu cuenta y todos tus datos.',
    typeDeleteToConfirm: 'Escribe ELIMINAR para confirmar',
    deleteAccountWarning: '⚠️ Esta acción NO se puede deshacer',
    
    // Dashboard
    welcome: '¡Bienvenido a tu Control de Presupuesto!',
    welcomeMessage: 'Para comenzar, establece tu ingreso mensual base',
    configureBudget: 'Configurar Ingreso Base',
    recentTransactions: 'Transacciones Recientes',
    adjustBudget: 'Ajustar Ingreso Base',
    newTransaction: 'Nueva Transacción',
    
    // Budget Overview
    monthlyBudget: 'Ingreso Base',
    baseIncome: 'Ingreso Base',
    additionalIncome: 'Ingresos Adicionales',
    totalIncome: 'Total Ingresos',
    totalExpenses: 'Total Gastos',
    totalBalance: 'Balance Total',
    budgetStatus: 'Estado Financiero',
    withinBudget: 'Finanzas saludables',
    budgetExceeded: 'Gastos exceden ingresos',
    spent: 'Gastado',
    budget: 'Presupuesto',
    remaining: 'Disponible',
    available: 'Disponible',
    financialSummary: 'Resumen Financiero',
    percentSpent: '% gastado',
    baseLabel: 'Base:',
    extraLabel: 'Extra:',
    spentLabel: 'Gastado:',
    availableLabel: 'Disponible:',
    extraText: 'extra',
    
    // Transactions
    description: 'Descripción',
    amount: 'Monto',
    category: 'Categoría',
    expense: 'Gasto',
    income: 'Ingreso',
    selectCategory: 'Selecciona una categoría',
    cancel: 'Cancelar',
    add: 'Agregar',
    transactionType: 'Tipo de transacción',
    addNewTransaction: 'Agrega un nuevo ingreso o gasto',
    noTransactions: 'No hay transacciones',
    searchTransactions: 'Buscar transacciones...',
    deleteTransaction: 'Eliminar transacción',
    noTransactionsFound: 'No se encontraron transacciones que coincidan con tu búsqueda.',
    showing: 'Mostrando',
    of: 'de',
    transactions: 'transacciones',
    
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
    categoryBreakdown: 'Desglose por Categorías',
    detailedAnalysis: 'Análisis detallado',
    noExpensesRecorded: 'No hay gastos registrados',
    noIncomeRecorded: 'No hay ingresos registrados',
    uncategorized: 'Sin categoría',
    noDataToShow: 'Sin datos para mostrar',
    addTransactionsToSeeBreakdown: 'Agrega algunas transacciones para ver el desglose por categorías',
    
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
    showAllCategories: 'categorías más',
    showLess: 'Mostrar menos',
    
    // Preferences
    preferences: 'Preferencias',
    language: 'Idioma',
    currency: 'Moneda',
    spanish: 'Español',
    english: 'Inglés',
    french: 'Francés',
    portuguese: 'Portugués',
    italian: 'Italiano',
    
    // Common
    save: 'Guardar',
    delete: 'Eliminar',
    edit: 'Editar',
    search: 'Buscar',
    filter: 'Filtrar',
    all: 'Todas',
    close: 'Cerrar',
    settings: 'Configuración',
    today: 'Hoy',
    yesterday: 'Ayer',
    
    // Footer
    allRightsReserved: 'Todos los derechos reservados',
    
    // Status & Loading
    loading: 'Cargando...',
    loadingApp: 'Cargando aplicación...',
    saving: 'Guardando...',
    loggingIn: 'Iniciando sesión...',
    
    // Success Messages
    accountCreated: '¡Cuenta creada exitosamente!',
    welcomeBack: '¡Bienvenido de nuevo!',
    sessionClosed: 'Sesión cerrada correctamente',
    preferencesUpdated: 'Preferencias actualizadas',
    budgetUpdated: 'Presupuesto actualizado',
    transactionAdded: 'Transacción agregada',
    transactionDeleted: 'Transacción eliminada',
    accountDeleted: 'Cuenta eliminada exitosamente',
    
    // Error Messages
    errorLoadingData: 'Error al cargar los datos',
    errorCreatingAccount: 'Error al crear la cuenta',
    errorLoggingIn: 'Error al iniciar sesión',
    errorLoggingOut: 'Error al cerrar sesión',
    errorUpdatingPreferences: 'Error al actualizar preferencias',
    errorUpdatingBudget: 'Error al actualizar el presupuesto',
    errorAddingTransaction: 'Error al agregar la transacción',
    errorDeletingTransaction: 'Error al eliminar la transacción',
    errorDeletingAccount: 'Error al eliminar la cuenta',
    
    // Firebase Specific Errors
    firebaseUserNotFound: 'Usuario no encontrado',
    firebaseWrongPassword: 'Contraseña incorrecta',
    firebaseEmailAlreadyInUse: 'Este correo ya está registrado',
    firebaseWeakPassword: 'La contraseña es muy débil',
    firebaseInvalidEmail: 'Correo electrónico inválido',
    firebaseTooManyRequests: 'Demasiados intentos. Intenta más tarde',
    firebaseNetworkError: 'Error de conexión. Verifica tu internet',
    firebaseOperationNotAllowed: 'Operación no permitida',
    firebaseUserDisabled: 'Esta cuenta ha sido deshabilitada',
    firebaseEmailNotVerified: 'Correo electrónico no verificado',
    firebaseUnknownError: 'Ha ocurrido un error inesperado',
    
    // Validation Messages
    nameRequired: 'El nombre es requerido',
    nameMinLength: 'El nombre debe tener al menos 2 caracteres',
    emailRequired: 'El correo es requerido',
    emailInvalid: 'Correo inválido',
    passwordRequired: 'La contraseña es requerida',
    descriptionRequired: 'La descripción es requerida',
    amountRequired: 'El monto debe ser mayor a 0',
    categoryRequired: 'La categoría es requerida',
    budgetRequired: 'El presupuesto debe ser mayor a 0',
    budgetSaveError: 'Error al guardar el presupuesto',
    invalidNumber: 'Número inválido',
    numberTooLarge: 'El número es demasiado grande',
    numberMustBePositive: 'El número debe ser positivo',
    largeNumberDetected: 'Número grande detectado. Se mostrará como',
    maxAmount: 'máximo: 1 billón',
    
    // Placeholders
    fullNamePlaceholder: 'Tu nombre completo',
    emailPlaceholder: 'tu@email.com',
    passwordPlaceholder: '••••••••',
    confirmPasswordPlaceholder: '••••••••',
    transactionPlaceholder: 'Ej: Almuerzo en restaurante',
    
    // Form Actions
    setAmount: 'Establecer',
    updateAmount: 'Actualizar',
    configureBudgetTitle: 'Configurar Ingreso Base',
    adjustBudgetTitle: 'Ajustar Ingreso Base',
    configureBaseIncome: 'Configurar Ingreso Base',
    adjustBaseIncome: 'Ajustar Ingreso Base',
    monthlyBaseIncome: 'Ingreso Mensual Base',
    modifyBaseIncome: 'Modifica tu ingreso mensual base',
    setBaseIncome: 'Establece tu ingreso mensual base (salario, pensión, etc.)',
    suggestion: 'Sugerencia',
    baseIncomeSuggestion: 'Este será tu ingreso base mensual. Luego podrás agregar ingresos adicionales (freelance, bonos, etc.) como transacciones.',
    aboutBaseIncome: 'ℹ️ Sobre tu ingreso base',
    baseIncomeInfo1: 'Tu salario, pensión o ingreso principal mensual',
    baseIncomeInfo2: 'Los ingresos adicionales se agregan como transacciones',
    baseIncomeInfo3: 'Puedes modificarlo cuando quieras',
    placeholderAmount: '2000.00',
    set: 'Establecer',
    update: 'Actualizar',
    allRightsReserved: 'Todos los derechos reservados',
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
    createAccountSubtitle: 'Create your account to start managing your budget',
    creatingAccount: 'Creating account...',
    passwordMinLength: 'Password must have at least 6 characters',
    confirmPasswordRequired: 'Confirm your password',
    passwordsNoMatch: 'Passwords do not match',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    changePasswordTitle: 'Change your password',
    changePasswordDescription: 'To change your password, you need to confirm your current password',
    currentPasswordRequired: 'Current password is required',
    newPasswordRequired: 'New password is required',
    confirmNewPasswordRequired: 'Confirm your new password',
    newPasswordMinLength: 'New password must have at least 6 characters',
    newPasswordsNoMatch: 'New passwords do not match',
    passwordChanged: 'Password changed successfully',
    errorChangingPassword: 'Error changing password',
    currentPasswordPlaceholder: 'Your current password',
    newPasswordPlaceholder: 'Your new password',
    confirmNewPasswordPlaceholder: 'Confirm the new password',
    confirmLogout: 'Are you sure you want to log out?',
    confirmDeleteTransaction: 'Are you sure you want to delete this transaction? This action is permanent.',
    deleteAccount: 'Delete Account',
    deleteAccountDescription: 'This action will permanently delete your account and all your data.',
    confirmDeleteAccount: 'Are you sure you want to delete your account?',
    confirmDeleteAccountPermanent: 'Type "DELETE" to confirm that you want to permanently delete your account and all your data.',
    typeDeleteToConfirm: 'Type DELETE to confirm',
    deleteAccountWarning: '⚠️ This action CANNOT be undone',
    
    // Dashboard
    welcome: 'Welcome to your Budget Control!',
    welcomeMessage: 'To get started, set your monthly base income',
    configureBudget: 'Configure Base Income',
    recentTransactions: 'Recent Transactions',
    adjustBudget: 'Adjust Base Income',
    newTransaction: 'New Transaction',
    
    // Budget Overview
    monthlyBudget: 'Base Income',
    baseIncome: 'Base Income',
    additionalIncome: 'Additional Income',
    totalIncome: 'Total Income',
    totalExpenses: 'Total Expenses',
    totalBalance: 'Total Balance',
    budgetStatus: 'Financial Status',
    withinBudget: 'Healthy finances',
    budgetExceeded: 'Expenses exceed income',
    spent: 'Spent',
    budget: 'Budget',
    remaining: 'Available',
    available: 'Available',
    financialSummary: 'Financial Summary',
    percentSpent: '% spent',
    baseLabel: 'Base:',
    extraLabel: 'Extra:',
    spentLabel: 'Spent:',
    availableLabel: 'Available:',
    extraText: 'extra',
    
    // Transactions
    description: 'Description',
    amount: 'Amount',
    category: 'Category',
    expense: 'Expense',
    income: 'Income',
    selectCategory: 'Select a category',
    cancel: 'Cancel',
    add: 'Add',
    transactionType: 'Transaction Type',
    addNewTransaction: 'Add a new income or expense',
    noTransactions: 'No transactions',
    searchTransactions: 'Search transactions...',
    deleteTransaction: 'Delete transaction',
    noTransactionsFound: 'No transactions found matching your search.',
    showing: 'Showing',
    of: 'of',
    transactions: 'transactions',
    
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
    categoryBreakdown: 'Category Breakdown',
    detailedAnalysis: 'Detailed Analysis',
    noExpensesRecorded: 'No expenses recorded',
    noIncomeRecorded: 'No income recorded',
    uncategorized: 'Uncategorized',
    noDataToShow: 'No data to show',
    addTransactionsToSeeBreakdown: 'Add some transactions to see the category breakdown',
    
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
    showAllCategories: 'more categories',
    showLess: 'Show less',
    
    // Preferences
    preferences: 'Preferences',
    language: 'Language',
    currency: 'Currency',
    spanish: 'Spanish',
    english: 'English',
    french: 'French',
    portuguese: 'Portuguese',
    italian: 'Italian',
    
    // Common
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    filter: 'Filter',
    all: 'All',
    close: 'Close',
    settings: 'Settings',
    today: 'Today',
    yesterday: 'Yesterday',
    
    // Footer
    allRightsReserved: 'All rights reserved',
    
    // Status & Loading
    loading: 'Loading...',
    loadingApp: 'Loading application...',
    saving: 'Saving...',
    loggingIn: 'Logging in...',
    
    // Success Messages
    accountCreated: 'Account created successfully!',
    welcomeBack: 'Welcome back!',
    sessionClosed: 'Session closed successfully',
    preferencesUpdated: 'Preferences updated',
    budgetUpdated: 'Budget updated',
    transactionAdded: 'Transaction added',
    transactionDeleted: 'Transaction deleted',
    accountDeleted: 'Account deleted successfully',
    
    // Error Messages
    errorLoadingData: 'Error loading data',
    errorCreatingAccount: 'Error creating account',
    errorLoggingIn: 'Error logging in',
    errorLoggingOut: 'Error logging out',
    errorUpdatingPreferences: 'Error updating preferences',
    errorUpdatingBudget: 'Error updating budget',
    errorAddingTransaction: 'Error adding transaction',
    errorDeletingTransaction: 'Error deleting transaction',
    errorDeletingAccount: 'Error deleting account',
    
    // Firebase Specific Errors
    firebaseUserNotFound: 'User not found',
    firebaseWrongPassword: 'Wrong password',
    firebaseEmailAlreadyInUse: 'Email already in use',
    firebaseWeakPassword: 'Password is too weak',
    firebaseInvalidEmail: 'Invalid email',
    firebaseTooManyRequests: 'Too many requests. Try again later',
    firebaseNetworkError: 'Network error. Check your internet connection',
    firebaseOperationNotAllowed: 'Operation not allowed',
    firebaseUserDisabled: 'This account has been disabled',
    firebaseEmailNotVerified: 'Email not verified',
    firebaseUnknownError: 'An unexpected error occurred',
    
    // Validation Messages
    nameRequired: 'Name is required',
    nameMinLength: 'Name must have at least 2 characters',
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email',
    passwordRequired: 'Password is required',
    descriptionRequired: 'Description is required',
    amountRequired: 'Amount must be greater than 0',
    categoryRequired: 'Category is required',
    budgetRequired: 'Budget must be greater than 0',
    budgetSaveError: 'Error saving budget',
    invalidNumber: 'Invalid number',
    numberTooLarge: 'Number is too large',
    numberMustBePositive: 'Number must be positive',
    largeNumberDetected: 'Large number detected. Will be displayed as',
    maxAmount: 'maximum: 1 trillion',
    
    // Placeholders
    fullNamePlaceholder: 'Your full name',
    emailPlaceholder: 'your@email.com',
    passwordPlaceholder: '••••••••',
    confirmPasswordPlaceholder: '••••••••',
    transactionPlaceholder: 'Ex: Lunch at restaurant',
    
    // Form Actions
    setAmount: 'Set',
    updateAmount: 'Update',
    configureBudgetTitle: 'Configure Base Income',
    adjustBudgetTitle: 'Adjust Base Income',
    configureBaseIncome: 'Configure Base Income',
    adjustBaseIncome: 'Adjust Base Income',
    monthlyBaseIncome: 'Monthly Base Income',
    modifyBaseIncome: 'Modify your monthly base income',
    setBaseIncome: 'Set your monthly base income (salary, pension, etc.)',
    suggestion: 'Suggestion',
    baseIncomeSuggestion: 'This will be your monthly base income. Then you can add additional income (freelance, bonuses, etc.) as transactions.',
    aboutBaseIncome: 'ℹ️ About your base income',
    baseIncomeInfo1: 'Your monthly salary, pension, or main income',
    baseIncomeInfo2: 'Additional income is added as transactions',
    baseIncomeInfo3: 'You can modify it whenever you want',
    placeholderAmount: '2000.00',
    set: 'Set',
    update: 'Update',

    allRightsReserved: 'All rights reserved',

  },

  fr: {
    // Header
    appTitle: 'Contrôle Budgétaire',
    appSubtitle: 'Gérez vos finances personnelles intelligemment',
    healthyFinances: 'Finances Saines',
    
    // Auth
    login: 'Se Connecter',
    register: "S'inscrire",
    logout: 'Se Déconnecter',
    email: 'Email',
    password: 'Mot de Passe',
    name: 'Nom Complet',
    confirmPassword: 'Confirmer le Mot de Passe',
    forgotPassword: 'Mot de passe oublié ?',
    noAccount: "Vous n'avez pas de compte ?",
    hasAccount: 'Vous avez déjà un compte ?',
    createAccountSubtitle: 'Créez votre compte pour commencer à gérer votre budget',
    creatingAccount: 'Création du compte...',
    passwordMinLength: 'Le mot de passe doit avoir au moins 6 caractères',
    confirmPasswordRequired: 'Confirmez votre mot de passe',
    passwordsNoMatch: 'Les mots de passe ne correspondent pas',
    changePassword: 'Changer le Mot de Passe',
    currentPassword: 'Mot de Passe Actuel',
    newPassword: 'Nouveau Mot de Passe',
    confirmNewPassword: 'Confirmer le Nouveau Mot de Passe',
    changePasswordTitle: 'Changer votre mot de passe',
    changePasswordDescription: 'Pour changer votre mot de passe, vous devez confirmer votre mot de passe actuel',
    currentPasswordRequired: 'Le mot de passe actuel est requis',
    newPasswordRequired: 'Le nouveau mot de passe est requis',
    confirmNewPasswordRequired: 'Confirmez votre nouveau mot de passe',
    newPasswordMinLength: 'Le nouveau mot de passe doit avoir au moins 6 caractères',
    newPasswordsNoMatch: 'Les nouveaux mots de passe ne correspondent pas',
    passwordChanged: 'Mot de passe changé avec succès',
    errorChangingPassword: 'Erreur lors du changement de mot de passe',
    currentPasswordPlaceholder: 'Votre mot de passe actuel',
    newPasswordPlaceholder: 'Votre nouveau mot de passe',
    confirmNewPasswordPlaceholder: 'Confirmez le nouveau mot de passe',
    confirmLogout: 'Êtes-vous sûr de vouloir vous déconnecter ?',
    confirmDeleteTransaction: 'Êtes-vous sûr de vouloir supprimer cette transaction ? Cette action est permanente.',
    deleteAccount: 'Supprimer le Compte',
    deleteAccountDescription: 'Cette action supprimera définitivement votre compte et toutes vos données.',
    confirmDeleteAccount: 'Êtes-vous sûr de vouloir supprimer votre compte ?',
    confirmDeleteAccountPermanent: 'Tapez "SUPPRIMER" pour confirmer que vous voulez supprimer définitivement votre compte et toutes vos données.',
    typeDeleteToConfirm: 'Tapez SUPPRIMER pour confirmer',
    deleteAccountWarning: '⚠️ Cette action NE PEUT PAS être annulée',
    
    // Dashboard
    welcome: 'Bienvenue dans votre Contrôle Budgétaire !',
    welcomeMessage: 'Pour commencer, définissez votre revenu mensuel de base',
    configureBudget: 'Configurer le Revenu de Base',
    recentTransactions: 'Transactions Récentes',
    adjustBudget: 'Ajuster le Revenu de Base',
    newTransaction: 'Nouvelle Transaction',
    
    // Budget Overview
    monthlyBudget: 'Revenu de Base',
    baseIncome: 'Revenu de Base',
    additionalIncome: 'Revenus Additionnels',
    totalIncome: 'Total Revenus',
    totalExpenses: 'Total Dépenses',
    totalBalance: 'Solde Total',
    budgetStatus: 'Statut Financier',
    withinBudget: 'Finances saines',
    budgetExceeded: 'Les dépenses dépassent les revenus',
    spent: 'Dépensé',
    budget: 'Budget',
    remaining: 'Disponible',
    available: 'Disponible',
    financialSummary: 'Résumé Financier',
    percentSpent: '% dépensé',
    baseLabel: 'Base:',
    extraLabel: 'Extra:',
    spentLabel: 'Dépensé:',
    availableLabel: 'Disponible:',
    extraText: 'extra',
    
    // Transactions
    description: 'Description',
    amount: 'Montant',
    category: 'Catégorie',
    expense: 'Dépense',
    income: 'Revenu',
    selectCategory: 'Sélectionnez une catégorie',
    cancel: 'Annuler',
    add: 'Ajouter',
    transactionType: 'Type de Transaction',
    addNewTransaction: 'Ajouter un nouveau revenu ou dépense',
    noTransactions: 'Aucune transaction',
    searchTransactions: 'Rechercher des transactions...',
    deleteTransaction: 'Supprimer la transaction',
    noTransactionsFound: 'Aucune transaction trouvée correspondant à votre recherche.',
    showing: 'Affichage',
    of: 'de',
    transactions: 'transactions',
    
    // Categories
    food: 'Alimentation',
    transport: 'Transport',
    entertainment: 'Divertissement',
    health: 'Santé',
    education: 'Éducation',
    otherExpenses: 'Autres Dépenses',
    salary: 'Salaire',
    freelance: 'Travail Indépendant',
    investments: 'Investissements',
    otherIncome: 'Autres Revenus',
    categoryBreakdown: 'Répartition par Catégories',
    detailedAnalysis: 'Analyse détaillée',
    noExpensesRecorded: 'Aucune dépense enregistrée',
    noIncomeRecorded: 'Aucun revenu enregistré',
    uncategorized: 'Non catégorisé',
    noDataToShow: 'Aucune donnée à afficher',
    addTransactionsToSeeBreakdown: 'Ajoutez quelques transactions pour voir la répartition par catégories',
    
    // Charts & Analytics
    analytics: 'Analyses',
    charts: 'Graphiques',
    monthlyTrend: 'Tendance Mensuelle',
    categoryDistribution: 'Distribution par Catégorie',
    incomeVsExpenses: 'Revenus vs Dépenses',
    balanceEvolution: 'Évolution du Solde',
    noDataAvailable: 'Aucune donnée disponible',
    thisMonth: 'Ce Mois',
    lastMonths: 'Derniers Mois',
    totalTransactions: 'Total des Transactions',
    averageExpense: 'Dépense Moyenne',
    averageIncome: 'Revenu Moyen',
    showAllCategories: 'plus de catégories',
    showLess: 'Voir moins',
    
    // Preferences
    preferences: 'Préférences',
    language: 'Langue',
    currency: 'Devise',
    spanish: 'Espagnol',
    english: 'Anglais',
    french: 'Français',
    portuguese: 'Portugais',
    italian: 'Italien',
    
    // Common
    save: 'Enregistrer',
    delete: 'Supprimer',
    edit: 'Modifier',
    search: 'Rechercher',
    filter: 'Filtrer',
    all: 'Toutes',
    close: 'Fermer',
    settings: 'Paramètres',
    today: 'Aujourd\'hui',
    yesterday: 'Hier',
    
    // Footer
    allRightsReserved: 'Tous droits réservés',
    
    // Status & Loading
    loading: 'Chargement...',
    loadingApp: 'Chargement de l\'application...',
    saving: 'Enregistrement...',
    loggingIn: 'Connexion...',
    
    // Success Messages
    accountCreated: 'Compte créé avec succès !',
    welcomeBack: 'Content de vous revoir !',
    sessionClosed: 'Session fermée avec succès',
    preferencesUpdated: 'Préférences mises à jour',
    budgetUpdated: 'Budget mis à jour',
    transactionAdded: 'Transaction ajoutée',
    transactionDeleted: 'Transaction supprimée',
    accountDeleted: 'Compte supprimé avec succès',
    
    // Error Messages
    errorLoadingData: 'Erreur lors du chargement des données',
    errorCreatingAccount: 'Erreur lors de la création du compte',
    errorLoggingIn: 'Erreur lors de la connexion',
    errorLoggingOut: 'Erreur lors de la déconnexion',
    errorUpdatingPreferences: 'Erreur lors de la mise à jour des préférences',
    errorUpdatingBudget: 'Erreur lors de la mise à jour du budget',
    errorAddingTransaction: 'Erreur lors de l\'ajout de la transaction',
    errorDeletingTransaction: 'Erreur lors de la suppression de la transaction',
    errorDeletingAccount: 'Erreur lors de la suppression du compte',
    
    // Firebase Specific Errors
    firebaseUserNotFound: 'Utilisateur non trouvé',
    firebaseWrongPassword: 'Mot de passe incorrect',
    firebaseEmailAlreadyInUse: 'Cet email est déjà utilisé',
    firebaseWeakPassword: 'Le mot de passe est trop faible',
    firebaseInvalidEmail: 'Email invalide',
    firebaseTooManyRequests: 'Trop de requêtes. Veuillez réessayer plus tard',
    firebaseNetworkError: 'Erreur de réseau. Veuillez vérifier votre connexion internet',
    firebaseOperationNotAllowed: 'Opération non autorisée',
    firebaseUserDisabled: 'Ce compte a été désactivé',
    firebaseEmailNotVerified: 'Email non vérifié',
    firebaseUnknownError: 'Une erreur inattendue est survenue',
    
    // Validation Messages
    nameRequired: 'Le nom est requis',
    nameMinLength: 'Le nom doit avoir au moins 2 caractères',
    emailRequired: 'L\'email est requis',
    emailInvalid: 'Email invalide',
    passwordRequired: 'Le mot de passe est requis',
    descriptionRequired: 'La description est requise',
    amountRequired: 'Le montant doit être supérieur à 0',
    categoryRequired: 'La catégorie est requise',
    budgetRequired: 'Le budget doit être supérieur à 0',
    budgetSaveError: 'Erreur lors de l\'enregistrement du budget',
    invalidNumber: 'Nombre invalide',
    numberTooLarge: 'Le nombre est trop grand',
    numberMustBePositive: 'Le nombre doit être positif',
    largeNumberDetected: 'Grand nombre détecté. Sera affiché comme',
    maxAmount: 'maximum: 1 billion',
    
    // Placeholders
    fullNamePlaceholder: 'Votre nom complet',
    emailPlaceholder: 'votre@email.com',
    passwordPlaceholder: '••••••••',
    confirmPasswordPlaceholder: '••••••••',
    transactionPlaceholder: 'Ex: Déjeuner au restaurant',
    
    // Form Actions
    setAmount: 'Définir',
    updateAmount: 'Mettre à jour',
    configureBudgetTitle: 'Configurer le Revenu de Base',
    adjustBudgetTitle: 'Ajuster le Revenu de Base',
    configureBaseIncome: 'Configurer le Revenu de Base',
    adjustBaseIncome: 'Ajuster le Revenu de Base',
    monthlyBaseIncome: 'Revenu Mensuel de Base',
    modifyBaseIncome: 'Modifiez votre revenu mensuel de base',
    setBaseIncome: 'Définissez votre revenu mensuel de base (salaire, pension, etc.)',
    suggestion: 'Suggestion',
    baseIncomeSuggestion: 'Ce sera votre revenu mensuel de base. Vous pourrez ensuite ajouter des revenus supplémentaires (freelance, bonus, etc.) comme transactions.',
    aboutBaseIncome: 'ℹ️ À propos de votre revenu de base',
    baseIncomeInfo1: 'Votre salaire mensuel, pension ou revenu principal',
    baseIncomeInfo2: 'Les revenus supplémentaires sont ajoutés comme transactions',
    baseIncomeInfo3: 'Vous pouvez le modifier quand vous voulez',
    placeholderAmount: '2000.00',
    set: 'Définir',
    update: 'Mettre à jour',
    
    allRightsReserved: 'Tous droits réservés',
  },

  pt: {
    // Header
    appTitle: 'Controle Orçamentário',
    appSubtitle: 'Gerencie suas finanças pessoais de forma inteligente',
    healthyFinances: 'Finanças Saudáveis',
    
    // Auth
    login: 'Entrar',
    register: 'Cadastrar',
    logout: 'Sair',
    email: 'Email',
    password: 'Senha',
    name: 'Nome Completo',
    confirmPassword: 'Confirmar Senha',
    forgotPassword: 'Esqueceu sua senha?',
    noAccount: 'Não tem uma conta?',
    hasAccount: 'Já tem uma conta?',
    createAccountSubtitle: 'Crie sua conta para começar a gerenciar seu orçamento',
    creatingAccount: 'Criando conta...',
    passwordMinLength: 'A senha deve ter pelo menos 6 caracteres',
    confirmPasswordRequired: 'Confirme sua senha',
    passwordsNoMatch: 'As senhas não coincidem',
    changePassword: 'Mudar Senha',
    currentPassword: 'Senha Atual',
    newPassword: 'Nova Senha',
    confirmNewPassword: 'Confirmar Nova Senha',
    changePasswordTitle: 'Mudar sua senha',
    changePasswordDescription: 'Para mudar sua senha, você precisa confirmar sua senha atual',
    currentPasswordRequired: 'A senha atual é obrigatória',
    newPasswordRequired: 'A nova senha é obrigatória',
    confirmNewPasswordRequired: 'Confirme sua nova senha',
    newPasswordMinLength: 'A nova senha deve ter pelo menos 6 caracteres',
    newPasswordsNoMatch: 'As novas senhas não coincidem',
    passwordChanged: 'Senha alterada com sucesso',
    errorChangingPassword: 'Erro ao alterar senha',
    currentPasswordPlaceholder: 'Sua senha atual',
    newPasswordPlaceholder: 'Sua nova senha',
    confirmNewPasswordPlaceholder: 'Confirme a nova senha',
    confirmLogout: 'Tem certeza de que deseja sair?',
    confirmDeleteTransaction: 'Tem certeza de que deseja excluir esta transação? Esta ação é permanente.',
    deleteAccount: 'Excluir Conta',
    deleteAccountDescription: 'Esta ação excluirá permanentemente sua conta e todos os seus dados.',
    confirmDeleteAccount: 'Tem certeza de que deseja excluir sua conta?',
    confirmDeleteAccountPermanent: 'Digite "EXCLUIR" para confirmar que deseja excluir permanentemente sua conta e todos os seus dados.',
    typeDeleteToConfirm: 'Digite EXCLUIR para confirmar',
    deleteAccountWarning: '⚠️ Esta ação NÃO pode ser desfeita',
    
    // Dashboard
    welcome: 'Bem-vindo ao seu Controle Orçamentário!',
    welcomeMessage: 'Para começar, defina sua renda mensal base',
    configureBudget: 'Configurar Renda Base',
    recentTransactions: 'Transações Recentes',
    adjustBudget: 'Ajustar Renda Base',
    newTransaction: 'Nova Transação',
    
    // Budget Overview
    monthlyBudget: 'Renda Base',
    baseIncome: 'Renda Base',
    additionalIncome: 'Renda Adicional',
    totalIncome: 'Total de Renda',
    totalExpenses: 'Total de Gastos',
    totalBalance: 'Saldo Total',
    budgetStatus: 'Status Financeiro',
    withinBudget: 'Finanças saudáveis',
    budgetExceeded: 'Gastos excedem a renda',
    spent: 'Gasto',
    budget: 'Orçamento',
    remaining: 'Disponível',
    available: 'Disponível',
    financialSummary: 'Resumo Financeiro',
    percentSpent: '% gasto',
    baseLabel: 'Base:',
    extraLabel: 'Extra:',
    spentLabel: 'Gasto:',
    availableLabel: 'Disponível:',
    extraText: 'extra',
    
    // Transactions
    description: 'Descrição',
    amount: 'Valor',
    category: 'Categoria',
    expense: 'Gasto',
    income: 'Renda',
    selectCategory: 'Selecione uma categoria',
    cancel: 'Cancelar',
    add: 'Adicionar',
    transactionType: 'Tipo de Transação',
    addNewTransaction: 'Adicionar nova renda ou gasto',
    noTransactions: 'Nenhuma transação',
    searchTransactions: 'Pesquisar transações...',
    deleteTransaction: 'Excluir transação',
    noTransactionsFound: 'Nenhuma transação encontrada correspondente à sua pesquisa.',
    showing: 'Mostrando',
    of: 'de',
    transactions: 'transações',
    
    // Categories
    food: 'Alimentação',
    transport: 'Transporte',
    entertainment: 'Entretenimento',
    health: 'Saúde',
    education: 'Educação',
    otherExpenses: 'Outros Gastos',
    salary: 'Salário',
    freelance: 'Trabalho Autônomo',
    investments: 'Investimentos',
    otherIncome: 'Outras Rendas',
    categoryBreakdown: 'Divisão por Categorias',
    detailedAnalysis: 'Análise detalhada',
    noExpensesRecorded: 'Nenhum gasto registrado',
    noIncomeRecorded: 'Nenhuma renda registrada',
    uncategorized: 'Sem categoria',
    noDataToShow: 'Nenhum dado para mostrar',
    addTransactionsToSeeBreakdown: 'Adicione algumas transações para ver a divisão por categorias',
    
    // Charts & Analytics
    analytics: 'Análises',
    charts: 'Gráficos',
    monthlyTrend: 'Tendência Mensal',
    categoryDistribution: 'Distribuição por Categoria',
    incomeVsExpenses: 'Renda vs Gastos',
    balanceEvolution: 'Evolução do Saldo',
    noDataAvailable: 'Nenhum dado disponível',
    thisMonth: 'Este Mês',
    lastMonths: 'Últimos Meses',
    totalTransactions: 'Total de Transações',
    averageExpense: 'Gasto Médio',
    averageIncome: 'Renda Média',
    showAllCategories: 'mais categorias',
    showLess: 'Mostrar menos',
    
    // Preferences
    preferences: 'Preferências',
    language: 'Idioma',
    currency: 'Moeda',
    spanish: 'Espanhol',
    english: 'Inglês',
    french: 'Francês',
    portuguese: 'Português',
    italian: 'Italiano',
    
    // Common
    save: 'Salvar',
    delete: 'Excluir',
    edit: 'Editar',
    search: 'Pesquisar',
    filter: 'Filtrar',
    all: 'Todas',
    close: 'Fechar',
    settings: 'Configurações',
    today: 'Hoje',
    yesterday: 'Ontem',
    
    // Footer
    allRightsReserved: 'Todos os direitos reservados',
    
    // Status & Loading
    loading: 'Carregando...',
    loadingApp: 'Carregando aplicação...',
    saving: 'Salvando...',
    loggingIn: 'Entrando...',
    
    // Success Messages
    accountCreated: 'Conta criada com sucesso!',
    welcomeBack: 'Bem-vindo de volta!',
    sessionClosed: 'Sessão encerrada com sucesso',
    preferencesUpdated: 'Preferências atualizadas',
    budgetUpdated: 'Orçamento atualizado',
    transactionAdded: 'Transação adicionada',
    transactionDeleted: 'Transação excluída',
    accountDeleted: 'Conta excluída com sucesso',
    
    // Error Messages
    errorLoadingData: 'Erro ao carregar dados',
    errorCreatingAccount: 'Erro ao criar conta',
    errorLoggingIn: 'Erro ao entrar',
    errorLoggingOut: 'Erro ao sair',
    errorUpdatingPreferences: 'Erro ao atualizar preferências',
    errorUpdatingBudget: 'Erro ao atualizar orçamento',
    errorAddingTransaction: 'Erro ao adicionar transação',
    errorDeletingTransaction: 'Erro ao excluir transação',
    errorDeletingAccount: 'Erro ao excluir conta',
    
    // Firebase Specific Errors
    firebaseUserNotFound: 'Usuário não encontrado',
    firebaseWrongPassword: 'Senha incorreta',
    firebaseEmailAlreadyInUse: 'Este email já está em uso',
    firebaseWeakPassword: 'Senha muito fraca',
    firebaseInvalidEmail: 'Email inválido',
    firebaseTooManyRequests: 'Muitos pedidos. Tente novamente mais tarde',
    firebaseNetworkError: 'Erro de rede. Verifique sua conexão com a internet',
    firebaseOperationNotAllowed: 'Operação não permitida',
    firebaseUserDisabled: 'Esta conta foi desabilitada',
    firebaseEmailNotVerified: 'Email não verificado',
    firebaseUnknownError: 'Ocorreu um erro inesperado',
    
    // Validation Messages
    nameRequired: 'O nome é obrigatório',
    nameMinLength: 'O nome deve ter pelo menos 2 caracteres',
    emailRequired: 'O email é obrigatório',
    emailInvalid: 'Email inválido',
    passwordRequired: 'A senha é obrigatória',
    descriptionRequired: 'A descrição é obrigatória',
    amountRequired: 'O valor deve ser maior que 0',
    categoryRequired: 'A categoria é obrigatória',
    budgetRequired: 'O orçamento deve ser maior que 0',
    budgetSaveError: 'Erro ao salvar orçamento',
    invalidNumber: 'Número inválido',
    numberTooLarge: 'O número é muito grande',
    numberMustBePositive: 'O número deve ser positivo',
    largeNumberDetected: 'Número grande detectado. Será exibido como',
    maxAmount: 'máximo: 1 trilhão',
    
    // Placeholders
    fullNamePlaceholder: 'Seu nome completo',
    emailPlaceholder: 'seu@email.com',
    passwordPlaceholder: '••••••••',
    confirmPasswordPlaceholder: '••••••••',
    transactionPlaceholder: 'Ex: Almoço no restaurante',
    
    // Form Actions
    setAmount: 'Definir',
    updateAmount: 'Atualizar',
    configureBudgetTitle: 'Configurar Renda Base',
    adjustBudgetTitle: 'Ajustar Renda Base',
    configureBaseIncome: 'Configurar Renda Base',
    adjustBaseIncome: 'Ajustar Renda Base',
    monthlyBaseIncome: 'Renda Mensal Base',
    modifyBaseIncome: 'Modifique sua renda mensal base',
    setBaseIncome: 'Defina sua renda mensal base (salário, pensão, etc.)',
    suggestion: 'Sugestão',
    baseIncomeSuggestion: 'Esta será sua renda mensal base. Depois você poderá adicionar renda adicional (freelance, bônus, etc.) como transações.',
    aboutBaseIncome: 'ℹ️ Sobre sua renda base',
    baseIncomeInfo1: 'Seu salário mensual, pensão ou renda principal',
    baseIncomeInfo2: 'Renda adicional é adicionada como transações',
    baseIncomeInfo3: 'Você pode modificar quando quiser',
    placeholderAmount: '2000.00',
    set: 'Definir',
    update: 'Atualizar',

    allRightsReserved: 'Todos os direitos reservados',
  },

  it: {
    // Header
    appTitle: 'Controllo Budget',
    appSubtitle: 'Gestisci le tue finanze personali in modo intelligente',
    healthyFinances: 'Finanze Sane',
    
    // Auth
    login: 'Accedi',
    register: 'Registrati',
    logout: 'Esci',
    email: 'Email',
    password: 'Password',
    name: 'Nome Completo',
    confirmPassword: 'Conferma Password',
    forgotPassword: 'Hai dimenticato la password?',
    noAccount: 'Non hai un account?',
    hasAccount: 'Hai già un account?',
    createAccountSubtitle: 'Crea il tuo account per iniziare a gestire il tuo budget',
    creatingAccount: 'Creazione account...',
    passwordMinLength: 'La password deve avere almeno 6 caratteri',
    confirmPasswordRequired: 'Conferma la tua password',
    passwordsNoMatch: 'Le password non corrispondono',
    changePassword: 'Cambia Password',
    currentPassword: 'Password Attuale',
    newPassword: 'Nuova Password',
    confirmNewPassword: 'Conferma Nuova Password',
    changePasswordTitle: 'Cambia la tua password',
    changePasswordDescription: 'Per cambiare la tua password, devi confermare la tua password attuale',
    currentPasswordRequired: 'La password attuale è richiesta',
    newPasswordRequired: 'La nuova password è richiesta',
    confirmNewPasswordRequired: 'Conferma la tua nuova password',
    newPasswordMinLength: 'La nuova password deve avere almeno 6 caratteri',
    newPasswordsNoMatch: 'Le nuove password non corrispondono',
    passwordChanged: 'Password cambiata con successo',
    errorChangingPassword: 'Errore nel cambio della password',
    currentPasswordPlaceholder: 'La tua password attuale',
    newPasswordPlaceholder: 'La tua nuova password',
    confirmNewPasswordPlaceholder: 'Conferma la nuova password',
    confirmLogout: 'Sei sicuro di voler uscire?',
    confirmDeleteTransaction: 'Sei sicuro di voler eliminare questa transazione? Questa azione è permanente.',
    deleteAccount: 'Elimina Account',
    deleteAccountDescription: 'Questa azione eliminerà permanentemente il tuo account e tutti i tuoi dati.',
    confirmDeleteAccount: 'Sei sicuro di voler eliminare il tuo account?',
    confirmDeleteAccountPermanent: 'Digita "ELIMINA" per confermare che vuoi eliminare permanentemente il tuo account e tutti i tuoi dati.',
    typeDeleteToConfirm: 'Digita ELIMINA per confermare',
    deleteAccountWarning: '⚠️ Questa azione NON può essere annullata',
    
    // Dashboard
    welcome: 'Benvenuto nel tuo Controllo Budget!',
    welcomeMessage: 'Per iniziare, imposta il tuo reddito mensile base',
    configureBudget: 'Configura Reddito Base',
    recentTransactions: 'Transazioni Recenti',
    adjustBudget: 'Regola Reddito Base',
    newTransaction: 'Nuova Transazione',
    
    // Budget Overview
    monthlyBudget: 'Reddito Base',
    baseIncome: 'Reddito Base',
    additionalIncome: 'Reddito Aggiuntivo',
    totalIncome: 'Totale Redditi',
    totalExpenses: 'Totale Spese',
    totalBalance: 'Saldo Totale',
    budgetStatus: 'Stato Finanziario',
    withinBudget: 'Finanze sane',
    budgetExceeded: 'Le spese superano il reddito',
    spent: 'Speso',
    budget: 'Budget',
    remaining: 'Disponibile',
    available: 'Disponibile',
    financialSummary: 'Riassunto Finanziario',
    percentSpent: '% speso',
    baseLabel: 'Base:',
    extraLabel: 'Extra:',
    spentLabel: 'Speso:',
    availableLabel: 'Disponibile:',
    extraText: 'extra',
    
    // Transactions
    description: 'Descrizione',
    amount: 'Importo',
    category: 'Categoria',
    expense: 'Spesa',
    income: 'Reddito',
    selectCategory: 'Seleziona una categoria',
    cancel: 'Annulla',
    add: 'Aggiungi',
    transactionType: 'Tipo di Transazione',
    addNewTransaction: 'Aggiungi un nuovo reddito o spesa',
    noTransactions: 'Nessuna transazione',
    searchTransactions: 'Cerca transazioni...',
    deleteTransaction: 'Elimina transazione',
    noTransactionsFound: 'Nessuna transazione trovata corrispondente alla tua ricerca.',
    showing: 'Mostra',
    of: 'di',
    transactions: 'transazioni',
    
    // Categories
    food: 'Alimentazione',
    transport: 'Trasporto',
    entertainment: 'Intrattenimento',
    health: 'Salute',
    education: 'Educazione',
    otherExpenses: 'Altre Spese',
    salary: 'Stipendio',
    freelance: 'Lavoro Autonomo',
    investments: 'Investimenti',
    otherIncome: 'Altri Redditi',
    categoryBreakdown: 'Suddivisione per Categorie',
    detailedAnalysis: 'Analisi dettagliata',
    noExpensesRecorded: 'Nessuna spesa registrata',
    noIncomeRecorded: 'Nessun reddito registrato',
    uncategorized: 'Senza categoria',
    noDataToShow: 'Nessun dato da mostrare',
    addTransactionsToSeeBreakdown: 'Aggiungi alcune transazioni per vedere la suddivisione per categorie',
    
    // Charts & Analytics
    analytics: 'Analisi',
    charts: 'Grafici',
    monthlyTrend: 'Tendenza Mensile',
    categoryDistribution: 'Distribuzione per Categorie',
    incomeVsExpenses: 'Redditi vs Spese',
    balanceEvolution: 'Evoluzione del Saldo',
    noDataAvailable: 'Nessun dato disponibile',
    thisMonth: 'Questo Mese',
    lastMonths: 'Ultimi Mesi',
    totalTransactions: 'Totale Transazioni',
    averageExpense: 'Spesa Media',
    averageIncome: 'Reddito Medio',
    showAllCategories: 'altre categorie',
    showLess: 'Mostra meno',
    
    // Preferences
    preferences: 'Preferenze',
    language: 'Lingua',
    currency: 'Valuta',
    spanish: 'Spagnolo',
    english: 'Inglese',
    french: 'Francese',
    portuguese: 'Portoghese',
    italian: 'Italiano',
    
    // Common
    save: 'Salva',
    delete: 'Elimina',
    edit: 'Modifica',
    search: 'Cerca',
    filter: 'Filtra',
    all: 'Tutte',
    close: 'Chiudi',
    settings: 'Impostazioni',
    today: 'Oggi',
    yesterday: 'Ieri',
    
    // Footer
    allRightsReserved: 'Tutti i diritti riservati',
    
    // Status & Loading
    loading: 'Caricamento...',
    loadingApp: 'Caricamento applicazione...',
    saving: 'Salvataggio...',
    loggingIn: 'Accesso in corso...',
    
    // Success Messages
    accountCreated: 'Account creato con successo!',
    welcomeBack: 'Bentornato!',
    sessionClosed: 'Sessione chiusa con successo',
    preferencesUpdated: 'Preferenze aggiornate',
    budgetUpdated: 'Budget aggiornato',
    transactionAdded: 'Transazione aggiunta',
    transactionDeleted: 'Transazione eliminata',
    accountDeleted: 'Account eliminato con successo',
    
    // Error Messages
    errorLoadingData: 'Errore nel caricamento dei dati',
    errorCreatingAccount: 'Errore nella creazione dell\'account',
    errorLoggingIn: 'Errore nell\'accesso',
    errorLoggingOut: 'Errore nell\'uscita',
    errorUpdatingPreferences: 'Errore nell\'aggiornamento delle preferenze',
    errorUpdatingBudget: 'Errore nell\'aggiornamento del budget',
    errorAddingTransaction: 'Errore nell\'aggiunta della transazione',
    errorDeletingTransaction: 'Errore nell\'eliminazione della transazione',
    errorDeletingAccount: 'Errore nell\'eliminazione dell\'account',
    
    // Firebase Specific Errors
    firebaseUserNotFound: 'Utente non trovato',
    firebaseWrongPassword: 'Password errata',
    firebaseEmailAlreadyInUse: 'Email già in uso',
    firebaseWeakPassword: 'Password troppo debole',
    firebaseInvalidEmail: 'Email non valida',
    firebaseTooManyRequests: 'Troppi tentativi. Riprova più tardi',
    firebaseNetworkError: 'Errore di rete. Verifica la tua connessione internet',
    firebaseOperationNotAllowed: 'Operazione non consentita',
    firebaseUserDisabled: 'Questo account è stato disabilitato',
    firebaseEmailNotVerified: 'Email non verificata',
    firebaseUnknownError: 'Si è verificato un errore imprevisto',
    
    // Validation Messages
    nameRequired: 'Il nome è richiesto',
    nameMinLength: 'Il nome deve avere almeno 2 caratteri',
    emailRequired: 'L\'email è richiesta',
    emailInvalid: 'Email non valida',
    passwordRequired: 'La password è richiesta',
    descriptionRequired: 'La descrizione è richiesta',
    amountRequired: 'L\'importo deve essere maggiore di 0',
    categoryRequired: 'La categoria è richiesta',
    budgetRequired: 'Il budget deve essere maggiore di 0',
    budgetSaveError: 'Errore nel salvataggio del budget',
    invalidNumber: 'Numero non valido',
    numberTooLarge: 'Il numero è troppo grande',
    numberMustBePositive: 'Il numero deve essere positivo',
    largeNumberDetected: 'Numero grande rilevato. Sarà visualizzato come',
    maxAmount: 'massimo: 1 trilione',
    
    // Placeholders
    fullNamePlaceholder: 'Il tuo nome completo',
    emailPlaceholder: 'tua@email.com',
    passwordPlaceholder: '••••••••',
    confirmPasswordPlaceholder: '••••••••',
    transactionPlaceholder: 'Es: Pranzo al ristorante',
    
    // Form Actions
    setAmount: 'Imposta',
    updateAmount: 'Aggiorna',
    configureBudgetTitle: 'Configura Reddito Base',
    adjustBudgetTitle: 'Regola Reddito Base',
    configureBaseIncome: 'Configura Reddito Base',
    adjustBaseIncome: 'Regola Reddito Base',
    monthlyBaseIncome: 'Reddito Mensile Base',
    modifyBaseIncome: 'Modifica il tuo reddito mensile base',
    setBaseIncome: 'Imposta il tuo reddito mensile base (stipendio, pensione, ecc.)',
    suggestion: 'Suggerimento',
    baseIncomeSuggestion: 'Questo sarà il tuo reddito mensile base. Potrai poi aggiungere redditi aggiuntivi (freelance, bonus, ecc.) come transazioni.',
    aboutBaseIncome: 'ℹ️ Sul tuo reddito base',
    baseIncomeInfo1: 'Il tuo stipendio mensile, pensione o reddito principale',
    baseIncomeInfo2: 'I redditi aggiuntivi vengono aggiunti come transazioni',
    baseIncomeInfo3: 'Puoi modificarlo quando vuoi',
    placeholderAmount: '2000.00',
    set: 'Imposta',
    update: 'Aggiorna',

    allRightsReserved: 'Tutti i diritti riservati',
  }
};

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Inicializar desde localStorage o usar 'es' por defecto
    return localStorage.getItem('preferred-language') || 'es';
  });

  const t = (key) => {
    return translations[currentLanguage]?.[key] || key;
  };

  const changeLanguage = (newLanguage) => {
    if (['es', 'en', 'fr', 'pt', 'it'].includes(newLanguage)) {
      setCurrentLanguage(newLanguage);
      localStorage.setItem('preferred-language', newLanguage);
    }
  };

  const formatDate = (date, formatType = 'short') => {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj)) return '';
    
    // Mapeo de locales
    const locales = {
      es: es,
      en: enUS,
      fr: fr,
      pt: ptBR,
      it: it
    };
    
    const locale = locales[currentLanguage] || enUS;
    
    // Diferentes formatos según el tipo
    const formats = {
      short: {
        es: 'd/M/yyyy',
        en: 'M/d/yyyy',
        fr: 'd/M/yyyy',
        pt: 'd/M/yyyy',
        it: 'd/M/yyyy'
      },
      medium: {
        es: 'd MMM yyyy',
        en: 'MMM d, yyyy',
        fr: 'd MMM yyyy',
        pt: 'd MMM yyyy',
        it: 'd MMM yyyy'
      },
      long: {
        es: "d 'de' MMMM 'de' yyyy",
        en: 'MMMM d, yyyy',
        fr: 'd MMMM yyyy',
        pt: "d 'de' MMMM 'de' yyyy",
        it: 'd MMMM yyyy'
      },
      monthYear: {
        es: 'MMM yyyy',
        en: 'MMM yyyy',
        fr: 'MMM yyyy',
        pt: 'MMM yyyy',
        it: 'MMM yyyy'
      }
    };
    
    const formatString = formats[formatType]?.[currentLanguage] || formats[formatType]?.en || 'd/M/yyyy';
    
    try {
      return format(dateObj, formatString, { locale });
    } catch (error) {
      return format(dateObj, 'd/M/yyyy');
    }
  };

  const formatRelativeDate = (date) => {
    if (!date) return '';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj)) return '';
    
    const now = new Date();
    const diffInHours = Math.abs(now - dateObj) / (1000 * 60 * 60);
    
    // Si es menos de 24 horas, mostrar "Hoy"
    if (diffInHours < 24) {
      return t('today') || translations[currentLanguage]?.today || 'Today';
    }
    
    // Si es menos de 48 horas, mostrar "Ayer"
    if (diffInHours < 48) {
      return t('yesterday') || translations[currentLanguage]?.yesterday || 'Yesterday';
    }
    
    // Si no, mostrar fecha formateada
    return formatDate(dateObj, 'medium');
  };

  const translateFirebaseError = (firebaseError) => {
    if (!firebaseError) return t('firebaseUnknownError');
    
    const errorCode = firebaseError.code || firebaseError;
    
    // Mapeo de códigos de error de Firebase a claves de traducción
    const errorMap = {
      'auth/user-not-found': 'firebaseUserNotFound',
      'auth/wrong-password': 'firebaseWrongPassword',
      'auth/email-already-in-use': 'firebaseEmailAlreadyInUse',
      'auth/weak-password': 'firebaseWeakPassword',
      'auth/invalid-email': 'firebaseInvalidEmail',
      'auth/too-many-requests': 'firebaseTooManyRequests',
      'auth/network-request-failed': 'firebaseNetworkError',
      'auth/operation-not-allowed': 'firebaseOperationNotAllowed',
      'auth/user-disabled': 'firebaseUserDisabled',
      'auth/email-not-verified': 'firebaseEmailNotVerified',
      'auth/invalid-credential': 'firebaseWrongPassword',
      'auth/account-exists-with-different-credential': 'firebaseEmailAlreadyInUse',
      'auth/requires-recent-login': 'firebaseTooManyRequests'
    };
    
    const translationKey = errorMap[errorCode];
    return translationKey ? t(translationKey) : t('firebaseUnknownError');
  };

  const value = {
    currentLanguage,
    t,
    changeLanguage,
    availableLanguages: [
      { code: 'es', name: 'Español' },
      { code: 'en', name: 'English' },
      { code: 'fr', name: 'French' },
      { code: 'pt', name: 'Portuguese' },
      { code: 'it', name: 'Italian' }
    ],
    formatDate,
    formatRelativeDate,
    translateFirebaseError
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
} 