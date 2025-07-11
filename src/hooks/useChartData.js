import { useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { useBudget } from '../context/BudgetContext';
import { useLanguage } from '../context/LanguageContext';

export function useChartData() {
  const { transactions, categories } = useBudget();
  const { currentLanguage } = useLanguage();
  
  const locale = currentLanguage === 'es' ? es : enUS;
  
  // Datos para gráfico de ingresos vs gastos por mes (últimos 6 meses)
  const monthlyData = useMemo(() => {
    const currentDate = new Date();
    const months = eachMonthOfInterval({
      start: subMonths(currentDate, 5),
      end: currentDate
    });
    
    return months.map(month => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);
      
      const monthTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= monthStart && transactionDate <= monthEnd;
      });
      
      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        month: format(month, 'MMM yyyy', { locale }),
        income,
        expenses,
        balance: income - expenses
      };
    });
  }, [transactions, locale]);
  
  // Datos para gráfico de dona de gastos por categoría
  const expenseCategoryData = useMemo(() => {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const categoryTotals = {};
    
    expenseTransactions.forEach(transaction => {
      const categoryId = transaction.category;
      if (!categoryTotals[categoryId]) {
        categoryTotals[categoryId] = 0;
      }
      categoryTotals[categoryId] += transaction.amount;
    });
    
    return Object.entries(categoryTotals).map(([categoryId, amount]) => {
      const category = categories.find(cat => cat.id === categoryId);
      return {
        name: category ? category.name : 'Sin categoría',
        value: amount,
        color: category ? category.color : '#6b7280'
      };
    }).sort((a, b) => b.value - a.value);
  }, [transactions, categories]);
  
  // Datos para gráfico de dona de ingresos por categoría
  const incomeCategoryData = useMemo(() => {
    const incomeTransactions = transactions.filter(t => t.type === 'income');
    const categoryTotals = {};
    
    incomeTransactions.forEach(transaction => {
      const categoryId = transaction.category;
      if (!categoryTotals[categoryId]) {
        categoryTotals[categoryId] = 0;
      }
      categoryTotals[categoryId] += transaction.amount;
    });
    
    return Object.entries(categoryTotals).map(([categoryId, amount]) => {
      const category = categories.find(cat => cat.id === categoryId);
      return {
        name: category ? category.name : 'Sin categoría',
        value: amount,
        color: category ? category.color : '#6b7280'
      };
    }).sort((a, b) => b.value - a.value);
  }, [transactions, categories]);
  
  // Datos para gráfico de línea de evolución del balance
  const balanceEvolutionData = useMemo(() => {
    if (transactions.length === 0) return [];
    
    // Ordenar transacciones por fecha
    const sortedTransactions = [...transactions].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    let runningBalance = 0;
    const evolution = [];
    
    sortedTransactions.forEach(transaction => {
      runningBalance += transaction.type === 'income' ? transaction.amount : -transaction.amount;
      evolution.push({
        date: format(new Date(transaction.date), 'MMM dd', { locale }),
        balance: runningBalance,
        fullDate: transaction.date
      });
    });
    
    // Tomar solo los últimos 30 puntos para mejor visualización
    return evolution.slice(-30);
  }, [transactions, locale]);
  
  // Estadísticas generales
  const statistics = useMemo(() => {
    const currentMonth = new Date();
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    
    const thisMonthTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= monthStart && transactionDate <= monthEnd;
    });
    
    const thisMonthIncome = thisMonthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const thisMonthExpenses = thisMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const allExpenses = transactions.filter(t => t.type === 'expense');
    const allIncome = transactions.filter(t => t.type === 'income');
    
    return {
      totalTransactions: transactions.length,
      thisMonthTransactions: thisMonthTransactions.length,
      thisMonthIncome,
      thisMonthExpenses,
      averageExpense: allExpenses.length > 0 
        ? allExpenses.reduce((sum, t) => sum + t.amount, 0) / allExpenses.length 
        : 0,
      averageIncome: allIncome.length > 0 
        ? allIncome.reduce((sum, t) => sum + t.amount, 0) / allIncome.length 
        : 0,
    };
  }, [transactions]);
  
  return {
    monthlyData,
    expenseCategoryData,
    incomeCategoryData,
    balanceEvolutionData,
    statistics
  };
} 