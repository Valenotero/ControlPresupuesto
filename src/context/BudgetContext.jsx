import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const BudgetContext = createContext();

const initialState = {
  transactions: [],
  categories: [
    { id: 'comida', name: 'Alimentación', type: 'expense', color: '#ef4444' },
    { id: 'transporte', name: 'Transporte', type: 'expense', color: '#f59e0b' },
    { id: 'entretenimiento', name: 'Entretenimiento', type: 'expense', color: '#8b5cf6' },
    { id: 'salud', name: 'Salud', type: 'expense', color: '#06b6d4' },
    { id: 'educacion', name: 'Educación', type: 'expense', color: '#10b981' },
    { id: 'otros-gastos', name: 'Otros Gastos', type: 'expense', color: '#6b7280' },
    { id: 'salario', name: 'Salario', type: 'income', color: '#22c55e' },
    { id: 'freelance', name: 'Trabajo Independiente', type: 'income', color: '#3b82f6' },
    { id: 'inversiones', name: 'Inversiones', type: 'income', color: '#8b5cf6' },
    { id: 'otros-ingresos', name: 'Otros Ingresos', type: 'income', color: '#06b6d4' },
  ],
  budget: 0,
};

function budgetReducer(state, action) {
  switch (action.type) {
    case 'SET_BUDGET':
      return { ...state, budget: action.payload };
    
    case 'ADD_TRANSACTION':
      const newTransaction = {
        id: uuidv4(),
        ...action.payload,
        date: new Date().toISOString(),
      };
      return {
        ...state,
        transactions: [newTransaction, ...state.transactions],
      };
    
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };
    
    case 'ADD_CATEGORY':
      const newCategory = {
        id: uuidv4(),
        ...action.payload,
      };
      return {
        ...state,
        categories: [...state.categories, newCategory],
      };
    
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
}

export function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedData = localStorage.getItem('budgetData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Guardar datos en localStorage cuando cambie el estado
  useEffect(() => {
    localStorage.setItem('budgetData', JSON.stringify(state));
  }, [state]);

  const setBudget = (amount) => {
    dispatch({ type: 'SET_BUDGET', payload: amount });
  };

  const addTransaction = (transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const addCategory = (category) => {
    dispatch({ type: 'ADD_CATEGORY', payload: category });
  };

  // Cálculos derivados
  const totalIncome = state.transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = state.transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const budgetRemaining = state.budget - totalExpenses;

  const value = {
    ...state,
    setBudget,
    addTransaction,
    deleteTransaction,
    addCategory,
    totalIncome,
    totalExpenses,
    balance,
    budgetRemaining,
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
} 