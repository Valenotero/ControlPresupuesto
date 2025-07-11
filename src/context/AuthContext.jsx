import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { useLanguage } from './LanguageContext';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState({
    language: 'es',
    currency: 'EUR'
  });

  // Función helper para manejar errores de Firebase
  const handleFirebaseError = (error, translateFirebaseError, defaultMessage) => {
    if (translateFirebaseError && typeof translateFirebaseError === 'function') {
      return translateFirebaseError(error);
    }
    return defaultMessage + ': ' + error.message;
  };

  // Registrar nuevo usuario
  const signup = async (email, password, name, messages = {}) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Actualizar perfil con el nombre
      await updateProfile(user, { displayName: name });
      
      // Crear documento de usuario en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        preferences: {
          language: 'es',
          currency: 'EUR'
        },
        createdAt: new Date().toISOString()
      });

      toast.success(messages.success || '¡Cuenta creada exitosamente!');
      return user;
    } catch (error) {
      console.error('Error creating account:', error);
      const errorMessage = handleFirebaseError(
        error, 
        messages.translateFirebaseError, 
        messages.error || 'Error al crear la cuenta'
      );
      toast.error(errorMessage);
      throw error;
    }
  };

  // Iniciar sesión
  const login = async (email, password, messages = {}) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success(messages.success || '¡Bienvenido de nuevo!');
      return result;
    } catch (error) {
      console.error('Error logging in:', error);
      const errorMessage = handleFirebaseError(
        error, 
        messages.translateFirebaseError, 
        messages.error || 'Error al iniciar sesión'
      );
      toast.error(errorMessage);
      throw error;
    }
  };

  // Cerrar sesión
  const logout = async (messages = {}) => {
    try {
      await signOut(auth);
      toast.success(messages.success || 'Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error(messages.error || 'Error al cerrar sesión');
    }
  };

  // Cargar preferencias del usuario
  const loadUserPreferences = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.preferences) {
          setUserPreferences(userData.preferences);
        }
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
    }
  };

  // Actualizar preferencias del usuario
  const updateUserPreferences = async (newPreferences, messages = {}) => {
    if (!currentUser) return;
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, {
        preferences: { ...userPreferences, ...newPreferences }
      }, { merge: true });
      
      setUserPreferences(prev => ({ ...prev, ...newPreferences }));
      toast.success(messages.success || 'Preferencias actualizadas');
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast.error(messages.error || 'Error al actualizar preferencias');
    }
  };

  // Eliminar cuenta completa del usuario
  const deleteAccount = async (messages = {}) => {
    if (!currentUser) return;
    
    try {
      const userId = currentUser.uid;
      
      // 1. Eliminar todas las transacciones del usuario
      const transactionsRef = collection(db, 'transactions');
      const transactionsQuery = query(transactionsRef, where('userId', '==', userId));
      const transactionsSnapshot = await getDocs(transactionsQuery);
      
      const deleteTransactionsPromises = transactionsSnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      await Promise.all(deleteTransactionsPromises);
      
      // 2. Eliminar el presupuesto del usuario
      const budgetRef = doc(db, 'budgets', userId);
      try {
        await deleteDoc(budgetRef);
      } catch (error) {
        // El documento de presupuesto podría no existir, está bien
        console.log('Budget document not found or already deleted');
      }
      
      // 3. Eliminar el documento del usuario
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      
      // 4. Eliminar la cuenta de autenticación
      await deleteUser(currentUser);
      
      // 5. Resetear estado local
      setCurrentUser(null);
      setUserPreferences({ language: 'es', currency: 'EUR' });
      
      toast.success(messages.success || 'Cuenta eliminada exitosamente');
      
    } catch (error) {
      console.error('Error deleting account:', error);
      const errorMessage = handleFirebaseError(
        error, 
        messages.translateFirebaseError, 
        messages.error || 'Error al eliminar la cuenta'
      );
      toast.error(errorMessage);
      throw error;
    }
  };

  // Cambiar contraseña del usuario
  const changePassword = async (currentPassword, newPassword, messages = {}) => {
    if (!currentUser) return;
    
    try {
      // 1. Re-autenticar al usuario con su contraseña actual
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      
      // 2. Actualizar la contraseña
      await updatePassword(currentUser, newPassword);
      
      toast.success(messages.success || 'Contraseña actualizada exitosamente');
      
    } catch (error) {
      console.error('Error changing password:', error);
      const errorMessage = handleFirebaseError(
        error, 
        messages.translateFirebaseError, 
        messages.error || 'Error al cambiar la contraseña'
      );
      toast.error(errorMessage);
      throw error;
    }
  };

  // Escuchar cambios en la autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadUserPreferences(user.uid);
      } else {
        setUserPreferences({ language: 'es', currency: 'EUR' });
      }
      setLoading(false);
    });

    // Timeout de seguridad para evitar loader infinito
    const timeoutId = setTimeout(() => {
      console.warn('🔥 Firebase Auth timeout - Setting loading to false');
      setLoading(false);
    }, 5000); // 5 segundos timeout

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  const value = {
    currentUser,
    userPreferences,
    signup,
    login,
    logout,
    updateUserPreferences,
    deleteAccount,
    changePassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 