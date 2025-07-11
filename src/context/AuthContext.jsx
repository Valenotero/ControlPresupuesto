import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
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

  // Registrar nuevo usuario
  const signup = async (email, password, name) => {
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

      toast.success('¡Cuenta creada exitosamente!');
      return user;
    } catch (error) {
      console.error('Error creating account:', error);
      toast.error('Error al crear la cuenta: ' + error.message);
      throw error;
    }
  };

  // Iniciar sesión
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success('¡Bienvenido de nuevo!');
      return result;
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Error al iniciar sesión: ' + error.message);
      throw error;
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error al cerrar sesión');
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
  const updateUserPreferences = async (newPreferences) => {
    if (!currentUser) return;
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, {
        preferences: { ...userPreferences, ...newPreferences }
      }, { merge: true });
      
      setUserPreferences(prev => ({ ...prev, ...newPreferences }));
      toast.success('Preferencias actualizadas');
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast.error('Error al actualizar preferencias');
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

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userPreferences,
    signup,
    login,
    logout,
    updateUserPreferences,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 