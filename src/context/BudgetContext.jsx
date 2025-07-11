import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const BudgetContext = createContext();

const initialState = {
  transactions: [],
  budget: 0,
  loading: false,
};

// Categorías predefinidas que se traducen dinámicamente
const getDefaultCategories = (t) => [
  { id: 'food', name: t('food'), type: 'expense', color: '#ef4444' },
  { id: 'transport', name: t('transport'), type: 'expense', color: '#f59e0b' },
  { id: 'entertainment', name: t('entertainment'), type: 'expense', color: '#8b5cf6' },
  { id: 'health', name: t('health'), type: 'expense', color: '#06b6d4' },
  { id: 'education', name: t('education'), type: 'expense', color: '#10b981' },
  { id: 'otherExpenses', name: t('otherExpenses'), type: 'expense', color: '#6b7280' },
  { id: 'salary', name: t('salary'), type: 'income', color: '#22c55e' },
  { id: 'freelance', name: t('freelance'), type: 'income', color: '#3b82f6' },
  { id: 'investments', name: t('investments'), type: 'income', color: '#8b5cf6' },
  { id: 'otherIncome', name: t('otherIncome'), type: 'income', color: '#06b6d4' },
];

function budgetReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_BUDGET':
      return { ...state, budget: action.payload };

    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };

    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
      };

    default:
      return state;
  }
}

export function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState);
  const { currentUser } = useAuth();
  const { t } = useLanguage();

  // Cargar datos del usuario cuando se autentica
  useEffect(() => {
    if (currentUser) {
      loadUserData();
    } else {
      // Reset data when user logs out
      dispatch({ type: 'SET_TRANSACTIONS', payload: [] });
      dispatch({ type: 'SET_BUDGET', payload: 0 });
    }
  }, [currentUser]);

  const loadUserData = async () => {
    if (!currentUser) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Cargar presupuesto
      const budgetRef = doc(db, 'budgets', currentUser.uid);
      const budgetSnap = await getDoc(budgetRef);

      if (budgetSnap.exists()) {
        dispatch({ type: 'SET_BUDGET', payload: budgetSnap.data().amount || 0 });
      }

      // Cargar transacciones (sin orderBy para evitar requerir índice)
      const transactionsRef = collection(db, 'transactions');
      const q = query(
        transactionsRef,
        where('userId', '==', currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const transactions = [];
      querySnapshot.forEach((doc) => {
        transactions.push({ id: doc.id, ...doc.data() });
      });

      // Ordenar en JavaScript por fecha (más reciente primero)
      transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

      dispatch({ type: 'SET_TRANSACTIONS', payload: transactions });
    } catch (error) {
      console.error('Error loading user data:', error);
      toast.error('Error al cargar los datos');
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const setBudget = async (amount) => {
    if (!currentUser) return;

    try {
      const budgetRef = doc(db, 'budgets', currentUser.uid);
      await setDoc(budgetRef, {
        amount,
        userId: currentUser.uid,
        updatedAt: new Date().toISOString()
      });

      dispatch({ type: 'SET_BUDGET', payload: amount });
      toast.success('Presupuesto actualizado');
    } catch (error) {
      console.error('Error updating budget:', error);
      toast.error('Error al actualizar el presupuesto');
    }
  };

  const addTransaction = async (transaction) => {
    if (!currentUser) return;

    try {
      const newTransaction = {
        ...transaction,
        userId: currentUser.uid,
        date: new Date().toISOString(),
        id: uuidv4()
      };

      const transactionsRef = collection(db, 'transactions');
      const docRef = await addDoc(transactionsRef, newTransaction);

      const transactionWithFirebaseId = {
        ...newTransaction,
        id: docRef.id
      };

      dispatch({ type: 'ADD_TRANSACTION', payload: transactionWithFirebaseId });
      toast.success(
        transaction.type === 'income' ? 'Ingreso agregado' : 'Gasto agregado'
      );
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast.error('Error al agregar la transacción');
    }
  };

  const deleteTransaction = async (id) => {
    if (!currentUser) return;

    try {
      await deleteDoc(doc(db, 'transactions', id));
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
      toast.success('Transacción eliminada');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error('Error al eliminar la transacción');
    }
  };

  // Obtener categorías con traducciones actuales
  const categories = getDefaultCategories(t);

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
    categories,
    setBudget,
    addTransaction,
    deleteTransaction,
    loadUserData,
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