import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// DEBUG: Verificar variables de entorno
console.log('🔥 Firebase Debug - Variables de entorno:');
console.log('API_KEY:', import.meta.env.VITE_FIREBASE_API_KEY);
console.log('AUTH_DOMAIN:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
console.log('PROJECT_ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);

// Configuración de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "control-presupuesto-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "control-presupuesto-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "control-presupuesto-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

console.log('🔥 Firebase Config final:', firebaseConfig);

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; 